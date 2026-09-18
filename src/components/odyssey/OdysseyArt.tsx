import React from 'react';

/* ========================================================================
   Hand-built SVG art for the Odyssey storybook.
   Everything is inline so GSAP can draw, morph and move individual paths.
   ======================================================================== */

type ArtProps = React.SVGProps<SVGSVGElement>;

/** Ornate gold frame for the book cover. Paths carry ids for DrawSVG. */
export const CoverFrame: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 600 380" fill="none" aria-hidden="true" {...rest}>
    <defs>
      <linearGradient id="od-foil-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8f6412" />
        <stop offset="35%" stopColor="#ffe9a8" />
        <stop offset="60%" stopColor="#e0a827" />
        <stop offset="100%" stopColor="#fff6d8" />
      </linearGradient>
    </defs>
    <rect
      className="od-frame-line"
      x="22"
      y="22"
      width="556"
      height="336"
      rx="16"
      stroke="url(#od-foil-grad)"
      strokeWidth="2.5"
    />
    <rect
      className="od-frame-line"
      x="36"
      y="36"
      width="528"
      height="308"
      rx="10"
      stroke="url(#od-foil-grad)"
      strokeWidth="1"
      strokeDasharray="6 7"
    />
    {[
      'M22 70 C 22 42, 42 22, 70 22',
      'M530 22 C 558 22, 578 42, 578 70',
      'M578 310 C 578 338, 558 358, 530 358',
      'M70 358 C 42 358, 22 338, 22 310',
    ].map((d, i) => (
      <path
        key={i}
        className="od-frame-flourish"
        d={d}
        stroke="url(#od-foil-grad)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

/** Heart-and-star crest that sits on the cover; MorphSVG swaps the inner shape. */
export const CoverCrest: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true" {...rest}>
    <circle cx="60" cy="60" r="46" fill="rgba(255,202,75,0.12)" stroke="url(#od-foil-grad)" strokeWidth="1.5" />
    <path
      id="od-crest-shape"
      d="M60 88C60 88 30 70 30 50.5C30 39.7 38.4 32 47.6 32C53.4 32 57.7 34.9 60 38.6C62.3 34.9 66.6 32 72.4 32C81.6 32 90 39.7 90 50.5C90 70 60 88 60 88Z"
      fill="#ff4d8d"
    />
    <path
      id="od-crest-star"
      className="hidden"
      d="M60 28L69 50L92 52L74 67L80 90L60 78L40 90L46 67L28 52L51 50Z"
      fill="#ffca4b"
    />
    {[...Array(8)].map((_, i) => (
      <circle
        key={i}
        className="od-crest-spark"
        cx={60 + Math.cos((i / 8) * Math.PI * 2) * 52}
        cy={60 + Math.sin((i / 8) * Math.PI * 2) * 52}
        r="2.4"
        fill="#ffe9a8"
      />
    ))}
  </svg>
);

/**
 * The journey trail. `#od-trail-visible` is drawn with DrawSVG as the reader
 * advances; `#od-trail-motion` is the identical (invisible) MotionPath rail.
 */
export const TrailPath: React.FC<ArtProps> = ({ className, ...rest }) => {
  const d =
    'M10 80 C 120 20, 200 140, 320 80 S 520 20, 640 80 S 840 140, 960 70 S 1140 20, 1250 60';
  return (
    <svg className={className} viewBox="0 0 1260 160" fill="none" aria-hidden="true" {...rest}>
      <path d={d} stroke="rgba(255,233,168,0.18)" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
      <path
        id="od-trail-visible"
        d={d}
        stroke="#ffca4b"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 11"
      />
      <path id="od-trail-motion" d={d} stroke="none" fill="none" />
    </svg>
  );
};

/** Paper plane that rides the trail via MotionPath. */
export const PaperPlane: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true" {...rest}>
    <path d="M4 24L44 6L33 44L24 30L4 24Z" fill="#fffaf1" />
    <path d="M4 24L33 44L24 30L4 24Z" fill="#ffca4b" />
    <path d="M44 6L24 30" stroke="#e29a00" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/** Heart used for the Physics2D finale burst. */
export const HeartShape: React.FC<ArtProps> = ({ className, fill = '#ff4d8d', ...rest }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
    <path
      d="M12 21s-8.5-5.1-8.5-11A5.2 5.2 0 0 1 12 6.9 5.2 5.2 0 0 1 20.5 10c0 5.9-8.5 11-8.5 11Z"
      fill={fill}
    />
  </svg>
);

/* ── Character stickers ─────────────────────────────────────────────── */

const Blush = ({ cx, cy }: { cx: number; cy: number }) => (
  <ellipse cx={cx} cy={cy} rx="5.5" ry="3.4" fill="#ff8fb3" opacity="0.65" />
);

const SmileEyes = ({ y = 46 }: { y?: number }) => (
  <>
    <circle cx="40" cy={y} r="3.4" fill="#2a1c3f" />
    <circle cx="60" cy={y} r="3.4" fill="#2a1c3f" />
    <circle cx="41.2" cy={y - 1.2} r="1.1" fill="#fff" />
    <circle cx="61.2" cy={y - 1.2} r="1.1" fill="#fff" />
    <path d={`M44 ${y + 8} Q50 ${y + 13} 56 ${y + 8}`} stroke="#2a1c3f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

/** Little Sheila — a giggling garden flower. */
export const FlowerFriend: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" {...rest}>
    <path d="M50 66V92" stroke="#2fd197" strokeWidth="5" strokeLinecap="round" />
    <path d="M50 80C42 80 36 74 34 68C43 66 50 72 50 80Z" fill="#2fd197" />
    {[...Array(8)].map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <ellipse
          key={i}
          cx={50 + Math.cos(a) * 24}
          cy={48 + Math.sin(a) * 24}
          rx="12"
          ry="10"
          fill={i % 2 ? '#ffd166' : '#ffe9a8'}
          transform={`rotate(${(i / 8) * 360} ${50 + Math.cos(a) * 24} ${48 + Math.sin(a) * 24})`}
        />
      );
    })}
    <circle cx="50" cy="48" r="20" fill="#fff6e2" />
    <SmileEyes />
    <Blush cx={32} cy={52} />
    <Blush cx={68} cy={52} />
  </svg>
);

/** Cosmic Pip — the lullaby star. */
export const StarFriend: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" {...rest}>
    <path
      d="M50 8L62 38L94 42L70 62L77 94L50 78L23 94L30 62L6 42L38 38Z"
      fill="#c4b5fd"
      stroke="#8b5cf6"
      strokeWidth="2.5"
    />
    <path d="M50 14L60 40L88 44L67 61L73 86L50 72L27 86L33 61L12 44L40 40Z" fill="#ede9fe" />
    <SmileEyes y={50} />
    <Blush cx={33} cy={57} />
    <Blush cx={67} cy={57} />
    <circle cx="86" cy="20" r="3" fill="#ffca4b" />
    <circle cx="14" cy="26" r="2" fill="#ffca4b" />
  </svg>
);

/** Spread Love Doll — the pocket-hug doll. */
export const DollFriend: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" {...rest}>
    <rect x="30" y="62" width="40" height="30" rx="14" fill="#ff4d8d" />
    <path d="M40 74 Q50 84 60 74" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="44" r="26" fill="#ffe3cf" stroke="#e8b294" strokeWidth="2" />
    <path d="M24 38C24 20 36 12 50 12C64 12 76 20 76 38C70 30 60 26 50 26C40 26 30 30 24 38Z" fill="#8b5a2b" />
    <circle cx="24" cy="44" r="7" fill="#8b5a2b" />
    <circle cx="76" cy="44" r="7" fill="#8b5a2b" />
    <SmileEyes y={44} />
    <Blush cx={33} cy={50} />
    <Blush cx={67} cy={50} />
    <path d="M50 96C50 96 40 90 40 84.5A5 5 0 0 1 50 82A5 5 0 0 1 60 84.5C60 90 50 96 50 96Z" fill="#ffca4b" />
  </svg>
);

/** Belinha — the bakery golden retriever. */
export const DogFriend: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" {...rest}>
    <ellipse cx="20" cy="52" rx="11" ry="20" fill="#e0a227" transform="rotate(-14 20 52)" />
    <ellipse cx="80" cy="52" rx="11" ry="20" fill="#e0a227" transform="rotate(14 80 52)" />
    <circle cx="50" cy="48" r="28" fill="#f7c85c" />
    <ellipse cx="50" cy="62" rx="16" ry="12" fill="#fff3d4" />
    <SmileEyes y={44} />
    <ellipse cx="50" cy="58" rx="5" ry="4" fill="#2a1c3f" />
    <path d="M50 62 V66 M50 66 Q44 70 41 66 M50 66 Q56 70 59 66" stroke="#2a1c3f" strokeWidth="2" strokeLinecap="round" fill="none" />
    <Blush cx={30} cy={53} />
    <Blush cx={70} cy={53} />
    <path d="M62 20 L70 12 L78 20 L70 24 Z" fill="#ff4d8d" />
  </svg>
);

/** Full universe cast — three friends peeking together. */
export const CastFriends: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" {...rest}>
    <circle cx="28" cy="58" r="20" fill="#f7c85c" />
    <circle cx="72" cy="58" r="20" fill="#c4b5fd" />
    <circle cx="50" cy="48" r="24" fill="#ffe3cf" stroke="#e8b294" strokeWidth="2" />
    <path d="M26 42C26 26 37 18 50 18C63 18 74 26 74 42C68 34 59 30 50 30C41 30 32 34 26 42Z" fill="#8b5a2b" />
    <circle cx="43" cy="47" r="3" fill="#2a1c3f" />
    <circle cx="57" cy="47" r="3" fill="#2a1c3f" />
    <path d="M45 56 Q50 60 55 56" stroke="#2a1c3f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <circle cx="22" cy="55" r="2.6" fill="#2a1c3f" />
    <circle cx="78" cy="55" r="2.6" fill="#2a1c3f" />
    <path d="M50 92C50 92 38 85 38 78.5A6 6 0 0 1 50 76A6 6 0 0 1 62 78.5C62 85 50 92 50 92Z" fill="#ff4d8d" />
  </svg>
);

/** Next generation — the little rocket of what's coming. */
export const RocketFriend: React.FC<ArtProps> = ({ className, ...rest }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" {...rest}>
    <path d="M50 8C62 20 68 38 68 54H32C32 38 38 20 50 8Z" fill="#fffaf1" stroke="#38b6ff" strokeWidth="2.5" />
    <path d="M32 54L18 74L32 68Z" fill="#38b6ff" />
    <path d="M68 54L82 74L68 68Z" fill="#38b6ff" />
    <rect x="38" y="54" width="24" height="14" rx="5" fill="#e0f2fe" />
    <circle cx="50" cy="38" r="11" fill="#38b6ff" opacity="0.25" />
    <path d="M50 44C50 44 42 39 42 34.5A4.2 4.2 0 0 1 50 32.5A4.2 4.2 0 0 1 58 34.5C58 39 50 44 50 44Z" fill="#ff4d8d" />
    <path className="od-rocket-flame" d="M44 68C44 78 50 94 50 94C50 94 56 78 56 68Z" fill="#ffca4b" />
  </svg>
);

/** Maps a milestone id to its cast member. */
export const CHARACTER_ART: Record<string, React.FC<ArtProps>> = {
  'm-2014': FlowerFriend,
  'm-2016': FlowerFriend,
  'm-2018': StarFriend,
  'm-2020': DollFriend,
  'm-2022': DogFriend,
  'm-2024': CastFriends,
  'm-2025': RocketFriend,
};
