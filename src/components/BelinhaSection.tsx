import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';
import { DogFriend } from './odyssey/OdysseyArt';

/**
 * Chapter 07 — Belinha: real photograph → illustrated character.
 * Only Sheila's own Belinha assets appear here. No other dogs, anywhere.
 */
export const BelinhaSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-be="copy"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.42,
        });

        scrollReveal('[data-be="real"]', { x: -30, rotate: -3 }, {
          trigger: '[data-be="bridge"]',
          duration: 0.6,
        });
        scrollReveal('[data-be="art"]', { x: 30, rotate: 3 }, {
          trigger: '[data-be="bridge"]',
          duration: 0.6,
        });

        // Spectrum arrow draws between the two panels
        scrollReveal('[data-be="link"]', { scaleX: 0 }, {
          trigger: '[data-be="bridge"]',
          duration: 0.5,
          delay: 0.25,
          ease: 'power2.inOut',
        });

        gsap.utils.toArray<HTMLElement>('[data-be="shot"]').forEach((el, i) => {
          scrollReveal(el, { y: 26, scale: 0.94 }, {
            trigger: '[data-be="strip"]',
            duration: 0.45,
            delay: i * 0.07,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const strip = [
    { src: ASSETS.belinha.sunsetHeld, alt: 'Belinha held toward the sunset', hue: 'var(--rb-orange)' },
    { src: ASSETS.belinha.sandcastle, alt: 'Belinha beside a sandcastle', hue: 'var(--rb-yellow)' },
    { src: ASSETS.belinha.jetski, alt: 'Belinha at the beach', hue: 'var(--rb-teal)' },
    { src: ASSETS.belinha.beads, alt: 'Belinha with beads and sunflowers', hue: 'var(--rb-green)' },
    { src: ASSETS.belinha.birthday, alt: 'Belinha at a birthday celebration', hue: 'var(--rb-pink)' },
  ];

  return (
    <section
      ref={ref}
      id="belinha"
      className="rb-band--orange rb-surface relative overflow-hidden py-[var(--section-py-lg)]"
    >
      <div className="sl-container relative z-10">
        <div data-be="copy" className="mx-auto max-w-2xl text-center">
          <span className="rb-chip">Chapter seven</span>
          <h2 className="mt-4 font-display text-[clamp(3rem,11vw,7rem)] font-extrabold leading-[0.9] tracking-tight text-[var(--band-ink)]">
            Belinha
          </h2>
          <p className="mt-4 text-[var(--text-body-lg)] leading-relaxed text-[var(--text-secondary)]">
            Best friend and muse. Real life on one side, her character on the other —
            and every dog picture on this site is hers.
          </p>
        </div>

        {/* Real ↔ character bridge */}
        <div
          data-be="bridge"
          className="mx-auto mt-14 grid max-w-5xl items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4"
        >
          <figure
            data-be="real"
            className="relative aspect-square overflow-hidden rounded-[1.75rem]"
            style={{ boxShadow: '14px 14px 0 0 var(--rb-red)' }}
          >
            <img
              src={ASSETS.belinha.starHat}
              alt="The real Belinha wearing a star hat"
              className="h-full w-full object-cover"
              loading="lazy"
              width={800}
              height={800}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[oklch(21%_0.03_300_/_0.72)] p-4 text-sm font-extrabold uppercase tracking-wider text-white">
              Real Belinha
            </figcaption>
          </figure>

          <div className="flex items-center justify-center md:flex-col md:gap-3">
            <div
              data-be="link"
              className="h-2 w-24 origin-left rounded-full md:h-24 md:w-2"
              style={{ background: 'var(--gradient-rainbow)' }}
              aria-hidden
            />
            <ArrowRight className="mx-3 h-6 w-6 text-[var(--band-ink)] md:rotate-90" aria-hidden />
          </div>

          <div
            data-be="art"
            className="relative flex aspect-square flex-col items-center justify-center rounded-[1.75rem] bg-white p-8"
            style={{ boxShadow: '14px 14px 0 0 var(--rb-blue)' }}
          >
            <DogFriend className="h-auto w-[70%] max-w-[240px]" />
            <p className="mt-5 font-display text-lg font-extrabold text-[var(--text-primary)]">
              Belinha, the character
            </p>
            <p className="mt-1 max-w-[220px] text-center text-xs text-[var(--text-muted)]">
              Her illustrated form inside the Spread Love world
            </p>
          </div>
        </div>

        {/* Curated moments — each with its own hue block */}
        <div data-be="strip" className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {strip.map((shot) => (
            <figure
              key={shot.src}
              data-be="shot"
              className="overflow-hidden rounded-2xl"
              style={{ boxShadow: `8px 8px 0 0 ${shot.hue}` }}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="aspect-square w-full object-cover"
                loading="lazy"
                width={440}
                height={440}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
