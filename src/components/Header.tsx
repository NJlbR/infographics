import React from 'react';
import { Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: 'timeline' | 'matrix' | 'comparator' | 'quiz';
  setActiveTab: (tab: 'timeline' | 'matrix' | 'comparator' | 'quiz') => void;
  onOpenPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenPrint }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200 px-4 md:px-8 py-3.5 transition-colors no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); setActiveTab('timeline'); }}
          className="text-lg md:text-xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          Хроника 1914–1930
        </a>

        {/* Zone 2: 4 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'timeline' 
                ? 'text-stone-900 font-semibold border-b border-stone-900' 
                : 'hover:text-stone-900'
            }`}
          >
            Инфографика эпохи
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'matrix' 
                ? 'text-stone-900 font-semibold border-b border-stone-900' 
                : 'hover:text-stone-900'
            }`}
          >
            Векторы влияния
          </button>
          <button
            onClick={() => setActiveTab('comparator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'comparator' 
                ? 'text-stone-900 font-semibold border-b border-stone-900' 
                : 'hover:text-stone-900'
            }`}
          >
            Сравнение течений
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'quiz' 
                ? 'text-stone-900 font-semibold border-b border-stone-900' 
                : 'hover:text-stone-900'
            }`}
          >
            Проверка знаний
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Открыть дайджест для печати или конспекта"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Печать / Дайджест</span>
            <span className="sm:hidden">Дайджест</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto pt-2.5 mt-2 border-t border-stone-200/60 text-xs font-medium text-stone-600 gap-4">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`whitespace-nowrap pb-1 ${activeTab === 'timeline' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Инфографика
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`whitespace-nowrap pb-1 ${activeTab === 'matrix' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Векторы влияния
        </button>
        <button
          onClick={() => setActiveTab('comparator')}
          className={`whitespace-nowrap pb-1 ${activeTab === 'comparator' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Сравнение
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap pb-1 ${activeTab === 'quiz' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Тест
        </button>
      </div>
    </header>
  );
};
