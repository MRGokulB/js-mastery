"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  Boxes,
  Workflow,
  Cpu,
  Layers,
  Sparkles,
  Timer,
  Layout,
  CheckCircle2,
  Terminal,
  Activity
} from "lucide-react";

export interface V8ModuleMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  accent: string;
  mechanic: string;
  invariant: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    category: "Memory Architecture",
    subsystem: "V8 Scavenger GC & Pointer Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap object pointer tagging",
    url: "https://variables-pi.vercel.app/",
    accent: "#d97706",
    mechanic: "Contiguous Stack Frames & Dynamic Heap Pointers",
    invariant: "Tagged Pointers: Last bit 0 = 31-bit Smi, Last bit 1 = Heap Pointer"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    category: "Bytecode Interpreter",
    subsystem: "Ignition Bytecode Dispatcher",
    tagline: "AST conditional branch jumping and truthy bitmask coercion",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#059669",
    mechanic: "Conditional Branch Jump Offset Accumulators",
    invariant: "Ignition Accumulator: Register-based bytecode instruction execution"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    category: "Lexical Scope",
    subsystem: "Context Resolver & Activation Records",
    tagline: "Lexical environments and persistent heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#7c3aed",
    mechanic: "Context Stack Linked Lexical Environment Chain",
    invariant: "Closure Retention: Outlived stack frames escape to persistent heap"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    category: "Elements Transitions",
    subsystem: "V8 Elements Transition Table",
    tagline: "Packed Smi elements and amortized buffer doubling",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    mechanic: "PACKED_SMI -> PACKED_DOUBLE -> HOLEY Transitions",
    invariant: "Unidirectional Element Transition: Array never downgrades to faster state"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    category: "JIT Compiler",
    subsystem: "TurboFan JIT Type Feedback Vector",
    tagline: "V8 Shapes (Maps), inline caching and prototype offset tables",
    url: "https://objects-maps.vercel.app/",
    accent: "#c026d3",
    mechanic: "Shape Transition Tree & Monomorphic Inline Caching",
    invariant: "Shape Invariance: Objects initialized in same order share identical Maps"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    category: "Runtime Scheduler",
    subsystem: "Libuv & Browser Event Loop Ring",
    tagline: "Microtask drain strict priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    mechanic: "Dual Priority Queue Scheduler (Microtask P0 / Macrotask P1)",
    invariant: "Microtask Drain: Microtask queue MUST empty before next Macrotask"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    category: "Blink Engine",
    subsystem: "Blink Layout & GPU Compositor",
    tagline: "Critical rendering path and GPU layer geometry reflow",
    url: "https://dom-apis.vercel.app",
    accent: "#0891b2",
    mechanic: "DOM Tree -> CSSOM -> Render Tree -> GPU Compositor",
    invariant: "Reflow Minimization: Batch geometry reads/writes to prevent thrashing"
  }
];

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8RuntimeProfiler({ activeId, onSelectModule }: Props) {
  const activeModule = V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];

  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [activeId]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full rounded-[28px] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
      {/* Profiler Header Bar */}
      <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#fafafb]/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: activeModule.accent }}
            />
            <span className="font-mono text-xs font-semibold text-[#0f172a] uppercase tracking-wider">
              {activeModule.category} PROFILER
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#71717a] border-l border-black/[0.08] pl-3 hidden sm:inline">
            MODULE {activeModule.index} / 07
          </span>
        </div>

        {/* Live Step Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : 3))}
            className="p-1.5 rounded-lg border border-black/[0.08] bg-white text-[#18181b] hover:bg-black hover:text-white transition-colors cursor-pointer text-xs"
            title="Previous Step"
            aria-label="Previous Step"
          >
            ◄
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0f172a] text-white hover:bg-black transition-colors cursor-pointer text-xs font-mono font-medium shadow-xs"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "Pause" : "Tick Cycle"}</span>
          </button>

          <button
            onClick={() => setStep((prev) => (prev + 1) % 4)}
            className="p-1.5 rounded-lg border border-black/[0.08] bg-white text-[#18181b] hover:bg-black hover:text-white transition-colors cursor-pointer text-xs"
            title="Next Step"
            aria-label="Next Step"
          >
            ►
          </button>

          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg border border-black/[0.08] bg-white text-[#71717a] hover:text-black transition-colors cursor-pointer ml-1"
            title="Reset"
            aria-label="Reset profiler"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="p-6 sm:p-8 min-h-[340px] flex flex-col justify-center relative bg-gradient-to-b from-white via-[#fafafb] to-white">
        {activeId === "async-event-loop" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Event Loop Phase Execution: Microtasks Drain vs Macrotasks</span>
              <span className="font-semibold text-rose-600">Scheduler Priority Test</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Call Stack */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[170px]">
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-2">
                    1. Call Stack (LIFO)
                  </span>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-lg bg-slate-100 font-mono text-xs font-semibold text-[#0f172a]">
                      anonymous()
                    </div>
                    {step === 0 && (
                      <div className="p-2 rounded-lg bg-blue-600 text-white font-mono text-xs font-semibold animate-pulse">
                        console.log(&apos;Start&apos;)
                      </div>
                    )}
                    {step === 1 && (
                      <div className="p-2 rounded-lg bg-rose-500 text-white font-mono text-xs font-semibold">
                        Promise.resolve()
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#71717a] mt-2">
                  {step === 0 ? "Executing synchronous code" : "Call stack active"}
                </span>
              </div>

              {/* Microtask Queue */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[170px]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#71717a] uppercase">
                      2. Microtasks (P0)
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      STRICT PRIORITY
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {step <= 2 && (
                      <div
                        className={`p-2 rounded-lg font-mono text-xs font-semibold border ${
                          step === 2
                            ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        Promise.then(cb)
                      </div>
                    )}
                    {step <= 1 && (
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs">
                        queueMicrotask(cb)
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold mt-2">
                  {step === 2 ? "Draining Microtasks NOW" : "Enqueued Microtasks"}
                </span>
              </div>

              {/* Macrotask Queue */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[170px]">
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-2">
                    3. Macrotasks (P1)
                  </span>
                  <div className="space-y-1.5">
                    <div
                      className={`p-2 rounded-lg font-mono text-xs font-semibold border ${
                        step === 3
                          ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      setTimeout(cb, 0)
                    </div>
                    <div className="p-2 rounded-lg bg-slate-100 font-mono text-xs text-slate-400">
                      setInterval()
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-700 font-semibold mt-2">
                  {step === 3 ? "Timer Executed After Microtasks" : "Waiting for Microtask Drain"}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                {step === 0 && "Cycle Step 1: Main synchronous script evaluates on Call Stack. setTimeout scheduled."}
                {step === 1 && "Cycle Step 2: Promise resolved; microtask callback pushed to Microtask Queue."}
                {step === 2 && "Cycle Step 3: Call stack empty! Microtask queue drains completely with P0 priority."}
                {step === 3 && "Cycle Step 4: All microtasks drained. Event Loop advances to execute Macrotask (setTimeout)."}
              </span>
              <span className="font-bold text-rose-600">Phase: {step + 1}/4</span>
            </div>
          </div>
        )}

        {activeId === "objects-maps" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>V8 Hidden Classes (Shapes) &amp; Inline Caching (IC)</span>
              <span className="font-semibold text-purple-600">Shape Transition Tree</span>
            </div>

            <div className="flex items-center justify-between gap-3 overflow-x-auto py-2">
              {[
                { name: "Shape_0 (Empty)", desc: "Offset: None", obj: "const o = {}", active: step >= 0 },
                { name: "Shape_1 (+x)", desc: "Offset 0 -> x: 10", obj: "o.x = 10", active: step >= 1 },
                { name: "Shape_2 (+y)", desc: "Offset 1 -> y: 20", obj: "o.y = 20", active: step >= 2 }
              ].map((s, idx) => (
                <div key={s.name} className="flex items-center gap-2 shrink-0">
                  <div
                    className={`p-4 rounded-2xl border min-w-[140px] transition-all duration-300 ${
                      s.active
                        ? "bg-purple-50/80 border-purple-300 shadow-xs text-[#0f172a]"
                        : "bg-white border-black/[0.08] text-slate-400"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-1">
                      Hidden Class
                    </span>
                    <span className="font-clash font-bold text-sm block">{s.name}</span>
                    <span className="text-[11px] font-mono text-purple-700 block mt-1 font-semibold">
                      {s.desc}
                    </span>
                    <div className="mt-2 py-1 px-2 rounded bg-white border border-black/[0.06] font-mono text-[10px] text-slate-600">
                      {s.obj}
                    </div>
                  </div>
                  {idx < 2 && (
                    <div className="font-mono text-base font-bold text-black/30 px-1">
                      -&gt;
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                TurboFan Inline Cache: Objects with identical initialization paths share the exact same Hidden Class (Map), avoiding slow hash-table lookups.
              </span>
              <span className="font-bold text-purple-600">Monomorphic IC Hit</span>
            </div>
          </div>
        )}

        {activeId === "variables" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Stack vs Heap Allocation &amp; 31-bit Smi Pointer Tagging</span>
              <span className="font-semibold text-amber-600">V8 Memory Layout</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stack Primitive Smi */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
                <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-2">
                  Call Stack (Small Integers - Smis)
                </span>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 font-mono text-xs mb-2">
                  <div className="flex justify-between font-bold text-amber-800">
                    <span>let count = 42;</span>
                    <span>31-bit Direct Smi</span>
                  </div>
                  <div className="text-[10px] text-amber-700 mt-1">
                    Binary Tag: 00000000 00000000 00000000 0010101[0] (0 = Smi)
                  </div>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Zero heap allocation. Value stored directly inside the 64-bit register with lowest bit = 0.
                </p>
              </div>

              {/* Heap Object Pointer */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
                <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-2">
                  Heap Arena (Complex Objects)
                </span>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 font-mono text-xs mb-2">
                  <div className="flex justify-between font-bold text-blue-800">
                    <span>let user = &#123; id: 1 &#125;;</span>
                    <span>Heap Address: 0x14F8</span>
                  </div>
                  <div className="text-[10px] text-blue-700 mt-1">
                    Binary Tag: 00000000 00000000 00010100 1111100[1] (1 = Ptr)
                  </div>
                </div>
                <p className="text-[11px] text-[#52525b]">
                  Stack holds 64-bit tagged pointer referencing the object payload allocated on the V8 Heap.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                Pointer Tagging: Lowest bit distinguishes direct 31-bit Smis from 64-bit Heap addresses with zero overhead.
              </span>
              <span className="font-bold text-amber-600">Scavenger GC Semi-Space</span>
            </div>
          </div>
        )}

        {(activeId === "control-flow" ||
          activeId === "functions-scope" ||
          activeId === "arrays-iteration" ||
          activeId === "dom-apis") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>V8 Runtime Subsystem Simulation</span>
              <span className="font-semibold text-emerald-600">{activeModule.name}</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717a] block">Internal Engine Subsystem</span>
                  <span className="font-clash font-bold text-base text-[#0f172a]">{activeModule.subsystem}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-[#71717a] block">Cycle Execution Step</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">Step {step + 1}/4</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] font-mono text-xs text-[#0f172a] space-y-1">
                <div className="font-semibold text-[#0f172a]">{activeModule.mechanic}</div>
                <div className="text-[11px] text-[#71717a]">{activeModule.tagline}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>{activeModule.invariant}</span>
              <span className="font-bold text-emerald-600">Runtime Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical Telemetry Dock */}
      <div className="px-6 py-4 bg-[#fafafb] border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-[10px] text-[#71717a] uppercase block mb-0.5">V8 Subsystem</span>
          <span className="font-bold text-[#0f172a] truncate block">{activeModule.subsystem}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#71717a] uppercase block mb-0.5">Runtime Mechanic</span>
          <span className="font-bold text-[#0f172a] truncate block">{activeModule.mechanic}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#71717a] uppercase block mb-0.5">Engine Standard</span>
          <span className="font-bold text-[#0f172a]">ECMA-262 / V8 v12.4</span>
        </div>
        <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-start sm:items-end">
          <a
            href={activeModule.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black !text-white hover:bg-zinc-800 transition-colors text-xs font-clash font-semibold shadow-xs"
          >
            <span className="!text-white">Launch Deep-Dive App</span>
            <ArrowUpRight size={13} className="!text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
