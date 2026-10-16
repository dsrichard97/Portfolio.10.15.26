import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenDeployGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-sm text-neutral-400 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <span className="text-base font-bold font-display text-neutral-100 block">
              {profile.name}
            </span>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              {profile.role} · Corporate FP&A, Financial Modeling & Strategic Finance
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="hover:text-neutral-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{profile.email}</span>
            </a>

            <button
              onClick={onOpenDeployGuide}
              className="text-amber-400 hover:text-amber-300 transition-colors font-mono"
            >
              Deploy to GitHub Pages
            </button>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 font-mono">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved. Open source under MIT.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
