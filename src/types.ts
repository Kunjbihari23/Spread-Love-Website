export interface Project {
  id: string;
  title: string;
  year: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  coverImage: string;
  screenshots: string[];
  characters: string[];
  platforms: string[];
  color: string;
  bgLight: string;
  featured?: boolean;
  status?: string;
  highlights: string[];
}

export interface Character {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  bio: string;
  image: string;
  avatar: string;
  color: string;
  bgGradient: string;
  badge: string;
  specialEmphasis?: boolean;
  relatedProject: string;
  traits: string[];
  quote: string;
  favoriteItem: string;
  friendshipLevel: string;
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
  category: 'characters' | 'projects' | 'celebration' | 'artwork';
  image: string;
  caption: string;
  year: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  views: string;
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

export interface CelebrationWish {
  id: string;
  author: string;
  location: string;
  text: string;
  date: string;
  hearts: number;
  avatarEmoji: string;
  tag: string;
}

export interface SocialChannel {
  name: string;
  handle: string;
  description: string;
  followers: string;
  color: string;
  textColor: string;
  hoverBorder: string;
  link: string;
  actionLabel: string;
  recentPost: {
    title: string;
    date: string;
    mediaSnippet: string;
  };
}
