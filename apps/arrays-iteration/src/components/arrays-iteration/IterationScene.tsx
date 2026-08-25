"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors } from "lucide-react";

export function IterationScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".belt-container", { opacity: 1, duration: 1 }, "<")

      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".box-raw", { x: 100, duration: 1 })
        .to(".box-raw", { scale: 1.5, rotate: 45, backgroundColor: "#0891b2", duration: 0.5 })
        .to(".box-raw", { x: 200, duration: 1 })

      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .set(".box-raw", { x: 0, scale: 1, rotate: 0, backgroundColor: "#334155" })
        .to(".box-raw", { x: 100, duration: 1 })
        .to(".box-raw:nth-child(2)", { y: 200, opacity: 0, rotate: 90, duration: 0.5 })
        .to(".box-raw:not(:nth-child(2))", { x: 200, duration: 1 })

      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .set(".box-raw", { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, backgroundColor: "#334155" })
        .to(".accumulator", { opacity: 1, duration: 0.5 })
        
        .to(".box-raw:nth-child(1)", { x: 120, duration: 0.5 })
        .to(".box-raw:nth-child(1)", { scale: 0.5, opacity: 0, duration: 0.2 })
        .to(".acc-val-0", { opacity: 0, duration: 0.2 }, "<")
        .to(".acc-val-1", { opacity: 1, duration: 0.2 }, "<")
        .to(".accumulator", { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 })
        
        .to(".box-raw:nth-child(2)", { x: 120, duration: 0.5 })
        .to(".box-raw:nth-child(2)", { scale: 0.5, opacity: 0, duration: 0.2 })
        .to(".acc-val-1", { opacity: 0, duration: 0.2 }, "<")
        .to(".acc-val-3", { opacity: 1, duration: 0.2 }, "<")
        .to(".accumulator", { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 })
        
        .to(".box-raw:nth-child(3)", { x: 120, duration: 0.5 })
        .to(".box-raw:nth-child(3)", { scale: 0.5, opacity: 0, duration: 0.2 })
        .to(".acc-val-3", { opacity: 0, duration: 0.2 }, "<")
        .to(".acc-val-6", { opacity: 1, duration: 0.2 }, "<")
        .to(".accumulator", { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 })

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 min-w-0">
          
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              For-loops are great, but <span className="text-cyan-400">Functional Iteration</span> is how modern JavaScript is written.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Think of methods like map, filter, and reduce as factory conveyor belts.
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-blue-400 font-mono">.map( )</span><br/>Takes every single item, transforms it into something new, and creates a brand new array.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-pink-400 font-mono">.filter( )</span><br/>Tests every item against a condition. If it fails, it drops off the belt forever.
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-orange-400 font-mono">.reduce( )</span><br/>Takes every item and crushes them together into a single, final accumulator value.
            </h2>
          </div>

        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0 h-[400px]">
          
          <div className="belt-container opacity-0 relative w-full max-w-2xl h-64 border-b-4 border-white/20 border-dashed flex items-center">
            
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 -mt-4 w-32 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md z-20 flex flex-col items-center justify-center pointer-events-none">
               <div className="w-16 h-1 bg-cyan-500/50 absolute -top-4 rounded-full animate-pulse" />
               <Scissors className="text-white/20 w-8 h-8 mb-2" />
               <span className="text-xs font-mono text-white/40 uppercase tracking-widest text-center">Callback<br/>Fn</span>
            </div>

            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-4 z-10">
              <div className="box-raw w-12 h-12 bg-slate-700 rounded-lg shadow-lg flex items-center justify-center text-white font-bold font-mono">1</div>
              <div className="box-raw w-12 h-12 bg-slate-700 rounded-lg shadow-lg flex items-center justify-center text-white font-bold font-mono">2</div>
              <div className="box-raw w-12 h-12 bg-slate-700 rounded-lg shadow-lg flex items-center justify-center text-white font-bold font-mono">3</div>
            </div>

            <div className="accumulator opacity-0 absolute left-[100px] top-1/2 -translate-y-1/2 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold font-mono shadow-[0_0_30px_rgba(249,115,22,0.4)] z-30">
              <span className="acc-val-0 absolute inset-0 flex items-center justify-center">0</span>
              <span className="acc-val-1 absolute inset-0 flex items-center justify-center opacity-0">1</span>
              <span className="acc-val-3 absolute inset-0 flex items-center justify-center opacity-0">3</span>
              <span className="acc-val-6 absolute inset-0 flex items-center justify-center opacity-0">6</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
