"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, ArrowRight, ArrowDown } from "lucide-react";

export function PatternsScene() {
  const [highlightRow, setHighlightRow] = useState<number | null>(null);
  const [highlightCol, setHighlightCol] = useState<number | null>(null);

  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Matrix (2D Arrays)</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          An array can hold anything—even other arrays! This creates a grid structure. You use <code className="text-cyan-400">arr[row][col]</code> to access items.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Side: Code & Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#111] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-cyan-400 font-mono text-sm mb-4 pb-2 border-b border-cyan-500/10 flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" /> matrix.js
            </h3>
            <pre className="font-mono text-sm text-white/70 overflow-x-auto">
              <code dangerouslySetInnerHTML={{ __html: `<span class="text-blue-400">const</span> grid = [
  [<span class="text-orange-300">1, 2, 3</span>],
  [<span class="text-orange-300">4, 5, 6</span>],
  [<span class="text-orange-300">7, 8, 9</span>]
];

<span class="text-green-500/50">// Accessing row 1, column 2</span>
<span class="text-blue-400">const</span> val = grid[<span class="text-pink-400">1</span>][<span class="text-cyan-400">2</span>]; <span class="text-green-500/50">// 6</span>
`}} />
            </pre>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onMouseEnter={() => setHighlightRow(1)}
              onMouseLeave={() => setHighlightRow(null)}
              className="p-4 bg-pink-950/20 border border-pink-500/30 rounded-xl flex items-center justify-center gap-2 text-pink-400 font-mono hover:bg-pink-900/40 transition-colors"
            >
              <ArrowRight className="w-4 h-4" /> Row 1
            </button>
            <button 
              onMouseEnter={() => setHighlightCol(2)}
              onMouseLeave={() => setHighlightCol(null)}
              className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl flex items-center justify-center gap-2 text-cyan-400 font-mono hover:bg-cyan-900/40 transition-colors"
            >
              <ArrowDown className="w-4 h-4" /> Col 2
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Matrix */}
        <div className="flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative">
          
          <div className="grid grid-cols-3 gap-4">
            {matrix.map((row, rIdx) => (
              row.map((val, cIdx) => {
                const isRowHover = highlightRow === rIdx;
                const isColHover = highlightCol === cIdx;
                const isBothHover = isRowHover && isColHover;

                let bgClass = "bg-white/5 border-white/10";
                let textClass = "text-white/50";
                
                if (isBothHover) {
                  bgClass = "bg-purple-600 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]";
                  textClass = "text-white font-bold scale-110";
                } else if (isRowHover) {
                  bgClass = "bg-pink-950/40 border-pink-500/50";
                  textClass = "text-pink-300";
                } else if (isColHover) {
                  bgClass = "bg-cyan-950/40 border-cyan-500/50";
                  textClass = "text-cyan-300";
                }

                return (
                  <div 
                    key={`${rIdx}-${cIdx}`}
                    className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${bgClass}`}
                  >
                    <span className={`font-mono text-xl transition-all duration-300 ${textClass}`}>
                      {val}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 mt-1">
                      [{rIdx}][{cIdx}]
                    </span>
                  </div>
                );
              })
            ))}
          </div>

          <div className="mt-8 text-center text-xs font-mono text-white/40">
            Hover the buttons to see how matrix indexing isolates a specific coordinate.
          </div>
        </div>

      </div>
    </div>
  );
}
