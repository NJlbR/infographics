import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface ArchivalImageProps {
  src?: string;
  alt: string;
  caption?: string;
  year?: string;
  location?: string;
  className?: string;
}

export const ArchivalImage: React.FC<ArchivalImageProps> = ({
  src,
  alt,
  caption,
  year,
  location,
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-stone-100 border border-stone-200/80 group ${className}`}>
      {/* Fallback container if image missing or failed */}
      {(!src || hasError) ? (
        <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-100 to-stone-200">
          <ImageOff className="w-8 h-8 text-stone-400 mb-2" />
          <p className="text-xs font-serif text-stone-600 font-medium">{alt}</p>
          <span className="text-[10px] text-stone-400 font-mono mt-1">Архивный визуальный документ</span>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] ${
              isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xs'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

          {/* Badges on image */}
          {(year || location) && (
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs drop-shadow-md">
              <span className="font-serif italic text-stone-100">{location}</span>
              <span className="font-mono tabular-nums font-semibold bg-stone-900/60 backdrop-blur-xs px-2.5 py-0.5 rounded text-stone-200">
                {year}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Caption strip */}
      {caption && (
        <div className="p-3 bg-stone-50/95 border-t border-stone-200 text-xs font-serif text-stone-600 italic flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-[10px] font-sans font-normal uppercase tracking-wider text-stone-400">
            Архивный снимок
          </span>
        </div>
      )}
    </div>
  );
};
