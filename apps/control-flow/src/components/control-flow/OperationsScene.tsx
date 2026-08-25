"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OperationsScene() {
  const [activeTab, setActiveTab] = useState("if");

  const tabs = [
    { id: "if", label: "if / else if" },
    { id: "switch", label: "switch / case" },
    { id: "object", label: "Object Map" }
  ];

  const codeSnippets = {
    if: `function getRole(level) {
  if (level === 1) {
    return "User";
  } else if (level === 2) {
    return "Moderator";
  } else if (level === 3) {
    return "Admin";
  } else {
    return "Guest";
  }
}`,
    switch: `function getRole(level) {
  switch (level) {
    case 1:
      return "User";
    case 2:
      return "Moderator";
    case 3:
      return "Admin";
    default:
      return "Guest";
  }
}`,
    object: `function getRole(level) {
  const roles = {
    1: "User",
    2: "Moderator",
    3: "Admin"
  };
  
  return roles[level] || "Guest";
}`
  };

  const descriptions = {
    if: "Standard branching. Evaluates conditions one by one from top to bottom. Great for complex conditions (like x > 5 && y < 10), but gets messy for exact value matching.",
    switch: "Strict equality matching. Cleaner than many if/elses for the same variable. Don't forget 'break' if you aren't returning!",
    object: "A highly optimized pattern. Replaces logic with a simple dictionary lookup. Extremely clean and fast, but only works for exact key matches."
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center pt-32 pb-24 px-6 z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Writing Cleaner Logic</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          There are many ways to write branching logic in JavaScript. 
          See how the same exact feature looks written in three different styles.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive Tabs & Description */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 rounded-xl text-left transition-all overflow-hidden border
                  ${activeTab === tab.id 
                    ? "bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
                    : "bg-black/50 border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80"}
                `}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" 
                  />
                )}
                <span className="font-mono text-lg">{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-purple-950/20 border border-purple-500/20 rounded-xl text-purple-200/80 leading-relaxed"
            >
              {descriptions[activeTab as keyof typeof descriptions]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Code Block */}
        <div className="lg:col-span-7">
          <div className="relative bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl h-full">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-white/30">getRole.js</span>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm leading-loose"
                >
                  <code className="text-blue-300">
                    {codeSnippets[activeTab as keyof typeof codeSnippets]}
                  </code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
