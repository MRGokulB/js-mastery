"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Sparkles,
  Layers,
  GitBranch,
  Database,
  LayoutGrid,
  Activity,
  Globe,
  Binary,
  Cpu,
  Terminal,
  RotateCcw,
  Grip,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import { OnboardingTour } from "./OnboardingTour";

interface JSModule {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  url: string;
  icon: typeof Binary;
  accent: string;
  borderAccent: string;
  bgAccent: string;
  v8Subsystem: string;
  runtimeMechanic: string;
  keyTopics: string[];
  schematic: string;
}

const MODULES: JSModule[] = [
  {
    id: "variables",
    num: "01",
    name: "Variables & Memory",
    subtitle: "Stack, Heap & Smi Pointers",
    tagline: "V8 memory allocation & reference pointers",
    description: "Inspect stack vs heap allocation, primitive immutability, 31-bit Smis (Small Integers), and reference pointer mutations within the V8 engine.",
    url: "https://variables-pi.vercel.app/",
    icon: Binary,
    accent: "#f59e0b",
    borderAccent: "rgba(245,158,11,0.4)",
    bgAccent: "rgba(245,158,11,0.08)",
    v8Subsystem: "V8 Memory Allocator & Scavenger GC",
    runtimeMechanic: "Contiguous Stack Frame / Heap Pointer Allocation",
    keyTopics: ["Stack vs Heap", "31-bit Smi Tagging", "Pointer Mutability"],
    schematic: "Stack: ptr_0x1A → Heap: Object { id: 101 }"
  },
  {
    id: "control-flow",
    num: "02",
    name: "Control Flow",
    subtitle: "AST Branching & Short Paths",
    tagline: "Ignition interpreter jump registers",
    description: "Observe AST branch node resolution, boolean coercion bitmasks, switch jump tables, and bytecode short-circuit short paths.",
    url: "https://control-flow-ruby.vercel.app",
    icon: GitBranch,
    accent: "#10b981",
    borderAccent: "rgba(16,185,129,0.4)",
    bgAccent: "rgba(16,185,129,0.08)",
    v8Subsystem: "Ignition Bytecode Dispatcher",
    runtimeMechanic: "Conditional Branch Jump Offset Registers",
    keyTopics: ["AST Branch Jump", "Bytecode Dispatch", "Short-Circuit"],
    schematic: "AST_BRANCH → (val & 0x01) ? Jump_L1 : Fallthrough"
  },
  {
    id: "functions-scope",
    num: "03",
    name: "Functions & Scope",
    subtitle: "Context Stacks & Closures",
    tagline: "Lexical environments & persistent closures",
    description: "Visualize execution context creation, outer lexical scope chaining, persistent heap closure retention, and call-site this resolution.",
    url: "https://functions-scope.vercel.app/",
    icon: Layers,
    accent: "#6366f1",
    borderAccent: "rgba(99,102,241,0.4)",
    bgAccent: "rgba(99,102,241,0.08)",
    v8Subsystem: "Context Resolver & Activation Records",
    runtimeMechanic: "Context Stack Linked Lexical Environment",
    keyTopics: ["Lexical Scope", "Closure Retention", "This Binding"],
    schematic: "[[Scopes]]: [Closure(outer), Global]"
  },
  {
    id: "arrays-iteration",
    num: "04",
    name: "Arrays & Iteration",
    subtitle: "Fast Elements & Buffers",
    tagline: "V8 Fast Elements transition tables",
    description: "Understand packed Smi elements vs dictionary mode, holey array de-optimizations, amortized capacity doubling, and iterator protocol pipelines.",
    url: "https://arrays-iteration.vercel.app/",
    icon: Database,
    accent: "#06b6d4",
    borderAccent: "rgba(6,182,212,0.4)",
    bgAccent: "rgba(6,182,212,0.08)",
    v8Subsystem: "V8 Elements Transition Table",
    runtimeMechanic: "Indexed Fast Contiguous Int32 Array Buffer",
    keyTopics: ["Fast Elements", "Holey Deopt Avoidance", "Iterator Protocol"],
    schematic: "PACKED_SMI_ELEMENTS (Zero-Hole Buffer)"
  },
  {
    id: "objects-maps",
    num: "05",
    name: "Objects & Shapes",
    subtitle: "Hidden Classes & Inline Caches",
    tagline: "TurboFan JIT type feedback vectors",
    description: "Demystify V8 hidden class (Shape) transitions, polymorphic inline cache hits, prototype lookup chains, and generational garbage collection.",
    url: "https://objects-maps.vercel.app/",
    icon: LayoutGrid,
    accent: "#a855f7",
    borderAccent: "rgba(168,85,247,0.4)",
    bgAccent: "rgba(168,85,247,0.08)",
    v8Subsystem: "TurboFan JIT Type Feedback Vector",
    runtimeMechanic: "Shape Transition Tree & Property Offset Table",
    keyTopics: ["Hidden Classes", "Monomorphic IC", "Prototype Chains"],
    schematic: "Map_0 → Add('prop') → Transition Map_1"
  },
  {
    id: "async-event-loop",
    num: "06",
    name: "Async & Event Loop",
    subtitle: "Microtasks, Macrotasks & Ticks",
    tagline: "Libuv event loop phase execution",
    description: "Step through call stack execution, asynchronous Web API handover, microtask drain ticks, and macrotask timer starvation boundaries.",
    url: "https://async-event-loop.vercel.app",
    icon: Activity,
    accent: "#f43f5e",
    borderAccent: "rgba(244,63,94,0.4)",
    bgAccent: "rgba(244,63,94,0.08)",
    v8Subsystem: "Libuv / Browser Event Loop Coordinator",
    runtimeMechanic: "Dual Priority Queue Ring Scheduler",
    keyTopics: ["Microtask Priority", "Event Loop Tick", "Timer Queues"],
    schematic: "CallStack [Sync] → Microtasks [P0] → Timers [P1]"
  },
  {
    id: "dom-apis",
    num: "07",
    name: "DOM & Render Tree",
    subtitle: "Layout Geometry & GPU Layers",
    tagline: "Blink critical rendering path pipeline",
    description: "Trace HTML/CSS parsing, render tree layout geometry, paint invalidation, GPU layer compositing, and capturing/bubbling event dispatch.",
    url: "https://dom-apis.vercel.app",
    icon: Globe,
    accent: "#0ea5e9",
    borderAccent: "rgba(14,165,233,0.4)",
    bgAccent: "rgba(14,165,233,0.08)",
    v8Subsystem: "Blink Layout & Rendering Compositor",
    runtimeMechanic: "Render Tree & Paint Layer Tree Compositor",
    keyTopics: ["Critical Render Path", "GPU Compositing", "Event Bubbling"],
    schematic: "DOM + CSSOM → RenderTree → Layout → GPU Composite"
  }
];

const RADIUS = 290;
const STEP_ANGLE = 360 / MODULES.length;

export function HubScene() {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const reduced = useReducedMotion();

  const yaw = useMotionValue(0);
  const pitch = useMotionValue(8);
  const springYaw = useSpring(yaw, { stiffness: 140, damping: 26 });
  const springPitch = useSpring(pitch, { stiffness: 140, damping: 26 });

  const pointerRef = useRef<{
    startX: number;
    startY: number;
    startYaw: number;
    startPitch: number;
    moved: boolean;
  } | null>(null);

  const activeModule = MODULES[active];

  // Rotate to specific module
  const selectModule = (index: number) => {
    setActive(index);
    setAutoRotate(false);
    const targetAngle = -index * STEP_ANGLE;
    yaw.set(targetAngle);
    pitch.set(8);
  };

  const handleNext = () => {
    selectModule((active + 1) % MODULES.length);
  };

  const handlePrev = () => {
    selectModule((active - 1 + MODULES.length) % MODULES.length);
  };

  // Pointer drag for 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reduced || e.button !== 0) return;
    pointerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startYaw: yaw.get(),
      startPitch: pitch.get(),
      moved: false
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    const dx = e.clientX - pointerRef.current.startX;
    const dy = e.clientY - pointerRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      pointerRef.current.moved = true;
    }
    yaw.set(pointerRef.current.startYaw + dx * 0.4);
    pitch.set(Math.max(-20, Math.min(25, pointerRef.current.startPitch - dy * 0.25)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    setIsDragging(false);
    if (pointerRef.current.moved) {
      const currentYaw = yaw.get();
      const rawIndex = Math.round(-currentYaw / STEP_ANGLE);
      const normalizedIndex = ((rawIndex % MODULES.length) + MODULES.length) % MODULES.length;
      setActive(normalizedIndex);
    }
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    pointerRef.current = null;
  };

  // Idle rotation effect
  useEffect(() => {
    if (!autoRotate || reduced || isDragging) return;
    const interval = setInterval(() => {
      yaw.set(yaw.get() - 0.4);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, reduced, isDragging, yaw]);

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f4f5f8] font-sans antialiased relative selection:bg-amber-500/20 selection:text-white overflow-x-hidden">
      <OnboardingTour />

      {/* Engineering Precision Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(245,158,11,0.06),transparent_70%)]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
              JS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-white">JAVASCRIPT UNIVERSE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                  SPATIAL 3D
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 hidden sm:block">V8 Runtime Internals &amp; Memory Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Interactive Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/js-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main 3D Experience */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Top Hero Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/[0.06] text-amber-300 text-[11px] font-mono mb-4">
            <Terminal size={12} />
            <span>INTERACTIVE 3D V8 RUNTIME CORE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            V8 Engine Mechanics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              In Spatial 3D Dimensions.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-normal">
            Drag the 3D V8 engine core in space. Explore execution contexts, stack allocations, Hidden Class (Shape) transitions, and the event loop.
          </p>
        </div>

        {/* 3D Core Stage & HUD Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Active Module Frosted Glass HUD */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-white/[0.12] bg-[#0c0d14]/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
              >
                {/* Accent glow corner */}
                <div
                  className="absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-25"
                  style={{ background: activeModule.accent }}
                />

                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        background: activeModule.bgAccent,
                        borderColor: activeModule.borderAccent,
                        color: activeModule.accent
                      }}
                    >
                      <activeModule.icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                        MODULE {activeModule.num}
                      </span>
                      <span className="font-mono text-xs font-semibold text-zinc-300">
                        {activeModule.name}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                  {activeModule.subtitle}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                  {activeModule.description}
                </p>

                {/* Algorithmic Blueprint Box */}
                <div className="p-3 rounded-xl border border-white/[0.08] bg-[#07080c] font-mono text-xs text-zinc-300 mb-6">
                  <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Engine Schematic</div>
                  <div className="text-amber-300 truncate font-semibold">{activeModule.schematic}</div>
                </div>

                {/* Specs Pill List */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1.5 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Subsystem</span>
                    <span className="text-zinc-200 truncate max-w-[190px]">{activeModule.v8Subsystem}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1.5 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Mechanic</span>
                    <span className="text-zinc-200 truncate max-w-[190px]">{activeModule.runtimeMechanic}</span>
                  </div>
                </div>

                {/* CTA Action Button */}
                <a
                  href={activeModule.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md group"
                >
                  <span>Explore V8 Architecture</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Traversal Controls */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                      aria-label="Previous Module"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                      aria-label="Next Module"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => selectModule(0)}
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <RotateCcw size={12} />
                    <span>Reset Angle</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: 3D Engine Ring Stage */}
          <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
            <div
              className={`w-full max-w-2xl h-[420px] sm:h-[480px] flex items-center justify-center perspective-stage relative select-none touch-none cursor-grab ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Subtle Ground Radial Glow */}
              <div
                className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: activeModule.accent }}
              />

              {/* 3D Ring Container */}
              <motion.div
                className="preserve-3d relative w-[210px] h-[270px] flex items-center justify-center"
                style={{
                  rotateY: reduced ? 0 : springYaw,
                  rotateX: reduced ? 0 : springPitch
                }}
              >
                {MODULES.map((mod, idx) => {
                  const Icon = mod.icon;
                  const angle = idx * STEP_ANGLE;
                  const isCurrent = active === idx;

                  return (
                    <motion.div
                      key={mod.id}
                      className={`absolute inset-0 rounded-2xl preserve-3d border backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#11121c]/95 border-white/[0.3] shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                          : "bg-[#0c0d14]/75 border-white/[0.08] hover:border-white/[0.2] opacity-80"
                      }`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) ${
                          isCurrent ? "scale3d(1.08, 1.08, 1.08)" : ""
                        }`,
                        boxShadow: isCurrent ? `0 0 30px ${mod.bgAccent}` : undefined
                      }}
                      onClick={() => selectModule(idx)}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center border text-sm"
                          style={{
                            background: mod.bgAccent,
                            borderColor: mod.borderAccent,
                            color: mod.accent
                          }}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500 font-bold">
                          {mod.num}
                        </span>
                      </div>

                      {/* Card Center Info */}
                      <div className="my-auto">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                          V8 SUBSYSTEM
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {mod.name}
                        </h3>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                          {mod.tagline}
                        </p>
                      </div>

                      {/* Card Mini Footprint */}
                      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-zinc-500">
                        <span>{mod.keyTopics[0]}</span>
                        <span
                          className="font-bold"
                          style={{ color: mod.accent }}
                        >
                          EXPLORE ↗
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Interaction Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 px-2 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Grip size={14} />
                <span>Drag in 3D to spin engine modules</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all flex items-center gap-1.5 ${
                    autoRotate
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                      : "border-white/[0.08] hover:bg-white/[0.04] text-zinc-400"
                  }`}
                >
                  <Play size={11} className={autoRotate ? "animate-spin" : ""} />
                  <span>Auto-Orbit</span>
                </button>
              </div>
            </div>

            {/* Quick Module Chip Navigator */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-6">
              {MODULES.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => selectModule(idx)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                    active === idx
                      ? "bg-white text-black font-semibold border-white shadow-sm"
                      : "bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: mod.accent }}
                  />
                  <span>{mod.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Section Below 3D Hero */}
        <section className="pt-16 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-mono font-semibold tracking-wider text-white uppercase">
                All 7 V8 Engine Systems
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Hardware-conscious learning architecture for JavaScript engineering
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">7 MODULES DEPLOYED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    selectModule(idx);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="group p-5 rounded-2xl border border-white/[0.06] bg-[#0a0b10] hover:bg-[#0e0f16] hover:border-white/[0.14] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border text-xs"
                        style={{
                          background: mod.bgAccent,
                          borderColor: mod.borderAccent,
                          color: mod.accent
                        }}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold">{mod.num}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                      {mod.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {mod.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{mod.v8Subsystem.split("&")[0]}</span>
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      View in 3D →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050608] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>JAVASCRIPT UNIVERSE &middot; SPATIAL 3D V8 ENGINE CORE</span>
          </div>
          <div>Engineered for Deep System Understanding</div>
        </div>
      </footer>
    </div>
  );
}
