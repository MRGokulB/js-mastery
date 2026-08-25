"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OperationsScene() {
  const [activeTab, setActiveTab] = useState("declaration");

  const tabs = [
    { id: "declaration", label: "Declaration" },
    { id: "expression", label: "Expression" },
    { id: "arrow", label: "Arrow () =>" }
  ];

  const content = {
    declaration: {
      code: `function sayHello(name) {
  return "Hello " + name;
}

// Can be called BEFORE it's defined!
sayHello("Alice");`,
      desc: "Standard function. It gets 'Hoisted' to the top of the file, meaning you can call it before you define it in the code.",
      thisCtx: "Dynamic 'this'. Depends on HOW the function is called."
    },
    expression: {
      code: `const sayHello = function(name) {
  return "Hello " + name;
};

// Cannot be called before this line!
sayHello("Bob");`,
      desc: "A function stored in a variable. It is NOT hoisted. Good for keeping code execution predictable.",
      thisCtx: "Dynamic 'this'. Same as declarations."
    },
    arrow: {
      code: `const sayHello = (name) => {
  return "Hello " + name;
};

// OR implicit return:
// const sayHello = name => "Hello " + name;`,
      desc: "Modern, compact ES6 syntax. Excellent for callbacks and keeping code clean.",
      thisCtx: "Lexical 'this'. It inherits 'this' from the surrounding scope. Crucial for React components!"
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center pt-32 pb-24 px-6 z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Evolution of Functions</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          JavaScript has multiple ways to create a function. Each has a specific use case and slightly different rules under the hood.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive Tabs */}
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
                    layoutId="funcTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" 
                  />
                )}
                <span className="font-mono text-lg">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Code & Explanation */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="relative bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-white/30">functions.js</span>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm leading-loose text-blue-300"
                >
                  <code>{content[activeTab as keyof typeof content].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-orange-950/20 border border-orange-500/20 rounded-xl flex flex-col gap-4"
            >
              <p className="text-orange-200/80 leading-relaxed">
                {content[activeTab as keyof typeof content].desc}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-black/50 rounded border border-white/10 text-white/50 font-mono">this</span>
                <span className="text-white/70">{content[activeTab as keyof typeof content].thisCtx}</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
