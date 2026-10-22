import React from 'react';
import { CULTURAL_ACHIEVEMENTS } from '../data/culturalAchievements';
import { X, Printer, ArrowDownToLine } from 'lucide-react';

interface PrintDigestProps {
  onClose: () => void;
}

export const PrintDigest: React.FC<PrintDigestProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-stone-300 w-full max-w-5xl rounded-xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden">
        {/* Modal Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 no-print">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Сводная инфографическая таблица: Культура и общество 1914–1930 гг.
            </h3>
            <p className="text-xs text-stone-500">
              Готовый конспект для изучения, реферата или печати
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Распечатать / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-stone-900 font-sans">
          <div className="border-b border-stone-200 pb-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-1">
              ИСТОРИКО-КУЛЬТУРОЛОГИЧЕСКИЙ ДАЙДЖЕСТ
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Достижения культуры и архитектуры 1914–1930 гг. и их влияние на развитие общества
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Период: Первая мировая война — Веймарский и Советский авангард — «Ревущие двадцатые» — Великая депрессия.
            </p>
          </div>

          {/* Structured Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-900 bg-stone-100 text-stone-800 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3 font-semibold w-16">Год</th>
                  <th className="py-2.5 px-3 font-semibold w-48">Достижение / Направление</th>
                  <th className="py-2.5 px-3 font-semibold w-40">Сфера & Авторы</th>
                  <th className="py-2.5 px-3 font-semibold w-56">Художественная инновация</th>
                  <th className="py-2.5 px-3 font-semibold">Влияние на развитие общества 1914–1930 гг.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {CULTURAL_ACHIEVEMENTS.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-3 font-mono font-bold text-stone-700 align-top">
                      {item.yearDisplay}
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="font-serif font-bold text-stone-900 text-sm">{item.title}</div>
                      <div className="text-stone-500 italic text-[11px] mt-0.5">{item.manifestoOrWork}</div>
                      <div className="text-stone-400 text-[10px] mt-0.5">{item.location}</div>
                    </td>
                    <td className="py-3 px-3 align-top text-stone-600">
                      <div className="font-medium text-stone-800">{item.categoryLabel}</div>
                      <div className="text-[11px] text-stone-500 mt-1">{item.keyFigures.slice(0, 3).join(', ')}</div>
                    </td>
                    <td className="py-3 px-3 align-top text-stone-700 leading-relaxed text-[11px]">
                      {item.artisticInnovation}
                    </td>
                    <td className="py-3 px-3 align-top text-stone-900 leading-relaxed">
                      <div className="font-medium text-amber-950 mb-1">
                        {item.societalImpact.headline}
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[11px]">
                        {item.societalImpact.vectors.map((v, i) => (
                          <li key={i}>
                            <span className="font-medium text-stone-800">{v.dimension}:</span> {v.description}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-stone-200 pt-4 text-[11px] text-stone-500 flex items-center justify-between">
            <span>Составлено по архивным и историческим источникам 1914–1930 гг.</span>
            <span>Инфографика подготовлена в академическом стандарте</span>
          </div>
        </div>
      </div>
    </div>
  );
};
