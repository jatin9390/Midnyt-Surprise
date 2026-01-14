import React from 'react';
import { motion } from 'framer-motion';

const balloonColors = ['#ff718d', '#fdb44b', '#68b3ff', '#a06cd5', '#fdff6a'];

const Balloons = () => {
    // Generate random balloons
    const balloons = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        color: balloonColors[i % balloonColors.length],
        left: Math.random() * 100, // Random horizontal position
        delay: Math.random() * 2, // Random starting delay
        duration: 4 + Math.random() * 4, // Random speed
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {balloons.map((b) => (
                <motion.div
                    key={b.id}
                    initial={{ y: '110vh', opacity: 1 }}
                    animate={{ y: '-150vh', opacity: 1 }}
                    transition={{
                        duration: b.duration * 1.5, // Move slower/smoother
                        delay: b.delay,
                        ease: "linear", // Constant speed so they don't 'stick'
                        repeat: 0
                    }}
                    style={{ left: `${b.left}%` }}
                    className="absolute bottom-0 flex flex-col items-center"
                >
                    {/* Realistic CSS Balloon */}
                    <div
                        style={{
                            backgroundColor: b.color,
                            boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.3), inset 10px 10px 20px rgba(255,255,255,0.4), 5px 5px 15px rgba(0,0,0,0.2)'
                        }}
                        className="w-16 h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] relative"
                    >
                        {/* Highlights */}
                        <div className="absolute top-[15%] left-[20%] w-3 h-6 bg-white/40 blur-[2px] rounded-full transform -rotate-45"></div>

                        {/* Knot */}
                        <div
                            style={{ backgroundColor: b.color }}
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 rounded-[50%] skew-y-12"
                        ></div>
                    </div>
                    {/* String */}
                    <div className="w-[1px] h-24 bg-white/60 origin-top animate-wave"></div>
                </motion.div>
            ))}
        </div>
    );
};

export default Balloons;
