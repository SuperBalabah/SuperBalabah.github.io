import React from 'react';
import { WorkItem } from '../types/work';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Code, Music, Disc, Activity, Clock, Sparkles, ArrowUpRight } from 'lucide-react';
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
      case 'code': return <Code className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />;
      case 'original': return <Music className="w-3.5 h-3.5 text-[var(--accent-purple)]" />;
      case 'cover': return <Disc className="w-3.5 h-3.5 text-[var(--accent-rose)]" />;
      case 'public_health': return <Activity className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />;
      default: return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(item)}
      className={`group relative matte-card p-6 flex flex-col justify-between cursor-pointer border border-[var(--border-color)] transition-all duration-300 ${
        item.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div>
        {/* Top Header: Category Tag & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]">
              {categoryIcon()}
            </span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
              {item.category.replace('_', ' ')}
            </span>
          </div>

          {item.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-[var(--accent-gold)] border border-amber-500/20">
              <Sparkles className="w-3 h-3" /> FEATURED
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors flex items-center justify-between gap-2 ${
          item.featured ? 'sm:text-xl' : ''
        }`}>
          <span>{item.title}</span>
          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-teal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
        </h3>

        {/* Summary */}
        <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-light">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-color)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Duration / Play Button */}
      <div className="mt-6 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
        {item.learningDuration ? (
          <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--accent-teal)]">
            <Clock className="w-3 h-3" />
            <span>{item.learningDuration}</span>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-[var(--text-muted)]">{item.date}</span>
        )}

        {isAudioTrack && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              playTrack(item);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition ${
              isCurrentlyPlaying
                ? 'bg-[var(--accent-teal)] text-slate-950 font-bold'
                : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--accent-teal)]'
            }`}
            title={isCurrentlyPlaying ? 'Pause' : 'Play Audio'}
          >
            {isCurrentlyPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" /> PAUSE
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" /> PLAY
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};
