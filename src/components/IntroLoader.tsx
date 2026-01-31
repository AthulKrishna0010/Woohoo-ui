'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const text = "Ready to enter the Woohoo Experience?";
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        // Timeline:
        // 0s: Logo Fade In start
        // 1s: Logo fully visible
        // 1.5s: Start Typing
        // 4.5s: Finish (total 3s for typing + reading)

        const typeTimer = setTimeout(() => setStartTyping(true), 1500);
        const endTimer = setTimeout(() => onComplete(), 5500); // 5.5s total duration for "Insane" load time

        return () => {
            clearTimeout(typeTimer);
            clearTimeout(endTimer);
        };
    }, [onComplete]);

    // Split text for typewriter effect
    const letters = Array.from(text);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    };

    const childVariants: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* LOGO */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-32 h-32 md:w-48 md:h-48 mb-12 relative"
            >
                <img src="/logo.svg" alt="Woohoo" className="w-full h-full object-contain" />

                {/* Subtle Glow Behind Logo */}
                <div className="absolute inset-0 bg-[#ccff00] blur-[60px] opacity-20 animate-pulse -z-10" />
            </motion.div>

            {/* TYPEWRITER TEXT */}
            <div className="h-12 md:h-16 flex items-center justify-center overflow-visible">
                {startTyping && (
                    <motion.h2
                        className="text-white text-xl md:text-3xl font-bebas tracking-widest uppercase text-center overflow-visible"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {letters.map((char, index) => (
                            <motion.span key={index} variants={childVariants} className="inline-block relative">
                                {char === " " ? "\u00A0" : char}
                                {/* Glitch/Glow effect on letters randomly? Keeping it clean for now but "Insane" quality */}
                                <span className="absolute inset-0 text-[#ccff00] opacity-30 blur-sm select-none pointer-events-none">
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            </motion.span>
                        ))}
                    </motion.h2>
                )}
            </div>

            {/* CREDITS */}
            <motion.div
                className="absolute bottom-16 w-full flex flex-col md:flex-row items-center justify-center gap-2 text-white/50 text-xs tracking-widest uppercase font-inter z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span>Designed and Powered by</span>
                <img src="/lso_new.png" alt="LSO" className="h-6 md:h-8 object-contain opacity-80" />
            </motion.div>

            {/* PROGRESS BAR (Optional visual cue) */}
            <motion.div
                className="absolute bottom-10 left-0 h-1 bg-[#ccff00] z-10"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5.5, ease: "linear" }}
            />

        </motion.div>
    );
}
