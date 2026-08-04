'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Play as PlayArrowIcon,
    Fingerprint as FingerprintIcon,
    Shield as ShieldIcon
} from 'lucide-react';
import FingerprintAuth from '@/components/FingerprintAuth';
import { useRouter } from '@/i18n/routing';

interface ParentWelcomeClientProps {
    locale: string;
    title: string;
    description: string;
    addButtonText: string;
}

export default function ParentWelcomeClient({
    locale,
    title,
    description,
    addButtonText
}: ParentWelcomeClientProps) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [showBiometricModal, setShowBiometricModal] = useState<boolean>(false);

    const handleBiometricSuccess = () => {
        setIsAuthenticated(true);
        setShowBiometricModal(false);
        router.push('/parent/addChild');
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full gap-8 p-4 py-8 bg-slate-50">
            {/* Header Title */}
            <div className="flex flex-col items-center justify-center w-full mt-4 gap-2 text-center">
                <p className="text-bright-purple font-black text-3xl">{title}</p>
                <p className="text-admin-slate/80 font-bold max-w-md px-2 text-sm">{description}</p>
            </div>

            {/* Media Box */}
            <div className='border-4 border-sunny-yellow w-full max-w-md aspect-video rounded-3xl flex justify-center items-center bg-white shadow-md'>
                <PlayArrowIcon className="w-16 h-16 text-white bg-sunny-yellow rounded-full p-3 border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
            </div>

            {/* Fingerprint Security Card */}
            <div className="w-full max-w-md">
                <FingerprintAuth
                    role="parent"
                    defaultUsername="Parent Account"
                    onSuccess={handleBiometricSuccess}
                    title="Parent Biometric Access"
                />
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md flex flex-col gap-3 items-center">
                <button
                    type="button"
                    onClick={() => setShowBiometricModal(true)}
                    className='bg-sunny-yellow hover:bg-sunny-yellow/90 w-full h-16 rounded-full flex items-center justify-center border-white border-2 shadow-[0_4px_0_#d99b00] active:translate-y-1 active:shadow-none transition-all'
                >
                    <p className='text-bright-purple font-black text-lg flex items-center gap-2'>
                        <FingerprintIcon className="w-7 h-7" />
                        <span>{addButtonText} (Biometric Protected)</span>
                    </p>
                </button>
            </div>

            {/* Modal for Fingerprint Scan */}
            {showBiometricModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md">
                        <button
                            type="button"
                            onClick={() => setShowBiometricModal(false)}
                            className="absolute -top-3 -right-3 bg-white text-bright-purple font-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg z-10 hover:bg-slate-100"
                        >
                            ✕
                        </button>
                        <FingerprintAuth
                            role="parent"
                            defaultUsername="Parent Account"
                            onSuccess={handleBiometricSuccess}
                            title="Verify Parent Fingerprint"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
