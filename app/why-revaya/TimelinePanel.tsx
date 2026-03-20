"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  { year: "2006–2022", label: "Inside the machine.", note: "Virgin Mobile · Papa Murphy's · Intermedia" },
  { year: "2022",      label: "Reset.",               note: "Sold the house. Moved into the RV." },
  { year: "Jun 2025",  label: "AAA Program.",         note: "200+ hours. 9 months absorb mode." },
  { year: "Early 2026", label: "Build mode.",         note: "The AIOS starts taking shape." },
  { year: "Mar 2026",  label: "It clicked.",          note: "Bird's eye view. Something real to show." },
  { year: "Now",       label: "This.",                note: "Built for herself first. Now built for you." },
];

export function TimelinePanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setVisibleCount((c) => (c < milestones.length ? c + 1 : c));
    }, 650);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]"
    >
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
        <span className="ml-3 text-[0.7rem] text-white/25 font-mono">shannon · career arc</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
          <span className="text-[0.7rem] text-[#028090] font-mono">live</span>
        </div>
      </div>

      <div className="p-8 py-10 space-y-4">
        {milestones.map((m, i) => {
          const visible = i < visibleCount;
          const isLast = i === milestones.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className={`flex items-start gap-5 px-5 py-4 rounded-xl border transition-colors duration-300 ${
                isLast && visible
                  ? "border-[#028090]/30 bg-[#028090]/06"
                  : "border-white/[0.04] bg-white/[0.01]"
              }`}
            >
              {/* Left: connector line + dot */}
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                <motion.div
                  animate={{
                    backgroundColor: visible
                      ? isLast
                        ? "#028090"
                        : "rgba(2,128,144,0.5)"
                      : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2.5 h-2.5 rounded-full"
                />
                {i < milestones.length - 1 && (
                  <motion.div
                    animate={{
                      backgroundColor: visible
                        ? "rgba(2,128,144,0.25)"
                        : "rgba(255,255,255,0.05)",
                    }}
                    className="w-px h-6"
                  />
                )}
              </div>

              {/* Right: year + label + note */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap mb-1">
                  <span className="text-[0.7rem] text-white/30 font-mono shrink-0">{m.year}</span>
                  <span
                    className={`text-[0.9375rem] font-mono font-bold ${
                      isLast && visible ? "text-[#028090]" : "text-white/80"
                    }`}
                  >
                    {m.label}
                  </span>
                </div>
                <p className="text-[0.8125rem] text-white/40 font-mono">{m.note}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
