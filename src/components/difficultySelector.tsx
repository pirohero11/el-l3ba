"use client";

import { useState } from "react";

const difficulties = ["Easy", "Medium", "Hard"];

export default function DifficultySelector() {
    const [selected, setSelected] = useState("Easy");

    return (
        <div className="w-full flex flex-col gap-3">
            <label htmlFor="difficulty" className="text-lg">Difficulty</label>
            <div className="flex gap-2">
                {difficulties.map((level) => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => setSelected(level)}
                        className={`flex-1 py-2 rounded-md border-2 border-surface-dim font-bold transition-colors ${selected === level
                                ? "flex-1 py-2 rounded-md border-2 border-primary bg-primary/10 text-on-primary font-bold" // Primary background when selected
                                : "bg-primary-container/20 hover:bg-primary-container/40"
                            }`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
}
