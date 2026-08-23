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
    <div className="w-full min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {!isQuizComplete ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2 text-sm font-medium text-white/60">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-orange-500 rounded-full"
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
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
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
                        className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all duration-200 border
                          ${
                            showCorrect
                              ? 'bg-green-500/20 border-green-500/50 text-green-300'
                              : showWrong
                              ? 'bg-red-500/20 border-red-500/50 text-red-300'
                              : isAnswered
                              ? 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        <span className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium
                            ${
                              showCorrect ? 'bg-green-500/20 text-green-400' :
                              showWrong ? 'bg-red-500/20 text-red-400' :
                              'bg-white/10 text-white/60'
                            }
                          `}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-base">{option}</span>
                        </span>
                        {showCorrect && <Check className="w-5 h-5 text-green-400" />}
                        {showWrong && <X className="w-5 h-5 text-red-400" />}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-white/10 overflow-hidden"
                    >
                      <h3 className="text-sm font-medium text-white/60 mb-2">Explanation</h3>
                      <p className="text-white/80 leading-relaxed text-sm md:text-base">
                        {currentQuestion.explanation}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="mt-6 w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-white/60 mb-8">
              You scored {score} out of {questions.length}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400 mb-1">{score}</div>
                <div className="text-sm text-green-500/80">Correct</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-400 mb-1">{questions.length - score}</div>
                <div className="text-sm text-red-500/80">Incorrect</div>
              </div>
            </div>

            {score >= 8 ? (
              <p className="text-green-400 mb-8 font-medium">Excellent work! You have a solid understanding of JavaScript variables and types.</p>
            ) : score >= 5 ? (
              <p className="text-orange-400 mb-8 font-medium">Good effort! Review the explanations to solidify your knowledge.</p>
            ) : (
              <p className="text-white/60 mb-8 font-medium">Keep practicing! These concepts take time to master.</p>
            )}

            <button
              onClick={handleRestartQuiz}
              className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
              Retake Quiz
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
