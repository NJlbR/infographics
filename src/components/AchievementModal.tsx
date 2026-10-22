import React, { useEffect } from 'react';
import { CulturalAchievement } from '../data/culturalAchievements';
import { X, Calendar, MapPin, Users, Lightbulb, TrendingUp, Quote, CheckCircle2 } from 'lucide-react';

interface AchievementModalProps {
  item: CulturalAchievement | null;
  onClose: () => void;
  onCompareToggle?: (item: CulturalAchievement) => void;
  isCompared?: boolean;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({
  item,
  onClose,
  onCompareToggle,
  isCompared
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/70 backdrop-blur-xs transition-opacity duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#FBF9F5] border border-stone-300 w-full max-w-4xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-800 uppercase tracking-wider">{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{item.yearDisplay}</span>
            <span aria-hidden="true">·</span>
            <span>{item.region}</span>
          </div>

          <div className="flex items-center gap-2">
            {onCompareToggle && (
              <button
                type="button"
                onClick={() => onCompareToggle(item)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  isCompared 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                {isCompared ? 'В сравнении' : '+ Сравнить'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Header titles */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 leading-tight">
              {item.title}
            </h2>
            <p className="text-sm font-serif italic text-stone-600 mt-1">
              {item.originalName}
            </p>
          </div>

          {/* Media image if available */}
          {item.image && (
            <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
              <img 
                src={item.image} 
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-96 object-cover"
              />
              <div className="p-3 bg-stone-100/90 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-serif">
                <span>{item.manifestoOrWork}</span>
                <span className="font-sans text-stone-500">{item.location}</span>
              </div>
            </div>
          )}

          {/* Summary section */}
          <div className="text-stone-800 text-base leading-relaxed max-w-3xl">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:mt-0.5 text-stone-700">
              {item.summary}
            </p>
          </div>

          {/* CRITICAL CORE REQUIREMENT: Societal Impact in 1914–1930 */}
          <section className="bg-white p-6 md:p-7 rounded-xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <TrendingUp className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Влияние на развитие общества 1914–1930 гг.
              </h3>
            </div>

            {/* Headline summary of impact */}
            <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                Ключевой социальный сдвиг эпохи:
              </div>
              <p className="text-stone-900 font-medium text-base leading-snug">
                {item.societalImpact.headline}
              </p>
            </div>

            {/* Before 1914 vs 1914-1930 Transition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  До 1914 года (Старый порядок):
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {item.societalImpact.before1914}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-semibold text-amber-800 uppercase tracking-wider block mb-1">
                  Трансформация в 1914–1930 гг.:
                </span>
                <p className="text-stone-800 font-medium leading-relaxed">
                  {item.societalImpact.transformation1920s}
                </p>
              </div>
            </div>

            {/* Vectors of Societal Transformation */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-600">
                Конкретные измерения социального воздействия:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {item.societalImpact.vectors.map((vec, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex flex-col justify-between">
                    <div>
                      <div className="font-serif text-sm font-bold text-stone-900 mb-1.5 flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>{vec.dimension}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {vec.description}
                      </p>
                    </div>
                    {vec.statOrFact && (
                      <div className="mt-3 pt-2 border-t border-stone-200 text-xs font-mono text-stone-700 bg-stone-100/60 p-1.5 rounded">
                        {vec.statOrFact}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Motto / Historic Quote */}
            {item.societalImpact.socialMotto && (
              <div className="p-4 border-l-2 border-amber-600 bg-stone-50 rounded-r-lg flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-700 shrink-0 mt-1" />
                <p className="text-sm font-serif italic text-stone-800 leading-relaxed">
                  {item.societalImpact.socialMotto}
                </p>
              </div>
            )}
          </section>

          {/* Artistic and Technical Innovations */}
          <section className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-stone-700" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Художественные и технологические инновации
              </h3>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {item.artisticInnovation}
            </p>
          </section>

          {/* Key figures and context definition list */}
          <div className="border-t border-stone-200 pt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs">
              <div>
                <dt className="text-stone-500 font-medium mb-1">Ключевые деятели / Авторы:</dt>
                <dd className="text-stone-900 font-medium">{item.keyFigures.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-stone-500 font-medium mb-1">Главные работы / Манифесты:</dt>
                <dd className="text-stone-900 font-medium">{item.manifestoOrWork}</dd>
              </div>
              <div>
                <dt className="text-stone-500 font-medium mb-1">География и центры:</dt>
                <dd className="text-stone-900 font-medium">{item.location}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Каталог культурных трансформаций 1914–1930 гг.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Закрыть обзор
          </button>
        </div>
      </div>
    </div>
  );
};
