import React, { useRef } from 'react';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { OLD_SITE } from '../data/clientAssets';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

const HUES = [
  'var(--rb-pink)',
  'var(--rb-orange)',
  'var(--rb-green)',
  'var(--rb-blue)',
  'var(--rb-violet)',
  'var(--rb-teal)',
];

/** Chapter 11 — real posts from lovestar.world, plus one clear route there. */
export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  const ref = useRef<HTMLElement>(null);
  const posts = BLOG_POSTS_DATA.slice(0, 6);

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-blog="head"] > *', { y: 18 }, {
          trigger: ref.current,
          stagger: 0.07,
          duration: 0.42,
        });
        scrollReveal('[data-blog="card"]', { y: 28 }, {
          trigger: '[data-blog="grid"]',
          stagger: 0.07,
          duration: 0.45,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="blog"
      className="rb-band--violet rb-surface relative overflow-hidden py-[var(--section-py-lg)]"
    >
      <div className="sl-container">
        <div data-blog="head" className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="rb-chip">Chapter eleven</span>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1] tracking-tight text-[var(--text-primary)]">
              Sheila writes
            </h2>
            <p className="mt-4 text-[var(--text-body-lg)] leading-relaxed text-[var(--text-secondary)]">
              Her own words, pulled from lovestar.world — happy places, hats, Belinha, and
              keeping a positive outlook.
            </p>
          </div>

          <a
            href={OLD_SITE.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[var(--band)] px-6 text-sm font-extrabold text-white transition-transform hover:scale-[1.03] cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Full blog on lovestar.world
          </a>
        </div>

        <div data-blog="grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <button
              key={post.id}
              data-blog="card"
              type="button"
              onClick={() => onSelectPost(post)}
              className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white text-left transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
              style={{ boxShadow: `10px 10px 0 0 ${HUES[i % HUES.length]}` }}
            >
              <div className="aspect-16/10 overflow-hidden bg-[var(--surface-muted)]">
                <img
                  src={post.coverImage}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  aria-hidden
                  loading="lazy"
                  width={700}
                  height={440}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-lg font-extrabold leading-snug text-[var(--text-primary)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    {post.date}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 font-extrabold"
                    style={{ color: HUES[i % HUES.length] }}
                  >
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
