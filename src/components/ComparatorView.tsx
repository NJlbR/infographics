import React, { useState } from 'react';
import { CULTURAL_ACHIEVEMENTS, CulturalAchievement } from '../data/culturalAchievements';
import { ArrowLeftRight, Check, Quote, Building2, Sparkles, TrendingUp, Layers } from 'lucide-react';

interface ComparatorViewProps {
  initialItemA?: CulturalAchievement;
  initialItemB?: CulturalAchievement;
  onSelectAchievement: (item: CulturalAchievement) => void;
}

export const ComparatorView: React.FC<ComparatorViewProps> = ({
  initialItemA,
  initialItemB,
  onSelectAchievement
}) => {
  const [selectedIdA, setSelectedIdA] = useState<string>(
    initialItemA ? initialItemA.id : CULTURAL_ACHIEVEMENTS[1].id // Bauhaus
  );
  const [selectedIdB, setSelectedIdB] = useState<string>(
    initialItemB ? initialItemB.id : CULTURAL_ACHIEVEMENTS[2].id // Constructivism
  );

  const itemA = CULTURAL_ACHIEVEMENTS.find(i => i.id === selectedIdA) || CULTURAL_ACHIEVEMENTS[0];
  const itemB = CULTURAL_ACHIEVEMENTS.find(i => i.id === selectedIdB) || CULTURAL_ACHIEVEMENTS[1];

  const presets = [
    { label: 'Баухаус vs Конструктивизм', a: 'bauhaus_1919', b: 'constructivism_tatlin_1919' },
    { label: 'Ле Корбюзье vs Небоскрёбы Ар-деко', a: 'corbusier_five_points_1926', b: 'skyscrapers_vertical_urbanism_1929' },
    { label: 'Монтаж Эйзенштейна vs Звуковое кино', a: 'eisenstein_montage_1925', b: 'talkies_jazz_singer_1927' },
    { label: 'Дадаизм vs Сюрреализм', a: 'dadaism_1916', b: 'surrealism_1924' },
    { label: 'Мода Шанель vs Эпоха Джаза', a: 'chanel_fashion_revolution_1926', b: 'jazz_age_1924' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          <ArrowLeftRight className="w-4 h-4 text-stone-700" />
          <span>Сравнительный компаратор эпохи</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
          Сопоставление культурных программ 1914–1930 гг.
        </h2>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
          Сравните две художественные или архитектурные концепции по их социальным целям, 
          материалам, аудитории и масштабу реального влияния на развитие общества.
        </p>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
          <span className="text-stone-500 font-medium">Готовые пары для анализа:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIdA(p.a);
                setSelectedIdB(p.b);
              }}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-200 transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-100/70 p-4 rounded-xl border border-stone-200">
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
            Объект сравнения А:
          </label>
          <select
            value={selectedIdA}
            onChange={(e) => setSelectedIdA(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500 cursor-pointer"
          >
            {CULTURAL_ACHIEVEMENTS.map(item => (
              <option key={item.id} value={item.id} disabled={item.id === selectedIdB}>
                {item.yearDisplay} — {item.title} ({item.categoryLabel})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
            Объект сравнения Б:
          </label>
          <select
            value={selectedIdB}
            onChange={(e) => setSelectedIdB(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500 cursor-pointer"
          >
            {CULTURAL_ACHIEVEMENTS.map(item => (
              <option key={item.id} value={item.id} disabled={item.id === selectedIdA}>
                {item.yearDisplay} — {item.title} ({item.categoryLabel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Parallel Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column A */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>{itemA.categoryLabel}</span>
                <span className="font-mono tabular-nums">{itemA.yearDisplay}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {itemA.title}
              </h3>
              <p className="text-xs text-stone-500 italic mt-0.5">
                {itemA.originalName} · {itemA.location}
              </p>
            </div>

            {/* Social Motto */}
            {itemA.societalImpact.socialMotto && (
              <div className="p-3 bg-stone-50 border-l-2 border-stone-600 text-xs italic text-stone-800 font-serif">
                {itemA.societalImpact.socialMotto}
              </div>
            )}

            {/* Societal Impact Headline */}
            <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                Влияние на общество 1914–1930:
              </div>
              <p className="text-sm text-stone-900 font-medium leading-relaxed">
                {itemA.societalImpact.headline}
              </p>
            </div>

            {/* Key Vectors */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                Ключевые векторы трансформации:
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {itemA.societalImpact.vectors.map((v, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span><strong>{v.dimension}:</strong> {v.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artistic/Technical Innovation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                Художественный & технический метод:
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {itemA.artisticInnovation}
              </p>
            </div>

            {/* Key Figures */}
            <div className="text-xs text-stone-600 border-t border-stone-100 pt-3">
              <span className="font-medium text-stone-900">Лидеры движения:</span> {itemA.keyFigures.join(', ')}
            </div>
          </div>

          <button
            onClick={() => onSelectAchievement(itemA)}
            className="w-full mt-6 py-2 px-3 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors cursor-pointer text-center"
          >
            Смотреть монографию «{itemA.title}»
          </button>
        </div>

        {/* Column B */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>{itemB.categoryLabel}</span>
                <span className="font-mono tabular-nums">{itemB.yearDisplay}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {itemB.title}
              </h3>
              <p className="text-xs text-stone-500 italic mt-0.5">
                {itemB.originalName} · {itemB.location}
              </p>
            </div>

            {/* Social Motto */}
            {itemB.societalImpact.socialMotto && (
              <div className="p-3 bg-stone-50 border-l-2 border-stone-600 text-xs italic text-stone-800 font-serif">
                {itemB.societalImpact.socialMotto}
              </div>
            )}

            {/* Societal Impact Headline */}
            <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                Влияние на общество 1914–1930:
              </div>
              <p className="text-sm text-stone-900 font-medium leading-relaxed">
                {itemB.societalImpact.headline}
              </p>
            </div>

            {/* Key Vectors */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                Ключевые векторы трансформации:
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {itemB.societalImpact.vectors.map((v, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span><strong>{v.dimension}:</strong> {v.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artistic/Technical Innovation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                Художественный & технический метод:
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {itemB.artisticInnovation}
              </p>
            </div>

            {/* Key Figures */}
            <div className="text-xs text-stone-600 border-t border-stone-100 pt-3">
              <span className="font-medium text-stone-900">Лидеры движения:</span> {itemB.keyFigures.join(', ')}
            </div>
          </div>

          <button
            onClick={() => onSelectAchievement(itemB)}
            className="w-full mt-6 py-2 px-3 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors cursor-pointer text-center"
          >
            Смотреть монографию «{itemB.title}»
          </button>
        </div>
      </div>
    </div>
  );
};
