import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';
import { RainbowArc } from './ui/RainbowArc';

/** Ink-weight spectrum: saturated enough to read as rainbow, dark enough for text. */
const LETTER_HUES = [
  'var(--rb-red)',
  'var(--rb-orange-ink)',
  'var(--rb-yellow-ink)',
  'var(--rb-green)',
  'var(--rb-teal-ink)',
  'var(--rb-blue)',
  'var(--rb-violet)',
  'var(--rb-pink)',
];

/** One word rendered letter-by-letter, each letter its own spectrum hue. */
const SpectrumWord: React.FC<{ word: string; offset?: number; className?: string }> = ({
  word,
  offset = 0,
  className = '',
}) => (
  <span className={`block ${className}`} style={{ overflowWrap: 'anywhere' }}>
    {word.split('').map((char, i) => (
      <span
        key={`${char}-${i}`}
        data-intro="letter"
        className="inline-block"
        style={{ color: LETTER_HUES[(i + offset) % LETTER_HUES.length] }}
      >
        {char}
      </span>
    ))}
  </span>
);

/**
 * Chapter 01 — one section-scale rainbow arching over the whole chapter.
 * Copy sits on a solid card so it stays readable where the arc passes behind it.
 */
export const IntroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        // Letters are colored in markup — motion only moves them.
        // Replays whenever the chapter is re-entered.
        gsap.fromTo(
          '[data-intro="letter"]',
          {
            yPercent: 115,
            rotate: (i: number) => (i % 2 ? 7 : -7),
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        scrollReveal('[data-intro="panel"]', { y: 26 }, {
          trigger: ref.current,
          duration: 0.5,
        });

        gsap.utils.toArray<HTMLElement>('[data-intro="polaroid"]').forEach((el, i) => {
          scrollReveal(el, { y: 54, rotate: i % 2 ? 11 : -11, scale: 0.88 }, {
            trigger: '[data-intro="stack"]',
            duration: 0.65,
            delay: i * 0.12,
            ease: 'back.out(1.4)',
          });
          gsap.to(el, {
            y: i % 2 ? -14 : 11,
            duration: 3.4 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1,
          });
        });

        gsap.to('[data-intro="arc"]', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const moments = [
    { src: ASSETS.characters.littleSheila, alt: 'Little Sheila artwork', label: 'Little Sheila', hue: 'var(--rb-green)' },
    { src: ASSETS.belinha.starHat, alt: 'Belinha wearing a star hat', label: 'Belinha', hue: 'var(--rb-orange)' },
    { src: ASSETS.colorful.rainbowSweets, alt: 'Rainbow sweets and color', label: 'Color', hue: 'var(--rb-violet)' },
  ];

  return (
    <section
      ref={ref}
      id="intro"
      className="rb-band--red rb-surface relative overflow-hidden pt-[var(--section-py-lg)] pb-[var(--section-py)]"
    >
      <div className="rb-dots absolute inset-0" aria-hidden />

      {/* SECTION-SCALE RAINBOW — arches over the whole chapter */}
      <div
        data-intro="arc"
        className="pointer-events-none absolute inset-x-[-12%] bottom-[-8%] top-[6%] sm:inset-x-[-6%]"
        aria-hidden
      >
        <RainbowArc className="h-full w-full" strokeWidth={13} draw />
      </div>

      <div className="sl-container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <span className="rb-chip">Chapter one</span>

            <h2 className="mt-5 font-display font-extrabold leading-[0.82] tracking-tighter">
              <SpectrumWord word="10" className="text-[clamp(4.5rem,15vw,11rem)]" />
              <SpectrumWord word="YEARS" offset={2} className="text-[clamp(2.75rem,9vw,6.5rem)]" />
            </h2>

            {/* Solid card keeps body copy readable over the arc */}
            <div
              data-intro="panel"
              className="mt-6 max-w-lg overflow-hidden rounded-[1.5rem] bg-white shadow-elevated"
            >
              <div className="h-2 w-full" style={{ background: 'var(--gradient-rainbow)' }} aria-hidden />
              <div className="p-6 sm:p-7">
                <p className="font-display text-[var(--text-heading-md)] font-extrabold leading-snug text-[var(--text-primary)]">
                  of making things with love
                </p>
                <p className="mt-3 text-[var(--text-body-lg)] leading-relaxed text-[var(--text-secondary)]">
                  Characters, color, Belinha, photographs, artwork — one creative world.
                  Final stories and dates arrive as Sheila shares them.
                </p>
                <a
                  href="#timeline"
                  className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[var(--band)] px-7 text-sm font-extrabold text-white transition-transform hover:scale-[1.03] cursor-pointer"
                >
                  Open the storybook
                </a>
              </div>
            </div>
          </div>

          {/* Polaroids stand under the bow */}
          <div data-intro="stack" className="lg:col-span-7 lg:pt-16">
            <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-7">
              {moments.map((m, i) => (
                <figure
                  key={m.src}
                  data-intro="polaroid"
                  className="w-[44%] max-w-[230px] bg-white p-3 pb-3 sm:w-[30%]"
                  style={{
                    boxShadow: `12px 12px 0 0 ${m.hue}`,
                    transform: `rotate(${i === 1 ? '2deg' : i === 0 ? '-4deg' : '5deg'})`,
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={m.src}
                      alt={m.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={460}
                      height={460}
                    />
                  </div>
                  <figcaption
                    className="pt-3 text-center font-[family-name:var(--font-hand)] text-xl leading-none"
                    style={{ color: m.hue }}
                  >
                    {m.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
