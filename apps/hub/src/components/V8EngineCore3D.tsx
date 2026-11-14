"use client";

import { useState, useEffect } from "react";
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
  Zap,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Braces
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
  codeSnippet: string;
  glyph: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortTitle: "VARIABLES",
    category: "Memory",
    subsystem: "V8 Scavenger GC",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#d97706",
    chipColor: "#fef3c7",
    codeSnippet: "let count = 42; // Smi: 31-bit\nlet user = { id: 100 }; // Heap object",
    glyph: "Smi: (val << 1) | 0 · Heap 0x7A40"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortTitle: "CONTROL",
    category: "Interpreter",
    subsystem: "Ignition Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#059669",
    chipColor: "#d1fae5",
    codeSnippet: "if (score < 100) {\n  advanceLevel();\n} // Ignition JumpIfFalse",
    glyph: "JumpIfFalse [r0], [offset]"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    shortTitle: "SCOPE",
    category: "Scope",
    subsystem: "Context Resolver",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#7c3aed",
    chipColor: "#ede9fe",
    codeSnippet: "function outer() {\n  const token = '0x99';\n  return () => token;\n}",
    glyph: "[[Scope]] -> Outer LexicalEnv"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    shortTitle: "ARRAYS",
    category: "Elements",
    subsystem: "Elements Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    chipColor: "#e0f2fe",
    codeSnippet: "const arr = [10, 20, 30, 40];\n// PACKED_SMI -> HOLEY on delete",
    glyph: "[ PACKED_SMI -> HOLEY_ELEMENTS ]"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortTitle: "OBJECTS",
    category: "Compiler",
    subsystem: "TurboFan JIT",
    tagline: "Shape transitions and inline cache slots",
    url: "https://objects-maps.vercel.app/",
    accent: "#ea580c",
    chipColor: "#ffedd5",
    codeSnippet: "const p = {}; // Map 0\np.x = 10; // Map 1 (Offset 0)\np.y = 20; // Map 2 (Offset 1)",
    glyph: "Map [Shape 0] -> add(y) -> [Shape 1]"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Event Loop & Concurrency",
    shortTitle: "EVENT LOOP",
    category: "Runtime",
    subsystem: "Libuv / TaskQueue",
    tagline: "Call stack drain and microtask priority queuing",
    url: "https://async-event-loop-ten.vercel.app/",
    accent: "#e11d48",
    chipColor: "#ffe4e6",
    codeSnippet: "Promise.resolve().then(microtask);\nsetTimeout(macrotask, 0);",
    glyph: "Microtask.drain() -> Render -> Macrotask"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM Engine & Blink",
    shortTitle: "DOM BLINK",
    category: "Host",
    subsystem: "Blink Tree Sync",
    tagline: "C++ bindings, layout reflow, and layer paint",
    url: "https://dom-apis.vercel.app/",
    accent: "#0891b2",
    chipColor: "#cffafe",
    codeSnippet: "const el = document.getElementById('app');\nel.classList.add('active'); // Reflow",
    glyph: "Blink [LayoutObject] -> Compositor Quad"
  }
];

const SYSTEM_ICONS = {
  variables: Layers,
  "control-flow": Workflow,
  "functions-scope": Code2,
  "arrays-iteration": Cpu,
  "objects-maps": Terminal,
  "async-event-loop": Activity,
  "dom-apis": Layers
};

function CodeTerminalPane({ item, step, onStep }: { item: V8ModuleMeta; step: number; onStep: () => void }) {
  return (
    <div className="flex flex-col justify-between h-full bg-[#1e293b] text-slate-200 rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-md border border-slate-700/60">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] text-slate-400 font-mono ml-2">runtime.js</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
            V8 JIT SOURCE
          </span>
        </div>

        <pre className="text-xs text-amber-200/90 leading-relaxed font-mono p-3 rounded-xl bg-slate-900/60 border border-slate-800 mb-4 overflow-x-auto">
          <code>{item.codeSnippet}</code>
        </pre>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span>IGNITION DISPATCH:</span>
            <span className="text-emerald-400 font-bold">OPCODE REGISTER 0x{((step % 4) + 1) * 8}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 font-mono text-xs flex items-center justify-between">
            <span className="text-emerald-400">&gt; LdaNamedProperty a0, [0x0{step % 4}]</span>
            <span className="text-[10px] text-slate-500">ACC &lt;-- r{step % 2}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-700/60 mt-4">
        <button
          onClick={onStep}
          className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:translate-y-0.5"
        >
          <Play size={12} className="fill-current" />
          <span>Step V8 Engine Execution</span>
        </button>
      </div>
    </div>
  );
}

function V8MemoryLensPane({ item, step }: { item: V8ModuleMeta; step: number }) {
  const modId = item.id;

  if (modId === "variables") {
    const isSmi = step % 2 === 0;
    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              V8 MEMORY ARCHITECTURE (STACK VS HEAP)
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
              31-BIT TAGGED SMI
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`p-3.5 rounded-xl border transition-all ${isSmi ? "bg-amber-50/80 border-amber-300 shadow-xs" : "bg-slate-50 border-slate-200 opacity-60"}`}>
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Stack (RSP Register)</div>
              <div className="text-sm font-bold text-slate-900">val: 42 (0x54)</div>
              <div className="text-[10px] text-amber-700 mt-1 font-semibold">Immediate 31-bit integer</div>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${!isSmi ? "bg-indigo-50/80 border-indigo-300 shadow-xs" : "bg-slate-50 border-slate-200 opacity-60"}`}>
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">V8 Heap Nursery</div>
              <div className="text-sm font-bold text-slate-900">{!isSmi ? "{ id: 100, v8: true }" : "Unallocated"}</div>
              <div className="text-[10px] text-indigo-700 mt-1 font-semibold">{!isSmi ? "ptr: 0x7A40_B00" : "Nursery Empty"}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Smi bitmask:</span>
              <span className="font-bold text-slate-800">(val &lt;&lt; 1) | 0</span>
            </div>
            <div className="flex justify-between">
              <span>Heap pointer tag:</span>
              <span className="font-bold text-indigo-700">(address) | 1</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Active State: {isSmi ? "Stack Integer (Zero Allocation)" : "Heap Object Allocated"}</span>
          <span className="font-bold text-amber-700">Scavenger GC</span>
        </div>
      </div>
    );
  }

  if (modId === "control-flow") {
    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              AST BRANCH EVALUATION &amp; JUMP TABLE
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              BYTECODE DISPATCH
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
              <span className="font-bold">[0x00] TestLessThan r0, [100]</span>
              <span className="text-[10px] text-emerald-700 font-bold">&rarr; True</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-between">
              <span>[0x04] JumpIfFalse [0x18]</span>
              <span className="text-[10px] text-slate-400">Bypassed</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-xs">
              <span className="font-bold">[0x08] Star r0 &rarr; Accumulator</span>
              <span className="text-[10px] text-emerald-300 font-bold">Active PC</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Register Allocation: r0, a0</span>
          <span className="font-bold text-emerald-700">Ignition Dispatcher</span>
        </div>
      </div>
    );
  }

  if (modId === "functions-scope") {
    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              LEXICAL SCOPE RESOLUTION &amp; CLOSURE
            </span>
            <span className="text-[10px] text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-bold">
              [[SCOPE]] CHAIN
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex justify-between">
              <span>Global Lexical Environment</span>
              <span className="text-[10px] text-slate-400">Window / GlobalThis</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 font-bold flex justify-between ml-3">
              <span>&uarr; Outer Function Scope [token: &apos;0x99&apos;]</span>
              <span className="text-[10px] text-purple-700">Heap Retained</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-600 text-white font-bold flex justify-between ml-6 shadow-xs">
              <span>&uarr; Inner Closure Invocation</span>
              <span className="text-[10px] text-purple-200">Active Stack</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Context allocation escapes to V8 heap</span>
          <span className="font-bold text-purple-700">Context Stack</span>
        </div>
      </div>
    );
  }

  if (modId === "arrays-iteration") {
    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              FAST CONTIGUOUS BUFFER VS HOLEY ELEMENTS
            </span>
            <span className="text-[10px] text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded font-bold">
              ELEMENTS KIND
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {[10, 20, 30, 40].map((v, i) => (
              <div key={i} className="p-3 rounded-xl bg-sky-600 text-white text-center font-bold shadow-xs">
                <div className="text-[8px] opacity-70">[{i}]</div>
                <div className="text-sm">{v}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Current Kind:</span>
              <span className="font-bold text-sky-700">PACKED_SMI_ELEMENTS</span>
            </div>
            <div className="flex justify-between">
              <span>Memory Layout:</span>
              <span className="font-bold text-slate-800">Contiguous Int32 Array</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>O(1) Direct Offset Indexing</span>
          <span className="font-bold text-sky-700">Elements Table</span>
        </div>
      </div>
    );
  }

  if (modId === "objects-maps") {
    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              TURBOFAN HIDDEN CLASS TRANSITION TREE
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
              INLINE CACHE
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[9px] text-slate-500">Shape 0</div>
              <div className="font-bold text-slate-800">Map 0x00</div>
            </div>
            <span className="text-amber-600 font-bold">&rarr;</span>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[9px] text-slate-500">Shape 1</div>
              <div className="font-bold text-slate-800">+x (Off: 0)</div>
            </div>
            <span className="text-amber-600 font-bold">&rarr;</span>
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 text-center font-bold shadow-xs">
              <div className="text-[9px] opacity-80">Shape 2</div>
              <div>+y (Off: 1)</div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Fast field access via fixed offset descriptors</span>
          <span className="font-bold text-amber-700">TurboFan JIT</span>
        </div>
      </div>
    );
  }

  if (modId === "async-event-loop") {
    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              EVENT LOOP PRIORITY DRAIN CYCLE
            </span>
            <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-bold">
              LIBUV DRAIN
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="p-3 rounded-xl bg-rose-600 text-white font-bold shadow-xs">
              <div className="text-[8px] opacity-80">STAGE 1</div>
              <div className="text-xs">Call Stack</div>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-bold">
              <div className="text-[8px] text-rose-600">STAGE 2</div>
              <div className="text-xs">Microtasks</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              <div className="text-[8px] text-slate-400">STAGE 3</div>
              <div className="text-xs">Macrotasks</div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Microtasks drain completely before timers fire</span>
          <span className="font-bold text-rose-700">Event Loop</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs font-mono text-xs">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            BLINK COMPOSITOR &amp; C++ BINDINGS
          </span>
          <span className="text-[10px] text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded font-bold">
            GPU COMPOSITE
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">DOM</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">Style</div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">Layout</div>
          <div className="p-2.5 rounded-xl bg-cyan-600 text-white font-bold shadow-xs">Paint</div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>C++ handles synchronize with V8 garbage collection</span>
        <span className="font-bold text-cyan-700">Blink Engine</span>
      </div>
    </div>
  );
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, onSelectModule }: Props) {
  const [step, setStep] = useState(0);
  const activeIdx = V8_MODULE_SYSTEMS.findIndex((m) => m.id === activeId);
  const activeModule = V8_MODULE_SYSTEMS[activeIdx] || V8_MODULE_SYSTEMS[0];
  const IconComp = SYSTEM_ICONS[activeModule.id as keyof typeof SYSTEM_ICONS] || Layers;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6", "7"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (V8_MODULE_SYSTEMS[idx]) {
          onSelectModule(V8_MODULE_SYSTEMS[idx].id);
        }
      } else if (e.key === "ArrowLeft") {
        const prev = (activeIdx - 1 + V8_MODULE_SYSTEMS.length) % V8_MODULE_SYSTEMS.length;
        onSelectModule(V8_MODULE_SYSTEMS[prev].id);
      } else if (e.key === "ArrowRight") {
        const next = (activeIdx + 1) % V8_MODULE_SYSTEMS.length;
        onSelectModule(V8_MODULE_SYSTEMS[next].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, onSelectModule]);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      <div className="w-full bg-white rounded-[24px] p-5 sm:p-7 border border-slate-200 shadow-md flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs"
                style={{ backgroundColor: activeModule.chipColor, color: activeModule.accent }}
              >
                <IconComp size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                    V8 ENGINE CORE // SYSTEM 0{activeIdx + 1}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeModule.accent }}
                  />
                </div>
                <h2 className="text-xl font-bold font-cabinet text-slate-900">{activeModule.name}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Navigate:</span>
              <button
                onClick={() => {
                  const prev = (activeIdx - 1 + V8_MODULE_SYSTEMS.length) % V8_MODULE_SYSTEMS.length;
                  onSelectModule(V8_MODULE_SYSTEMS[prev].id);
                }}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => {
                  const next = (activeIdx + 1) % V8_MODULE_SYSTEMS.length;
                  onSelectModule(V8_MODULE_SYSTEMS[next].id);
                }}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
            <div className="lg:col-span-6 h-[290px]">
              <CodeTerminalPane
                item={activeModule}
                step={step}
                onStep={() => setStep((s) => s + 1)}
              />
            </div>

            <div className="lg:col-span-6 h-[290px]">
              <V8MemoryLensPane
                item={activeModule}
                step={step}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">
            <span className="text-[10px] text-slate-500 font-bold uppercase">SCHEMATIC:</span>
            <span className="font-bold text-amber-700">{activeModule.glyph}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Keys: [1-7]</span>
            <a
              href={activeModule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-black !text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer active:translate-y-0.5"
            >
              <span className="!text-white font-bold">Deploy Visualizer ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
