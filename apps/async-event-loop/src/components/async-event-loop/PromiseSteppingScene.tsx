"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowLeft, ArrowRight, CheckCircle2, Code2, Layers, Cpu } from "lucide-react";

export function PromiseSteppingScene() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: 0,
      title: "Initial Script Scan",
      codeLine: 1,
      explanation: "V8 parses the file and begins top-to-bottom synchronous execution on the Call Stack.",
      stack: ["main()"],
      webApis: [],
      microtasks: [],
      macrotasks: [],
      output: []
    },
    {
      step: 1,
      title: "Step 1: Synchronous Log '1: Start'",
      codeLine: 1,
      explanation: "console.log('1: Start') pushes onto Call Stack, executes immediately, and outputs '1: Start'.",
      stack: ["main()", "console.log('1: Start')"],
      webApis: [],
      microtasks: [],
      macrotasks: [],
      output: ["1: Start"]
    },
    {
      step: 2,
      title: "Step 2: setTimeout(..., 0)",
      codeLine: 3,
      explanation: "setTimeout() pushes to stack. Browser Web API registers a 0ms timer. Function immediately returns and pops off stack.",
      stack: ["main()"],
      webApis: ["Timer (0ms) -> Task Queue"],
      microtasks: [],
      macrotasks: ["() => console.log('2: Timeout')"],
      output: ["1: Start"]
    },
    {
      step: 3,
      title: "Step 3: Promise.resolve().then(...)",
      codeLine: 7,
      explanation: "Promise resolves synchronously. The .then() callback is queued into the VIP Microtask Queue. It does NOT execute yet.",
      stack: ["main()"],
      webApis: [],
      microtasks: ["() => console.log('3: Microtask')"],
      macrotasks: ["() => console.log('2: Timeout')"],
      output: ["1: Start"]
    },
    {
      step: 4,
      title: "Step 4: Synchronous Log '4: End'",
      codeLine: 11,
      explanation: "console.log('4: End') pushes onto Call Stack, executes immediately, and main() completes and pops off.",
      stack: [],
      webApis: [],
      microtasks: ["() => console.log('3: Microtask')"],
      macrotasks: ["() => console.log('2: Timeout')"],
      output: ["1: Start", "4: End"]
    },
    {
      step: 5,
      title: "Step 5: Event Loop Drains Microtasks",
      codeLine: 8,
      explanation: "Call stack is 0! Event Loop checks Microtasks BEFORE any macrotasks. The Promise callback executes and outputs '3: Microtask'.",
      stack: ["() => console.log('3: Microtask')"],
      webApis: [],
      microtasks: [],
      macrotasks: ["() => console.log('2: Timeout')"],
      output: ["1: Start", "4: End", "3: Microtask"]
    },
    {
      step: 6,
      title: "Step 6: Event Loop Dequeues Macrotask",
      codeLine: 4,
      explanation: "Microtask queue is empty. Event loop now takes ONE task from Macrotask queue. The timer callback executes and outputs '2: Timeout'.",
      stack: ["() => console.log('2: Timeout')"],
      webApis: [],
      microtasks: [],
      macrotasks: [],
      output: ["1: Start", "4: End", "3: Microtask", "2: Timeout"]
    }
  ];

  const s = steps[currentStep];

  return (
    <section id="promise-stepping" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#050507]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" /> Canonical Stepper
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Promise vs setTimeout Stepping
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Why does a Promise with 0ms delay always beat a setTimeout with 0ms delay? Step through the engine mechanics frame by frame.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 sm:p-8 font-mono text-xs sm:text-sm shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="text-white/40 text-xs font-mono">execution_snippet.js</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
            </div>

            <pre className="space-y-1 text-white/80 leading-relaxed overflow-x-auto">
              <div className={currentStep === 1 ? "bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold" : "px-2"}>
                {"console.log('1: Start');"}
              </div>
              <div className="text-white/20 px-2"> </div>
              <div className={currentStep === 2 ? "bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold" : "px-2"}>
                {"setTimeout(() => {"}
              </div>
              <div className={currentStep === 6 ? "bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded font-bold" : "px-2 pl-6"}>
                {"  console.log('2: Timeout');"}
              </div>
              <div className="px-2">{"}, 0);"}</div>
              <div className="text-white/20 px-2"> </div>
              <div className={currentStep === 3 ? "bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold" : "px-2"}>
                {"Promise.resolve().then(() => {"}
              </div>
              <div className={currentStep === 5 ? "bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded font-bold" : "px-2 pl-6"}>
                {"  console.log('3: Microtask');"}
              </div>
              <div className="px-2">{"});"}</div>
              <div className="text-white/20 px-2"> </div>
              <div className={currentStep === 4 ? "bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold" : "px-2"}>
                {"console.log('4: End');"}
              </div>
            </pre>

            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">
                Terminal Standard Output
              </div>
              <div className="min-h-[80px] p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                {s.output.length === 0 ? (
                  <span className="text-white/20 italic">No output yet...</span>
                ) : (
                  s.output.map((out, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-emerald-400 font-bold"
                    >
                      &gt; {out}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                  Step {currentStep} of {steps.length - 1}
                </span>
                <span className="text-xs font-bold text-white/70">
                  {s.title}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {s.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {s.explanation}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="text-indigo-400 font-bold mb-1">Call Stack</div>
                  <div className="text-white/80">
                    {s.stack.length > 0 ? s.stack.join(" &rarr; ") : "(Empty)"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-purple-400 font-bold mb-1">Microtasks (VIP)</div>
                  <div className="text-white/80">
                    {s.microtasks.length > 0 ? s.microtasks.join(", ") : "(Empty)"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-amber-400 font-bold mb-1">Macrotasks (Timers)</div>
                  <div className="text-white/80">
                    {s.macrotasks.length > 0 ? s.macrotasks.join(", ") : "(Empty)"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <div className="text-sky-400 font-bold mb-1">Web APIs</div>
                  <div className="text-white/80">
                    {s.webApis.length > 0 ? s.webApis.join(", ") : "(None)"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer text-white transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>

                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStep(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        currentStep === i
                          ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                          : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentStep === steps.length - 1}
                  onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
