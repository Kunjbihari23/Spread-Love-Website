import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, Play, ArrowRight, Star, Compass, Smile } from 'lucide-react';
import gsap from 'gsap';
import { HERO_DATA, CHARACTERS_DATA, PROJECTS_DATA } from '../data/mockData';
import { Character } from '../types';

interface HeroProps {
  onOpenVideo: () => void;
  onSelectCharacter: (char: Character) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideo, onSelectCharacter }) => {
  const primaryCharacters = CHARACTERS_DATA.slice(0, 3); // Spread Love Doll, Belinha, Little Sheila
  const heroArtwork = PROJECTS_DATA[0]?.coverImage || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80";

  const heroSectionRef = useRef<HTMLElement>(null);
  const dollBadgeRef = useRef<HTMLButtonElement>(null);
  const belinhaBadgeRef = useRef<HTMLButtonElement>(null);
  const floatingHeartRef = useRef<HTMLDivElement>(null);
  const floatingStarRef = useRef<HTMLDivElement>(null);
  const floatingSmileRef = useRef<HTMLDivElement>(null);

  // GSAP animations for character badges and background items
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Doll badge gentle float
      if (dollBadgeRef.current) {
        gsap.to(dollBadgeRef.current, {
          y: -10,
          rotation: 2,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Belinha badge gentle float (offset phase)
      if (belinhaBadgeRef.current) {
        gsap.to(belinhaBadgeRef.current, {
          y: 8,
          rotation: -2,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.6,
        });
      }

      // Background ambient floating icons
      if (floatingHeartRef.current) {
        gsap.to(floatingHeartRef.current, {
          y: -18,
          x: 10,
          rotation: 12,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      if (floatingStarRef.current) {
        gsap.to(floatingStarRef.current, {
          y: 20,
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none',
        });
      }

      if (floatingSmileRef.current) {
        gsap.to(floatingSmileRef.current, {
          y: -14,
          rotation: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const handleCharacterHover = (el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      scale: 1.1,
      rotation: '+=6',
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'back.out(2)',
    });
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative min-h-[92vh] pt-24 sm:pt-28 pb-14 sm:pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50/70 via-amber-50/40 to-white"
    >
      {/* Decorative Subtle Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft pastel ambient glow orbs */}
        <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-300/25 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-sky-300/25 blur-3xl" />

        {/* Floating playful icons animated via GSAP */}
        <div ref={floatingHeartRef} className="absolute top-32 left-[8%] text-pink-400/60 hidden md:block">
          <Heart className="w-8 h-8 fill-pink-300/40" />
        </div>
        <div ref={floatingStarRef} className="absolute top-48 right-[10%] text-amber-400/70 hidden md:block">
          <Star className="w-9 h-9 fill-amber-300/50" />
        </div>
        <div className="absolute bottom-32 left-[12%] text-sky-400/60 hidden lg:block animate-pulse">
          <Sparkles className="w-7 h-7" />
        </div>
        <div ref={floatingSmileRef} className="absolute bottom-24 right-[14%] text-emerald-400/60 hidden lg:block">
          <Smile className="w-8 h-8" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Branding, 10-Year Statement, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            {/* 10-Year Anniversary Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{HERO_DATA.anniversaryBadge}</span>
            </div>

            {/* Core Immediate Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
              {HERO_DATA.headlinePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500">
                {HERO_DATA.headlineEmphasis}
              </span>{' '}
              {HERO_DATA.headlineSuffix}
            </h1>

            {/* Subtext description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {HERO_DATA.subtext}
            </p>

            {/* Action Buttons Hub */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#love-world"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 shadow-md shadow-pink-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group min-h-[44px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>{HERO_DATA.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#timeline"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Compass className="w-4 h-4 text-pink-500" />
                <span>{HERO_DATA.secondaryCta}</span>
              </a>

              <button
                id="hero-watch-story-btn"
                onClick={onOpenVideo}
                className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-pink-700 bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50/60 hover:from-pink-100 hover:via-rose-100 hover:to-amber-100 border border-pink-200/90 hover:border-pink-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 group min-h-[44px] cursor-pointer whitespace-nowrap"
              >
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 group-hover:from-pink-500 group-hover:to-rose-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white translate-x-0.5" />
                </span>
                <span className="font-extrabold tracking-tight">Watch Story Video</span>
              </button>
            </div>

            {/* Micro Feature Icons / Quick Character Avatars */}
            <div className="pt-4 border-t border-pink-100/60 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Beloved Companions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
                {primaryCharacters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => onSelectCharacter(char)}
                    className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-xl bg-white border border-pink-100 hover:border-pink-300 hover:shadow-xs transition-all text-xs font-semibold text-slate-700 group min-h-[40px]"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-pink-100 shrink-0">
                      <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="group-hover:text-pink-600 truncate">{char.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Artwork Card with Elevated Floating Badges */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none pt-2 sm:pt-4">
            {/* Interactive Main Hero Artwork Box */}
            <div className="relative">
              {/* Contained Media Frame with rounded corners and overflow hidden for zoom effect */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group aspect-4/3 sm:aspect-square">
                <img
                  src={heroArtwork}
                  alt="LOVE WORLD Kids Universe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Banner inside artwork - placed cleanly at the bottom */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md z-10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 block">
                        Flagship Showcase
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-display truncate">
                        LOVE WORLD
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-1">
                        Floating islands of kindness & plush doll adventures
                      </p>
                    </div>
                    <button
                      onClick={onOpenVideo}
                      className="p-2.5 sm:p-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white shadow-sm transition-transform active:scale-95 shrink-0 cursor-pointer"
                      title="Play Preview"
                      aria-label="Play Preview"
                    >
                      <Play className="w-4 h-4 fill-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Character Badges - Positioned outside the overflow-hidden media frame so they are never clipped */}
              {/* Badge 1: Spread Love Doll (Top Right) */}
              <button
                ref={dollBadgeRef}
                onMouseEnter={() => handleCharacterHover(dollBadgeRef.current)}
                onClick={() => onSelectCharacter(primaryCharacters[0])}
                className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-left flex items-center gap-2.5 z-20 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-pink-400 shadow-xs shrink-0">
                  <img
                    src={primaryCharacters[0].avatar}
                    alt={primaryCharacters[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-pink-600 truncate max-w-[110px] sm:max-w-none">
                      Spread Love Doll
                    </span>
                    <Heart className="w-3 h-3 text-pink-500 fill-pink-500 shrink-0" />
                  </div>
                  <span className="text-[10px] font-semibold text-pink-600">Iconic Companion ★</span>
                </div>
              </button>

              {/* Badge 2: Belinha the Dog (Middle-Left, safely above the bottom banner) */}
              <button
                ref={belinhaBadgeRef}
                onMouseEnter={() => handleCharacterHover(belinhaBadgeRef.current)}
                onClick={() => onSelectCharacter(primaryCharacters[1])}
                className="absolute top-1/3 -left-3 sm:-left-5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-left flex items-center gap-2.5 z-20 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-amber-400 shadow-xs shrink-0">
                  <img
                    src={primaryCharacters[1].avatar}
                    alt={primaryCharacters[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                      Belinha
                    </span>
                    <span className="text-xs">🐾</span>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-600">Joyful Golden Dog</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
