import React, { useState } from 'react';
import { InterestItem } from '../data/interests';
import { Images } from 'lucide-react';

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

        {/* Multiple photos hint & dot indicator at bottom center of the image */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 flex justify-center items-center pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono text-slate-300 shadow-md">
              <span>Click photo to switch</span>
              <div className="flex gap-1 ml-1 items-center">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-1.5 h-1.5 rounded-full transition-all ${
                      activeIdx === idx ? 'bg-amber-400 scale-125' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
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
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/25 hover:bg-amber-500/20 transition-all cursor-pointer"
              title="Click to switch photo"
            >
              <Images className="w-3.5 h-3.5 text-amber-400" />
              <span>2 Photos</span>
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

