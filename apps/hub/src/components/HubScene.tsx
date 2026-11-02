"use client";

import { motion } from "framer-motion";
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
  Binary
} from "lucide-react";
import { OnboardingTour } from "./OnboardingTour";

export function HubScene() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-amber-400/30 selection:text-amber-200">
      <OnboardingTour />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-[-10%] left-[-10%] w-[42%] h-[42%] rounded-full bg-amber-500/15 blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[50%] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[30%] w-[35%] h-[35%] rounded-full bg-cyan-500/10 blur-[180px] pointer-events-none mix-blend-screen" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-4xl mx-auto mb-20 md:mb-32 mt-12 md:mt-20"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors backdrop-blur-md mb-8 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-medium text-amber-200/80 uppercase tracking-widest">
              Interactive Tour &middot; JS Universe
            </span>
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="mx-auto mb-8 relative w-24 h-24 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-amber-500/25 rounded-2xl blur-xl" />
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
            >
              <path
                d="M50 8 L88 28 L88 72 L50 92 L12 72 L12 28 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                d="M50 8 L50 50 M88 28 L50 50 M88 72 L50 50 M50 92 L50 50 M12 72 L50 50 M12 28 L50 50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              <rect x="36" y="36" width="28" height="28" rx="6" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
              <text
                x="50"
                y="55"
                fontFamily="monospace"
                fontSize="16"
                fill="#FEF08A"
                fontWeight="900"
                textAnchor="middle"
              >
                JS
              </text>
            </svg>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.08]">
            JavaScript <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.4)]">
              Universe.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Stop memorizing syntax. Understand JavaScript down to the V8 memory heap, execution contexts, closures, call stack, and the event loop through cinematic interactive visualizers.
          </p>
        </motion.div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <a
            href="https://variables-pi.vercel.app/"
            className="group block md:col-span-2 lg:col-span-2 md:row-span-2 outline-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full min-h-[420px] flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_0_80px_rgba(245,158,11,0.18)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Binary strokeWidth={1.5} size={32} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider">Live Now</span>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400/80 mb-2">
                  Module 01 &middot; Foundations
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white group-hover:text-amber-100 transition-colors">
                  Variables &amp; Data Types
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  Stack vs Heap allocation, primitive immutability, reference pointer mutations, and dynamic type coercion inside the V8 engine.
                </p>
                <div className="inline-flex items-center gap-3 text-sm font-bold text-black bg-amber-300 px-6 py-3 rounded-full hover:bg-amber-200 transition-all shadow-[0_0_20px_rgba(253,224,71,0.3)]">
                  Explore Architecture <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rotate-[-6deg]">
                <Code2 size={260} strokeWidth={0.5} className="text-amber-300" />
              </div>
            </motion.div>
          </a>

          <a href="https://control-flow-ruby.vercel.app" className="block outline-none">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-rose-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <GitBranch strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400/80 mb-1">
                  Module 02
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-rose-300 transition-colors">
                  Control Flow &amp; Logic
                </h2>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  AST branch jumping, truthy/falsy bitmasks, switch jump tables, and short-circuit evaluation.
                </p>
              </div>
            </div>
          </a>

          <a href="https://functions-scope.vercel.app/" className="block outline-none">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-sky-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Layers strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-sky-500/30 bg-sky-500/10 text-sky-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400/80 mb-1">
                  Module 03
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-sky-300 transition-colors">
                  Functions &amp; Scope
                </h2>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  Lexical environments, execution context stack, closure retention, and the `this` binding mechanic.
                </p>
              </div>
            </div>
          </a>

          <a href="https://arrays-iteration.vercel.app/" className="block outline-none md:col-span-2 lg:col-span-1">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Database strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-1">
                  Module 04
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">
                  Arrays &amp; Iteration
                </h2>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  Contiguous memory offsets, amortized growth, in-place mutations, and functional pipeline mechanics.
                </p>
              </div>
            </div>
          </a>

          <a href="https://objects-maps.vercel.app/" className="block outline-none md:col-span-2 lg:col-span-1">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <LayoutGrid strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-purple-400/80 mb-1">
                  Module 05
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                  Objects &amp; Maps
                </h2>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  Hash maps, prototype chains, V8 Hidden Classes (Shapes), property descriptors, and garbage collection.
                </p>
              </div>
            </div>
          </a>

          <a href="https://async-event-loop.vercel.app" className="block outline-none md:col-span-2 lg:col-span-2">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Activity strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-400/80 mb-1">
                  Module 06
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">
                  Async JS &amp; The Event Loop
                </h2>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors max-w-sm">
                  Call stack execution, Web API delegation, Microtask queue (Promises), Task queue (timers), and event loop tick cycle.
                </p>
              </div>
            </div>
          </a>

          <a href="#dom-apis" className="block outline-none md:col-span-2 lg:col-span-1">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Globe strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-orange-500/30 bg-orange-500/10 text-orange-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Planned</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-orange-400/80 mb-1">
                  Module 07
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-orange-300 transition-colors">
                  DOM &amp; Browser APIs
                </h2>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  Browser render pipeline, reflow &amp; repaint cycles, event capturing/bubbling phases, and performance budgeting.
                </p>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
