import { getTranslations, setRequestLocale } from "next-intl/server";
import React from 'react';
import Footer from "@/components/Footer";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardName from "@/components/leaderboardName";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("leaderboard");
  return (
    <div className="min-h-screen w-screen bg-background flex flex-col items-center p-4 pb-36">
      <header className="relative w-full flex flex-col items-center mb-6 mt-4">
        <h1 className="text-3xl font-black text-bright-purple capitalize">
          {t("title")}
        </h1>
      </header>

      <div className="flex items-end justify-center gap-3 p-8 bg-slate-100 rounded-2xl w-90/100">
      
        {/* 2nd Place */}
        <div className="flex flex-col items-center justify-end w-28 relative z-10">
          <div className="relative mb-3 avatar-float-delayed animate-bounce">
            {/* Scaled from w-16 h-16 to w-20 h-20 */}
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-3d-purple flex items-center justify-center bg-sky-200 text-sky-800 font-bold text-xl overflow-hidden">
              <img src="/avtr2.png" alt="Fady Avatar" className="w-full h-full object-cover" />
            </div>
            {/* Scaled badge from w-8 h-8 to w-9 h-9 */}
            <div className="absolute -bottom-2 -right-2 bg-sky-blue text-white w-9 h-9 rounded-full flex items-center justify-center font-black text-lg border-2 border-white shadow-[0_2.5px_0_#0096C7]">
              2
            </div>
          </div>
          {/* Expanded text padding and font layout */}
          <div className="font-bold text-base mb-1.5 text-center text-bright-purple bg-white px-3 py-1 rounded-full border-2 border-bright-purple w-full truncate shadow-[0_2px_0_rgba(0,0,0,0.05)]">
            Fady
          </div>
          {/* Scaled pedestal height from h-24 to h-32 */}
          <div className="w-full bg-sky-blue rounded-t-2xl border-4 border-b-0 border-white shadow-[0_10px_0_#0096C7] h-32 flex flex-col items-center pt-3">
            <span className="text-white font-black text-2xl">600</span>
            <span className="text-white/80 text-xs font-black uppercase tracking-wider">Pts</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center justify-end w-32 relative z-20 -mx-3">
          <div className="relative mb-3 avatar-float animate-bounce">
            {/* Slightly boosted crown sizing and repositioned */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg select-none">
              👑
            </span>
            {/* Scaled from w-20 h-20 to w-24 h-24 */}
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-[0_8px_0_#E0A800] flex items-center justify-center bg-amber-200 text-amber-800 font-bold text-2xl overflow-hidden">
              <img src="/avtr1.png" alt="Chris Avatar" className="w-full h-full object-cover" />
            </div>
            {/* Scaled badge from w-10 h-10 to w-11 h-11 */}
            <div className="absolute -bottom-1 -right-1 bg-sunny-yellow text-bright-purple w-11 h-11 rounded-full flex items-center justify-center font-black text-2xl border-2 border-white shadow-[0_3px_0_#E0A800]">
              1
            </div>
          </div>
          {/* Expanded text padding and size */}
          <div className="font-black text-lg mb-1.5 text-center text-bright-purple bg-white px-4 py-1.5 rounded-full border-2 border-bright-purple w-full truncate shadow-[0_3px_0_#7209B7]">
            Chris
          </div>
          {/* Scaled pedestal height from h-32 to h-40 */}
          <div className="w-full bg-primary rounded-t-2xl border-4 border-b-0 border-white shadow-[0_10px_0_#E0A800] h-40 flex flex-col items-center pt-4">
            <span className="text-bright-purple font-black text-3xl">750</span>
            <span className="text-bright-purple/80 text-xs font-black uppercase tracking-wider">Pts</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center justify-end w-28 relative z-10">
          <div className="relative mb-3 avatar-float-fast animate-bounce">
            {/* Scaled from w-16 h-16 to w-20 h-20 */}
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-3d-pink flex items-center justify-center bg-pink-200 text-pink-800 font-bold text-xl overflow-hidden">
              <img src="/avtr3f.png" alt="Lilly Avatar" className="w-full h-full object-cover" />
            </div>
            {/* Scaled badge from w-8 h-8 to w-9 h-9 */}
            <div className="absolute -bottom-2 -right-2 bg-candy-pink text-white w-9 h-9 rounded-full flex items-center justify-center font-black text-lg border-2 border-white shadow-[0_2.5px_0_#C9184A]">
              3
            </div>
          </div>
          {/* Expanded text padding and font layout */}
          <div className="font-bold text-base mb-1.5 text-center text-bright-purple bg-white px-3 py-1 rounded-full border-2 border-bright-purple w-full truncate shadow-[0_2px_0_rgba(0,0,0,0.05)]">
            Lilly
          </div>
          {/* Scaled pedestal height from h-20 to h-28 */}
          <div className="w-full bg-candy-pink rounded-t-2xl border-4 border-b-0 border-white shadow-[0_10px_0_#C9184A] h-28 flex flex-col items-center pt-3">
            <span className="text-white font-black text-2xl">550</span>
            <span className="text-white/80 text-xs font-black uppercase tracking-wider">Pts</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        <LeaderboardName params={params} id={4} />
        <LeaderboardName params={params} id={4} />
        <LeaderboardName params={params} id={4} />
        <LeaderboardName params={params} id={4} />
        <LeaderboardName params={params} id={4} />
        <LeaderboardName params={params} id={4} />
        <LeaderboardName params={params} id={4} />
      </div>

      <Footer />
    </div>
  );
}