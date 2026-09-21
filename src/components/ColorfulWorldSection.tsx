import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';
import { RainbowArc } from './ui/RainbowArc';

/** Balloons / sweets / rainbow celebration moment */
export const ColorfulWorldSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-cw="copy"] > *', { y: 20 }, {
          trigger: ref.current,
          stagger: 0.08,
          duration: 0.4,
        });
        scrollReveal('[data-cw="hero-img"]', { scale: 0.96 }, {
          trigger: ref.current,
          duration: 0.55,
        });

        gsap.to('[data-cw="float"]', {
          y: -14,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.35, from: 'random' },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="colorful-world"
      className="relative overflow-hidden py-[var(--section-py-lg)]"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fff7ed 40%, #fdf2f8 100%)' }}
    >
      {/* Soft floating color orbs */}
      <div data-cw="float" className="absolute top-16 left-[8%] w-16 h-16 rounded-full bg-pink-400/30 blur-sm pointer-events-none" aria-hidden />
      <div data-cw="float" className="absolute top-32 right-[12%] w-12 h-12 rounded-full bg-sky-400/35 blur-sm pointer-events-none" aria-hidden />
      <div data-cw="float" className="absolute bottom-24 left-[18%] w-10 h-10 rounded-full bg-amber-400/40 blur-sm pointer-events-none" aria-hidden />
      <div data-cw="float" className="absolute bottom-40 right-[22%] w-14 h-14 rounded-full bg-violet-400/30 blur-sm pointer-events-none" aria-hidden />

      <div className="sl-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div data-cw="copy" className="space-y-5 text-center lg:text-left order-2 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--love-pink)]">
              Her colorful world
            </p>
            <h2 className="font-display text-[var(--text-heading-xl)] font-extrabold text-[var(--text-primary)] leading-[1.15]">
              Sweets, Rainbows &amp; Play
            </h2>
            <RainbowArc variant="stripe" className="mx-auto lg:mx-0 max-w-[10rem]" />
            <p className="text-[var(--text-body-lg)] text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto lg:mx-0">
              Bright toys, candy colors, and rainbow energy — the playful visual spirit that
              runs through every Spread Love creation.
            </p>
          </div>

          <div data-cw="hero-img" className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-floating aspect-[4/3]">
              <img
                src={ASSETS.colorful.rainbowSweets}
                alt="Colorful rainbow sweets and toys display"
                className="h-full w-full object-cover"
                loading="lazy"
                width={900}
                height={675}
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%]">
              <RainbowArc className="w-full h-auto drop-shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
