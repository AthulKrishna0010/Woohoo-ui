"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type ScreamState = "IDLE" | "RECORDING" | "RESULT" | "FORM" | "SUCCESS";

export default function ScreamPage() {
    const [state, setState] = useState<ScreamState>("IDLE");
    const [score, setScore] = useState(0);
    const [reward, setReward] = useState("");
    const [finalData, setFinalData] = useState<any>(null); // For PDF

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black">

            {/* LEFT PANEL: HERO BRANDING (50%) */}
            <div className="relative w-full h-[40vh] md:w-1/2 md:min-h-screen overflow-hidden border-r border-white/10 shrink-0">
                {/* Bg Image */}
                <div className="absolute inset-0 z-0">
                    <img src="/hero.png" alt="Woohoo Gym" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                    <div className="w-16 h-16 md:w-24 md:h-24 mb-6">
                        <img src="/logo.svg" alt="Woohoo Logo" className="w-full h-full object-contain" />
                    </div>

                    <h1 className="leading-[0.85] font-normal uppercase tracking-tighter mb-4 font-bebas flex flex-col items-center">
                        <span className="block text-white text-6xl md:text-8xl lg:text-9xl mb-2">9,000 SQ FT</span>
                        <span className="block text-white text-3xl md:text-5xl lg:text-6xl" style={{ textShadow: '4px 4px 0px rgba(255,255,255,0.2)' }}>OF PURE</span>
                        <span className="block text-[#ccff00] text-4xl md:text-6xl lg:text-7xl">ENERGY</span>
                    </h1>

                    {/* NEW HOOK BADGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                        className="mt-8 bg-[#ccff00] text-black px-6 py-2 rounded-full font-bebas text-xl md:text-2xl transform -rotate-2 hover:rotate-0 transition-transform cursor-default shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                    >
                        WIN FREE GYM PASSES
                    </motion.div>
                </div>
            </div>

            {/* RIGHT PANEL: CHALLENGE INTERFACE (50%) */}
            <div className="relative w-full min-h-[60vh] md:w-1/2 md:min-h-screen bg-[#0a0a0a] flex flex-col items-center p-4 md:p-8">
                <AnimatePresence mode="wait">
                    {state === "IDLE" && (
                        <IdleView key="idle" onStart={() => setState("RECORDING")} />
                    )}
                    {state === "RECORDING" && (
                        <RecordingView key="recording" onFinish={(s, r) => { setScore(s); setReward(r); setState("RESULT"); }} />
                    )}
                    {state === "RESULT" && (
                        <ResultView
                            key="result"
                            score={score}
                            reward={reward}
                            onClaim={() => setState("FORM")}
                            onRetry={() => setState("IDLE")}
                        />
                    )}
                    {state === "FORM" && (
                        <FormView key="form" score={score} reward={reward} onSuccess={(data) => { setFinalData(data); setState("SUCCESS"); }} />
                    )}
                    {state === "SUCCESS" && (
                        <SuccessView key="success" data={finalData} />
                    )}
                </AnimatePresence>
            </div>
            {/* BRAND FOOTER */}
            {/* Mobile: Grid Layout (2 Rows) */}
            <div className="w-full md:hidden bg-black/80 backdrop-blur-sm p-6 flex flex-col items-center border-t border-white/10 relative z-20">
                <div className="grid grid-cols-3 gap-6 items-center justify-center opacity-60">
                    {[
                        "/nike.png",
                        "/panatta.png",
                        "/nautilus.png",
                        "/real-leader.png",
                        "/shua.png",
                        "/booty-builder.png"
                    ].map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt="Brand"
                            className={`object-contain invert ${src.includes('nautilus') ? 'h-10' : 'h-6'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop: Moving Carousel (One Line) */}
            <div className="hidden md:flex absolute bottom-0 left-0 w-1/2 z-20 bg-black/80 backdrop-blur-sm border-t border-white/10 h-24 overflow-hidden items-center">
                <div className="flex relative w-full overflow-hidden mask-linear-fade">
                    <motion.div
                        className="flex gap-16 items-center whitespace-nowrap pr-16"
                        animate={{ x: "-50%" }}
                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                    >
                        {[
                            "/nike.png", "/panatta.png", "/nautilus.png", "/real-leader.png", "/shua.png", "/booty-builder.png",
                            "/nike.png", "/panatta.png", "/nautilus.png", "/real-leader.png", "/shua.png", "/booty-builder.png",
                            "/nike.png", "/panatta.png", "/nautilus.png", "/real-leader.png", "/shua.png", "/booty-builder.png",
                            "/nike.png", "/panatta.png", "/nautilus.png", "/real-leader.png", "/shua.png", "/booty-builder.png"
                        ].map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt="Brand"
                                className={`object-contain invert opacity-60 ${src.includes('nautilus') ? 'h-14' : 'h-8'
                                    }`}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

function IdleView({ onStart }: { onStart: () => void }) {
    const rewards = [
        { score: "1200+", reward: "7 Day Pass", label: "LEGENDARY" },
        { score: "850+", reward: "5 Day Pass", label: "ELITE" },
        { score: "600+", reward: "3 Day Pass", label: "PRO" },
        { score: "350+", reward: "1 Day Pass", label: "ROOKIE" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg text-center flex flex-col my-auto"
        >
            {/* HERDER */}
            <h2 className="text-5xl md:text-7xl font-bebas text-white mb-2 leading-none">
                SCREAM <span className="text-[#ccff00]">TO WIN</span>
            </h2>
            <p className="text-white/60 font-inter text-sm md:text-base mb-8 max-w-md mx-auto">
                Unleash your loudest scream to unlock free gym passes. The louder you go, the bigger the reward.
            </p>

            {/* HOW IT WORKS (3 STEPS) */}
            <div className="grid grid-cols-3 gap-4 mb-8 w-full">
                {[
                    { title: "1. SCREAM", icon: "🎤", desc: "Shout loud into the mic" },
                    { title: "2. SCORE", icon: "⚡", desc: "Hit the high numbers" },
                    { title: "3. EARN", icon: "🎟️", desc: "Get instant Gym Pass" },
                ].map((step, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 flex flex-col items-center hover:bg-white/10 transition-colors">
                        <span className="text-2xl md:text-3xl mb-2 grayscale opacity-80">{step.icon}</span>
                        <h4 className="font-bebas text-lg md:text-xl text-white mb-1 tracking-wide">{step.title}</h4>
                        <p className="text-[10px] md:text-xs text-white/50 leading-tight uppercase font-bold tracking-wider">{step.desc}</p>
                    </div>
                ))}
            </div>

            {/* REWARDS TABLE (Condensed) */}
            <div className="w-full mb-8 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <div className="flex bg-white/10 p-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
                    <span className="w-1/3 text-left pl-2">Loudness Level</span>
                    <span className="w-1/3 text-center">Reward</span>
                    <span className="w-1/3 text-right pr-2">Your Status</span>
                </div>
                <div className="flex flex-col">
                    {rewards.map((r, i) => (
                        <div key={i} className={`flex items-center p-3 md:p-4 border-t border-white/5 ${i === 0 ? 'bg-[#ccff00]/10' : ''}`}>
                            <div className="w-1/3 text-left">
                                <span className={`font-bebas text-xl md:text-2xl ${i === 0 ? 'text-[#ccff00]' : 'text-white'}`}>{r.score}</span>
                            </div>
                            <div className="w-1/3 text-center">
                                <span className={`font-bebas text-lg md:text-xl tracking-wide ${i === 0 ? 'text-white' : 'text-white/80'}`}>{r.reward}</span>
                            </div>
                            <div className="w-1/3 text-right">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${i === 0 ? "bg-[#ccff00] text-black" : "bg-white/10 text-white/40"
                                    }`}>
                                    {r.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <button
                onClick={onStart}
                className="group relative w-full py-5 bg-[#ccff00] text-black font-bebas text-3xl uppercase tracking-widest overflow-hidden rounded-lg hover:scale-[1.02] transition-transform"
            >
                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform skew-y-12" />
                <span className="relative z-10">Start Challenge</span>
            </button>
            <p className="mt-3 text-[10px] text-white/30 uppercase tracking-widest">
                *Microphone access required
            </p>
        </motion.div>
    );
}

function RecordingView({ onFinish }: { onFinish: (score: number, reward: string) => void }) {
    const [currentScore, setCurrentScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isMicReady, setIsMicReady] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const filterRef = useRef<BiquadFilterNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const rafRef = useRef<number | null>(null);
    const maxScoreRef = useRef(0);

    useEffect(() => {
        startRecording();
        return () => stopRecording();
    }, []);

    useEffect(() => {
        if (!isMicReady) return; // Only start timer when mic is ready

        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            finishSession();
        }
    }, [timeLeft, isMicReady]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsMicReady(true);

            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;

            // Create Filter to isolate Voice (Highpass @ 400Hz removes thuds/table bangs)
            filterRef.current = audioContextRef.current.createBiquadFilter();
            filterRef.current.type = "highpass";
            filterRef.current.frequency.value = 400;

            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);

            // Connect: Source -> Filter -> Analyser
            sourceRef.current.connect(filterRef.current);
            filterRef.current.connect(analyserRef.current);

            dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyze();
        } catch (err) {
            console.error("Mic Error:", err);
            alert("Please allow microphone access to participate.");
        }
    };

    const stopRecording = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(e => console.warn("AudioContext already closed", e));
        }
        if (sourceRef.current) sourceRef.current.disconnect();
        if (filterRef.current) filterRef.current.disconnect();
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
    };

    const analyze = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

        // Simple Average Loudness Logic
        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
            sum += dataArrayRef.current[i];
        }
        const average = sum / dataArrayRef.current.length;

        // Scale and Clamping
        // Designed to be easy to get to ~500, hard to get to 2000
        const rawScore = Math.floor((average / 255) * 2500);

        // Apply base threshold of 250 as requested
        const adjustedScore = Math.max(0, rawScore - 250);

        const clampedScore = Math.min(2000, adjustedScore);

        // Update Max (Peak Hold logic)
        if (clampedScore > maxScoreRef.current) {
            maxScoreRef.current = clampedScore;
        }

        // Visual Jitter for excitement, but keeping it close to the max recorded so far to feel "charged"
        // Let's make it follow the current loudness but smoothed.
        setCurrentScore(prev => Math.floor(prev * 0.8 + clampedScore * 0.2));

        rafRef.current = requestAnimationFrame(analyze);
    };

    const finishSession = () => {
        stopRecording();

        const finalScore = maxScoreRef.current;
        let reward = '0_day';
        if (finalScore >= 1200) reward = '7_day';
        else if (finalScore >= 850) reward = '5_day';
        else if (finalScore >= 600) reward = '3_day';
        else if (finalScore >= 350) reward = '1_day';

        setTimeout(() => {
            onFinish(finalScore, reward);
        }, 500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center w-full flex flex-col items-center my-auto"
        >
            <h2 className="text-6xl md:text-8xl font-bebas text-white mb-8 animate-pulse">SCREAM</h2>

            <div className="mb-8 md:mb-12 relative w-full flex justify-center items-center">
                {/* Score Display */}
                <div className="text-[8rem] md:text-[12rem] font-bebas leading-none text-white tabular-nums relative z-10">
                    {currentScore}
                </div>

                {/* Reactive Glow */}
                <div
                    className="absolute bg-[#ccff00] blur-[80px] md:blur-[120px] rounded-full transition-opacity duration-100"
                    style={{
                        opacity: Math.min(0.6, currentScore / 1500),
                        width: '300px',
                        height: '300px'
                    }}
                />
            </div>

            <div className="flex flex-col items-center w-full max-w-lg">
                {!isMicReady ? (
                    <div className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white/50 mb-4 animate-pulse text-center">
                        Waiting for Microphone...
                    </div>
                ) : (
                    <>
                        <div className="relative mb-8 w-full h-16 md:h-24">
                            {/* Background Text (Empty/Stroke) */}
                            <span className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-black italic tracking-tighter text-transparent stroke-white"
                                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>
                                WOOHOO
                            </span>

                            {/* Filled Text (Masked) */}
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
                                style={{ clipPath: `inset(${100 - Math.min(100, currentScore / 20)}% 0 0 0)` }}>
                                <span className="text-6xl md:text-8xl font-black italic tracking-tighter text-[#ccff00] drop-shadow-[0_0_20px_rgba(204,255,0,0.8)]">
                                    WOOHOO
                                </span>
                            </div>
                        </div>

                        {/* Timer Bar */}
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                className="h-full bg-[#ccff00]"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 10, ease: "linear" }}
                            />
                        </div>
                        <div className="mt-4 text-white/50 font-mono text-xl">{timeLeft}s remaining</div>
                    </>
                )}
            </div>
        </motion.div>
    );
}

function ResultView({ score, reward, onClaim, onRetry }: { score: number, reward: string, onClaim: () => void, onRetry: () => void }) {
    const isFailure = reward === '0_day';

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="text-center w-full max-w-md my-auto"
        >
            <h3 className="text-white/50 font-bebas text-2xl mb-2">FINAL SCORE</h3>
            <div className="text-[8rem] leading-none font-bebas text-[#ccff00] mb-4" style={{ textShadow: "0 0 40px rgba(204,255,0,0.5)" }}>
                {score}
            </div>

            {isFailure ? (
                <div className="bg-white/10 rounded-lg p-6 mb-8 border border-white/10">
                    <span className="block text-sm text-white/50 uppercase tracking-widest mb-2 animate-pulse">Nice Warm Up!</span>
                    <span className="block text-2xl md:text-3xl font-bebas text-white mb-2">JUST GETTING STARTED?</span>
                    <p className="text-white/70 text-sm font-inter leading-relaxed">
                        That was a solid effort, but we know you have more fire in you.
                        <br />
                        <span className="text-[#ccff00]">Give it another shot!</span>
                    </p>
                </div>
            ) : (
                <div className="bg-white/10 rounded-lg p-6 mb-8 border border-[#ccff00]/30 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
                    <span className="block text-sm text-white/50 uppercase tracking-widest mb-1">Congratulations</span>
                    <span className="block text-3xl font-bebas text-white">You Won A <span className="text-[#ccff00]">{reward.replace('_', ' ')} Pass</span></span>
                </div>
            )}

            {isFailure ? (
                <button
                    onClick={onRetry}
                    className="w-full py-4 bg-white text-black font-bebas text-2xl uppercase hover:bg-[#ccff00] transition-colors rounded-lg"
                >
                    Try Again
                </button>
            ) : (
                <button
                    onClick={onClaim}
                    className="w-full py-4 bg-[#ccff00] text-black font-bebas text-2xl uppercase hover:bg-white transition-colors rounded-lg shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                >
                    Claim Reward
                </button>
            )}
        </motion.div>
    );
}

function FormView({ score, reward, onSuccess }: { score: number, reward: string, onSuccess: (data: any) => void }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Clean phone number (remove +91, spaces, dashes) intelligent parsing
        let cleaned = phone.replace(/\D/g, '');

        // Handle India-specific formats (+91 or 0 prefix)
        if (cleaned.length === 12 && cleaned.startsWith('91')) {
            cleaned = cleaned.slice(2);
        } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
            cleaned = cleaned.slice(1);
        }

        const finalPhone = cleaned;

        // Basic Validation
        if (finalPhone.length !== 10) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Using localhost for MVP as per recent implementation context
            const res = await fetch("https://woohoo-17qy.onrender.com/claim-reward", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phoneNumber: finalPhone, score, reward })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to submit");
            }

            const data = await res.json();
            onSuccess(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-sm my-auto"
        >
            <h3 className="text-5xl md:text-7xl font-black font-bebas text-white mb-4 text-center text-[#ccff00]">CLAIM YOUR REWARD</h3>

            <p className="text-white/60 text-center text-sm mb-8 font-inter leading-relaxed">
                Almost there! Fill out your details below to generate your reward ticket.
                <br />
                <span className="text-white block mt-2 font-bold">
                    1. Fill Form &rarr; 2. Download PDF &rarr; 3. Show at Reception
                </span>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Full Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={name} onChange={e => setName(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 p-3 text-white rounded focus:border-[#ccff00] outline-none transition-colors [&:-webkit-autofill]:shadow-[0_0_0_100px_#222_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Phone Number</label>
                    <input
                        required
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 p-3 text-white rounded focus:border-[#ccff00] outline-none transition-colors [&:-webkit-autofill]:shadow-[0_0_0_100px_#222_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                    />
                </div>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <button
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#ccff00] disabled:opacity-50 text-black font-bebas text-xl uppercase hover:bg-white transition-colors mt-2"
                >
                    {isSubmitting ? "Submitting..." : "Get My Ticket"}
                </button>
            </form>
        </motion.div>
    );
}

function SuccessView({ data }: { data: any }) {
    const ticketRef = useRef<HTMLDivElement>(null);

    const downloadPDF = async () => {
        if (!ticketRef.current) return;

        try {
            // Dynamic Imports for client-side libs
            const { toPng } = await import('html-to-image');
            const { jsPDF } = await import('jspdf');

            const dataUrl = await toPng(ticketRef.current, {
                cacheBust: true,
                backgroundColor: '#000000',
                filter: (node) => node.tagName !== 'BUTTON',
            });

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });

            // Set black background for the entire PDF
            const pdfPageWidth = pdf.internal.pageSize.getWidth();
            const pdfPageHeight = pdf.internal.pageSize.getHeight();
            pdf.setFillColor(0, 0, 0);
            pdf.rect(0, 0, pdfPageWidth, pdfPageHeight, 'F');

            // Calculate height to maintain aspect ratio and center it
            const elementWidth = ticketRef.current.offsetWidth;
            const elementHeight = ticketRef.current.offsetHeight;
            const pdfImageHeight = (elementHeight * pdfPageWidth) / elementWidth;

            const verticalMargin = (pdfPageHeight - pdfImageHeight) / 2;

            pdf.addImage(dataUrl, 'PNG', 0, verticalMargin, pdfPageWidth, pdfImageHeight);
            pdf.save(`Woohoo_Ticket_${data.uniqueKey}.pdf`);
        } catch (err) {
            console.error("PDF Generate Failed", err);
            // Fallback or silent fail (User requested no alerts)
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center w-full my-auto"
        >
            {/* TICKET UI - Designed for Capture */}
            <div
                ref={ticketRef}
                className="bg-black border border-[#ccff00] p-8 w-full max-w-sm flex flex-col items-center text-center relative overflow-hidden mb-8 shadow-[0_0_50px_rgba(204,255,0,0.2)]"
            >
                <div className="w-16 h-16 mb-4">
                    <img src="/logo.svg" alt="Woohoo" className="w-full h-full object-contain" />
                </div>

                <h2 className="text-4xl font-bebas text-white mb-2">CONGRATULATIONS</h2>
                <p className="text-white/60 font-inter text-sm mb-6">
                    {data.name}, you just won a <br />
                    <span className="text-[#ccff00] text-xl font-bold">{data.reward.replace('_', ' ')} Pass</span>
                </p>

                <div className="w-full border-t border-dashed border-white/20 my-4" />

                <div className="grid grid-cols-2 gap-y-4 w-full text-left text-sm font-mono">
                    <div>
                        <span className="block text-white/40 text-[10px] uppercase">Ticket ID</span>
                        <span className="text-[#ccff00]">{data.uniqueKey}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-white/40 text-[10px] uppercase">Score</span>
                        <span className="text-white">{data.score}</span>
                    </div>
                    <div>
                        <span className="block text-white/40 text-[10px] uppercase">Mobile</span>
                        <span className="text-white">{data.phoneNumber}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-white/40 text-[10px] uppercase">Date</span>
                        <span className="text-white">{new Date().toLocaleDateString('en-GB')}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-8 py-3 border border-white text-white font-bebas text-lg hover:bg-white hover:text-black transition-colors"
            >
                Download Ticket (PDF)
            </button>
        </motion.div>
    );
}
