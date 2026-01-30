'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 220;
const FRAME_PATH = '/intro/ezgif-frame-';
const FRAME_EXT = '.jpg';

export default function HeroScroll({ onFinish, startVideo = false }: { onFinish?: (finished: boolean) => void; startVideo?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Initial Mobile Check
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ✅ useScroll MUST live with the DOM ref using a taller container for desktop
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    });

    // --- Preload Frames (ONLY DESKTOP) ---
    useEffect(() => {
        if (isMobile) return; // Skip image loading on mobile

        let loaded = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `${FRAME_PATH}${i.toString().padStart(3, '0')}${FRAME_EXT}`;
            img.onload = () => {
                loaded++;
                if (loaded === FRAME_COUNT) setIsLoaded(true);
            };
            imgs.push(img);
        }

        setImages(imgs);
    }, [isMobile]);

    // --- Canvas Renderer (ONLY DESKTOP) ---
    useEffect(() => {
        if (isMobile || !isLoaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = (val: number) => {
            // Finish animation by 85% of scroll, holding the last frame for the remaining 15%
            const animationProgress = Math.min(val / 0.85, 1);

            const frame = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(animationProgress * (FRAME_COUNT - 1)))
            );

            const img = images[frame];
            if (!img) return;

            const parent = canvas.parentElement!;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;

            let w, h, x, y;

            if (canvasRatio > imgRatio) {
                w = canvas.width;
                h = canvas.width / imgRatio;
                x = 0;
                y = (canvas.height - h) / 2;
            } else {
                w = canvas.height * imgRatio;
                h = canvas.height;
                x = (canvas.width - w) / 2;
                y = 0;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, w, h);
        };

        render(smoothProgress.get());
        const unsub = smoothProgress.on('change', render);

        return () => unsub();
    }, [isMobile, isLoaded, images, smoothProgress]);

    // --- Text logic ---
    // Finish text/overlay transitions by 0.85 as well (Desktop)
    // On mobile, these should just be visible immediately or animate in on mount?
    // Let's keep them tied to scroll for desktop, and fixed for mobile.

    // Desktop Transforms
    const textOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
    const overlayOpacity = useTransform(smoothProgress, [0.65, 0.85], [0, 1]);
    const scrollHintOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    // Notify parent when sequence is effectively "finished"
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            // On Mobile, smoothProgress works if user scrolls past h-screen.
            // On Desktop, smoothProgress works if user scrolls past h-[500vh].
            if (v > 0.9 && onFinish) onFinish(true);
            else if (v < 0.9 && onFinish) onFinish(false);
        });
        return () => unsubscribe();
    }, [smoothProgress, onFinish]);

    // Height: Desktop 500vh, Mobile 100vh
    // On Mobile, the video plays. When user scrolls, they scroll PAST the video section.

    // --- Mobile Video Logic ---
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showMobileText, setShowMobileText] = useState(false);

    // Watch startVideo prop
    useEffect(() => {
        if (isMobile && startVideo && videoRef.current) {
            const vid = videoRef.current;
            vid.play().catch(e => console.log("Video play failed:", e));

            // Set fallback timers based on duration if available
            // This ensures text/finish happens even if timeUpdate events are throttled
            if (vid.duration && vid.duration !== Infinity && vid.duration > 0) {
                const textDelay = Math.max(0, (vid.duration - 2) * 1000);
                setTimeout(() => setShowMobileText(true), textDelay);

                setTimeout(() => {
                    if (onFinish) onFinish(true);
                }, vid.duration * 1000);
            }
        }
    }, [isMobile, startVideo, onFinish]);

    const handleVideoTimeUpdate = () => {
        if (!videoRef.current) return;
        const { currentTime, duration } = videoRef.current;

        // Show text 2 seconds before end
        if (duration > 0 && duration !== Infinity && currentTime >= duration - 2) {
            if (!showMobileText) setShowMobileText(true);
        }
    };

    const handleVideoLoadedMetadata = () => {
        // Metadata loaded. 
        // We rely on the startVideo effect or timeUpdate to handle logic.
    };

    const handleVideoEnded = () => {
        // Ensure text is visible and notify parent
        setShowMobileText(true);
        if (onFinish) onFinish(true);
    };

    // Safety fallback for Mobile: Ensure text appears even if video fails/stalls
    useEffect(() => {
        if (isMobile && startVideo) {
            const timer = setTimeout(() => {
                setShowMobileText((prev) => {
                    if (!prev) {
                        if (onFinish) onFinish(true);
                        return true;
                    }
                    return prev;
                });
            }, 6000); // 6 seconds safety timeout
            return () => clearTimeout(timer);
        }
    }, [isMobile, onFinish, startVideo]);

    return (
        <section
            ref={containerRef}
            className={`relative bg-black ${isMobile ? 'h-screen' : 'h-[500vh]'}`}
        >
            <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">

                {/* VISUALS LAYER */}
                <div className="absolute inset-0 z-0">
                    {isMobile ? (
                        <>
                            <video
                                ref={videoRef}
                                src="/intro.mp4"
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-80"
                                onTimeUpdate={handleVideoTimeUpdate}
                                onLoadedMetadata={handleVideoLoadedMetadata}
                                onEnded={handleVideoEnded}
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </>
                    ) : (
                        <>
                            <canvas ref={canvasRef} className="w-full h-full" />
                            <motion.div
                                className="absolute inset-0 bg-black/40"
                                style={{ opacity: overlayOpacity }}
                            />
                        </>
                    )}
                </div>

                {/* TEXT LAYER */}
                <motion.div
                    className="relative z-10 w-full h-full flex items-center pointer-events-none"
                    // On Mobile, outer layer is always visible (checking inner logic).
                    // On Desktop, use scroll brightness.
                    style={{ opacity: isMobile ? 1 : textOpacity }}
                >
                    <div className="container mx-auto px-6 md:px-12 flex flex-col justify-center items-center h-full">
                        {/* Mobile Fade In Wrapper */}
                        <motion.div
                            initial={isMobile ? { opacity: 0, y: 30 } : {}}
                            animate={isMobile ? { opacity: showMobileText ? 1 : 0, y: showMobileText ? 0 : 30 } : {}}
                            transition={{ duration: 1 }}
                            className="max-w-5xl text-center pointer-events-auto"
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-12 h-[2px] bg-[#ccff00]" />
                                <span className="text-[#ccff00] text-sm tracking-[0.3em] font-semibold uppercase font-inter">Indiranagar</span>
                            </div>

                            <h1 className="leading-[0.85] font-normal uppercase tracking-tighter mb-8 font-bebas flex flex-col items-center">
                                {/* Dominant 9000 */}
                                <span className="block text-white text-7xl md:text-[10rem] xl:text-[12rem] mb-2 md:mb-4">9,000 SQ FT</span>

                                {/* Supporting Lines */}
                                <span className="block text-white text-4xl md:text-[6rem] xl:text-[7rem]" style={{ textShadow: '4px 4px 0px rgba(255,255,255,0.2)' }}>OF PURE</span>
                                <span className="block text-[#ccff00] text-5xl md:text-[7rem] xl:text-[8rem]">ENERGY</span>
                            </h1>

                            <div className="w-full flex justify-center">
                                <button className="pointer-events-auto relative group overflow-hidden px-8 py-3 md:px-12 md:py-5 bg-[#ccff00] text-black text-xl md:text-2xl uppercase tracking-wider font-bebas">
                                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">Join Now</span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Hint (Desktop Only) */}
                {!isMobile && (
                    <motion.div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest"
                        style={{ opacity: scrollHintOpacity }}
                    >
                        Scroll to Play
                    </motion.div>
                )}

            </div>
        </section>
    );
}
