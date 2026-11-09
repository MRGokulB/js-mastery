"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Boxes,
  Workflow,
  Cpu,
  Layers,
  Timer,
  Layout,
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
  specSection: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    category: "Memory",
    subsystem: "V8 Scavenger GC & Memory Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#d97706",
    mechanic: "Contiguous Stack / Dynamic Heap Pointers",
    specSection: "ECMA-262 §6.2 (Data Types and Values)"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    category: "Interpreter",
    subsystem: "Ignition Bytecode Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#059669",
    mechanic: "Conditional Branch Jump Offset Registers",
    specSection: "ECMA-262 §14.5 (Conditional Execution)"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    category: "Scope",
    subsystem: "Context Resolver & Activation Records",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#7c3aed",
    mechanic: "Context Stack Linked Lexical Environment",
    specSection: "ECMA-262 §9.1 (Environment Records)"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    category: "Elements",
    subsystem: "V8 Elements Transition Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    mechanic: "Fast Contiguous Indexed Int32 Buffer",
    specSection: "ECMA-262 §10.4.2 (Array Exotic Objects)"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    category: "Compiler",
    subsystem: "TurboFan JIT Type Feedback Vector",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#c026d3",
    mechanic: "Shape Transition Tree & Property Offsets",
    specSection: "ECMA-262 §10.1 (Ordinary Object Internal Methods)"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    category: "Async",
    subsystem: "Libuv & Browser Event Loop Ring",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    mechanic: "Dual Priority Queue Scheduler (Microtask P0 / Timer P1)",
    specSection: "HTML Living Standard §8.1.6 (Event Loops)"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    category: "Rendering",
    subsystem: "Blink Layout & GPU Compositor",
    tagline: "Critical rendering path and GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#0891b2",
    mechanic: "Render Tree & Paint Layer Compositor",
    specSection: "W3C CSSOM View §12 (Geometry and Coordinates)"
  }
];

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8RuntimeEngineChamber({ activeId }: Props) {
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

  const activeModule = V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];

  return (
    <div className="w-full rounded-[28px] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
      {/* Top Architecture Telemetry Header */}
      <div className="px-6 py-4 border-b border-black/[0.06] bg-[#fafafb] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: activeModule.accent }}
          />
          <span className="font-clash font-semibold text-[#0f172a] uppercase tracking-wide">
            {activeModule.name}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/[0.04] text-[#52525b] border border-black/[0.04]">
            {activeModule.subsystem}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <Play size={11} className={isPlaying ? "text-amber-500 fill-amber-500" : ""} />
            <span>{isPlaying ? "Pause Cycle" : "Auto Cycle"}</span>
          </button>

          <button
            onClick={() => setStep((prev) => (prev + 1) % 4)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <span>Cycle {step + 1}/4</span>
            <ArrowRight size={12} />
          </button>

          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
            title="Reset engine cycle"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Central Visual V8 Engine Viewport */}
      <div className="p-8 min-h-[380px] sm:min-h-[420px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#fafafb]">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#000000 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px"
          }}
        />

        <AnimatePresence mode="wait">
          {activeId === "variables" && (
            <motion.div
              key="variables"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>STACK FRAMES (SMIS) vs HEAP ARENA (OBJECTS)</span>
                <span>31-BIT IMMEDIATE TAGGED POINTERS</span>
              </div>

              {/* Stack vs Heap dual pane */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">
                      CALL STACK (RSP)
                    </span>
                    <span className="text-[9px] font-mono text-[#71717a]">Fast Primitive</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between font-mono text-xs">
                      <span>let count = 42</span>
                      <span className="text-[10px] font-bold text-amber-700">Smi (Tag 0)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-black/[0.08] flex items-center justify-between font-mono text-xs">
                      <span>let userPtr</span>
                      <span className="text-[10px] font-bold text-blue-600">➔ 0xHeapA24</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                      V8 HEAP ARENA
                    </span>
                    <span className="text-[9px] font-mono text-[#71717a]">Young Gen (Nursery)</span>
                  </div>

                  <div className="space-y-2">
                    <motion.div
                      animate={{ scale: step % 2 === 1 ? 1.03 : 1 }}
                      className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col font-mono text-xs"
                    >
                      <span className="text-[10px] text-[#71717a]">@0xHeapA24 [Object]</span>
                      <span className="font-bold text-blue-900">{"{ id: 1, role: 'admin' }"}</span>
                    </motion.div>

                    <div className="p-2 rounded-lg bg-[#f8f9fa] text-[10px] font-mono text-[#71717a] flex items-center justify-between">
                      <span>Scavenger Semi-Space:</span>
                      <span className="text-emerald-700 font-bold">From-Space Clean</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">POINTER TAGGING SCHEME</span>
                  <span className="text-[#0f172a] font-semibold">
                    LSB = 0: 31-bit Smi integer &middot; LSB = 1: Heap Object Pointer
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">GARBAGE COLLECTOR</span>
                  <span className="text-amber-700 font-semibold">Cheney Copying Algorithm</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "control-flow" && (
            <motion.div
              key="control-flow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>IGNITION BYTECODE INTERPRETER</span>
                <span>ACCUMULATOR REGISTER ARCHITECTURE</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs space-y-2 font-mono text-xs">
                {[
                  { op: "LdaNamedProperty [0]", reg: "r0 ➔ user.isAdmin", cycle: 0 },
                  { op: "TestTruthy", reg: "Accumulator = true", cycle: 1 },
                  { op: "JumpIfFalse [offset +16]", reg: "Branch taken: NO", cycle: 2 },
                  { op: "CallRuntime [ExecuteAuth]", reg: "Bailout: 0 bytes", cycle: 3 }
                ].map((instr, idx) => (
                  <motion.div
                    key={instr.op}
                    animate={{
                      backgroundColor: step === idx ? "#ecfdf5" : "#ffffff",
                      borderColor: step === idx ? "#10b981" : "rgba(0,0,0,0.06)",
                      scale: step === idx ? 1.02 : 1
                    }}
                    className="p-3 rounded-xl border flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-[#71717a]">
                        [{idx}]
                      </span>
                      <span className="font-semibold text-[#0f172a]">{instr.op}</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {instr.reg}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">BYTECODE DISPATCH PIPELINE</span>
                  <span className="text-[#0f172a] font-semibold">
                    Direct Threaded Code (Handler Table Lookup per Opcode)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">TIER-UP THRESHOLD</span>
                  <span className="text-emerald-700 font-semibold">TurboFan Hot: 1024 calls</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "functions-scope" && (
            <motion.div
              key="functions-scope"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>LEXICAL ENVIRONMENT &amp; HEAP CLOSURES</span>
                <span>PERSISTENT OUTER CONTEXT CHAINS</span>
              </div>

              <div className="flex items-center justify-center gap-3 py-2">
                {[
                  { scope: "Global Scope", vars: "apiKey, config", bg: "#f5f3ff", border: "#ddd6fe" },
                  { scope: "createCounter()", vars: "let count = 0 (Heap Retained)", bg: "#ede9fe", border: "#c4b5fd" },
                  { scope: "increment() [Closure]", vars: "return ++count", bg: "#7c3aed", border: "#6d28d9", dark: true }
                ].map((s, idx) => (
                  <div key={s.scope} className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: step === idx ? 1.05 : 1 }}
                      className={`p-4 rounded-2xl border shadow-xs flex flex-col gap-1.5 w-44 ${
                        s.dark ? "bg-purple-700 text-white" : ""
                      }`}
                      style={{ backgroundColor: s.dark ? undefined : s.bg, borderColor: s.border }}
                    >
                      <span className={`text-[10px] font-mono font-bold ${s.dark ? "text-purple-200" : "text-[#71717a]"}`}>
                        {s.scope}
                      </span>
                      <span className="font-mono text-xs font-semibold">
                        {s.vars}
                      </span>
                    </motion.div>
                    {idx < 2 && <span className="font-mono text-purple-600 font-bold">➔</span>}
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">HEAP CONTEXT ESCAPE</span>
                  <span className="text-[#0f172a] font-semibold">
                    Variable escaped stack frame ➔ Promoted to Heap Context object
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">THIS BINDING</span>
                  <span className="text-purple-700 font-semibold">Lexical (Arrow) / Dynamic</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "arrays-iteration" && (
            <motion.div
              key="arrays-iteration"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>V8 ELEMENTS TRANSITION TABLE</span>
                <span>PACKED_SMI ➔ HOLEY_ELEMENTS DEGRADATION</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { kind: "PACKED_SMI", speed: "Fastest (Direct C++ Array)", color: "#eff6ff", text: "#1d4ed8" },
                  { kind: "PACKED_DOUBLE", speed: "Fast (64-bit float buffer)", color: "#f0fdf4", text: "#15803d" },
                  { kind: "HOLEY_ELEMENTS", speed: "Slow (Prototype Lookup)", color: "#fef2f2", text: "#b91c1c" }
                ].map((tier, idx) => (
                  <motion.div
                    key={tier.kind}
                    animate={{
                      scale: step % 3 === idx ? 1.04 : 1,
                      borderColor: step % 3 === idx ? tier.text : "rgba(0,0,0,0.08)"
                    }}
                    className="p-4 rounded-2xl border shadow-xs flex flex-col justify-between min-h-[110px]"
                    style={{ backgroundColor: tier.color }}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold block" style={{ color: tier.text }}>
                        {tier.kind}
                      </span>
                      <span className="text-xs font-semibold text-[#0f172a] mt-1 block">
                        {tier.speed}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#71717a]">
                      V8 internal tag: 0x0{idx + 1}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">DE-OPTIMIZATION HAZARD</span>
                  <span className="text-[#0f172a] font-semibold">
                    delete arr[i] causes transition to HOLEY elements (irreversible)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">CAPACITY STRATEGY</span>
                  <span className="text-blue-700 font-semibold">Amortized Doubling: 1.5x</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "objects-maps" && (
            <motion.div
              key="objects-maps"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>V8 HIDDEN CLASSES (SHAPES) &amp; INLINE CACHING</span>
                <span>MONOMORPHIC TRANSITION TREES</span>
              </div>

              <div className="flex items-center justify-between gap-3 py-2">
                {[
                  { shape: "Shape #0", prop: "{ } (Initial)", offset: "Offset: null" },
                  { shape: "Shape #1", prop: "+ x (Number)", offset: "Offset: 0x18" },
                  { shape: "Shape #2", prop: "+ y (Number)", offset: "Offset: 0x20" }
                ].map((s, idx) => (
                  <div key={s.shape} className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        borderColor: step >= idx ? "#c026d3" : "rgba(0,0,0,0.08)",
                        backgroundColor: step >= idx ? "#fdf4ff" : "#ffffff",
                        scale: step >= idx ? 1.03 : 1
                      }}
                      className="p-4 rounded-2xl border shadow-xs w-36 flex flex-col gap-1 text-center"
                    >
                      <span className="text-[10px] font-mono font-bold text-fuchsia-700">
                        {s.shape}
                      </span>
                      <span className="font-clash font-bold text-sm text-[#0f172a]">
                        {s.prop}
                      </span>
                      <span className="text-[9px] font-mono text-[#71717a]">
                        {s.offset}
                      </span>
                    </motion.div>
                    {idx < 2 && <span className="font-mono text-fuchsia-600 font-bold">➔</span>}
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">INLINE CACHE STATUS</span>
                  <span className="text-[#0f172a] font-semibold">
                    Monomorphic (1 Shape seen) ➔ TurboFan JIT direct memory offset load
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">POLYMORPHIC LIMIT</span>
                  <span className="text-fuchsia-700 font-semibold">Max 4 Shapes before Megamorphic</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "async-event-loop" && (
            <motion.div
              key="async-event-loop"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>LIBUV / BROWSER EVENT LOOP CYCLE</span>
                <span>MICROTASKS DRAIN STRICTLY BEFORE TIMERS</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[120px]">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-600 uppercase block">
                      CALL STACK
                    </span>
                    <span className="text-xs font-semibold text-[#0f172a] mt-1 block">
                      Sync Execution
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">
                    Running Task
                  </span>
                </div>

                <motion.div
                  animate={{
                    borderColor: step === 1 ? "#e11d48" : "rgba(0,0,0,0.08)",
                    backgroundColor: step === 1 ? "#fff1f2" : "#ffffff"
                  }}
                  className="p-4 rounded-2xl border shadow-xs flex flex-col justify-between min-h-[120px]"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-600 uppercase block">
                      MICROTASK QUEUE
                    </span>
                    <span className="text-xs font-semibold text-[#0f172a] mt-1 block">
                      Promise.then()
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-rose-700 font-bold">
                    Priority P0 (Drain All)
                  </span>
                </motion.div>

                <motion.div
                  animate={{
                    borderColor: step === 2 ? "#e11d48" : "rgba(0,0,0,0.08)",
                    backgroundColor: step === 2 ? "#fff1f2" : "#ffffff"
                  }}
                  className="p-4 rounded-2xl border shadow-xs flex flex-col justify-between min-h-[120px]"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-600 uppercase block">
                      MACROTASK QUEUE
                    </span>
                    <span className="text-xs font-semibold text-[#0f172a] mt-1 block">
                      setTimeout / I/O
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#71717a] font-bold">
                    Priority P1 (One per loop)
                  </span>
                </motion.div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">EVENT LOOP INVARIANT</span>
                  <span className="text-[#0f172a] font-semibold">
                    Microtask checkpoint drains COMPLETELY after every stack unwind
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">FRAME BUDGET</span>
                  <span className="text-rose-700 font-semibold">16.67ms (60 FPS)</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "dom-apis" && (
            <motion.div
              key="dom-apis"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>CRITICAL RENDERING PATH &middot; BLINK / GPU</span>
                <span>LAYOUT REFLOW ➔ PAINT ➔ COMPOSITING</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { step: "DOM + CSSOM", label: "Parse HTML/CSS", cost: "Low" },
                  { step: "Render Tree", label: "Visible Nodes", cost: "Low" },
                  { step: "Layout Reflow", label: "Box Geometry", cost: "High (CPU)" },
                  { step: "GPU Composite", label: "Draw Layers", cost: "Fast (GPU)" }
                ].map((phase, idx) => (
                  <motion.div
                    key={phase.step}
                    animate={{
                      scale: step === idx ? 1.04 : 1,
                      backgroundColor: step === idx ? "#ecfeff" : "#ffffff",
                      borderColor: step === idx ? "#06b6d4" : "rgba(0,0,0,0.08)"
                    }}
                    className="p-3 rounded-2xl border shadow-xs flex flex-col justify-between min-h-[105px]"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-700 block">
                        Phase {idx + 1}
                      </span>
                      <span className="font-clash font-bold text-xs text-[#0f172a] mt-1 block">
                        {phase.step}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#71717a]">
                      {phase.cost}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">REFLOW PREVENTION</span>
                  <span className="text-[#0f172a] font-semibold">
                    Use transform &amp; opacity to bypass Layout/Paint straight to GPU Compositor
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">COMPOSITING LAYERS</span>
                  <span className="text-cyan-700 font-semibold">will-change: transform</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-6 py-3.5 border-t border-black/[0.06] bg-[#fafafb] flex items-center justify-between text-[11px] font-mono text-[#71717a]">
        <span>V8 RUNTIME ENGINE CHANCELLERY &middot; EXECUTION TRACE</span>
        <span>{activeModule.specSection}</span>
      </div>
    </div>
  );
}
