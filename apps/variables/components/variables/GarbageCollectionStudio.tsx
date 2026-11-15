"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, RefreshCw, Zap, Cpu, CheckCircle2, ShieldCheck, Sparkles, Activity, Radio, AlertTriangle } from "lucide-react";

interface HeapNode {
  id: string;
  label: string;
  sizeKb: number;
  type: "root" | "session" | "cache" | "dom" | "circularA" | "circularB";
  address: string;
  properties: string[];
}

export function GarbageCollectionStudio() {
  const [rootActive, setRootActive] = useState(true);
  const [cacheActive, setCacheActive] = useState(true);
  const [sessionActive, setSessionActive] = useState(true);
  const [circularActive, setCircularActive] = useState(true);

  const [gcState, setGcState] = useState<"idle" | "marking" | "sweeping" | "reclaimed">("idle");
  const [sweptNodes, setSweptNodes] = useState<string[]>([]);
  const [reclaimedBytes, setReclaimedBytes] = useState(0);

  const initialNodes: HeapNode[] = [
    { id: "root", label: "globalThis / window", sizeKb: 64, type: "root", address: "0x0001", properties: ["activeStackFrame", "eventListeners"] },
    { id: "session", label: "authSession", sizeKb: 128, type: "session", address: "0x4B20", properties: ["userId: 941", "token: 'jwt_...'"] },
    { id: "cache", label: "responseCache", sizeKb: 512, type: "cache", address: "0x8E14", properties: ["articles: [500 items]", "timestamp"] },
    { id: "dom", label: "detachedButton", sizeKb: 96, type: "dom", address: "0x91F0", properties: ["onclick: fn()", "styleSheet"] },
    { id: "circA", label: "nodeA (parent)", sizeKb: 80, type: "circularA", address: "0x2C40", properties: ["child: -> nodeB"] },
    { id: "circB", label: "nodeB (child)", sizeKb: 80, type: "circularB", address: "0x2C50", properties: ["parent: -> nodeA"] }
  ];

  const isReachable = (nodeId: string) => {
    if (nodeId === "root") return true;
    if (nodeId === "session") return rootActive && sessionActive;
    if (nodeId === "cache") return rootActive && cacheActive;
    if (nodeId === "dom") return false;
    if (nodeId === "circA" || nodeId === "circB") return rootActive && circularActive;
    return false;
  };

  const runGarbageCollector = () => {
    if (gcState !== "idle") return;

    setGcState("marking");
    setTimeout(() => {
      setGcState("sweeping");

      const condemned: string[] = [];
      let freed = 0;
      initialNodes.forEach((n) => {
        if (!isReachable(n.id)) {
          condemned.push(n.id);
          freed += n.sizeKb;
        }
      });

      setTimeout(() => {
        setSweptNodes(condemned);
        setReclaimedBytes(freed);
        setGcState("reclaimed");
      }, 1200);
    }, 1200);
  };

  const resetAll = () => {
    setRootActive(true);
    setCacheActive(true);
    setSessionActive(true);
    setCircularActive(true);
    setGcState("idle");
    setSweptNodes([]);
    setReclaimedBytes(0);
  };

  const totalHeapKb = initialNodes.reduce((acc, curr) => {
    if (sweptNodes.includes(curr.id)) return acc;
    return acc + curr.sizeKb;
  }, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          06 &bull; Automatic Memory Management
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Invisible Janitor: V8 Garbage Collector
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Unlike manual memory languages, JavaScript employs an asynchronous Mark-and-Sweep reachability engine. Objects survive solely if a valid reference chain extends from GC Roots.
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-[#0c0e14]/90 border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Phase Telemetry Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 pb-6 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div className={`p-3.5 rounded-xl border transition-all ${
            gcState === "marking"
              ? "bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10"
              : "bg-white/60 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/[0.04]"
          }`}>
            <span className="text-[10px] font-mono font-bold text-cyan-500 uppercase block mb-0.5">Phase 1 &bull; Reachability Trace</span>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Mark Live Graph</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Traverses roots; sets 1-bit mark flag on live objects.</p>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all ${
            gcState === "sweeping"
              ? "bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/10"
              : "bg-white/60 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/[0.04]"
          }`}>
            <span className="text-[10px] font-mono font-bold text-amber-500 uppercase block mb-0.5">Phase 2 &bull; Linear Sweep</span>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Reclaim Dead Memory</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Unmarked heap blocks freed into allocation pool.</p>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all ${
            gcState === "reclaimed"
              ? "bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-500/10"
              : "bg-white/60 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/[0.04]"
          }`}>
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase block mb-0.5">Historical Triumph</span>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Circular Cycles Swept</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Detached A &harr; B loops swept safely without memory leaks.</p>
          </div>
        </div>
        {gcState === "marking" && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none z-30"
          />
        )}
        {gcState === "sweeping" && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-amber-500/25 to-transparent pointer-events-none z-30"
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold block mb-1">
              Reachability Topology
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              V8 Mark-and-Sweep Simulator
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runGarbageCollector}
              disabled={gcState !== "idle"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs transition-all shadow-md bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              {gcState === "idle" && "Trigger V8 Scavenger"}
              {gcState === "marking" && "Marking Reachable..."}
              {gcState === "sweeping" && "Sweeping Orphaned..."}
              {gcState === "reclaimed" && "Sweep Complete"}
            </button>

            <button
              onClick={resetAll}
              className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/[0.1] transition-all cursor-pointer"
              title="Reset Topology"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> GC ROOT
                </span>
                <span>0x0001</span>
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">globalThis / window</h5>
              <p className="text-[11px] text-slate-500">Root anchor for memory graph</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] text-[10px] text-emerald-500 font-bold">
              Root Anchor Active
            </div>
          </div>

          <AnimatePresence>
            {!sweptNodes.includes("session") && (
              <motion.div
                exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span className={isReachable("session") ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                      {isReachable("session") ? "REACHABLE" : "ORPHANED"}
                    </span>
                    <span>0x4B20</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">authSession (128 KB)</h5>
                  <p className="text-[11px] text-slate-500">User session &amp; JWT token</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                  <button
                    onClick={() => setSessionActive(!sessionActive)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {sessionActive ? "Sever pointer (null)" : "Reconnect pointer"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!sweptNodes.includes("cache") && (
              <motion.div
                exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span className={isReachable("cache") ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                      {isReachable("cache") ? "REACHABLE" : "ORPHANED"}
                    </span>
                    <span>0x8E14</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">responseCache (512 KB)</h5>
                  <p className="text-[11px] text-slate-500">API payload buffer</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                  <button
                    onClick={() => setCacheActive(!cacheActive)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {cacheActive ? "Sever pointer (null)" : "Reconnect pointer"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!sweptNodes.includes("dom") && (
              <motion.div
                exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-rose-500/30 font-mono text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span className="text-rose-500 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> ORPHANED
                    </span>
                    <span>0x91F0</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">detachedButton (96 KB)</h5>
                  <p className="text-[11px] text-slate-500">Unmounted DOM node leak</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] text-[10px] text-rose-500 font-bold">
                  Marked for Deallocation
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!sweptNodes.includes("circA") && (
              <motion.div
                exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span className={circularActive ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                      {circularActive ? "CIRCULAR (ROOTED)" : "CIRCULAR (ORPHANED)"}
                    </span>
                    <span>0x2C40</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">nodeA.child = nodeB</h5>
                  <p className="text-[11px] text-slate-500">Loop with Node B (80 KB)</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                  <button
                    onClick={() => setCircularActive(!circularActive)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {circularActive ? "Sever root link" : "Reconnect root link"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!sweptNodes.includes("circB") && (
              <motion.div
                exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span className={circularActive ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                      {circularActive ? "CIRCULAR (ROOTED)" : "CIRCULAR (ORPHANED)"}
                    </span>
                    <span>0x2C50</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">nodeB.parent = nodeA</h5>
                  <p className="text-[11px] text-slate-500">Loop with Node A (80 KB)</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] text-[10px] text-slate-500">
                  {circularActive ? "Reachable via root" : "Swept as unrooted cycle"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-500">Active Heap Footprint: <strong className="text-slate-900 dark:text-white">{totalHeapKb} KB</strong></span>
          {reclaimedBytes > 0 && (
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              +{reclaimedBytes} KB Reclaimed by V8
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
