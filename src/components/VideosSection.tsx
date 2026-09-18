import React from 'react';
import { Play, Film, Clock, Eye, Sparkles } from 'lucide-react';
import { VIDEOS_DATA } from '../data/mockData';
import { VideoItem } from '../types';

interface VideosSectionProps {
  onPlayVideo: (video: VideoItem) => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ onPlayVideo }) => {
  const featuredVideo = VIDEOS_DATA.find((v) => v.featured) || VIDEOS_DATA[0];
  const otherVideos = VIDEOS_DATA.filter((v) => v.id !== featuredVideo.id);

  return (
    <section id="videos" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider border border-pink-500/30">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic & Story Reels</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-display">
            Video Premiere Theater
          </h2>
          <p className="text-slate-400 text-xs sm:text-base md:text-lg">
            Watch official gameplay reveals, 10-year anniversary documentaries, animated shorts, and behind-the-scenes doll craftsmanship.
          </p>
        </div>

        {/* Featured Large Hero Video Card */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-10 sm:mb-12 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Thumbnail side with big play button */}
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
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-600 hover:bg-pink-500 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                aria-label="Play Featured Video"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
              </button>

              <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                {featuredVideo.duration}
              </span>
            </div>

            {/* Content side */}
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

                <button
                  onClick={() => onPlayVideo(featuredVideo)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Video Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid for Other Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {otherVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onPlayVideo(vid)}
              className="cursor-pointer rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/90 shadow-md hover:border-pink-500/50 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail */}
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

              {/* Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-white font-display group-hover:text-pink-400 transition-colors line-clamp-2">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{vid.views} views</span>
                  <span className="text-pink-400 font-semibold group-hover:underline">Play Now →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
