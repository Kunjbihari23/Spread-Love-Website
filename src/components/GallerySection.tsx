import React, { useState, useRef, useEffect } from 'react';
import { Image, Maximize2 } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { GALLERY_DATA } from '../data/mockData';
import { GalleryItem } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { FilterPills } from './ui/FilterPills';
import { Card } from './ui/Card';

interface GallerySectionProps {
  onSelectImage: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectImage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const didMountFilter = useRef(false);

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'characters', label: 'Characters & Dolls' },
    { id: 'projects', label: 'Projects & Games' },
    { id: 'celebration', label: 'Celebration Moments' },
    { id: 'artwork', label: 'Original Artwork' },
  ];

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // GSAP scroll reveals with reverse support on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-gal="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal(
          '[data-gal="item"]',
          {
            scale: 0.94,
            rotation: (i: number) => (i % 2 === 0 ? -3 : 3),
          },
          {
            trigger: '[data-gal="grid"]',
            stagger: { each: 0.05, from: 'center' },
            duration: 0.4,
            ease: 'back.out(1.3)',
            toggleActions: 'play reverse play reverse',
          }
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (!didMountFilter.current) {
      didMountFilter.current = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = sectionRef.current?.querySelectorAll('[data-gal="item"]');
    if (!items?.length) return;
    gsap.fromTo(
      items,
      { scale: 0.96, autoAlpha: 0, rotation: (i: number) => (i % 2 === 0 ? -2 : 2) },
      { scale: 1, autoAlpha: 1, rotation: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="gallery" className="py-16 sm:py-24 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-gal="header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <SectionHeader
              badge="Visual Archive & Artworks"
              badgeIcon={<Image className="w-3.5 h-3.5" />}
              title="Multimedia Creative Gallery"
              subtitle="A curated retrospective of handmade doll prototypes, watercolor background paintings, studio milestones, and early sketchbook drafts."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <FilterPills
              options={categories}
              activeId={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>

        <div data-gal="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              data-gal="item"
              elevation="interactive"
              onClick={() => onSelectImage(item)}
              className="p-0 overflow-hidden cursor-pointer flex flex-col group bg-white"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-900 capitalize">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {item.year}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                  {item.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-slate-500 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
