'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TabToggle() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || 'en'; // Fallback locale if needed
  const t = useTranslations('Ptoggle');

  const tabs = [
    { name: t('pending'), href: `/${locale}/parent/homePage` },
    { name: t('history'), href: `/${locale}/parent/homePage/history` },
  ];

  return (
    <div className="inline-flex items-center rounded-full bg-[#EFECE6] p-1 w-[40%] min-w-[200px] max-w-sm h-10 shadow-inner">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex flex-1 items-center justify-center h-full text-[12px] sm:text-[13px] font-medium transition-colors duration-200 ${
              isActive ? 'text-amber-900 font-semibold' : 'text-amber-800/70 hover:text-amber-900'
            }`}
          >
            {/* The sliding active indicator pill */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-[#FBF9F5] shadow-md border border-black/5"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Label text positioned above the animated background */}
            <span className="relative z-10 truncate px-2">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}