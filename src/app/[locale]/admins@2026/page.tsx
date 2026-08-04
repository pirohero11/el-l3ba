import { getTranslations, setRequestLocale } from 'next-intl/server';
import AdminLoginClient from '@/components/AdminLoginClient';

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");

    return (
        <AdminLoginClient locale={locale} />
    );
}