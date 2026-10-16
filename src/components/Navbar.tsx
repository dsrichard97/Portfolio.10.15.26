import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Github, Send } from 'lucide-react';

interface NavbarProps {
  onOpenDeployGuide: () => void;
  onOpenProfileCustomizer: () => void;
  authorName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDeployGuide,
  onOpenProfileCustomizer,
  authorName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-neutral-100 hover:text-white transition-colors whitespace-nowrap shrink-0 font-display flex items-center gap-2"
        >
          <span>{authorName}</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#projects"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Models & Projects
          </a>
          <a
            href="#skills"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            FP&A Skills
          </a>
          <a
            href="#blog"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Dispatches
          </a>
          <a
            href="#experience"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://www.linkedin.com/in/richarddiazdeleon"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-700/80 rounded-lg hover:border-emerald-500/80 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            title="View Richard Diaz De Leon on LinkedIn"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contact"
            className="px-4 py-2 text-xs font-medium text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 font-sans shadow-sm inline-flex items-center gap-1.5"
          >
            <span>Let's Connect</span>
            <Send className="w-3 h-3" />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950/95 px-6 py-4 space-y-3">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1"
          >
            Stack & Architecture
          </a>
          <a
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1"
          >
            Blog
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1"
          >
            Experience
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1"
          >
            Contact
          </a>

          <div className="pt-3 border-t border-neutral-800 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeployGuide();
              }}
              className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Deploy to GitHub</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfileCustomizer();
              }}
              className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1.5"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
