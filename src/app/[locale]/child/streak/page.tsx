import { getTranslations, setRequestLocale } from 'next-intl/server';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Footer from '@/components/Footer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Progress from "@/components/progress"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Video from '@mui/icons-material/VideocamSharp';
import Lock from '@mui/icons-material/Lock';

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
                    <p className='text-3xl font-black text-bright-purple'>3 {t("day")}</p>
                    <p className='text-xl font-medium text-bright-purple'>{t("motivation")}</p>
                </div>
                <div className='flex flex-col items-center p-5 w-9/10 h-45 bg-white rounded-4xl shadow-[0_4px_9px_0_#64748B] gap-4'>
                    <p className='text-2xl font-black text-bright-purple'>{t("week")}</p>
                    <Progress />
                </div>
            </div>
            <div className='flex flex-col justify-between w-9/10 mt-6 pb-40 gap-4'>
                <div className='flex flex-row w-full justify-between'>
                    <p className='text-2xl font-black text-bright-purple'>Your Trophies</p>
                    <div className='flex items-center justify-center bg-bright-purple rounded-lg w-10'>
                        <p className='text-white'>2/6</p>
                    </div>
                </div>
                <section className='justify-between flex flex-col gap-4'>
                    <div className='w-full h-37 flex flex-row gap-4'>
                        <div className='w-7/10 h-37 flex bg-sky-blue border-3 border-white shadow-[0_6px_0_0_#4CC9F0] rounded-2xl flex-col justify-center items-center'>
                            <RocketLaunchIcon className='p-2 bg-white rounded-full h-10 w-10' sx={{ fontSize: "60px", color: "#4CC9F0" }} />
                            <p className='text-white text-lg font-black'>First Mission</p>
                            <p className='text-white'>Done!</p>
                        </div>
                        <div className='w-7/10 h-37 flex bg-candy-pink border-3 border-white shadow-[0_6px_0_0_#F72585] rounded-2xl flex-col justify-center items-center'>
                            <Video className='p-2 bg-white rounded-full h-10 w-10' sx={{ fontSize: "60px", color: "#F72585" }} />
                            <p className='text-white text-lg font-black'>Director</p>
                            <p className='text-white'>1st Video!</p>
                        </div>
                    </div>
                    <div className='w-full h-37 flex flex-row gap-4'>
                        <div className='w-7/10 h-37 flex bg-admin-slate/20 border-3 border-white shadow-[0_6px_0_0_#64748B] rounded-2xl backdrop-blur-xl items-center justify-center flex-col'>
                            <Lock sx={{ fontSize: "60px", color: "#64748B" }} className='p-2 bg-white rounded-full h-10 w-10' />
                            <p className='text-white text-lg font-black'>Speedster</p>
                            <p className='text-white'>Locked</p>
                        </div>
                        <div className='w-7/10 h-37 flex bg-admin-slate/20 border-3 border-white shadow-[0_6px_0_0_#64748B] rounded-2xl backdrop-blur-xl items-center justify-center flex-col'>
                            <Lock sx={{ fontSize: "60px", color: "#64748B" }} className='p-2 bg-white rounded-full h-10 w-10' />
                            <p className='text-white text-lg font-black'>Perfect Week</p>
                            <p className='text-white'>Locked</p>
                        </div>
                    </div>
                    <div className='w-full h-37 flex flex-row gap-4'>
                        <div className='w-7/10 h-37 flex bg-admin-slate/20 border-3 border-white shadow-[0_6px_0_0_#64748B] rounded-2xl backdrop-blur-xl items-center justify-center flex-col'>
                            <Lock sx={{ fontSize: "60px", color: "#64748B" }} className='p-2 bg-white rounded-full h-10 w-10' />
                            <p className='text-white text-lg font-black'>10 Day Streak</p>
                            <p className='text-white'>Locked</p>
                        </div>
                        <div className='w-7/10 h-37 flex bg-admin-slate/20 border-3 border-white shadow-[0_6px_0_0_#64748B] rounded-2xl backdrop-blur-xl items-center justify-center flex-col'>
                            <Lock sx={{ fontSize: "60px", color: "#64748B" }} className='p-2 bg-white rounded-full h-10 w-10' />
                            <p className='text-white text-lg font-black'></p>
                            <p className='text-white'>Locked</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
