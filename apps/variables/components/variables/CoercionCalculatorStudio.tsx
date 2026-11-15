"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Sparkles, ArrowRight, BookOpen, Layers } from "lucide-react";

interface CoercionPreset {
  left: string;
  op: string;
  right: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "mind-bending";
}

const PRESETS: CoercionPreset[] = [
  { left: "[]", op: "==", right: "false", title: "[] == false", difficulty: "mind-bending" },
  { left: "[]", op: "+", right: "[]", title: "[] + []", difficulty: "beginner" },
  { left: "[]", op: "+", right: "{}", title: "[] + {}", difficulty: "intermediate" },
  { left: "null", op: "==", right: "undefined", title: "null == undefined", difficulty: "beginner" },
  { left: "null", op: "==", right: "0", title: "null == 0", difficulty: "intermediate" },
  { left: "'5'", op: "-", right: "3", title: "'5' - 3", difficulty: "beginner" },
  { left: "'5'", op: "+", right: "3", title: "'5' + 3", difficulty: "beginner" },
  { left: "true", op: "+", right: "true", title: "true + true", difficulty: "beginner" }
];

export function CoercionCalculatorStudio() {
  const [left, setLeft] = useState<string>("[]");
  const [op, setOp] = useState<string>("==");
  const [right, setRight] = useState<string>("false");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);

  const getCoercionResult = (l: string, operator: string, r: string) => {
    try {
      const code = `${l} ${operator} ${r}`;
      const result = new Function(`return (${code});`)();
      const type = typeof result;
      let displayResult = String(result);
      if (type === "string") displayResult = `"${result}"`;
      return { result: displayResult, type, isError: false };
    } catch (err: any) {
      return { result: err.message || "Error", type: "error", isError: true };
    }
  };

  const getTraceSteps = (l: string, operator: string, r: string): string[] => {
    if (l === "[]" && operator === "==" && r === "false") {
      return [
        "1. ECMA-262 §7.2.14: Comparing Object and Boolean coerces Boolean to Number first.",
        "2. ToNumber(false) returns 0. Expression becomes: [] == 0.",
        "3. Compare Object with Number: invoke ToPrimitive([]) with hint 'default'.",
        "4. [].valueOf() returns [], which is not primitive; fall back to [].toString() -> \"\".",
        "5. Expression becomes: \"\" == 0.",
        "6. Compare String with Number: invoke ToNumber(\"\") -> 0.",
        "7. Final strict comparison: 0 === 0 evaluates to true."
      ];
    }
    if (l === "[]" && operator === "+" && r === "[]") {
      return [
        "1. Binary addition (+) triggers ToPrimitive on both operands.",
        "2. ToPrimitive([]) calls [].toString() which returns \"\".",
        "3. Expression becomes: \"\" + \"\".",
        "4. String concatenation yields empty string \"\"."
      ];
    }
    if (l === "[]" && operator === "+" && r === "{}") {
      return [
        "1. Binary addition (+) triggers ToPrimitive on both operands.",
        "2. ToPrimitive([]) calls [].toString() -> \"\".",
        "3. ToPrimitive({}) calls ({}).toString() -> \"[object Object]\".",
        "4. String concatenation yields \"[object Object]\"."
      ];
    }
    if (l === "null" && operator === "==" && r === "undefined") {
      return [
        "1. ECMA-262 §7.2.14 steps 2 & 3: Standard identity rule.",
        "2. null and undefined loosely equal each other directly without numeric conversion.",
        "3. They equal only each other and nothing else."
      ];
    }
    if (l === "null" && operator === "==" && r === "0") {
      return [
        "1. ECMA-262 §7.2.14: null is only loosely equal to undefined and null itself.",
        "2. Unlike relational operators (<, <=, >, >=), abstract equality (==) does NOT coerce null to 0.",
        "3. Therefore, null == 0 evaluates to false."
      ];
    }
    if (operator === "-") {
      return [
        "1. Subtraction (-) is strictly mathematical.",
        `2. Calls ToNumber(${l}) and ToNumber(${r}).`,
        "3. Performs IEEE 754 float64 subtraction."
      ];
    }
    if (operator === "===") {
      return [
        "1. Strict Equality (===) skips all coercion algorithms.",
        "2. If Type(x) !== Type(y), returns false immediately.",
        "3. Deterministic and fast."
      ];
    }
    return [
      `1. Evaluates binary expression (${l} ${operator} ${r}) according to ECMA-262.`,
      `2. Resolves operands using internal specifications.`,
      `3. Emits final primitive result.`
    ];
  };

  const currentResult = getCoercionResult(left, op, right);
  const trace = getTraceSteps(left, op, right);

  const applyPreset = (p: CoercionPreset, idx: number) => {
    setLeft(p.left);
    setOp(p.op);
    setRight(p.right);
    setSelectedPreset(idx);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          07 &bull; ECMA-262 Algorithmic Coercion
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          The Coercion Alchemy Reactor
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          JavaScript never crashes when evaluating mismatched types. Instead, the runtime runs a deterministic conversion pipeline dictated by ECMA-262 specifications.
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-xl">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-3 font-semibold">
            Classic Interview Riddles:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p, i)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer border ${
                  selectedPreset === i
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold"
                    : "bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400"
                }`}
              >
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 flex flex-col justify-between font-mono">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-6 font-semibold">
                Reactant Reaction Chamber
              </span>

              <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] mb-6">
                <span className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold text-lg">
                  {left}
                </span>
                <span className="text-xl font-bold text-slate-400">
                  {op}
                </span>
                <span className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-lg">
                  {right}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/[0.06] text-center">
                <span className="text-[10px] text-slate-400 block mb-1">TRANSMUTED RESULT:</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {currentResult.result}
                </span>
                <span className="text-xs text-amber-500 block mt-1 font-bold">
                  Type: {currentResult.type}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-xs text-slate-500 flex justify-between items-center">
              <span>ECMAScript Core:</span>
              <span className="text-slate-300 font-bold">§7.2.14 Abstract Relational</span>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-4 font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                ECMA-262 Algorithmic Execution Steps
              </span>

              <div className="space-y-2.5">
                {trace.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-500 flex justify-between items-center">
              <span>Golden Rule:</span>
              <span className="text-emerald-500 font-bold">Always prefer === in production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
