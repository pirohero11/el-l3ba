'use client';

import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { addChildFromScan } from '@/app/[locale]/Parents/scan-to-data';

export default function TextQrReader() {
    const [scannedText, setScannedText] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [savedChildName, setSavedChildName] = useState<string | null>(null);
    const [scanKey, setScanKey] = useState<number>(0);

    useEffect(() => {
        // Matches the ID of the div container below
        const scanner = new Html5QrcodeScanner(
            'text-reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            },
            /* verbose= */ false
        );

        const onScanSuccess = async (decodedText: string) => {
            setScannedText(decodedText);
            scanner.clear();

            // Save scanned Child UUID directly into Parents table
            setStatus('saving');
            setErrorMessage(null);
            try {
                const res = await addChildFromScan(decodedText);
                if (res.success) {
                    setStatus('saved');
                    setSavedChildName(res.data?.child_name || null);
                } else {
                    setStatus('error');
                    setErrorMessage(res.error || 'Failed to save to database');
                }
            } catch (err: any) {
                setStatus('error');
                setErrorMessage(err?.message || 'Network error saving child');
            }
        };

        const onScanFailure = () => {
            // Sweeps frames continuously without interrupting execution
        };

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            scanner.clear().catch((err) => console.error('Failed to cleanup scanner', err));
        };
    }, [scanKey]);

    const handleReset = () => {
        setScannedText(null);
        setStatus('idle');
        setErrorMessage(null);
        setSavedChildName(null);
        setScanKey((prev) => prev + 1);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div id="text-reader" className="w-full rounded overflow-hidden mb-3"></div>

            {scannedText && (
                <div className="p-3 bg-gray-50 border rounded text-left w-full mt-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Child ID Scanned:</p>
                    <p className="text-sm text-gray-800 font-mono break-all mt-1 bg-white p-2 border rounded">
                        {scannedText}
                    </p>

                    {status === 'saving' && (
                        <p className="text-xs text-blue-600 font-semibold mt-2 animate-pulse">
                            Finding child and saving to database...
                        </p>
                    )}

                    {status === 'saved' && (
                        <p className="text-xs text-green-600 font-semibold mt-2">
                            ✓ {savedChildName ? `Child "${savedChildName}" added successfully!` : 'Saved to database successfully!'}
                        </p>
                    )}

                    {status === 'error' && (
                        <p className="text-xs text-red-600 font-semibold mt-2">
                            ✕ Error: {errorMessage}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleReset}
                        className="mt-3 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition cursor-pointer"
                    >
                        Scan Another Code
                    </button>
                </div>
            )}
        </div>
    );
}
