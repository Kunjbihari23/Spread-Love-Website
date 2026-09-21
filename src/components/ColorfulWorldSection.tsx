import React, { useRef } from 'react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { ASSETS } from '../data/clientAssets';

const SWATCHES = [
  { hue: 'var(--rb-red)', label: 'Red' },
  { hue: 'var(--rb-orange)', label: 'Orange' },
  { hue: 'var(--rb-yellow)', label: 'Yellow' },
  { hue: 'var(--rb-green)', label: 'Green' },
  { hue: 'var(--rb-teal)', label: 'Teal' },
  { hue: 'var(--rb-blue)', label: 'Blue' },
  { hue: 'var(--rb-violet)', label: 'Violet' },
  { hue: 'var(--rb-pink)', label: 'Pink' },
];

/** Chapter 04 — the palette itself, as a wall of color against one photo. */
export const ColorfulWorldSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-cw="copy"] > *', { y: 20 }, {
          trigger: ref.current,
          stagger: 0.08,
          duration: 0.42,
        });

        scrollReveal('[data-cw="swatch"]', { scaleY: 0 }, {
          trigger: '[data-cw="wall"]',
          stagger: 0.06,
          duration: 0.5,
          ease: 'power3.out',
        });

        scrollReveal('[data-cw="photo"]', { scale: 0.92 }, {
          trigger: '[data-cw="photo"]',
          duration: 0.6,
        });

        // Parallax drift on the photo
        gsap.to('[data-cw="photo"] img', {
          yPercent: -8,
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

  return (
    <section
      ref={ref}
      id="colorful-world"
      className="rb-band--yellow relative overflow-hidden bg-[oklch(21%_0.03_300)] py-[var(--section-py-lg)] text-white"
    >
      <div className="sl-container">
        <div data-cw="copy" className="max-w-3xl">
          <span className="rb-chip" style={{ color: '#241a00' }}>Chapter four</span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Strong colors,<br />
            <span className="rb-text-spectrum">on purpose</span>
          </h2>
          <p className="mt-5 max-w-xl text-[var(--text-body-lg)] leading-relaxed text-white/75">
            Sweets, toys, rainbows — the palette comes straight out of Sheila's own
            pictures. Eight hues carry the whole site.
          </p>
        </div>

        {/* Color wall */}
        <div data-cw="wall" className="mt-12 grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {SWATCHES.map((s) => (
            <div key={s.label} data-cw="swatch" className="origin-bottom">
              <div className="h-28 rounded-xl sm:h-40" style={{ background: s.hue }} />
              <p className="mt-2 text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* The source photograph */}
        <figure data-cw="photo" className="mt-14 overflow-hidden rounded-[2rem]">
          <img
            src={ASSETS.colorful.rainbowSweets}
            alt="Colorful rainbow sweets and toys from Sheila's photographs"
            className="aspect-16/9 w-full scale-110 object-cover"
            loading="lazy"
            width={1400}
            height={790}
          />
          <figcaption className="bg-white/5 px-5 py-4 text-sm text-white/60">
            Client photograph — the palette's origin.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
