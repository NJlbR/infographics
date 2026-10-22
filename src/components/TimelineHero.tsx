import React from 'react';
import { ERAS_OVERVIEW, CategoryType, ImpactSphere, CATEGORIES_CONFIG, SPHERES_CONFIG } from '../data/culturalAchievements';
import { Search, Filter, Sparkles, Building, Palette, Film, Radio, BookOpen, Clock } from 'lucide-react';

interface TimelineHeroProps {
  selectedEra: string;
  setSelectedEra: (era: string) => void;
  selectedCategory: CategoryType | 'all';
  setSelectedCategory: (cat: CategoryType | 'all') => void;
  selectedSphere: ImpactSphere | 'all';
  setSelectedSphere: (sphere: ImpactSphere | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalFilteredCount: number;
}

export const TimelineHero: React.FC<TimelineHeroProps> = ({
  selectedEra,
  setSelectedEra,
  selectedCategory,
  setSelectedCategory,
  selectedSphere,
  setSelectedSphere,
  searchQuery,
  setSearchQuery,
  totalFilteredCount
}) => {
  const currentEraData = ERAS_OVERVIEW.find(e => e.id === selectedEra);

  return (
    <div className="space-y-6 border-b border-stone-200 pb-8 no-print">
      {/* Editorial Catalog Marquee */}
      <div className="pt-4 md:pt-8 max-w-4xl">
        <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold mb-3">
          ИНТЕРАКТИВНАЯ ИНФОГРАФИКА · МЕЖВОЕННАЯ ЭПОХА 1914–1930
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-[1.15] text-balance">
          Достижения культуры, искусства и архитектуры: Революция форм и преображение общества
        </h1>
        <p className="text-stone-600 text-base md:text-lg leading-relaxed mt-4 font-sans max-w-3xl">
          Шок Первой мировой войны разрушил викторианский мир и породил невиданный взрыв новаторства: 
          от типовых домов Баухауса и фабрик-кухонь конструктивизма до джазового раскрепощения, звукового кино 
          и гигиенической архитектуры Ле Корбюзье. Исследуйте, как каждое открытие прямо меняло повседневную жизнь людей.
        </p>

        {/* Operational Utility Strip (Clean metrics adhering to section 1.B / 3.A) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-200">
          <div>
            <div className="font-mono text-xl md:text-2xl font-bold text-stone-900 tabular-nums">14</div>
            <div className="text-xs text-stone-500 mt-0.5">Ключевых открытий</div>
          </div>
          <div>
            <div className="font-mono text-xl md:text-2xl font-bold text-stone-900 tabular-nums">6</div>
            <div className="text-xs text-stone-500 mt-0.5">Сфер влияния на общество</div>
          </div>
          <div>
            <div className="font-mono text-xl md:text-2xl font-bold text-stone-900 tabular-nums">1914–1930</div>
            <div className="text-xs text-stone-500 mt-0.5">Временной охват</div>
          </div>
          <div>
            <div className="font-mono text-xl md:text-2xl font-bold text-stone-900 tabular-nums">100%</div>
            <div className="text-xs text-stone-500 mt-0.5">Анализ причин и следствий</div>
          </div>
        </div>
      </div>

      {/* Chronological Era Timeline Rail */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Хронологические этапы эпохи:
          </span>
          <span className="font-mono">{totalFilteredCount} объектов в выборке</span>
        </div>

        {/* Era Segmented Button Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => setSelectedEra('all')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
              selectedEra === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Весь период (1914–1930)
          </button>
          {ERAS_OVERVIEW.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
                selectedEra === era.id
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="font-mono tabular-nums">{era.range}</span>
              <span className="hidden lg:inline text-[11px] text-stone-500 ml-1">· {era.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Era Historic Deep-Dive Banner */}
        {currentEraData && (
          <div className="p-4 bg-stone-100/70 border border-stone-200 rounded-lg text-xs space-y-1.5 transition-all">
            <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-sm">
              <span className="font-mono text-xs font-normal text-stone-600">{currentEraData.range}</span>
              <span>— {currentEraData.title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-stone-700">
              <div>
                <strong className="text-stone-900 block font-medium">Исторический контекст:</strong>
                {currentEraData.historicalContext}
              </div>
              <div>
                <strong className="text-stone-900 block font-medium">Культурный импульс:</strong>
                {currentEraData.culturalKeynote}
              </div>
              <div>
                <strong className="text-stone-900 block font-medium">Социальная трансформация:</strong>
                {currentEraData.socialTransformation}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Поиск (Гропиус, Баухаус, Шанель, кино, джаз, жильё...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category & Sphere Dropdowns / Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-600 cursor-pointer"
          >
            <option value="all">Все области культуры</option>
            {Object.entries(CATEGORIES_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>{cfg.label}</option>
            ))}
          </select>

          {/* Sphere Selector */}
          <select
            value={selectedSphere}
            onChange={(e) => setSelectedSphere(e.target.value as any)}
            className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-600 cursor-pointer"
          >
            <option value="all">Все сферы влияния на общество</option>
            {Object.entries(SPHERES_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>{cfg.shortLabel} ({cfg.label})</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
