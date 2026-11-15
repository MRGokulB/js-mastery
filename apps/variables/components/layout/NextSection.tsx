"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NextSectionProps {
  href: string;
  title: string;
  description: string;
}

export function NextSection({ href, title, description }: NextSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-20 mb-32 px-4">
      <Link href={href} className="group block w-full relative">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0c0e14]/90 p-8 md:p-12 transition-all hover:border-amber-500/50 shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-amber-500 text-xs font-mono mb-2 uppercase tracking-widest font-bold">Next Module</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">{description}</p>
            </div>
            
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-slate-950 text-slate-400 dark:text-slate-400 transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
