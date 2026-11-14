"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Layers,
  Workflow,
  Code2,
  Cpu,
  Terminal,
  Activity,
  Zap,
  Sliders,
  Play
} from "lucide-react";
import V8EngineCore3D, { V8_MODULE_SYSTEMS, V8ModuleMeta } from "../components/V8EngineCore3D";
import { OnboardingTour } from "../components/OnboardingTour";

const SYSTEM_ICONS = {
  variables: Layers,
  "control-flow": Workflow,
  "functions-scope": Code2,
  "arrays-iteration": Cpu,
  "objects-maps": Terminal,
  "async-event-loop": Activity,
  "dom-apis": Layers
};

function RackModuleUnit({ item, IconComp }: { item: V8ModuleMeta; IconComp: any }) {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="group relative p-6 pt-7 rounded-[22px] neumorphic-card hover:border-black/[0.2] transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="absolute top-3.5 left-3.5 skeuo-screw" />
      <div className="absolute top-3.5 right-3.5 skeuo-screw" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 skeuo-handle opacity-70 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 pt-1 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-clash font-bold text-sm shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}` }}
          >
            <IconComp size={18} style={{ color: item.accent }} />
          </div>
          <span className="text-[10px] font-mono uppercase text-[#64748b] tracking-wider px-2 py-0.5 rounded bg-black/[0.04] border border-black/[0.05]">
            SYS {item.index}
          </span>
        </div>

        <h3 className="font-clash font-bold text-base text-[#0f172a] mb-1.5 group-hover:text-black transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-[#475569] leading-relaxed mb-4">
          {item.tagline}
        </p>

        <div className="py-2 px-3 rounded-lg bg-black/[0.02] border border-black/[0.06] text-[11px] font-mono text-[#475569] mb-4 flex items-center justify-between">
          <span className="truncate">{item.subsystem}</span>
          <span className="text-[10px] text-zinc-500 font-semibold">{item.category}</span>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono font-bold text-[#0f172a]">
        <span>Deploy Module</span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </a>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState<string>("variables");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6", "7"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (V8_MODULE_SYSTEMS[idx]) {
          setActiveId(V8_MODULE_SYSTEMS[idx].id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#f3f4f7] text-[#0f172a] font-cabinet selection:bg-amber-100 selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      <header className="sticky top-0 z-50 border-b border-black/[0.08] bg-[#f3f4f7]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F7DF1E] text-slate-950 flex items-center justify-center font-clash font-black text-sm shadow-sm border border-amber-300">
              JS
            </div>
            <div>
              <span className="font-clash font-bold text-sm tracking-tight text-[#0f172a] block">
                JAVASCRIPT UNIVERSE
              </span>
              <span className="text-[11px] text-[#64748b] font-mono block">
                V8 Engine Architecture &amp; Runtime Visualizer
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 vfd-display px-4 py-1.5 rounded-xl text-[11px] font-mono text-amber-400">
            <span className="flex items-center gap-1.5">
              <span className="led-diode-amber" />
              SYS: 0{activeModule.index}
            </span>
            <span className="text-zinc-600">|</span>
            <span>V8: IGNITION + TURBOFAN</span>
            <span className="text-zinc-600">|</span>
            <span>HEAP: 64-BIT SMI</span>
            <span className="text-zinc-600">|</span>
            <span className="text-amber-300">STATUS: ARMED</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.1] bg-white hover:bg-black hover:text-white transition-all text-xs font-mono font-bold text-[#0f172a] shadow-xs cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/js-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/[0.1] bg-white hover:bg-black hover:text-white transition-all text-xs font-mono font-bold text-[#0f172a] shadow-xs"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-28 relative z-10">
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 text-amber-400 font-mono text-[10px] tracking-widest uppercase font-bold mb-3 border border-zinc-700 shadow-2xs">
                <span className="led-diode-amber" />
                <span>V8 RUNTIME LABORATORY &amp; OPTIMIZING COMPILER &middot; 2026</span>
              </div>
              <h1 className="font-clash font-bold text-3xl sm:text-5xl text-[#0f172a] tracking-tight leading-tight">
                V8 Engine Architecture. <br />
                <span className="font-instrument italic font-normal text-zinc-600">
                  Runtime execution &amp; microtask loops.
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] max-w-md font-normal leading-relaxed">
              Step through Ignition bytecode dispatches, 31-bit Smi bitshifts, Call Stack frames, and Event Loop microtask prioritization on real JavaScript runtime internals.
            </p>
          </div>

          <div className="p-3 rounded-2xl neumorphic-panel border border-black/[0.08] flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] px-2 font-bold">
              MECHANICAL CHANNEL SELECTOR:
            </span>

            <div className="flex flex-wrap gap-2">
              {V8_MODULE_SYSTEMS.map((mod) => {
                const isSelected = activeId === mod.id;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveId(mod.id)}
                    className={`skeuo-channel-key px-3.5 py-2 rounded-xl text-xs font-clash font-bold flex items-center gap-2 cursor-pointer ${
                      isSelected ? "active" : ""
                    }`}
                  >
                    <span className={isSelected ? "led-diode-amber" : "led-diode-off"} />
                    <span>SYS 0{mod.index}</span>
                    <span className="text-[11px] text-[#475569]">{mod.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <V8EngineCore3D
            activeId={activeId}
            onSelectModule={(id) => setActiveId(id)}
          />
        </section>

        <section className="pt-12 border-t border-black/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#64748b] block mb-1">
                STANDALONE CHANNELS
              </span>
              <h2 className="font-clash font-bold text-2xl sm:text-3xl text-[#0f172a] tracking-tight">
                7 Modular V8 Runtime Engines
              </h2>
            </div>
            <span className="text-xs font-mono text-[#64748b]">
              Interactive Virtual Machine &amp; Compiler Explorers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V8_MODULE_SYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
              return (
                <RackModuleUnit
                  key={item.id}
                  item={item}
                  IconComp={IconComp}
                />
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.08] bg-[#f8f9fa] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="led-diode-amber" />
            <span className="font-clash font-bold text-[#0f172a]">JavaScript Universe</span>
            <span>&copy; 2026 &middot; V8 Architecture &amp; Runtime Internals</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="https://variables-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Variables &amp; Smis
            </a>
            <a href="https://async-event-loop-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Event Loop
            </a>
            <a href="https://functions-scope.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Closures
            </a>
            <a href="https://github.com/MRGokulB/js-mastery" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
