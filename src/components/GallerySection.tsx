import React, { useEffect, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { GALLERY_DATA } from '../data/mockData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  onSelectImage: (item: GalleryItem) => void;
}

const FILTERS = [
  { id: 'all', label: 'Everything', hue: 'var(--rb-pink)' },
  { id: 'artwork', label: 'Artwork', hue: 'var(--rb-green)' },
  { id: 'characters', label: 'Characters', hue: 'var(--rb-orange)' },
  { id: 'celebration', label: 'Moments', hue: 'var(--rb-blue)' },
];

const TILE_HUES = [
  'var(--rb-red)',
  'var(--rb-yellow)',
  'var(--rb-green)',
  'var(--rb-teal)',
  'var(--rb-blue)',
  'var(--rb-violet)',
];

/** Chapter 09 — curated gallery. Belinha's own strip lives in her section. */
export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectImage }) => {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState('all');
  const mounted = useRef(false);

  const items = GALLERY_DATA.filter((i) => active === 'all' || i.category === active);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-gal="head"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.42,
        });
        scrollReveal('[data-gal="item"]', { y: 30, scale: 0.94 }, {
          trigger: '[data-gal="grid"]',
          stagger: 0.07,
          duration: 0.45,
          ease: 'back.out(1.3)',
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tiles = ref.current?.querySelectorAll('[data-gal="item"]');
    if (!tiles?.length) return;
    gsap.fromTo(
      tiles,
      { autoAlpha: 0, scale: 0.95, y: 14 },
      { autoAlpha: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out' }
    );
  }, [active]);

  return (
    <section
      ref={ref}
      id="gallery"
      className="rb-band--teal rb-surface relative overflow-hidden py-[var(--section-py-lg)]"
    >
      <div className="sl-container">
        <div data-gal="head" className="mb-10">
          <span className="rb-chip">Chapter nine</span>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1] tracking-tight text-[var(--text-primary)]">
            Her gallery
          </h2>
          <p className="mt-4 max-w-xl text-[var(--text-body-lg)] leading-relaxed text-[var(--text-secondary)]">
            Artwork, photographs, and colorful moments — all Sheila's own.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5" role="group" aria-label="Filter gallery">
            {FILTERS.map((f) => {
              const on = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  aria-pressed={on}
                  className="min-h-11 rounded-full px-5 text-sm font-extrabold transition-colors cursor-pointer"
                  style={
                    on
                      ? { background: f.hue, color: '#fff' }
                      : { background: '#fff', color: 'var(--text-secondary)' }
                  }
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div data-gal="grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <button
              key={item.id}
              data-gal="item"
              type="button"
              onClick={() => onSelectImage(item)}
              className="group overflow-hidden rounded-[1.25rem] bg-white text-left transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
              style={{ boxShadow: `10px 10px 0 0 ${TILE_HUES[i % TILE_HUES.length]}` }}
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[var(--surface-muted)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--text-primary)]">
                    <Maximize2 className="h-5 w-5" aria-hidden />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-extrabold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
