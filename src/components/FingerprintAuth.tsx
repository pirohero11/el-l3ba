'use client';

import React, { useState, useEffect } from 'react';
import {
    Fingerprint as FingerprintIcon,
    CheckCircle2 as CheckCircleIcon,
    AlertCircle as ErrorOutlineIcon,
    ShieldCheck as ShieldIcon,
    Key as KeyIcon
} from 'lucide-react';
import {
    isWebAuthnSupported,
    isPlatformAuthenticatorAvailable,
    hasRegisteredCredential,
    registerBiometricCredential,
    authenticateBiometricCredential
} from '@/lib/webauthn';

interface FingerprintAuthProps {
    role: 'admin' | 'parent';
    defaultUsername?: string;
    onSuccess: () => void;
    title?: string;
}

export default function FingerprintAuth({
    role,
    defaultUsername = role === 'admin' ? 'Admin User' : 'Parent User',
    onSuccess,
    title = 'Biometric Fingerprint Security'
}: FingerprintAuthProps) {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const [hasPlatformSensor, setHasPlatformSensor] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; text: string }>({
        type: 'idle',
        text: ''
    });
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [username, setUsername] = useState<string>(defaultUsername);

    useEffect(() => {
        setIsSupported(isWebAuthnSupported());
        setRegisteredState();
        checkSensor();
    }, [role]);

    const setRegisteredState = () => {
        const registered = hasRegisteredCredential(role);
        setIsRegistered(registered);
        if (!registered) {
            setActiveTab('register');
        } else {
            setActiveTab('login');
        }
    };

    const checkSensor = async () => {
        const available = await isPlatformAuthenticatorAvailable();
        setHasPlatformSensor(available);
    };

    const handleAuthenticate = async () => {
        setStatusMessage({ type: 'loading', text: 'Touch fingerprint sensor or scan passkey...' });
        
        const result = await authenticateBiometricCredential(role);
        
        if (result.success) {
            setStatusMessage({ type: 'success', text: result.message });
            setTimeout(() => {
                onSuccess();
            }, 800);
        } else {
            setStatusMessage({ type: 'error', text: result.message });
        }
    };

    const handleRegister = async () => {
        if (!username.trim()) {
            setStatusMessage({ type: 'error', text: 'Please enter a name for biometric registration.' });
            return;
        }

        setStatusMessage({ type: 'loading', text: 'Scanning fingerprint for enrollment...' });

        const result = await registerBiometricCredential(username.trim(), role);

        if (result.success) {
            setIsRegistered(true);
            setStatusMessage({ type: 'success', text: result.message });
            setActiveTab('login');
        } else {
            setStatusMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-3xl p-6 border-2 border-bright-purple/30 shadow-[0_10px_25px_rgba(114,9,183,0.15)] flex flex-col items-center gap-5">
            {/* Header Title */}
            <div className="flex items-center gap-2 text-bright-purple font-black text-xl">
                <ShieldIcon className="w-7 h-7 text-bright-purple" />
                <span>{title}</span>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex w-full bg-admin-slate/10 p-1.5 rounded-2xl">
                <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                        activeTab === 'login'
                            ? 'bg-bright-purple text-white shadow-md'
                            : 'text-admin-slate hover:text-bright-purple'
                    }`}
                >
                    Verify Fingerprint
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                        activeTab === 'register'
                            ? 'bg-bright-purple text-white shadow-md'
                            : 'text-admin-slate hover:text-bright-purple'
                    }`}
                >
                    Enroll Fingerprint
                </button>
            </div>

            {/* Fingerprint Scanner Interactive Graphic */}
            <div className="relative flex items-center justify-center my-2">
                <div
                    className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        statusMessage.type === 'loading'
                            ? 'border-sunny-yellow bg-sunny-yellow/10 animate-pulse scale-105'
                            : statusMessage.type === 'success'
                            ? 'border-emerald-500 bg-emerald-50 scale-105'
                            : statusMessage.type === 'error'
                            ? 'border-rose-500 bg-rose-50'
                            : 'border-bright-purple/40 bg-bright-purple/5 hover:border-bright-purple hover:scale-105 cursor-pointer'
                    }`}
                    onClick={activeTab === 'login' ? handleAuthenticate : handleRegister}
                >
                    <FingerprintIcon
                        className={`w-16 h-16 transition-colors duration-300 ${
                            statusMessage.type === 'loading'
                                ? 'text-sunny-yellow animate-bounce'
                                : statusMessage.type === 'success'
                                ? 'text-emerald-600'
                                : statusMessage.type === 'error'
                                ? 'text-rose-600'
                                : 'text-bright-purple'
                        }`}
                    />
                </div>
            </div>

            {/* Dynamic Status Display */}
            {statusMessage.text && (
                <div
                    className={`w-full p-3 rounded-xl flex items-center gap-2 text-sm font-bold ${
                        statusMessage.type === 'success'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : statusMessage.type === 'error'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : statusMessage.type === 'loading'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            : 'bg-slate-100 text-slate-800'
                    }`}
                >
                    {statusMessage.type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
                    {statusMessage.type === 'error' && <ErrorOutlineIcon className="w-5 h-5" />}
                    <span>{statusMessage.text}</span>
                </div>
            )}

            {/* Content per Tab */}
            {activeTab === 'login' ? (
                <div className="w-full flex flex-col gap-3">
                    <p className="text-center text-xs text-admin-slate/80 font-medium">
                        {isRegistered
                            ? 'Press below or click the fingerprint icon to authenticate using Touch ID, Windows Hello, or mobile biometric.'
                            : 'No fingerprint registered yet on this device. Switch to "Enroll Fingerprint" to set up your passkey.'}
                    </p>
                    <button
                        type="button"
                        onClick={handleAuthenticate}
                        className="w-full py-3.5 bg-bright-purple hover:bg-bright-purple/90 text-white font-black text-lg rounded-2xl shadow-[0_4px_0_#480675] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <FingerprintIcon className="w-6 h-6" />
                        <span>Authenticate Fingerprint</span>
                    </button>
                </div>
            ) : (
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-admin-slate">Account Name / Label</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter account label"
                            className="w-full h-11 px-3 border-2 border-admin-slate/30 rounded-xl font-semibold text-sm focus:border-bright-purple outline-none"
                        />
                    </div>
                    <p className="text-xs text-admin-slate/80 font-medium">
                        Click below to trigger your OS biometric prompt (Touch ID / Windows Hello / Passkey) and pair your fingerprint.
                    </p>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full py-3.5 bg-sunny-yellow hover:bg-sunny-yellow/90 text-bright-purple font-black text-lg rounded-2xl border-2 border-white shadow-[0_4px_0_#d99b00] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <KeyIcon className="w-6 h-6" />
                        <span>Enroll Fingerprint Passkey</span>
                    </button>
                </div>
            )}

            {/* Footer Badge Info */}
            <div className="flex items-center gap-2 text-[11px] text-admin-slate/70 font-semibold mt-1">
                <span className={`w-2 h-2 rounded-full ${hasPlatformSensor ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span>
                    {hasPlatformSensor
                        ? 'Biometric Hardware Sensor Ready'
                        : isSupported
                        ? 'WebAuthn Ready (Platform Passkey Support)'
                        : 'WebAuthn Browser Fallback Active'}
                </span>
            </div>
        </div>
    );
}
