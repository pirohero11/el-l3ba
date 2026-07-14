import { getTranslations, setRequestLocale } from 'next-intl/server';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Footer from '@/components/Footer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Progress from "@/components/progress"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Lock from '@mui/icons-material/Lock';

export default async function StreakPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("mission");

    return (
        <div className='flex flex-col items-center'>
            <header className='w-full h-20 flex flex-row items-center p-2 mb-2 gap-16'>
                <Link href={`/${locale}/child/homePage`}>
                    <Button className='bg-white text-black border-black border rounded-full w-10 h-10'>
                        <ArrowBackIcon className="w-5 h-5"/>
                    </Button>
                </Link>
                <p className='text-bright-purple text-2xl font-black'>{t("title")}</p>
            </header>
            <main className='w-full flex flex-col items-center gap-6 mb-3'>
                <div className='w-[90%] flex flex-col gap-2 justify-center items-center'>
                    <p className="text-bright-purple text-2xl font-black text-center">{t("sub")}</p>
                    <p className="text-lg text-center">{t("description")}</p>
                </div>
                <div className='border-5 border-sunny-yellow w-[90%] aspect-video rounded-3xl flex justify-center items-center'>
                    <PlayArrowIcon className="text-white bg-sunny-yellow rounded-full p-2 border-4 border-white shadow-sm" sx={{fontSize: 70}}/>
                </div>
                <div className='w-[90%] h-95 flex flex-col items-center justify-center bg-white rounded-3xl gap-6'>
                    <p className="text-xl text-black font-medium text-center">{t("uploadVideo")}</p>
                    <CloudUploadIcon className="text-white bg-sunny-yellow rounded-full p-3 border-4 border-white shadow-sm" sx={{fontSize: 100}}/>
                    <button className='bg-sunny-yellow slate w-[90%] h-20 rounded-full flex items-center justify-center'>
                        <p className='text-bright-purple text-2xl font-black'>{t("upload")}</p>
                    </button>
                </div>                    
            </main>
        </div>
    );
}