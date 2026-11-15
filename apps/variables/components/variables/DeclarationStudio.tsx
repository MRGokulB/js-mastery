"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Layers, ShieldCheck, AlertOctagon, Terminal, Sparkles, Check, X, ShieldAlert, Cpu, Zap } from "lucide-react";

type DeclType = "const" | "let" | "var";

interface ActionTest {
  id: string;
  label: string;
  codeSnippet: Record<DeclType, string>;
  result: Record<DeclType, {
    status: "success" | "error" | "warning";
    output: string;
    explanation: string;
    v8Note: string;
  }>;
}

const TESTS: ActionTest[] = [
  {
    id: "reassign",
    label: "Reassignment (x = newValue)",
    codeSnippet: {
      const: "const score = 100;\nscore = 150; // Throws TypeError",
      let: "let score = 100;\nscore = 150; // In-place register update",
      var: "var score = 100;\nscore = 150; // Reassigned"
    },
    result: {
      const: {
        status: "error",
        output: "TypeError: Assignment to constant variable.",
        explanation: "const creates an immutable lexical binding. The Ignition compiler emits a static assignment check and halts before writing to the register.",
        v8Note: "Ignition opcode: ThrowAssignmentToConstant"
      },
      let: {
        status: "success",
        output: "score = 150 (Updated in stack frame)",
        explanation: "let creates a mutable binding. The engine overwrites the 64-bit stack register in-place with zero memory allocation penalty.",
        v8Note: "Ignition opcode: Star r0 (O(1) register overwrite)"
      },
      var: {
        status: "success",
        output: "score = 150 (Updated in variable environment)",
        explanation: "var allows reassignment and even re-declaration within the same function scope without throwing.",
        v8Note: "Ignition opcode: StaGlobal / StaCurrentContextSlot"
      }
    }
  },
  {
    id: "mutation",
    label: "Object Mutation (x.key = val)",
    codeSnippet: {
      const: "const user = { name: 'Alex' };\nuser.name = 'Jordan'; // 100% Legal!",
      let: "let user = { name: 'Alex' };\nuser.name = 'Jordan';",
      var: "var user = { name: 'Alex' };\nuser.name = 'Jordan';"
    },
    result: {
      const: {
        status: "success",
        output: "user.name is now 'Jordan' (Mutated successfully)",
        explanation: "ARCHITECTURAL TRUTH: const freezes the 64-bit stack pointer address, NOT the heap object! The object on the heap remains completely mutable unless Object.freeze() is invoked.",
        v8Note: "Stack pointer 0x4A10 unchanged. Heap slot modified via Map."
      },
      let: {
        status: "success",
        output: "user.name is now 'Jordan'",
        explanation: "Both the stack pointer and the heap contents can be altered.",
        v8Note: "SetNamedProperty via Inline Cache"
      },
      var: {
        status: "success",
        output: "user.name is now 'Jordan'",
        explanation: "Object property is mutated normally.",
        v8Note: "Standard property store"
      }
    }
  },
  {
    id: "hoisting",
    label: "Access Before Declaration Line",
    codeSnippet: {
      const: "console.log(taxRate); // ReferenceError\nconst taxRate = 0.15;",
      let: "console.log(taxRate); // ReferenceError\nlet taxRate = 0.15;",
      var: "console.log(taxRate); // Logs 'undefined' (Silent Bug)\nvar taxRate = 0.15;"
    },
    result: {
      const: {
        status: "error",
        output: "ReferenceError: Cannot access 'taxRate' before initialization",
        explanation: "Trapped in the Temporal Dead Zone (TDZ). The identifier is registered in lexical scope, but V8 marks it as <The Hole>. Access halts execution.",
        v8Note: "Ignition: ThrowReferenceErrorIfHole"
      },
      let: {
        status: "error",
        output: "ReferenceError: Cannot access 'taxRate' before initialization",
        explanation: "Trapped in the TDZ. Prevents reading undefined values before intentional declaration.",
        v8Note: "Ignition: ThrowReferenceErrorIfHole"
      },
      var: {
        status: "warning",
        output: "undefined (Silent bug danger)",
        explanation: "var is hoisted to function top and auto-initialized to undefined during the compile creation phase.",
        v8Note: "V8 allocates undefined into VariableEnvironment at pass 1."
      }
    }
  }
];

export function DeclarationStudio() {
  const [activeDecl, setActiveDecl] = useState<DeclType>("const");
  const [activeTestId, setActiveTestId] = useState<string>("reassign");

  const currentTest = TESTS.find((t) => t.id === activeTestId)!;
  const currentResult = currentTest.result[activeDecl];

  const DECL_META: Record<DeclType, { name: string; title: string; scope: string; reassign: string; hoisting: string; icon: any }> = {
    const: {
      name: "const",
      title: "Immutable Binding",
      scope: "Block { }",
      reassign: "Forbidden",
      hoisting: "TDZ (The Hole)",
      icon: Lock,
    },
    let: {
      name: "let",
      title: "Mutable Binding",
      scope: "Block { }",
      reassign: "Permitted",
      hoisting: "TDZ (The Hole)",
      icon: Unlock,
    },
    var: {
      name: "var",
      title: "Legacy Scope Leaker",
      scope: "Function Only",
      reassign: "Permitted",
      hoisting: "undefined",
      icon: Layers,
    },
  };

  const meta = DECL_META[activeDecl];
  const Icon = meta.icon;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          03 &bull; Declaration Foundry &amp; Scope Boundaries
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          The Declaration Foundry
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          How identifiers bind to memory addresses. Switch between <code className="text-amber-500 font-mono">const</code>, <code className="text-amber-500 font-mono">let</code>, and <code className="text-rose-500 font-mono">var</code> to test live V8 compiler rules.
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border ${
              activeDecl === "const"
                ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                : activeDecl === "let"
                ? "bg-amber-400/10 text-amber-400 border-amber-400/30"
                : "bg-rose-500/10 text-rose-500 border-rose-500/30"
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  {meta.name}
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase">
                  &bull; {meta.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                <span>Scope: <strong className="text-slate-900 dark:text-white">{meta.scope}</strong></span>
                <span>Reassignment: <strong className={meta.reassign === "Forbidden" ? "text-rose-500" : "text-emerald-500"}>{meta.reassign}</strong></span>
                <span>Hoisting: <strong className={meta.hoisting === "undefined" ? "text-rose-500" : "text-amber-500"}>{meta.hoisting}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 self-start sm:self-auto">
            {(["const", "let", "var"] as DeclType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveDecl(type)}
                className={`px-5 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  activeDecl === type
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="my-8">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-3 font-semibold">
            Select Ignition Compiler Experiment:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {TESTS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTestId(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer border flex items-center gap-2 ${
                  activeTestId === t.id
                    ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-sm font-bold"
                    : "bg-white dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 rounded-2xl bg-[#080a0f] border border-slate-800 p-6 flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-500" />
                  declaration_test.js
                </span>
                <span className="text-amber-400 font-bold">{activeDecl.toUpperCase()} ACTIVE</span>
              </div>
              <pre className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-mono">
                {currentTest.codeSnippet[activeDecl]}
              </pre>
            </div>
            <div className="mt-8 text-[11px] text-slate-500 flex justify-between items-center pt-4 border-t border-white/[0.08]">
              <span>V8 Architecture:</span>
              <span className="text-slate-300 font-bold">{currentResult.v8Note}</span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  Runtime Evaluation
                </span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  currentResult.status === "error"
                    ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                    : currentResult.status === "warning"
                    ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                }`}>
                  {currentResult.status.toUpperCase()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/[0.06] font-mono text-xs text-slate-800 dark:text-slate-200 mb-4 font-bold">
                {currentResult.output}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentResult.explanation}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-500 flex justify-between items-center">
              <span>Binding Guard:</span>
              <span className={`font-bold ${
                currentResult.status === "error" ? "text-rose-500" : "text-emerald-500"
              }`}>
                {currentResult.status === "error" ? "Static Violation" : "Valid Execution"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
