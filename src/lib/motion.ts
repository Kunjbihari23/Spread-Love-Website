import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Snappy scroll reveals — UX 150–400ms range */
export const ST = {
  start: 'top 90%',
  toggleActions: 'play none none none' as const,
  once: true,
} as const;

export type RevealOpts = {
  trigger?: gsap.DOMTarget;
  stagger?: number | gsap.StaggerVars;
  duration?: number;
  delay?: number;
  ease?: string;
};

/**
 * Safe scroll reveal.
 * Uses fromTo + immediateRender:false so content never stays stuck at opacity 0
 * when ScrollTrigger / Lenis race on load.
 */
export function scrollReveal(
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  opts: RevealOpts = {}
) {
  const {
    trigger,
    stagger,
    duration = 0.4,
    delay = 0,
    ease = 'power2.out',
  } = opts;

  const toVars: gsap.TweenVars = {
    autoAlpha: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    duration,
    delay,
    ease,
    stagger,
    overwrite: 'auto',
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget | undefined,
      start: ST.start,
      toggleActions: ST.toggleActions,
      once: true,
    },
  };

  // If no explicit trigger, let ScrollTrigger use first target element
  if (!trigger) {
    delete (toVars.scrollTrigger as ScrollTrigger.Vars).trigger;
  }

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, ...fromVars, immediateRender: false },
    toVars
  );
}

/**
 * Instant entrance (hero). Pass `paused: true` when adding into a timeline.
 */
export function enterFrom(
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, ...fromVars },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
      ...toVars,
    }
  );
}

/**
 * Run GSAP only when user allows motion.
 * Always refreshes ScrollTrigger after setup so Lenis layout is correct.
 */
export function whenMotionOk(setup: () => void): gsap.MatchMedia {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    setup();
    // Double rAF: wait for layout + Lenis first paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  });
  return mm;
}

export { gsap, ScrollTrigger, useGSAP };
