import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Sparkles, Star, ArrowRight } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, ST } from '../lib/motion';
import { TIMELINE_DATA } from '../data/mockData';
import { Milestone } from '../types';

interface TimelineSectionProps {
  onSelectMilestone?: (milestone: Milestone) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const currentMilestone =
    TIMELINE_DATA.find((m) => m.year === selectedYear) || TIMELINE_DATA[0];

  // Journey-path scroll reveal — years march in like milestones on a path
  useGSAP(() => {
    const mm = whenMotionOk(() => {
      gsap.from('[data-tl="header"] > *', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, ...ST },
      });

      gsap.from('[data-tl="year"]', {
        x: -40,
        opacity: 0,
        scale: 0.85,
        stagger: 0.06,
        duration: 0.45,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '[data-tl="years"]', start: 'top 85%', toggleActions: ST.toggleActions },
      });

      gsap.from(cardRef.current, {
        y: 48,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: ST.toggleActions },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  // GSAP animation when switching timeline years
  useEffect(() => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0.5, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.7)' }
    );
  }, [selectedYear]);

  return (
    <section ref={sectionRef} id="timeline" className="py-16 sm:py-20 bg-slate-50/70 relative overflow-hidden">
      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} data-tl="header" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>The 10-Year Creative Odyssey</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
            A Decade of Imagining, Crafting & Sharing Smiles
          </h2>
          <p className="text-slate-600 text-xs sm:text-base md:text-lg">
            From solitary pencil sketches on a kitchen table in 2014 to a beloved international children's universe with millions of players.
          </p>
        </div>

        {/* Interactive Year Selector Bar (Horizontal Scroller with Pills) */}
        <div className="relative mb-8 sm:mb-12" data-tl="years">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar px-1">
            {TIMELINE_DATA.map((milestone) => {
              const isActive = milestone.year === selectedYear;
              return (
                <button
                  key={milestone.id}
                  data-tl="year"
                  onClick={() => setSelectedYear(milestone.year)}
                  className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm shrink-0 transition-all flex flex-col items-center gap-0.5 border shadow-xs min-h-[50px] min-w-[70px] cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white border-pink-500 shadow-md scale-105'
                      : 'bg-white hover:bg-pink-50/80 text-slate-700 border-slate-200 hover:scale-102'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">
                    {milestone.year === '2025+' ? 'Future' : 'Year'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold">{milestone.year}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-center text-slate-400 mt-1 block sm:hidden font-medium">
            ← Swipe to explore other years →
          </p>
        </div>

        {/* Feature Spotlight Milestone Card */}
        <div ref={cardRef} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[240px] sm:min-h-[320px] lg:min-h-[460px] overflow-hidden">
              <img
                src={currentMilestone.image}
                alt={currentMilestone.title}
                className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Year Stamp */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-md text-slate-900 font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                <span>{currentMilestone.year} Milestone</span>
              </div>

              {/* Bottom Badge inside photo */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white">
                <p className="text-[10px] sm:text-[11px] font-bold text-pink-300 uppercase tracking-wider">Milestone Achievement</p>
                <p className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5 line-clamp-2">{currentMilestone.achievement}</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${currentMilestone.badgeColor}`} />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-pink-600">
                    Key Character: {currentMilestone.keyCharacter}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                  {currentMilestone.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-pink-600 mt-1">
                  {currentMilestone.subtitle}
                </p>

                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mt-3 sm:mt-4">
                  {currentMilestone.description}
                </p>
              </div>

              {/* Highlights & Bullet accomplishments */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  Era Highlights
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentMilestone.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation between years */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium">
                  Showing {currentMilestone.year} of 10-Year Legacy
                </span>
                <a
                  href="#love-world"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline"
                >
                  <span>See How It Led To LOVE WORLD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
