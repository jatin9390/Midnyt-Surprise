import React from 'react';
import { motion } from 'framer-motion';

const PhotoFrame = ({ src, caption, rotate = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotate }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
            className="my-12 flex justify-center"
        >
            <div
                className="bg-white p-4 pb-12 shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer max-w-sm"
                style={{ transform: `rotate(${rotate}deg)` }}
            >
                <div className="overflow-hidden aspect-[4/5] bg-gray-200">
                    <img
                        src={src}
                        alt={caption}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                    />
                </div>
                <p className="font-handwriting text-gray-800 text-xl text-center mt-4">
                    {caption}
                </p>
            </div>
        </motion.div>
    );
};

export default PhotoFrame;
