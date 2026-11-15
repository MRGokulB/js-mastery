"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, RotateCcw, Play, Pause, Layers, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

interface StepData {
  stepIndex: number;
  code: string;
  bytecode: string[];
  actionTitle: string;
  explanation: string;
  v8Insight: string;
  latencyNs: string;
  stackSlots: {
    id: string;
    name: string;
    type: "primitive" | "pointer" | "null";
    value: string;
    address: string;
    targetHeapId?: string;
  }[];
  heapObjects: {
    id: string;
    address: string;
    label: string;
    properties: { key: string; val: string }[];
    isActive: boolean;
  }[];
}

const MEMORY_STEPS: StepData[] = [
  {
    stepIndex: 0,
    code: "let age = 25;",
    bytecode: ["LdaSmi [25]", "Star r0 // stack register age = 25"],
    actionTitle: "1. Primitive In-Place Stack Allocation",
    explanation: "Numbers, booleans, and symbols have deterministic 64-bit bounds. V8 packages 25 directly into the Call Stack register as an unboxed 31-bit Small Integer (Smi). Zero heap overhead.",
    v8Insight: "CPU RSP increments by 8 bytes. Value stored directly in CPU L1 cache.",
    latencyNs: "0.8 ns",
    stackSlots: [
      { id: "slot-age", name: "age", type: "primitive", value: "25 (Smi)", address: "0x7FFE00" }
    ],
    heapObjects: []
  },
  {
    stepIndex: 1,
    code: "let user = { id: 1, name: 'Alex' };",
    bytecode: ["CreateObjectLiteral [0], [0], #41", "Star r1 // stack register user = 0x4A10"],
    actionTitle: "2. Object Allocation in V8 Heap",
    explanation: "Objects have dynamic capacity. V8 allocates memory inside the Heap at address 0x4A10. The stack slot 'user' stores only the 8-byte pointer targeting that heap location.",
    v8Insight: "Allocates JSObject with Hidden Class Map. Stack stores raw 64-bit reference address.",
    latencyNs: "4.2 ns",
    stackSlots: [
      { id: "slot-age", name: "age", type: "primitive", value: "25 (Smi)", address: "0x7FFE00" },
      { id: "slot-user", name: "user", type: "pointer", value: "→ 0x4A10", address: "0x7FFE08", targetHeapId: "heap-4A10" }
    ],
    heapObjects: [
      {
        id: "heap-4A10",
        address: "0x4A10",
        label: "JSObject: user",
        properties: [{ key: "id", val: "1" }, { key: "name", val: "'Alex'" }],
        isActive: true
      }
    ]
  },
  {
    stepIndex: 2,
    code: "let alias = user;",
    bytecode: ["Mov r1, r2 // copies 8-byte pointer from user to alias"],
    actionTitle: "3. Reference Assignment (Shared Pointer)",
    explanation: "Crucial Mental Model: 'alias = user' does NOT clone the object. It copies only the 8-byte pointer '0x4A10'. Both stack slots now target the exact same heap memory block.",
    v8Insight: "Two stack registers hold identical memory offsets. Zero bytes cloned on heap.",
    latencyNs: "1.1 ns",
    stackSlots: [
      { id: "slot-age", name: "age", type: "primitive", value: "25 (Smi)", address: "0x7FFE00" },
      { id: "slot-user", name: "user", type: "pointer", value: "→ 0x4A10", address: "0x7FFE08", targetHeapId: "heap-4A10" },
      { id: "slot-alias", name: "alias", type: "pointer", value: "→ 0x4A10", address: "0x7FFE10", targetHeapId: "heap-4A10" }
    ],
    heapObjects: [
      {
        id: "heap-4A10",
        address: "0x4A10",
        label: "JSObject: user (Shared)",
        properties: [{ key: "id", val: "1" }, { key: "name", val: "'Alex'" }],
        isActive: true
      }
    ]
  },
  {
    stepIndex: 3,
    code: "alias.name = 'Jordan';",
    bytecode: ["LdaNamedProperty r2, [1], [1]", "SetNamedProperty r2, [1], [3]"],
    actionTitle: "4. In-Place Mutation via Reference",
    explanation: "Updating 'alias.name' follows the 0x4A10 pointer to the heap and updates the property in-place. Because 'user' points to the exact same address, 'user.name' reflects 'Jordan' too!",
    v8Insight: "V8 mutates property slot in heap object. Changes visible across all pointers.",
    latencyNs: "3.8 ns",
    stackSlots: [
      { id: "slot-age", name: "age", type: "primitive", value: "25 (Smi)", address: "0x7FFE00" },
      { id: "slot-user", name: "user", type: "pointer", value: "→ 0x4A10", address: "0x7FFE08", targetHeapId: "heap-4A10" },
      { id: "slot-alias", name: "alias", type: "pointer", value: "→ 0x4A10", address: "0x7FFE10", targetHeapId: "heap-4A10" }
    ],
    heapObjects: [
      {
        id: "heap-4A10",
        address: "0x4A10",
        label: "JSObject: user (Mutated)",
        properties: [{ key: "id", val: "1" }, { key: "name", val: "'Jordan'" }],
        isActive: true
      }
    ]
  },
  {
    stepIndex: 4,
    code: "user = null;",
    bytecode: ["LdaNull", "Star r1 // user stack register set to 0x0"],
    actionTitle: "5. Severing Pointer Reference",
    explanation: "Setting 'user = null' zeroes out the pointer in user's stack slot. But because 'alias' still points to 0x4A10, reachability is maintained and the object is preserved.",
    v8Insight: "User slot becomes 0x0. Reachability path exists via alias. GC ignores object.",
    latencyNs: "0.9 ns",
    stackSlots: [
      { id: "slot-age", name: "age", type: "primitive", value: "25 (Smi)", address: "0x7FFE00" },
      { id: "slot-user", name: "user", type: "null", value: "null (0x0)", address: "0x7FFE08" },
      { id: "slot-alias", name: "alias", type: "pointer", value: "→ 0x4A10", address: "0x7FFE10", targetHeapId: "heap-4A10" }
    ],
    heapObjects: [
      {
        id: "heap-4A10",
        address: "0x4A10",
        label: "JSObject: user (Anchored by alias)",
        properties: [{ key: "id", val: "1" }, { key: "name", val: "'Jordan'" }],
        isActive: true
      }
    ]
  }
];

export function SpatialMemoryStudio() {
  const [currentStepIdx, setCurrentStepIdx] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cableCoords, setCableCoords] = useState<{ id: string; x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < MEMORY_STEPS.length - 1 ? prev + 1 : 0));
    }, 3600);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = MEMORY_STEPS[currentStepIdx];

  const updateCables = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];

    step.stackSlots.forEach((slot) => {
      if (slot.type === "pointer" && slot.targetHeapId) {
        const slotEl = document.getElementById(slot.id);
        const heapEl = document.getElementById(slot.targetHeapId);
        if (slotEl && heapEl) {
          const sRect = slotEl.getBoundingClientRect();
          const hRect = heapEl.getBoundingClientRect();
          newCoords.push({
            id: `${slot.id}-${slot.targetHeapId}`,
            x1: sRect.right - containerRect.left,
            y1: sRect.top + sRect.height / 2 - containerRect.top,
            x2: hRect.left - containerRect.left,
            y2: hRect.top + 36 - containerRect.top
          });
        }
      }
    });
    setCableCoords(newCoords);
  };

  useEffect(() => {
    const timer = setTimeout(updateCables, 100);
    window.addEventListener("resize", updateCables);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCables);
    };
  }, [currentStepIdx, is3DMode]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
            02 &bull; Spatial Memory Observatory
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Stack vs Heap Architecture
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Primitives lock directly into high-speed 64-bit Call Stack registers. Objects float within the dynamic V8 Heap, tethered by 64-bit memory pointer conduits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
              is3DMode
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                : "bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {is3DMode ? "3D Kinetic Perspective" : "Flat Planar View"}
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? "Pause Stream" : "Stream Execution"}
          </button>

          <button
            onClick={() => {
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/[0.1] transition-all cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-100 dark:bg-[#07090e] p-2 rounded-2xl border border-slate-200 dark:border-white/[0.06]">
        {MEMORY_STEPS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentStepIdx(idx);
              setIsPlaying(false);
            }}
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer border flex items-center gap-2 ${
              currentStepIdx === idx
                ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm"
                : "bg-white dark:bg-[#0c0e14]/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/[0.08] hover:border-amber-400"
            }`}
          >
            <span className="text-[10px] opacity-70">0{idx + 1}</span>
            <span className="truncate max-w-[140px] sm:max-w-none">{s.code}</span>
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative rounded-3xl bg-slate-100/90 dark:bg-[#07090e] border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-10 overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px]" />

        <svg className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-visible hidden md:block">
          <defs>
            <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
            </linearGradient>
            <filter id="cableGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {cableCoords.map((c) => {
            const dx = Math.abs(c.x2 - c.x1);
            const cx1 = c.x1 + dx * 0.45;
            const cx2 = c.x2 - dx * 0.45;
            const pathD = `M ${c.x1} ${c.y1} C ${cx1} ${c.y1}, ${cx2} ${c.y2}, ${c.x2} ${c.y2}`;
            return (
              <g key={c.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.25)"
                  strokeWidth="6"
                  filter="url(#cableGlow)"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#cableGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
                <circle cx={c.x1} cy={c.y1} r="4" fill="#f59e0b" />
                <circle cx={c.x2} cy={c.y2} r="4" fill="#06b6d4" />
              </g>
            );
          })}
        </svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#0c0e14]/95 border border-slate-200/90 dark:border-white/[0.08] shadow-sm font-mono">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08] text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-500" />
                  V8 TOKEN STREAM
                </span>
                <span className="text-amber-500 font-bold">Step {currentStepIdx + 1} of 5</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-amber-600 dark:text-amber-400 font-bold text-sm mb-4 tracking-tight">
                {step.code}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-2">
                {step.actionTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">
                {step.explanation}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 uppercase font-semibold">IGNITION BYTECODE:</span>
                <div className="space-y-1">
                  {step.bytecode.map((b, i) => (
                    <div key={i} className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">
                      &bull; {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/[0.04] text-[11px]">
                <span className="text-slate-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> Hardware Latency:
                </span>
                <span className="text-amber-500 font-bold">{step.latencyNs}</span>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
              is3DMode ? "perspective-[1200px]" : ""
            }`}
          >
            <div
              className={`p-6 rounded-2xl bg-white dark:bg-[#0c0e14]/95 border border-slate-200/90 dark:border-white/[0.08] shadow-sm transition-transform duration-700 ${
                is3DMode ? "rotate-y-[-8deg] rotate-x-[6deg] shadow-2xl" : ""
              }`}
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">Call Stack (LIFO)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">64-bit RSP Frame</span>
              </div>

              <div className="space-y-3">
                {step.stackSlots.map((slot) => (
                  <motion.div
                    id={slot.id}
                    key={slot.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between font-mono text-xs shadow-xs relative group"
                  >
                    <div>
                      <span className="text-slate-400 text-[10px] block font-mono">{slot.address}</span>
                      <strong className="text-slate-900 dark:text-white font-mono">{slot.name}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded font-bold text-xs ${
                          slot.type === "pointer"
                            ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                            : slot.type === "null"
                            ? "bg-slate-200 dark:bg-white/10 text-slate-500"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {slot.value}
                      </span>
                      {slot.type === "pointer" && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl bg-white dark:bg-[#0c0e14]/95 border border-slate-200/90 dark:border-white/[0.08] shadow-sm transition-transform duration-700 ${
                is3DMode ? "rotate-y-[8deg] rotate-x-[6deg] shadow-2xl" : ""
              }`}
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">V8 Heap Constellation</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Dynamic Young Gen</span>
              </div>

              {step.heapObjects.length === 0 ? (
                <div className="h-44 flex flex-col items-center justify-center text-xs font-mono text-slate-400 border border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 text-center">
                  <Database className="w-6 h-6 text-slate-300 dark:text-slate-600 mb-2" />
                  <span>No Heap Objects Allocated</span>
                  <span className="text-[10px] text-slate-400 mt-1">Primitives reside entirely on Call Stack</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {step.heapObjects.map((obj) => (
                    <motion.div
                      id={obj.id}
                      key={obj.address}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs shadow-xs"
                    >
                      <div className="flex justify-between text-[11px] text-cyan-600 dark:text-cyan-400 pb-2 mb-2 border-b border-cyan-500/20 font-bold">
                        <span>{obj.label}</span>
                        <span>{obj.address}</span>
                      </div>
                      <div className="space-y-1.5">
                        {obj.properties.map((p, i) => (
                          <div key={i} className="flex justify-between text-slate-800 dark:text-slate-200">
                            <span className="text-slate-500">{p.key}:</span>
                            <span className="text-cyan-500 font-bold">{p.val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Hidden Class: Map_0x1A</span>
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Live Root
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
