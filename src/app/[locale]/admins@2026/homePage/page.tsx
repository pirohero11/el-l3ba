import { getTranslations, setRequestLocale } from 'next-intl/server';
import TypingWelcome from '@/components/adminWelcome';
import SideNavbar from '@/components/menuAdmin';
import CleanPercentageChart from '@/components/stats'
import LeaderboardName from '@/components/recent'

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");

    return (
        <div className='flex flex-col items-center h-full w-full justify-center max-w-screen'>
            <header className="w-full h-18">
                <SideNavbar />
            </header>
            <main className='flex w-full px-3 flex-col gap-5'>
                <TypingWelcome adminName={'Pierre'}></TypingWelcome>
                <div className='w-full flex flex-col gap-5'>
                    <div className='w-full h-60 bg-white p-5 rounded-2xl border border-black/30 flex flex-col gap-3'>
                        <div>
                            <p className='text-xl'>Stats</p>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <CleanPercentageChart percentage={50}></CleanPercentageChart>
                                <p className='text-center'>Players did mission</p>
                            </div>
                            <div className='flex flex-col'>
                                <CleanPercentageChart percentage={70}></CleanPercentageChart>
                                <p className='text-center'>Players opened</p>
                            </div>
                            <div className='flex flex-col'>
                                <CleanPercentageChart percentage={50}></CleanPercentageChart>
                                <p className='text-center'>Pending approvals</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-60 bg-white p-5 rounded-2xl border border-black/30 flex flex-col gap-3'>
                        <div>
                            <p className='text-xl'>Recent activities</p>
                        </div>
                        <div className='flex flex-col w-full h-40 bg-admin-slate/10 rounded-lg'>
                            <LeaderboardName name={"Pierre"} rank={50} image={"avtr2"} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}