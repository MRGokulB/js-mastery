"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

export function V8EngineScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.to(".text-beat-1-v8", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2-v8", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".array-slot-v8", { opacity: 1, stagger: 0.1, duration: 1 }, "<")

      tl.to(".text-beat-2-v8", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3-v8", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".slot-v8-1", { backgroundColor: "#450a0a", duration: 0.5 })
        .to(".slot-v8-1-val", { opacity: 0, duration: 0.2 }, "<")
        .to(".slot-v8-1-hole", { opacity: 1, duration: 0.2 })

      tl.to(".text-beat-3-v8", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4-v8", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".array-slot-v8", { 
          x: () => (Math.random() - 0.5) * 50, 
          y: () => (Math.random() - 0.5) * 50, 
          rotate: () => (Math.random() - 0.5) * 20, 
          borderColor: "#ef4444", 
          backgroundColor: "#2a0a0a",
          duration: 1 
        })
        .to(".v8-label-packed", { opacity: 0, duration: 0.5 }, "<")
        .to(".v8-label-holey", { opacity: 1, duration: 0.5 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const arrayData = [10, 20, 30, 40];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1-v8 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              JavaScript arrays are highly optimized by the V8 Engine behind the scenes.
            </h2>
            <h2 className="text-beat-2-v8 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              When an array has no missing elements, V8 treats it as <span className="text-green-400">PACKED_ELEMENTS</span>. It is extremely fast to iterate.
            </h2>
            <h2 className="text-beat-3-v8 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              But what happens if you use <code className="text-red-400 font-mono bg-red-900/30 px-2 py-1 rounded">delete arr[1]</code>?
            </h2>
            <h2 className="text-beat-4-v8 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              It creates a hole. V8 downgrades the array to <span className="text-red-400">HOLEY_ELEMENTS</span> (a sparse dictionary structure). You lose the contiguous memory performance benefits!
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-w-0 py-12">
          
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <div className="v8-label-packed absolute -top-4 left-6 bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
              <Cpu className="w-3 h-3" /> PACKED_ELEMENTS
            </div>
            <div className="v8-label-holey opacity-0 absolute -top-4 left-6 bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
              <Cpu className="w-3 h-3" /> HOLEY_ELEMENTS
            </div>

            <div className="flex flex-col gap-2 mt-4 relative">
              {arrayData.map((item, i) => (
                <div key={i} className={`array-slot-v8 slot-v8-${i} opacity-0 w-full flex items-center border border-white/10 bg-white/5 rounded-lg overflow-hidden transition-all duration-300 relative`}>
                  <div className="w-16 bg-black/50 border-r border-white/10 p-3 text-center text-white/40 font-mono text-sm">
                    {i}
                  </div>
                  <div className={`slot-v8-${i}-val flex-1 p-3 font-mono text-green-400 font-bold`}>
                    {item}
                  </div>
                  {i === 1 && (
                    <div className="slot-v8-1-hole opacity-0 absolute inset-0 left-16 flex items-center p-3 font-mono text-red-500 font-bold bg-red-950/50">
                      empty
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
