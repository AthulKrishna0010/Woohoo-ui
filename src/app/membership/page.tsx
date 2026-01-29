'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';


// --- Components ---

const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const PricingCard = ({
    title,
    subtitle,
    price,
    details,
    buttonText,
    isBestValue = false,
    className = "",
    delay = 0
}: {
    title: string,
    subtitle?: string,
    price: string,
    details: string,
    buttonText: string,
    isBestValue?: boolean,
    className?: string,
    delay?: number
}) => {
    return (
        <FadeInUp delay={delay} className={`bg-neutral-900 border ${isBestValue ? 'border-[#ccff00]' : 'border-neutral-800'} rounded-2xl p-6 md:p-8 flex flex-col justify-between group hover:border-[#ccff00]/50 transition-colors duration-300 relative overflow-hidden ${className}`}>

            {isBestValue && (
                <div className="absolute top-4 right-4 bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Best Value
                </div>
            )}

            <div>
                <h3 className="text-xl md:text-2xl font-bebas text-white mb-1">
                    {title} {subtitle && <span className="text-gray-500 mx-2">·</span>} <span className="text-gray-400 font-sans text-lg md:text-xl font-normal">{subtitle}</span>
                </h3>
                <div className="text-4xl md:text-5xl font-bebas text-[#ccff00] mb-2 mt-4">
                    ₹{price}
                </div>
                <p className="text-gray-400 text-sm mb-8">
                    {details}
                </p>
            </div>

            <Link href="/contact" className="w-full">
                <button className={`w-full py-3 border ${isBestValue ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-neutral-700 text-white hover:border-[#ccff00] hover:text-[#ccff00]'} rounded font-bebas text-lg uppercase tracking-wide transition-all duration-300`}>
                    {buttonText}
                </button>
            </Link>
        </FadeInUp>
    );
};


export default function MembershipPage() {
    return (
        <div className="bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black min-h-screen">
            <Navbar show={true} />

            {/* 1. HERO SECTION */}
            <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 text-center">
                    <img
                        src="/membership.JPG"
                        alt="Membership Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
                </div>

                <div className="relative z-20 text-center container mx-auto px-4">
                    <motion.h1
                        className="text-7xl md:text-9xl font-bebas text-white mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        MEMBERSHIPS
                    </motion.h1>
                    <motion.p
                        className="text-gray-300 text-xl max-w-lg mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Invest in yourself with flexible plans designed for every lifestyle.
                    </motion.p>
                </div>
            </section>


            {/* 2. LONG-TERM MEMBERSHIPS (BENTO GRID) */}
            <section className="container mx-auto px-4 md:px-8 py-20">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-4xl md:text-6xl font-bebas text-white">
                        Long-term <span className="text-[#ccff00]">Memberships</span>
                    </h2>
                    <div className="h-px bg-neutral-800 flex-grow mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 12 Months - Featured Large Cards */}
                    <PricingCard
                        title="12 Months"
                        subtitle="Single"
                        price="60,000"
                        details="Full access · 1 member"
                        buttonText="Join 12M Single"
                        isBestValue={true}
                        delay={0.1}
                    />
                    <PricingCard
                        title="12 Months"
                        subtitle="Couple"
                        price="115,000"
                        details="Full access · 2 members"
                        buttonText="Join 12M Couple"
                        isBestValue={true}
                        delay={0.2}
                    />

                    {/* 6 Months */}
                    <PricingCard
                        title="6 Months"
                        subtitle="Single"
                        price="42,000"
                        details="Full access · 1 member"
                        buttonText="Join 6M Single"
                        delay={0.3}
                    />
                    <PricingCard
                        title="6 Months"
                        subtitle="Couple"
                        price="80,000"
                        details="Full access · 2 members"
                        buttonText="Join 6M Couple"
                        delay={0.4}
                    />

                    {/* 3 Months */}
                    <PricingCard
                        title="3 Months"
                        subtitle="Single"
                        price="28,000"
                        details="Full access · 1 member"
                        buttonText="Join 3M Single"
                        delay={0.5}
                    />
                    <PricingCard
                        title="3 Months"
                        subtitle="Couple"
                        price="54,000"
                        details="Full access · 2 members"
                        buttonText="Join 3M Couple"
                        delay={0.6}
                    />

                    {/* 1 Month */}
                    <PricingCard
                        title="1 Month"
                        subtitle="Single"
                        price="12,000"
                        details="Full access · 1 member"
                        buttonText="Join 1M Single"
                        delay={0.7}
                    />
                    <PricingCard
                        title="1 Month"
                        subtitle="Couple"
                        price="22,000"
                        details="Full access · 2 members"
                        buttonText="Join 1M Couple"
                        delay={0.8}
                    />
                </div>
                <p className="text-gray-500 text-xs mt-6 text-right">* All prices in INR including all applicable taxes</p>
            </section>


            {/* 3. SHORT PASSES */}
            <section className="container mx-auto px-4 md:px-8 py-20 border-t border-neutral-800">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-4xl md:text-5xl font-bebas text-white">
                        Short <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Passes</span>
                    </h2>
                    <div className="h-px bg-neutral-800 flex-grow mt-2"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <PricingCard
                        title="14 Day"
                        subtitle="Pass"
                        price="7,000"
                        details="Valid for 14 consecutive days"
                        buttonText="Get 14-Day"
                        delay={0.1}
                    />
                    <PricingCard
                        title="7 Day"
                        subtitle="Pass"
                        price="5,500"
                        details="Valid for 7 consecutive days"
                        buttonText="Get 7-Day"
                        delay={0.2}
                    />
                    <PricingCard
                        title="3 Day"
                        subtitle="Pass"
                        price="4,000"
                        details="Valid for 3 consecutive days"
                        buttonText="Get 3-Day"
                        delay={0.3}
                    />
                    <PricingCard
                        title="1 Day"
                        subtitle="Pass"
                        price="1,700"
                        details="Single day access"
                        buttonText="Get 1-Day"
                        delay={0.4}
                    />
                </div>
            </section>


            {/* 4. PROFESSIONAL ACCESS */}
            <section className="container mx-auto px-4 md:px-8 py-20 border-t border-neutral-800 mb-20">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-4xl md:text-5xl font-bebas text-white">
                        Professional <span className="text-[#ccff00]">Access</span>
                    </h2>
                    <div className="h-px bg-neutral-800 flex-grow mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PricingCard
                        title="Royalty"
                        subtitle=""
                        price="3,000"
                        details="Get Monthly Royalty Pass"
                        buttonText="Get Monthly Royalty Pass"
                        isBestValue={true}
                        delay={0.1}
                    />
                    {/* Empty slots for potential future professional plans or layout balance */}
                    <div className="border border-neutral-800 rounded-2xl p-8 opacity-20 hidden md:block"></div>
                    <div className="border border-neutral-800 rounded-2xl p-8 opacity-20 hidden md:block"></div>
                </div>
            </section>


        </div>
    );
}
