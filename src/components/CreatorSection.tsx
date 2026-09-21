import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';
import { DollFriend } from './odyssey/OdysseyArt';

/** Chapter 02 — the creator, with her characters crowding into frame. */
export const CreatorSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-cr="portrait"]', { x: -34, rotate: -3 }, {
          trigger: ref.current,
          duration: 0.6,
        });
        scrollReveal('[data-cr="copy"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.42,
        });
        scrollReveal('[data-cr="float"]', { y: 30, scale: 0.86, rotate: 8 }, {
          trigger: ref.current,
          stagger: 0.13,
          duration: 0.55,
          ease: 'back.out(1.7)',
        });
        scrollReveal('[data-cr="strip"] figure', { y: 26 }, {
          trigger: '[data-cr="strip"]',
          stagger: 0.1,
          duration: 0.45,
        });

        gsap.to('[data-cr="float"]', {
          y: -10,
          rotate: 2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.4,
          delay: 1,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="creator"
      className="rb-band--violet relative overflow-hidden bg-white py-[var(--section-py-lg)]"
    >
      {/* Solid color slab behind the portrait — no blurry orbs */}
      <div
        className="absolute inset-y-0 left-0 hidden w-[38%] lg:block"
        style={{ background: 'var(--band)' }}
        aria-hidden
      />

      <div className="sl-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div
              data-cr="portrait"
              className="relative mx-auto aspect-[4/5] max-h-[600px] overflow-hidden rounded-[2rem] lg:mx-0"
              style={{ boxShadow: '16px 16px 0 0 var(--rb-yellow)' }}
            >
              <img
                src={ASSETS.creator.portrait}
                alt="Sheila Rocha, creator of Spread Love"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                width={900}
                height={1125}
              />
              <p className="absolute bottom-0 left-0 right-0 bg-[oklch(21%_0.03_300_/_0.75)] p-5 font-display text-2xl font-extrabold text-white">
                Sheila Rocha
              </p>
            </div>

            {/* Little Sheila artwork peeking in */}
            <div
              data-cr="float"
              className="absolute -bottom-6 left-0 w-28 overflow-hidden rounded-2xl bg-white sm:w-36"
              style={{ boxShadow: '8px 8px 0 0 var(--rb-green)' }}
            >
              <img
                src={ASSETS.characters.littleSheila}
                alt="Little Sheila"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <span className="block bg-[var(--rb-green)] px-2 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-wide text-white">
                Little Sheila
              </span>
            </div>

            {/* Spread Love Doll */}
            <div
              data-cr="float"
              className="absolute -top-4 right-0 w-24 rounded-2xl bg-white p-2 sm:w-32"
              style={{ boxShadow: '8px 8px 0 0 var(--rb-pink)' }}
            >
              <DollFriend className="h-auto w-full" />
              <span className="mt-1 block text-center text-[10px] font-extrabold uppercase tracking-wide text-[var(--rb-pink-ink)]">
                Spread Love Doll
              </span>
            </div>
          </div>

          <div data-cr="copy" className="lg:col-span-6 lg:pl-6">
            <span className="rb-chip">Chapter two</span>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tight text-[var(--text-primary)]">
              Her world of{' '}
              <span className="rb-underline">characters</span>
            </h2>
            <p className="mt-5 max-w-lg text-[var(--text-body-lg)] leading-relaxed text-[var(--text-secondary)]">
              Behind every doll, drawing, and colorful story is Sheila — and the characters
              that grew alongside her over ten years.
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-muted)]">
              Placeholder text. Final bio and character notes coming from the client.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#characters"
                className="inline-flex min-h-12 items-center rounded-full bg-[var(--band)] px-6 text-sm font-extrabold text-white transition-transform hover:scale-[1.03] cursor-pointer"
              >
                Meet the characters
              </a>
              <a
                href="#belinha"
                className="inline-flex min-h-12 items-center rounded-full border-2 border-[var(--text-primary)] px-6 text-sm font-extrabold text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-white cursor-pointer"
              >
                Meet Belinha
              </a>
            </div>
          </div>
        </div>

        {/* Two beach moments, color-blocked */}
        <div data-cr="strip" className="mt-16 grid gap-5 sm:grid-cols-2">
          <figure
            className="overflow-hidden rounded-[1.5rem]"
            style={{ boxShadow: '10px 10px 0 0 var(--rb-teal)' }}
          >
            <img
              src={ASSETS.creator.sandHeart}
              alt="Sheila and Belinha with a heart drawn in the sand"
              className="aspect-16/10 w-full object-cover"
              loading="lazy"
            />
          </figure>
          <figure
            className="overflow-hidden rounded-[1.5rem]"
            style={{ boxShadow: '10px 10px 0 0 var(--rb-orange)' }}
          >
            <img
              src={ASSETS.creator.sunset}
              alt="Sheila and Belinha at sunset"
              className="aspect-16/10 w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};
