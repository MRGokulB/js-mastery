"use client";

import { useState, useRef, useCallback } from "react";
import { 
  Boxes, 
  Workflow, 
  Cpu, 
  Layers, 
  Sparkles, 
  Timer, 
  Activity, 
  ArrowUpRight
} from "lucide-react";

export interface V8SubsystemMeta {
  id: string;
  index: string;
  name: string;
  shortName: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  mechanic: string;
  schematic: string;
  v8Spec: string;
  overview: string;
}

export const V8_SUBSYSTEMS: V8SubsystemMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortName: "Variables & Heap",
    category: "Memory Architecture",
    subsystem: "V8 Scavenger GC",
    tagline: "Stack frames, 31-bit Smis, and heap references.",
    url: "https://variables-pi.vercel.app/",
    mechanic: "Contiguous Stack / Dynamic Heap",
    schematic: "SMI_TAG: val << 1 | 0x0 · PTR: 0x7FFF...",
    v8Spec: "31-Bit Smi Tagging",
    overview: "Hardware-level memory modeling exploring 31-bit Small Integer tagging, execution frame registers, and V8 Scavenger garbage collection."
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortName: "Control Flow",
    category: "Interpreter",
    subsystem: "Ignition Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks.",
    url: "https://control-flow-ruby.vercel.app",
    mechanic: "Conditional Jump Offset Registers",
    schematic: "JumpIfFalse [offset: +0x14]",
    v8Spec: "Bytecode Jump Tables",
    overview: "AST conditional branch resolution, switch statement jump tables, and boolean coercion bitmasks inside Ignition bytecode."
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    shortName: "Scope & Closures",
    category: "Scope Context",
    subsystem: "Context Resolver",
    tagline: "Lexical environments and heap closure retention.",
    url: "https://functions-scope.vercel.app/",
    mechanic: "Linked Lexical Environment Chain",
    schematic: "[[Scopes]]: [Closure, Script, Global]",
    v8Spec: "Heap Activation Records",
    overview: "Execution context creation phases, persistent heap closures, and static lexical scoping chains."
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    shortName: "Fast Elements",
    category: "Memory Elements",
    subsystem: "Elements Transition Table",
    tagline: "Packed Smi elements and amortized expansion.",
    url: "https://arrays-iteration.vercel.app/",
    mechanic: "Indexed Int32 Array Buffer",
    schematic: "PACKED_SMI -> PACKED_DOUBLE",
    v8Spec: "Fast Elements Transitions",
    overview: "Fast Smi Elements, holey array avoidances, and amortized array capacity doubling in memory."
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortName: "Hidden Classes",
    category: "JIT Compiler",
    subsystem: "TurboFan Type Feedback",
    tagline: "V8 Shapes, inline caches and prototype lookups.",
    url: "https://objects-maps.vercel.app/",
    mechanic: "Shape Transition Tree",
    schematic: "Map0 -> Map1(x) -> Map2(y) [IC]",
    v8Spec: "Monomorphic Inline Caches",
    overview: "V8 Hidden Classes (Shapes) transition trees, monomorphic inline caching, and prototype chain lookups."
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    shortName: "Event Loop",
    category: "Scheduler",
    subsystem: "Libuv Event Ring",
    tagline: "Microtask drain priority and macrotask timers.",
    url: "https://async-event-loop.vercel.app",
    mechanic: "Dual Priority Queue Scheduler",
    schematic: "DRAIN_MICROTASKS() -> TICK_MACROTASK()",
    v8Spec: "Microtask Queue Drain P0",
    overview: "Call stack execution, Web API delegation, Promise microtask drain strict priority, and timer phase ticks."
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Browser APIs",
    shortName: "DOM & Web APIs",
    category: "Host Bridge",
    subsystem: "Blink C++ Host Binding",
    tagline: "C++ Blink DOM wrappers and event propagation.",
    url: "https://dom-apis.vercel.app/",
    mechanic: "C++ Wrapper Object Handle",
    schematic: "PHASE: CAPTURE -> TARGET -> BUBBLE",
    v8Spec: "Blink C++ Wrappers",
    overview: "C++ Blink bindings, DOM node wrapper memory lifecycles, and three-phase event capture/bubble propagation."
  }
];

const SUBSYSTEM_ICONS = {
  variables: Boxes,
  "control-flow": Workflow,
  "functions-scope": Cpu,
  "arrays-iteration": Layers,
  "objects-maps": Sparkles,
  "async-event-loop": Timer,
  "dom-apis": Activity
};

function V8SchematicViewport({ id }: { id: string }) {
  if (id === "variables") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 flex flex-col items-center">
            <span className="text-[9px] font-mono text-amber-400 font-bold mb-1">CALL STACK</span>
            <span className="text-xs font-mono text-white font-semibold">Smi: 42</span>
            <span className="text-[8px] font-mono text-white/40">val &lt;&lt; 1 | 0x0</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 flex flex-col items-center">
            <span className="text-[9px] font-mono text-cyan-400 font-bold mb-1">HEAP POINTER</span>
            <span className="text-xs font-mono text-white font-semibold">0x7FFF0040</span>
            <span className="text-[8px] font-mono text-white/40">Tagged Pointer</span>
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50">
          <span>GC PHASE: SCAVENGER</span>
          <span className="text-amber-400">YOUNG GEN ALLOC</span>
        </div>
      </div>
    );
  }

  if (id === "control-flow") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        <div className="w-full max-w-xs space-y-1.5 font-mono text-xs">
          <div className="p-2 rounded bg-white/10 border border-white/20 flex justify-between text-white">
            <span className="text-emerald-400">LdaNamedProperty</span>
            <span className="text-white/40">[a0]</span>
          </div>
          <div className="p-2 rounded bg-white/[0.04] border border-white/[0.08] flex justify-between text-white/70">
            <span className="text-amber-400">TestEqualStrict</span>
            <span className="text-white/40">[a1]</span>
          </div>
          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06] flex justify-between text-white/50">
            <span className="text-rose-400">JumpIfFalse</span>
            <span className="text-white/40">[+0x14]</span>
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-1">
          <span>IGNITION ACCUMULATOR</span>
          <span className="text-emerald-400">DISPATCH READY</span>
        </div>
      </div>
    );
  }

  if (id === "functions-scope") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        <div className="flex items-center gap-2 justify-center w-full">
          {[
            { name: "Local", tag: "ctx_0" },
            { name: "Closure", tag: "heap_retain" },
            { name: "Global", tag: "window" }
          ].map((scope, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/20 flex flex-col items-center shadow-xs">
                <span className="text-xs font-mono font-semibold text-white">{scope.name}</span>
                <span className="text-[8px] font-mono text-purple-400">{scope.tag}</span>
              </div>
              {idx < 2 && <span className="text-white/40 font-mono text-xs">→</span>}
            </div>
          ))}
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-2">
          <span>STATIC LEXICAL CHAIN</span>
          <span className="text-purple-400">HEAP CLOSURE RETENTION</span>
        </div>
      </div>
    );
  }

  if (id === "arrays-iteration") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col gap-1.5 w-full max-w-xs font-mono text-xs">
          <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 flex justify-between text-emerald-300">
            <span>PACKED_SMI</span>
            <span className="text-[10px]">O(1) FAST ACCESS</span>
          </div>
          <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 flex justify-between text-amber-300">
            <span>PACKED_DOUBLE</span>
            <span className="text-[10px]">64-BIT UNBOXED</span>
          </div>
          <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 flex justify-between text-rose-300">
            <span>HOLEY_ELEMENTS</span>
            <span className="text-[10px]">PROTOTYPE LOOKUP</span>
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-1">
          <span>V8 TRANSITION LADDER</span>
          <span className="text-emerald-400">NO DEOPT DETECTED</span>
        </div>
      </div>
    );
  }

  if (id === "objects-maps") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        <div className="flex items-center gap-2 justify-center w-full">
          {[
            { map: "Map0", prop: "empty" },
            { map: "Map1", prop: "+x (0x08)" },
            { map: "Map2", prop: "+y (0x10)" }
          ].map((m, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/20 flex flex-col items-center shadow-xs">
                <span className="text-xs font-mono font-bold text-white">{m.map}</span>
                <span className="text-[8px] font-mono text-fuchsia-400">{m.prop}</span>
              </div>
              {idx < 2 && <span className="text-white/40 font-mono text-xs">→</span>}
            </div>
          ))}
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-2">
          <span>TURBOFAN INLINE CACHE</span>
          <span className="text-fuchsia-400">MONOMORPHIC HIT</span>
        </div>
      </div>
    );
  }

  if (id === "async-event-loop") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/20 text-center">
            <span className="text-[9px] text-amber-400 font-bold block mb-1">CALL STACK</span>
            <span className="text-xs text-white">main()</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <span className="text-[9px] text-emerald-400 font-bold block mb-1">MICROTASKS (P0)</span>
            <span className="text-xs text-white">Promise.then</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
            <span className="text-[9px] text-cyan-400 font-bold block mb-1">RENDER PHASE</span>
            <span className="text-xs text-white">requestAnim</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
            <span className="text-[9px] text-rose-400 font-bold block mb-1">MACROTASKS (P1)</span>
            <span className="text-xs text-white">setTimeout</span>
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-1">
          <span>LIBUV EVENT RING</span>
          <span className="text-emerald-400">MICROTASKS DRAINED</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2.5">
      <div className="flex items-center gap-2 justify-center w-full">
        {[
          { phase: "Capture", id: "1" },
          { phase: "Target", id: "2" },
          { phase: "Bubble", id: "3" }
        ].map((p, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/20 flex flex-col items-center shadow-xs">
              <span className="text-xs font-mono font-bold text-white">{p.phase}</span>
              <span className="text-[8px] font-mono text-cyan-400">Phase {p.id}</span>
            </div>
            {idx < 2 && <span className="text-white/40 font-mono text-xs">→</span>}
          </div>
        ))}
      </div>
      <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-2">
        <span>BLINK C++ BINDING</span>
        <span className="text-cyan-400">WRAPPER RETAINED</span>
      </div>
    </div>
  );
}

interface V8RuntimeObservatoryProps {
  activeId: string;
  onSelectSubsystem: (id: string) => void;
}

export default function V8RuntimeObservatory({
  activeId,
  onSelectSubsystem
}: V8RuntimeObservatoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 5, y: -3 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 8;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 4, y: -2 });
  }, []);

  const activeSubsystem = V8_SUBSYSTEMS.find((m) => m.id === activeId) || V8_SUBSYSTEMS[0];

  return (
    <div className="w-full max-w-6xl mx-auto select-none">
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-6 border-b border-black/[0.06] gap-2">
        {V8_SUBSYSTEMS.map((subsystem) => {
          const isSelected = subsystem.id === activeId;
          const TabIcon = SUBSYSTEM_ICONS[subsystem.id as keyof typeof SUBSYSTEM_ICONS] || Boxes;

          return (
            <button
              key={subsystem.id}
              onClick={() => onSelectSubsystem(subsystem.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                isSelected
                  ? "bg-[#18181b] !text-white border-transparent shadow-sm"
                  : "bg-white text-[#71717a] border-black/[0.06] hover:border-black/[0.15] hover:text-[#18181b]"
              }`}
            >
              <TabIcon size={14} className={isSelected ? "!text-amber-400" : "text-[#71717a]"} />
              <span className={`font-semibold tracking-tight ${isSelected ? "!text-white" : ""}`}>{subsystem.index}</span>
              <span className={`font-sans font-medium ${isSelected ? "!text-white" : ""}`}>{subsystem.shortName}</span>
            </button>
          );
        })}
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="perspective-[1400px] mb-16"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="relative w-full rounded-[28px] bg-[#0e1117] border border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.25)] p-8 lg:p-10 overflow-hidden text-white"
        >
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 bg-white/[0.06] px-3 py-1 rounded-full border border-white/[0.08]">
                  SUBSYSTEM {activeSubsystem.index} · {activeSubsystem.category}
                </span>
                <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>JIT OPTIMIZED</span>
                </span>
              </div>

              <h2 className="font-clash font-bold text-3xl sm:text-4xl text-white tracking-tight mb-3">
                {activeSubsystem.name}
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-8 font-normal">
                {activeSubsystem.overview}
              </p>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    INTERNAL COMPONENT
                  </span>
                  <span className="text-xs font-mono font-semibold text-white">
                    {activeSubsystem.subsystem}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    RUNTIME MECHANIC
                  </span>
                  <span className="text-xs font-mono font-semibold text-white">
                    {activeSubsystem.mechanic}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    V8 ENGINE SPEC
                  </span>
                  <span className="text-xs font-mono font-semibold text-amber-400">
                    {activeSubsystem.v8Spec}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={activeSubsystem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 !text-black font-clash font-semibold text-xs hover:bg-amber-300 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span className="!text-black">Launch V8 Visualizer</span>
                  <ArrowUpRight size={15} className="!text-black" />
                </a>
                <span className="text-[11px] font-mono text-white/40">
                  {activeSubsystem.schematic}
                </span>
              </div>
            </div>

            <div 
              style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
              className="lg:col-span-5 flex flex-col items-center justify-between p-6 rounded-2xl bg-black/50 border border-white/[0.1] relative min-h-[320px]"
            >
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-white/40 tracking-wider pb-3 border-b border-white/[0.06]">
                <span>V8 REACTOR SCHEMATIC</span>
                <span className="text-amber-400">HOT JIT</span>
              </div>
              
              <div className="w-full my-auto py-4">
                <V8SchematicViewport id={activeSubsystem.id} />
              </div>

              <div className="w-full pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>ISOLATE: 0x2A1B</span>
                <span>HEAP: 64-BIT TAGGED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
