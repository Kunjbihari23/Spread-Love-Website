import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Star, Smile, Volume2, ArrowRight } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { CHARACTERS_DATA } from '../data/mockData';
import { Character } from '../types';

interface CharactersSectionProps {
  onSelectCharacter: (char: Character) => void;
}

export const CharactersSection: React.FC<CharactersSectionProps> = ({ onSelectCharacter }) => {
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Sound effect and GSAP animation simulation for character click
  const handleSimulateSound = (e: React.MouseEvent, charId: string) => {
    e.stopPropagation();
    setActiveQuoteId(charId);

    // GSAP character bounce animation
    const btn = e.currentTarget as HTMLElement;
    gsap.fromTo(
      btn,
      { scale: 0.9, rotate: -5 },
      { scale: 1.1, rotate: 5, duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }
    );

    setTimeout(() => {
      setActiveQuoteId(null);
    }, 3200);
  };

  const emphasizedCharacters = CHARACTERS_DATA.filter((c) => c.specialEmphasis);
  const regularCharacters = CHARACTERS_DATA.filter((c) => !c.specialEmphasis);

  // Doll parade: header fade-up, hero cards from left/right, roster pop-stagger
  useGSAP(() => {
    const mm = whenMotionOk(() => {
      scrollReveal('[data-ch="header"] > *', { y: 18 }, {
        trigger: sectionRef.current,
        stagger: 0.08,
        duration: 0.35,
      });

      gsap.utils.toArray<HTMLElement>('[data-ch="hero-card"]').forEach((el, i) => {
        scrollReveal(el, { x: i % 2 === 0 ? -40 : 40 }, {
          trigger: el,
          duration: 0.4,
        });
      });

      scrollReveal('[data-ch="roster-card"]', { scale: 0.92 }, {
        trigger: '[data-ch="roster"]',
        stagger: 0.06,
        duration: 0.4,
        ease: 'back.out(1.5)',
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="characters" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background soft shapes */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div data-ch="header" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>Beloved Companions & Magical Friends</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
            Characters & Handcrafted Dolls
          </h2>
          <p className="text-slate-600 text-xs sm:text-base md:text-lg">
            Every character began as an emotional sketch meant to comfort a child in need. Discover their backstories, iconic items, and friendship badges.
          </p>
        </div>

        {/* SPECIAL EMPHASIS HERO ROW: Spread Love Doll & Belinha */}
        <div className="mb-12 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                Heart of the Universe: Spread Love Doll & Belinha
              </h3>
            </div>
            <span className="self-start sm:self-auto text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
              Special 10-Year Tribute
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {emphasizedCharacters.map((char) => (
              <div
                key={char.id}
                data-ch="hero-card"
                onClick={() => onSelectCharacter(char)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-8 bg-gradient-to-br ${
                  char.id === 'spread-love-doll'
                    ? 'from-pink-50 via-rose-50/60 to-white border-2 border-pink-300 shadow-xl shadow-pink-500/10'
                    : 'from-amber-50 via-yellow-50/60 to-white border-2 border-amber-300 shadow-xl shadow-amber-500/10'
                } hover:scale-[1.01] transition-all duration-300 relative group flex flex-col justify-between`}
              >
                {/* Special Tag and voice trigger */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold bg-white shadow-xs text-slate-900 border border-slate-200/80 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {char.badge}
                  </span>
                  <button
                    onClick={(e) => handleSimulateSound(e, char.id)}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-pink-600 shadow-xs transition-colors flex items-center gap-1.5 text-xs font-bold min-h-[36px]"
                    title="Hear Voice / Quote"
                  >
                    <Volume2 className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="text-[11px] sm:text-xs">Voice Snippet</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start mb-5 sm:mb-6">
                  {/* Big Image Frame */}
                  <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 shadow-lg border-4 border-white bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bio Info */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                      {char.name}
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-pink-600">
                      {char.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {char.bio}
                    </p>

                    {/* Friendship Level */}
                    <div className="pt-2 flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
                      <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        Bond: {char.friendshipLevel}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-pink-100/70 text-pink-700">
                        {char.relatedProject}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Audio Quote Bubble */}
                {activeQuoteId === char.id && (
                  <div className="p-3 mb-4 rounded-xl bg-white border border-pink-200 shadow-md text-xs italic text-pink-700 animate-in fade-in flex items-center gap-2">
                    <span>💬</span>
                    <span>"{char.quote}"</span>
                  </div>
                )}

                {/* Action Footer */}
                <div className="pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-pink-600 group-hover:text-pink-700">
                  <span>View Character Story & Coloring Sheet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Friends Roster */}
        <div data-ch="roster">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mb-5 sm:mb-6">
            The Extended Creative Family
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {regularCharacters.map((char) => (
              <div
                key={char.id}
                data-ch="roster-card"
                onClick={() => onSelectCharacter(char)}
                className="cursor-pointer rounded-3xl p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-pink-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-200 border-2 border-white shadow-xs">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                      {char.badge}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display group-hover:text-pink-600 transition-colors">
                    {char.name}
                  </h4>
                  <p className="text-xs font-medium text-pink-600 mb-1.5">
                    {char.role}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {char.bio}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-pink-600">
                  <span>Meet Friend</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
