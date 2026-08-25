"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Play, Code2, Map } from "lucide-react";
import gsap from "gsap";

const TOPICS = [
  {
    id: 1,
    title: "Variables & Data Types",
    description: "The building blocks of every program. Learn how JS stores data in memory.",
    status: "completed",
    href: "https://variables-pi.vercel.app/",
    icon: Code2
  },
  {
    id: 2,
    title: "Control Flow & Logic",
    description: "If/Else, Switch, Ternary, and the Truthy/Falsy nature of JS.",
    status: "completed",
    href: "https://control-flow-ruby.vercel.app",
    icon: Map
  },
  { id: 3, title: "Functions & Scope", description: "Reusable logic, closures, and execution context.", status: "active", href: "https://functions-scope-4rxrb9vcz-gokul-boddawars-projects.vercel.app" },
  {
    id: 4,
    title: "Arrays & Iteration",
    description: "Contiguous memory, O(n) vs O(1) mutations, and functional pipelines.",
    status: "completed",
    href: "https://arrays-iteration-n5wk1nlhi-gokul-boddawars-projects.vercel.app"
  },
  { id: 5, title: "Objects & Maps", description: "Key-value stores, references, and deep copies.", status: "active", href: "#" },
  { id: 6, title: "The DOM & Events", description: "Connecting JS to the visual webpage.", status: "locked", href: "#" },
  { id: 7, title: "Asynchronous JS", description: "Event loop, Promises, Async/Await.", status: "locked", href: "#" },
  { id: 8, title: "ES6+ Modern JS", description: "Destructuring, spread, modules.", status: "locked", href: "#" },
  { id: 9, title: "OOP in JavaScript", description: "Prototypes, classes, and inheritance.", status: "locked", href: "#" },
  { id: 10, title: "Error Handling", description: "Try/catch, custom errors, debugging.", status: "locked", href: "#" },
];

export function HubScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });
      
      gsap.from(".topic-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] -z-20" />
      
      {/* Background glowing orbs */}
      <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-6 text-center">
          JavaScript Universe
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl text-center mb-20">
          A deeply interactive, hardware-level exploration of the JavaScript language. Progress through the modules below to achieve true mastery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {TOPICS.map((topic) => (
            <motion.a
              key={topic.id}
              href={topic.status !== "locked" ? topic.href : undefined}
              whileHover={topic.status !== "locked" ? { scale: 1.02 } : {}}
              whileTap={topic.status !== "locked" ? { scale: 0.98 } : {}}
              className={`topic-card relative p-8 rounded-3xl border backdrop-blur-xl flex flex-col h-[280px] transition-colors
                ${topic.status === "completed" 
                  ? "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 cursor-pointer" 
                  : topic.status === "active"
                  ? "bg-purple-500/10 border-purple-500/40 hover:border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer"
                  : "bg-white/5 border-white/5 opacity-50 cursor-not-allowed"}
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
                  ${topic.status === "completed" ? "bg-blue-500/20 text-blue-400" : topic.status === "active" ? "bg-purple-500/20 text-purple-400" : "bg-white/10 text-white/40"}
                `}>
                  {topic.id}
                </div>
                
                <div className="flex items-center gap-2">
                  {topic.status === "completed" && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full">
                      <Unlock className="w-3 h-3" />
                      UNLOCKED
                    </span>
                  )}
                  {topic.status === "active" && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full">
                      <Play className="w-3 h-3" />
                      ACTIVE
                    </span>
                  )}
                  {topic.status === "locked" && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  )}
                </div>
              </div>

              <h3 className={`text-2xl font-bold mb-3 tracking-tight ${topic.status === "locked" ? "text-white/60" : "text-white"}`}>
                {topic.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-auto">
                {topic.description}
              </p>

              {topic.status === "active" && (
                <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-purple-500" 
                  />
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
