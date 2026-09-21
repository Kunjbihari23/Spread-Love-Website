import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, ScrollTrigger } from '../../lib/motion';

/** Spectrum rail across the top, scrubbed by page scroll. */
export const RainbowProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = whenMotionOk(() => {
      gsap.to(ref.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });
    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  });

  return <div ref={ref} className="rb-progress" aria-hidden />;
};
