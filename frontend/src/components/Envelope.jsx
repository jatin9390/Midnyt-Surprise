import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterLetter from './TypewriterLetter';
import DecorativeCorner from './DecorativeCorner';

const Envelope = ({ message }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] perspective-1000 py-20">
            <div className="relative w-[90vw] md:w-[60vw] lg:w-[50vw] aspect-[4/3] mx-auto transform hover:scale-105 transition-transform duration-500">

                {/* Envelope Body (Back) */}
                <div className="absolute inset-0 bg-rose-400 dark:bg-pink-700 rounded-b-xl shadow-2xl overflow-visible origin-bottom transition-colors duration-500" />

                {/* The Letter Card */}
                <motion.div
                    initial={{ y: 0, zIndex: 0 }}
                    animate={isOpen ? { y: -200, zIndex: 20 } : { y: 0, zIndex: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                    className="absolute inset-x-4 bottom-4 top-12 bg-paper rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 overflow-y-auto custom-scrollbar border-[6px] border-double border-midnyt-gold/60"
                >
                    {/* Floral Decorations */}
                    <DecorativeCorner className="left-2 top-2" rotation={0} />
                    <DecorativeCorner className="right-2 top-2" rotation={90} />
                    <DecorativeCorner className="right-2 bottom-2" rotation={180} />
                    <DecorativeCorner className="left-2 bottom-2" rotation={270} />

                    <div className="relative z-10">
                        <TypewriterLetter startTyping={isOpen} message={message} />
                    </div>
                </motion.div>

                {/* Envelope Front (Hides the bottom of letter) */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 z-10 pointer-events-none">
                    {/* Left Triangle */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-rose-500 dark:bg-pink-600 transition-colors duration-500"
                        style={{ clipPath: 'polygon(0 0, 50% 100%, 0 100%)' }} />
                    {/* Right Triangle */}
                    <div className="absolute bottom-0 right-0 w-full h-full bg-rose-500 dark:bg-pink-600 transition-colors duration-500"
                        style={{ clipPath: 'polygon(100% 0, 50% 100%, 100% 100%)' }} />
                    {/* Bottom Triangle */}
                    <div className="absolute bottom-0 inset-x-0 h-full bg-rose-400 dark:bg-pink-500 transition-colors duration-500"
                        style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
                </div>

                {/* Flap (Top Triangle) */}
                <motion.div
                    initial={{ rotateX: 0 }}
                    animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-0 inset-x-0 h-1/2 bg-rose-600 dark:bg-pink-800 origin-top z-30 transition-colors duration-500"
                    style={{
                        clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                        backfaceVisibility: 'visible'
                    }}
                />

                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setIsOpen(true);
                            import('canvas-confetti').then((confetti) => {
                                var duration = 15 * 1000;
                                var animationEnd = Date.now() + duration;
                                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                                function random(min, max) {
                                    return Math.random() * (max - min) + min;
                                }

                                const particleCount = 100;
                                confetti.default({
                                    particleCount,
                                    spread: 100,
                                    origin: { y: 0.6 }
                                });
                            });
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-midnyt-gold text-pink-500 dark:text-midnyt-dark px-10 py-4 rounded-full font-bold text-2xl shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
                    >
                        Open
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default Envelope;
