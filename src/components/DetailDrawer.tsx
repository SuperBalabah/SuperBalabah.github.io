import React from 'react';
import { WorkItem } from '../types/work';
import { useAudio } from '../context/AudioContext';
import { X, Play, Pause, ExternalLink, Github, Clock, Sparkles, Tag, Calendar, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailDrawerProps {
  item: WorkItem | null;
  onClose: () => void;
}

const renderMarkdown = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-outside ml-5 space-y-1.5 my-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  const parseInline = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-[var(--text-primary)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4
          key={`h4-${idx}`}
          className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] mt-5 mb-2 flex items-center gap-1.5"
        >
          {trimmed.slice(4)}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h3
          key={`h3-${idx}`}
          className="font-serif font-bold text-lg sm:text-xl text-[var(--text-primary)] mt-6 mb-2.5"
        >
          {trimmed.slice(3)}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(
        <li key={`li-${idx}`} className="leading-relaxed">
          {parseInline(trimmed.slice(2))}
        </li>
      );
    } else if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote
          key={`bq-${idx}`}
          className="border-l-2 border-[var(--accent-teal)] bg-[var(--bg-primary)]/50 px-3.5 py-2 my-2 text-xs italic text-[var(--text-muted)] rounded-r"
        >
          {parseInline(trimmed.slice(2))}
        </blockquote>
      );
    } else {
      flushList();
      elements.push(
        <p key={`p-${idx}`} className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed my-2 font-light">
          {parseInline(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return elements;
};

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ item, onClose }) => {
  const { currentTrack, isPlaying, playTrack } = useAudio();

  // 1. Isolate scroll and pause Lenis smooth scrolling when drawer is open
  React.useEffect(() => {
    if (item) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.stop();
      }
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (lenis) {
          lenis.start();
        }
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [item, onClose]);

  const isAudioTrack = item?.category === 'original' || item?.category === 'cover' || !!item?.audioUrl;
  const isCurrentlyPlaying = item && currentTrack?.id === item.id && isPlaying;

  return (
    <AnimatePresence>
      {item && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        >
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
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full bg-[var(--bg-secondary)] border-l border-[var(--glass-border)] shadow-2xl p-6 sm:p-8 overflow-y-auto overscroll-contain z-10 flex flex-col justify-between"
          >
            <div className="flex-1">
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

            {/* Visual Preview Banner */}
            {item.imageUrl && (
              <div className="relative mb-6 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-lg group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto max-h-80 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/70 via-transparent to-transparent pointer-events-none" />
                {item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-black/75 backdrop-blur-md text-[#f0ede6] hover:bg-black/90 transition border border-white/10 flex items-center gap-1.5 shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Interactive 3D Demo
                  </a>
                )}
              </div>
            )}

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

            {/* Main Story Content with Full Markdown Typography */}
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-2 font-sans">
              {renderMarkdown(item.description || item.summary)}
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
          <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex items-center justify-between shrink-0">
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
      )}
    </AnimatePresence>
  );
};
