import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Play as PlayArrowIcon } from 'lucide-react';

export default async function ParentPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pwelcome");
    return (
        <div className="flex flex-col items-center h-screen w-full gap-10 p-4">
            <div className="flex flex-col items-center justify-center w-full py-5 mt-10 gap-2 text-center">
                <p className="text-bright-purple font-black text-3xl">{t("title")}</p>                
                <p className="text-admin-slate/65 font-black text-center px-2 w-[90%] text-sm">{t("description")}</p>                
            </div>
            <div className='border-4 border-sunny-yellow w-full max-w-md aspect-video rounded-3xl flex justify-center items-center bg-white shadow-md'>
                <PlayArrowIcon className="w-16 h-16 text-white bg-sunny-yellow rounded-full p-3 border-4 border-white shadow-lg" />
            </div>
            <Link href={`/${locale}/parent/addChild`} className='w-full max-w-xs'>
                <button className='bg-sunny-yellow hover:bg-sunny-yellow/90 w-full h-16 rounded-full flex items-center justify-center border-white border-2 shadow-[0_4px_0_#d99b00] active:translate-y-1 active:shadow-none transition-all'>
                    <p className='text-bright-purple font-black text-lg'>{t("add")}</p>
                </button>
            </Link>
        </div>
    );
}