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
        <div className=" flex flex-row gap-2 w-screen justify-center">
            <div className="w-18/20 h-18 rounded-4xl bg-white p-4 gap-3 flex items-center border-bright-purple truncate shadow-[0_8px_0_#7209B7]">
                <div className="w-1/10 h-10 rounded-full border-2 border-admin-slate/25 bg-admin-slate/15 flex items-center justify-center text-3xl text-admin-slate">4</div>
                <div className="w-2/10 h-10 text-white flex items-center gap-4 mr-30">
                    <img src="/avtr4.png" alt="" className="w-14 h-14 rounded-full bg-white border border-black" />
                    <p className="text-bright-purple font-black text-2xl">Mark</p>
                </div>
                <div className="text-sky-blue font-black text-2xl">450</div>
            </div>
        </div>
    );
}
