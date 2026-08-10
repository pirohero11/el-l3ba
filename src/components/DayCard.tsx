"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion, AnimatePresence } from "framer-motion";
import HistoryCard from "@/components/HistoryCard";

export interface Task {
  name: string;
  time: string;
  status: string;
  image?: string;
  sticker?: string;
}

interface DayCardProps {
  dayNumber: number;
  dayLabel: string;
  tasks: Task[];
  translations: {
    day: string;
    taskName: string;
    time: string;
    status: string;
  };
}

export default function DayCard({
  dayNumber,
  dayLabel,
  tasks,
  translations,
}: DayCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {/* Day Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          px-4 py-2 cursor-pointer select-none
          bg-transparent border-none 
        "
      >
        <span className="font-extrabold text-base text-[#1a1a2e]">
          {dayLabel} {dayNumber}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <KeyboardArrowDownIcon
            sx={{ fontSize: "22px", color: "#1a1a2e" }}
          />
        </motion.div>
      </button>

      {/* Separator line */}
      <div className="mx-4 h-[1px] bg-gray-200" />

      {/* Expandable — uses HistoryCard */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="day-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 320, damping: 28 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 px-3 py-3 items-center">
              {tasks.length > 0 ? (
                tasks.map((task, idx) => (
                  <HistoryCard
                    key={idx}
                    day={dayNumber}
                    translations={{
                      day: translations.day,
                      taskName: `${translations.taskName}: ${task.name}`,
                      time: `${translations.time}: ${task.time}`,
                      status: `${translations.status}: ${task.status}`,
                    }}
                    image={task.image || ""}
                    sticker={task.sticker}
                  />
                ))
              ) : (
                <HistoryCard
                  day={dayNumber}
                  translations={{
                    day: translations.day,
                    taskName: translations.taskName,
                    time: translations.time,
                    status: translations.status,
                  }}
                  image=""
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
