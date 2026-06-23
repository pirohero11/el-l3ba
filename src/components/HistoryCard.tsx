"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion } from "framer-motion";

interface HistoryCardProps {
  day: number;
  translations: {
    day: string;
    taskName: string;
    time: string;
    status: string;
  };
  image: string;
}

export default function HistoryCard({ day, translations, image }: HistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-90 h-auto gap-2 flex flex-col select-none">
      <p className="text-xl font-extrabold">{translations.day} {day}</p>
      
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`w-100 cursor-pointer flex bg-white border-2 border-admin-slate shadow-[1px_8px_1px_0_#000000] p-2 overflow-hidden ${
          isExpanded
            ? "h-60 flex-col items-center justify-center gap-4 rounded-[70px]"
            : "h-30 flex-row items-center justify-center gap-2 rounded-full"
        }`}
      >
        {/* Yellow Shape (Circle/Pill) */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className={`border-4 border-sunny-yellow rounded-full shrink-0 bg-[url(/${image})] bg-cover bg-center ${
            isExpanded
              ? "w-80 h-[84px] order-2"
              : "w-[84px] h-[84px] order-1"
          }`}
        />
        
        {/* Content Wrapper (Text and Arrow Button) */}
        <motion.div
          layout
          className={`flex flex-row items-center ${
            isExpanded
              ? "justify-center gap-40 w-full shrink-0 order-1"
              : "gap-2 order-2"
          }`}
        >
          {/* Text Container */}
          <motion.div
            layout
            className={`flex flex-col ${isExpanded ? "" : "mr-15"}`}
          >
            <p>{translations.taskName}</p>
            <p>{translations.time}</p>
            <p>{translations.status}</p>
          </motion.div>
          
          {/* Arrow Icon */}
          <motion.div
            layout
            style={{ originX: 0.5, originY: 0.5 }}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <KeyboardArrowDownIcon
              className="border-2 border-sunny-yellow rounded-full w-20 h-20"
              sx={{ fontSize: "40px" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
