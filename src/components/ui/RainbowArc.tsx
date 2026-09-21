import React from 'react';

interface RainbowArcProps {
  className?: string;
  /** soft = translucent wash; stripe = solid brand ribbon; arc = curved svg */
  variant?: 'soft' | 'stripe' | 'arc';
  /** Decorative only — hide from AT by default */
  decorative?: boolean;
}

/** Recurring rainbow motif — use sparingly as accent, not page wash. */
export const RainbowArc: React.FC<RainbowArcProps> = ({
  className = '',
  variant = 'arc',
  decorative = true,
}) => {
  if (variant === 'stripe') {
    return (
      <div
        className={`h-1.5 w-full rounded-full ${className}`}
        style={{ background: 'var(--gradient-rainbow)' }}
        aria-hidden={decorative}
      />
    );
  }

  if (variant === 'soft') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{ background: 'var(--gradient-rainbow-soft)' }}
        aria-hidden={decorative}
      />
    );
  }

  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 400 120"
      fill="none"
      aria-hidden={decorative}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 100 Q200 -20 380 100" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M28 100 Q200 -8 372 100" stroke="#f97316" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M36 100 Q200 4 364 100" stroke="#eab308" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M44 100 Q200 16 356 100" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M52 100 Q200 28 348 100" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M60 100 Q200 40 340 100" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
};
