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
  Award,
  Stethoscope
} from 'lucide-react';

interface AscentModeProps {
  onSelectWork: (item: WorkItem) => void;
}

export const AscentMode: React.FC<AscentModeProps> = ({ onSelectWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Soft physics spring for smooth video scrubbing & parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 22, restDelta: 0.001 });

  // Map progress strictly to 0m -> 3,952m (Yushan Peak Height)
  const altitude = useTransform(smoothProgress, [0, 1], [0, 3952]);
  const [currentAltitude, setCurrentAltitude] = useState<number>(0);

  // Sync Video currentTime directly to scroll progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const unsubscribe = smoothProgress.on('change', (progressVal) => {
      if (video.duration && !isNaN(video.duration)) {
        // Frame-scrub video according to scroll progress
        video.currentTime = Math.min(video.duration - 0.05, Math.max(0, progressVal * video.duration));
      }
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      unsubscribe();
    };
  }, [smoothProgress]);

  useEffect(() => {
    const unsubscribe = altitude.on('change', (latest) => {
      const altVal = Math.min(3952, Math.max(0, Math.round(latest)));
      setCurrentAltitude(altVal);
    });
    return () => unsubscribe();
  }, [altitude]);

  // Categorized works
  const publicHealthWorks = WORKS_DATA.filter((w) => w.category === 'public_health');
  const codeWorks = WORKS_DATA.filter((w) => w.category === 'code');
  const originalMusicWorks = WORKS_DATA.filter((w) => w.category === 'original');
  const coverWorks = WORKS_DATA.filter((w) => w.category === 'cover').slice(0, 6);

  const getZoneLabel = (alt: number) => {
    if (alt < 300) return 'VALLEY BASE';
    if (alt < 1200) return 'BASECAMP // VAULT';
    if (alt < 2000) return 'CLINICAL RIDGE';
    if (alt < 2800) return 'TECH HIGH PASS';
    if (alt < 3600) return 'AUDIO PLATEAU';
    return 'THE PEAK';
  };

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#0d0f14] text-[#f0ede6] overflow-hidden font-sans selection:bg-[var(--accent-teal)] selection:text-slate-950">
      
      {/* SVG Physical Noise Texture Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-30 opacity-[0.03] w-full h-full">
        <filter id="zen-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zen-noise)" />
      </svg>

      {/* 🎬 60FPS Video Background Canvas (First-Person Gloved Trekking Perspective) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0d0f14]">
        <video
          ref={videoRef}
          src="/ascent-background.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-85 transition-opacity duration-700"
        />

        {/* Soft Ambient Fog Overlay to soften contrast & keep zen aesthetic */}
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background:
              currentAltitude > 3500
                ? 'radial-gradient(ellipse at 50% 30%, rgba(168, 146, 105, 0.15), rgba(13, 15, 20, 0.75) 80%)'
                : 'radial-gradient(ellipse at 50% 40%, rgba(20, 184, 166, 0.08), rgba(13, 15, 20, 0.75) 85%)',
          }}
        />
      </div>

      {/* Floating Left HUD Elevation Status */}
      <div className="fixed top-6 left-6 z-40 hidden sm:flex items-center gap-3 bg-[#121620]/85 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-[var(--accent-teal)] uppercase">
          {getZoneLabel(currentAltitude)}
        </span>
        <span className="text-slate-600">/</span>
        <span className="text-[11px] font-mono text-slate-400">
          ALT {currentAltitude.toLocaleString()} M
        </span>
      </div>

      {/* Right Side Elevation Gauge */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-[#121620]/85 backdrop-blur-xl px-3.5 py-2.5 rounded-2xl border border-white/10 text-right shadow-2xl">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">ELEVATION</p>
          <p className="text-2xl font-bold font-mono text-[var(--accent-teal)] tracking-tight">
            {currentAltitude.toLocaleString()} <span className="text-xs font-normal text-slate-500">M</span>
          </p>
          <p className="text-[9px] font-mono text-slate-500 mt-0.5">SUMMIT 3,952 M</p>
        </div>

        {/* Minimalist Gauge Line */}
        <div className="w-1 h-44 bg-slate-800/60 rounded-full relative overflow-hidden border border-white/5">
          <motion.div
            className="w-full bg-gradient-to-t from-[var(--accent-teal)] to-[var(--accent-gold)] rounded-full absolute bottom-0"
            style={{ height: `${Math.min(100, (currentAltitude / 3952) * 100)}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Content Sections */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 space-y-36">

        {/* =========================================================================
           SCENE 1: VALLEY BASE (0m) - Strictly Fitted First Screen
           ========================================================================= */}
        <section id="valley-base" className="h-screen flex flex-col items-center justify-between py-16 text-center">
          {/* Top Badge */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              ELEVATION 0M · VALLEY BASE
            </div>
          </div>

          {/* Centered Main Title */}
          <div className="space-y-5 my-auto">
            <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-[#f0ede6] drop-shadow-lg">
              Ascent.
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-[var(--accent-gold)] tracking-wide drop-shadow">
              "Meet me at the peak."
            </p>

            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mx-auto leading-relaxed pt-1 backdrop-blur-sm bg-black/20 p-3 rounded-xl border border-white/5">
              An interactive climbing journey exploring medicine, software architecture, audio engineering, and outdoor endurance.
            </p>
          </div>

          {/* Bottom Scroll Prompt (Fully Visible at 0m) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="pb-4 text-slate-400 flex flex-col items-center gap-1.5 cursor-pointer backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 bg-black/20"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">Scroll to Begin Ascent</span>
            <ChevronDown className="w-4 h-4 text-[var(--accent-teal)]" />
          </motion.div>
        </section>

        {/* =========================================================================
           SCENE 2: BASECAMP // CURIOSITY VAULT (800m)
           ========================================================================= */}
        <section className="space-y-10 pt-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-md">
              800m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">WAYPOINT 01</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Basecamp: Identity & Vault</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="matte-card mist-card p-7 border border-white/15 bg-[#121620]/85 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
                <h3 className="text-base font-bold text-[#f0ede6]">{PROFILE_DATA.name}</h3>
                <span className="text-xs font-mono text-[var(--accent-teal)]">/ NTU MED</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {PROFILE_DATA.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#121620]/80 border border-white/10 backdrop-blur-md text-center">
                <Code className="w-4 h-4 text-sky-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.codeCount}+</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Self-Taught Apps</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121620]/80 border border-white/10 backdrop-blur-md text-center">
                <Music className="w-4 h-4 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.originalCount}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Original Music</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121620]/80 border border-white/10 backdrop-blur-md text-center">
                <Disc className="w-4 h-4 text-rose-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.coverCount}+</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Arranged Covers</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121620]/80 border border-white/10 backdrop-blur-md text-center">
                <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.researchCount}</p>
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
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              1500m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">WAYPOINT 02</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Clinical Ridge: Public Health</h2>
            </div>
          </div>

          <div className="space-y-4">
            {publicHealthWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card mist-card p-6 border border-white/15 bg-[#121620]/85 backdrop-blur-xl hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {work.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{work.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#f0ede6] group-hover:text-emerald-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">{work.summary}</p>
                </div>

                <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/10 border border-white/15 text-slate-200 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
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
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 backdrop-blur-md">
              2400m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">WAYPOINT 03</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Tech High Pass: Code Systems</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codeWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card mist-card p-5 border border-white/15 bg-[#121620]/85 backdrop-blur-xl hover:border-sky-500/50 cursor-pointer transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {work.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{work.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#f0ede6] group-hover:text-sky-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">{work.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
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
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 backdrop-blur-md">
              3200m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">WAYPOINT 04</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Audio Plateau: Compositions</h2>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Original Compositions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {originalMusicWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    className="matte-card mist-card p-5 border border-white/15 bg-[#121620]/85 backdrop-blur-xl hover:border-purple-500/50 transition-all flex items-center justify-between gap-3 shadow-xl"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-[#f0ede6]">{work.title}</h4>
                      <p className="text-[11px] text-slate-300 font-light line-clamp-1">{work.summary}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {coverWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    onClick={() => playTrack(work)}
                    className="matte-card mist-card p-3.5 border border-white/15 bg-[#121620]/75 hover:border-rose-500/50 cursor-pointer transition-all flex items-center justify-between shadow-lg"
                  >
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-200 line-clamp-1">{work.title}</h5>
                      <span className="text-[10px] font-mono text-slate-400">{work.audioDuration}</span>
                    </div>

                    <div className={`p-1.5 rounded-full ${isCurrentlyPlaying ? 'text-rose-400' : 'text-slate-400'}`}>
                      {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
           SCENE 6: THE PEAK (3,952m - SUMMIT) - Centered Final Viewport
           ========================================================================= */}
        <section id="the-peak" className="h-screen flex flex-col items-center justify-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-xl mx-auto backdrop-blur-xl p-8 rounded-3xl border border-white/10 bg-[#121620]/80 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-teal-400 to-sky-400 p-[2px] mx-auto shadow-2xl">
              <div className="w-full h-full bg-[#0d0f14] rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-[var(--accent-gold)]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
              SUMMIT ELEVATION 3,952M · YUSHAN PEAK
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-teal-200 to-sky-200 drop-shadow">
              "You've reached the peak."
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md mx-auto">
              Thank you for climbing this ascent. Let's connect and build meaningful public health innovations, software systems, and musical projects.
            </p>

            {/* Pure Minimalist Icon Social Links (No Outer Border) */}
            <div className="pt-6 flex items-center justify-center gap-7 text-slate-300">
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-[var(--accent-teal)] transition-colors p-2 rounded-lg"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>

              <a
                href={PROFILE_DATA.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-[var(--accent-gold)] transition-colors p-2 rounded-lg"
                aria-label="SoundCloud"
                title="SoundCloud Audio"
              >
                <Music className="w-6 h-6" />
              </a>

              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="text-slate-300 hover:text-[var(--accent-rose)] transition-colors p-2 rounded-lg"
                aria-label="Email"
                title="Send Email"
              >
                <Mail className="w-6 h-6" />
              </a>

              <a
                href="https://SuperBalabah.github.io/preeclampsia-report"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-[var(--accent-emerald)] transition-colors p-2 rounded-lg"
                aria-label="Clinical Report"
                title="Clinical Research Platform"
              >
                <Stethoscope className="w-6 h-6" />
              </a>

              <a
                href="https://SuperBalabah.github.io/news_radar_dashboard/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-[var(--accent-purple)] transition-colors p-2 rounded-lg"
                aria-label="PWA Radar"
                title="News Radar PWA App"
              >
                <Activity className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};
