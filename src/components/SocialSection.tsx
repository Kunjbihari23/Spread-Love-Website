import React, { useRef } from 'react';
import { Youtube, Instagram, Facebook, ArrowUpRight, Share2, BookOpen, ExternalLink } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { SOCIAL_CHANNELS_DATA, OLD_WEBSITE_ARCHIVE } from '../data/mockData';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface SocialSectionProps {
  onOpenArchive: () => void;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ onOpenArchive }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP scroll reveals with reverse support on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-soc="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-soc="chip"]', { scale: 0.85 }, {
          trigger: '[data-soc="flow"]',
          stagger: 0.06,
          duration: 0.35,
          ease: 'back.out(1.5)',
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-soc="channel"]', { y: 24 }, {
          trigger: '[data-soc="channels"]',
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-soc="archive"]', { y: 20 }, {
          trigger: '[data-soc="archive"]',
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="social" className="py-16 sm:py-24 bg-slate-50/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-soc="header">
          <SectionHeader
            badge="Community & Content Flow"
            badgeIcon={<Share2 className="w-3.5 h-3.5" />}
            title="Join Our Global Creative Family"
            subtitle="Follow our daily creation updates, singalong animations on YouTube, doll travel photo albums on Instagram, and parenting discussion circles on Facebook."
          />
        </div>

        {/* Content Flow Ecosystem Diagram */}
        <div data-soc="flow" className="mb-12 sm:mb-14 p-5 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 sm:mb-6">
            Ecosystem Content Flow: Move Seamlessly Between Channels
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold">
            <span data-soc="chip" className="px-3.5 sm:px-4 py-2 rounded-xl bg-pink-600 text-white shadow-xs">
              ★ Official Website Hub
            </span>
            <span className="text-slate-300 font-bold hidden sm:inline">➔</span>
            <a
              data-soc="chip"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1.5"
            >
              <Youtube className="w-4 h-4" /> YouTube
            </a>
            <span className="text-slate-300 font-bold hidden sm:inline">➔</span>
            <a
              data-soc="chip"
              href="#blog"
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Creator's Blog
            </a>
            <span className="text-slate-300 font-bold hidden sm:inline">➔</span>
            <a
              data-soc="chip"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <span className="text-slate-300 font-bold hidden sm:inline">➔</span>
            <a
              data-soc="chip"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <span className="text-slate-300 font-bold hidden sm:inline">➔</span>
            <button
              data-soc="chip"
              onClick={onOpenArchive}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> Old Website (2014)
            </button>
          </div>
        </div>

        {/* 3 Main Social Cards */}
        <div data-soc="channels" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* YouTube Card */}
          <Card
            data-soc="channel"
            elevation="interactive"
            className="p-5 sm:p-8 bg-white border-slate-200/90 flex flex-col justify-between space-y-5 sm:space-y-6"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                  {SOCIAL_CHANNELS_DATA[0].followers}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {SOCIAL_CHANNELS_DATA[0].name}
              </h3>
              <p className="text-xs font-bold text-slate-400 mb-2">
                {SOCIAL_CHANNELS_DATA[0].handle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {SOCIAL_CHANNELS_DATA[0].description}
              </p>

              <div className="p-3 sm:p-3.5 mt-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Latest Episode Video
                </p>
                <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                  {SOCIAL_CHANNELS_DATA[0].recentPost.title}
                </p>
                <p className="text-[10px] text-red-500 font-medium mt-1">
                  {SOCIAL_CHANNELS_DATA[0].recentPost.mediaSnippet}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              href={SOCIAL_CHANNELS_DATA[0].link}
              external
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {SOCIAL_CHANNELS_DATA[0].actionLabel}
            </Button>
          </Card>

          {/* Instagram Card */}
          <Card
            data-soc="channel"
            elevation="interactive"
            className="p-5 sm:p-8 bg-white border-slate-200/90 flex flex-col justify-between space-y-5 sm:space-y-6"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                  {SOCIAL_CHANNELS_DATA[1].followers}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {SOCIAL_CHANNELS_DATA[1].name}
              </h3>
              <p className="text-xs font-bold text-slate-400 mb-2">
                {SOCIAL_CHANNELS_DATA[1].handle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {SOCIAL_CHANNELS_DATA[1].description}
              </p>

              <div className="p-3 sm:p-3.5 mt-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Daily Studio Story
                </p>
                <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                  {SOCIAL_CHANNELS_DATA[1].recentPost.title}
                </p>
                <p className="text-[10px] text-pink-600 font-medium mt-1">
                  {SOCIAL_CHANNELS_DATA[1].recentPost.mediaSnippet}
                </p>
              </div>
            </div>

            <Button
              variant="magic"
              size="md"
              href={SOCIAL_CHANNELS_DATA[1].link}
              external
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 hover:opacity-95"
            >
              {SOCIAL_CHANNELS_DATA[1].actionLabel}
            </Button>
          </Card>

          {/* Facebook Card */}
          <Card
            data-soc="channel"
            elevation="interactive"
            className="p-5 sm:p-8 bg-white border-slate-200/90 flex flex-col justify-between space-y-5 sm:space-y-6"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {SOCIAL_CHANNELS_DATA[2].followers}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {SOCIAL_CHANNELS_DATA[2].name}
              </h3>
              <p className="text-xs font-bold text-slate-400 mb-2">
                {SOCIAL_CHANNELS_DATA[2].handle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {SOCIAL_CHANNELS_DATA[2].description}
              </p>

              <div className="p-3 sm:p-3.5 mt-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Community Discussion & PDF
                </p>
                <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                  {SOCIAL_CHANNELS_DATA[2].recentPost.title}
                </p>
                <p className="text-[10px] text-blue-600 font-medium mt-1">
                  {SOCIAL_CHANNELS_DATA[2].recentPost.mediaSnippet}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              href={SOCIAL_CHANNELS_DATA[2].link}
              external
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {SOCIAL_CHANNELS_DATA[2].actionLabel}
            </Button>
          </Card>
        </div>

        {/* Vintage Old Website Archive Callout Banner */}
        <div
          data-soc="archive"
          className="rounded-3xl p-5 sm:p-8 bg-amber-50/80 border border-amber-200/90 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full md:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-2xl">
              ⏳
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h4 className="font-bold text-base sm:text-lg text-slate-900">
                  {OLD_WEBSITE_ARCHIVE.title}
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                  {OLD_WEBSITE_ARCHIVE.archiveYear}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {OLD_WEBSITE_ARCHIVE.description}
              </p>
            </div>
          </div>

          <Button
            id="social-open-archive-btn"
            variant="secondary"
            size="md"
            onClick={onOpenArchive}
            icon={<ExternalLink className="w-4 h-4" />}
            iconPosition="left"
            className="w-full sm:w-auto shrink-0 bg-amber-500 hover:bg-amber-600 text-white"
          >
            {OLD_WEBSITE_ARCHIVE.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};
