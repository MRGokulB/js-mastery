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

interface V8RuntimeObservatoryProps {
  activeId: string;
  onSelectSubsystem: (id: string) => void;
}

export default function V8RuntimeObservatory({
  activeId,
  onSelectSubsystem
}: V8RuntimeObservatoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 6, y: -4 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 5, y: -3 });
  }, []);

  const activeSubsystem = V8_SUBSYSTEMS.find((m) => m.id === activeId) || V8_SUBSYSTEMS[0];
  const IconComp = SUBSYSTEM_ICONS[activeSubsystem.id as keyof typeof SUBSYSTEM_ICONS] || Boxes;

  return (
    <div className="w-full max-w-6xl mx-auto select-none">
      <div className="flex items-center justify-between overflow-x-auto pb-4 mb-6 border-b border-black/[0.08] gap-2 scrollbar-none">
        {V8_SUBSYSTEMS.map((subsystem) => {
          const isSelected = subsystem.id === activeId;
          const TabIcon = SUBSYSTEM_ICONS[subsystem.id as keyof typeof SUBSYSTEM_ICONS] || Boxes;

          return (
            <button
              key={subsystem.id}
              onClick={() => onSelectSubsystem(subsystem.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                isSelected
                  ? "bg-[#18181b] text-white border-transparent shadow-sm"
                  : "bg-white text-[#71717a] border-black/[0.06] hover:border-black/[0.15] hover:text-[#18181b]"
              }`}
            >
              <TabIcon size={14} className={isSelected ? "text-amber-400" : "text-[#71717a]"} />
              <span className="font-semibold tracking-tight">{subsystem.index}</span>
              <span className="font-sans font-medium">{subsystem.shortName}</span>
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
              className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/[0.08] relative min-h-[300px]"
            >
              <div className="absolute top-3 left-4 text-[10px] font-mono text-white/40 tracking-wider">
                V8 ENGINE REACTOR TELEMETRY
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-amber-400 mb-6 shadow-inner">
                <IconComp size={32} />
              </div>

              <div className="w-full text-center space-y-2">
                <div className="font-mono text-xs text-amber-300 bg-white/[0.05] py-2 px-4 rounded-xl border border-white/[0.08] inline-block max-w-full truncate">
                  {activeSubsystem.schematic}
                </div>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  {activeSubsystem.tagline}
                </p>
              </div>

              <div className="w-full pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
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
