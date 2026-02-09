import React from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#E8F5E9', '#E3F2FD', '#81C784', '#64B5F6', '#FFF9C4', '#F8BBD0'];

export const Wheel = ({ items, rotation, onSpinEnd }) => {
    const numItems = items.length;
    const sliceAngle = 360 / numItems;
    const radius = 200; // SVG radius
    const cx = 200;
    const cy = 200;

    // Helper to calculate SVG path for a slice
    const getSlicePath = (index) => {
        const startAngle = index * sliceAngle;
        const endAngle = (index + 1) * sliceAngle;

        // Convert degrees to radians, subtracting 90 to start at 12 o'clock
        const startRad = (startAngle - 90) * (Math.PI / 180);
        const endRad = (endAngle - 90) * (Math.PI / 180);

        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);

        return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
    };

    return (
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 w-8 h-12">
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-md" />
            </div>

            <motion.div
                className="w-full h-full"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: "circOut" }}
                onAnimationComplete={onSpinEnd}
                style={{ transformOrigin: "center" }}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                    <g>
                        {items.map((item, index) => (
                            <path
                                key={index}
                                d={getSlicePath(index)}
                                fill={COLORS[index % COLORS.length]}
                                stroke="white"
                                strokeWidth="1"
                            />
                        ))}
                    </g>
                    <g>
                        {items.map((item, index) => {
                            const angle = index * sliceAngle + sliceAngle / 2;
                            const rad = (angle - 90) * (Math.PI / 180);
                            const tx = cx + (radius * 0.75) * Math.cos(rad);
                            const ty = cy + (radius * 0.75) * Math.sin(rad);

                            return (
                                <text
                                    key={index}
                                    x={tx}
                                    y={ty}
                                    fill="#374151" /* gray-700 */
                                    fontSize="8"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    transform={`rotate(${angle + 90}, ${tx}, ${ty})`}
                                >
                                    {items.length <= 12 ? (item.length > 15 ? item.substring(0, 15) + '...' : item) : index + 1}
                                </text>
                            );
                        })}
                    </g>
                    {/* Inner Circle for Hub */}
                    <circle cx={cx} cy={cy} r={20} fill="white" className="shadow-inner" />
                    <circle cx={cx} cy={cy} r={10} fill="#81C784" />
                </svg>
            </motion.div>
        </div>
    );
};
