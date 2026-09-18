import React, { useState, useRef, useEffect } from 'react';
import { Star, Layers, ArrowRight, Eye } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, ST } from '../lib/motion';
import { PROJECTS_DATA } from '../data/mockData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Flagship Game', label: 'Flagship Games' },
    { id: 'Comfort & Mindfulness', label: 'Dolls & Comfort' },
    { id: 'Culinary Puzzle', label: 'Playful Puzzles' },
    { id: 'Nature & Storybook', label: 'Storybooks' },
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.tag === activeFilter;
  });

  // Toy-shelf: cards hop onto shelf from below
  useGSAP(() => {
    const mm = whenMotionOk(() => {
      gsap.from('[data-pj="header"] > *', {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, ...ST },
      });

      gsap.from('[data-pj="card"]', {
        y: 56,
        opacity: 0,
        rotation: 2,
        stagger: 0.1,
        duration: 0.55,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '[data-pj="grid"]', start: 'top 85%', toggleActions: ST.toggleActions },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  // Re-animate cards when filter changes
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = sectionRef.current?.querySelectorAll('[data-pj="card"]');
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { y: 24, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filter Controls */}
        <div data-pj="header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>10-Year Portfolio & Works</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
              Creative Releases, Games & Toys
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Explore the whimsical interactive worlds, educational adventures, and emotional comfort toys that have touched millions of childhoods.
            </p>
          </div>

          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                  activeFilter === cat.id
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div data-pj="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-pj="card"
              onClick={() => onSelectProject(project)}
              className="cursor-pointer rounded-3xl overflow-hidden bg-slate-50 hover:bg-white border border-slate-200 hover:border-pink-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Artwork Frame */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Year Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-white/95 text-slate-900 shadow-sm">
                    {project.year}
                  </span>

                  {/* Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-pink-600 text-white shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    {project.tag}
                  </span>

                  {/* Quick Preview Hover Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 rounded-full bg-white/90 text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                      <Eye className="w-4 h-4 text-pink-600" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">
                      {project.status || 'Archived Classic'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display group-hover:text-pink-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {project.shortDesc}
                  </p>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="text-[10px] sm:text-xs font-medium px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600 group-hover:text-pink-700">
                <span>Explore Project Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
