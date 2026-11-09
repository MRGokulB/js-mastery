"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
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
  Compass
} from "lucide-react";
import { OnboardingTour } from "./OnboardingTour";

type Category = "all" | "runtime" | "logic" | "async";

interface ModuleSpec {
  id: string;
  moduleNumber: string;
  title: string;
  category: "runtime" | "logic" | "async";
  tagline: string;
  description: string;
  url: string;
  icon: typeof Binary;
  specs: string[];
  v8Subsystem: string;
  runtimeMechanic: string;
  isFeatured?: boolean;
  schematicType: "memory" | "ast" | "scope" | "array" | "shapes" | "eventloop" | "dom";
}

const MODULES: ModuleSpec[] = [
  {
    id: "variables",
    moduleNumber: "MOD_01",
    title: "Variables, Stack & Heap",
    category: "runtime",
    tagline: "Stack frames, V8 heap allocation, Smi representation, and reference pointers",
    description: "Inspect stack versus heap allocation, primitive immutability, 31-bit Smis (Small Integers), and reference pointer mutation within the V8 engine.",
    url: "https://variables-pi.vercel.app/",
    icon: Binary,
    specs: ["Stack vs Heap", "31-bit Smi Pointer Tagging", "Reference Mutability"],
    v8Subsystem: "V8 Memory Allocator & Garbage Collector",
    runtimeMechanic: "Contiguous Execution Frame Stack / Dynamic Heap Object",
    isFeatured: true,
    schematicType: "memory"
  },
  {
    id: "control-flow",
    moduleNumber: "MOD_02",
    title: "Control Flow & AST Branching",
    category: "logic",
    tagline: "AST branch jumping, truthy/falsy bitmasks, and short-circuit evaluation",
    description: "Observe AST branch node resolution, boolean coercion bitmasks, switch jump tables, and bytecode short-circuit short paths.",
    url: "https://control-flow-ruby.vercel.app",
    icon: GitBranch,
    specs: ["AST Branch Jump", "Bytecode Dispatch", "Short-Circuit Evaluation"],
    v8Subsystem: "Ignition Interpreter Bytecode Dispatcher",
    runtimeMechanic: "Conditional Branch Jump Offset Registers",
    schematicType: "ast"
  },
  {
    id: "functions-scope",
    moduleNumber: "MOD_03",
    title: "Functions, Scope & Closures",
    category: "logic",
    tagline: "Lexical environments, execution context stack, closure retention, and this binding",
    description: "Visualize execution context creation, outer lexical scope chaining, persistent heap closure retention, and call-site `this` resolution.",
    url: "https://functions-scope.vercel.app/",
    icon: Layers,
    specs: ["Lexical Environments", "Closure Heap Capture", "Call-Site This Binding"],
    v8Subsystem: "Context Resolver & Activation Records",
    runtimeMechanic: "Context Stack Linked Lexical Environment",
    schematicType: "scope"
  },
  {
    id: "arrays-iteration",
    moduleNumber: "MOD_04",
    title: "Arrays & Iteration Mechanics",
    category: "runtime",
    tagline: "Fast Smi Elements, holey arrays, amortized resizing, and functional pipelines",
    description: "Understand fast elements versus dictionary mode, holey array de-optimizations, amortized array capacity doubling, and iterator protocol pipelines.",
    url: "https://arrays-iteration.vercel.app/",
    icon: Database,
    specs: ["Fast Smi Elements", "Holey Array Avoidance", "Iterator Protocol"],
    v8Subsystem: "V8 Elements Transition Table",
    runtimeMechanic: "Contiguous Array Buffer (Indexed Smi Array)",
    schematicType: "array"
  },
  {
    id: "objects-maps",
    moduleNumber: "MOD_05",
    title: "Objects & V8 Hidden Classes",
    category: "runtime",
    tagline: "Hidden Classes (Shapes), inline caching, prototype delegation, and GC mark-sweep",
    description: "Demystify V8 hidden class (Shape) transitions, polymorphic inline cache hits, prototype lookup chains, and generational garbage collection.",
    url: "https://objects-maps.vercel.app/",
    icon: LayoutGrid,
    specs: ["V8 Hidden Classes (Shapes)", "Monomorphic Inline Caching", "Prototype Delegation"],
    v8Subsystem: "TurboFan JIT Type Feedback Vector",
    runtimeMechanic: "Transition Tree & Property Offset Table",
    schematicType: "shapes"
  },
  {
    id: "async-event-loop",
    moduleNumber: "MOD_06",
    title: "Async & The Event Loop",
    category: "async",
    tagline: "Call stack execution, Web API delegation, microtask drains, and macrotask timers",
    description: "Step through call stack execution, asynchronous Web API handover, microtask drain ticks, and macrotask starvation boundaries.",
    url: "https://async-event-loop.vercel.app",
    icon: Activity,
    specs: ["Microtask Drain Priority", "Event Loop Phase Ticks", "Timer Macrotask Queue"],
    v8Subsystem: "Libuv / Browser Event Loop Coordinator",
    runtimeMechanic: "Dual Queue (Microtask / Macrotask) Ring Scheduler",
    schematicType: "eventloop"
  },
  {
    id: "dom-apis",
    moduleNumber: "MOD_07",
    title: "DOM & Browser Rendering Pipeline",
    category: "async",
    tagline: "Critical rendering path, reflow & layout thrashing, GPU layers, and 3-phase events",
    description: "Trace HTML/CSS parsing, render tree layout geometry, paint invalidation, GPU layer compositing, and capturing/bubbling event dispatch.",
    url: "https://dom-apis.vercel.app",
    icon: Globe,
    specs: ["Critical Rendering Path", "GPU Layer Compositing", "3-Phase Event Propagation"],
    v8Subsystem: "Blink Layout & Rendering Engine",
    runtimeMechanic: "Render Tree & Paint Layer Tree Compositor",
    schematicType: "dom"
  }
];

export function HubScene() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredModules = MODULES.filter(
    (mod) => activeCategory === "all" || mod.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f2f4f8] selection:bg-amber-500/20 selection:text-white font-sans antialiased relative">
      <OnboardingTour />

      {/* Engineering Precision Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(245,158,11,0.06),transparent_80%)]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
              JS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-white">JAVASCRIPT UNIVERSE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                  v2.2
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
              <span>Engine Tour</span>
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

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.06] text-amber-300 text-xs font-mono mb-8">
            <Cpu size={13} />
            <span>V8 ENGINE INTERNALS &middot; RUNTIME SCHEDULER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Understand JavaScript <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Down to V8 Bytecode &amp; Memory.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            Beyond language syntax. Model JavaScript at the metal: execution context stacks, pointer mutations, Hidden Class (Shape) transitions, microtask queue drains, and the browser rendering pipeline.
          </p>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto p-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm text-left">
            <div className="p-3 border-r border-white/[0.06] last:border-r-0">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Engine Core</span>
              <span className="font-mono text-sm font-semibold text-zinc-200">V8 v12+ Architecture</span>
            </div>
            <div className="p-3 border-r border-white/[0.06] last:border-r-0">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">JIT Pipeline</span>
              <span className="font-mono text-sm font-semibold text-amber-300">Ignition &amp; TurboFan</span>
            </div>
            <div className="p-3 border-r border-white/[0.06] last:border-r-0">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Queue Model</span>
              <span className="font-mono text-sm font-semibold text-emerald-400">Microtask Strict Drain</span>
            </div>
            <div className="p-3">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Monorepo Modules</span>
              <span className="font-mono text-sm font-semibold text-zinc-200">7 Standalone Apps</span>
            </div>
          </div>
        </section>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-amber-400" />
            <h2 className="text-sm font-mono font-semibold tracking-wider text-white uppercase">Engine Modules</h2>
            <span className="font-mono text-xs text-zinc-500">({filteredModules.length} Active)</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/[0.08] bg-white/[0.02]">
            {(
              [
                { id: "all", label: "All Modules" },
                { id: "runtime", label: "Runtime & Memory" },
                { id: "logic", label: "Control & Scope" },
                { id: "async", label: "Async & DOM" }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === tab.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredModules.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`group relative rounded-2xl border border-white/[0.08] bg-[#0c0d12] hover:bg-[#111218] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.35)] ${
                    item.isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-amber-300 group-hover:scale-105 group-hover:border-amber-500/30 transition-all">
                            <Icon size={20} strokeWidth={1.7} />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-zinc-500 tracking-wider block">{item.moduleNumber}</span>
                            <span className="font-mono text-xs text-zinc-300 capitalize">{item.category} System</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>ONLINE</span>
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Architectural Schematic Preview */}
                      <div className="mb-6 p-3.5 rounded-xl border border-white/[0.06] bg-[#08090d] font-mono text-[11px] text-zinc-400">
                        {item.schematicType === "memory" && (
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 border-b border-white/[0.05] pb-1">
                              <span>V8 STACK FRAME (L1)</span>
                              <span className="text-amber-400">HEAP POINTER 0x1A04</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                              <div className="p-2 rounded border border-white/[0.08] bg-white/[0.02]">
                                <div className="text-zinc-500 mb-1">Stack (Primitive)</div>
                                <div className="text-zinc-200 font-bold">let count = 42 (Smi)</div>
                              </div>
                              <div className="p-2 rounded border border-amber-500/30 bg-amber-500/10 text-amber-200 font-bold">
                                <div className="text-zinc-400 mb-1">Heap Reference</div>
                                <div>userPtr → HeapObject</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.schematicType === "ast" && (
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-zinc-500">AST_BRANCH_NODE</span>
                            <span className="text-zinc-300">Test: (val &amp; 0x01) ? Jump_L1 : Fallthrough</span>
                          </div>
                        )}

                        {item.schematicType === "scope" && (
                          <div className="space-y-1 text-[10px]">
                            <div className="flex justify-between text-zinc-500">
                              <span>Lexical Environment Record</span>
                              <span className="text-amber-300">Closure Retained</span>
                            </div>
                            <div className="p-1 rounded border border-white/[0.06] bg-white/[0.02] text-zinc-300 text-center">
                              [[Scopes]]: [Closure(makeCounter), Global]
                            </div>
                          </div>
                        )}

                        {item.schematicType === "array" && (
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-zinc-500">PACKED_SMI_ELEMENTS</span>
                            <span className="text-emerald-400">Contiguous No-Hole Array</span>
                          </div>
                        )}

                        {item.schematicType === "shapes" && (
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-zinc-500">V8 Shape Map Transition</span>
                            <span className="text-amber-300">Map_0 → Add('x') → Map_1</span>
                          </div>
                        )}

                        {item.schematicType === "eventloop" && (
                          <div className="grid grid-cols-3 gap-1 text-center text-[9px]">
                            <div className="p-1 rounded border border-white/[0.06] bg-white/[0.02] text-zinc-400">Call Stack</div>
                            <div className="p-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-300">Microtasks (P0)</div>
                            <div className="p-1 rounded border border-white/[0.06] bg-white/[0.02] text-zinc-500">Timers (P1)</div>
                          </div>
                        )}

                        {item.schematicType === "dom" && (
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-zinc-500">Render Pipeline</span>
                            <span className="text-zinc-300">DOM → CSSOM → RenderTree → GPU</span>
                          </div>
                        )}
                      </div>

                      {/* Technical Specs Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/[0.06] bg-white/[0.02] text-zinc-400"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500">{item.v8Subsystem}</div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-xs">{item.runtimeMechanic}</div>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shrink-0 shadow-sm"
                      >
                        <span>Launch</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Engineering Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050608] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>JAVASCRIPT UNIVERSE &middot; V8 HARDWARE RUNTIME</span>
          </div>
          <div>Engineered for Deep System Understanding</div>
        </div>
      </footer>
    </div>
  );
}
