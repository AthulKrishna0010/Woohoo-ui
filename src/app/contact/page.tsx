'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaChevronDown, FaPlus, FaMinus } from 'react-icons/fa';

// --- Shared Components ---

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

// --- FAQ Accordion Component ---

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-neutral-800">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
            >
                <span className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-[#ccff00]' : 'text-white group-hover:text-[#ccff00]'}`}>
                    {question}
                </span>
                <span className={`text-[#ccff00] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <FaChevronDown /> : <FaChevronDown />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Page Component ---

export default function ContactPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqs = [
        {
            question: "Why choose us for your fitness journey?",
            answer: "We offer state-of-the-art equipment, expert trainers, and a supportive community atmosphere that drives results. Our facility is designed to cater to all fitness levels."
        },
        {
            question: "What are your operating hours?",
            answer: "We are open Monday to Saturday from 5:00 AM to 11:00 PM, and on Sundays from 6:00 AM to 10:00 PM."
        },
        {
            question: "Do you offer personal training?",
            answer: "Yes, we have a team of certified personal trainers who can create customized workout plans to help you achieve your specific goals."
        },
        {
            question: "Is there a membership contract?",
            answer: "We offer flexible membership options including monthly, quarterly, and annual plans to suit your needs."
        }
    ];

    return (
        <div className="bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black min-h-screen pt-28">
            <Navbar show={true} />

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                {/* Background Placeholder */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/contact-page.JPG"
                        alt="Contact Hero"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/60 z-10" />
                </div>

                <div className="relative z-20 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl font-bebas text-white mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        OUR CONTACT
                    </motion.h1>
                    <motion.p
                        className="text-gray-300 max-w-lg mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Reach out to us with any questions or concerns you may have,
                        and we'll be happy to help.
                    </motion.p>
                    {/* Decorative Stripes */}
                    <motion.div
                        className="flex justify-center gap-2 mt-6"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-8 h-2 bg-[#ccff00] -skew-x-12" />
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* 2. MAIN CONTENT GRID */}
            <section className="container mx-auto px-4 md:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* LEFT COLUMN: DETAILS */}
                    <div>
                        <FadeInUp>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 block">Get in touch</span>
                            <h2 className="text-4xl md:text-5xl font-bebas text-white mb-8">Our Contact Detail</h2>
                            <p className="text-gray-400 mb-12">
                                Serious about your fitness? So are we. Visit us or get in touch below.
                            </p>
                        </FadeInUp>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Gym Studio */}
                            <FadeInUp delay={0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#ccff00] p-4 rounded text-black shrink-0">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-xl text-white mb-1">Gym Studio</h3>
                                        <p className="text-gray-400 text-sm">
                                            123 Fitness Blvd,<br />Indiranagar, Bangalore
                                        </p>
                                    </div>
                                </div>
                            </FadeInUp>
                            {/* Working Hours */}
                            <FadeInUp delay={0.2}>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#ccff00] p-4 rounded text-black shrink-0">
                                        <FaClock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-xl text-white mb-1">Working Hours</h3>
                                        <p className="text-gray-400 text-sm">
                                            Mon-Sat : 05:00 - 23:00<br />Sunday : 06:00 - 22:00
                                        </p>
                                    </div>
                                </div>
                            </FadeInUp>
                            {/* Call Us */}
                            <FadeInUp delay={0.3}>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#ccff00] p-4 rounded text-black shrink-0">
                                        <FaPhoneAlt size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-xl text-white mb-1">Call Us</h3>
                                        <p className="text-gray-400 text-sm">
                                            +91 98765 43210<br />+91 12345 67890
                                        </p>
                                    </div>
                                </div>
                            </FadeInUp>
                            {/* Email Us */}
                            <FadeInUp delay={0.4}>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#ccff00] p-4 rounded text-black shrink-0">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-xl text-white mb-1">Email Us</h3>
                                        <p className="text-gray-400 text-sm">
                                            info@woohoo.com<br />support@woohoo.com
                                        </p>
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>

                        {/* Map Placeholder */}
                        <FadeInUp delay={0.5}>
                            <div className="w-full h-64 bg-neutral-900 border border-neutral-800 rounded relative overflow-hidden flex items-center justify-center">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9860877970223!2d77.63815227513093!3d12.972741514853148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17cfeb60d341%3A0xac50f361008afaf2!2sWoohoo%20Health%20Club!5e0!3m2!1sen!2sin!4v1769591038651!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </FadeInUp>
                    </div>


                    {/* RIGHT COLUMN: FORM */}
                    <div>
                        <FadeInUp delay={0.2} className="bg-neutral-900/50 p-8 md:p-10 border border-neutral-800 rounded-2xl relative">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#ccff00] rounded-tr-2xl pointer-events-none" />

                            <h2 className="text-3xl md:text-4xl font-bebas text-white mb-2">Send us a message</h2>
                            <p className="text-gray-400 text-sm mb-8">
                                Have a question? Fill out the form and we'll get right back to you.
                            </p>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Your Name</label>
                                        <input type="text" placeholder="Your name" className="w-full bg-black/50 border border-neutral-700 rounded p-3 text-white focus:border-[#ccff00] focus:outline-none transition-colors text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Phone</label>
                                        <input type="tel" placeholder="Phone number" className="w-full bg-black/50 border border-neutral-700 rounded p-3 text-white focus:border-[#ccff00] focus:outline-none transition-colors text-sm" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Email Address</label>
                                        <input type="email" placeholder="Your email" className="w-full bg-black/50 border border-neutral-700 rounded p-3 text-white focus:border-[#ccff00] focus:outline-none transition-colors text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Subject</label>
                                        <input type="text" placeholder="Subject" className="w-full bg-black/50 border border-neutral-700 rounded p-3 text-white focus:border-[#ccff00] focus:outline-none transition-colors text-sm" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Message</label>
                                    <textarea placeholder="Your message" rows={4} className="w-full bg-black/50 border border-neutral-700 rounded p-3 text-white focus:border-[#ccff00] focus:outline-none transition-colors text-sm resize-none"></textarea>
                                </div>

                                <button className="bg-[#ccff00] text-black font-bebas text-lg px-8 py-3 rounded hover:bg-white transition-colors duration-300 uppercase tracking-wide w-full md:w-auto">
                                    Send Message
                                </button>
                            </form>

                            {/* Social Media */}
                            <div className="mt-10 pt-6 border-t border-neutral-800 flex items-center justify-between">
                                <span className="font-bebas text-xl text-white">Follow social media :</span>
                                <div className="flex gap-4">
                                    <a href="https://www.facebook.com/profile.php?id=61578611122583" className="w-10 h-10 border border-neutral-700 rounded flex items-center justify-center text-gray-400 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"><FaFacebookF /></a>
                                    <a href="https://www.youtube.com/@WooHooFitness1" className="w-10 h-10 border border-neutral-700 rounded flex items-center justify-center text-gray-400 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"><FaYoutube /></a>
                                    <a href="https://www.instagram.com/woohoohealthclub" className="w-10 h-10 border border-neutral-700 rounded flex items-center justify-center text-gray-400 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"><FaInstagram /></a>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>


            {/* 3. FAQ SECTION */}
            <section className="relative py-24 bg-neutral-900 border-t border-neutral-800">
                {/* Decorative Image Placeholder */}
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none hidden lg:block">
                    <img src="/faq-image.JPG" alt="Gym FAQ" className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <FadeInUp>
                                <h2 className="text-4xl md:text-6xl font-bebas text-white mb-12">
                                    Frequently Asked <span className="text-[#ccff00]">Questions</span>
                                </h2>
                                <div className="space-y-2">
                                    {faqs.map((faq, index) => (
                                        <FAQItem
                                            key={index}
                                            question={faq.question}
                                            answer={faq.answer}
                                            isOpen={openFAQ === index}
                                            onClick={() => toggleFAQ(index)}
                                        />
                                    ))}
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
