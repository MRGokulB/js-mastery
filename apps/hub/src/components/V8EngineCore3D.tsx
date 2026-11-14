"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Workflow,
  Code2,
  Cpu,
  Terminal,
  Activity,
  ArrowUpRight,
  Sparkles,
  Play,
  RotateCcw,
  Boxes,
  Compass,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";

export interface V8ModuleMeta {
  id: string;
  index: string;
  name: string;
  shortTitle: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  accent: string;
  chipColor: string;
  codeLines: string[];
  explanationSteps: {
    lineIndex: number;
    title: string;
    description: string;
  }[];
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortTitle: "Variables & Memory",
    category: "Memory",
    subsystem: "V8 Memory Management",
    tagline: "Understand how numbers live on the stack while objects float on the heap.",
    url: "https://variables-pi.vercel.app/",
    accent: "#f59e0b",
    chipColor: "#fef3c7",
    codeLines: [
      "let count = 42;",
      "let user = { id: 100, name: 'Alex' };",
      "count = count + 1;",
      "user.id = 101;"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Primitive on the Stack",
        description: "Numbers and booleans are stored directly in the fast Call Stack as 31-bit tagged integers (Smis). No heap allocation needed."
      },
      {
        lineIndex: 1,
        title: "Object on the Heap",
        description: "Objects are allocated in Heap memory. The stack only holds a lightweight memory pointer (reference) pointing to that heap address."
      },
      {
        lineIndex: 2,
        title: "In-Place Primitive Mutation",
        description: "Updating 'count' updates the stack value directly in-place. Instant O(1) CPU register operation."
      },
      {
        lineIndex: 3,
        title: "Pointer Dereference",
        description: "Updating 'user.id' follows the pointer from the stack to the heap object and modifies the property inside the heap block."
      }
    ]
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortTitle: "Control Flow",
    category: "Logic",
    subsystem: "Ignition Bytecode Branching",
    tagline: "Watch how condition checks dynamically route program execution.",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#10b981",
    chipColor: "#d1fae5",
    codeLines: [
      "const score = 85;",
      "if (score >= 80) {",
      "  awardBadge('Mastery');",
      "} else {",
      "  retryExam();",
      "}"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Initialize Condition Value",
        description: "The variable 'score' is loaded into the CPU accumulator register for instant evaluation."
      },
      {
        lineIndex: 1,
        title: "Evaluate Boolean Branch",
        description: "The engine tests '85 >= 80'. The comparison evaluates to true, directing the execution branch into the if-block."
      },
      {
        lineIndex: 2,
        title: "Execute Success Branch",
        description: "The true-branch executes 'awardBadge(\"Mastery\")'. The else-branch is skipped completely via bytecode jump."
      },
      {
        lineIndex: 5,
        title: "Exit Control Structure",
        description: "Execution resumes past the conditional structure cleanly without evaluating skipped instructions."
      }
    ]
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Scope Chains",
    shortTitle: "Functions & Closures",
    category: "Scope",
    subsystem: "Lexical Scope Environments",
    tagline: "See how inner functions remember variables from outer functions.",
    url: "https://functions-scope.vercel.app/",
    accent: "#8b5cf6",
    chipColor: "#ede9fe",
    codeLines: [
      "function createCounter() {",
      "  let total = 0;",
      "  return function() {",
      "    total++;",
      "    return total;",
      "  };",
      "}"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Declare Outer Function",
        description: "A function definition creates its own lexical environment with its own private variable storage."
      },
      {
        lineIndex: 1,
        title: "Enclosed Variable",
        description: "'total' is initialized inside the outer function. Because an inner function references it, it will not be garbage-collected!"
      },
      {
        lineIndex: 2,
        title: "Return Closure",
        description: "Returning the inner function forms a 'closure'—bundling the function code with the environment where it was born."
      },
      {
        lineIndex: 3,
        title: "Retained Scope in Action",
        description: "Every call to the returned function safely reads and mutates 'total' across time, even after createCounter() has returned!"
      }
    ]
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Iteration",
    shortTitle: "Fast Arrays",
    category: "Data",
    subsystem: "V8 Packed Smi Elements",
    tagline: "Explore sequential array indexing, continuous memory, and map/filter.",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    chipColor: "#e0f2fe",
    codeLines: [
      "const scores = [10, 20, 30];",
      "const doubled = scores.map(n => n * 2);",
      "scores.push(40);",
      "console.log(doubled);"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Packed Smi Elements",
        description: "An array of pure integers is stored as contiguous memory (PACKED_SMI_ELEMENTS) for lightning-fast linear access."
      },
      {
        lineIndex: 1,
        title: "Transformative Iteration",
        description: "The .map() method iterates through every element, producing a brand-new array [20, 40, 60] while keeping the original intact."
      },
      {
        lineIndex: 2,
        title: "Amortized Expansion",
        description: "Calling .push(40) appends to the memory buffer with O(1) amortized speed, automatically resizing when needed."
      },
      {
        lineIndex: 3,
        title: "Output Transformed Data",
        description: "The doubled array is printed without side effects to the initial array."
      }
    ]
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortTitle: "Objects & Maps",
    category: "Objects",
    subsystem: "TurboFan Hidden Classes (Shapes)",
    tagline: "Discover how JavaScript optimizes property lookup behind the scenes.",
    url: "https://objects-maps.vercel.app/",
    accent: "#ea580c",
    chipColor: "#ffedd5",
    codeLines: [
      "const point = {};",
      "point.x = 10; // Shape transition: 0 -> 1",
      "point.y = 20; // Shape transition: 1 -> 2",
      "console.log(point.x + point.y);"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Empty Object (Shape 0)",
        description: "A new object starts with an initial empty Hidden Class (Map 0) tracking property layout."
      },
      {
        lineIndex: 1,
        title: "Add Property .x (Shape 1)",
        description: "Adding .x creates a transition to Shape 1, storing property 'x' at offset 0 in the property backing store."
      },
      {
        lineIndex: 2,
        title: "Add Property .y (Shape 2)",
        description: "Adding .y transitions to Shape 2. Objects initialized with the same properties in the same order share the exact same shape!"
      },
      {
        lineIndex: 3,
        title: "Fast Inline Cache Access",
        description: "Reading point.x uses cached offset calculations, making object lookups as fast as direct C++ struct member access."
      }
    ]
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "The Event Loop & Concurrency",
    shortTitle: "The Event Loop",
    category: "Async",
    subsystem: "Libuv & Microtask Prioritization",
    tagline: "Watch how Promises jump ahead of setTimeout in the microtask queue.",
    url: "https://async-event-loop-ten.vercel.app/",
    accent: "#e11d48",
    chipColor: "#ffe4e6",
    codeLines: [
      "console.log('1: Synchronous');",
      "setTimeout(() => console.log('2: Macrotask'), 0);",
      "Promise.resolve().then(() => console.log('3: Microtask'));",
      "console.log('4: Call stack ends');"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Synchronous Execution",
        description: "Console.log('1') executes immediately on the main Call Stack and prints to output."
      },
      {
        lineIndex: 1,
        title: "Schedule Macrotask",
        description: "setTimeout registers a timer callback with the browser API, scheduled for the Macrotask Queue."
      },
      {
        lineIndex: 2,
        title: "Schedule High-Priority Microtask",
        description: "Promise.then() enqueues into the Microtask Queue. Microtasks have higher priority than macrotasks!"
      },
      {
        lineIndex: 3,
        title: "Stack Drains & Microtasks Flush First!",
        description: "As soon as the call stack finishes, all Microtasks drain ('3: Microtask') BEFORE the Macrotask ('2: Macrotask') ever gets a turn!"
      }
    ]
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Browser Rendering",
    shortTitle: "DOM & Browser",
    category: "Browser",
    subsystem: "Blink Tree & Compositor",
    tagline: "See JavaScript update HTML nodes, trigger reflow, and paint the screen.",
    url: "https://dom-apis.vercel.app/",
    accent: "#0d9488",
    chipColor: "#ccfbf1",
    codeLines: [
      "const card = document.querySelector('#card');",
      "card.classList.add('active');",
      "card.style.transform = 'translateY(-4px)';",
      "card.textContent = 'Updated!';"
    ],
    explanationSteps: [
      {
        lineIndex: 0,
        title: "Query DOM Node",
        description: "The browser resolves the C++ DOM node reference and provides a JavaScript wrapper object."
      },
      {
        lineIndex: 1,
        title: "Class List Mutation",
        description: "Modifying classes marks the node's computed style as dirty, scheduling a style recalculation pass."
      },
      {
        lineIndex: 2,
        title: "Compositor-Only Transform",
        description: "Transforms and opacity updates are processed on the GPU compositor thread without forcing expensive full-page layout reflows!"
      },
      {
        lineIndex: 3,
        title: "Text Update & Paint",
        description: "The text update finishes the DOM mutation and the browser paints the updated pixels during the next frame."
      }
    ]
  }
];

interface V8EngineCore3DProps {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, onSelectModule }: V8EngineCore3DProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const activeModule = useMemo(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];
  }, [activeId]);

  const currentStep = activeModule.explanationSteps[stepIndex % activeModule.explanationSteps.length];

  const handleNextStep = () => {
    setStepIndex((prev) => (prev + 1) % activeModule.explanationSteps.length);
  };

  const handleReset = () => {
    setStepIndex(0);
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeModule.accent }}
            />
            <span className="text-xs font-bold tracking-wider uppercase text-slate-500 font-mono">
              Module {activeModule.index} &middot; {activeModule.category}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeModule.name}
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            {activeModule.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            onClick={handleNextStep}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:shadow hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play size={13} className="fill-current text-amber-400" />
            <span>Next Step ({stepIndex + 1}/{activeModule.explanationSteps.length})</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Reset Step"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-between code-editor-surface rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-slate-300 ml-2">script.js</span>
              </div>
              <span className="text-[11px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Line {currentStep.lineIndex + 1} Active
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs sm:text-[13px] leading-relaxed my-3">
              {activeModule.codeLines.map((line, idx) => {
                const isActive = idx === currentStep.lineIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-amber-400/15 text-amber-200 border-l-3 border-amber-400 font-bold shadow-xs"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-slate-600 select-none text-[11px] w-4 text-right">
                      {idx + 1}
                    </span>
                    <span className="truncate">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 bg-white/5 rounded-xl p-3.5 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
              <Sparkles size={14} />
              <span>{currentStep.title}</span>
            </div>
            <p className="text-slate-300 text-[12px] leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                <Boxes size={15} className="text-indigo-600" />
                <span>Live Interactive Architecture</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                Interactive State
              </span>
            </div>

            {activeModule.id === "variables" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900 font-mono">
                      CALL STACK (Fast Local Memory)
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-semibold border border-amber-200/60">
                      Stack Frame
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-xs">
                      <div className="text-slate-500 text-[11px]">count</div>
                      <div className="text-sm font-bold text-amber-600">{stepIndex >= 2 ? "43" : "42"}</div>
                      <div className="text-[10px] text-slate-400">Primitive (in-place)</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-xs">
                      <div className="text-slate-500 text-[11px]">user</div>
                      <div className="text-sm font-bold text-indigo-600">&rarr; Heap Ref</div>
                      <div className="text-[10px] text-slate-400">Pointer: 0x7A40</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-900 font-mono">
                      HEAP MEMORY (Dynamic Object Storage)
                    </span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md font-semibold border border-indigo-200/60">
                      Heap Block
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-indigo-200 text-xs font-mono">
                    <div className="text-slate-500 text-[11px] mb-1">Heap Address: 0x7A40</div>
                    <div className="font-bold text-slate-800">
                      &#123; id: {stepIndex >= 3 ? "101" : "100"}, name: &apos;Alex&apos; &#125;
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModule.id === "async-event-loop" && (
              <div className="space-y-3.5 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-700">1. Call Stack</span>
                    <span className="text-[10px] text-slate-500">Synchronous</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
                    {stepIndex === 0 ? "console.log('1: Synchronous')" : stepIndex === 3 ? "console.log('4: Call stack ends')" : "Main Script Execution"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-emerald-800">2. Microtask Queue (High Priority)</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.2 rounded font-bold">Priority #1</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-emerald-200 text-emerald-700 font-bold">
                    Promise.then() &rarr; &apos;3: Microtask&apos;
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-amber-800">3. Macrotask Queue (Timer Task)</span>
                    <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.2 rounded font-bold">Priority #2</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-amber-200 text-amber-700 font-bold">
                    setTimeout() &rarr; &apos;2: Macrotask&apos;
                  </div>
                </div>
              </div>
            )}

            {activeModule.id !== "variables" && activeModule.id !== "async-event-loop" && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Subsystem:</span>
                  <span className="font-bold text-slate-800">{activeModule.subsystem}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Topic Category:</span>
                  <span className="font-bold text-indigo-600">{activeModule.category}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-sans text-xs">
                  {currentStep.description}
                </div>
              </div>
            )}
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Interactive playground ready for direct deep dive.
            </span>

            <a
              href={activeModule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <span>Launch Full Module</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
