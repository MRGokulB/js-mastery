"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trash2 } from "lucide-react";

export function GarbageCollectionScene() {
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

      // Beat 1: Show initial state with reference
      tl.to(".gc-code-1", { opacity: 1, duration: 1 })
        .to(".gc-stack-var", { opacity: 1, x: 0, duration: 1 })
        .to(".gc-heap-obj", { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(".gc-arrow", { strokeDashoffset: 0, duration: 1 }, "<");

      // Beat 2: Break the reference (Reassign to null)
      tl.to(".gc-code-2", { opacity: 1, duration: 1 })
        .to(".gc-arrow", { opacity: 0, duration: 0.5 })
        .to(".gc-stack-val", { textContent: "null", duration: 0.5 }, "<")
        .to(".gc-heap-obj", { filter: "grayscale(1) brightness(0.5)", borderColor: "#4b5563", duration: 1 });

      // Beat 3: Mark and Sweep Phase
      tl.to(".mark-sweep-ui", { opacity: 1, y: 0, duration: 1 })
        .to(".gc-radar", { scale: 3, opacity: 0, duration: 1.5, repeat: 1 })
        .to(".gc-heap-obj", { backgroundColor: "rgba(239,68,68,0.2)", duration: 0.5 });

      // Beat 4: Garbage Collection (Deletion)
      tl.to(".gc-code-3", { opacity: 1, duration: 1 })
        .to(".gc-heap-obj", { scale: 0, opacity: 0, duration: 1, ease: "back.in(1.5)" })
        .to(".trash-icon", { opacity: 1, scale: 1, y: -20, duration: 0.5 }, "<")
        .to(".mark-sweep-ui", { opacity: 0, duration: 0.5 })
        .to(".conclusion-gc", { opacity: 1, y: 0, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative bg-[#050505] px-6 perspective-[1000px] overflow-hidden">
      
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <Trash2 className="w-12 h-12 text-emerald-500 mb-4" />
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-center">Garbage Collection</h2>
        <p className="text-white/60 text-lg text-center">How JavaScript automatically cleans up memory.</p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
        
        {/* Left: Code Editor */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 font-mono text-sm md:text-base leading-relaxed relative z-10">
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>

          <div className="gc-code-1 opacity-0">
            <span className="text-white/40">// 1. Allocate memory in Heap</span><br/>
            <span className="text-purple-400">let</span> <span className="text-blue-400">data</span> = &#123; heavy: <span className="text-green-400">"payload"</span> &#125;;
          </div>
          
          <div className="gc-code-2 opacity-0 mt-6">
            <span className="text-white/40">// 2. Remove the pointer</span><br/>
            <span className="text-blue-400">data</span> = <span className="text-orange-400">null</span>;
          </div>

          <div className="gc-code-3 opacity-0 mt-6 pt-6 border-t border-white/10">
            <span className="text-white/40">// 3. Engine runs "Mark and Sweep"</span><br/>
            <span className="text-emerald-400">// Unreachable objects are destroyed!</span><br/>
            <span className="text-emerald-400">// Memory is freed automatically.</span>
          </div>
        </div>

        {/* Right: Visual Memory Map */}
        <div className="relative h-[400px] w-full hidden md:block">
          
          {/* Stack */}
          <div className="absolute left-0 top-0 w-48 h-full border-r border-white/10 flex flex-col gap-6 justify-center">
            <div className="text-center text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Stack</div>
            
            <div className="gc-stack-var opacity-0 -translate-x-10 bg-[#1a1a1a] border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center">
              <span className="text-emerald-400 font-bold mb-1">data</span>
              <span className="gc-stack-val text-xs text-white/50 font-mono bg-black/50 px-2 py-1 rounded">@0x9F2</span>
            </div>
          </div>

          {/* Heap */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48">
            <div className="text-center text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Heap</div>
            
            {/* Engine GC Radar */}
            <div className="mark-sweep-ui opacity-0 translate-y-10 absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
              <div className="text-[10px] font-bold text-red-400 bg-red-400/20 px-2 py-1 rounded border border-red-500/50 mb-2">V8 GC ENGINE</div>
              <div className="w-4 h-4 rounded-full bg-red-500 relative">
                <div className="gc-radar absolute inset-0 rounded-full border border-red-500" />
              </div>
            </div>

            <div className="gc-heap-obj opacity-0 scale-90 bg-[#1a1a1a] border-2 border-emerald-500/30 rounded-2xl p-6 transition-colors shadow-2xl relative z-10">
              <div className="text-xs text-white/40 font-mono mb-4 text-center">@0x9F2</div>
              <div className="flex justify-between items-center font-mono">
                <span className="text-white/80">heavy:</span>
                <span className="text-green-400 font-bold">"payload"</span>
              </div>
            </div>
            
            <Trash2 className="trash-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-emerald-500 opacity-0 scale-50 z-0" />

            {/* SVG Connecting Arrows */}
            <svg className="absolute top-1/2 -left-[140%] w-[140%] h-4 overflow-visible z-0 pointer-events-none -translate-y-1/2">
              <defs>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" opacity="0.6"/>
                </marker>
              </defs>
              <line 
                className="gc-arrow"
                x1="0" y1="2" x2="100%" y2="2" 
                stroke="#10b981" strokeWidth="2" strokeDasharray="10 5" strokeOpacity="0.6"
                markerEnd="url(#arrowhead-green)"
                style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="conclusion-gc absolute bottom-20 opacity-0 translate-y-10 text-center max-w-2xl px-6">
        <div className="px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
          <strong>Mark and Sweep:</strong> The JS engine periodically scans for objects that have zero variables pointing to them. When found, they are "swept" away, preventing memory leaks!
        </div>
      </div>
    </div>
  );
}
