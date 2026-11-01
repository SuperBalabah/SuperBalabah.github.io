import { WorkItem } from '../types/work';

export const WORKS_DATA: WorkItem[] = [
  // ==========================================
  // REAL LIVE PUBLIC HEALTH & CLINICAL RESEARCH
  // ==========================================
  {
    id: 'ph-preeclampsia-report',
    title: 'Preeclampsia Clinical Risk Report Platform',
    category: 'public_health',
    tags: ['Public Health', 'Clinical Risk', 'Obstetrics', 'Data Analytics'],
    featured: true,
    summary: 'A web-based analytical platform presenting clinical risk assessment and epidemiological metrics for preeclampsia in maternal health.',
    description: `### Public Health Impact
Developed to improve early detection and risk stratification of preeclampsia in maternal health. Features structured reporting modules for clinical risk markers, blood pressure monitoring, and risk calculation.

### Key Innovations
- Web-based interactive report rendering with client-side privacy.
- Clean visual data breakdown for clinicians and public health researchers.
- Deployable on low-resource clinical terminals without complex backend dependencies.`,
    date: '2026-04',
    learningDuration: 'Built & Deployed for Clinical Insight',
    techStack: ['JavaScript', 'HTML5/CSS3', 'Data Visualization'],
    demoUrl: 'https://SuperBalabah.github.io/preeclampsia-report',
    githubUrl: 'https://github.com/SuperBalabah/preeclampsia-report',
    metrics: 'Active Public Health Case Tool',
    accentColor: '#34d399'
  },
  {
    id: 'ph-preeclampsia-case',
    title: 'Preeclampsia Case Study & Interactive Analysis',
    category: 'public_health',
    tags: ['Case Study', 'Epidemiology', 'Maternal Health', 'Interactive Data'],
    featured: true,
    summary: 'Detailed interactive case study environment investigating preeclampsia patient trajectories and risk factors.',
    description: `### Research Focus
An in-depth case study platform examining longitudinal maternal health data, biostatistical indicators, and preventive health strategies.`,
    date: '2026-03',
    learningDuration: 'Self-Taught Case Modeling',
    techStack: ['JavaScript', 'Responsive UI', 'Data Parsing'],
    demoUrl: 'https://SuperBalabah.github.io/preeclampsia-case-study/',
    githubUrl: 'https://github.com/SuperBalabah/preeclampsia-case-study',
    metrics: 'Clinical Case Analysis',
    accentColor: '#fb7185'
  },
  {
    id: 'code-sleep-doctor',
    title: 'Doctor Sleep Better: Sleep Quality Optimizer',
    category: 'public_health',
    tags: ['Health Tech', 'Sleep Hygiene', 'Behavioral Health', 'Interactive App'],
    featured: true,
    summary: 'An interactive web app helping healthcare workers and users optimize circadian rhythm, sleep architecture, and recovery habits.',
    description: `### Health Motivation
Designed to solve sleep deprivation and shift-work fatigue among medical professionals. Combines evidence-based sleep hygiene guidelines with interactive cycle calculators.`,
    date: '2026-02',
    learningDuration: 'Built in 48 Hours',
    techStack: ['React', 'TypeScript', 'TailwindCSS'],
    demoUrl: 'https://SuperBalabah.github.io/doctor-sleep-better/',
    githubUrl: 'https://github.com/SuperBalabah/doctor-sleep-better',
    metrics: 'Used for Daily Sleep Optimization',
    accentColor: '#38bdf8'
  },

  // ==========================================
  // SHOWCASED CODE & SYSTEM TOOLS (Flagship Engineering & PWAs)
  // ==========================================
  {
    id: 'code-mind-oasis',
    title: 'Super Mind Oasis: 3D Mental Inquiry PWA',
    category: 'code',
    tags: ['Three.js', 'Web Audio DSP', 'PWA', 'Zero-Server Privacy', 'Mental Health'],
    featured: true,
    summary: 'A serene, client-side 3D sanctuary for quiet self-reflection—featuring procedural Three.js shaders, algorithmic Web Audio synthesis, and zero-server privacy.',
    description: `### 🌿 A Free Sanctuary for Self-Reflection
A peaceful, non-punitive emotional space engineered to transform inner anxiety into silent, organic growth:
- **Zero Pressure**: No streak anxiety or punishment; trees flourish silently alongside real-time passage.
- **Cognitive Inquiry**: Externalize worries into symbolic trees and harvest crystallized lessons into a lifelong timeline.

### 🔒 Zero-Server Privacy & Deep Tech Architecture
- **Complete Privacy**: Zero backend surveillance; intimate thoughts stay 100% local on the client device (with optional private GitHub Gist sync).
- **Procedural 3D Island (Three.js)**: Atmospheric aerial dust, procedural shaders, and 4 ambient weather lighting modes at locked 60 FPS.
- **0KB Algorithmic Audio (Web Audio API)**: Zero audio asset downloads; real-time mathematical synthesis of 288Hz singing bowl, rain, and water chimes.
- **Mobile-First iOS PWA**: Offline Service Worker caching with native full-screen immersion.`,
    date: '2026-09',
    learningDuration: '3D Shaders & Web Audio DSP',
    techStack: ['Three.js', 'Web Audio API', 'TypeScript', 'PWA', 'IndexedDB', 'GLSL'],
    demoUrl: 'https://superbalabah.github.io/super_mind_oasis/?lang=en',
    githubUrl: 'https://github.com/SuperBalabah/super_mind_oasis',
    imageUrl: './previews/preview-mind-oasis.jpg',
    metrics: 'Client-Side 3D PWA',
    accentColor: '#10b981'
  },
  {
    id: 'code-craft-go',
    title: 'Super Craft Go: 3D Masame Atelier & KataGo AI',
    category: 'code',
    tags: ['Three.js', 'KataGo Neural Net', 'Web Audio DSP', 'OpenCL GPU', 'Go / Weiqi'],
    featured: true,
    summary: 'A contemplative, client-side 3D Go atelier featuring authentic Japanese Kaya wood optics, algorithmic stone acoustics, SVG winrate dynamics, and local KataGo GPU neural network integration.',
    description: `### 🪵 Craftsman 3D Go Atelier
An authentic, distraction-free Go (Weiqi / Baduk) study environment engineered on Japanese craftsmanship principles:
- **3D Masame Kaya Goban**: Physically based Three.js rendering of straight-grain Kaya wood, dynamic specular lighting, and traditional Gardenia pod (*Kuchinashi*) legs.
- **Natural Slate & Clamshell Physics**: Ray-marching curves and obsidian black slate stones dynamically render ambient occlusion contact shadows across 4 seasonal lighting presets (*Tea Room, Garden Pavilion, Honinbo Night, Cosmos*).
- **0KB Algorithmic Acoustics (Web Audio API)**: Zero audio asset loading; mathematical real-time synthesis of high-frequency stone impacts and Kaya wood acoustic body resonance.

### 🧠 Dual-Layer AI & Local GPU KataGo Architecture
- **Humanoid Neural AI (20 Kyu to 9 Dan)**: Boltzmann probability sampling over Human SL policy networks to replicate human psychological blind spots and natural playstyles.
- **Superhuman Full GPU Compute**: Asynchronous Python microservice daemon connecting to local GPU-accelerated KataGo OpenCL daemons for world-class MCTS analysis.
- **Interactive SVG Winrate Timeline**: Vector dynamic winrate graph with turning-point scrubbing, score lead estimation, mistake/blunder markers, and classical territory flood-fill HUD.

> [!IMPORTANT]
> **🌐 Web Preview vs. Desktop Standalone App**:
> - **Live Demo (Online Web Preview)**: Experience 100% of the 3D Goban optics, procedural acoustics, two-player matches, SGF library, and lighting themes directly in your browser. *(Note: The client-side web demo operates without local GPU KataGo backend capabilities)*.
> - **Full GPU AI Desktop Application**: To unlock deep MCTS KataGo analysis, real-time winrate curves, and AI matches, download the standalone, zero-dependency Windows desktop release from the GitHub repository!`,
    date: '2026-10',
    learningDuration: 'Three.js 3D & KataGo OpenCL Bridge',
    techStack: ['Three.js', 'TypeScript', 'Web Audio API', 'KataGo v1.18', 'OpenCL', 'Python'],
    demoUrl: 'https://superbalabah.github.io/super_craft_go/?lang=en',
    githubUrl: 'https://github.com/SuperBalabah/super_craft_go',
    imageUrl: './previews/preview-craft-go.jpg',
    metrics: '3D WebGL + KataGo GPU AI',
    accentColor: '#deb070'
  },
  {
    id: 'code-music-analyzer',
    title: 'Super Musician: AI Guitar Chord & Tab Studio',
    category: 'code',
    tags: ['AI Demucs Stems', 'Faster-Whisper ASR', 'Librosa DSP', 'Pitch Transposition', 'Guitar Studio'],
    featured: true,
    summary: 'An interactive guitar chord & practice studio fusing Demucs stem separation, Whisper lyrics alignment, real-time audio pitch shifting, and Jianpu degree analysis.',
    description: `### 🎸 AI Music & Guitar Practice Studio
An end-to-end audio engineering and guitar accompaniment platform built for songwriters, guitarists, and vocalists:
- **Demucs 3-Stem Decomposition**: Deep learning model isolating full audio tracks into pure accompaniment (*no_vocals.mp3*) and vocals (*vocals.mp3*).
- **Faster-Whisper Timestamped ASR**: Multilingual lyric transcription aligning chords to vocal timestamps with millisecond accuracy.
- **Real-Time Pitch Shifting (-6 to +6 Semitones)**: Server-side Phase Vocoder DSP and HTML5 web audio maintaining stable BPM without digital artifacting.
- **Smart Capo Recommendations**: Automatically suggests optimal Capo fret positions for open chord fingerings (e.g. Capo 1 for G/Em shapes).
- **Interactive Teleprompter & Dual Modes**: Synchronized scrolling lyrics centered on the active bar, with instant toggle between Guitar Chords and Scale Degrees (Jianpu).

> [!IMPORTANT]
> **🌐 Web Preview vs. Desktop Edition**:
> - **Live Demo (Online Web Preview)**: Experience Adele's *"Hello"* with interactive stem switching (Original mix, isolated Vocals, and pure Backing accompaniment), dynamic chord diagrams, scale degrees, and synchronized lyrics directly in your browser!
> - **Full AI Desktop Application**: To analyze any new YouTube URL with deep Demucs stem separation and Whisper transcription, download the Windows standalone release from GitHub!`,
    date: '2026-07',
    learningDuration: 'Audio DSP, Demucs & Faster-Whisper',
    techStack: ['Python', 'Librosa', 'Demucs', 'Faster-Whisper', 'Web Audio API', 'TypeScript'],
    demoUrl: 'https://superbalabah.github.io/super_musician/?lang=en',
    githubUrl: 'https://github.com/SuperBalabah/super_musician',
    imageUrl: './previews/preview-super-musician.jpg',
    metrics: 'AI Stem Separation + Chords',
    accentColor: '#c4a475'
  },

  // ==========================================
  // ORIGINAL MUSIC (4 Tracks)
  // ==========================================
  {
    id: 'original-1',
    title: 'Original Song: "Resonance of Signals"',
    category: 'original',
    tags: ['Original Music', 'Indie Electronic', 'Synthesizer', 'Logic Pro'],
    featured: true,
    summary: 'An indie electronic composition blending ambient synth pads, acoustic guitar fingerpicking, and rhythmic signal glitches.',
    description: `### Creative Concept
An audio exploration of human connection amidst digital noise. Written, arranged, recorded, and mixed entirely in Logic Pro X.

### Technical Audio Work
- Layered 16 synth tracks with analog warmth emulation.
- Programmed custom side-chain compression & stereo field spatialization.
- Self-taught vocal EQ tuning and dynamic master bus compression.`,
    date: '2025-11',
    learningDuration: 'Composed & Mixed in 1 Week',
    audioDuration: '03:45',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    metrics: 'Original Composition',
    accentColor: '#c084fc'
  },
  {
    id: 'original-2',
    title: 'Original Song: "Midnight Algorithm"',
    category: 'original',
    tags: ['Synthwave', 'Instrumental', 'Logic Pro'],
    featured: false,
    summary: 'A driving 80s synthwave instrumental created during late-night coding sessions.',
    date: '2025-10',
    audioDuration: '04:12',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7a242.mp3?filename=synthwave-80s-110045.mp3',
    accentColor: '#c084fc'
  },
  {
    id: 'original-3',
    title: 'Original Song: "Echoes of Public Health"',
    category: 'original',
    tags: ['Neoclassical', 'Piano & Strings', 'Atmospheric'],
    featured: false,
    summary: 'A contemplative acoustic piano and cello duet reflecting on community resilience.',
    date: '2025-06',
    audioDuration: '03:15',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    accentColor: '#34d399'
  },
  {
    id: 'original-4',
    title: 'Original Song: "Polyrhythmic Mind"',
    category: 'original',
    tags: ['Experimental', 'Polyrhythm', 'Acoustic Guitar'],
    featured: false,
    summary: 'An experimental acoustic guitar piece exploring 7/8 and 5/4 time signature transitions.',
    date: '2025-04',
    audioDuration: '02:50',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=smooth-jazz-18497.mp3',
    accentColor: '#fbbf24'
  },

  // ==========================================
  // COVERS (35+ Tracks)
  // ==========================================
  ...Array.from({ length: 35 }).map((_, index) => {
    const songTitles = [
      'Fly Me to the Moon (Jazz Arrangement)',
      'Halleluja (Acoustic Guitar & Vocal)',
      'Fix You (3-Part Vocal Harmony)',
      'City of Stars (Piano & Vocal Cover)',
      'Can\'t Help Falling in Love (Fingerstyle)',
      'Yesterday (Strings & Acoustic Guitar)',
      'Shallow (Duet Vocal & Acoustic)',
      'Count on Me (Ukulele Cover)',
      'Hotel California (Dual Guitar Solo Cover)',
      'Creep (Raw Acoustic Vocal Session)',
      'Sound of Silence (A Cappella 4-Part)',
      'Autumn Leaves (Jazz Vocal Arrangement)',
      'Thinking Out Loud (Loop Station Cover)',
      'Fast Car (Acoustic Rhythm Cover)',
      'All of Me (Smooth Piano Session)',
      'Take Me Home, Country Roads (Folk Ensemble)',
      'Stand by Me (Acoustic Bass & Rhythm)',
      'Yellow (Acoustic Re-imagining)',
      'Riptide (Uke & Strumming Vocal)',
      'Supermarket Flowers (Vocal & Piano)',
      'La Vie En Rose (French Acoustic Cover)',
      'Fly Me to the Moon (Bossa Nova Edition)',
      'Best Part (R&B Guitar & Soft Vocal)',
      'Make You Feel My Love (Soulful Piano)',
      'Perfect (Violin & Acoustic Guitar)',
      'Imagine (Minimalist Piano Cover)',
      'Let It Be (Gospel Organ & Vocal)',
      'Over the Rainbow (Low-Fi Acoustic)',
      'Wicked Game (Ambient Electric Guitar)',
      'Sweet Child O\' Mine (Acoustic Ballad Cover)',
      'Wonderwall (Custom Fingerstyle Cover)',
      'Space Oddity (Acoustic Synth Blend)',
      'Blackbird (Two-Guitar Fingerpicking)',
      'Havana (Latin Jazz Guitar Cover)',
      'Photograph (Acoustic Strum Session)'
    ];

    const i = index % songTitles.length;
    return {
      id: `cover-${index + 1}`,
      title: songTitles[i],
      category: 'cover' as const,
      tags: ['Cover Track', index % 2 === 0 ? 'Acoustic Guitar' : 'Piano', 'Audio Recording'],
      featured: index === 0,
      summary: `Self-engineered audio cover recording #${index + 1}. Focused on vocal dynamics and clean mic technique.`,
      description: `Recorded in home acoustic studio session. Mastered with mild compression and warm tape saturation.`,
      date: `2025-${12 - (index % 12)}`,
      audioDuration: `0${2 + (index % 2)}:${30 + (index % 30)}`,
      audioUrl: index % 2 === 0 
        ? 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=smooth-jazz-18497.mp3'
        : 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3',
      metrics: `Cover Log #${index + 1}`,
      accentColor: index % 3 === 0 ? '#fbbf24' : index % 3 === 1 ? '#fb7185' : '#38bdf8'
    };
  })
];
