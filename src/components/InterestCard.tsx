import React, { useState } from 'react';
import { InterestItem } from '../data/interests';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InterestCardProps {
  item: InterestItem;
}

export const InterestCard: React.FC<InterestCardProps> = ({ item }) => {
  const images = item.secondaryImageUrl ? [item.imageUrl, item.secondaryImageUrl] : [item.imageUrl];
  const [activeIdx, setActiveIdx] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="matte-card mist-card border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-amber-500/40 transition-all rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
      {/* Image Container */}
      <div className="relative w-full h-52 sm:h-56 bg-[#0f1115] overflow-hidden">
        <img
          src={images[activeIdx]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161920]/90 via-transparent to-transparent opacity-60" />

        {/* Tag badge on top-left */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black/60 text-amber-400 border border-amber-500/30 backdrop-blur-md">
            {item.tag}
          </span>
        </div>

        {/* Image pagination controls if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            <button
              onClick={prevImg}
              className="text-slate-300 hover:text-white transition p-0.5"
              title="Previous photo"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-300">
              {activeIdx + 1}/{images.length}
            </span>
            <button
              onClick={nextImg}
              className="text-slate-300 hover:text-white transition p-0.5"
              title="Next photo"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
        <h4 className="text-base font-bold text-[#f0ede6] group-hover:text-amber-300 transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-slate-300 font-light leading-relaxed">
          {item.summary}
        </p>
      </div>
    </div>
  );
};
