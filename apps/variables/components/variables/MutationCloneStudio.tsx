"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw, Sparkles, Check, X } from "lucide-react";

type CloneMode = "ref" | "shallow" | "deep";

export function MutationCloneStudio() {
  const [mode, setMode] = useState<CloneMode>("ref");

  const [objA, setObjA] = useState({ name: "Alex", theme: { dark: true } });
  const [objB, setObjB] = useState({ name: "Alex", theme: { dark: true } });

  const mutateName = () => {
    if (mode === "ref") {
      setObjA((prev) => ({ ...prev, name: "Jordan" }));
      setObjB((prev) => ({ ...prev, name: "Jordan" }));
    } else {
      setObjB((prev) => ({ ...prev, name: "Jordan" }));
    }
  };

  const mutateNestedTheme = () => {
    if (mode === "ref" || mode === "shallow") {
      const newTheme = { dark: false };
      setObjA((prev) => ({ ...prev, theme: newTheme }));
      setObjB((prev) => ({ ...prev, theme: newTheme }));
    } else {
      setObjB((prev) => ({ ...prev, theme: { dark: false } }));
    }
  };

  const resetState = () => {
    setObjA({ name: "Alex", theme: { dark: true } });
    setObjB({ name: "Alex", theme: { dark: true } });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          04 &bull; Reference Hazards &amp; Object Cloning
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Mutation Trap &amp; Cloning Spectrum
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          The #1 source of state bugs in JavaScript and React is unintentional mutation. When you copy an object, are you copying the pointer or cloning the heap memory?
        </p>
      </div>

      {/* Interactive 3-Tier Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <button
          onClick={() => {
            setMode("ref");
            resetState();
          }}
          className={`p-6 sm:p-7 rounded-3xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
            mode === "ref"
              ? "bg-rose-500/10 border-rose-500/60 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/30"
              : "bg-white dark:bg-[#0c0e14]/90 border-slate-200/90 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-500">TIER 1 &bull; 0% ISOLATION</span>
              {mode === "ref" && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                  ACTIVE
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Reference Copy (&apos;b = a&apos;)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Copies only the 8-byte stack pointer. Both variables target the exact same heap address (<code className="text-amber-500 font-mono">0x1000</code>). Any mutation on <code className="font-mono">b</code> mutates <code className="font-mono">a</code> instantly.
            </p>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] text-xs font-mono w-full">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Top-Level Safe:</span>
              <span className="text-rose-500 font-bold">No (Shared)</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Nested Safe:</span>
              <span className="text-rose-500 font-bold">No (Shared)</span>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setMode("shallow");
            resetState();
          }}
          className={`p-6 sm:p-7 rounded-3xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
            mode === "shallow"
              ? "bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
              : "bg-white dark:bg-[#0c0e14]/90 border-slate-200/90 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-amber-500">TIER 2 &bull; 50% ISOLATION</span>
              {mode === "shallow" && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                  ACTIVE
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Shallow Spread (&apos;&#123; ...a &#125;&apos;)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Creates a new top-level object on the heap. Top-level primitives are safe. However, nested objects (<code className="text-amber-500 font-mono">theme</code>) still share the exact same pointers!
            </p>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] text-xs font-mono w-full">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Top-Level Safe:</span>
              <span className="text-emerald-500 font-bold">Yes</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Nested Safe:</span>
              <span className="text-rose-500 font-bold">No (Hazard!)</span>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setMode("deep");
            resetState();
          }}
          className={`p-6 sm:p-7 rounded-3xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
            mode === "deep"
              ? "bg-emerald-500/10 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30"
              : "bg-white dark:bg-[#0c0e14]/90 border-slate-200/90 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-500">TIER 3 &bull; 100% ISOLATION</span>
              {mode === "deep" && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  ACTIVE
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Deep Clone (&apos;structuredClone&apos;)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Native browser standard. Recursively duplicates the entire object graph. Handles nested objects, arrays, Dates, Maps, and Sets with zero shared references.
            </p>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] text-xs font-mono w-full">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Top-Level Safe:</span>
              <span className="text-emerald-500 font-bold">Yes</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Nested Safe:</span>
              <span className="text-emerald-500 font-bold">Yes (100% Isolated)</span>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-slate-50 dark:bg-[#0c0e14]/90 border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold block mb-1">
              Interactive Mutation Chamber
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Live Object Telemetry &amp; Mutation Test
            </h3>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Selected Strategy: <strong className="text-amber-500 uppercase font-bold">{mode === "ref" ? "Reference Pointer" : mode === "shallow" ? "Shallow Spread" : "structuredClone"}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
              <span className="font-bold text-slate-900 dark:text-white">Original Object: a</span>
              <span className="text-[10px] text-slate-400">Address: 0x1000</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] flex justify-between">
                <span className="text-slate-500">a.name:</span>
                <strong className="text-slate-900 dark:text-white">&quot;{objA.name}&quot;</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] flex justify-between">
                <span className="text-slate-500">a.theme.dark (Nested):</span>
                <strong className={objA.theme.dark ? "text-emerald-500" : "text-rose-500"}>
                  {String(objA.theme.dark)}
                </strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col items-center gap-3">
            <button
              onClick={mutateName}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-sm cursor-pointer"
            >
              Mutate b.name
            </button>
            <button
              onClick={mutateNestedTheme}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold font-mono text-xs transition-all shadow-sm cursor-pointer"
            >
              Mutate b.theme.dark
            </button>
            <button
              onClick={resetState}
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-200 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 text-xs font-mono hover:bg-slate-300 dark:hover:bg-white/[0.1] transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
              <span className="font-bold text-slate-900 dark:text-white">Target Object: b</span>
              <span className="text-[10px] text-slate-400">
                {mode === "ref" ? "Address: 0x1000 (Shared)" : "Address: 0x2000 (New)"}
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] flex justify-between">
                <span className="text-slate-500">b.name:</span>
                <strong className="text-slate-900 dark:text-white">&quot;{objB.name}&quot;</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] flex justify-between">
                <span className="text-slate-500">b.theme.dark (Nested):</span>
                <strong className={objB.theme.dark ? "text-emerald-500" : "text-rose-500"}>
                  {String(objB.theme.dark)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
