"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Play, RotateCcw, Terminal, Zap, Check } from "lucide-react";

const PRESETS = [
  {
    id: "race",
    name: "Promise vs Timeout Race",
    code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    execution: [
      { action: "Pushed & Executed: console.log('A')", out: "A" },
      { action: "Registered setTimeout(0) in Web API -> Macrotask Queue", out: null },
      { action: "Queued Promise.resolve().then() -> Microtask Queue", out: null },
      { action: "Pushed & Executed: console.log('D')", out: "D" },
      { action: "Stack empty -> Drained Microtask: console.log('C')", out: "C" },
      { action: "Microtasks empty -> Executed Macrotask: console.log('B')", out: "B" }
    ]
  },
  {
    id: "async-await",
    name: "Async/Await Desugaring",
    code: `async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}
test();
console.log("3");`,
    execution: [
      { action: "Invoked test() synchronously: prints '1'", out: "1" },
      { action: "Encountered 'await Promise.resolve()': pauses test() & queues microtask", out: null },
      { action: "Main execution continues: prints '3'", out: "3" },
      { action: "Stack empty -> Microtask resumes test() after await: prints '2'", out: "2" }
    ]
  },
  {
    id: "nested",
    name: "Nested Microtask Chain",
    code: `Promise.resolve().then(() => {
  console.log("Micro 1");
  Promise.resolve().then(() => console.log("Micro 2"));
});
setTimeout(() => console.log("Macro 1"), 0);`,
    execution: [
      { action: "Queued outer Promise -> Microtask Queue", out: null },
      { action: "Queued setTimeout(0) -> Macrotask Queue", out: null },
      { action: "Stack empty -> Drained Micro 1: prints 'Micro 1'", out: "Micro 1" },
      { action: "Outer microtask queued Micro 2 -> Drained immediately before macrotasks", out: "Micro 2" },
      { action: "Microtasks finally 0 -> Executed Macro 1: prints 'Macro 1'", out: "Macro 1" }
    ]
  }
];

export function SandboxScene() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [running, setRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [consoleOut, setConsoleOut] = useState<string[]>([]);

  const runSimulation = () => {
    setRunning(true);
    setLogs([]);
    setConsoleOut([]);
    setCurrentStepIndex(-1);

    selectedPreset.execution.forEach((step, idx) => {
      setTimeout(() => {
        setCurrentStepIndex(idx);
        setLogs((prev) => [...prev, step.action]);
        if (step.out) {
          setConsoleOut((prev) => [...prev, step.out as string]);
        }
        if (idx === selectedPreset.execution.length - 1) {
          setRunning(false);
        }
      }, (idx + 1) * 700);
    });
  };

  const reset = () => {
    setRunning(false);
    setCurrentStepIndex(-1);
    setLogs([]);
    setConsoleOut([]);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#050508]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Code2 className="w-3.5 h-3.5" /> Interactive Sandbox
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Event Loop Code Sandbox
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Select a concurrency scenario and watch the V8 execution pipeline step through it.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                reset();
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedPreset.id === preset.id
                  ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                  : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-xs font-mono text-white/50">{selectedPreset.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  JavaScript
                </span>
              </div>
              <pre className="font-mono text-xs sm:text-sm text-indigo-200 leading-relaxed overflow-x-auto p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                {selectedPreset.code}
              </pre>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
              <button
                disabled={running}
                onClick={runSimulation}
                className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {running ? "Simulating Execution..." : "Run Simulation"}
              </button>
              <button
                onClick={reset}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white cursor-pointer transition-all"
                title="Reset Sandbox"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-wider mb-4">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" /> Live Execution Trace
                </div>
                <div className="space-y-2 min-h-[140px]">
                  {logs.length === 0 ? (
                    <div className="text-xs font-mono text-white/20 italic">
                      Click &quot;Run Simulation&quot; to inspect microtasks &amp; macrotasks in motion.
                    </div>
                  ) : (
                    logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs font-mono p-2 rounded-lg border ${
                          i === logs.length - 1
                            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300 font-semibold"
                            : "bg-white/[0.01] border-transparent text-white/60"
                        }`}
                      >
                        Step {i + 1}: {log}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                  <Terminal className="w-3 h-3 text-emerald-400" /> Standard Console Output
                </div>
                <div className="p-3 rounded-xl bg-black/80 border border-white/10 font-mono text-xs flex gap-2 flex-wrap min-h-[44px] items-center">
                  {consoleOut.length === 0 ? (
                    <span className="text-white/20 italic">Empty output stream</span>
                  ) : (
                    consoleOut.map((out, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                        {out}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
