"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Compass, Sparkles, Cpu } from "lucide-react";

export function HeroScene() {
  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-20">
        <div className="w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl ml-40 -mt-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex items-center justify-center relative"
        >
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-xl pointer-events-none" />
          <div className="w-20 h-20 rounded-2xl bg-slate-950 flex items-center justify-center shadow-2xl border border-slate-700/80 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
            <svg width="46" height="46" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              <defs>
                <linearGradient id="heroLogoGold" x1="120" y1="120" x2="390" y2="390" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FEF08A"/>
                  <stop offset="35%" stopColor="#F59E0B"/>
                  <stop offset="100%" stopColor="#D97706"/>
                </linearGradient>
              </defs>
              <path d="M216 150 V315 C216 358 190 382 146 382 C120 382 98 372 84 358 L108 318 C118 326 130 334 146 334 C164 334 172 322 172 304 V150 H216 Z" fill="url(#heroLogoGold)"/>
              <path d="M394 212 C394 168 360 144 306 144 C256 144 222 168 218 206 L260 214 C264 192 282 182 306 182 C330 182 350 192 350 208 C350 222 340 230 312 238 L284 246 C242 258 220 280 220 316 C220 358 256 384 310 384 C364 384 400 358 404 318 L360 310 C356 334 336 346 310 346 C284 346 264 336 264 318 C264 304 274 296 300 288 L328 280 C372 268 394 246 394 212 Z" fill="url(#heroLogoGold)"/>
              <circle cx="396" cy="146" r="22" fill="#FEF08A"/>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase">
            01 &bull; Runtime Architecture
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.08]"
        >
          Variables, Memory &amp;
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-300 dark:via-orange-400 dark:to-amber-500">
            Runtime Architecture
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-12 leading-relaxed font-light"
        >
          Demystify JavaScript data structures from first principles. Watch the V8 engine allocate 64-bit registers in the Call Stack, dereference heap pointers, enforce the Temporal Dead Zone, and sweep orphaned memory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToChapter("scene-analogies")}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Code2 className="w-4 h-4" />
            Begin Architectural Journey
          </button>

          <button
            onClick={() => scrollToChapter("scene-memory")}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
          >
            <Cpu className="w-4 h-4 text-amber-500" />
            Jump to Stack vs Heap Studio
          </button>
        </motion.div>
      </div>

      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => scrollToChapter("scene-analogies")}
        className="mt-16 text-slate-400 hover:text-amber-500 transition-colors p-2 cursor-pointer"
        aria-label="Scroll to Analogies chapter"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
