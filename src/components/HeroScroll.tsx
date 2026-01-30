'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 220;
const FRAME_PATH = '/intro/ezgif-frame-';
const FRAME_EXT = '.jpg';

export default function HeroScroll({ onFinish }: { onFinish?: (finished: boolean) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // ✅ useScroll MUST live with the DOM ref
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    });

    // --- Preload Frames ---
    useEffect(() => {
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
    }, []);

    // --- Canvas Renderer ---
    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

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
    }, [isLoaded, images, smoothProgress]);

    // --- Text logic ---
    // Finish text/overlay transitions by 0.85 as well
    const textOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
    const overlayOpacity = useTransform(smoothProgress, [0.65, 0.85], [0, 1]);
    const scrollHintOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    // Notify parent when sequence is effectively "finished"
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            if (v > 0.9 && onFinish) onFinish(true);
            else if (v < 0.9 && onFinish) onFinish(false);
        });
        return () => unsubscribe();
    }, [smoothProgress, onFinish]);

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">

                {/* Canvas */}
                <div className="absolute inset-0 z-0">
                    <canvas ref={canvasRef} className="w-full h-full" />
                    <motion.div
                        className="absolute inset-0 bg-black/40"
                        style={{ opacity: overlayOpacity }}
                    />
                </div>

                {/* Text */}
                <motion.div
                    className="relative z-10 w-full h-full flex items-center pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    <div className="container mx-auto px-6 md:px-12 flex flex-col justify-center items-center h-full">
                        <div className="max-w-5xl text-center pointer-events-auto">
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
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Hint */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest"
                    style={{ opacity: scrollHintOpacity }}
                >
                    Scroll to Play
                </motion.div>

            </div>
        </section>
    );
}
