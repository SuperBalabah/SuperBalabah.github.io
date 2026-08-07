import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { WorkItem } from '../types/work';
import { WORKS_DATA } from '../data/works';
import { PROFILE_DATA } from '../data/profile';
import { useAudio } from '../context/AudioContext';
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
  Volume2,
  VolumeX
} from 'lucide-react';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

interface AscentModeProps {
  onSelectWork: (item: WorkItem) => void;
}

export const AscentMode: React.FC<AscentModeProps> = ({ onSelectWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMountainRef = useRef<HTMLImageElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  
  // Direct DOM Refs for 60FPS Zero-Lag Navigation Gauge Updates
  const altitudeTextRef = useRef<HTMLSpanElement>(null);
  const elevationBarRef = useRef<HTMLDivElement>(null);
  const zoneLabelRef = useRef<HTMLSpanElement>(null);

  const { currentTrack, isPlaying, playTrack } = useAudio();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio HTML5 refs (Strict MP3 Filenames)
  const windAudioRef = useRef<HTMLAudioElement | null>(null);
  const footstepAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastFootstepTimeRef = useRef<number>(0);

  // Categorized works
  const publicHealthWorks = WORKS_DATA.filter((w) => w.category === 'public_health');
  const codeWorks = WORKS_DATA.filter((w) => w.category === 'code');
  const originalMusicWorks = WORKS_DATA.filter((w) => w.category === 'original');
  const coverWorks = WORKS_DATA.filter((w) => w.category === 'cover').slice(0, 6);

  // 1. Guaranteed Wind Audio Initialization & Universal User Event Triggers
  useEffect(() => {
    const windAudio = new Audio('/hauntsync-whiteout-valley-blizzard-ambient-loop-with-howling-hillside-winds-563822.mp3');
    windAudio.loop = true;
    windAudio.volume = 0.25;
    windAudioRef.current = windAudio;

    const footstepAudio = new Audio('/data_pion-st3-footstep-sfx-323056.mp3');
    footstepAudio.volume = 0.30;
    footstepAudio.playbackRate = 0.88; // Calm, deep thud
    footstepAudioRef.current = footstepAudio;

    // Guaranteed unlock on ANY user interaction
    const unlockAndPlayWind = () => {
      if (windAudioRef.current && windAudioRef.current.paused) {
        windAudioRef.current.play().catch(() => {});
      }
    };

    unlockAndPlayWind();

    const events = ['pointerdown', 'scroll', 'mousemove', 'touchstart', 'keydown'];
    events.forEach((evt) => window.addEventListener(evt, unlockAndPlayWind, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, unlockAndPlayWind));
      windAudio.pause();
      footstepAudio.pause();
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (windAudioRef.current) windAudioRef.current.muted = next;
      if (footstepAudioRef.current) footstepAudioRef.current.muted = next;
      return next;
    });
  };

  const getZoneLabel = (alt: number) => {
    if (alt < 300) return 'VALLEY BASE';
    if (alt < 1200) return 'BASECAMP // VAULT';
    if (alt < 2000) return 'CLINICAL RIDGE';
    if (alt < 2800) return 'TECH HIGH PASS';
    if (alt < 3550) return 'AUDIO PLATEAU';
    return 'THE PEAK';
  };

  useEffect(() => {
    // 2. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 3. GSAP ScrollTrigger Background Parallax Logic (z-0)
    if (containerRef.current) {
      if (bgMountainRef.current) {
        gsap.to(bgMountainRef.current, {
          scale: 1.45,
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.0,
          },
        });
      }

      // 4. GSAP Scroll-Driven Walking Mechanics & 60FPS Instant DOM Elevation Updates
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          const velocity = Math.abs(self.getVelocity());
          const altVal = Math.min(3952, Math.max(0, Math.round(progress * 3952)));

          // ⚡ INSTANT 60FPS DOM UPDATES (Bypasses React re-render queue for zero-lag gauge response)
          if (altitudeTextRef.current) {
            altitudeTextRef.current.innerText = altVal.toLocaleString();
          }
          if (elevationBarRef.current) {
            elevationBarRef.current.style.height = `${Math.min(100, (altVal / 3952) * 100)}%`;
          }
          if (zoneLabelRef.current) {
            zoneLabelRef.current.innerText = getZoneLabel(altVal);
          }

          // NATURAL ALTERNATING CLIMB ANIMATION (SPLIT HANDS GSAP SCROLLTRIGGER)
          const frequency = 38; // Smooth climbing stride cycle over progress
          const amplitude = 16; // Shortened travel range (0.7x reduction) to keep hands low & clear

          if (velocity > 0.1) {
            const sinVal = Math.sin(progress * frequency);
            const cosVal = Math.cos(progress * frequency);

            const leftY = sinVal * amplitude;
            const rightY = cosVal * amplitude;

            if (leftHandRef.current) {
              gsap.to(leftHandRef.current, {
                y: leftY,
                duration: 0.15,
                overwrite: 'auto',
                ease: 'power1.out',
              });
            }

            if (rightHandRef.current) {
              gsap.to(rightHandRef.current, {
                y: rightY,
                duration: 0.15,
                overwrite: 'auto',
                ease: 'power1.out',
              });
            }

            // AUDIO SYNC: Trigger footstep SFX when pole reaches lowest point
            const now = Date.now();
            if ((sinVal < -0.88 || cosVal < -0.88) && now - lastFootstepTimeRef.current > 700) {
              lastFootstepTimeRef.current = now;
              if (footstepAudioRef.current && !footstepAudioRef.current.muted) {
                footstepAudioRef.current.currentTime = 0;
                footstepAudioRef.current.play().catch(() => {});
              }
            }
          } else {
            // Smoothly ease hands back to rest position when scroll stops
            if (leftHandRef.current) {
              gsap.to(leftHandRef.current, {
                y: 0,
                duration: 0.4,
                overwrite: 'auto',
                ease: 'power2.out',
              });
            }
            if (rightHandRef.current) {
              gsap.to(rightHandRef.current, {
                y: 0,
                duration: 0.4,
                overwrite: 'auto',
                ease: 'power2.out',
              });
            }
          }
        },
      });
    }

    // 5. Milestone Animations (z-30)
    const milestones = gsap.utils.toArray<HTMLElement>('.ascent-milestone');
    milestones.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1.0,
          },
        }
      );
    });

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[350vh] bg-[#0f1115] text-[#f0ede6] overflow-hidden font-sans selection:bg-[var(--accent-teal)] selection:text-slate-950">
      
      {/* SVG Physical Noise Texture Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] w-full h-full">
        <filter id="zen-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zen-noise)" />
      </svg>

      {/* 🏔️ LAYER 1: Background Layer (z-0, absolute/fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0f1115]">
        <img
          ref={bgMountainRef}
          src="/background_mountain.png"
          alt="Misty Mountain Path Background"
          className="w-full h-full object-cover origin-bottom opacity-90 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* 🧗‍♂️ LAYER 2: Foreground Hands Layer (z-50, split clip-path, compact 0.9x scale & 0.7x reach) */}
      {/* Reduced size (max-w-[760px] scale-90) & shortened height so center cards are completely clear */}
      <div className="fixed bottom-[-50px] left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-4xl h-[380px] flex justify-center items-end overflow-hidden">
        {/* Left Hand Element */}
        <img
          ref={leftHandRef}
          src="/hands_transparent.png"
          alt="Left Gloved Trekking Hand"
          className="absolute bottom-0 w-full max-w-[760px] object-contain drop-shadow-2xl opacity-95 transform scale-90 origin-bottom"
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
        />
        {/* Right Hand Element */}
        <img
          ref={rightHandRef}
          src="/hands_transparent.png"
          alt="Right Gloved Trekking Hand"
          className="absolute bottom-0 w-full max-w-[760px] object-contain drop-shadow-2xl opacity-95 transform scale-90 origin-bottom"
          style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
        />
      </div>

      {/* 📍 Floating Left HUD Elevation Status & Audio Mute Control */}
      <div className="fixed top-6 left-6 z-40 hidden sm:flex items-center gap-3 bg-[#161920]/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
        <span ref={zoneLabelRef} className="text-[11px] font-mono tracking-widest text-[var(--accent-teal)] uppercase">
          VALLEY BASE
        </span>
        <span className="text-slate-600">/</span>
        <span className="text-[11px] font-mono text-slate-400">
          ALT <span ref={altitudeTextRef}>0</span> M
        </span>

        {/* Ambient Mute/Unmute Toggle */}
        <button
          onClick={toggleMute}
          className="ml-2 p-1 text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Alpine Audio' : 'Mute Alpine Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
        </button>
      </div>

      {/* 📊 Right Side Elevation Gauge (Direct 60FPS DOM Ref Updates) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-[#161920]/80 backdrop-blur-xl px-3.5 py-2.5 rounded-2xl border border-white/10 text-right shadow-2xl">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">ELEVATION</p>
          <p className="text-2xl font-bold font-mono text-[var(--accent-teal)] tracking-tight">
            <span ref={altitudeTextRef}>0</span> <span className="text-xs font-normal text-slate-500">M</span>
          </p>
          <p className="text-[9px] font-mono text-slate-500 mt-0.5">SUMMIT 3,952 M</p>
        </div>

        <div className="w-1 h-44 bg-slate-800/60 rounded-full relative overflow-hidden border border-white/5">
          <div
            ref={elevationBarRef}
            className="w-full bg-gradient-to-t from-[var(--accent-teal)] to-[var(--accent-gold)] rounded-full absolute bottom-0 transition-all duration-75"
            style={{ height: '0%' }}
          />
        </div>
      </div>

      {/* 🧭 LAYER 3: Content Layer (z-30, scrollable milestones) */}
      <div className="relative z-30 max-w-3xl mx-auto px-6 space-y-36">

        {/* =========================================================================
           SCENE 1: VALLEY BASE (0m) — PORTFOLIO INTRO COVER
           ========================================================================= */}
        <section id="valley-base" className="h-screen flex flex-col items-center justify-between py-16 text-center">
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              ELEVATION 0M · VALLEY BASE
            </div>
          </div>

          <div className="space-y-6 my-auto max-w-2xl mx-auto px-4">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[var(--accent-teal)] uppercase">
                PORTFOLIO ASCENT
              </span>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#f0ede6]">
                SuperBalabah
              </h1>
              <p className="text-sm sm:text-base font-mono text-[var(--accent-gold)] tracking-wide pt-1">
                NTU Medicine • Software Engineering • Audio Engineering
              </p>
            </div>
          </div>

          {/* Borderless Clean White Minimal Scroll Indicator */}
          <div
            className="pb-6 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 0.65, behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/80">Scroll to Explore</span>
            <ChevronDown className="w-5 h-5 text-white animate-bounce" />
          </div>
        </section>

        {/* =========================================================================
           SCENE 2: BASECAMP // CURIOSITY VAULT (800m)
           ========================================================================= */}
        <section className="ascent-milestone space-y-10 pt-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-md">
              800m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 01</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Basecamp: Identity & Vault</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="matte-card mist-card p-7 border border-white/15 bg-[#161920]/85 backdrop-blur-xl shadow-2xl space-y-4">
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
              <div className="p-4 rounded-xl bg-[#161920]/80 border border-white/10 backdrop-blur-md text-center">
                <Code className="w-4 h-4 text-sky-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.codeCount}+</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Self-Taught Apps</p>
              </div>

              <div className="p-4 rounded-xl bg-[#161920]/80 border border-white/10 backdrop-blur-md text-center">
                <Music className="w-4 h-4 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.originalCount}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Original Music</p>
              </div>

              <div className="p-4 rounded-xl bg-[#161920]/80 border border-white/10 backdrop-blur-md text-center">
                <Disc className="w-4 h-4 text-rose-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.coverCount}+</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Arranged Covers</p>
              </div>

              <div className="p-4 rounded-xl bg-[#161920]/80 border border-white/10 backdrop-blur-md text-center">
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
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              1500m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 02</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Clinical Ridge: Public Health</h2>
            </div>
          </div>

          <div className="space-y-4">
            {publicHealthWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card mist-card p-6 border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
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
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 backdrop-blur-md">
              2400m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 03</span>
              <h2 className="text-2xl font-bold text-[#f0ede6] tracking-wide">Tech High Pass: Code Systems</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codeWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card mist-card p-5 border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-sky-500/50 cursor-pointer transition-all flex flex-col justify-between shadow-xl"
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
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 backdrop-blur-md">
              3200m
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WAYPOINT 04</span>
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
                    className="matte-card mist-card p-5 border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-purple-500/50 transition-all flex items-center justify-between gap-3 shadow-xl"
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
                    className="matte-card mist-card p-3.5 border border-white/15 bg-[#161920]/75 hover:border-rose-500/50 cursor-pointer transition-all flex items-center justify-between shadow-lg"
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
           SCENE 6: THE PEAK (SUMMIT) — MINIMALIST ZEN PEAK CARD
           ========================================================================= */}
        <section id="the-peak" className="ascent-milestone h-screen flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-6 max-w-lg mx-auto backdrop-blur-2xl p-10 rounded-3xl border border-white/10 bg-[#14171d]/90 shadow-2xl">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-[var(--accent-teal)] uppercase">
                ASCENT COMPLETE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-wide text-[#f0ede6]">
                You've reached the peak.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md mx-auto pt-2">
              Thank you for climbing this ascent. Let's connect and build software systems, audio engineering, and creative projects.
            </p>

            {/* Pure Minimalist Icon Social Links (GitHub, SoundCloud, Email) */}
            <div className="pt-6 flex items-center justify-center gap-8 text-slate-300">
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-[#f0ede6] transition-colors"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={PROFILE_DATA.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-[#f0ede6] transition-colors"
                aria-label="SoundCloud"
                title="SoundCloud Audio"
              >
                <Music className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="text-slate-400 hover:text-[#f0ede6] transition-colors"
                aria-label="Email"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
