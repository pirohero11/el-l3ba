import { getTranslations, setRequestLocale } from 'next-intl/server';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Navbar from '@/components/menu';
import TabToggle from '@/components/animatedToggle';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");

    return (
        <div className='flex flex-col items-center h-full w-full gap-10 max-w-screen'>
            <header className='p-5 w-full flex flex-rew justify-between items-center border-b-black border-2 h-18  sticky top-0 bg-white'>
                <div className='mt-3'><Navbar /></div>
                <div className='flex items-center justify-center'>
                    <TabToggle/>
                </div>
                <div className="w-14 h-14 rounded-full bg-white border-bright-purple border-4"><img src="/avtr1.png" alt="" /></div>
            </header>
            <main className='w-[90%] h-full flex flex-col items-center gap-10 mb-7'>
                <p className='text-center font-black text-xl text-bright-purple'>{t("heading")}</p>
                <div className='w-full h-100 bg-white border-bright-purple py-5 border-4 rounded-3xl flex flex-col items-center gap-7'>
                    <div>
                        <p className='text-center font-black text-lg text-black'>{t("taskName")}</p>
                        <p className='text-center font-black text-[15px] text-black/40'>{t("submittedTime")}</p>
                    </div>
                    <div className='border-5 border-sunny-yellow w-[95%] aspect-video rounded-3xl flex justify-center items-center'>
                        <PlayArrowIcon className="text-white bg-sunny-yellow rounded-full p-2 border-4 border-white shadow-sm" sx={{fontSize: 70}}/>
                    </div>
                    <div className='w-[95%] h-16 gap-7 border-black flex flex-row items-center'>
                        <button className='w-[45%] h-full bg-mint-green flex items-center justify-center rounded-2xl border-black border-2'>
                            <p className='text-white font-black text-xl'>{t("accept")}</p>
                        </button>
                        <button className='w-[45%] h-full bg-red-500 flex items-center justify-center rounded-2xl border-black border-2'>
                            <p className='text-white font-black text-xl'>{t("redo")}</p>
                        </button>
                    </div>
                </div>
                <div className='w-full h-100 bg-white border-bright-purple py-5 border-4 rounded-3xl flex flex-col items-center gap-7'>
                    <div>
                        <p className='text-center font-black text-lg text-black'>{t("taskName")}</p>
                        <p className='text-center font-black text-[15px] text-black/40'>{t("submittedTime")}</p>
                    </div>
                    <div className='border-5 border-sunny-yellow w-[95%] aspect-video rounded-3xl flex justify-center items-center'>
                        <PlayArrowIcon className="text-white bg-sunny-yellow rounded-full p-2 border-4 border-white shadow-sm" sx={{fontSize: 70}}/>
                    </div>
                    <div className='w-[95%] h-16 gap-7 border-black flex flex-row items-center'>
                        <button className='w-[45%] h-full bg-mint-green flex items-center justify-center rounded-2xl border-black border-2'>
                            <p className='text-white font-black text-xl'>{t("accept")}</p>
                        </button>
                        <button className='w-[45%] h-full bg-red-500 flex items-center justify-center rounded-2xl border-black border-2'>
                            <p className='text-white font-black text-xl'>{t("redo")}</p>
                        </button>
                    </div>
                </div>
                <div className='w-full h-100 bg-white border-bright-purple py-5 border-4 rounded-3xl flex flex-col items-center gap-7'>
                    <div>
                        <p className='text-center font-black text-lg text-black'>{t("taskName")}</p>
                        <p className='text-center font-black text-[15px] text-black/40'>{t("submittedTime")}</p>
                    </div>
                    <div className='border-5 border-sunny-yellow w-[95%] aspect-video rounded-3xl flex justify-center items-center'>
                        <PlayArrowIcon className="text-white bg-sunny-yellow rounded-full p-2 border-4 border-white shadow-sm" sx={{fontSize: 70}}/>
                    </div>
                    <div className='w-[95%] h-16 gap-7 border-black flex flex-row items-center'>
                        <button className='w-[45%] h-full bg-mint-green flex items-center justify-center rounded-2xl border-black border-2'>
                            <p className='text-white font-black text-xl'>{t("accept")}</p>
                        </button>
                        <button className='w-[45%] h-full bg-red-500 flex items-center justify-center rounded-2xl border-black border-2'>
                            <p className='text-white font-black text-xl'>{t("redo")}</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}