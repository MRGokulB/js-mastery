"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Boxes,
  Code2,
  Activity,
  Command,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const completeTour = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("jsm_tour_seen_v2", "true");
    } catch {
      // Local storage not available
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener("open-jsm-tour", handleOpen);

    try {
      const seen = localStorage.getItem("jsm_tour_seen_v2");
      if (!seen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("open-jsm-tour", handleOpen);
        };
      }
    } catch {
      // Local storage not available
    }

    return () => window.removeEventListener("open-jsm-tour", handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        completeTour();
      } else if (e.key === "ArrowRight") {
        setStep((prev) => Math.min(prev + 1, 3));
      } else if (e.key === "ArrowLeft") {
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, completeTour]);

  const steps = [
    {
      kicker: "ECOSYSTEM ARCHITECTURE",
      title: "Parent Hub & Standalone Child Visualizers",
      subtitle: "Understand the dual-tier design of the JavaScript Universe.",
      icon: Boxes,
      iconColor: "#f59e0b",
      iconBg: "#fef3c7",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] font-bold">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                PARENT HUB (You are here)
              </span>
              <span className="text-slate-400">&harr;</span>
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                7 CHILD APPS
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600">
              This application functions as your <strong>Central Command Deck</strong>. It provides high-level runtime telemetry, live memory step-simulations, and instant cross-domain switching.
            </p>
          </div>
          <p>
            Each topic connects directly to a dedicated <strong>Child Application</strong> (e.g. Variables, Event Loop, Closures, Fast Arrays) equipped with in-depth chapter storytelling, sandboxes, and quizzes.
          </p>
        </div>
      )
    },
    {
      kicker: "INTERACTIVE TEST BENCH",
      title: "Live V8 Execution & Memory Playground",
      subtitle: "Line-by-line stepping and runtime state tracing.",
      icon: Code2,
      iconColor: "#6366f1",
      iconBg: "#e0e7ff",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 mb-1">1. Script Editor</div>
              <div className="text-[10px] text-slate-500">
                Active line highlights and plain-English breakdown of what JavaScript is doing under the hood.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 mb-1">2. Memory Architecture</div>
              <div className="text-[10px] text-slate-500">
                Live Call Stack vs Heap memory visualizer and Event Loop microtask priority queues.
              </div>
            </div>
          </div>
          <p>
            Use the <strong>Pill Navigator</strong> or press keys <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-800">1</kbd> through <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-800">7</kbd> to change topics instantly.
          </p>
        </div>
      )
    },
    {
      kicker: "DEEP-DIVE EXPEDITIONS",
      title: "Deploying into Child Applications",
      subtitle: "Multi-chapter standalone interactive visualizers.",
      icon: Activity,
      iconColor: "#e11d48",
      iconBg: "#ffe4e6",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5">
            <div className="font-bold text-indigo-900 text-xs">Inside Each Standalone Child App:</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-mono text-indigo-800">
              <div>&bull; Scope &amp; TDZ Mechanics</div>
              <div>&bull; Memory &amp; Mutation Hazards</div>
              <div>&bull; Scavenger Garbage Collection</div>
              <div>&bull; Event Loop Wheel &amp; Microtasks</div>
              <div>&bull; Interactive Code Sandbox</div>
              <div>&bull; Concept Mastery Quiz</div>
            </div>
          </div>
          <p>
            Click <strong>Launch Full Module ↗</strong> on the playground or <strong>Launch Visualizer ↗</strong> on any card below to launch the standalone child application in a dedicated window.
          </p>
        </div>
      )
    },
    {
      kicker: "NAVIGATION & SHORTCUTS",
      title: "Keyboard Hotkeys & Quick Access",
      subtitle: "Fly through JavaScript runtime internals at maximum velocity.",
      icon: Command,
      iconColor: "#0284c7",
      iconBg: "#e0f2fe",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Topic Keys:</span>
              <span className="font-bold text-slate-900">Keys [ 1 - 7 ]</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Close Tour / Modals:</span>
              <span className="font-bold text-slate-900">Escape</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Reopen Onboarding:</span>
              <span className="font-bold text-indigo-700">Tour button in Header</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Tip: You can navigate backwards and forwards through this tour anytime using the Left and Right arrow keys.
          </p>
        </div>
      )
    }
  ];

  const current = steps[step];
  const IconComp = current.icon;

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="jsm-tour-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-opacity duration-200"
        >
          <div
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: current.iconBg }}
                >
                  <IconComp size={18} style={{ color: current.iconColor }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
                    {current.kicker}
                  </span>
                  <span className="text-xs font-mono font-semibold text-indigo-600">
                    Step {step + 1} of {steps.length}
                  </span>
                </div>
              </div>

              <button
                onClick={completeTour}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                aria-label="Close tour"
              >
                <X size={18} />
              </button>
            </div>

            <h3 id="jsm-tour-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
              {current.title}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {current.subtitle}
            </p>

            <div className="min-h-[160px] mb-6">
              {current.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === step
                        ? "w-7 bg-indigo-600"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Back</span>
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="px-4 py-2 min-h-[40px] rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <span>Next</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={completeTour}
                      className="px-4 py-2 min-h-[40px] rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Explore Hub</span>
                    </button>
                    <a
                      href="https://variables-pi.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={completeTour}
                      className="px-3.5 py-2 min-h-[40px] rounded-xl bg-indigo-600 hover:bg-indigo-500 !text-white font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <span className="!text-white">Open Variables ↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
