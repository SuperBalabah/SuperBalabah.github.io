import React from 'react';
import { WorkItem } from '../types/work';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Code, Music, Disc, Activity, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface WorkCardProps {
  item: WorkItem;
  onSelect: (item: WorkItem) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ item, onSelect }) => {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const isAudioTrack = item.category === 'original' || item.category === 'cover' || !!item.audioUrl;
  const isCurrentlyPlaying = currentTrack?.id === item.id && isPlaying;

  const categoryIcon = () => {
    switch (item.category) {
      case 'code': return <Code className="w-3.5 h-3.5 text-sky-400" />;
      case 'original': return <Music className="w-3.5 h-3.5 text-purple-400" />;
      case 'cover': return <Disc className="w-3.5 h-3.5 text-rose-400" />;
      case 'public_health': return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
      default: return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(item)}
      className={`group relative glass-panel p-6 flex flex-col justify-between cursor-pointer border border-[var(--border-color)] hover:border-[var(--border-glow)] transition-all duration-300 ${
        item.featured ? 'sm:col-span-2 bg-[var(--bg-card-hover)]' : ''
      }`}
    >
      {/* Top Bar: Category Icon + Featured Tag + Learning Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]">
              {categoryIcon()}
            </span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
              {item.category}
            </span>
          </div>

          {item.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> FEATURED
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-serif font-bold text-xl text-[var(--text-primary)] group-hover:text-amber-400 transition-colors ${
          item.featured ? 'sm:text-2xl' : ''
        }`}>
          {item.title}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-color)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Metadata / Audio Button */}
      <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
        {item.learningDuration ? (
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
            <Clock className="w-3 h-3" />
            <span>{item.learningDuration}</span>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-[var(--text-muted)]">{item.date}</span>
        )}

        <div className="flex items-center gap-2">
          {isAudioTrack && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playTrack(item);
              }}
              className={`p-2 rounded-full transition ${
                isCurrentlyPlaying
                  ? 'bg-amber-400 text-black scale-110'
                  : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]'
              }`}
              title={isCurrentlyPlaying ? 'Pause' : 'Play Audio'}
            >
              {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>
          )}

          <span className="p-2 rounded-full text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
