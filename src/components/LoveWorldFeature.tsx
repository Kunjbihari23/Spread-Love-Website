import React, { useState, useRef } from 'react';
import { Sparkles, HeartHandshake, Play, ShieldCheck, Palette, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { LOVE_WORLD_DATA, PROJECTS_DATA } from '../data/mockData';
import { Character } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface LoveWorldFeatureProps {
  onOpenVideo: () => void;
  onSelectCharacter: (char: Character) => void;
}

export const LoveWorldFeature: React.FC<LoveWorldFeatureProps> = ({
  onOpenVideo,
  onSelectCharacter: _onSelectCharacter,
}) => {
  const [activeIsland, setActiveIsland] = useState<number>(0);
  const [preRegistered, setPreRegistered] = useState(false);
  const [preRegEmail, setPreRegEmail] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  const trailerPoster =
    PROJECTS_DATA[0]?.coverImage ||
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=85';

  const handlePreReg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preRegEmail.trim()) return;
    setPreRegistered(true);
  };

  // GSAP scroll reveals with reverse on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-lw="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-lw="trailer"]', { scale: 0.94, y: 24 }, {
          trigger: '[data-lw="trailer"]',
          duration: 0.45,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-lw="pillar"]', { y: 28 }, {
          trigger: '[data-lw="pillars"]',
          stagger: 0.08,
          duration: 0.4,
          ease: 'back.out(1.3)',
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-lw="map"]', { y: 22 }, {
          trigger: '[data-lw="map"]',
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-lw="cta"]', { scale: 0.96 }, {
          trigger: '[data-lw="cta"]',
          duration: 0.4,
          ease: 'back.out(1.5)',
          toggleActions: 'play reverse play reverse',
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="love-world"
      className="py-20 sm:py-24 bg-gradient-to-b from-white via-pink-50/40 to-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-1/3 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-lw="header">
          <SectionHeader
            badge={LOVE_WORLD_DATA.tagline}
            badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-600" />}
            title="The Next Creative Frontier"
            subtitle={LOVE_WORLD_DATA.overview}
          />
        </div>

        {/* Flagship Hero Video */}
        <div data-lw="trailer" className="mb-14 w-full">
          <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-slate-950 group aspect-16/10 sm:aspect-16/9 min-h-[300px] sm:min-h-[440px] lg:min-h-[520px]">
            <img
              src={trailerPoster}
              alt="LOVE WORLD Gameplay Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10">
              <button
                id="play-love-world-trailer-btn"
                onClick={onOpenVideo}
                className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-pink-600/95 hover:bg-pink-500 text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group/btn cursor-pointer"
                aria-label="Play Trailer"
              >
                <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
              </button>
              <div className="mt-3 sm:mt-4">
                <span className="px-3 sm:px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs md:text-sm font-bold border border-white/20">
                  ▶ Watch Gameplay Teaser ({LOVE_WORLD_DATA.trailerDuration})
                </span>
              </div>
            </div>

            <div className="hidden md:flex absolute bottom-6 left-6 right-6 items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/50 text-white z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs sm:text-sm font-bold">
                  {LOVE_WORLD_DATA.releaseDate}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                {LOVE_WORLD_DATA.stats.map((s, idx) => (
                  <div key={idx} className="px-2">
                    <p className="text-sm sm:text-base font-extrabold text-pink-400">
                      {s.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden mt-3 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-pink-400">Launch Timeline</span>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {LOVE_WORLD_DATA.releaseDate}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              {LOVE_WORLD_DATA.stats.map((s, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-slate-800/60">
                  <p className="text-sm font-extrabold text-pink-400">{s.value}</p>
                  <p className="text-[10px] text-slate-300 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div
          data-lw="pillars"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16"
        >
          {LOVE_WORLD_DATA.keyPillars.map((pillar, idx) => (
            <Card
              key={idx}
              data-lw="pillar"
              elevation="interactive"
              className="p-5 sm:p-6"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${pillar.color} flex items-center justify-center mb-3 sm:mb-4`}
              >
                {idx === 0 && <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />}
                {idx === 1 && <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
                {idx === 2 && <Palette className="w-5 h-5 sm:w-6 sm:h-6" />}
                {idx === 3 && <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 font-display">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </Card>
          ))}
        </div>

        {/* Interactive Floating Islands Map Tour */}
        <div
          data-lw="map"
          className="p-5 sm:p-8 md:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl mb-14 sm:mb-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Interactive World Map Preview
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display mt-1">
                Explore the Floating Islands of Kindness
              </h3>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
              {LOVE_WORLD_DATA.islands.map((island, index) => (
                <button
                  key={island.name}
                  onClick={() => setActiveIsland(index)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] cursor-pointer ${
                    activeIsland === index
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {island.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  Island {activeIsland + 1} of 4
                </span>
                <span className="text-xs text-slate-400">Atmosphere: Peaceful</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                {LOVE_WORLD_DATA.islands[activeIsland].name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {LOVE_WORLD_DATA.islands[activeIsland].desc}. Every island is filled with peaceful environmental puzzles, secret cozy resting spots, and custom treehouses where children can leave surprise gifts for friends.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                  ✓ Free Exploration
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                  ✓ Musical Puzzles
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                  ✓ Secret Doll Costumes
                </span>
              </div>
            </div>

            <div className="md:col-span-5 relative aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-md">
              <img
                src={
                  activeIsland === 0
                    ? 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=700&q=80'
                    : activeIsland === 1
                    ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80'
                    : activeIsland === 2
                    ? 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80'
                    : 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80'
                }
                alt="Island preview"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white px-2.5 py-1 rounded-lg bg-black/60">
                {LOVE_WORLD_DATA.islands[activeIsland].name}
              </span>
            </div>
          </div>
        </div>

        {/* Pre-register & VIP Kids Pass Banner */}
        <div
          data-lw="cta"
          className="rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-xl text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>Join the 10-Year Anniversary Beta List</span>
          </div>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-display mb-2.5 sm:mb-3">
            Be the First to Step Into LOVE WORLD
          </h3>
          <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed">
            Pre-register today to unlock the exclusive in-game "10-Year Golden Hugs Crown" for Spread Love Doll and Belinha!
          </p>

          {preRegistered ? (
            <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-white text-pink-700 font-bold text-xs sm:text-sm shadow-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>You are on the VIP Beta List! We'll email you the instant the gates open.</span>
            </div>
          ) : (
            <form
              onSubmit={handlePreReg}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto w-full"
            >
              <input
                type="email"
                required
                value={preRegEmail}
                onChange={(e) => setPreRegEmail(e.target.value)}
                placeholder="Enter parent or guardian email..."
                className="w-full px-4 sm:px-5 py-3 rounded-2xl text-slate-900 bg-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none shadow-sm min-h-[44px]"
              />
              <Button
                type="submit"
                variant="secondary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shrink-0 bg-slate-900 text-white hover:bg-slate-800"
              >
                Get VIP Pass
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
