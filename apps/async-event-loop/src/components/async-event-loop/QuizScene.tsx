"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    question: "What is the execution order of this code snippet?",
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ["1, 2, 3, 4", "1, 4, 3, 2", "1, 4, 2, 3", "1, 3, 4, 2"],
    correctAnswer: 1,
    explanation: "Synchronous logs (1, 4) execute immediately on the stack. When the stack is empty, the Event Loop drains Microtasks (3) before executing any Macrotask (2)."
  },
  {
    id: 2,
    question: "Where and when does code inside a new Promise(...) executor execute?",
    code: `console.log("A");
new Promise((resolve) => {
  console.log("B");
  resolve();
});
console.log("C");`,
    options: [
      "Asynchronously in the Microtask Queue ('A', 'C', 'B')",
      "Synchronously immediately upon instantiation ('A', 'B', 'C')",
      "In a background Web API thread",
      "During the next Macrotask tick"
    ],
    correctAnswer: 1,
    explanation: "The executor function passed to new Promise() runs SYNCHRONOUSLY and immediately upon constructor invocation. Only the .then() reactions are deferred to the Microtask Queue."
  },
  {
    id: 3,
    question: "What happens to the browser if a microtask schedules another microtask infinitely?",
    code: `function freeze() {
  Promise.resolve().then(freeze);
}
freeze();`,
    options: [
      "The browser throttles it to 4ms like setTimeout",
      "Throws Maximum Call Stack Size Exceeded immediately",
      "Permanently freezes the page because the loop never finishes draining microtasks",
      "Executes in the background without affecting UI frame rate"
    ],
    correctAnswer: 2,
    explanation: "This is Microtask Starvation. Because the Event Loop invariant requires draining microtasks until count is 0 before yielding to UI rendering or user input, the page locks up completely."
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Concurrency Knowledge Check
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Event Loop Architecture Quiz
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto font-light">
            Test your understanding of the microtask queue, call stack frame lifecycles, and promise executors.
          </p>
        </div>

        <div className="space-y-8 mb-10">
          {QUESTIONS.map((q, idx) => {
            const answered = selectedAnswers[q.id] !== undefined;
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2">
                  Question 0{idx + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  {q.question}
                </h3>

                {q.code && (
                  <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-indigo-200 mb-6 overflow-x-auto">
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
                      optionStyle = "bg-indigo-500/20 border-indigo-500 text-indigo-200";
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
                    className="mt-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed font-mono"
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
                <Award className="w-6 h-6 text-indigo-400" />
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
                className="px-6 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 text-white font-bold text-xs font-mono cursor-pointer transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
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
