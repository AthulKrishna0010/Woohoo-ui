'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaCheck } from "react-icons/fa";
import Link from 'next/link';

function CTAButton() {
    return (
        <div className="mt-8">
            <Link href="/membership" className="pointer-events-auto inline-block relative group overflow-hidden px-8 py-3 bg-[#ccff00] text-black text-xl uppercase tracking-wider font-bebas">
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">View Membership</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
        </div>
    );
}

// Configuration
const SEQ_1_COUNT = 120;
const SEQ_1_PATH = '/pull-booty/ezgif-frame-';
const SEQ_2_COUNT = 117;
const SEQ_2_PATH = '/booty-pec/ezgif-frame-';
const SEQ_3_COUNT = 117;
const SEQ_3_PATH = '/pec-cardio/ezgif-frame-';
const SEQ_4_COUNT = 118;
const SEQ_4_PATH = '/cardio-curl/ezgif-frame-';
const SEQ_5_COUNT = 117;
const SEQ_5_PATH = '/curl-iron/ezgif-frame-';
const FRAME_EXT = '.jpg';
const TOTAL_FRAMES = SEQ_1_COUNT + SEQ_2_COUNT + SEQ_3_COUNT + SEQ_4_COUNT + SEQ_5_COUNT;

export default function SmartZones() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track scroll progress within the tall container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll progress for smoother playback
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    // --- Preload Images ---
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        // Load Sequence 1
        for (let i = 1; i <= SEQ_1_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${SEQ_1_PATH}${paddedIndex}${FRAME_EXT}`;
            img.onload = checkLoad;
            imgs.push(img);
        }

        // Load Sequence 2
        for (let i = 1; i <= SEQ_2_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${SEQ_2_PATH}${paddedIndex}${FRAME_EXT}`;
            img.onload = checkLoad;
            imgs.push(img);
        }

        // Load Sequence 3
        for (let i = 1; i <= SEQ_3_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${SEQ_3_PATH}${paddedIndex}${FRAME_EXT}`;
            img.onload = checkLoad;
            imgs.push(img);
        }

        // Load Sequence 4
        for (let i = 1; i <= SEQ_4_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${SEQ_4_PATH}${paddedIndex}${FRAME_EXT}`;
            img.onload = checkLoad;
            imgs.push(img);
        }

        // Load Sequence 5
        for (let i = 1; i <= SEQ_5_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${SEQ_5_PATH}${paddedIndex}${FRAME_EXT}`;
            img.onload = checkLoad;
            imgs.push(img);
        }

        function checkLoad() {
            loadedCount++;
            if (loadedCount === TOTAL_FRAMES) {
                setIsLoaded(true);
            }
        }

        setImages(imgs);
    }, []);

    // --- Render Frame on Canvas ---
    useEffect(() => {
        const render = (val: number) => {
            if (!isLoaded || !canvasRef.current || images.length === 0) return;

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            // Map progress (0-1) to frame index (0-TOTAL_FRAMES-1)
            let frameIndex = Math.floor(val * (TOTAL_FRAMES - 1));
            if (frameIndex < 0) frameIndex = 0;
            if (frameIndex >= TOTAL_FRAMES) frameIndex = TOTAL_FRAMES - 1;

            const img = images[frameIndex];

            // Handle resize / aspect ratio fit (cover)
            const canvas = canvasRef.current;
            const parent = canvas.parentElement;

            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;

                // Calculate "cover" dimensions
                const imgRatio = img.width / img.height;
                const canvasRatio = canvas.width / canvas.height;

                let renderW, renderH, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    renderW = canvas.width;
                    renderH = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - renderH) / 2;
                } else {
                    renderW = canvas.height * imgRatio;
                    renderH = canvas.height;
                    offsetX = (canvas.width - renderW) / 2;
                    offsetY = 0;
                }

                ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
            }
        };

        // Render initial frame
        render(smoothProgress.get());

        // Subscribe to changes
        const unsubscribe = smoothProgress.on("change", (v) => {
            render(v);
        });

        return () => unsubscribe();
    }, [isLoaded, images, smoothProgress]);

    // --- Text Opacity Transforms ---

    // Entry Title: 0-5%
    const titleOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
    const entryBgOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

    // Pull Party: 0 - 20.4% (Text visible ~5-18%)
    const pullPartyOpacity = useTransform(smoothProgress, [0.05, 0.1, 0.15, 0.18], [0, 1, 1, 0]);
    const pullPartyY = useTransform(smoothProgress, [0.05, 0.1], [50, 0]);

    // Booty Station: 20.4 - 40.2% (Text visible ~22-38%)
    const bootyStationOpacity = useTransform(smoothProgress, [0.22, 0.25, 0.35, 0.38], [0, 1, 1, 0]);
    const bootyStationY = useTransform(smoothProgress, [0.22, 0.25], [50, 0]);

    // Pec City: 40.2 - 60.1% (Text visible ~42-58%)
    const pecCityOpacity = useTransform(smoothProgress, [0.42, 0.45, 0.55, 0.58], [0, 1, 1, 0]);
    const pecCityY = useTransform(smoothProgress, [0.42, 0.45], [50, 0]);

    // Cardio Zone: 60.1 - 80.1% (Text visible ~62-78%)
    const cardioZoneOpacity = useTransform(smoothProgress, [0.62, 0.65, 0.75, 0.78], [0, 1, 1, 0]);
    const cardioZoneY = useTransform(smoothProgress, [0.62, 0.65], [50, 0]);

    // Curl Corner: 80.1 - 100% (Text visible ~82-98%)
    const curlCornerOpacity = useTransform(smoothProgress, [0.82, 0.85, 0.95, 0.98], [0, 1, 1, 0]);
    const curlCornerY = useTransform(smoothProgress, [0.82, 0.85], [50, 0]);

    // Iron Yard: End (Visible at very end)
    const ironYardOpacity = useTransform(smoothProgress, [0.99, 1, 1, 1], [0, 1, 1, 1]);
    const ironYardY = useTransform(smoothProgress, [0.99, 1], [50, 0]);


    return (
        <section ref={containerRef} className="relative h-[1200vh] bg-black">

            {/* Loading Overlay */}
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {/* Sticky Container */}
            <div className={`sticky top-0 h-screen w-full overflow-hidden ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>

                {/* 1. Canvas Layer (Background) */}
                <div className="absolute inset-0 z-0">
                    <canvas ref={canvasRef} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                </div>

                {/* 2. Entry Black Background Layer */}
                <motion.div
                    style={{ opacity: entryBgOpacity }}
                    className="absolute inset-0 z-10 bg-black pointer-events-none"
                />

                {/* 3. Text Overlays (Foreground) */}
                <div className="relative z-20 w-full h-full pointer-events-none">

                    {/* SECTION TITLE */}
                    <motion.div
                        style={{ opacity: titleOpacity }}
                        className="absolute inset-0 flex items-center justify-center p-4"
                    >
                        <h2 className="text-6xl md:text-9xl font-bebas text-white uppercase tracking-tighter text-center">
                            Smart Training <br />
                            <span className="text-[#ccff00]">Zones</span>
                        </h2>
                    </motion.div>

                    {/* PULL PARTY */}
                    <motion.div
                        style={{ opacity: pullPartyOpacity, y: pullPartyY }}
                        className="absolute inset-0 flex flex-col justify-center md:items-start pl-6 md:pl-24 pr-6 pb-24 md:pb-0"
                    >
                        <div className="max-w-4xl">
                            <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.8] font-bebas text-white tracking-tighter mb-4 md:mb-6">
                                PULL PARTY
                            </h2>
                            <h3 className="text-xl md:text-3xl font-bebas text-[#ccff00] uppercase tracking-widest mb-8">
                                Complete Back Domination
                            </h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    "Precision Lat Pulldowns",
                                    "Heavy Compound Rows",
                                    "Rear Delt Isolation"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80">
                                        <FaCheck className="text-[#ccff00] text-lg md:text-xl shrink-0" />
                                        <span className="text-lg md:text-2xl font-bebas tracking-wide uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <CTAButton />
                        </div>
                    </motion.div>

                    {/* BOOTY STATION */}
                    <motion.div
                        style={{ opacity: bootyStationOpacity, y: bootyStationY }}
                        className="absolute inset-0 flex flex-col justify-center items-end pr-6 md:pr-24 pl-6 pb-24 md:pb-0 text-right"
                    >
                        <div className="max-w-4xl flex flex-col items-end">
                            <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.8] font-bebas text-white tracking-tighter mb-4 md:mb-6">
                                BOOTY<br />STATION
                            </h2>
                            <h3 className="text-xl md:text-3xl font-bebas text-[#ccff00] uppercase tracking-widest mb-8">
                                Glute Focused Engineering
                            </h3>
                            <div className="flex flex-col gap-4 items-end">
                                {[
                                    "Hip Thrust Platforms",
                                    "Targeted Abductors",
                                    "Squat Variations"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80 flex-row-reverse">
                                        <FaCheck className="text-[#ccff00] text-lg md:text-xl shrink-0" />
                                        <span className="text-lg md:text-2xl font-bebas tracking-wide uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <CTAButton />
                        </div>
                    </motion.div>

                    {/* PEC CITY */}
                    <motion.div
                        style={{ opacity: pecCityOpacity, y: pecCityY }}
                        className="absolute inset-0 flex flex-col justify-center md:items-start pl-6 md:pl-24 pr-6 pb-24 md:pb-0"
                    >
                        <div className="max-w-4xl">
                            <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.8] font-bebas text-white tracking-tighter mb-4 md:mb-6">
                                PEC CITY
                            </h2>
                            <h3 className="text-xl md:text-3xl font-bebas text-[#ccff00] uppercase tracking-widest mb-8">
                                Chest Paradise
                            </h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    "Incline & Flat Presses",
                                    "High Tension Pec Flyes",
                                    "Plate Loaded Machines"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80">
                                        <FaCheck className="text-[#ccff00] text-lg md:text-xl shrink-0" />
                                        <span className="text-lg md:text-2xl font-bebas tracking-wide uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <CTAButton />
                        </div>
                    </motion.div>

                    {/* CARDIO ZONE */}
                    <motion.div
                        style={{ opacity: cardioZoneOpacity, y: cardioZoneY }}
                        className="absolute inset-0 flex flex-col justify-center items-end pr-6 md:pr-24 pl-6 pb-24 md:pb-0 text-right"
                    >
                        <div className="max-w-4xl flex flex-col items-end">
                            <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.8] font-bebas text-white tracking-tighter mb-4 md:mb-6">
                                CARDIO<br />ZONE
                            </h2>
                            <h3 className="text-xl md:text-3xl font-bebas text-[#ccff00] uppercase tracking-widest mb-8">
                                Endurance & Speed
                            </h3>
                            <div className="flex flex-col gap-4 items-end">
                                {[
                                    "Treadmills & Ellipticals",
                                    "Rowers & Stair Climbers",
                                    "Stretch & Cycling Machines"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80 flex-row-reverse">
                                        <FaCheck className="text-[#ccff00] text-lg md:text-xl shrink-0" />
                                        <span className="text-lg md:text-2xl font-bebas tracking-wide uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <CTAButton />
                        </div>
                    </motion.div>

                    {/* CURL CORNER */}
                    <motion.div
                        style={{ opacity: curlCornerOpacity, y: curlCornerY }}
                        className="absolute inset-0 flex flex-col justify-center md:items-start pl-6 md:pl-24 pr-6 pb-24 md:pb-0"
                    >
                        <div className="max-w-4xl">
                            <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.8] font-bebas text-white tracking-tighter mb-4 md:mb-6">
                                CURL CORNER
                            </h2>
                            <h3 className="text-xl md:text-3xl font-bebas text-[#ccff00] uppercase tracking-widest mb-8">
                                Arm Definition
                            </h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    "Biceps & Triceps",
                                    "Wrists & Forearms",
                                    "Detail Work"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80">
                                        <FaCheck className="text-[#ccff00] text-lg md:text-xl shrink-0" />
                                        <span className="text-lg md:text-2xl font-bebas tracking-wide uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <CTAButton />
                        </div>
                    </motion.div>

                    {/* IRON YARD */}
                    <motion.div
                        style={{ opacity: ironYardOpacity, y: ironYardY }}
                        className="absolute inset-0 flex flex-col justify-center items-end pr-6 md:pr-24 pl-6 pb-24 md:pb-0 text-right"
                    >
                        <div className="max-w-4xl flex flex-col items-end">
                            <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.8] font-bebas text-white tracking-tighter mb-4 md:mb-6">
                                IRON<br />YARD
                            </h2>
                            <h3 className="text-xl md:text-3xl font-bebas text-[#ccff00] uppercase tracking-widest mb-8">
                                Heavy Metal Power
                            </h3>
                            <div className="flex flex-col gap-4 items-end">
                                {[
                                    "Free Weights & Barbells",
                                    "Plates & Benches",
                                    "Power Racks"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80 flex-row-reverse">
                                        <FaCheck className="text-[#ccff00] text-lg md:text-xl shrink-0" />
                                        <span className="text-lg md:text-2xl font-bebas tracking-wide uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <CTAButton />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
