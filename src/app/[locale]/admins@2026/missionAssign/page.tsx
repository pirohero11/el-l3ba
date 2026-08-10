import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DifficultySelector from "@/components/difficultySelector";
import MovieIcon from '@mui/icons-material/Movie';

export default async function DatabasePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");


    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex gap-8 w-full p-3 border-b-3 border-b-black items-center">
                <Link href={`/${locale}/admins@2026/homePage`}>
                    <Button className='bg-white text-black border-black border rounded-full w-8 h-8'>
                        <ArrowBackIcon className="w-2 h-2" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-bright-purple mt-1">Mission Assignment</h1>
            </div>
            <div className="flex flex-col w-[95%] h-screen bg-white p-3 rounded-2xl border border-black/30 mb-3 gap-3">
                <div className="w-full flex flex-col gap-3">
                    <label className="text-lg" htmlFor="name">Challenge Name</label>
                    <input type="text" className="border-2 border-black rounded-lg p-2" id="name" placeholder="Challenge Name" />
                </div>
                <DifficultySelector></DifficultySelector>
                <div className="w-full flex flex-col gap-3">
                    <label className="text-lg" htmlFor="xp">XP reward</label>
                    <input type="number" className="border-2 border-black rounded-lg p-2" id="xp" placeholder="XP Reward" />
                    <span className="absolute left-4 translate-y-12.5 translate-x-70 text-primary font-black text-xl">XP</span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-slate-gray font-bold text-sm uppercase tracking-wider px-1">Instruction Video</label>
                    <div className="group relative border-4 border-dashed border-surface-dim rounded-lg p-12 transition-all hover:border-secondary flex flex-col items-center justify-center gap-4 bg-surface-container/50">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                            <MovieIcon sx={{fontSize: '50px'}}></MovieIcon>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-gray text-lg">Choose Video</p>
                            <p className="text-slate-gray/50 text-sm">Or click to choose a file (MP4, MOV)</p>
                        </div>
                        <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full items-center justify-center h-40">
                    <Button className="text-slate-gray font-bold text-sm uppercase tracking-wider w-50 h-15 rounded-full">Create Challenge</Button>
                </div>
            </div>
        </div>
    );
}