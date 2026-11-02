"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Plus, Trash2, ToggleLeft, ToggleRight, Sparkles, Terminal } from "lucide-react";

interface DomNode {
  id: string;
  tag: string;
  text: string;
  isGlowing: boolean;
}

export function SandboxScene() {
  const [nodes, setNodes] = useState<DomNode[]>([
    { id: "1", tag: "div.container", text: "Root Container", isGlowing: false },
    { id: "2", tag: "h3.title", text: "Interactive DOM Title", isGlowing: true },
    { id: "3", tag: "p.description", text: "Live mutated paragraph node", isGlowing: false }
  ]);
  const [lastExecutedCode, setLastExecutedCode] = useState<string>("const container = document.querySelector('.container');");

  const appendChildNode = () => {
    const id = Math.random().toString().slice(2, 6);
    const newNode: DomNode = {
      id,
      tag: `span.badge-#${id}`,
      text: `Dynamic Item #${id}`,
      isGlowing: false
    };
    setNodes((prev) => [...prev, newNode]);
    setLastExecutedCode(`const badge = document.createElement('span');\nbadge.className = '${newNode.tag}';\ncontainer.appendChild(badge);`);
  };

  const removeLastNode = () => {
    if (nodes.length <= 1) return;
    const removed = nodes[nodes.length - 1];
    setNodes((prev) => prev.slice(0, prev.length - 1));
    setLastExecutedCode(`container.removeChild(document.querySelector('.${removed.tag}'));`);
  };

  const toggleGlow = () => {
    if (nodes.length > 1) {
      setNodes((prev) =>
        prev.map((n, i) => (i === 1 ? { ...n, isGlowing: !n.isGlowing } : n))
      );
      setLastExecutedCode(`title.classList.toggle('neon-glow');`);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-[#060608]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Code2 className="w-3.5 h-3.5" /> DOM Tree Sandbox
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Live DOM Manipulation Sandbox
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Manipulate node structures and watch the C++ tree and live rendered viewport respond in synchrony.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={appendChildNode}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" /> document.appendChild()
          </button>
          <button
            onClick={toggleGlow}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" /> classList.toggle(&apos;glow&apos;)
          </button>
          <button
            onClick={removeLastNode}
            disabled={nodes.length <= 1}
            className="px-5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 disabled:opacity-40 font-semibold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> removeChild()
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-xs font-mono text-orange-400 uppercase font-bold">
                  Hierarchical DOM Tree (RAM)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                  {nodes.length} Live Nodes
                </span>
              </div>

              <div className="space-y-2.5 min-h-[220px]">
                <AnimatePresence>
                  {nodes.map((node, idx) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between ${
                        idx === 0
                          ? "bg-white/[0.04] border-white/10 text-white/70"
                          : node.isGlowing
                          ? "bg-orange-500/20 border-orange-400 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                          : "bg-white/[0.02] border-white/5 text-white/80"
                      }`}
                      style={{ marginLeft: `${Math.min(idx * 16, 48)}px` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-bold">&lt;{node.tag}&gt;</span>
                        <span className="text-white/40 truncate max-w-[150px]">{node.text}</span>
                      </div>
                      <span className="text-[10px] text-white/30">NodeId: {node.id}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                <Terminal className="w-3 h-3 text-orange-400" /> Executed JavaScript
              </div>
              <pre className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs text-orange-300 overflow-x-auto">
                {lastExecutedCode}
              </pre>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                  Simulated Browser Viewport
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 min-h-[220px] flex flex-col gap-3">
                <div className="text-xs font-mono text-white/40">Viewport Frame (100% width)</div>
                {nodes.slice(1).map((node) => (
                  <motion.div
                    key={node.id}
                    layout
                    className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                      node.isGlowing
                        ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-400 text-orange-200 shadow-[0_0_25px_rgba(249,115,22,0.4)]"
                        : "bg-white/[0.03] border-white/10 text-white/80"
                    }`}
                  >
                    {node.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 leading-relaxed font-sans">
              Mutating the DOM dynamically updates layout geometry and triggers reflow calculations across the browser compositor.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
