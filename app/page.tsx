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
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
        <span className="ml-3 text-[0.7rem] text-white/25 font-mono tracking-wide">
          revaya-aios · live
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
          <span className="text-[0.7rem] text-[#028090] font-mono">system active</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4 md:gap-6">
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

        <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
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
    { q: "What breaks when you're away?", a: "Everything. Team routes all decisions to me." },
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
          context · discovery interview
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
        <div className="flex items-center gap-2 ml-1">
          <span className="text-[0.75rem] text-[#028090] font-mono animate-pulse">
            ▋
          </span>
        </div>
      </div>
    </div>
  );
}

// ── ConnectPanel ──────────────────────────────────────────────────────────────
function ConnectPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [indexed, setIndexed] = useState(0);

  const sources = [
    { name: "client-onboarding-sop.pdf", type: "SOP" },
    { name: "service-delivery-playbook.docx", type: "Playbook" },
    { name: "proposal-template-v3.docx", type: "Template" },
    { name: "brand-voice-guidelines.md", type: "Brand" },
    { name: "pricing-and-scope-matrix.xlsx", type: "Pricing" },
  ];

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setIndexed((c) => (c < sources.length ? c + 1 : c));
    }, 800);
    return () => clearInterval(timer);
  }, [inView, sources.length]);

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
            knowledge · indexing sources
          </span>
        </div>
        <span className="text-[0.7rem] font-mono text-[#028090]">
          {indexed}/{sources.length} indexed
        </span>
      </div>
      <div className="p-5 space-y-2">
        {sources.map((source, i) => {
          const done = i < indexed;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: done ? 1 : 0.35, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.04]"
            >
              <motion.div
                animate={{
                  backgroundColor: done
                    ? "rgba(2,128,144,0.15)"
                    : "rgba(255,255,255,0.04)",
                  borderColor: done
                    ? "rgba(2,128,144,0.3)"
                    : "rgba(255,255,255,0.06)",
                }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 rounded border flex items-center justify-center shrink-0"
              >
                <motion.span
                  animate={{ color: done ? "#028090" : "rgba(255,255,255,0.3)" }}
                  className="text-[0.7rem] font-mono font-bold"
                >
                  {done ? "✓" : source.type.slice(0, 2).toUpperCase()}
                </motion.span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.8rem] text-white/75 font-mono truncate">
                  {source.name}
                </p>
                <p className="text-[0.65rem] text-white/30 font-mono">
                  {source.type}
                </p>
              </div>
              {done && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[0.65rem] text-[#028090] font-mono shrink-0"
                >
                  indexed
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── IntegrationsPanel ─────────────────────────────────────────────────────────
function IntegrationsPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [visibleCount, setVisibleCount] = useState(0);

  const tools = [
    { name: "HubSpot",          slug: "hubspot",          bg: "rgba(255,122,89,0.12)"  },
    { name: "Salesforce",       slug: "salesforce",       bg: "rgba(0,161,224,0.12)"   },
    { name: "Shopify",          slug: "shopify",          bg: "rgba(150,191,72,0.12)"  },
    { name: "Slack",            slug: "slack",            bg: "rgba(236,178,46,0.12)"  },
    { name: "Gmail",            slug: "gmail",            bg: "rgba(234,67,53,0.12)"   },
    { name: "Notion",           slug: "notion",           bg: "rgba(255,255,255,0.06)" },
    { name: "Airtable",         slug: "airtable",         bg: "rgba(24,191,255,0.12)"  },
    { name: "LinkedIn",         slug: "linkedin",         bg: "rgba(10,102,194,0.12)"  },
    { name: "Google Ads",       slug: "googleads",        bg: "rgba(66,133,244,0.12)"  },
    { name: "QuickBooks",       slug: "quickbooks",       bg: "rgba(44,160,28,0.12)"   },
    { name: "Meta",             slug: "meta",             bg: "rgba(0,128,251,0.12)"   },
    { name: "Google Analytics", slug: "googleanalytics",  bg: "rgba(232,113,10,0.12)"  },
  ];

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setVisibleCount((c) => (c < tools.length ? c + 1 : c));
    }, 120);
    return () => clearInterval(timer);
  }, [inView, tools.length]);

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
            intelligence · connected stack
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
          <span className="text-[0.7rem] text-[#028090] font-mono">
            {visibleCount} connected
          </span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-4 gap-3">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              i < visibleCount
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.05] hover:border-white/[0.1] transition-colors"
            style={{
              backgroundColor: i < visibleCount ? tool.bg : "transparent",
            }}
          >
            <div className="w-9 h-9 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/${tool.slug}.svg`}
                alt={tool.name}
                width={28}
                height={28}
              />
            </div>
            <span className="text-[0.6rem] text-white/40 text-center leading-tight">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── SleepLogPanel (Option A) ──────────────────────────────────────────────────
function SleepLogPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [visibleCount, setVisibleCount] = useState(0);

  const entries = [
    { time: "11:47 PM", action: "Client intake form processed", agent: "Intake" },
    { time: "12:03 AM", action: "Lead follow-up sequence triggered", agent: "Comms" },
    { time: "2:14 AM",  action: "Weekly status report sent to clients", agent: "Report" },
    { time: "4:30 AM",  action: "CRM synced with Airtable", agent: "Data" },
    { time: "6:00 AM",  action: "Daily brief compiled and delivered", agent: "Intel" },
    { time: "7:02 AM",  action: "Team standup prep completed", agent: "Ops" },
  ];

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setVisibleCount((c) => (c < entries.length ? c + 1 : c));
    }, 650);
    return () => clearInterval(timer);
  }, [inView, entries.length]);

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
            aios · overnight log
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-[0.7rem] text-white/30 font-mono">owner: offline</span>
        </div>
      </div>
      <div className="p-5 space-y-2">
        <AnimatePresence>
          {entries.map((entry, i) =>
            i < visibleCount ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 px-3 py-2.5 rounded-lg border border-white/[0.04]"
              >
                <span className="text-[0.7rem] text-white/30 font-mono w-[4.5rem] shrink-0">
                  {entry.time}
                </span>
                <span className="text-[0.8rem] text-white/75 font-mono flex-1">
                  {entry.action}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                  className="w-4 h-4 rounded-full bg-[#028090]/15 border border-[#028090]/40 flex items-center justify-center shrink-0"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d="M1.5 4l1.5 1.5L6.5 2.5"
                      stroke="#028090"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {visibleCount >= entries.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 px-3 py-2.5 rounded-lg border border-[#028090]/20 bg-[#028090]/5 mt-1"
          >
            <span className="text-[0.7rem] text-[#028090] font-mono w-[4.5rem] shrink-0">
              NOW
            </span>
            <span className="text-[0.8rem] text-white/75 font-mono flex-1">
              System running · 47 tasks overnight
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse shrink-0" />
          </motion.div>
        )}
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
    "Draft next week's content from the content calendar",
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
            automate · task queue
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

// ── TelegramPanel ─────────────────────────────────────────────────────────────
function TelegramPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const delays = [400, 1200, 2100, 2900, 3700];
    const timers = delays.map((d, i) =>
      setTimeout(() => setStep(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]"
    >
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-8 h-8 rounded-full bg-[#028090]/15 border border-[#028090]/25 flex items-center justify-center text-[0.55rem] font-bold text-[#028090]">
          AI
        </div>
        <div>
          <div className="text-[0.8rem] text-white/75 font-medium">
            Revaya AIOS
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-[#028090]" />
            <span className="text-[0.65rem] text-[#028090]">online</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 min-h-[260px]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-tr-sm bg-[#028090]/20 border border-[#028090]/20">
                <p className="text-[0.8rem] text-white">
                  Any new leads come in overnight?
                </p>
              </div>
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div
              key="a1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[85%]"
            >
              <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/[0.07]">
                <p className="text-[0.8rem] text-white">
                  3 form submissions. One looks qualified. Service business,
                  $400K revenue, asking about full AIOS.
                </p>
              </div>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div
              key="a2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[85%]"
            >
              <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/[0.07]">
                <p className="text-[0.8rem] text-white">
                  I drafted a response. Want to review before I send?
                </p>
              </div>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-tr-sm bg-[#028090]/20 border border-[#028090]/20">
                <p className="text-[0.8rem] text-white">Send it.</p>
              </div>
            </motion.div>
          )}
          {step >= 5 && (
            <motion.div
              key="a3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[85%]"
            >
              <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/[0.07]">
                <p className="text-[0.8rem] text-white">
                  Sent. I&apos;ll follow up automatically in 48 hours if no
                  response.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-0 md:pt-44" style={{ zIndex: 1 }}>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">

          {/* Eyebrow */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8 mt-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
              <span className="text-[0.875rem] uppercase tracking-[0.12em] text-white/80 font-medium">
                Your AI Transformation Partner
              </span>
            </div>
          </FadeIn>

          {/* H1 */}
          <FadeIn delay={0.1}>
            <h1 className="font-display font-black text-[2.375rem] md:text-[3.875rem] lg:text-[4.875rem] leading-[1.0] text-white mb-6 tracking-tight">
              Stop Being the Business.
              <br />
              Start Owning One.
            </h1>
          </FadeIn>

          {/* Subhead */}
          <FadeIn delay={0.2}>
            <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.6] text-white mb-5 max-w-[620px] mx-auto">
              You didn&rsquo;t build a business. You built something that quietly owns you.
            </p>
          </FadeIn>

          {/* Body */}
          <FadeIn delay={0.25}>
            <p className="text-[1.0625rem] leading-[1.75] text-white mb-10 max-w-[718px] mx-auto">
              Every task, every decision, every answer still routes through you. That&rsquo;s not a business you own. That&rsquo;s a job with overhead. I build the system that changes that.
            </p>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.35}>
            <div className="flex flex-col items-center gap-3 mb-16">
              <Link
                href="/business-ai-os-assessment"
                className="inline-block bg-[#553555] text-white text-[1rem] font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)]"
              >
                Book an Audit &rarr;
              </Link>
            </div>
          </FadeIn>

          {/* Hero demo panel */}
          <FadeIn delay={0.5}>
            <div className="rounded-t-2xl border border-white/[0.07] border-b-0 overflow-hidden">
              <HeroPanel />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <div style={{ zIndex: 1, position: "relative", paddingTop: "50px" }}>
        <div
          className="flex gap-10 whitespace-nowrap py-4"
          style={{ animation: "marquee 30s linear infinite", width: "max-content" }}
        >
          {[...Array(3)].flatMap((_, ri) =>
            [
              "Everything routes through me",
              "Can't take a week off",
              "Team texts me at 9pm",
              "Business stops when I stop",
              "Wearing all the hats",
              "No time to think",
              "Just need a system",
              "10+ hours back",
            ].map((item, i) => (
              <span
                key={`${ri}-${i}`}
                className="flex items-center gap-8 text-[0.875rem] uppercase tracking-[0.14em] text-white/70 font-medium"
              >
                {item}{" "}
                <span className="text-[#028090]/40">&middot;</span>
              </span>
            ))
          )}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
      </div>

      {/* ── ROW 1: Five Layers — text LEFT, HeroPanel RIGHT ──────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <span className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  The Problem &rarr; What&rsquo;s Possible
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  A version of your business
                  <br />
                  that runs without you in the loop.
                </h2>
                <p className="text-[1.0625rem] leading-[1.7] text-white mb-4">
                  Right now the business stops when you stop. Not because your team can&rsquo;t execute, but because the systems aren&rsquo;t there. Everything routes through you by default, not by design.
                </p>
                <p className="text-[1.0625rem] leading-[1.7] text-white mb-6">
                  There&rsquo;s a different version. One where the recurring work runs on its own, your team has what they need without asking, and you step into the role of owner instead of operator. That&rsquo;s the transformation. The path to it starts with understanding exactly where you are now.
                </p>
                <Link
                  href="/business-ai-operating-system"
                  className="inline-flex items-center gap-2 text-[1rem] text-[#028090] hover:text-white transition-colors"
                >
                  See what&rsquo;s possible &rarr;
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left">
              <SleepLogPanel />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ROW 2: Context — ContextPanel LEFT, text RIGHT ───────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="order-last md:order-first">
              <ContextPanel />
            </FadeIn>
            <FadeIn delay={0.15} direction="left" className="order-first md:order-last">
              <div>
                <span className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  Step 1 — The Audit
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  We find what&rsquo;s actually broken.
                  <br />
                  It&rsquo;s often not what you think.
                </h2>
                <p className="text-[1.0625rem] leading-[1.7] text-white mb-4">
                  The Audit is a structured diagnostic of how your business actually operates. Where time goes. Where decisions bottleneck. What&rsquo;s repeatable but still lands on you. We go area by area, and most founders are surprised by what surfaces.
                </p>
                <p className="text-[1.0625rem] leading-[1.7] text-white">
                  You walk away with a gap map, a prioritized automation roadmap, and a clear recommendation built on your current reality. Not a generic playbook. A specific path forward for your business, based on what we found.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* ── THE RECOMMENDATION ───────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <span className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  Step 2 — The Recommendation
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  A specific path.
                  <br />
                  Not a generic plan.
                </h2>
                <p className="text-[1.0625rem] leading-[1.7] text-white mb-4">
                  The Audit produces a deliverable. A gap map of where time is lost. A prioritized roadmap of what to fix first. A concrete ROI projection built from your actual numbers. And a clear recommendation for which path makes sense for your business.
                </p>
                <p className="text-[1.0625rem] leading-[1.7] text-white">
                  Some founders need a Business AI OS for themselves first. Some need a governed AI environment for their whole team. Some need both, in sequence. We figure that out from the evidence. You decide whether to proceed. If the numbers don&rsquo;t show clear payback within 3 to 6 months, we won&rsquo;t recommend moving forward.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left">
              <div className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
                    <span className="ml-2 text-[0.7rem] text-white/25 font-mono">audit · recommendation</span>
                  </div>
                  <span className="text-[0.7rem] text-[#028090] font-mono">ready</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: "Gap Map", value: "14 workflows identified. 9 automatable." },
                    { label: "Quick Wins", value: "4 tasks removed in weeks 1–4." },
                    { label: "ROI Projection", value: "11 hrs/week back. Payback in 6 weeks." },
                    { label: "Recommended Path", value: "Business AI OS — founder first." },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1 px-4 py-3 rounded-lg border border-white/[0.05] bg-white/[0.02]">
                      <span className="text-[0.7rem] text-[#028090] font-mono uppercase tracking-wide">{item.label}</span>
                      <span className="text-[0.8125rem] text-white/80 font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── THE BUILD ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="order-last md:order-first">
              <div className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
                    <span className="ml-2 text-[0.7rem] text-white/25 font-mono">aios · build progress</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
                    <span className="text-[0.7rem] text-[#028090] font-mono">in progress</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { layer: "Context", detail: "Business knowledge base built", done: true },
                    { layer: "Data", detail: "CRM + ops tools connected", done: true },
                    { layer: "Intelligence", detail: "Agents configured to your workflows", done: true },
                    { layer: "Automate", detail: "9 recurring tasks removed", done: true },
                    { layer: "Build", detail: "Custom dashboard in progress", done: false },
                  ].map((item) => (
                    <div key={item.layer} className={`flex items-center gap-4 px-4 py-3 rounded-lg border ${item.done ? "border-[#028090]/20 bg-[#028090]/[0.05]" : "border-white/[0.05] bg-white/[0.02]"}`}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${item.done ? "bg-[#028090] border-[#028090]" : "border-white/20"}`}>
                        {item.done && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-[0.8125rem] text-white/80 font-mono">{item.layer}</span>
                        <span className="text-[0.75rem] text-white/40 font-mono ml-3">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left" className="order-first md:order-last">
              <div>
                <span className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  Step 3 — The Build
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  We build the system.
                  <br />
                  You own it completely.
                </h2>
                <p className="text-[1.0625rem] leading-[1.7] text-white mb-4">
                  We take the roadmap and build it. Not ChatGPT prompts stitched together. A real operating system configured to how your business actually works. Five layers: your business context, your data connected, specialized agents for your specific workflows, recurring tasks automated, and custom tools built on top.
                </p>
                <p className="text-[1.0625rem] leading-[1.7] text-white">
                  Full transparency throughout. No black boxes. You see every decision, every automation, every agent. When we hand it off, you understand what&rsquo;s running and why. It runs your business. You stay in control.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-10 md:p-14 text-center max-w-[800px] mx-auto">
              <p className="font-display font-black text-[1.5rem] md:text-[2rem] text-white leading-[1.2] mb-6">
                &ldquo;I spent 18 years as a digital product manager for Fortune 500. I wasn&rsquo;t an outside consultant looking in. I was on the inside, sitting between the business and the builders.&rdquo;
              </p>
              <p className="text-[1.0625rem] leading-[1.7] text-white mb-4">
                Virgin Mobile. Papa Murphy&rsquo;s. Intermedia. My job was to take what a company needed and turn it into a working digital product. AI transformation and agentic operating systems are the same work. Different digital product.
              </p>
              <p className="text-[1.0625rem] leading-[1.7] text-white mb-4">
                I spent the last year going deep on AI. Python certified, technically trained, and part of a network of 800+ AI developers and engineers. When your build needs a specialist I don&rsquo;t have to go looking. The team is already there.
              </p>
              <p className="text-[1.0625rem] text-white">
                You&rsquo;re hiring a strategist with 18 years of operational experience and a build team behind her that most solo consultants can&rsquo;t touch. And before I build for clients, I build for myself. The AIOS running Revaya today is the same system I deliver to you.
              </p>
              <div className="mt-8 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6 text-[0.8125rem] text-white/30">
                <span>18+ years product leadership</span>
                <span className="hidden sm:block text-white/10">&middot;</span>
                <span>Shannon Winnicki — Revaya AI</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ROI CALLOUT ──────────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="rounded-2xl border border-[#028090]/20 bg-[#028090]/[0.06] p-8 md:p-12 text-center max-w-[740px] mx-auto">
              <p className="text-[1.125rem] md:text-[1.375rem] leading-[1.6] text-white font-medium">
                If you&rsquo;re spending 15 hours a week on operations a system could handle, and your effective rate is $150 an hour, that&rsquo;s <span className="text-[#028090] font-bold">$117,000 a year</span>. Every month you wait is another <span className="text-[#028090] font-bold">$9,750</span> gone.
              </p>
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
              You take a week off.
              <br />
              Your business keeps going.
            </h2>
            <p className="text-[1.0625rem] leading-[1.7] text-white mb-10 max-w-[500px] mx-auto">
              Your bottleneck is a solvable problem. Most owners I talk to already
              know what it is. The AIOS is built to remove it permanently, not
              manage it.
            </p>
            <Link
              href="/business-ai-os-assessment"
              className="inline-block bg-[#553555] text-white text-[1rem] font-bold px-10 py-4 rounded-full transition-all duration-200 hover:bg-[#4a2d4a] hover:shadow-[0_0_50px_rgba(85,53,85,0.5)]"
            >
              Book an Audit &rarr;
            </Link>
            <p className="mt-4 text-[0.8125rem] text-white/40">
              Or if you already know,{" "}
              <Link href="/work-with-me" className="text-white/50 underline underline-offset-2 hover:text-white/70 transition-colors">
                start the conversation &rarr;
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

    </>
  );
}
