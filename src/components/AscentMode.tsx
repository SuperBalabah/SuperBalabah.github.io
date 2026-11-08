import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { WorkItem } from '../types/work';
import { WORKS_DATA } from '../data/works';
import { PROFILE_DATA } from '../data/profile';
import { INTERESTS_DATA } from '../data/interests';
import { InterestCard } from './InterestCard';
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
  const altitudeHudRef = useRef<HTMLSpanElement>(null);
  const altitudeGaugeRef = useRef<HTMLSpanElement>(null);
  const elevationBarRef = useRef<HTMLDivElement>(null);
  const zoneLabelRef = useRef<HTMLSpanElement>(null);

  const { currentTrack, isPlaying, playTrack, startTrack } = useAudio();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio HTML5 refs (Strict MP3 Filenames)
  const windAudioRef = useRef<HTMLAudioElement | null>(null);
  const footstepAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastFootstepTimeRef = useRef<number>(0);

  // Categorized works
  const researchWorks = WORKS_DATA.filter((w) => w.category === 'public_health');
  const codeWorks = WORKS_DATA.filter((w) => w.category === 'code');
  const originalMusicWorks = WORKS_DATA.filter((w) => w.category === 'original');
  const coverWorks = WORKS_DATA.filter((w) => w.category === 'cover');

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

  // ⚡ AUDIO DUCKING: Smoothly mute ambient mountain wind when music is playing
  useEffect(() => {
    if (!windAudioRef.current) return;
    if (isPlaying) {
      windAudioRef.current.volume = 0;
    } else {
      windAudioRef.current.volume = isMuted ? 0 : 0.25;
    }
  }, [isPlaying, isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (windAudioRef.current) windAudioRef.current.muted = next;
      if (footstepAudioRef.current) footstepAudioRef.current.muted = next;
      return next;
    });
  };

  const getZoneLabel = (alt: number) => {
    if (alt < 400) return 'VALLEY BASE';
    if (alt < 1200) return 'BASECAMP // VAULT';
    if (alt < 2000) return 'CLINICAL AI RIDGE';
    if (alt < 2800) return 'TECH HIGH PASS';
    if (alt < 3500) return 'AUDIO PLATEAU';
    if (alt < 3850) return 'OTHER INTERESTS';
    return 'THE PEAK';
  };

  useEffect(() => {
    // 2. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 0.75, // Snappy & responsive, zero sluggish lag or direction hesitation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    (window as any).__lenis = lenis;

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
            scrub: true, // 1:1 lockstep with Lenis to prevent rubber-band lag
          },
        });
      }

      // Pre-create optimized quickTo setters to prevent tween creation garbage & direction jitter
      const setLeftY = leftHandRef.current ? gsap.quickTo(leftHandRef.current, 'y', { duration: 0.2, ease: 'power1.out' }) : null;
      const setRightY = rightHandRef.current ? gsap.quickTo(rightHandRef.current, 'y', { duration: 0.2, ease: 'power1.out' }) : null;

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
          if (altitudeHudRef.current) {
            altitudeHudRef.current.innerText = altVal.toLocaleString();
          }
          if (altitudeGaugeRef.current) {
            altitudeGaugeRef.current.innerText = altVal.toLocaleString();
          }
          if (elevationBarRef.current) {
            elevationBarRef.current.style.height = `${Math.min(100, (altVal / 3952) * 100)}%`;
          }
          if (zoneLabelRef.current) {
            zoneLabelRef.current.innerText = getZoneLabel(altVal);
          }

          // NATURAL ALTERNATING CLIMB ANIMATION (OPTIMIZED QUICKTO)
          const frequency = 40;
          const amplitude = 32;

          if (velocity > 0.05) {
            const sinVal = Math.sin(progress * frequency);
            const cosVal = Math.cos(progress * frequency);

            if (setLeftY) setLeftY(sinVal * amplitude);
            if (setRightY) setRightY(cosVal * amplitude);

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
            if (setLeftY) setLeftY(0);
            if (setRightY) setRightY(0);
          }
        },
      });
    }

    // 5. Milestone Animations (Stable once-reveal to eliminate reverse scroll jitter & GPU blur lag)
    const milestones = gsap.utils.toArray<HTMLElement>('.ascent-milestone');
    milestones.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      (window as any).__lenis = undefined;
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
          src="/background_mountain.webp"
          alt="Misty Mountain Path Background"
          className="w-full h-full object-cover origin-bottom opacity-90 will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* 🧗‍♂️ LAYER 2: Foreground Hands & Trekking Poles (Anchored to Left and Right Screen Edges to Keep Center Content Clear) */}
      {/* Left Hand Element */}
      <div className="fixed bottom-[-160px] left-[-70px] sm:left-[-30px] xl:left-[1%] z-20 pointer-events-none w-[340px] sm:w-[420px] lg:w-[460px] h-[520px] overflow-hidden">
        <img
          ref={leftHandRef}
          src="/hands_transparent.webp"
          alt="Left Gloved Trekking Hand"
          className="absolute bottom-0 left-0 w-[680px] sm:w-[840px] lg:w-[920px] max-w-none object-contain opacity-90 origin-bottom will-change-transform"
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', transform: 'translateZ(0)' }}
        />
      </div>
      {/* Right Hand Element */}
      <div className="fixed bottom-[-160px] right-[-70px] sm:right-[-30px] xl:right-[1%] z-20 pointer-events-none w-[340px] sm:w-[420px] lg:w-[460px] h-[520px] overflow-hidden">
        <img
          ref={rightHandRef}
          src="/hands_transparent.webp"
          alt="Right Gloved Trekking Hand"
          className="absolute bottom-0 right-0 w-[680px] sm:w-[840px] lg:w-[920px] max-w-none object-contain opacity-90 origin-bottom will-change-transform"
          style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)', transform: 'translateZ(0)' }}
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
          ALT <span ref={altitudeHudRef}>0</span> M
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
            <span ref={altitudeGaugeRef}>0</span> <span className="text-xs font-normal text-slate-500">M</span>
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
              <span className="text-xs font-mono tracking-widest text-[var(--accent-teal)] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                PORTFOLIO ASCENT
              </span>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                SuperBalabah
              </h1>
              <p className="text-sm sm:text-base font-mono text-amber-200 tracking-wide pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                NTU Medicine • Software Engineering • Audio Engineering
              </p>
            </div>
          </div>

          {/* Borderless Clean White Minimal Scroll Indicator */}
          <div
            className="pb-6 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => {
              const lenis = (window as any).__lenis;
              if (lenis) {
                lenis.scrollTo(window.innerHeight * 0.65, { duration: 1.0 });
              } else {
                window.scrollTo({ top: window.innerHeight * 0.65, behavior: 'smooth' });
              }
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
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 backdrop-blur-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              800m
            </span>
            <div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">WAYPOINT 01</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">Basecamp: Identity & Vault</h2>
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-[#161920]/80 border border-white/10 backdrop-blur-md text-center">
                <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-[#f0ede6]">{PROFILE_DATA.stats.researchCount}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">First-Author Study</p>
              </div>

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
            </div>
          </div>
        </section>

        {/* =========================================================================
           SCENE 3: CLINICAL AI RIDGE (1600m)
           ========================================================================= */}
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 backdrop-blur-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              1600m
            </span>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">WAYPOINT 02</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">Clinical AI & Research Station</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {researchWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card mist-card border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col md:flex-row justify-between shadow-2xl overflow-hidden rounded-2xl"
              >
                {work.imageUrl && (
                  <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0d12] flex items-center justify-center p-4">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-emerald-400" /> UNDER REVIEW (2026)
                    </div>
                  </div>
                )}

                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          {work.metrics || 'CLINICAL AI'}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          FIRST AUTHOR
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">NTU Medicine & NTUH</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-[#f0ede6] group-hover:text-emerald-300 transition-colors leading-snug">
                      {work.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {work.summary}
                    </p>
                  </div>

                  <div className="pt-4 space-y-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {work.techStack?.map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400/80 group-hover:text-emerald-300 transition-colors pt-1">
                      <span>Click to view study abstract & clinical validation details</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           SCENE 4: TECH HIGH PASS (2400m)
           ========================================================================= */}
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 backdrop-blur-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              2400m
            </span>
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">WAYPOINT 03</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">Tech High Pass: Code Systems</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codeWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="group matte-card mist-card border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-sky-500/50 cursor-pointer transition-all flex flex-col justify-between shadow-xl overflow-hidden rounded-2xl"
              >
                {work.imageUrl && (
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden border-b border-white/10 bg-[#0f1115]">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161920]/85 via-transparent to-transparent opacity-60" />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
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
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           SCENE 5: AUDIO PLATEAU (3200m)
           ========================================================================= */}
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 backdrop-blur-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              3200m
            </span>
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">WAYPOINT 04</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">Audio Plateau: Compositions</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-mono text-slate-200 uppercase tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">Original Compositions (4 Tracks)</h3>
              <span className="text-[10px] font-mono text-purple-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Click card for lyrics & play</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {originalMusicWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    onClick={() => {
                      onSelectWork(work);
                      startTrack(work);
                    }}
                    className="matte-card mist-card p-5 border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-purple-500/50 cursor-pointer transition-all flex flex-col justify-between gap-4 shadow-xl rounded-xl group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {work.tags[1] || 'ORIGINAL'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{work.audioDuration}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#f0ede6] group-hover:text-purple-300 transition-colors line-clamp-1">{work.title}</h4>
                      <p className="text-[11px] text-slate-300 font-light line-clamp-2 leading-relaxed">{work.summary}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-slate-400">{work.metrics}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(work);
                        }}
                        className={`p-2 rounded-full transition flex-shrink-0 ${
                          isCurrentlyPlaying
                            ? 'bg-purple-500 text-slate-950 scale-105'
                            : 'bg-white/10 text-slate-200 hover:bg-purple-500 hover:text-slate-950'
                        }`}
                        title={isCurrentlyPlaying ? 'Pause' : 'Play Track'}
                      >
                        {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Studio Archives & SoundCloud Curation Banner */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#161920]/60 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs my-4">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-[var(--accent-teal)] uppercase tracking-wider">
                  STUDIO ARCHIVES NOTE
                </span>
                <p className="text-slate-300 font-light text-[11px] sm:text-xs">
                  50+ self-taught vocal & guitar arrangements archived in personal home studio. SoundCloud features a small curated subset.
                </p>
              </div>
              <a
                href={PROFILE_DATA.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
              >
                <span>SoundCloud Curated Selections</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <h3 className="text-[11px] font-mono text-slate-200 uppercase tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">Featured Vocal & Guitar Covers (8 Curated Tracks)</h3>
              <span className="text-[10px] font-mono text-rose-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Click card to play immediately</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {coverWorks.map((work) => {
                const isCurrentlyPlaying = currentTrack?.id === work.id && isPlaying;
                return (
                  <div
                    key={work.id}
                    onClick={() => playTrack(work)}
                    className="matte-card mist-card p-3.5 border border-white/15 bg-[#161920]/75 hover:border-rose-500/50 cursor-pointer transition-all flex flex-col justify-between gap-2 shadow-lg rounded-xl group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-rose-400 border border-rose-500/20">
                          {work.tags[0]}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{work.audioDuration}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-200 group-hover:text-rose-300 transition-colors line-clamp-1">{work.title}</h5>
                      <p className="text-[10px] text-slate-400 font-light line-clamp-1">{work.summary}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-white/5">
                      <span className="text-[9px] font-mono text-slate-500">{work.metrics}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(work);
                        }}
                        className={`p-1.5 rounded-full transition ${isCurrentlyPlaying ? 'bg-rose-500 text-slate-950 scale-105' : 'bg-white/10 text-slate-300 hover:bg-rose-500 hover:text-slate-950'}`}
                        title={isCurrentlyPlaying ? 'Pause' : 'Play Track'}
                      >
                        {isCurrentlyPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
           SCENE 6: OTHER INTERESTS (3600m)
           ========================================================================= */}
        <section className="ascent-milestone space-y-8">
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 backdrop-blur-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              3600m
            </span>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">WAYPOINT 05</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">Other Interests</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERESTS_DATA.map((item) => (
              <InterestCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* =========================================================================
           SCENE 7: THE PEAK (SUMMIT) — MINIMALIST ZEN PEAK CARD
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
