'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function MemoryScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentBeat, setCurrentBeat] = useState(0)

  useEffect(() => {
    let ctx: gsap.Context

    const initGsap = () => {
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            if (progress < 0.25) setCurrentBeat(0)
            else if (progress < 0.5) setCurrentBeat(1)
            else if (progress < 0.75) setCurrentBeat(2)
            else setCurrentBeat(3)
          },
        })
      }, containerRef)
    }

    const timer = setTimeout(initGsap, 500)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-transparent flex flex-col items-center justify-center relative overflow-hidden text-white font-sans"
    >
      <div className="absolute inset-0 bg-[#050505] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-h-[800px]">
        
        {/* LEFT COLUMN: TEXT EXPLANATION */}
        <div className="lg:col-span-5 flex flex-col space-y-6 relative h-[450px]">
          <AnimatePresence mode="wait">
            {currentBeat === 0 && (
              <motion.div
                key="beat0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-amber-500 text-2xl mb-4">let x = 42</div>
                <h2 className="text-3xl font-bold mb-4">Allocating Memory</h2>
                <p className="text-gray-400 text-lg">
                  When you write <code className="text-amber-400">let x = 42</code>, JavaScript asks the computer for a slot in the Call Stack, writes 42 into it, and remembers that "x" points to that slot.
                </p>
              </motion.div>
            )}

            {currentBeat === 1 && (
              <motion.div
                key="beat1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-amber-500 text-2xl mb-4">
                  let y = x<br />
                  x = 99
                </div>
                <h2 className="text-3xl font-bold mb-4">Copying Primitives</h2>
                <p className="text-gray-400 text-lg mb-6">
                  Primitives copy by VALUE. When you write <code className="text-amber-400">let y = x</code>, JavaScript copies the actual number into a brand new slot. Changing x later has zero effect on y.
                </p>
              </motion.div>
            )}

            {currentBeat === 2 && (
              <motion.div
                key="beat2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-amber-500 text-2xl mb-4">
                  let obj = {'{'} a: 1 {'}'}
                </div>
                <h2 className="text-3xl font-bold mb-4">Objects Are Different</h2>
                <p className="text-gray-400 text-lg">
                  Objects don't fit in a single stack slot. They live in a separate area called the Heap. Your variable just stores the ADDRESS — a pointer to where the object actually lives.
                </p>
              </motion.div>
            )}

            {currentBeat === 3 && (
              <motion.div
                key="beat3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-amber-500 text-2xl mb-4">
                  let obj2 = obj<br />
                  obj2.a = 999
                </div>
                <h2 className="text-3xl font-bold mb-4">The Shared Reference Trap</h2>
                <p className="text-gray-400 text-lg mb-6">
                  When you copy an object, you're only copying the pointer — not the data. Both variables point to the SAME object on the Heap.
                </p>
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                  <p className="text-sm">Mutate through one, and the other sees the change. This is the #1 source of bugs for beginners.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: REAL WORLD MEMORY SVG */}
        <div className="lg:col-span-7 w-full aspect-[4/3] relative bg-[#0a0a0a] rounded-3xl border border-white/5 p-2 flex flex-col overflow-hidden shadow-2xl">
          
          <svg viewBox="0 0 800 600" className="w-full h-full overflow-visible">
            <defs>
              <marker id="arrow-yellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
              <marker id="arrow-white" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" opacity="0.5" />
              </marker>
              
              <linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#081008" />
                <stop offset="100%" stopColor="#111c11" />
              </linearGradient>
              
              <linearGradient id="heapPcb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0a0f1a" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>

              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" stroke="#ffffff" strokeOpacity="0.03" />
              </pattern>
            </defs>

            <rect width="800" height="600" fill="url(#grid)" rx="20" />

            {/* CALL STACK: RAM STICK */}
            <g transform="translate(80, 40)">
              {/* RAM PCB */}
              <rect x="0" y="0" width="240" height="520" rx="6" fill="url(#pcb)" stroke="#1a2f1a" strokeWidth="2" />
              {/* Gold Contacts */}
              <path d="M 10 520 L 230 520 L 230 540 L 10 540 Z" fill="#b48600" />
              <rect x="10" y="520" width="220" height="20" fill="none" stroke="#cca42b" strokeWidth="1" strokeDasharray="4 2" />
              <rect x="110" y="520" width="10" height="20" fill="#050505" /> {/* Key notch */}
              {/* Label */}
              <text x="120" y="-15" fill="#4ade80" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="2">PHYSICAL RAM (CALL STACK)</text>
              
              {/* Memory Chips (Slots) */}
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(20, ${i * 90 + 30})`}>
                  {/* Metal legs */}
                  <path d="M -5 10 L 0 10 M -5 25 L 0 25 M -5 40 L 0 40 M -5 55 L 0 55 M 200 10 L 205 10 M 200 25 L 205 25 M 200 40 L 205 40 M 200 55 L 205 55" stroke="#666" strokeWidth="3" />
                  {/* Chip body */}
                  <rect x="0" y="0" width="200" height="70" rx="4" fill="#0f0f0f" stroke="#222" strokeWidth="2" />
                  <text x="100" y="15" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle">ADDR: 0x10{i * 4}</text>
                  <text x="10" y="55" fill="#333" fontSize="10" fontFamily="monospace">NAND FLASH</text>
                </g>
              ))}
            </g>

            {/* HEAP: SSD / CPU DIE */}
            <g transform="translate(480, 150)">
              <rect x="0" y="0" width="280" height="280" rx="12" fill="url(#heapPcb)" stroke="#1e293b" strokeWidth="2" />
              <rect x="15" y="15" width="250" height="250" fill="none" stroke="#3b82f630" strokeWidth="1" />
              <circle cx="20" cy="20" r="4" fill="#fbbf24" />
              <text x="140" y="-15" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="2">HEAP STORAGE</text>
              
              {/* Heap Sectors background */}
              <g opacity="0.3">
                {[0,1,2].map(row => 
                  [0,1,2].map(col => (
                    <rect key={row+col} x={30 + col * 75} y={30 + row * 75} width="70" height="70" fill="#111" stroke="#222" />
                  ))
                )}
              </g>
            </g>

            {/* ANIMATED DATA LOGIC */}
            <AnimatePresence>
              {/* Beat 0: let x = 42 */}
              {currentBeat >= 0 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.rect
                    initial={{ fill: '#0f0f0f', stroke: '#222' }}
                    animate={{ fill: '#fbbf2415', stroke: '#fbbf24' }}
                    x="100" y="70" width="200" height="70" rx="4" strokeWidth="2"
                  />
                  <motion.text x="200" y="115" fill="#fbbf24" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    {currentBeat >= 1 ? '99' : '42'}
                  </motion.text>
                  
                  {/* Pointer Line & Callout */}
                  <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <rect x="10" y="85" width="40" height="30" rx="4" fill="#fbbf24" />
                    <text x="30" y="105" fill="#000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">x</text>
                    <path d="M 50 100 L 90 100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow-yellow)" />
                  </motion.g>

                  {currentBeat === 0 && (
                    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <path d="M 300 105 L 360 105" stroke="#ffffff" opacity="0.5" strokeWidth="1" markerEnd="url(#arrow-white)" />
                      <rect x="370" y="85" width="220" height="40" rx="4" fill="#1a1a1a" stroke="#fbbf2440" />
                      <text x="480" y="109" fill="#ccc" fontSize="12" textAnchor="middle">Physical RAM slot stores '42'</text>
                    </motion.g>
                  )}
                </motion.g>
              )}

              {/* Beat 1: let y = x; x = 99 */}
              {currentBeat >= 1 && currentBeat < 2 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.rect
                    initial={{ fill: '#0f0f0f', stroke: '#222' }}
                    animate={{ fill: '#fbbf2415', stroke: '#fbbf24' }}
                    x="100" y="160" width="200" height="70" rx="4" strokeWidth="2"
                  />
                  <motion.text x="200" y="205" fill="#fbbf24" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    42
                  </motion.text>
                  
                  <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <rect x="10" y="175" width="40" height="30" rx="4" fill="#fbbf24" />
                    <text x="30" y="195" fill="#000" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">y</text>
                    <path d="M 50 190 L 90 190" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow-yellow)" />
                  </motion.g>

                  <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <path d="M 300 195 L 360 195" stroke="#ffffff" opacity="0.5" strokeWidth="1" markerEnd="url(#arrow-white)" />
                    <rect x="370" y="175" width="240" height="40" rx="4" fill="#1a1a1a" stroke="#fbbf2440" />
                    <text x="490" y="199" fill="#ccc" fontSize="12" textAnchor="middle">Copied to a brand new physical slot</text>
                  </motion.g>
                </motion.g>
              )}

              {/* Beat 2 & 3: let obj = {a: 1} */}
              {currentBeat >= 2 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Stack Pointer 1 */}
                  <motion.rect
                    initial={{ fill: '#0f0f0f', stroke: '#222' }}
                    animate={{ fill: '#3b82f615', stroke: '#3b82f6' }}
                    x="100" y="250" width="200" height="70" rx="4" strokeWidth="2"
                  />
                  <motion.text x="200" y="295" fill="#3b82f6" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    @0x800
                  </motion.text>
                  <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <rect x="10" y="265" width="40" height="30" rx="4" fill="#3b82f6" />
                    <text x="30" y="285" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">obj</text>
                    <path d="M 50 280 L 90 280" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                  </motion.g>

                  {/* Heap Object block */}
                  <g transform="translate(540, 210)">
                    <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <rect x="0" y="0" width="160" height="90" rx="8" fill="#1a1a1a" stroke="#3b82f6" strokeWidth="2" />
                    <text x="80" y="20" fill="#3b82f6" fontSize="12" textAnchor="middle" fontFamily="monospace">ADDR: 0x800</text>
                    <rect x="10" y="35" width="140" height="40" rx="4" fill="#000" stroke="#333" />
                    <text x="25" y="60" fill="#fff" fontSize="16" fontFamily="monospace">a:</text>
                    <text x="130" y="60" fill={currentBeat === 3 ? "#ef4444" : "#fbbf24"} fontSize="20" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                      {currentBeat === 3 ? '999' : '1'}
                    </text>
                  </motion.g>
                  </g>

                  {/* Connecting Line 1 */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    d="M 300 285 C 380 285 450 255 530 255"
                    stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" fill="none" markerEnd="url(#arrow-blue)"
                  />

                  {currentBeat === 2 && (
                    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <path d="M 500 200 L 535 170" stroke="#ffffff" opacity="0.5" strokeWidth="1" markerEnd="url(#arrow-white)" />
                      <rect x="360" y="130" width="180" height="40" rx="4" fill="#1a1a1a" stroke="#3b82f640" />
                      <text x="450" y="154" fill="#ccc" fontSize="12" textAnchor="middle">Data is stored in Heap</text>
                      
                      <path d="M 300 320 L 350 350" stroke="#ffffff" opacity="0.5" strokeWidth="1" markerEnd="url(#arrow-white)" />
                      <rect x="360" y="340" width="180" height="40" rx="4" fill="#1a1a1a" stroke="#3b82f640" />
                      <text x="450" y="364" fill="#ccc" fontSize="12" textAnchor="middle">Stack only stores pointer</text>
                    </motion.g>
                  )}
                </motion.g>
              )}

              {/* Beat 3: let obj2 = obj */}
              {currentBeat >= 3 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.rect
                    initial={{ fill: '#0f0f0f', stroke: '#222' }}
                    animate={{ fill: '#3b82f615', stroke: '#3b82f6' }}
                    x="100" y="340" width="200" height="70" rx="4" strokeWidth="2"
                  />
                  <motion.text x="200" y="385" fill="#3b82f6" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    @0x800
                  </motion.text>
                  <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <rect x="10" y="355" width="40" height="30" rx="4" fill="#3b82f6" />
                    <text x="30" y="375" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">obj2</text>
                    <path d="M 50 370 L 90 370" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                  </motion.g>

                  {/* Connecting Line 2 */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    d="M 300 375 C 380 375 450 265 530 265"
                    stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" fill="none" markerEnd="url(#arrow-blue)"
                  />
                  
                  {/* Danger Callout */}
                  <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                    <rect x="540" y="320" width="160" height="60" rx="4" fill="#ef444420" stroke="#ef4444" strokeWidth="2" />
                    <text x="620" y="345" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">MUTATION HAZARD!</text>
                    <text x="620" y="365" fill="#ef4444" fontSize="10" textAnchor="middle">Both pointers modify same memory</text>
                    <path d="M 620 320 L 620 305" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-yellow)" />
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </div>
  )
}
