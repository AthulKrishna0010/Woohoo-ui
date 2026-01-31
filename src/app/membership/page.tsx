'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { IoDiamond } from 'react-icons/io5';

// --- Components ---

const GlassCard = ({
    title,
    subtitle,
    price,
    buttonText,
    isBestValue = false,
    delay = 0,
    className = ""
}: {
    title: string,
    subtitle?: string,
    price: string,
    buttonText: string,
    isBestValue?: boolean,
    delay?: number,
    className?: string
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={`relative group p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between hover:bg-white/[0.07] hover:border-[#ccff00]/40 hover:shadow-[0_0_40px_rgba(204,255,0,0.1)] transition-all duration-500 min-h-[300px] ${className}`}
        >
            {/* Hover Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-b from-[#ccff00] to-transparent opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" />

            {/* Best Value Badge */}
            {isBestValue && (
                <div className="absolute top-0 right-0 bg-[#ccff00] text-black text-xs font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-widest z-10 shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                    Best Value
                </div>
            )}

            <div className="flex-grow flex flex-col justify-center">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bebas tracking-wide text-white group-hover:text-[#ccff00] transition-colors duration-300">
                        {subtitle ? `${title} • ${subtitle}` : title}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-4">
                        <span className="text-xl text-gray-400">₹</span>
                        <span className="text-5xl md:text-6xl font-bebas text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300">
                            {price}
                        </span>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="w-full relative z-10 mt-auto">
                <button className={`w-full py-4 rounded-xl font-bebas text-lg tracking-widest uppercase border transition-all duration-300 overflow-hidden relative group/btn ${isBestValue
                    ? 'bg-[#ccff00] text-black border-[#ccff00] hover:bg-white hover:border-white'
                    : 'bg-transparent text-white border-white/20 hover:border-[#ccff00] hover:text-[#ccff00]'
                    }`}>
                    <span className="relative z-10 group-hover/btn:scale-105 inline-block transition-transform duration-300">{buttonText}</span>
                    {/* Button Shine Effect */}
                    {isBestValue && (
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                    )}
                </button>
            </Link>
        </motion.div>
    );
};

const SectionHeading = ({ children, number }: { children: React.ReactNode, number: string }) => (
    <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16 relative">
        <span className="text-[#ccff00] font-bebas text-8xl md:text-9xl opacity-20 absolute -top-12 -left-4 md:-left-12 -z-10 select-none">
            {number}
        </span>
        <h2 className="text-4xl md:text-6xl font-bebas text-white relative z-10">
            {children}
        </h2>
        <div className="h-px bg-gradient-to-r from-[#ccff00] to-transparent w-full max-w-[200px] mt-2 md:mt-0" />
    </div>
);


export default function MembershipPage() {
    return (
        <div className="bg-[#050505] min-h-screen text-white font-inter selection:bg-[#ccff00] selection:text-black overflow-hidden relative">
            <Navbar show={true} />

            {/* --- Background Elements --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ccff00]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#ccff00]/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
            </div>

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden z-10">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/membership.JPG"
                        alt="Background"
                        className="w-full h-full object-cover object-center grayscale scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="container mx-auto px-4 text-center z-10 relative mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-[15vw] md:text-[180px] leading-[0.8] font-bebas text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 tracking-tighter">
                            MEMBERSHIPS
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl text-[#ccff00] font-bebas tracking-widest mt-4 uppercase"
                    >
                        Invest In Your Power
                    </motion.p>
                </div>
            </section>


            {/* --- CONTENT CONTAINER --- */}
            <div className="container mx-auto px-4 md:px-8 pb-32 relative z-10">

                {/* 1. LONG TERM */}
                <section className="mb-32">
                    <SectionHeading number="01">Long Term</SectionHeading>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* 12M */}
                        <GlassCard
                            title="12 Months"
                            subtitle="Single"
                            price="60,000"
                            buttonText="Select Plan"
                            isBestValue={true}
                            delay={0.1}
                        />
                        <GlassCard
                            title="12 Months"
                            subtitle="Couple"
                            price="115,000"
                            buttonText="Select Plan"
                            isBestValue={true}
                            delay={0.2}
                        />

                        {/* 6M */}
                        <GlassCard
                            title="6 Months"
                            subtitle="Single"
                            price="42,000"
                            buttonText="Select Plan"
                            delay={0.3}
                        />
                        <GlassCard
                            title="6 Months"
                            subtitle="Couple"
                            price="80,000"
                            buttonText="Select Plan"
                            delay={0.4}
                        />

                        {/* 3M & 1M Compact Grid */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                            <GlassCard
                                title="3 Months"
                                subtitle="Single"
                                price="28,000"
                                buttonText="Choose"
                                delay={0.1}
                            />
                            <GlassCard
                                title="3 Months"
                                subtitle="Couple"
                                price="54,000"
                                buttonText="Choose"
                                delay={0.2}
                            />
                            <GlassCard
                                title="1 Month"
                                subtitle="Single"
                                price="12,000"
                                buttonText="Choose"
                                delay={0.3}
                            />
                            <GlassCard
                                title="1 Month"
                                subtitle="Couple"
                                price="22,000"
                                buttonText="Choose"
                                delay={0.4}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. SHORT TERM */}
                <section className="mb-32">
                    <SectionHeading number="02">Short Passes</SectionHeading>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { title: "14 Day", price: "7,000", bg: "bg-white/5" },
                            { title: "7 Day", price: "5,500", bg: "bg-white/[0.03]" },
                            { title: "3 Day", price: "4,000", bg: "bg-white/[0.02]" },
                            { title: "1 Day", price: "1,700", bg: "bg-white/[0.01]" },
                        ].map((pass, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group p-6 md:p-8 rounded-2xl border border-white/10 ${pass.bg} backdrop-blur-sm hover:border-[#ccff00] hover:bg-[#ccff00]/10 transition-all cursor-pointer flex flex-col items-center justify-center text-center`}
                            >
                                <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">{pass.title} Pass</h4>
                                <div className="text-3xl md:text-5xl font-bebas text-white group-hover:text-[#ccff00] transition-colors">₹{pass.price}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. PROFESSIONAL */}
                <section>
                    <SectionHeading number="03">Pro Access</SectionHeading>
                    <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#ccff00]/50 to-transparent">
                        <div className="bg-[#0a0a0a] rounded-[22px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 text-center md:text-left">
                                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                                    <IoDiamond className="text-[#ccff00] text-3xl" />
                                    <h3 className="text-4xl md:text-5xl font-bebas text-white">Royalty <span className="text-[#ccff00]">Pass</span></h3>
                                </div>
                                <p className="text-gray-400 max-w-lg">
                                    The ultimate flexibility for fitness professionals. Train your clients at WooHoo with our exclusive monthly royalty pass.
                                </p>
                            </div>

                            <div className="relative z-10 text-right">
                                <div className="text-6xl font-bebas text-white mb-2">₹3,000<span className="text-xl text-gray-500 ml-2">/mo</span></div>
                                <Link href="/contact">
                                    <button className="bg-[#ccff00] text-black hover:bg-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                        Apply Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
