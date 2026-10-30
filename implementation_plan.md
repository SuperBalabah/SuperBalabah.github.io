# Implementation Plan - Portfolio Content Update & Refinement

Refine personal portfolio content with user's actual curated software projects, clinical/public health tools, and original/cover music audio files, replacing all placeholder items.

## Phase 1: Interactive Ascent UI/UX (Completed)
- [x] Ascent Mode 2D parallax climbing engine (Lenis + GSAP ScrollTrigger).
- [x] Dual-hand clip-path alternating climbing physics (0.95x scale, -150px sunk baseline offset).
- [x] High-res clean background mountain & transparent hands assets without watermarks.
- [x] Wabi-Sabi Zen minimalist summit finish with purified contact links.
- [x] Continuous GitHub deployment sync.

## Phase 2: Content Data Update (Pending Final Works List)
1. **Software & Systems Archive (`src/data/works.ts`)**:
   - Collect user's real projects (GitHub repos, live demos, summaries, tech stacks, case study details).
   - Filter out unused placeholder entries.

2. **Music & Audio Archive (`src/data/works.ts` & `src/context/AudioContext.tsx`)**:
   - Update original music compositions (audio URLs, track titles, durations, cover artwork).
   - Update guitar & vocal cover arrangements.

3. **Profile & Identity (`src/data/profile.ts`)**:
   - Calibrate project count statistics (Apps count, Music count, Clinical tools count).

## Phase 3: Ascent Loading Screen & Preloader (Completed)
1. **Asset Preloader Engine (`src/components/Preloader.tsx`)**:
   - [x] Preload heavy visual assets (`/background_mountain.png`, `/hands_transparent.png`).
   - [x] Check Google Web Fonts readiness (`document.fonts.ready`).
   - [x] Preload audio buffer indicators (`hauntsync-whiteout...`, `data_pion...`).
   - [x] Real percentage tracking with smooth interpolation counter (0% to 100%).
   - [x] Dynamic elevation meter climbing from 0m to 3952m during loading.
   - [x] Minimalist Zen Mountain Peak glyph and altitude telemetry.
   - [x] Timeout safety fallback (max 4.0s) to guarantee zero lock-out on slow networks.
   - [x] Exit animation: seamless fade-out + blur release into Ascent Mode.

2. **Integration (`src/App.tsx`)**:
   - [x] Mount Preloader at top level with `<AnimatePresence>`.
   - [x] Prevent background scrolling while loading.
   - [x] Smoothly hand off to Ascent / Classic view with trigger resize event.

## Verification Plan
- [x] Build check (`npm run build`) passed with zero errors.
- [ ] Push to GitHub Pages when approved.
