import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Shared ScrollTrigger defaults — playful, not aggressive */
export const ST = {
  start: 'top 82%',
  toggleActions: 'play none none none' as const,
};

/**
 * Run GSAP only when user allows motion.
 * Prefer gsap.matchMedia over manual media queries (auto cleanup).
 */
export function whenMotionOk(setup: () => void): gsap.MatchMedia {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', setup);
  return mm;
}

export { gsap, ScrollTrigger, useGSAP };
