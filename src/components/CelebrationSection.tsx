import React, { useRef } from 'react';
import { Heart, Sparkles, PartyPopper, MessageSquareHeart, Send } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { CelebrationWish } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

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

  // GSAP scroll reveals with reverse support on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-cel="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-cel="stat"]', { y: 24, scale: 0.88 }, {
          trigger: '[data-cel="stats"]',
          stagger: 0.08,
          duration: 0.4,
          ease: 'back.out(1.7)',
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-cel="letter"]', { scale: 0.96, y: 16 }, {
          trigger: '[data-cel="letter"]',
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-cel="wish"]', { y: 20 }, {
          trigger: '[data-cel="wishes"]',
          stagger: 0.08,
          duration: 0.35,
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
      id="celebration"
      className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/60 via-amber-50/40 to-pink-50/50 relative overflow-hidden"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-cel="header">
          <SectionHeader
            badge="The 10-Year Emotional Milestone"
            badgeIcon={<PartyPopper className="w-4 h-4 text-pink-600" />}
            title="A Decade of Pure Heart & Playful Wonder"
            subtitle="Thank you to every child, parent, teacher, and daydreamer who welcomed us into your hearts."
          />
        </div>

        {/* Milestone Stats Banner */}
        <div
          data-cel="stats"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16"
        >
          {[
            { label: 'Years of Kindness', value: '10', icon: '🎂', color: 'bg-rose-100 text-rose-700' },
            { label: 'Creative Releases', value: '15+', icon: '🎨', color: 'bg-purple-100 text-purple-700' },
            { label: 'Children Smiled', value: '2M+', icon: '🌸', color: 'bg-amber-100 text-amber-700' },
            { label: 'Doll Pocket Hugs', value: '1.2M+', icon: '🧸', color: 'bg-pink-100 text-pink-700' },
          ].map((stat, idx) => (
            <Card
              key={idx}
              data-cel="stat"
              elevation="interactive"
              className="p-4 sm:p-6 text-center"
            >
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2 block">{stat.icon}</span>
              <p className="text-2xl sm:text-4xl font-black text-slate-900">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-sm font-semibold text-slate-500 mt-0.5 sm:mt-1">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* The Creator's Thank You Letter Card */}
        <div data-cel="letter">
          <Card
            elevation="lg"
            border
            className="p-5 sm:p-8 md:p-12 border-2 border-pink-200/90 max-w-4xl mx-auto mb-14 sm:mb-16 relative bg-white"
          >
            <div className="sm:absolute -top-4 sm:-top-5 sm:left-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-600 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5 mb-4 sm:mb-0">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>A Letter from the Creator's Desk</span>
            </div>

            <div className="space-y-3.5 sm:space-y-4 text-slate-700 leading-relaxed text-xs sm:text-base pt-1 sm:pt-2">
              <p className="font-bold text-slate-900 text-sm sm:text-lg">
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

              <Button
                variant="magic"
                size="md"
                onClick={onTriggerConfetti}
                icon={<Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />}
                iconPosition="left"
                className="w-full sm:w-auto cursor-pointer"
              >
                Toss Celebration Confetti!
              </Button>
            </div>
          </Card>
        </div>

        {/* Community Wishes Guestbook Showcase */}
        <div data-cel="wishes">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 shrink-0" />
                <span>10-Year Celebration Love Notes & Wishes</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Real messages and warm hugs shared by parents, educators, and children worldwide.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenWishModal}
              icon={<Send className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto bg-white border-pink-300 text-pink-600 hover:bg-pink-50 cursor-pointer"
            >
              Leave Your Love Note
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishes.map((wish) => (
              <Card
                key={wish.id}
                data-cel="wish"
                elevation="interactive"
                className="p-5 sm:p-6 bg-white border-pink-100 flex flex-col justify-between space-y-3 sm:space-y-4"
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
                    className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 p-1.5 rounded-lg hover:bg-pink-50 transition-colors min-h-[36px] cursor-pointer"
                    title="Send Heart"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    <span>{wish.hearts}</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
