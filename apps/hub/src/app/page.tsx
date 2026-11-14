"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Layers,
  Workflow,
  Code2,
  Cpu,
  Terminal,
  Activity,
  Zap,
  Globe,
  Boxes,
  Compass,
  ArrowRight
} from "lucide-react";
import V8EngineCore3D, { V8_MODULE_SYSTEMS, V8ModuleMeta } from "../components/V8EngineCore3D";
import { OnboardingTour } from "../components/OnboardingTour";
import { ThemeToggle } from "../components/ThemeToggle";

const SYSTEM_ICONS = {
  variables: Layers,
  "control-flow": Workflow,
  "functions-scope": Code2,
  "arrays-iteration": Cpu,
  "objects-maps": Terminal,
  "async-event-loop": Activity,
  "dom-apis": Globe
};

function VisualTopicCard({ item, IconComp }: { item: V8ModuleMeta; IconComp: any }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer transition-all"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}` }}
          >
            <IconComp size={20} style={{ color: item.accent }} />
          </div>
          <span className="text-[11px] font-mono font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
            SYS {item.index}
          </span>
        </div>

        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {item.tagline}
        </p>

        <div className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-4 flex items-center justify-between">
          <span className="truncate">{item.subsystem}</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60">
            {item.category}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-amber-500 transition-colors">
        <span>Launch Visualizer</span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </a>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState<string>("variables");

  const activeModule = useMemo<V8ModuleMeta>(() => {
    return V8_MODULE_SYSTEMS.find((m) => m.id === activeId) || V8_MODULE_SYSTEMS[0];
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#07090e] ambient-mesh text-slate-900 dark:text-slate-100 selection:bg-amber-100 selection:text-slate-900 relative overflow-x-hidden transition-colors duration-200">
      <OnboardingTour />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#07090e]/85 backdrop-blur-xl transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-sm border border-slate-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent pointer-events-none" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path d="M12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5L12 2.5Z" stroke="#f59e0b" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 16C9 16.5 9.8 17 10.8 17C11.8 17 12.5 16.5 12.5 15V10" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M14.5 16.2C15.2 16.8 16.2 16.8 17 16.2C17.6 15.7 17.6 14.8 17 14.2C16 13.4 14.5 13 14.5 11.8C14.5 10.6 15.5 9.8 16.8 9.8C17.6 9.8 18.3 10.2 18.8 10.6" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white block leading-tight">
                JavaScript Universe
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                Visual Runtime &amp; V8 Engine Explorer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-jsm-tour"))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              <Compass size={14} className="text-slate-600 dark:text-slate-400" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/js-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-all text-xs font-semibold !text-white shadow-xs"
            >
              <Code2 size={14} className="!text-white" />
              <span className="!text-white">GitHub ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-28 relative z-10">
        <section className="mb-10 text-center sm:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Understand JavaScript, <br />
                <span className="text-slate-500 dark:text-slate-400 font-semibold">
                  from the inside out.
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Step through live execution contexts, Stack vs Heap memory allocations, and Event Loop microtask priority with clear visual diagrams.
            </p>
          </div>

          <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-start gap-2 shadow-xs">
            {V8_MODULE_SYSTEMS.map((mod) => {
              const isSelected = activeId === mod.id;
              const IconComp = SYSTEM_ICONS[mod.id as keyof typeof SYSTEM_ICONS] || Layers;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveId(mod.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-[1.02]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <IconComp size={14} style={{ color: isSelected ? "#f59e0b" : mod.accent }} />
                  <span>{mod.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <V8EngineCore3D
            activeId={activeId}
            onSelectModule={(id) => setActiveId(id)}
          />
        </section>

        <section className="pt-12 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold block mb-1">
                CURATED LEARNING PATH
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                7 Visual JavaScript Adventures
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Click any module to launch the dedicated standalone visualizer
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V8_MODULE_SYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
              return (
                <VisualTopicCard
                  key={item.id}
                  item={item}
                  IconComp={IconComp}
                />
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-[#07090e]/80 py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-800 dark:text-slate-200">JavaScript Universe</span>
            <span>&copy; 2026 &middot; Visual V8 Engine Internals</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="https://variables-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
              Variables &amp; Stack
            </a>
            <a href="https://async-event-loop-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
              Event Loop
            </a>
            <a href="https://functions-scope.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
              Functions &amp; Scope
            </a>
            <a href="https://github.com/MRGokulB/js-mastery" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
