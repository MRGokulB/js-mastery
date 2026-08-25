"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";

export function ScopeChainScene() {
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
        .to(".env-global", { opacity: 1, y: 0, duration: 0.5 })

      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".env-outer", { opacity: 1, y: 0, duration: 0.5 })

      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".env-inner", { opacity: 1, y: 0, duration: 0.5 })
        .to(".search-icon", { opacity: 1, duration: 0.2 })
        .to(".search-icon", { y: -100, duration: 1, ease: "power1.inOut" })

      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".search-icon", { y: -200, duration: 1, ease: "power1.inOut" })
        .to(".found-glow", { boxShadow: "0 0 20px #22c55e", backgroundColor: "rgba(34, 197, 94, 0.2)", duration: 0.5 })
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 lg:gap-12 min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Every function creates a <span className="text-purple-400">Lexical Environment</span>. This consists of local memory AND a reference to its parent.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Let&apos;s say we have the <span className="text-orange-400">Global Scope</span> with a variable <code className="text-sm bg-white/10 px-2 py-1 rounded">secret = 42</code>.
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Inside, an <code className="text-pink-400 text-sm">outer()</code> function is defined. It has its own environment and a hidden link pointing back to Global.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Now an <code className="text-blue-400 text-sm">inner()</code> function tries to log <code className="text-sm bg-white/10 px-2 py-1 rounded">secret</code>. It doesn&apos;t have it! So JS follows the outer reference link...
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              It climbs the <span className="text-green-400">Scope Chain</span>. From inner &rarr; outer &rarr; Global, where it finally finds <code className="text-sm bg-white/10 px-2 py-1 rounded">secret</code>.
            </h2>
          </div>

          <div className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-4 md:p-6 font-mono text-sm md:text-base hidden md:block shadow-2xl relative">
            <div className="text-white/70">
              <span className="text-orange-400">const</span> secret = 42;
              <br/><br/>
              <span className="text-pink-400">function</span> outer() {'{'}
              <br/>
              <span className="text-blue-400 pl-4">function</span> inner() {'{'}
              <br/>
              <span className="pl-8">console.log(secret);</span>
              <br/>
              <span className="pl-4">{'}'}</span>
              <br/>
              <span className="pl-4">inner();</span>
              <br/>
              {'}'}
              <br/>
              outer();
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center h-[500px] relative">
          
          <div className="w-64 flex flex-col gap-6 justify-end items-center relative z-10">
            
            <div className="env-global opacity-0 translate-y-10 w-full bg-[#111] border border-white/20 rounded-xl p-4 relative">
              <div className="text-white/80 font-mono font-bold mb-2">Global Environment</div>
              <div className="found-glow text-white/70 text-xs font-mono bg-white/5 border border-white/10 p-2 rounded transition-all">
                secret: 42
              </div>
            </div>

            <div className="w-0.5 h-6 bg-white/20 border-l border-dashed border-white/40" />

            <div className="env-outer opacity-0 translate-y-10 w-full bg-pink-950/40 border border-pink-500/50 rounded-xl p-4 relative backdrop-blur-md">
              <div className="text-pink-400 font-mono font-bold mb-2">outer() Env</div>
              <div className="text-white/40 text-xs font-mono italic">
                (empty local memory)
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-pink-400/50 rotate-90 origin-left">
                Outer Ref &rarr;
              </div>
            </div>

            <div className="w-0.5 h-6 bg-white/20 border-l border-dashed border-white/40 relative">
              <div className="search-icon opacity-0 absolute top-2 -left-3 text-green-400 bg-black rounded-full shadow-[0_0_10px_#22c55e]">
                <Search className="w-6 h-6 p-1" />
              </div>
            </div>

            <div className="env-inner opacity-0 translate-y-10 w-full bg-blue-950/40 border border-blue-500/50 rounded-xl p-4 relative backdrop-blur-md">
              <div className="text-blue-400 font-mono font-bold mb-2">inner() Env</div>
              <div className="text-white/40 text-xs font-mono italic">
                (empty local memory)
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-blue-400/50 rotate-90 origin-left">
                Outer Ref &rarr;
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
