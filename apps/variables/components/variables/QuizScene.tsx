'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, RefreshCcw, Award } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: 'What does `typeof null` return?',
    options: ['"null"', '"object"', '"undefined"', '"number"'],
    correctAnswer: 1,
    explanation: 'This is a famous bug from JavaScript\'s first implementation in 1995. null was represented as a zero pointer, and typeof checks the type tag of the value — zero meant "object".'
  },
  {
    id: 2,
    question: 'What is the output of `console.log("5" + 3)`?',
    options: ['8', '"53"', 'NaN', 'Error'],
    correctAnswer: 1,
    explanation: 'The + operator prefers string concatenation. Since one operand is a string, the number 3 is coerced to "3".'
  },
  {
    id: 3,
    question: 'Which keyword creates a variable that cannot be reassigned?',
    options: ['let', 'var', 'const', 'static'],
    correctAnswer: 2,
    explanation: 'const creates a binding that cannot be reassigned. But if it holds an object, the object\'s properties CAN still be modified.'
  },
  {
    id: 4,
    question: 'What is `let x;` and then `console.log(x)`?',
    options: ['null', '0', '""', 'undefined'],
    correctAnswer: 3,
    explanation: 'Variables declared with let but not assigned a value are automatically initialized to undefined.'
  },
  {
    id: 5,
    question: 'What does `"5" - 3` evaluate to?',
    options: ['"53"', '2', '"2"', 'NaN'],
    correctAnswer: 1,
    explanation: 'Unlike +, the - operator only works with numbers. JavaScript coerces "5" to the number 5, then computes 5 - 3 = 2.'
  },
  {
    id: 6,
    question: 'Is `const obj = {}; obj.name = "Alice";` valid?',
    options: ['Yes', 'No — TypeError', 'No — SyntaxError', 'Depends on strict mode'],
    correctAnswer: 0,
    explanation: 'const prevents REASSIGNMENT of the variable, not mutation of the value. The object itself can still be modified.'
  },
  {
    id: 7,
    question: 'What is the Temporal Dead Zone (TDZ)?',
    options: ['Memory leak area', 'The time between declaration and assignment where accessing the variable throws ReferenceError', 'Where deleted variables go', 'A deprecated feature'],
    correctAnswer: 1,
    explanation: 'let and const are hoisted but not initialized. Accessing them before the declaration line throws a ReferenceError.'
  },
  {
    id: 8,
    question: 'What does `Boolean("")` return?',
    options: ['true', 'false', 'undefined', 'Error'],
    correctAnswer: 1,
    explanation: 'Empty string is one of JavaScript\'s 6 falsy values: false, 0, "", null, undefined, NaN.'
  },
  {
    id: 9,
    question: 'What is `typeof NaN`?',
    options: ['"NaN"', '"undefined"', '"number"', '"object"'],
    correctAnswer: 2,
    explanation: 'NaN stands for "Not a Number" but its type is ironically "number". It represents an invalid numeric computation.'
  },
  {
    id: 10,
    question: 'What\'s the difference between `==` and `===`?',
    options: ['No difference', '`===` is faster', '`==` converts types before comparing, `===` does not', '`===` only works with numbers'],
    correctAnswer: 2,
    explanation: '`==` (loose equality) performs type coercion. `===` (strict equality) requires both the type AND value to match.'
  }
]

export default function QuizScene() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
    setIsAnswered(true)
    if (index === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsQuizComplete(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setIsQuizComplete(false)
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-slate-900 dark:text-white font-sans flex flex-col items-center">
      <div className="max-w-3xl w-full mb-10 text-center">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          10 &bull; Architectural Assessment
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Variables &amp; Memory Quiz
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Test your mental models against 10 classic JavaScript scenarios and V8 edge cases.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        {!isQuizComplete ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>QUESTION {currentQuestionIndex + 1} OF {questions.length}</span>
                <span className="text-amber-500 font-bold">SCORE: {score}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#0c0e14]/90 border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-xl"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer
                    const isSelected = index === selectedOption
                    const showCorrect = isAnswered && isCorrect
                    const showWrong = isAnswered && isSelected && !isCorrect

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-200 border cursor-pointer
                          ${
                            showCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                              : showWrong
                              ? 'bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400'
                              : isAnswered
                              ? 'bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.05] text-slate-400 dark:text-slate-500 cursor-not-allowed'
                              : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 hover:border-amber-500/50 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                          }
                        `}
                      >
                        <span className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold
                            ${
                              showCorrect ? 'bg-emerald-500/20 text-emerald-500' :
                              showWrong ? 'bg-rose-500/20 text-rose-500' :
                              'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                            }
                          `}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm font-medium">{option}</span>
                        </span>
                        {showCorrect && <Check className="w-5 h-5 text-emerald-500" />}
                        {showWrong && <X className="w-5 h-5 text-rose-500" />}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 overflow-hidden"
                    >
                      <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-2">Explanation</h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                        {currentQuestion.explanation}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="mt-6 w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs rounded-2xl transition-all shadow-sm cursor-pointer"
                      >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#0c0e14]/90 border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-8 sm:p-12 text-center shadow-xl"
          >
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-500">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">Quiz Complete!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
              You scored {score} out of {questions.length} on Module 01 concepts.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-emerald-500 mb-1 font-mono">{score}</div>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Correct</div>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-rose-500 mb-1 font-mono">{questions.length - score}</div>
                <div className="text-xs font-mono text-rose-600 dark:text-rose-400">Review Recommended</div>
              </div>
            </div>

            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-sm cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
