"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

const levels = [
  { id: 7, x: 360, y: 70, status: "locked" },
  { id: 6, x: 110, y: 150, status: "locked" },
  { id: 5, x: 240, y: 400, status: "locked" },
  { id: 4, x: 130, y: 490, status: "locked" },
  { id: 3, x: 260, y: 680, status: "locked" },
  { id: 2, x: 70, y: 780, status: "next" },
  { id: 1, x: 240, y: 890, status: "done" },
];

export default function SagaMap() {
  const MAP_WIDTH = 400;
  const MAP_HEIGHT = 950;

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

  const targetLvl = levels.find((lvl) => lvl.status === "next");

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
          const isClickable = lvl.status === "next";
          const isNotClickable = lvl.status === "done";

          const buttonEl = (
            <button
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
              className={lvl.status == "done" ? "w-15 h-15 rounded-full flex items-center justify-center text-4xl font-black transition-all duration-300 shadow-[0_6px_0_0_rgba(114,9,183,0.3)] active:shadow-none active:translate-y-1 hover:scale-110 bg-sky-blue text-white border-4 border-white" : lvl.status == "next" ? "w-17 h-17 rounded-full flex items-center justify-center text-5xl transition-all duration-300 font-black shadow-[0_6px_0_0_rgba(114,9,183,0.3)] active:shadow-none active:translate-y-1 hover:scale-110 bg-primary text-bright-purple border-4 border-white animate-bounce" : "w-15 h-15 rounded-full flex items-center justify-center text-4xl font-black transition-all duration-300 shadow-[0_6px_0_0_rgba(114,9,183,0.3)] active:shadow-none active:translate-y-1 hover:scale-110 bg-admin-slate text-white border-4 border-white"}
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
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
            >
              {isClickable ? (
                <Link href="/child/level">
                  {buttonEl}
                </Link>
              ) : (
                buttonEl
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}