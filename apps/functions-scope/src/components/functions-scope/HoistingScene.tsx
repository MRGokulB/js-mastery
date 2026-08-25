"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

export function HoistingScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
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
        .to(".phase-indicator", { textContent: "Phase 1: Memory Creation", duration: 0.1 }, "<")
        .to(".code-decl", { backgroundColor: "#3f1a1a", borderColor: "#ef4444", duration: 0.5 })
        .to(".memory-decl", { opacity: 1, y: 0, duration: 0.5 })

      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".phase-indicator", { textContent: "Phase 2: Execution", duration: 0.1 }, "<")
        .to(".code-decl", { backgroundColor: "transparent", borderColor: "transparent", duration: 0.5 })
        .to(".code-call-decl", { backgroundColor: "#1e3a8a", borderColor: "#3b82f6", duration: 0.5 })
        .to(".output-decl", { opacity: 1, scale: 1, duration: 0.5 })

      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".phase-indicator", { textContent: "Phase 1: Memory Creation", duration: 0.1 }, "<")
        .to(".code-call-decl", { backgroundColor: "transparent", borderColor: "transparent", duration: 0.5 })
        .to(".output-decl", { opacity: 0, scale: 0.8, duration: 0.5 }, "<")
        .to(".code-expr", { backgroundColor: "#3f1a1a", borderColor: "#ef4444", duration: 0.5 })
        .to(".memory-expr", { opacity: 1, y: 0, duration: 0.5 })

      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".phase-indicator", { textContent: "Phase 2: Execution", duration: 0.1 }, "<")
        .to(".code-expr", { backgroundColor: "transparent", borderColor: "transparent", duration: 0.5 })
        .to(".code-call-expr", { backgroundColor: "#3f1a1a", borderColor: "#ef4444", duration: 0.5 })
        .to(".output-expr-error", { opacity: 1, scale: 1, duration: 0.5 })

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 lg:gap-12 min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              The JS engine reads code twice. Before execution, it scans for declarations in the <span className="text-blue-400">Memory Creation Phase</span>.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-pink-400">Function Declarations</span> are hoisted entirely into memory. The whole function body is saved.
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Because it&apos;s already in memory, you can safely call a Function Declaration BEFORE its physical line in the code.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              But <span className="text-orange-400">Function Expressions</span> (assigned to variables) act like variables. Only the variable name is hoisted, initially set to uninitialized (TDZ).
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Calling a Function Expression too early throws a ReferenceError! The function itself isn&apos;t attached until execution reaches that line.
            </h2>
          </div>

          <div className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-4 md:p-6 font-mono text-sm md:text-base hidden md:block shadow-2xl relative">
            <div className="absolute top-2 right-4 text-xs text-white/30 phase-indicator font-bold tracking-widest uppercase">Phase 1: Memory Creation</div>
            
            <div className="code-call-decl py-1 text-blue-300 rounded border border-transparent transition-colors w-max px-2">sayHello();</div>
            <br />
            <div className="code-decl py-1 text-white/70 rounded border border-transparent transition-colors">
              <span className="text-pink-400">function</span> sayHello() {'{'}
              <br />  console.log("Hello!");
              <br />{'}'}
            </div>
            <br />
            <div className="w-full h-px bg-white/10 my-2" />
            <br />
            <div className="code-call-expr py-1 text-blue-300 rounded border border-transparent transition-colors w-max px-2">greet();</div>
            <br />
            <div className="code-expr py-1 text-white/70 rounded border border-transparent transition-colors">
              <span className="text-blue-400">const</span> greet = <span className="text-pink-400">function</span>() {'{'}
              <br />  console.log("Hi!");
              <br />{'}'}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 uppercase tracking-widest text-xs font-mono -translate-y-8">
            <Cpu className="w-4 h-4" />
            Memory (Heap)
          </div>

          <div className="memory-decl opacity-0 translate-y-10 w-full bg-pink-950/40 border border-pink-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(236,72,153,0.1)] backdrop-blur-md relative flex justify-between items-center">
            <div>
              <div className="text-pink-400 font-mono font-bold">sayHello</div>
              <div className="text-white/50 text-xs font-mono mt-1">type: function</div>
            </div>
            <div className="text-white/40 text-xs font-mono bg-black/50 p-2 rounded">
              f() {'{ console.log("Hello!") }'}
            </div>
            <div className="output-decl opacity-0 scale-80 absolute -left-12 -top-12 bg-blue-500 text-white font-mono text-xs px-3 py-1 rounded shadow-lg border border-blue-400 z-10">
              "Hello!" printed
            </div>
          </div>

          <div className="memory-expr opacity-0 translate-y-10 w-full bg-orange-950/40 border border-orange-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(249,115,22,0.1)] backdrop-blur-md relative flex justify-between items-center mt-8">
            <div>
              <div className="text-orange-400 font-mono font-bold">greet</div>
              <div className="text-white/50 text-xs font-mono mt-1">type: uninitialized</div>
            </div>
            <div className="text-white/40 text-xs font-mono bg-black/50 p-2 rounded text-red-400">
              &lt;Temporal Dead Zone&gt;
            </div>
            <div className="output-expr-error opacity-0 scale-80 absolute -left-16 -bottom-12 bg-red-500 text-white font-mono text-xs px-3 py-1 rounded shadow-lg border border-red-400 z-10">
              ReferenceError!
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
