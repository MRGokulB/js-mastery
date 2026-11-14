"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  CheckCircle2,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2
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
  mechanic: string;
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
    accent: "#4f46e5",
    chipColor: "#e0e7ff",
    mechanic: "Contiguous Stack / Dynamic Heap Pointer",
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
    mechanic: "Conditional Branch Jump Offset Registers",
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
    mechanic: "Context Stack Linked Lexical Environment",
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
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer",
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
    accent: "#d97706",
    chipColor: "#fef3c7",
    mechanic: "Transition Tree & Field Index Descriptors",
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
    mechanic: "Microtask Queue -> Macrotask Timer Loop",
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
    mechanic: "V8 C++ Wrapper Handle & Compositor Tree",
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

function LiveInteractiveSandbox({ modId }: { modId: string }) {
  const [step, setStep] = useState(0);

  if (modId === "variables") {
    const isSmi = step % 2 === 0;
    return (
      <div className="space-y-3 font-space">
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className={`p-3 rounded-xl border transition-all ${
              isSmi
                ? "bg-indigo-50 border-indigo-200 text-indigo-950 font-bold shadow-xs"
                : "bg-white border-slate-200 text-slate-500"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-indigo-700">31-Bit Smi (Stack)</div>
            <div className="text-xs font-mono font-bold mt-1">val: 42 (0x54)</div>
            <div className="text-[10px] text-indigo-800/80 mt-0.5">Tagged: (42 &lt;&lt; 1) | 0</div>
          </div>

          <div
            className={`p-3 rounded-xl border transition-all ${
              !isSmi
                ? "bg-indigo-50 border-indigo-200 text-indigo-950 font-bold shadow-xs"
                : "bg-white border-slate-200 text-slate-500"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-indigo-700">Heap Allocation</div>
            <div className="text-xs font-mono font-bold mt-1">{!isSmi ? "{ id: 100, v8: true }" : "Nursery (Empty)"}</div>
            <div className="text-[10px] text-indigo-800/80 mt-0.5">{!isSmi ? "ptr: 0x7A40_B00" : "Unallocated"}</div>
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>{isSmi ? "Promote Smi to Heap Object" : "Compact Heap to 31-bit Smi"}</span>
        </button>
      </div>
    );
  }

  if (modId === "control-flow") {
    const ops = [
      { op: "LdaNamedProperty a0, [0]", reg: "a0: [Object]", desc: "Load property to accumulator" },
      { op: "Star r0", reg: "r0: [Accumulator]", desc: "Store accumulator in register r0" },
      { op: "TestLessThan r0, [100]", reg: "flags: [TRUE]", desc: "Evaluate truthy condition" },
      { op: "JumpIfFalse [0x18]", reg: "PC: [0x18]", desc: "Branch offset execution jump" }
    ];
    const current = ops[step % ops.length];

    return (
      <div className="space-y-3 font-space">
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Ignition Bytecode Opcode</span>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
              {current.reg}
            </span>
          </div>
          <div className="text-xs font-mono font-bold text-emerald-900 mt-0.5">{current.op}</div>
          <div className="text-[10.5px] text-emerald-700 mt-0.5">{current.desc}</div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>Step Ignition Register [ {(step % ops.length) + 1} / 4 ]</span>
        </button>
      </div>
    );
  }

  if (modId === "functions-scope") {
    const retained = step % 2 === 1;
    return (
      <div className="space-y-3 font-space">
        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-purple-700">Scope Chain Retention</span>
            <span className="text-[10px] font-bold text-purple-800">{retained ? "HEAP RETAINED" : "CLEAN STACK"}</span>
          </div>
          <div className="text-xs font-mono font-bold mt-0.5">
            {retained ? "Outer [[Scope]] Closure: { token: '0x99' }" : "Stack Frame Popped (Clean)"}
          </div>
          <div className="text-[10.5px] text-purple-700 mt-0.5">
            {retained ? "Child function retains parent lexical environment" : "Local variables collected by Scavenger GC"}
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>{retained ? "Release Lexical Closure" : "Retain Closure on V8 Heap"}</span>
        </button>
      </div>
    );
  }

  if (modId === "arrays-iteration") {
    const isPacked = step % 2 === 0;
    return (
      <div className="space-y-3 font-space">
        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-sky-700">V8 Array Elements Kind</span>
            <span className="text-[10px] font-mono text-sky-800 font-bold">
              {isPacked ? "PACKED_SMI_ELEMENTS" : "HOLEY_ELEMENTS"}
            </span>
          </div>
          <div className="text-xs font-mono font-bold mt-0.5">
            {isPacked ? "[ 10, 20, 30, 40 ] (Contiguous Buffer)" : "[ 10, <hole>, 30, 40 ] (Deoptimized)"}
          </div>
          <div className="text-[10.5px] text-sky-700 mt-0.5">
            {isPacked ? "O(1) Direct memory indexing" : "Prototype chain lookup triggered"}
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>{isPacked ? "Delete Element (Trigger Holey Deopt)" : "Normalize Array (Packed Smi)"}</span>
        </button>
      </div>
    );
  }

  if (modId === "objects-maps") {
    const shapes = [
      { name: "Shape 0", props: "{}", ic: "Monomorphic" },
      { name: "Shape 1", props: "{ x: 10 }", ic: "Inline Cache (Offset 0)" },
      { name: "Shape 2", props: "{ x: 10, y: 20 }", ic: "Inline Cache (Offset 1)" }
    ];
    const curShape = shapes[step % shapes.length];

    return (
      <div className="space-y-3 font-space">
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-amber-700">TurboFan Shape Transition</span>
            <span className="text-[10px] font-bold text-amber-800">{curShape.ic}</span>
          </div>
          <div className="text-xs font-mono font-bold mt-0.5">
            Map Transition: {curShape.name} &rarr; {curShape.props}
          </div>
          <div className="text-[10.5px] text-amber-700 mt-0.5">
            JIT stores fixed offset descriptors for high-speed field access
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>Transition Object Shape [ {(step % 3) + 1} / 3 ]</span>
        </button>
      </div>
    );
  }

  if (modId === "async-event-loop") {
    const phases = [
      { name: "Call Stack (Synchronous)", queue: "Drain main thread execution" },
      { name: "Microtask Queue (Promise.then)", queue: "Must drain completely before render" },
      { name: "Macrotask Queue (setTimeout)", queue: "Scheduled on next event loop tick" }
    ];
    const curPhase = phases[step % phases.length];

    return (
      <div className="space-y-3 font-space">
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-rose-700">Event Loop Priority Phase</span>
            <span className="text-[10px] font-bold text-rose-800">Priority {(step % 3) + 1}</span>
          </div>
          <div className="text-xs font-mono font-bold mt-0.5">{curPhase.name}</div>
          <div className="text-[10.5px] text-rose-700 mt-0.5">{curPhase.queue}</div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>Advance Event Loop Phase</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-space">
      <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-teal-700">Blink Render Engine</span>
          <span className="text-[10px] font-bold text-teal-800">GPU Composite</span>
        </div>
        <div className="text-xs font-mono font-bold mt-0.5">DOM &rarr; Layout &rarr; Paint &rarr; GPU Tile</div>
        <div className="text-[10.5px] text-teal-700 mt-0.5">V8 C++ binding bridges JavaScript objects to Blink DOM nodes</div>
      </div>

      <button
        onClick={() => setStep((s) => s + 1)}
        className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:translate-y-0.5"
      >
        <Play size={12} />
        <span>Step Blink Compositor Quad</span>
      </button>
    </div>
  );
}

function LiveMemoryArchitectureLens({ modId }: { modId: string }) {
  if (modId === "variables") {
    return (
      <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
        <div className="flex items-center justify-between text-xs text-indigo-900 font-bold">
          <span>V8 STACK FRAME &larr;&rarr; HEAP ALLOCATION</span>
          <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">31-BIT TAG</span>
        </div>

        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Stack Frame (RSP)</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900 font-mono text-xs font-bold border border-indigo-200">
              0x00: 42 (0x54) [Smi]
            </div>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900 font-mono text-xs font-bold border border-indigo-200">
              0x08: &rarr; 0x7A40_B00
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">V8 Heap Nursery</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-900 font-mono text-xs font-bold border border-purple-200">
              [Map: 0x1A] [Len: 2]
            </div>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-900 font-mono text-xs font-bold border border-purple-200">
              Elements: 0x7A40_C10
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center justify-between">
          <span>Bit-tagging: LSB=0 (31-bit Smi) vs LSB=1 (Heap Pointer)</span>
          <span className="text-indigo-700 font-bold">Scavenger GC</span>
        </div>
      </div>
    );
  }

  if (modId === "control-flow") {
    return (
      <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
        <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
          <span>AST CONTROL FLOW &amp; REGISTER PIPELINE</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">IGNITION JIT</span>
        </div>

        <div className="flex flex-col gap-2 my-3">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono flex items-center justify-between">
            <span className="text-emerald-800 font-bold">[ENTRY] Condition (r0 &lt; 100)</span>
            <span className="text-[10px] text-emerald-600 font-semibold">&rarr; True Branch</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-mono flex items-center justify-between shadow-xs">
            <span className="font-bold">[BRANCH] Star r0 &rarr; Accumulator</span>
            <span className="text-[10px] text-emerald-200 font-semibold">&rarr; Active PC 0x14</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono flex items-center justify-between opacity-50">
            <span className="text-slate-600">[FALLTHROUGH] JumpIfFalse [0x18]</span>
            <span className="text-[10px] text-slate-400 font-semibold">&rarr; Bypass Target</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center justify-between">
          <span>Direct bytecode interpretation with register caching</span>
          <span className="text-emerald-700 font-bold">Zero JIT warmup</span>
        </div>
      </div>
    );
  }

  if (modId === "functions-scope") {
    return (
      <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
        <div className="flex items-center justify-between text-xs text-purple-900 font-bold">
          <span>LEXICAL ENVIRONMENT RESOLUTION</span>
          <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">CLOSURE SCOPE</span>
        </div>

        <div className="my-3 space-y-2">
          <div className="p-2.5 rounded-xl bg-white border border-purple-200 text-xs font-mono flex items-center justify-between">
            <span className="text-purple-900 font-bold">Global LexicalEnv: [window, document]</span>
            <span className="text-[10px] text-purple-600">Root Scope</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-300 text-xs font-mono flex items-center justify-between ml-4">
            <span className="text-purple-900 font-bold">&uarr; Outer Fn LexicalEnv: [token, auth]</span>
            <span className="text-[10px] text-purple-700 font-bold">Heap Retained</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-600 text-white text-xs font-mono flex items-center justify-between ml-8 shadow-xs">
            <span className="font-bold">&uarr; Inner Fn LexicalEnv: [data]</span>
            <span className="text-[10px] text-purple-200">Active [[Scope]]</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center justify-between">
          <span>Context allocation escapes to V8 heap on retention</span>
          <span className="text-purple-700 font-bold">Scope Chain</span>
        </div>
      </div>
    );
  }

  if (modId === "arrays-iteration") {
    return (
      <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
        <div className="flex items-center justify-between text-xs text-sky-900 font-bold">
          <span>FAST ELEMENTS CONTIGUOUS BUFFER</span>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">O(1) STRIDE</span>
        </div>

        <div className="my-3 space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 30, 40].map((v, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-sky-600 text-white text-center font-mono font-bold text-xs shadow-xs">
                <div className="text-[8px] opacity-70">[{i}]</div>
                <div>{v}</div>
              </div>
            ))}
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Elements Buffer: 0x7FFF00 (Length: 4)</span>
            <span className="text-sky-700 font-bold">PACKED_SMI</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center justify-between">
          <span>Direct indexing without dictionary prototype lookups</span>
          <span className="text-sky-700 font-bold">Fast Elements</span>
        </div>
      </div>
    );
  }

  if (modId === "objects-maps") {
    return (
      <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
        <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
          <span>TURBOFAN HIDDEN CLASS MAP TRANSITION</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">INLINE CACHE</span>
        </div>

        <div className="flex items-center justify-center gap-2 my-3">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center font-mono text-xs">
            <div className="text-[9px] text-slate-500">Shape 0</div>
            <div className="font-bold text-slate-800">Map 0x00</div>
          </div>
          <span className="text-amber-600 font-bold">&rarr;</span>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center font-mono text-xs">
            <div className="text-[9px] text-slate-500">Shape 1</div>
            <div className="font-bold text-slate-800">+x (Offset 0)</div>
          </div>
          <span className="text-amber-600 font-bold">&rarr;</span>
          <div className="p-2.5 rounded-xl bg-amber-600 text-white text-center font-mono text-xs shadow-xs">
            <div className="text-[9px] text-amber-200">Shape 2</div>
            <div className="font-bold">+y (Offset 1)</div>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center justify-between">
          <span>Inline Cache (IC) bypasses generic property search</span>
          <span className="text-amber-700 font-bold">Monomorphic IC</span>
        </div>
      </div>
    );
  }

  if (modId === "async-event-loop") {
    return (
      <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
        <div className="flex items-center justify-between text-xs text-rose-900 font-bold">
          <span>LIBUV EVENT LOOP CONCURRENCY WHEEL</span>
          <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">PRIORITY QUEUE</span>
        </div>

        <div className="my-3 flex items-center justify-around">
          <div className="p-3 rounded-2xl bg-rose-600 text-white font-mono text-xs font-bold text-center shadow-xs">
            <div className="text-[9px] text-rose-200">PHASE 1</div>
            <div>Call Stack</div>
          </div>
          <span className="text-rose-600 font-bold">&rarr;</span>
          <div className="p-3 rounded-2xl bg-white border border-rose-200 font-mono text-xs font-bold text-center text-rose-900">
            <div className="text-[9px] text-rose-500">PHASE 2</div>
            <div>Microtasks</div>
          </div>
          <span className="text-rose-600 font-bold">&rarr;</span>
          <div className="p-3 rounded-2xl bg-white border border-slate-200 font-mono text-xs font-bold text-center text-slate-700">
            <div className="text-[9px] text-slate-500">PHASE 3</div>
            <div>Macrotasks</div>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center justify-between">
          <span>Microtasks (Promise) drain before next macrotask (Timer)</span>
          <span className="text-rose-700 font-bold">Strict Priority</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 font-space">
      <div className="flex items-center justify-between text-xs text-teal-900 font-bold">
        <span>BLINK DOM ENGINE COMPOSITING PIPELINE</span>
        <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">HARDWARE ACCEL</span>
      </div>

      <div className="my-3 grid grid-cols-4 gap-2 text-center font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-white border border-slate-200">DOM</div>
        <div className="p-2.5 rounded-xl bg-white border border-slate-200">Style</div>
        <div className="p-2.5 rounded-xl bg-white border border-slate-200">Layout</div>
        <div className="p-2.5 rounded-xl bg-teal-600 text-white font-bold shadow-xs">Paint</div>
      </div>

      <div className="text-[11px] text-slate-600 flex items-center justify-between">
        <span>C++ wrapper objects synchronise with V8 garbage collection</span>
        <span className="text-teal-700 font-bold">Blink Compositor</span>
      </div>
    </div>
  );
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, onSelectModule }: Props) {
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
      <div className="w-full minimal-prism rounded-[28px] p-6 lg:p-8 flex flex-col justify-between h-full shadow-lg">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/80 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-syne font-bold text-sm shadow-xs"
                style={{ backgroundColor: activeModule.chipColor, color: activeModule.accent }}
              >
                <IconComp size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-space uppercase tracking-widest text-slate-500 font-bold">
                    V8 RUNTIME WORKBENCH // 0{activeIdx + 1}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeModule.accent }}
                  />
                </div>
                <h2 className="text-xl font-syne font-bold text-slate-900">{activeModule.name}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-space text-slate-500 hidden sm:inline">Navigate:</span>
              <button
                onClick={() => {
                  const prev = (activeIdx - 1 + V8_MODULE_SYSTEMS.length) % V8_MODULE_SYSTEMS.length;
                  onSelectModule(V8_MODULE_SYSTEMS[prev].id);
                }}
                className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer shadow-2xs"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => {
                  const next = (activeIdx + 1) % V8_MODULE_SYSTEMS.length;
                  onSelectModule(V8_MODULE_SYSTEMS[next].id);
                }}
                className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer shadow-2xs"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-space font-bold uppercase bg-indigo-50 text-indigo-900 border border-indigo-200">
                    {activeModule.category} Subsystem
                  </span>
                  <span className="text-[11px] font-space text-slate-500">
                    {activeModule.subsystem}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {activeModule.tagline}. Inspect real V8 heap structures, opcode dispatches, and memory allocation transitions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-space uppercase tracking-widest text-slate-500 block mb-2.5 font-bold">
                  INTERACTIVE STEPPER SANDBOX
                </span>
                <LiveInteractiveSandbox modId={activeId} />
              </div>
            </div>

            <div className="lg:col-span-6 h-[260px]">
              <LiveMemoryArchitectureLens modId={activeId} />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-space text-xs text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-bold">GLYPH SPEC:</span>
            <span className="font-mono text-indigo-700 font-bold">{activeModule.glyph}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-space text-slate-500">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px]">1-7</span>
              <span>keys to jump</span>
            </div>

            <a
              href={activeModule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black !text-white font-syne font-bold text-xs flex items-center gap-2 transition-all shadow-xs active:translate-y-0.5 cursor-pointer"
            >
              <span className="!text-white font-bold">Launch {activeModule.shortTitle}</span>
              <ArrowUpRight size={14} className="!text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
