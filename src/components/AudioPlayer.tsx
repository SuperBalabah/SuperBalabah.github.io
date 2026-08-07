import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipForward, SkipBack, Music, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, playTrack } = useAudio();

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl"
      >
        <div className="glass-panel p-4 flex items-center justify-between gap-4 border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: currentTrack.accentColor || 'var(--accent-purple)' }}
            >
              <Music className="w-5 h-5 text-black" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate text-[var(--text-primary)] font-serif">
                {currentTrack.title}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {currentTrack.category.toUpperCase()} • {currentTrack.audioDuration || 'Audio Track'}
              </p>
            </div>
          </div>

          {/* Animated Wave Indicator when playing */}
          {isPlaying && (
            <div className="hidden sm:flex items-end gap-1 h-5 px-2">
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevTrack}
              className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-105 transition"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => playTrack(currentTrack)}
              className="p-2 ml-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
