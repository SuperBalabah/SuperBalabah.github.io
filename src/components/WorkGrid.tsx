import React from 'react';
import { WorkItem } from '../types/work';
import { WorkCard } from './WorkCard';
import { AnimatePresence } from 'framer-motion';

interface WorkGridProps {
  works: WorkItem[];
  onSelectWork: (work: WorkItem) => void;
}

export const WorkGrid: React.FC<WorkGridProps> = ({ works, onSelectWork }) => {
  if (works.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="glass-panel p-12 max-w-md mx-auto space-y-3">
          <p className="font-serif text-xl text-[var(--text-primary)]">No matching entry found in Vault</p>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Try adjusting your search query or filter tags.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <AnimatePresence>
          {works.map((work) => (
            <WorkCard key={work.id} item={work} onSelect={onSelectWork} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
