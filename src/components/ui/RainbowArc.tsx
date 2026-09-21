import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk } from '../../lib/motion';

/** Eight concentric bands. Band spacing scales with strokeWidth. */
const BAND_HUES = [
  'var(--rb-red)',
  'var(--rb-orange)',
  'var(--rb-yellow)',
  'var(--rb-green)',
  'var(--rb-teal)',
  'var(--rb-blue)',
  'var(--rb-violet)',
  'var(--rb-pink)',
];

interface RainbowArcProps {
  className?: string;
  /** stripe = solid ribbon · soft = translucent wash · arc = drawn bow */
  variant?: 'soft' | 'stripe' | 'arc';
  /** arc only: draw the bow on scroll instead of showing it instantly */
  draw?: boolean;
  /** arc only: band thickness in viewBox units — go big for section-scale arcs */
  strokeWidth?: number;
}

/** Recurring rainbow motif. The `arc` variant draws itself with DrawSVG. */
export const RainbowArc: React.FC<RainbowArcProps> = ({
  className = '',
  variant = 'arc',
  draw = false,
  strokeWidth = 8,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (variant !== 'arc' || !draw) return;
      const mm = whenMotionOk(() => {
        // Re-draws every time the arc scrolls back into view, and un-draws
        // on the way out — matches the section reveals elsewhere on the page.
        gsap.fromTo(
          svgRef.current!.querySelectorAll('path'),
          { drawSVG: '50% 50%' },
          {
            drawSVG: '0% 100%',
            duration: 1.4,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: svgRef.current,
              start: 'top 95%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
      return () => mm.revert();
    },
    { dependencies: [variant, draw] }
  );

  if (variant === 'stripe') {
    return (
      <div
        className={`h-2 w-full rounded-full ${className}`}
        style={{ background: 'var(--gradient-rainbow)' }}
        aria-hidden
      />
    );
  }

  if (variant === 'soft') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{ background: 'var(--gradient-rainbow-soft)' }}
        aria-hidden
      />
    );
  }

  // Bands are drawn outermost-first so the red arc sits on top of the bow.
  const gap = strokeWidth * 1.02;

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none ${className}`}
      viewBox="0 0 400 200"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {BAND_HUES.map((hue, i) => {
        const inset = i * gap;
        return (
          <path
            key={hue}
            d={`M${10 + inset} 198 Q200 ${-60 + inset * 2.1} ${390 - inset} 198`}
            stroke={hue}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};
