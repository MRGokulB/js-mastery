"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle } from "lucide-react";

export function EqualityScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
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

      tl.to(".text-eq-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-eq-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".eq-box-1", { backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.5)", duration: 0.5 })
        .to(".eq-box-2", { backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.5)", duration: 0.5 }, "<")
        .to(".eq-op-abstract", { color: "#f87171", duration: 0.5 }, "<")

      tl.to(".text-eq-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-eq-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".eq-op-abstract", { opacity: 0, duration: 0.5 }, "<")
        .to(".eq-op-strict", { opacity: 1, duration: 0.5 }, "<")
        .to(".eq-box-1", { backgroundColor: "rgba(74,222,128,0.1)", borderColor: "rgba(74,222,128,0.5)", duration: 0.5 }, "<")
        .to(".eq-box-2", { backgroundColor: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.5)", duration: 0.5 }, "<")
        .to(".eq-res-true", { opacity: 0, duration: 0.5 }, "<")
        .to(".eq-res-false", { opacity: 1, duration: 0.5 }, "<")

      tl.to(".text-eq-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-eq-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".coercion-warning", { opacity: 1, y: 0, duration: 1 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 relative h-64 lg:h-96 flex flex-col justify-center">
          <div className="grid grid-cols-1 grid-rows-1 relative">
            <h2 className="text-eq-1 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white">
              Equality is complicated.
            </h2>
            <h2 className="text-eq-2 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              Abstract Equality (<span className="text-red-400 font-mono">==</span>) tries to be helpful by coercing types.
            </h2>
            <h2 className="text-eq-3 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              Strict Equality (<span className="text-green-400 font-mono">===</span>) compares value AND type.
            </h2>
            <h2 className="text-eq-4 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              Always use <span className="text-green-400 font-mono">===</span> to avoid unexpected truthy/falsy bugs.
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative h-[500px]">
          
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="eq-box-1 w-24 h-24 rounded-2xl border border-white/20 bg-white/5 flex flex-col items-center justify-center transition-colors">
              <span className="font-mono text-white text-2xl font-bold">"0"</span>
              <span className="font-mono text-white/40 text-xs mt-1">String</span>
            </div>

            <div className="w-16 h-12 relative flex items-center justify-center">
              <div className="eq-op-abstract absolute font-mono text-4xl font-bold text-white/50 transition-colors text-center">
                ==
              </div>
              <div className="eq-op-strict absolute font-mono text-4xl font-bold text-green-400 opacity-0 text-center">
                ===
              </div>
            </div>

            <div className="eq-box-2 w-24 h-24 rounded-2xl border border-white/20 bg-white/5 flex flex-col items-center justify-center transition-colors">
              <span className="font-mono text-white text-2xl font-bold">0</span>
              <span className="font-mono text-white/40 text-xs mt-1">Number</span>
            </div>
            
            <div className="font-mono text-4xl font-bold text-white/50 ml-4 mr-2">
              =
            </div>

            <div className="w-24 h-12 relative flex items-center">
              <div className="eq-res-true absolute font-mono text-3xl font-bold text-green-400">
                true
              </div>
              <div className="eq-res-false absolute font-mono text-3xl font-bold text-red-400 opacity-0">
                false
              </div>
            </div>
          </div>

          <div className="coercion-warning opacity-0 translate-y-5 w-full bg-red-950/20 border border-red-500/20 rounded-2xl p-6 flex gap-4 items-start shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-red-300 font-bold mb-2">The Type Coercion Trap</h3>
              <p className="text-red-200/70 text-sm leading-relaxed font-mono">
                When using ==, JavaScript converts types behind the scenes. 
                <br/><br/>
                <span className="text-white">[] == false</span> // true<br/>
                <span className="text-white">"" == 0</span> // true<br/>
                <span className="text-white">null == undefined</span> // true<br/>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
