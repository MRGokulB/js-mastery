'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Box, Type, SearchCode } from 'lucide-react';

const tabs = [
  { id: 'destructuring', label: 'Destructuring', icon: Box },
  { id: 'templates', label: 'Template Literals', icon: Type },
  { id: 'types', label: 'Type Checking', icon: SearchCode }
];

const destructuringSteps = [
  {
    code: 'const user = {\n  name: "Alice",\n  age: 25,\n  city: "NYC"\n};',
    desc: 'An object with multiple properties.'
  },
  {
    code: 'const { name, age } = user;',
    desc: 'Extracting properties directly into variables.'
  },
  {
    code: 'const { name: firstName } = user;',
    desc: 'Renaming a property while destructuring.'
  },
  {
    code: 'const [a, b, c] = [1, 2, 3];',
    desc: 'Array destructuring assigns values by position.'
  },
  {
    code: 'const [first, ...rest] = [1, 2, 3, 4, 5];',
    desc: 'The rest operator groups remaining elements.'
  },
  {
    code: 'const { x = 10 } = {};',
    desc: 'Providing default values as a fallback.'
  }
];

const templateSteps = [
  {
    code: 'const greeting = "Hello " + name + "n" +\n                 "Age: " + age;',
    desc: 'Old string concatenation with plus operators and newlines.'
  },
  {
    code: 'const greeting = `Hello ${name}nAge: ${age}`;',
    desc: 'Template literals use backticks and interpolate variables with ${}'
  },
  {
    code: 'const html = `\n  <div>\n    <h1>${title}</h1>\n  </div>\n`;',
    desc: 'Template literals naturally support multi-line strings.'
  },
  {
    code: 'const safe = sanitize`<div>${input}</div>`;',
    desc: 'Tagged templates allow custom parsing of template literals.'
  }
];

const typeSteps = [
  {
    code: 'typeof x === "number"',
    desc: 'Basic type checking with typeof.'
  },
  {
    code: 'Array.isArray(arr)',
    desc: 'typeof [] is "object", so we use Array.isArray().'
  },
  {
    code: 'x !== null && x !== undefined',
    desc: 'Explicit nullish check vs loose x != null'
  },
  {
    code: 'const val = x ?? "default";',
    desc: 'Nullish coalescing falls back only on null or undefined.'
  },
  {
    code: 'const city = user?.address?.city;',
    desc: 'Optional chaining safely accesses deep properties.'
  }
];

export default function PatternsScene() {
  const [activeTab, setActiveTab] = useState('destructuring');
  const [stepIdx, setStepIdx] = useState(0);

  const getSteps = () => {
    if (activeTab === 'destructuring') return destructuringSteps;
    if (activeTab === 'templates') return templateSteps;
    return typeSteps;
  };

  const steps = getSteps();
  const step = steps[stepIdx];

  const handleNext = () => setStepIdx(p => Math.min(steps.length - 1, p + 1));
  const handlePrev = () => setStepIdx(p => Math.max(0, p - 1));
  const handleReset = () => setStepIdx(0);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setStepIdx(0);
  };

  const renderDestructuringVisual = () => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 text-white relative">
        <AnimatePresence mode="wait">
          {stepIdx === 0 && (
            <motion.div
              key="d-step0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex flex-col gap-4 shadow-lg w-64"
            >
              <div className="text-center font-mono text-amber-500 font-bold border-b border-neutral-700 pb-2">user</div>
              <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded">
                <span className="text-neutral-400">name:</span>
                <span className="text-emerald-400">"Alice"</span>
              </div>
              <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded">
                <span className="text-neutral-400">age:</span>
                <span className="text-blue-400">25</span>
              </div>
              <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded">
                <span className="text-neutral-400">city:</span>
                <span className="text-emerald-400">"NYC"</span>
              </div>
            </motion.div>
          )}

          {stepIdx === 1 && (
            <motion.div
              key="d-step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-8 w-full justify-center"
            >
              <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex flex-col gap-4 w-64 opacity-50 scale-95">
                 <div className="text-center font-mono text-amber-500 font-bold border-b border-neutral-700 pb-2">user</div>
                 <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded border border-amber-500/50">
                   <span className="text-neutral-400">name:</span>
                   <span className="text-emerald-400">"Alice"</span>
                 </div>
                 <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded border border-amber-500/50">
                   <span className="text-neutral-400">age:</span>
                   <span className="text-blue-400">25</span>
                 </div>
                 <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded">
                   <span className="text-neutral-400">city:</span>
                   <span className="text-emerald-400">"NYC"</span>
                 </div>
              </div>

              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="bg-neutral-800 border-2 border-amber-500 rounded p-4 font-mono shadow-xl flex gap-2 items-center">
                  <span className="text-purple-400">const</span>
                  <span className="text-white">name</span>
                  <span className="text-neutral-500">=</span>
                  <span className="text-emerald-400">"Alice"</span>
                </div>
                <div className="bg-neutral-800 border-2 border-amber-500 rounded p-4 font-mono shadow-xl flex gap-2 items-center">
                  <span className="text-purple-400">const</span>
                  <span className="text-white">age</span>
                  <span className="text-neutral-500">=</span>
                  <span className="text-blue-400">25</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {stepIdx === 2 && (
            <motion.div
              key="d-step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-8 w-full justify-center"
            >
              <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex flex-col gap-4 w-64 opacity-50 scale-95">
                 <div className="text-center font-mono text-amber-500 font-bold border-b border-neutral-700 pb-2">user</div>
                 <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded border border-amber-500/50">
                   <span className="text-neutral-400">name:</span>
                   <span className="text-emerald-400">"Alice"</span>
                 </div>
                 <div className="flex justify-between font-mono bg-neutral-800 p-2 rounded">
                   <span className="text-neutral-400">age:</span>
                   <span className="text-blue-400">25</span>
                 </div>
              </div>

              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-neutral-800 border-2 border-amber-500 rounded p-4 font-mono shadow-xl flex gap-2 items-center">
                  <span className="text-purple-400">const</span>
                  <span className="text-amber-300 font-bold">firstName</span>
                  <span className="text-neutral-500">=</span>
                  <span className="text-emerald-400">"Alice"</span>
                </div>
                <div className="text-xs text-neutral-400 mt-2 text-center">Extracted 'name' but bound to 'firstName'</div>
              </motion.div>
            </motion.div>
          )}

          {stepIdx === 3 && (
            <motion.div
              key="d-step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 w-full justify-center"
            >
              <div className="flex gap-2">
                <div className="bg-neutral-800 p-4 rounded border border-neutral-700 font-mono text-blue-400 text-xl">1</div>
                <div className="bg-neutral-800 p-4 rounded border border-neutral-700 font-mono text-blue-400 text-xl">2</div>
                <div className="bg-neutral-800 p-4 rounded border border-neutral-700 font-mono text-blue-400 text-xl">3</div>
              </div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2"
              >
                <div className="bg-neutral-900 border-2 border-amber-500 p-4 rounded font-mono shadow-xl flex flex-col items-center">
                  <span className="text-xs text-amber-500 mb-1">a</span>
                  <span className="text-blue-400">1</span>
                </div>
                <div className="bg-neutral-900 border-2 border-amber-500 p-4 rounded font-mono shadow-xl flex flex-col items-center">
                  <span className="text-xs text-amber-500 mb-1">b</span>
                  <span className="text-blue-400">2</span>
                </div>
                <div className="bg-neutral-900 border-2 border-amber-500 p-4 rounded font-mono shadow-xl flex flex-col items-center">
                  <span className="text-xs text-amber-500 mb-1">c</span>
                  <span className="text-blue-400">3</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {stepIdx === 4 && (
            <motion.div
              key="d-step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 w-full justify-center"
            >
              <div className="flex gap-2">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className="bg-neutral-800 p-4 rounded border border-neutral-700 font-mono text-blue-400">{n}</div>
                ))}
              </div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-8"
              >
                <div className="bg-neutral-900 border-2 border-amber-500 p-4 rounded font-mono shadow-xl flex flex-col items-center">
                  <span className="text-xs text-amber-500 mb-1">first</span>
                  <span className="text-blue-400">1</span>
                </div>
                <div className="bg-neutral-900 border-2 border-amber-500 p-4 rounded font-mono shadow-xl flex flex-col items-center">
                  <span className="text-xs text-amber-500 mb-1">...rest</span>
                  <div className="flex gap-1 text-sm">
                    <span className="text-neutral-400">[</span>
                    <span className="text-blue-400">2</span>,
                    <span className="text-blue-400">3</span>,
                    <span className="text-blue-400">4</span>,
                    <span className="text-blue-400">5</span>
                    <span className="text-neutral-400">]</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {stepIdx === 5 && (
            <motion.div
              key="d-step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 w-full justify-center"
            >
              <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 text-center font-mono text-neutral-500 flex flex-col gap-2">
                 <span>{`{}`}</span>
                 <span className="text-xs text-neutral-400">Empty Object</span>
              </div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-neutral-900 border-2 border-amber-500 p-4 rounded font-mono shadow-xl flex flex-col items-center">
                  <span className="text-xs text-amber-500 mb-1">x</span>
                  <span className="text-blue-400">10</span>
                  <span className="text-xs text-neutral-400 mt-1">(fallback)</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderTemplateVisual = () => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 text-white relative">
        <AnimatePresence mode="wait">
          {stepIdx === 0 && (
            <motion.div
              key="t-step0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-mono text-lg"
            >
              <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 text-emerald-400 shadow-[2px_0_0_0_#ef4444_inset] rounded-l-none">"Hello "</div>
              <div className="text-neutral-500 font-bold">+</div>
              <div className="bg-neutral-800 p-3 rounded-lg border border-amber-500 text-amber-400 shadow-[2px_0_0_0_#ef4444_inset,-2px_0_0_0_#ef4444_inset] rounded-none">name</div>
              <div className="text-neutral-500 font-bold">+</div>
              <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 text-emerald-400 shadow-[-2px_0_0_0_#ef4444_inset] rounded-r-none">", you are "</div>
              <div className="text-neutral-500 font-bold">+</div>
              <div className="bg-neutral-800 p-3 rounded-lg border border-amber-500 text-amber-400 shadow-[2px_0_0_0_#ef4444_inset,-2px_0_0_0_#ef4444_inset] rounded-none">age</div>
            </motion.div>
          )}
          {stepIdx === 1 && (
            <motion.div
              key="t-step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-900 border-2 border-emerald-500/30 p-6 rounded-xl font-mono text-xl shadow-xl shadow-emerald-900/20"
            >
              <span className="text-emerald-400">`Hello </span>
              <span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded">{"${name}"}</span>
              <span className="text-emerald-400">, you are </span>
              <span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded">{"${age}"}</span>
              <span className="text-emerald-400">`</span>
            </motion.div>
          )}
          {stepIdx === 2 && (
            <motion.div
              key="t-step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl font-mono text-lg whitespace-pre text-emerald-400"
            >
              {"` "}
              <br />
              {"  <div>"}
              <br />
              {"    <h1>"}
              <span className="text-amber-400 bg-amber-400/10 px-1 rounded">{"${title}"}</span>
              {"</h1>"}
              <br />
              {"  </div>"}
              <br />
              {"`"}
            </motion.div>
          )}
          {stepIdx === 3 && (
            <motion.div
              key="t-step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl font-mono text-lg flex items-center gap-1"
            >
              <span className="text-blue-400 mr-2">sanitize</span>
              <span className="text-emerald-400">`&lt;div&gt;</span>
              <span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded">{"${input}"}</span>
              <span className="text-emerald-400">&lt;/div&gt;`</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderTypeVisual = () => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 text-white relative">
        <AnimatePresence mode="wait">
          {stepIdx === 0 && (
            <motion.div
              key="ty-step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-lg border border-neutral-700 w-80">
                <span className="font-mono text-amber-500">typeof "hello"</span>
                <span className="font-mono text-emerald-400">"string"</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-lg border border-neutral-700 w-80">
                <span className="font-mono text-amber-500">typeof 42</span>
                <span className="font-mono text-emerald-400">"number"</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-lg border border-neutral-700 w-80">
                <span className="font-mono text-amber-500">typeof true</span>
                <span className="font-mono text-emerald-400">"boolean"</span>
              </div>
            </motion.div>
          )}
          {stepIdx === 1 && (
            <motion.div
              key="ty-step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-lg border border-red-500/50 w-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/10" />
                <span className="font-mono text-amber-500 relative z-10">typeof []</span>
                <span className="font-mono text-red-400 relative z-10">"object" ⚠️</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-lg border border-emerald-500/50 w-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/10" />
                <span className="font-mono text-amber-500 relative z-10">Array.isArray([])</span>
                <span className="font-mono text-emerald-400 relative z-10">true ✅</span>
              </div>
            </motion.div>
          )}
          {stepIdx === 2 && (
            <motion.div
              key="ty-step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6 items-center"
            >
              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 font-mono text-center">
                <div className="text-amber-500 mb-2">x != null</div>
                <div className="text-sm text-neutral-400">Checks both null AND undefined</div>
              </div>
              <div className="text-neutral-500 font-bold">vs</div>
              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 font-mono text-center">
                <div className="text-amber-500 mb-2">x !== null && x !== undefined</div>
                <div className="text-sm text-neutral-400">Strict checking</div>
              </div>
            </motion.div>
          )}
          {stepIdx === 3 && (
            <motion.div
              key="ty-step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 gap-4"
            >
               <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 font-mono flex flex-col items-center gap-2">
                 <span className="text-neutral-400">null ?? "default"</span>
                 <span className="text-emerald-400">"default"</span>
               </div>
               <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 font-mono flex flex-col items-center gap-2">
                 <span className="text-neutral-400">undefined ?? "default"</span>
                 <span className="text-emerald-400">"default"</span>
               </div>
               <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 font-mono flex flex-col items-center gap-2">
                 <span className="text-neutral-400">0 ?? "default"</span>
                 <span className="text-emerald-400">0</span>
               </div>
               <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 font-mono flex flex-col items-center gap-2">
                 <span className="text-neutral-400">"" ?? "default"</span>
                 <span className="text-emerald-400">""</span>
               </div>
               <div className="col-span-2 text-center text-sm text-amber-500 mt-2 bg-amber-500/10 p-2 rounded">
                  Note: 0 and "" are valid values, unlike with ||
               </div>
            </motion.div>
          )}
          {stepIdx === 4 && (
            <motion.div
              key="ty-step4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg font-mono">
                <span className="text-neutral-400">user</span>
                <span className="text-amber-500 font-bold">?.</span>
                <span className="text-neutral-400">address</span>
                <span className="text-amber-500 font-bold">?.</span>
                <span className="text-emerald-400">city</span>
              </div>
              <div className="text-sm text-neutral-400">Equivalent to:</div>
              <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg font-mono text-sm max-w-[300px] text-center">
                <span className="text-neutral-500">
                  user != null && user.address != null ? user.address.city : undefined
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 flex flex-col font-sans">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${isActive ? 'bg-amber-500/10 border-amber-500 text-amber-400 border' : 'bg-neutral-900 border-neutral-800 text-neutral-400 border hover:bg-neutral-800'}`}
            >
              <Icon size={18} />
              <span className="font-semibold">{tab.label}</span>
              {isActive && (
                <motion.div layoutId="indicator" className="h-1 w-8 bg-amber-500 absolute -bottom-2 rounded-full hidden" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 grid lg:grid-cols-12 gap-6 bg-neutral-950/50 rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="lg:col-span-5 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-center gap-8 relative overflow-hidden bg-neutral-900/50">
           <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800">
             <motion.div 
               className="h-full bg-amber-500" 
               initial={{ width: 0 }}
               animate={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={`${activeTab}-${stepIdx}`}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="flex flex-col gap-6"
             >
               <div className="bg-black/50 p-6 rounded-2xl border border-neutral-800 shadow-inner">
                 <pre className="font-mono text-sm md:text-base text-neutral-300 whitespace-pre-wrap leading-relaxed">
                   {step.code}
                 </pre>
               </div>
               <p className="text-neutral-400 text-lg leading-relaxed">
                 {step.desc}
               </p>
             </motion.div>
           </AnimatePresence>

           <div className="flex items-center justify-between mt-auto pt-8">
              <button
                onClick={handlePrev}
                disabled={stepIdx === 0}
                className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStepIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === stepIdx ? 'bg-amber-500 w-8' : 'bg-neutral-700 hover:bg-neutral-500'}`}
                  />
                ))}
              </div>

              {stepIdx === steps.length - 1 ? (
                <button
                  onClick={handleReset}
                  className="p-3 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 hover:bg-amber-500/30 transition-colors"
                >
                  <RotateCcw size={24} />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-amber-500 border border-amber-400 text-neutral-950 hover:bg-amber-400 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              )}
           </div>
        </div>

        <div className="lg:col-span-7 p-6 md:p-10 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]">
           {activeTab === 'destructuring' && renderDestructuringVisual()}
           {activeTab === 'templates' && renderTemplateVisual()}
           {activeTab === 'types' && renderTypeVisual()}
        </div>
      </div>
    </div>
  );
}
