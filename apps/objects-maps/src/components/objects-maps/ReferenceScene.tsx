"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Tv, Wifi } from "lucide-react";

export function ReferenceScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
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

      // Beat 1: Primitives (Value)
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".primitive-box", { opacity: 1, y: 0, duration: 1 })
        
      // Copy primitive
      tl.to(".primitive-copy", { opacity: 1, x: 0, duration: 1 })
        .to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".primitive-val-b", { textContent: "43", color: "#f472b6", duration: 0.5 }) // change B
        .to(".primitive-val-a", { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }) // A stays same

      // Beat 2: Objects (Reference)
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".primitive-wrapper", { opacity: 0, display: "none", duration: 0.5 })
        .to(".object-wrapper", { opacity: 1, display: "flex", duration: 1 })

      // Copy object reference
      tl.to(".object-remote-b", { opacity: 1, x: 0, duration: 1 })
        .to(".signal-line", { strokeDashoffset: 0, opacity: 1, duration: 0.5 })
        .to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        // Mutate through B
        .to(".tv-screen", { backgroundColor: "#eab308", duration: 0.5 })
        .to(".tv-text", { textContent: "Channel: 5", duration: 0.1 })
        .to([".remote-a-light", ".remote-b-light"], { backgroundColor: "#eab308", duration: 0.5 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Side: Explanations */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Why do Objects behave so strangely when you copy them? Let's talk about <span className="text-amber-400">References</span>.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              With Primitives (Numbers, Strings), assigning <code className="text-pink-400">b = a</code> makes a physical photocopy. 
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              If you change <code className="text-pink-400">b</code>, <code className="text-cyan-400">a</code> remains totally unaffected. They are separate pieces of paper.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              But Objects are too heavy to photocopy. Instead, JS gives you a <span className="text-green-400">Remote Control</span> pointing to a TV (Memory). Assigning <code className="text-pink-400">b = a</code> just gives you a second remote.
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              If you use remote <code className="text-pink-400">b</code> to change the channel, remote <code className="text-cyan-400">a</code> sees the exact same change, because there is only ONE TV!
            </h2>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0 h-[400px] relative">
          
          {/* PRIMITIVE VISUAL */}
          <div className="primitive-wrapper absolute inset-0 flex items-center justify-center gap-12">
            <div className="primitive-box opacity-0 translate-y-10 flex flex-col items-center gap-4">
              <div className="text-cyan-400 font-mono">let a = 42</div>
              <div className="w-24 h-32 bg-white/10 border border-cyan-500/50 rounded flex flex-col items-center justify-center gap-2 relative">
                <FileText className="text-cyan-400 w-8 h-8" />
                <span className="primitive-val-a text-2xl font-bold text-white">42</span>
              </div>
            </div>
            
            <div className="primitive-copy opacity-0 translate-x-10 flex flex-col items-center gap-4">
              <div className="text-pink-400 font-mono">let b = a</div>
              <div className="w-24 h-32 bg-white/10 border border-pink-500/50 rounded flex flex-col items-center justify-center gap-2 relative">
                <FileText className="text-pink-400 w-8 h-8" />
                <span className="primitive-val-b text-2xl font-bold text-white">42</span>
              </div>
            </div>
          </div>

          {/* OBJECT VISUAL */}
          <div className="object-wrapper opacity-0 hidden absolute inset-0 flex-col items-center justify-center">
            
            {/* The TV (Memory Address) */}
            <div className="w-48 h-32 bg-black border-[4px] border-white/20 rounded-xl flex flex-col overflow-hidden relative shadow-[0_0_40px_rgba(255,255,255,0.1)] z-20">
              <div className="tv-screen flex-1 bg-slate-800 transition-colors flex items-center justify-center">
                <span className="tv-text font-mono font-bold text-white">Channel: 1</span>
              </div>
              <div className="h-4 bg-white/10 flex justify-center items-center gap-2">
                <div className="w-1 h-1 bg-red-500 rounded-full" />
              </div>
            </div>

            {/* Connecting Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <path className="signal-line opacity-0" d="M 120 300 L 220 200" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5,5" fill="none" />
              <path className="signal-line opacity-0" d="M 380 300 L 260 200" stroke="#f472b6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            </svg>

            {/* Remotes */}
            <div className="flex gap-32 mt-16 z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="text-cyan-400 font-mono text-sm">let a = {'{}'}</div>
                <div className="w-12 h-24 bg-slate-900 border border-white/20 rounded-full flex flex-col items-center pt-2">
                  <div className="remote-a-light w-2 h-2 rounded-full bg-slate-800 transition-colors mb-2" />
                  <Wifi className="w-4 h-4 text-cyan-400/50" />
                </div>
              </div>

              <div className="object-remote-b opacity-0 translate-x-10 flex flex-col items-center gap-2">
                <div className="text-pink-400 font-mono text-sm">let b = a</div>
                <div className="w-12 h-24 bg-slate-900 border border-white/20 rounded-full flex flex-col items-center pt-2">
                  <div className="remote-b-light w-2 h-2 rounded-full bg-slate-800 transition-colors mb-2" />
                  <Wifi className="w-4 h-4 text-pink-400/50" />
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
