import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { ProjectVisual } from './ProjectVisual';
import { ProjectModal } from './ProjectModal';

interface ProjectGalleryProps {
  projects: Project[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Financial Modeling',
    'Forecasting & FP&A',
    'Data Automation',
    'Executive Dashboards',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wide">
              <span>Financial Models & Analyses</span>
              <span aria-hidden="true">·</span>
              <span>FP&A Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-100">
              Selected Financial Models & Automation Suites
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-body mt-2 max-w-2xl">
              Predictive revenue engines, automated variance reconciliation, direct-method cash flow forecasting, and executive board presentations.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model or metric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400/80 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Interactive Segmented Filter Controls (Functional Buttons, No Pills) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl mb-8 w-fit max-w-full overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 font-sans ${
                selectedCategory === category
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Bento Box Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isWide = project.featured && idx === 0;

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className={`group bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700/90 rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Visual Topology Container */}
                  <div className="mb-5 overflow-hidden rounded-xl">
                    <ProjectVisual project={project} isDetailed={isWide} />
                  </div>

                  {/* Clean unboxed metadata with typographic separators (NO pills) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400/90">{project.metrics[0].value} {project.metrics[0].label}</span>
                    {project.stars && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-400">{project.stars} ★</span>
                      </>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-100 group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors opacity-0 group-hover:opacity-100" />
                  </h3>

                  {/* Tagline & Summary */}
                  <p className="text-sm text-neutral-300 font-body mt-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  {isWide && (
                    <p className="text-xs text-neutral-400 font-body mt-2 line-clamp-2">
                      {project.summary}
                    </p>
                  )}
                </div>

                {/* Card Footer: Technologies unboxed with separators & actions */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400 font-mono">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <React.Fragment key={i}>
                        <span className="text-neutral-300">{tech}</span>
                        {i < Math.min(project.technologies.length, 4) - 1 && (
                          <span className="text-neutral-600" aria-hidden="true">/</span>
                        )}
                      </React.Fragment>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-neutral-500">+{project.technologies.length - 4}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="text-amber-400 group-hover:underline">View Case Study →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 text-sm font-mono">No matching projects found for "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline font-mono"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>

      {/* Case Study Lightbox Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
