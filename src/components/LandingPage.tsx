'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import SmartZones from './SmartZones';


import HeroScroll from './HeroScroll';
import Navbar from './Navbar';
import RecoveryZones from './RecoveryZones';
import Testimonials from './Testimonials';

// Hook to track window size for responsive animations
function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default function LandingPage() {
    // Scroll handling for Parallax effect (Post-Hero)
    // Scroll handling for Parallax effect (Post-Hero)
    // const heroScrollRef = useRef<HTMLDivElement>(null);
    // const { scrollYProgress } = useScroll({
    //     target: heroScrollRef,
    //     offset: ["start start", "end end"]
    // });

    const [isHeroFinished, setIsHeroFinished] = useState(false);
    const [hideNavbarInZones, setHideNavbarInZones] = useState(false);

    // Track scroll for Navbar behavior in Smart Zones
    const smartZonesRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        const isScrollingUp = latest < previous;

        if (smartZonesRef.current) {
            const rect = smartZonesRef.current.getBoundingClientRect();
            // Check if we are "inside" the Smart Zones section (it takes up the screen)
            // top <= 0 means the top of the section has reached or passed the top of the viewport
            // bottom > 0 means the bottom of the section hasn't scrolled past the top yet
            const isInSmartZones = rect.top <= 0 && rect.bottom > 0;

            if (isInSmartZones && isScrollingUp) {
                setHideNavbarInZones(true);
            } else {
                setHideNavbarInZones(false);
            }
        }
    });

    // Initial Loading State (Optional, keeping it simple as per request)
    // const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black">

            {/* 1. HERO SCROLL LAYER (z-10) */}
            {/* This component handles its own height (400vh) and sticky behavior */}
            <div className="relative z-10 w-full bg-black">
                <HeroScroll onFinish={(finished) => setIsHeroFinished(finished)} />
            </div>

            {/* 2. SCROLL SPACER (Using this for any subsequent parallax if needed, or remove if HeroScroll handles spacing) */}
            {/* Since HeroScroll is tall and relative, we might just continue flow. 
                However, existing code used a fixed hero and a spacer. 
                HeroScroll is `relative h-[400vh]` so it takes up space naturally. 
                We don't need an extra spacer div for IT, but we need to check if PowerSourcedSection expects something.
                PowerSourcedSection was z-20 scrolling over z-10 fixed hero.
                If HeroScroll scrolls away naturally, PowerSourced can just follow.
            */}

            {/* 
               WAIT: The previous design had a FIXED video. user wants to "replace the video... with this scroll frames".
               Usually scroll frames imply:
               1. A sticky container that pins the canvas while you scroll.
               2. The user scrubs through frames.
               3. At the end, the page continues scrolling?
               
               My HeroScroll is `relative h-[400vh]` with a `sticky top-0 h-screen`.
               So it WILL take up 400vh of space.
               Text appears at the end.
               
               So effectively, the user scrolls 400vh to "watch" the intro.
               Then correct flow is to have the next section follow.
            */}





            {/* 3. BRAND SHOWCASE SECTION (z-20) 
                Higher Z-Index ensures this scrolls visibly OVER the fixed hero.
            */}
            <div className="relative z-20 w-full bg-black shadow-[0_-50px_100px_rgba(0,0,0,1)]">
                <PowerSourcedSection />
            </div>

            {/* 4. SMART TRAINING ZONES (z-20) */}
            <div ref={smartZonesRef} className="relative z-20 w-full bg-black">
                <SmartZones />
            </div>

            {/* 5. RECOVERY ZONES (z-20) */}
            <div className="relative z-20 w-full bg-black">
                <RecoveryZones />
            </div>

            {/* 6. CLIENT REVIEWS / TESTIMONIALS (z-20) */}
            <div className="relative z-20 w-full bg-black">
                <Testimonials />
            </div>

            {/* GLOBAL UI ELEMENTS */}
            <Navbar show={isHeroFinished && !hideNavbarInZones} />

        </div>
    );
}

function PowerSourcedSection() {
    const sectionRef = useRef(null);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

    // Responsive Spread Distances
    const spreadYKey = isMobile ? 120 : 250;
    const spreadXKey = isMobile ? 140 : 400;

    const spreadYTop = useTransform(progress, [0, 1], [0, -spreadYKey]);
    const spreadYBottom = useTransform(progress, [0, 1], [0, spreadYKey]);
    const spreadXLeft = useTransform(progress, [0, 1], [0, -spreadXKey]);
    const spreadXRight = useTransform(progress, [0, 1], [0, spreadXKey]);

    const opacity = useTransform(progress, [0.1, 0.5], [0, 1]);
    const filter = useTransform(progress, [0, 0.5], ["blur(10px) grayscale(100%)", "blur(0px) grayscale(0%)"]);

    // Responsive Image Styles
    const imgStyle = "w-full invert opacity-80 object-contain";
    const containerStyle = "absolute z-20 w-24 md:w-48 pointer-events-none";

    // Adjusted positions for mobile
    const mobileXOffset = 60;

    return (
        <section ref={sectionRef} className="relative min-h-[90vh] md:min-h-[120vh] w-full flex items-center justify-center overflow-hidden py-24 md:py-32 bg-black">

            {/* NUCLEUS TEXT */}
            <div className="relative z-30 text-center mix-blend-screen pointer-events-auto">
                <h2 className="text-[3.5rem] md:text-[8rem] leading-[0.8] font-bebas text-white transform -rotate-3 tracking-tighter mix-blend-difference selection:text-[#ccff00]">
                    BUILT WITH<br />
                    <span className="text-[#ccff00]">THE BEST</span>
                </h2>
            </div>

            {/* ORBITING BRANDS */}
            <motion.div className={containerStyle} style={{ y: spreadYTop, x: useTransform(progress, [0, 1], [0, isMobile ? -mobileXOffset : -180]), opacity, filter }}>
                <img src="/nike.png" alt="Nike" className={imgStyle} />
            </motion.div>

            <motion.div className={containerStyle} style={{ y: spreadYTop, x: useTransform(progress, [0, 1], [0, isMobile ? mobileXOffset : 180]), opacity, filter }}>
                <img src="/panatta.png" alt="Panatta" className={imgStyle} />
            </motion.div>

            <motion.div className={containerStyle} style={{ x: spreadXLeft, opacity, filter }}>
                <img src="/nautilus.png" alt="Nautilus" className={imgStyle} />
            </motion.div>

            <motion.div className={containerStyle} style={{ x: spreadXRight, opacity, filter }}>
                <img src="/real-leader.png" alt="Real Leader" className={imgStyle} />
            </motion.div>

            <motion.div className={containerStyle} style={{ y: spreadYBottom, x: useTransform(progress, [0, 1], [0, isMobile ? -mobileXOffset : -180]), opacity, filter }}>
                <img src="/shua.png" alt="Shua" className={imgStyle} />
            </motion.div>

            <motion.div className={containerStyle} style={{ y: spreadYBottom, x: useTransform(progress, [0, 1], [0, isMobile ? mobileXOffset : 180]), opacity, filter }}>
                <img src="/booty-builder.png" alt="Booty Builder" className={imgStyle} />
            </motion.div>

        </section>
    );
}

// Zones code removed in favor of SmartZones component

function LoadingSequence() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{
                x: '100%',
                y: '-100%',
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <img
                    src="/logo.svg"
                    alt="Woohoo Logo"
                    className="w-full h-full object-contain"
                />
            </motion.div>
        </motion.div>
    )
}
