'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info } from 'lucide-react'

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

      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full max-h-[800px]">
        <div className="flex flex-col space-y-6 relative h-[400px]">
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
                  When you write <code className="text-amber-400">let x = 42</code>, JavaScript asks the computer for a slot in memory, writes 42 into it, and remembers that "x" points to that slot.
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
                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-blue-400">
                  <Info className="w-6 h-6 shrink-0" />
                  <p>Each primitive variable owns its own independent copy of the data.</p>
                </div>
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
                  Objects don't fit in a single slot. They live in a separate area called the Heap. Your variable just stores the ADDRESS — a pointer to where the object actually lives.
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
                  When you copy an object, you're only copying the pointer — not the data. Both variables point to the SAME object. Mutate through one, and the other sees the change. This is the #1 source of bugs for beginners.
                </p>
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                  <p>
                    This is called a shallow copy. To truly duplicate an object, use structuredClone() or the spread operator {'{...obj}'}.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full aspect-square relative bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col overflow-hidden backdrop-blur-sm">
          <div className="text-sm font-semibold tracking-wider text-gray-500 mb-4 uppercase">
            Call Stack / Memory
          </div>

          <svg viewBox="0 0 800 600" className="w-full h-full overflow-visible">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
              </marker>
              <marker
                id="arrow-blue"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
            </defs>

            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={`translate(100, ${i * 70 + 80})`}>
                <rect
                  x="0"
                  y="0"
                  width="180"
                  height="50"
                  rx="8"
                  fill="#1a1a1a"
                  stroke="#333"
                  strokeWidth="2"
                />
                <text
                  x="90"
                  y="25"
                  fill="#666"
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="monospace"
                >
                  0x10{i * 4}
                </text>
              </g>
            ))}

            <AnimatePresence>
              {currentBeat >= 0 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transform="translate(100, 80)"
                >
                  <motion.rect
                    initial={{ fill: '#1a1a1a', stroke: '#333' }}
                    animate={{ fill: '#fbbf2420', stroke: '#fbbf24' }}
                    x="0"
                    y="0"
                    width="180"
                    height="50"
                    rx="8"
                    strokeWidth="2"
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    x="90"
                    y="25"
                    fill="#fbbf24"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="monospace"
                  >
                    {currentBeat >= 1 ? '99' : '42'}
                  </motion.text>
                  <motion.g initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                    <text
                      x="-30"
                      y="25"
                      fill="#fff"
                      fontSize="24"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="monospace"
                    >
                      x
                    </text>
                    <path
                      d="M -15 25 L -5 25"
                      stroke="#fff"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  </motion.g>
                </motion.g>
              )}

              {currentBeat >= 1 && currentBeat < 2 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transform="translate(100, 150)"
                >
                  <motion.rect
                    initial={{ fill: '#1a1a1a', stroke: '#333' }}
                    animate={{ fill: '#fbbf2420', stroke: '#fbbf24' }}
                    x="0"
                    y="0"
                    width="180"
                    height="50"
                    rx="8"
                    strokeWidth="2"
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    x="90"
                    y="25"
                    fill="#fbbf24"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="monospace"
                  >
                    42
                  </motion.text>
                  <motion.g initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                    <text
                      x="-30"
                      y="25"
                      fill="#fff"
                      fontSize="24"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="monospace"
                    >
                      y
                    </text>
                    <path
                      d="M -15 25 L -5 25"
                      stroke="#fff"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  </motion.g>
                </motion.g>
              )}

              {currentBeat >= 2 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transform="translate(100, 220)"
                >
                  <motion.rect
                    initial={{ fill: '#1a1a1a', stroke: '#333' }}
                    animate={{ fill: '#3b82f620', stroke: '#3b82f6' }}
                    x="0"
                    y="0"
                    width="180"
                    height="50"
                    rx="8"
                    strokeWidth="2"
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    x="90"
                    y="25"
                    fill="#3b82f6"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="monospace"
                  >
                    @0x800
                  </motion.text>
                  <motion.g initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                    <text
                      x="-50"
                      y="25"
                      fill="#fff"
                      fontSize="20"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="monospace"
                    >
                      obj
                    </text>
                    <path
                      d="M -20 25 L -5 25"
                      stroke="#fff"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  </motion.g>

                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    d="M 180 25 L 300 25 C 350 25 350 15 400 15 L 450 15"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrow-blue)"
                    strokeDasharray="6,6"
                  />
                </motion.g>
              )}

              {currentBeat >= 3 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transform="translate(100, 290)"
                >
                  <motion.rect
                    initial={{ fill: '#1a1a1a', stroke: '#333' }}
                    animate={{ fill: '#3b82f620', stroke: '#3b82f6' }}
                    x="0"
                    y="0"
                    width="180"
                    height="50"
                    rx="8"
                    strokeWidth="2"
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    x="90"
                    y="25"
                    fill="#3b82f6"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="monospace"
                  >
                    @0x800
                  </motion.text>
                  <motion.g initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                    <text
                      x="-50"
                      y="25"
                      fill="#fff"
                      fontSize="20"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="monospace"
                    >
                      obj2
                    </text>
                    <path
                      d="M -20 25 L -5 25"
                      stroke="#fff"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  </motion.g>

                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    d="M 180 25 L 300 25 C 350 25 350 -55 400 -55 L 450 -55"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrow-blue)"
                    strokeDasharray="6,6"
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {currentBeat >= 2 && (
              <g transform="translate(550, 200)">
                <text
                  x="0"
                  y="-15"
                  fill="#666"
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  letterSpacing="0.1em"
                >
                  HEAP MEMORY
                </text>
                <motion.rect
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  x="0"
                  y="0"
                  width="220"
                  height="120"
                  rx="16"
                  fill="#3b82f610"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="110"
                  y="30"
                  fill="#3b82f6"
                  fontSize="14"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  Address: 0x800
                </motion.text>

                <motion.g
                  transform="translate(20, 60)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="40"
                    rx="6"
                    fill="#1a1a1a"
                    stroke="#333"
                    strokeWidth="1"
                  />
                  <text x="20" y="25" fill="#fff" fontSize="16" fontFamily="monospace">
                    a:
                  </text>
                  <motion.text
                    x="160"
                    y="25"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="end"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      fill: currentBeat >= 3 ? '#ef4444' : '#fbbf24',
                    }}
                    key={currentBeat >= 3 ? 'mutated' : 'original'}
                  >
                    {currentBeat >= 3 ? '999' : '1'}
                  </motion.text>
                </motion.g>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
