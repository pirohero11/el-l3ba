import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Smile } from 'lucide-react';
import GetStartedForm from '@/components/GetStartedForm';

export default async function GetStarted({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('GetStarted');  

  return (
    <div className="max-h-screen w-screen bg-background flex flex-col items-center gap-10">
      <header className="gap-2 p-5 text-center flex flex-col items-center w-full max-w-md relative">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 border-dark shadow-card rtl-flip">
          <Smile className="w-10 h-10 text-bright-purple" />
        </div>
        {/*title*/}
        <p className="text-3xl font-bold text-bright-purple text-center">{t("title")}</p>
        {/*description*/}
        <p className="text-xl font-bold text-center mt-2">{t("description")}</p>
      </header>

      <GetStartedForm
        locale={locale}
        labels={{
          name: t("name"),
          username: t("username"),
          getStarted: t("getStarted"),
        }}
      />
    </div>
  );
}
