"use client";

import { useState } from "react";

export default function BuildingGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] w-full bg-forest-dark overflow-hidden border border-gold/20 relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
          className="w-full h-full object-cover"
          alt="Primary Property View placeholder"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[16/9] w-full bg-forest-dark overflow-hidden border border-gold/20 relative group">
        <img
          src={images[activeIndex]?.url}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt="Primary Property View"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square w-full bg-forest-dark border overflow-hidden cursor-pointer transition-all duration-500 ${
                activeIndex === idx
                  ? "border-gold shadow-lg scale-105 grayscale-0"
                  : "border-gold/10 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.url}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                alt="Thumbnail"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
