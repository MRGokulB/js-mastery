"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, MapIcon, KeySquare } from "lucide-react";

export function MapScene() {
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

      // Beat 1: Object Keys limitation
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".obj-key-attempt", { opacity: 1, x: 0, duration: 0.5 })
        .to(".obj-key-attempt", { borderColor: "#ef4444", duration: 0.5 })
        .to(".obj-key-error", { opacity: 1, duration: 0.5 })

      // Beat 2: Enter Map
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".obj-panel", { opacity: 0, x: -50, duration: 1 })
        .to(".map-panel", { opacity: 1, x: 0, display: "flex", duration: 1 })

      // Beat 3: Any type as key
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".map-key-1", { opacity: 1, y: 0, duration: 0.5 })
        .to(".map-key-2", { opacity: 1, y: 0, duration: 0.5 })
        .to(".map-key-3", { opacity: 1, y: 0, duration: 0.5 })
        
      // Beat 4: Summary
      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Side: Explanations */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Standard Objects are great, but they have a fatal flaw: All keys are silently converted to Strings.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              If you try to use an Object or Array as a key, JS converts it to <code className="text-red-400">"[object Object]"</code>. It overwrites previous keys!
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Enter the modern <span className="text-purple-400 font-mono">Map</span> object. It's a key-value store built for heavy lifting.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              In a Map, keys can be <span className="text-green-400">anything</span>. Functions, HTML elements, other Objects. Nothing is converted to a string.
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Maps also remember their insertion order, and they have built-in size properties. They are true dictionaries.
            </h2>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0 h-[400px] relative">
          
          {/* Object Failure Panel */}
          <div className="obj-panel absolute flex flex-col items-center gap-4">
            <div className="text-white/50 font-mono mb-2">Standard Object</div>
            <div className="w-80 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <div className="obj-key-attempt opacity-0 translate-x-10 bg-white/5 border border-white/10 p-3 rounded font-mono text-sm">
                <span className="text-white/50">key: </span>
                <span className="text-blue-300">{'{ id: 1 }'}</span>
                <span className="text-white/50 ml-2">→</span>
                <span className="text-red-400 ml-2">"[object Object]"</span>
              </div>
              <div className="obj-key-error opacity-0 text-xs text-red-400 bg-red-500/10 p-2 rounded">
                Warning: Collides with any other object used as a key!
              </div>
            </div>
          </div>

          {/* Map Success Panel */}
          <div className="map-panel opacity-0 hidden absolute flex-col items-center gap-4">
            <div className="text-purple-400 font-mono mb-2 flex items-center gap-2">
              <MapIcon className="w-4 h-4" /> new Map()
            </div>
            <div className="w-80 bg-purple-950/20 border border-purple-500/30 rounded-xl p-4 flex flex-col gap-3 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              
              <div className="map-key-1 opacity-0 translate-y-4 bg-black/40 border border-white/10 p-3 rounded font-mono text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeySquare className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">{'{ user: 1 }'}</span>
                </div>
                <span className="text-white/50">→</span>
                <span className="text-cyan-300">"Online"</span>
              </div>

              <div className="map-key-2 opacity-0 translate-y-4 bg-black/40 border border-white/10 p-3 rounded font-mono text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeySquare className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400">() =&gt; {'{}'}</span>
                </div>
                <span className="text-white/50">→</span>
                <span className="text-cyan-300">"Callback"</span>
              </div>

              <div className="map-key-3 opacity-0 translate-y-4 bg-black/40 border border-white/10 p-3 rounded font-mono text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeySquare className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400">12345</span>
                </div>
                <span className="text-white/50">→</span>
                <span className="text-cyan-300">"ID Hash"</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
