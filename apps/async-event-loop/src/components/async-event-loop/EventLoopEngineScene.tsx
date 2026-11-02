"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Activity, RefreshCw, Play, RotateCcw, Plus, Terminal } from "lucide-react";

interface StackItem {
  id: string;
  name: string;
  type: "sync" | "async";
}

interface WebApiItem {
  id: string;
  name: string;
  timer: number;
}

interface QueueItem {
  id: string;
  name: string;
  origin: string;
}

export function EventLoopEngineScene() {
  const [callStack, setCallStack] = useState<StackItem[]>([
    { id: "1", name: "main()", type: "sync" },
  ]);
  const [webApis, setWebApis] = useState<WebApiItem[]>([]);
  const [microtasks, setMicrotasks] = useState<QueueItem[]>([]);
  const [macrotasks, setMacrotasks] = useState<QueueItem[]>([]);
  const [logs, setLogs] = useState<string[]>(["Engine booted. main() frame initialized."]);
  const [loopPhase, setLoopPhase] = useState<"checking-stack" | "microtasks" | "render" | "macrotask">("checking-stack");
  const [isAutoTicking, setIsAutoTicking] = useState(false);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const pushSync = () => {
    const id = Math.random().toString();
    setCallStack((prev) => [...prev, { id, name: "syncCalc()", type: "sync" }]);
    addLog("Pushed syncCalc() onto Call Stack");
  };

  const pushPromise = () => {
    const id = Math.random().toString();
    setMicrotasks((prev) => [...prev, { id, name: `Promise.then(#${prev.length + 1})`, origin: "Promise.resolve()" }]);
    addLog(`Enqueued Microtask: Promise.then(#${microtasks.length + 1})`);
  };

  const pushTimeout = () => {
    const id = Math.random().toString();
    setWebApis((prev) => [...prev, { id, name: `timerCallback(#${prev.length + 1})`, timer: 2 }]);
    addLog(`Registered Web API: setTimeout(..., 2s)`);
  };

  const resetAll = () => {
    setCallStack([{ id: "1", name: "main()", type: "sync" }]);
    setWebApis([]);
    setMicrotasks([]);
    setMacrotasks([]);
    setLogs(["Engine reset to clean state."]);
    setLoopPhase("checking-stack");
  };

  const stepTick = () => {
    if (callStack.length > 0) {
      setLoopPhase("checking-stack");
      const popped = callStack[callStack.length - 1];
      setCallStack((prev) => prev.slice(0, prev.length - 1));
      addLog(`Call Stack: executed & popped ${popped.name}`);
      return;
    }

    if (webApis.length > 0) {
      const readyApi = webApis[0];
      setWebApis((prev) => prev.slice(1));
      setMacrotasks((prev) => [...prev, { id: readyApi.id, name: readyApi.name, origin: "Web API Timer" }]);
      addLog(`Web API timer expired -> moved ${readyApi.name} to Macrotask Queue`);
      return;
    }

    if (microtasks.length > 0) {
      setLoopPhase("microtasks");
      const nextMicro = microtasks[0];
      setMicrotasks((prev) => prev.slice(1));
      setCallStack([{ id: nextMicro.id, name: nextMicro.name, type: "async" }]);
      addLog(`Event Loop: drained microtask ${nextMicro.name} into Call Stack`);
      return;
    }

    if (macrotasks.length > 0) {
      setLoopPhase("macrotask");
      const nextMacro = macrotasks[0];
      setMacrotasks((prev) => prev.slice(1));
      setCallStack([{ id: nextMacro.id, name: nextMacro.name, type: "async" }]);
      addLog(`Event Loop: dequeued 1 macrotask ${nextMacro.name} into Call Stack`);
      return;
    }

    setLoopPhase("render");
    addLog("Event loop idle: stack & queues empty, frame render window clear.");
  };

  useEffect(() => {
    if (!isAutoTicking) return;
    const interval = setInterval(() => {
      stepTick();
    }, 1200);
    return () => clearInterval(interval);
  });

  return (
    <section id="engine-section" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#070709]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-4">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Interactive Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            The 4-Quadrant Concurrency Model
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Observe in real-time how the single Call Stack coordinates with native Web APIs and queues.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={pushSync}
            className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> + Sync Function
          </button>
          <button
            onClick={pushPromise}
            className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 text-purple-300 text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> + Microtask (Promise)
          </button>
          <button
            onClick={pushTimeout}
            className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> + Macrotask (setTimeout)
          </button>
          <button
            onClick={stepTick}
            className="px-6 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold flex items-center gap-2 cursor-pointer hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Next Tick
          </button>
          <button
            onClick={() => setIsAutoTicking(!isAutoTicking)}
            className={`px-4 py-2 rounded-xl border text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              isAutoTicking
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoTicking ? "animate-spin" : ""}`} />
            {isAutoTicking ? "Auto Ticking (ON)" : "Auto Tick (OFF)"}
          </button>
          <button
            onClick={resetAll}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white cursor-pointer transition-all"
            title="Reset Engine"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent backdrop-blur-xl min-h-[260px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Call Stack (LIFO)</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Depth: {callStack.length}
              </span>
            </div>

            <div className="flex flex-col-reverse gap-2 flex-grow justify-start">
              <AnimatePresence>
                {callStack.length === 0 ? (
                  <div className="text-xs font-mono text-white/20 italic self-center my-auto">
                    Stack is empty. Ready for event loop tasks.
                  </div>
                ) : (
                  callStack.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-3 rounded-xl border font-mono text-xs flex justify-between items-center ${
                        idx === callStack.length - 1
                          ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                          : "bg-white/[0.03] border-white/10 text-white/60"
                      }`}
                    >
                      <span className="font-bold">{item.name}</span>
                      <span className="text-[10px] uppercase opacity-60">
                        {idx === callStack.length - 1 ? "Active Frame" : `Stack #${idx + 1}`}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="text-[10px] font-mono text-white/30 mt-3 text-right">
              Top frame executes synchronously
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-transparent backdrop-blur-xl min-h-[260px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-white text-sm">Web APIs (Background Host Threads)</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                Active: {webApis.length}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-grow">
              <AnimatePresence>
                {webApis.length === 0 ? (
                  <div className="text-xs font-mono text-white/20 italic self-center my-auto">
                    No active timers or background network fetches.
                  </div>
                ) : (
                  webApis.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-200 font-mono text-xs flex justify-between items-center"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 animate-pulse">
                        Resolving...
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="text-[10px] font-mono text-white/30 mt-3 text-right">
              Runs off the JS thread without blocking
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-xl min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-white text-sm">Microtask Queue (VIP Priority)</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Pending: {microtasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-grow">
              <AnimatePresence>
                {microtasks.length === 0 ? (
                  <div className="text-xs font-mono text-white/20 italic self-center my-auto">
                    Microtask queue empty.
                  </div>
                ) : (
                  microtasks.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 font-mono text-xs flex justify-between items-center"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-[10px] text-purple-400/80">#{idx + 1} High Priority</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="text-[10px] font-mono text-white/30 mt-3 text-right">
              Drained to 0 before next macrotask
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent backdrop-blur-xl min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Macrotask Queue (Task Queue)</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Pending: {macrotasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-grow">
              <AnimatePresence>
                {macrotasks.length === 0 ? (
                  <div className="text-xs font-mono text-white/20 italic self-center my-auto">
                    Macrotask queue empty.
                  </div>
                ) : (
                  macrotasks.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-mono text-xs flex justify-between items-center"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-[10px] text-amber-400/80">#{idx + 1} In Line</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="text-[10px] font-mono text-white/30 mt-3 text-right">
              Processed 1 item per event loop tick
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-white/40 mb-3 uppercase tracking-wider text-[10px]">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Engine Telemetry Log
          </div>
          <div className="space-y-1.5 text-white/80">
            {logs.map((log, idx) => (
              <div key={idx} className={idx === 0 ? "text-indigo-300 font-bold" : "text-white/40"}>
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
