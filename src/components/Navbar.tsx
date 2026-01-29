'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
    show: boolean;
}

export default function Navbar({ show }: NavbarProps) {
    // Simplified: No internal visibility state based on scroll direction.
    // Visibility is now purely controlled by the parent 'show' prop.


    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Membership', href: '/membership' },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-4 md:px-8 py-4 md:py-6 pointer-events-none transition-all duration-300 bg-transparent"
            initial={{ opacity: 0, y: -100 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
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
                <div className="text-white font-bebas text-xl">MENU</div>
            </div>
        </motion.nav>
    );
}
