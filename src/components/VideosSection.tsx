import React, { useRef } from 'react';
import { Play, Film } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { VIDEOS_DATA } from '../data/mockData';
import { VideoItem } from '../types';

interface VideosSectionProps {
  onPlayVideo: (video: VideoItem) => void;
}

const HUES = ['var(--rb-red)', 'var(--rb-yellow)', 'var(--rb-green)', 'var(--rb-violet)'];

/** Chapter 10 — video slots, honest about what's not filmed yet. */
export const VideosSection: React.FC<VideosSectionProps> = ({ onPlayVideo }) => {
  const ref = useRef<HTMLElement>(null);
  const featured = VIDEOS_DATA.find((v) => v.featured) ?? VIDEOS_DATA[0];
  const rest = VIDEOS_DATA.filter((v) => v.id !== featured.id);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-vid="head"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.42,
        });
        scrollReveal('[data-vid="featured"]', { y: 30, scale: 0.96 }, {
          trigger: '[data-vid="featured"]',
          duration: 0.55,
        });
        scrollReveal('[data-vid="card"]', { y: 26 }, {
          trigger: '[data-vid="grid"]',
          stagger: 0.08,
          duration: 0.45,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="videos"
      className="relative overflow-hidden bg-[oklch(21%_0.03_300)] py-[var(--section-py-lg)] text-white"
    >
      <div className="sl-container">
        <div data-vid="head" className="mb-10 max-w-2xl">
          <span className="rb-chip" style={{ ['--band' as string]: 'var(--rb-red)' }}>
            Chapter ten
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1] tracking-tight">
            The <span className="rb-text-spectrum">films</span>
          </h2>
          <p className="mt-4 text-[var(--text-body-lg)] leading-relaxed text-white/70">
            Each slot is wired and waiting. Add a file and it plays here.
          </p>
        </div>

        {/* Featured slot */}
        <button
          data-vid="featured"
          type="button"
          onClick={() => onPlayVideo(featured)}
          className="group relative block w-full overflow-hidden rounded-[2rem] text-left cursor-pointer"
          aria-label={`Open ${featured.title}`}
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative aspect-16/10 overflow-hidden bg-black lg:col-span-7 lg:aspect-auto lg:h-[420px]">
              <img
                src={featured.thumbnail}
                alt=""
                className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                aria-hidden
                loading="lazy"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'var(--gradient-rainbow-diagonal)' }}
                >
                  <Play className="h-8 w-8 fill-current translate-x-0.5" aria-hidden />
                </span>
              </span>
            </div>

            <div className="flex flex-col justify-center gap-3 bg-white/5 p-7 lg:col-span-5 lg:p-10">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--rb-yellow)]">
                {featured.category}
              </span>
              <h3 className="font-display text-2xl font-extrabold leading-snug sm:text-3xl">
                {featured.title}
              </h3>
              <p className="text-sm text-white/70">{featured.description}</p>
              {!featured.videoUrl && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                  <Film className="h-3.5 w-3.5" aria-hidden />
                  Awaiting the final file
                </span>
              )}
            </div>
          </div>
          <span
            className="absolute inset-x-0 bottom-0 h-2"
            style={{ background: 'var(--gradient-rainbow)' }}
            aria-hidden
          />
        </button>

        {/* Remaining slots */}
        <div data-vid="grid" className="mt-6 grid gap-5 sm:grid-cols-3">
          {rest.map((vid, i) => (
            <button
              key={vid.id}
              data-vid="card"
              type="button"
              onClick={() => onPlayVideo(vid)}
              className="group overflow-hidden rounded-[1.25rem] bg-white/5 text-left transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
              style={{ borderBottom: `6px solid ${HUES[(i + 1) % HUES.length]}` }}
            >
              <div className="relative aspect-16/9 overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt=""
                  className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  aria-hidden
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                    style={{ background: HUES[(i + 1) % HUES.length] }}
                  >
                    <Play className="h-5 w-5 fill-current translate-x-0.5" aria-hidden />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <span
                  className="text-[11px] font-extrabold uppercase tracking-[0.16em]"
                  style={{ color: HUES[(i + 1) % HUES.length] }}
                >
                  {vid.category}
                </span>
                <h3 className="mt-1 font-display text-lg font-extrabold">{vid.title}</h3>
                <p className="mt-1 text-sm text-white/60">{vid.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
