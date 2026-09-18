import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TimelineSection } from './components/TimelineSection';
import { LoveWorldFeature } from './components/LoveWorldFeature';
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
  // Initialize Lenis buttery smooth scroll synchronized with GSAP ScrollTrigger
  useLenisSmoothScroll();

  // Modal states
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [showWishModal, setShowWishModal] = useState<boolean>(false);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);

  // Confetti trigger
  const [confettiCount, setConfettiCount] = useState<number>(0);

  // Celebration wishes state
  const [wishes, setWishes] = useState<CelebrationWish[]>(CELEBRATION_WISHES_DATA);

  const handleTriggerConfetti = () => {
    setConfettiCount((prev) => prev + 1);
  };

  const handleOpenAnniversaryVideo = () => {
    // Open the 10-year anniversary reel by default
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
      {/* Celebration Confetti Particle Engine */}
      <ConfettiCanvas trigger={confettiCount} />

      {/* Interactive GSAP Spread Love Magic Wand & Sparkler */}
      <SpreadLoveMagic onSpreadLove={handleTriggerConfetti} />

      {/* Floating Responsive Navigation */}
      <Navbar
        onOpenArchive={() => setShowArchiveModal(true)}
        onOpenBlogModal={() => setActiveBlogPost(BLOG_POSTS_DATA[0])}
        onOpenVideoHero={handleOpenAnniversaryVideo}
      />

      <main>
        {/* 1. HERO / HOME */}
        <Hero
          onOpenVideo={handleOpenAnniversaryVideo}
          onSelectCharacter={(char) => setActiveCharacter(char)}
        />

        {/* 2. 10-YEAR JOURNEY INTERACTIVE TIMELINE */}
        <TimelineSection />

        {/* 3. LOVE WORLD FLAGSHIP FEATURE */}
        <LoveWorldFeature
          onOpenVideo={handleOpenLoveWorldVideo}
          onSelectCharacter={(char) => setActiveCharacter(char)}
        />

        {/* 4. MY WORK / PROJECTS GALLERY */}
        <ProjectsSection
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* 5. CHARACTERS & DOLLS (Spread Love Doll + Belinha Special Focus) */}
        <CharactersSection
          onSelectCharacter={(char) => setActiveCharacter(char)}
        />

        {/* 6. MULTIMEDIA GALLERY WITH LIGHTBOX */}
        <GallerySection
          onSelectImage={(item) => setActiveLightbox(item)}
        />

        {/* 7. VIDEOS THEATER SECTION */}
        <VideosSection
          onPlayVideo={(video) => setActiveVideo(video)}
        />

        {/* 8. 10-YEAR CELEBRATION CENTERPIECE */}
        <CelebrationSection
          wishes={wishes}
          onOpenWishModal={() => setShowWishModal(true)}
          onTriggerConfetti={handleTriggerConfetti}
          onLikeWish={handleLikeWish}
        />

        {/* 9. BLOG ENTRY POINT & RECENT POSTS */}
        <BlogSection
          onSelectPost={(post) => setActiveBlogPost(post)}
        />

        {/* 10. SOCIAL MEDIA & COMMUNITY CONTENT FLOW */}
        <SocialSection
          onOpenArchive={() => setShowArchiveModal(true)}
        />
      </main>

      {/* 11. PREMIUM COLORFUL FOOTER */}
      <Footer onOpenArchive={() => setShowArchiveModal(true)} />

      {/* CENTRALIZED MODALS CONTROLLER */}
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
