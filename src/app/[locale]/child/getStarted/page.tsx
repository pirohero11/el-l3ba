
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Face from '@mui/icons-material/Face';
import AvatarSelector from '@/components/AvatarSelector';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function GetStarted({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('GetStarted');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center gap-20 pt-12">
        <header className="px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 border-dark shadow-card rtl-flip">
                <Face sx={{color:"#7209B7", fontSize:"40px"}} />
            </div>
            {/*title*/}
            <p className="text-4xl font-bold text-bright-purple text-center">{t("title")}</p>
            {/*description*/}
            <p className="text-xl font-bold text-center mt-2">{t("description")}</p>
            {/*avatars selection loop*/}
            <div className="w-full max-w-md">
                <AvatarSelector />
            </div>
        </header>

        {/*text name*/}        
        <div className="flex flex-col w-full items-center">
          <label htmlFor="name" className="text-2xl font-bold text-bright-purple">{t("name")}</label>
          <input type="text" id="name" placeholder={t("username")} className="w-90 max-w-md p-4 rounded-full border-4 border-bright-purple shadow-card mt-4 text-lg font-bold" />
        </div>
        
        {/*start button*/}
        <Link href={`/${locale}/child/scan`}>
        <Button className="bg-sunny-yellow w-80 h-17 text-4xl text-bright-purple font-extrabold rounded-60 shadow-button">
          {t("getStarted")}
        </Button>
        </Link>
    </div>
  );
}
