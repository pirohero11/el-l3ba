import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("admin");

    return (
        <div className='flex flex-col items-center h-full w-full justify-center max-w-screen p-6 min-h-screen bg-slate-50 relative'>
            <div className="absolute top-6 right-6">
                <LanguageSwitcher variant="compact" />
            </div>
            <div className='flex flex-col items-center justify-center gap-6 text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-md'>
                <div className="w-16 h-16 rounded-2xl bg-bright-purple/10 flex items-center justify-center text-bright-purple">
                    <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className='font-black text-3xl text-bright-purple'>{t("portalTitle")}</h1>
                    <p className="text-slate-500 text-sm font-medium">{t("portalSub")}</p>
                </div>
                <Link
                    href={`/${locale}/admins@2026/homePage`}
                    className='w-full h-14 bg-bright-purple hover:bg-bright-purple/90 rounded-2xl text-white font-black text-xl flex items-center justify-center shadow-[0_4px_0_#480675] active:translate-y-1 active:shadow-none transition-all'
                >
                    {t("enterPortal")}
                </Link>
            </div>
        </div>
    );
}