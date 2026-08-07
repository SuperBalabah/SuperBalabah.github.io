import React, { useState, useEffect, useRef } from 'react';
import { WorkItem } from '../types/work';
import { WORKS_DATA } from '../data/works';
import { PROFILE_DATA } from '../data/profile';
import { useAudio } from '../context/AudioContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Compass,
  Code,
  Music,
  Disc,
  Activity,
  Play,
  Pause,
  ExternalLink,
  Github,
  Mail,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';

interface AscentModeProps {
  onSelectWork: (item: WorkItem) => void;
  onSwitchMode: () => void;
}

export const AscentMode: React.FC<AscentModeProps> = ({ onSelectWork, onSwitchMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Transform progress to altitude (0m to 3842m - Yushan Peak Height)
  const altitude = useTransform(smoothProgress, [0, 1], [0, 3842]);
  const [currentAltitude, setCurrentAltitude] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = altitude.on('change', (latest) => {
      setCurrentAltitude(Math.round(latest));
    });
    return () => unsubscribe();
  }, [altitude]);

  // Categorized works for waypoints
  const publicHealthWorks = WORKS_DATA.filter((w) => w.category === 'public_health');
  const codeWorks = WORKS_DATA.filter((w) => w.category === 'code');
  const originalMusicWorks = WORKS_DATA.filter((w) => w.category === 'original');
  const coverWorks = WORKS_DATA.filter((w) => w.category === 'cover').slice(0, 6); // Top 6 covers

  // Zone status text
  const getZoneLabel = (alt: number) => {
    if (alt < 400) return 'VALLEY BASE (0m)';
    if (alt < 1200) return 'CURIOSITY VAULT (800m)';
    if (alt < 2000) return 'CLINICAL RIDGE (1500m)';
    if (alt < 2800) return 'TECH HIGH PASS (2400m)';
    if (alt < 3600) return 'AUDIO PLATEAU (3200m)';
    return 'THE PEAK (3842m)';
  };

  return (
    <div ref={containerRef} className="relative min-h-[500vh] bg-[#090b0e] text-slate-100 overflow-hidden font-sans">
      {/* Dynamic Parallax Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Parallax SVG Mountains (Far Depth) */}
        <svg className="absolute bottom-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <path
            fill="#141824"
            d="M0,400 L200,250 L400,450 L650,200 L900,500 L1150,180 L1440,350 L1440,800 L0,800 Z"
          />
          <path
            fill="#1b2234"
            d="M0,550 L300,380 L600,600 L850,320 L1100,520 L1440,300 L1440,800 L0,800 Z"
          />
        </svg>

        {/* Ambient Fog Layer */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background:
              currentAltitude > 3500
                ? 'radial-gradient(circle at 50% 30%, rgba(184, 159, 116, 0.15), transparent 70%)'
                : 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.05), transparent 80%)',
          }}
        />
      </div>

      {/* Floating Summit HUD Controls (Fixed Header) */}
      <nav className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 bg-[#121620]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-[var(--accent-teal)] uppercase">
            ASCENT MODE
          </span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs font-mono text-slate-300">
            {getZoneLabel(currentAltitude)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher Button */}
          <button
            onClick={onSwitchMode}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[var(--accent-teal)] transition-all shadow-lg text-slate-200"
            title="Switch to Classic Grid Mode"
          >
            <Compass className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Switch to Classic Layout</span>
          </button>
        </div>
      </nav>

      {/* Fixed Altitude Gauge Bar (Right Side HUD) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-[#121620]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-right shadow-xl">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ELEVATION</p>
          <p className="text-2xl font-bold font-mono text-[var(--accent-teal)] tracking-tight">
            {currentAltitude.toLocaleString()} <span className="text-xs font-normal text-slate-400">M</span>
          </p>
          <p className="text-[10px] font-mono text-slate-500 mt-0.5">PEAK: 3,842 M</p>
        </div>

        {/* Altitude Progress Line */}
        <div className="w-1.5 h-48 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 relative">
          <motion.div
            className="w-full bg-gradient-to-t from-[var(--accent-teal)] to-[var(--accent-gold)] rounded-full absolute bottom-0"
            style={{ height: `${(currentAltitude / 3842) * 100}%` }}
          />
        </div>
      </div>

      {/* Central Glowing Ascent Path (SVG Dashed Path) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 pointer-events-none z-10 hidden sm:block">
        <div className="w-full h-full bg-gradient-to-b from-teal-500/20 via-sky-500/20 to-amber-500/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 py-24 space-y-48">
        
        {/* =========================================================================
           VALLEY BASE (0m)
           ========================================================================= */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              ELEVATION 0M · VALLEY BASE
            </span>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500">
              Ascent.
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-[var(--accent-gold)] max-w-xl mx-auto">
              "Meet me at the peak."
            </p>

            <p className="text-sm font-mono text-slate-400 max-w-md mx-auto pt-2 leading-relaxed">
              An interactive climbing journey exploring the intersection of medicine, code, audio, and outdoor endurance.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="pt-12 text-slate-500 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Scroll to Begin Ascent</span>
            <ChevronDown className="w-5 h-5 text-[var(--accent-teal)]" />
          </motion.div>
        </section>

        {/* =========================================================================
           BASECAMP: CURIOSITY VAULT (800m)
           ========================================================================= */}
        <section className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono text-xs">
              800m
            </div>
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">WAYPOINT 01</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Basecamp: Curiosity Vault</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="matte-card p-6 border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
                {PROFILE_DATA.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {PROFILE_DATA.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <Code className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                <p className="text-3xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.codeCount}+</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Self-Taught Apps</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <Music className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <p className="text-3xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.originalCount}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Original Music</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <Disc className="w-5 h-5 text-rose-400 mx-auto mb-2" />
                <p className="text-3xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.coverCount}+</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Arranged Covers</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <Activity className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-3xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.researchCount}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">Clinical Case Tools</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
           CLINICAL RIDGE (1500m)
           ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs">
              1500m
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">WAYPOINT 02</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Clinical Ridge: Public Health & Medicine</h2>
            </div>
          </div>

          <div className="space-y-4">
            {publicHealthWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card p-6 border border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {work.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{work.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light">{work.summary}</p>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                  <span>Explore Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           TECH HIGH PASS (2400m)
           ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs">
              2400m
            </div>
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">WAYPOINT 03</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Tech High Pass: Code & Systems</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codeWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card p-5 border border-white/10 hover:border-sky-500/50 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {work.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{work.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light">{work.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{work.techStack?.[0] || 'TypeScript'}</span>
                  <span className="text-sky-400 group-hover:underline flex items-center gap-1">
                    Details <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           AUDIO PLATEAU (3200m)
           ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-xs">
              3200m
            </div>
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">WAYPOINT 04</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Audio Plateau: Original Compositions & Covers</h2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Original Compositions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {originalMusicWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    className="matte-card p-5 border border-white/10 hover:border-purple-500/50 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-100">{work.title}</h4>
                      <p className="text-xs text-slate-400 font-light line-clamp-1">{work.summary}</p>
                    </div>

                    <button
                      onClick={() => playTrack(work)}
                      className={`p-3 rounded-full transition flex-shrink-0 ${
                        isCurrentlyPlaying
                          ? 'bg-purple-500 text-slate-950 scale-110'
                          : 'bg-white/10 text-slate-200 hover:bg-purple-500 hover:text-slate-950'
                      }`}
                    >
                      {isCurrentlyPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider pt-4">Featured Vocal & Guitar Cover Sessions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {coverWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    onClick={() => playTrack(work)}
                    className="matte-card p-3 border border-white/10 hover:border-rose-500/40 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-200 line-clamp-1">{work.title}</h5>
                      <span className="text-[10px] font-mono text-slate-500">{work.audioDuration}</span>
                    </div>

                    <div className={`p-1.5 rounded-full ${isCurrentlyPlaying ? 'text-rose-400' : 'text-slate-500'}`}>
                      {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
           THE PEAK (3842m - SUMMIT)
           ========================================================================= */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 pt-12 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-teal-400 p-[2px] mx-auto shadow-2xl">
              <div className="w-full h-full bg-[#0d0f14] rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-[var(--accent-gold)] animate-bounce" />
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
              SUMMIT ELEVATION 3,842M · YUSHAN PEAK
            </span>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-teal-200 to-sky-200">
              "You've reached the peak."
            </h2>

            <p className="text-base text-slate-300 font-light leading-relaxed">
              Thank you for embarking on this ascent journey. Let's connect and build meaningful public health innovations, software systems, and musical projects together.
            </p>

            {/* Summit Direct Contact Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono bg-[var(--accent-teal)] text-slate-950 font-bold hover:bg-teal-300 transition-all shadow-lg"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email</span>
              </a>

              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-slate-100"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={PROFILE_DATA.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-amber-300"
              >
                <Music className="w-4 h-4" />
                <span>SoundCloud Audio</span>
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};
