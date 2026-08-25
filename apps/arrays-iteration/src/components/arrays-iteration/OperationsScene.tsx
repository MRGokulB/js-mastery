"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function OperationsScene() {
  const [items, setItems] = useState([{ id: 1, val: "A" }, { id: 2, val: "B" }, { id: 3, val: "C" }]);
  const [nextId, setNextId] = useState(4);
  const [lastAction, setLastAction] = useState<"push" | "pop" | "shift" | "unshift" | null>(null);

  const pushItem = () => {
    setItems([...items, { id: nextId, val: String.fromCharCode(64 + nextId) }]);
    setNextId(n => n + 1);
    setLastAction("push");
  };

  const popItem = () => {
    if (items.length === 0) return;
    setItems(items.slice(0, -1));
    setLastAction("pop");
  };

  const unshiftItem = () => {
    setItems([{ id: nextId, val: String.fromCharCode(64 + nextId) }, ...items]);
    setNextId(n => n + 1);
    setLastAction("unshift");
  };

  const shiftItem = () => {
    if (items.length === 0) return;
    setItems(items.slice(1));
    setLastAction("shift");
  };

  const isCostly = lastAction === "shift" || lastAction === "unshift";

  return (
    <div className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center pt-32 pb-24 px-6 z-10">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Array Operations</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Notice how <code className="text-cyan-400">push</code> and <code className="text-cyan-400">pop</code> only affect the end of the array, while <code className="text-pink-400">shift</code> and <code className="text-pink-400">unshift</code> force every single element to re-index!
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center gap-12">
        
        {/* The Array Container */}
        <div className="w-full h-32 bg-black border border-white/10 rounded-2xl p-4 flex items-center justify-start overflow-x-auto shadow-2xl relative">
          
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex flex-col items-center mx-2 shrink-0"
              >
                <div className="text-cyan-500/50 font-mono text-xs mb-2">[{index}]</div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-900/50 to-cyan-950/50 border border-cyan-500/30 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  {item.val}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="w-full text-center text-white/20 font-mono">Empty Array []</div>
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          <button onClick={unshiftItem} className="flex flex-col items-center p-4 rounded-xl border border-pink-500/30 bg-pink-950/20 hover:bg-pink-900/40 transition-colors group">
            <span className="font-mono text-pink-400 font-bold">.unshift(X)</span>
            <span className="text-xs text-white/40 mt-1 text-center">Add to start</span>
          </button>
          <button onClick={shiftItem} className="flex flex-col items-center p-4 rounded-xl border border-pink-500/30 bg-pink-950/20 hover:bg-pink-900/40 transition-colors group">
            <span className="font-mono text-pink-400 font-bold">.shift()</span>
            <span className="text-xs text-white/40 mt-1 text-center">Remove from start</span>
          </button>
          
          <button onClick={pushItem} className="flex flex-col items-center p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/40 transition-colors group">
            <span className="font-mono text-cyan-400 font-bold">.push(X)</span>
            <span className="text-xs text-white/40 mt-1 text-center">Add to end</span>
          </button>
          <button onClick={popItem} className="flex flex-col items-center p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/40 transition-colors group">
            <span className="font-mono text-cyan-400 font-bold">.pop()</span>
            <span className="text-xs text-white/40 mt-1 text-center">Remove from end</span>
          </button>
        </div>

        {/* Status indicator */}
        <AnimatePresence mode="wait">
          {lastAction && (
            <motion.div
              key={lastAction}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start gap-3 p-4 rounded-xl border max-w-xl w-full
                ${isCostly ? "bg-pink-950/20 border-pink-500/30" : "bg-cyan-950/20 border-cyan-500/30"}
              `}
            >
              <AlertCircle className={`w-5 h-5 shrink-0 ${isCostly ? "text-pink-400" : "text-cyan-400"}`} />
              <div className="text-sm text-white/80 leading-relaxed">
                {isCostly ? (
                  <>
                    <strong className="text-pink-400">{lastAction}()</strong> forces the engine to recalculate the index of <em>every single subsequent element</em>. In an array of 1,000,000 items, this requires 1,000,000 memory moves! <span className="text-pink-300">O(n) Cost</span>.
                  </>
                ) : (
                  <>
                    <strong className="text-cyan-400">{lastAction}()</strong> simply modifies the memory block at the very end of the array. The indices of existing elements never change! <span className="text-cyan-300">O(1) Cost</span>.
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
