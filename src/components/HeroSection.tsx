import React from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Code, Music, Disc, Activity, ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="about" className="space-y-8 scroll-mt-24">
      {/* Section Label */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-teal)] uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)]" />
        01 / ABOUT & HIGHLIGHTS
      </div>

      {/* Bio Statement */}
      <div className="space-y-4">
        <p className="text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed">
          {PROFILE_DATA.bio}
        </p>
      </div>

      {/* Executive Summary Cards - Japanese Minimalist Matte */}
      <div className="space-y-3">
        {PROFILE_DATA.executiveSummary.map((item, idx) => (
          <div
            key={idx}
            className="matte-card p-4 flex items-start gap-4 border border-[var(--border-color)]"
          >
            <span className="text-xs font-mono text-[var(--accent-gold)] mt-0.5">
              0{idx + 1}
            </span>
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {item}
            </div>
          </div>
        ))}
      </div>

      {/* Quantitative Stats Vault */}
      <div className="matte-card p-6 border border-[var(--border-color)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            STATISTICS & ARCHIVES
          </h3>
          <span className="text-xs font-mono text-[var(--accent-teal)] flex items-center gap-1">
            Live Vault <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-center">
            <div className="flex items-center justify-center gap-1.5 text-[var(--accent-cyan)] mb-1">
              <Code className="w-4 h-4" />
              <span className="text-xs font-mono">Code</span>
            </div>
            <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {PROFILE_DATA.stats.codeCount}+
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">Self-Taught Apps</p>
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-center">
            <div className="flex items-center justify-center gap-1.5 text-[var(--accent-purple)] mb-1">
              <Music className="w-4 h-4" />
              <span className="text-xs font-mono">Originals</span>
            </div>
            <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {PROFILE_DATA.stats.originalCount}
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">Tracks Composed</p>
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-center">
            <div className="flex items-center justify-center gap-1.5 text-[var(--accent-gold)] mb-1">
              <Disc className="w-4 h-4" />
              <span className="text-xs font-mono">Covers</span>
            </div>
            <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {PROFILE_DATA.stats.coverCount}+
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">Arranged & Mixed</p>
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-center">
            <div className="flex items-center justify-center gap-1.5 text-[var(--accent-emerald)] mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-mono">Research</span>
            </div>
            <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {PROFILE_DATA.stats.researchCount}
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">Public Health Case Tools</p>
          </div>
        </div>
      </div>
    </section>
  );
};
