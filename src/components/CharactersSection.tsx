import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { CHARACTERS_DATA } from '../data/mockData';
import { ASSETS } from '../data/clientAssets';
import { Character } from '../types';
import { DollFriend, DogFriend, FlowerFriend } from './odyssey/OdysseyArt';

interface CharactersSectionProps {
  onSelectCharacter: (char: Character) => void;
}

/** Chapter 08 — the character universe as a color-blocked cluster, not a card grid. */
export const CharactersSection: React.FC<CharactersSectionProps> = ({ onSelectCharacter }) => {
  const ref = useRef<HTMLElement>(null);

  const leads = CHARACTERS_DATA.filter((c) => c.specialEmphasis);
  const rest = CHARACTERS_DATA.filter((c) => !c.specialEmphasis);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-ch="head"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.42,
        });

        gsap.utils.toArray<HTMLElement>('[data-ch="cluster-img"]').forEach((el, i) => {
          scrollReveal(el, { y: 40, scale: 0.9, rotate: i % 2 ? 7 : -7 }, {
            trigger: '[data-ch="cluster"]',
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.5)',
          });
        });

        scrollReveal('[data-ch="lead"]', { y: 30 }, {
          trigger: '[data-ch="leads"]',
          stagger: 0.12,
          duration: 0.5,
        });

        scrollReveal('[data-ch="slot"]', { y: 24, scale: 0.94 }, {
          trigger: '[data-ch="slots"]',
          stagger: 0.07,
          duration: 0.42,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const leadArt = [DollFriend, DogFriend];

  return (
    <section
      ref={ref}
      id="characters"
      className="rb-band--green relative overflow-hidden bg-white py-[var(--section-py-lg)]"
    >
      <div className="sl-container relative z-10">
        <div data-ch="head" className="max-w-2xl">
          <span className="rb-chip">Chapter eight</span>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1] tracking-tight text-[var(--text-primary)]">
            The character <span className="rb-text-spectrum">universe</span>
          </h2>
          <p className="mt-4 text-[var(--text-body-lg)] leading-relaxed text-[var(--text-secondary)]">
            Little Sheila, Belinha, the Spread Love Doll — with room reserved for the rest of
            Sheila's dolls as their artwork arrives.
          </p>
        </div>

        {/* Group composition — "the world" */}
        <div
          data-ch="cluster"
          className="relative mt-12 overflow-hidden rounded-[2rem] p-8 sm:p-12"
          style={{ background: 'var(--gradient-rainbow-diagonal)' }}
        >
          <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-8">
            <img
              data-ch="cluster-img"
              src={ASSETS.characters.littleSheila}
              alt="Little Sheila"
              className="aspect-square w-[40%] max-w-[190px] rotate-[-4deg] rounded-2xl border-[6px] border-white object-cover sm:w-[26%]"
              loading="lazy"
            />
            <img
              data-ch="cluster-img"
              src={ASSETS.belinha.starHat}
              alt="Belinha"
              className="aspect-square w-[48%] max-w-[240px] rounded-2xl border-[6px] border-white object-cover sm:w-[32%]"
              loading="lazy"
            />
            <img
              data-ch="cluster-img"
              src={ASSETS.colorful.rainbowSweets}
              alt="The colorful Spread Love world"
              className="aspect-square w-[40%] max-w-[190px] rotate-[5deg] rounded-2xl border-[6px] border-white object-cover sm:w-[26%]"
              loading="lazy"
            />
          </div>
          <p className="mt-8 text-center font-display text-2xl font-extrabold text-white sm:text-3xl">
            Everyone lives in the same world.
          </p>
        </div>

        {/* Two leads, full-width color blocks */}
        <div data-ch="leads" className="mt-12 grid gap-5 md:grid-cols-2">
          {leads.map((char, i) => {
            const Art = leadArt[i] ?? FlowerFriend;
            return (
              <button
                key={char.id}
                data-ch="lead"
                type="button"
                onClick={() => onSelectCharacter(char)}
                className="group flex flex-col items-start gap-5 rounded-[1.75rem] p-7 text-left text-white transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer sm:flex-row sm:items-center"
                style={{ background: char.color }}
              >
                <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/20 p-3">
                  <Art className="h-full w-full" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/75">
                    {char.badge}
                  </span>
                  <span className="mt-1 block font-display text-2xl font-extrabold sm:text-3xl">
                    {char.name}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-white/85">
                    {char.bio}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-extrabold">
                    Open the card
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Remaining cast — photo tiles with hue keylines */}
        <div data-ch="slots" className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {rest.map((char) => (
            <button
              key={char.id}
              data-ch="slot"
              type="button"
              onClick={() => onSelectCharacter(char)}
              className="group overflow-hidden rounded-2xl bg-white text-left transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ boxShadow: `8px 8px 0 0 ${char.color}` }}
            >
              <div className="aspect-square overflow-hidden bg-[var(--surface-muted)]">
                <img
                  src={char.image}
                  alt={char.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-base font-extrabold text-[var(--text-primary)]">
                  {char.name}
                </p>
                <p className="mt-0.5 text-xs font-bold" style={{ color: char.color }}>
                  {char.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
