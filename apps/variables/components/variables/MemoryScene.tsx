"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Box } from "lucide-react";

export function MemoryScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1
        }
      });

      // Show layout
      tl.to(".memory-layout", { opacity: 1, duration: 1 });

      // Add Primitive to Stack
      tl.to(".prim-code", { color: "#facc15", duration: 0.5 })
        .to(".stack-prim", { opacity: 1, x: 0, duration: 1 })
        .to(".prim-code", { color: "white", duration: 0.5 });

      // Add Object to Heap
      tl.to(".ref-code", { color: "#60a5fa", duration: 0.5 })
        .to(".heap-obj", { opacity: 1, scale: 1, duration: 1 })
        .to(".stack-ref", { opacity: 1, x: 0, duration: 1 }, "<")
        .to(".memory-arrow", { strokeDashoffset: 0, duration: 1 })
        .to(".ref-code", { color: "white", duration: 0.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative bg-[#050505] px-6 perspective-[1000px]">
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Stack vs Heap</h2>
      </div>

      <div className="memory-layout opacity-0 w-full max-w-6xl flex flex-col md:flex-row gap-8 items-stretch mt-12">
        
        {/* Code Panel */}
        <div className="w-full md:w-1/3 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 font-mono text-sm shadow-2xl z-10 flex flex-col justify-center">
          <div className="text-white/40 mb-4">// 1. Primitive Assignment</div>
          <div className="prim-code text-white mb-8 transition-colors">
            <span className="text-amber-400">let</span> age = <span className="text-orange-400">25</span>;
          </div>

          <div className="text-white/40 mb-4">// 2. Reference Assignment</div>
          <div className="ref-code text-white transition-colors">
            <span className="text-blue-400">const</span> user = {"{"}<br/>
            &nbsp;&nbsp;name: <span className="text-green-400">"Alex"</span><br/>
            {"}"};
          </div>
        </div>

        {/* The Stack */}
        <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-2xl p-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Call Stack</h3>
          </div>
          <p className="text-white/40 text-xs mb-8">Fast, organized, fixed size. Stores primitives and pointers.</p>

          <div className="flex flex-col gap-3">
            <div className="stack-prim opacity-0 -translate-x-10 w-full bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex justify-between font-mono text-sm">
              <span className="text-amber-400">age</span>
              <span className="text-orange-400">25</span>
            </div>
            
            <div className="stack-ref opacity-0 -translate-x-10 w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex justify-between font-mono text-sm relative z-20">
              <span className="text-blue-400">user</span>
              <span className="text-purple-400">0x00F1</span>
            </div>
          </div>
        </div>

        {/* The Heap */}
        <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-2xl p-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Memory Heap</h3>
          </div>
          <p className="text-white/40 text-xs mb-8">Unstructured, dynamic size. Stores large objects.</p>

          <div className="relative w-full h-48 border border-white/5 rounded-xl bg-black/20 p-4">
            
            <div className="heap-obj opacity-0 scale-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 font-mono text-sm">
              <div className="text-purple-400 text-xs mb-2 text-right">0x00F1</div>
              <div className="text-white">{"{"}</div>
              <div className="text-green-400 pl-4">name: "Alex"</div>
              <div className="text-white">{"}"}</div>
            </div>

            {/* SVG Arrow connecting Stack to Heap */}
            <svg className="absolute top-1/2 -left-[120%] w-[120%] h-2 overflow-visible z-0 pointer-events-none">
              <line 
                className="memory-arrow"
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#a855f7" strokeWidth="2" strokeDasharray="10 5"
                strokeDashoffset="1000"
              />
            </svg>

          </div>
        </div>

      </div>

    </div>
  );
}
