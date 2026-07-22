import { getTranslations, setRequestLocale } from 'next-intl/server';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pwelcome");
    return (
        <div className="flex flex-col items-center h-screen w-full gap-10">
            <div className="flex flex-col items-center justify-center w-full py-5 mt-10 gap-2">
                <p className="text-bright-purple font-black text-2xl">{t("title")}</p>                
                <p className="text-admin-slate/65 font-black text-center px-2 w-[90%] text-sm">{t("description")}</p>                
            </div>
            <div className='border-5 border-sunny-yellow w-[90%] aspect-video rounded-3xl flex justify-center items-center'>
                <PlayArrowIcon className="text-white bg-sunny-yellow rounded-full p-2 border-4 border-white shadow-sm" sx={{fontSize: 70}}/>
            </div>
            <Link href={`/${locale}/parent/addChild`} className='w-[70%]'>
                <button className='bg-sunny-yellow slate w-full h-20 rounded-full flex items-center justify-center border-white border-2'>
                    <p className='text-bright-purple font-black text-lg'>{t("add")}</p>
                </button>
            </Link>
        </div>
    );
}