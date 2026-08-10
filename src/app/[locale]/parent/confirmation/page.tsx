import { getTranslations, setRequestLocale } from 'next-intl/server';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pconfirm");
    return (
        <main className='w-full h-screen flex flex-col items-center justify-center gap-10'>
            <div className="flex flex-col items-center justify-between py-5 gap-2 w-[85%] h-50 bg-white rounded-3xl border-2 border-black">
                <p className='text-bright-purple text-3xl font-black text-center'>{t("title")}</p>
                <Link href={`/${locale}/parent/homePage`}>
                    <button className='bg-sunny-yellow w-60 h-20 rounded-full flex items-center justify-center border-white border-2'>
                        <p className='text-bright-purple text-2xl font-black '>{t("button")}</p>
                    </button>
                </Link>
            </div>
        </main>
    );
}