"use client";

import { motion } from "framer-motion";
import { Activity, Play, ArrowDown, Cpu, Zap, RefreshCw } from "lucide-react";

export function HeroScene() {
  const scrollToEngine = () => {
    document.getElementById("engine-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-8"
        >
          <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-300">
            Module 06 &middot; Concurrency Engine
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-40 h-40 mb-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-indigo-400/40 animate-[spin_8s_linear_infinite_reverse]" />
          <div className="absolute inset-6 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)]">
            <RefreshCw className="w-12 h-12 text-indigo-400 animate-[spin_6s_linear_infinite]" />
          </div>

          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.08]"
        >
          Asynchronous JS &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 drop-shadow-[0_0_50px_rgba(99,102,241,0.4)]">
            The Event Loop.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light mb-12"
        >
          JavaScript is strictly single-threaded, yet executes non-blocking I/O effortlessly. Witness the synchronized dance between the Call Stack, Web APIs, Microtasks, and Macrotasks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToEngine}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] cursor-pointer hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch Interactive Engine
          </button>

          <a
            href="#promise-stepping"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm transition-all backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-indigo-400" />
            Promise vs Timeout Stepper
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-20 pt-10 border-t border-white/10 text-left">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-mono text-indigo-400 uppercase mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Call Stack
            </div>
            <div className="text-sm font-semibold text-white">LIFO Execution</div>
            <div className="text-xs text-white/40 mt-1">Single frame at a time</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-mono text-sky-400 uppercase mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Web APIs
            </div>
            <div className="text-sm font-semibold text-white">C++ Multi-thread</div>
            <div className="text-xs text-white/40 mt-1">Timers, fetch, DOM events</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-mono text-purple-400 uppercase mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Microtask Queue
            </div>
            <div className="text-sm font-semibold text-white">VIP Priority</div>
            <div className="text-xs text-white/40 mt-1">Drains to completion</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-mono text-amber-400 uppercase mb-1 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Macrotask Queue
            </div>
            <div className="text-sm font-semibold text-white">Task Queue</div>
            <div className="text-xs text-white/40 mt-1">One task per tick</div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 text-white/30 cursor-pointer"
          onClick={scrollToEngine}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}
