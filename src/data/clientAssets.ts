/**
 * Client-provided assets only — paths under /public.
 * Add new files into the matching folder, then register here.
 */
export const ASSETS = {
  belinha: {
    jetski: '/belinha/belinha-jetski-beach.jpg',
    sandcastle: '/belinha/belinha-sandcastle.jpg',
    sunsetHeld: '/belinha/belinha-sunset-held.jpg',
    sunsetProfile: '/belinha/belinha-sunset-profile.jpg',
    starHat: '/belinha/belinha-star-hat.jpg',
    beads: '/belinha/belinha-beads-sunflowers.jpg',
    birthday: '/belinha/belinha-birthday-disney.jpg',
  },
  creator: {
    sandHeart: '/creator/sheila-belinha-sand-heart.jpg',
    sunset: '/creator/sheila-belinha-sunset.jpg',
    portrait: '/creator/sheila-portrait-red-hat.jpg',
  },
  characters: {
    littleSheila: '/characters/little-sheila-artwork.jpg',
  },
  colorful: {
    rainbowSweets: '/colorful/rainbow-sweets-display.jpg',
  },
  /** Drop final LOVE WORLD logo video here when ready */
  hero: {
    video: '/hero/love-world-logo.mp4',
    poster: '/creator/sheila-belinha-sunset.jpg',
  },
} as const;

export const OLD_SITE = {
  home: 'https://www.lovestar.world/',
  blog: 'https://www.lovestar.world/blog',
} as const;
