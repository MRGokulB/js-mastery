'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Lock, Dice1, FileText, ToggleLeft, Box, HelpCircle, Snowflake, Hash, AlertTriangle, Search } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function AnalogyScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const text4Ref = useRef<HTMLDivElement>(null)
  
  const beat1Ref = useRef<HTMLDivElement>(null)
  const beat2Ref = useRef<HTMLDivElement>(null)
  const beat3Ref = useRef<HTMLDivElement>(null)
  const beat4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })

      gsap.set([text2Ref.current, text3Ref.current, text4Ref.current], { autoAlpha: 0, y: 20 })
      gsap.set([beat2Ref.current, beat3Ref.current, beat4Ref.current], { autoAlpha: 0, scale: 0.9 })
      gsap.set(beat1Ref.current, { autoAlpha: 1, scale: 1 })

      tl.to(text1Ref.current, { autoAlpha: 0, y: -20, duration: 1 })
        .to(beat1Ref.current, { autoAlpha: 0, scale: 0.9, duration: 1 }, '<')
        .to(text2Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
        .to(beat2Ref.current, { autoAlpha: 1, scale: 1, duration: 1 }, '<')
        
      tl.to(text2Ref.current, { autoAlpha: 0, y: -20, duration: 1 }, '+=1')
        .to(beat2Ref.current, { autoAlpha: 0, scale: 0.9, duration: 1 }, '<')
        .to(text3Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
        .to(beat3Ref.current, { autoAlpha: 1, scale: 1, duration: 1 }, '<')

      tl.to(text3Ref.current, { autoAlpha: 0, y: -20, duration: 1 }, '+=1')
        .to(beat3Ref.current, { autoAlpha: 0, scale: 0.9, duration: 1 }, '<')
        .to(text4Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
        .to(beat4Ref.current, { autoAlpha: 1, scale: 1, duration: 1 }, '<')
        
      tl.to({}, { duration: 1 })
      
    }, containerRef)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={containerRef} className="h-screen w-full bg-transparent text-white flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="flex-1 w-full max-w-6xl relative flex flex-col items-center justify-center mt-12">
        
        <div className="w-full h-[60vh] relative flex items-center justify-center perspective-[1000px]">
          
          <div ref={beat1Ref} className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-orange-500/10"
            >
              <div className="absolute -top-4 px-4 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-400 font-mono text-sm tracking-wider">
                myName
              </div>
              <span className="text-3xl font-mono text-white/90">"Alice"</span>
            </motion.div>
          </div>

          <div ref={beat2Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-[#2a241e] border border-[#5c4d3c] rounded-xl flex flex-col items-center justify-center rotate-[-4deg] relative shadow-lg">
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase rounded border border-red-500/30 transform -rotate-12">Legacy</div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#a6927a] font-mono text-sm mb-4">var</div>
                <span className="text-xl font-mono text-[#8c7b66]">oldValue</span>
              </div>
              
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-md border border-blue-500/30 rounded-xl flex flex-col items-center justify-center relative shadow-lg shadow-blue-500/10">
                <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-400 font-mono text-sm mb-4">let</div>
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xl font-mono text-white">newValue</span>
                </motion.div>
              </div>

              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-md border border-amber-500/40 rounded-xl flex flex-col items-center justify-center relative shadow-lg shadow-amber-500/10">
                <Lock className="absolute -top-3 -right-3 w-8 h-8 text-amber-500 bg-[#050505] rounded-full p-1 border border-amber-500/40" />
                <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 font-mono text-sm mb-4">const</div>
                <span className="text-xl font-mono text-white">fixedValue</span>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-center max-w-2xl shadow-xl">
              <p className="text-sm text-white/80">
                <strong className="text-amber-400">Rule of thumb:</strong> Always use <code className="text-amber-300 bg-amber-900/30 px-1 rounded">const</code>. Only use <code className="text-blue-300 bg-blue-900/30 px-1 rounded">let</code> when you NEED to reassign. Never use <code className="text-red-300 bg-red-900/30 px-1 rounded">var</code>.
              </p>
            </div>
          </div>

          <div ref={beat3Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3">
                <Dice1 className="w-8 h-8 text-blue-400" />
                <div className="text-xs text-white/50 font-mono">Number</div>
                <div className="font-mono text-blue-300">42</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3">
                <FileText className="w-8 h-8 text-pink-400" />
                <div className="text-xs text-white/50 font-mono">String</div>
                <div className="font-mono text-pink-300">"hello"</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3">
                <ToggleLeft className="w-8 h-8 text-green-400" />
                <div className="text-xs text-white/50 font-mono">Boolean</div>
                <div className="font-mono text-green-300">true</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3">
                <Box className="w-8 h-8 text-gray-500" />
                <div className="text-xs text-white/50 font-mono">Null</div>
                <div className="font-mono text-gray-400 text-xs">empty</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 opacity-60 blur-[1px]">
                <HelpCircle className="w-8 h-8 text-purple-400" />
                <div className="text-xs text-white/50 font-mono">Undefined</div>
                <div className="font-mono text-purple-300">?</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3">
                <Snowflake className="w-8 h-8 text-cyan-400" />
                <div className="text-xs text-white/50 font-mono">Symbol</div>
                <div className="font-mono text-cyan-300 text-xs">Symbol()</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 col-span-2">
                <Hash className="w-8 h-8 text-orange-400" />
                <div className="text-xs text-white/50 font-mono">BigInt</div>
                <div className="font-mono text-orange-300">9007199254740991n</div>
              </div>
            </div>
          </div>

          <div ref={beat4Ref} className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden">
              <motion.div 
                animate={{ x: ['-10%', '110%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1 bg-amber-400/80 shadow-[0_0_20px_4px_rgba(251,191,36,0.6)] z-10"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-4 relative z-0">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 flex items-center"><span className="font-mono text-xl">42</span></div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-8 flex items-center"><span className="font-mono text-amber-400">"number"</span></div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 flex items-center"><span className="font-mono text-xl">"hello"</span></div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-8 flex items-center"><span className="font-mono text-amber-400">"string"</span></div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 flex items-center"><span className="font-mono text-xl">true</span></div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-8 flex items-center"><span className="font-mono text-amber-400">"boolean"</span></div>
                </div>
                <div className="flex flex-col items-center gap-4 relative group">
                  <div className="h-12 flex items-center"><span className="font-mono text-xl">null</span></div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-8 flex items-center"><span className="font-mono text-red-400">"object"</span></div>
                  <div className="absolute -top-8 -right-4 bg-red-500/20 border border-red-500/40 text-red-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Bug!
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 flex items-center"><span className="font-mono text-xl text-white/50">undefined</span></div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-8 flex items-center"><span className="font-mono text-amber-400 text-sm">"undefined"</span></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="h-[20vh] w-full max-w-3xl grid [grid-template-areas:'stack'] text-center">
          <div ref={text1Ref} className="[grid-area:stack] flex items-center justify-center">
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              A variable is like a labeled box. The label is the name, and inside is the value. You can look at the label to find what you stored.
            </p>
          </div>
          <div ref={text2Ref} className="[grid-area:stack] flex items-center justify-center opacity-0">
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              JavaScript gives you three ways to create variables. <code className="text-blue-300">let</code> for values that change, <code className="text-amber-300">const</code> for values that stay, and <code className="text-[#8c7b66]">var</code>... well, we'll explain why you should avoid it.
            </p>
          </div>
          <div ref={text3Ref} className="[grid-area:stack] flex items-center justify-center opacity-0">
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              JavaScript has 7 primitive types. Each stores a single, immutable value. Think of them as different kinds of items you can put in your boxes.
            </p>
          </div>
          <div ref={text4Ref} className="[grid-area:stack] flex items-center justify-center opacity-0">
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              The <code className="text-amber-400">typeof</code> operator is your X-ray scanner. It reveals what type lives inside any variable. But watch out — <code className="text-white">typeof null</code> returns "object". That's a 28-year-old bug in JavaScript that can never be fixed!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
