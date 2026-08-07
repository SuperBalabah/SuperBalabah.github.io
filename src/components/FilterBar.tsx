import React from 'react';
import { WorkCategory } from '../types/work';
import { Search, Sparkles, Code, Music, Disc, Activity, Layers } from 'lucide-react';

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
    { id: 'all', label: 'All Works', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'featured', label: 'Featured 精選', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'code', label: 'Code & Software', icon: <Code className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'original', label: 'Original Music', icon: <Music className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'cover', label: 'Covers (35+)', icon: <Disc className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'public_health', label: 'Public Health', icon: <Activity className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-6 mb-8">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-md font-semibold'
                    : 'bg-[var(--glass-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-glow)]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search keywords, tech..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--glass-bg)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)] transition placeholder-[var(--text-muted)]"
          />
        </div>
      </div>

      <div className="text-xs font-mono text-[var(--text-muted)] flex items-center justify-between px-1">
        <span>SHOWING {totalCount} ENTRIES IN VAULT</span>
        <span>FILTER: {activeCategory.toUpperCase()}</span>
      </div>
    </div>
  );
};
