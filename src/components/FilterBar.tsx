import React from 'react';
import { WorkCategory } from '../types/work';
import { Search, Sparkles, Code, Music, Disc, Layers } from 'lucide-react';

interface FilterBarProps {
  activeCategory: WorkCategory;
  onSelectCategory: (category: WorkCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  const categories: { id: WorkCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'ALL WORKS', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'featured', label: 'FEATURED', icon: <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> },
    { id: 'code', label: 'CODE & SOFTWARE', icon: <Code className="w-3.5 h-3.5 text-[var(--accent-cyan)]" /> },
    { id: 'original', label: 'ORIGINAL MUSIC', icon: <Music className="w-3.5 h-3.5 text-[var(--accent-purple)]" /> },
    { id: 'cover', label: 'COVERS', icon: <Disc className="w-3.5 h-3.5 text-[var(--accent-rose)]" /> },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--accent-teal)] text-slate-950 font-bold shadow-sm'
                    : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-glow)]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search stack, keywords..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-teal)] transition placeholder-[var(--text-muted)]"
          />
        </div>
      </div>

      <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
        <span>SHOWING {totalCount} ARCHIVES</span>
        <span>CATEGORY: {activeCategory.toUpperCase()}</span>
      </div>
    </div>
  );
};
