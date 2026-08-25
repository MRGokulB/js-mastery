"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers } from "lucide-react";

export function MemoryScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Show Global Execution Context pushing on stack
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".frame-global", { opacity: 1, y: 0, duration: 0.5 })

      // Call first()
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".code-first", { backgroundColor: "#3f1a1a", borderColor: "#ef4444", duration: 0.5 })
        .to(".frame-first", { opacity: 1, y: 0, duration: 0.5 })

      // Call second() inside first()
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".code-first", { backgroundColor: "transparent", borderColor: "transparent", duration: 0.5 })
        .to(".code-second", { backgroundColor: "#3f1a1a", borderColor: "#ef4444", duration: 0.5 }, "<")
        .to(".frame-second", { opacity: 1, y: 0, duration: 0.5 })

      // Pop them off
      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".code-second", { backgroundColor: "transparent", borderColor: "transparent", duration: 0.5 })
        .to(".frame-second", { opacity: 0, y: -20, duration: 0.5 })
        .to(".frame-first", { opacity: 0, y: -20, duration: 0.5 })

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Side: Explanations & Code */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 lg:gap-12">
          
          <div className="grid [grid-template-areas:'stack']">
            <h2 className="text-beat-1 [grid-area:stack] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              How does JS remember where to return after a function finishes?
            </h2>
            <h2 className="text-beat-2 [grid-area:stack] text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight">
              It uses the <span className="text-orange-400">Call Stack</span>. Before any code runs, a Global Execution Context is pushed.
            </h2>
            <h2 className="text-beat-3 [grid-area:stack] text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight">
              When you call <code className="text-pink-400 font-mono bg-pink-900/30 px-2 py-1 rounded">first()</code>, it creates a new memory frame and pushes it ON TOP of the stack.
            </h2>
            <h2 className="text-beat-4 [grid-area:stack] text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight">
              If <code className="text-pink-400 font-mono bg-pink-900/30 px-2 py-1 rounded">first()</code> calls <code className="text-blue-400 font-mono bg-blue-900/30 px-2 py-1 rounded">second()</code>, another frame goes on top!
            </h2>
            <h2 className="text-beat-5 [grid-area:stack] text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight">
              When they finish, they pop off in reverse order (LIFO: Last In, First Out) until we return to Global.
            </h2>
          </div>

          <div className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-4 md:p-6 font-mono text-sm md:text-base hidden md:block shadow-2xl">
            <div className="text-white/50">function first() {'{'}</div>
            <div className="code-second pl-4 py-1 text-blue-300 rounded border border-transparent transition-colors">  second();</div>
            <div className="text-white/50">{'}'}</div>
            <br />
            <div className="text-white/50">function second() {'{'}</div>
            <div className="pl-4 py-1 text-white/50">  console.log("Done");</div>
            <div className="text-white/50">{'}'}</div>
            <br />
            <div className="code-first py-1 text-pink-300 rounded border border-transparent transition-colors">first();</div>
          </div>
        </div>

        {/* Right Side: The Call Stack */}
        <div className="w-full lg:w-1/2 flex justify-center items-end h-[350px] lg:h-[450px] border-b-2 border-white/20 pb-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 uppercase tracking-widest text-xs font-mono">
            <Layers className="w-4 h-4" />
            The Call Stack
          </div>
          
          <div className="w-64 flex flex-col gap-2 justify-end h-full">
            
            {/* Top Frame: second() */}
            <div className="frame-second opacity-0 translate-y-10 w-full bg-blue-950/40 border border-blue-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-md relative">
              <div className="text-blue-400 font-mono font-bold mb-2">second() Context</div>
              <div className="text-white/50 text-xs font-mono border-t border-blue-500/20 pt-2">
                Local Memory:<br/>
                arguments: []
              </div>
            </div>

            {/* Middle Frame: first() */}
            <div className="frame-first opacity-0 translate-y-10 w-full bg-pink-950/40 border border-pink-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(236,72,153,0.2)] backdrop-blur-md relative">
              <div className="text-pink-400 font-mono font-bold mb-2">first() Context</div>
              <div className="text-white/50 text-xs font-mono border-t border-pink-500/20 pt-2">
                Local Memory:<br/>
                arguments: []
              </div>
            </div>

            {/* Bottom Frame: Global */}
            <div className="frame-global opacity-0 translate-y-10 w-full bg-[#111] border border-white/20 rounded-xl p-4 relative">
              <div className="text-white/80 font-mono font-bold mb-2">Global Context</div>
              <div className="text-white/50 text-xs font-mono border-t border-white/10 pt-2">
                Memory:<br/>
                first: &lt;function&gt;<br/>
                second: &lt;function&gt;
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
