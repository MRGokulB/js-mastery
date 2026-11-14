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
  Zap,
  Sliders,
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
    accent: "#f59e0b",
    chipColor: "#fef3c7",
    codeSnippet: "let count = 42; // Smi: 31-bit integer\nlet user = { id: 100 }; // Heap object pointer",
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
    accent: "#10b981",
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
    accent: "#8b5cf6",
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
    codeSnippet: "const arr = [10, 20, 30, 40];\n// PACKED_SMI -> HOLEY on element delete",
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
    accent: "#0d9488",
    chipColor: "#ccfbf1",
    codeSnippet: "const el = document.getElementById('app');\nel.classList.add('active'); // Layer reflow",
    glyph: "Blink [LayoutObject] -> Compositor Quad"
  }
];

interface V8EngineCore3DProps {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, onSelectModule }: V8EngineCore3DProps) {
  const [step, setStep] = useState(0);
  const [pipelinePhase, setPipelinePhase] = useState<"source" | "bytecode" | "memory">("source");
  const [scale, setScale] = useState<number>(1);

  const activeModule = useMemo(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];
  }, [activeId]);

  const handleStep = () => {
    setStep((prev) => (prev + 1) % 4);
  };

  const handleReset = () => {
    setStep(0);
  };

  const isSmi = step % 2 === 0;

  return (
    <div className="w-full skeuo-rack-bezel rounded-[28px] p-4 sm:p-7 relative select-none">
      <div className="absolute top-4 left-4 skeuo-screw" />
      <div className="absolute top-4 right-4 skeuo-screw" />
      <div className="absolute bottom-4 left-4 skeuo-screw" />
      <div className="absolute bottom-4 right-4 skeuo-screw" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.08] px-2">
        <div className="flex items-center gap-3">
          <span className="led-diode-amber" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
            V8 RUNTIME BENCH // SYSTEM 0{activeModule.index} &middot; {activeModule.shortTitle}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
            {activeModule.category}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-mono text-slate-400">
            <span className="px-1.5 text-[10px] text-slate-500 uppercase">PIPELINE:</span>
            <button
              onClick={() => setPipelinePhase("source")}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                pipelinePhase === "source"
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : "hover:text-white"
              }`}
            >
              SOURCE
            </button>
            <button
              onClick={() => setPipelinePhase("bytecode")}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                pipelinePhase === "bytecode"
                  ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/40"
                  : "hover:text-white"
              }`}
            >
              BYTECODE
            </button>
            <button
              onClick={() => setPipelinePhase("memory")}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                pipelinePhase === "memory"
                  ? "bg-purple-400/20 text-purple-300 border border-purple-400/40"
                  : "hover:text-white"
              }`}
            >
              MEMORY
            </button>
          </div>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-mono text-slate-400">
            <span className="px-1.5 text-[10px] text-slate-500 uppercase">SCALE:</span>
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  scale === s
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "hover:text-white"
                }`}
              >
                {s}X
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        <div className="lg:col-span-6 flex flex-col justify-between v8-terminal-screen rounded-2xl p-5 border border-white/10 shadow-lg min-h-[340px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-xs" />
                <span className="text-[11px] text-slate-400 font-mono ml-2">runtime.js</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                V8 JIT SOURCE
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 mb-4 font-mono text-xs text-amber-300 leading-relaxed overflow-x-auto relative">
              <div className="absolute left-1 top-3.5 bottom-3.5 w-1 bg-amber-400/80 rounded-full" />
              <pre className="pl-3">
                <code>{activeModule.codeSnippet}</code>
              </pre>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="uppercase tracking-wider">IGNITION DISPATCH STREAM:</span>
                <span className="text-cyan-400 font-bold">OPCODE REGISTER 0x{((step % 4) + 1) * 8}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/70 border border-white/10 text-slate-300 flex items-center justify-between">
                <span className="text-cyan-300 font-bold">&gt; LdaNamedProperty a0, [0x0{step % 4}]</span>
                <span className="text-[11px] text-slate-500">ACC &larr; r{step % 2}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/5 text-center">
                  <div className="text-[9px] text-slate-500 uppercase">ACC</div>
                  <div className="text-amber-300 font-bold">42 (0x2A)</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 text-center">
                  <div className="text-[9px] text-slate-500 uppercase">r0 (Object)</div>
                  <div className="text-cyan-300 font-bold">0x7A40</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 text-center">
                  <div className="text-[9px] text-slate-500 uppercase">SP</div>
                  <div className="text-slate-300 font-bold">0x7FFF..</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex items-center gap-3">
            <button
              onClick={handleStep}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 text-slate-950 font-clash font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play size={13} className="fill-current" />
              <span>Step Engine Execution</span>
            </button>
            <button
              onClick={handleReset}
              className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              title="Reset Execution Step"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl p-5 shadow-lg border border-slate-200 min-h-[340px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  V8 RUNTIME ARCHITECTURE
                </span>
                <h4 className="font-clash font-bold text-base text-slate-900">
                  {activeModule.name}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {activeModule.subsystem}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isSmi
                    ? "bg-amber-50/80 border-amber-300 shadow-sm"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <div className="text-[10px] font-mono text-amber-700 uppercase font-bold mb-1">
                  Stack (RSP Register)
                </div>
                <div className="font-mono text-sm font-bold text-slate-900">
                  val: 42 (0x54)
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">
                  Immediate 31-bit integer
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  !isSmi
                    ? "bg-cyan-50/80 border-cyan-300 shadow-sm"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <div className="text-[10px] font-mono text-cyan-700 uppercase font-bold mb-1">
                  V8 Heap Nursery
                </div>
                <div className="font-mono text-sm font-bold text-slate-900 truncate">
                  {!isSmi ? "{ id: 100, v8: true }" : "Unallocated"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono truncate">
                  {!isSmi ? "ptr: 0x7A40_B00" : "Nursery Empty"}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Smi bitmask tag:</span>
                <span className="font-bold text-amber-600">(val &lt;&lt; 1) | 0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Heap pointer tag:</span>
                <span className="font-bold text-cyan-600">(address) | 1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Execution Frame:</span>
                <span className="font-bold text-slate-800">Context[{activeModule.index}]</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              State: {isSmi ? "Stack Smi (Zero Heap Alloc)" : "Heap Object Allocated"}
            </span>

            <a
              href={activeModule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 !text-white font-clash font-bold text-xs shadow-sm transition-all"
            >
              <span className="!text-white">Full Workbench</span>
              <ArrowUpRight size={13} className="!text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="px-2 pt-2 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase">SCHEMATIC INVARIANT:</span>
          <span className="text-amber-400 font-bold">{activeModule.glyph}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Subsystem: {activeModule.subsystem}</span>
          <span className="text-slate-600">&middot;</span>
          <span>Latency: ~0.14ms</span>
        </div>
      </div>
    </div>
  );
}
