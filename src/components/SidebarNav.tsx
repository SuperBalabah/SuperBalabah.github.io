import React from 'react';
import { Github, Music, Mail, Stethoscope, Activity } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

interface SidebarNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'works', label: 'PROJECTS & CODE' },
    { id: 'research', label: 'PUBLIC HEALTH & RESEARCH' },
    { id: 'music', label: 'MUSIC & AUDIO' },
  ];

  return (
    <header className="lg:fixed lg:top-0 lg:left-0 lg:flex lg:h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24 px-6 sm:px-12 lg:px-16 z-20">
      <div>
        {/* Name & Primary Headline */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
          <span className="text-xs font-mono text-[var(--accent-teal)] uppercase tracking-wider">
            NTU School of Medicine
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          <a href="/">{PROFILE_DATA.name}</a>
        </h1>

        <h2 className="mt-3 text-lg sm:text-xl font-medium text-[var(--accent-gold)] tracking-wide">
          {PROFILE_DATA.title}
        </h2>

        <p className="mt-4 max-w-sm text-sm text-[var(--text-secondary)] leading-relaxed">
          {PROFILE_DATA.tagline}
        </p>

        {/* Navigation Menu (Brittany Chiang Line Indicator Style) */}
        <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`group flex items-center py-2 transition-all ${
                      isActive ? 'nav-item-active' : ''
                    }`}
                  >
                    <span className="nav-line mr-4" />
                    <span className="nav-text text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social Links Row at Bottom Left (Icon Style from Screenshot) */}
      <div className="mt-12 lg:mt-0 flex items-center gap-5">
        <a
          href={PROFILE_DATA.github}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors p-2 -m-2 rounded-lg hover:bg-white/5"
          aria-label="GitHub Profile"
          title="GitHub Profile"
        >
          <Github className="w-5 h-5" />
        </a>

        <a
          href={PROFILE_DATA.soundcloud}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors p-2 -m-2 rounded-lg hover:bg-white/5"
          aria-label="SoundCloud Audio"
          title="SoundCloud Audio"
        >
          <Music className="w-5 h-5" />
        </a>

        <a
          href={`mailto:${PROFILE_DATA.email}`}
          className="text-[var(--text-muted)] hover:text-[var(--accent-rose)] transition-colors p-2 -m-2 rounded-lg hover:bg-white/5"
          aria-label="Send Email"
          title="Email Direct"
        >
          <Mail className="w-5 h-5" />
        </a>

        <a
          href="https://SuperBalabah.github.io/preeclampsia-report"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent-emerald)] transition-colors p-2 -m-2 rounded-lg hover:bg-white/5"
          aria-label="Clinical Research"
          title="Clinical Research Platform"
        >
          <Stethoscope className="w-5 h-5" />
        </a>

        <a
          href="https://SuperBalabah.github.io/news_radar_dashboard/"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent-purple)] transition-colors p-2 -m-2 rounded-lg hover:bg-white/5"
          aria-label="News Radar PWA"
          title="News Radar PWA App"
        >
          <Activity className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};
