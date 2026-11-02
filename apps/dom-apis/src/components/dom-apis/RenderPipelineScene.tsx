"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Cpu, Play, RefreshCw, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export function RenderPipelineScene() {
  const [selectedMutation, setSelectedMutation] = useState<"geometry" | "paint" | "composite">("composite");
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(-1);

  const mutations = {
    geometry: {
      name: "node.style.width = '300px'",
      type: "Reflow + Repaint + Composite",
      cost: "Heavy (~16ms - 40ms CPU)",
      desc: "Changes geometric layout coordinates. The browser must recalculate positions for this element AND all its sibling and ancestor boxes in the tree.",
      stages: [true, true, true, true],
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      gpuOnly: false
    },
    paint: {
      name: "node.style.backgroundColor = '#f97316'",
      type: "Repaint + Composite",
      cost: "Moderate (~4ms - 10ms CPU)",
      desc: "Geometry is preserved, but surface visual pixels must be rasterized anew. Skips layout reflow entirely.",
      stages: [false, true, true, true],
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      gpuOnly: false
    },
    composite: {
      name: "node.style.transform = 'translate3d(50px, 0, 0)'",
      type: "Composite Only (GPU)",
      cost: "Zero Cost (<1ms GPU)",
      desc: "Handed directly to the GPU compositor thread. No layout reflow and no raster repaint required! Guaranteed fluid 60/120 FPS.",
      stages: [false, false, false, true],
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      gpuOnly: true
    }
  };

  const runSimulation = (key: "geometry" | "paint" | "composite") => {
    setSelectedMutation(key);
    setIsSimulating(true);
    setActiveStage(0);

    const stagesCount = 4;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < stagesCount) {
        setActiveStage(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 400);
  };

  const curr = mutations[selectedMutation];

  return (
    <section id="pipeline-section" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#050508]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" /> Critical Rendering Path
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Reflow vs Repaint vs Composite
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Why modern UI animations should strictly animate transform and opacity instead of width, height, or margin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { id: "geometry", label: "Width / Height Mutation", sub: "Layout Thrashing" },
            { id: "paint", label: "Color / Background", sub: "Repaint Trigger" },
            { id: "composite", label: "Transform / Opacity", sub: "GPU Composite Only" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => runSimulation(tab.id as typeof selectedMutation)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedMutation === tab.id
                  ? "bg-orange-500/20 border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.2)]"
                  : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="font-bold text-sm text-white">{tab.label}</div>
              <div className="text-xs text-white/50 font-mono mt-1">{tab.sub}</div>
            </button>
          ))}
        </div>

        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider mb-2 ${curr.badgeColor}`}>
                {curr.type}
              </span>
              <h3 className="text-2xl font-mono font-bold text-white">
                {curr.name}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-mono text-white/40 uppercase">Performance Cost</div>
                <div className="text-sm font-mono font-bold text-white">{curr.cost}</div>
              </div>
              <button
                disabled={isSimulating}
                onClick={() => runSimulation(selectedMutation)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-bold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isSimulating ? "Replaying Pipeline..." : "Replay Pipeline"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            {[
              { idx: 0, name: "1. Recalc Style", sub: "DOM + CSSOM Match", required: curr.stages[0] },
              { idx: 1, name: "2. Layout (Reflow)", sub: "Box Geometries & Coords", required: curr.stages[1] },
              { idx: 2, name: "3. Paint (Raster)", sub: "Pixels & Textures Drawn", required: curr.stages[2] },
              { idx: 3, name: "4. Composite", sub: "GPU Layer Assembly", required: curr.stages[3] },
            ].map((stage) => {
              const isHit = stage.required;
              const isCurrent = activeStage === stage.idx;

              return (
                <div
                  key={stage.idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-orange-500/20 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-105"
                      : isHit
                      ? "bg-white/[0.04] border-white/20 text-white"
                      : "bg-white/[0.01] border-white/5 opacity-30 text-white/40"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-1">
                    {isHit ? "Executed" : "Skipped"}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">{stage.name}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{stage.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${curr.gpuOnly ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"} shrink-0`}>
              {curr.gpuOnly ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-mono uppercase font-bold text-white mb-1">
                Engine Mechanism
              </div>
              <div className="text-sm text-white/70 leading-relaxed font-light">
                {curr.desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
