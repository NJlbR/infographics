import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/culturalAchievements';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleCheck = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  const score = submitted
    ? QUIZ_QUESTIONS.filter(q => selectedAnswers[q.id] === q.correctIndex).length
    : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-150">
      {/* Quiz Header */}
      <div className="border-b border-stone-200 pb-6 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-stone-700" />
          <span>Интерактивный тест</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
          «Эхо эпохи»: Как культура меняла общество 1914–1930 гг.
        </h2>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-2 max-w-2xl">
          Проверьте понимание причинно-следственных связей между художественными прорывами 
          и реальными социальными переменами межвоенных десятилетий.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isAnswered && selectedOption === q.correctIndex;

          return (
            <div 
              key={q.id}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-stone-400 mt-1">
                  0{idx + 1}.
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex-1 leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1 pl-6">
                {q.options.map((option, optIdx) => {
                  let optionStyles = 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800';
                  
                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (selectedOption === optIdx && optIdx !== q.correctIndex) {
                      optionStyles = 'border-rose-300 bg-rose-50 text-rose-950';
                    } else {
                      optionStyles = 'border-stone-100 text-stone-400 opacity-60';
                    }
                  } else if (selectedOption === optIdx) {
                    optionStyles = 'border-stone-800 bg-stone-900 text-white';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-center justify-between cursor-pointer ${optionStyles}`}
                    >
                      <span>{option}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                      )}
                      {submitted && selectedOption === optIdx && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Historical Explanation after submission */}
              {submitted && (
                <div className={`mt-3 p-4 rounded-lg text-xs leading-relaxed border ${
                  isCorrect 
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                    : 'bg-stone-100 border-stone-200 text-stone-800'
                }`}>
                  <strong className="block mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Исторический контекст:
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit & Result Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {submitted ? (
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-700" />
              <div>
                <div className="text-base font-bold text-stone-900 font-serif">
                  Ваш результат: {score} из {totalQuestions} верных ответов
                </div>
                <p className="text-xs text-stone-500">
                  {score === totalQuestions 
                    ? 'Блестящее понимание социальной роли культуры межвоенной эпохи!' 
                    : 'Хороший результат. Ознакомьтесь с монографиями в инфографике для углубления знаний.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-stone-500">
              Отвечено: {answeredCount} из {totalQuestions} вопросов
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {submitted ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Пройти снова
            </button>
          ) : (
            <button
              disabled={answeredCount === 0}
              onClick={handleCheck}
              className={`px-5 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                answeredCount === 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              Проверить ответы
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
