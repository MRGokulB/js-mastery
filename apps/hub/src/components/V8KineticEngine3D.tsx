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
  ArrowUpRight,
  Zap,
  Terminal,
  Gauge
} from "lucide-react";

export interface V8SubsystemMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  accent: string;
  accentGlow: string;
  mechanic: string;
  schematic: string;
  overview: string;
}

export const V8_SUBSYSTEMS: V8SubsystemMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    category: "Memory Architecture",
    subsystem: "V8 Scavenger GC & Pointer Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.4)",
    mechanic: "Contiguous Stack / Dynamic Heap Pointer Allocation",
    schematic: "SMI_TAG: val << 1 | 0x0 · HEAP_PTR: 0x7FFF...",
    overview: "Hardware-level memory modeling exploring 31-bit Small Integer tagging, execution frame registers, and V8 Scavenger garbage collection."
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    category: "Interpreter",
    subsystem: "Ignition Bytecode Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    mechanic: "Conditional Branch Jump Offset Registers",
    schematic: "LdaNamedProperty [a0] | JumpIfFalse [offset: +0x14]",
    overview: "AST conditional branch resolution, switch statement jump tables, and boolean coercion bitmasks inside Ignition bytecode."
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    category: "Scope Context",
    subsystem: "Context Resolver & Activation Records",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.4)",
    mechanic: "Context Stack Linked Lexical Environment",
    schematic: "[[Scopes]]: [Closure(outer), Script, Global]",
    overview: "Execution context creation phases, persistent heap closures, and static lexical scoping chains."
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    category: "Memory Elements",
    subsystem: "V8 Elements Transition Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0ea5e9",
    accentGlow: "rgba(14, 165, 233, 0.4)",
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer",
    schematic: "PACKED_SMI -> PACKED_DOUBLE -> HOLEY_ELEMENTS",
    overview: "Fast Smi Elements, holey array avoidances, and amortized array capacity doubling in memory."
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    category: "JIT Compiler",
    subsystem: "TurboFan JIT Type Feedback Vector",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#d946ef",
    accentGlow: "rgba(217, 70, 239, 0.4)",
    mechanic: "Shape Transition Tree & Property Offset Table",
    schematic: "Map0 -> Map1(x: +0x08) -> Map2(y: +0x10) [MONO_IC]",
    overview: "V8 Hidden Classes (Shapes) transition trees, monomorphic inline caching, and prototype chain lookups."
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    category: "Scheduler",
    subsystem: "Libuv & Browser Event Loop Ring",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#f43f5e",
    accentGlow: "rgba(244, 63, 94, 0.4)",
    mechanic: "Dual Priority Queue Scheduler (Microtask P0 / Timer P1)",
    schematic: "DRAIN_MICROTASKS() -> RENDER -> TICK_MACROTASK()",
    overview: "Call stack execution, Web API delegation, Promise microtask drain strict priority, and timer phase ticks."
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Browser APIs",
    category: "Host Bridge",
    subsystem: "Blink C++ V8 Host Binding Layer",
    tagline: "C++ Blink DOM wrappers and event propagation",
    url: "https://dom-apis.vercel.app/",
    accent: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.4)",
    mechanic: "C++ Wrapper Object Reference Handle",
    schematic: "PHASE: CAPTURING (1) -> AT_TARGET (2) -> BUBBLING (3)",
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

interface V8KineticEngine3DProps {
  activeId: string;
  onSelectSubsystem: (id: string) => void;
}

export default function V8KineticEngine3D({
  activeId,
  onSelectSubsystem
}: V8KineticEngine3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 12, y: -8 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -14;
    const tiltY = ((x - centerX) / centerX) * 16;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 10, y: -6 });
  }, []);

  const activeSubsystem = V8_SUBSYSTEMS.find((m) => m.id === activeId) || V8_SUBSYSTEMS[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-6 select-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-[1400px] cursor-crosshair"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: isHovered ? "transform 0.12s ease-out" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="relative w-full rounded-[32px] p-6 sm:p-8 bg-[#0b0d13] border border-white/[0.12] shadow-[0_32px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
              backgroundSize: "24px 24px, 48px 48px, 48px 48px"
            }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-clash font-bold text-sm shadow-md">
                V8
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-white tracking-wider block">
                  V8 RUNTIME CORE REACTOR · DIE 0x12
                </span>
                <span className="text-[11px] text-white/50 font-mono">
                  IGNITION INTERPRETER · TURBOFAN JIT · LIBUV EVENT RING
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-mono text-white/50">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>JIT HOT: OPTIMIZED</span>
              </div>
              <span className="hidden sm:inline">HEAP: 64-BIT TAGGED</span>
            </div>
          </div>

          <div className="mt-6 mb-6 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10" style={{ transformStyle: "preserve-3d" }}>
              {V8_SUBSYSTEMS.map((subsystem) => {
                const isSelected = subsystem.id === activeId;
                const Icon = SUBSYSTEM_ICONS[subsystem.id as keyof typeof SUBSYSTEM_ICONS] || Boxes;

                return (
                  <button
                    key={subsystem.id}
                    onClick={() => onSelectSubsystem(subsystem.id)}
                    style={{
                      transform: isSelected ? "translateZ(24px)" : "translateZ(4px)",
                      transformStyle: "preserve-3d",
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    className={`group relative text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#161a26]/90 border-white/30 shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.15)]"
                        : "bg-[#10131d]/60 border-white/[0.08] hover:border-white/20 hover:bg-[#131722]/80"
                    }`}
                  >
                    <div 
                      className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none opacity-20 blur-xl transition-opacity group-hover:opacity-40"
                      style={{ backgroundColor: subsystem.accent }}
                    />

                    <div className="flex items-center justify-between mb-2.5">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors"
                        style={{
                          backgroundColor: isSelected ? subsystem.accent : "rgba(255,255,255,0.05)",
                          borderColor: isSelected ? "transparent" : "rgba(255,255,255,0.1)",
                          color: isSelected ? (subsystem.id === "variables" ? "#000000" : "#ffffff") : "#94a3b8"
                        }}
                      >
                        <Icon size={14} />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-white/40 tracking-wider">
                          M{subsystem.index}
                        </span>
                        {isSelected && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: subsystem.accent }}
                          />
                        )}
                      </div>
                    </div>

                    <h3 className="font-clash font-semibold text-xs text-white mb-0.5 group-hover:text-white truncate">
                      {subsystem.name}
                    </h3>

                    <span className="text-[10px] text-white/50 block font-mono mb-2 truncate">
                      {subsystem.category}
                    </span>

                    <div className="p-1.5 rounded-md bg-black/40 border border-white/[0.06] mb-2.5">
                      <code className="text-[9px] font-mono text-amber-300/90 block truncate">
                        {subsystem.schematic}
                      </code>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.06] text-[9px] font-mono text-white/60">
                      <span className="truncate max-w-[120px]">{subsystem.subsystem.split("&")[0]}</span>
                      <span className="text-white/40 group-hover:text-white transition-colors shrink-0">→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div 
            style={{ transform: "translateZ(16px)", transformStyle: "preserve-3d" }}
            className="pt-5 border-t border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-20"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: activeSubsystem.accent }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-white tracking-wide">
                    ROUTED SUBSYSTEM: {activeSubsystem.name.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {activeSubsystem.subsystem}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 font-sans mt-0.5 line-clamp-1">
                  {activeSubsystem.tagline}
                </p>
              </div>
            </div>

            <a
              href={activeSubsystem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-clash font-semibold text-xs transition-all shadow-lg hover:brightness-110 active:scale-95 cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: activeSubsystem.accent,
                color: activeSubsystem.id === "variables" ? "#000000" : "#ffffff"
              }}
            >
              <span>Launch Dedicated Visualizer</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <span className="text-[11px] font-mono text-[#71717a] tracking-wider uppercase">
          ::: Spatial V8 Engine Telemetry Active · Hover console to tilt in 3D · Select module to route
        </span>
      </div>
    </div>
  );
}
