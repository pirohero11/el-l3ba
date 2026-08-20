'use client';

import React, { useState, useEffect } from 'react';
import {
    Fingerprint,
    ShieldCheck,
    Plus,
    Trash2,
    Database,
    CheckCircle2,
    Lock,
    KeyRound,
    Sparkles,
    AlertCircle,
    HardDrive
} from 'lucide-react';
import {
    PROTECTED_PAGES,
    getStoredCredentials,
    registerBiometricCredential,
    removeBiometricCredential,
    authenticateBiometricCredential,
    isWebAuthnSupported
} from '@/lib/webauthn';
import { isSupabaseConfigured, AdminFingerprintData } from '@/lib/supabase';

export default function FingerprintManagementPage() {
    const [credentials, setCredentials] = useState<AdminFingerprintData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<'admin' | 'parent'>('admin');
    const [username, setUsername] = useState<string>('SuperAdmin');
    const [deviceName, setDeviceName] = useState<string>('');
    const [selectedPages, setSelectedPages] = useState<string[]>(['*']);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    // Test Authentication modal state
    const [testingPage, setTestingPage] = useState<string | null>(null);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

    const loadCredentials = async () => {
        setLoading(true);
        const creds = await getStoredCredentials(role);
        setCredentials(creds);
        setLoading(false);
    };

    useEffect(() => {
        loadCredentials();
    }, [role]);

    const handleTogglePage = (pageId: string) => {
        if (pageId === '*') {
            setSelectedPages(['*']);
            return;
        }
        let updated = selectedPages.filter((p) => p !== '*');
        if (updated.includes(pageId)) {
            updated = updated.filter((p) => p !== pageId);
        } else {
            updated.push(pageId);
        }
        if (updated.length === 0) updated = ['*'];
        setSelectedPages(updated);
    };

    const handleScanAndRegister = async () => {
        setIsRegistering(true);
        setActionMessage(null);

        const name = deviceName.trim() || `${role.toUpperCase()} Fingerprint ${credentials.length + 1}`;
        const res = await registerBiometricCredential(username, role, selectedPages, name);

        if (res.success) {
            setActionMessage({ text: res.message, type: 'success' });
            setDeviceName('');
            await loadCredentials();
        } else {
            setActionMessage({ text: res.message, type: 'error' });
        }
        setIsRegistering(false);
    };

    const handleRemove = async (credentialId: string) => {
        if (!confirm('Are you sure you want to revoke this biometric fingerprint?')) return;
        const res = await removeBiometricCredential(role, credentialId);
        if (res.success) {
            setActionMessage({ text: res.message, type: 'success' });
            await loadCredentials();
        }
    };

    const handleTestAuthentication = async (pageId: string) => {
        setTestingPage(pageId);
        setTestResult(null);

        const res = await authenticateBiometricCredential(role, pageId);
        setTestResult(res);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Biometric Access Control System</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                            Page Fingerprint Storage
                            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Enroll device biometrics & map fingerprints to lock specific application pages.
                        </p>
                    </div>

                    {/* Supabase Status Pill */}
                    <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5 shadow-lg">
                        <Database className={`w-5 h-5 ${isSupabaseConfigured() ? 'text-emerald-400' : 'text-amber-400'}`} />
                        <div className="text-left">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                Storage Target:
                                <span className={isSupabaseConfigured() ? 'text-emerald-400' : 'text-amber-400'}>
                                    {isSupabaseConfigured() ? 'Supabase admin.fingerprint' : 'Local Device (Fallback)'}
                                </span>
                            </div>
                            <div className="text-[11px] text-slate-400">
                                {isSupabaseConfigured()
                                    ? 'PostgreSQL JSONB persistence active'
                                    : 'Connect Supabase for multi-device sync'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Compatibility Alert */}
                {!isWebAuthnSupported() && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
                        <span>
                            Your current browser does not support physical WebAuthn biometrics. Test simulation mode is active.
                        </span>
                    </div>
                )}

                {/* Action Feedback Toast */}
                {actionMessage && (
                    <div
                        className={`p-4 rounded-2xl border text-sm flex items-center gap-3 transition-all ${
                            actionMessage.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}
                    >
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{actionMessage.text}</span>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form: Scan & Register Fingerprint */}
                    <div className="lg:col-span-1 bg-slate-900/80 border border-purple-500/20 rounded-3xl p-6 backdrop-blur-xl space-y-6 shadow-xl">
                        <div className="flex items-center gap-2.5 text-white font-bold border-b border-slate-800 pb-3">
                            <Fingerprint className="w-5 h-5 text-purple-400" />
                            <h2 className="text-lg">Add New Fingerprint</h2>
                        </div>

                        {/* Admin Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300">Admin Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        {/* Device Label */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300">Fingerprint Label / Device</label>
                            <input
                                type="text"
                                placeholder="e.g. Work Laptop Touch ID"
                                value={deviceName}
                                onChange={(e) => setDeviceName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        {/* Select Allowed Pages */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                                <span>Allowed Pages for this Fingerprint</span>
                                <span className="text-[10px] text-purple-400">Select pages to lock</span>
                            </label>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                <label
                                    onClick={() => handleTogglePage('*')}
                                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                        selectedPages.includes('*')
                                            ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                                >
                                    <KeyRound className="w-4 h-4" />
                                    <span className="font-bold">ALL PAGES (Full Access)</span>
                                </label>
                                {PROTECTED_PAGES.map((page) => {
                                    const isSelected = selectedPages.includes(page.id);
                                    return (
                                        <div
                                            key={page.id}
                                            onClick={() => handleTogglePage(page.id)}
                                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                                isSelected && !selectedPages.includes('*')
                                                    ? 'bg-purple-500/15 border-purple-500/60 text-purple-200'
                                                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-white">{page.label}</span>
                                                <span className="text-[10px] text-slate-400">{page.description}</span>
                                            </div>
                                            {isSelected && !selectedPages.includes('*') && (
                                                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Scan Fingerprint Button */}
                        <button
                            onClick={handleScanAndRegister}
                            disabled={isRegistering}
                            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_10px_30px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                        >
                            {isRegistering ? (
                                <span>Scanning OS Fingerprint...</span>
                            ) : (
                                <>
                                    <Fingerprint className="w-5 h-5" />
                                    <span>Scan & Save Fingerprint</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* List: Stored Fingerprints in Supabase Admin Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <HardDrive className="w-5 h-5 text-purple-400" />
                                    <span>Stored Admin Fingerprints</span>
                                </h2>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                    {credentials.length} Registered
                                </span>
                            </div>

                            {loading ? (
                                <div className="text-center py-10 text-slate-500 text-sm">
                                    Loading fingerprints from database...
                                </div>
                            ) : credentials.length === 0 ? (
                                <div className="text-center py-12 px-4 border border-dashed border-slate-800 rounded-2xl space-y-3">
                                    <Fingerprint className="w-12 h-12 text-slate-600 mx-auto" />
                                    <p className="text-sm text-slate-400 font-medium">
                                        No fingerprints enrolled yet for role: <span className="text-purple-400">{role}</span>
                                    </p>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                        Use the form on the left to scan your hardware fingerprint and store it in the Supabase admin table.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {credentials.map((cred, idx) => (
                                        <div
                                            key={cred.credential_id || idx}
                                            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-slate-700"
                                        >
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white text-sm">
                                                        {cred.device_name || `Fingerprint ${idx + 1}`}
                                                    </span>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                                                        ID: {cred.credential_id.substring(0, 14)}...
                                                    </span>
                                                </div>

                                                {/* Allowed Pages Tags */}
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {cred.allowed_pages.includes('*') ? (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                            All Pages (*)
                                                        </span>
                                                    ) : (
                                                        cred.allowed_pages.map((p) => (
                                                            <span
                                                                key={p}
                                                                className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
                                                            >
                                                                {PROTECTED_PAGES.find((page) => page.id === p)?.label || p}
                                                            </span>
                                                        ))
                                                    )}
                                                </div>

                                                <div className="text-[11px] text-slate-500">
                                                    Enrolled on: {new Date(cred.registered_at).toLocaleString()}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    onClick={() => handleRemove(cred.credential_id)}
                                                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-xs transition-colors cursor-pointer"
                                                    title="Revoke Fingerprint"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Page Protection Interactive Tester */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                <Lock className="w-5 h-5 text-indigo-400" />
                                <span>Test Page Unlock Access</span>
                            </h2>
                            <p className="text-xs text-slate-400">
                                Click any protected page to trigger the OS fingerprint scan and test unlock permission.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {PROTECTED_PAGES.map((page) => (
                                    <div
                                        key={page.id}
                                        onClick={() => handleTestAuthentication(page.id)}
                                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all flex items-center justify-between group"
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-white group-hover:text-purple-300">
                                                {page.label}
                                            </div>
                                            <div className="text-[10px] text-slate-500">{page.id}</div>
                                        </div>
                                        <Fingerprint className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                ))}
                            </div>

                            {/* Test Result Indicator */}
                            {testingPage && testResult && (
                                <div
                                    className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
                                        testResult.success
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                    }`}
                                >
                                    <span>
                                        Testing <strong>{testingPage}</strong>: {testResult.message}
                                    </span>
                                    <span className="font-bold uppercase tracking-wider text-[10px]">
                                        {testResult.success ? 'Access Granted' : 'Access Denied'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
