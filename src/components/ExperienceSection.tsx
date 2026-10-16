import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Briefcase, ArrowUpRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wide">
            <span>Career Record</span>
            <span aria-hidden="true">·</span>
            <span>2019 — 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-100">
            Professional Experience & Track Record
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-body mt-2 max-w-2xl">
            A chronicle of high-impact engineering leadership, scaling core distributed systems, and shipping production applications.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experienceData.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-6 sm:p-8 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-100">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-1">
                    <span className="text-neutral-200 font-medium">{item.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-amber-400 font-medium">
                  {item.period}
                </span>
              </div>

              <p className="text-sm text-neutral-300 font-body mb-5 leading-relaxed">
                {item.summary}
              </p>

              {/* Achievements */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                  Key Accomplishments
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-mono mt-0.5">▪</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies unboxed with separators (NO pills) */}
              <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-neutral-400">
                <span className="text-neutral-500 mr-1">Stack:</span>
                {item.technologies.map((t, tIdx) => (
                  <React.Fragment key={tIdx}>
                    <span className="text-neutral-300">{t}</span>
                    {tIdx < item.technologies.length - 1 && <span className="text-neutral-600" aria-hidden="true">/</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
