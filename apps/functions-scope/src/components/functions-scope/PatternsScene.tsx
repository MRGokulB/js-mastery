"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, BrainCircuit, Factory } from "lucide-react";

export function PatternsScene() {
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    { id: "privacy", label: "Data Privacy", icon: <Shield className="w-4 h-4" /> },
    { id: "memoization", label: "Memoization", icon: <BrainCircuit className="w-4 h-4" /> },
    { id: "factory", label: "Factory Functions", icon: <Factory className="w-4 h-4" /> }
  ];

  const content = {
    privacy: {
      code: `function createBankAccount(initialBalance) {
  let balance = initialBalance; 

  return {
    deposit: (amount) => { balance += amount; },
    getBalance: () => balance
  };
}

const myAccount = createBankAccount(100);
myAccount.deposit(50);
console.log(myAccount.getBalance());`,
      desc: "Closures allow us to emulate private methods. Variables inside the closure cannot be accessed or modified directly from the outside scope, providing strict data encapsulation."
    },
    memoization: {
      code: `function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  }
}

const fastMath = memoize(expensiveCalculation);`,
      desc: "By keeping a 'cache' object in the closure backpack, we can remember the results of expensive function calls. If the same inputs occur, we return the cached result instantly!"
    },
    factory: {
      code: `function createGreeting(greetingText) {
  return function(name) {
    return \\\`\\\${greetingText}, \\\${name}!\\\`;
  }
}

const sayHello = createGreeting("Hello");
const sayHowdy = createGreeting("Howdy");

console.log(sayHello("Alice"));
console.log(sayHowdy("Bob"));`,
      desc: "Factory functions use closures to 'bake in' certain arguments. This allows us to generate multiple customized functions from a single template function."
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center pt-32 pb-24 px-6 z-10">
      <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Practical Closures</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          The &quot;Closure Backpack&quot; isn&apos;t just a quirky feature. It powers some of the most important design patterns in modern JavaScript.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 rounded-xl text-left transition-all overflow-hidden border flex items-center gap-3
                  ${activeTab === tab.id 
                    ? "bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(34,197,94,0.1)]" 
                    : "bg-black/50 border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80"}
                `}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="closureTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" 
                  />
                )}
                <div className={`${activeTab === tab.id ? "text-green-400" : "text-white/40"}`}>
                  {tab.icon}
                </div>
                <span className="font-mono text-lg">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="relative bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-white/30">patterns.js</span>
            </div>
            
            <div className="p-6 overflow-x-auto min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm leading-loose text-green-300"
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
              className="p-6 bg-green-950/20 border border-green-500/20 rounded-xl flex flex-col gap-4"
            >
              <p className="text-green-200/80 leading-relaxed">
                {content[activeTab as keyof typeof content].desc}
              </p>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
