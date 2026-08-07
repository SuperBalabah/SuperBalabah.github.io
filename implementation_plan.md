# Implementation Plan - "Ascent (攀登之徑)" Minimalist Gaming Aesthetic

Transform the portfolio into an immersive, scroll-driven climbing experience (*Gris* / *Journey* inspired), while retaining the classic 2-column layout as a backup toggle.

## Core Features of Ascent Mode

### 1. Scroll-Driven Altitude Tracking (0m -> 3842m)
- Dynamic altitude counter (`0m` to `3842m`, representing Yushan Summit).
- Fixed HUD indicator with mode toggle (`Ascent Game` vs `Classic Grid`).

### 2. Glowing Path & Parallax Background Geometry
- SVG dynamic glowing trail that draws itself (`strokeDashoffset`) as the user scrolls.
- Multi-layered CSS/SVG parallax geometry (far mountain silhouette, mist/clouds, summit light rays).
- Smooth sky color shifts: Twilight Valley (`#0d0f12`) -> Alpine Mist (`#141b24`) -> Summit Dawn (`#1e1b2e` with golden light).

### 3. Milestone Waypoints
- `0m` **Valley Base**: Title `Ascent.`, subtitle `"Meet me at the peak."`.
- `800m` **Basecamp**: Stats Vault & Personal Identity.
- `1500m` **Clinical Ridge**: Public Health Case Reports (Preeclampsia, Doctor Sleep Better).
- `2400m` **Tech High Pass**: Software Apps (News Radar PWA, QuantTrader, Lazy Report).
- `3200m` **Audio Plateau**: Original Compositions & Vocal Covers with audio player trigger.
- `3842m` **The Peak**: `"You've reached the peak."`, summit contact cards (Email, GitHub, SoundCloud).

### 4. Mode Preservations (Dual Mode Switcher)
- Mode switcher state in `App.tsx`: `'ascent'` (default) vs `'classic'`.
- Seamless switching between Ascent gaming mode and Brittany Chiang classic 2-column layout.

## Verification Plan

### Automated Verification
- Run `npm run build` in `portfolio` directory.

### Visual & Interactive Verification
- Test altitude scroll progress, glowing line animation, modal drawers, audio playback, and mode switching.
