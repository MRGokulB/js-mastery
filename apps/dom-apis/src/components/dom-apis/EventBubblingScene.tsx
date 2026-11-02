"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Play, RotateCcw, ArrowDown, ArrowUp, MousePointerClick } from "lucide-react";

export function EventBubblingScene() {
  const [stopPropagation, setStopPropagation] = useState(false);
  const [capturePhaseActive, setCapturePhaseActive] = useState(false);
  const [eventLogs, setEventLogs] = useState<string[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const triggerClick = () => {
    setEventLogs([]);
    const sequence: { name: string; phase: "capture" | "target" | "bubble" }[] = [];

    if (capturePhaseActive) {
      sequence.push({ name: "window (Capture)", phase: "capture" });
      sequence.push({ name: "document.body (Capture)", phase: "capture" });
      sequence.push({ name: "div.card (Capture)", phase: "capture" });
    }

    sequence.push({ name: "button#cta (Target)", phase: "target" });

    if (!stopPropagation) {
      sequence.push({ name: "div.card (Bubble)", phase: "bubble" });
      sequence.push({ name: "document.body (Bubble)", phase: "bubble" });
      sequence.push({ name: "window (Bubble)", phase: "bubble" });
    }

    sequence.forEach((item, index) => {
      setTimeout(() => {
        setActiveElement(item.name);
        setEventLogs((prev) => [...prev, `${item.phase.toUpperCase()}: ${item.name}`]);
        if (index === sequence.length - 1) {
          setTimeout(() => setActiveElement(null), 600);
        }
      }, index * 400);
    });
  };

  return (
    <section id="event-propagation" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#060608]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4">
            <MousePointerClick className="w-3.5 h-3.5" /> Event Propagation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Capturing vs Target vs Bubbling
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            When a user clicks an element, the browser initiates a 2-way journey through the DOM tree.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setStopPropagation(!stopPropagation)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
              stopPropagation
                ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white"
            }`}
          >
            e.stopPropagation(): {stopPropagation ? "ACTIVE (Halts Bubbling)" : "OFF"}
          </button>

          <button
            onClick={() => setCapturePhaseActive(!capturePhaseActive)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
              capturePhaseActive
                ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {`{ capture: true }`}: {capturePhaseActive ? "LISTENING" : "IGNORED"}
          </button>

          <button
            onClick={triggerClick}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(249,115,22,0.4)]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Click Target Button
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest absolute top-6 left-6">
              Interactive DOM Nesting
            </div>

            <div
              className={`w-full max-w-md p-8 rounded-2xl border transition-all ${
                activeElement?.includes("body")
                  ? "bg-amber-500/10 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]"
                  : "bg-black/40 border-white/10"
              }`}
            >
              <div className="text-[10px] font-mono text-white/40 mb-3">&lt;body&gt;</div>

              <div
                className={`p-6 rounded-xl border transition-all ${
                  activeElement?.includes("card")
                    ? "bg-orange-500/15 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >
                <div className="text-[10px] font-mono text-white/40 mb-3">&lt;div class=&quot;card&quot;&gt;</div>

                <button
                  onClick={triggerClick}
                  className={`w-full py-4 px-6 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeElement?.includes("button")
                      ? "bg-orange-500 text-white border-orange-300 shadow-[0_0_40px_rgba(249,115,22,0.6)] scale-105"
                      : "bg-white/10 text-white/90 border-white/20 hover:bg-white/20"
                  }`}
                >
                  <MousePointerClick className="w-4 h-4" />
                  &lt;button id=&quot;cta&quot;&gt; Click Me! &lt;/button&gt;
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between font-mono text-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-white/50 text-xs">Event Propagation Stream</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                  Telemetry
                </span>
              </div>

              <div className="space-y-2 min-h-[180px]">
                {eventLogs.length === 0 ? (
                  <div className="text-white/20 italic self-center py-10 text-center">
                    Click the button to trace event propagation through the capturing and bubbling phases.
                  </div>
                ) : (
                  eventLogs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-2 rounded-lg border flex items-center justify-between ${
                        log.startsWith("CAPTURE")
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                          : log.startsWith("TARGET")
                          ? "bg-orange-500/20 border-orange-500/50 text-orange-100 font-bold"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-200"
                      }`}
                    >
                      <span>{log}</span>
                      <span className="text-[10px] opacity-60">Step {i + 1}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-white/50 leading-relaxed font-sans">
              <strong>Event Delegation:</strong> By attaching a single listener to the parent <code className="font-mono text-orange-300">&lt;div class=&quot;card&quot;&gt;</code>, you can handle clicks on 10,000 child elements using <code className="font-mono text-orange-300">event.target</code> with minimal RAM.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
