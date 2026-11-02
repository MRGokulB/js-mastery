"use client";

import { useEffect, useRef } from "react";
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
import gsap from "gsap";
import { OnboardingTour } from "./OnboardingTour";

export function HubScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".hub-bento-card", {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.25
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-white/20 selection:text-white">
      <OnboardingTour />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-white/[0.03] blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-indigo-900/[0.07] blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[25%] w-[40%] h-[40%] rounded-full bg-white/[0.02] blur-[180px] pointer-events-none mix-blend-screen" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-4xl mx-auto mb-20 md:mb-28 mt-12 md:mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all backdrop-blur-md mb-8 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-[11px] font-mono font-medium text-zinc-300 uppercase tracking-widest">
              Interactive Tour &middot; JS Universe
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mx-auto mb-8 relative w-20 h-20 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white/[0.04] rounded-2xl blur-lg" />
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-zinc-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <path
                d="M50 8 L88 28 L88 72 L50 92 L12 72 L12 28 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M50 8 L50 50 M88 28 L50 50 M88 72 L50 50 M50 92 L50 50 M12 72 L50 50 M12 28 L50 50"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              <rect x="36" y="36" width="28" height="28" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
              <text
                x="50"
                y="55"
                fontFamily="monospace"
                fontSize="15"
                fill="#f4f4f5"
                fontWeight="700"
                textAnchor="middle"
              >
                JS
              </text>
            </svg>
          </motion.div>

          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]">
            JavaScript <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400">
              Universe.
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            Stop memorizing syntax. Understand JavaScript down to the V8 memory heap, execution contexts, closures, call stack, and the event loop through cinematic interactive visualizers.
          </p>
        </motion.div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          <motion.a
            href="https://variables-pi.vercel.app/"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card group block md:col-span-2 lg:col-span-2 md:row-span-2 outline-none"
          >
            <div className="relative h-full min-h-[400px] flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-white/[0.1] bg-[#09090b]/90 backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <div className="relative z-10 flex justify-between items-start mb-12">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white group-hover:scale-105 transition-transform duration-300">
                  <Binary strokeWidth={1.5} size={28} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-medium uppercase tracking-wider">Live Now</span>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  Module 01 &middot; Foundations
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white group-hover:text-zinc-100 transition-colors">
                  Variables &amp; Data Types
                </h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light">
                  Stack vs Heap allocation, primitive immutability, reference pointer mutations, and dynamic type coercion inside the V8 engine.
                </p>
                <div className="inline-flex items-center gap-2.5 text-xs font-semibold text-black bg-white px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors">
                  Explore Architecture <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>

              <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none rotate-[-6deg]">
                <Code2 size={240} strokeWidth={0.5} className="text-white" />
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://control-flow-ruby.vercel.app"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card block outline-none"
          >
            <div className="group relative p-6 md:p-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl overflow-hidden hover:bg-[#101014] hover:border-white/20 transition-all duration-300 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <GitBranch strokeWidth={1.5} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Module 02
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-100 transition-colors">
                  Control Flow &amp; Logic
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light">
                  AST branch jumping, truthy/falsy bitmasks, switch jump tables, and short-circuit evaluation.
                </p>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://functions-scope.vercel.app/"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card block outline-none"
          >
            <div className="group relative p-6 md:p-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl overflow-hidden hover:bg-[#101014] hover:border-white/20 transition-all duration-300 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Layers strokeWidth={1.5} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Module 03
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-100 transition-colors">
                  Functions &amp; Scope
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light">
                  Lexical environments, execution context stack, closure retention, and the `this` binding mechanic.
                </p>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://arrays-iteration.vercel.app/"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card block outline-none md:col-span-2 lg:col-span-1"
          >
            <div className="group relative p-6 md:p-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl overflow-hidden hover:bg-[#101014] hover:border-white/20 transition-all duration-300 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Database strokeWidth={1.5} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Module 04
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-100 transition-colors">
                  Arrays &amp; Iteration
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light">
                  Contiguous memory offsets, amortized growth, in-place mutations, and functional pipeline mechanics.
                </p>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://objects-maps.vercel.app/"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card block outline-none md:col-span-2 lg:col-span-1"
          >
            <div className="group relative p-6 md:p-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl overflow-hidden hover:bg-[#101014] hover:border-white/20 transition-all duration-300 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <LayoutGrid strokeWidth={1.5} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Module 05
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-100 transition-colors">
                  Objects &amp; Maps
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light">
                  Hash maps, prototype chains, V8 Hidden Classes (Shapes), property descriptors, and garbage collection.
                </p>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://async-event-loop.vercel.app"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card block outline-none md:col-span-2 lg:col-span-2"
          >
            <div className="group relative p-6 md:p-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl overflow-hidden hover:bg-[#101014] hover:border-white/20 transition-all duration-300 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Activity strokeWidth={1.5} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Module 06
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-100 transition-colors">
                  Async JS &amp; The Event Loop
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light max-w-sm">
                  Call stack execution, Web API delegation, Microtask queue (Promises), Task queue (timers), and event loop tick cycle.
                </p>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://dom-apis.vercel.app"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hub-bento-card block outline-none md:col-span-2 lg:col-span-2"
          >
            <div className="group relative p-6 md:p-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl overflow-hidden hover:bg-[#101014] hover:border-white/20 transition-all duration-300 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Globe strokeWidth={1.5} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Live</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Module 07
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-100 transition-colors">
                  The DOM &amp; Browser APIs
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light max-w-sm">
                  Critical rendering path, reflow &amp; layout thrashing, GPU compositing, 3-phase event propagation, and virtual DOM diffing.
                </p>
              </div>
            </div>
          </motion.a>
        </div>
      </main>
    </div>
  );
}
