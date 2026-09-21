import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import gsap from 'gsap';

interface SpreadLoveMagicProps {
  onSpreadLove?: () => void;
}

/** Particle colors come from the rainbow spectrum, not emoji. */
const HUES = [
  'var(--rb-red)',
  'var(--rb-orange)',
  'var(--rb-yellow)',
  'var(--rb-green)',
  'var(--rb-teal)',
  'var(--rb-blue)',
  'var(--rb-violet)',
  'var(--rb-pink)',
];

const SHAPES = ['50%', '50%', '4px'] as const;

/** Floating wand: sprays rainbow confetti. Trail is off by default and opt-in. */
export const SpreadLoveMagic: React.FC<SpreadLoveMagicProps> = ({ onSpreadLove }) => {
  const [trailOn, setTrailOn] = useState(false);
  const wandRef = useRef<HTMLButtonElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!wandRef.current || reduced.current) return;
    const ctx = gsap.context(() => {
      gsap.to(wandRef.current, {
        y: -7,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  const spawn = (x: number, y: number, big = false) => {
    if (!layerRef.current) return;

    const dot = document.createElement('span');
    const size = big ? Math.random() * 12 + 8 : Math.random() * 7 + 5;
    dot.className = 'fixed pointer-events-none';
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.background = HUES[Math.floor(Math.random() * HUES.length)];
    dot.style.borderRadius = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    dot.style.transform = 'translate(-50%, -50%)';
    layerRef.current.appendChild(dot);

    const angle = Math.random() * Math.PI * 2;
    const distance = big ? Math.random() * 200 + 70 : Math.random() * 36 + 12;

    gsap.to(dot, {
      x: Math.cos(angle) * distance,
      y: big ? Math.sin(angle) * distance - 90 : -Math.random() * 44 - 16,
      rotation: Math.random() * 360 - 180,
      opacity: 0,
      scale: big ? 1.3 : 0.6,
      duration: big ? 1.4 : 0.85,
      ease: 'power2.out',
      onComplete: () => dot.remove(),
    });
  };

  useEffect(() => {
    if (!trailOn || reduced.current) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [trailOn]);

  const burst = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 28; i++) {
      window.setTimeout(() => spawn(cx + (Math.random() * 36 - 18), cy + (Math.random() * 36 - 18), true), i * 14);
    }

    if (wandRef.current && !reduced.current) {
      gsap.fromTo(
        wandRef.current,
        { scale: 0.88, rotate: -12 },
        { scale: 1.1, rotate: 12, duration: 0.35, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      );
    }

    onSpreadLove?.();
  };

  return (
    <>
      <div ref={layerRef} className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden />

      <div className="fixed bottom-6 right-4 z-40 flex items-center gap-2 sm:right-8">
        <button
          type="button"
          onClick={() => setTrailOn(!trailOn)}
          aria-pressed={trailOn}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-white text-[var(--text-secondary)] shadow-elevated transition-colors hover:text-[var(--text-primary)] cursor-pointer"
          style={trailOn ? { background: 'var(--rb-yellow)', color: '#241a00' } : undefined}
          title={trailOn ? 'Turn off the sparkle trail' : 'Turn on the sparkle trail'}
        >
          <Sparkles className="h-4 w-4" aria-hidden />
        </button>

        <button
          ref={wandRef}
          type="button"
          onClick={burst}
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-white px-5 text-sm font-extrabold text-white shadow-floating transition-transform active:scale-95 cursor-pointer"
          style={{ background: 'var(--gradient-rainbow-diagonal)' }}
        >
          <Wand2 className="h-4 w-4" aria-hidden />
          Spread love
        </button>
      </div>
    </>
  );
};
