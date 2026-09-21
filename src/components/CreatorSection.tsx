import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';
import { DollFriend } from './odyssey/OdysseyArt';
import { RainbowArc } from './ui/RainbowArc';

/** Editorial: creator photograph + characters visually interacting */
export const CreatorSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-cr="portrait"]', { x: -30 }, {
          trigger: ref.current,
          duration: 0.55,
        });
        scrollReveal('[data-cr="float"]', { y: 28, scale: 0.9 }, {
          trigger: ref.current,
          stagger: 0.12,
          duration: 0.5,
          ease: 'back.out(1.5)',
        });
        scrollReveal('[data-cr="copy"] > *', { y: 16 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.4,
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
      className="relative overflow-hidden py-[var(--section-py-lg)] bg-white"
    >
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-40 pointer-events-none hidden lg:block"
        style={{ background: 'var(--gradient-rainbow-soft)' }}
      />

      <div className="sl-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Large portrait with overlapping character art */}
          <div className="lg:col-span-7 relative">
            <div
              data-cr="portrait"
              className="relative aspect-[4/5] sm:aspect-[5/4] max-h-[560px] mx-auto lg:mx-0 overflow-hidden rounded-[2rem] shadow-floating"
            >
              <img
                src={ASSETS.creator.portrait}
                alt="Sheila Rocha, creator of Spread Love"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                width={900}
                height={1100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-white font-display text-xl sm:text-2xl font-bold">
                Sheila Rocha
              </p>
            </div>

            {/* Floating Little Sheila */}
            <div
              data-cr="float"
              className="absolute -bottom-4 -left-2 sm:left-4 w-28 sm:w-36 rounded-2xl overflow-hidden border-4 border-white shadow-elevated bg-white"
            >
              <img
                src={ASSETS.characters.littleSheila}
                alt="Little Sheila"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <span className="block px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50">
                Little Sheila
              </span>
            </div>

            {/* Floating doll SVG */}
            <div
              data-cr="float"
              className="absolute top-6 -right-2 sm:right-2 w-24 sm:w-28 rounded-2xl bg-white/95 border-4 border-white shadow-elevated p-2"
            >
              <DollFriend className="w-full h-auto" />
              <span className="block text-center text-[10px] font-bold uppercase tracking-wide text-pink-600 mt-1">
                Spread Love Doll
              </span>
            </div>
          </div>

          <div data-cr="copy" className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--love-pink)]">
              The creator
            </p>
            <h2 className="font-display text-[var(--text-heading-xl)] font-extrabold text-[var(--text-primary)] leading-[1.15]">
              Her World of Characters
            </h2>
            <RainbowArc variant="stripe" className="mx-auto lg:mx-0 max-w-[9rem]" />
            <p className="text-[var(--text-body-lg)] text-[var(--text-secondary)] leading-relaxed">
              Behind every doll, story, and colorful adventure is Sheila — and the characters
              who grew with her over ten years of creating with love.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Replaceable placeholder — final bio and character notes coming from the client.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#characters"
                className="inline-flex min-h-11 items-center rounded-full border border-pink-200 bg-pink-50 px-5 text-sm font-bold text-pink-700 hover:bg-pink-100 transition-colors cursor-pointer"
              >
                Meet the characters
              </a>
              <a
                href="#belinha"
                className="inline-flex min-h-11 items-center rounded-full border border-amber-200 bg-amber-50 px-5 text-sm font-bold text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                Meet Belinha
              </a>
            </div>
          </div>
        </div>

        {/* Secondary beach moment */}
        <div className="mt-16 grid sm:grid-cols-2 gap-4 sm:gap-6">
          <figure className="relative overflow-hidden rounded-[1.5rem] aspect-[16/10] shadow-card">
            <img
              src={ASSETS.creator.sandHeart}
              alt="Sheila and Belinha with a heart in the sand"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
          <figure className="relative overflow-hidden rounded-[1.5rem] aspect-[16/10] shadow-card">
            <img
              src={ASSETS.creator.sunset}
              alt="Sheila and Belinha at sunset"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};
