import React, { useState, useEffect, useRef } from 'react';
import { WorkItem } from '../types/work';
import { WORKS_DATA } from '../data/works';
import { PROFILE_DATA } from '../data/profile';
import { useAudio } from '../context/AudioContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
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
}

export const AscentMode: React.FC<AscentModeProps> = ({ onSelectWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });

  // Transform progress to altitude (0m to 3,842m - Yushan Peak Height)
  const altitude = useTransform(smoothProgress, [0, 1], [0, 3842]);
  const [currentAltitude, setCurrentAltitude] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = altitude.on('change', (latest) => {
      setCurrentAltitude(Math.round(latest));
    });
    return () => unsubscribe();
  }, [altitude]);

  // Parallax transform calculations
  const bgMistY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const midMountainY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);

  // Categorized works
  const publicHealthWorks = WORKS_DATA.filter((w) => w.category === 'public_health');
  const codeWorks = WORKS_DATA.filter((w) => w.category === 'code');
  const originalMusicWorks = WORKS_DATA.filter((w) => w.category === 'original');
  const coverWorks = WORKS_DATA.filter((w) => w.category === 'cover').slice(0, 6);

  const getZoneLabel = (alt: number) => {
    if (alt < 400) return 'VALLEY BASE';
    if (alt < 1200) return 'BASECAMP // VAULT';
    if (alt < 2000) return 'CLINICAL RIDGE';
    if (alt < 2800) return 'TECH HIGH PASS';
    if (alt < 3600) return 'AUDIO PLATEAU';
    return 'THE PEAK';
  };

  return (
    <div ref={containerRef} className="relative min-h-[550vh] bg-[#07090d] text-slate-100 overflow-hidden font-sans selection:bg-[var(--accent-teal)] selection:text-slate-950">
      
      {/* Dynamic Parallax Misty Background (Gris / Journey Zen Aesthetic) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Sky Ambient Gradient Shift */}
        <motion.div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background:
              currentAltitude > 3400
                ? 'radial-gradient(ellipse at 50% 20%, rgba(184, 159, 116, 0.12), rgba(7, 9, 13, 0.95) 75%)'
                : currentAltitude > 1800
                ? 'radial-gradient(ellipse at 50% 30%, rgba(56, 189, 248, 0.06), rgba(7, 9, 13, 0.95) 80%)'
                : 'radial-gradient(ellipse at 50% 40%, rgba(20, 184, 166, 0.05), rgba(7, 9, 13, 0.95) 85%)',
          }}
        />

        {/* Layer 1: Far Mountain Silhouettes (Organic Waves) */}
        <motion.svg
          style={{ y: bgMistY }}
          className="absolute bottom-0 w-full h-[70vh] opacity-25 text-[#101420]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
        >
          <path
            fill="currentColor"
            d="M0,320 C240,240 480,380 720,280 C960,180 1200,320 1440,220 L1440,600 L0,600 Z"
          />
        </motion.svg>

        {/* Layer 2: Midground Mountain Ridge with Misty Fill */}
        <motion.svg
          style={{ y: midMountainY }}
          className="absolute bottom-0 w-full h-[50vh] opacity-40 text-[#161c2c]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 500"
        >
          <path
            fill="currentColor"
            d="M0,250 C360,150 640,320 980,180 C1200,100 1350,220 1440,160 L1440,500 L0,500 Z"
          />
        </motion.svg>

        {/* Layer 3: Floating Ambient Dust / Particles (Zen Mist) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:48px_48px] opacity-60" />
      </div>

      {/* Floating Left HUD Elevation Status (Minimalist Zen Style) */}
      <div className="fixed top-6 left-6 z-40 hidden sm:flex items-center gap-3 bg-[#0f131a]/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-[var(--accent-teal)] uppercase">
          {getZoneLabel(currentAltitude)}
        </span>
        <span className="text-slate-600">/</span>
        <span className="text-[11px] font-mono text-slate-400">
          ALT {currentAltitude.toLocaleString()} M
        </span>
      </div>

      {/* Right Side Ascent Meter HUD */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-[#0f131a]/80 backdrop-blur-xl px-3.5 py-2.5 rounded-2xl border border-white/10 text-right shadow-2xl">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">ELEVATION</p>
          <p className="text-2xl font-bold font-mono text-[var(--accent-teal)] tracking-tight">
            {currentAltitude.toLocaleString()} <span className="text-xs font-normal text-slate-500">M</span>
          </p>
          <p className="text-[9px] font-mono text-slate-500 mt-0.5">SUMMIT 3,842 M</p>
        </div>

        {/* Minimalist Gauge Line */}
        <div className="w-1 h-44 bg-slate-800/60 rounded-full relative overflow-hidden border border-white/5">
          <motion.div
            className="w-full bg-gradient-to-t from-[var(--accent-teal)] to-[var(--accent-gold)] rounded-full absolute bottom-0"
            style={{ height: `${(currentAltitude / 3842) * 100}%` }}
          />
        </div>
      </div>

      {/* Subtle Side Trail Line (Positioned cleanly on the left side, avoiding text collision) */}
      <div className="absolute left-8 sm:left-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-teal-500/10 via-teal-500/30 to-amber-500/40 pointer-events-none z-10 hidden md:block">
        {/* Floating Glowing Traveler Orb on the line */}
        <motion.div
          className="w-2.5 h-2.5 -left-0.75 rounded-full bg-[var(--accent-teal)] shadow-[0_0_12px_#14b8a6] relative"
          style={{ top: `${(currentAltitude / 3842) * 100}%` }}
        />
      </div>

      {/* Main Content Sections (The Journey) */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 py-24 space-y-56">

        {/* =========================================================================
           SCENE 1: VALLEY BASE (0m)
           ========================================================================= */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              ELEVATION 0M · VALLEY BASE
            </div>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-slate-100">
              Ascent.
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-[var(--accent-gold)] tracking-wide">
              "Meet me at the peak."
            </p>

            <p className="text-sm font-mono text-slate-400 max-w-md mx-auto leading-relaxed pt-2">
              An interactive climbing journey exploring medicine, code, audio engineering, and outdoor endurance.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="pt-16 text-slate-500 flex flex-col items-center gap-2"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Scroll to Begin Ascent</span>
            <ChevronDown className="w-4 h-4 text-[var(--accent-teal)]" />
          </motion.div>
        </section>

        {/* =========================================================================
           SCENE 2: BASECAMP // CURIOSITY VAULT (800m)
           ========================================================================= */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
              800m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 01</span>
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Basecamp: Identity & Vault</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="matte-card p-6 border border-white/10 bg-[#0f131a]/80 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
                <h3 className="text-base font-bold text-slate-100">{PROFILE_DATA.name}</h3>
                <span className="text-xs font-mono text-[var(--accent-teal)]">/ NTU MED</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {PROFILE_DATA.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#0f131a]/60 border border-white/10 text-center">
                <Code className="w-4 h-4 text-sky-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.codeCount}+</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Self-Taught Apps</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f131a]/60 border border-white/10 text-center">
                <Music className="w-4 h-4 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.originalCount}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Original Music</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f131a]/60 border border-white/10 text-center">
                <Disc className="w-4 h-4 text-rose-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.coverCount}+</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Arranged Covers</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f131a]/60 border border-white/10 text-center">
                <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-slate-100">{PROFILE_DATA.stats.researchCount}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Clinical Tools</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
           SCENE 3: CLINICAL RIDGE (1500m)
           ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              1500m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 02</span>
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Clinical Ridge: Public Health</h2>
            </div>
          </div>

          <div className="space-y-4">
            {publicHealthWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card p-6 border border-white/10 bg-[#0f131a]/80 backdrop-blur-md hover:border-emerald-500/40 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {work.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{work.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light leading-relaxed">{work.summary}</p>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                  <span>View Case Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           SCENE 4: TECH HIGH PASS (2400m)
           ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              2400m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 03</span>
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Tech High Pass: Code Systems</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codeWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card p-5 border border-white/10 bg-[#0f131a]/80 backdrop-blur-md hover:border-sky-500/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {work.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{work.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light leading-relaxed">{work.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
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
           SCENE 5: AUDIO PLATEAU (3200m)
           ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              3200m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 04</span>
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Audio Plateau: Compositions</h2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Original Compositions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {originalMusicWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    className="matte-card p-4 border border-white/10 bg-[#0f131a]/80 backdrop-blur-md hover:border-purple-500/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">{work.title}</h4>
                      <p className="text-[11px] text-slate-400 font-light line-clamp-1">{work.summary}</p>
                    </div>

                    <button
                      onClick={() => playTrack(work)}
                      className={`p-2.5 rounded-full transition flex-shrink-0 ${
                        isCurrentlyPlaying
                          ? 'bg-purple-500 text-slate-950 scale-105'
                          : 'bg-white/10 text-slate-200 hover:bg-purple-500 hover:text-slate-950'
                      }`}
                    >
                      {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider pt-4">Featured Guitar & Vocal Covers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {coverWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    onClick={() => playTrack(work)}
                    className="matte-card p-3 border border-white/10 bg-[#0f131a]/60 hover:border-rose-500/40 cursor-pointer transition-all flex items-center justify-between"
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
           SCENE 6: THE PEAK (3842m - SUMMIT)
           ========================================================================= */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 pt-12 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-teal-400 to-sky-400 p-[2px] mx-auto shadow-2xl">
              <div className="w-full h-full bg-[#0d0f14] rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-[var(--accent-gold)]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
              SUMMIT ELEVATION 3,842M · YUSHAN PEAK
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-teal-200 to-sky-200">
              "You've reached the peak."
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md mx-auto">
              Thank you for climbing this ascent. Let's connect and build meaningful public health innovations, software systems, and musical projects.
            </p>

            {/* Summit Direct Contact Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono bg-[var(--accent-teal)] text-slate-950 font-bold hover:bg-teal-300 transition-all shadow-lg"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Direct Email</span>
              </a>

              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-slate-100"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_DATA.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-amber-300"
              >
                <Music className="w-3.5 h-3.5" />
                <span>SoundCloud</span>
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};
