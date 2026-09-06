"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle } from "lucide-react";

export function MutationHazardScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Beat 1: Show Code Step 1 and Object 1
      tl.to(".code-step-1", { opacity: 1, duration: 1 })
        .to(".stack-user1", { opacity: 1, x: 0, duration: 1 })
        .to(".heap-obj", { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(".arrow-1", { strokeDashoffset: 0, duration: 1 }, "<");

      // Beat 2: Show Code Step 2 and Object 2
      tl.to(".code-step-2", { opacity: 1, duration: 1 })
        .to(".stack-user2", { opacity: 1, x: 0, duration: 1 })
        .to(".arrow-2", { strokeDashoffset: 0, duration: 1 }, "<")
        .to(".warning-badge", { opacity: 1, scale: 1, duration: 0.5 });

      // Beat 3: Show Code Step 3 and Mutation
      tl.to(".code-step-3", { opacity: 1, duration: 1 })
        .to(".obj-name", { textContent: '"Bob"', color: "#ef4444", duration: 1 })
        .to(".heap-obj", { borderColor: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.05)", duration: 1 }, "<")
        .to(".arrow-pulse", { opacity: 1, duration: 0.5 })
        .to(".arrow-pulse", { opacity: 0, duration: 0.5 });

      // Beat 4: Reveal conclusion
      tl.to(".code-step-4", { opacity: 1, duration: 1 })
        .to(".conclusion-text", { opacity: 1, y: 0, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative bg-[#050505] px-6 perspective-[1000px] overflow-hidden">
      
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-center">Mutation Hazard</h2>
        <p className="text-white/60 text-lg text-center">When two variables hold the same memory address.</p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
        
        {/* Left: Code Editor */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 font-mono text-sm md:text-base leading-relaxed relative z-10">
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>

          <div className="code-step-1 opacity-0">
            <span className="text-white/40">// 1. Create an object in the Heap</span><br/>
            <span className="text-purple-400">let</span> <span className="text-blue-400">user1</span> = { name: <span className="text-green-400">"Alex"</span> };
          </div>
          
          <div className="code-step-2 opacity-0 mt-6">
            <span className="text-white/40">// 2. Copy the pointer, NOT the object!</span><br/>
            <span className="text-purple-400">let</span> <span className="text-blue-400">user2</span> = <span className="text-blue-400">user1</span>;
          </div>

          <div className="code-step-3 opacity-0 mt-6">
            <span className="text-white/40">// 3. Mutate via the second pointer</span><br/>
            <span className="text-blue-400">user2</span>.name = <span className="text-red-400">"Bob"</span>;
          </div>

          <div className="code-step-4 opacity-0 mt-6 pt-6 border-t border-white/10">
            <span className="text-white/40">// What is user1.name?</span><br/>
            console.log(<span className="text-blue-400">user1</span>.name); <span className="text-red-400 font-bold">// "Bob" 💀</span>
          </div>
        </div>

        {/* Right: Visual Memory Map */}
        <div className="relative h-[400px] w-full hidden md:block">
          
          {/* Stack */}
          <div className="absolute left-0 top-0 w-48 h-full border-r border-white/10 flex flex-col gap-6 justify-center">
            <div className="text-center text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Stack</div>
            
            <div className="stack-user1 opacity-0 -translate-x-10 bg-[#1a1a1a] border border-blue-500/30 rounded-xl p-4 flex flex-col items-center">
              <span className="text-blue-400 font-bold mb-1">user1</span>
              <span className="text-xs text-white/50 font-mono bg-black/50 px-2 py-1 rounded">@0x8A4</span>
            </div>

            <div className="stack-user2 opacity-0 -translate-x-10 bg-[#1a1a1a] border border-blue-500/30 rounded-xl p-4 flex flex-col items-center relative">
              <span className="text-blue-400 font-bold mb-1">user2</span>
              <span className="text-xs text-white/50 font-mono bg-black/50 px-2 py-1 rounded">@0x8A4</span>
              
              <div className="warning-badge opacity-0 scale-50 absolute -right-4 -top-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-lg shadow-red-500/20">
                SAME ADDR!
              </div>
            </div>
          </div>

          {/* Heap */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48">
            <div className="text-center text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Heap</div>
            
            <div className="heap-obj opacity-0 scale-90 bg-[#1a1a1a] border-2 border-blue-500/30 rounded-2xl p-6 transition-colors shadow-2xl relative z-10">
              <div className="text-xs text-white/40 font-mono mb-4 text-center">@0x8A4</div>
              <div className="flex justify-between items-center font-mono">
                <span className="text-white/80">name:</span>
                <span className="obj-name text-green-400 font-bold">"Alex"</span>
              </div>
            </div>
          </div>

          {/* SVG Connecting Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" opacity="0.6"/>
              </marker>
              <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/>
              </marker>
            </defs>
            
            {/* Arrow from user1 to heap */}
            <path 
              className="arrow-1"
              d="M 192 140 C 250 140, 220 200, 310 200" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2"
              strokeDasharray="10 5"
              strokeOpacity="0.6"
              markerEnd="url(#arrowhead)"
              style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            />

            {/* Arrow from user2 to heap */}
            <path 
              className="arrow-2"
              d="M 192 250 C 250 250, 220 200, 310 200" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2"
              strokeDasharray="10 5"
              strokeOpacity="0.6"
              markerEnd="url(#arrowhead)"
              style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            />

            {/* Red Pulse Arrow indicating mutation */}
            <path 
              className="arrow-pulse opacity-0"
              d="M 192 250 C 250 250, 220 200, 310 200" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="4"
              markerEnd="url(#arrowhead-red)"
            />
          </svg>
        </div>
      </div>

      <div className="conclusion-text absolute bottom-20 opacity-0 translate-y-10 text-center max-w-2xl px-6">
        <div className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200">
          <strong>Key Takeaway:</strong> Variables don't hold objects. They hold <em>pointers</em> to objects. Mutating an object through one pointer affects every other variable pointing to that same address!
        </div>
      </div>
    </div>
  );
}
