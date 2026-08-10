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
        <div className="flex flex-row w-full justify-center">
            <div className="w-[90%] max-w-md h-18 rounded-4xl bg-white px-4 py-2 flex items-center justify-between border-2 border-bright-purple shadow-[0_8px_0_#7209B7]">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img src={`/${image}.png`} alt={name} className="w-10 h-10 rounded-full bg-white border border-black object-cover shrink-0" />
                    <p className="text-bright-purple font-black text-xl truncate">{name}</p>
                </div>
                <div className="text-sky-blue font-black text-xl shrink-0">+{rank}xp</div>
            </div>
        </div>
    );
}
