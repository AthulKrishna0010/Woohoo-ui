'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviews = [
    {
        id: 1,
        text: "The atmosphere here is unlike any other gym. It pushes you to be your absolute best every single day. The community vibe is incredibly motivating.",
        name: "AJINKYA BHAGWAT"
    },
    {
        id: 2,
        text: "State-of-the-art equipment and a training environment that screams excellence. Investing in my membership here was the best decision for my fitness journey.",
        name: "RANJINI RAO"
    },
    {
        id: 3,
        text: "It’s not just a gym, it’s a lifestyle. The energy, the people, and the focus on high performance make every workout session an experience to remember.",
        name: "HUMAID SAYED"
    },
    {
        id: 4,
        text: "From the moment you walk in, you feel the difference. A true sanctuary for those serious about their gains and mental discipline.",
        name: "JAYAM VISWANATH"
    },
    {
        id: 5,
        text: "The trainers are knowledgeable and the facilities are pristine. I've never felt more supported in achieving my health goals.",
        name: "REHANA S"
    },
    {
        id: 6,
        text: "Woohoo Health Club pushes the boundaries of what a gym should be. Classic vibes mixed with modern training techniques.",
        name: "ELAHE T"
    }
];

export default function Testimonials() {
    return (
        <section className="w-full bg-black py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background Gradient/Glow for ambiance */}
            <div className="absolute inset-0 z-0">
                <img src="/testbg.png" alt="Testimonials Background" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.h3
                        className="text-[#ccff00] font-bold tracking-[0.2em] mb-4 text-sm md:text-base uppercase"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Success Stories
                    </motion.h3>
                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white tracking-widest leading-none"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        THE CHAMPIONS' CIRCLE
                    </motion.h2>
                </div>

                {/* Grid of Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between hover:border-[#ccff00]/30 transition-colors duration-300 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Top Content */}
                            <div>
                                <div className="mb-6">
                                    <FaQuoteLeft className="text-4xl text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-neutral-300 text-lg leading-relaxed font-light mb-8 italic">
                                    "{review.text}"
                                </p>
                            </div>

                            {/* Bottom Content (Name & Stars) */}
                            <div>
                                <div className="w-full h-[1px] bg-neutral-800 mb-6 group-hover:bg-[#ccff00]/20 transition-colors" />
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-white font-bebas text-xl tracking-wider">
                                        {review.name}
                                    </h4>
                                    <div className="flex gap-1 text-[#ccff00]">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} size={14} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
