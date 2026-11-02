"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Clock, Flame, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function AnalogyScene() {
  const [activeTab, setActiveTab] = useState<"chef" | "assistants" | "urgent" | "spindle">("chef");

  const cards = {
    chef: {
      title: "The Solo Head Chef (The Call Stack)",
      subtitle: "One pair of hands. Single-threaded precision.",
      description: "The Chef can only plate one dish at a time. If asked to stir a risotto for 10 minutes continuously, the entire kitchen halts: no new orders can be accepted, and no food goes out. This is synchronous code execution.",
      techAnalogy: "Call Stack (LIFO): Functions push when invoked and pop when returned. Blocking the stack freezes the browser UI.",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
    },
    assistants: {
      title: "The Ovens & Prep Cooks (Web APIs / Libuv)",
      subtitle: "Background workers handling time & heavy lifting.",
      description: "The Chef puts bread in the oven with a timer and goes right back to chopping onions. The oven bakes independently in the background. The Chef doesn't stand in front of the oven doing nothing.",
      techAnalogy: "Web APIs (Browser C++ threads): fetch(), setTimeout(), and DOM event listeners run off the main thread in native host environments.",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30"
    },
    urgent: {
      title: "VIP Order Modifications (Microtask Queue)",
      subtitle: "Emergency requests that skip all regular tickets.",
      description: "When an allergy warning or urgent table sauce request arrives, it goes straight to the front of the pass. The Chef MUST resolve every single urgent note before looking at any regular entrees.",
      techAnalogy: "Microtasks (Promises, queueMicrotask): Emptied completely to 0 before the engine renders a frame or executes the next macrotask.",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    spindle: {
      title: "The Main Order Spindle (Macrotask Queue)",
      subtitle: "Regular diner tickets processed one at a time.",
      description: "When the timer dings on the oven, a ticket drops on the spindle. The Expediter only hands the Chef ONE ticket at a time from this spindle, only when all urgent notes are cleared.",
      techAnalogy: "Task Queue (setTimeout, setInterval, I/O): Processed strictly one task per event loop tick cycle.",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30"
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Utensils className="w-3.5 h-3.5" /> Mental Model
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            The Michelin Kitchen Analogy
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Why JavaScript never freezes your computer while downloading huge files over the network, even though it only has one single thread.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { id: "chef", label: "1. The Head Chef", sub: "Call Stack" },
            { id: "assistants", label: "2. The Ovens", sub: "Web APIs" },
            { id: "urgent", label: "3. VIP Slips", sub: "Microtasks" },
            { id: "spindle", label: "4. Order Spindle", sub: "Macrotasks" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.2)]"
                  : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="font-bold text-sm text-white">{tab.label}</div>
              <div className="text-xs text-white/50 font-mono mt-1">{tab.sub}</div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="max-w-2xl">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider mb-4 ${cards[activeTab].badgeColor}`}>
                  {cards[activeTab].subtitle}
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold text-white mb-6">
                  {cards[activeTab].title}
                </h3>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                  {cards[activeTab].description}
                </p>
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-indigo-300 font-bold mb-1">Engine Reality</div>
                    <div className="text-sm text-white/80 leading-relaxed">
                      {cards[activeTab].techAnalogy}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between shrink-0">
                <div className="text-xs font-mono uppercase text-white/40 tracking-wider mb-4">
                  Core Invariant
                </div>
                <div className="space-y-4 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Stack must be 0 depth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Microtasks drain to 0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Macrotask takes 1 only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>UI Paint opportunity</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
