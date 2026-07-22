import { getTranslations, setRequestLocale } from 'next-intl/server';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");
    return (
        <div className="flex flex-col items-center w-full h-screen">
            <header className='w-full h-20 flex flex-row items-center p-2 gap-16'>
                <Link href={`/${locale}/parent`}>
                    <Button className='bg-white text-black border-black border rounded-full w-10 h-10'>
                        <ArrowBackIcon className="w-5 h-5"/>
                    </Button>
                </Link>
            </header>
            <main className='flex flex-col items-center gap-6'>
                <p className='text-center text-bright-purple text-2xl font-black'>{t("title")}</p>
                <div className='w-[85%] h-70 bg-white'></div>
                <Link href={`/${locale}/parent/confirmation`}>
                    <button className='bg-sunny-yellow slate w-50 h-20 rounded-full flex items-center justify-center border-white border-2'>
                        <p className='text-bright-purple text-xl font-black '>{t("button")}</p>
                    </button>
                </Link>
            </main>
        </div>
    );
}