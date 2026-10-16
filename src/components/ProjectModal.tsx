import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Copy, Check, Terminal } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectVisual } from './ProjectVisual';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Case Study</span>
              {project.stars && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-mono">{project.stars} GitHub Stars</span>
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-100 mt-1">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Visual Architecture Representation */}
          <div className="w-full">
            <ProjectVisual project={project} isDetailed={true} />
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800/80">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-display text-neutral-100 tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs text-neutral-400 mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Overview & Architecture */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-100 font-display">
              System Overview & Core Rationale
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {project.summary}
            </p>
            <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/60 text-sm text-neutral-300">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                Architecture Topology
              </span>
              <p className="leading-relaxed">{project.architecture}</p>
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Technical Bottlenecks Overcome</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neutral-500 font-mono mt-0.5">0{i + 1}.</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Engineering Interventions</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {project.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Snippet (if available) */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                  {project.codeSnippet.title}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Technologies Applied (Clean Unboxed Text with Separators, NO PILLS) */}
          <div className="pt-4 border-t border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 block mb-2">Technologies & Protocols</span>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-neutral-300">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-mono text-neutral-200">{tech}</span>
                  {idx < project.technologies.length - 1 && <span className="text-neutral-600" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-800 bg-neutral-900/90">
          <div className="flex items-center gap-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source on GitHub</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition-colors"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            Close (Esc)
          </button>
        </div>

      </div>
    </div>
  );
};
