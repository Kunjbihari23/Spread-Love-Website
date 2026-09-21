import React, { useRef } from 'react';
import { Play, Film, Clock, Eye } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { VIDEOS_DATA } from '../data/mockData';
import { VideoItem } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface VideosSectionProps {
  onPlayVideo: (video: VideoItem) => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ onPlayVideo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredVideo = VIDEOS_DATA.find((v) => v.featured) || VIDEOS_DATA[0];
  const otherVideos = VIDEOS_DATA.filter((v) => v.id !== featuredVideo.id);

  // GSAP scroll reveals with reverse support on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-vid="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-vid="featured"]', { y: 28, scale: 0.96 }, {
          trigger: '[data-vid="featured"]',
          duration: 0.45,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('#featured-video-play-btn', { scale: 0.7 }, {
          trigger: '[data-vid="featured"]',
          duration: 0.4,
          delay: 0.1,
          ease: 'back.out(2)',
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-vid="card"]', { y: 24 }, {
          trigger: '[data-vid="grid"]',
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden"
    >
      <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-vid="header">
          <SectionHeader
            badge="Cinematic & Story Reels"
            badgeIcon={<Film className="w-3.5 h-3.5 text-pink-400" />}
            title={<span className="text-white">Video Premiere Theater</span>}
            subtitle={
              <span className="text-slate-400">
                Watch official gameplay reveals, 10-year anniversary documentaries, animated shorts, and behind-the-scenes doll craftsmanship.
              </span>
            }
          />
        </div>

        {/* Featured Large Hero Video Card */}
        <div
          data-vid="featured"
          className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-10 sm:mb-12 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto lg:h-[440px] overflow-hidden bg-black">
              <img
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <button
                id="featured-video-play-btn"
                onClick={() => onPlayVideo(featuredVideo)}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-600 hover:bg-pink-500 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Play Featured Video"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
              </button>

              <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                {featuredVideo.duration}
              </span>
            </div>

            <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  Featured Premiere
                </span>
                <span className="text-xs text-slate-400">{featuredVideo.category}</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-snug text-white">
                {featuredVideo.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-pink-400">
                {featuredVideo.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {featuredVideo.description}
              </p>

              <div className="pt-3 sm:pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-500" />
                  {featuredVideo.views}
                </span>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onPlayVideo(featuredVideo)}
                  icon={<Play className="w-3.5 h-3.5 fill-white" />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Watch Video Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid for Other Videos */}
        <div data-vid="grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {otherVideos.map((vid) => (
            <Card
              key={vid.id}
              data-vid="card"
              padded={false}
              elevation="interactive"
              onClick={() => onPlayVideo(vid)}
              className="overflow-hidden cursor-pointer bg-slate-900 border-slate-800 flex flex-col group hover:border-pink-500/50"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-black/80 text-white">
                  {vid.duration}
                </span>

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/30 text-pink-300 border border-pink-500/30">
                  {vid.category}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-pink-400 transition-colors line-clamp-2">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{vid.views}</span>
                  <span className="text-pink-400 font-semibold group-hover:underline">Play Now →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
