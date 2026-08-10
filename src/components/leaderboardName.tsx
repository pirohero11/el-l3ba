import { getTranslations, setRequestLocale } from "next-intl/server";
import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default async function LeaderboardName({
      params,
    }: {
      params: Promise<{ locale: string }>;
    }) {
      const { locale } = await params;
      setRequestLocale(locale);
      const t = await getTranslations("leaderboard");
    return(
        <div className="flex flex-row w-full justify-center">
            <div className="w-full max-w-md h-18 rounded-4xl bg-white px-4 py-2 flex items-center justify-between border-2 border-bright-purple shadow-[0_8px_0_#7209B7]">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-admin-slate/25 bg-admin-slate/15 flex items-center justify-center text-xl font-extrabold text-admin-slate">4</div>
                    <img src="/avtr4.png" alt="Avatar" className="w-12 h-12 rounded-full bg-white border border-black object-cover" />
                </div>
                <p className="text-bright-purple font-black text-xl flex-1 text-center truncate px-2">Mark</p>
                <div className="text-sky-blue font-black text-xl shrink-0">450 Pts</div>
            </div>
        </div>
    );
}
