"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, CheckCircle2, ShieldAlert, Sparkles, ArrowRight, Play, Shield, Zap, Lock, Unlock } from "lucide-react";

export function TdzChamber() {
  const [currentLine, setCurrentLine] = useState<number>(2);
  const declarationLine = 3;
  const isInsideTdz = currentLine < declarationLine;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          05 &bull; Hoisting &amp; Compilation Lifecycle
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Temporal Dead Zone (TDZ)
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Why does <code className="text-rose-500 font-mono">var</code> silently return <code className="text-slate-900 dark:text-white font-mono">undefined</code> when accessed early, while <code className="text-amber-500 font-mono">let</code> crashes with a fatal <code className="text-rose-500 font-mono">ReferenceError</code>? The secret lies in V8&apos;s two-pass compilation pipeline.
        </p>
      </div>

      {/* Integrated Live Pipeline Phase Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-4 rounded-2xl transition-all duration-300 border ${
          currentLine === 1
            ? "bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/10"
            : "bg-white/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] opacity-75"
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2 h-2 rounded-full ${currentLine === 1 ? "bg-amber-500 animate-ping" : "bg-slate-400"}`} />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500">Phase 1: Creation Pass</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Scope Registration</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            V8 registers <code className="text-amber-500 font-mono">taxRate</code> in Scope Record marked as <code className="text-rose-500 font-mono">&lt;The Hole&gt;</code>.
          </p>
        </div>

        <div className={`p-4 rounded-2xl transition-all duration-300 border ${
          isInsideTdz && currentLine === 2
            ? "bg-rose-500/10 border-rose-500/50 shadow-md shadow-rose-500/10"
            : "bg-white/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] opacity-75"
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2 h-2 rounded-full ${isInsideTdz && currentLine === 2 ? "bg-rose-500 animate-ping" : "bg-slate-400"}`} />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500">Phase 2: TDZ Containment</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Laser Barrier Active</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Access before line 3 triggers an engine trap. Hole check fails with a fatal <code className="text-rose-500 font-mono">ReferenceError</code>.
          </p>
        </div>

        <div className={`p-4 rounded-2xl transition-all duration-300 border ${
          currentLine >= 3
            ? "bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-500/10"
            : "bg-white/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] opacity-75"
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2 h-2 rounded-full ${currentLine >= 3 ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`} />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-500">Phase 3: Runtime Execution</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">TDZ Permanently Lifted</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Value written into stack register. Identifier is unlocked for reads, reassignments, and closures.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-[#0c0e14]/90 border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold block mb-1">
              Laser Containment Chamber
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Step Through the Execution Pointer
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Active Execution: <strong className="text-amber-500 font-bold">Line {currentLine} of 5</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-2xl bg-[#080a0f] border border-slate-800 p-5 font-mono text-xs sm:text-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                tdz_lifecycle.js
              </span>
              <span className="text-amber-400">Click any line to evaluate</span>
            </div>

            <div className="space-y-2 relative z-10">
              {[
                { line: 1, code: "// Scope entered. 'taxRate' registered as <The Hole>", status: "IN TDZ" },
                { line: 2, code: "console.log(taxRate); // <-- Access attempt", status: "IN TDZ" },
                { line: 3, code: "let taxRate = 0.15; // <-- Declaration & Init", status: "TDZ LIFTS" },
                { line: 4, code: "console.log(taxRate); // Safe read: 0.15", status: "INITIALIZED" },
                { line: 5, code: "taxRate = 0.18; // Reassignment", status: "INITIALIZED" }
              ].map((item) => (
                <div
                  key={item.line}
                  onClick={() => setCurrentLine(item.line)}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                    currentLine === item.line
                      ? item.status === "IN TDZ"
                        ? "bg-rose-500/15 border-rose-500/50 text-white shadow-lg shadow-rose-500/10"
                        : "bg-emerald-500/15 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-white/[0.02] border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 text-xs w-4">{item.line}</span>
                    <span className="font-mono">{item.code}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                    item.status === "IN TDZ"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : item.status === "TDZ LIFTS"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => setCurrentLine((prev) => (prev < 5 ? prev + 1 : 1))}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Step to Line {currentLine < 5 ? currentLine + 1 : 1}
              </button>
              <span className="text-[11px] text-slate-500">
                Declaration Bound at Line 3
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  V8 Lexical Slot State
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  isInsideTdz
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                }`}>
                  {isInsideTdz ? "TRAPPED IN TDZ" : "SAFE / ACCESSIBLE"}
                </span>
              </div>

              <div className={`p-4 rounded-xl border mb-4 font-mono text-xs transition-all ${
                isInsideTdz
                  ? "bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/30"
                  : "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30"
              }`}>
                <span className="text-slate-400 text-[10px] block mb-1">INTERNAL V8 SLOT:</span>
                <span className={`text-sm font-bold block ${
                  isInsideTdz ? "text-rose-500" : "text-emerald-500"
                }`}>
                  {isInsideTdz ? "<Uninitialized: The Hole>" : "<Initialized: 0.15 Smi>"}
                </span>
                {isInsideTdz && (
                  <div className="mt-2 text-[11px] text-rose-600 dark:text-rose-400 border-t border-rose-500/20 pt-2 flex items-center gap-1">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    ReferenceError: Cannot access &apos;taxRate&apos; before initialization
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isInsideTdz
                  ? "At this execution point, reading or writing 'taxRate' triggers an instant engine bail-out. V8 verifies the slot marker against The Hole and throws ReferenceError to prevent corrupted state."
                  : "Line 3 executed! The Ignition compiler wrote 0.15 into the stack register. The Temporal Dead Zone is permanently deactivated for this scope."}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-500 flex justify-between items-center">
              <span>Compiler Guard:</span>
              <span className={`font-bold ${isInsideTdz ? "text-rose-500" : "text-emerald-500"}`}>
                {isInsideTdz ? "Hole Check: FAIL" : "Hole Check: PASS"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
