import React, { useState } from 'react';
import { Play, Sparkles, Check, Download, Calendar, ExternalLink, Heart, X, CheckCircle2 } from 'lucide-react';
import { Project, Character, GalleryItem, VideoItem, BlogPost, CelebrationWish } from '../types';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

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
      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={onCloseVideo}
        maxWidth="4xl"
        title={activeVideo?.title}
      >
        {activeVideo && (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center group">
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

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-pink-600 font-semibold">{activeVideo.subtitle}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeVideo.description}</p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Views: {activeVideo.views}</span>
                <span>Official Children's Universe Studio</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 2. GALLERY LIGHTBOX MODAL */}
      <Modal
        isOpen={Boolean(activeLightbox)}
        onClose={onCloseLightbox}
        maxWidth="2xl"
        title={activeLightbox?.title}
      >
        {activeLightbox && (
          <div className="space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[50vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full bg-pink-100 text-pink-700 capitalize">
                {activeLightbox.category}
              </span>
              <span className="text-xs font-semibold text-slate-400">Year {activeLightbox.year}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
        )}
      </Modal>

      {/* 3. CHARACTER DETAIL MODAL */}
      <Modal
        isOpen={Boolean(activeCharacter)}
        onClose={onCloseCharacter}
        maxWidth="xl"
        title={activeCharacter?.name}
      >
        {activeCharacter && (
          <div className="space-y-5">
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
              <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
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

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-amber-50 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-bold text-slate-900">Free Printable Coloring Sheet</p>
                <p className="text-[11px] sm:text-xs text-slate-500">Download printable line art of {activeCharacter.name}.</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownloadColoring}
                icon={downloadedColoring ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                iconPosition="left"
                className="w-full sm:w-auto shrink-0 cursor-pointer"
              >
                {downloadedColoring ? 'Saved PDF Sheet!' : 'Download Coloring PDF'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 4. PROJECT DETAIL MODAL */}
      <Modal
        isOpen={Boolean(activeProject)}
        onClose={onCloseProject}
        maxWidth="xl"
        title={activeProject?.title}
      >
        {activeProject && (
          <div className="space-y-4">
            <div className="relative aspect-16/9 bg-slate-950 rounded-2xl overflow-hidden">
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.platforms.map((plat) => (
                <span key={plat} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700">
                  {plat}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeProject.fullDesc || activeProject.shortDesc}
            </p>
          </div>
        )}
      </Modal>

      {/* 5. BLOG POST READER MODAL */}
      <Modal
        isOpen={Boolean(activeBlogPost)}
        onClose={onCloseBlogPost}
        maxWidth="2xl"
        title={activeBlogPost?.title}
      >
        {activeBlogPost && (
          <div className="space-y-4">
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-900">
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

            <div className="text-slate-700 text-xs sm:text-base leading-relaxed space-y-3">
              {Array.isArray(activeBlogPost.content) ? (
                activeBlogPost.content.map((para, idx) => <p key={idx}>{para}</p>)
              ) : (
                <p>{activeBlogPost.content}</p>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* 6. CELEBRATION WISH MODAL */}
      <Modal
        isOpen={showWishModal}
        onClose={onCloseWishModal}
        maxWidth="md"
        title="Leave a 10-Year Celebration Note"
      >
        {submitted ? (
          <div className="p-6 rounded-2xl bg-pink-50 text-center text-pink-700 font-bold space-y-2">
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
                    className={`text-xl p-2 rounded-xl transition-all min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer ${
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Heart className="w-4 h-4 fill-current" />}
              iconPosition="left"
              className="w-full cursor-pointer"
            >
              Post Celebration Note
            </Button>
          </form>
        )}
      </Modal>

      {/* 7. OLD WEBSITE ARCHIVE MODAL */}
      <Modal
        isOpen={showArchiveModal}
        onClose={onCloseArchiveModal}
        maxWidth="md"
        title="Classic Archive (2014 – 2021)"
      >
        <div className="text-center space-y-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
            ⏳
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You are jumping into the retro archives of our original creator website! Here you can find the classic Flash mini-games, early prototype storybooks, and vintage fan galleries from our earliest years.
          </p>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 font-medium">
            💡 The archive is preserved in read-only nostalgic mode. You can return to this new Hub anytime.
          </div>

          {archiveLaunched ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Simulating launch to Classic Archive (2014-2021)...</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              <Button
                variant="secondary"
                size="md"
                onClick={handleLaunchArchive}
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="left"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
              >
                Launch Classic Archive
              </Button>
              <button
                onClick={onCloseArchiveModal}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Stay on New Website
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
