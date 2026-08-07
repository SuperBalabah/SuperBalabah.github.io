import React from 'react';
import { WorkItem } from '../types/work';
import { useAudio } from '../context/AudioContext';
import { X, Play, Pause, ExternalLink, Github, Clock, Sparkles, Tag, Calendar, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailDrawerProps {
  item: WorkItem | null;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ item, onClose }) => {
  const { currentTrack, isPlaying, playTrack } = useAudio();

  if (!item) return null;

  const isAudioTrack = item.category === 'original' || item.category === 'cover' || !!item.audioUrl;
  const isCurrentlyPlaying = currentTrack?.id === item.id && isPlaying;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Sliding Side Drawer */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl h-full bg-[var(--bg-secondary)] border-l border-[var(--glass-border)] shadow-2xl p-6 sm:p-8 overflow-y-auto z-10 flex flex-col justify-between"
        >
          <div>
            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Sparkles className="w-3 h-3" /> FEATURED
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Metadata */}
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[var(--text-primary)] leading-tight mb-4">
              {item.title}
            </h2>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-muted)] mb-6 pb-6 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{item.date}</span>
              </div>
              {item.learningDuration && (
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.learningDuration}</span>
                </div>
              )}
              {item.metrics && (
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{item.metrics}</span>
                </div>
              )}
            </div>

            {/* Audio Play Trigger Banner */}
            {isAudioTrack && (
              <div className="glass-panel p-4 mb-6 flex items-center justify-between border border-[var(--border-glow)] bg-[var(--bg-card-hover)]">
                <div>
                  <p className="font-serif text-sm font-semibold text-[var(--text-primary)]">Audio Recording Available</p>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">Duration: {item.audioDuration || 'Audio Stream'}</p>
                </div>
                <button
                  onClick={() => playTrack(item)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition ${
                    isCurrentlyPlaying
                      ? 'bg-amber-400 text-black shadow-lg scale-105'
                      : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-105'
                  }`}
                >
                  {isCurrentlyPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Listen Now
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Main Story Content */}
            <div className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
              <div className="whitespace-pre-line font-sans font-light">
                {item.description || item.summary}
              </div>
            </div>

            {/* Tech Stack / Tags */}
            {item.techStack && (
              <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
                <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Links */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--text-muted)]">Portfolio Entry #{item.id}</span>
            <div className="flex items-center gap-3">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-primary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] transition border border-[var(--border-color)]"
                >
                  <Github className="w-3.5 h-3.5" /> Source Code
                </a>
              )}
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};
