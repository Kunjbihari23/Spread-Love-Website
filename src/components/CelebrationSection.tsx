import React, { useRef } from 'react';
import { Heart, Sparkles, PartyPopper, MessageSquareHeart, Star, Send, Award } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, ST } from '../lib/motion';
import { CelebrationWish } from '../types';

interface CelebrationSectionProps {
  wishes: CelebrationWish[];
  onOpenWishModal: () => void;
  onTriggerConfetti: () => void;
  onLikeWish: (wishId: string) => void;
}

export const CelebrationSection: React.FC<CelebrationSectionProps> = ({
  wishes,
  onOpenWishModal,
  onTriggerConfetti,
  onLikeWish,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Party pop: header, stats bounce, letter scaleY, wish cascade
  useGSAP(() => {
    const mm = whenMotionOk(() => {
      gsap.from('[data-cel="header"] > *', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, ...ST },
      });

      gsap.from('[data-cel="stat"]', {
        y: 40,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '[data-cel="stats"]',
          start: 'top 85%',
          toggleActions: ST.toggleActions,
        },
      });

      gsap.from('[data-cel="letter"]', {
        scaleY: 0.92,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        transformOrigin: 'center top',
        scrollTrigger: {
          trigger: '[data-cel="letter"]',
          start: 'top 88%',
          toggleActions: ST.toggleActions,
        },
      });

      gsap.from('[data-cel="wish"]', {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-cel="wishes"]',
          start: 'top 88%',
          toggleActions: ST.toggleActions,
        },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="celebration" className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/60 via-amber-50/40 to-pink-50/50 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centerpiece Headline */}
        <div data-cel="header" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md animate-bounce duration-1000">
            <PartyPopper className="w-4 h-4" />
            <span>The 10-Year Emotional Milestone</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
            A Decade of Pure Heart & Playful Wonder
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-bold text-pink-600">
            Thank you to every child, parent, teacher, and daydreamer who welcomed us into your hearts.
          </p>
        </div>

        {/* Milestone Stats Banner */}
        <div data-cel="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {[
            { label: 'Years of Kindness', value: '10', icon: '🎂', color: 'bg-rose-100 text-rose-700' },
            { label: 'Creative Releases', value: '15+', icon: '🎨', color: 'bg-purple-100 text-purple-700' },
            { label: 'Children Smiled', value: '2M+', icon: '🌸', color: 'bg-amber-100 text-amber-700' },
            { label: 'Doll Pocket Hugs', value: '1.2M+', icon: '🧸', color: 'bg-pink-100 text-pink-700' },
          ].map((stat, idx) => (
            <div
              key={idx}
              data-cel="stat"
              className="p-4 sm:p-6 rounded-3xl bg-white border border-pink-100 shadow-sm text-center transform hover:-translate-y-1 transition-transform"
            >
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2 block">{stat.icon}</span>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-sm font-semibold text-slate-500 mt-0.5 sm:mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* The Creator's Thank You Letter Card */}
        <div data-cel="letter" className="rounded-3xl p-5 sm:p-8 md:p-12 bg-white border-2 border-pink-200/90 shadow-xl max-w-4xl mx-auto mb-14 sm:mb-16 relative">
          <div className="sm:absolute -top-4 sm:-top-5 sm:left-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-600 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5 mb-4 sm:mb-0">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>A Letter from the Creator's Desk</span>
          </div>

          <div className="space-y-3.5 sm:space-y-4 text-slate-700 leading-relaxed text-xs sm:text-base pt-1 sm:pt-2">
            <p className="font-semibold text-slate-900 text-sm sm:text-lg">
              "When I drew the first outline of Little Sheila and stitched the first test fabric for the Spread Love Doll in my apartment, I had one simple wish: that somewhere, a small child feeling anxious or lonely might hold this creation and know they are loved."
            </p>
            <p>
              Over these past 10 years, you turned that solitary wish into a vibrant global family. You shared photos of dolls tucked into school backpacks, sent recordings of siblings singing our lullabies, and showed us how kindness can transform play.
            </p>
            <p>
              LOVE WORLD is our love letter back to you. Everything we have learned, every sketch we have saved, and every hug we have felt is poured into this new journey. Thank you for ten unforgettable years—and here's to the next decade of dreaming together!
            </p>
          </div>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-pink-400 bg-pink-100 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=150&q=80"
                  alt="Creator Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">Lead Creator & Doll Artisan</p>
                <p className="text-[11px] sm:text-xs text-slate-500">Founder, LOVE WORLD Studios</p>
              </div>
            </div>

            {/* Interactive Confetti & Sparkles Trigger */}
            <button
              id="celebrate-confetti-btn"
              onClick={onTriggerConfetti}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Toss Celebration Confetti!</span>
            </button>
          </div>
        </div>

        {/* Community Wishes Guestbook Showcase */}
        <div data-cel="wishes">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 shrink-0" />
                <span>10-Year Celebration Love Notes & Wishes</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Real messages and warm hugs shared by parents, educators, and children worldwide.
              </p>
            </div>

            <button
              id="open-wish-modal-btn"
              onClick={onOpenWishModal}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-2xl bg-white hover:bg-pink-50 border border-pink-300 text-pink-600 font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Leave Your Love Note</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                data-cel="wish"
                className="p-5 sm:p-6 rounded-3xl bg-white border border-pink-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3 sm:space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <span className="text-2xl">{wish.avatarEmoji}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                      {wish.tag}
                    </span>
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                    "{wish.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{wish.author}</p>
                    <p className="text-[10px] text-slate-400">{wish.location}</p>
                  </div>

                  <button
                    onClick={() => onLikeWish(wish.id)}
                    className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 p-1.5 rounded-lg hover:bg-pink-50 transition-colors min-h-[36px]"
                    title="Send Heart"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    <span>{wish.hearts}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
