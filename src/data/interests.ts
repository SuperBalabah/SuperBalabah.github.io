export interface InterestItem {
  id: string;
  title: string;
  tag: string;
  summary: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  accentColor?: string;
}

export const INTERESTS_DATA: InterestItem[] = [
  {
    id: 'interest-mma',
    title: 'MMA',
    tag: 'Martial Arts',
    summary: 'Mixed martial arts training, sparring, and takedowns.',
    imageUrl: './interests/mma.jpg',
    accentColor: '#ef4444'
  },
  {
    id: 'interest-hiking',
    title: 'Hiking',
    tag: 'Outdoors',
    summary: 'Mountain trekking and trails across Taiwan.',
    imageUrl: './interests/hiking-taipei101.jpg',
    secondaryImageUrl: './interests/hiking-clouds.jpg',
    accentColor: '#10b981'
  },
  {
    id: 'interest-crafts',
    title: 'Handcrafts',
    tag: 'Crafting',
    summary: 'Needle felting, clay sculpting, and perler bead art.',
    imageUrl: './interests/craft-hedgehog.jpg',
    secondaryImageUrl: './interests/craft-popcat.jpg',
    accentColor: '#f59e0b'
  },
  {
    id: 'interest-go',
    title: 'Go (Weiqi)',
    tag: 'Board Game',
    summary: 'Playing Go (Weiqi), analyzing games and Joseki.',
    imageUrl: './interests/go-atelier.jpg',
    accentColor: '#deb070'
  },
  {
    id: 'interest-iching',
    title: 'I Ching',
    tag: 'Divination',
    summary: 'I Ching divination and classical hexagram study.',
    imageUrl: './interests/iching-bagua.png',
    accentColor: '#818cf8'
  }
];

