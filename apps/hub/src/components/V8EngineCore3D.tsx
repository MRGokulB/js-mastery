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
  Command,
  CornerDownLeft
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
    accent: "#d97706",
    chipColor: "#fef3c7",
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
    chipColor: "#dcfce7",
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
    chipColor: "#f3e8ff",
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
    accent: "#ea580c",
    chipColor: "#ffedd5",
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
    accent: "#0891b2",
    chipColor: "#cffafe",
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

function MinimalPrismInteractive({ modId }: { modId: string }) {
  const [step, setStep] = useState(0);

  if (modId === "variables") {
    const isSmi = step % 2 === 0;
    return (
      <div className="space-y-4 font-space">
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isSmi
                ? "bg-amber-500/10 border-amber-500/40 text-amber-950 font-bold shadow-xs"
                : "bg-black/[0.02] border-black/[0.05] text-[#64748b]"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-amber-700">31-Bit Smi (Stack)</div>
            <div className="text-sm font-mono mt-1 font-bold">val: 42 (0x54)</div>
            <div className="text-[10px] text-amber-800/80 mt-1">Zero heap pointer overhead</div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              !isSmi
                ? "bg-amber-500/10 border-amber-500/40 text-amber-950 font-bold shadow-xs"
                : "bg-black/[0.02] border-black/[0.05] text-[#64748b]"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-amber-700">Heap Allocation</div>
            <div className="text-sm font-mono mt-1 font-bold">{!isSmi ? "{ id: 100, v8: true }" : "Nursery (Empty)"}</div>
            <div className="text-[10px] text-amber-800/80 mt-1">{!isSmi ? "ptr: 0x7A40_B00" : "Unallocated"}</div>
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
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
      <div className="space-y-4 font-space">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Ignition Bytecode Opcode</span>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
              {current.reg}
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-emerald-900 mt-1">{current.op}</div>
          <div className="text-[11px] text-emerald-700 mt-1">{current.desc}</div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
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
      <div className="space-y-4 font-space">
        <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-purple-700">Scope Chain Retention</span>
            <span className="text-[10px] font-bold text-purple-800">{retained ? "HEAP RETAINED" : "CLEAN STACK"}</span>
          </div>
          <div className="text-xs font-mono font-bold mt-1">
            {retained ? "Outer [[Scope]] Closure: { token: '0x99' }" : "Stack Frame Popped (Zero Heap Retention)"}
          </div>
          <div className="text-[11px] text-purple-700 mt-1">
            {retained ? "Child function retains parent lexical environment" : "Local variables collected by Scavenger GC"}
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
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
      <div className="space-y-4 font-space">
        <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-sky-700">V8 Array Elements Kind</span>
            <span className="text-[10px] font-mono text-sky-800 font-bold">
              {isPacked ? "PACKED_SMI_ELEMENTS" : "HOLEY_ELEMENTS"}
            </span>
          </div>
          <div className="text-xs font-mono font-bold mt-1">
            {isPacked ? "[ 10, 20, 30, 40 ] (Contiguous Buffer)" : "[ 10, <hole>, 30, 40 ] (Deoptimized)"}
          </div>
          <div className="text-[11px] text-sky-700 mt-1">
            {isPacked ? "O(1) Direct memory indexing" : "Prototype chain lookup triggered"}
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
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
      <div className="space-y-4 font-space">
        <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-orange-700">TurboFan Shape Transition</span>
            <span className="text-[10px] font-bold text-orange-800">{curShape.ic}</span>
          </div>
          <div className="text-xs font-mono font-bold mt-1">
            Map Transition: {curShape.name} &rarr; {curShape.props}
          </div>
          <div className="text-[11px] text-orange-700 mt-1">
            JIT stores fixed offset descriptors for high-speed field access
          </div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
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
      <div className="space-y-4 font-space">
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-rose-700">Event Loop Priority Phase</span>
            <span className="text-[10px] font-bold text-rose-800">Priority {(step % 3) + 1}</span>
          </div>
          <div className="text-xs font-mono font-bold mt-1">{curPhase.name}</div>
          <div className="text-[11px] text-rose-700 mt-1">{curPhase.queue}</div>
        </div>

        <button
          onClick={() => setStep((s) => s + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
        >
          <Play size={12} />
          <span>Advance Event Loop Phase</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-space">
      <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-950">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-cyan-700">Blink Render Engine</span>
          <span className="text-[10px] font-bold text-cyan-800">GPU Composite</span>
        </div>
        <div className="text-xs font-mono font-bold mt-1">DOM &rarr; Layout &rarr; Paint &rarr; GPU Tile</div>
        <div className="text-[11px] text-cyan-700 mt-1">V8 C++ binding bridges JavaScript objects to Blink DOM nodes</div>
      </div>

      <button
        onClick={() => setStep((s) => s + 1)}
        className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-syne font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:translate-y-0.5"
      >
        <Play size={12} />
        <span>Step Blink Compositor Quad</span>
      </button>
    </div>
  );
}

function MinimalPrismVisualizer({ modId }: { modId: string }) {
  if (modId === "variables") {
    return (
      <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/15 font-space">
        <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
          <span>V8 STACK FRAME &larr;&rarr; HEAP NURSERY</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded">31-BIT TAGGING</span>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="p-3 rounded-xl bg-white border border-black/5 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-[#64748b] uppercase block">Stack Register RSP</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900 font-mono text-xs font-bold border border-amber-200">
              0x00: 42 (0x54) [Smi]
            </div>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900 font-mono text-xs font-bold border border-amber-200">
              0x08: &rarr; 0x7A40_B00
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-black/5 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-[#64748b] uppercase block">V8 Heap Nursery</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-900 font-mono text-xs font-bold border border-purple-200">
              [Map: 0x1A] [Length: 2]
            </div>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-900 font-mono text-xs font-bold border border-purple-200">
              Elements: 0x7A40_C10
            </div>
          </div>
        </div>

        <div className="text-[11px] text-[#64748b] flex items-center justify-between">
          <span>Pointer bit-tag: lowest bit = 0 (Smi) vs 1 (HeapObj)</span>
          <span className="text-amber-700 font-bold">Scavenger GC</span>
        </div>
      </div>
    );
  }

  if (modId === "control-flow") {
    return (
      <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/15 font-space">
        <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
          <span>AST CONTROL FLOW GRAPH &amp; REGISTERS</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">IGNITION DISPATCH</span>
        </div>

        <div className="flex flex-col gap-2 my-4">
          <div className="p-2.5 rounded-xl bg-white border border-black/5 text-xs font-mono flex items-center justify-between">
            <span className="text-emerald-800 font-bold">[ENTRY] Condition (r0 &lt; 100)</span>
            <span className="text-[10px] text-emerald-600 font-semibold">&rarr; Evaluates True</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-mono flex items-center justify-between shadow-xs">
            <span className="font-bold">[BRANCH] Star r0 &rarr; Accumulator</span>
            <span className="text-[10px] text-emerald-200 font-semibold">&rarr; Active PC 0x14</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-black/5 text-xs font-mono flex items-center justify-between opacity-60">
            <span className="text-zinc-600">[FALLTHROUGH] JumpIfFalse [0x18]</span>
            <span className="text-[10px] text-zinc-400 font-semibold">&rarr; Bypass Target</span>
          </div>
        </div>

        <div className="text-[11px] text-[#64748b] flex items-center justify-between">
          <span>Direct bytecode interpretation with register caching</span>
          <span className="text-emerald-700 font-bold">Zero JIT warmup</span>
        </div>
      </div>
    );
  }

  if (modId === "functions-scope") {
    return (
      <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-purple-500/[0.04] border border-purple-500/15 font-space">
        <div className="flex items-center justify-between text-xs text-purple-900 font-bold">
          <span>LEXICAL ENVIRONMENT HIERARCHY</span>
          <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded">CLOSURE RETENTION</span>
        </div>

        <div className="my-4 space-y-2">
          <div className="p-2.5 rounded-xl bg-white border border-purple-200 text-xs font-mono flex items-center justify-between">
            <span className="text-purple-900 font-bold">Global LexicalEnv: [window, document]</span>
            <span className="text-[10px] text-purple-500">Root Scope</span>
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

        <div className="text-[11px] text-[#64748b] flex items-center justify-between">
          <span>Context allocation escapes to V8 heap on retention</span>
          <span className="text-purple-700 font-bold">Scope Chain</span>
        </div>
      </div>
    );
  }

  if (modId === "arrays-iteration") {
    return (
      <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-sky-500/[0.04] border border-sky-500/15 font-space">
        <div className="flex items-center justify-between text-xs text-sky-900 font-bold">
          <span>FAST ELEMENTS MEMORY MAP</span>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded">CONTIGUOUS BUFFER</span>
        </div>

        <div className="my-4 space-y-2.5">
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 30, 40].map((v, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-sky-600 text-white text-center font-mono font-bold text-xs shadow-xs">
                <div className="text-[8px] opacity-70">[{i}]</div>
                <div>{v}</div>
              </div>
            ))}
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-black/5 text-[11px] text-[#64748b] flex items-center justify-between">
            <span>Elements Buffer: 0x7FFF00 (Length: 4)</span>
            <span className="text-sky-700 font-bold">PACKED_SMI</span>
          </div>
        </div>

        <div className="text-[11px] text-[#64748b] flex items-center justify-between">
          <span>Direct indexing without dictionary prototype lookups</span>
          <span className="text-sky-700 font-bold">O(1) Stride</span>
        </div>
      </div>
    );
  }

  if (modId === "objects-maps") {
    return (
      <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-orange-500/[0.04] border border-orange-500/15 font-space">
        <div className="flex items-center justify-between text-xs text-orange-900 font-bold">
          <span>TURBOFAN HIDDEN CLASS TRANSITION TREE</span>
          <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded">SHAPE DESCRIPTORS</span>
        </div>

        <div className="flex items-center justify-center gap-2 my-4">
          <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center font-mono text-xs">
            <div className="text-[9px] text-[#64748b]">Shape 0</div>
            <div className="font-bold text-zinc-800">Map 0x00</div>
          </div>
          <span className="text-orange-600 font-bold">&rarr;</span>
          <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center font-mono text-xs">
            <div className="text-[9px] text-[#64748b]">Shape 1</div>
            <div className="font-bold text-zinc-800">+x (Offset 0)</div>
          </div>
          <span className="text-orange-600 font-bold">&rarr;</span>
          <div className="p-2.5 rounded-xl bg-orange-600 text-white text-center font-mono text-xs shadow-xs">
            <div className="text-[9px] text-orange-200">Shape 2</div>
            <div className="font-bold">+y (Offset 1)</div>
          </div>
        </div>

        <div className="text-[11px] text-[#64748b] flex items-center justify-between">
          <span>Inline Cache (IC) bypasses generic property search</span>
          <span className="text-orange-700 font-bold">Monomorphic IC</span>
        </div>
      </div>
    );
  }

  if (modId === "async-event-loop") {
    return (
      <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/15 font-space">
        <div className="flex items-center justify-between text-xs text-rose-900 font-bold">
          <span>EVENT LOOP CYCLE ARCHITECTURE</span>
          <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded">LIBUV DRAIN</span>
        </div>

        <div className="my-4 flex items-center justify-around">
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
          <div className="p-3 rounded-2xl bg-white border border-black/5 font-mono text-xs font-bold text-center text-zinc-700">
            <div className="text-[9px] text-[#64748b]">PHASE 3</div>
            <div>Macrotasks</div>
          </div>
        </div>

        <div className="text-[11px] text-[#64748b] flex items-center justify-between">
          <span>Microtasks (Promise) drain before next macrotask (Timer)</span>
          <span className="text-rose-700 font-bold">Strict Priority</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/15 font-space">
      <div className="flex items-center justify-between text-xs text-cyan-900 font-bold">
        <span>BLINK DOM ENGINE PIPELINE</span>
        <span className="text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">HARDWARE ACCEL</span>
      </div>

      <div className="my-4 grid grid-cols-4 gap-2 text-center font-mono text-xs">
        <div className="p-2 rounded-xl bg-white border border-black/5">DOM</div>
        <div className="p-2 rounded-xl bg-white border border-black/5">Style</div>
        <div className="p-2 rounded-xl bg-white border border-black/5">Layout</div>
        <div className="p-2 rounded-xl bg-cyan-600 text-white font-bold shadow-xs">Paint</div>
      </div>

      <div className="text-[11px] text-[#64748b] flex items-center justify-between">
        <span>C++ wrapper objects synchronise with V8 garbage collection</span>
        <span className="text-cyan-700 font-bold">Blink Compositor</span>
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
    <div className="w-full flex flex-col gap-6 select-none">
      <div className="w-full minimal-prism rounded-[32px] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-black/[0.06] mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-syne font-bold text-sm shadow-2xs"
              style={{ backgroundColor: activeModule.chipColor, color: activeModule.accent }}
            >
              <IconComp size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-space uppercase tracking-widest text-[#64748b] font-bold">
                  V8 RUNTIME PRISM // 0{activeIdx + 1}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeModule.accent }}
                />
              </div>
              <h2 className="text-xl font-syne font-bold text-[#0f172a]">{activeModule.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-space text-[#64748b] hidden sm:inline">Navigate:</span>
            <button
              onClick={() => {
                const prev = (activeIdx - 1 + V8_MODULE_SYSTEMS.length) % V8_MODULE_SYSTEMS.length;
                onSelectModule(V8_MODULE_SYSTEMS[prev].id);
              }}
              className="w-8 h-8 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#0f172a] hover:bg-black hover:text-white transition-colors cursor-pointer shadow-2xs"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => {
                const next = (activeIdx + 1) % V8_MODULE_SYSTEMS.length;
                onSelectModule(V8_MODULE_SYSTEMS[next].id);
              }}
              className="w-8 h-8 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#0f172a] hover:bg-black hover:text-white transition-colors cursor-pointer shadow-2xs"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-space font-bold uppercase bg-amber-500/10 text-amber-900 border border-amber-500/20">
                  {activeModule.category} Subsystem
                </span>
                <span className="text-[11px] font-space text-[#64748b]">
                  {activeModule.subsystem}
                </span>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed mb-5">
                {activeModule.tagline}. Inspect real V8 heap structures, opcode dispatches, and memory allocation transitions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-black/[0.06] shadow-2xs">
              <span className="text-[10px] font-space uppercase tracking-widest text-[#64748b] block mb-3 font-bold">
                INTERACTIVE STEPPER SANDBOX
              </span>
              <MinimalPrismInteractive modId={activeId} />
            </div>
          </div>

          <div className="lg:col-span-6 h-[290px]">
            <MinimalPrismVisualizer modId={activeId} />
          </div>
        </div>

        <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-space text-xs text-[#0f172a] bg-white px-3.5 py-2 rounded-xl border border-black/[0.06] shadow-2xs">
            <span className="text-[10px] text-[#64748b] font-bold">GLYPH SPEC:</span>
            <span className="font-mono text-amber-700 font-bold">{activeModule.glyph}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-space text-[#64748b]">
              <span className="px-1.5 py-0.5 rounded bg-black/[0.04] font-mono text-[10px]">1-7</span>
              <span>keys to jump</span>
            </div>

            <a
              href={activeModule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-black !text-white font-syne font-bold text-xs flex items-center gap-2 transition-all shadow-xs active:translate-y-0.5 cursor-pointer"
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
