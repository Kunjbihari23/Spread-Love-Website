import React, { useState, useRef, useEffect } from 'react';
import { Star, Layers, ArrowRight, Eye } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, scrollReveal } from '../lib/motion';
import { PROJECTS_DATA } from '../data/mockData';
import { Project } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { FilterPills } from './ui/FilterPills';
import { Card } from './ui/Card';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const didMountFilter = useRef(false);

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

  // GSAP scroll reveal with reverse support on scroll re-entry
  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        scrollReveal('[data-pj="header"] > *', { y: 20 }, {
          trigger: sectionRef.current,
          stagger: 0.08,
          duration: 0.4,
          toggleActions: 'play reverse play reverse',
        });

        scrollReveal('[data-pj="card"]', { y: 32, rotation: 1.5 }, {
          trigger: '[data-pj="grid"]',
          stagger: 0.06,
          duration: 0.4,
          ease: 'back.out(1.4)',
          toggleActions: 'play reverse play reverse',
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Re-animate cards when filter changes
  useEffect(() => {
    if (!didMountFilter.current) {
      didMountFilter.current = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = sectionRef.current?.querySelectorAll('[data-pj="card"]');
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { y: 16, autoAlpha: 0, scale: 0.97 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.35,
        ease: 'power2.out',
      }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-pj="header"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
        >
          <div className="space-y-2.5 max-w-2xl">
            <SectionHeader
              badge="10-Year Portfolio & Works"
              badgeIcon={<Layers className="w-3.5 h-3.5" />}
              title="Creative Releases, Games & Toys"
              subtitle="Explore the whimsical interactive worlds, educational adventures, and emotional comfort toys that have touched millions of childhoods."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <FilterPills
              options={categories}
              activeId={activeFilter}
              onChange={setActiveFilter}
            />
          </div>
        </div>

        <div
          data-pj="grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              data-pj="card"
              elevation="interactive"
              onClick={() => onSelectProject(project)}
              className="p-0 overflow-hidden cursor-pointer flex flex-col justify-between group bg-slate-50 hover:bg-white"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-white/95 text-slate-900 shadow-sm">
                    {project.year}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-pink-600 text-white shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    {project.tag}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 rounded-full bg-white/90 text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                      <Eye className="w-4 h-4 text-pink-600" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">
                      {project.status || 'Archived Classic'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {project.shortDesc}
                  </p>

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

              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600 group-hover:text-pink-700">
                <span>Explore Project Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
