import React from 'react';
import BiometricGuard from '@/components/BiometricGuard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <BiometricGuard role="admin">
            {children}
        </BiometricGuard>
    );
}
