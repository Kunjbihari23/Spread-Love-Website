import React, { useRef } from 'react';
import { Heart, Youtube, Instagram, Facebook, BookOpen, ExternalLink, ArrowUp } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { OLD_SITE } from '../data/clientAssets';

interface FooterProps {
  onOpenArchive: () => void;
}

const SECTIONS = [
  { href: '#creator', label: 'Creator' },
  { href: '#love-world', label: 'LOVE WORLD' },
  { href: '#timeline', label: '10 Years' },
  { href: '#belinha', label: 'Belinha' },
  { href: '#characters', label: 'Characters' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#videos', label: 'Videos' },
  { href: '#blog', label: 'Blog' },
];

export const Footer: React.FC<FooterProps> = ({ onOpenArchive }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-ft="row"]', { y: 18 }, {
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
    <footer ref={ref} className="relative overflow-hidden bg-[oklch(21%_0.03_300)] text-white">
      <div className="h-2 w-full" style={{ background: 'var(--gradient-rainbow)' }} aria-hidden />

      <div className="sl-container py-14 sm:py-16">
        <div data-ft="row" className="flex flex-col gap-4 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-none">
              <span className="rb-text-spectrum">Spread Love</span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              A colorful creative world by Sheila Rocha. Characters, photographs, and artwork are hers.
            </p>
          </div>

          <div className="flex gap-2.5">
            {[
              { href: 'https://youtube.com', Icon: Youtube, label: 'YouTube', hue: 'var(--rb-red)' },
              { href: 'https://instagram.com', Icon: Instagram, label: 'Instagram', hue: 'var(--rb-violet)' },
              { href: 'https://facebook.com', Icon: Facebook, label: 'Facebook', hue: 'var(--rb-blue)' },
              { href: OLD_SITE.blog, Icon: BookOpen, label: 'Blog', hue: 'var(--rb-green)' },
            ].map(({ href, Icon, label, hue }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 transition-colors hover:text-white cursor-pointer"
                style={{ ['--hover-hue' as string]: hue }}
                onMouseEnter={(e) => (e.currentTarget.style.background = hue)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'oklch(100% 0 0 / 0.1)')}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav data-ft="row" className="flex flex-wrap gap-x-6 gap-y-3 py-8" aria-label="Footer navigation">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-sm font-bold text-white/70 transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenArchive}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition-colors hover:text-white cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            lovestar.world
          </button>
        </nav>

        <div data-ft="row" className="flex flex-col items-start gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-[var(--rb-pink)] text-[var(--rb-pink)]" aria-hidden /> for Spread Love
          </p>
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center gap-1.5 font-bold text-white/70 transition-colors hover:text-white"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};
