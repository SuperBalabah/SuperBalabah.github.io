export type WorkCategory = 'all' | 'featured' | 'code' | 'original' | 'cover' | 'public_health';

export interface WorkItem {
  id: string;
  title: string;
  category: 'code' | 'original' | 'cover' | 'public_health';
  tags: string[];
  featured: boolean;
  summary: string;
  description?: string;
  date: string;
  learningDuration?: string; // e.g. "Self-Taught in 48 Hours"
  techStack?: string[];
  audioUrl?: string; // Audio file / synthesizer preset
  audioDuration?: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: string; // e.g. "1,500+ Plays", "Used by 3 Research Groups"
  accentColor?: string; // Hex / HSL for card highlight
}

export interface ProfileInfo {
  name: string;
  title: string;
  targetProgram: string;
  tagline: string;
  bio: string;
  executiveSummary: string[];
  email: string;
  github: string;
  soundcloud: string;
  stats: {
    codeCount: number;
    originalCount: number;
    coverCount: number;
    researchCount: number;
  };
}
