"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Compass, Layers, CheckCircle2 } from "lucide-react";

export function AnalogyScene() {
  const [activeTab, setActiveTab] = useState<"blueprint" | "steel" | "interior" | "elevators">("steel");

  const cards = {
    blueprint: {
      title: "The Raw Blueprint (HTML String)",
      subtitle: "Passive text instructions received over the wire.",
      description: "When the browser downloads an index.html file, it receives plain UTF-8 bytes. The blueprint describes where walls and windows should theoretically exist, but nobody can walk inside a piece of paper.",
      techAnalogy: "Network stream & Tokenizer: Bytes are converted into tokens (start tag, attribute, end tag) before constructing any objects in RAM.",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30"
    },
    steel: {
      title: "The Steel Skeleton (The C++ DOM Tree)",
      subtitle: "The live physical structural frame in memory.",
      description: "The browser parses the blueprint and builds a living tree of heavy C++ objects in RAM. Each HTMLElement contains coordinates, parent/child pointers, event listener maps, and prototype chains.",
      techAnalogy: "Document Object Model: A hierarchical tree of Node instances instantiated in browser memory, bridged to JS via the global 'window.document' handle.",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30"
    },
    interior: {
      title: "The Finishes & Glass (CSSOM & Render Tree)",
      subtitle: "Filtering invisible nodes and computing geometry.",
      description: "Display: none elements (like <script>, <meta>, or hidden modals) exist in the steel skeleton but are omitted from the visible render tree. CSS rules cascade to compute exact pixel colors, padding, and borders.",
      techAnalogy: "Render Tree: The union of DOM and CSSOM containing only nodes that actively contribute to the painted pixels on the user viewport.",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30"
    },
    elevators: {
      title: "Smart Elevators & Wiring (JavaScript API Bridge)",
      subtitle: "Dynamic motors mutating physical nodes in real time.",
      description: "JavaScript doesn't own the steel structure. When your JS runs 'button.addEventListener' or 'node.appendChild', it communicates across the C++ bridge to move structural beams dynamically.",
      techAnalogy: "Host Web APIs: JS is merely the remote control invoking native engine methods. Crossing this bridge frequently causes performance penalties (Layout Thrashing).",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#060608]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" /> Conceptual Model
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            The Skyscraper Architecture Analogy
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Understand why the DOM is completely separate from the JavaScript V8 engine, and why bridging between them has real computational weight.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { id: "blueprint", label: "1. The Blueprint", sub: "Raw HTML" },
            { id: "steel", label: "2. The Steel Skeleton", sub: "C++ DOM Tree" },
            { id: "interior", label: "3. Finishes & Glass", sub: "Render Tree" },
            { id: "elevators", label: "4. Smart Motors", sub: "JavaScript Bridge" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-orange-500/20 border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.2)]"
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
                  <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-orange-300 font-bold mb-1">Engine Reality</div>
                    <div className="text-sm text-white/80 leading-relaxed">
                      {cards[activeTab].techAnalogy}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between shrink-0">
                <div className="text-xs font-mono uppercase text-white/40 tracking-wider mb-4">
                  Critical Invariants
                </div>
                <div className="space-y-4 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>HTML is parsed top-to-bottom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span>DOM is memory-resident in C++</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Render tree hides display:none</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span>JS mutation forces reflow</span>
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
