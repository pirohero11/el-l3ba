"use client";

import React from "react";
import Home from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname() || "";
  const isProfileActive = pathname.endsWith("/child/profile");
  const isHomeActive = pathname.endsWith("/child/homePage");

  const items = [
    {
      id: "fire",
      isActive: false,
      render: () => (
        <LocalFireDepartmentIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
      )
    },
    {
      id: "profile",
      isActive: isProfileActive,
      render: () => (
        <Link href="/en/child/profile">
          <PersonIcon 
            className={isProfileActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"} 
            sx={{ fontSize: isProfileActive ? "80px" : "50px", color: isProfileActive ? "#ffffff" : "gray" }} 
          />
        </Link>
      )
    },
    {
      id: "home",
      isActive: isHomeActive,
      render: () => (
        <Link href="/en/child/homePage">
          <Home 
            className={isHomeActive ? "bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" : "transition-all duration-500 ease-in-out"} 
            sx={{ fontSize: isHomeActive ? "80px" : "50px", color: isHomeActive ? "#ffffff" : "gray" }} 
          />
        </Link>
      )
    },
    {
      id: "events",
      isActive: false,
      render: () => (
        <EmojiEventsIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
      )
    },
    {
      id: "list",
      isActive: false,
      render: () => (
        <FormatListBulletedIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
      )
    }
  ];

  const activeIndex = items.findIndex(item => item.isActive);
  if (activeIndex !== -1 && activeIndex !== 2) {
    const temp = items[2];
    items[2] = items[activeIndex];
    items[activeIndex] = temp;
  }

  return (
    <div className="fixed z-9999 border-bright-purple border-10 bg-white rounded-full flex flex-row w-97 h-30 items-center justify-center gap-2 bottom-5">
      {items.map((item) => (
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
