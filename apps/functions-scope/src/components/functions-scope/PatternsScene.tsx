"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Backpack, Play } from "lucide-react";

export function PatternsScene() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Closure Backpack</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          When a function returns another function, the inner function keeps a "backpack" of variables from its parent, even after the parent has finished running!
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Side: Code Explanation */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#111] border border-green-500/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-green-400 font-mono text-sm mb-4 pb-2 border-b border-green-500/10">createCounter.js</h3>
            <pre className="font-mono text-sm text-white/70 overflow-x-auto">
              <code dangerouslySetInnerHTML={{ __html: `<span class="text-blue-400">function</span> createCounter() {
  <span class="text-blue-400">let</span> count = 0; <span class="text-green-500/50">// Private variable</span>

  <span class="text-pink-400">return function()</span> {
    count++;
    <span class="text-pink-400">return</span> count;
  }
}

<span class="text-blue-400">const</span> myCounter = createCounter();
`}} />
            </pre>
          </div>
          
          <p className="text-white/50 text-sm leading-relaxed">
            Usually, when <code className="text-white/70 bg-white/10 px-1 rounded">createCounter()</code> finishes, its memory is destroyed. But because it returns a function that relies on <code className="text-white/70 bg-white/10 px-1 rounded">count</code>, that variable is stuffed into a permanent "backpack" attached to <code className="text-white/70 bg-white/10 px-1 rounded">myCounter</code>.
          </p>
        </div>

        {/* Right Side: Interactive Backpack */}
        <div className="flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative">
          
          <div className="absolute top-6 left-6 text-white/30 uppercase tracking-widest text-xs font-mono">
            myCounter() state
          </div>

          <motion.div 
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-12"
          >
            <Backpack className="w-32 h-32 text-green-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className="text-xs font-mono text-green-950 font-bold bg-green-400 px-2 rounded mb-1">count</span>
              <span className="text-2xl font-bold text-white">{count}</span>
            </div>
          </motion.div>

          <button
            onClick={() => setCount(prev => prev + 1)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all active:scale-95"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            Call myCounter()
          </button>
          
          <div className="mt-6 text-center text-xs font-mono text-white/40">
            Click to invoke. Notice how <code className="text-white/60">count</code> is preserved entirely in memory, safe from the global scope!
          </div>
        </div>

      </div>
    </div>
  );
}
