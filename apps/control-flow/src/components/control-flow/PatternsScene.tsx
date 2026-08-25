"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ArrowRightLeft } from "lucide-react";

export function PatternsScene() {
  const [pattern, setPattern] = useState("ternary");

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center pt-32 pb-24 px-6">
      <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Pro Patterns</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Write less code. Read faster. Master these essential logic patterns.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setPattern("ternary")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
            pattern === "ternary" 
            ? "bg-pink-500/20 text-pink-300 border border-pink-500/30" 
            : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10"
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          The Ternary Operator
        </button>
        <button
          onClick={() => setPattern("guard")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
            pattern === "guard" 
            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
            : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Guard Clauses
        </button>
      </div>

      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {pattern === "ternary" ? (
            <motion.div
              key="ternary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-[#111] border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-red-400 font-mono text-sm mb-4 pb-2 border-b border-red-500/10">The Clunky Way (if/else)</h3>
                <pre className="font-mono text-sm text-white/70">
                  <code dangerouslySetInnerHTML={{ __html: `let status;

if (age >= 18) {
  status = "Adult";
} else {
  status = "Minor";
}`}} />
                </pre>
              </div>

              <div className="bg-[#111] border border-green-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ArrowRightLeft className="w-24 h-24 text-green-500" />
                </div>
                <h3 className="text-green-400 font-mono text-sm mb-4 pb-2 border-b border-green-500/10">The Pro Way (Ternary)</h3>
                <pre className="font-mono text-sm text-white/90">
                  <code>
                    <span className="text-blue-400">const</span> status = 
                    <span className="text-yellow-300"> age {">="} 18</span> 
                    <span className="text-pink-400 font-bold"> ? </span> 
                    <span className="text-green-300">"Adult"</span> 
                    <span className="text-pink-400 font-bold"> : </span> 
                    <span className="text-red-300">"Minor"</span>;
                  </code>
                </pre>
                <p className="mt-6 text-white/50 text-xs">
                  Format: <code className="bg-white/10 px-1 rounded">condition ? trueResult : falseResult</code><br/><br/>
                  Assigns a value on exactly one line. Variables can be `const` instead of `let`!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="guard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-[#111] border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-red-400 font-mono text-sm mb-4 pb-2 border-b border-red-500/10">Nested Hell (Arrow code)</h3>
                <pre className="font-mono text-sm text-white/70">
                  <code dangerouslySetInnerHTML={{ __html: `function processPayment(user) {
  if (user) {
    if (user.hasCard) {
      if (user.balance > 0) {
        // Finally do the thing
        chargeCard();
      } else {
        showError("No funds");
      }
    } else {
      showError("No card");
    }
  } else {
    showError("No user");
  }
}`}} />
                </pre>
              </div>

              <div className="bg-[#111] border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldAlert className="w-32 h-32 text-blue-500" />
                </div>
                <h3 className="text-blue-400 font-mono text-sm mb-4 pb-2 border-b border-blue-500/10">Guard Clauses (Early Returns)</h3>
                <pre className="font-mono text-sm text-white/90">
                  <code dangerouslySetInnerHTML={{ __html: `function processPayment(user) {
  <span class="text-blue-400">// Guard clauses instantly reject bad paths</span>
  if (!user) return showError("No user");
  if (!user.hasCard) return showError("No card");
  if (user.balance <= 0) return showError("No funds");

  <span class="text-green-400">// Happy path is flat, zero nesting!</span>
  chargeCard();
}`}} />
                </pre>
                <p className="mt-6 text-white/50 text-xs">
                  Invert the conditions, return early, and keep your happy path at the outermost scope.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
