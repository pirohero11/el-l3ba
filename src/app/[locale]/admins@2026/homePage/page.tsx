import { getTranslations, setRequestLocale } from 'next-intl/server';
import TypingWelcome from '@/components/adminWelcome';
import SideNavbar from '@/components/menuAdmin';
import CleanPercentageChart from '@/components/stats'
import LeaderboardName from '@/components/recent'
import { Toggle } from "@/components/base/toggle/toggle";

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
                <div className='w-full flex flex-col gap-5 mb-5'>
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
                        <div className='flex flex-col w-full max-h-40 bg-admin-slate/10 rounded-lg z-999999 py-3 gap-5 overflow-y-auto overflow-x-hidden border-2 border-black'>
                            <LeaderboardName name={"Pierre"} rank={50} image={"avtr2"}/>
                            <LeaderboardName name={"Mariea"} rank={90} image={"avtr5f"}/>
                            <LeaderboardName name={"Andrew"} rank={30} image={"avtr3"}/>
                            <LeaderboardName name={"Eva"} rank={20} image={"avtr3f"}/>
                            <LeaderboardName name={"Jolie"} rank={50} image={"avtr6f"}/>
                        </div>
                    </div>
                    <div className='w-full h-45 bg-white p-5 rounded-2xl border border-black/30 flex flex-col items-center gap-4'>
                        <div>
                            <p className='text-xl'>Pause Game</p>
                            <p>This toggle pauses the game for a while until you deactivate it.</p>
                        </div>
                        <div className='flex items-center gap-4 bg-red-500/30 w-fit h-15 rounded-2xl p-3'>
                            <p className='text-sm'>Pause</p>
                            <Toggle size="md" />
                        </div>
                    </div>
                    <div className='w-full h-50 bg-white p-5 rounded-2xl border border-black/30 flex flex-col items-center gap-4'>
                        <div className='w-full'>
                            <p className='text-xl'>End Season</p>
                            <p className='text-sm'>No more missions, streaks or points, and the ones on the top leaderboard are displayed as the winners of the season</p>
                        </div>
                        <button className="w-40 rounded-lg bg-red-500/30 h-15">
                            <p>End Season</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}