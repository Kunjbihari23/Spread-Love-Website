import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenisSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Official Lenis ↔ GSAP sync (native scroll — no scrollerProxy)
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

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
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const refreshTimer = window.setTimeout(refresh, 350);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('load', refresh);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      ScrollTrigger.refresh();
    };
  }, []);
}

export function scrollToSection(sectionId: string, offset: number = -75) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const element = document.getElementById(sectionId.replace(/^#/, ''));
  if (element) {
    if (lenis) {
      lenis.scrollTo(element, { offset, duration: 1.1 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
