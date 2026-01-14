import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Balloons from './Balloons';

const Hero = ({ name = "Jatin" }) => {
    const [showBalloons, setShowBalloons] = useState(false);

    useEffect(() => {
        // Trigger confetti after a delay
        const timer = setTimeout(() => {
            triggerConfetti();
        }, 2500);

        // Trigger Balloons with Name Reveal
        const balloonTimer = setTimeout(() => {
            setShowBalloons(true);
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(balloonTimer);
        };
    }, []);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fbbf24', '#ffffff', '#ef4444']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fbbf24', '#ffffff', '#ef4444']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnyt-gold/5 to-transparent pointer-events-none" />

            {/* Balloons Animation */}
            {showBalloons && <Balloons />}

            {/* Intro Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="z-10"
            >
                <h2 className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 font-light tracking-[0.2em] uppercase mb-4 transition-colors duration-500">
                    It's a special day
                </h2>
            </motion.div>

            {/* Main Title */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.2, type: "spring" }}
                className="z-10"
            >
                <h1 className="text-6xl md:text-8xl font-handwriting text-amber-500 dark:text-midnyt-gold drop-shadow-2xl mb-6 transition-colors duration-500">
                    Happy Birthday!
                </h1>
            </motion.div>

            {/* Name Reveal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="z-10 mt-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-wide transition-colors duration-500">
                    {name}
                </h2>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 4, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 z-10 text-slate-500 dark:text-gray-400 text-sm tracking-widest transition-colors duration-500"
            >
                SCROLL TO OPEN
            </motion.div>
        </section>
    );
};

export default Hero;
