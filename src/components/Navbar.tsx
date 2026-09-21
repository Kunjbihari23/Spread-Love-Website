import React, { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  BookOpen,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  ArrowRight,
} from 'lucide-react';
import { gsap } from '../lib/motion';
import { OLD_SITE } from '../data/clientAssets';

interface NavbarProps {
  onOpenArchive: () => void;
  onOpenBlogModal?: () => void;
}

/** Each destination carries its own spectrum hue. */
const NAV = [
  { id: 'intro', name: '10 Years', hue: 'var(--rb-red)' },
  { id: 'creator', name: 'Creator', hue: 'var(--rb-orange)' },
  { id: 'colorful-world', name: 'Colors', hue: 'var(--rb-yellow)' },
  { id: 'love-world', name: 'LOVE WORLD', hue: 'var(--rb-green)' },
  { id: 'belinha', name: 'Belinha', hue: 'var(--rb-teal)' },
  { id: 'characters', name: 'Characters', hue: 'var(--rb-blue)' },
  { id: 'gallery', name: 'Gallery', hue: 'var(--rb-violet)' },
  { id: 'videos', name: 'Videos', hue: 'var(--rb-pink)' },
];

const SOCIALS = [
  { href: 'https://youtube.com', Icon: Youtube, label: 'YouTube', hue: 'var(--rb-red)' },
  { href: 'https://instagram.com', Icon: Instagram, label: 'Instagram', hue: 'var(--rb-violet)' },
  { href: 'https://facebook.com', Icon: Facebook, label: 'Facebook', hue: 'var(--rb-blue)' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenArchive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current, { y: -70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.scrollY + 140;
      for (const { id } of [{ id: 'hero' }, ...NAV, { id: 'blog' }, { id: 'social' }]) {
        const el = document.getElementById(id);
        if (el && probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/92 py-2 backdrop-blur-xl' : 'bg-transparent py-4'
      }`}
    >
      {/* Spectrum hairline anchors the bar to the brand */}
      <div
        className={`absolute inset-x-0 top-0 h-1 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'var(--gradient-rainbow)' }}
        aria-hidden
      />

      <div className="sl-container flex items-center justify-between gap-4">
        <a
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Spread Love — home"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl font-display text-lg font-extrabold text-white"
            style={{ background: 'var(--gradient-rainbow-diagonal)' }}
            aria-hidden
          >
            S
          </span>
          <span
            className={`font-display text-lg font-extrabold tracking-tight sm:text-xl ${
              scrolled ? 'text-[var(--text-primary)]' : 'text-white'
            }`}
          >
            Spread Love
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Sections">
          {NAV.map((item) => {
            const on = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                aria-current={on ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition-colors ${
                  scrolled ? 'text-[var(--text-secondary)]' : 'text-white/80'
                } hover:text-white`}
                style={on ? { background: item.hue, color: '#fff' } : undefined}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.background = item.hue;
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={OLD_SITE.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-xs font-extrabold text-white transition-transform hover:scale-[1.04] cursor-pointer"
            style={{ background: 'var(--rb-violet)' }}
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            Blog
          </a>
          <button
            type="button"
            onClick={onOpenArchive}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 px-4 text-xs font-extrabold transition-colors cursor-pointer ${
              scrolled
                ? 'border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white'
                : 'border-white/50 text-white hover:bg-white hover:text-[oklch(18%_0.04_300)]'
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            lovestar.world
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors xl:hidden cursor-pointer ${
            scrolled ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]' : 'bg-white/15 text-white'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {/* Mobile drawer — one full-bleed color row per destination */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto bg-white xl:hidden">
          <nav className="flex flex-col" aria-label="Sections">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className="flex min-h-[64px] items-center justify-between px-6 font-display text-xl font-extrabold text-white"
                style={{ background: item.hue }}
              >
                {item.name}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            ))}
          </nav>

          <div className="space-y-3 p-6">
            <a
              href={OLD_SITE.blog}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[var(--text-primary)] text-sm font-extrabold text-[var(--text-primary)] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Read the blog
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenArchive();
              }}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--text-primary)] text-sm font-extrabold text-[var(--text-primary)] cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              lovestar.world
            </button>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {SOCIALS.map(({ href, Icon, label, hue }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-1.5 rounded-2xl text-xs font-extrabold text-white"
                  style={{ background: hue }}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
