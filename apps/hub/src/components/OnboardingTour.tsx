"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  ArrowRight,
  Boxes,
  Code2,
  Activity,
  Check
} from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const completeTour = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("jsm_tour_seen_v3", "true");
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
      if (window.location.search.includes("notour")) return;
      const seen = localStorage.getItem("jsm_tour_seen_v3");
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
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        setStep((prev) => (prev < 2 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        setStep((prev) => (prev > 0 ? prev - 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, completeTour]);

  const steps = [
    {
      title: "Welcome to JS Universe",
      description: "Understand JavaScript execution from the inside out. Explore 7 core runtime concepts through clear, visual interactive models.",
      badge: "Overview",
      icon: Boxes,
      iconColor: "#f59e0b",
      iconBg: "#fef3c7"
    },
    {
      title: "Live Execution Stepper",
      description: "Click 'Next Step' to watch code run line-by-line while tracking Call Stack frames and Heap object memory in real time.",
      badge: "Parent Console",
      icon: Code2,
      iconColor: "#6366f1",
      iconBg: "#e0e7ff"
    },
    {
      title: "Standalone Deep Dives",
      description: "Ready for deep mastery? Click 'Launch Visualizer' to open full multi-chapter interactive sandboxes and coding challenges.",
      badge: "Child Apps",
      icon: Activity,
      iconColor: "#e11d48",
      iconBg: "#ffe4e6"
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
          aria-labelledby="jsm-tour-heading"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm transition-opacity"
        >
          <div className="relative w-full max-w-[420px] bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden text-slate-900 transition-all">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {current.badge} &middot; {step + 1} of 3
              </span>

              <button
                onClick={completeTour}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close onboarding"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-xs"
                style={{ backgroundColor: current.iconBg }}
              >
                <IconComp size={26} style={{ color: current.iconColor }} />
              </div>

              <h3 id="jsm-tour-heading" className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                {current.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-6 max-w-xs">
                {current.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === step
                        ? "w-6 bg-slate-900"
                        : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Step ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {step < 2 && (
                  <button
                    onClick={completeTour}
                    className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Skip
                  </button>
                )}

                {step < 2 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="px-4 py-2 min-h-[38px] rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Next</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={completeTour}
                    className="px-4 py-2 min-h-[38px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Check size={14} />
                    <span>Get Started</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
