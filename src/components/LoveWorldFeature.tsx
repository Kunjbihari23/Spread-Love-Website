import React, { useRef } from 'react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal, SplitText } from '../lib/motion';
import { LOVE_WORLD_DATA } from '../data/mockData';
import { ASSETS } from '../data/clientAssets';
import { RainbowArc } from './ui/RainbowArc';

interface LoveWorldFeatureProps {
  onOpenVideo: () => void;
}

/**
 * Flagship LOVE WORLD statement — one solid color block, one video door.
 * No invented stats, no stock imagery: client assets only.
 */
export const LoveWorldFeature: React.FC<LoveWorldFeatureProps> = ({ onOpenVideo }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        const title = ref.current?.querySelector('[data-lw="title"]');
        if (title) {
          const split = SplitText.create(title, { type: 'chars', mask: 'chars' });
          gsap.fromTo(
            split.chars,
            { yPercent: 120 },
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 70%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        scrollReveal('[data-lw="copy"] > *', { y: 20 }, {
          trigger: ref.current,
          stagger: 0.08,
          duration: 0.45,
        });

        scrollReveal('[data-lw="door"]', { scale: 0.94, y: 30 }, {
          trigger: '[data-lw="door"]',
          duration: 0.6,
        });

        scrollReveal('[data-lw="pillar"]', { y: 26 }, {
          trigger: '[data-lw="pillars"]',
          stagger: 0.09,
          duration: 0.45,
          ease: 'back.out(1.3)',
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const pillarHues = ['var(--rb-red)', 'var(--rb-yellow)', 'var(--rb-green)', 'var(--rb-violet)'];

  return (
    <section
      ref={ref}
      id="love-world"
      className="rb-band--blue rb-solid relative overflow-hidden py-[var(--section-py-lg)]"
    >
      <div className="rb-dots absolute inset-0" style={{ ['--band' as string]: '#fff' }} aria-hidden />

      <div className="sl-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div data-lw="copy" className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <span className="rb-chip" style={{ ['--band' as string]: 'var(--rb-yellow)', color: '#241a00' }}>
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Flagship project
            </span>
            <h2
              data-lw="title"
              className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-white"
            >
              LOVE WORLD
            </h2>
            <p className="text-lg font-bold text-white/95">{LOVE_WORLD_DATA.tagline}</p>
            <p className="text-base leading-relaxed text-white/80 max-w-md mx-auto lg:mx-0">
              {LOVE_WORLD_DATA.overview}
            </p>
            <button
              type="button"
              onClick={onOpenVideo}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-7 text-sm font-extrabold text-[var(--rb-blue-ink)] hover:bg-[var(--rb-yellow)] hover:text-[#241a00] transition-colors cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden />
              Watch the teaser
            </button>
          </div>

          {/* Video door — client photo as poster until final film lands */}
          <div data-lw="door" className="lg:col-span-7">
            <button
              type="button"
              onClick={onOpenVideo}
              className="group relative block w-full overflow-hidden rounded-[2rem] aspect-16/10 cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-[var(--rb-yellow)]"
              aria-label="Play the LOVE WORLD teaser"
            >
              <img
                src={ASSETS.colorful.rainbowSweets}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                width={1200}
                height={750}
              />
              <span className="absolute inset-0 bg-[oklch(30%_0.12_260_/_0.35)]" aria-hidden />
              <span
                className="absolute inset-x-0 bottom-0 h-2"
                style={{ background: 'var(--gradient-rainbow)' }}
                aria-hidden
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[var(--rb-pink-ink)] shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 fill-current translate-x-0.5" aria-hidden />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Pillars — replaceable placeholder copy from the client */}
        <div data-lw="pillars" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOVE_WORLD_DATA.keyPillars.map((pillar, i) => (
            <article
              key={pillar.title}
              data-lw="pillar"
              className="rounded-2xl bg-white p-6"
              style={{ borderTop: `8px solid ${pillarHues[i % pillarHues.length]}` }}
            >
              <h3 className="font-display text-lg font-extrabold text-[var(--text-primary)]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {pillar.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#characters"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/60 px-6 text-sm font-extrabold text-white hover:bg-white hover:text-[var(--rb-blue-ink)] transition-colors cursor-pointer"
          >
            Meet the characters
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <div className="w-44 sm:w-56">
            <RainbowArc className="h-auto w-full" strokeWidth={11} draw />
          </div>
        </div>
      </div>
    </section>
  );
};
