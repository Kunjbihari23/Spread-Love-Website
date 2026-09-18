import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenisSmoothScroll() {
  useEffect(() => {
    // Skip smooth scroll when user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Initialize Lenis smooth scrolling with playful fluid easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Smoothly route anchor links through Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const elem = document.querySelector(href);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, {
            offset: -75,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Expose lenis instance globally if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

export function scrollToSection(sectionId: string, offset: number = -75) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const element = document.getElementById(sectionId.replace(/^#/, ''));
  if (element) {
    if (lenis) {
      lenis.scrollTo(element, { offset, duration: 1.3 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
