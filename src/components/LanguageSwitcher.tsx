"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";

interface LanguageSwitcherProps {
  variant?: "pill" | "button" | "compact";
  className?: string;
}

export default function LanguageSwitcher({ variant = "pill", className = "" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    // Replace current locale segment in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-1 bg-white/80 backdrop-blur border border-bright-purple/30 p-1 rounded-full shadow-sm ${className}`}>
        <button
          onClick={() => toggleLanguage("en")}
          className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
            locale === "en"
              ? "bg-bright-purple text-white shadow-sm"
              : "text-gray-600 hover:text-bright-purple"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => toggleLanguage("ar")}
          className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
            locale === "ar"
              ? "bg-bright-purple text-white shadow-sm"
              : "text-gray-600 hover:text-bright-purple"
          }`}
        >
          عربي
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 bg-white border-2 border-bright-purple p-1.5 rounded-2xl shadow-sm ${className}`}>
      <LanguageIcon className="text-bright-purple" sx={{ fontSize: 20 }} />
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
          locale === "en"
            ? "bg-sunny-yellow text-bright-purple shadow-sm border border-white"
            : "text-gray-600 hover:text-bright-purple"
        }`}
      >
        English
      </button>
      <button
        onClick={() => toggleLanguage("ar")}
        className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
          locale === "ar"
            ? "bg-sunny-yellow text-bright-purple shadow-sm border border-white"
            : "text-gray-600 hover:text-bright-purple"
        }`}
      >
        العربية
      </button>
    </div>
  );
}
