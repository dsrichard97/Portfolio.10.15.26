import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Tag, Copy, Check, Share2, BookOpen, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types/portfolio';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  if (!post) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reader Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Engineering Dispatches</span>
            <span aria-hidden="true">·</span>
            <span>{post.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Copy link to this article"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[75vh] overflow-y-auto font-body">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-3">
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">{post.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display text-neutral-100 leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed border-b border-neutral-800 pb-6">
              {post.excerpt}
            </p>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800">
            <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
              Key Engineering Takeaways
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              {post.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-mono mt-0.5 font-bold">0{i + 1}.</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-8">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold font-display text-neutral-100">
                  {section.heading}
                </h3>

                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-200 italic text-sm sm:text-base leading-relaxed my-4">
                    "{section.quote}"
                  </blockquote>
                )}

                {section.code && (
                  <div className="space-y-2 my-4">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>{section.code.filename}</span>
                      <button
                        onClick={() => handleCopyCode(section.code!.code, idx)}
                        className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                      >
                        {copiedCodeIndex === idx ? (
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
                      <pre>{section.code.code}</pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags (Clean Unboxed Text with Separators, NO PILLS) */}
          <div className="pt-6 border-t border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 block mb-2">Subject Index</span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-300">
              {post.tags.map((tag, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-neutral-300">#{tag}</span>
                  {idx < post.tags.length - 1 && <span className="text-neutral-600" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

        {/* Reader Footer */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-between">
          <div className="text-xs text-neutral-400 font-mono">
            <span>Written by Richard Diaz</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors font-mono"
          >
            Close Reader (Esc)
          </button>
        </div>

      </div>
    </div>
  );
};
