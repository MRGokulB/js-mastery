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
  CheckCircle2
} from "lucide-react";
import V8EngineCore3D, { V8_MODULE_SYSTEMS, V8ModuleMeta } from "./V8EngineCore3D";

export function HubScene() {
  const [selectedId, setSelectedId] = useState<string>("variables");

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === selectedId) || V8_MODULE_SYSTEMS[0];
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f4f4f6] font-cabinet selection:bg-amber-400/20 selection:text-amber-300 relative overflow-x-hidden">
      <div
        aria-hidden="true"
        className="fixed top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 text-white opacity-[0.02] font-clash font-bold tracking-[-0.04em] leading-[0.8] text-center whitespace-nowrap"
        style={{ fontSize: "clamp(80px, 16vw, 290px)" }}
      >
        JAVASCRIPT
      </div>

      <nav className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-clash font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-clash font-semibold text-sm tracking-tight text-white block">
                JAVASCRIPT UNIVERSE
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.08] text-zinc-400 border border-white/[0.06]">
                V8 ENGINE ARCHITECTURE
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 block font-normal">
              7 Dedicated Hardware-Level Interactive Visualizers
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          {V8_MODULE_SYSTEMS.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setSelectedId(mod.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedId === mod.id
                  ? "bg-white/[0.12] text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: mod.accent }}
              />
              <span>{mod.index}</span>
              <span className="font-cabinet">{mod.category}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MRGokulB/js-mastery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-xs font-semibold text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
          >
            <span>Repository</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              V8 RUNTIME CORE &middot; THREE.JS INTERACTIVE DIE
            </span>
          </div>

          <h1
            className="font-clash font-semibold text-white tracking-[-0.03em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(36px, 4.4vw, 68px)" }}
          >
            Understand JavaScript, <br />
            <span className="font-instrument italic font-normal text-amber-300/90">
              down to the V8 heap.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mt-4 font-normal leading-relaxed">
            Orbit the genuine WebGL V8 processor core. Click any runtime subsystem block to examine stack frames, hidden class transitions, and microtask queues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-20">
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/[0.1] bg-white/[0.03] text-zinc-400">
                  SUBSYSTEM {activeModule.index} / 07
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_currentColor]"
                  style={{ backgroundColor: activeModule.accent, color: activeModule.accent }}
                />
              </div>

              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                {activeModule.category}
              </span>

              <h2 className="font-clash font-bold text-xl text-white mb-2 leading-tight">
                {activeModule.name}
              </h2>

              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                {activeModule.tagline}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05]">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    INTERNAL COMPONENT
                  </span>
                  <span className="text-xs font-mono text-zinc-200">
                    {activeModule.subsystem}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05]">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    RUNTIME MECHANIC
                  </span>
                  <span className="text-xs font-mono text-zinc-300">
                    {activeModule.mechanic}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06]">
              <a
                href={activeModule.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-clash font-semibold bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                <span>Launch {activeModule.category} Visualizer</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <V8EngineCore3D
              activeId={selectedId}
              onSelectModule={(id) => setSelectedId(id)}
            />
          </div>

          <div className="lg:col-span-3 order-3 flex flex-col justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={15} className="text-amber-400" />
                <span className="text-xs font-clash font-semibold text-zinc-300 uppercase tracking-wide">
                  V8 Execution Telemetry
                </span>
              </div>

              <div className="space-y-2 mb-6">
                {V8_MODULE_SYSTEMS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                      selectedId === m.id
                        ? "bg-white/[0.08] border-white/[0.2] text-white shadow-xs"
                        : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: m.accent }}
                      />
                      <span className="text-xs font-medium truncate max-w-[170px]">
                        {m.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {m.index}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>RUNTIME ENGINE</span>
                <span className="text-zinc-300">Google V8 v12.4</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>INSPECTOR MODE</span>
                <span className="text-amber-400">WebGL Raycaster</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>SPEC CONFORMANCE</span>
                <span className="text-zinc-300">ECMA-262 Ed. 15</span>
              </div>
            </div>
          </div>
        </div>

        <section className="pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Layers size={16} className="text-amber-400" />
                <h2 className="font-clash font-semibold text-2xl text-white">
                  All 7 V8 Engine Systems
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Deep interactive visual engines built to expose memory structures, compiler bailouts, and event loop cycles.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>7 STANDALONE VISUALIZERS DEPLOYED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {V8_MODULE_SYSTEMS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${item.accent}15`,
                        color: item.accent,
                        border: `1px solid ${item.accent}30`
                      }}
                    >
                      MODULE {item.index}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-clash font-semibold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {item.tagline}
                  </p>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] mb-4 text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-500 block text-[9px] uppercase">V8 Subsystem</span>
                    {item.subsystem}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white">
                  <span>Launch Visualizer</span>
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

      <footer className="border-t border-white/[0.06] bg-[#05060a] py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-clash font-semibold text-white">
              JAVASCRIPT UNIVERSE &middot; V8 ENGINE CORE
            </span>
          </div>
          <div>Bespoke Three.js WebGL Architecture &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
