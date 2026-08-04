import React from 'react';
import BiometricGuard from '@/components/BiometricGuard';

export default function ParentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <BiometricGuard role="parent">
            {children}
        </BiometricGuard>
    );
}
