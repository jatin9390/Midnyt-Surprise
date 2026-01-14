import React from 'react';

const SerialLights = () => {
    // Generate many lights for the border
    // Top & Bottom: 50 lights each
    // Left & Right: 30 lights each
    // Total ~160 lights

    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

    const LightNode = ({ color, className, delay }) => (
        <div
            className={`w-3 h-3 rounded-full shadow-lg ${color} ${className} animate-pulse`}
            style={{
                boxShadow: `0 0 10px currentColor`,
                animationDelay: `${delay}s`,
                animationDuration: '1.5s'
            }}
        />
    );

    const renderLights = (count, orientation) => {
        return Array.from({ length: count }).map((_, i) => {
            const color = colors[i % colors.length];
            const delay = Math.random() * 2;

            return (
                <LightNode
                    key={i}
                    color={color}
                    delay={delay}
                    className={orientation === 'horizontal' ? 'mx-2' : 'my-2'}
                />
            );
        });
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Top String */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-2 transform -translate-y-1">
                {renderLights(40, 'horizontal')}
            </div>

            {/* Bottom String */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 transform translate-y-1">
                {renderLights(40, 'horizontal')}
            </div>

            {/* Left String */}
            <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between py-2 transform -translate-x-1">
                {renderLights(20, 'vertical')}
            </div>

            {/* Right String */}
            <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-between py-2 transform translate-x-1">
                {renderLights(20, 'vertical')}
            </div>
        </div>
    );
};

export default SerialLights;
