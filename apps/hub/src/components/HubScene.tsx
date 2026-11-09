"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Grip
} from "lucide-react";
import V8EngineOrbit3D, { V8_SATELLITES } from "./V8EngineOrbit3D";
import { OnboardingTour } from "./OnboardingTour";

export function HubScene() {
  const [activeId, setActiveId] = useState<string>("variables");
  const activeSatellite = V8_SATELLITES.find((s) => s.id === activeId) || V8_SATELLITES[0];

  return (
    <div className="min-h-screen bg-[#fafafb] text-[#18181b] font-cabinet selection:bg-slate-200 selection:text-black relative overflow-x-hidden flex flex-col justify-between">
      <OnboardingTour />

      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fafafb]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-clash font-bold text-sm shadow-xs">
              JS
            </div>
            <div>
              <span className="font-clash font-semibold text-sm tracking-tight text-[#0f172a] block">
                JAVASCRIPT UNIVERSE
              </span>
              <span className="text-[11px] text-[#71717a] block font-normal">
                Kinetic 3D V8 Runtime Gyroscope
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] border border-black/[0.06]">
            {V8_SATELLITES.map((sat) => (
              <button
                key={sat.id}
                onClick={() => setActiveId(sat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeId === sat.id
                    ? "bg-black text-white shadow-xs font-semibold"
                    : "text-[#52525b] hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                {sat.shortLabel}
              </button>
            ))}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-[#71717a] uppercase bg-black/[0.03] border border-black/[0.06] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>V8 RUNTIME GYROSCOPE &middot; 2026</span>
          </span>

          <h1
            className="font-clash font-semibold text-[#0f172a] tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
          >
            Understand JavaScript, <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              inside the V8 engine.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#52525b] max-w-lg mx-auto mt-3 font-normal leading-relaxed">
            Drag to rotate the V8 runtime gyroscope. Click any subsystem satellite to align its execution mechanics and launch the simulator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full my-4">
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
            <V8EngineOrbit3D
              activeId={activeId}
              onSelectSatellite={(id) => setActiveId(id)}
            />
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#71717a] pointer-events-none mt-1">
              <Grip size={13} />
              <span>Drag to spin freely &middot; Click satellite to align</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="rounded-[28px] bg-white/90 backdrop-blur-xl border border-black/[0.08] p-7 shadow-[0_20px_45px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shadow-xs"
                    style={{ backgroundColor: activeSatellite.accent }}
                  />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#71717a]">
                    MODULE {activeSatellite.index} &middot; {activeSatellite.category}
                  </span>
                </div>
              </div>

              <h2 className="font-clash font-bold text-2xl text-[#0f172a] mb-2 leading-tight">
                {activeSatellite.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed mb-6 font-normal">
                {activeSatellite.tagline}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#f8f9fa] border border-black/[0.04] mb-6 space-y-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-0.5">
                    INTERNAL COMPONENT
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#18181b]">
                    {activeSatellite.subsystem}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-0.5">
                    RUNTIME MECHANIC
                  </span>
                  <span className="text-xs font-mono text-[#52525b]">
                    {activeSatellite.mechanic}
                  </span>
                </div>
              </div>

              <a
                href={activeSatellite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-clash font-semibold bg-[#18181b] !text-white hover:bg-black transition-all cursor-pointer shadow-sm group"
              >
                <span className="!text-white">Launch {activeSatellite.shortLabel} Visualizer</span>
                <ArrowUpRight size={14} className="!text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <section className="pt-16 mt-8 border-t border-black/[0.06]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] block">
                CATALOG
              </span>
              <h2 className="font-clash font-semibold text-xl text-[#0f172a]">
                All 7 V8 Engine Systems
              </h2>
            </div>
            <span className="text-xs font-mono text-[#71717a]">7 LIVE MICRO-FRONTENDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {V8_SATELLITES.map((sat) => (
              <a
                key={sat.id}
                href={sat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.18] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${sat.accent}15`,
                        color: sat.accent
                      }}
                    >
                      {sat.index} &middot; {sat.shortLabel}
                    </span>
                    <span className="text-[11px] font-mono text-[#71717a] uppercase">
                      {sat.category}
                    </span>
                  </div>

                  <h3 className="font-clash font-semibold text-base text-[#0f172a] mb-1 group-hover:text-black">
                    {sat.name}
                  </h3>

                  <p className="text-xs text-[#52525b] leading-relaxed mb-3">
                    {sat.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#18181b]">
                  <span className="font-mono text-[11px] text-[#71717a] truncate max-w-[200px]">
                    {sat.subsystem}
                  </span>
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

      <footer className="border-t border-black/[0.06] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-clash font-semibold text-[#0f172a]">
              JAVASCRIPT UNIVERSE &middot; 3D V8 GYROSCOPE
            </span>
          </div>
          <div>Bespoke Spatial Architecture &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
