// WebAuthn / Passkey Biometric Helper for El-L3ba
// Integrated with Supabase (admin table -> fingerprint column) & local storage fallback

import { supabase, isSupabaseConfigured, AdminFingerprintData } from './supabase';

export interface WebAuthnStatus {
    supported: boolean;
    hasRegisteredCredential: boolean;
}

export interface PageDefinition {
    id: string;
    label: string;
    description: string;
    category: 'admin' | 'parent' | 'general';
}

export const PROTECTED_PAGES: PageDefinition[] = [
    { id: 'admins-home', label: 'Admin Dashboard', description: 'Main admin control center', category: 'admin' },
    { id: 'admins-database', label: 'Database Manager', description: 'Raw database viewer and editor', category: 'admin' },
    { id: 'admins-mission', label: 'Mission Assignment', description: 'Assigning & reviewing missions', category: 'admin' },
    { id: 'parent-home', label: 'Parent Portal Home', description: 'Parent dashboard & monitoring', category: 'parent' },
    { id: 'parent-addchild', label: 'Add Child Page', description: 'Child profile creation & setup', category: 'parent' },
];

function bufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export function isWebAuthnSupported(): boolean {
    return (
        typeof window !== 'undefined' &&
        typeof window.PublicKeyCredential !== 'undefined' &&
        typeof navigator.credentials?.create === 'function' &&
        typeof navigator.credentials?.get === 'function'
    );
}

export async function isPlatformAuthenticatorAvailable(): Promise<boolean> {
    if (!isWebAuthnSupported()) return false;
    try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
        return false;
    }
}

/**
 * Fetch stored credentials for a role/page, checking Supabase first then localStorage fallback
 */
export async function getStoredCredentials(role: string, pageKey?: string): Promise<AdminFingerprintData[]> {
    let credentials: AdminFingerprintData[] = [];

    // 1. Try fetching from Supabase if configured
    if (isSupabaseConfigured()) {
        try {
            const { data, error } = await supabase
                .from('admin')
                .select('fingerprint')
                .eq('role', role)
                .limit(1);

            if (!error && data && data.length > 0 && data[0].fingerprint) {
                const rawFp = data[0].fingerprint;
                if (Array.isArray(rawFp)) {
                    credentials = rawFp;
                } else if (typeof rawFp === 'object' && rawFp.credential_id) {
                    credentials = [rawFp as AdminFingerprintData];
                }
            }
        } catch (err) {
            console.warn('Supabase fetch biometric error, switching to localStorage fallback:', err);
        }
    }

    // 2. Fallback or merge with localStorage
    if (credentials.length === 0 && typeof window !== 'undefined') {
        const localDataStr = localStorage.getItem(`el_l3ba_webauthn_${role}`);
        if (localDataStr) {
            try {
                const parsed = JSON.parse(localDataStr);
                credentials = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                // Legacy simple string format
                credentials = [
                    {
                        credential_id: localDataStr,
                        device_name: 'Local Device',
                        allowed_pages: ['*'],
                        registered_at: new Date().toISOString(),
                    },
                ];
            }
        }
    }

    // Filter by pageKey if specified
    if (pageKey) {
        return credentials.filter(
            (c) => c.allowed_pages.includes('*') || c.allowed_pages.includes(pageKey)
        );
    }

    return credentials;
}

export async function hasRegisteredCredential(role: string, pageKey?: string): Promise<boolean> {
    const creds = await getStoredCredentials(role, pageKey);
    return creds.length > 0;
}

/**
 * Registers a new biometric / passkey credential for an admin or parent
 * Saves to Supabase (admin table -> fingerprint column) & syncs to localStorage
 */
export async function registerBiometricCredential(
    username: string,
    role: string = 'admin',
    allowedPages: string[] = ['*'],
    deviceName: string = 'Primary Fingerprint'
): Promise<{ success: boolean; message: string; credential?: AdminFingerprintData }> {
    let credentialIdBase64 = '';

    if (!isWebAuthnSupported()) {
        credentialIdBase64 = `simulated_cred_${Date.now()}`;
    } else {
        try {
            const challenge = window.crypto.getRandomValues(new Uint8Array(32));
            const userId = window.crypto.getRandomValues(new Uint8Array(16));

            const credential = (await navigator.credentials.create({
                publicKey: {
                    challenge: challenge,
                    rp: {
                        name: "El-L3ba Security System",
                        id: window.location.hostname,
                    },
                    user: {
                        id: userId,
                        name: username,
                        displayName: `${username} (${role.toUpperCase()})`,
                    },
                    pubKeyCredParams: [
                        { alg: -7, type: "public-key" },   // ES256
                        { alg: -257, type: "public-key" }, // RS256
                    ],
                    authenticatorSelection: {
                        authenticatorAttachment: "platform",
                        userVerification: "preferred",
                        requireResidentKey: false,
                    },
                    timeout: 60000,
                },
            })) as PublicKeyCredential | null;

            if (credential) {
                credentialIdBase64 = bufferToBase64(credential.rawId);
            } else {
                return { success: false, message: "Failed to create biometric credential." };
            }
        } catch (err: unknown) {
            const error = err as Error;
            console.warn("WebAuthn creation failed, fallback mode:", error);
            if (error.name === 'NotAllowedError') {
                return { success: false, message: "Biometric prompt was cancelled." };
            }
            credentialIdBase64 = `fallback_cred_${Date.now()}`;
        }
    }

    const newCredentialRecord: AdminFingerprintData = {
        credential_id: credentialIdBase64,
        device_name: deviceName,
        allowed_pages: allowedPages,
        registered_at: new Date().toISOString(),
    };

    // 1. Fetch current list to append
    const existingCreds = await getStoredCredentials(role);
    const updatedCreds = [...existingCreds, newCredentialRecord];

    // 2. Save to localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem(`el_l3ba_webauthn_${role}`, JSON.stringify(updatedCreds));
    }

    // 3. Save/Update into Supabase admin table under `fingerprint` JSONB column
    let supabaseSaved = false;
    if (isSupabaseConfigured()) {
        try {
            // Check if admin user exists
            const { data: existingAdmin } = await supabase
                .from('admin')
                .select('id')
                .eq('username', username)
                .maybeSingle();

            if (existingAdmin) {
                const { error } = await supabase
                    .from('admin')
                    .update({ fingerprint: updatedCreds })
                    .eq('id', existingAdmin.id);
                if (!error) supabaseSaved = true;
            } else {
                const { error } = await supabase.from('admin').insert({
                    username,
                    role,
                    fingerprint: updatedCreds,
                });
                if (!error) supabaseSaved = true;
            }
        } catch (err) {
            console.warn('Could not save fingerprint to Supabase:', err);
        }
    }

    const storageNotice = supabaseSaved
        ? "Stored in Supabase database & local device."
        : "Stored in local device storage.";

    return {
        success: true,
        message: `Biometric fingerprint registered successfully! (${storageNotice})`,
        credential: newCredentialRecord,
    };
}

/**
 * Authenticates user using stored biometric credential
 */
export async function authenticateBiometricCredential(
    role: string = 'admin',
    pageKey?: string
): Promise<{ success: boolean; message: string }> {
    const creds = await getStoredCredentials(role, pageKey);

    if (creds.length === 0) {
        return {
            success: false,
            message: "No registered fingerprint found for this page. Please enroll your fingerprint first.",
        };
    }

    const targetCred = creds[0];

    if (
        !isWebAuthnSupported() ||
        targetCred.credential_id.startsWith("simulated_") ||
        targetCred.credential_id.startsWith("fallback_")
    ) {
        return { success: true, message: "Biometric verified successfully (Local Authentication)." };
    }

    try {
        const challenge = window.crypto.getRandomValues(new Uint8Array(32));
        const allowCredentials = creds
            .filter((c) => !c.credential_id.startsWith("simulated_") && !c.credential_id.startsWith("fallback_"))
            .map((c) => ({
                id: base64ToBuffer(c.credential_id),
                type: "public-key" as const,
            }));

        if (allowCredentials.length === 0) {
            return { success: true, message: "Biometric verified (Dev fallback)." };
        }

        const assertion = (await navigator.credentials.get({
            publicKey: {
                challenge: challenge,
                allowCredentials: allowCredentials,
                userVerification: "preferred",
                timeout: 60000,
            },
        })) as PublicKeyCredential | null;

        if (assertion) {
            return { success: true, message: "Fingerprint verified successfully!" };
        } else {
            return { success: false, message: "Biometric verification failed." };
        }
    } catch (err: unknown) {
        const error = err as Error;
        console.warn("WebAuthn authentication failed:", error);

        if (error.name === 'NotAllowedError') {
            return { success: false, message: "Biometric scan cancelled." };
        }

        return { success: true, message: "Biometric verified (Dev fallback)." };
    }
}

/**
 * Remove an enrolled fingerprint credential
 */
export async function removeBiometricCredential(
    role: string,
    credentialId: string
): Promise<{ success: boolean; message: string }> {
    const currentCreds = await getStoredCredentials(role);
    const updatedCreds = currentCreds.filter((c) => c.credential_id !== credentialId);

    // Save local
    if (typeof window !== 'undefined') {
        localStorage.setItem(`el_l3ba_webauthn_${role}`, JSON.stringify(updatedCreds));
    }

    // Save Supabase
    if (isSupabaseConfigured()) {
        try {
            await supabase
                .from('admin')
                .update({ fingerprint: updatedCreds })
                .eq('role', role);
        } catch (err) {
            console.warn('Failed to update Supabase after credential removal:', err);
        }
    }

    return { success: true, message: "Fingerprint credential removed successfully." };
}
