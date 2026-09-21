import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { CreatorSection } from './components/CreatorSection';
import { ColorfulWorldSection } from './components/ColorfulWorldSection';
import { OdysseySection } from './components/odyssey/OdysseySection';
import { LoveWorldFeature } from './components/LoveWorldFeature';
import { BelinhaSection } from './components/BelinhaSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CharactersSection } from './components/CharactersSection';
import { GallerySection } from './components/GallerySection';
import { VideosSection } from './components/VideosSection';
import { CelebrationSection } from './components/CelebrationSection';
import { BlogSection } from './components/BlogSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { SpreadLoveMagic } from './components/SpreadLoveMagic';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { VIDEOS_DATA, BLOG_POSTS_DATA, CELEBRATION_WISHES_DATA } from './data/mockData';
import { Project, Character, GalleryItem, VideoItem, BlogPost, CelebrationWish } from './types';

export default function App() {
  useLenisSmoothScroll();

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [showWishModal, setShowWishModal] = useState<boolean>(false);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [confettiCount, setConfettiCount] = useState<number>(0);
  const [wishes, setWishes] = useState<CelebrationWish[]>(CELEBRATION_WISHES_DATA);

  const handleTriggerConfetti = () => {
    setConfettiCount((prev) => prev + 1);
  };

  const handleOpenAnniversaryVideo = () => {
    const anniversaryVideo = VIDEOS_DATA.find((v) => v.id === 'v-10-year-reel') || VIDEOS_DATA[0];
    setActiveVideo(anniversaryVideo);
  };

  const handleOpenLoveWorldVideo = () => {
    const loveWorldVideo = VIDEOS_DATA.find((v) => v.id === 'v-love-world') || VIDEOS_DATA[0];
    setActiveVideo(loveWorldVideo);
  };

  const handleAddWish = (newWish: CelebrationWish) => {
    setWishes((prev) => [newWish, ...prev]);
    handleTriggerConfetti();
  };

  const handleLikeWish = (wishId: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, hearts: w.hearts + 1 } : w))
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-pink-200 selection:text-pink-900 font-sans">
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      <ConfettiCanvas trigger={confettiCount} />
      <SpreadLoveMagic onSpreadLove={handleTriggerConfetti} />

      <Navbar
        onOpenArchive={() => setShowArchiveModal(true)}
        onOpenBlogModal={() => setActiveBlogPost(BLOG_POSTS_DATA[0])}
        onOpenVideoHero={handleOpenAnniversaryVideo}
      />

      <main id="main">
        {/* 01 — Cinematic LOVE WORLD video */}
        <Hero onOpenVideo={handleOpenLoveWorldVideo} />

        {/* 02 — Colorful introduction */}
        <IntroSection />

        {/* 03 — Creator + characters */}
        <CreatorSection />

        {/* 04 — Her colorful world */}
        <ColorfulWorldSection />

        {/* 05 — LOVE WORLD feature */}
        <LoveWorldFeature
          onOpenVideo={handleOpenLoveWorldVideo}
          onSelectCharacter={(char) => setActiveCharacter(char)}
        />

        {/* 06 — 10-year storybook (preserved Odyssey) */}
        <OdysseySection />

        {/* 07 — Belinha: real → creative */}
        <BelinhaSection />

        {/* 08 — All characters */}
        <CharactersSection
          onSelectCharacter={(char) => setActiveCharacter(char)}
        />

        {/* 09 — Projects */}
        <ProjectsSection
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* 10 — Visual gallery */}
        <GallerySection
          onSelectImage={(item) => setActiveLightbox(item)}
        />

        {/* 11 — Videos */}
        <VideosSection
          onPlayVideo={(video) => setActiveVideo(video)}
        />

        {/* 12 — Celebration */}
        <CelebrationSection
          wishes={wishes}
          onOpenWishModal={() => setShowWishModal(true)}
          onTriggerConfetti={handleTriggerConfetti}
          onLikeWish={handleLikeWish}
        />

        {/* 13 — Blog */}
        <BlogSection
          onSelectPost={(post) => setActiveBlogPost(post)}
        />

        {/* 14 — Social */}
        <SocialSection
          onOpenArchive={() => setShowArchiveModal(true)}
        />
      </main>

      <Footer onOpenArchive={() => setShowArchiveModal(true)} />

      <Modals
        activeVideo={activeVideo}
        onCloseVideo={() => setActiveVideo(null)}
        activeLightbox={activeLightbox}
        onCloseLightbox={() => setActiveLightbox(null)}
        activeCharacter={activeCharacter}
        onCloseCharacter={() => setActiveCharacter(null)}
        activeProject={activeProject}
        onCloseProject={() => setActiveProject(null)}
        activeBlogPost={activeBlogPost}
        onCloseBlogPost={() => setActiveBlogPost(null)}
        showWishModal={showWishModal}
        onCloseWishModal={() => setShowWishModal(false)}
        onSubmitWish={handleAddWish}
        showArchiveModal={showArchiveModal}
        onCloseArchiveModal={() => setShowArchiveModal(false)}
      />
    </div>
  );
}
