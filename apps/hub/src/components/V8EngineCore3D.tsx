"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Workflow,
  Code2,
  Cpu,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  Database,
  Eye,
  GitBranch,
  Timer
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
    glyph: "Smi: (val << 1) | 0 · Heap 0x"
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
    subsystem: "TurboFan IC Shapes",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#c026d3",
    chipColor: "#fce7f3",
    mechanic: "Shape Transition Tree & Property Offset Table",
    glyph: "Map0 -> Map1(+x) -> Map2(+y)"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    shortTitle: "ASYNC",
    category: "Async",
    subsystem: "Libuv / Task Queue",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    chipColor: "#ffe4e6",
    mechanic: "Dual Priority Queue Scheduler (P0 / P1)",
    glyph: "Stack -> Microtasks -> Timers"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    shortTitle: "DOM",
    category: "Rendering",
    subsystem: "Blink Compositor",
    tagline: "Critical rendering path and GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#0891b2",
    chipColor: "#cffafe",
    mechanic: "Render Tree & Paint Layer Tree Compositor",
    glyph: "DOM + CSSOM -> Paint -> GPU"
  }
];

function VariablesInteractiveWidget() {
  const [val, setVal] = useState(42);
  const [heapAllocated, setHeapAllocated] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                CALL STACK (RSP)
              </span>
              <span className="text-[10px] text-[#94a3b8]">0x7FFE_4A80</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded-xl bg-[#f8f9fc] border border-black/[0.04] flex items-center justify-between">
                <span className="text-[#64748b]">let count:</span>
                <span className="font-bold text-[#0f172a]">{val}</span>
                <span className="text-[10px] text-amber-600 bg-amber-100/60 px-1.5 py-0.5 rounded">
                  31-bit Smi
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f8f9fc] border border-black/[0.04] flex items-center justify-between">
                <span className="text-[#64748b]">let userPtr:</span>
                <span className="font-semibold text-sky-600">
                  {heapAllocated ? "0x7A40_B120" : "null"}
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  Pointer
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-black/[0.05]">
            <button
              onClick={() => setVal((v) => (v < 99 ? v + 1 : 1))}
              className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-semibold text-[11px] hover:bg-amber-600 transition-colors cursor-pointer"
            >
              + Mutate Smi
            </button>
            <button
              onClick={() => setHeapAllocated((h) => !h)}
              className="px-2.5 py-1 rounded-lg bg-[#0f172a] text-white font-semibold text-[11px] hover:bg-black transition-colors cursor-pointer"
            >
              {heapAllocated ? "Free Heap" : "Alloc Heap"}
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                DYNAMIC V8 HEAP
              </span>
              <span className="text-[10px] text-[#94a3b8]">Semi-Space 0</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#f8f9fc] border border-black/[0.04] space-y-1">
              <div className="text-[11px] text-[#64748b]">Address: 0x7A40_B120</div>
              <div className="font-bold text-[#0f172a] text-[12px]">
                {heapAllocated ? "{ id: 101, name: 'V8' }" : "0x0000 (Unallocated)"}
              </div>
              <div className="text-[10px] text-emerald-600 pt-1 flex items-center gap-1">
                <CheckCircle2 size={11} />
                <span>Managed by Scavenger Nursery</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#64748b] bg-[#f8f9fc] p-2 rounded-xl mt-3">
            In V8, small integers (Smis) are stored inline with a 1-bit zero tag. Objects live in the managed garbage-collected heap.
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlFlowInteractiveWidget() {
  const [activeStep, setActiveStep] = useState(0);

  const instructions = [
    { op: "LdaNamedProperty", reg: "a0, [0]", note: "Load object property into accumulator" },
    { op: "Star", reg: "r0", note: "Save accumulator into register r0" },
    { op: "TestLessThan", reg: "r0, [100]", note: "Evaluate condition flag in CPU flags" },
    { op: "JumpIfFalse", reg: "[0x18]", note: "Branch directly to else block" }
  ];

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            IGNITION BYTECODE PIPELINE
          </span>
          <button
            onClick={() => setActiveStep((s) => (s + 1) % instructions.length)}
            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Play size={10} />
            <span>Step Opcode</span>
          </button>
        </div>

        <div className="space-y-1.5">
          {instructions.map((inst, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl transition-all flex items-center justify-between border ${
                  isCurrent
                    ? "bg-emerald-50/80 border-emerald-300 shadow-xs"
                    : "bg-[#f8f9fc] border-black/[0.03] opacity-75"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isCurrent ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                  <span className="font-bold text-[#0f172a]">{inst.op}</span>
                  <span className="text-emerald-700">{inst.reg}</span>
                </div>
                <span className="text-[10px] text-[#64748b] hidden sm:inline">{inst.note}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ScopeInteractiveWidget() {
  const [activeScope, setActiveScope] = useState<"global" | "closure" | "inner">("closure");

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
            LEXICAL ENVIRONMENT SCOPE CHAIN
          </span>
          <span className="text-[10px] text-[#64748b]">Heap Context Pointer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div
            onClick={() => setActiveScope("global")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeScope === "global" ? "bg-purple-100/60 border-purple-400 shadow-xs" : "bg-[#f8f9fc] border-black/[0.04]"
            }`}
          >
            <div className="text-[10px] font-bold text-purple-900 mb-1">01. GLOBAL SCOPE</div>
            <div className="text-[11px] text-[#475569]">const API_URL</div>
            <div className="text-[9px] text-[#94a3b8] mt-1">Window / GlobalThis</div>
          </div>

          <div
            onClick={() => setActiveScope("closure")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeScope === "closure" ? "bg-purple-100/60 border-purple-400 shadow-xs" : "bg-[#f8f9fc] border-black/[0.04]"
            }`}
          >
            <div className="text-[10px] font-bold text-purple-900 mb-1">02. CLOSURE CONTEXT</div>
            <div className="text-[11px] text-purple-700 font-bold">let secretToken</div>
            <div className="text-[9px] text-emerald-600 mt-1">Retained in Heap</div>
          </div>

          <div
            onClick={() => setActiveScope("inner")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeScope === "inner" ? "bg-purple-100/60 border-purple-400 shadow-xs" : "bg-[#f8f9fc] border-black/[0.04]"
            }`}
          >
            <div className="text-[10px] font-bold text-purple-900 mb-1">03. INNER FUNCTION</div>
            <div className="text-[11px] text-[#475569]">return () =&gt; secretToken</div>
            <div className="text-[9px] text-purple-600 mt-1">[[Scope]] Bound</div>
          </div>
        </div>

        <div className="text-[10px] text-[#64748b] bg-[#f8f9fc] p-2.5 rounded-xl mt-2.5 flex items-center justify-between">
          <span>Active Inspection: {activeScope.toUpperCase()}</span>
          <span className="text-purple-600 font-semibold">Heap closure retention active</span>
        </div>
      </div>
    </div>
  );
}

function ArraysInteractiveWidget() {
  const [elementsKind, setElementsKind] = useState<"PACKED_SMI" | "PACKED_ELEMENTS" | "HOLEY_ELEMENTS">("PACKED_SMI");

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
            V8 FAST ELEMENTS TRANSITION
          </span>
          <span className="text-[10px] font-bold text-sky-700">{elementsKind}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#f8f9fc] border border-black/[0.04] mb-3 flex items-center justify-around">
          <div className="text-center">
            <span className="block text-[10px] text-[#94a3b8]">Index 0</span>
            <span className="font-bold text-sm text-[#0f172a]">42</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-[#94a3b8]">Index 1</span>
            <span className="font-bold text-sm text-[#0f172a]">
              {elementsKind === "HOLEY_ELEMENTS" ? "<hole>" : elementsKind === "PACKED_ELEMENTS" ? "'hello'" : "88"}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-[#94a3b8]">Index 2</span>
            <span className="font-bold text-sm text-[#0f172a]">100</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setElementsKind("PACKED_SMI")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              elementsKind === "PACKED_SMI" ? "bg-sky-600 text-white shadow-xs" : "bg-slate-100 text-[#475569]"
            }`}
          >
            PACKED_SMI (Fastest)
          </button>
          <button
            onClick={() => setElementsKind("PACKED_ELEMENTS")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              elementsKind === "PACKED_ELEMENTS" ? "bg-sky-600 text-white shadow-xs" : "bg-slate-100 text-[#475569]"
            }`}
          >
            Insert String (De-optimize)
          </button>
          <button
            onClick={() => setElementsKind("HOLEY_ELEMENTS")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              elementsKind === "HOLEY_ELEMENTS" ? "bg-rose-600 text-white shadow-xs" : "bg-slate-100 text-[#475569]"
            }`}
          >
            Delete Index 1 (Holey)
          </button>
        </div>
      </div>
    </div>
  );
}

function ObjectsInteractiveWidget() {
  const [shapeStep, setShapeStep] = useState(2);

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-fuchsia-700 bg-fuchsia-50 px-2 py-0.5 rounded-md">
            TURBOFAN SHAPE TRANSITION TREE
          </span>
          <span className="text-[10px] text-fuchsia-600 font-semibold">Inline Cache: MONOMORPHIC</span>
        </div>

        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-[#f8f9fc] border border-black/[0.04] flex items-center justify-between">
            <span className="text-[#64748b]">Shape0 (empty):</span>
            <span className="font-mono text-fuchsia-700">Map 0x3A00</span>
            <span className="text-[10px] text-slate-400">Offset: 0</span>
          </div>

          <div
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
              shapeStep >= 1 ? "bg-fuchsia-50/70 border-fuchsia-300" : "bg-[#f8f9fc] border-black/[0.04] opacity-50"
            }`}
          >
            <span className="text-[#0f172a] font-semibold">+ prop .x = 10:</span>
            <span className="font-mono text-fuchsia-700">Map 0x3A08</span>
            <span className="text-[10px] text-emerald-600 font-bold">Field 0 (Offset 16)</span>
          </div>

          <div
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
              shapeStep >= 2 ? "bg-fuchsia-50/70 border-fuchsia-300" : "bg-[#f8f9fc] border-black/[0.04] opacity-50"
            }`}
          >
            <span className="text-[#0f172a] font-semibold">+ prop .y = 20:</span>
            <span className="font-mono text-fuchsia-700">Map 0x3A10</span>
            <span className="text-[10px] text-emerald-600 font-bold">Field 1 (Offset 24)</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-black/[0.05]">
          <span className="text-[10px] text-[#64748b]">Same construction order guarantees shared shapes</span>
          <button
            onClick={() => setShapeStep((s) => (s < 2 ? s + 1 : 0))}
            className="px-2.5 py-1 rounded-lg bg-fuchsia-600 text-white font-semibold text-[11px] hover:bg-fuchsia-700 transition-colors cursor-pointer"
          >
            Transition Step
          </button>
        </div>
      </div>
    </div>
  );
}

function AsyncInteractiveWidget() {
  const [pipelinePhase, setPipelinePhase] = useState<"SYNC" | "MICRO" | "MACRO">("MICRO");

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
            EVENT LOOP TASK SCHEDULER
          </span>
          <span className="text-[10px] text-rose-600 font-semibold">Priority Drain: Microtasks First</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div
            onClick={() => setPipelinePhase("SYNC")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              pipelinePhase === "SYNC" ? "bg-rose-100/70 border-rose-400 shadow-xs" : "bg-[#f8f9fc] border-black/[0.04]"
            }`}
          >
            <span className="text-[10px] font-bold text-rose-900 block">1. CALL STACK</span>
            <span className="text-[11px] text-[#475569] block mt-0.5">console.log("Start")</span>
            <span className="text-[9px] text-[#94a3b8] mt-1 block">Synchronous</span>
          </div>

          <div
            onClick={() => setPipelinePhase("MICRO")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              pipelinePhase === "MICRO" ? "bg-rose-100/70 border-rose-400 shadow-xs" : "bg-[#f8f9fc] border-black/[0.04]"
            }`}
          >
            <span className="text-[10px] font-bold text-rose-900 block">2. MICROTASKS (P0)</span>
            <span className="text-[11px] text-rose-700 font-bold block mt-0.5">Promise.then()</span>
            <span className="text-[9px] text-emerald-600 mt-1 block">Drains completely</span>
          </div>

          <div
            onClick={() => setPipelinePhase("MACRO")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              pipelinePhase === "MACRO" ? "bg-rose-100/70 border-rose-400 shadow-xs" : "bg-[#f8f9fc] border-black/[0.04]"
            }`}
          >
            <span className="text-[10px] font-bold text-rose-900 block">3. MACROTASKS (P1)</span>
            <span className="text-[11px] text-[#475569] block mt-0.5">setTimeout(fn, 0)</span>
            <span className="text-[9px] text-[#94a3b8] mt-1 block">One per tick</span>
          </div>
        </div>

        <div className="text-[10px] text-[#64748b] bg-[#f8f9fc] p-2 rounded-xl mt-2.5 flex items-center justify-between">
          <span>Active Execution Phase: {pipelinePhase}</span>
          <button
            onClick={() =>
              setPipelinePhase((p) => (p === "SYNC" ? "MICRO" : p === "MICRO" ? "MACRO" : "SYNC"))
            }
            className="px-2 py-0.5 rounded bg-rose-600 text-white font-semibold text-[10px] hover:bg-rose-700 cursor-pointer"
          >
            Next Tick &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

function DomInteractiveWidget() {
  const [stage, setStage] = useState(3);

  const pipeline = [
    { title: "DOM & CSSOM", desc: "HTML parsed to DOM nodes; CSS rules compiled to style trees" },
    { title: "Render Tree", desc: "Combines DOM + CSSOM; ignores display:none elements" },
    { title: "Layout Geometry", desc: "Calculates exact pixel coordinates, width, and height" },
    { title: "Paint & Composite", desc: "Rasterizes display lists onto separate GPU layer textures" }
  ];

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
            BLINK RENDERING PIPELINE
          </span>
          <button
            onClick={() => setStage((s) => (s < 3 ? s + 1 : 0))}
            className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-semibold text-[11px] hover:bg-cyan-700 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Next Stage</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {pipeline.map((item, idx) => {
            const isDone = stage >= idx;
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl border transition-all ${
                  isDone ? "bg-cyan-50/80 border-cyan-300" : "bg-[#f8f9fc] border-black/[0.04] opacity-50"
                }`}
              >
                <div className="text-[10px] font-bold text-cyan-900 mb-0.5">0{idx + 1}. {item.title}</div>
                <div className="text-[9px] text-[#64748b] leading-tight">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, onSelectModule }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeModule = V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 8), y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-4 sm:p-6 rounded-[28px] bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_20px_48px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out select-none"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: activeModule.accent }}
          />
          <span className="text-[11px] font-mono tracking-widest text-[#0f172a] uppercase font-bold">
            V8 RUNTIME WORKBENCH // SYSTEM {activeModule.index}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fc] border border-black/[0.06] text-[10px] font-mono text-[#64748b]">
          <Sparkles size={11} className="text-amber-500" />
          <span>Interactive Execution Sandbox</span>
        </div>
      </div>

      <div className="relative z-10 py-4 flex-1 flex flex-col justify-center">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold"
              style={{ backgroundColor: activeModule.chipColor, color: activeModule.accent }}
            >
              {activeModule.category}
            </span>
            <span className="text-xs font-mono text-[#64748b]">{activeModule.subsystem}</span>
          </div>
          <h2 className="font-clash font-bold text-2xl text-[#0f172a]">
            {activeModule.name}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {activeModule.tagline}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeModule.id === "variables" && <VariablesInteractiveWidget />}
            {activeModule.id === "control-flow" && <ControlFlowInteractiveWidget />}
            {activeModule.id === "functions-scope" && <ScopeInteractiveWidget />}
            {activeModule.id === "arrays-iteration" && <ArraysInteractiveWidget />}
            {activeModule.id === "objects-maps" && <ObjectsInteractiveWidget />}
            {activeModule.id === "async-event-loop" && <AsyncInteractiveWidget />}
            {activeModule.id === "dom-apis" && <DomInteractiveWidget />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#64748b]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>TurboFan JIT Optimizing Compiler Ready</span>
        </div>
        <span>Hover &amp; interact with the simulation above</span>
      </div>
    </div>
  );
}