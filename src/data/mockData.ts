import { Project, Character, Milestone, GalleryItem, VideoItem, CelebrationWish, SocialChannel } from '../types';
import { ASSETS, OLD_SITE } from './clientAssets';

export const HERO_DATA = {
  anniversaryBadge: "10 Years of Creativity & Love",
  headlinePrefix: "Spread Love",
  headlineEmphasis: "A Colorful Creative World",
  headlineSuffix: "Built from Heart & Imagination.",
  subtext: "A colorful creative universe — Sheila Rocha, Belinha, characters, and ten years of love.",
  primaryCta: "Enter LOVE WORLD",
  secondaryCta: "Discover Our Story",
  videoBadge: "Play LOVE WORLD Video",
};

export const CHARACTERS_DATA: Character[] = [
  {
    id: "spread-love-doll",
    name: "Spread Love Doll",
    subtitle: "The Beacon of Warmth & Hugs",
    role: "Empathy Ambassador & Comfort Guide",
    bio: "Created to bring gentle reassurance and unconditional kindness to children worldwide. Known for her iconic heart badge, soft pastel stitches, and magical pocket hugs that remind every child they are deeply cherished.",
    image: ASSETS.colorful.rainbowSweets,
    avatar: ASSETS.colorful.rainbowSweets,
    color: "#FF5E7E",
    bgGradient: "from-pink-500/20 via-rose-400/10 to-transparent",
    badge: "Iconic Star ★",
    specialEmphasis: true,
    relatedProject: "Spread Love Doll: Pocket Hugs",
    traits: ["Infinite Empathy", "Warm Pocket Hugs", "Gentle Lullabies", "Friendship Spark"],
    quote: "No matter how big the world feels, a small hug makes everything bright.",
    favoriteItem: "Rose-velvet friendship ribbon",
    friendshipLevel: "Forever Best Friend",
  },
  {
    id: "belinha-dog",
    name: "Belinha",
    subtitle: "My Best Friend & Muse",
    role: "Adventure Scout & Happiness Champion",
    bio: "The real Belinha — best friend, studio companion, and heart of so many joyful moments. Her story continues from real life into the creative world.",
    image: ASSETS.belinha.starHat,
    avatar: ASSETS.belinha.starHat,
    color: "#FFB800",
    bgGradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    badge: "Core Icon 🐾",
    specialEmphasis: true,
    relatedProject: "Belinha's Barking Bakery",
    traits: ["Super Sniffer", "Tail-Wag Engine", "Cookie Detector", "Courageous Heart"],
    quote: "Woof! Where love goes, my paws will happily follow!",
    favoriteItem: "Golden biscuit with honey frosting",
    friendshipLevel: "Inseparable Pal",
  },
  {
    id: "little-sheila",
    name: "Little Sheila",
    subtitle: "The Curious Garden Explorer",
    role: "Botanical Wonderer & Nature Storyteller",
    bio: "With her vintage magnifying glass and oversized sunhat, Sheila discovers tiny wonders in everyday backyard gardens. She speaks to bumblebees, paints dewdrop rainbows, and inspires children to cherish our living planet.",
    image: ASSETS.characters.littleSheila,
    avatar: ASSETS.characters.littleSheila,
    color: "#2FD197",
    bgGradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    badge: "Original Heroine 🌿",
    specialEmphasis: false,
    relatedProject: "Little Sheila's Garden Adventure",
    traits: ["Plant Whisperer", "Secret Map Reader", "Rainbow Seeker", "Gentle Curiosity"],
    quote: "Look closely under the clover, that's where tiny magic sleeps!",
    favoriteItem: "Brass explorer lens & wildflower journal",
    friendshipLevel: "Wonder Buddy",
  },
  {
    id: "cosmic-pip",
    name: "Cosmic Pip",
    subtitle: "Placeholder character",
    role: "Character details coming soon",
    bio: "Placeholder — final name, story, and artwork will be provided by the client.",
    image: ASSETS.colorful.rainbowSweets,
    avatar: ASSETS.colorful.rainbowSweets,
    color: "#845EC2",
    bgGradient: "from-purple-500/20 via-indigo-400/10 to-transparent",
    badge: "Dream Guardian ✨",
    specialEmphasis: false,
    relatedProject: "Starry Night Lullaby Interactive",
    traits: ["Luminescent Aura", "Constellation Whistle", "Calm Floating", "Dream Sweeper"],
    quote: "Every star in the dark is just a friendly wink from someone who cares.",
    favoriteItem: "Moonbeam lantern",
    friendshipLevel: "Midnight Guide",
  },
  {
    id: "sunny-spark",
    name: "Sunny Spark",
    subtitle: "Placeholder character",
    role: "Character details coming soon",
    bio: "Placeholder — final name, story, and artwork will be provided by the client.",
    image: ASSETS.creator.sandHeart,
    avatar: ASSETS.creator.sandHeart,
    color: "#38B6FF",
    bgGradient: "from-sky-500/20 via-blue-400/10 to-transparent",
    badge: "Music Maestro 🎵",
    specialEmphasis: false,
    relatedProject: "LOVE WORLD",
    traits: ["Melodic Whistle", "Joyful Tap Dance", "Harmony Weaver", "Upbeat Energy"],
    quote: "When words run out, sing a little tune!",
    favoriteItem: "Glockenspiel wand",
    friendshipLevel: "Party Leader",
  },
  {
    id: "barnaby-bear",
    name: "Barnaby Bear",
    subtitle: "Placeholder character",
    role: "Character details coming soon",
    bio: "Placeholder — final name, story, and artwork will be provided by the client. (Belinha photos stay in Belinha’s section only.)",
    image: ASSETS.creator.portrait,
    avatar: ASSETS.creator.portrait,
    color: "#E07A5F",
    bgGradient: "from-orange-500/20 via-rose-300/10 to-transparent",
    badge: "Gentle Giant 🧸",
    specialEmphasis: false,
    relatedProject: "Belinha's Barking Bakery",
    traits: ["Cozy Warmth", "Storyteller Voice", "Pastry Genius", "Patient Ear"],
    quote: "Big hugs solve big problems.",
    favoriteItem: "Wooden honey ladle",
    friendshipLevel: "Cozy Protector",
  }
];

export const LOVE_WORLD_DATA = {
  title: "LOVE WORLD",
  tagline: "The Next Decade of Playful Magic & Kind Adventures",
  badge: "✨ Flagship 10-Year Anniversary Project",
  releaseDate: "Coming Fall 2025 / Early Access Beta",
  overview: "LOVE WORLD unites a decade of beloved characters, stories, and heartwarming play mechanics into one expansive, living sandbox. Explore vibrant floating islands, build friendship shrines, solve gentle puzzle quests, and celebrate kindness alongside Spread Love Doll, Belinha, and Little Sheila.",
  trailerDuration: "2:45",
  keyPillars: [
    {
      title: "Cooperative Kindness",
      desc: "No combat or stress. Players solve gentle mysteries through compassion, shared hugs, and creative building.",
      icon: "HeartHandshake",
      color: "text-pink-500 bg-pink-50",
    },
    {
      title: "Living Character Ecosystem",
      desc: "All 10 years of characters return with voiced interactions, personalized treehouses, and surprise daily quests.",
      icon: "Sparkles",
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: "Tactile Toy Physics",
      desc: "Simulates the plush warmth of physical dolls, wooden building blocks, and hand-painted watercolor worlds.",
      icon: "Palette",
      color: "text-purple-500 bg-purple-50",
    },
    {
      title: "Safe Family Sanctuary",
      desc: "100% ad-free, zero predatory microtransactions, certified child-safe with intuitive multi-generational co-op.",
      icon: "ShieldCheck",
      color: "text-emerald-500 bg-emerald-50",
    }
  ],
  islands: [
    { name: "Heartwood Valley", desc: "Home of Spread Love Doll & the Grand Hugging Willow", color: "#FF5E7E" },
    { name: "Golden Bark Coast", desc: "Belinha's sandy playground of pastry docks and water slides", color: "#FFB800" },
    { name: "Stardust Conservatory", desc: "Cosmic Pip's observatory where children paint constellations", color: "#845EC2" },
    { name: "Bloom & Clover Meadow", desc: "Little Sheila's botanical wonderland of giggling flowers", color: "#2FD197" },
  ],
  stats: [
    { label: "Interactive Islands", value: "8+" },
    { label: "Returning Characters", value: "24+" },
    { label: "Gentle Mini-Quests", value: "120+" },
    { label: "Community Rating Target", value: "100% Kid Safe" }
  ]
};

export const TIMELINE_DATA: Milestone[] = [
  {
    id: "m-2014",
    year: "2014",
    title: "The First Sketch & Childhood Dream",
    subtitle: "Where it all began at a sunlit kitchen drafting table",
    description: "Equipped with colored pencils, an old sketchbook, and a burning desire to create joyful safe spaces for children, the first conceptual drawings of Little Sheila and whimsical animal friends were drawn.",
    highlights: ["First 50 character illustrations drafted", "Self-published mini storybook zine", "Early community feedback from local schools"],
    image: ASSETS.characters.littleSheila,
    keyCharacter: "Little Sheila (Concept)",
    badgeColor: "bg-emerald-500",
    achievement: "First 10,000 storybook readers"
  },
  {
    id: "m-2016",
    year: "2016",
    title: "Little Sheila's Garden Launch",
    subtitle: "Stepping into digital interactive storytelling",
    description: "The debut interactive mobile experience launched worldwide. Children tapped flowers to make them bloom, guided ladybugs through leaf mazes, and learned the basics of botanical ecology through gentle play.",
    highlights: ["Featured on App Store 'New & Noteworthy'", "Over 250,000 global downloads in 6 months", "Awarded Parent & Child Digital Design Medal"],
    image: ASSETS.belinha.starHat,
    keyCharacter: "Little Sheila",
    badgeColor: "bg-teal-500",
    achievement: "Quarter Million Young Explorers"
  },
  {
    id: "m-2018",
    year: "2018",
    title: "Starry Night Lullaby & Music",
    subtitle: "Conquering bedtime anxiety through sound & starlight",
    description: "Recognizing bedtime struggles faced by parents, Cosmic Pip was introduced in an ambient interactive lullaby world that blended soothing orchestral chimes with touch-reactive celestial clouds.",
    highlights: ["Custom composed 8-track calming soundtrack", "Adopted by pediatric sleep clinics", "Over 500,000 peaceful bedtimes logged"],
    image: ASSETS.colorful.rainbowSweets,
    keyCharacter: "Cosmic Pip",
    badgeColor: "bg-purple-500",
    achievement: "500k Calming Sleep Sessions"
  },
  {
    id: "m-2020",
    year: "2020",
    title: "The Birth of 'Spread Love Doll'",
    subtitle: "A global symbol of comfort when children needed it most",
    description: "During a challenging year of isolation, the Spread Love Doll was crafted: both as an interactive comforting digital avatar and as a limited handmade plush doll that traveled to children across 32 countries.",
    highlights: ["'Pocket Hugs' game reached #1 in Family Category", "Thousands of handmade dolls sent to pediatric wards", "Over 1.2M virtual hugs sent between families"],
    image: ASSETS.creator.sandHeart,
    keyCharacter: "Spread Love Doll",
    badgeColor: "bg-rose-500",
    achievement: "Global Empathy Movement"
  },
  {
    id: "m-2022",
    year: "2022",
    title: "Belinha Bounds In & Bakery Fun",
    subtitle: "Welcoming the playful golden retriever into the family",
    description: "Belinha joined the universe, introducing humor, baking puzzles, and dog-friendly adventures! 'Belinha's Barking Bakery' became a runaway hit for toddlers and parents seeking joyful cooking fun.",
    highlights: ["Viral baking mini-game with 80M YouTube shorts views", "Physical character merchandise collaboration", "Expanded creative studio team to 8 artisans"],
    image: ASSETS.belinha.sunsetHeld,
    keyCharacter: "Belinha",
    badgeColor: "bg-amber-500",
    achievement: "2 Million Lifetime Downloads"
  },
  {
    id: "m-2024",
    year: "2024",
    title: "10-Year Celebration & LOVE WORLD Reveal",
    subtitle: "A decade of wonder culminating in our biggest dream",
    description: "Celebrating 10 golden years of independent children's creation! We announced LOVE WORLD, the flagship open-world kindness sandbox unifying every character, doll, and storybook ever created.",
    highlights: ["10-Year Anniversary Celebration Gala", "Debut of LOVE WORLD interactive teaser", "Launch of the unified Creative Universe hub"],
    image: ASSETS.belinha.sandcastle,
    keyCharacter: "Full Universe Cast",
    badgeColor: "bg-pink-600",
    achievement: "Decade of Pure Wonder"
  },
  {
    id: "m-2025",
    year: "2025+",
    title: "The Future: Living Love Universe",
    subtitle: "Next-gen tactile play, physical exhibitions, animated series",
    description: "Looking forward to physical museum pop-ups, animated broadcast specials, educational workshop toolkits for kindergartens, and the full multi-platform release of LOVE WORLD.",
    highlights: ["Animated series in pre-production", "Interactive museum tour across 5 cities", "Universal cross-play on tablets, consoles & web"],
    image: ASSETS.creator.sunset,
    keyCharacter: "Next Generation",
    badgeColor: "bg-blue-600",
    achievement: "The Journey Continues!"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "love-world",
    title: "LOVE WORLD",
    year: "2024 - 2025",
    tag: "Flagship Game",
    shortDesc: "The ultimate cozy sandbox where children team up with Spread Love Doll, Belinha, and friends to rebuild kindness islands.",
    fullDesc: "LOVE WORLD represents 10 years of character development, community feedback, and creative devotion. Built from the ground up for modern tablets and PCs, it invites kids into a watercolor sandbox where every action—from planting flower gardens to baking berry pastries—creates ripple effects of joy across a vibrant floating universe.",
    coverImage: ASSETS.belinha.jetski,
    screenshots: [
      ASSETS.belinha.beads,
      ASSETS.belinha.birthday,
      ASSETS.creator.portrait
    ],
    characters: ["Spread Love Doll", "Belinha", "Little Sheila", "Cosmic Pip", "Sunny Spark"],
    platforms: ["iOS", "Android", "Web", "Nintendo Switch"],
    color: "#FF5E7E",
    bgLight: "bg-pink-50/70",
    featured: true,
    status: "In Beta / Pre-Register",
    highlights: ["Multiplayer family co-op", "Zero microtransactions", "Tactile plush toy physics", "Dynamic orchestral score"]
  },
  {
    id: "spread-love-doll-pocket-hugs",
    title: "Spread Love Doll: Pocket Hugs",
    year: "2020",
    tag: "Comfort & Mindfulness",
    shortDesc: "A warm digital hug in your pocket. Children customize their doll, send heart messages, and practice calming breathing loops.",
    fullDesc: "Created during the height of the 2020 pandemic to combat isolation in little hearts. Children care for their Spread Love Doll, sew custom patchwork patches, record voice greetings for grandparents, and practice rhythmic breathing with flower petals.",
    coverImage: ASSETS.belinha.sunsetProfile,
    screenshots: [
      ASSETS.characters.littleSheila,
      ASSETS.belinha.starHat
    ],
    characters: ["Spread Love Doll"],
    platforms: ["iOS", "Android"],
    color: "#E056FD",
    bgLight: "bg-purple-50/70",
    highlights: ["Over 1.2M hugs shared", "Pediatric therapy approved", "Calm soothing mode", "Physical plush integration"]
  },
  {
    id: "belinhas-barking-bakery",
    title: "Belinha's Barking Bakery",
    year: "2022",
    tag: "Culinary Puzzle",
    shortDesc: "Knead dough, decorate puppy cupcakes, and run a cheerful neighborhood cafe with Belinha the golden dog.",
    fullDesc: "A vibrant cooking and physics puzzle game! Children mix batter using real motion gestures, match color-coded frosting sprinkles, and serve adorable animal patrons who visit the cozy bakery counter.",
    coverImage: ASSETS.colorful.rainbowSweets,
    screenshots: [
      ASSETS.creator.sandHeart,
      ASSETS.belinha.sunsetHeld
    ],
    characters: ["Belinha", "Barnaby Bear"],
    platforms: ["iOS", "Android", "Web"],
    color: "#FFB800",
    bgLight: "bg-amber-50/70",
    highlights: ["45 unique cookie recipes", "Interactive mixing bowls", "Humorous puppy reactions", "Parental time controls"]
  },
  {
    id: "little-sheilas-garden",
    title: "Little Sheila's Garden Adventure",
    year: "2016",
    tag: "Nature & Storybook",
    shortDesc: "The beloved classic where young explorers discover tiny miracles under garden clovers with magnifying lenses.",
    fullDesc: "The debut app that started it all! Hand-painted watercolor illustrations bring 6 garden ecosystems to life. Kids identify birds, water sprouting bulbs, and discover friendly ladybug colonies.",
    coverImage: ASSETS.belinha.sandcastle,
    screenshots: [
      ASSETS.creator.sunset,
      ASSETS.belinha.jetski
    ],
    characters: ["Little Sheila"],
    platforms: ["iOS", "Android"],
    color: "#2FD197",
    bgLight: "bg-emerald-50/70",
    highlights: ["Handmade watercolor art", "Real birdsong audio samples", "Bilingual voice narration", "Award-winning debut"]
  },
  {
    id: "starry-night-lullaby",
    title: "Starry Night Lullaby",
    year: "2018",
    tag: "Sleep & Ambient",
    shortDesc: "A peaceful nocturnal universe of floating stars, gentle chimes, and calming slumber journeys with Cosmic Pip.",
    fullDesc: "Designed in collaboration with child psychologists to ease transitions into deep sleep. Soft touches illuminate constellations that emit soothing harp and glockenspiel harmonies, naturally slowing breath rates.",
    coverImage: ASSETS.belinha.beads,
    screenshots: [
      ASSETS.belinha.birthday
    ],
    characters: ["Cosmic Pip"],
    platforms: ["iOS", "Android", "Web Audio"],
    color: "#845EC2",
    bgLight: "bg-indigo-50/70",
    highlights: ["Zero blue-light sleep mode", "Custom timer shutdown", "Orchestral sleep soundscapes", "Loved by 500k+ families"]
  },
  {
    id: "cloud-castle-builders",
    title: "Cloud Castle Builders",
    year: "2023",
    tag: "Creative Architecture",
    shortDesc: "Stack rainbow foam blocks and pastel turrets in the sky to build magnificent sanctuaries for friendly birds.",
    fullDesc: "An empowering 3D block-stacking environment with forgiving physics, inspiring spatial reasoning, geometric balance, and aesthetic freedom. Cloud weather dynamically changes from sunny dawn to rainbow showers.",
    coverImage: ASSETS.creator.portrait,
    screenshots: [
      ASSETS.belinha.sunsetProfile
    ],
    characters: ["Sunny Spark", "Spread Love Doll"],
    platforms: ["iOS", "Android", "Web"],
    color: "#38B6FF",
    bgLight: "bg-sky-50/70",
    highlights: ["No failure states", "Printable 3D papercraft blueprints", "Photo album snapshot mode", "Sensory-friendly audio"]
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    title: "Little Sheila",
    category: "characters",
    image: ASSETS.characters.littleSheila,
    caption: "Client artwork — Little Sheila.",
    year: "—",
    tags: ["Little Sheila", "Artwork"]
  },
  {
    id: "g2",
    title: "Belinha · Star Hat",
    category: "characters",
    image: ASSETS.belinha.starHat,
    caption: "The real Belinha — best friend and muse.",
    year: "—",
    tags: ["Belinha", "Real Life"]
  },
  {
    id: "g3",
    title: "Rainbow Sweets",
    category: "artwork",
    image: ASSETS.colorful.rainbowSweets,
    caption: "Rainbow sweets and playful color.",
    year: "—",
    tags: ["Rainbow", "Color"]
  },
  {
    id: "g4",
    title: "Heart in the Sand",
    category: "celebration",
    image: ASSETS.creator.sandHeart,
    caption: "Sheila and Belinha — a heart in the sand.",
    year: "—",
    tags: ["Creator", "Belinha", "Beach"]
  },
  {
    id: "g5",
    title: "Golden Hour Belinha",
    category: "characters",
    image: ASSETS.belinha.sunsetHeld,
    caption: "Belinha lifted toward the sunset.",
    year: "—",
    tags: ["Belinha", "Sunset"]
  },
  {
    id: "g6",
    title: "Sandcastle Companion",
    category: "celebration",
    image: ASSETS.belinha.sandcastle,
    caption: "Belinha with a beach sandcastle.",
    year: "—",
    tags: ["Belinha", "Beach"]
  },
  {
    id: "g7",
    title: "Creator & Belinha",
    category: "celebration",
    image: ASSETS.creator.sunset,
    caption: "Sheila Rocha with Belinha at sunset.",
    year: "—",
    tags: ["Creator", "Belinha"]
  },
  {
    id: "g8",
    title: "Beach Adventure",
    category: "celebration",
    image: ASSETS.belinha.jetski,
    caption: "A playful day at the beach with Belinha.",
    year: "—",
    tags: ["Belinha", "Beach"]
  },
  {
    id: "g9",
    title: "Sheila · Red Hat",
    category: "celebration",
    image: ASSETS.creator.portrait,
    caption: "Sheila Rocha — creator portrait.",
    year: "—",
    tags: ["Creator", "Portrait"]
  },
  {
    id: "g10",
    title: "Belinha · Sunset Profile",
    category: "characters",
    image: ASSETS.belinha.sunsetProfile,
    caption: "Belinha in golden light.",
    year: "—",
    tags: ["Belinha", "Portrait"]
  },
  {
    id: "g11",
    title: "Belinha · Beads & Sunflowers",
    category: "characters",
    image: ASSETS.belinha.beads,
    caption: "Belinha with beads and sunflowers.",
    year: "—",
    tags: ["Belinha", "Joy"]
  },
  {
    id: "g12",
    title: "Belinha · Birthday",
    category: "celebration",
    image: ASSETS.belinha.birthday,
    caption: "A birthday moment with Belinha.",
    year: "—",
    tags: ["Belinha", "Celebration"]
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "v-love-world",
    title: "LOVE WORLD: Official Cinematic Teaser Trailer",
    subtitle: "A first glimpse into the next decade of kindness & wonder",
    duration: "2:45",
    thumbnail: ASSETS.characters.littleSheila,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "LOVE WORLD",
    views: "185K views",
    description: "Step into the magical floating islands of LOVE WORLD! Meet Spread Love Doll, Belinha, Little Sheila, and all your favorite characters in this first official preview of our upcoming flagship adventure.",
    featured: true
  },
  {
    id: "v-10-year-reel",
    title: "10 Years of Creative Joy: Anniversary Documentary",
    subtitle: "From an old kitchen sketchbook to 2 million smiles",
    duration: "6:15",
    thumbnail: ASSETS.belinha.starHat,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "10-Year Celebration",
    views: "240K views",
    description: "An intimate and heartfelt look back at 10 years of creating games, dolls, and stories for young minds. Featuring early sketches, voice actor outtakes, and fan letters from families worldwide.",
    featured: true
  },
  {
    id: "v-spread-love-doc",
    title: "Behind the Stitches: The Story of Spread Love Doll",
    subtitle: "How a handmade doll became a beacon of childhood comfort",
    duration: "4:20",
    thumbnail: ASSETS.colorful.rainbowSweets,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    category: "Characters & Dolls",
    views: "310K views",
    description: "Discover how the Spread Love Doll was conceived in 2020 to bring warmth to isolated children, and how her signature heart pocket hugs touched pediatric wards across the world.",
    featured: false
  },
  {
    id: "v-belinha-short",
    title: "Belinha & Little Sheila: The Great Blueberry Muffin Chase",
    subtitle: "Animated Short Episode 1",
    duration: "3:10",
    thumbnail: ASSETS.creator.sandHeart,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Animated Shorts",
    views: "520K views",
    description: "When Barnaby Bear's freshly baked blueberry muffin rolls into the magical maze, Belinha and Little Sheila embark on a hilarious, crumb-filled race to retrieve it before sunset!",
    featured: false
  }
];

export { BLOG_POSTS_DATA } from './blogPosts';

export const CELEBRATION_WISHES_DATA: CelebrationWish[] = [
  {
    id: "w1",
    author: "Elena & Mia (Age 6)",
    location: "Barcelona, Spain",
    text: "The Spread Love Doll has slept on Mia's pillow every night since 2020! Happy 10th Birthday to the kindest games on Earth. We love you!",
    date: "September 2024",
    hearts: 142,
    avatarEmoji: "🌸",
    tag: "Parent & Child"
  },
  {
    id: "w2",
    author: "Marcus K., Kindergarten Educator",
    location: "Toronto, Canada",
    text: "Little Sheila's garden app has been in our sensory classroom for 5 years. Thank you for building games with pure hearts and zero ads!",
    date: "September 2024",
    hearts: 98,
    avatarEmoji: "🌱",
    tag: "Teacher"
  },
  {
    id: "w3",
    author: "Sophie (Age 8) & Dog Peanut",
    location: "London, UK",
    text: "Belinha is my absolute favorite doggie in the world! Me and Peanut play the bakery game every Saturday morning. Can't wait for LOVE WORLD!",
    date: "September 2024",
    hearts: 184,
    avatarEmoji: "🐾",
    tag: "Young Fan"
  },
  {
    id: "w4",
    author: "Dr. Alistair Chen, Child Health Advocate",
    location: "Melbourne, Australia",
    text: "Starry Night Lullaby is something I recommend to parents dealing with bedtime anxiety. A triumph of thoughtful, gentle design.",
    date: "August 2024",
    hearts: 215,
    avatarEmoji: "✨",
    tag: "Pediatric Specialist"
  }
];

export const SOCIAL_CHANNELS_DATA: SocialChannel[] = [
  {
    name: "YouTube Channel",
    handle: "@LoveWorldUniverse",
    description: "Official home of animated shorts, character singalongs, lullaby soundscapes, and behind-the-scenes creation diaries.",
    followers: "420K+ Subscribers",
    color: "bg-red-500",
    textColor: "text-red-500",
    hoverBorder: "hover:border-red-400",
    link: "https://youtube.com",
    actionLabel: "Subscribe on YouTube",
    recentPost: {
      title: "LOVE WORLD: 10-Minute Cozy Island Lullaby (4K Ambient)",
      date: "3 days ago",
      mediaSnippet: "▶ 54,000 views • 3.2K likes"
    }
  },
  {
    name: "Instagram",
    handle: "@loveworld.creator",
    description: "Daily sketchbook doodles, real photos of Spread Love Doll travels, studio pet updates with Belinha, and work-in-progress sneak peeks.",
    followers: "185K+ Followers",
    color: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600",
    textColor: "text-pink-600",
    hoverBorder: "hover:border-pink-400",
    link: "https://instagram.com",
    actionLabel: "Follow on Instagram",
    recentPost: {
      title: "New watercolor spread of Spread Love Doll sewing patchwork blankets for winter 🧸",
      date: "Yesterday",
      mediaSnippet: "♥ 8,420 likes • 214 comments"
    }
  },
  {
    name: "Facebook Community",
    handle: "Love World Family & Parents Hub",
    description: "Safe, moderated parent forum sharing creative kids activities, free printable coloring sheets, and feedback on upcoming projects.",
    followers: "95K+ Members",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    hoverBorder: "hover:border-blue-400",
    link: "https://facebook.com",
    actionLabel: "Join Parents Community",
    recentPost: {
      title: "Download the free 10-Year Celebration Coloring Book PDF for your weekend family craft!",
      date: "5 days ago",
      mediaSnippet: "💬 480 shares • 1.2K reactions"
    }
  }
];

export const OLD_WEBSITE_ARCHIVE = {
  title: "Classic Creator Archive (2014 – 2021)",
  subtitle: "Explore the vintage original website that started it all!",
  description: "Want to see our original early 2014-2020 web archives? Jump right into the nostalgic retro showcase featuring the original Flash/HTML5 mini-games, vintage fan art galleries, and the first ever Little Sheila downloads.",
  archiveYear: "2014 - 2021",
  cta: "Visit Classic Archive Website",
  url: OLD_SITE.home
};
