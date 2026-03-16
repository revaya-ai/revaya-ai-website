"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { homeWebPageSchema } from "@/lib/schema";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ── AIOS System Diagram (SVG) ─────────────────────────────────────────────────
function SystemDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const layers = [
    { id: "01", name: "Context", x: 50, y: 60 },
    { id: "02", name: "Data", x: 50, y: 160 },
    { id: "03", name: "Intelligence", x: 50, y: 260 },
    { id: "04", name: "Automate", x: 50, y: 360 },
    { id: "05", name: "Build", x: 50, y: 460 },
  ];

  return (
    <div ref={ref} className="relative w-full h-full min-h-[520px]">
      {/* Outer glow container */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#028090]/5 to-[#553555]/5 border border-white/[0.06]" />

      {/* Floating orb behind diagram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#028090]/10 blur-[80px] animate-pulse-glow" />

      <svg
        viewBox="0 0 340 520"
        className="relative w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical spine line */}
        <motion.line
          x1="50" y1="60" x2="50" y2="460"
          stroke="rgba(2,128,144,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Connection lines from nodes to right panel */}
        {layers.map((layer, i) => (
          <motion.line
            key={`h-${i}`}
            x1="50" y1={layer.y} x2="200" y2={layer.y}
            stroke="rgba(2,128,144,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
          />
        ))}

        {/* Layer nodes */}
        {layers.map((layer, i) => (
          <motion.g
            key={layer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
          >
            {/* Node circle */}
            <circle
              cx={layer.x}
              cy={layer.y}
              r="22"
              fill="rgba(10,15,20,0.9)"
              stroke="rgba(2,128,144,0.5)"
              strokeWidth="1.5"
            />
            {/* Node number */}
            <text
              x={layer.x}
              y={layer.y - 4}
              textAnchor="middle"
              fill="rgba(2,128,144,0.7)"
              fontSize="9"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
            >
              {layer.id}
            </text>
            {/* Node name */}
            <text
              x={layer.x}
              y={layer.y + 7}
              textAnchor="middle"
              fill="rgba(255,255,255,0.9)"
              fontSize="8.5"
              fontFamily="Montserrat, sans-serif"
              fontWeight="800"
            >
              {layer.name}
            </text>

            {/* Right panel card */}
            <rect
              x="210"
              y={layer.y - 22}
              width="120"
              height="44"
              rx="8"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
            <text
              x="270"
              y={layer.y - 5}
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              fontSize="8"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
            >
              {layer.name} Layer
            </text>
            <text
              x="270"
              y={layer.y + 8}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="7"
              fontFamily="Inter, sans-serif"
            >
              {i === 0 ? "How you operate" :
               i === 1 ? "Your data, connected" :
               i === 2 ? "AI where it matters" :
               i === 3 ? "Repeatable work, removed" :
               "Custom tools, built"}
            </text>

            {/* Status dot */}
            <circle
              cx="310"
              cy={layer.y - 10}
              r="3"
              fill={i < 3 ? "#028090" : i === 3 ? "#F45B69" : "#553555"}
              opacity="0.8"
            />
          </motion.g>
        ))}

        {/* "System active" badge at top right */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <rect x="200" y="10" width="130" height="28" rx="14" fill="rgba(2,128,144,0.15)" stroke="rgba(2,128,144,0.3)" strokeWidth="1" />
          <circle cx="217" cy="24" r="4" fill="#028090" opacity="0.9" />
          {/* pulse ring */}
          <circle cx="217" cy="24" r="7" fill="none" stroke="#028090" strokeWidth="0.8" opacity="0.4" />
          <text x="228" y="28.5" fill="rgba(2,128,144,0.9)" fontSize="9" fontFamily="Montserrat, sans-serif" fontWeight="700">System Active</text>
        </motion.g>
      </svg>
    </div>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Context", "Data", "Intelligence", "Automate", "Build", "Business AI OS", "5 Layers", "3 Outcomes"];
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-5 border-y border-white/[0.06]">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[0.8125rem] uppercase tracking-[0.12em] text-white/30 font-medium">
            {item}
            <span className="text-[#028090] opacity-50">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />

      {/* ── MODULE 1: HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-[#0A0F14] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-60 -left-60 w-[900px] h-[900px] rounded-full bg-[#553555]/15 blur-[160px] animate-pulse-glow" />
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#028090]/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        {/* Content — asymmetric split */}
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="grid md:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center">

            {/* LEFT: Text content */}
            <div>
              <FadeIn delay={0}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-10 bg-[#028090]" />
                  <span className="text-[0.8125rem] uppercase tracking-[0.12em] text-[#028090] font-medium">
                    Business AI Operating System
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="font-display font-black text-[2.75rem] md:text-[3.75rem] lg:text-[4.25rem] leading-[1.02] text-white mb-8">
                  You&rsquo;re running your business{" "}
                  <span className="gradient-text">and doing the work.</span>
                  <br />
                  Only one should be your job.
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-[1.125rem] leading-[1.7] text-white/60 mb-10 max-w-[520px]">
                  I build Business AI Operating Systems for service businesses. The kind that run when you don&rsquo;t. No chatbots. No generic tools. A full operating system built for how your business actually works.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                  <Link
                    href="/work-with-me"
                    className="inline-block bg-[#F45B69] text-white text-[0.9375rem] font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:bg-[#f36b77] hover:shadow-[0_0_40px_rgba(244,91,105,0.35)] text-center"
                  >
                    See if this fits your situation
                  </Link>
                  <Link
                    href="/solutions"
                    className="inline-block border border-white/15 text-white/70 text-[0.9375rem] font-medium px-8 py-4 rounded-lg hover:border-white/30 hover:text-white transition-all duration-200 text-center"
                  >
                    See what I build →
                  </Link>
                </div>
              </FadeIn>

              {/* Large stat strip below CTAs */}
              <FadeIn delay={0.4}>
                <div className="flex items-center gap-8 pt-8 border-t border-white/[0.07]">
                  {[
                    { n: 18, suffix: "", label: "years product leadership" },
                    { n: 5, suffix: "", label: "layers in the system" },
                    { n: 3, suffix: "", label: "outcomes measured" },
                  ].map((stat, i) => (
                    <div key={i} className={`${i > 0 ? "pl-8 border-l border-white/[0.07]" : ""}`}>
                      <div className="font-display font-black text-[2.75rem] leading-none text-white mb-1">
                        <Counter to={stat.n} suffix={stat.suffix} />
                      </div>
                      <div className="text-[0.75rem] text-white/40 uppercase tracking-[0.08em]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* RIGHT: System diagram */}
            <FadeIn delay={0.2} direction="left" className="hidden md:block">
              <SystemDiagram />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────────────────── */}
      <div className="bg-[#0A0F14]">
        <Marquee />
      </div>

      {/* ── MODULE 2: THE PROBLEM ──────────────────────────────────────────── */}
      <section className="bg-[#0D1117] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left: heading */}
            <FadeIn>
              <div>
                <span className="text-[0.8125rem] uppercase tracking-[0.12em] text-[#F45B69] font-medium block mb-5">
                  The problem
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[3rem] leading-[1.05] text-white mb-6">
                  The business only works when you&rsquo;re in it.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/50">
                  You know you should step back. The business won&rsquo;t let you.
                </p>
              </div>
            </FadeIn>

            {/* Right: problem list as cards */}
            <StaggerChildren className="space-y-3">
              {[
                { icon: "→", text: "You answered Slack messages during your last vacation. Or you didn't take one at all." },
                { icon: "→", text: "Every decision your team could make, doesn't. Because it's faster to ask you." },
                { icon: "→", text: "You onboarded your last hire in six weeks of your own time." },
                { icon: "→", text: "Your data lives in four places. You can't get a clear picture without pulling it yourself." },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-200">
                    <span className="text-[#F45B69] font-display font-black text-[1rem] shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-[0.9375rem] leading-[1.65] text-white/65">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── MODULE 3: DIAGNOSIS ────────────────────────────────────────────── */}
      <section className="relative bg-[#0A0F14] py-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-full bg-gradient-to-l from-[#028090]/05 to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="max-w-[700px]">
              <div className="w-16 h-1 bg-gradient-to-r from-[#028090] to-transparent rounded-full mb-8" />
              <h2 className="font-display font-black text-[2rem] md:text-[3rem] leading-[1.05] text-white mb-6">
                That&rsquo;s not a productivity problem.
              </h2>
              <p className="text-[1.125rem] leading-[1.7] text-white/65 mb-4">
                Most founders I talk to think they just need better tools or more time. They don&rsquo;t.
              </p>
              <p className="text-[1rem] leading-[1.7] text-white/45">
                The problem is structural. The business only works when you&rsquo;re in it because nothing is set up to work without you. That&rsquo;s a systems problem. And it has a specific solution.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MODULE 4: WHAT IS A BUSINESS AI OS ────────────────────────────── */}
      <section className="bg-[#0D1117] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">

          <FadeIn>
            <div className="mb-16">
              <span className="text-[0.8125rem] uppercase tracking-[0.12em] text-[#028090] font-medium block mb-5">
                The solution
              </span>
              <h2 className="font-display font-black text-[2rem] md:text-[3.25rem] leading-[1.05] text-white max-w-[720px]">
                What is a{" "}
                <span className="gradient-text">Business AI Operating System?</span>
              </h2>
            </div>
          </FadeIn>

          {/* Bento grid layout */}
          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4">

            {/* Wide card top-left: AEO definition */}
            <FadeIn delay={0} className="md:col-span-2">
              <div className="h-full rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#028090]/12 to-[#553555]/8 border border-[#028090]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#028090]/05 rounded-full blur-[60px]" />
                <p className="relative text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-white/85 font-medium">
                  A Business AI Operating System is a complete operational infrastructure built on five layers — Context, Data, Intelligence, Automate, and Build — that lets a service business run on systems instead of depending on the founder for every decision.
                </p>
                <p className="relative mt-4 text-[0.9375rem] text-white/45">
                  It&rsquo;s not a tool. It&rsquo;s not a chatbot. It&rsquo;s the architecture that makes everything else work.
                </p>
              </div>
            </FadeIn>

            {/* Narrow card top-right: stat */}
            <FadeIn delay={0.1}>
              <div className="h-full rounded-2xl p-8 glass-card flex flex-col justify-between min-h-[200px]">
                <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#028090] font-medium">Built for</span>
                <div>
                  <div className="font-display font-black text-[3.5rem] leading-none text-white mb-2">
                    <Counter to={1} suffix="–5" />
                  </div>
                  <p className="text-[0.875rem] text-white/45">person service businesses doing $1M–$20M</p>
                </div>
              </div>
            </FadeIn>

            {/* Three outcome cards bottom row */}
            {[
              { n: "01", headline: "Things run while you're offline.", body: "Fewer fires. Your team stops routing every decision through you." },
              { n: "02", headline: "Your time goes to the work only you can do.", body: "Onboarding, reporting, intake, follow-up run without you scheduling them." },
              { n: "03", headline: "The business gets more valuable as it grows.", body: "Revenue per employee goes up when the system scales with you, not against you." },
            ].map((card, i) => (
              <FadeIn key={card.n} delay={0.1 * (i + 2)}>
                <div className="rounded-2xl p-7 glass-card h-full hover:bg-white/[0.07] transition-all duration-300 group">
                  <span className="text-[0.75rem] font-display font-black text-[#028090] block mb-4">{card.n}</span>
                  <h3 className="font-display font-black text-[1rem] text-white mb-3 leading-[1.25] group-hover:text-[#028090] transition-colors">
                    {card.headline}
                  </h3>
                  <p className="text-[0.875rem] leading-[1.6] text-white/45">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULE 5: THE 5 LAYERS ─────────────────────────────────────────── */}
      <section className="relative bg-[#0A0F14] py-24 md:py-32 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#553555]/08 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-[0.8125rem] uppercase tracking-[0.12em] text-[#028090] font-medium block mb-5">Five layers</span>
                <h2 className="font-display font-black text-[2rem] md:text-[3rem] leading-[1.05] text-white">
                  Built in sequence.<br />Each one on the last.
                </h2>
              </div>
              <p className="text-[0.9375rem] text-white/45 max-w-[320px] md:text-right">
                The order matters. You can&rsquo;t automate what you haven&rsquo;t mapped. You can&rsquo;t build what you haven&rsquo;t connected.
              </p>
            </div>
          </FadeIn>

          {/* Layered architecture visual */}
          <StaggerChildren className="space-y-3">
            {[
              { n: "01", name: "Context", desc: "I capture how your business actually works before building anything.", color: "#028090" },
              { n: "02", name: "Data", desc: "I connect the information scattered across tools or stuck in your head.", color: "#028090" },
              { n: "03", name: "Intelligence", desc: "I put AI where it flags what needs your attention and handles what doesn't.", color: "#553555" },
              { n: "04", name: "Automate", desc: "I remove the work you repeat every week. Follow-ups, reporting, routing, handoffs.", color: "#553555" },
              { n: "05", name: "Build", desc: "I create the custom tools your business needs that don't exist off the shelf.", color: "#F45B69" },
            ].map((layer) => (
              <StaggerItem key={layer.n}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center gap-6 p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] transition-colors duration-200 cursor-default group"
                >
                  {/* Number */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${layer.color}20`, border: `1px solid ${layer.color}40` }}
                  >
                    <span className="font-display font-black text-[0.75rem]" style={{ color: layer.color }}>
                      {layer.n}
                    </span>
                  </div>

                  {/* Layer name */}
                  <div className="w-36 shrink-0">
                    <span className="font-display font-black text-[1.125rem] text-white group-hover:text-[#028090] transition-colors">
                      {layer.name}
                    </span>
                  </div>

                  {/* Separator line */}
                  <div className="hidden md:block flex-1 h-px bg-white/[0.06]" />

                  {/* Description */}
                  <p className="text-[0.9375rem] leading-[1.6] text-white/50 md:max-w-[420px]">
                    {layer.desc}
                  </p>

                  {/* Arrow */}
                  <div className="hidden md:block ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── MODULE 6: META PROOF ───────────────────────────────────────────── */}
      <section className="bg-[#0D1117] py-24 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <FadeIn direction="right">
              <div>
                <span className="text-[0.8125rem] uppercase tracking-[0.12em] text-[#028090] font-medium block mb-5">
                  Meta proof
                </span>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  I built this system<br />for my own company first.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/60 mb-4">
                  Revaya AI runs on the same Business AI OS I build for clients. The content engine, the project delivery pipeline, the client intake process. All of it runs on the methodology.
                </p>
                <p className="text-[1rem] leading-[1.7] text-white/60">
                  No competitor is saying that. Most are selling a methodology. I&rsquo;m selling the thing I already built for myself.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="left">
              {/* Visual proof card */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0F14]">
                {/* "Terminal" header */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#028090]/60" />
                  <span className="ml-3 text-[0.75rem] text-white/30 font-mono">revaya-aios / active</span>
                </div>
                {/* Status items */}
                <div className="p-6 space-y-4">
                  {[
                    { layer: "Context", status: "Operational", color: "#028090" },
                    { layer: "Data", status: "Connected", color: "#028090" },
                    { layer: "Intelligence", status: "Running", color: "#028090" },
                    { layer: "Automate", status: "85 tasks/week", color: "#F45B69" },
                    { layer: "Build", status: "In progress", color: "#553555" },
                  ].map((item) => (
                    <div key={item.layer} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[0.875rem] text-white/60 font-mono">{item.layer}</span>
                      </div>
                      <span className="text-[0.8125rem] font-mono" style={{ color: item.color }}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── MODULE 7: OFFER SNAPSHOT ───────────────────────────────────────── */}
      <section className="relative bg-[#0A0F14] py-24 md:py-32 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#553555]/08 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <h2 className="font-display font-black text-[2rem] md:text-[3rem] leading-[1.05] text-white mb-14">
              Where most people start.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {/* AI Training */}
            <FadeIn delay={0}>
              <div className="rounded-2xl p-7 border border-white/[0.08] bg-[#0D1117] h-full flex flex-col hover:border-[#028090]/30 hover:bg-[#028090]/[0.03] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-[#028090]/15 border border-[#028090]/25 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" stroke="#028090" strokeWidth="1.5"/><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M4.1 13.9l1.4-1.4M12.5 5.5l1.4-1.4" stroke="#028090" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-display font-black text-[1.25rem] text-white mb-3">AI Training</h3>
                <p className="text-[0.9375rem] leading-[1.65] text-white/50 mb-6 flex-1">
                  Built for your workflows, your tools, your gaps. Not a generic overview. A training program specific to where your team actually is.
                </p>
                <Link href="/solutions#ai-training" className="flex items-center gap-2 text-[0.875rem] text-[#028090] group-hover:gap-3 transition-all">
                  See AI Training <span>→</span>
                </Link>
              </div>
            </FadeIn>

            {/* AIOS Audit — featured */}
            <FadeIn delay={0.1}>
              <div className="rounded-2xl p-7 border border-[#F45B69]/30 bg-gradient-to-b from-[#F45B69]/08 to-transparent h-full flex flex-col relative overflow-hidden group hover:border-[#F45B69]/50 transition-all duration-300" style={{ boxShadow: "0 0 60px rgba(244,91,105,0.08), 0 0 120px rgba(244,91,105,0.04)" }}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#F45B69]/05 rounded-full blur-[60px]" />
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-[#F45B69] font-medium mb-5 block">Start here</span>
                <div className="w-10 h-10 rounded-xl bg-[#F45B69]/15 border border-[#F45B69]/25 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9h14M9 2l5 7-5 7" stroke="#F45B69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="font-display font-black text-[1.25rem] text-white mb-3 relative">AIOS Audit</h3>
                <p className="text-[0.9375rem] leading-[1.65] text-white/60 mb-6 flex-1 relative">
                  I map your operations, identify what&rsquo;s bottlenecking you, and produce a specific plan. If you proceed to Setup, the Audit fee is deductible. If you don&rsquo;t, you walk away with a roadmap you can act on yourself.
                </p>
                <Link href="/solutions#aios-audit" className="relative flex items-center gap-2 text-[0.875rem] text-[#F45B69] group-hover:gap-3 transition-all">
                  See the Audit <span>→</span>
                </Link>
              </div>
            </FadeIn>

            {/* Business AIOS */}
            <FadeIn delay={0.2}>
              <div className="rounded-2xl p-7 border border-white/[0.08] bg-[#0D1117] h-full flex flex-col hover:border-[#553555]/40 hover:bg-[#553555]/[0.04] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-[#553555]/20 border border-[#553555]/30 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#553555" strokeWidth="1.5"/><rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#553555" strokeWidth="1.5"/><rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#553555" strokeWidth="1.5"/><rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#553555" strokeWidth="1.5"/></svg>
                </div>
                <h3 className="font-display font-black text-[1.25rem] text-white mb-3">Business AIOS</h3>
                <p className="text-[0.9375rem] leading-[1.65] text-white/50 mb-6 flex-1">
                  The full operating system. Five layers built in sequence, specific to how your business works. Measured against three outcomes: away-from-desk autonomy, task automation %, and revenue per employee.
                </p>
                <Link href="/solutions#aios-setup" className="flex items-center gap-2 text-[0.875rem] text-[#553555] group-hover:gap-3 transition-all">
                  See the Business AIOS <span>→</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MODULE 8: CTA ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#0D1117] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#553555]/20 via-transparent to-[#028090]/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[640px] mx-auto text-center">
            <FadeIn>
              <h2 className="font-display font-black text-[2.25rem] md:text-[3.25rem] leading-[1.05] text-white mb-6">
                Tell me what&rsquo;s slowing you down.
              </h2>
              <p className="text-[1.125rem] leading-[1.7] text-white/55 mb-10">
                I&rsquo;ll come back with a specific read on whether the AIOS is the right fit. If it&rsquo;s not, I&rsquo;ll say so.
              </p>
              <Link
                href="/work-with-me"
                className="inline-block bg-[#F45B69] text-white text-[0.9375rem] font-medium px-10 py-4 rounded-lg transition-all duration-200 hover:bg-[#f36b77] hover:shadow-[0_0_50px_rgba(244,91,105,0.4)]"
              >
                Start the conversation
              </Link>
              <p className="mt-5 text-[0.8125rem] text-white/30">
                Shannon reads every submission personally. You&rsquo;ll hear back within 48 hours.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MODULE 9: SOFT SECONDARY ───────────────────────────────────────── */}
      <section className="bg-[#0A0F14] py-8 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-[0.9375rem] text-white/35">
            Want to watch how this gets built?{" "}
            <a href="https://www.linkedin.com/in/swinnicki/" target="_blank" rel="noopener noreferrer" className="text-[#028090] hover:text-white transition-colors">
              I document it on LinkedIn.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
