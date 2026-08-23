'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const DECLARATION_STEPS = [
  {
    code: 'let x;',
    desc: 'Declaration creates a slot in memory initialized to undefined.',
    slots: [{ name: 'x', value: 'undefined', type: 'undefined', locked: false, error: false }]
  },
  {
    code: 'let x;\nx = 42;',
    desc: 'Assignment writes a value to the slot.',
    slots: [{ name: 'x', value: '42', type: 'number', locked: false, error: false }]
  },
  {
    code: 'let x;\nx = 42;\nlet y = "hello";',
    desc: 'Declaration and assignment can happen in one line.',
    slots: [
      { name: 'x', value: '42', type: 'number', locked: false, error: false },
      { name: 'y', value: '"hello"', type: 'string', locked: false, error: false }
    ]
  },
  {
    code: 'let x;\nx = 42;\nlet y = "hello";\nconst PI = 3.14;',
    desc: 'const declarations create variables that cannot be reassigned.',
    slots: [
      { name: 'x', value: '42', type: 'number', locked: false, error: false },
      { name: 'y', value: '"hello"', type: 'string', locked: false, error: false },
      { name: 'PI', value: '3.14', type: 'number', locked: true, error: false }
    ]
  },
  {
    code: 'let x;\nx = 42;\nlet y = "hello";\nconst PI = 3.14;\nPI = 3.15;',
    desc: 'Attempting to reassign a const variable throws an error.',
    slots: [
      { name: 'x', value: '42', type: 'number', locked: false, error: false },
      { name: 'y', value: '"hello"', type: 'string', locked: false, error: false },
      { name: 'PI', value: '3.14', type: 'number', locked: true, error: true }
    ]
  },
  {
    code: 'let x;\nx = 42;\nlet y = "hello";\nconst PI = 3.14;\nlet z = x;',
    desc: 'Copying a primitive variable creates a completely independent copy of its value.',
    slots: [
      { name: 'x', value: '42', type: 'number', locked: false, error: false },
      { name: 'y', value: '"hello"', type: 'string', locked: false, error: false },
      { name: 'PI', value: '3.14', type: 'number', locked: true, error: false },
      { name: 'z', value: '42', type: 'number', locked: false, error: false }
    ]
  },
  {
    code: 'let x;\nx = 42;\nlet y = "hello";\nconst PI = 3.14;\nlet z = x;\nx = 99;',
    desc: 'Reassigning the original variable does not affect the copy.',
    slots: [
      { name: 'x', value: '99', type: 'number', locked: false, error: false },
      { name: 'y', value: '"hello"', type: 'string', locked: false, error: false },
      { name: 'PI', value: '3.14', type: 'number', locked: true, error: false },
      { name: 'z', value: '42', type: 'number', locked: false, error: false }
    ]
  }
];

const COERCION_STEPS = [
  {
    expr: '"5" + 3',
    op1: '"5"', op2: '3', type1: 'string', type2: 'number',
    result: '"53"', resultType: 'string',
    desc: 'String wins in concatenation. The number is coerced into a string.',
    op: '+'
  },
  {
    expr: '"5" - 3',
    op1: '"5"', op2: '3', type1: 'string', type2: 'number',
    result: '2', resultType: 'number',
    desc: 'Minus forces number conversion. The string "5" becomes the number 5.',
    op: '-'
  },
  {
    expr: 'true + true',
    op1: 'true', op2: 'true', type1: 'boolean', type2: 'boolean',
    result: '2', resultType: 'number',
    desc: 'Booleans are coerced to numbers (true = 1, false = 0) during addition.',
    op: '+'
  },
  {
    expr: '"" == false',
    op1: '""', op2: 'false', type1: 'string', type2: 'boolean',
    result: 'true', resultType: 'boolean',
    desc: 'Loose equality trap: both are coerced to 0 before comparison.',
    op: '=='
  },
  {
    expr: '"" === false',
    op1: '""', op2: 'false', type1: 'string', type2: 'boolean',
    result: 'false', resultType: 'boolean',
    desc: 'Strict equality requires matching types. No coercion happens.',
    op: '==='
  },
  {
    expr: 'null == undefined',
    op1: 'null', op2: 'undefined', type1: 'object', type2: 'undefined',
    result: 'true', resultType: 'boolean',
    desc: 'Special case in loose equality: null and undefined are considered equal.',
    op: '=='
  },
  {
    expr: 'null === undefined',
    op1: 'null', op2: 'undefined', type1: 'object', type2: 'undefined',
    result: 'false', resultType: 'boolean',
    desc: 'Strict equality fails because their types differ.',
    op: '==='
  },
  {
    expr: 'typeof null',
    op1: 'typeof', op2: 'null', type1: 'keyword', type2: 'object',
    result: '"object"', resultType: 'string',
    desc: 'The famous JavaScript bug from its first implementation.',
    op: ''
  }
];

export default function OperationsScene() {
  const [activeTab, setActiveTab] = useState(0);
  const [declStep, setDeclStep] = useState(0);
  const [coercionStep, setCoercionStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'number': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'boolean': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'undefined': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'object': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'keyword': return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
      default: return 'text-white bg-white/10 border-white/20';
    }
  };

  const handleNext = () => {
    if (activeTab === 0 && declStep < DECLARATION_STEPS.length - 1) {
      setDeclStep(s => s + 1);
    } else if (activeTab === 1 && coercionStep < COERCION_STEPS.length - 1) {
      setCoercionStep(s => s + 1);
      triggerMorphAnimation();
    }
  };

  const handlePrev = () => {
    if (activeTab === 0 && declStep > 0) {
      setDeclStep(s => s - 1);
    } else if (activeTab === 1 && coercionStep > 0) {
      setCoercionStep(s => s - 1);
      triggerMorphAnimation();
    }
  };

  const handleReset = () => {
    if (activeTab === 0) setDeclStep(0);
    else setCoercionStep(0);
  };

  const triggerMorphAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const renderDeclarationTab = () => {
    const current = DECLARATION_STEPS[declStep];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[400px]">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0f0f0f] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs text-white/40 font-mono">script.js</span>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed text-white/80 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={declStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {current.code}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative bg-gradient-to-br from-white/[0.03] to-transparent rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full max-w-md space-y-4">
            <AnimatePresence mode="popLayout">
              {current.slots.map((slot) => (
                <motion.div
                  layout
                  key={slot.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`relative flex items-center justify-between p-4 rounded-xl border backdrop-blur-md ${
                    slot.error ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'
                  }`}
                >
                  {slot.error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0, 1] }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 rounded-xl ring-2 ring-red-500 pointer-events-none"
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-lg text-white/90">{slot.name}</div>
                    {slot.locked && <Lock className="w-4 h-4 text-orange-400" />}
                  </div>
                  <div className={`font-mono px-3 py-1 rounded-lg border ${getTypeColor(slot.type)}`}>
                    {slot.value}
                  </div>
                  {slot.error && (
                    <div className="absolute -right-3 -top-3 bg-red-500 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                      <AlertCircle className="w-3 h-3" />
                      TypeError
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  const renderCoercionTab = () => {
    const current = COERCION_STEPS[coercionStep];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[400px]">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0f0f0f] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs text-white/40 font-mono">console</span>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed text-white/80 overflow-y-auto flex items-center justify-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={coercionStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl text-center"
                >
                  <span className="text-white/60">{'>'}</span> {current.expr}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative bg-gradient-to-br from-white/[0.03] to-transparent rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full flex flex-col items-center justify-center h-64 relative">
            <AnimatePresence mode="wait">
              {!isAnimating ? (
                <motion.div
                  key={`initial-${coercionStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-6 w-full"
                >
                  <div className={`font-mono text-xl px-6 py-4 rounded-xl border backdrop-blur-md shadow-xl ${getTypeColor(current.type1)}`}>
                    {current.op1}
                  </div>
                  {current.op && (
                    <div className="font-mono text-2xl text-white/50 bg-white/5 w-12 h-12 rounded-full flex items-center justify-center border border-white/10">
                      {current.op}
                    </div>
                  )}
                  <div className={`font-mono text-xl px-6 py-4 rounded-xl border backdrop-blur-md shadow-xl ${getTypeColor(current.type2)}`}>
                    {current.op2}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`result-${coercionStep}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2, bounce: 0.4 }}
                  className="flex flex-col items-center justify-center absolute inset-0"
                >
                  <ArrowRight className="w-8 h-8 text-white/30 mb-6" />
                  <div className={`font-mono text-3xl px-8 py-5 rounded-2xl border-2 backdrop-blur-md shadow-2xl ${getTypeColor(current.resultType)}`}>
                    {current.result}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  const steps = activeTab === 0 ? DECLARATION_STEPS : COERCION_STEPS;
  const currentStepIdx = activeTab === 0 ? declStep : coercionStep;
  const currentDesc = steps[currentStepIdx].desc;

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white p-4 md:p-8 flex flex-col">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => { setActiveTab(0); setDeclStep(0); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 0 
                ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            Declaration & Assignment
          </button>
          <button
            onClick={() => { setActiveTab(1); setCoercionStep(0); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 1 
                ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            Type Coercion
          </button>
        </div>

        <div className="flex-1">
          {activeTab === 0 ? renderDeclarationTab() : renderCoercionTab()}
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl">
          <div className="flex-1 text-center md:text-left">
            <div className="text-orange-400 font-mono text-sm mb-1">
              Step {currentStepIdx + 1} of {steps.length}
            </div>
            <div className="text-white/80 text-sm md:text-base leading-relaxed">
              {currentDesc}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReset}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors border border-white/10"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white/70 transition-colors border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIdx === steps.length - 1}
              className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-30 disabled:hover:bg-orange-500 text-white font-medium transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
