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
  Code2,
  Timer,
  Boxes
} from "lucide-react";
import V8KineticEngine3D, { V8_SUBSYSTEMS, V8SubsystemMeta } from "./V8KineticEngine3D";
import { OnboardingTour } from "./OnboardingTour";

const SYSTEM_ICONS = {
  variables: Boxes,
  "control-flow": Workflow,
  "functions-scope": Cpu,
  "arrays-iteration": Layers,
  "objects-maps": Sparkles,
  "async-event-loop": Timer,
  "dom-apis": Activity
};

export function HubScene() {
  const [selectedId, setSelectedId] = useState<string>("async-event-loop");

  const activeSubsystem = useMemo<V8SubsystemMeta>(() => {
    return V8_SUBSYSTEMS.find((m) => m.id === selectedId) || V8_SUBSYSTEMS[0];
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[#fafafb] text-[#18181b] font-cabinet selection:bg-slate-200 selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fafafb]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-clash font-bold text-sm shadow-sm">
              JS
            </div>
            <div>
              <span className="font-clash font-semibold text-sm tracking-tight text-[#0f172a] block">
                JAVASCRIPT UNIVERSE
              </span>
              <span className="text-[11px] text-[#71717a] block font-normal">
                Spatial V8 Runtime Engine &amp; Execution Visualizers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all text-xs font-medium text-[#18181b] shadow-xs cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/js-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all text-xs font-medium text-[#18181b] shadow-xs"
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
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#71717a] uppercase mb-3">
            SPATIAL V8 ENGINE ARCHITECTURE &middot; 2026
          </span>

          <h1
            className="font-clash font-semibold text-[#0f172a] tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
          >
            Understand JavaScript, <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              down to the V8 engine.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#52525b] max-w-lg mx-auto mt-4 font-normal leading-relaxed">
            Inspect Ignition bytecode, TurboFan JIT optimizations, and the microtask scheduler. Navigate across 7 core V8 execution subsystems to launch their dedicated interactive visualizers.
          </p>
        </div>

        {/* Spatial 3D V8 Kinetic Engine Gateway */}
        <div className="mb-20">
          <V8KineticEngine3D
            activeId={selectedId}
            onSelectSubsystem={(id) => setSelectedId(id)}
          />
        </div>

        {/* Selected Subsystem Telemetry Dossier */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="rounded-[28px] bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/[0.05] text-[#18181b] font-semibold">
                  SUBSYSTEM {activeSubsystem.index} · ACTIVE
                </span>
                <span className="text-xs font-mono text-[#71717a]">
                  {activeSubsystem.category}
                </span>
              </div>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeSubsystem.accent }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
              <div className="md:col-span-7">
                <h2 className="font-clash font-bold text-2xl text-[#0f172a] mb-2 leading-tight">
                  {activeSubsystem.name}
                </h2>
                <p className="text-sm text-[#52525b] leading-relaxed mb-6 font-normal">
                  {activeSubsystem.overview}
                </p>

                <div className="p-3 rounded-xl bg-[#f8f9fa] border border-black/[0.05] font-mono text-xs text-[#18181b] mb-4">
                  <span className="text-[10px] text-[#71717a] block uppercase mb-1">Runtime Instruction Schematic</span>
                  <code className="text-amber-700 font-medium">{activeSubsystem.schematic}</code>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.01]">
                    <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-1">
                      INTERNAL COMPONENT
                    </span>
                    <span className="text-xs font-mono font-medium text-[#18181b]">
                      {activeSubsystem.subsystem}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.01]">
                    <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-1">
                      RUNTIME MECHANIC
                    </span>
                    <span className="text-xs font-mono font-medium text-[#18181b]">
                      {activeSubsystem.mechanic}
                    </span>
                  </div>
                </div>

                <a
                  href={activeSubsystem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-clash font-semibold bg-[#18181b] !text-white hover:bg-black transition-all cursor-pointer shadow-sm"
                >
                  <span className="!text-white">Launch {activeSubsystem.name}</span>
                  <ArrowUpRight size={14} className="!text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* All 7 Standalone Visualizers Catalog */}
        <section className="pt-16 border-t border-black/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block mb-1">
                STANDALONE APPLICATIONS
              </span>
              <h2 className="font-clash font-semibold text-2xl text-[#0f172a]">
                All 7 V8 Engine Systems
              </h2>
            </div>
            <span className="text-xs font-mono text-[#71717a]">
              7 MICRO-FRONTENDS DEPLOYED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V8_SUBSYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Boxes;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-[22px] bg-white border border-black/[0.06] hover:border-black/[0.18] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-black/[0.04] text-[#18181b] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <IconComp size={16} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-mono uppercase text-[#71717a]">
                          DIE M{item.index}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-clash font-semibold text-base text-[#0f172a] mb-1.5 group-hover:text-black">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#52525b] leading-relaxed mb-4">
                      {item.tagline}
                    </p>

                    <div className="py-2 px-3 rounded-lg bg-[#f8f9fa] border border-black/[0.04] text-[11px] font-mono text-[#52525b] mb-4">
                      {item.subsystem}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#18181b]">
                    <span>Open Standalone Visualizer</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-clash font-semibold text-[#0f172a]">
              JAVASCRIPT UNIVERSE
            </span>
          </div>
          <div>Bespoke Architectural Experience &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
