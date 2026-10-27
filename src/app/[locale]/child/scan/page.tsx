'use client';

import { useState, useEffect, use } from 'react';
import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import QRCode from 'qrcode';

export default function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const t = useTranslations("scan");
    const [qrSrc, setQrSrc] = useState<string>('');
    const [storedValue, setStoredValue] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const item = localStorage.getItem('session');
        if (item) {
            try {
                const parsedItem = JSON.parse(item);
                if (parsedItem?.id) {
                    const id = String(parsedItem.id);
                    setStoredValue(id);
                    QRCode.toDataURL(id, { width: 250, margin: 2 })
                        .then((url) => setQrSrc(url))
                        .catch((err) => console.error('Failed to generate QR:', err))
                        .finally(() => setIsLoading(false));
                    return;
                }
            } catch (err) {
                console.error('Failed to parse session:', err);
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="inline-flex items-center justify-center w-15 h-15 bg-white rounded-full border-4 border-dark shadow-card p-5 m-5">
                <Link href={`/${locale}/child/getStarted`}>
                    <ArrowBackIcon sx={{ color: "#7209B7", fontSize: "30px" }} />
                </Link>
            </div>
            <div className="px-4 text-center flex-col flex gap-3 items-center">
                {/*title*/}
                <p className="text-2xl font-bold text-bright-purple text-center w-80">{t("title")}</p>
                {/*description*/}
                <p className=" font-bold text-center mt-2 w-full">{t("scanQR")}</p>
            </div>
            {/* QR CODE Scanner */}
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white w-9/10 aspect-square rounded-[25px] flex items-center justify-center p-4">
                    {qrSrc ? (
                        <img src={qrSrc} alt="QR Code" className="w-full h-full object-contain" />
                    ) : isLoading ? (
                        <p className="text-sm text-gray-400">Loading QR...</p>
                    ) : (
                        <p className="text-sm text-gray-500 text-center px-4">
                            No child session found. Please register first.
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Link href={`/${locale}/child/homePage`}>
                    <Button className="bg-sunny-yellow w-80 h-17 text-3xl text-bright-purple font-extrabold rounded-60">
                        {t("scanned")}
                    </Button>
                </Link>
            </div>
        </div>
    );
}