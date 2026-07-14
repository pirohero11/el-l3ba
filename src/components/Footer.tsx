"use client";

import React from "react";
import Home from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname() || "";
  const { locale } = useParams();

  const isProfileActive = pathname.endsWith("/child/profile");
  const isHomeActive = pathname.endsWith("/child/homePage");
  const isLeaderActive = pathname.endsWith("/child/leaderboard");
  const isListActive = pathname.endsWith("/child/history");
  const isStreakActive = pathname.endsWith("/child/streak")

  const items = [
    {
      id: "fire",
      isActive: isStreakActive,
      render: () => (
        <Link href={`/${locale}/child/streak`}>
          <LocalFireDepartmentIcon className={isStreakActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"}
            sx={{ fontSize: isStreakActive ? "60px" : "40px", color: isStreakActive ? "#ffffff" : "gray" }} />
        </Link>
      )
    },
    {
      id: "profile",
      isActive: isProfileActive,
      render: () => (
        <Link href={`/${locale}/child/profile`}>
          <PersonIcon
            className={isProfileActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"}
            sx={{ fontSize: isProfileActive ? "60px" : "40px", color: isProfileActive ? "#ffffff" : "gray" }}
          />
        </Link>
      )
    },
    {
      id: "home",
      isActive: isHomeActive,
      render: () => (
        <Link href={`/${locale}/child/homePage`}>
          <Home
            className={isHomeActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"}
            sx={{ fontSize: isHomeActive ? "60px" : "40px", color: isHomeActive ? "#ffffff" : "gray" }}
          />
        </Link>
      )
    },
    {
      id: "leaderboard",
      isActive: isLeaderActive,
      render: () => (
        <Link href={`/${locale}/child/leaderboard`}>
          <EmojiEventsIcon className={isLeaderActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"} sx={{ fontSize: isLeaderActive ? "60px" : "40px", color: isLeaderActive ? "#ffffff" : "gray" }} />
        </Link>
      )
    },
    {
      id: "history",
      isActive: isListActive,
      render: () => (
        <Link href={`/${locale}/child/history`}>
          <FormatListBulletedIcon className={isListActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"} sx={{ fontSize: isListActive ? "60px" : "40px", color: isListActive ? "#ffffff" : "gray" }} />
        </Link>
      )
    }
  ];

  // Map to a new array to completely avoid breaking item references 
  let renderItems = [...items];
  const activeIndex = renderItems.findIndex(item => item.isActive);

  // Safely swap elements inside the rendering layout block
  if (activeIndex !== -1 && activeIndex !== 2) {
    const temp = renderItems[2];
    renderItems[2] = renderItems[activeIndex];
    renderItems[activeIndex] = temp;
  }

  return (
    <div className="fixed z-9999 border-bright-purple border-10 bg-white rounded-full flex flex-row w-8/10 h-25 items-center justify-center gap-2 bottom-10">
      {renderItems.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8
          }}
          className="flex items-center justify-center"
        >
          {item.render()}
        </motion.div>
      ))}
    </div>
  );
}
