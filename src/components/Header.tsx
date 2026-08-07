import React, { useState, useEffect } from 'react';
import { Sun, Moon, Compass, Layers } from 'lucide-react';

interface HeaderProps {
  viewMode: 'ascent' | 'classic';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ viewMode, onToggleViewMode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (viewMode === 'ascent') {
      // Force dark mode strictly in Ascent Mode
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, viewMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      {/* Unified Floating Glass Pod */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-[#0d0f14]/80 backdrop-blur-xl shadow-2xl">
        {/* Mode Toggle Button */}
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/5 cursor-pointer"
          title={`Switch to ${viewMode === 'ascent' ? 'Classic Layout' : 'Ascent Mode'}`}
        >
          {viewMode === 'ascent' ? (
            <>
              <Layers className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>CLASSIC LAYOUT</span>
            </>
          ) : (
            <>
              <Compass className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
              <span>ASCENT MODE</span>
            </>
          )}
        </button>

        {/* Theme Toggle Button (Only in Classic Mode) */}
        {viewMode === 'classic' && (
          <>
            <span className="w-[1px] h-4 bg-white/10" />

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-sky-400" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
