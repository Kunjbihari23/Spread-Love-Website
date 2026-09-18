import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles, BookOpen, ExternalLink, ArrowRight, Compass, Layers, Users, Image, Film, PartyPopper, Share2, Youtube, Instagram, Facebook } from 'lucide-react';

interface NavbarProps {
  onOpenArchive: () => void;
  onOpenBlogModal?: () => void;
  onOpenVideoHero?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArchive, onOpenBlogModal, onOpenVideoHero }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Primary desktop nav items
  const navItems = [
    { id: 'hero', name: 'Home', href: '#hero', icon: Heart },
    { id: 'timeline', name: '10 Years', href: '#timeline', icon: Compass },
    { id: 'love-world', name: 'LOVE WORLD', href: '#love-world', icon: Sparkles, highlight: true },
    { id: 'projects', name: 'My Work', href: '#projects', icon: Layers },
    { id: 'characters', name: 'Characters', href: '#characters', icon: Users },
    { id: 'gallery', name: 'Gallery', href: '#gallery', icon: Image },
    { id: 'videos', name: 'Videos', href: '#videos', icon: Film },
    { id: 'celebration', name: 'Celebration', href: '#celebration', icon: PartyPopper },
  ];

  // Secondary/Community items for mobile drawer
  const moreNavItems = [
    { id: 'blog', name: 'Creator Blog', href: '#blog', icon: BookOpen },
    { id: 'social', name: 'Community Hub', href: '#social', icon: Share2 },
  ];

  // Scroll detection & Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      // Simple active section detection
      const sections = ['hero', 'timeline', 'love-world', 'projects', 'characters', 'gallery', 'videos', 'celebration', 'blog', 'social'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-white/95 backdrop-blur-md shadow-sm border-b border-pink-100/80'
          : 'py-3.5 bg-white/80 backdrop-blur-md border-b border-pink-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* 1. Left Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-2xl"
            aria-label="LOVE WORLD Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all">
              <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-display group-hover:text-pink-600 transition-colors">
                  LOVE WORLD
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  10 YRS
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 hidden sm:block leading-none">
                Children's Creative Studio
              </p>
            </div>
          </a>

          {/* 2. Desktop Navigation Center Bar (Visible on lg and above) */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80 shadow-xs"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-pink-600 shadow-xs border border-pink-200/60'
                      : item.highlight
                      ? 'text-pink-600 hover:text-pink-700 hover:bg-white/60 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {item.highlight && <Sparkles className="w-3 h-3 text-pink-500" />}
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* 3. Action Hub: Blog, Old Site & CTA Button */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Direct Blog Link Button */}
            <a
              href="#blog"
              onClick={(e) => handleLinkClick(e, '#blog')}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/80 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Blog</span>
            </a>

            {/* Old Website Archive Modal Trigger */}
            <button
              id="nav-old-archive-btn"
              onClick={onOpenArchive}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50/90 hover:bg-amber-100 border border-amber-200/80 transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Jump to Vintage 2014-2021 Website Archive"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
              <span>Old Site</span>
            </button>

            {/* Flagship CTA Button */}
            <a
              href="#love-world"
              onClick={(e) => handleLinkClick(e, '#love-world')}
              className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 transform hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore LOVE WORLD</span>
            </a>
          </div>

          {/* 4. Mobile Controls (Under lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Explore pill for mobile */}
            <a
              href="#love-world"
              onClick={(e) => handleLinkClick(e, '#love-world')}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 shadow-xs flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>LOVE WORLD</span>
            </a>

            {/* Hamburger / Close Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-pink-600 hover:bg-pink-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Drawer Overlay & Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-50 lg:hidden flex flex-col bg-white/95 backdrop-blur-xl border-t border-pink-100 shadow-2xl animate-in slide-in-from-top-2 duration-200 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-5 max-w-md mx-auto w-full">
            {/* Section 1: Main Pages */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Explore Universe
              </p>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all min-h-[44px] ${
                        isActive
                          ? 'bg-pink-50 text-pink-700 border border-pink-200 shadow-2xs'
                          : item.highlight
                          ? 'bg-gradient-to-r from-pink-50 to-amber-50 text-pink-700 border border-pink-100'
                          : 'bg-slate-50 text-slate-700 hover:bg-pink-50 hover:text-pink-600 border border-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-pink-500 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Dedicated Action Switchers (Blog & Old Website) */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Connected Hubs
              </p>
              <a
                href="#blog"
                onClick={(e) => handleLinkClick(e, '#blog')}
                className="w-full py-3 px-4 rounded-2xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-between min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Visit Creator's Diary & Blog
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenArchive();
                }}
                className="w-full py-3 px-4 rounded-2xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-between min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-amber-600" />
                  Classic Archive Website (2014 – 2021)
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Section 3: Social Channels Quick Row */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Social Channels
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
