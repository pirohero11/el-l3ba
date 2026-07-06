"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type DayStatus = "done" | "current" | "next";

interface DayInfo {
    key: string;
    status: DayStatus;
}

const allDays: DayInfo[] = [
    { key: "Sat", status: "done" },
    { key: "Sun", status: "done" },
    { key: "Mon", status: "current" },
    { key: "Tue", status: "next" },
    { key: "Wed", status: "next" },
    { key: "Thu", status: "next" },
    { key: "Fri", status: "next" },
];

// Only keep done + current + first "next" day
function getVisibleDays(days: DayInfo[]): DayInfo[] {
    let foundNext = false;
    return days.filter((day) => {
        if (day.status === "done" || day.status === "current") return true;
        if (day.status === "next" && !foundNext) {
            foundNext = true;
            return true;
        }
        return false;
    });
}

function CheckIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <motion.polyline
                points="20 6 9 17 4 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
        </svg>
    );
}

function StarIcon() {
    return (
        <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#7B2FF7"
            stroke="#7B2FF7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </motion.svg>
    );
}

export default function Progress() {
    const t = useTranslations("streak");
    const days = getVisibleDays(allDays);

    return (
        <div className="flex items-center justify-center w-full mt-2">
            <div className="flex items-start">
                {days.map((day, index) => {
                    const isDone = day.status === "done";
                    const isCurrent = day.status === "current";
                    const isNext = day.status === "next";

                    // Connector line between circles
                    const showConnector = index < days.length - 1;
                    const nextDay = days[index + 1];
                    const connectorDone =
                        isDone && nextDay && (nextDay.status === "done" || nextDay.status === "current");

                    // Stagger delay per item (circle + connector pair)
                    const delay = index * 0.2;

                    return (
                        <div key={day.key} className="flex items-start">
                            {/* Day column: circle + label */}
                            <motion.div
                                className="flex flex-col items-center gap-1.5"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay }}
                            >
                                {/* Circle */}
                                <motion.div
                                    className={`relative z-10 flex items-center justify-center rounded-full ${
                                        isDone
                                            ? "w-10 h-10 bg-[#2DD4A8] shadow-[0_2px_6px_0_rgba(45,212,168,0.4)]"
                                            : isCurrent
                                              ? "w-14 h-14 bg-[#FFD93D] shadow-[0_3px_10px_0_rgba(255,217,61,0.5)]"
                                              : "w-10 h-10 bg-[#E8ECF0] shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]"
                                    }`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 18,
                                        delay: delay + 0.1,
                                    }}
                                >
                                    {isDone && <CheckIcon />}
                                    {isCurrent && <StarIcon />}
                                </motion.div>

                                {/* Day label */}
                                <span
                                    className={`text-xs font-bold ${
                                        isCurrent ? "text-[#1a1a2e]" : "text-[#94A3B8]"
                                    }`}
                                >
                                    {t(day.key)}
                                </span>
                            </motion.div>

                            {/* Connector line */}
                            {showConnector && (
                                <div className="mt-5 shrink-0 flex items-center" style={{ width: 20, height: 4 }}>
                                    <motion.div
                                        className="rounded-full"
                                        style={{
                                            height: "100%",
                                            backgroundColor: connectorDone ? "#2DD4A8" : "#E8ECF0",
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.3, delay: delay + 0.25 }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
