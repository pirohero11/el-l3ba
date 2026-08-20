'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Fingerprint, ShieldCheck, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import {
    hasRegisteredCredential,
    registerBiometricCredential,
    authenticateBiometricCredential
} from '@/lib/webauthn';

interface BiometricGuardProps {
    role: 'parent' | 'admin';
    pageKey?: string;
    pageTitle?: string;
    children: React.ReactNode;
}

export default function BiometricGuard({ role, pageKey, pageTitle, children }: BiometricGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
    const [statusText, setStatusText] = useState<string>('Verifying fingerprint biometric...');
    const [hasError, setHasError] = useState<boolean>(false);

    const triggerBiometricAuth = useCallback(async () => {
        setIsAuthenticating(true);
        setHasError(false);
        setStatusText('Requesting fingerprint authentication...');

        // Check if credential exists for role/page, if not, auto-enroll first passkey
        const exists = await hasRegisteredCredential(role, pageKey);
        if (!exists) {
            setStatusText('Enrolling device passkey / fingerprint for page...');
            const defaultLabel = role === 'admin' ? 'Admin Security' : 'Parent Security';
            const allowedPages = pageKey ? [pageKey, '*'] : ['*'];
            const regResult = await registerBiometricCredential(defaultLabel, role, allowedPages);
            if (regResult.success) {
                setIsAuthenticated(true);
                setIsAuthenticating(false);
                return;
            }
        }

        // Trigger OS fingerprint scan prompt
        const authResult = await authenticateBiometricCredential(role, pageKey);

        if (authResult.success) {
            setIsAuthenticated(true);
            setIsAuthenticating(false);
        } else {
            setHasError(true);
            setIsAuthenticating(false);
            setStatusText(authResult.message || 'Biometric scan failed or cancelled.');
        }
    }, [role, pageKey]);

    useEffect(() => {
        // Automatically trigger fingerprint prompt on page entrance
        triggerBiometricAuth();
    }, [triggerBiometricAuth]);

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden select-none">
            {/* Background Content Blur Filter */}
            <div className="absolute inset-0 pointer-events-none filter blur-2xl opacity-20 scale-105">
                {children}
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

            {/* Security Overlay */}
            <div
                onClick={!isAuthenticating ? triggerBiometricAuth : undefined}
                className="relative z-20 flex flex-col items-center gap-6 p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(114,9,183,0.3)] max-w-sm w-11/12 text-center cursor-pointer group"
            >
                {/* Security Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>{pageTitle || `${role.toUpperCase()} BIOMETRIC GUARD`}</span>
                </div>

                {/* Animated Fingerprint Scanner Circle */}
                <div className="relative flex items-center justify-center my-2">
                    <div
                        className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                            isAuthenticating
                                ? 'border-amber-400/60 bg-amber-400/10 scale-105 shadow-[0_0_30px_rgba(251,191,36,0.3)]'
                                : hasError
                                ? 'border-rose-500/60 bg-rose-500/10 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                                : 'border-purple-500/60 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:scale-105'
                        }`}
                    >
                        {isAuthenticating ? (
                            <RefreshCw className="w-14 h-14 text-amber-400 animate-spin" />
                        ) : hasError ? (
                            <AlertCircle className="w-14 h-14 text-rose-400" />
                        ) : (
                            <Fingerprint className="w-14 h-14 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        )}
                    </div>
                </div>

                {/* Title & Status Message */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-black text-white">
                        {isAuthenticating ? 'Authentication Required' : hasError ? 'Scan Cancelled' : 'Tap to Unlock'}
                    </h2>
                    <p className="text-xs font-medium text-slate-400 px-2 leading-relaxed">
                        {statusText}
                    </p>
                </div>

                {/* Subtle Prompt Action Text */}
                {!isAuthenticating && (
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors mt-2">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Tap anywhere to scan fingerprint</span>
                    </div>
                )}
            </div>
        </div>
    );
}
