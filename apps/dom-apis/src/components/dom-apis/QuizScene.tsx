"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the key difference between event.target and event.currentTarget?",
    options: [
      "event.target is the element that triggered the event; event.currentTarget is the element the listener is attached to",
      "event.target only works in the capture phase; event.currentTarget only works in bubbling",
      "event.currentTarget is a copy of the target in JavaScript memory",
      "They are identical aliases for the clicked DOM node"
    ],
    correctAnswer: 0,
    explanation: "event.target refers to the actual deepest element that initiated the dispatch (e.g. inner <button>), while event.currentTarget refers to the ancestor element whose listener is currently executing. This is the foundation of Event Delegation."
  },
  {
    id: 2,
    question: "Which of the following CSS property changes runs exclusively on the GPU Compositor thread without triggering Reflow or Repaint?",
    options: [
      "width and height",
      "transform and opacity",
      "top and left",
      "margin and padding"
    ],
    correctAnswer: 1,
    explanation: "transform and opacity do not affect geometric layout coordinates and do not require rasterizing pixel bitmaps on the CPU. They create GPU composite layers and blend at 60/120 FPS."
  },
  {
    id: 3,
    question: "Why is reading element.offsetWidth immediately after mutating element.style.width dangerous for web performance?",
    code: `element.style.width = '300px';
const width = element.offsetWidth; // Forces synchronous reflow!`,
    options: [
      "It triggers memory garbage collection",
      "It throws a TypeError in strict mode",
      "It forces synchronous Layout Thrashing because the browser cannot batch recalculations",
      "It cancels all pending Promise microtasks"
    ],
    correctAnswer: 2,
    explanation: "Browsers normally batch style mutations until the end of the frame. But when you query a geometric layout property like offsetWidth, clientHeight, or getBoundingClientRect(), the browser is forced to immediately flush pending style changes and execute a full synchronous layout calculation (Layout Thrashing)."
  }
];

export function QuizScene() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#050507]">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> DOM Architecture Assessment
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            DOM &amp; Browser Engine Quiz
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto font-light">
            Test your understanding of layout thrashing, event propagation phases, and GPU compositing.
          </p>
        </div>

        <div className="space-y-8 mb-10">
          {QUESTIONS.map((q, idx) => {
            return (
              <div
                key={q.id}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">
                  Question 0{idx + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  {q.question}
                </h3>

                {q.code && (
                  <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-orange-200 mb-6 overflow-x-auto">
                    {q.code}
                  </pre>
                )}

                <div className="space-y-2.5">
                  {q.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    let optionStyle = "bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.05]";

                    if (showResults) {
                      if (optIdx === q.correctAnswer) {
                        optionStyle = "bg-emerald-500/20 border-emerald-500/40 text-emerald-200";
                      } else if (isSelected) {
                        optionStyle = "bg-rose-500/20 border-rose-500/40 text-rose-200";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-orange-500/20 border-orange-500 text-orange-200";
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left font-mono text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {showResults && optIdx === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {showResults && isSelected && optIdx !== q.correctAnswer && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200 leading-relaxed font-mono"
                  >
                    <span className="font-bold text-white uppercase block mb-1">Architecture Explanation:</span>
                    {q.explanation}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <div>
            {showResults ? (
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-orange-400" />
                <span className="text-lg font-bold text-white">
                  Score: {calculateScore()} / {QUESTIONS.length} Correct
                </span>
              </div>
            ) : (
              <span className="text-sm text-white/50 font-mono">
                {Object.keys(selectedAnswers).length} of {QUESTIONS.length} questions answered
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {!showResults ? (
              <button
                disabled={Object.keys(selectedAnswers).length === 0}
                onClick={() => setShowResults(true)}
                className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-bold text-xs font-mono cursor-pointer transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
