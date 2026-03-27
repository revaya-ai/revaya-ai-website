"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";

// ─── Data ───────────────────────────────────────────────────────────────────

const layers = [
  {
    num: "01",
    name: "Context",
    problem: "Your business knowledge isn't nowhere. It's everywhere. A Notion doc from 2023. A ChatGPT thread you can't find. A decision you explained in a Slack message that's now buried. A process that lives in your head because that's faster than documenting it.",
    what: "A structured knowledge layer that pulls it together, decisions, processes, standards, context, and puts it somewhere your AI can actually use it.",
    produces: "A business that doesn't require you to re-explain itself every time you start a new tool, hire someone, or hand something off.",
  },
  {
    num: "02",
    name: "Data",
    problem: "You know roughly what's happening in your business. Not exactly. You check three tools, do mental math, and make a call. That's not strategy. That's guessing with extra steps.",
    what: "Your data sources connected and queryable. Revenue, pipeline, time, utilization, pulled on demand, not assembled manually.",
    produces: "Decisions you can explain. Numbers that match reality, not memory.",
  },
  {
    num: "03",
    name: "Intelligence",
    problem: "You probably have AI tools already. Maybe a ChatGPT project. A Claude workspace. A few prompts you've saved somewhere. They help. But they only know what you told them, in that tool, the day you set it up. They don't talk to each other. They don't know your real numbers. They don't know how you handled the last three situations like this one.",
    what: "Agents trained on your actual business, not a description of it. Connected to your context layer, your data layer, your real decisions. They know what you know.",
    produces: "AI that gives answers your business would actually give. Not generic responses dressed up with your company name.",
  },
  {
    num: "04",
    name: "Automate",
    problem: "You know which tasks don't need a human. You've thought it a hundred times while doing them. The follow-up email. The intake form. The weekly report nobody asked for but everyone needs. You do it anyway because stopping to set it up always felt like more work than just doing it.",
    what: "The repetitive, rules-based work handed off permanently. Not automated in the abstract. Actually gone from your plate.",
    produces: "The hour you used to spend on the thing you've always hated doing.",
  },
  {
    num: "05",
    name: "Build",
    problem: "Every new AI capability you want feels like starting over. New tool, new setup, new context to configure. Nothing connects to what you already have.",
    what: "An expandable foundation. Each new agent, workflow, or integration gets added to the system you've already built. It inherits the context, the data, the standards. You think it, you build it.",
    produces: "New capability without the setup tax. You add, you don't rebuild.",
  },
];

const included = [
  "Full five-layer build, scoped to your business",
  "Master Training Guide — how the system was built, how every layer works, how to use it daily",
  "Command Dashboard — your full system reference",
  "Session 1: How It Was Built. Architecture walkthrough, what lives where and why.",
  "Session 2: How to Use It Daily. Hands-on with your actual workflows.",
  "30 days of direct support",
  "Session 3: 30-Day Check-In. What's working, what to optimize, what's next.",
];

const timeline = [
  {
    month: "Month 1",
    label: "Teaching the system",
    body: "The OS is live but it's still learning your business. You're correcting it, refining how you interact with it, and building the daily habits that make it work. It feels like more work before it feels like less. That's normal. This is the investment month.",
  },
  {
    month: "Month 3",
    label: "The first real return",
    body: "The rough edges are gone. The agents know your patterns. You've stopped second-guessing the outputs and started trusting them. Most clients recover 8 to 12 hours a week by month three. The 30-day check-in has happened. You know what to build next.",
  },
  {
    month: "Month 6",
    label: "Running without you",
    body: "Operational decisions are being made without your input. New workflows are running on autopilot. If you're on a Growth retainer, the second layer of builds is underway. You're working on the business more than in it. That's the shift.",
  },
  {
    month: "Month 12",
    label: "The OS is how your business runs",
    body: "You can take a week off. The business doesn't pause. New hires onboard in hours, not weeks. The routine runs without you in it. Your away-from-desk autonomy is measurable, not theoretical. You're generating more without working more. The system isn't something you use anymore. It's how the business works.",
  },
];

const processSteps = [
  { num: "01", title: "Audit", body: "Map your business." },
  { num: "02", title: "Scope", body: "Define exactly what gets built and at what cost." },
  { num: "03", title: "Build", body: "I architect the system. My team builds it. 800+ AI developers behind every engagement." },
  { num: "04", title: "Deliver", body: "The system is installed, tested, and running." },
  { num: "05", title: "Train + Support", body: "Three sessions, 30 days of direct support, then a check-in at day 30. Questions answered, adoption protected." },
];

// ─── FadeUp helper ──────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
  direction,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const xOffset = direction === "right" ? -18 : direction === "left" ? 18 : 0;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: direction ? 0 : 18, x: xOffset }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── TypedText ──────────────────────────────────────────────────────────────

function TypedText({ text, speed = 45 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="text-white/40 animate-pulse">|</span>
      )}
    </span>
  );
}

// ─── Panel: Pain Queue ──────────────────────────────────────────────────────

const painMessages = [
  { initials: "RC", sender: "Rachel · Bloom Creative", text: "Hey, quick question on the timeline for deliverables..." },
  { initials: "MK", sender: "Marcus · Studio K", text: "What does revision rounds look like for this project?" },
  { initials: "JT", sender: "Jamie · Thorn & Co", text: "Can you send over the contract again? Can't find it." },
  { initials: "PL", sender: "Priya L.", text: "Following up — did you get my last message?" },
  { initials: "RC", sender: "Rachel · Bloom Creative", text: "One more thing — what's included in the next phase?" },
];

function PainQueuePanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCount(i);
      if (i >= painMessages.length) {
        clearInterval(timer);
        setTimeout(() => setShowFooter(true), 600);
      }
    }, 750);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F45B69] animate-pulse" />
          <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
            inbox · unread
          </span>
        </div>
        <span className="text-[0.65rem] font-medium text-[#F45B69]">
          {count > 0 ? `${count} new` : ""}
        </span>
      </div>

      <div className="p-4 space-y-2 min-h-[260px]">
        <AnimatePresence>
          {painMessages.slice(0, count).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
            >
              <div className="w-7 h-7 rounded-full bg-[#553555]/50 flex items-center justify-center shrink-0">
                <span className="text-[0.6rem] font-bold text-white/70">{msg.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-[0.75rem] font-medium text-white/80">{msg.sender}</span>
                  <span className="text-[0.6rem] text-[#F45B69]/60 shrink-0">→ you</span>
                </div>
                <p className="text-[0.7rem] text-white/40 truncate">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-white/[0.08] px-5 py-3 flex items-center justify-between"
          >
            <span className="text-[0.65rem] text-white/30">Every decision routes through you.</span>
            <span className="text-[0.65rem] font-medium text-[#F45B69]/60">47 this week</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Panel: Context Layer ───────────────────────────────────────────────────

function ContextPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden h-full">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          context layer · active
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 min-h-[44px] flex items-center">
          {phase >= 1 ? (
            <span className="text-[0.8rem] text-white/70">
              <TypedText text="What's the pricing for enterprise clients?" speed={42} />
            </span>
          ) : (
            <span className="text-[0.8rem] text-white/20">Ask anything...</span>
          )}
        </div>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#028090]/[0.1] border border-[#028090]/20 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#028090]" />
                <span className="text-[0.6rem] font-medium text-[#028090] tracking-widest uppercase">
                  From your context layer
                </span>
              </div>
              <p className="text-[0.8rem] text-white/75 leading-[1.6]">
                The Audit is $2,500 (deductible from your Setup). Setup ranges from $10K to $30K depending on scope. Retainer starts post-setup.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Panel: Data Layer ──────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      v += step;
      if (v >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(v));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

function DataPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const revenue = useCountUp(24800, inView, 1400);
  const pipeline = useCountUp(87, inView, 1100);
  const overdue = useCountUp(3, inView, 700);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden h-full">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          data layer · live
        </span>
      </div>
      <div className="p-5 space-y-3">
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4"
        >
          <p className="text-[0.6rem] text-white/30 uppercase tracking-widest mb-1.5">Monthly Revenue</p>
          <p className="text-[1.625rem] font-display font-black text-white">
            ${revenue.toLocaleString()}
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4"
          >
            <p className="text-[0.6rem] text-white/30 uppercase tracking-widest mb-1.5">Pipeline</p>
            <p className="text-[1.25rem] font-display font-black text-[#028090]">{pipeline}%</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4"
          >
            <p className="text-[0.6rem] text-white/30 uppercase tracking-widest mb-1.5">Overdue</p>
            <p className="text-[1.25rem] font-display font-black text-[#F45B69]">{overdue}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Panel: Intelligence Layer ──────────────────────────────────────────────

function IntelligencePanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [showResponse, setShowResponse] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setShowResponse(true), 1400);
    const t2 = setTimeout(() => setShowFollowUp(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden h-full">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          intelligence layer · active
        </span>
      </div>
      <div className="p-5 space-y-3">
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <div className="bg-[#553555]/40 border border-[#553555]/30 rounded-lg px-4 py-3 max-w-[85%]">
            <p className="text-[0.8rem] text-white/80">What&apos;s the status on the Henderson account?</p>
          </div>
        </motion.div>
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-[#028090]/25 border border-[#028090]/40 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[0.55rem] font-bold text-[#028090]">AI</span>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-3">
                <p className="text-[0.8rem] text-white/70 leading-[1.6]">
                  Henderson Industries. Proposal sent March 12. Follow-up scheduled March 19. No response yet. Last touchpoint was a LinkedIn view on March 14.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showFollowUp && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="bg-[#553555]/40 border border-[#553555]/30 rounded-lg px-4 py-3 max-w-[85%]">
                <p className="text-[0.8rem] text-white/80">Can you draft a follow-up email for me to review?</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Panel: Automate Layer ──────────────────────────────────────────────────

const autoTasks = [
  "Weekly status emails sent to 8 clients",
  "Invoice reminders triggered",
  "Lead follow-up sequences started",
  "CRM records synced with Airtable",
];

function AutomatePanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setChecked(i);
      if (i >= autoTasks.length) clearInterval(timer);
    }, 750);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden h-full">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
          <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
            automate layer · running
          </span>
        </div>
        <span className="text-[0.65rem] font-medium text-[#028090]">{checked}/{autoTasks.length}</span>
      </div>
      <div className="p-5 space-y-1">
        {autoTasks.map((task, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-3 border-b border-white/[0.05] last:border-0"
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all duration-300 ${
              checked > i ? "bg-[#028090]" : "border border-white/[0.15]"
            }`}>
              {checked > i && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2.5 h-2.5"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              )}
            </div>
            <p className={`text-[0.8rem] transition-colors duration-300 ${
              checked > i ? "text-white/70" : "text-white/30"
            }`}>
              {task}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Panel: Build Layer ─────────────────────────────────────────────────────

const buildTools = ["CRM", "Email", "Slack", "Reports", "Calendar", "Workflows"];

function BuildPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 1500),
      setTimeout(() => setPhase(6), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden h-full">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          build layer · connected
        </span>
      </div>
      <div className="p-6 flex flex-col items-center gap-5">
        {/* Tool nodes */}
        <div className="flex flex-wrap items-center gap-2.5 w-full justify-center">
          {buildTools.map((tool, i) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase > i ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-[72px] h-9 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center">
                <span className="text-[0.65rem] font-medium text-white/55">{tool}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting line */}
        <div className="w-full h-px relative overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 6 ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-[#028090]/30 via-[#553555]/30 to-[#028090]/30 origin-left"
          />
        </div>

        {/* AIOS hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={phase >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-14 h-14 rounded-xl bg-[#028090]/[0.12] border border-[#028090]/30 flex items-center justify-center">
            <span className="text-[0.7rem] font-bold text-[#028090]">AIOS</span>
          </div>
          <span className="text-[0.6rem] text-white/25">central hub</span>
        </motion.div>

        {phase >= 6 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[0.65rem] text-white/25"
          >
            6 systems · 1 source of truth
          </motion.p>
        )}
      </div>
    </div>
  );
}

// ─── Panel: Orbit ────────────────────────────────────────────────────────────

const orbitAgents = [
  // ring 1 — r:115, 3 nodes
  { label: "Email", task: "5:30am ✓", color: "#028090", ring: 115, speed: 0.38, angle: 0 },
  { label: "IntelOS", task: "3 meetings", color: "#F45B69", ring: 115, speed: 0.38, angle: (Math.PI * 2) / 3 },
  { label: "Content", task: "queued", color: "#028090", ring: 115, speed: 0.38, angle: (Math.PI * 4) / 3 },
  // ring 2 — r:175, 4 nodes
  { label: "CRM", task: "updated", color: "#F45B69", ring: 175, speed: 0.22, angle: 0.4 },
  { label: "Proposals", task: "ready", color: "#028090", ring: 175, speed: 0.22, angle: 0.4 + Math.PI / 2 },
  { label: "Slack", task: "2 flags", color: "#F45B69", ring: 175, speed: 0.22, angle: 0.4 + Math.PI },
  { label: "Pipeline", task: "tracked", color: "rgba(228,253,225,0.8)", ring: 175, speed: 0.22, angle: 0.4 + (Math.PI * 3) / 2 },
  // ring 3 — r:260, 4 nodes
  { label: "Analytics", task: "weekly ✓", color: "#028090", ring: 260, speed: 0.13, angle: 0.9 },
  { label: "Intake", task: "submitted", color: "#F45B69", ring: 260, speed: 0.13, angle: 0.9 + Math.PI / 2 },
  { label: "Docs", task: "SOW sent", color: "#F45B69", ring: 260, speed: 0.13, angle: 0.9 + Math.PI },
  { label: "Revenue", task: "monthly ✓", color: "rgba(228,253,225,0.8)", ring: 260, speed: 0.13, angle: 0.9 + (Math.PI * 3) / 2 },
];

function OrbitPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true });
  const animRef = useRef<number>(0);
  const agentsRef = useRef(orbitAgents.map((a) => ({ ...a })));
  const tRef = useRef(0);
  const startedRef = useRef(false);
  const particlesRef = useRef<Array<{ agentIdx: number; progress: number; speed: number }>>([]);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // initialize spoke particles (2 per agent)
    const particles: Array<{ agentIdx: number; progress: number; speed: number }> = [];
    agentsRef.current.forEach((_, i) => {
      particles.push({ agentIdx: i, progress: Math.random(), speed: 0.002 + Math.random() * 0.002 });
      particles.push({ agentIdx: i, progress: Math.random() * 0.5, speed: 0.0015 + Math.random() * 0.002 });
    });
    particlesRef.current = particles;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = w * 1.15;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // visual ring radii (for drawing the ring strokes)
    const visualRingRadii = [130, 220, 310];
    const ringColors: [string, string, string] = [
      "rgba(244,91,105,",   // coral
      "rgba(85,53,85,",     // purple
      "rgba(2,128,144,",    // teal
    ];

    // node sizes by ring (diameter in px, halved for radius)
    const nodeSizeByRing: Record<number, number> = { 100: 19, 175: 23, 260: 27 };
    const fontSizeByRing: Record<number, number> = { 100: 7, 175: 8, 260: 9 };
    const haloSizeByRing: Record<number, number> = { 100: 28, 175: 34, 260: 40 };

    const parseColor = (c: string): [number, number, number] => {
      if (c.startsWith("rgba")) {
        const m = c.match(/[\d.]+/g);
        return m ? [+m[0], +m[1], +m[2]] : [228, 253, 225];
      }
      const hex = c.replace("#", "");
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const cx = W / 2, cy = H / 2;
      const t = tRef.current;
      const scale = W / 620;

      ctx.clearRect(0, 0, W, H);

      // background radial glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300 * scale);
      bgGlow.addColorStop(0, "rgba(85,53,85,0.06)");
      bgGlow.addColorStop(0.5, "rgba(2,128,144,0.03)");
      bgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W, H);

      // orbit rings — dual stroke: wide blurred glow + thin bright line
      visualRingRadii.forEach((baseR, ri) => {
        const r = baseR * scale;

        // wide glow stroke
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = ringColors[ri] + "0.12)";
        ctx.lineWidth = 6 * scale;
        ctx.stroke();

        // thin bright stroke
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = ringColors[ri] + "0.20)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // subtle inset glow
        ctx.beginPath();
        ctx.arc(cx, cy, r - 2 * scale, 0, Math.PI * 2);
        ctx.strokeStyle = ringColors[ri] + "0.04)";
        ctx.lineWidth = 3 * scale;
        ctx.stroke();
      });

      // advance agent angles
      agentsRef.current.forEach((a) => {
        a.angle += a.speed * 0.005;
      });

      // pass 1 — gradient spokes (behind everything)
      agentsRef.current.forEach((a) => {
        const r = a.ring * scale;
        const x = cx + Math.cos(a.angle) * r;
        const y = cy + Math.sin(a.angle) * r;
        const [cr, cg, cb] = parseColor(a.color);

        const spokeGrad = ctx.createLinearGradient(cx, cy, x, y);
        spokeGrad.addColorStop(0, `rgba(${cr},${cg},${cb},0.15)`);
        spokeGrad.addColorStop(1, `rgba(${cr},${cg},${cb},0.02)`);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = spokeGrad;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // spoke particles
      particlesRef.current.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const a = agentsRef.current[p.agentIdx];
        const r = a.ring * scale;
        const x = cx + Math.cos(a.angle) * r * p.progress;
        const y = cy + Math.sin(a.angle) * r * p.progress;
        const [cr, cg, cb] = parseColor(a.color);

        // fade in near center, fade out near node
        const alpha = p.progress < 0.1 ? p.progress / 0.1 : p.progress > 0.85 ? (1 - p.progress) / 0.15 : 1;

        ctx.beginPath();
        ctx.arc(x, y, 1 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${(alpha * 0.3).toFixed(3)})`;
        ctx.fill();
      });

      // center outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 20 * scale, cx, cy, 80 * scale);
      outerGlow.addColorStop(0, "rgba(85,53,85,0.22)");
      outerGlow.addColorStop(0.5, "rgba(85,53,85,0.06)");
      outerGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 80 * scale, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // center breathing pulse
      const breathe = Math.sin(t * 0.018) * 0.5 + 0.5;

      // pulse ring 1
      const pulseRadius = (36 + breathe * 8) * scale;
      const pulseAlpha = 0.15 + breathe * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(2,128,144,${pulseAlpha.toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // pulse ring 2 (offset phase)
      const breathe2 = Math.sin(t * 0.018 + Math.PI) * 0.5 + 0.5;
      const pulseRadius2 = (38 + breathe2 * 6) * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(85,53,85,${(0.08 + breathe2 * 0.1).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // center node — 58px diameter, breathing
      const centerScale = 1 + breathe * 0.06;
      const centerR = 29 * scale * centerScale;
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerR);
      centerGrad.addColorStop(0, "rgba(85,53,85,1)");
      centerGrad.addColorStop(0.7, "rgba(85,53,85,0.85)");
      centerGrad.addColorStop(1, "rgba(85,53,85,0.4)");

      // strong purple glow behind center
      const centerGlow = ctx.createRadialGradient(cx, cy, centerR * 0.5, cx, cy, centerR * 3);
      centerGlow.addColorStop(0, "rgba(85,53,85,0.25)");
      centerGlow.addColorStop(0.5, "rgba(85,53,85,0.08)");
      centerGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, centerR * 3, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
      ctx.fillStyle = centerGrad;
      ctx.fill();

      // center border
      ctx.beginPath();
      ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // "YOU" text
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = `800 ${11 * scale}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = `${3 * scale}px`;
      ctx.fillText("YOU", cx + 1.5 * scale, cy);
      ctx.letterSpacing = "0px";

      // pass 2 — agent nodes (labels inside larger glass orbs)
      agentsRef.current.forEach((a) => {
        const r = a.ring * scale;
        const x = cx + Math.cos(a.angle) * r;
        const y = cy + Math.sin(a.angle) * r;
        const [cr, cg, cb] = parseColor(a.color);

        const nodeR = (nodeSizeByRing[a.ring] || 23) * scale;
        const haloR = (haloSizeByRing[a.ring] || 34) * scale;
        const fontSize = (fontSizeByRing[a.ring] || 8) * scale;

        // 1. Outer glow halo
        const halo = ctx.createRadialGradient(x, y, 0, x, y, haloR);
        halo.addColorStop(0, `rgba(${cr},${cg},${cb},0.20)`);
        halo.addColorStop(0.4, `rgba(${cr},${cg},${cb},0.08)`);
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // 2. Glass body
        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(8,13,17,0.45)";
        ctx.fill();

        // 3. Colored border (1.8px, 0.6 opacity)
        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.4)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Secondary inner white border for glass edge
        ctx.beginPath();
        ctx.arc(x, y, nodeR - 1.5 * scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // 4. Top-left glass reflection
        const hlX = x - nodeR * 0.25;
        const hlY = y - nodeR * 0.3;
        const hlR = nodeR * 0.6;
        const highlight = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, hlR);
        highlight.addColorStop(0, "rgba(255,255,255,0.18)");
        highlight.addColorStop(0.5, "rgba(255,255,255,0.05)");
        highlight.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(hlX, hlY, hlR, 0, Math.PI * 2);
        ctx.fillStyle = highlight;
        ctx.fill();

        // 5. Inner glowing dot (upper portion of node)
        const dotR = (a.ring === 100 ? 2 : a.ring === 175 ? 2.5 : 3) * scale;
        const dotY = y - nodeR * 0.3;
        // dot glow
        ctx.beginPath();
        ctx.arc(x, dotY, dotR * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.15)`;
        ctx.fill();
        // dot core
        ctx.beginPath();
        ctx.arc(x, dotY, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.9)`;
        ctx.fill();

        // 6. Label text INSIDE the node (below the dot)
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.95)`;
        ctx.font = `700 ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.letterSpacing = "0.3px";
        ctx.fillText(a.label, x, y + nodeR * 0.2);
        ctx.letterSpacing = "0px";

        // 7. Live pulse dot (green, top-right of node)
        const pulseDotPhase = Math.sin(t * 0.03 + a.angle * 2) * 0.5 + 0.5;
        const pulseDotAlpha = 0.4 + pulseDotPhase * 0.6;
        const pulseDotSize = (1.5 + pulseDotPhase * 0.5) * scale;
        const pdx = x + nodeR * 0.65;
        const pdy = y - nodeR * 0.65;

        // pulse dot glow
        ctx.beginPath();
        ctx.arc(pdx, pdy, pulseDotSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${(pulseDotAlpha * 0.2).toFixed(3)})`;
        ctx.fill();
        // pulse dot core
        ctx.beginPath();
        ctx.arc(pdx, pdy, pulseDotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${pulseDotAlpha.toFixed(3)})`;
        ctx.fill();
      });

      tRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [inView]);

  return (
    <div ref={containerRef} className="w-full relative overflow-visible -mx-[50px]" style={{ aspectRatio: "1 / 1.15" }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

// ─── Panel: After the Build (Retainer) ─────────────────────────────────────

const retainerLog = [
  { time: "Today 9:14am", event: "Weekly reports sent to 8 clients" },
  { time: "Yesterday", event: "Lead follow-up sequence completed" },
  { time: "Mar 14", event: "New intake workflow deployed" },
];

function RetainerPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          system · ongoing
        </span>
      </div>
      <div className="px-5 py-[40px] space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-2"
        >
          {[
            { label: "Uptime", value: "99.9%", color: "text-[#028090]" },
            { label: "Automations", value: "14", color: "text-white" },
            { label: "Hours saved", value: "11/wk", color: "text-white" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center">
              <p className={`text-[1rem] font-display font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[0.6rem] text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0"
            >
              {retainerLog.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#028090] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.75rem] text-white/70">{entry.event}</p>
                    <p className="text-[0.6rem] text-white/25 mt-0.5">{entry.time}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#028090]/[0.08] border border-[#028090]/20 rounded-lg px-4 py-3 flex items-center justify-between"
            >
              <span className="text-[0.75rem] text-white/55">Next check-in</span>
              <span className="text-[0.75rem] font-medium text-[#028090]">Apr 14 · 30 days</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Panel: The Process ─────────────────────────────────────────────────────

function ProcessPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let i = -1;
    const timer = setInterval(() => {
      i++;
      setActive(i);
      if (i >= processSteps.length - 1) clearInterval(timer);
    }, 680);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          engagement · in progress
        </span>
      </div>
      <div className="p-5">
        {processSteps.map((step, i) => (
          <div key={step.num} className="flex gap-4 relative">
            {i < processSteps.length - 1 && (
              <div className="absolute left-[13px] top-[26px] bottom-0 w-px bg-white/[0.06]" />
            )}
            <div className="shrink-0 mt-0.5">
              <motion.div
                initial={{ scale: 0.7, opacity: 0.3 }}
                animate={active >= i ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
                className={`w-[26px] h-[26px] rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  active >= i
                    ? "bg-[#028090]/20 border-[#028090]/50"
                    : "border-white/[0.1] bg-transparent"
                }`}
              >
                {active >= i ? (
                  <svg className="w-3 h-3" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="text-[0.55rem] text-white/20">{step.num}</span>
                )}
              </motion.div>
            </div>
            <div className={`pb-5 ${i === processSteps.length - 1 ? "pb-0" : ""}`}>
              <motion.p
                animate={active >= i ? { color: "rgba(255,255,255,0.85)" } : { color: "rgba(255,255,255,0.2)" }}
                transition={{ duration: 0.3 }}
                className="text-[0.875rem] font-medium mb-0.5"
              >
                {step.title}
              </motion.p>
              <motion.p
                animate={active >= i ? { opacity: 1 } : { opacity: 0.2 }}
                transition={{ duration: 0.3 }}
                className="text-[0.75rem] text-white/55 leading-[1.55]"
              >
                {step.body}
              </motion.p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Panel: Process Gantt ────────────────────────────────────────────────────

const ganttPhases = [
  { title: "Audit",          fill: "15%",  ongoing: false },
  { title: "Scope",          fill: "28%",  ongoing: false },
  { title: "Build",          fill: "70%",  ongoing: false },
  { title: "Deliver",        fill: "15%",  ongoing: false },
  { title: "Train + Support", fill: "48%", ongoing: true  },
];

function ProcessGanttPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let i = -1;
    const timer = setInterval(() => {
      i++;
      setActive(i);
      if (i >= ganttPhases.length - 1) clearInterval(timer);
    }, 700);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          engagement · duration
        </span>
      </div>
      <div className="px-6 py-7 space-y-5">
        {ganttPhases.map((phase, i) => (
          <div key={phase.title}>
            <motion.p
              animate={active >= i ? { color: "rgba(255,255,255,0.6)" } : { color: "rgba(255,255,255,0.18)" }}
              transition={{ duration: 0.3 }}
              className="text-[0.65rem] font-medium uppercase tracking-[0.12em] mb-2"
            >
              {phase.title}
            </motion.p>
            <div className="h-[14px] bg-white/[0.04] rounded-sm overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={active >= i ? { width: phase.fill } : { width: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`h-full rounded-sm ${phase.ongoing ? "bg-[#028090]/40" : "bg-[#028090]/65"}`}
              />
              {phase.ongoing && active >= i && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="absolute top-0 bottom-0 flex items-center text-[0.55rem] tracking-[0.2em] text-[#028090]/50"
                  style={{ left: `calc(${phase.fill} + 6px)` }}
                >
                  · · ·
                </motion.span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timeline Panel: Month 1 — Refinement Loop ─────────────────────────────

const refinementRows = [
  { draft: "Proposal draft — attached for your review.", revised: "Proposal ready. Specs from the 3/12 call included." },
  { draft: "Weekly summary attached.", revised: "3 wins, 2 blockers, next actions listed." },
  { draft: "Onboarding doc updated.", revised: "New hire can start without a walkthrough." },
];

function RefinementPanel() {
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const delays = [350, 1200, 2000, 2800, 3600, 4300];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    const reset = setTimeout(() => setCycle((c) => c + 1), 6800);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          agent output · iteration
        </span>
      </div>
      <div className="px-5 py-5 space-y-2.5 min-h-[200px]">
        {step === 0 && (
          <div className="h-full flex items-center justify-center py-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
          </div>
        )}
        {refinementRows.map((row, i) => {
          const appeared = step >= i * 2 + 1;
          const revised = i === 2 ? step >= 5 : step >= i * 2 + 2;
          if (!appeared) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-3"
            >
              <p className="text-[0.78rem] text-white/65 leading-[1.55] mb-2">
                {revised ? row.revised : row.draft}
              </p>
              <AnimatePresence mode="wait">
                {!revised ? (
                  <motion.span
                    key="editing"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="inline-block text-[0.58rem] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400/65 border border-amber-500/20"
                  >
                    editing
                  </motion.span>
                ) : (
                  <motion.span
                    key="revised"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block text-[0.58rem] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded-full bg-[#028090]/10 text-[#028090]/80 border border-[#028090]/20"
                  >
                    {i === 2 ? "clean ✓" : "revised ✓"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Timeline Panel: Month 3 — Flywheel ─────────────────────────────────────

const flywheelTasks = ["proposals", "follow-ups", "onboarding", "reporting"];

function FlywheelPanel() {
  const [showTasks, setShowTasks] = useState(false);
  const [showStat, setShowStat] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTasks(true), 3000);
    const t2 = setTimeout(() => setShowStat(true), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          month 3 · momentum
        </span>
      </div>
      <div className="px-6 py-6 flex flex-col items-center gap-5">
        {/* Wheel */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          {/* Outer tick ring — spins up */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: [0, 12, 50, 150, 480, 900, 1440] }}
            transition={{ duration: 4.5, times: [0, 0.07, 0.17, 0.3, 0.55, 0.75, 1], ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 30}deg)` }}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${i % 3 === 0 ? "w-[2px] h-3 bg-[#028090]/55" : "w-px h-2 bg-white/15"}`} />
              </div>
            ))}
          </motion.div>
          {/* Static outer border */}
          <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
          {/* Inner ring — counter-rotates */}
          <motion.div
            className="absolute w-[68px] h-[68px] rounded-full border border-white/[0.08]"
            animate={{ rotate: [0, -12, -50, -150, -480, -900, -1440] }}
            transition={{ duration: 4.5, times: [0, 0.07, 0.17, 0.3, 0.55, 0.75, 1], ease: "linear", repeat: Infinity }}
          />
          {/* Center dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/65 z-10 relative" />
        </div>

        {/* Task labels */}
        <div className="space-y-2 w-full">
          {flywheelTasks.map((task, i) => (
            <motion.div
              key={task}
              initial={{ opacity: 0, x: -8 }}
              animate={showTasks ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.35 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-1 h-1 rounded-full bg-[#028090]/55 shrink-0" />
              <span className="text-[0.68rem] font-medium text-white/45 uppercase tracking-[0.12em]">{task}</span>
              <div className="flex-1 h-px bg-[#028090]/12" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={showTasks ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="text-[0.58rem] text-[#028090]/55 tracking-[0.1em]"
              >
                running
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={showStat ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[0.62rem] text-white/28 tracking-[0.12em] uppercase text-center"
        >
          8–12 hrs/week recovered
        </motion.p>
      </div>
    </div>
  );
}

// ─── Timeline Panel: Month 6 — Away Mode ────────────────────────────────────

const awayTasks = [
  { label: "New client intake", action: "Routed to intake form" },
  { label: "Follow-up: Marcus", action: "Sent automatically" },
  { label: "Proposal requested", action: "Drafted and queued" },
  { label: "Weekly report", action: "Generated and filed" },
];

function AwayPanel() {
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const delays = [300, 1100, 1800, 2600, 3300, 4100, 4800, 5600];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    const reset = setTimeout(() => setCycle((c) => c + 1), 8000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center text-[0.6rem] font-bold text-white/40">
            S
          </div>
          <span className="text-[0.75rem] font-medium text-white/55">Shannon</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-[0.6rem] text-white/30 tracking-[0.1em] uppercase">Away</span>
        </div>
      </div>
      <div className="px-5 py-4 space-y-2 min-h-[200px]">
        {step === 0 && (
          <div className="h-full flex items-center justify-center py-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
          </div>
        )}
        {awayTasks.map((task, i) => {
          const appeared = step >= i * 2 + 1;
          const resolved = step >= i * 2 + 2;
          if (!appeared) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
            >
              <span className="text-[0.75rem] text-white/50 shrink-0">{task.label}</span>
              <AnimatePresence mode="wait">
                {!resolved ? (
                  <motion.span
                    key="routing"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.65, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="text-[0.58rem] text-white/25 tracking-[0.1em] uppercase shrink-0"
                  >
                    routing
                  </motion.span>
                ) : (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className="text-[0.58rem] font-medium tracking-[0.08em] text-[#028090]/75 shrink-0"
                  >
                    {task.action} ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Timeline Panel: Month 12 — System Report ───────────────────────────────

const reportItems = [
  "34 tasks handled",
  "0 waiting on you",
  "2 clients onboarded",
  "1 proposal signed",
];

function SystemReportPanel() {
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const delays = [400, 1000, 1600, 2200, 2800, 3800];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    const reset = setTimeout(() => setCycle((c) => c + 1), 6800);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
        <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
          business os · report
        </span>
      </div>
      <div className="px-5 py-5 space-y-4 min-h-[200px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={step >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[0.875rem] text-white/60"
        >
          You were away 5 days.
        </motion.p>
        <div className="space-y-2.5">
          {reportItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={step >= i + 2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.32 }}
              className="flex items-center gap-2.5"
            >
              <span className="text-[#028090]/65 text-[0.75rem] shrink-0">✓</span>
              <span className="text-[0.8rem] text-white/65">{item}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={step >= 6 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="pt-3 border-t border-white/[0.06] flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#028090]" />
          <span className="text-[0.62rem] text-white/30 tracking-[0.1em] uppercase">System status: All clear</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Timeline Tabs ──────────────────────────────────────────────────────────

const timelinePanels: Array<() => React.JSX.Element> = [
  RefinementPanel,
  FlywheelPanel,
  AwayPanel,
  SystemReportPanel,
];

function TimelineTabs() {
  const [active, setActive] = useState(0);
  const Panel = timelinePanels[active];

  return (
    <div className="w-full">
      {/* Tab row */}
      <div className="flex overflow-x-auto border-b border-white/[0.08]">
        {timeline.map((item, i) => (
          <button
            key={item.month}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-7 py-4 shrink-0 border-b-2 transition-all duration-200 ${
              active === i
                ? "border-[#028090] text-white"
                : "border-transparent text-white/40 hover:text/65"
            }`}
          >
            <span className={`text-[0.875rem] font-medium uppercase tracking-[0.14em] ${active === i ? "text-[#028090]" : "text-white/25"}`}>
              {item.month}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="pt-10 grid md:grid-cols-2 gap-10 items-start"
        >
          {/* Text */}
          <div>
            <p className="font-display font-black text-[1.5rem] leading-[1.2] text-white mb-5">
              {timeline[active].label}
            </p>
            <p className="text-[1.0625rem] text-white leading-[1.7]">
              {timeline[active].body}
            </p>
          </div>
          {/* Panel */}
          <Panel />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Layers Tab Panel ───────────────────────────────────────────────────────

type PanelComponent = () => React.JSX.Element;
const layerPanels: PanelComponent[] = [ContextPanel, DataPanel, IntelligencePanel, AutomatePanel, BuildPanel];

function LayersTabs() {
  const [active, setActive] = useState(0);
  const Panel = layerPanels[active];

  return (
    <div className="w-full">
      {/* Tab row */}
      <div className="flex overflow-x-auto border-b border-white/[0.08]">
        {layers.map((layer, i) => (
          <button
            key={layer.num}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-4 shrink-0 border-b-2 transition-all duration-200 ${
              active === i
                ? "border-[#028090] text-white"
                : "border-transparent text-white/40 hover:text-white/65"
            }`}
          >
            <span className={`text-[0.875rem] font-medium tracking-widest ${active === i ? "text-[#028090]" : "text-white/25"}`}>
              {layer.num}
            </span>
            <span className="text-[0.875rem] font-display font-black">{layer.name}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="grid md:grid-cols-2 gap-10 pt-10"
        >
          {/* Text */}
          <div className="space-y-6">
            <div>
              <p className="text-[0.875rem] font-medium tracking-[0.14em] uppercase text-[#028090] mb-2">The problem</p>
              <p className="text-[1.0625rem] text-white leading-[1.7]">{layers[active].problem}</p>
            </div>
            <div>
              <p className="text-[0.875rem] font-medium tracking-[0.14em] uppercase text-[#028090] mb-2">What it is</p>
              <p className="text-[1.0625rem] text-white leading-[1.7]">{layers[active].what}</p>
            </div>
            <div className="bg-[#028090]/[0.08] border border-[#028090]/20 rounded-lg p-4">
              <p className="text-[0.875rem] font-medium tracking-[0.14em] uppercase text-[#028090]/65 mb-2">What it produces</p>
              <p className="text-[1rem] text-white font-medium leading-[1.7]">{layers[active].produces}</p>
            </div>
          </div>

          {/* Visual */}
          <Panel />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Panel: Who This Is For ─────────────────────────────────────────────────

const businessTypes = [
  "Agencies",
  "Consultancies / Solo Operators",
  "Professional practices",
  "Founder-led product brands",
  "DTC & retail operations",
];

function WhoPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCount(i);
      if (i >= businessTypes.length) {
        clearInterval(timer);
        setTimeout(() => setShowFooter(true), 400);
      }
    }, 520);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />
        </div>
        <span className="text-[0.7rem] font-mono text-white/25 tracking-wide">aios · candidate scan</span>
        <span className="text-[0.7rem] font-mono text-[#028090]">live</span>
      </div>
      <div className="p-5 space-y-6 min-h-[370px]">
        <AnimatePresence>
          {businessTypes.slice(0, count).map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#028090]" />
              <span className="text-[0.8125rem] font-mono text-white/70">{type}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="ml-auto text-[0.7rem] font-mono text-[#028090]"
              >
                matched
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between bg-white/[0.02]"
          >
            <span className="text-[0.7rem] font-mono text-white/25">1–15 people · $200K+ revenue</span>
            <span className="text-[0.7rem] font-mono text-[#028090]">5 of 5 matched</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── HeroLiveFeedPanel ──────────────────────────────────────────────────────

const feedEvents = [
  { time: "7:02 AM", event: "Morning brief delivered", detail: "Revenue, pipeline, 3 priorities", dot: "#028090" },
  { time: "7:45 AM", event: "Follow-up sent — Henderson Industries", detail: "Proposal sent March 12 · no response yet", dot: "#028090" },
  { time: "8:30 AM", event: "Intake form processed", detail: "2 new leads qualified and routed", dot: "#028090" },
  { time: "9:15 AM", event: "Weekly status emails sent", detail: "8 clients notified automatically", dot: "#028090" },
  { time: "11:00 AM", event: "Invoice reminder triggered", detail: "3 overdue · $12,400 outstanding", dot: "#F45B69" },
  { time: "2:30 PM", event: "CRM synced with Airtable", detail: "14 records updated", dot: "#028090" },
];

function HeroLiveFeedPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCount(i);
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
      if (i >= feedEvents.length) clearInterval(timer);
    }, 700);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-xl overflow-hidden">
      <div className="border-b border-white/[0.08] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={pulse ? { scale: [1, 1.6, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="w-1.5 h-1.5 rounded-full bg-[#028090]"
          />
          <span className="text-[0.65rem] font-medium text-white/40 tracking-[0.12em] uppercase">
            aios · live activity
          </span>
        </div>
        <span className="text-[0.6rem] font-mono text-white/20">today</span>
      </div>

      <div className="divide-y divide-white/[0.04]">
        <AnimatePresence>
          {feedEvents.slice(0, visibleCount).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-start gap-3 px-5 py-3.5"
            >
              <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.dot }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.8125rem] text-white leading-snug">{item.event}</p>
                <p className="text-[0.7rem] text-white/30 mt-0.5">{item.detail}</p>
              </div>
              <span className="text-[0.6rem] font-mono text-white/20 shrink-0 pt-0.5">{item.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {visibleCount < feedEvents.length && (
          <div className="px-5 py-4 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white/20 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
      </div>

      {visibleCount >= feedEvents.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/[0.08] px-5 py-3 flex items-center justify-between bg-white/[0.02]"
        >
          <span className="text-[0.7rem] font-mono text-white/25">6 tasks completed · 0 requiring you</span>
          <span className="text-[0.7rem] font-mono text-[#028090]">system running</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function BusinessAIOSPage() {
  return (
    <div className="text-white min-h-screen overflow-x-hidden">

      {/* Ambient orbs — 4-orb teal pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[#028090]/20 blur-[160px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
        <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#028090]/12 blur-[120px]" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* HERO */}
        <section className="pt-36 pb-24 md:pb-32">
          <div className="max-w-[1280px] mx-auto px-6 md:px-0">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6 mt-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
                  <span className="text-[0.875rem] uppercase tracking-[0.12em] text-white/80 font-medium">
                    Does This Sound Familiar?
                  </span>
                </div>
                <h1 className="font-display text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] text-white mb-8">
                  Your business breaks every time you step away.
                  <br />
                  <span className="text-[#F45B69]">
                    That&apos;s a systems problem.
                  </span>
                </h1>
                <p className="text-[1.0625rem] leading-[1.7] text-white">
                  I find the specific thing that&apos;s costing you the most time right now. Then I build the system that removes it permanently. Not a tool. Not a stack. A system your business actually runs on. Fully auditable. Every decision visible.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <HeroLiveFeedPanel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* BEFORE STATE — panel L, text R */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1280px] mx-auto px-6 md:px-0">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-20 items-center">
              <FadeUp delay={0.15} direction="right">
                <PainQueuePanel />
              </FadeUp>
              <FadeUp direction="left">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  Business AI Operating System
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-7">
                  You answer the same questions 20 times a month.
                </h2>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-4">
                  New hires take 40 hours to onboard. Your business knowledge lives in your head, and when you&apos;re unavailable, nothing moves.
                </p>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-4">
                  Or you&apos;re running it alone. You left a job to have freedom. You have less of it now than when you had a boss. There&apos;s no one to hand off to. The business doesn&apos;t run when you&apos;re not in it. It waits.
                </p>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-4">
                  You make decisions from memory because clean data takes a week to pull.
                </p>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-8">
                  Your business stops when you stop.
                </p>
                <p className="text-[1rem] text-white font-medium leading-[1.7]">
                  That&apos;s not a people problem. It&apos;s an architecture problem.
                </p>
                <p className="text-[1.0625rem] text-white leading-[1.7] mt-8 border-l-2 border-[#028090]/40 pl-6">
                  I spent 18 years inside companies like Virgin Mobile, Papa Murphy&apos;s, and Intermedia. I know what the right systems look like. I know what it costs to build them. And I built this one for my own business first.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* COST OF INACTION — text L, math visual R */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp direction="right">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  The Math
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  What This Costs You Every Month You Don&apos;t Fix It
                </h2>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-4">
                  If you&apos;re spending 15 hours a week on tasks a system could handle, and your time is worth $150 an hour, that&apos;s $117,000 a year. Every month this continues is another $9,750 you don&apos;t get back.
                </p>
                <p className="text-[1.0625rem] text-white font-medium leading-[1.7]">
                  The AIOS Setup pays for itself in 2 to 3 months.
                </p>
              </FadeUp>
              <FadeUp delay={0.15} direction="left">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10">
                  <p className="text-[0.75rem] uppercase tracking-[0.14em] text-[#F45B69]/60 font-medium mb-6">Cost Breakdown</p>
                  <div className="space-y-5">
                    <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4">
                      <span className="text-[0.9375rem] text-white/70">Hours lost per week</span>
                      <span className="font-display font-black text-[1.5rem] text-white">15</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4">
                      <span className="text-[0.9375rem] text-white/70">Your effective rate</span>
                      <span className="font-display font-black text-[1.5rem] text-white">$150<span className="text-[0.875rem] text-white/40">/hr</span></span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4">
                      <span className="text-[0.9375rem] text-white/70">Monthly cost of inaction</span>
                      <span className="font-display font-black text-[1.5rem] text-[#F45B69]">$9,750</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-[0.9375rem] text-white/70">Annual cost of inaction</span>
                      <span className="font-display font-black text-[2rem] text-[#F45B69]">$117,000</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[#028090]/20 bg-[#028090]/[0.04] rounded-xl p-4 -mx-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[0.875rem] text-[#028090] font-medium">AIOS ROI timeline</span>
                      <span className="font-display font-black text-[1.25rem] text-[#028090]">2-3 months</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR — panel L, text R */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp delay={0.15} direction="right">
                <WhoPanel />
              </FadeUp>
              <FadeUp direction="left">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  Who This Is For
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  Built for founders where everything waits on you.
                </h2>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-4">
                  Founder-led businesses with 1 to 15 people where the work requires expertise, judgment, or relationships, and the founder is the one everything waits on.
                </p>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-8">
                  Service businesses, agencies, consultancies, professional practices, and founder-led product brands with DTC or retail operations.
                </p>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-8">
                  Not for anyone looking for a quick fix. The system takes time to build and discipline to adopt.
                </p>
                <p className="text-[1rem] text-white font-medium leading-[1.7]">
                  If that&apos;s you, start with the Audit. It will tell us both if you&apos;re ready.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* FIVE LAYERS */}
        <section className="pt-24 md:pt-32 pb-10">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp className="mb-12">
              <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                The System
              </p>
              <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white">
                Five layers. One operating system.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <LayersTabs />
            </FadeUp>
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="pt-10 pb-24 md:pb-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp>
              <div className="max-w-[760px]">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  What&apos;s Included
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-10">
                  Every AIOS Setup includes:
                </h2>
                <ul className="space-y-4">
                  {included.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-[#028090] mt-[3px] shrink-0">→</span>
                      <span className="text-[1.0625rem] text-white leading-[1.7]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start gap-6">
                  <Link
                    href="/business-ai-os-assessment"
                    className="inline-block font-display text-[1rem] font-bold px-8 py-3.5 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200 shrink-0"
                  >
                    Take the Assessment →
                  </Link>
                  <div className="flex flex-col justify-center sm:pt-3">
                    <p className="text-[0.875rem] text-white/50 leading-[1.6] mb-1">
                      Want the full methodology?
                    </p>
                    <a
                      href="/business-ai-os-blueprint.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[1rem] font-medium text-[#028090] hover:text-[#E4FDE1] transition-colors duration-200"
                    >
                      Download the Blueprint →
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* AFTER THE BUILD — orbit L, text R */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1140px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp delay={0.15} direction="right" className="order-last md:order-first">
                <OrbitPanel />
              </FadeUp>
              <FadeUp direction="left" className="order-first md:order-last">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  After the Build
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-4">
                  The system is live.
                </h2>
                <p className="text-[1.0625rem] text-white leading-[1.7] mb-14">
                  Now it grows with your business.
                </p>
                <div className="border-t border-white/[0.08] pt-10 pb-10">
                  <div className="border-l-2 border-white/[0.1] pl-6">
                    <h3 className="font-display text-[1.125rem] font-black text-white uppercase tracking-wide mb-3">
                      Maintenance
                    </h3>
                    <p className="text-[1.0625rem] text-white leading-[1.7]">
                      System monitoring and issue resolution. No active builds. For businesses that want the OS maintained before expanding further.
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/[0.08] pt-10 pb-10">
                  <div className="border-l-2 border-[#028090]/40 pl-6">
                    <h3 className="font-display text-[1.125rem] font-black text-white uppercase tracking-wide mb-3">
                      Growth
                    </h3>
                    <p className="text-[1.0625rem] text-white leading-[1.7]">
                      Active build credits every month. Pricing varies based on the number of workflow builds, plus monthly strategy sessions. For businesses ready to keep expanding the OS, layer by layer.
                    </p>
                  </div>
                </div>
                <p className="text-[1.0625rem] text-white leading-[1.7]">
                  The retainer conversation happens at your 30-day check-in, once you&apos;ve used the system and know what you want next.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* THE PROCESS */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp direction="right">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                  The Process
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-14">
                  How I work with you.
                </h2>
                <ol className="space-y-0">
                  {processSteps.map((step, i, arr) => (
                    <li key={step.num} className={`flex gap-8 ${i < arr.length - 1 ? "pb-7" : ""}`}>
                      <div className="flex flex-col items-center">
                        <span className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium leading-none mt-1">
                          {step.num}
                        </span>
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-white/[0.06] mt-3" />
                        )}
                      </div>
                      <div>
                        <p className="font-display text-[1.125rem] font-black text-white mb-1">{step.title}</p>
                        <p className="text-[1.0625rem] text-white leading-[1.7]">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </FadeUp>
              <FadeUp delay={0.15} direction="left">
                <ProcessGanttPanel />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* FIRST YEAR — tabs */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp className="mb-12">
              <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                What the First Year Looks Like
              </p>
              <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white">
                This isn&apos;t a tool you turn on.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <TimelineTabs />
            </FadeUp>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp className="mb-12">
              <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium block mb-5">
                Common Questions
              </p>
              <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white max-w-[560px]">
                Questions I get asked before anyone books.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <FaqAccordion columns={2} items={[
                {
                  question: "What is a Business AI Operating System?",
                  answer: "Most AI tools solve one problem. A Business AI Operating System connects your entire operation, so the business runs on information and systems instead of your constant attention. It has five layers: Context (what the business knows), Data (what the business tracks), Intelligence (how decisions get made), Automate (what happens without you), and Build (the custom tools that make it yours). The goal is simple. You stop being the business. You start owning one.",
                },
                {
                  question: "Is a Business AI OS right for a small business?",
                  answer: "It's built specifically for small businesses, not enterprise. If you have 1 to 15 people and you're the one keeping everything from falling apart, this is exactly the situation it was designed for. Enterprise companies have operations teams. You don't. That's the gap this fills.",
                },
                {
                  question: "What does a Business AI OS actually do day to day?",
                  answer: "It depends on what's built into it, but the typical outcomes are concrete. Founders get 10 or more hours a week back. Recurring tasks that used to need your decision get handled automatically. New team members onboard faster because the knowledge lives in the system, not your head. The three metrics I measure against: away-from-desk autonomy, task automation percentage, and revenue per headcount. If those don't move, the system isn't working.",
                },
                {
                  question: "I've tried AI tools before and they didn't stick. Why would this be different?",
                  answer: "Because tools and systems are different things. Most AI tools are point solutions. They do one thing well if you set them up correctly and remember to use them. The AIOS is an operating system. I install it, configure it to your specific business, and integrate it into how your operations actually work. You don't have to figure it out. You don't have to maintain it. You're not left with a tool and a YouTube tutorial. You're left with a running system.",
                },
                {
                  question: "How is this different from ChatGPT Projects, Claude Cowork, or Manus?",
                  answer: "Those tools are powerful. They're still tools. ChatGPT Projects and Claude Cowork give you a smarter workspace. Manus can run tasks autonomously. But all of them require you to set them up, prompt them, maintain them, and remember to use them. They know what you told them. They don't know your business. A Business AI OS is a designed operating layer built around your specific workflows, your data, your decision patterns, and your team. It doesn't wait for you to prompt it. It runs. The difference is the same as having a smart assistant versus having a business that thinks. One makes you more productive. The other makes you less necessary to the daily operation.",
                },
                {
                  question: "Is this just automation? I already have Zapier.",
                  answer: "Zapier automates individual tasks. The AIOS changes how your whole business operates. That's not a semantic difference, it's a structural one. Zapier can automate one invoice reminder. The AIOS determines how all of your intake, client management, reporting, and team coordination works without you being in the middle of it. Most businesses that come to me have Zapier. Most of them also have automations that break when something changes and nobody knows why. The AIOS is a system, not a stack of automations. Full audit trails mean you can see every decision it makes.",
                },
                {
                  question: "How is this different from hiring an operations consultant?",
                  answer: "An operations consultant maps your business, writes recommendations, hands you a document, and leaves. You then have to figure out how to implement those recommendations yourself. I build the infrastructure and leave it running. The difference is the gap between a report and a working system. I'm not giving you advice on what to build. I'm building it.",
                },
                {
                  question: "How long does this take?",
                  answer: "The Audit runs across one to two sessions and produces a specific deliverable within a week of completion. The Setup is scoped after the Audit. We work hand in hand to build your AIOS over the first 30 days, or more based on complexity. For Delivery and Training, it's best to have in-person sessions. Then we create a support plan based on your business and needs.",
                },
                {
                  question: "Do I need to be technical?",
                  answer: "No. Your job in this process is knowing your business: how it works, where your time goes, what decisions you make, what breaks. That's it. I handle the technical layer. The AIOS is built for a business owner to use every day, not for an engineer to maintain.",
                },
                {
                  question: "What if my business is too small or too early?",
                  answer: "The Audit will answer that. I've told founders their business isn't ready for a full AIOS build. That's not a failure. It's an accurate read. If your operations aren't complex enough to justify the system yet, I'd rather tell you that upfront than build something you don't need.",
                },
                {
                  question: "What happens if something breaks after Setup?",
                  answer: "Ongoing support is built into every engagement. You're not handed a system and wished luck. Maintenance retainers cover system monitoring, minor updates, and a quarterly review. Growth retainers include active monthly builds if the system needs to expand. You'll know exactly what support looks like before Setup begins.",
                },
                {
                  question: "What do you actually need from me?",
                  answer: "Time for the Audit interview, usually one to two sessions. Access to your current tools and platforms so I can understand the actual state of things, not just what you think the state of things is. And honest answers about how the business works, including the parts that don't work. The Audit is only as good as the information it's built on. You'll also want to set aside a few days during Delivery and Training so we can work side by side as the system goes live.",
                },
                {
                  question: "Claude Desktop and Cowork look like they do the same thing. Why would I need a custom AI OS?",
                  answer: "Claude Desktop is a better assistant. A Business AI OS is the system that runs your business when you're not in the room. Every Cowork session starts fresh. It does not know your clients, your pricing, or what you decided last week. What I build holds that context permanently and logs every decision so you know what happened when something goes wrong.",
                },
                {
                  question: "Can't I just set up Claude Code and Obsidian myself? Why pay for this?",
                  answer: "You could. The tools are not the product. Knowing what to build is. You could open Obsidian today and still be staring at a blank vault asking what to put in it. The system design requires understanding your business — your clients, your workflows, your decision bottlenecks. That takes discovery, not installation. My clients pay because mapping their business and building the right system is worth more than three months of trial and error.",
                },
                {
                  question: "What does this cost, and how do I know it will pay off?",
                  answer: "The Audit is $2,500 and deductible against Setup if you proceed. If you decide not to move forward, you still walk away with a comprehensive audit of your operations, a clear gap map, and a roadmap you can execute on your own. It's yours either way. Setup runs $10K to $30K depending on the complexity of your business and the depth of the Build layer. Founders I've worked with get 10 or more hours a week back. At a conservative $100 per hour, that is $1,000 a month in reclaimed capacity, every month, permanently. The three metrics I measure against are away-from-desk autonomy, task automation percentage, and revenue per headcount. If those do not move, the system is not working.",
                },
                {
                  question: "What if the AI makes a wrong decision or does something I didn't intend?",
                  answer: "Every system I build includes a decision log and rollback capability. You can see every action the system took, when it took it, and why. This is not optional. It is part of how I build. A Cowork user asked it to clean up a folder. It deleted 11GB of files with no confirmation and no audit trail. That is what happens when a powerful tool operates without accountability. What I build is auditable by design.",
                },
                {
                  question: "I already use a bunch of tools. Does this replace everything or layer on top?",
                  answer: "It replaces some and connects the rest. The Audit maps what you already have. If something in your stack is redundant, I will tell you. But most founders do not have too many tools. They have tools that do not talk to each other. The AIOS connects your core stack into one system, replaces anything that is not pulling its weight, and fills the gaps with custom builds. The result is fewer subscriptions, less context switching, and one place where everything lives.",
                },
                {
                  question: "Is this basically a custom ChatGPT wrapper for my business?",
                  answer: "No. A chatbot answers questions. A Business AI OS runs operations. The difference is what happens when you are not in the room. A chatbot waits. The AIOS acts. It monitors, routes, responds, and logs based on the logic built into it during Setup. It also carries full business context across every interaction: your clients, your pricing, your decisions, your voice. A chatbot forgets every time you close the tab.",
                },
                {
                  question: "Claude Computer Use can click buttons, fill forms, and log into accounts. Can your system do that too?",
                  answer: "Yes. Claude Computer Use is Anthropic's approach — it works by controlling your screen directly. The AIOS uses Playwright, which is the production-grade version of the same capability. It can click, type, navigate, download files, and log into accounts just like Computer Use, but it runs cross-platform, does not require your screen to be visible, and is built for repeatable production tasks. Computer Use is Anthropic's fallback for when a structured integration does not exist. Playwright is how I do it in production. Faster, more reliable, and with a full audit trail.",
                },
              ]} />
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-10 text-white/50 text-sm">
                Considering OpenClaw?{" "}
                <Link
                  href="/business-ai-os-vs-openclaw"
                  className="text-[#028090] underline underline-offset-4 hover:text-white transition-colors"
                >
                  See how Business AI OS compares to OpenClaw
                </Link>
                .
              </p>
              <p className="mt-4 text-white/50 text-sm">
                Using Claude Code + Obsidian as your business brain?{" "}
                <Link
                  href="/business-ai-os-vs-claude-code-obsidian"
                  className="text-[#028090] underline underline-offset-4 hover:text-white transition-colors"
                >
                  See how Business AI OS compares to Claude Code + Obsidian
                </Link>
                .
              </p>
            </FadeUp>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="py-28 md:py-36">
          <div className="max-w-[1280px] mx-auto px-6 md:px-[15px] text-center">
            <FadeUp>
              <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-8 max-w-[950px] mx-auto">
                You take a week off. Your business keeps going. That&apos;s not a fantasy. It&apos;s what the system is built to do.
              </h2>
              <Link
                href="/work-with-me"
                className="inline-block font-display text-[1rem] font-bold px-8 py-3.5 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"
              >
                Start the Conversation →
              </Link>
            </FadeUp>
          </div>
        </section>

      </div>
    </div>
  );
}
