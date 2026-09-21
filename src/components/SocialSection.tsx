import React, { useRef } from 'react';
import { Youtube, Instagram, Facebook, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { SOCIAL_CHANNELS_DATA, OLD_WEBSITE_ARCHIVE } from '../data/mockData';

interface SocialSectionProps {
  onOpenArchive: () => void;
}

const ICONS = [Youtube, Instagram, Facebook];

/** Three channel doors + one link back to the original site. Nothing else. */
export const SocialSection: React.FC<SocialSectionProps> = ({ onOpenArchive }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-soc="head"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.4,
        });
        scrollReveal('[data-soc="card"]', { y: 26 }, {
          trigger: '[data-soc="grid"]',
          stagger: 0.09,
          duration: 0.45,
          ease: 'back.out(1.3)',
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="social"
      className="rb-edge-top relative overflow-hidden bg-white py-[var(--section-py)]"
    >
      <div className="sl-container">
        <div data-soc="head" className="mb-10 max-w-2xl">
          <h2 className="font-display text-[var(--text-heading-xl)] font-extrabold leading-[1.1] text-[var(--text-primary)]">
            Follow the <span className="rb-text-spectrum">color</span>
          </h2>
          <p className="mt-3 text-[var(--text-body-lg)] text-[var(--text-secondary)]">
            Every channel, one tap away.
          </p>
        </div>

        <div data-soc="grid" className="grid gap-4 sm:grid-cols-3">
          {SOCIAL_CHANNELS_DATA.map((ch, i) => {
            const Icon = ICONS[i] ?? Youtube;
            return (
              <a
                key={ch.name}
                data-soc="card"
                href={ch.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[11rem] flex-col justify-between rounded-[1.5rem] p-6 text-white transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
                style={{ background: ch.hue }}
              >
                <Icon className="h-9 w-9" aria-hidden />
                <div>
                  <h3 className="font-display text-2xl font-extrabold">{ch.name}</h3>
                  <p className="mt-1 text-sm text-white/85">{ch.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold">
                    {ch.actionLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bridge back to the original website */}
        <div className="rb-band--yellow mt-6 flex flex-col items-start gap-4 rounded-[1.5rem] bg-[var(--band-paper)] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-extrabold text-[var(--text-primary)]">
              {OLD_WEBSITE_ARCHIVE.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {OLD_WEBSITE_ARCHIVE.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenArchive}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 text-sm font-extrabold text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            {OLD_WEBSITE_ARCHIVE.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
