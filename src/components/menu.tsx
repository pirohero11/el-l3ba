"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Pmenu');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const sidebarVariants: Variants = {
    closed: { 
      x: isRtl ? '100%' : '-100%', 
      transition: { type: 'tween', duration: 0.3 } 
    },
    open: { 
      x: 0, 
      transition: { type: 'tween', duration: 0.3 } 
    },
  };

  return (
    <>
      {/* Menu Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`fixed top-4 z-60 p-2 bg-white/80 backdrop-blur rounded-full shadow-md border border-gray-200 cursor-pointer ${
          isRtl ? 'right-4' : 'left-4'
        }`}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          // "X" Close Icon
          <svg className="w-6 h-6 text-bright-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Menu Icon
          <svg className="w-6 h-6 text-bright-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Side Menu Panel & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className={`fixed top-0 h-full w-64 bg-white shadow-2xl z-50 p-6 pt-20 flex flex-col gap-6 ${
                isRtl ? 'right-0 border-l-4 border-bright-purple' : 'left-0 border-r-4 border-bright-purple'
              }`}
            >
              <div className="flex items-center w-full border-3 border-bright-purple/50 px-3 py-2 h-19 gap-3 rounded-2xl bg-slate-50">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0">
                  <img className="w-full h-full border-2 border-bright-purple rounded-full object-cover" src="/avtr1.png" alt="User avatar" />
                </div>
                <p className="text-xl font-bold text-bright-purple truncate">Chris</p>
              </div>
              <Link href={`/${locale}/parent/addChild`} onClick={() => setIsOpen(false)}>            
                <button className="flex items-center w-full border-3 border-admin-slate justify-center px-2 h-15 gap-3 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <p className="font-black text-xl text-admin-slate">{t('addChild')}</p>
                </button>
              </Link>
              <div className="mt-auto flex justify-center w-full pt-4">
                <LanguageSwitcher variant="compact" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
