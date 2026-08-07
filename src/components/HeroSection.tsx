import React from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Code, Music, Disc, Activity, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Headline & Executive Summary */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              ABOUT & HIGHLIGHTS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
              {PROFILE_DATA.tagline}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-[var(--text-secondary)] font-light max-w-3xl leading-relaxed"
          >
            {PROFILE_DATA.bio}
          </motion.p>

          {/* 3 Executive Bullet Points */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 pt-2"
          >
            {PROFILE_DATA.executiveSummary.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 flex items-start gap-3 border border-[var(--border-color)] hover:border-[var(--border-glow)]"
              >
                <div className="text-sm font-sans text-[var(--text-primary)] leading-normal">
                  {item}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Quantitative Polymath Stats & Curiosity Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-4 glass-panel p-6 space-y-6 border border-[var(--border-glow)] bg-[var(--glass-bg)]"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              CURIOSITY VAULT STATS
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              Active Vault <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-sky-400 mb-2">
                <Code className="w-4 h-4" />
                <span className="text-xs font-mono">Code</span>
              </div>
              <p className="text-3xl font-bold font-serif text-[var(--text-primary)]">
                {PROFILE_DATA.stats.codeCount}+
              </p>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">Self-Taught Apps</p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Music className="w-4 h-4" />
                <span className="text-xs font-mono">Originals</span>
              </div>
              <p className="text-3xl font-bold font-serif text-[var(--text-primary)]">
                {PROFILE_DATA.stats.originalCount}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">Tracks Composed</p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Disc className="w-4 h-4" />
                <span className="text-xs font-mono">Covers</span>
              </div>
              <p className="text-3xl font-bold font-serif text-[var(--text-primary)]">
                {PROFILE_DATA.stats.coverCount}+
              </p>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">Arranged & Mixed</p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-mono">Research</span>
              </div>
              <p className="text-3xl font-bold font-serif text-[var(--text-primary)]">
                {PROFILE_DATA.stats.researchCount}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">Public Health Logs</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 font-mono text-center">
            💡 Tip: Click any card below to open interactive works & audio.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
