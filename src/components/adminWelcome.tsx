'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface TypingWelcomeProps {
    adminName: string;
}

export default function TypingWelcome({ adminName }: TypingWelcomeProps) {
    const textToType = `Welcome back, ${adminName}!`;
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        textToType.slice(0, latest)
    );

    useEffect(() => {
        const controls = animate(count, textToType.length, {
            type: 'tween',
            duration: 1.5,
            ease: 'easeInOut',
            delay: 0.2, // Small pause before starting
        });

        return controls.stop;
    }, [count, textToType.length]);

    return (
        <div className="flex w-full text-2xl font-bold tracking-tight text-bright-purple dark:text-white">
            <motion.span>{displayText}</motion.span>

            {/* Blinking Cursor */}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 inline-block h-8 w-[3px] bg-blue-600 dark:bg-blue-400"
            />
        </div>
    );
}