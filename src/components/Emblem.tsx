import React from 'react';

interface EmblemProps {
  className?: string;
  size?: number;
}

export const Emblem: React.FC<EmblemProps> = ({ className = '', size = 48 }) => {
  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 bg-white/95 px-2.5 py-1 rounded-sm border border-[#C5A059]/40 shadow-sm ${className}`}
      style={{ minHeight: size }}
    >
      <img
        src="/assets/aistudio/1777983492806-removebg-preview_2f7b52f7.png"
        alt="Nieuw Guinea Raad - Dewan Papua"
        style={{ height: size, width: 'auto' }}
        className="object-contain max-w-full"
      />
    </div>
  );
};
