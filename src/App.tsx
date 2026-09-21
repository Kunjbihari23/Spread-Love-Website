import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { CreatorSection } from './components/CreatorSection';
import { ColorfulWorldSection } from './components/ColorfulWorldSection';
import { OdysseySection } from './components/odyssey/OdysseySection';
import { LoveWorldFeature } from './components/LoveWorldFeature';
import { BelinhaSection } from './components/BelinhaSection';
import { CharactersSection } from './components/CharactersSection';
import { GallerySection } from './components/GallerySection';
import { VideosSection } from './components/VideosSection';
import { BlogSection } from './components/BlogSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { SpreadLoveMagic } from './components/SpreadLoveMagic';
import { RainbowProgress } from './components/ui/RainbowProgress';
import { RainbowMarquee } from './components/ui/RainbowMarquee';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { VIDEOS_DATA, BLOG_POSTS_DATA } from './data/mockData';
import { Character, GalleryItem, VideoItem, BlogPost } from './types';

export default function App() {
  useLenisSmoothScroll();

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [confettiCount, setConfettiCount] = useState<number>(0);

  const handleTriggerConfetti = () => setConfettiCount((prev) => prev + 1);

  const openVideoById = (id: string) => {
    setActiveVideo(VIDEOS_DATA.find((v) => v.id === id) || VIDEOS_DATA[0]);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[var(--text-primary)] selection:bg-[var(--rb-yellow)] selection:text-[oklch(25%_0.08_60)]">
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      <RainbowProgress />
      <ConfettiCanvas trigger={confettiCount} />
      <SpreadLoveMagic onSpreadLove={handleTriggerConfetti} />

      <Navbar
        onOpenArchive={() => setShowArchiveModal(true)}
        onOpenBlogModal={() => setActiveBlogPost(BLOG_POSTS_DATA[0])}
      />

      <main id="main">
        {/* 01 — Cinematic LOVE WORLD film */}
        <Hero onOpenVideo={() => openVideoById('v-love-world')} />

        {/* 02 — 10 years */}
        <IntroSection />

        {/* 03 — The creator + her characters */}
        <CreatorSection />

        <RainbowMarquee
          items={['Spread Love', '10 Years', 'Belinha', 'Little Sheila', 'Color', 'Kindness']}
        />

        {/* 04 — Her colors */}
        <ColorfulWorldSection />

        {/* 05 — LOVE WORLD flagship */}
        <LoveWorldFeature onOpenVideo={() => openVideoById('v-love-world')} />

        {/* 06 — The storybook (preserved Odyssey experience) */}
        <OdysseySection />

        {/* 07 — Belinha: real → character */}
        <BelinhaSection />

        {/* 08 — The character universe */}
        <CharactersSection onSelectCharacter={(char) => setActiveCharacter(char)} />

        {/* 09 — Gallery */}
        <GallerySection onSelectImage={(item) => setActiveLightbox(item)} />

        {/* 10 — Videos */}
        <VideosSection onPlayVideo={(video) => setActiveVideo(video)} />

        {/* 11 — Blog */}
        <BlogSection onSelectPost={(post) => setActiveBlogPost(post)} />

        {/* 12 — Social */}
        <SocialSection onOpenArchive={() => setShowArchiveModal(true)} />
      </main>

      <Footer onOpenArchive={() => setShowArchiveModal(true)} />

      <Modals
        activeVideo={activeVideo}
        onCloseVideo={() => setActiveVideo(null)}
        activeLightbox={activeLightbox}
        onCloseLightbox={() => setActiveLightbox(null)}
        activeCharacter={activeCharacter}
        onCloseCharacter={() => setActiveCharacter(null)}
        activeBlogPost={activeBlogPost}
        onCloseBlogPost={() => setActiveBlogPost(null)}
        showArchiveModal={showArchiveModal}
        onCloseArchiveModal={() => setShowArchiveModal(false)}
      />
    </div>
  );
}
