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
  const [code, setCode] = useState(TEMPLATES['Variables Basics']);
  const [output, setOutput] = useState<{ id: string; type: 'log' | 'error'; text: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = () => {
    const originalConsoleLog = console.log;
    const logs: { id: string; type: 'log' | 'error'; text: string }[] = [];

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
      setOutput(prev => [...prev, ...logs]);
    }
  };

  const clearOutput = () => setOutput([]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#050505] text-white font-sans flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-6 flex-1">
        
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600">
            Interactive Sandbox
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-[600px]">
          
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              
              <div className="h-12 bg-black/40 flex items-center justify-between px-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm font-mono text-white/50">&lt;/&gt; sandbox.js</span>
                </div>
                <button
                  onClick={runCode}
                  className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-md transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Run
                </button>
              </div>

              <div className="flex-1 relative bg-[#1e1e1e]">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="absolute inset-0 w-full h-full p-4 bg-transparent text-white/90 font-mono text-sm resize-none outline-none focus:ring-0 leading-relaxed"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {Object.entries(TEMPLATES).map(([name, templateCode]) => (
                <button
                  key={name}
                  onClick={() => setCode(templateCode)}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors backdrop-blur-sm"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
            <div className="h-12 bg-black/40 flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-white/50" />
                <span className="text-sm font-mono text-white/70">Console Output</span>
              </div>
              <button
                onClick={clearOutput}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
                title="Clear Output"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 bg-black/60 overflow-y-auto font-mono text-sm font-medium">
              <AnimatePresence mode="popLayout">
                {output.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/30 italic"
                  >
                    Waiting for output...
                  </motion.div>
                ) : (
                  output.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-3 mb-2 ${line.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
                    >
                      <span className="select-none opacity-50">&gt;</span>
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
