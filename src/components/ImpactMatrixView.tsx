import React, { useState } from 'react';
import { 
  CULTURAL_ACHIEVEMENTS, 
  SPHERES_CONFIG, 
  ImpactSphere, 
  CulturalAchievement 
} from '../data/culturalAchievements';
import { 
  Home, 
  Users, 
  Sun, 
  Share2, 
  Shield, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

interface ImpactMatrixViewProps {
  onSelectAchievement: (item: CulturalAchievement) => void;
}

export const ImpactMatrixView: React.FC<ImpactMatrixViewProps> = ({ onSelectAchievement }) => {
  const [selectedSphere, setSelectedSphere] = useState<ImpactSphere | 'all'>('all');

  const getSphereIcon = (sphereKey: ImpactSphere) => {
    switch (sphereKey) {
      case 'housing_living': return <Home className="w-4 h-4 text-amber-700" />;
      case 'emancipation': return <Users className="w-4 h-4 text-purple-700" />;
      case 'urbanism_hygiene': return <Sun className="w-4 h-4 text-sky-700" />;
      case 'mass_media': return <Share2 className="w-4 h-4 text-emerald-700" />;
      case 'anti_war_trauma': return <Shield className="w-4 h-4 text-stone-700" />;
      case 'social_integration': return <HeartHandshake className="w-4 h-4 text-rose-700" />;
    }
  };

  const sphereKeys = Object.keys(SPHERES_CONFIG) as ImpactSphere[];

  const displayedSpheres = selectedSphere === 'all' 
    ? sphereKeys 
    : [selectedSphere];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Intro Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4 text-stone-700" />
          <span>Аналитическая матрица трансформаций</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
          Векторы влияния культуры на общество (1914–1930 гг.)
        </h2>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
          Каждое открытие в архитектуре, живописи, кино, звуке и литературе межвоенного двадцатилетия
          было не просто эстетическим экспериментом, а прямым ответом на вызовы времени: урбанизацию,
          травму мировой войны, эмансипацию женщин и рождение массового общества.
        </p>

        {/* Sphere Filter Buttons (Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setSelectedSphere('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedSphere === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Все 6 сфер воздействия
          </button>
          {sphereKeys.map((sphere) => {
            const config = SPHERES_CONFIG[sphere];
            return (
              <button
                key={sphere}
                onClick={() => setSelectedSphere(sphere)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedSphere === sphere
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {getSphereIcon(sphere)}
                <span>{config.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spheres Flow Section */}
      <div className="space-y-10">
        {displayedSpheres.map((sphere) => {
          const config = SPHERES_CONFIG[sphere];
          const matchedAchievements = CULTURAL_ACHIEVEMENTS.filter(
            (item) => item.societalImpact.primarySphere === sphere
          );

          return (
            <div 
              key={sphere} 
              className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 space-y-6 shadow-xs"
            >
              {/* Sphere Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200">
                    {getSphereIcon(sphere)}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {config.label}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {config.description}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-stone-500 shrink-0">
                  {matchedAchievements.length} ключевых достижений
                </div>
              </div>

              {/* Grid of linked achievements in this sphere */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {matchedAchievements.map((item) => (
                  <div 
                    key={item.id}
                    className="p-5 rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all flex flex-col justify-between group cursor-pointer"
                    onClick={() => onSelectAchievement(item)}
                  >
                    <div>
                      {/* Top metadata */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                        <span className="font-medium text-stone-700">{item.categoryLabel}</span>
                        <span className="font-mono tabular-nums">{item.yearDisplay}</span>
                      </div>

                      {/* Title */}
                      <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500 italic mb-3">
                        {item.manifestoOrWork}
                      </p>

                      {/* Societal Shift description */}
                      <div className="bg-white p-3.5 rounded border border-stone-200 mb-4">
                        <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">
                          Социальный результат:
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed font-medium">
                          {item.societalImpact.headline}
                        </p>
                      </div>

                      {/* Specific Vectors summary */}
                      <div className="space-y-2 mb-4">
                        {item.societalImpact.vectors.map((vec, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-stone-800">{vec.dimension}:</strong> {vec.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom link affordance */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="text-stone-500">Авторы: {item.keyFigures.slice(0, 2).join(', ')}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform">
                        Подробнее
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
