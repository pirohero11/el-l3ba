"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

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
        className="fixed top-4 start-4 z-999999999999 p-2"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          // "X" Close Icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Menu Icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Side Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 start-0 h-full w-60 bg-white shadow-2xl z-40 p-8 pt-20 flex flex-col gap-6"
          >
            <div className="flex items-center w-full border-3 border-bright-purple/50 px-2 h-19 gap-3 rounded-2xl">
              <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center">
                <img className="border-3 border-bright-purple rounded-full" src="/avtr1.png" alt="" />
              </div>
              <p className="text-xl font-bold text-bright-purple">chris</p>
            </div>
            <Link href={`addChild`} >            
              <button className="flex items-center w-full border-3 border-admin-slate justify-center px-2 h-15 gap-3 rounded-2xl">
                <p className="font-black text-xl text-admin-slate">{t('addChild')}</p>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
