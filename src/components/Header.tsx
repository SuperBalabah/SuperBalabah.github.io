import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Sun, Moon, Mail, Github, Radio, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-[var(--border-color)] bg-[var(--glass-bg)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-purple-500 to-sky-400 p-[2px]">
            <div className="w-full h-full bg-[var(--bg-primary)] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg leading-tight tracking-wide text-[var(--text-primary)]">
              {PROFILE_DATA.name}
            </h1>
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              NTU MEDICINE
            </p>
          </div>
        </div>

        {/* Action Buttons: Theme + Contacts (Email, GitHub, SoundCloud) */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-card)] transition"
            title="Email"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Email</span>
          </a>

          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-card)] transition"
            title="GitHub"
          >
            <Github className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={PROFILE_DATA.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-card)] transition"
            title="SoundCloud"
          >
            <Radio className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">SoundCloud</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-card)] transition text-[var(--text-primary)]"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
