'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, Trash2, Code2 } from 'lucide-react';

const TEMPLATES = {
  'Variables Basics': `let greeting = "Hello, World!";
console.log(greeting);

const PI = 3.14159;
let radius = 5;
let area = PI * radius * radius;
console.log("Area:", area);

let x = 42;
let y = x;
x = 100;
console.log("x =", x);
console.log("y =", y);
console.log("Are they equal?", x === y);`,
  'Type Coercion': `console.log('"5" + 3 =', "5" + 3);
console.log('"5" - 3 =', "5" - 3);
console.log('"5" * 3 =', "5" * 3);
console.log('5 + true =', 5 + true);
console.log('5 + false =', 5 + false);
console.log('[] == "" is', [] == "");
console.log('[] == 0 is', [] == 0);
console.log('null == undefined is', null == undefined);
console.log('null === undefined is', null === undefined);`,
  'Const vs Let': `let count = 1;
console.log("Initial count:", count);
count = 2;
console.log("Updated count:", count);

const MAX_USERS = 100;
console.log("Max users:", MAX_USERS);

try {
  MAX_USERS = 150;
} catch (error) {
  console.log("Error:", error.message);
}

const user = { name: "John" };
user.name = "Jane";
console.log("Updated user:", user.name);`
};

export default function SandboxScene() {
  const [activeTemplate, setActiveTemplate] = useState<string>('Variables Basics');
  const [code, setCode] = useState(TEMPLATES['Variables Basics']);
  const [output, setOutput] = useState<{ id: string; type: 'log' | 'error'; text: string }[]>([]);
  const [execTime, setExecTime] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = () => {
    const originalConsoleLog = console.log;
    const logs: { id: string; type: 'log' | 'error'; text: string }[] = [];
    const t0 = performance.now();

    console.log = (...args) => {
      logs.push({
        id: Math.random().toString(36).substring(7),
        type: 'log',
        text: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
      });
    };

    try {
      const execute = new Function(code);
      execute();
    } catch (error: any) {
      logs.push({
        id: Math.random().toString(36).substring(7),
        type: 'error',
        text: error.message || String(error)
      });
    } finally {
      console.log = originalConsoleLog;
      const t1 = performance.now();
      setExecTime(Math.round((t1 - t0) * 100) / 100);
      setOutput(prev => [...prev, ...logs]);
    }
  };

  const clearOutput = () => {
    setOutput([]);
    setExecTime(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  const linesCount = code.split('\n').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-slate-900 dark:text-white font-sans flex flex-col">
      <div className="w-full flex flex-col gap-6 flex-1">
        
        <div className="max-w-3xl mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
            09 &bull; Interactive V8 Playground
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Interactive Code Sandbox
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Execute real JavaScript expressions directly in your browser. Experiment with variable reassignments, object mutations, and type coercions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-[550px]">
          
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0c0e14]/90 shadow-xl transition-all">
              
              <div className="h-12 bg-slate-100/90 dark:bg-black/40 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">&lt;/&gt; sandbox.js</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                    Ctrl + Enter
                  </span>
                  <button
                    onClick={runCode}
                    className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Run
                  </button>
                </div>
              </div>

              <div className="flex-1 relative flex font-mono text-xs sm:text-sm bg-slate-50/50 dark:bg-[#080a0f] min-h-[380px]">
                <div className="w-10 select-none py-4 text-right pr-3 text-slate-400 dark:text-slate-600 bg-slate-100/40 dark:bg-white/[0.01] border-r border-slate-200/60 dark:border-white/[0.04] leading-relaxed">
                  {Array.from({ length: linesCount }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 p-4 bg-transparent text-slate-900 dark:text-slate-100 font-mono text-xs sm:text-sm resize-none outline-none focus:ring-0 leading-relaxed font-normal"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {Object.entries(TEMPLATES).map(([name, templateCode]) => (
                <button
                  key={name}
                  onClick={() => {
                    setActiveTemplate(name);
                    setCode(templateCode);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeTemplate === name
                      ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-xs"
                      : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0c0e14]/90 shadow-xl">
            <div className="h-12 bg-slate-100/90 dark:bg-black/40 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Console Telemetry</span>
                {execTime !== null && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                    {execTime}ms
                  </span>
                )}
              </div>
              <button
                onClick={clearOutput}
                className="p-1.5 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Clear Output"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 p-4 bg-slate-50/70 dark:bg-[#080a0f] overflow-y-auto font-mono text-xs font-medium min-h-[300px]">
              <AnimatePresence mode="popLayout">
                {output.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-slate-400 dark:text-slate-600 italic py-8 text-center text-xs"
                  >
                    Click &apos;Run&apos; or press Ctrl+Enter to execute JavaScript expressions.
                  </motion.div>
                ) : (
                  output.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-2.5 mb-2 ${line.type === 'error' ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}
                    >
                      <span className="select-none opacity-40">&gt;</span>
                      <span className="break-all whitespace-pre-wrap">{line.text}</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
