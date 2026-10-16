import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Layers, CheckCircle } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wide">
            <span>Corporate Competencies</span>
            <span aria-hidden="true">·</span>
            <span>Technical Finance Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-100">
            FP&A Core Competencies & Financial Toolchain
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-body mt-2 max-w-2xl">
            Institutional-grade corporate financial modeling, automated SQL/Python pipelines, variance attribution, and executive reporting capabilities.
          </p>
        </div>

        {/* 2-Column Split: Categories on left, skills grid on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Category Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {skillCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between font-mono text-xs sm:text-sm ${
                  activeCategory === idx
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-100 shadow-md'
                    : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {cat.skills.length} competencies
                </span>
              </button>
            ))}
          </div>

          {/* Active Skills Display */}
          <div className="lg:col-span-8 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
              <h3 className="text-lg font-semibold font-display text-neutral-100">
                {skillCategories[activeCategory].name}
              </h3>
              <span className="text-xs font-mono text-amber-400">Production Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories[activeCategory].skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-200 font-mono">{skill}</p>
                    <p className="text-xs text-neutral-500 mt-1">High-concurrency & automated CI test pipelines</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Zero-fluff toolset</span>
              <span>Focus on verifiable performance & maintainability</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
