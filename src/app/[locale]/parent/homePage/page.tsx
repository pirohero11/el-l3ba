import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/menu';
import TabToggle from '@/components/animatedToggle';
import ParentMissionCard from '@/components/ParentMissionCard';

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
                <ParentMissionCard
                    taskName={t("taskName")}
                    submittedTime={t("submittedTime")}
                    acceptLabel={t("accept")}
                    redoLabel={t("redo")}
                />
                <ParentMissionCard
                    taskName={t("taskName")}
                    submittedTime={t("submittedTime")}
                    acceptLabel={t("accept")}
                    redoLabel={t("redo")}
                />
                <ParentMissionCard
                    taskName={t("taskName")}
                    submittedTime={t("submittedTime")}
                    acceptLabel={t("accept")}
                    redoLabel={t("redo")}
                />
            </main>
        </div>
    );
}