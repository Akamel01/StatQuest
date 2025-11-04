
import React from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div
        className="absolute w-2 h-4 animate-confetti-burst"
        style={style}
    />
);

const Confetti: React.FC = () => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const pieces = Array.from({ length: 50 }).map((_, i) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 0.2}s`,
        };
        return <ConfettiPiece key={i} style={style} />;
    });

    return <div className="absolute inset-0 pointer-events-none z-50">{pieces}</div>;
};

export default Confetti;
