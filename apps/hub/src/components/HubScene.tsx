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
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-2xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}`, color: `${item.accent}` }}
          >
            <IconComp size={16} />
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
            SYS {item.index}
          </span>
        </div>

        <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed mb-3">
          {item.tagline}
        </p>

        <div className="py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10.5px] font-mono text-slate-600 mb-3 flex items-center justify-between">
          <span className="truncate">{item.subsystem}</span>
          <span className="text-[10px] text-amber-700 font-bold">{item.category}</span>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-900">
        <span>Launch Module</span>
        <ArrowUpRight
          size={13}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-600"
        />
      </div>
    </a>
  );
}

export function HubScene() {
  const [selectedId, setSelectedId] = useState<string>("variables");
  const [showCatalogModal, setShowCatalogModal] = useState(false);

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === selectedId) || V8_MODULE_SYSTEMS[0];
  }, [selectedId]);

  return (
    <div className="min-h-screen lg:h-screen w-screen lg:max-h-screen bg-[#fafafb] text-[#0f172a] font-cabinet selection:bg-amber-100 selection:text-black flex flex-col justify-between overflow-x-hidden lg:overflow-hidden relative">
      <OnboardingTour />

      <header className="h-16 shrink-0 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl z-50 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7DF1E] text-slate-950 flex items-center justify-center font-black text-xs shadow-xs border border-amber-300">
            JS
          </div>
          <div>
            <span className="font-bold text-xs tracking-tight text-slate-900 block leading-tight">
              JAVASCRIPT UNIVERSE
            </span>
            <span className="text-[10px] text-slate-500 font-mono block font-normal leading-tight">
              V8 Engine Architecture &amp; Runtime Visualizer
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
          {V8_MODULE_SYSTEMS.map((mod) => {
            const isSelected = selectedId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedId(mod.id)}
                className={`relative px-2.5 py-1 rounded-lg text-xs font-bold font-cabinet transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: mod.accent }}
                />
                <span>0{mod.index} · {mod.shortTitle}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-mono text-amber-900">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>V8 ENGINE // ONLINE</span>
          </div>

          <button
            onClick={() => setShowCatalogModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-800 cursor-pointer shadow-2xs"
          >
            <Grid size={13} className="text-amber-600" />
            <span className="hidden sm:inline">Modules</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-800 cursor-pointer shadow-2xs"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Tour</span>
          </button>

          <a
            href="https://github.com/MRGokulB/js-mastery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-800 shadow-2xs"
            aria-label="GitHub Repository"
          >
            <Code2 size={13} />
            <span className="hidden sm:inline">Source ↗</span>
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col justify-center">
        <V8EngineCore3D
          activeId={selectedId}
          onSelectModule={(id) => setSelectedId(id)}
        />
      </main>

      <footer className="h-10 shrink-0 border-t border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span className="font-bold text-slate-900 font-cabinet">JavaScript Universe</span>
          <span>&copy; 2026 &middot; V8 Architecture Visualizer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Ignition Interpreter &amp; TurboFan JIT Simulator</span>
          <button
            onClick={() => setShowCatalogModal(true)}
            className="text-amber-700 hover:underline font-bold cursor-pointer"
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
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowCatalogModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                    SYSTEM DIRECTORY
                  </span>
                  <h2 className="text-2xl font-bold font-cabinet text-slate-900">
                    All 7 V8 Engine Modules
                  </h2>
                </div>
                <button
                  onClick={() => setShowCatalogModal(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer transition-colors"
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
