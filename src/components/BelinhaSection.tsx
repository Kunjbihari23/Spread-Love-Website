import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';
import { DogFriend } from './odyssey/OdysseyArt';
import { RainbowArc } from './ui/RainbowArc';

/**
 * Belinha: real life → creative interpretation → character art.
 * Only client Belinha photos + existing DogFriend illustration (no stock dogs).
 */
export const BelinhaSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-be="copy"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.4,
        });
        scrollReveal('[data-be="real"]', { x: -24 }, {
          trigger: ref.current,
          duration: 0.5,
        });
        scrollReveal('[data-be="art"]', { x: 24 }, {
          trigger: ref.current,
          duration: 0.5,
        });
        scrollReveal('[data-be="strip"] img', { y: 20, scale: 0.95 }, {
          trigger: '[data-be="strip"]',
          stagger: 0.08,
          duration: 0.4,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const strip = [
    { src: ASSETS.belinha.sunsetHeld, alt: 'Belinha held toward the sunset' },
    { src: ASSETS.belinha.sandcastle, alt: 'Belinha with a sandcastle' },
    { src: ASSETS.belinha.jetski, alt: 'Belinha at the beach' },
    { src: ASSETS.belinha.beads, alt: 'Belinha with beads and sunflowers' },
    { src: ASSETS.belinha.birthday, alt: 'Belinha on a birthday celebration' },
  ];

  return (
    <section
      ref={ref}
      id="belinha"
      className="relative overflow-hidden py-[var(--section-py-lg)]"
      style={{ background: 'var(--gradient-beach)' }}
    >
      <div className="sl-container relative z-10">
        <div data-be="copy" className="max-w-2xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
            Best friend &amp; muse
          </p>
          <h2 className="font-display text-[var(--text-heading-xl)] font-extrabold text-[var(--text-primary)] leading-[1.15]">
            Belinha
          </h2>
          <RainbowArc variant="stripe" className="mx-auto max-w-[8rem]" />
          <p className="text-[var(--text-body-lg)] text-[var(--text-secondary)] leading-relaxed">
            Real life. Creative interpretation. Character. Every dog photo here is Belinha —
            no others.
          </p>
        </div>

        {/* Real ↔ Character bridge */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center max-w-5xl mx-auto">
          <figure
            data-be="real"
            className="relative overflow-hidden rounded-[1.75rem] shadow-floating aspect-square"
          >
            <img
              src={ASSETS.belinha.starHat}
              alt="The real Belinha wearing a star hat"
              className="h-full w-full object-cover"
              loading="lazy"
              width={700}
              height={700}
            />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/70 to-transparent">
              <span className="text-white text-sm font-bold">Real Belinha</span>
            </figcaption>
          </figure>

          <div className="flex md:flex-col items-center justify-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider py-2">
            <span className="hidden md:block w-px h-8 bg-amber-300" aria-hidden />
            <span>→</span>
            <span className="text-center leading-tight">Into the<br className="hidden md:block" /> world</span>
            <span>→</span>
            <span className="hidden md:block w-px h-8 bg-amber-300" aria-hidden />
          </div>

          <div
            data-be="art"
            className="relative flex flex-col items-center justify-center rounded-[1.75rem] bg-white shadow-floating aspect-square border border-amber-100 p-8"
          >
            <DogFriend className="w-[70%] max-w-[220px] h-auto drop-shadow-md" />
            <p className="mt-4 text-sm font-bold text-amber-800">Creative Belinha</p>
            <p className="text-xs text-slate-500 text-center mt-1 max-w-[200px]">
              Illustrated character from the Spread Love universe
            </p>
          </div>
        </div>

        {/* Photo strip — curated moments */}
        <div data-be="strip" className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {strip.map((shot) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              className="aspect-square w-full object-cover rounded-2xl shadow-card"
              loading="lazy"
              width={400}
              height={400}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
