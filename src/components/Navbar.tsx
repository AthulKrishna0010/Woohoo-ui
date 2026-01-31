'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';

interface NavbarProps {
    show: boolean;
}

export default function Navbar({ show }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // Hide if scrolling down AND current scroll > 100
        if (latest > previous && latest > 100) {
            setIsVisible(false);
        } else if (latest < previous) {
            // Show if scrolling up
            setIsVisible(true);
        }
    });

    const isNavbarVisible = show && isVisible;

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Membership', href: '/membership' },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-4 md:px-8 py-4 md:py-6 pointer-events-none transition-all duration-300 bg-transparent"
                initial={{ opacity: 0, y: -100 }}
                animate={isNavbarVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* Desktop Layout */}
                <div className="hidden md:flex w-full items-center justify-between pointer-events-auto max-w-[1400px] mx-auto">

                    {/* Left: Logo with localized blur */}
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 p-2 backdrop-blur-md bg-black/30 rounded-full">
                        <Link href="/" className="block w-full h-full">
                            <motion.img
                                src="/logo.png"
                                alt="Woohoo Logo"
                                className="w-full h-full object-contain"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </div>

                    {/* Right: Navigation Links with localized blur */}
                    <div className="flex items-center gap-8 lg:gap-12 px-8 py-4 backdrop-blur-md bg-black/30 rounded-full">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative group overflow-hidden text-lg font-bold tracking-widest uppercase text-white font-bebas hover:text-[#ccff00] transition-colors duration-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Layout: Logo Left, Menu Right */}
                <div className="md:hidden flex justify-between items-center w-full pointer-events-auto">
                    <div className="w-14 h-14">
                        <Link href="/" className="block w-full h-full">
                            <motion.img
                                src="/logo.png"
                                alt="Woohoo Logo"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-white p-2 backdrop-blur-md bg-black/30 rounded-full"
                    >
                        <IoMenu size={32} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-4 text-white p-2"
                        >
                            <IoClose size={40} />
                        </button>

                        {/* Mobile Links */}
                        <div className="flex flex-col items-center gap-10">
                            {navLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl text-white font-bebas tracking-widest uppercase hover:text-[#ccff00] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
