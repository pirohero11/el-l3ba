import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DifficultySelector from "@/components/difficultySelector";
import MovieIcon from '@mui/icons-material/Movie';

export default async function DatabasePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("admin");


    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex gap-8 w-full p-3 border-b-3 border-b-black items-center">
                <Link href={`/${locale}/admins@2026/homePage`}>
                    <Button className='bg-white text-black border-black border rounded-full w-8 h-8'>
                        <ArrowBackIcon className="w-2 h-2" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-bright-purple mt-1">{t("missionAssignTitle")}</h1>
            </div>
            <div className="flex flex-col w-[95%] h-screen bg-white p-3 rounded-2xl border border-black/30 mb-3 gap-3">
                <div className="w-full flex flex-col gap-3">
                    <label className="text-lg" htmlFor="name">{t("challengeName")}</label>
                    <input type="text" className="border-2 border-black rounded-lg p-2" id="name" placeholder={t("challengeName")} />
                </div>
                <DifficultySelector></DifficultySelector>
                <div className="w-full flex flex-col gap-3">
                    <label className="text-lg" htmlFor="xp">{t("xpReward")}</label>
                    <div className="relative w-full flex items-center">
                        <input type="number" className="w-full border-2 border-black rounded-lg p-2 pe-12" id="xp" placeholder={t("xpReward")} />
                        <span className="absolute end-4 text-primary font-black text-xl pointer-events-none">XP</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-slate-gray font-bold text-sm uppercase tracking-wider px-1">{t("instructionVideo")}</label>
                    <div className="group relative border-4 border-dashed border-surface-dim rounded-lg p-12 transition-all hover:border-secondary flex flex-col items-center justify-center gap-4 bg-surface-container/50">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                            <MovieIcon sx={{fontSize: '50px'}}></MovieIcon>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-gray text-lg">{t("chooseVideo")}</p>
                            <p className="text-slate-gray/50 text-sm">{t("chooseVideoSub")}</p>
                        </div>
                        <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full items-center justify-center h-40">
                    <Button className="text-slate-gray font-bold text-sm uppercase tracking-wider w-50 h-15 rounded-full">{t("createChallenge")}</Button>
                </div>
            </div>
        </div>
    );
}