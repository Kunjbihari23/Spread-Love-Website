import React, { useState } from 'react';
import { Heart, Sparkles, Youtube, Instagram, Facebook, BookOpen, ExternalLink, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenArchive: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchive }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 sm:pt-20 pb-10 sm:pb-12 relative overflow-hidden border-t-4 border-pink-500">
      {/* Decorative top soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-pink-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-400 flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-display block">
                  LOVE WORLD
                </span>
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                  10-Year Creative Universe (2014 – 2024)
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Dedicated to crafting kind, imaginative, and safe digital worlds, plush dolls, and storybooks that spark wonder and nurture empathy in young children worldwide.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors flex items-center justify-center shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition-colors flex items-center justify-center shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors flex items-center justify-center shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#blog"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors flex items-center justify-center shadow-xs"
                aria-label="Blog"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation 1 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Explore Hub
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#hero" className="hover:text-pink-400 transition-colors block py-1">
                  Home
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-pink-400 transition-colors block py-1">
                  10-Year Journey
                </a>
              </li>
              <li>
                <a href="#love-world" className="hover:text-pink-400 transition-colors font-semibold text-pink-300 block py-1">
                  LOVE WORLD Flagship
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-pink-400 transition-colors block py-1">
                  All Projects & Games
                </a>
              </li>
              <li>
                <a href="#celebration" className="hover:text-pink-400 transition-colors block py-1">
                  Anniversary Celebration
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation 2: Characters & Media */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Characters & Content
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#characters" className="hover:text-amber-400 transition-colors block py-1">
                  Spread Love Doll & Belinha
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors block py-1">
                  Multimedia Gallery
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-amber-400 transition-colors block py-1">
                  Cinema & Trailers
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-amber-400 transition-colors block py-1">
                  Creator's Diary Blog
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenArchive}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 py-1"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Classic Archive (2014-2021)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Club signup */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Family Club Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive free printable coloring books, lullaby audio tracks, and early access codes for LOVE WORLD.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox for the welcome coloring sheet.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Parent's email address..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 min-h-[44px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors shadow-xs min-h-[44px]"
                >
                  Join Family Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom / Copyright / Credits */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2014 – 2026 LOVE WORLD Creative Universe. All rights reserved. Handcrafted with love.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-slate-400">Frontend Prototype</span>
            <span>•</span>
            <button onClick={onOpenArchive} className="hover:text-pink-400 transition-colors">
              Old Website Archive
            </button>
            <span>•</span>
            <a href="#hero" className="hover:text-pink-400 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
