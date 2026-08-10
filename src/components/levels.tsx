"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface LevelItem {
  id: number;
  x: number;
  y: number;
  status: "locked" | "next" | "done";
  difficulty?: "Easy" | "Medium" | "Hard";
  xp?: number;
}

const levels: LevelItem[] = [
  { id: 7, x: 360, y: 70, status: "locked", difficulty: "Hard", xp: 500 },
  { id: 6, x: 110, y: 150, status: "locked", difficulty: "Hard", xp: 450 },
  { id: 5, x: 240, y: 400, status: "locked", difficulty: "Medium", xp: 350 },
  { id: 4, x: 130, y: 490, status: "locked", difficulty: "Medium", xp: 300 },
  { id: 3, x: 260, y: 680, status: "locked", difficulty: "Easy", xp: 200 },
  { id: 2, x: 70, y: 780, status: "next", difficulty: "Easy", xp: 150 },
  { id: 1, x: 240, y: 890, status: "done", difficulty: "Easy", xp: 100 },
];

export default function SagaMap() {
  const MAP_WIDTH = 400;
  const MAP_HEIGHT = 950;
  const router = useRouter();
  const locale = useLocale();

  const [selectedLevel, setSelectedLevel] = useState<LevelItem | null>(null);

  // Function to generate a curvy SVG path string
  const generateSmoothPath = (points: any[]) => {
    if (points.length < 2) return "";

    // Sort points by Y descending so path goes from bottom to top
    const sortedPoints = [...points].sort((a, b) => b.y - a.y);

    let d = `M ${sortedPoints[0].x},${sortedPoints[0].y}`;

    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const curr = sortedPoints[i];
      const next = sortedPoints[i + 1];

      // Calculate control points for a smooth S-curve
      const midY = (curr.y + next.y) / 2;
      d += ` C ${curr.x},${midY} ${next.x},${midY} ${next.x},${next.y}`;
    }
    return d;
  };

  const handleLevelClick = (lvl: LevelItem) => {
    if (lvl.status === "next") {
      setSelectedLevel(lvl);
    }
  };

  const handleEnterLevel = () => {
    if (selectedLevel) {
      router.push(`/${locale}/child/level`);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative bg-transparent flex justify-center items-center mt-20 mb-30 scroll-smooth">
      <div className="relative" style={{ height: MAP_HEIGHT, width: '100%' }}>
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* The Sunny Yellow Path */}
          <path
            d={generateSmoothPath(levels)}
            fill="none"
            stroke="#E3AE00"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="50 30"
          />
          {/* The Sunny Yellow Path */}
          <path
            d={generateSmoothPath(levels)}
            fill="none"
            stroke="#FFD60A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="50 30"
          />
        </svg>

        {/* Level Buttons */}
        {levels.map((lvl) => {
          const buttonEl = (
            <button
              onClick={() => handleLevelClick(lvl)}
              ref={(node) => {
                if (lvl.status === "next" && node) {
                  if (!(node as any).hasScrolled) {
                    (node as any).hasScrolled = true;
                    setTimeout(() => {
                      node.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }, 100);
                  }
                }
              }}
              className={
                lvl.status === "done"
                  ? "w-15 h-15 rounded-full flex items-center justify-center text-4xl font-black transition-all duration-300 shadow-[0_6px_0_0_rgba(114,9,183,0.3)] active:shadow-none active:translate-y-1 hover:scale-110 bg-sky-blue text-white border-4 border-white cursor-pointer"
                  : lvl.status === "next"
                  ? "w-17 h-17 rounded-full flex items-center justify-center text-5xl transition-all duration-300 font-black shadow-[0_6px_0_0_rgba(114,9,183,0.3)] active:shadow-none active:translate-y-1 hover:scale-110 bg-primary text-bright-purple border-4 border-white animate-bounce cursor-pointer"
                  : "w-15 h-15 rounded-full flex items-center justify-center text-4xl font-black transition-all duration-300 shadow-[0_6px_0_0_rgba(114,9,183,0.3)] active:shadow-none active:translate-y-1 hover:scale-110 bg-admin-slate text-white border-4 border-white cursor-not-allowed opacity-80"
              }
            >
              {lvl.status === "done" || lvl.status === "next" ? <span>{lvl.id}</span> : lvl.status === "locked" ? <span>🔒</span> : null}
            </button>
          );

          return (
            <div
              key={lvl.id}
              style={{
                left: `${(lvl.x / MAP_WIDTH) * 100}%`,
                top: lvl.y,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10"
            >
              {buttonEl}
            </div>
          );
        })}
      </div>

      {/* Difficulty Level Modal */}
      {selectedLevel && (
        <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full flex flex-col items-center gap-5 border-4 border-bright-purple shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-sunny-yellow/20 border-4 border-sunny-yellow flex items-center justify-center text-bright-purple font-black text-3xl">
              {selectedLevel.id}
            </div>
            
            <div className="text-center flex flex-col gap-1">
              <h3 className="text-2xl font-black text-bright-purple">Level {selectedLevel.id}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-bold text-gray-500">Difficulty:</span>
                <span className={`px-3 py-0.5 rounded-full font-black text-sm text-white ${
                  selectedLevel.difficulty === "Easy" ? "bg-mint-green" : selectedLevel.difficulty === "Medium" ? "bg-sunny-yellow" : "bg-red-500"
                }`}>
                  {selectedLevel.difficulty || "Easy"}
                </span>
              </div>
              <p className="text-sm font-extrabold text-sky-blue mt-1">Reward: +{selectedLevel.xp} XP ⭐</p>
            </div>

            <div className="flex flex-col gap-3 w-full mt-2">
              <button
                onClick={handleEnterLevel}
                className="w-full py-3 bg-sunny-yellow hover:bg-sunny-yellow/90 text-bright-purple font-black text-xl rounded-full border-2 border-white shadow-[0_4px_0_#d99b00] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                Enter Mission 🚀
              </button>
              <button
                onClick={() => setSelectedLevel(null)}
                className="w-full py-2 text-gray-500 font-bold text-sm hover:text-gray-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}