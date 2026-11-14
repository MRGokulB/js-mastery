"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Workflow,
  Code2,
  Zap,
  CheckCircle2,
  Sliders,
  Play,
  Grid,
  X
} from "lucide-react";
import V8EngineCore3D, { V8_MODULE_SYSTEMS, V8ModuleMeta } from "./V8EngineCore3D";
import { OnboardingTour } from "./OnboardingTour";

const SYSTEM_ICONS = {
  variables: Layers,
  "control-flow": Workflow,
  "functions-scope": Code2,
  "arrays-iteration": Cpu,
  "objects-maps": Terminal,
  "async-event-loop": Activity,
  "dom-apis": Layers
};

function SystemBentoCard({ item, IconComp }: { item: V8ModuleMeta; IconComp: any }) {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-5 rounded-2xl cyber-glass-card hover:border-cyan-400/50 hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 75%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}`, color: `${item.accent}` }}
          >
            <IconComp size={16} />
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
            SYS {item.index}
          </span>
        </div>

        <h3 className="font-bold text-base text-white mb-1 group-hover:text-amber-400 transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          {item.tagline}
        </p>

        <div className="py-1.5 px-2.5 rounded-lg bg-black/40 border border-white/10 text-[10.5px] font-mono text-slate-300 mb-3 flex items-center justify-between">
          <span className="truncate">{item.subsystem}</span>
          <span className="text-[10px] text-amber-400 font-bold">{item.category}</span>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-slate-200">
        <span>Launch Module</span>
        <ArrowUpRight
          size={13}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-400"
        />
      </div>
    </motion.a>
  );
}

export function HubScene() {
  const [selectedId, setSelectedId] = useState<string>("variables");
  const [showCatalogModal, setShowCatalogModal] = useState(false);

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === selectedId) || V8_MODULE_SYSTEMS[0];
  }, [selectedId]);

  return (
    <div className="h-screen w-screen max-h-screen bg-[#080b14] dot-matrix-bg text-slate-100 font-cabinet selection:bg-amber-500/30 selection:text-white flex flex-col justify-between overflow-hidden relative">
      <OnboardingTour />

      <div className="aurora-orb w-[480px] h-[480px] bg-violet-600/30 top-[-100px] left-[10%]" />
      <div className="aurora-orb w-[440px] h-[440px] bg-cyan-500/25 top-[25%] right-[8%] [animation-delay:4s]" />
      <div className="aurora-orb w-[380px] h-[380px] bg-amber-500/20 bottom-[-80px] left-[40%] [animation-delay:8s]" />

      <header className="h-16 shrink-0 border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl z-50 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center shadow-md border border-slate-700/60 relative overflow-hidden group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
              <path d="M12 2.5L20.2 7.25V16.75L12 21.5L3.8 16.75V7.25Z" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2.5V7.8" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M12 16.2V21.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M20.2 7.25L16.2 9.6" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M20.2 16.75L16.2 14.4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M3.8 16.75L7.8 14.4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M3.8 7.25L7.8 9.6" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="7.8" y="7.8" width="8.4" height="8.4" rx="2.2" fill="#090d16" stroke="#475569" strokeWidth="1.1" />
              <text x="12" y="14.1" textAnchor="middle" fill="#ffffff" fontSize="5.8" fontWeight="800" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="-0.2px">JS</text>
            </svg>
          </div>
          <div>
            <span className="font-bold text-xs tracking-tight text-white block leading-tight">
              JAVASCRIPT UNIVERSE
            </span>
            <span className="text-[10px] text-slate-400 font-mono block font-normal leading-tight">
              V8 Engine Architecture &amp; Runtime Visualizer
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
          {V8_MODULE_SYSTEMS.map((mod) => {
            const isSelected = selectedId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedId(mod.id)}
                className={`relative px-2.5 py-1 rounded-lg text-xs font-bold font-cabinet transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute inset-0 bg-white/15 border border-white/20 rounded-lg shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                    style={{ backgroundColor: mod.accent, color: mod.accent }}
                  />
                  <span>0{mod.index} · {mod.shortTitle}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>V8 // TURBOFAN JIT ONLINE</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowCatalogModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-slate-200 cursor-pointer shadow-xs"
          >
            <Grid size={13} className="text-amber-400" />
            <span className="hidden sm:inline">Modules</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-slate-200 cursor-pointer shadow-xs"
          >
            <Sparkles size={13} className="text-amber-400" />
            <span>Tour</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://github.com/MRGokulB/js-mastery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-slate-200 shadow-xs"
            aria-label="GitHub Repository"
          >
            <Code2 size={13} />
            <span className="hidden sm:inline">Source ↗</span>
          </motion.a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col justify-center relative z-10">
        <V8EngineCore3D
          activeId={selectedId}
          onSelectModule={(id) => setSelectedId(id)}
        />
      </main>

      <footer className="h-10 shrink-0 border-t border-white/10 bg-[#0b0f19]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <span className="font-bold text-white font-cabinet">JavaScript Universe</span>
          <span>&copy; 2026 &middot; V8 Architecture &amp; Runtime Engine</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Ignition Interpreter &amp; TurboFan JIT Simulator</span>
          <button
            onClick={() => setShowCatalogModal(true)}
            className="text-amber-400 hover:underline font-bold cursor-pointer"
          >
            View All 7 Modules &rarr;
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {showCatalogModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowCatalogModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e1424] rounded-[24px] border border-white/10 shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                    SYSTEM DIRECTORY
                  </span>
                  <h2 className="text-2xl font-bold font-cabinet text-white">
                    All 7 V8 Engine Modules
                  </h2>
                </div>
                <button
                  onClick={() => setShowCatalogModal(false)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {V8_MODULE_SYSTEMS.map((item) => {
                  const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
                  return (
                    <SystemBentoCard
                      key={item.id}
                      item={item}
                      IconComp={IconComp}
                    />
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
