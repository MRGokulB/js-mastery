"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap } from "lucide-react";

export function CoercionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEq, setActiveEq] = useState(0);

  const equations = [
    { expr: '"2" + 2', result: '"22"', expl: 'The + operator prefers strings. 2 is coerced into "2".' },
    { expr: '"2" - 2', result: '0', expl: 'The - operator is only for math. "2" is coerced to a number.' },
    { expr: 'true + 1', result: '2', expl: 'Booleans are coerced to numbers in math. true = 1, false = 0.' },
    { expr: '[] + {}', result: '"[object Object]"', expl: 'Array becomes "" string. Object becomes "[object Object]". String concat.' }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1
        }
      });

      tl.fromTo(".coercion-content", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative bg-transparent px-6">
      
      <div className="coercion-content w-full max-w-4xl bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-purple-500/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 text-center mb-12">
          <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Implicit Type Coercion</h2>
          <p className="text-white/60">When JavaScript tries to be helpful, and creates chaos instead.</p>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {equations.map((eq, idx) => (
              <button
                key={idx}
                onClick={() => setActiveEq(idx)}
                className={`px-6 py-3 font-mono text-lg rounded-xl border transition-all ${
                  activeEq === idx 
                    ? "bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]" 
                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {eq.expr}
              </button>
            ))}
          </div>

          <div className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-mono text-white mb-6">
              {equations[activeEq].expr} <span className="text-white/40">=</span> <span className="text-green-400">{equations[activeEq].result}</span>
            </div>
            <p className="text-white/70 text-lg">
              {equations[activeEq].expl}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
