'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from '@/i18n/routing';
import FingerprintAuth from '@/components/FingerprintAuth';
import { Lock as LockIcon } from 'lucide-react';

interface AdminLoginClientProps {
    locale: string;
}

export default function AdminLoginClient({ locale }: AdminLoginClientProps) {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleBiometricSuccess = () => {
        router.push('/admins@2026/homePage');
    };

    return (
        <div className='flex flex-col items-center min-h-screen w-full justify-center max-w-screen p-4 py-8 bg-slate-50'>
            <div className='flex flex-row items-center justify-center py-5 border-black/20 w-full max-w-lg border-b-2 mb-6'>
                <div className="flex items-center gap-2">
                    <LockIcon className="w-8 h-8 text-bright-purple" />
                    <p className='text-center font-black text-3xl text-bright-purple'>Admin Portal Access</p>
                </div>
            </div>

            <div className='w-full max-w-lg flex flex-col items-center justify-center gap-6'>
                {/* Fingerprint WebAuthn Biometric Section */}
                <FingerprintAuth
                    role="admin"
                    defaultUsername={username || "Admin"}
                    onSuccess={handleBiometricSuccess}
                    title="Fingerprint & Passkey Login"
                />

                {/* Divider */}
                <div className="w-full flex items-center gap-3 my-2 max-w-md">
                    <div className="flex-1 h-px bg-slate-300"></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Or Standard Login</span>
                    <div className="flex-1 h-px bg-slate-300"></div>
                </div>

                {/* Password Form Card */}
                <div className='w-full max-w-md bg-white p-6 rounded-3xl border border-black/15 shadow-sm flex flex-col gap-4'>
                    <div className="flex flex-col gap-1">
                        <label className='font-bold text-sm text-black'>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter Username'
                            className='w-full h-12 border-slate-300 border-2 rounded-2xl p-3 focus:border-bright-purple outline-none font-medium'
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className='font-bold text-sm text-black'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Password'
                            className='w-full h-12 border-slate-300 border-2 rounded-2xl p-3 focus:border-bright-purple outline-none font-medium'
                        />
                    </div>
                    
                    <Link
                        href={`/${locale}/admins@2026/homePage`}
                        className='w-full h-13 mt-2 bg-bright-purple hover:bg-bright-purple/90 rounded-2xl text-white font-black text-xl flex items-center justify-center shadow-[0_4px_0_#480675] active:translate-y-1 active:shadow-none transition-all'
                    >
                        Login with Password
                    </Link>
                </div>
            </div>
        </div>
    );
}
