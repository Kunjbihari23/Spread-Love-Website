import { Project, Character, Milestone, GalleryItem, VideoItem, BlogPost, CelebrationWish, SocialChannel } from '../types';

export const HERO_DATA = {
  anniversaryBadge: "🎉 10 Years of Creative Magic (2014 – 2024)",
  headlinePrefix: "10 Years of",
  headlineEmphasis: "Creativity, Love,",
  headlineSuffix: "Characters & Imagination.",
  subtext: "Welcome to our joyful universe! For a decade, we've crafted heartwarming games, lovable dolls, and imaginative digital worlds that ignite wonder in children and families across the globe.",
  primaryCta: "Discover LOVE WORLD",
  secondaryCta: "Explore My 10-Year Journey",
  videoBadge: "Watch 10-Yr Anniversary Reel",
};

export const CHARACTERS_DATA: Character[] = [
  {
    id: "spread-love-doll",
    name: "Spread Love Doll",
    subtitle: "The Beacon of Warmth & Hugs",
    role: "Empathy Ambassador & Comfort Guide",
    bio: "Created to bring gentle reassurance and unconditional kindness to children worldwide. Known for her iconic heart badge, soft pastel stitches, and magical pocket hugs that remind every child they are deeply cherished.",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=200&q=80",
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
    subtitle: "The Joyful Golden Companion",
    role: "Adventure Scout & Happiness Champion",
    bio: "Inspired by a real four-legged muse! Belinha bounds into every story with wagging enthusiasm, a nose for hidden treats, and an unbreakable loyalty that turns every mundane day into an unforgettable festival of smiles.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80",
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
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=200&q=80",
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
    subtitle: "The Starlight Stardust Sprite",
    role: "Night-Sky Guide & Dream Weaver",
    bio: "A miniature celestial creature who fell from a falling star into the Love World kingdom. Pip glows in soft pastel lavender to guide youngsters through bedtime anxieties and turn night into calm wonder.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80",
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
    subtitle: "The Sunflower Melody Spirit",
    role: "Musical Virtuoso & Rhythm Fairy",
    bio: "Dancing on piano keys and bouncing on drum skins, Sunny Spark turns laughter into musical notes. She teaches children how rhythm and harmony connect hearts across languages.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=80",
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
    subtitle: "The Gentle Honey Baker",
    role: "Kitchen Tinkerer & Storyteller",
    bio: "The big-hearted guardian who loves kneading cloud-bread and telling fireside fables. He ensures every visitor to Love World feels welcomed, safe, and served with a warm bowl of sweet honey-porridge.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=200&q=80",
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
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
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
    coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
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
    coverImage: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
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
    coverImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
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
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
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
    coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
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
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
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
    title: "Spread Love Doll: Original Plush Prototype",
    category: "characters",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
    caption: "The very first physical Spread Love Doll hand-stitched with love in the studio workshop, featuring the iconic pink button heart.",
    year: "2020",
    tags: ["Spread Love Doll", "Handmade", "Plush Prototype"]
  },
  {
    id: "g2",
    title: "Belinha's Morning Sketch Study",
    category: "characters",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    caption: "Early character posture studies for Belinha the dog capturing her iconic tail wag and inquisitive bakery head tilt.",
    year: "2022",
    tags: ["Belinha", "Sketches", "Character Art"]
  },
  {
    id: "g3",
    title: "LOVE WORLD: Heartwood Island Key Visual",
    category: "projects",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    caption: "The majestic watercolor concept art of Heartwood Island, the heart-shaped central sanctuary of LOVE WORLD.",
    year: "2024",
    tags: ["LOVE WORLD", "Concept Art", "Worldbuilding"]
  },
  {
    id: "g4",
    title: "10-Year Studio Celebration Cake & Workshop",
    category: "celebration",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    caption: "Blowing out the candles on 10 magical years of storytelling surrounded by storyboards, prototypes, and team sketches.",
    year: "2024",
    tags: ["10-Year Celebration", "Studio Milestones", "Thank You"]
  },
  {
    id: "g5",
    title: "Little Sheila in the Botanical Meadow",
    category: "artwork",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    caption: "Watercolor cover illustration for the 5th Anniversary Collector's Edition of Little Sheila's Garden Adventure.",
    year: "2021",
    tags: ["Little Sheila", "Watercolor", "Collector's Edition"]
  },
  {
    id: "g6",
    title: "Cosmic Pip Bedtime Constellation Map",
    category: "artwork",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    caption: "Digital starlight art depicting the magical starry bridges traversed by Cosmic Pip during sleep therapy sessions.",
    year: "2018",
    tags: ["Cosmic Pip", "Starlight", "Lullaby"]
  },
  {
    id: "g7",
    title: "Behind The Scenes: Character Modeling",
    category: "projects",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    caption: "Clay sculpting prototypes used to verify friendly proportions and safe tactile silhouettes before 3D digital rigging.",
    year: "2023",
    tags: ["Behind the Scenes", "Sculpting", "LOVE WORLD"]
  },
  {
    id: "g8",
    title: "Children's Kindness Workshop Exhibition",
    category: "celebration",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    caption: "Young creators showing off their custom Spread Love Doll patches during our anniversary community charity tour.",
    year: "2024",
    tags: ["Community", "Kids Workshop", "Hugs"]
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "v-love-world",
    title: "LOVE WORLD: Official Cinematic Teaser Trailer",
    subtitle: "A first glimpse into the next decade of kindness & wonder",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Animated Shorts",
    views: "520K views",
    description: "When Barnaby Bear's freshly baked blueberry muffin rolls into the magical maze, Belinha and Little Sheila embark on a hilarious, crumb-filled race to retrieve it before sunset!",
    featured: false
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "post-10-years-reflection",
    title: "10 Years of Drawing Dreams: What Children Taught Me About Love",
    excerpt: "A decade ago, I sat down with a pack of pastels and a wild hope to create kind entertainment. Here is what 10 years of letters, hugs, and playtime taught me.",
    content: [
      "Ten years ago, the landscape of digital apps for children was rapidly shifting toward hyper-stimulating loops and flashing sirens. I remember sitting at my wooden desk, looking at my sketchbook, and asking myself: Can a game feel like a warm cup of cocoa on a rainy afternoon?",
      "Little Sheila was my first answer. She didn't have weapons or countdown clocks; she just had a magnifying glass and a genuine affection for dandelions. When the first emails from parents began trickling in—sharing how their children were exploring their real gardens outside—I realized that digital media could inspire offline wonder.",
      "In 2020, as the world paused, the Spread Love Doll was born. More than any character I've ever drawn, she taught me that empathy is a muscle that can be nurtured early. Seeing photos of little children holding their handmade dolls in hospital waiting rooms remains the single proudest milestone of my life.",
      "Now, with LOVE WORLD on the horizon, we take everything we've learned over this decade and open the doors wider than ever. Thank you for walking this path with me. Here's to the next 10 years of kindness!"
    ],
    date: "September 15, 2024",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    author: "Creator & Lead Designer",
    tags: ["10-Year Anniversary", "Reflections", "Kindness", "Game Design"],
    category: "Milestones"
  },
  {
    id: "post-love-world-reveal",
    title: "Building LOVE WORLD: Why We Chose Tactile Toy Physics & No Combat",
    excerpt: "Behind the curtain of our flagship game: how we designed floating islands that feel like hand-stitched felt, watercolor paper, and wooden playsets.",
    content: [
      "When we began conceptualizing LOVE WORLD two years ago, our mandate was uncompromising: every single surface must feel tangible and joyful. If a child touches a tree, we want the leaves to softly rustle like construction paper.",
      "We spent six months testing toy physics. Our Spread Love Doll character moves with the gentle weight of a velvet plush doll. Belinha's golden fur has the playful bounce of handcrafted felt. This tactile familiarity creates a deep sense of security.",
      "Most importantly, LOVE WORLD has zero combat. The conflicts in our islands are gentle misunderstandings—a cloud that lost its rainbow song, a baker who ran out of cinnamon, or a frightened star that forgot how to twinkle. Players solve these through shared effort, kindness, and cheerful exploration.",
      "Early playtest sessions with 5-to-10-year-olds have shown something remarkable: kids don't miss fighting. When given the choice, they would rather build cozy treehouses together and organize tea parties for Belinha!"
    ],
    date: "August 28, 2024",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    author: "Creator & Lead Designer",
    tags: ["LOVE WORLD", "Game Design", "Child Psychology", "Art Direction"],
    category: "Behind The Scenes"
  },
  {
    id: "post-belinha-inspiration",
    title: "Meet the Real-Life Muse Behind Belinha the Dog",
    excerpt: "The true story of how an adopted golden pup stole my studio chair, learned to steal paintbrushes, and became our most hilarious character.",
    content: [
      "Every artist needs an assistant who doesn't understand deadlines. For me, that has been Belinha. Adopted in 2021, she immediately established herself as the creative director of our studio.",
      "Whenever I had artist's block while drafting bakery pastry recipes for our games, Belinha would rest her chin squarely on my tablet screen, softly sniffing the stylus. That exact gesture made it directly into the game's idle animation!",
      "Her boundless optimism and goofy joy remind me daily why we do this work. Children possess that exact same unreserved eagerness to love. Belinha's Barking Bakery is my love letter to her and all loyal animal companions who brighten our homes."
    ],
    date: "July 12, 2024",
    readTime: "3 min read",
    coverImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    author: "Creator & Lead Designer",
    tags: ["Belinha", "Inspiration", "Studio Pets", "Characters"],
    category: "Characters"
  }
];

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
  url: "https://archive.example.com"
};
