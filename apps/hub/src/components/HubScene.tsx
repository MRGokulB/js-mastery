"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Workflow,
  CheckCircle2,
  Code2
} from "lucide-react";
import V8EngineCore3D, { V8_MODULE_SYSTEMS, V8ModuleMeta } from "./V8EngineCore3D";
import { OnboardingTour } from "./OnboardingTour";

export function HubScene() {
  const [selectedId, setSelectedId] = useState<string>("variables");

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === selectedId) || V8_MODULE_SYSTEMS[0];
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[#08090d] text-[#f1f5f9] font-cabinet selection:bg-amber-400/20 selection:text-amber-300 relative overflow-x-hidden">
      <OnboardingTour />

      {/* Subtle Dark Vignette Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(245,158,11,0.06),transparent_70%)]" />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090d]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-clash font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              JS
            </div>
            <div>
              <span className="font-clash font-semibold text-sm tracking-tight text-white block">
                JAVASCRIPT UNIVERSE
              </span>
              <span className="text-[11px] text-[#94a3b8] block font-normal">
                V8 Engine Architecture &amp; Runtime Visualizers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white hover:text-black transition-all text-xs font-medium text-[#e2e8f0] cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/js-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white hover:text-black transition-all text-xs font-medium text-[#e2e8f0]"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-28 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#94a3b8] uppercase mb-3">
            V8 RUNTIME CORE &middot; 2026
          </span>

          <h1
            className="font-clash font-semibold text-white tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
          >
            Understand JavaScript, <br />
            <span className="font-instrument italic font-normal text-amber-300">
              down to the V8 heap.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94a3b8] max-w-lg mx-auto mt-4 font-normal leading-relaxed">
            Orbit the tactile 3D topic cards. Examine stack frames, hidden class transitions, and microtask queues across 7 dedicated visualizers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-wider text-[#94a3b8] uppercase block mb-1">
              CHOOSE A SYSTEM
            </span>

            {V8_MODULE_SYSTEMS.map((mod) => {
              const isSelected = selectedId === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedId(mod.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? "bg-[#141926] border-white/[0.18] shadow-sm text-white"
                      : "bg-transparent border-transparent hover:bg-white/[0.04] text-[#94a3b8]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: mod.accent, color: mod.accent }}
                    />
                    <div>
                      <span className="text-xs font-semibold block leading-tight text-white">
                        {mod.name}
                      </span>
                      <span className="text-[10px] text-[#94a3b8] font-mono">
                        {mod.category}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mr-1" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center">
            <V8EngineCore3D
              activeId={selectedId}
              onSelectModule={(id) => setSelectedId(id)}
            />
            <span className="text-[11px] text-[#64748b] font-mono mt-2 tracking-wide">
              ::: Drag to find your angle &middot; Click topic card to focus
            </span>
          </div>

          <div className="lg:col-span-3 order-3">
            <div className="rounded-[24px] bg-[#0e121a]/90 backdrop-blur-xl border border-white/[0.08] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.08] text-white">
                    MODULE {activeModule.index}
                  </span>
                  <span className="text-xs text-[#94a3b8] font-mono">
                    {activeModule.category}
                  </span>
                </div>
                <span
                  className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: activeModule.accent, color: activeModule.accent }}
                />
              </div>

              <h2 className="font-clash font-bold text-xl text-white mb-2 leading-tight">
                {activeModule.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-6">
                {activeModule.tagline}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/[0.06] mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                    INTERNAL COMPONENT
                  </span>
                  <span className="text-xs font-mono font-medium text-[#e2e8f0]">
                    {activeModule.subsystem}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                    RUNTIME MECHANIC
                  </span>
                  <span className="text-xs font-mono font-medium text-[#e2e8f0]">
                    {activeModule.mechanic}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                    SCHEMATIC INVARIANT
                  </span>
                  <span
                    className="text-xs font-mono font-medium block"
                    style={{ color: activeModule.accent }}
                  >
                    {activeModule.schematic}
                  </span>
                </div>
              </div>

              <a
                href={activeModule.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-clash font-semibold bg-white !text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
              >
                <span className="!text-black">Launch {activeModule.name}</span>
                <ArrowUpRight size={14} className="!text-black" />
              </a>
            </div>
          </div>
        </div>

        <section className="pt-16 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#94a3b8] block mb-1">
                STANDALONE SIMULATORS
              </span>
              <h2 className="font-clash font-semibold text-2xl text-white">
                All 7 V8 Engine Systems
              </h2>
            </div>
            <span className="text-xs font-mono text-[#64748b]">
              7 MICRO-FRONTENDS DEPLOYED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V8_MODULE_SYSTEMS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-[22px] bg-[#0d1017] border border-white/[0.06] hover:border-white/[0.2] hover:bg-[#121622] hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-semibold"
                      style={{
                        backgroundColor: `${item.accent}20`,
                        color: item.accent,
                        border: `1px solid ${item.accent}40`
                      }}
                    >
                      {item.index}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#94a3b8]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-clash font-semibold text-base text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                    {item.tagline}
                  </p>

                  <div className="py-2 px-3 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] font-mono text-[#cbd5e1] mb-4">
                    {item.subsystem}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-white">
                  <span>Open Visualizer</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#06070a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-clash font-semibold text-white">
              JAVASCRIPT UNIVERSE
            </span>
          </div>
          <div>Bespoke Architectural Experience &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
