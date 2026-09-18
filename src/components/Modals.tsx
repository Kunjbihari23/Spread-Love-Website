import React, { useState } from 'react';
import { X, Play, Heart, Download, Calendar, ExternalLink, Sparkles, Check, Clock, User, Share2, Volume2, Maximize2, CheckCircle2 } from 'lucide-react';
import { Project, Character, GalleryItem, VideoItem, BlogPost, CelebrationWish } from '../types';

interface ModalsProps {
  activeVideo: VideoItem | null;
  onCloseVideo: () => void;
  activeLightbox: GalleryItem | null;
  onCloseLightbox: () => void;
  activeCharacter: Character | null;
  onCloseCharacter: () => void;
  activeProject: Project | null;
  onCloseProject: () => void;
  activeBlogPost: BlogPost | null;
  onCloseBlogPost: () => void;
  showWishModal: boolean;
  onCloseWishModal: () => void;
  onSubmitWish: (newWish: CelebrationWish) => void;
  showArchiveModal: boolean;
  onCloseArchiveModal: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeVideo,
  onCloseVideo,
  activeLightbox,
  onCloseLightbox,
  activeCharacter,
  onCloseCharacter,
  activeProject,
  onCloseProject,
  activeBlogPost,
  onCloseBlogPost,
  showWishModal,
  onCloseWishModal,
  onSubmitWish,
  showArchiveModal,
  onCloseArchiveModal,
}) => {
  // Wish form state
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [wishText, setWishText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('❤️');
  const [authorRole, setAuthorRole] = useState('Parent & Child');
  const [submitted, setSubmitted] = useState(false);

  // Character coloring page downloaded state
  const [downloadedColoring, setDownloadedColoring] = useState(false);

  // Archive launch simulated state
  const [archiveLaunched, setArchiveLaunched] = useState(false);

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !wishText.trim()) return;

    const newWish: CelebrationWish = {
      id: `wish-${Date.now()}`,
      author: authorName.trim(),
      location: authorLocation.trim() || 'Global Fan',
      text: wishText.trim(),
      date: 'Just now',
      hearts: 1,
      avatarEmoji: selectedEmoji,
      tag: authorRole,
    };

    onSubmitWish(newWish);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAuthorName('');
      setAuthorLocation('');
      setWishText('');
      onCloseWishModal();
    }, 1200);
  };

  const handleDownloadColoring = () => {
    setDownloadedColoring(true);
    setTimeout(() => setDownloadedColoring(false), 2500);
  };

  const handleLaunchArchive = () => {
    setArchiveLaunched(true);
    setTimeout(() => {
      setArchiveLaunched(false);
      onCloseArchiveModal();
    }, 2000);
  };

  return (
    <>
      {/* 1. VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl max-h-[90dvh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 shrink-0">
                  {activeVideo.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                id="close-video-modal-btn"
                onClick={onCloseVideo}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video container */}
            <div className="overflow-y-auto">
              <div className="relative aspect-video bg-black flex items-center justify-center group">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-2xl mb-3 animate-pulse">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                  </div>
                  <p className="text-white text-xs sm:text-sm font-semibold max-w-sm">
                    Simulating High-Definition Playback (Duration: {activeVideo.duration})
                  </p>
                </div>
              </div>

              {/* Video details */}
              <div className="p-4 sm:p-6 bg-slate-900 text-white space-y-2">
                <h4 className="text-base sm:text-lg font-bold font-display">{activeVideo.title}</h4>
                <p className="text-xs sm:text-sm text-pink-400 font-semibold">{activeVideo.subtitle}</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeVideo.description}</p>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Views: {activeVideo.views}</span>
                  <span>Official Children's Universe Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GALLERY LIGHTBOX MODAL */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]">
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[300px]">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[50vh] sm:max-h-[60vh] w-auto object-contain mx-auto"
              />
              <button
                id="close-lightbox-btn"
                onClick={onCloseLightbox}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all shadow-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-white border-t border-slate-100 overflow-y-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full bg-pink-100 text-pink-700 capitalize">
                  {activeLightbox.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">Year {activeLightbox.year}</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-1 font-display">
                {activeLightbox.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {activeLightbox.caption}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {activeLightbox.tags.map((tag) => (
                  <span key={tag} className="text-[10px] sm:text-xs px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CHARACTER DETAIL MODAL */}
      {activeCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90dvh] flex flex-col">
            {/* Header banner */}
            <div
              className="relative p-5 sm:p-7 text-white flex items-center justify-between shrink-0"
              style={{ backgroundColor: activeCharacter.color }}
            >
              <div className="relative z-10 pr-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-white/20 backdrop-blur-sm text-white mb-1.5">
                  {activeCharacter.badge}
                </span>
                <h3 className="text-xl sm:text-3xl font-bold font-display">{activeCharacter.name}</h3>
                <p className="text-xs sm:text-sm font-medium text-white/90">{activeCharacter.subtitle}</p>
              </div>
              <button
                id="close-character-modal-btn"
                onClick={onCloseCharacter}
                className="relative z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close character"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
                <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100">
                  <img
                    src={activeCharacter.image}
                    alt={activeCharacter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2.5 text-center sm:text-left w-full">
                  <div className="p-2.5 sm:p-3 bg-pink-50/80 rounded-2xl border border-pink-100">
                    <p className="text-[10px] sm:text-xs uppercase font-bold text-pink-600 tracking-wider mb-0.5">Role in Universe</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">{activeCharacter.role}</p>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-amber-50/80 rounded-2xl border border-amber-100">
                    <p className="text-[10px] sm:text-xs uppercase font-bold text-amber-700 tracking-wider mb-0.5">Famous Quote</p>
                    <p className="text-xs sm:text-sm italic text-slate-700 font-medium">"{activeCharacter.quote}"</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Story & Personality</h4>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base">
                  {activeCharacter.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Super Kind Traits</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeCharacter.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>{trait}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Favorite Treasure</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">{activeCharacter.favoriteItem}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Origin Debut Project</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">{activeCharacter.relatedProject}</p>
                </div>
              </div>

              {/* Printable Coloring Sheet simulator */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-amber-50 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Free Printable Coloring Sheet</p>
                  <p className="text-[11px] sm:text-xs text-slate-500">Download high-res printable line art of {activeCharacter.name} for home coloring.</p>
                </div>
                <button
                  onClick={handleDownloadColoring}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 shrink-0 min-h-[40px]"
                >
                  {downloadedColoring ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Saved PDF Sheet!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Coloring PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PROJECT DETAIL MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90dvh] flex flex-col">
            <div className="relative aspect-16/9 bg-slate-950 shrink-0 overflow-hidden">
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button
                id="close-project-modal-btn"
                onClick={onCloseProject}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all shadow-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close project"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-pink-600 inline-block mb-1">
                  Released {activeProject.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display">{activeProject.title}</h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {activeProject.platforms.map((plat) => (
                  <span key={plat} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700">
                    {plat}
                  </span>
                ))}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Project Concept</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeProject.fullDesc || activeProject.shortDesc}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <p className="text-xs font-bold text-slate-900 mb-1">Key Highlights</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.highlights.map((h, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-400">Archived in 10-Year Portfolio</span>
                <button
                  onClick={onCloseProject}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors min-h-[40px]"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. BLOG POST READER MODAL */}
      {activeBlogPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90dvh] flex flex-col">
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  {activeBlogPost.category}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">{activeBlogPost.readTime}</span>
              </div>
              <button
                id="close-blog-modal-btn"
                onClick={onCloseBlogPost}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-8 space-y-4">
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-900 mb-4">
                <img
                  src={activeBlogPost.coverImage}
                  alt={activeBlogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-500" />
                  {activeBlogPost.date}
                </span>
                <span>•</span>
                <span>By {activeBlogPost.author}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {activeBlogPost.title}
              </h2>

              <div className="text-slate-700 text-xs sm:text-base leading-relaxed space-y-3">
                {Array.isArray(activeBlogPost.content) ? (
                  activeBlogPost.content.map((para, idx) => <p key={idx}>{para}</p>)
                ) : (
                  <p>{activeBlogPost.content}</p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {activeBlogPost.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. CELEBRATION WISH MODAL */}
      {showWishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto">
            <button
              id="close-wish-modal-btn"
              onClick={onCloseWishModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="text-3xl sm:text-4xl mb-2 block">💌</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Leave a 10-Year Celebration Note
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your message will appear on our global community love board!
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-pink-50 text-center text-pink-700 font-bold space-y-2 animate-in fade-in">
                <Sparkles className="w-8 h-8 text-pink-600 mx-auto animate-bounce" />
                <p className="text-base sm:text-lg">Thank you for sharing your warm wish!</p>
                <p className="text-xs text-slate-500">Your note has been pinned to the 10-Year guestbook.</p>
              </div>
            ) : (
              <form onSubmit={handleWishSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name / Family Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Maya & Mom"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Country</label>
                    <input
                      type="text"
                      value={authorLocation}
                      onChange={(e) => setAuthorLocation(e.target.value)}
                      placeholder="e.g. Tokyo, Japan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Role</label>
                    <select
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white min-h-[44px]"
                    >
                      <option>Parent & Child</option>
                      <option>Young Fan</option>
                      <option>Teacher / Educator</option>
                      <option>Fellow Artist</option>
                      <option>Longtime Supporter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pick an Anniversary Icon</label>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    {['❤️', '⭐', '🌸', '🐾', '🧸', '✨'].map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`text-xl p-2 rounded-xl transition-all min-w-[40px] min-h-[40px] flex items-center justify-center ${
                          selectedEmoji === emoji ? 'bg-pink-100 ring-2 ring-pink-500 scale-110' : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Celebration Message</label>
                  <textarea
                    required
                    rows={3}
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Happy 10th anniversary! Spread Love Doll has brought so much warmth to our home..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Post Celebration Note</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. OLD WEBSITE ARCHIVE MODAL */}
      {showArchiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-8 shadow-2xl text-center max-h-[90dvh] overflow-y-auto">
            <button
              id="close-archive-modal-btn"
              onClick={onCloseArchiveModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-2xl">⏳</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">Classic Archive (2014 – 2021)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              You are jumping into the retro archives of our original creator website! Here you can find the classic Flash mini-games, early prototype storybooks, and vintage fan galleries from our earliest years.
            </p>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 font-medium mb-5">
              💡 The archive is preserved in read-only nostalgic mode. You can return to this new Hub anytime.
            </div>

            {archiveLaunched ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Simulating launch to Classic Archive (2014-2021)...</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <button
                  onClick={handleLaunchArchive}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Classic Archive</span>
                </button>
                <button
                  onClick={onCloseArchiveModal}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors min-h-[40px]"
                >
                  Stay on New Website
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
