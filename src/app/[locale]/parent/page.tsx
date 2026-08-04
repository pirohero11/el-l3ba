import { getTranslations, setRequestLocale } from 'next-intl/server';
import ParentWelcomeClient from '@/components/ParentWelcomeClient';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pwelcome");

    return (
        <ParentWelcomeClient
            locale={locale}
            title={t("title")}
            description={t("description")}
            addButtonText={t("add")}
        />
    );
}