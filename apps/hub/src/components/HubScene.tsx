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
  Play
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

function BentoRefractionCard({ item, IconComp }: { item: V8ModuleMeta; IconComp: any }) {
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
      className="group relative p-6 rounded-[28px] liquid-glass-card hover:liquid-glass transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[28px]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.12), transparent 75%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-syne font-bold text-sm shadow-2xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}`, color: `${item.accent}` }}
          >
            <IconComp size={18} />
          </div>
          <span className="text-[10px] font-space uppercase text-[#64748b] tracking-wider px-2.5 py-1 rounded-full bg-black/[0.04]">
            SYSTEM {item.index}
          </span>
        </div>

        <h3 className="font-syne font-bold text-lg text-[#0f172a] mb-1.5 group-hover:text-amber-600 transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-[#475569] leading-relaxed mb-4">
          {item.tagline}
        </p>

        <div className="py-2 px-3 rounded-xl bg-white/70 border border-black/[0.04] text-[11px] font-space text-[#475569] mb-4 flex items-center justify-between shadow-2xs">
          <span className="truncate">{item.subsystem}</span>
          <span className="text-[10px] text-amber-700 font-semibold">{item.category}</span>
        </div>
      </div>

      <div className="relative z-10 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-syne font-semibold text-[#0f172a]">
        <span>Open Interactive Simulator</span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-600"
        />
      </div>
    </a>
  );
}

export function HubScene() {
  const [selectedId, setSelectedId] = useState<string>("variables");

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === selectedId) || V8_MODULE_SYSTEMS[0];
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[#fafafc] text-[#0b0f19] font-cabinet selection:bg-amber-100 selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(254,243,199,0.35),transparent_70%)]" />

      <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#fafafc]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-amber-400 flex items-center justify-center font-syne font-bold text-sm shadow-sm">
              JS
            </div>
            <div>
              <span className="font-syne font-bold text-sm tracking-tight text-[#0f172a] block">
                JAVASCRIPT UNIVERSE
              </span>
              <span className="text-[11px] text-[#64748b] font-space block font-normal">
                V8 Engine Architecture &amp; Runtime Visualizers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-space text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>V8 // TURBOFAN JIT ONLINE</span>
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
              className="neo-pill-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-syne font-semibold text-[#0f172a] cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/js-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-pill-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-syne font-semibold text-[#0f172a]"
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-2xs mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-space tracking-widest text-[#0f172a] uppercase font-bold">
                  KINETIC EXECUTION PRISM &middot; 2026
                </span>
              </div>
              <h1 className="font-syne font-extrabold text-[#0f172a] tracking-tight leading-[1.05] text-3xl sm:text-5xl">
                Deconstruct JavaScript, <br />
                <span className="font-instrument italic font-normal text-amber-700">
                  down to the V8 heap.
                </span>
              </h1>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs max-w-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-space">
                <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider">
                  V8 HEAP ALLOCATION
                </span>
                <span className="text-amber-600 font-bold text-[11px]">4.2 MB / 16 MB</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/[0.04] overflow-hidden flex">
                <div className="h-full bg-amber-500 w-[28%]" />
                <div className="h-full bg-purple-500 w-[18%]" />
                <div className="h-full bg-sky-500 w-[14%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-space text-[#64748b]">
                <span>31-Bit Smi</span>
                <span>Scavenger Nursery</span>
                <span>Old Space</span>
              </div>
            </div>
          </div>

          <div className="p-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-xs flex flex-wrap items-center justify-between gap-1.5">
            <span className="text-[10px] font-space uppercase tracking-widest text-[#64748b] px-2 font-bold hidden sm:inline">
              SELECT RUNTIME SYSTEM:
            </span>

            <div className="flex flex-wrap gap-1.5">
              {V8_MODULE_SYSTEMS.map((mod) => {
                const isSelected = selectedId === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedId(mod.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-syne font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#0f172a] text-white shadow-2xs"
                        : "bg-black/[0.02] text-[#475569] hover:bg-black/[0.06] hover:text-[#0f172a]"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: mod.accent }}
                    />
                    <span>0{mod.index} · {mod.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <V8EngineCore3D
            activeId={selectedId}
            onSelectModule={(id) => setSelectedId(id)}
          />
        </section>

        <section className="pt-12 border-t border-black/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-space uppercase tracking-widest text-[#64748b] block mb-1">
                STANDALONE SIMULATORS
              </span>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-[#0f172a] tracking-tight">
                Explore All 7 V8 Engine Modules
              </h2>
            </div>
            <span className="text-xs font-space text-[#64748b]">
              7 Interactive Interactive Workbenches
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V8_MODULE_SYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
              return (
                <BentoRefractionCard
                  key={item.id}
                  item={item}
                  IconComp={IconComp}
                />
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-syne font-semibold text-[#0f172a]">JavaScript Universe</span>
            <span>&copy; 2026 &middot; Kinetic Execution Prism</span>
          </div>
          <div className="flex items-center gap-6 font-space text-[11px]">
            <a href="https://variables-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0f172a]">
              Memory
            </a>
            <a href="https://control-flow-ruby.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#0f172a]">
              Interpreter
            </a>
            <a href="https://async-event-loop-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0f172a]">
              Event Loop
            </a>
            <a href="https://github.com/MRGokulB/js-mastery" target="_blank" rel="noopener noreferrer" className="hover:text-[#0f172a]">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
