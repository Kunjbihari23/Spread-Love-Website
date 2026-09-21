import { Character, Milestone, GalleryItem, VideoItem, SocialChannel } from '../types';
import { ASSETS, OLD_SITE } from './clientAssets';

/**
 * Content source of truth.
 *
 * Rule: nothing here invents facts about the client. No download counts,
 * no awards, no dates she hasn't given us. Copy is written to be replaced
 * once Sheila supplies the final text.
 */

export const HERO_DATA = {
  anniversaryBadge: "10 years of creativity & love",
  headline: "Spread Love",
  subtext: "A colorful creative world — Sheila Rocha, Belinha, her characters, and ten years of making things with love.",
  videoBadge: "Play the film",
};

export const CHARACTERS_DATA: Character[] = [
  {
    id: "spread-love-doll",
    name: "Spread Love Doll",
    subtitle: "The heart of the brand",
    role: "Original character",
    bio: "The Spread Love Doll has carried the brand from the beginning. Final story and artwork coming from the client.",
    image: ASSETS.colorful.rainbowSweets,
    avatar: ASSETS.colorful.rainbowSweets,
    color: "var(--rb-pink)",
    badge: "Original",
    specialEmphasis: true,
    traits: ["Kindness", "Comfort", "Ten years"],
  },
  {
    id: "belinha-dog",
    name: "Belinha",
    subtitle: "Best friend & muse",
    role: "Real life and character",
    bio: "The real Belinha — best friend, studio companion, and the heart of many joyful moments. Her story runs from real life into the creative world.",
    image: ASSETS.belinha.starHat,
    avatar: ASSETS.belinha.starHat,
    color: "var(--rb-orange)",
    badge: "Real & drawn",
    specialEmphasis: true,
    traits: ["Beach days", "Star hats", "Joy"],
  },
  {
    id: "little-sheila",
    name: "Little Sheila",
    subtitle: "Client artwork",
    role: "Original character",
    bio: "Little Sheila, drawn by the client. Final description coming from her.",
    image: ASSETS.characters.littleSheila,
    avatar: ASSETS.characters.littleSheila,
    color: "var(--rb-green)",
    badge: "Artwork",
    specialEmphasis: false,
    traits: ["Curiosity", "Color"],
  },
  {
    id: "character-slot-4",
    name: "Character four",
    subtitle: "Artwork coming",
    role: "Placeholder slot",
    bio: "Placeholder for one of the client's remaining dolls. Add the artwork to /public/characters and register it here.",
    image: ASSETS.creator.portrait,
    avatar: ASSETS.creator.portrait,
    color: "var(--rb-violet)",
    badge: "Coming soon",
    specialEmphasis: false,
    traits: [],
  },
  {
    id: "character-slot-5",
    name: "Character five",
    subtitle: "Artwork coming",
    role: "Placeholder slot",
    bio: "Placeholder for one of the client's remaining dolls. Add the artwork to /public/characters and register it here.",
    image: ASSETS.colorful.rainbowSweets,
    avatar: ASSETS.colorful.rainbowSweets,
    color: "var(--rb-blue)",
    badge: "Coming soon",
    specialEmphasis: false,
    traits: [],
  },
  {
    id: "character-slot-6",
    name: "Character six",
    subtitle: "Artwork coming",
    role: "Placeholder slot",
    bio: "Placeholder for one of the client's remaining dolls. Add the artwork to /public/characters and register it here.",
    image: ASSETS.creator.sandHeart,
    avatar: ASSETS.creator.sandHeart,
    color: "var(--rb-teal)",
    badge: "Coming soon",
    specialEmphasis: false,
    traits: [],
  },
];

/** Placeholder copy — client supplies final LOVE WORLD text and video. */
export const LOVE_WORLD_DATA = {
  title: "LOVE WORLD",
  tagline: "A colorful world built from ten years of imagination.",
  overview: "The flagship Spread Love project, bringing Sheila's characters, colors, and stories together in one creative world. Final description and release details coming from the client.",
  keyPillars: [
    { title: "Color", desc: "Rainbow as a language — every corner of the world has its own hue." },
    { title: "Characters", desc: "Little Sheila, Belinha, the Spread Love Doll, and friends." },
    { title: "Kindness", desc: "Gentle play, made for children. No pressure, no stress." },
    { title: "Story", desc: "Ten years of creating, carried into one place." },
  ],
};

/**
 * Storybook chapters. Years are chapter markers, not claims about
 * specific events — the client replaces titles and text.
 */
export const TIMELINE_DATA: Milestone[] = [
  {
    id: "m-2014",
    year: "One",
    title: "The First Drawings",
    subtitle: "Where the world started",
    description: "The earliest characters and sketches. Final story coming from the client.",
    highlights: ["First characters", "First sketchbooks"],
    image: ASSETS.characters.littleSheila,
    keyCharacter: "Little Sheila",
    badgeColor: "bg-[var(--rb-red)]",
    achievement: "Chapter one",
  },
  {
    id: "m-2016",
    year: "Two",
    title: "Color Finds Its Voice",
    subtitle: "The palette arrives",
    description: "Strong color becomes part of the language. Final story coming from the client.",
    highlights: ["Rainbow palette", "Playful shapes"],
    image: ASSETS.colorful.rainbowSweets,
    keyCharacter: "Color",
    badgeColor: "bg-[var(--rb-orange)]",
    achievement: "Chapter two",
  },
  {
    id: "m-2018",
    year: "Three",
    title: "Summers by the Sea",
    subtitle: "Beach days and freedom",
    description: "Seaside memories work their way into the world. Final story coming from the client.",
    highlights: ["Beach memories", "Sun and sand"],
    image: ASSETS.belinha.sandcastle,
    keyCharacter: "Summer",
    badgeColor: "bg-[var(--rb-yellow)]",
    achievement: "Chapter three",
  },
  {
    id: "m-2020",
    year: "Four",
    title: "The Spread Love Doll",
    subtitle: "A symbol takes shape",
    description: "The doll becomes the centre of the brand. Final story coming from the client.",
    highlights: ["The doll", "A symbol of kindness"],
    image: ASSETS.creator.sandHeart,
    keyCharacter: "Spread Love Doll",
    badgeColor: "bg-[var(--rb-green)]",
    achievement: "Chapter four",
  },
  {
    id: "m-2022",
    year: "Five",
    title: "Belinha",
    subtitle: "Best friend and muse",
    description: "Belinha joins the story, in real life and on paper. Final story coming from the client.",
    highlights: ["Real Belinha", "Belinha the character"],
    image: ASSETS.belinha.sunsetHeld,
    keyCharacter: "Belinha",
    badgeColor: "bg-[var(--rb-teal)]",
    achievement: "Chapter five",
  },
  {
    id: "m-2024",
    year: "Six",
    title: "Ten Years",
    subtitle: "A decade of creating",
    description: "Ten years of characters, color, and stories. Final story coming from the client.",
    highlights: ["Ten years", "The whole cast"],
    image: ASSETS.creator.sunset,
    keyCharacter: "Everyone",
    badgeColor: "bg-[var(--rb-blue)]",
    achievement: "Chapter six",
  },
  {
    id: "m-2025",
    year: "Next",
    title: "LOVE WORLD",
    subtitle: "What comes next",
    description: "The next chapter, still being written. Final story coming from the client.",
    highlights: ["LOVE WORLD", "The next decade"],
    image: ASSETS.belinha.jetski,
    keyCharacter: "The world",
    badgeColor: "bg-[var(--rb-violet)]",
    achievement: "Next chapter",
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    title: "Little Sheila",
    category: "artwork",
    image: ASSETS.characters.littleSheila,
    caption: "Client artwork — Little Sheila.",
    year: "—",
    tags: ["Little Sheila", "Artwork"],
  },
  {
    id: "g2",
    title: "Rainbow Sweets",
    category: "artwork",
    image: ASSETS.colorful.rainbowSweets,
    caption: "The photograph the site's palette came from.",
    year: "—",
    tags: ["Rainbow", "Color"],
  },
  {
    id: "g3",
    title: "Heart in the Sand",
    category: "celebration",
    image: ASSETS.creator.sandHeart,
    caption: "Sheila and Belinha — a heart drawn in the sand.",
    year: "—",
    tags: ["Creator", "Beach"],
  },
  {
    id: "g4",
    title: "Creator & Belinha",
    category: "celebration",
    image: ASSETS.creator.sunset,
    caption: "Sheila Rocha with Belinha at sunset.",
    year: "—",
    tags: ["Creator", "Belinha"],
  },
  {
    id: "g5",
    title: "Sheila · Red Hat",
    category: "celebration",
    image: ASSETS.creator.portrait,
    caption: "Sheila Rocha — creator portrait.",
    year: "—",
    tags: ["Creator", "Portrait"],
  },
  {
    id: "g6",
    title: "Belinha · Sunset",
    category: "characters",
    image: ASSETS.belinha.sunsetProfile,
    caption: "Belinha in golden light.",
    year: "—",
    tags: ["Belinha", "Sunset"],
  },
];

/**
 * Video slots. `videoUrl` stays empty until the client supplies files —
 * the player shows a "coming soon" state for empty URLs.
 */
export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "v-love-world",
    title: "LOVE WORLD — Logo Film",
    subtitle: "The opening of the world",
    thumbnail: ASSETS.colorful.rainbowSweets,
    videoUrl: "",
    category: "LOVE WORLD",
    description: "The main LOVE WORLD film. Drop the final file at /public/hero/love-world-logo.mp4 and it plays here and in the hero.",
    featured: true,
  },
  {
    id: "v-10-year-reel",
    title: "10 Years of Spread Love",
    subtitle: "A look back across the decade",
    thumbnail: ASSETS.creator.sunset,
    videoUrl: "",
    category: "10 Years",
    description: "Placeholder slot for the anniversary film.",
    featured: false,
  },
  {
    id: "v-characters",
    title: "The Characters",
    subtitle: "Little Sheila, Belinha & friends",
    thumbnail: ASSETS.characters.littleSheila,
    videoUrl: "",
    category: "Characters",
    description: "Placeholder slot for a character film.",
    featured: false,
  },
  {
    id: "v-belinha",
    title: "Belinha",
    subtitle: "Best friend & muse",
    thumbnail: ASSETS.belinha.starHat,
    videoUrl: "",
    category: "Belinha",
    description: "Placeholder slot for a Belinha film.",
    featured: false,
  },
];

export { BLOG_POSTS_DATA } from './blogPosts';

/** Channel links only — no follower counts or engagement numbers invented. */
export const SOCIAL_CHANNELS_DATA: SocialChannel[] = [
  {
    name: "YouTube",
    handle: "Spread Love on YouTube",
    description: "Films, animations, and behind-the-scenes.",
    link: "https://youtube.com",
    actionLabel: "Watch on YouTube",
    hue: "var(--rb-red)",
  },
  {
    name: "Instagram",
    handle: "Spread Love on Instagram",
    description: "Everyday color, characters, and Belinha.",
    link: "https://instagram.com",
    actionLabel: "Follow on Instagram",
    hue: "var(--rb-violet)",
  },
  {
    name: "Facebook",
    handle: "Spread Love on Facebook",
    description: "Posts, updates, and community.",
    link: "https://facebook.com",
    actionLabel: "Join on Facebook",
    hue: "var(--rb-blue)",
  },
];

export const OLD_WEBSITE_ARCHIVE = {
  title: "The original lovestar.world",
  description: "Sheila's original website, still online — blog posts and earlier work.",
  cta: "Visit lovestar.world",
  url: OLD_SITE.home,
};
