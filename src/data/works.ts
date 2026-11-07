import { WorkItem } from '../types/work';

export const WORKS_DATA: WorkItem[] = [
  // ==========================================
  // CLINICAL RESEARCH & MACHINE LEARNING (First-Author Temporal Validation Study)
  // ==========================================
  {
    id: 'research-er-triage-ai',
    title: 'Emergency Disposition AI: Multi-Center Temporal Validation Study',
    category: 'public_health',
    tags: ['Clinical AI', 'BERT NLP', 'LightGBM', 'Multi-Center Study', 'Temporal Validation', 'SHAP (XAI)', 'Under Review'],
    featured: true,
    summary: 'A multi-center temporal validation study across 4 NTUH hospital campuses (N = 160,407). Integrates routine triage vitals with BERT semantic text embeddings to predict ED disposition within 5 minutes of arrival, substantially outperforming real-world TTAS triage (AUROC 0.8482 vs 0.6483).',
    description: `### 🏥 Multi-Center Emergency Clinical AI (Under Review)
- **Authors**: **Yi-Yang Hsieh (First Author)**, Chih-Yang Hsiao, M.D., Ph.D. (Corresponding Author)  
- **Affiliation**: School of Medicine, College of Medicine, National Taiwan University & National Taiwan University Hospital (NTUH)  
- **Status**: *Manuscript currently under peer review in an international clinical journal (2026).*

---

### 🔬 Executive Abstract
- **The Clinical Bottleneck**: Emergency Department (ED) crowding is an alarming global crisis, severely compromising acute care delivery and directly correlating with inpatient mortality and clinician burnout. Standard rule-based triage systems (e.g., TTAS, ESI) assess immediate clinical urgency rather than downstream hospitalization needs. Meanwhile, existing machine learning models frequently rely on downstream blood tests or imaging that introduce critical diagnostic delays.
- **Our Solution**: Developed an early, lightweight decision-support pipeline predicting hospital disposition within 5 minutes of patient arrival—strictly utilizing routine non-invasive triage vitals and 768-dimensional continuous semantic embeddings extracted from unstructured chief complaint free-text via \`bert-base-chinese\`.
- **Large-Scale Multi-Center Cohort**: Curated **N = 160,407** multi-center ED visits across four hospital campuses within the National Taiwan University Hospital healthcare system over 7 years (2016–2022). Departing from over-optimistic random splits, we enforced strict multi-year temporal partitioning: training on 2016–2020 encounters (n = 124,934), tuning hyperparameters and threshold calibration on 2021 (n = 17,055), and evaluating generalizability on a held-out prospective 2022 test cohort (n = 18,418).
- **Key Findings & Performance**: On the 2022 test cohort, the proposed model achieved an **AUROC of 0.8482** and **AUPRC of 0.6691**, significantly outperforming traditional five-level TTAS triage (AUROC = 0.6483, AUPRC = 0.3606) and structured-only gradient boosting (AUROC = 0.8264). At the sensitivity-oriented threshold of 0.30, the model delivered **86.83% sensitivity** and **94.17% negative predictive value (NPV)**.

---

### 💡 Four Methodological & Translational Innovations
1. **160,407 Multi-Center Temporal Cohort**: Spans primary tertiary academic medical centers and regional satellite campuses across 7 years.
2. **Zero-Delay Pre-Physician Prediction**: Eliminates reliance on laboratory tests or CT reports; provides risk estimates within minutes of patient arrival at triage.
3. **Rigorous Temporal Partitioning**: Departed from conventional random splits to empirically prove robustness against temporal disease distribution shifts.
4. **Explainable AI (XAI) with SHAP**: Global and local feature attributions quantify non-linear vital sign thresholds and chief complaint semantic risk contributions.

> [!NOTE]
> **Manuscript Status**: Full paper text, experimental notebooks, and model weights are under peer review. Complete draft and anonymized validation code are available upon academic request.`,
    date: '2026-04',
    learningDuration: 'First Author • 160k Cohort',
    techStack: ['Python', 'BERT NLP', 'LightGBM', 'SHAP (XAI)', 'Pandas/NumPy', 'Scikit-Learn'],
    imageUrl: './previews/preview-er-model.jpg',
    metrics: 'AUROC 0.8482 (N = 160,407)',
    accentColor: '#10b981'
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
  // ORIGINAL MUSIC (3 Real Studio Recordings)
  // ==========================================
  {
    id: 'original-we-were',
    title: 'Original Song: "We Were"',
    category: 'original',
    tags: ['Original Music', 'Indie Folk', 'Acoustic Guitar', 'AI Lyricism (GPT)', 'Vocal Performance'],
    featured: true,
    summary: 'An acoustic indie folk original composed and performed by Yi-Yang Hsieh, featuring AI-collaborated lyrics (via GPT) exploring temporal transience and memory.',
    description: `### 🎸 Acoustic Indie Folk Original
- **Composition & Vocal**: Yi-Yang Hsieh
- **Instrumentation**: Fingerstyle Acoustic Guitar & Lead Vocal
- **Lyricism**: Human-AI Collaborative Lyric Writing (GPT-4)
- **Production**: Recorded & Arranged in Personal Studio (Logic Pro)
- **Language**: English

### 💡 Creative & Engineering Concept
A thoughtful exploration of human-AI artistic synergy. While the poetic framework was ideated in conversation with GPT, the acoustic fingerpicking, melodic composition, vocal phrasing, and emotional dynamics were crafted and performed organically.

### 📝 Featured Lyric Excerpt
> *"We were shadows dancing in the dawn,*  
> *Tracing circles where the light had gone.*  
> *Every silence that we left behind,*  
> *Whispers softly in the back of my mind."*`,
    date: '2026-06',
    learningDuration: 'Original Composition & Fingerpicking',
    audioDuration: '01:04',
    audioUrl: './audio/we-were.mp3',
    metrics: 'Acoustic Guitar & Vocal',
    accentColor: '#c084fc'
  },
  {
    id: 'original-post-summer',
    title: 'Original Song: "Post-Summer (後夏)"',
    category: 'original',
    tags: ['Original Music', 'Mandarin Pop-Rock', 'Electric Guitar', 'Band Collaboration', 'Studio Vocal'],
    featured: true,
    summary: 'A bittersweet Mandarin pop-rock original capturing late-summer nostalgia. Features layered vocal harmonies alongside studio electric guitar tracking in collaboration with a fellow musician.',
    description: `### 🎸 Mandarin Pop-Rock Collaboration
- **Composition, Lyrics & Vocal**: Yi-Yang Hsieh
- **Electric Guitar Arrangement**: Collaborative Musician Friend
- **Production**: Multi-track Studio Recording & Mixing
- **Language**: Mandarin Chinese (中文)

### 💡 Musical Highlights
Clean, expressive lead vocals backed by textured electric guitar chord progressions. Captures the ephemeral warmth and wistfulness at the turn of summer.`,
    date: '2026-07',
    learningDuration: 'Studio Vocal & Electric Guitar Duo',
    audioDuration: '00:43',
    audioUrl: './audio/post-summer.mp3',
    metrics: 'Electric Guitar & Vocal',
    accentColor: '#38bdf8'
  },
  {
    id: 'original-yunlin-lullaby',
    title: 'Original Song: "Yunlin Lullaby (雲林晚安頌)"',
    category: 'original',
    tags: ['Original Music', 'Acoustic Folk', 'Mandarin & Local Care', 'Medical Student Life', 'Bedside Compassion'],
    featured: true,
    summary: 'A warm acoustic lullaby composed during medical training in Yunlin, Taiwan. Reflects gentle empathy, rural landscape serenity, and bedside care.',
    description: `### 🌾 Acoustic Folk & Clinical Compassion
- **Songwriting & Performance**: Yi-Yang Hsieh
- **Instrumentation**: Warm Acoustic Fingerpicking & Intimate Vocal
- **Production**: Home Studio Acoustic Tracking
- **Language**: Mandarin Chinese (中文)

### 💡 Narrative & Medical Context
Written late at night during clinical rotations in Yunlin, capturing the peaceful stillness of rural Taiwan and soothing exhaustion after intense clinical hours.`,
    date: '2026-07',
    learningDuration: 'Acoustic Fingerpicking & Bedside Folk',
    audioDuration: '01:09',
    audioUrl: './audio/yunlin-lullaby.mp3',
    metrics: 'Acoustic Guitar & Vocal',
    accentColor: '#34d399'
  },

  // ==========================================
  // FEATURED COVERS (8 Curated Studio Recordings)
  // ==========================================
  {
    id: 'cover-cant-help-falling-in-love',
    title: "Can't Help Falling in Love",
    category: 'cover',
    tags: ['Indie Folk', 'Ambient Electric Guitar', 'Low Baritone Warmth', 'English Classic'],
    featured: true,
    summary: 'Reimagined arrangement of Elvis Presley’s timeless classic. Features spatial ambient electric guitar swells with warm, resonant low-baritone vocal phrasing.',
    description: `### 🌌 Ambient Electric Folk Reimagining
- **Original Artist**: Elvis Presley
- **Arrangement**: Ambient Electric Guitar & Lead Vocal by Yi-Yang Hsieh
- **Vocal Style**: Warm, grounded baritone register with subtle spatial reverb tail
- **Language**: English`,
    date: '2026-05',
    audioDuration: '01:02',
    audioUrl: './audio/cant-help-falling-in-love.mp3',
    metrics: 'Electric Guitar & Vocal',
    accentColor: '#38bdf8'
  },
  {
    id: 'cover-double-take',
    title: "double take",
    category: 'cover',
    tags: ['R&B', 'Acoustic Groove', 'Fingerstyle Guitar', 'Airy Phrasing'],
    featured: false,
    summary: 'Acoustic fingerstyle arrangement of dhruv’s viral contemporary R&B ballad, featuring rhythmic string percussives and intimate, breathy vocal dynamics.',
    description: `### 🍃 Modern R&B Fingerstyle Arrangement
- **Original Artist**: dhruv
- **Arrangement**: Acoustic Fingerpicking & Vocal by Yi-Yang Hsieh
- **Vocal Style**: Modern breathy delivery with delicate dynamic shading
- **Language**: English`,
    date: '2026-06',
    audioDuration: '00:36',
    audioUrl: './audio/double-take.mp3',
    metrics: 'Fingerstyle & Vocal',
    accentColor: '#fb7185'
  },
  {
    id: 'cover-first-love',
    title: "First Love",
    category: 'cover',
    tags: ['Ambient Electric', 'J-Pop Classic', 'Head Voice', 'Bilingual English/Japanese'],
    featured: false,
    summary: 'Spatial electric guitar interpretation of Utada Hikaru’s iconic melody, navigating ethereal head-voice phrasing across English and Japanese lyrics.',
    description: `### ❄️ Spatial Electric J-Pop Interpretation
- **Original Artist**: Utada Hikaru (宇多田光)
- **Arrangement**: Ambient Electric Guitar & Vocal by Yi-Yang Hsieh
- **Vocal Style**: Ethereal head-voice control with crystalline delay reflections
- **Language**: English & Japanese (英日混語)`,
    date: '2026-05',
    audioDuration: '00:43',
    audioUrl: './audio/first-love.mp3',
    metrics: 'Electric Guitar & Vocal',
    accentColor: '#818cf8'
  },
  {
    id: 'cover-lantingxu',
    title: "Lanting Xu (蘭亭序 • 粵語版)",
    category: 'cover',
    tags: ['Cantonese Pop', 'Classical Chinese Flow', 'Vocal Phrasing', 'Cross-Cultural'],
    featured: false,
    summary: 'Rare Cantonese lyrical rendition of Jay Chou’s magnum opus, weaving classical poetic imagery with nuanced Cantonese tone inflections and acoustic accompaniment.',
    description: `### 🎋 Cantonese Classical Poetic Rendition
- **Original Composition**: Jay Chou (周杰倫)
- **Vocal Performance**: Yi-Yang Hsieh (Cantonese lyric adaptation)
- **Language**: Cantonese (粵語)
- **Vocal Style**: Poetic vocal diction highlighting nine-tone Cantonese musicality`,
    date: '2026-06',
    audioDuration: '00:44',
    audioUrl: './audio/lantingxu-cantonese.mp3',
    metrics: 'Cantonese Vocal',
    accentColor: '#34d399'
  },
  {
    id: 'cover-creep',
    title: "Creep (Acappella Climax)",
    category: 'cover',
    tags: ['Acappella', 'Alt-Rock', 'Raw Vocal Dynamics', 'Full-Chest Belting'],
    featured: true,
    summary: 'Pure unaccompanied acappella rendition of Radiohead’s iconic climax. Demonstrates raw chest-voice power, transition control, and emotional intensity with zero instruments.',
    description: `### ⚡ Unaccompanied Acappella Rock Dynamics
- **Original Artist**: Radiohead
- **Performance**: Pure Vocal Acappella (No backing instruments) by Yi-Yang Hsieh
- **Vocal Style**: Dynamic leap from tender whisper to high-intensity chest belting
- **Language**: English`,
    date: '2026-07',
    audioDuration: '00:52',
    audioUrl: './audio/creep-acappella.mp3',
    metrics: 'Pure Vocal Acappella',
    accentColor: '#f59e0b'
  },
  {
    id: 'cover-wuyanhua',
    title: "Silent Flower (無言花)",
    category: 'cover',
    tags: ['Taiwanese Folk', 'Hokkien Heritage', 'Emotional Phrasing', 'Acoustic Guitar'],
    featured: false,
    summary: 'Deeply expressive acoustic arrangement of the legendary Taiwanese ballad. Showcases traditional Hokkien vocal ornamentation and grounded acoustic resonance.',
    description: `### 🌺 Taiwanese Hokkien Heritage Ballad
- **Original Song**: Jody Chiang (江蕙) / Hsiao Huang-chi
- **Arrangement**: Acoustic Guitar & Vocal by Yi-Yang Hsieh
- **Language**: Taiwanese Hokkien (台語)
- **Vocal Style**: Tender, heartfelt Taiwanese emotional ornamentation`,
    date: '2026-07',
    audioDuration: '01:04',
    audioUrl: './audio/wuyanhua.mp3',
    metrics: 'Taiwanese Hokkien Vocal',
    accentColor: '#fb7185'
  },
  {
    id: 'cover-chumai',
    title: "Betrayal (出賣)",
    category: 'cover',
    tags: ['Pop-Rock', 'Mandarin Classic', 'Emotional Drive', 'Studio Vocal'],
    featured: false,
    summary: 'Passionate Mandarin pop-rock interpretation of Na Ying / Steve Chou’s classic, building from melancholic verse into a full-throated, resonant chorus.',
    description: `### 🎙️ Mandarin Pop-Rock Vocal Delivery
- **Original Artist**: Na Ying (那英) / Steve Chou (周傳雄)
- **Arrangement**: Studio Vocal Performance by Yi-Yang Hsieh
- **Language**: Mandarin Chinese (中文)
- **Vocal Style**: Expansive dynamic build-up from subdued verse to soaring chorus`,
    date: '2026-07',
    audioDuration: '01:50',
    audioUrl: './audio/chumai.mp3',
    metrics: 'Mandarin Pop-Rock',
    accentColor: '#e11d48'
  },
  {
    id: 'cover-amend',
    title: "Amend (Body Percussion & Vocalise)",
    category: 'cover',
    tags: ['Vocalise', 'Body Percussion', 'Finger Snaps', 'Avant-Garde Folk'],
    featured: false,
    summary: 'An organic, wordless vocalise groove powered solely by natural body acoustics: chest thumps for kick, finger snaps for backbeat, and layered vocal humming.',
    description: `### 🥁 Organic Body Percussion & Wordless Vocalise
- **Original Artist**: j^p^n
- **Performance**: Wordless Humming, Chest Thump Kick, and Finger Snap Snare by Yi-Yang Hsieh
- **Style**: Avant-garde acoustic rhythm without instruments or electronic drums`,
    date: '2026-06',
    audioDuration: '00:23',
    audioUrl: './audio/amend.mp3',
    metrics: 'Body Percussion & Vocalise',
    accentColor: '#a855f7'
  }
];
