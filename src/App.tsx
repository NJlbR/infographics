import React, { useState, useEffect, useCallback } from 'react';
import { 
  CULTURAL_ACHIEVEMENTS, 
  SPHERES_CONFIG, 
  ImpactSphere 
} from './data/culturalAchievements';
import { ArchivalImage } from './components/ArchivalImage';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Home, 
  Users, 
  Sun, 
  Share2, 
  Shield, 
  HeartHandshake, 
  Building, 
  Palette, 
  Film, 
  Radio, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Quote, 
  Lightbulb,
  LayoutGrid,
  X
} from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideDrawerOpen, setIsSlideDrawerOpen] = useState(false);

  // Total slides: Title (1) + 6 Spheres (1) + 14 Achievements (14) + Comparison (1) + Matrix (1) + Epilogue (1) = 19 slides
  const totalSlides = 19;


  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      setIsSlideDrawerOpen(false);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setIsSlideDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'architecture': return <Building className="w-4 h-4 text-stone-700" />;
      case 'visual_arts': return <Palette className="w-4 h-4 text-stone-700" />;
      case 'cinema_media': return <Film className="w-4 h-4 text-stone-700" />;
      case 'music_sound': return <Radio className="w-4 h-4 text-stone-700" />;
      case 'literature': return <BookOpen className="w-4 h-4 text-stone-700" />;
      default: return <Sparkles className="w-4 h-4 text-stone-700" />;
    }
  };

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

  // Slide directory labels for drawer and selector
  const slideTitles = [
    'Титульный слайд: Культура и архитектура 1914–1930',
    '6 ключевых сфер влияния на общество',
    ...CULTURAL_ACHIEVEMENTS.map(item => `${item.yearDisplay} · ${item.title}`),
    'Сравнительный анализ ключевых школ',
    'Сводная матрица причин и следствий',
    'Эпилог: Культурный фундамент XXI века'
  ];

  return (
    <div className="min-h-screen bg-[#1c1917] text-stone-100 flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* Slide Deck Top Navigation Bar */}
      <header className="bg-[#141210] border-b border-stone-800 px-4 md:px-8 py-3 flex items-center justify-between gap-4 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => goToSlide(0)}
            className="text-sm md:text-base font-serif font-bold text-stone-200 hover:text-amber-400 transition-colors cursor-pointer text-left"
          >
            Культура & Архитектура 1914–1930
          </button>
          <span className="hidden sm:inline text-xs text-stone-500 font-mono">
            · Онлайн-презентация
          </span>
        </div>

        {/* Center: Slide indicator and quick drawer opener */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSlideDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono rounded-lg border border-stone-700 transition-colors cursor-pointer shadow-xs"
            title="Открыть список всех 19 слайдов"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
            <span>Слайд {currentSlide + 1} / {totalSlides}</span>
          </button>
        </div>

        {/* Right actions: Slide list button and Fullscreen toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSlideDrawerOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-800 hover:text-white rounded-lg border border-stone-700 transition-colors cursor-pointer"
            title="Оглавление презентации"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
            <span>Оглавление</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-stone-400 hover:text-stone-200 bg-stone-800/80 hover:bg-stone-800 rounded-lg border border-stone-700 transition-colors cursor-pointer"
            title="Полноэкранный режим (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Progress track */}
      <div className="w-full bg-stone-900 h-1 no-print">
        <div 
          className="bg-amber-500 h-1 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Slide Stage Container */}
      <div className="flex-1 flex items-center justify-center p-2.5 sm:p-4 lg:p-6 overflow-y-auto relative">
        <div className="w-full max-w-6xl max-h-[88vh] bg-[#262422] border border-stone-800 rounded-2xl p-5 sm:p-8 shadow-2xl overflow-y-auto flex flex-col justify-between">
          
          {/* SLIDE 0: TITLE SLIDE */}
          {currentSlide === 0 && (
            <div className="space-y-8 my-auto text-center sm:text-left animate-in fade-in duration-200">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-mono font-semibold">
                <span>ИСТОРИЧЕСКАЯ ПРЕЗЕНТАЦИЯ</span>
                <span>·</span>
                <span>1914–1930</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-50 leading-tight">
                Достижения культуры и архитектуры 1914–1930 гг. в мире
              </h1>

              <p className="text-base sm:text-xl text-stone-300 font-sans max-w-4xl leading-relaxed text-balance">
                Революция форм и ее прямое влияние на развитие общества: как катастрофа Первой мировой войны, 
                урбанизация и рождение массового социума породили современную архитектуру, звуковое кино, джаз, 
                новую гигиену и женскую эмансипацию.
              </p>

              {/* Metrics cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-800 text-left">
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="font-mono text-3xl font-bold text-amber-400 tabular-nums">16</div>
                  <div className="text-xs text-stone-400 mt-1">Революционных лет (1914–1930)</div>
                </div>
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="font-mono text-3xl font-bold text-amber-400 tabular-nums">14</div>
                  <div className="text-xs text-stone-400 mt-1">Ключевых открытий эпохи</div>
                </div>
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="font-mono text-3xl font-bold text-amber-400 tabular-nums">6</div>
                  <div className="text-xs text-stone-400 mt-1">Сфер влияния на общество</div>
                </div>
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="font-mono text-3xl font-bold text-amber-400 tabular-nums">100%</div>
                  <div className="text-xs text-stone-400 mt-1">Факты, цитаты и статистика</div>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-500 font-mono flex items-center justify-between">
                <span>Нажимайте стрелки [Влево / Вправо] или клавишу Пробел для перехода</span>
                <span className="text-amber-500 font-medium">Слайд 1 из 19</span>
              </div>
            </div>
          )}

          {/* SLIDE 1: 6 SPHERES OF TRANSFORMATION */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold block">
                    АНАЛИТИЧЕСКИЙ БАЗИС ПРЕЗЕНТАЦИИ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                    6 сфер воздействия культуры на развитие общества 1914–1930 гг.
                  </h2>
                </div>
                <span className="font-mono text-xs text-stone-400">Слайд 2 из 19</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                {(Object.keys(SPHERES_CONFIG) as ImpactSphere[]).map((key) => {
                  const cfg = SPHERES_CONFIG[key];
                  return (
                    <div 
                      key={key} 
                      className="bg-stone-900/80 p-5 rounded-xl border border-stone-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className="p-2 rounded-lg bg-stone-800 border border-stone-700">
                            {getSphereIcon(key)}
                          </div>
                          <h3 className="font-serif text-base font-bold text-stone-100">
                            {cfg.label}
                          </h3>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed">
                          {cfg.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-2.5 border-t border-stone-800/80 text-[11px] font-mono text-amber-500/80">
                        Вектор трансформации социума #{key}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SLIDES 2 to 15: 14 CULTURAL ACHIEVEMENTS */}
          {currentSlide >= 2 && currentSlide <= 15 && (() => {
            const item = CULTURAL_ACHIEVEMENTS[currentSlide - 2];
            return (
              <div key={item.id} className="space-y-6 animate-in fade-in duration-200">
                {/* Header line */}
                <div className="border-b border-stone-800 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-400 font-mono mb-1">
                      <span className="font-bold text-amber-400 text-sm">{item.yearDisplay}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1 text-stone-300">
                        {getCategoryIcon(item.category)}
                        <span>{item.categoryLabel}</span>
                      </div>
                      <span>·</span>
                      <span>{item.region}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                      {item.title}
                    </h2>
                    <p className="text-xs font-serif italic text-stone-400 mt-0.5">
                      {item.originalName} — {item.location}
                    </p>
                  </div>
                  <div className="font-mono text-xs text-stone-500 bg-stone-900 px-3 py-1 rounded border border-stone-800">
                    Слайд {currentSlide + 1} из 19
                  </div>
                </div>

                {/* Main 2-column slide presentation grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left Column: Image & artistic innovation */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div className="rounded-xl overflow-hidden border border-stone-800 bg-stone-900 shadow-md">
                      <ArchivalImage
                        src={item.image}
                        alt={item.title}
                        caption={item.manifestoOrWork}
                        year={item.yearDisplay}
                        location={item.location}
                        className="h-44 sm:h-52 w-full object-cover"
                      />
                    </div>

                    <div className="p-4 bg-stone-900/90 rounded-xl border border-stone-800 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Художественная & техническая инновация:</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {item.artisticInnovation}
                      </p>
                    </div>

                    <div className="text-[11px] text-stone-400 font-mono">
                      <strong>Авторы:</strong> {item.keyFigures.join(', ')}
                    </div>
                  </div>

                  {/* Right Column: CORE SOCIETAL IMPACT IN 1914-1930 */}
                  <div className="lg:col-span-7 bg-[#1c1917] p-5 sm:p-6 rounded-xl border border-amber-900/50 shadow-inner flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100">
                          Влияние на развитие общества 1914–1930 гг.
                        </h3>
                      </div>

                      {/* Main Societal Shift Headline */}
                      <div className="bg-stone-900/90 p-4 rounded-lg border border-amber-500/40">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                          ГЛАВНЫЙ СОЦИАЛЬНЫЙ СДВИГ:
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-stone-100 leading-snug">
                          {item.societalImpact.headline}
                        </p>
                      </div>

                      {/* Before 1914 vs 1914-1930 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-stone-900/60 rounded border border-stone-800">
                          <span className="text-stone-400 font-semibold block mb-1 uppercase text-[10px]">
                            До 1914 года (Старый уклад):
                          </span>
                          <p className="text-stone-300 leading-relaxed">
                            {item.societalImpact.before1914}
                          </p>
                        </div>
                        <div className="p-3 bg-stone-900/60 rounded border border-amber-900/60">
                          <span className="text-amber-400 font-semibold block mb-1 uppercase text-[10px]">
                            Трансформация в 1914–1930 гг.:
                          </span>
                          <p className="text-stone-200 leading-relaxed font-medium">
                            {item.societalImpact.transformation1920s}
                          </p>
                        </div>
                      </div>

                      {/* 3 Specific Vectors */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {item.societalImpact.vectors.map((vec, vIdx) => (
                          <div key={vIdx} className="p-2.5 bg-stone-900 rounded border border-stone-800 text-[11px] flex flex-col justify-between">
                            <div>
                              <strong className="text-amber-300 block mb-1 font-serif text-xs">
                                {vec.dimension}
                              </strong>
                              <p className="text-stone-300 leading-relaxed">
                                {vec.description}
                              </p>
                            </div>
                            {vec.statOrFact && (
                              <div className="mt-2 pt-1 border-t border-stone-800 text-[10px] font-mono text-amber-200/90">
                                {vec.statOrFact}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Historic Quote */}
                    {item.societalImpact.socialMotto && (
                      <div className="p-3 border-l-2 border-amber-500 bg-stone-900/90 rounded-r text-xs font-serif italic text-amber-200/90 flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item.societalImpact.socialMotto}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SLIDE 16: COMPARISON OF KEY MOVEMENTS */}
          {currentSlide === 16 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold block">
                    КОМПАРАТИВНЫЙ АНАЛИЗ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                    Сравнительный анализ ключевых программ 1920-х годов
                  </h2>
                </div>
                <span className="font-mono text-xs text-stone-400">Слайд 17 из 19</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                {/* Pair 1 */}
                <div className="bg-stone-900/90 p-6 rounded-xl border border-stone-800 space-y-4">
                  <span className="text-xs uppercase font-mono text-amber-400 font-bold">Пара №1</span>
                  <h3 className="font-serif text-xl font-bold text-stone-100">
                    Баухаус (Германия) vs Конструктивизм (СССР)
                  </h3>
                  <div className="space-y-3 text-stone-300 leading-relaxed text-xs">
                    <div className="p-3 bg-stone-800/60 rounded border border-stone-700">
                      <strong className="text-amber-400 block mb-1">Баухаус (Веймар/Дессау):</strong>
                      Ориентация на промышленный дизайн для демократического общества; модульные кухни Франкфурта, доступные стулья Бройера из стальных труб, гуманизация рабочего быта в рыночной экономике.
                    </div>
                    <div className="p-3 bg-stone-800/60 rounded border border-stone-700">
                      <strong className="text-amber-400 block mb-1">Конструктивизм (Москва/Харьков):</strong>
                      Радикальное обобществление быта: дома-коммуны, фабрики-кухни и рабочие клубы для полного освобождения женщины от патриархального закрепощения.
                    </div>
                  </div>
                </div>

                {/* Pair 2 */}
                <div className="bg-stone-900/90 p-6 rounded-xl border border-stone-800 space-y-4">
                  <span className="text-xs uppercase font-mono text-amber-400 font-bold">Пара №2</span>
                  <h3 className="font-serif text-xl font-bold text-stone-100">
                    Небоскрёбы Ар-деко (США) vs «Пять точек» Ле Корбюзье (Франция)
                  </h3>
                  <div className="space-y-3 text-stone-300 leading-relaxed text-xs">
                    <div className="p-3 bg-stone-800/60 rounded border border-stone-700">
                      <strong className="text-amber-400 block mb-1">Небоскрёбы Манхэттена:</strong>
                      Вертикальная концентрация 25 000 рабочих мест под одной крышей, рождение класса офисных «белых воротничков» и символ экономической стойкости в Великую депрессию.
                    </div>
                    <div className="p-3 bg-stone-800/60 rounded border border-stone-700">
                      <strong className="text-amber-400 block mb-1">Ле Корбюзье (Вилла Савой):</strong>
                      Дом как «машина для жилья», оторванная от сырой земли столбами-опорами; победа над туберкулезом через ленточные окна с ультрафиолетом и сады на плоских крышах.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 17: CAUSE-AND-EFFECT MATRIX TABLE */}
          {currentSlide === 17 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold block">
                    АНАЛИТИЧЕСКИЙ РЕЕСТР ЭПОХИ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                    Сводная матрица: Вызов → Культурный ответ → Социальный итог
                  </h2>
                </div>
                <span className="font-mono text-xs text-stone-400">Слайд 18 из 19</span>
              </div>

              <div className="overflow-x-auto max-h-[46vh] bg-stone-900 rounded-xl border border-stone-800 text-xs shadow-inner">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-stone-950">
                    <tr className="border-b border-stone-700 bg-stone-950 text-amber-400 font-serif">
                      <th className="py-2.5 px-3">Год и открытие</th>
                      <th className="py-2.5 px-3">Исторический вызов 1914 г.</th>
                      <th className="py-2.5 px-3">Культурная инновация</th>
                      <th className="py-2.5 px-3">Влияние на развитие общества 1914–1930</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {CULTURAL_ACHIEVEMENTS.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-800/50 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-stone-200 whitespace-nowrap">
                          <span className="font-mono text-amber-400 font-bold">{item.yearDisplay}</span> · {item.title}
                        </td>
                        <td className="py-2.5 px-3 text-stone-400 text-xs">{item.societalImpact.before1914}</td>
                        <td className="py-2.5 px-3 text-stone-300 font-mono text-[11px]">{item.artisticInnovation.slice(0, 90)}...</td>
                        <td className="py-2.5 px-3 text-stone-100 font-medium">{item.societalImpact.headline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-stone-400 text-center font-mono">
                Полный реестр всех 14 ключевых направлений культуры и архитектуры межвоенной эпохи (скроллинг внутри таблицы)
              </div>
            </div>
          )}

          {/* SLIDE 18: EPILOGUE & HERITAGE */}
          {currentSlide === 18 && (
            <div className="space-y-8 my-auto text-center sm:text-left animate-in fade-in duration-200">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-mono font-semibold">
                <span>ИСТОРИЧЕСКИЙ ИТОГ</span>
                <span>·</span>
                <span>СВЯЗЬ С СОВРЕМЕННОСТЬЮ</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-50 leading-tight">
                Архитектурно-культурный фундамент современного мира
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-300 leading-relaxed text-left">
                <div className="p-5 bg-stone-900/80 rounded-xl border border-stone-800">
                  <p>
                    Эпоха 1914–1930 годов доказала, что культура способна быть главным локомотивом общественных преобразований. 
                    Обязательная инсоляция и сквозное проветривание комнат, гигиенические солярии на крышах, 
                    доступная мебель машинного выпуска, отказ от корсетов и право женщин на спорт и работу — 
                    все это родилось не из праздного вкуса, а как ответ на катастрофу Первой мировой войны.
                  </p>
                </div>
                <div className="p-5 bg-stone-900/80 rounded-xl border border-stone-800">
                  <p>
                    Городская и предметная среда XXI века — от светлых квартир свободной планировки 
                    до стриминговых медиа, киномонтажа и демократичной одежды — была спроектирована 
                    мастерами Баухауса, ВХУТЕМАСа, Ле Корбюзье, Коко Шанель и первопроходцами звукового кино 1920-х годов.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800">
                <button
                  onClick={() => goToSlide(0)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg border border-stone-700 transition-colors cursor-pointer"
                >
                  Вернуться к началу презентации
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSlideDrawerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Оглавление (все 19 слайдов)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Control Bar */}
      <footer className="bg-[#141210] border-t border-stone-800 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 shrink-0 no-print">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentSlide === 0
              ? 'bg-stone-900 text-stone-600 border border-stone-800 cursor-not-allowed'
              : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        {/* Slide navigation pills */}
        <div className="hidden md:flex items-center gap-1 max-w-xl overflow-x-auto py-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide
                  ? 'bg-amber-500 scale-125'
                  : 'bg-stone-700 hover:bg-stone-500'
              }`}
              title={`Перейти к слайду ${idx + 1}: ${slideTitles[idx]}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentSlide === totalSlides - 1
              ? 'bg-stone-900 text-stone-600 border border-stone-800 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold shadow-md'
          }`}
        >
          <span>Вперёд</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Slide Directory Drawer (Slide Navigator) */}
      {isSlideDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsSlideDrawerOpen(false)}
        >
          <div 
            className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-3xl max-h-[85vh] p-6 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-stone-100">
                  Оглавление презентации ({totalSlides} слайдов)
                </h3>
              </div>
              <button
                onClick={() => setIsSlideDrawerOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-3 space-y-1.5 pr-1">
              {slideTitles.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    idx === currentSlide
                      ? 'bg-amber-500 text-stone-900 font-bold'
                      : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-stone-400 tabular-nums">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    <span>{title}</span>
                  </div>
                  {idx === currentSlide && (
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-stone-900/30 px-2 py-0.5 rounded">
                      Текущий
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
