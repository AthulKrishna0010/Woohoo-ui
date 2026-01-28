'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
    show: boolean;
}

export default function Navbar({ show }: NavbarProps) {
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Handle visibility (hide on scroll down, show on scroll up)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Handle background blur/color
            if (currentScrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-4 md:px-8 py-4 md:py-6 pointer-events-none transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-black/40' : 'bg-transparent'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={show && isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            {/* Desktop Layout: Left Links - Logo - Right Links */}
            <div className="hidden md:flex w-full items-center justify-between pointer-events-auto">

                {/* Left Buttons: Home, About */}
                <div className="flex-1 flex justify-end gap-12 pr-12">
                    {[
                        { name: 'Home', href: '/' },
                        { name: 'About', href: '/about' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative group overflow-hidden text-lg font-bold tracking-widest uppercase text-white font-bebas hover:text-[#ccff00] transition-colors duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Centered Logo */}
                <div className="flex-shrink-0 w-24 h-24">
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

                {/* Right Buttons: Membership, Contact */}
                <div className="flex-1 flex justify-start gap-12 pl-12">
                    {[
                        { name: 'Membership', href: '/membership' },
                        { name: 'Contact', href: '/contact' }
                    ].map((item) => (
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

            {/* Mobile Layout: Logo Left, Menu Right (Preserving existing mobile behavior but adapting structure if needed) */}
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
