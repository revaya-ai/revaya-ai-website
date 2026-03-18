"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

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
    what: "An expandable foundation. Each new agent, workflow, or integration gets added to the system you've already built. It inherits the context, the data, the standards.",
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
  { num: "01", title: "Audit", body: "Map the gaps." },
  { num: "02", title: "Scope", body: "Define exactly what gets built and at what cost." },
  { num: "03", title: "Build", body: "I architect your Business AIOS." },
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
                Pricing ranges from $10K to $27K depending on scope. Audit is deductible. Retainer starts post-setup.
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
      <div className="p-5 space-y-3">
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

// ─── Timeline Tabs ──────────────────────────────────────────────────────────

function TimelineTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* Tab row */}
      <div className="flex overflow-x-auto border-b border-white/[0.08]">
        {timeline.map((item, i) => (
          <button
            key={item.month}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-4 shrink-0 border-b-2 transition-all duration-200 ${
              active === i
                ? "border-[#028090] text-white"
                : "border-transparent text-white/40 hover:text-white/65"
            }`}
          >
            <span className={`text-[0.875rem] font-medium tracking-widest ${active === i ? "text-[#028090]" : "text-white/25"}`}>
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
          className="pt-10 max-w-[680px]"
        >
          <p className="font-display font-black text-[1.5rem] leading-[1.2] text-white mb-5">
            {timeline[active].label}
          </p>
          <p className="text-[1rem] text-white/85 leading-[1.7]">
            {timeline[active].body}
          </p>
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
              <p className="text-[1rem] text-white/85 leading-[1.7]">{layers[active].problem}</p>
            </div>
            <div>
              <p className="text-[0.875rem] font-medium tracking-[0.14em] uppercase text-[#028090] mb-2">What it is</p>
              <p className="text-[1rem] text-white/85 leading-[1.7]">{layers[active].what}</p>
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
      <div className="p-5 space-y-2 min-h-[220px]">
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
                <p className="text-[0.8125rem] text-white/85 leading-snug">{item.event}</p>
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
    <div className="bg-[#0A0F14] text-white min-h-screen overflow-x-hidden">

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
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="font-display text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] text-white mb-8">
                  A Business AI OS isn&apos;t software.
                  <br />
                  <span className="text-white/70">
                    It&apos;s how your business thinks without you.
                  </span>
                </h1>
                <p className="text-[1rem] leading-[1.7] text-white/80">
                  Five layers. Every major drain on your time. Automated, connected, fully auditable.
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

        {/* WHO THIS IS FOR — text L, panel R */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp direction="right">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  Who This Is For
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  Built for founders where everything waits on you.
                </h2>
                <p className="text-[1rem] text-white/85 leading-[1.7] mb-4">
                  Founder-led businesses with 1 to 15 people where the work requires expertise, judgment, or relationships, and the founder is the one everything waits on.
                </p>
                <p className="text-[1rem] text-white/85 leading-[1.7] mb-8">
                  Service businesses, agencies, consultancies, professional practices, and founder-led product brands with DTC or retail operations.
                </p>
                <p className="text-[1rem] text-white/75 leading-[1.7] mb-8">
                  Not for anyone looking for a quick fix. The system takes time to build and discipline to adopt.
                </p>
                <p className="text-[1rem] text-white font-medium leading-[1.7]">
                  If that&apos;s you, start with the Audit. It will tell us both if you&apos;re ready.
                </p>
              </FadeUp>
              <FadeUp delay={0.15} direction="left">
                <WhoPanel />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* BEFORE STATE — panel L, text R */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp delay={0.15} direction="right">
                <PainQueuePanel />
              </FadeUp>
              <FadeUp direction="left">
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-7">
                  You answer the same questions 20 times a month.
                </h2>
                <p className="text-[1rem] text-white/85 leading-[1.7] mb-4">
                  New hires take 40 hours to onboard. Your business knowledge lives in your head, and when you&apos;re unavailable, nothing moves.
                </p>
                <p className="text-[1rem] text-white/85 leading-[1.7] mb-4">
                  Or you&apos;re running it alone. You left a job to have freedom. You have less of it now than when you had a boss. There&apos;s no one to hand off to. The business doesn&apos;t run when you&apos;re not in it. It waits.
                </p>
                <p className="text-[1rem] text-white/85 leading-[1.7] mb-4">
                  You make decisions from memory because clean data takes a week to pull.
                </p>
                <p className="text-[1rem] text-white/85 leading-[1.7] mb-8">
                  Your business stops when you stop.
                </p>
                <p className="text-[1rem] text-white font-medium leading-[1.7]">
                  That&apos;s not a people problem. It&apos;s an infrastructure problem.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* FIVE LAYERS */}
        <section className="pt-24 md:pt-32 pb-10">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp className="mb-12">
              <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
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
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  What&apos;s Included
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-10">
                  Every AIOS Setup includes:
                </h2>
                <ul className="space-y-4">
                  {included.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-[#028090] mt-[3px] shrink-0">→</span>
                      <span className="text-[1rem] text-white/85 leading-[1.7]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start gap-6">
                  <Link
                    href="/work-with-me"
                    className="inline-block text-[0.9375rem] font-bold px-8 py-3.5 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200 shrink-0"
                  >
                    Start with the Audit →
                  </Link>
                  <div className="flex flex-col justify-center sm:pt-3">
                    <p className="text-[0.875rem] text-white/50 leading-[1.6] mb-1">
                      Want the full methodology?
                    </p>
                    <a
                      href="/blueprint"
                      className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-[#028090] hover:text-[#E4FDE1] transition-colors duration-200"
                    >
                      Download the Blueprint →
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* AFTER THE BUILD */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <FadeUp direction="right">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  After the Build
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-4">
                  The system is live.
                </h2>
                <p className="text-[1rem] text-white/70 leading-[1.7] mb-14">
                  Now it grows with your business.
                </p>
                <div className="border-t border-white/[0.08] pt-10 pb-10">
                  <div className="border-l-2 border-white/[0.1] pl-6">
                    <h3 className="font-display text-[1.125rem] font-black text-white uppercase tracking-wide mb-3">
                      Maintenance
                    </h3>
                    <p className="text-[1rem] text-white/85 leading-[1.7]">
                      System monitoring and issue resolution. No active builds. For businesses that want the OS maintained before expanding further.
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/[0.08] pt-10 pb-10">
                  <div className="border-l-2 border-[#028090]/40 pl-6">
                    <h3 className="font-display text-[1.125rem] font-black text-white uppercase tracking-wide mb-3">
                      Growth
                    </h3>
                    <p className="text-[1rem] text-white/85 leading-[1.7]">
                      Active build credits every month. Pricing varies based on the number of workflow builds, plus monthly strategy sessions. For businesses ready to keep expanding the OS, layer by layer.
                    </p>
                  </div>
                </div>
                <p className="text-[0.9375rem] text-white/55 leading-[1.7]">
                  The retainer conversation happens at your 30-day check-in, once you&apos;ve used the system and know what you want next.
                </p>
              </FadeUp>
              <FadeUp delay={0.15} direction="left">
                <RetainerPanel />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* THE PROCESS */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <FadeUp direction="right">
                <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
                  The Process
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-14">
                  How I work with you.
                </h2>
                <ol className="space-y-0">
                  {processSteps.map((step, i, arr) => (
                    <li key={step.num} className={`flex gap-8 ${i < arr.length - 1 ? "pb-10" : ""}`}>
                      <div className="flex flex-col items-center">
                        <span className="text-[0.75rem] font-medium text-[#028090]/50 leading-none mt-1">
                          {step.num}
                        </span>
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-white/[0.06] mt-3" />
                        )}
                      </div>
                      <div>
                        <p className="font-display text-[1.125rem] font-black text-white mb-1">{step.title}</p>
                        <p className="text-[1rem] text-white/85 leading-[1.7]">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </FadeUp>
              <FadeUp delay={0.15} direction="left">
                <ProcessPanel />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* FIRST YEAR — tabs */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp className="mb-12">
              <p className="text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
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

        {/* CLOSING CTA */}
        <section className="py-28 md:py-36">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeUp>
              <div className="max-w-[560px]">
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-5">
                  Ready to see what&apos;s possible?
                </h2>
                <p className="text-[1rem] text-white/80 leading-[1.7] mb-8">
                  The Audit maps every gap. It costs nothing to find out where your time is going.
                </p>
                <Link
                  href="/work-with-me"
                  className="inline-block text-[0.9375rem] font-bold px-8 py-3.5 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"
                >
                  Book the Audit
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </div>
    </div>
  );
}
