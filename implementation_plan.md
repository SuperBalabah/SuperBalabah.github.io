# Implementation Plan - Portfolio UI Redesign

Combine **Brittany Chiang's iconic left-sidebar layout + mouse spotlight glow + indicator line navigation + icon social links** with **Japanese Minimalist (和紙消光黑) & Quiet Luxury (低調奢華與精緻留白)** design system from Obsidian Brain.

## Proposed Changes

### 1. Style System & Design Tokens (`src/index.css`)
- Colors:
  - `--bg-primary`: `#0d0f12` (Matte Wabi-Sabi Charcoal)
  - `--bg-card`: `#141820` (Quiet Luxury Dark Slate)
  - `--bg-card-hover`: `#1c222e`
  - `--accent-emerald`: `#14b8a6` (Japanese Bamboo / Teal)
  - `--accent-gold`: `#b89f74` (Warm Gold Accent)
  - `--border-color`: `#222732`
- Cursor Spotlight Glow background helper.
- Line indicator navigation transition rules (`w-8` -> `w-16`, color change).

### 2. Mouse Spotlight Component (`src/components/MouseSpotlight.tsx`)
- Tracks mouse position `(x, y)` across the screen.
- Renders a non-blocking `fixed pointer-events-none` radial gradient that follows the cursor smoothly.

### 3. Sidebar Navigation Component (`src/components/SidebarNav.tsx`)
- Left column (fixed on desktop `lg:w-5/12 lg:fixed lg:py-24`):
  - Header: Name (`SuperBalabah`), Title (NTU Med Student | Self-Taught Explorer), Tagline.
  - Interactive Navigation Menu:
    - `—— ABOUT`
    - `—— WORKS & PROJECTS`
    - `—— PUBLIC HEALTH & RESEARCH`
    - `—— MUSIC & AUDIO`
    - Dynamic active indicator line (`——` expands to `—————` with teal/emerald highlight on hover/click/scroll).
  - Bottom Social Icon Row:
    - Minimalist SVG icons (GitHub, SoundCloud, Email, LinkedIn) with subtle tooltips.

### 4. Layout & Content Restructuring (`src/App.tsx`, `src/components/HeroSection.tsx`)
- Desktop two-column layout:
  - Left column: `SidebarNav`
  - Right column: `lg:ml-[45%] lg:w-7/12 lg:py-24`
- Right column content:
  - About / Executive Summary section
  - FilterBar & Search
  - WorkGrid with updated cards
  - DetailDrawer & AudioPlayer

### 5. Card Component Redesign (`src/components/WorkCard.tsx`)
- Matte border, zero emoji, crisp Lucide icons.
- Quiet luxury tag badges, accent color left borders or glow effects on hover.
- Play button for audio items, links for live demos and GitHub repos.

## Verification Plan

### Automated Build Verification
- Run `npm run build` using `run_command` in `portfolio` directory to ensure TypeScript types and CSS compile without errors.

### Visual / Behavior Verification
- Check responsive behavior and cursor glow effect.
