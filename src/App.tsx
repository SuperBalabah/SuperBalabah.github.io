import React, { useState, useMemo, useEffect } from 'react';
import { WorkCategory, WorkItem } from './types/work';
import { WORKS_DATA } from './data/works';
import { AudioProvider, useAudio } from './context/AudioContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { WorkGrid } from './components/WorkGrid';
import { DetailDrawer } from './components/DetailDrawer';
import { AudioPlayer } from './components/AudioPlayer';
import { Heart, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const { setPlaylist } = useAudio();

  // Filter works dynamically based on category and search query
  const filteredWorks = useMemo(() => {
    return WORKS_DATA.filter((work) => {
      // Category Filter
      const categoryMatch =
        activeCategory === 'all'
          ? true
          : activeCategory === 'featured'
          ? work.featured
          : work.category === activeCategory;

      // Search Query Filter
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        work.title.toLowerCase().includes(query) ||
        work.summary.toLowerCase().includes(query) ||
        work.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (work.techStack && work.techStack.some((tech) => tech.toLowerCase().includes(query)));

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  // Update global audio playlist whenever filtered works change
  useEffect(() => {
    const audioWorks = filteredWorks.filter(w => w.category === 'original' || w.category === 'cover' || !!w.audioUrl);
    setPlaylist(audioWorks);
  }, [filteredWorks, setPlaylist]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section (15-Sec Executive Summary for Harvard Adcom) */}
      <HeroSection />

      {/* Filter Tabs & Search */}
      <FilterBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={filteredWorks.length}
      />

      {/* Bento Grid Works Showcase */}
      <main className="flex-1">
        <WorkGrid works={filteredWorks} onSelectWork={setSelectedWork} />
      </main>

      {/* Editorial Case Study Detail Drawer */}
      <DetailDrawer item={selectedWork} onClose={() => setSelectedWork(null)} />

      {/* Persistent Floating Audio Player */}
      <AudioPlayer />

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-8 px-6 text-center text-xs font-mono text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-current" /> for Harvard MPH Application Portfolio.
          </p>
          <p className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Taste-Skill Anti-Slop Design Architecture.
          </p>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
};

export default App;
