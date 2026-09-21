import React from 'react';
import { Calendar, ExternalLink, Film } from 'lucide-react';
import { Character, GalleryItem, VideoItem, BlogPost } from '../types';
import { OLD_SITE } from '../data/clientAssets';
import { Modal } from './ui/Modal';

interface ModalsProps {
  activeVideo: VideoItem | null;
  onCloseVideo: () => void;
  activeLightbox: GalleryItem | null;
  onCloseLightbox: () => void;
  activeCharacter: Character | null;
  onCloseCharacter: () => void;
  activeBlogPost: BlogPost | null;
  onCloseBlogPost: () => void;
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
  activeBlogPost,
  onCloseBlogPost,
  showArchiveModal,
  onCloseArchiveModal,
}) => {
  return (
    <>
      {/* 1. VIDEO — plays the real file when present, otherwise says so */}
      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={onCloseVideo}
        maxWidth="4xl"
        title={activeVideo?.title}
      >
        {activeVideo && (
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              {activeVideo.videoUrl ? (
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <>
                  <img
                    src={activeVideo.thumbnail}
                    alt=""
                    className="h-full w-full object-cover opacity-45"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                      style={{ background: 'var(--gradient-rainbow)' }}
                    >
                      <Film className="h-6 w-6" aria-hidden />
                    </span>
                    <p className="font-display text-lg font-extrabold text-white">
                      Video coming soon
                    </p>
                    <p className="max-w-sm text-xs text-white/70">
                      This slot is ready — add the file and it plays here.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-[var(--love-pink)]">{activeVideo.subtitle}</p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeVideo.description}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* 2. GALLERY LIGHTBOX */}
      <Modal
        isOpen={Boolean(activeLightbox)}
        onClose={onCloseLightbox}
        maxWidth="2xl"
        title={activeLightbox?.title}
      >
        {activeLightbox && (
          <div className="space-y-4">
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-[oklch(21%_0.03_300)]">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="mx-auto max-h-[52vh] w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {activeLightbox.caption}
            </p>
            <div className="flex flex-wrap gap-2 border-t border-[var(--border-soft)] pt-3">
              {activeLightbox.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* 3. CHARACTER CARD */}
      <Modal
        isOpen={Boolean(activeCharacter)}
        onClose={onCloseCharacter}
        maxWidth="xl"
        title={activeCharacter?.name}
      >
        {activeCharacter && (
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div
                className="h-36 w-36 shrink-0 overflow-hidden rounded-2xl bg-[var(--surface-muted)] sm:h-44 sm:w-44"
                style={{ boxShadow: `10px 10px 0 0 ${activeCharacter.color}` }}
              >
                <img
                  src={activeCharacter.image}
                  alt={activeCharacter.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full flex-1 space-y-3 text-center sm:text-left">
                <p className="text-xs font-extrabold uppercase tracking-wider" style={{ color: activeCharacter.color }}>
                  {activeCharacter.role}
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {activeCharacter.bio}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeCharacter.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-xl bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* 4. BLOG READER — real posts from lovestar.world */}
      <Modal
        isOpen={Boolean(activeBlogPost)}
        onClose={onCloseBlogPost}
        maxWidth="2xl"
        title={activeBlogPost?.title}
      >
        {activeBlogPost && (
          <article className="space-y-5">
            <div className="aspect-16/9 overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
              <img
                src={activeBlogPost.coverImage}
                alt=""
                className="h-full w-full object-cover"
                aria-hidden
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[var(--love-pink)]" aria-hidden />
                {activeBlogPost.date}
              </span>
              <span aria-hidden>•</span>
              <span>{activeBlogPost.readTime}</span>
              <span aria-hidden>•</span>
              <span>By {activeBlogPost.author}</span>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {(Array.isArray(activeBlogPost.content)
                ? activeBlogPost.content
                : [activeBlogPost.content]
              ).map((para, idx) => (
                <p key={idx} className="whitespace-pre-wrap">
                  {para}
                </p>
              ))}
            </div>

            {activeBlogPost.sourceUrl && (
              <div className="border-t border-[var(--border-soft)] pt-4">
                <a
                  href={activeBlogPost.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--love-pink)] hover:underline cursor-pointer"
                >
                  Read the original on lovestar.world
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            )}
          </article>
        )}
      </Modal>

      {/* 5. LEAVING FOR THE ORIGINAL SITE */}
      <Modal
        isOpen={showArchiveModal}
        onClose={onCloseArchiveModal}
        maxWidth="md"
        title="Visit lovestar.world"
      >
        <div className="space-y-4">
          <div className="h-2 w-full rounded-full" style={{ background: 'var(--gradient-rainbow)' }} aria-hidden />
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Sheila's original website is still online — blog posts and earlier work live there.
            It opens in a new tab, so this page stays where it is.
          </p>
          <div className="space-y-2.5">
            <a
              href={OLD_SITE.home}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCloseArchiveModal}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--love-pink)] text-sm font-extrabold text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Open lovestar.world
            </a>
            <a
              href={OLD_SITE.blog}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCloseArchiveModal}
              className="flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[var(--text-primary)] text-sm font-extrabold text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white transition-colors cursor-pointer"
            >
              Go straight to the blog
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
