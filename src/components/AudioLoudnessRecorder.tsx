'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { isInAppBrowser } from '../utils/browserDetection';

// --- CONSTANTS ---
// Moved outside component to guarantee reference stability
const BRAND_NEON = '#ccff00';
const NEON_INPUTS = [0, 350, 600, 850, 1200];
const NEON_OUTPUTS = ['#1a3300', '#ccff00', '#ccff00', '#ffcc00', '#ff003c'];

/**
 * AudioLoudnessRecorder Component
 * 
 * UPDATE: HOOK STABILITY FIX
 * - Moved `useEffect` (browser check) to the very top.
 * - Removed early return pattern; using conditional JSX instead.
 * - Consolidated useTransform arrays into constants.
 * - FIX: Extracted clipPath and textShadow transforms to top level constants.
 */
export default function AudioLoudnessRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [isInApp, setIsInApp] = useState(false);

    const [loudnessResult, setLoudnessResult] = useState<{ peak: number; db: number } | null>(null);
    const [rewardTier, setRewardTier] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(10);

    // FIX: Move Effect to TOP to ensure it always runs at the same index (#9)
    useEffect(() => {
        if (isInAppBrowser()) {
            setIsInApp(true);
        }
    }, []);

    // Refs (Logic)
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const requestRef = useRef<number | null>(null);
    const peakRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    // Motion Values for High-Performance Animation
    const scoreMV = useMotionValue(0); // Raw score (0 - 2000+)
    const fillHeightMV = useMotionValue(0); // mapped 0 - 100 for UI

    // Derived Animations
    // 1. Text Shake/Jitter at high volume
    const xJitter = useTransform(scoreMV, (v) => v > 800 ? (Math.random() * 4 - 2) : 0);
    const yJitter = useTransform(scoreMV, (v) => v > 800 ? (Math.random() * 4 - 2) : 0);

    // 2. Neon Color Shift (Dark Green -> Bright Green -> Yellow -> Red)
    // Thresholds: 350, 600, 850, 1200
    const neonColor = useTransform(scoreMV, NEON_INPUTS, NEON_OUTPUTS);

    // 3. Glow Opacity / Intensity
    const glowOpacity = useTransform(scoreMV, [0, 1200], [0.2, 1]);
    const glowBlur = useTransform(scoreMV, [0, 1200], ['10px', '40px']);

    // 4. Clip Path & Text Shadow (Moved to top level to fix Hook Order)
    const clipPathVal = useTransform(fillHeightMV, (h) => `inset(${100 - h}% 0 0 0)`);
    const textShadowVal = useTransform(glowBlur, (b) => `0 0 ${b} var(--neon-color)`);

    const RECORDING_DURATION_MS = 10000;
    const API_URL = 'https://woohoo-17qy.onrender.com/woohoo-attempt';
    const UI_DISPLAY_MAX = 1300; // Visual scaling max


    const startRecording = async () => {
        if (submissionComplete) return;
        setErrorMessage(null);
        setTimeLeft(10);

        if (!audioContextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContextClass();
        }
        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            const analyser = audioContextRef.current.createAnalyser();
            analyser.fftSize = 2048;
            analyser.smoothingTimeConstant = 0.6; // Keep original smoothing
            source.connect(analyser);
            analyserRef.current = analyser;

            peakRef.current = 0;
            setIsRecording(true);
            setLoudnessResult(null);
            startTimeRef.current = performance.now();

            requestRef.current = requestAnimationFrame(analyzeAudio);

            const timerInterval = setInterval(() => {
                const elapsed = performance.now() - startTimeRef.current;
                const remaining = Math.max(0, Math.ceil((RECORDING_DURATION_MS - elapsed) / 1000));
                setTimeLeft(remaining);
            }, 1000);

            setTimeout(() => {
                clearInterval(timerInterval);
                stopRecording();
            }, RECORDING_DURATION_MS);

        } catch (err) {
            console.error('Error accessing microphone:', err);
            setErrorMessage('Could not access microphone. Ensure permissions are granted.');
        }
    };

    const analyzeAudio = () => {
        if (!analyserRef.current) return;
        if (performance.now() - startTimeRef.current > RECORDING_DURATION_MS) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            const value = (dataArray[i] - 128) / 128.0;
            sum += value * value;
        }
        const rms = Math.sqrt(sum / bufferLength);

        if (rms > peakRef.current) {
            peakRef.current = rms;
        }

        updateMeter(rms);
        requestRef.current = requestAnimationFrame(analyzeAudio);
    };

    const calculateRawScore = (rms: number) => {
        const SCORING_MAX = 2000;
        const BASE_SCORE = 555;
        const normalizedInput = Math.min(rms / 0.9, 1.0);
        let rawScore = BASE_SCORE + (Math.pow(normalizedInput, 2.5) * SCORING_MAX);
        return Math.floor(rawScore);
    };

    const mapRawToUI = (rawValue: number, uiMax: number) => {
        let percentage = (rawValue / uiMax) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        return percentage;
    };

    const updateMeter = (rms: number) => {
        const rawScore = calculateRawScore(rms);

        // Update Motion Values instead of Refs (Performance)
        scoreMV.set(rawScore);

        const percentage = mapRawToUI(rawScore, UI_DISPLAY_MAX);
        fillHeightMV.set(percentage);
    };

    const stopRecording = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
        }
        if (analyserRef.current) {
            analyserRef.current.disconnect();
            analyserRef.current = null;
        }
        setIsRecording(false);
        setTimeLeft(0);

        const peakRms = peakRef.current;
        const finalScore = calculateRawScore(peakRms);

        setLoudnessResult({ peak: peakRms, db: finalScore });
        submitAttempt(finalScore);
    };

    const submitAttempt = async (peakDb: number) => {
        setIsSubmitting(true);
        try {
            const sessionId = 'session-' + Math.random().toString(36).substring(7);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    peakLoudness: peakDb,
                    durationMs: RECORDING_DURATION_MS,
                    sessionId
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Submission failed');
            }

            const data = await response.json();
            setRewardTier(data.reward);
            setSubmissionComplete(true);

        } catch (err: any) {
            console.error('Submission error:', err);
            setErrorMessage(err.message || 'Failed to submit attempt.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- RENDER ---
    return (
        // FULL SCREEN CONTAINER
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#050505',
                color: 'white',
                fontFamily: "'Impact', 'Arial Narrow', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 9999
            }}
        >
            {/* CONDITIONAL RENDER FOR IN-APP WARNING - NO EARLY RETURN */}
            {isInApp ? (
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff3e0', color: '#e65100' }}>
                    <h3>⚠️ Action Required</h3>
                    <p>Please open this page in Safari or Chrome to use the microphone.</p>
                </div>
            ) : (
                /* MAIN APP UI */
                <>
                    {!submissionComplete ? (
                        <>
                            {/* START SCREEN or RECORDING */}
                            {!isRecording ? (
                                // START SCREEN with consistent typography
                                <div style={{ zIndex: 10, textAlign: 'left', transform: 'rotate(-4deg)' }}>
                                    <h1 style={{
                                        fontSize: '13vw',
                                        lineHeight: 0.8,
                                        margin: 0,
                                        color: BRAND_NEON,
                                        letterSpacing: '-5px',
                                        textTransform: 'uppercase'
                                    }}>
                                        WOOHOO
                                    </h1>
                                    <div style={{ fontSize: '4vw', letterSpacing: '8px', color: 'white', fontWeight: 'bold' }}>
                                        CHALLENGE
                                    </div>
                                    <div style={{ marginTop: '40px' }}>
                                        <button
                                            onClick={startRecording}
                                            style={{
                                                padding: '20px 60px',
                                                fontSize: '2rem',
                                                fontFamily: 'inherit',
                                                fontWeight: 'bold',
                                                backgroundColor: 'white',
                                                color: 'black',
                                                border: 'none',
                                                borderRadius: '50px',
                                                cursor: 'pointer',
                                                boxShadow: `0 0 40px ${BRAND_NEON}40`
                                            }}
                                        >
                                            START
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // RECORDING SCREEN - NEON TEXT FILL UI
                                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                    {/* BASE TEXT (OUTLINE / DIM) */}
                                    <motion.h1
                                        style={{
                                            position: 'absolute',
                                            fontSize: '25vw',
                                            lineHeight: 0.8,
                                            margin: 0,
                                            color: 'rgba(255, 255, 255, 0.1)',
                                            WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                                            letterSpacing: '-10px',
                                            textTransform: 'uppercase',
                                            zIndex: 1,
                                            x: xJitter,
                                            y: yJitter,
                                            rotate: -6
                                        }}
                                    >
                                        WOOHOO
                                    </motion.h1>

                                    {/* FILL TEXT (NEON / CLIPPED) */}
                                    <motion.div
                                        style={{
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 2,
                                            x: xJitter,
                                            y: yJitter,
                                            rotate: -6,
                                            // Use clip-path to reveal from bottom
                                            clipPath: clipPathVal,
                                        }}
                                    >
                                        <motion.h1
                                            style={{
                                                fontSize: '25vw',
                                                lineHeight: 0.8,
                                                margin: 0,
                                                color: neonColor,
                                                letterSpacing: '-10px',
                                                textTransform: 'uppercase',
                                                // Dynamic Glow
                                                textShadow: textShadowVal,
                                            }}
                                        >
                                            WOOHOO
                                        </motion.h1>
                                    </motion.div>

                                    {/* SECONDARY INFO (Timer & Hints) */}
                                    <div style={{ position: 'absolute', bottom: '10%', zIndex: 10, textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{timeLeft}s</div>
                                        <div style={{ opacity: 0.5, letterSpacing: '2px' }}>SCREAM LOUDER</div>
                                    </div>

                                </div>
                            )}
                        </>
                    ) : (
                        // SUCCESS SCREEN (Same NEON TAKEOVER logic but simplified code)
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: BRAND_NEON, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{ textAlign: 'left', color: 'black', transform: 'rotate(-4deg)' }}
                            >
                                <h1 style={{ fontSize: '15vw', lineHeight: 0.8, margin: 0, textTransform: 'uppercase', letterSpacing: '-5px' }}>
                                    WOOHOO
                                </h1>
                                <div style={{ fontSize: '4vw', fontWeight: 'bold', marginBottom: '20px' }}>CHALLENGE COMPLETE</div>

                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>SCORE: {Math.floor(loudnessResult?.db || 0)}</div>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: '900',
                                    backgroundColor: 'black',
                                    color: BRAND_NEON,
                                    display: 'inline-block',
                                    padding: '10px 30px',
                                    marginTop: '20px',
                                    transform: 'skew(-10deg)'
                                }}>
                                    {rewardTier?.replace('_', ' ').toUpperCase()}
                                </div>

                                <div style={{ marginTop: '50px' }}>
                                    <button
                                        onClick={() => {
                                            setSubmissionComplete(false);
                                            setRewardTier(null);
                                            scoreMV.set(0);
                                            fillHeightMV.set(0);
                                        }}
                                        style={{
                                            padding: '20px 50px',
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            backgroundColor: 'black',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        TRY AGAIN
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </>
            )}

            {errorMessage && (
                <div style={{ position: 'absolute', bottom: 20, color: 'red', zIndex: 100 }}>{errorMessage}</div>
            )}
        </motion.div>
    );
}
