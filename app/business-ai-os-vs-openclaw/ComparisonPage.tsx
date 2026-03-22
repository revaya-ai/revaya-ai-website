"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";

// ─── Data ───────────────────────────────────────────────────────────────────

const riskCards = [
  {
    num: "01",
    title: "The creator said it is not for you",
    body: "OpenClaw was not designed for small business owners. Peter Steinberger, the developer who built OpenClaw, stated explicitly that the product is \"not for non-technical users.\" If you are a business owner without a development background, you are operating outside the intended use case.",
  },
  {
    num: "02",
    title: "Technical setup does not end at installation",
    body: "OpenClaw requires Docker, YAML configuration, and VPS or local server management. Most non-technical business owners are paying engineers to install it. But the ongoing security burden stays with you, not the engineer.",
  },
  {
    num: "03",
    title: "No audit trail",
    body: "Actions taken by the agent are not logged in a reviewable format by default. If something goes wrong, an email sent, a file deleted, data exfiltrated, you may not know it happened. Meta's AI safety director learned this the hard way when her agent deleted her entire inbox, despite explicit instructions to confirm before acting.",
  },
  {
    num: "04",
    title: "Active security vulnerabilities",
    body: "A critical remote code execution flaw (CVE-2026-25253) allows exploitation without authentication. A separate vulnerability called ClawJacked lets malicious websites hijack your agent silently. 341 confirmed malicious skills on ClawHub. Over 135,000 exposed instances on the public internet. Cisco, Microsoft, and CrowdStrike have all published formal security advisories.",
  },
  {
    num: "05",
    title: "No strategic layer",
    body: "OpenClaw does what you tell it to do. It has no concept of your business goals, your bottleneck, or what actually needs to happen this week. Without a strategic layer, you automate the wrong things, or create new problems faster than you solve old ones.",
  },
  {
    num: "06",
    title: "Unpredictable costs",
    body: "API bills arrive 30 days after the damage. Agents run 24/7 with no real-time visibility into what they are spending. Documented case: one business owner's monthly bill went from $80 to $2,100 in a single month. There is no kill switch built into the default setup.",
  },
];

const aiosLayers = [
  {
    name: "Context",
    desc: "Everything the AI needs to know about your business: clients, decisions, priorities, history",
  },
  {
    name: "Data",
    desc: "Your real business data, connected live, not a generic knowledge base",
  },
  {
    name: "Intelligence",
    desc: "AI that understands your goals and your current bottleneck, not just your last question",
  },
  {
    name: "Automate",
    desc: "Workflows that run without you watching, triggered by conditions, not by you remembering to ask",
  },
  {
    name: "Build",
    desc: "Custom systems that compound over time as your business grows",
  },
];

const tableRows = [
  {
    dimension: "Designed for",
    openclaw: "Technical operators and developers (creator's own words)",
    aios: "Founders of service businesses, agencies, consultancies",
  },
  {
    dimension: "Setup",
    openclaw: "Docker, YAML, VPS, API key management",
    aios: "Professionally designed and implemented",
  },
  {
    dimension: "Audit trail",
    openclaw: "None by default",
    aios: "Every decision visible, every action logged",
  },
  {
    dimension: "Security model",
    openclaw: "9 documented CVEs, 135K exposed instances, broad system permissions",
    aios: "Structured permissions per layer, no exposed attack surface",
  },
  {
    dimension: "Strategic layer",
    openclaw: "None. Executes instructions only.",
    aios: "Built around your goals, your bottleneck, your KPIs",
  },
  {
    dimension: "Cost predictability",
    openclaw: "API bills arrive 30 days after the damage. No real-time visibility.",
    aios: "Fixed engagement scope. No runaway API surprises.",
  },
  {
    dimension: "Compounding",
    openclaw: "No. Resets each session.",
    aios: "Yes. Context and learning accumulate over time.",
  },
  {
    dimension: "Support",
    openclaw: "Open-source community",
    aios: "Ongoing specialist retainer",
  },
];

const faqItems = [
  {
    question: "Can OpenClaw run a service business?",
    answer:
      "OpenClaw can automate individual tasks, email management, file organization, web research, but it has no strategic layer. It does what you tell it to do, not what your business actually needs. Without a system that connects your goals, your data, and your workflows, you end up automating the wrong things or creating new problems faster than you solve old ones.",
  },
  {
    question: "Is OpenClaw safe for a small business?",
    answer:
      "OpenClaw has active security vulnerabilities as of early 2026, including a critical remote code execution flaw (CVE-2026-25253), a WebSocket hijacking vulnerability called ClawJacked, and 341 confirmed malicious skills on its ClawHub marketplace. Microsoft, Cisco, and CrowdStrike have all published security advisories. For non-technical service business owners handling client data, the risk is significant.",
  },
  {
    question: "Do I need a developer to use OpenClaw?",
    answer:
      "OpenClaw requires Docker, YAML configuration, VPS or local server setup, API key management, and ongoing security hardening. It was designed for technical operators. In practice, non-technical business owners are paying engineers to install it for them, but the ongoing security burden still falls on the operator.",
  },
  {
    question: "What does OpenClaw cost per month to run?",
    answer:
      "OpenClaw is open-source and free to install. Running it is not free. You need a server ($5 to $20 per month), API keys for the AI models it connects to (typically $15 to $35 per month), and for most non-technical business owners, a developer to configure it. Documented cases show monthly bills going from $80 to over $2,100 in a single month when agents run unchecked.",
  },
  {
    question: "What happens when OpenClaw makes a mistake?",
    answer:
      "There is no audit trail in OpenClaw by default. Actions taken by the agent are not logged in a reviewable format. If something goes wrong, a file deleted, an email sent, data exfiltrated, you may not know it happened until the damage is done.",
  },
  {
    question: "Does OpenClaw have an audit trail?",
    answer:
      "No. OpenClaw does not log agent actions in a reviewable format by default. If the agent deletes a file, sends an email, or accesses data it should not have, there is no record you can trace. A Business AI Operating System is built on full transparency: every decision is visible, every action is logged, and nothing happens without a reason you can follow.",
  },
  {
    question: "What is a Business AI OS?",
    answer:
      "A Business AI Operating System is a structured operating environment built specifically around a founder-led business. It is five connected layers: Context, Data, Intelligence, Automate, and Build. It is designed and implemented by a specialist, auditable at every layer, and built to compound over time.",
  },
  {
    question: "Who should use OpenClaw vs. a Business AI OS?",
    answer:
      "OpenClaw is built for technical operators, developers, engineers, and IT professionals comfortable managing servers, YAML config, and security hardening. A Business AI Operating System is built for founders of service businesses who want autonomous AI without the technical complexity, security exposure, or strategic guesswork.",
  },
  {
    question: "What is ClawJacked?",
    answer:
      "ClawJacked is a vulnerability in OpenClaw where a malicious website can send hidden instructions to your agent through the browser, causing it to take actions without your knowledge or consent. It was disclosed in early 2026. It is the reason Cisco, Microsoft, and CrowdStrike all issued separate security advisories within weeks of each other.",
  },
  {
    question: "What is NanoClaw and how is it different from OpenClaw?",
    answer:
      "NanoClaw is a security-focused fork of OpenClaw built in 2026 specifically because OpenClaw's security problems could not be patched. It is a technically cleaner product. It is still a developer product. NanoClaw does not solve the non-technical founder's problem, it just solves the security problem for operators who were already technical.",
  },
  {
    question: "Is OpenClaw free?",
    answer:
      "OpenClaw is open-source and free to install. Running it is not free. You need a server ($5 to $20 per month), API keys for the AI models it connects to (typically $15 to $35 per month), and for most non-technical business owners, a developer to configure it. API costs can scale without warning.",
  },
];

// ─── FadeUp helper ──────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ComparisonPage() {
  return (
    <main className="text-white">
      {/* Section 1 — Hero */}
      <section className="relative bg-[#080D11] overflow-hidden py-28 md:py-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#553555]/20 blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#028090]/10 blur-[100px]" />
        </div>

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeUp delay={0.1}>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-6">
              Business AI OS vs OpenClaw
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="font-black text-4xl md:text-6xl leading-tight mb-6">
              Business AI OS vs OpenClaw:
              <br />
              <span className="text-[#F45B69]">What Service Business Owners Need to Know</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              You already tried the tools. You became the one connecting them all. Every workflow
              still touched your calendar. Every decision still ran through you. OpenClaw caught
              your attention because it promised to change that. The problem is not the promise.
              It is the gap between that demo and what actually happens when you run it on a real
              business. Here is that gap, laid out plainly.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <Link
              href="/business-ai-operating-system"
              className="rounded-full bg-[#553555] px-8 py-4 text-white font-semibold hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-300 inline-flex items-center gap-2"
            >
              See how it&apos;s built
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 2 — The Appeal (50/50 split) */}
      <section className="bg-[#111820] flex flex-col md:flex-row min-h-[560px]">
        {/* Left visual col */}
        <div className="relative w-full md:w-1/2 flex-shrink-0 min-h-[320px] md:min-h-0 overflow-hidden bg-[#080D11]">
          <Image
            src="/comparison/appeal-openclaw.png"
            alt="OpenClaw AI agent controlling business apps via WhatsApp and Telegram — the appeal that drove 247,000 GitHub stars"
            title="OpenClaw AI agent: why 247,000 developers and business owners starred it on GitHub"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111820] hidden md:block" />
        </div>

        {/* Right copy col */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-16 md:py-24">
          <FadeUp>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-5">
              What OpenClaw is
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-black text-3xl md:text-4xl mb-8 leading-tight">
              What OpenClaw Is and Why It Went Viral
            </h2>
          </FadeUp>
          <div className="space-y-5 text-white/75 text-base md:text-lg leading-relaxed">
            <FadeUp delay={0.15}>
              <p>
                OpenClaw is a self-hosted AI agent that actually does things. Not just answers,
                things. It runs terminal commands, controls your browser, manages email, sends
                messages, reads and writes files. All from WhatsApp or Telegram, while you are
                doing something else.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p>
                The appeal is real. A business that runs itself, through apps you already use,
                without a subscription. More GitHub stars than Linux. That does not happen without
                a genuinely compelling idea.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="border-l-4 border-[#F45B69] pl-5 text-white/90">
                A business that only works when you do is not an asset. It is a job with overhead.
                Here is what the demos did not show you.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 3 — The Risks */}
      <section className="bg-[#080D11] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-[#F45B69] text-xs font-semibold tracking-widest uppercase mb-4">
              Where it breaks
            </p>
            <h2 className="font-black text-3xl md:text-4xl mb-4">
              OpenClaw Security Risks Service Businesses Should Know
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/60 text-lg mb-8">
              These are not theoretical concerns. Even the people who built AI safety systems at
              Meta ran into them.
            </p>
          </FadeUp>

          {/* Pull quote */}
          <FadeUp delay={0.15}>
            <blockquote className="border-l-4 border-[#F45B69] pl-6 mb-14 max-w-2xl">
              <p className="text-white/80 italic text-xl leading-relaxed">
                &ldquo;If an AI security researcher could run into this problem, what hope do mere mortals have?&rdquo;
              </p>
              <cite className="block mt-3 text-white/50 text-sm not-italic">
                TechCrunch, Feb 23, 2026
              </cite>
            </blockquote>
          </FadeUp>

          {/* Risk cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {riskCards.map((card, i) => (
              <FadeUp key={card.num} delay={0.1 + i * 0.05}>
                <div className="glass-card border-t-2 border-[#F45B69] p-6 h-full">
                  <p className="text-[#F45B69] text-xs font-semibold tracking-widest uppercase mb-2">
                    {card.num}
                  </p>
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{card.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <p className="text-[#028090]/60 text-xs">
              Sources: TechCrunch, Cisco Security, Microsoft Security Blog, CrowdStrike,
              CVE-2026-25253, Hacker News
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Section 4 — What a Business AI Operating System Is (50/50 split) */}
      <section className="bg-[#080D11] flex flex-col md:flex-row border-t border-white/5">
        {/* Left copy col */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-16 md:py-24">
          <FadeUp>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-5">
              What a Business AI Operating System actually is
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-black text-3xl md:text-4xl mb-6 leading-tight">
              What Is a Business AI Operating System?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-white text-lg leading-relaxed mb-8">
              Not a tool. An operating environment. Five connected layers built specifically
              around your business.
            </p>
          </FadeUp>
          <div className="space-y-6 mb-8">
            <FadeUp delay={0.2}>
              <p className="text-white/80 text-base leading-relaxed">
                The difference between a tool and a system is that a system compounds. Every
                layer feeds the next. Every decision gets smarter. The business gets more
                autonomous over time, not just once.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="border-l-[3px] border-[#553555] pl-5 text-white/80 text-sm leading-relaxed">
                I spent 18 years as a digital product manager. Virgin Mobile, Boost Mobile,
                Papa Murphy&apos;s, Intermedia. I have built systems at scale and watched founders
                stay trapped inside their own businesses because no system was ever built around
                them specifically. I have looked at everything being marketed as an OpenClaw
                alternative. None of them map your actual workflows, connect to your real goals,
                or build something that compounds over time. That is what I do. It is a different
                thing entirely.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.3}>
            <Link
              href="/business-ai-operating-system"
              className="rounded-full bg-[#553555] px-8 py-4 text-white font-semibold hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-300 inline-flex items-center gap-2 self-start"
            >
              See how it&apos;s built
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeUp>
        </div>

        {/* Right layer labels col */}
        <div className="relative w-full md:w-1/2 flex-shrink-0 flex items-center justify-center px-8 md:px-16 py-16 md:py-24 overflow-hidden">
          {/* Background image */}
          <Image
            src="/comparison/aios-layers.png"
            alt="Five-layer Business AI Operating System architecture: Context, Data, Intelligence, Automate, Build — each layer feeding the next"
            title="Business AI Operating System five-layer architecture for founder-led service businesses"
            fill
            className="object-cover object-center-right translate-x-[8%]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* fade from left */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#080D11] via-[#080D11]/75 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080D11] to-transparent hidden md:block" />
          {/* Decorative orb */}
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#028090]/8 blur-[100px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-sm space-y-6">
            {aiosLayers.map((layer, i) => (
              <FadeUp key={layer.name} delay={0.1 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#028090] shadow-[0_0_8px_rgba(2,128,144,0.8)]" />
                  <div>
                    <p className="text-white font-bold text-xs tracking-[3px] uppercase mb-1">
                      {layer.name}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA block */}
      <section className="bg-[#080D11] py-14 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-5">
              See if a Business AI Operating System fits your business
            </p>
            <Link
              href="/business-ai-os-assessment"
              className="rounded-full bg-[#553555] px-8 py-4 text-white font-semibold hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-300 inline-flex items-center gap-2"
            >
              Take the Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 5 — Comparison Table */}
      <section className="bg-[#111820] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-4">
              Side by side
            </p>
            <h2 className="font-black text-3xl md:text-4xl mb-3">
              OpenClaw vs. Business AI Operating System: Full Comparison
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/60 text-lg mb-12">The same promise. Different architecture.</p>
          </FadeUp>

          {/* Desktop table */}
          <FadeUp delay={0.15}>
            <div className="hidden md:block rounded-xl overflow-hidden border border-white/10">
              {/* Header */}
              <div className="grid grid-cols-3">
                <div className="bg-[#1a1a2e] px-6 py-4" />
                <div className="bg-[#F45B69]/20 px-6 py-4 text-center border-l border-white/5">
                  <p className="text-[#F45B69] font-bold text-xs tracking-[3px] uppercase">OpenClaw</p>
                </div>
                <div className="bg-[#028090]/20 px-6 py-4 text-center border-l border-white/5">
                  <p className="text-[#028090] font-bold text-xs tracking-[3px] uppercase">Business AI Operating System</p>
                </div>
              </div>
              {/* Rows */}
              {tableRows.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-3 border-t border-white/5 ${
                    i % 2 === 0 ? "bg-[#111820]" : "bg-[#0d1520]"
                  }`}
                >
                  <div className="px-6 py-5 border-r border-white/5">
                    <p className="text-white/70 text-xs font-bold tracking-widest uppercase">{row.dimension}</p>
                  </div>
                  <div className="px-6 py-5 border-r border-white/5">
                    <p className="text-white/80 text-sm leading-relaxed">{row.openclaw}</p>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-[#28b0be] text-sm leading-relaxed">{row.aios}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Mobile — stacked cards */}
          <div className="md:hidden space-y-4">
            {tableRows.map((row, i) => (
              <FadeUp key={row.dimension} delay={0.05 * i}>
                <div className="glass-card border-l-2 border-[#F45B69] p-5">
                  <p className="text-white font-semibold mb-3">{row.dimension}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-white/40 text-xs uppercase tracking-widest">OpenClaw</span>
                      <p className="text-white/70 text-sm mt-1">{row.openclaw}</p>
                    </div>
                    <div>
                      <span className="text-[#028090] text-xs uppercase tracking-widest">
                        Business AI Operating System
                      </span>
                      <p className="text-[#028090] text-sm mt-1">{row.aios}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ */}
      <section className="bg-[#111820] py-24 md:py-32 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-4">
              Common questions
            </p>
            <h2 className="font-black text-3xl md:text-4xl mb-12">
              OpenClaw FAQ: Common Questions from Small Business Owners
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FaqAccordion items={faqItems} />
          </FadeUp>
        </div>
      </section>

      {/* Section 7 — Final CTA (50/50 split) */}
      <section className="bg-[#080D11] flex flex-col md:flex-row min-h-[600px]">
        {/* Left visual col */}
        <div className="relative w-full md:w-1/2 flex-shrink-0 min-h-[300px] md:min-h-0 overflow-hidden">
          <Image
            src="/comparison/cta-clarity.png"
            alt="From a chaotic tangle of disconnected tools to a clear, structured Business AI Operating System — the path from bottleneck to autonomy"
            title="Business AI Operating System: from founder bottleneck to business autonomy"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* fade to right */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#080D11] hidden md:block" />
        </div>

        {/* Right copy col */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-20 py-16 md:py-24">
          <FadeUp>
            <p className="text-[#028090] text-xs font-semibold tracking-widest uppercase mb-5">
              Stop being the business. Start owning one.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-black text-3xl md:text-5xl leading-tight mb-7">
              You were right to pause.
              <br />
              Now here is the next move.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              I build Business AI Operating Systems for founders of service businesses who want
              the autonomy OpenClaw promised, without the security exposure, the technical
              complexity, or the guesswork. The starting point is an Audit. I map every place
              the business runs through you, show you exactly what a Business AI Operating System
              would change, and you decide if it makes sense. If it does, the Audit fee comes off
              your build. If it does not, you keep the map.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link
              href="/work-with-me"
              className="rounded-full bg-[#553555] px-8 py-4 text-white font-semibold hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-300 inline-flex items-center gap-2"
            >
              See if it&apos;s a fit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
