'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import SmartZones from './SmartZones';


import HeroScroll from './HeroScroll';
import Navbar from './Navbar';
import RecoveryZones from './RecoveryZones';
import Testimonials from './Testimonials';

import IntroLoader from './IntroLoader';

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
    // const heroScrollRef = useRef<HTMLDivElement>(null);
    // const { scrollYProgress } = useScroll({
    //     target: heroScrollRef,
    //     offset: ["start start", "end end"]
    // });

    const [isHeroFinished, setIsHeroFinished] = useState(false);
    const [hideNavbarInZones, setHideNavbarInZones] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    // Check Session Storage for Intro
    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('woohoo_intro_seen');
        if (hasSeenIntro) {
            setShowLoader(false);
            setIsHeroFinished(true); // If intro seen, navbar should be ready (sticky behavior)
        }
    }, []);

    const handleIntroComplete = () => {
        setShowLoader(false);
        sessionStorage.setItem('woohoo_intro_seen', 'true');
    };

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

    return (
        <div className="relative w-full bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black">

            {/* INTRO LOADER (Insane Load Animation) */}
            <AnimatePresence>
                {showLoader && (
                    <IntroLoader onComplete={handleIntroComplete} />
                )}
            </AnimatePresence>

            {/* 1. HERO SCROLL LAYER (z-10) */}
            {/* This component handles its own height (400vh) and sticky behavior */}
            <div className="relative z-10 w-full bg-black">
                <HeroScroll
                    onFinish={(finished) => {
                        // Sticky behavior: Only set to TRUE. Once visible, it stays visible (subject to scroll hide).
                        if (finished) setIsHeroFinished(true);
                    }}
                    startVideo={!showLoader}
                />
            </div>

            {/* 2. SCROLL SPACER */}
            {/* ... comments removed for brevity ... */}


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
