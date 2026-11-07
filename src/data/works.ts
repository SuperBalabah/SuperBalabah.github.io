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
  // ORIGINAL MUSIC (4 Studio Originals)
  // ==========================================
  {
    id: 'original-we-were',
    title: 'We Were',
    category: 'original',
    tags: ['Original Music', 'Indie Folk', 'Acoustic Guitar', 'Lyrics: GPT', 'English'],
    featured: true,
    summary: 'Acoustic indie folk. Lyrics by GPT, composed and performed by SuperBalabah.',
    description: `### 🎸 We Were
- **Lyrics**: GPT
- **Composition & Vocal**: SuperBalabah
- **Instrumentation**: Acoustic Guitar & Vocal

### 📝 Lyric Excerpt
> *"We were dancing in a parking lot, headlights drawing lines,*  
> *Laughing like the world would stop if we just froze in time.*  
> *But every story takes a turn when no one reads the signs—*  
> *Now I trace your name in windows fogged with nights I can’t rewind.*  
> *(la)"*`,
    date: '2026-06',
    learningDuration: 'Original Composition & Fingerpicking',
    audioDuration: '01:04',
    audioUrl: './audio/we-were.mp3',
    metrics: 'Acoustic Guitar & Vocal',
    accentColor: '#c084fc'
  },
  {
    id: 'original-post-summer',
    title: 'post-summer',
    category: 'original',
    tags: ['Original Music', 'Mandarin Pop-Rock', 'Electric Guitar', 'Yooga Lin', 'Mandarin'],
    featured: true,
    summary: 'Mandarin pop-rock original. Composition, lyrics & vocal by SuperBalabah, electric guitar by Yooga Lin.',
    description: `### 🎸 post-summer
- **Composition, Lyrics & Vocal**: SuperBalabah
- **Electric Guitar**: Yooga Lin
- **Genre**: Mandarin Pop-Rock

### 📝 Lyric Excerpt
> *"過了幾個節*  
> *就當不再見*  
> *我知道熱鬧你不缺*  
> *就這樣一年又一年*  
> *這麼多 個冬天 習慣了一個人跨年*  
> *地球在繞圈 我還在原點"*`,
    date: '2026-07',
    learningDuration: 'Studio Vocal & Electric Guitar Duo',
    audioDuration: '00:43',
    audioUrl: './audio/post-summer.mp3',
    metrics: 'Electric Guitar & Vocal',
    accentColor: '#38bdf8'
  },
  {
    id: 'original-he-yi-wei',
    title: '何意味',
    category: 'original',
    tags: ['Original Music', 'English & Mandarin', 'Indie Pop', 'Bilingual', 'Vocal'],
    featured: true,
    summary: 'Bilingual indie pop original exploring emotional friction. Lyrics, composition & vocal by SuperBalabah.',
    description: `### 🎹 何意味
- **Lyrics, Composition & Vocal**: SuperBalabah
- **Genre**: Bilingual Indie Pop (English & Mandarin)

### 📝 Lyric Excerpt
> *"Why are we wasting time*  
> *with someone we don’t like*  
> *You said you’re out tonight,*  
> *giving some awkward his*  
>  
> *So what do we got*  
> *Is it where our happiness’s from?*  
> *Or sucky memories that*  
> *we seems like already forgot*  
>  
> *Life is a journey*  
> *Don’t make it jeopardy*  
> *這種人最精了*  
> *都說是沒有選擇*  
> *不過是自找的"*`,
    date: '2026-07',
    learningDuration: 'Original Composition & Vocal Tracking',
    audioDuration: '00:52',
    audioUrl: './audio/he-yi-wei.mp3',
    metrics: 'Bilingual Vocal & Pop',
    accentColor: '#ec4899'
  },
  {
    id: 'original-yunlin-lullaby',
    title: '雲林晚安頌',
    category: 'original',
    tags: ['Original Music', 'Acoustic Folk', 'Mandarin', 'Bedside Compassion', 'Vocal'],
    featured: true,
    summary: 'Acoustic folk original written during rural medical internship. Lyrics, composition, fingerpicking & vocal by SuperBalabah.',
    description: `### 🌾 雲林晚安頌
- **Lyrics, Composition, Guitar & Vocal**: SuperBalabah
- **Background**: Warm bedside acoustic folk composed late at night during a rural clinical rotation in Yunlin.

### 📝 Lyric Excerpt
> *"晚風 吹啊吹啊吹 吹進誰的夢*  
> *想念是否都在離別後*  
> *小燕鷗 飛呀飛呀飛 月光落床頭*  
> *看看我 別忘了我來過*  
> *(la)"*`,
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
    tags: ['Indie Folk', 'Ambient Electric', 'Baritone', 'English'],
    featured: true,
    summary: 'Elvis Presley classic. Ambient electric guitar & warm baritone vocal by SuperBalabah.',
    description: `### 🌌 Can't Help Falling in Love
- **Original**: Elvis Presley
- **Arrangement & Vocal**: SuperBalabah
- **Instrumentation**: Ambient Electric Guitar & Baritone Vocal`,
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
    tags: ['R&B', 'Acoustic Groove', 'Fingerstyle', 'English'],
    featured: false,
    summary: 'dhruv R&B ballad. Acoustic fingerstyle groove & breathy vocal by SuperBalabah.',
    description: `### 🍃 double take
- **Original**: dhruv
- **Arrangement & Vocal**: SuperBalabah
- **Instrumentation**: Acoustic Fingerstyle Guitar & Breathy Vocal`,
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
    tags: ['J-Pop', 'Spatial Electric', 'Head Voice', 'Japanese & English'],
    featured: false,
    summary: 'Utada Hikaru classic. Spatial electric guitar & head-voice vocal by SuperBalabah.',
    description: `### ❄️ First Love
- **Original**: 宇多田光 (Utada Hikaru)
- **Arrangement & Vocal**: SuperBalabah
- **Instrumentation**: Spatial Electric Guitar & Head-Voice Vocal`,
    date: '2026-05',
    audioDuration: '00:43',
    audioUrl: './audio/first-love.mp3',
    metrics: 'Electric Guitar & Vocal',
    accentColor: '#818cf8'
  },
  {
    id: 'cover-lantingxu',
    title: "蘭亭序 (粵語)",
    category: 'cover',
    tags: ['Cantonese', 'Classical Flow', 'Pop', 'Acoustic Guitar'],
    featured: false,
    summary: 'Jay Chou classic. Cantonese lyrical adaptation, vocal & acoustic guitar by SuperBalabah.',
    description: `### 🎋 蘭亭序 (粵語)
- **Original**: Jay Chou (周杰倫)
- **Cantonese Lyric Adaptation, Vocal & Guitar**: SuperBalabah
- **Instrumentation**: Acoustic Guitar & Vocal`,
    date: '2026-06',
    audioDuration: '00:44',
    audioUrl: './audio/lantingxu-cantonese.mp3',
    metrics: 'Cantonese Vocal',
    accentColor: '#34d399'
  },
  {
    id: 'cover-creep',
    title: "Creep (Acappella)",
    category: 'cover',
    tags: ['Acappella', 'Rock', 'Chest Belting', 'English'],
    featured: true,
    summary: 'Radiohead rock climax. Pure unaccompanied acappella vocal by SuperBalabah.',
    description: `### ⚡ Creep (Acappella)
- **Original**: Radiohead
- **Performance**: SuperBalabah
- **Style**: Pure Unaccompanied Vocal (No instruments), Rock Climax`,
    date: '2026-07',
    audioDuration: '00:52',
    audioUrl: './audio/creep-acappella.mp3',
    metrics: 'Pure Vocal Acappella',
    accentColor: '#f59e0b'
  },
  {
    id: 'cover-wuyanhua',
    title: "無言花",
    category: 'cover',
    tags: ['Taiwanese', 'Taiwanese Folk', 'Acoustic Guitar', 'Hokkien'],
    featured: false,
    summary: 'Classic Taiwanese folk ballad. Acoustic fingerstyle guitar & vocal by SuperBalabah.',
    description: `### 🌺 無言花
- **Original**: Jody Chiang (江蕙) / Hsiao Huang-chi (蕭煌奇)
- **Performance & Fingerstyle Guitar**: SuperBalabah (Taiwanese Hokkien)
- **Instrumentation**: Acoustic Guitar & Vocal`,
    date: '2026-07',
    audioDuration: '01:04',
    audioUrl: './audio/wuyanhua.mp3',
    metrics: 'Taiwanese Hokkien Vocal',
    accentColor: '#fb7185'
  },
  {
    id: 'cover-chumai',
    title: "出賣",
    category: 'cover',
    tags: ['Mandarin', 'Pop-Rock', 'Emotional Vocal', 'Vocal'],
    featured: false,
    summary: 'Classic Mandarin pop-rock ballad. High-register chest voice vocal by SuperBalabah.',
    description: `### 🎙️ 出賣
- **Original**: Na Ying (那英) / Steve Chou (周傳雄)
- **Performance & Vocal**: SuperBalabah
- **Genre**: Mandarin Pop-Rock`,
    date: '2026-07',
    audioDuration: '01:50',
    audioUrl: './audio/chumai.mp3',
    metrics: 'Mandarin Pop-Rock',
    accentColor: '#e11d48'
  },
  {
    id: 'cover-amend',
    title: "Amend (Wordless)",
    category: 'cover',
    tags: ['Wordless', 'Body Percussion', 'Finger Snaps', 'Vocalise'],
    featured: false,
    summary: 'j^p^n groove. Wordless vocalise, chest thumps & finger snaps by SuperBalabah.',
    description: `### 🥁 Amend
- **Original**: j^p^n
- **Performance**: SuperBalabah
- **Instrumentation**: Pure Body Acoustics (Chest Thump Kick, Finger Snap Snare, Wordless Humming)`,
    date: '2026-06',
    audioDuration: '00:23',
    audioUrl: './audio/amend.mp3',
    metrics: 'Body Percussion & Vocalise',
    accentColor: '#a855f7'
  }
];
