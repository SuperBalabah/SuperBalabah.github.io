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
  // REAL LIVE CODE & SYSTEM TOOLS
  // ==========================================
  {
    id: 'code-news-radar',
    title: 'News Radar Dashboard (PWA)',
    category: 'code',
    tags: ['PWA', 'IndexedDB', 'News Analytics', 'Offline First'],
    featured: true,
    summary: 'Offline-first Progressive Web App tracking real-time news trends with local IndexedDB persistence.',
    description: `### System Architecture
An offline-first news radar app running directly in the browser. Uses IndexedDB for local data persistence and custom keyword categorization algorithms.`,
    date: '2026-01',
    learningDuration: 'PWA & IndexedDB Architecture',
    techStack: ['JavaScript', 'PWA', 'IndexedDB', 'Service Workers'],
    demoUrl: 'https://SuperBalabah.github.io/news_radar_dashboard/',
    githubUrl: 'https://github.com/SuperBalabah/news_radar_dashboard',
    metrics: 'Active Daily PWA Tool',
    accentColor: '#c084fc'
  },
  {
    id: 'code-quant-trader',
    title: 'My QuantTrader Dashboard',
    category: 'code',
    tags: ['Quant Trading', 'Financial Engineering', 'Data Analytics', 'Dashboard'],
    featured: true,
    summary: 'Quantitative trading strategy analyzer visualizing risk-reward metrics, drawdowns, and portfolio backtest signals.',
    description: `### Quantitative Modeling
Built to explore algorithmic trading, risk management metrics (Sharpe ratio, max drawdown), and dynamic portfolio visual analytics.`,
    date: '2025-12',
    learningDuration: 'Self-Taught Quant Analytics',
    techStack: ['JavaScript', 'Chart.js', 'Financial Math'],
    demoUrl: 'https://SuperBalabah.github.io/My_QuantTrader_Dashboard/',
    githubUrl: 'https://github.com/SuperBalabah/My_QuantTrader_Dashboard',
    metrics: 'Backtested Strategy Pipeline',
    accentColor: '#fbbf24'
  },
  {
    id: 'code-lazy-report',
    title: 'Lazy Report Engine (JSON Automated Generator)',
    category: 'code',
    tags: ['Automation', 'JSON Parser', 'Report Engine', 'Productivity'],
    featured: false,
    summary: 'Automated reporting system that ingests raw JSON data feeds and instantly renders formatted executive summary reports.',
    description: `Created to eliminate repetitive manual report formatting. Feed raw JSON objects into the engine to dynamically render styled responsive reports.`,
    date: '2025-11',
    learningDuration: 'Built in 24 Hours',
    techStack: ['JavaScript', 'JSON Schema', 'CSS Grid'],
    demoUrl: 'https://SuperBalabah.github.io/Lazy_Report/',
    githubUrl: 'https://github.com/SuperBalabah/Lazy_Report',
    metrics: 'Instant JSON-to-Report Rendering',
    accentColor: '#38bdf8'
  },
  {
    id: 'code-instant-view',
    title: 'Instant View Web Renderer',
    category: 'code',
    tags: ['Web Renderer', 'Dev Tool', 'Code Playground'],
    featured: false,
    summary: 'Disposable high-speed web code rendering platform for instant live previewing of code snippets and folder structures.',
    description: `Lightweight web playground allowing instant rendering of HTML/CSS/JS code folders directly inside the client browser environment.`,
    date: '2025-10',
    learningDuration: 'Built in 1 Weekend',
    techStack: ['JavaScript', 'Iframe Sandbox', 'Web APIs'],
    demoUrl: 'https://SuperBalabah.github.io/instant-view/',
    githubUrl: 'https://github.com/SuperBalabah/instant-view',
    metrics: 'Zero-Latency Code Sandbox',
    accentColor: '#c084fc'
  },
  {
    id: 'code-epic-quest',
    title: 'EpicQuest: Gamified Goal & Quest System',
    category: 'code',
    tags: ['Gamification', 'Productivity', 'Behavior Change'],
    featured: false,
    summary: 'RPG-style gamified goal tracking system turning daily habits and learning milestones into quest achievements.',
    description: `Applies behavioral psychology and gamification mechanics to habit formation and self-learning tracking.`,
    date: '2025-09',
    learningDuration: 'Self-Taught Gamification UI',
    techStack: ['JavaScript', 'Local Storage', 'CSS Animations'],
    demoUrl: 'https://SuperBalabah.github.io/EpicQuest/',
    githubUrl: 'https://github.com/SuperBalabah/EpicQuest',
    accentColor: '#fb7185'
  },
  {
    id: 'code-life-progress',
    title: 'Life Progress Tracker v2',
    category: 'code',
    tags: ['Visual Analytics', 'Life Progress', 'Time Perspective'],
    featured: false,
    summary: 'Minimalist visual dashboard tracking time progression, annual milestones, and life metrics.',
    description: `A perspective-shifting visual dashboard highlighting year progress, life quarters, and focused productivity blocks.`,
    date: '2025-08',
    learningDuration: 'Built in 1 Afternoon',
    techStack: ['JavaScript', 'SVG Rendering', 'CSS Modules'],
    demoUrl: 'https://SuperBalabah.github.io/life-progress-v2/',
    githubUrl: 'https://github.com/SuperBalabah/life-progress-v2',
    accentColor: '#34d399'
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
