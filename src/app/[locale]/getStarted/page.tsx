import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Face from '@mui/icons-material/Face';
import AvatarSelector from '@/components/AvatarSelector';

export default function GetStarted({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('GetStarted');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
        <header className="pt-12 pb-6 px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 border-dark shadow-card mb-4">
                <Face sx={{color:"#7209B7", fontSize:"40px"}} />
            </div>
            {/*title*/}
            <p className="text-4xl font-bold text-bright-purple text-center">{t("title")}</p>
            {/*description*/}
            <p className="text-xl font-bold text-center mt-2">{t("description")}</p>
        </header>

        {/*avatars selection loop*/}
        <div className="w-full max-w-md">
            <AvatarSelector />
        </div>
    </div>
  );
}
