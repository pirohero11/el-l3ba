import { getTranslations, setRequestLocale } from 'next-intl/server';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Footer from '@/components/Footer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';



export default async function StreakPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("streak");
    return (
        <div className="max-h-screen w-screen bg-background flex flex-col items-center pb-36">
            <header className="w-screen flex items-center justify-center p-6">
                <p className="font-black text-2xl text-bright-purple">{t("title")}</p>
            </header>
            <div className='flex flex-col items-center w-screen gap-8'>
                <div className='w-9/10 h-70 bg-primary rounded-4xl border-white border-4 flex items-center p-9 shadow-[0_4px_0_0_#f3ce16] flex-col gap-4'>
                    <LocalFireDepartmentIcon className='w-5 h-5 bg-white rounded-full flex items-center justify-center border-4 border-candy-pink mb-2"' sx={{ fontSize: "100px", color: "#F72585" }} />
                    <p className='text-3xl font-black text-bright-purple'>{t("day")}</p>
                    <p className='text-xl font-medium text-bright-purple'>{t("motivation")}</p>
                </div>
                <div className='flex flex-col items-center p-5 w-9/10 h-40 bg-white rounded-4xl shadow-[0_4px_9px_0_#64748B]'>
                    <p className='text-2xl font-black text-bright-purple'>{t("week")}</p>
                    <div className='flex justify-center'>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
