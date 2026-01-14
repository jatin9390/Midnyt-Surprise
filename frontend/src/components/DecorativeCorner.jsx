import React from 'react';

const DecorativeCorner = ({ rotation = 0, className = "" }) => {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute pointer-events-none opacity-40 ${className}`}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {/* Main Flower */}
            <path
                d="M50 50 C50 20 20 20 20 50 C20 80 50 80 50 50 Z"
                className="fill-midnyt-gold"
                transform="rotate(0 50 50)"
            />
            <path
                d="M50 50 C50 20 80 20 80 50 C80 80 50 80 50 50 Z"
                className="fill-midnyt-gold"
                transform="rotate(90 50 50)"
            />
            <path
                d="M50 50 C50 80 80 80 80 50 C80 20 50 20 50 50 Z"
                className="fill-midnyt-gold"
                transform="rotate(180 50 50)"
            />
            <path
                d="M50 50 C50 80 20 80 20 50 C20 20 50 20 50 50 Z"
                className="fill-midnyt-gold"
                transform="rotate(270 50 50)"
            />

            {/* Center Dot */}
            <circle cx="50" cy="50" r="5" className="fill-orange-400" />

            {/* Vines/Leaves */}
            <path d="M50 50 Q 80 10 90 0 M50 50 Q 10 80 0 90" stroke="#fbbf24" strokeWidth="2" fill="none" />
        </svg>
    );
};

export default DecorativeCorner;
