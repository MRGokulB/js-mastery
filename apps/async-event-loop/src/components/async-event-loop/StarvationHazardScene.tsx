"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Cpu, CheckCircle2, Play, RefreshCw } from "lucide-react";

export function StarvationHazardScene() {
  const [mode, setMode] = useState<"starved" | "healthy">("healthy");
  const [frameDropRate, setFrameDropRate] = useState(0);

  const simulate = (selectedMode: "starved" | "healthy") => {
    setMode(selectedMode);
    if (selectedMode === "starved") {
      setFrameDropRate(100);
    } else {
      setFrameDropRate(0);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#070608]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono uppercase tracking-widest mb-4">
            <ShieldAlert className="w-3.5 h-3.5" /> Architecture Hazard
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Microtask Starvation Hazard
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Why infinite Promise loops lock up the entire browser tab while setTimeout recursion does not.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
          <div
            onClick={() => simulate("starved")}
            className={`p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              mode === "starved"
                ? "bg-rose-500/10 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.2)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                  <AlertTriangle className="w-6 h-6" />
                </span>
                <span className="text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  Hazardous Pattern
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Recursive Promise Microtasks
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Because the event loop drains ALL microtasks until count is 0 before yielding to UI rendering, an infinite microtask chain permanently starves the thread.
              </p>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-rose-300 mb-6">
                <code>{`function loop() {\n  Promise.resolve().then(loop);\n}\nloop(); // Browser tab FREEZES`}</code>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs font-mono text-rose-200">
              Result: 0 FPS rendering. User clicks, scroll events, and layout reflows are completely blocked.
            </div>
          </div>

          <div
            onClick={() => simulate("healthy")}
            className={`p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              mode === "healthy"
                ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  Cooperative Pattern
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Macrotask / postTask Chunking
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Macrotasks execute strictly ONE per event loop tick. After each macrotask, the browser gets an opportunity to render frames and handle user input.
              </p>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-300 mb-6">
                <code>{`function loop() {\n  setTimeout(loop, 0);\n}\nloop(); // UI remains responsive!`}</code>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-200">
              Result: 60 FPS maintained. Browser handles frame paint between each task invocation.
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${mode === "starved" ? "bg-rose-500 animate-ping" : "bg-emerald-400"}`} />
            <div>
              <div className="text-sm font-bold text-white">
                Render Thread Health: {mode === "starved" ? "FROZEN (UI Locked)" : "60 FPS Fluid"}
              </div>
              <div className="text-xs text-white/50 font-mono">
                Frame drop rate: {frameDropRate}% &middot; Input latency: {mode === "starved" ? "Infinity ms" : "<16ms"}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => simulate("starved")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                mode === "starved"
                  ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              Simulate Starvation
            </button>
            <button
              onClick={() => simulate("healthy")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                mode === "healthy"
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              Cooperative Scheduling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
