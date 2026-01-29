'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface RecoveryZoneData {
    id: number;
    title: string;
    description: string;
    images: string[];
}

const recoveryZones: RecoveryZoneData[] = [
    {
        id: 1,
        title: "SAUNA",
        description: "Experience the detoxifying power of our premium sauna. Relax your muscles, improve circulation, and rejuvenate your mind and body after a workout.",
        images: ["/recovery/sauna1.jpeg", "/recovery/sauna2.jpeg"]
    },
    {
        id: 2,
        title: "INFRARED - RED LIGHT THERAPY",
        description: "Harness the benefits of infrared technology. Reduce inflammation, enhance skin health, and accelerate muscle recovery with targeted red light therapy.",
        images: ["/recovery/infrared1.jpeg", "/recovery/infrared2.jpeg"]
    },
    {
        id: 3,
        title: "STEAM",
        description: "Immerse yourself in our soothing steam room. Clear your respiratory system, hydrate your skin, and find deep relaxation in the embrace of warm steam.",
        images: ["/recovery/steam1.jpeg"]
    },
    {
        id: 4,
        title: "ICE BATH",
        description: "Challenge your resilience with our cold plunge. Boost your immune system, reduce muscle soreness, and invigorate your senses with this powerful recovery tool.",
        images: ["/recovery/ice1.jpeg", "/recovery/ice2.jpeg", "/recovery/ice3.jpeg"]
    }
];

const Carousel = ({ images, title }: { images: string[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden group bg-neutral-900 border border-neutral-800">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-full h-full bg-neutral-900 relative">
                        <img
                            src={images[currentIndex]}
                            alt={`${title} ${currentIndex + 1}`}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur text-white flex items-center justify-center rounded-full hover:bg-[#ccff00] hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur text-white flex items-center justify-center rounded-full hover:bg-[#ccff00] hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
            >
                <FaChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-[#ccff00] w-6' : 'bg-white/50 hover:bg-white'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default function RecoveryZones() {
    return (
        <section className="w-full bg-black py-24 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.h3
                        className="text-[#ccff00] font-bold tracking-[0.2em] mb-4 text-sm md:text-base uppercase"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Recharge & Reset
                    </motion.h3>
                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white tracking-widest leading-none"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        RECOVERY ZONES
                    </motion.h2>
                </div>

                <div className="space-y-24 md:space-y-32">
                    {recoveryZones.map((zone, index) => {
                        const isEven = index % 2 === 0;
                        // Mobile: Always Image Top, Text Bottom (Flex Col)
                        // Desktop: Alternating (Flex Row vs Flex Row Reverse)
                        // Actually Flex Col is default, md:flex-row or md:flex-row-reverse

                        return (
                            <motion.div
                                key={zone.id}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Image Side */}
                                <div className="w-full md:w-1/2">
                                    <Carousel images={zone.images} title={zone.title} />
                                </div>

                                {/* Text Side */}
                                <div className="w-full md:w-1/2 text-center md:text-left">
                                    <h3 className="text-3xl md:text-5xl font-bebas text-white mb-6 uppercase tracking-wide">
                                        <span className="text-[#ccff00]">0{index + 1}.</span> {zone.title}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                                        {zone.description}
                                    </p>

                                    {/* Decorative Line */}
                                    <div className={`h-1 w-24 bg-[#ccff00] mt-8 mx-auto md:mx-0 ${!isEven ? 'md:ml-auto md:mr-0' : ''}`} />
                                    {/* Correction: The line should align with text. If text is left aligned on desktop, line starts at left.
                                        Wait, I centered text on mobile.
                                        On desktop:
                                        Even (Left Image, Right Text): Text aligned Left. Line starts Left.
                                        Odd (Right Image, Left Text): Text aligned Left ?? Usually alternating layout aligns text towards center or keeps it left?
                                        Let's keep text left-aligned on desktop for readability, or align it towards the image?
                                        "Right Text" -> Left Aligned.
                                        "Left Text" -> Right Aligned? or Left Aligned? 
                                        Standard is usually Left Aligned text.
                                        Let's stick to valid left alignment for text block on desktop.
                                     */}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
