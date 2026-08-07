import React, { useState, useMemo, useEffect } from 'react';
import { WorkCategory, WorkItem } from './types/work';
import { WORKS_DATA } from './data/works';
import { AudioProvider, useAudio } from './context/AudioContext';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { MouseSpotlight } from './components/MouseSpotlight';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { WorkGrid } from './components/WorkGrid';
import { DetailDrawer } from './components/DetailDrawer';
import { AudioPlayer } from './components/AudioPlayer';
import { Sparkles, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');
  const { setPlaylist } = useAudio();

  // Scrollspy logic to update active sidebar section automatically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'works', 'research', 'music'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);

    // Also update filter tab if clicking specific section
    if (sectionId === 'research') {
      setActiveCategory('public_health');
    } else if (sectionId === 'music') {
      setActiveCategory('original');
    } else if (sectionId === 'works') {
      setActiveCategory('all');
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    const audioWorks = filteredWorks.filter(
      (w) => w.category === 'original' || w.category === 'cover' || !!w.audioUrl
    );
    setPlaylist(audioWorks);
  }, [filteredWorks, setPlaylist]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-[var(--accent-teal)] selection:text-slate-950">
      {/* Brittany Chiang Cursor Glow Follower */}
      <MouseSpotlight />

      {/* Floating Theme Toggle */}
      <Header />

      {/* Main Responsive Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="lg:flex lg:justify-between lg:gap-12">
          {/* Left Sidebar Fixed Navigation Column */}
          <SidebarNav activeSection={activeSection} onNavigate={scrollToSection} />

          {/* Right Scrollable Content Area */}
          <main className="lg:ml-[42%] lg:w-7/12 py-12 lg:py-24 space-y-24">
            {/* Section 01: About */}
            <HeroSection />

            {/* Section 02: Works / Projects */}
            <section id="works" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-teal)] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)]" />
                02 / ARCHIVES & PROJECTS
              </div>

              {/* Filter Tabs & Search */}
              <FilterBar
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                totalCount={filteredWorks.length}
              />

              {/* Works Grid */}
              <WorkGrid works={filteredWorks} onSelectWork={setSelectedWork} />
            </section>

            {/* Footer */}
            <footer className="pt-12 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)] space-y-2">
              <p className="flex items-center gap-1.5">
                Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Polymath Portfolio & Public Health Applications.
              </p>
              <p className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Japanese Minimalist & Quiet Luxury Architecture.
              </p>
            </footer>
          </main>
        </div>
      </div>

      {/* Editorial Case Study Detail Drawer */}
      <DetailDrawer item={selectedWork} onClose={() => setSelectedWork(null)} />

      {/* Persistent Floating Audio Player */}
      <AudioPlayer />
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
