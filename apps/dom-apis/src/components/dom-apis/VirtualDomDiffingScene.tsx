"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, GitCompare, Zap, CheckCircle2, RefreshCw } from "lucide-react";

export function VirtualDomDiffingScene() {
  const [list, setList] = useState(["Item A", "Item B", "Item C"]);
  const [diffApplied, setDiffApplied] = useState(false);

  const addItem = () => {
    setList((prev) => [...prev, `Item ${String.fromCharCode(65 + prev.length)}`]);
    setDiffApplied(true);
    setTimeout(() => setDiffApplied(false), 800);
  };

  const reset = () => {
    setList(["Item A", "Item B", "Item C"]);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#050508]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4">
            <GitCompare className="w-3.5 h-3.5" /> Modern Framework Reconciliation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Virtual DOM &amp; Batch Diffing
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Why frameworks like React and Next.js construct in-memory tree representations before touching the browser host DOM.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={addItem}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(249,115,22,0.4)]"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> Add Item &amp; Run Diff
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs font-mono cursor-pointer transition-all"
          >
            Reset List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="font-mono text-xs text-orange-400 font-bold uppercase">
                  1. Virtual DOM (Lightweight JS Tree)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                  RAM Cost: ~80 bytes/node
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                Plain JavaScript object tree. Fast to create, destroy, and diff. No layout geometry or C++ host allocation.
              </p>
              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-orange-200 space-y-1">
                <div>{"{"}</div>
                <div className="pl-4">{"type: 'ul',"}</div>
                <div className="pl-4">{"children: ["}</div>
                {list.map((item, idx) => (
                  <div key={idx} className="pl-8 text-amber-200">
                    {`{ type: 'li', key: '${idx}', text: '${item}' },`}
                  </div>
                ))}
                <div className="pl-4">{"]"}</div>
                <div>{"}"}</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-white/40 mt-4">
              Calculates diff algorithm: O(n) heuristic reconciliation
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                  2. Real C++ Host DOM Tree
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                  RAM Cost: ~2,500 bytes/node
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                Batched mutations applied in a single microtask frame, minimizing costly layout reflow calculations.
              </p>
              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 space-y-2">
                {list.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                      diffApplied && idx === list.length - 1
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        : "bg-white/[0.03] border-white/10 text-white/80"
                    }`}
                  >
                    <span>&lt;li&gt; {item} &lt;/li&gt;</span>
                    {diffApplied && idx === list.length - 1 && (
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        + Batched Insertion
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-[11px] font-mono text-white/40 mt-4">
              1 reflow executed instead of N individual reflow calls
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
