"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { homeWebPageSchema } from "@/lib/schema";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

// ── TypedText ─────────────────────────────────────────────────────────────────
function TypedText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [active, text]);

  return <span className="text-[0.8125rem] text-white/80 font-mono">{displayed}</span>;
}

// ── HeroPanel ─────────────────────────────────────────────────────────────────
function HeroPanel() {
  const [taskCount, setTaskCount] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaskCount((c) => (c < 47 ? c + 1 : 47));
    }, 40);
    const layerTimer = setInterval(() => {
      setActiveLayer((l) => (l + 1) % 5);
    }, 1800);
    return () => {
      clearInterval(timer);
      clearInterval(layerTimer);
    };
  }, []);

  const layers = [
    { name: "Context", status: "Mapped" },
    { name: "Data", status: "Connected" },
    { name: "Intelligence", status: "Analyzing" },
    { name: "Automate", status: "Running" },
    { name: "Build", status: "Active" },
  ];

  return (
    <div className="w-full overflow-hidden border border-white/[0.07] bg-[#080D11]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
        <span className="ml-3 text-[0.7rem] text-white/25 font-mono tracking-wide">
          revaya-aios — live
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
          <span className="text-[0.7rem] text-[#028090] font-mono">system active</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-[1fr_180px] gap-6">
        {/* Layer list */}
        <div className="space-y-2">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              animate={{
                backgroundColor:
                  activeLayer === i
                    ? "rgba(2,128,144,0.08)"
                    : "rgba(255,255,255,0.02)",
              }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    backgroundColor:
                      activeLayer === i ? "#028090" : "rgba(2,128,144,0.3)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-1.5 h-1.5 rounded-full"
                />
                <span className="text-[0.8125rem] text-white/70 font-mono">
                  {layer.name}
                </span>
              </div>
              <motion.span
                animate={{
                  color:
                    activeLayer === i ? "#028090" : "rgba(255,255,255,0.25)",
                }}
                className="text-[0.75rem] font-mono"
              >
                {layer.status}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Right stats column */}
        <div className="space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
            <div className="font-mono font-bold text-[2rem] text-[#028090] leading-none mb-1">
              {taskCount}
            </div>
            <div className="text-[0.65rem] text-white/70 uppercase tracking-wide">
              tasks handled today
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
            <div className="font-mono font-bold text-[1.5rem] text-white leading-none mb-1">
              &infin;
            </div>
            <div className="text-[0.65rem] text-white/70 uppercase tracking-wide">
              uptime
            </div>
          </div>
          <div className="rounded-xl border border-[#028090]/20 bg-[#028090]/5 p-4 text-center">
            <div className="text-[0.65rem] text-[#028090] uppercase tracking-wide mb-1">
              owner offline
            </div>
            <div className="text-[0.7rem] text-white/80">system still running</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ContextPanel ──────────────────────────────────────────────────────────────
function ContextPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);

  const steps = [
    { q: "What does your business do?", a: "Service-based consulting, 4 staff" },
    { q: "Where does your time go daily?", a: "Client onboarding, status updates, reporting" },
    { q: "What breaks when you're away?", a: "Everything — team routes all decisions to me" },
    { q: "What would change with 10 hrs back?", a: "Focus on growth, client strategy" },
  ];

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 2000);
    return () => clearInterval(timer);
  }, [inView, steps.length]);

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]"
    >
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
        <span className="ml-3 text-[0.7rem] text-white/25 font-mono">
          context — discovery interview
        </span>
      </div>
      <div className="p-6 space-y-4">
        <AnimatePresence>
          {steps.slice(0, step + 1).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-1.5"
            >
              <p className="text-[0.75rem] text-white/70 font-mono">
                {`>`} {item.q}
              </p>
              <div className="ml-3 px-3 py-2 rounded-lg bg-[#028090]/[0.08] border border-[#028090]/15">
                <TypedText text={item.a} active={i === step} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Blinking cursor */}
        <div className="flex items-center gap-2 ml-1">
          <span className="text-[0.75rem] text-[#028090] font-mono animate-pulse">
            ▋
          </span>
        </div>
      </div>
    </div>
  );
}

// ── AutomatePanel ─────────────────────────────────────────────────────────────
function AutomatePanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [doneCount, setDoneCount] = useState(0);

  const tasks = [
    "Send weekly client status report",
    "Follow up with unresponsive leads",
    "Process new client intake form",
    "Generate monthly revenue summary",
    "Route support ticket to correct team",
    "Schedule recurring team standup",
  ];

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setDoneCount((c) => (c < tasks.length ? c + 1 : c));
    }, 900);
    return () => clearInterval(timer);
  }, [inView, tasks.length]);

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]"
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
          <span className="ml-2 text-[0.7rem] text-white/25 font-mono">
            automate — task queue
          </span>
        </div>
        <span className="text-[0.7rem] font-mono text-[#028090]">
          {doneCount}/{tasks.length} handled
        </span>
      </div>
      <div className="p-5 space-y-2">
        {tasks.map((task, i) => {
          const done = i < doneCount;
          return (
            <motion.div
              key={i}
              animate={{ opacity: done ? 0.5 : 1 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.04]"
            >
              <motion.div
                animate={{
                  backgroundColor: done ? "#028090" : "transparent",
                  borderColor: done ? "#028090" : "rgba(255,255,255,0.15)",
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
              >
                {done && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </motion.div>
              <span
                className={`text-[0.8125rem] font-mono transition-all duration-300 ${
                  done ? "line-through text-white/25" : "text-white/65"
                }`}
              >
                {task}
              </span>
              {done && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto text-[0.65rem] text-[#028090] font-mono shrink-0"
                >
                  automated
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />

      {/* ── FULL-PAGE TEAL ORBS (fixed, behind everything) ───────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[#028090]/20 blur-[160px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
        <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#028090]/12 blur-[120px]" />
      </div>

      {/* ── HERO — centered ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-0" style={{ zIndex: 1 }}>

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          {/* Eyebrow */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
              <span className="text-[0.75rem] uppercase tracking-[0.12em] text-white/80 font-medium">
                Business AI Operating System
              </span>
            </div>
          </FadeIn>

          {/* H1 */}
          <FadeIn delay={0.1}>
            <h1 className="font-display font-black text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.0] text-white mb-6 tracking-tight">
              Your Business,
              <br />
              Running Without You.
            </h1>
          </FadeIn>

          {/* Subhead */}
          <FadeIn delay={0.2}>
            <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.6] text-white/80 mb-4 max-w-[600px] mx-auto">
              You&rsquo;re running your business and doing the work.
              <br className="hidden md:block" /> Only one of those should be
              your job.
            </p>
          </FadeIn>

          {/* Body */}
          <FadeIn delay={0.25}>
            <p className="text-[0.9375rem] leading-[1.7] text-white/70 mb-10 max-w-[480px] mx-auto">
              I build Business AI Operating Systems for service businesses. No
              chatbots. No generic tools. A full operating system built for how
              your business actually works.
            </p>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.35}>
            <Link
              href="/work-with-me"
              className="inline-block bg-white text-[#0A0F14] text-[0.9375rem] font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] mb-16"
            >
              See if this fits your situation &rarr;
            </Link>
          </FadeIn>

          {/* Hero demo panel — full width, no bottom radius, bleeds into marquee */}
          <FadeIn delay={0.5}>
            <div className="rounded-t-2xl border border-white/[0.07] border-b-0 overflow-hidden">
              <HeroPanel />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <div style={{ zIndex: 1, position: "relative" }}>
        <div
          className="flex gap-10 whitespace-nowrap py-4"
          style={{ animation: "marquee 30s linear infinite", width: "max-content" }}
        >
          {[...Array(3)].flatMap((_, ri) =>
            [
              "Context",
              "Data",
              "Intelligence",
              "Automate",
              "Build",
              "Business AI OS",
              "5 Layers",
              "3 Outcomes",
              "Service Businesses",
            ].map((item, i) => (
              <span
                key={`${ri}-${i}`}
                className="flex items-center gap-8 text-[0.75rem] uppercase tracking-[0.14em] text-white/20 font-medium"
              >
                {item}{" "}
                <span className="text-[#028090]/40">&middot;</span>
              </span>
            ))
          )}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
      </div>

      {/* ── FEATURE ROW 1: text LEFT, panel RIGHT — Context ─────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <span className="text-[0.75rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  Layer 01 — Context
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  Your operations,
                  <br />
                  mapped and captured.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/85 mb-4">
                  Before I build anything, I map how your business actually
                  works. Every decision, every handoff, every repeatable task.
                  The system can&rsquo;t run without you until I understand what
                  &ldquo;running&rdquo; looks like.
                </p>
                <p className="text-[0.9375rem] leading-[1.7] text-white/70">
                  This is the layer most AI consultants skip. It&rsquo;s why
                  their automations fail in month two.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left">
              <ContextPanel />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEATURE ROW 2: panel LEFT, text RIGHT — Automate ────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <AutomatePanel />
            </FadeIn>
            <FadeIn delay={0.15} direction="left">
              <div>
                <span className="text-[0.75rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  Layer 04 — Automate
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  The repeatable work,
                  <br />
                  handled without you.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/85 mb-4">
                  Follow-ups, reporting, routing, intake, status updates. The
                  tasks that eat your week aren&rsquo;t complex — they&rsquo;re
                  just constant. I identify every one and automate the ones that
                  don&rsquo;t require your judgment.
                </p>
                <p className="text-[0.9375rem] leading-[1.7] text-white/70">
                  Task automation % is one of three KPIs I track in every
                  engagement. You see exactly what&rsquo;s moving.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEATURE ROW 3: text LEFT, panel RIGHT — Full system ─────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <span className="text-[0.75rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  The full system
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  Built in sequence.
                  <br />
                  Running while you sleep.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/85 mb-4">
                  Five layers — Context, Data, Intelligence, Automate, Build —
                  installed in order because each one depends on the last. This
                  is not a collection of tools. It&rsquo;s infrastructure.
                </p>
                <p className="text-[0.9375rem] leading-[1.7] text-white/70">
                  Three outcomes measured at every engagement: away-from-desk
                  autonomy, task automation %, and revenue per employee.
                </p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 mt-6 text-[0.9375rem] text-[#028090] hover:text-white transition-colors"
                >
                  See how it&rsquo;s built <span>&rarr;</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left">
              <div className="rounded-2xl overflow-hidden">
                <HeroPanel />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY GRID ──────────────────────────────────────────────────── */}
      <section className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="w-10 h-px bg-[#553555] mx-auto mb-6" />
              <h2 className="font-display font-black text-[1.75rem] md:text-[2.25rem] text-white mb-3">
                What the system covers.
              </h2>
              <p className="text-[0.9375rem] text-white/70 max-w-[400px] mx-auto">
                Eight capabilities built into every Business AIOS engagement.
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "◈", label: "Workflow mapping" },
              { icon: "⬡", label: "Data connection" },
              { icon: "◎", label: "AI decision layer" },
              { icon: "⟳", label: "Task automation" },
              { icon: "◻", label: "Custom tool build" },
              { icon: "◷", label: "Async operations" },
              { icon: "◑", label: "Owner dashboard" },
              { icon: "◈", label: "Ongoing retainer" },
            ].map((cap) => (
              <StaggerItem key={cap.label}>
                <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 text-center group">
                  <div className="text-[1.5rem] text-[#028090]/60 mb-3 group-hover:text-[#028090] transition-colors">
                    {cap.icon}
                  </div>
                  <p className="text-[0.8125rem] text-white/80 group-hover:text-white/70 transition-colors">
                    {cap.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-10 md:p-14 text-center max-w-[800px] mx-auto">
              <p className="font-display font-black text-[1.5rem] md:text-[2rem] text-white leading-[1.2] mb-6">
                &ldquo;I built this system for my own company first.&rdquo;
              </p>
              <p className="text-[1rem] leading-[1.7] text-white/80 mb-3">
                Revaya AI runs on the same Business AI OS I build for clients.
                The web delivery pipeline that built this site is one example.
                The content engine is another.
              </p>
              <p className="text-[0.9375rem] text-white/70">
                No competitor is saying that. Most sell a methodology. I sell
                the thing I already built for myself.
              </p>
              <div className="mt-8 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6 text-[0.8125rem] text-white/30">
                <span>18 years product leadership</span>
                <span className="hidden sm:block text-white/10">&middot;</span>
                <span>
                  Virgin Mobile &middot; Papa Murphy&rsquo;s &middot; Intermedia
                </span>
                <span className="hidden sm:block text-white/10">&middot;</span>
                <span>$10M website projects delivered</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#028090]/06 to-transparent pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[2rem] md:text-[3.25rem] leading-[1.05] text-white mb-5">
              Tell me what&rsquo;s slowing you down.
            </h2>
            <p className="text-[1rem] leading-[1.7] text-white/75 mb-10 max-w-[480px] mx-auto">
              I&rsquo;ll come back with a specific read on whether the AIOS is
              the right fit. If it&rsquo;s not, I&rsquo;ll say so.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block bg-white text-[#0A0F14] text-[0.9375rem] font-bold px-10 py-4 rounded-full transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)]"
            >
              Start the conversation
            </Link>
            <p className="mt-5 text-[0.8125rem] text-white/25">
              Shannon reads every submission personally. 48-hour response.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SOFT SECONDARY ───────────────────────────────────────────────────── */}
      <section className="relative py-6" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <p className="text-[0.875rem] text-white/25">
            Want to watch how this gets built?{" "}
            <a
              href="https://www.linkedin.com/in/swinnicki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
            >
              I document it on LinkedIn.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
