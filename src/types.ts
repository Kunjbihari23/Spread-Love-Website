export interface Character {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  bio: string;
  image: string;
  avatar: string;
  /** CSS color value from the rainbow spectrum */
  color: string;
  badge: string;
  specialEmphasis?: boolean;
  traits: string[];
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  keyCharacter: string;
  badgeColor: string;
  achievement: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'characters' | 'celebration' | 'artwork';
  image: string;
  caption: string;
  year: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  /** Empty until the client supplies the file — player shows a coming-soon state */
  videoUrl: string;
  category: string;
  description: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  coverImage: string;
  author: string;
  tags: string[];
  category: string;
  /** Original post on lovestar.world, when available */
  sourceUrl?: string;
}

export interface SocialChannel {
  name: string;
  handle: string;
  description: string;
  link: string;
  actionLabel: string;
  /** CSS color value from the rainbow spectrum */
  hue: string;
}
