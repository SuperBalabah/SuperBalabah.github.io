import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipForward, SkipBack, Music, X, Minus, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  isDrawerOpen?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isDrawerOpen = false }) => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, stopAndClose } = useAudio();
  const [isManualMinimized, setIsManualMinimized] = useState<boolean>(false);

  if (!currentTrack) return null;

  // Auto-minimize when detail drawer is open to keep "Live Demo" and "Source Code" unobstructed
  const isMinimized = isManualMinimized || isDrawerOpen;

  return (
    <AnimatePresence mode="wait">
      {isMinimized ? (
        /* 🎵 Compact Floating Mini Pill (Docked at Bottom-Left to Keep Right Drawer 100% Free) */
        <motion.div
          key="minimized-pill"
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#161920]/95 backdrop-blur-xl border border-white/15 shadow-xl text-xs font-mono"
        >
          {/* Track icon */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: currentTrack.accentColor || 'var(--accent-purple)' }}
          >
            <Music className="w-3.5 h-3.5 text-black" />
          </div>

          {/* Track Title */}
          <span className="font-sans font-medium text-slate-200 max-w-[120px] sm:max-w-[160px] truncate">
            {currentTrack.title}
          </span>

          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title={isPlaying ? "暫停 (Pause)" : "播放 (Play)"}
          >
            {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
          </button>

          {/* Expand Button (disabled if drawer is forcing minimize) */}
          {!isDrawerOpen && (
            <button
              onClick={() => setIsManualMinimized(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              title="展開播放器 (Expand)"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={stopAndClose}
            className="p-1.5 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition cursor-pointer"
            title="關閉播放器 (Close)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ) : (
        /* 🎧 Full Floating Minimalist Audio Console */
        <motion.div
          key="expanded-player"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl"
        >
          <div className="p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 sm:gap-4 border border-white/15 bg-[#161920]/95 backdrop-blur-xl shadow-xl">
            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: currentTrack.accentColor || 'var(--accent-purple)' }}
              >
                <Music className="w-5 h-5 text-black" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate text-[#f0ede6]">
                  {currentTrack.title}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {currentTrack.category.toUpperCase()} • {currentTrack.audioDuration || 'Audio Track'}
                </p>
              </div>
            </div>

            {/* Animated Wave Indicator when playing */}
            {isPlaying && (
              <div className="hidden sm:flex items-end gap-1 h-5 px-1 shrink-0">
                <div className="wave-bar" />
                <div className="wave-bar" />
                <div className="wave-bar" />
                <div className="wave-bar" />
                <div className="wave-bar" />
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={prevTrack}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="上一首 (Previous Track)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2.5 sm:p-3 rounded-full bg-[#f0ede6] text-[#0f1115] hover:scale-105 transition cursor-pointer shadow-md"
                title={isPlaying ? "暫停 (Pause)" : "播放 (Play)"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={nextTrack}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="下一首 (Next Track)"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Minimize Button */}
              <button
                onClick={() => setIsManualMinimized(true)}
                className="p-2 ml-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="最小化播放器 (Minimize)"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={stopAndClose}
                className="p-2 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                title="關閉播放器 (Close)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
