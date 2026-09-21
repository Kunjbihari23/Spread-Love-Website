import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk } from '../../lib/motion';

interface RainbowMarqueeProps {
  items: string[];
  /** seconds for one full loop */
  duration?: number;
  className?: string;
}

/** Spectrum ribbon of repeating words — sits between chapters. */
export const RainbowMarquee: React.FC<RainbowMarqueeProps> = ({
  items,
  duration = 22,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration,
          ease: 'none',
          repeat: -1,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [duration] }
  );

  // Doubled so the -50% loop is seamless
  const loop = [...items, ...items];

  return (
    <div className={`rb-marquee py-3 ${className}`} aria-hidden>
      <div ref={trackRef} className="rb-marquee__track">
        {loop.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.22em] text-white/95 whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
