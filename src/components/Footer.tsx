'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="relative z-20 bg-black w-full overflow-hidden pt-20 pb-10">
            {/* Top Fade Gradient for Smooth Transition */}
            {/* Top Fade Gradient for Smooth Transition with Grain */}
            <div className="absolute top-0 left-0 w-full h-64 z-20 pointer-events-none">
                {/* Smooth Gradient Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent"></div>

                {/* Grain/Noise Overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        maskImage: 'linear-gradient(to bottom, black, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
                    }}
                ></div>
            </div>

            {/* BACKGROUND IMAGE WITH SUNLIGHT FADE EFFECT */}
            {/* BACKGROUND IMAGE WITH SUNLIGHT FADE EFFECT */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
                <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    {/* The Image */}
                    <img
                        src="/woohoo-footer.png"
                        alt="Woohoo Footer Art"
                        className="w-full h-full object-cover opacity-60"
                    />

                    {/* Sunlight Fade Mask / Overlay */}
                    <div
                        className="absolute inset-0 bg-black"
                        style={{
                            mixBlendMode: 'multiply',
                            background: `
                                radial-gradient(circle at 50% 50%, transparent 20%, black 80%),
                                linear-gradient(to top, transparent 0%, black 100%)
                            `
                        }}
                    ></div>

                    {/* Breathing Light Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-[#ccff00]/10 to-transparent"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ mixBlendMode: 'overlay' }}
                    />
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at 50% 60%, rgba(204, 255, 0, 0.15) 0%, transparent 60%)',
                            mixBlendMode: 'screen'
                        }}
                        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>


            {/* CONTENT */}
            <div className="container mx-auto px-4 md:px-8 relative z-30 flex flex-col items-center justify-between min-h-[300px]">

                {/* 1. Quick Links */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {[
                        { name: 'Home', href: '/' },
                        { name: 'About', href: '/about' },
                        { name: 'Contact', href: '/contact' },
                        { name: 'Membership', href: '/membership' }, // Link to membership page
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white drop-shadow-md hover:text-[#ccff00] font-bebas text-xl md:text-2xl tracking-widest transition-colors duration-300 uppercase"
                        >
                            {link.name}
                        </Link>
                    ))}
                </motion.div>

                {/* 2. Social Media Icons */}
                <motion.div
                    className="flex gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    {[
                        { Icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=61578611122583' },
                        { Icon: FaInstagram, href: 'https://www.instagram.com/woohoohealthclub' },
                        { Icon: FaYoutube, href: 'https://www.youtube.com/@WooHooFitness1' },
                    ].map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-white hover:border-[#ccff00] hover:text-[#black] hover:bg-[#ccff00] transition-all duration-300 group"
                        >
                            <social.Icon className="w-5 h-5" />
                        </a>
                    ))}
                </motion.div>


                {/* 3. Copyright / Branding Text */}
                <motion.div
                    className="text-center w-full border-t border-gray-900 pt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <p className="text-gray-400 text-sm flex flex-col md:flex-row items-center justify-center gap-2">
                        <span>&copy; 2026 WooHoo Health Club. All rights reserved.</span>
                        <span className="hidden md:inline"> | </span>
                        <a href="https://lsoptimaize.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <span>Designed and Powered by</span>
                            <img src="/lso_new.png" alt="LSO" className="h-10 object-contain" />
                        </a>
                    </p>
                </motion.div>

            </div>
        </footer>
    );
}
