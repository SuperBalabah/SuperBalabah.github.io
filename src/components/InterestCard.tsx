import React, { useState } from 'react';
import { InterestItem } from '../data/interests';
import { ArrowLeftRight } from 'lucide-react';

interface InterestCardProps {
  item: InterestItem;
}

export const InterestCard: React.FC<InterestCardProps> = ({ item }) => {
  const images = item.secondaryImageUrl ? [item.imageUrl, item.secondaryImageUrl] : [item.imageUrl];
  const [activeIdx, setActiveIdx] = useState(0);

  const toggleImage = () => {
    if (images.length > 1) {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div className="matte-card mist-card border border-white/15 bg-[#161920]/85 backdrop-blur-xl hover:border-amber-500/40 transition-all rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
      {/* Clickable Image Container */}
      <div
        onClick={toggleImage}
        className={`relative w-full h-52 sm:h-56 bg-[#0f1115] overflow-hidden ${
          images.length > 1 ? 'cursor-pointer' : ''
        }`}
        title={images.length > 1 ? 'Click photo to switch' : undefined}
      >
        <img
          src={images[activeIdx]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161920]/90 via-transparent to-transparent opacity-60" />

        {/* Tag badge on top-left */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black/60 text-amber-400 border border-amber-500/30 backdrop-blur-md">
            {item.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-[#f0ede6] group-hover:text-amber-300 transition-colors">
            {item.title}
          </h4>
          {images.length > 1 && (
            <button
              onClick={toggleImage}
              className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer select-none group/switch whitespace-nowrap"
              title="Click photo or this button to switch"
            >
              <span className="font-mono text-[10px] text-slate-300">
                {activeIdx + 1}/{images.length}
              </span>
              <div className="flex gap-1 items-center">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block rounded-full transition-all ${
                      activeIdx === idx
                        ? 'w-1.5 h-1.5 bg-amber-400'
                        : 'w-1.5 h-1.5 bg-white/25'
                    }`}
                  />
                ))}
              </div>
              <ArrowLeftRight className="w-2.5 h-2.5 text-slate-400 group-hover/switch:text-amber-400 transition-colors" />
            </button>
          )}
        </div>
        <p className="text-xs text-slate-300 font-light leading-relaxed">
          {item.summary}
        </p>
      </div>
    </div>
  );
};

