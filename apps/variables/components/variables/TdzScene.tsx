"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skull } from "lucide-react";

export function TdzScene() {
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

      // Beat 1: Show hoisting code
      tl.to(".tdz-code", { opacity: 1, duration: 1 })
        .to(".tdz-line-1", { backgroundColor: "rgba(255,255,255,0.1)", duration: 0.5 });

      // Beat 2: Explain Hoisting for VAR
      tl.to(".tdz-var-explanation", { opacity: 1, y: 0, duration: 1 })
        .to(".tdz-line-1", { backgroundColor: "transparent", duration: 0.5 })
        .to(".tdz-line-2", { backgroundColor: "rgba(255,255,255,0.1)", duration: 0.5 });

      // Beat 3: Explain TDZ for LET
      tl.to(".tdz-let-explanation", { opacity: 1, y: 0, duration: 1 })
        .to(".tdz-zone", { opacity: 1, height: "100%", duration: 1 }, "<")
        .to(".skull-icon", { scale: 1, opacity: 1, rotation: 10, duration: 0.5 });

      // Beat 4: Let initialization fixes it
      tl.to(".tdz-line-2", { backgroundColor: "transparent", duration: 0.5 })
        .to(".tdz-line-3", { backgroundColor: "rgba(255,255,255,0.1)", duration: 0.5 })
        .to(".tdz-zone", { backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "#10b981", duration: 1 })
        .to(".skull-icon", { scale: 0, opacity: 0, duration: 0.5 }, "<")
        .to(".safe-text", { opacity: 1, duration: 0.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative bg-[#050505] px-6 perspective-[1000px] overflow-hidden">
      
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <Skull className="w-12 h-12 text-purple-500 mb-4" />
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-center">Temporal Dead Zone</h2>
        <p className="text-white/60 text-lg text-center">Why let and const don't behave like var.</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
        
        {/* Left: Code Editor */}
        <div className="tdz-code opacity-0 bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 font-mono text-sm md:text-base leading-relaxed relative z-10">
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>

          <div className="tdz-line-1 p-2 rounded transition-colors">
            console.log(<span className="text-blue-400">oldSchool</span>); <span className="text-white/40">// Output: undefined</span>
          </div>
          
          <div className="tdz-line-2 p-2 rounded transition-colors mt-2 relative">
            <div className="tdz-zone opacity-0 absolute inset-0 -left-4 -right-4 border border-purple-500/50 bg-purple-500/10 rounded-lg pointer-events-none flex items-center justify-end pr-4">
              <Skull className="skull-icon opacity-0 scale-0 w-5 h-5 text-purple-400" />
            </div>
            console.log(<span className="text-blue-400">modern</span>); <span className="text-purple-400 font-bold">// ReferenceError!</span>
          </div>

          <div className="tdz-line-3 p-2 rounded transition-colors mt-2">
            <span className="text-purple-400">var</span> <span className="text-blue-400">oldSchool</span> = <span className="text-green-400">"hello"</span>;
            <br />
            <span className="text-purple-400">let</span> <span className="text-blue-400">modern</span> = <span className="text-green-400">"safe"</span>;
          </div>
        </div>

        {/* Right: Explanations */}
        <div className="relative h-[300px] w-full flex flex-col justify-center">
          
          <div className="tdz-var-explanation opacity-0 translate-y-10 absolute inset-x-0">
            <h3 className="text-xl font-bold text-amber-500 mb-2">Hoisting with var</h3>
            <p className="text-white/70">
              JavaScript moves all declarations to the top of the scope before executing. With var, it initializes them with undefined. You can access them early, which often leads to hidden bugs.
            </p>
          </div>

          <div className="tdz-let-explanation opacity-0 translate-y-10 absolute inset-x-0 bg-[#050505]">
            <h3 className="text-xl font-bold text-purple-500 mb-2">The Temporal Dead Zone</h3>
            <p className="text-white/70">
              let and const are also hoisted, but they are NOT initialized. They are placed in the <strong>Temporal Dead Zone (TDZ)</strong>. Accessing them before initialization throws a strict error, keeping your code predictable and safe!
            </p>
            <div className="safe-text opacity-0 mt-4 text-emerald-400 font-bold">
              Once execution reaches the let declaration, the variable exits the TDZ and is safe to use.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
