import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  return (
    <section id="blog" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Callout Header with Highlighted Direct Access */}
        <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white shadow-xl mb-10 sm:mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/30">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Creator's Creative Journal & Diary</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-display">
                The Creative Studio Blog
              </h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                Dive deeper into game design diaries, behind-the-scenes doll sculpting photos, children's psychology notes, and monthly parenting activity toolkits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                id="visit-blog-primary-btn"
                onClick={() => onSelectPost(BLOG_POSTS_DATA[0])}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Read Latest 10-Yr Essay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS_DATA.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="cursor-pointer rounded-3xl overflow-hidden bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-200">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-900 shadow-xs">
                    {post.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 font-display group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
