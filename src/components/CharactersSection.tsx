import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Star, Volume2, ArrowRight } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { CHARACTERS_DATA } from '../data/mockData';
import { Character } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';

interface CharactersSectionProps {
  onSelectCharacter: (char: Character) => void;
}

export const CharactersSection: React.FC<CharactersSectionProps> = ({
  onSelectCharacter,
}) => {
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSimulateSound = (e: React.MouseEvent, charId: string) => {
    e.stopPropagation();
    setActiveQuoteId(charId);

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

  // GSAP scroll reveals with reverse support on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-ch="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        gsap.utils.toArray<HTMLElement>('[data-ch="hero-card"]').forEach((el, i) => {
          scrollReveal(el, { x: i % 2 === 0 ? -30 : 30 }, {
            trigger: el,
            duration: 0.45,
            toggleActions: 'play reverse play reverse',
          });
        });

        scrollReveal('[data-ch="roster-card"]', { scale: 0.92 }, {
          trigger: '[data-ch="roster"]',
          stagger: 0.06,
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
      id="characters"
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-ch="header">
          <SectionHeader
            badge="Beloved Companions & Magical Friends"
            badgeIcon={<Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />}
            title="Characters & Handcrafted Dolls"
            subtitle="Every character began as an emotional sketch meant to comfort a child in need. Discover their backstories, iconic items, and friendship badges."
          />
        </div>

        {/* SPECIAL EMPHASIS HERO ROW */}
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
              <Card
                key={char.id}
                data-ch="hero-card"
                elevation="interactive"
                onClick={() => onSelectCharacter(char)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-8 bg-gradient-to-br ${
                  char.id === 'spread-love-doll'
                    ? 'from-pink-50 via-rose-50/60 to-white border-2 border-pink-300'
                    : 'from-amber-50 via-yellow-50/60 to-white border-2 border-amber-300'
                } flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold bg-white shadow-xs text-slate-900 border border-slate-200/80 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {char.badge}
                    </span>
                    <button
                      onClick={(e) => handleSimulateSound(e, char.id)}
                      className="p-1.5 sm:p-2 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-pink-600 shadow-xs transition-colors flex items-center gap-1.5 text-xs font-bold min-h-[36px] cursor-pointer"
                      title="Hear Voice / Quote"
                    >
                      <Volume2 className="w-4 h-4 text-pink-500 shrink-0" />
                      <span className="text-[11px] sm:text-xs">Voice Snippet</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start mb-5 sm:mb-6">
                    <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 shadow-lg border-4 border-white bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
                        {char.name}
                      </h4>
                      <p className="text-xs sm:text-sm font-bold text-pink-600">
                        {char.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {char.bio}
                      </p>

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

                  {activeQuoteId === char.id && (
                    <div className="p-3 mb-4 rounded-xl bg-white border border-pink-200 shadow-md text-xs italic text-pink-700 animate-fadeIn flex items-center gap-2">
                      <span>💬</span>
                      <span>"{char.quote}"</span>
                    </div>
                  )}
                </div>

                <div className="pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-pink-600 group-hover:text-pink-700">
                  <span>View Character Story & Coloring Sheet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Friends Roster */}
        <div data-ch="roster">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-5 sm:mb-6">
            The Extended Creative Family
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {regularCharacters.map((char) => (
              <Card
                key={char.id}
                data-ch="roster-card"
                elevation="interactive"
                onClick={() => onSelectCharacter(char)}
                className="cursor-pointer rounded-3xl p-5 bg-slate-50 hover:bg-white flex flex-col justify-between group"
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

                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
