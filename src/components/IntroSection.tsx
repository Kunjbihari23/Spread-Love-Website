import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { RainbowArc } from './ui/RainbowArc';
import { ASSETS } from '../data/clientAssets';

/** Colorful intro after cinematic hero — "10 years of creativity" */
export const IntroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-intro="copy"] > *', { y: 24 }, {
          trigger: ref.current,
          stagger: 0.08,
          duration: 0.45,
        });
        scrollReveal('[data-intro="polaroid"]', { y: 40, scale: 0.94 }, {
          trigger: ref.current,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.4)',
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const moments = [
    { src: ASSETS.characters.littleSheila, alt: 'Little Sheila artwork', rotate: '-6deg', label: 'Little Sheila' },
    { src: ASSETS.belinha.starHat, alt: 'Belinha in a star hat', rotate: '3deg', label: 'Belinha' },
    { src: ASSETS.colorful.rainbowSweets, alt: 'Rainbow sweets and color', rotate: '-2deg', label: 'Color' },
  ];

  return (
    <section
      ref={ref}
      id="intro"
      className="relative overflow-hidden py-[var(--section-py-lg)]"
      style={{ background: 'var(--gradient-warm)' }}
    >
      <RainbowArc variant="soft" className="opacity-80" />
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-[min(90vw,520px)] opacity-70">
        <RainbowArc className="w-full h-auto" />
      </div>

      <div className="sl-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div data-intro="copy" className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--love-pink)]">
              A decade of imagination
            </p>
            <h2 className="font-display text-[var(--text-heading-xl)] font-extrabold text-[var(--text-primary)] leading-[1.15]">
              10 Years of Creativity
            </h2>
            <RainbowArc variant="stripe" className="mx-auto lg:mx-0 max-w-[10rem]" />
            <p className="text-[var(--text-body-lg)] text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto lg:mx-0">
              Characters, color, Belinha, and love — woven into one joyful creative world.
              Final stories and dates will be updated as Sheila shares them.
            </p>
            <a
              href="#timeline"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--love-pink)] px-6 text-sm font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              Open the storybook
            </a>
          </div>

          <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px]">
            <div className="flex flex-wrap justify-center items-end gap-3 sm:gap-5">
              {moments.map((m, i) => (
                <figure
                  key={m.src}
                  data-intro="polaroid"
                  className="relative w-[42%] sm:w-[28%] max-w-[200px] bg-white p-2.5 pb-10 shadow-elevated"
                  style={{
                    transform: `rotate(${m.rotate}) translateY(${i === 1 ? '-12px' : '8px'})`,
                  }}
                >
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={m.src}
                      alt={m.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                  </div>
                  <figcaption className="absolute bottom-2.5 left-0 right-0 text-center font-[family-name:var(--font-hand)] text-lg text-slate-700">
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
