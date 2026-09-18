import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Wand2, Star, Smile, Flame, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

interface SpreadLoveMagicProps {
  onSpreadLove?: () => void;
}

const LOVE_EMOJIS = ['💖', '🌟', '✨', '🐾', '🎀', '🎈', '🧸', '🌈', '🌸', '💫'];

export const SpreadLoveMagic: React.FC<SpreadLoveMagicProps> = ({ onSpreadLove }) => {
  const [loveCount, setLoveCount] = useState<number>(10482);
  const [sparkleTrailActive, setSparkleTrailActive] = useState<boolean>(true);
  const [saluteToast, setSaluteToast] = useState<string | null>(null);
  const [isHoveringWand, setIsHoveringWand] = useState(false);

  const wandRef = useRef<HTMLButtonElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP gentle idle hovering effect on the floating wand
  useEffect(() => {
    if (!wandRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(wandRef.current, {
        y: -8,
        rotation: 3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  // Cursor sparkle trail with GSAP
  useEffect(() => {
    if (!sparkleTrailActive) return;

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 60) return; // Throttle to maintain 60fps
      lastTime = now;

      createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sparkleTrailActive]);

  const createParticle = (x: number, y: number, isBigBurst = false) => {
    if (!containerRef.current) return;

    const particle = document.createElement('div');
    const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
    particle.innerText = emoji;
    particle.className = 'fixed pointer-events-none select-none z-50';

    const size = isBigBurst ? Math.random() * 24 + 20 : Math.random() * 16 + 14;
    particle.style.fontSize = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.transform = 'translate(-50%, -50%)';

    containerRef.current.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = isBigBurst ? Math.random() * 180 + 60 : Math.random() * 40 + 15;
    const targetX = Math.cos(angle) * distance;
    const targetY = isBigBurst ? Math.sin(angle) * distance - 80 : -Math.random() * 50 - 20;

    gsap.to(particle, {
      x: targetX,
      y: targetY,
      rotation: Math.random() * 360 - 180,
      scale: isBigBurst ? 1.4 : 0.8,
      opacity: 0,
      duration: isBigBurst ? 1.5 : 0.9,
      ease: 'power2.out',
      onComplete: () => {
        particle.remove();
      },
    });
  };

  // Big "Salute & Spread Love" Celebration Trigger
  const handleSpreadLoveBurst = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Trigger 35 GSAP particles in a fountain
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createParticle(
          centerX + (Math.random() * 40 - 20),
          centerY + (Math.random() * 40 - 20),
          true
        );
      }, i * 15);
    }

    setLoveCount((prev) => prev + 1);
    if (onSpreadLove) onSpreadLove();

    // GSAP Button Pop Animation
    if (wandRef.current) {
      gsap.fromTo(
        wandRef.current,
        { scale: 0.8, rotate: -15 },
        { scale: 1.15, rotate: 15, duration: 0.4, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      );
    }

    // Salute message
    const messages = [
      "✨ Spread Love Doll & Belinha salute your kind heart!",
      "💖 1,000 Hugs sent into LOVE WORLD!",
      "🐾 Belinha is happily wagging her tail for you!",
      "🌟 You made the universe a brighter, cozier place!",
      "🎨 Creativity and kindness unlocked forever!"
    ];
    const picked = messages[Math.floor(Math.random() * messages.length)];
    setSaluteToast(picked);

    if (toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }

    setTimeout(() => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          opacity: 0,
          y: -20,
          scale: 0.9,
          duration: 0.4,
          onComplete: () => setSaluteToast(null),
        });
      } else {
        setSaluteToast(null);
      }
    }, 3800);
  };

  return (
    <>
      {/* Particle Container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />

      {/* Floating Salute Notification Toast */}
      {saluteToast && (
        <div
          ref={toastRef}
          className="fixed bottom-24 right-4 sm:right-8 z-50 max-w-sm bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white p-4 rounded-3xl shadow-2xl border-2 border-white/80 flex items-center gap-3 pointer-events-auto"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-xl">
            💝
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-pink-100">
              10-Year Celebration Salute
            </p>
            <p className="text-sm font-extrabold text-white">{saluteToast}</p>
          </div>
        </div>
      )}

      {/* Floating Creative Wand Gadget for Children & Fans */}
      <div className="fixed bottom-6 right-4 sm:right-8 z-40 flex items-center gap-2">
        {/* Toggle Trail Button */}
        <button
          onClick={() => setSparkleTrailActive(!sparkleTrailActive)}
          title={sparkleTrailActive ? 'Turn off magic sparkle trail' : 'Turn on magic sparkle trail'}
          className={`p-2.5 rounded-full border shadow-md transition-all ${
            sparkleTrailActive
              ? 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200'
              : 'bg-white/80 backdrop-blur-md border-slate-200 text-slate-400 hover:text-slate-600'
          }`}
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Main "Spread Love Magic Wand" Button */}
        <button
          ref={wandRef}
          onClick={handleSpreadLoveBurst}
          onMouseEnter={() => setIsHoveringWand(true)}
          onMouseLeave={() => setIsHoveringWand(false)}
          className="relative px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-pink-500/30 flex items-center gap-2.5 border-2 border-white transition-all transform active:scale-95 group cursor-pointer"
        >
          <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            <Wand2 className="w-4 h-4 text-white" />
          </span>
          <div className="text-left">
            <span className="block text-[10px] font-bold text-pink-100 uppercase tracking-wider leading-none">
              Magic Wand
            </span>
            <span className="block font-display tracking-tight leading-snug">
              Spread Love! ({loveCount.toLocaleString()})
            </span>
          </div>
          <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform animate-pulse" />
        </button>
      </div>
    </>
  );
};
