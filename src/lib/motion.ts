import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Easing curves tailored for Spread Love playful & premium feel */
export const EASE = {
  playful: 'back.out(1.4)',
  spring: 'elastic.out(1, 0.5)',
  bounce: 'bounce.out',
  smooth: 'power3.out',
  gentle: 'power2.out',
  inOut: 'power2.inOut',
} as const;

/** Standard stagger durations for list items, grids, and cards */
export const STAGGER = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.15,
} as const;

/** Snappy scroll reveals with reverse support on scroll re-entry */
export const ST = {
  start: 'top 85%',
  toggleActions: 'play reverse play reverse' as const,
  once: false,
} as const;

export type RevealOpts = {
  trigger?: gsap.DOMTarget;
  stagger?: number | gsap.StaggerVars;
  duration?: number;
  delay?: number;
  ease?: string;
  toggleActions?: string;
  once?: boolean;
};

/**
 * Safe scroll reveal.
 * Reverses/re-animates when user scrolls out and back into the section.
 */
export function scrollReveal(
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  opts: RevealOpts = {}
) {
  const {
    trigger,
    stagger = STAGGER.normal,
    duration = 0.5,
    delay = 0,
    ease = EASE.gentle,
    toggleActions = ST.toggleActions,
    once = ST.once,
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
      toggleActions,
      once,
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
      duration: 0.5,
      ease: EASE.smooth,
      overwrite: 'auto',
      ...toVars,
    }
  );
}

/**
 * Creates organic floating animation for floating elements/characters.
 */
export function createFloatAnimation(
  target: gsap.TweenTarget,
  options: { distance?: number; duration?: number; delay?: number } = {}
) {
  const { distance = 12, duration = 3.5, delay = 0 } = options;
  return gsap.to(target, {
    y: `-=${distance}`,
    rotation: '+=2',
    duration,
    delay,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
}

/**
 * Checks if user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

