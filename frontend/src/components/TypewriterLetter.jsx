import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../data/content';

const TypewriterLetter = ({ startTyping, message = {} }) => {
    // Flatten text content into a single array of paragraphs
    const paragraphs = message.messageContent
        ? message.messageContent.split('\n').filter(p => p.trim() !== '') // Split manual message by newlines
        : letterContent
            .filter(item => item.type === 'text')
            .map(item => item.content);

    return (
        <div className="font-handwriting text-gray-800 space-y-6">
            {paragraphs.map((text, pIndex) => (
                <TypewriterParagraph
                    key={pIndex}
                    text={text}
                    delay={pIndex * 2} // Stagger paragraphs
                    start={startTyping}
                />
            ))}

            {/* Photo Memories */}
            {message.images && message.images.length > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-2 justify-center pb-4">
                    {message.images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8, rotate: (idx % 2 === 0 ? -2 : 2) * (idx + 1) }}
                            animate={startTyping ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                            transition={{ delay: paragraphs.length * 2 + 1 + (idx * 0.3), duration: 0.5 }}
                            className="bg-white p-1.5 shadow-md border border-gray-100 transform hover:scale-110 transition-transform duration-300 mx-auto w-full max-w-[120px]"
                        >
                            <img src={img} alt={`Memory ${idx + 1}`} className="w-full h-auto aspect-square object-cover sepia-[0.2]" />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Signature */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={startTyping ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: paragraphs.length * 2 + 2, duration: 1 }}
                className="mt-8 text-right"
            >
                <p className="text-xl text-midnyt-gold">With Love,</p>
                <p className="text-2xl mt-1">{message.senderName}</p>
            </motion.div>
        </div>
    );
};

const TypewriterParagraph = ({ text, delay, start }) => {
    // Split text into characters
    const characters = text.split("");

    return (
        <p className="text-lg leading-relaxed">
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={start ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                        delay: delay + (index * 0.03), // 30ms per character
                        duration: 0.01
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </p>
    );
};

export default TypewriterLetter;
