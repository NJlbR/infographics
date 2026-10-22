import React from 'react';
import { CulturalAchievement } from '../data/culturalAchievements';
import { ArrowUpRight, Building, Palette, Film, Radio, BookOpen, Sparkles } from 'lucide-react';

interface AchievementCardProps {
  item: CulturalAchievement;
  onSelect: (item: CulturalAchievement) => void;
  onCompareToggle?: (item: CulturalAchievement) => void;
  isCompared?: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  item,
  onSelect,
  onCompareToggle,
  isCompared
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'architecture': return <Building className="w-3.5 h-3.5 text-stone-600" />;
      case 'visual_arts': return <Palette className="w-3.5 h-3.5 text-stone-600" />;
      case 'cinema_media': return <Film className="w-3.5 h-3.5 text-stone-600" />;
      case 'music_sound': return <Radio className="w-3.5 h-3.5 text-stone-600" />;
      case 'literature': return <BookOpen className="w-3.5 h-3.5 text-stone-600" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  return (
    <div 
      className="group bg-white border border-stone-200 hover:border-stone-400 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md cursor-pointer relative"
      onClick={() => onSelect(item)}
    >
      {/* Optional Card Image Banner */}
      {item.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 border-b border-stone-200">
          <img 
            src={item.image} 
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="font-serif tracking-wider drop-shadow-sm">{item.location}</span>
            <span className="font-mono tabular-nums text-stone-200 drop-shadow-sm">{item.yearDisplay}</span>
          </div>
        </div>
      ) : (
        <div className="px-5 pt-4 pb-2 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            {getCategoryIcon(item.category)}
            <span>{item.categoryLabel}</span>
          </div>
          <span className="font-mono tabular-nums font-medium text-stone-700">{item.yearDisplay}</span>
        </div>
      )}

      {/* Main Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Clean unboxed text with typographic separators) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{item.region}</span>
            <span aria-hidden="true">·</span>
            <span>{item.societalImpact.sphereLabel}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug mb-1">
            {item.title}
          </h3>

          <p className="text-xs text-stone-500 italic mb-3">
            {item.originalName}
          </p>

          <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {item.summary}
          </p>
        </div>

        {/* Societal Impact Focus Box (The Core User Requirement) */}
        <div className="pt-3 border-t border-stone-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Влияние на общество 1914–1930:
          </div>
          <p className="text-xs text-stone-800 leading-relaxed font-medium line-clamp-2">
            {item.societalImpact.headline}
          </p>

          {/* Action Row */}
          <div className="mt-4 flex items-center justify-between pt-2 text-xs">
            <span className="inline-flex items-center gap-1 text-stone-900 font-medium group-hover:translate-x-0.5 transition-transform">
              Открыть исследование
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
            </span>

            {onCompareToggle && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareToggle(item);
                }}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                  isCompared 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isCompared ? 'В сравнении' : '+ Сравнить'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
