import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-md hover:border-[var(--accent-teal)] transition-all shadow-md"
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-[var(--accent-gold)]" />
        ) : (
          <Moon className="w-4 h-4 text-sky-600" />
        )}
      </button>
    </div>
  );
};
