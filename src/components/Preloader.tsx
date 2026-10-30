import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING EXPEDITION...');
  const [canSkip, setCanSkip] = useState(false);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    let isMounted = true;
    let actualLoaded = 0;
    const totalItems = 4; // Mountain, Hands, Fonts, Audio

    const updateItemLoaded = () => {
      actualLoaded += 1;
    };

    // 1. Preload Background Mountain
    const mountainImg = new Image();
    mountainImg.src = '/background_mountain.png';
    mountainImg.onload = updateItemLoaded;
    mountainImg.onerror = updateItemLoaded;

    // 2. Preload Transparent Hands
    const handsImg = new Image();
    handsImg.src = '/hands_transparent.png';
    handsImg.onload = updateItemLoaded;
    handsImg.onerror = updateItemLoaded;

    // 3. Preload Web Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateItemLoaded).catch(updateItemLoaded);
    } else {
      updateItemLoaded();
    }

    // 4. Preload Ambient Audio (Headers / CanPlay)
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = '/hauntsync-whiteout-valley-blizzard-ambient-loop-with-howling-hillside-winds-563822.mp3';
    audio.onloadeddata = updateItemLoaded;
    audio.onerror = updateItemLoaded;

    // Smooth animation counter with LERP
    let currentDisplay = 0;
    const startTime = Date.now();
    const minLoadDuration = 1400; // Minimum 1.4s for aesthetic smoothness
    const maxTimeout = 4000;      // Maximum 4.0s safety fallback

    // Allow skip after 1.2s
    const skipTimer = setTimeout(() => {
      if (isMounted) setCanSkip(true);
    }, 1200);

    const interval = setInterval(() => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTime;
      const assetRatio = actualLoaded / totalItems;
      const timeRatio = Math.min(1, elapsed / minLoadDuration);

      // Target progress is governed by actual asset progress and elapsed minimum time
      let target = Math.min(100, Math.round(((assetRatio * 0.7) + (timeRatio * 0.3)) * 100));

      if (elapsed >= maxTimeout) {
        target = 100;
      } else if (actualLoaded >= totalItems && elapsed >= minLoadDuration) {
        target = 100;
      }

      // Smooth step towards target
      if (currentDisplay < target) {
        const step = Math.max(1, Math.ceil((target - currentDisplay) * 0.25));
        currentDisplay = Math.min(100, currentDisplay + step);
        setProgress(currentDisplay);

        // Update status text dynamically based on progress
        if (currentDisplay < 25) {
          setStatusText('PREPARING EXPEDITION EQUIPMENT...');
        } else if (currentDisplay < 60) {
          setStatusText('LOADING ALPINE TERRAIN & HIGH-RES ASSETS...');
        } else if (currentDisplay < 88) {
          setStatusText('TUNING AMBIENT ACOUSTICS & ALTIMETER...');
        } else if (currentDisplay < 100) {
          setStatusText('APPROACHING TRAILHEAD BASECAMP...');
        } else {
          setStatusText('EXPEDITION READY // ENTERING ASCENT');
        }
      }

      // Completion check
      if (currentDisplay >= 100 && !isFinishedRef.current) {
        isFinishedRef.current = true;
        clearInterval(interval);
        setTimeout(() => {
          if (isMounted) {
            document.body.style.overflow = '';
            onComplete();
          }
        }, 400); // 400ms pause on 100% for natural rhythm
      }
    }, 28);

    const handleSkip = () => {
      if (!isFinishedRef.current) {
        isFinishedRef.current = true;
        clearInterval(interval);
        setProgress(100);
        setStatusText('EXPEDITION READY // ENTERING ASCENT');
        setTimeout(() => {
          if (isMounted) {
            document.body.style.overflow = '';
            onComplete();
          }
        }, 150);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(skipTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const currentElevation = Math.round((progress / 100) * 3952);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: 'blur(10px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f1115] text-[#f0ede6] select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(74,139,127,0.12)_0%,rgba(15,17,21,0.95)_70%)]" />

      {/* Center Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8 text-center">
        
        {/* Mountain Peak Vector Emblem */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm shadow-[0_0_30px_rgba(74,139,127,0.15)]">
            <svg
              className="w-8 h-8 text-[var(--accent-teal,#4a8b7f)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              <path d="m4.14 15 .86-1.5L8 16l3-5 3.5 6" opacity="0.6" />
            </svg>
          </div>
          {/* Subtle pulsating beacon dot at summit */}
          <span className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent-gold,#a89269)] animate-ping" />
        </motion.div>

        {/* Title & Expedition Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="space-y-1 mb-8"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent-teal,#4a8b7f)] uppercase">
            SUPERBALABAH // EXPEDITION PROTOCOL
          </div>
          <h1 className="text-2xl font-serif tracking-wide text-[#f0ede6] font-medium">
            Ascent to Yushan 3952M
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-3">
          <div className="relative h-[3px] w-full bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--accent-teal,#4a8b7f)] via-[var(--accent-cyan,#528b9c)] to-[var(--accent-gold,#a89269)] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Telemetry Altimeter & Percentage */}
          <div className="flex items-center justify-between font-mono text-xs text-[#a0aab8]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal,#4a8b7f)] animate-pulse" />
              <span>ALT: {currentElevation.toLocaleString()}M</span>
            </div>
            <div className="text-[var(--text-primary,#f0ede6)] font-semibold tracking-wider">
              {progress}%
            </div>
          </div>
        </div>

        {/* Status Text Feed */}
        <div className="h-6 mt-6 flex items-center justify-center">
          <p className="font-mono text-[11px] tracking-wider text-[#626c7a] uppercase transition-all duration-200">
            {statusText}
          </p>
        </div>

        {/* Optional Skip Prompt */}
        <AnimatePresence>
          {canSkip && progress < 100 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                isFinishedRef.current = true;
                setProgress(100);
                setTimeout(() => {
                  document.body.style.overflow = '';
                  onComplete();
                }, 100);
              }}
              className="mt-6 text-[10px] font-mono tracking-widest text-[#626c7a] hover:text-[#a0aab8] transition-colors uppercase border border-white/5 hover:border-white/20 px-3 py-1 rounded-full"
            >
              [ Press Space / Click to Skip ]
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* Minimal Footer Telemetry */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center text-[10px] font-mono tracking-[0.2em] text-[#626c7a]/60 uppercase">
        Polymath Portfolio // Alpine Minimalist Architecture
      </div>
    </motion.div>
  );
};

