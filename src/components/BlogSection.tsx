import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { BlogPost } from '../types/portfolio';
import { BlogReaderModal } from './BlogReaderModal';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    posts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedTag === 'All' || post.category === selectedTag;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  return (
    <section id="blog" className="py-16 md:py-24 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wide">
              <span>Corporate Finance & Modeling</span>
              <span aria-hidden="true">·</span>
              <span>FP&A Dispatches</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-100">
              Dispatches on Forecasting, Variance & Capital Allocation
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-body mt-2 max-w-2xl">
              In-depth essays detailing 13-week cash forecasting, automated variance analysis with Python and SQL, unit economics, and probabilistic Monte Carlo simulations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400/80 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs (Functional Segmented Buttons, No Pills) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl mb-8 w-fit max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 font-sans ${
                selectedTag === cat
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Spotlight */}
        {selectedTag === 'All' && !searchQuery && featuredPost && (
          <div
            onClick={() => setActivePost(featuredPost)}
            className="mb-10 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-6 sm:p-8 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
              <span className="text-amber-400 font-medium">Featured Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>{featuredPost.date}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredPost.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredPost.category}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-100 group-hover:text-amber-400 transition-colors">
              {featuredPost.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 font-body mt-3 leading-relaxed max-w-3xl">
              {featuredPost.excerpt}
            </p>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                {featuredPost.tags.slice(0, 4).map((tag, idx) => (
                  <span key={idx}>#{tag}</span>
                ))}
              </div>

              <span className="text-xs font-mono text-amber-400 group-hover:underline flex items-center gap-1">
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {/* List of Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-6 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata (NO pills) */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-300">{post.category}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-100 group-hover:text-amber-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 font-body mt-2.5 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  {post.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-neutral-400">#{t}</span>
                  ))}
                </div>

                <span className="text-neutral-300 group-hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 text-sm font-mono">No blog essays found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline font-mono"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Blog Post Reader Modal */}
      <BlogReaderModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};
