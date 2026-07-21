"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion, AnimatePresence } from "framer-motion";

interface WeekSectionProps {
  weekNumber: number;
  dateRange: string;
  weekLabel: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function WeekSection({
  weekNumber,
  dateRange,
  weekLabel,
  children,
  defaultOpen = false,
}: WeekSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      layout
      className="
        w-[95%] flex flex-col
        bg-white border-[3px] border-[#1a1a2e]
        rounded-[32px]
        shadow-[2px_6px_0_0_#1a1a2e]
        overflow-hidden
      "
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
    >
      {/* Week Header (Clickable Toggle Area) */}
      <motion.div
        layout="position"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          px-6 py-4 cursor-pointer select-none
          hover:bg-gray-50/50 transition-colors z-10
        "
      >
        <span className="font-extrabold text-lg tracking-tight text-[#1a1a2e]">
          {weekLabel} {weekNumber} - {dateRange}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex items-center justify-center"
        >
          <KeyboardArrowDownIcon
            className="border-2 border-bright-purple rounded-full text-bright-purple"
            sx={{ fontSize: "28px" }}
          />
        </motion.div>
      </motion.div>

      {/* Expandable Content Area (Nested inside the main pill) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="week-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
          >
            {/* The content container */}
            <div className=" flex flex-col gap-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}