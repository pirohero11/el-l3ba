import { getTranslations } from "next-intl/server";
import React from 'react';

interface LeaderboardNameProps {
    name: string;
    rank: number;
    image: string;
}

export default async function LeaderboardName({ name, rank, image }: LeaderboardNameProps) {
    const t = await getTranslations("leaderboard");
    return (
        <div className=" flex flex-row gap-2 w-screen justify-center z-1 -ml-8">
            <div className="w-70 h-18 rounded-4xl bg-white p-4 gap-3 flex items-center border-bright-purple truncate shadow-[0_8px_0_#7209B7]">
                <div className="w-2/10 h-5 text-white flex items-center gap-4 mr-30">
                    <img src={`/${image}.png`} alt="" className="w-10 h-10 rounded-full bg-white border border-black" />
                    <p className="text-bright-purple font-black text-2xl">{name}</p>
                </div>
                <div className="text-sky-blue font-black text-2xl">+{rank}xp</div>
            </div>
        </div>
    );
}
