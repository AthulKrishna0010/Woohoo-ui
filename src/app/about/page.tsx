'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';

// --- Shared Components ---

const FadeInLeft = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

// --- Page Component ---

export default function AboutPage() {
    return (
        <div className="bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black overflow-x-hidden">
            <Navbar show={true} />

            {/* 1. HERO SECTION */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/about-hero.JPG"
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                    {/* Gradient Overlay for Fade Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                </div>

                <div className="relative z-20 container mx-auto px-4 md:px-8 flex flex-col items-start justify-center h-full pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-[#ccff00] tracking-[0.2em] text-sm md:text-base mb-4 font-bold uppercase">
                            Indiranagar's New Hub
                        </h2>
                        <h1 className="text-7xl md:text-[10rem] leading-[0.8] font-bebas text-white mix-blend-difference">
                            PURE<br />
                            ENERGY
                        </h1>
                        <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-lg border-l-4 border-[#ccff00] pl-6">
                            9,000 SQ FT OF DEDICATED TRAINING SPACE DESIGNED FOR SERIOUS RESULTS.
                        </p>
                    </motion.div>
                </div>

                {/* Big decorative letter 'W' in background */}
                <motion.div
                    className="absolute -right-20 bottom-0 text-[30rem] font-bebas text-neutral-900 -z-10 select-none opacity-50"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    W
                </motion.div>
            </section>


            {/* 2. ZIG-ZAG FEATURE SECTIONS */}
            <div className="py-24 space-y-32">

                {/* BLOCK 1: ELITE EQUIPMENT (Text Left, Image Right) */}
                <section className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10">
                        <FadeInLeft>
                            <span className="text-[#ccff00] font-bebas text-xl tracking-widest">FORMING A HABIT</span>
                            <h2 className="text-5xl md:text-7xl font-bebas text-white mt-2 mb-8">
                                ELITE<br />EQUIPMENT
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                6,000 sq ft of elite equipment from Panatta, Nautilus, Real Leader, Shua, Booty Builder, and Nike.
                                We don't compromise on quality because you shouldn't compromise on your results.
                            </p>
                            <button className="border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00] text-white px-8 py-3 transition-colors duration-300 uppercase tracking-widest text-sm font-bold">
                                Explorer Gear
                            </button>
                        </FadeInLeft>
                    </div>

                    <div className="relative aspect-[4/5] md:aspect-square">
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-neutral-900 border border-neutral-800 relative overflow-hidden group">
                            <img
                                src="/image.png"
                                alt="Elite Equipment"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* <img src="/elite-equipment.jpg" alt="Elite Equipment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> */}
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-full h-full border border-[#ccff00]/20 -z-10" />
                    </div>
                </section>


                {/* BLOCK 2: SMART ZONES (Image Left, Text Right) */}
                <section className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/5] md:aspect-square order-2 md:order-1">
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-neutral-900 border border-neutral-800 relative overflow-hidden group">
                            <img
                                src="/smart-zone.JPG"
                                alt="Smart Zones"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -left-10 w-full h-full border border-[#ccff00]/20 -z-10" />
                    </div>

                    <div className="relative z-10 order-1 md:order-2">
                        <FadeInUp>
                            <span className="text-[#ccff00] font-bebas text-xl tracking-widest">THE NEXT LEVEL</span>
                            <h2 className="text-5xl md:text-7xl font-bebas text-white mt-2 mb-8">
                                SMART<br />ZONES
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Split into smart training zones for effortless flow. From Panatta’s machines to dedicated recovery,
                                yoga, and functional zones, every detail has been built to help you train smarter and stronger.
                            </p>
                            <button className="border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00] text-white px-8 py-3 transition-colors duration-300 uppercase tracking-widest text-sm font-bold">
                                View Zones
                            </button>
                        </FadeInUp>
                    </div>
                </section>


                {/* BLOCK 3: COMMUNITY (Text Left, Image Right) */}
                <section className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10">
                        <FadeInLeft>
                            <span className="text-[#ccff00] font-bebas text-xl tracking-widest">BELONGING</span>
                            <h2 className="text-5xl md:text-7xl font-bebas text-white mt-2 mb-8">
                                VIBRANT<br />COMMUNITY
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                At WooHoo, fitness isn’t just about lifting weights — it’s about belonging to a vibrant community
                                that thrives on discipline, fun, and progress. Whether you’re a beginner or an athlete,
                                you’ll find the support to push your limits.
                            </p>
                            <button className="border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00] text-white px-8 py-3 transition-colors duration-300 uppercase tracking-widest text-sm font-bold">
                                Join Us
                            </button>
                        </FadeInLeft>
                    </div>

                    <div className="relative aspect-[4/5] md:aspect-square">
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-neutral-900 border border-neutral-800 relative overflow-hidden group">
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-bebas text-xl">
                                <img
                                    src="/vibrant.JPG"
                                    alt="Vibrant Community"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* <img src="/community.jpg" alt="Community" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> */}
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-full h-full border border-[#ccff00]/20 -z-10" />
                    </div>
                </section>

            </div>


            {/* 3. PHILOSOPHY / INTRO TEXT OVERLAY SECTION */}
            <section className="relative py-40 overflow-hidden">
                {/* Background Huge Letter 'O' */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] md:text-[50rem] font-bebas text-neutral-900/40 select-none z-0">
                    O
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeInUp>
                        <h3 className="text-3xl md:text-5xl font-bebas text-white mb-12">
                            MORE THAN <span className="text-[#ccff00]">JUST A GYM</span>
                        </h3>
                        <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            "WooHoo Health Club is Bangalore’s new hub for serious strength training, community,
                            and results. Located in the heart of Indiranagar, our facilities are designed for those
                            who want world-class equipment, expert guidance, and a motivating atmosphere."
                        </p>
                    </FadeInUp>
                </div>
            </section>

            {/* 4. FOOTER / CTA */}
            <section className="relative h-[60vh] flex items-center justify-center bg-neutral-900">
                <div className="absolute inset-0 z-0 opacity-40">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/woohoo.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900/50 to-black"></div>
                </div>

                <div className="relative z-10 text-center">
                    <FadeInUp>
                        <h2 className="text-6xl md:text-9xl font-bebas text-white mb-8">
                            PUSH YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-white">LIMITS</span>
                        </h2>
                        <a href="/contact" className="inline-block bg-[#ccff00] text-black font-bebas text-2xl px-12 py-4 rounded hover:bg-white hover:scale-105 transition-all duration-300">
                            START TRAINING TODAY
                        </a>
                    </FadeInUp>
                </div>
            </section>

        </div>
    );
}
