"use client";

import React from "react";
import { motion } from "framer-motion";
import WeekSection from "@/components/WeekSection";
import DayCard, { Task } from "@/components/DayCard";

/* ── Static demo data matching the screenshot ── */
interface DayData {
  dayNumber: number;
  tasks: Task[];
}

interface WeekData {
  weekNumber: number;
  dateRange: string;
  days: DayData[];
  defaultOpen?: boolean;
}

const WEEKS: WeekData[] = [
  {
    weekNumber: 1,
    dateRange: "JUL 1-7",
    days: [
      { dayNumber: 1, tasks: [] },
      { dayNumber: 2, tasks: [] },
      { dayNumber: 3, tasks: [] },
      { dayNumber: 4, tasks: [] },
      { dayNumber: 5, tasks: [] },
      { dayNumber: 6, tasks: [] },
      { dayNumber: 7, tasks: [] },
    ],
  },
  {
    weekNumber: 2,
    dateRange: "JUL 8-14",
    defaultOpen: true,
    days: [
      { dayNumber: 1, tasks: [] },
      {
        dayNumber: 2,
        tasks: [
          {
            name: "Task Name",
            time: "Time",
            status: "Status",
            sticker: "/parent stickers/sticker 1.png",
          },
        ],
      },
      { dayNumber: 3, tasks: [] },
      { dayNumber: 4, tasks: [] },
      { dayNumber: 5, tasks: [] },
      { dayNumber: 6, tasks: [] },
      { dayNumber: 7, tasks: [] },
    ],
  },
  {
    weekNumber: 3,
    dateRange: "JUL 15-21",
    defaultOpen: true,
    days: [
      { dayNumber: 1, tasks: [] },
      { dayNumber: 2, tasks: [] },
      {
        dayNumber: 3,
        tasks: [
          {
            name: "Morning Run",
            time: "07:00 AM",
            status: "Complete",
            sticker: "/parent stickers/solo master.png",
          },
        ],
      },
      { dayNumber: 4, tasks: [] },
      { dayNumber: 5, tasks: [] },
      { dayNumber: 6, tasks: [] },
      { dayNumber: 7, tasks: [] },
    ],
  },
  {
    weekNumber: 4,
    dateRange: "JUL 22-28",
    days: [
      { dayNumber: 1, tasks: [] },
      { dayNumber: 2, tasks: [] },
      { dayNumber: 3, tasks: [] },
      { dayNumber: 4, tasks: [] },
      { dayNumber: 5, tasks: [] },
      { dayNumber: 6, tasks: [] },
      { dayNumber: 7, tasks: [] },
    ],
  },
];

/* ── Stagger animation variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

interface HistoryContentProps {
  translations: {
    week: string;
    day: string;
    taskName: string;
    time: string;
    status: string;
  };
}

export default function HistoryContent({ translations }: HistoryContentProps) {
  return (
    <motion.div
      className="flex flex-col gap-5 pb-40 w-full items-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {WEEKS.map((week) => (
        <motion.div
          key={week.weekNumber}
          variants={itemVariants}
          className="w-full flex justify-center"
        >
          <WeekSection
            weekNumber={week.weekNumber}
            dateRange={week.dateRange}
            weekLabel={translations.week}
            defaultOpen={week.defaultOpen}
          >
            {week.days.map((day) => (
              <DayCard
                key={day.dayNumber}
                dayNumber={day.dayNumber}
                dayLabel={translations.day}
                tasks={day.tasks}
                translations={{
                  day: translations.day,
                  taskName: translations.taskName,
                  time: translations.time,
                  status: translations.status,
                }}
              />
            ))}
          </WeekSection>
        </motion.div>
      ))}
    </motion.div>
  );
}
