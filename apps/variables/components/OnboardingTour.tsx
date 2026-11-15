"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, Layers, Code2, Compass, Check } from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const completeTour = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("variables_tour_seen_v1", "true");
    } catch {}
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener("open-variables-tour", handleOpen);
    return () => window.removeEventListener("open-variables-tour", handleOpen);
  }, []);

  const tourSteps = [
    {
      title: "Variables, Stack & Heap",
      description: "Understand JavaScript memory architecture. Primitives live directly on the Call Stack as 31-bit Smis, while objects float on the V8 Heap.",
      icon: Layers,
      highlight: "#scene-memory",
    },
    {
      title: "Interactive Declaration Studio",
      description: "Explore the immutable const lock, the mutable let shelf, and why var leaks out of block scopes to create subtle bugs.",
      icon: Code2,
      highlight: "#scene-declarations",
    },
    {
      title: "Laser TDZ Containment",
      description: "Experience the Temporal Dead Zone first-hand. Step line-by-line and watch V8 enforce strict lexical holes before initialization.",
      icon: Compass,
      highlight: "#scene-tdz",
    },
  ];

  if (!isOpen) return null;

  const current = tourSteps[step];
  const Icon = current.icon;

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      const target = document.querySelector(tourSteps[nextStep].highlight);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      completeTour();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10 shadow-2xl">
        <button
          onClick={completeTour}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close tour"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500">
            Module 01 &bull; {step + 1} of {tourSteps.length}
          </span>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
          <Icon size={24} />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {current.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {current.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex gap-1.5">
            {tourSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-amber-500" : "w-1.5 bg-slate-200 dark:bg-white/10"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={completeTour}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
            >
              {step === tourSteps.length - 1 ? (
                <>
                  <Check size={14} /> Got it
                </>
              ) : (
                <>
                  Next <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
