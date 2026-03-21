"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";

// ─── Data ───────────────────────────────────────────────────────────────────

const riskCards = [
  {
    num: "01",
    title: "The creator said it is not for you",
    body: "Peter Steinberger, the developer who built OpenClaw, stated explicitly that the product is \"not for non-technical users.\" If you are a business owner without a development background, you are operating outside the intended use case.",
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
    body: "A critical remote code execution flaw (CVE-2026-25253) allows exploitation without authentication. A separate vulnerability called ClawJacked lets malicious websites hijack your agent silently. 341 confirmed malicious skills on ClawHub. Over 135,000 exposed instances detected on the public internet. Cisco, Microsoft, and CrowdStrike have all published formal security advisories.",
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
      "OpenClaw has active security vulnerabilities as of early 2026, including a critical remote code execution flaw (CVE-2026-25253), a WebSocket hijacking vulnerability called ClawJacked, and 341 confirmed malicious skills on its ClawHub marketplace. Microsoft, Cisco, and CrowdStrike have all published security advisories. It requires broad system-level permissions with no least-privilege architecture and no audit trail. For non-technical service business owners handling client data, the risk is significant.",
  },
  {
    question: "Do I need a developer to use OpenClaw?",
    answer:
      "OpenClaw requires Docker, YAML configuration, VPS or local server setup, API key management, and ongoing security hardening. It was designed for technical operators. In practice, non-technical business owners are paying engineers to install it for them, but the ongoing security burden still falls on the operator.",
  },
  {
    question: "What does OpenClaw cost per month to run?",
    answer:
      "Running OpenClaw costs approximately $25 to $50 per month for light-to-moderate use. That does not include engineer fees many non-technical users pay for installation. API costs can spike significantly with no real-time visibility. Documented cases show monthly bills going from $80 to over $2,100 in a single month when agents run unchecked.",
  },
  {
    question: "What happens when OpenClaw makes a mistake? Is there an audit trail?",
    answer:
      "There is no audit trail in OpenClaw by default. Actions taken by the agent are not logged in a reviewable format. If something goes wrong, a file deleted, an email sent, data exfiltrated, you may not know it happened until the damage is done. A Business AI OS is built on full transparency: every decision is visible, every action is logged, and nothing happens without a reason you can trace.",
  },
  {
    question: "What is a Business AI OS?",
    answer:
      "A Business AI OS is a structured operating environment built specifically around a founder-led business. It is not a single tool. It is five connected layers: Context (everything the AI needs to know about your business), Data (your actual business data, not a generic feed), Intelligence (AI that understands your goals and bottlenecks), Automate (workflows that run without you), and Build (custom systems as your needs grow). A Business AI OS is designed and implemented by a specialist, auditable at every layer, and built to compound over time.",
  },
  {
    question: "Who should use OpenClaw vs. a Business AI OS?",
    answer:
      "OpenClaw is built for technical operators, developers, engineers, and IT professionals who are comfortable managing servers, YAML config, and security hardening. A Business AI OS is built for founders of service businesses who want autonomous AI without the technical complexity, security exposure, or strategic guesswork. If your business runs on expertise, relationships, and judgment, and you want a system that actually understands what you are trying to build, a Business AI OS is the right fit.",
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
        {/* Background orbs */}
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
              The promise of OpenClaw is real.
              <br />
              <span className="text-[#F45B69]">The risk is too.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              You heard about it. Something made you pause before installing. That instinct was
              right. Here is what OpenClaw actually is, where it breaks for service businesses,
              and what a Business AI OS does instead.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <Link
              href="/business-ai-operating-system"
              className="rounded-full bg-[#553555] px-8 py-4 text-white font-semibold hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-300 inline-flex items-center gap-2"
            >
              Learn about Business AI OS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 2 — The Appeal */}
      <section className="bg-[#111820] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="font-black text-3xl md:text-4xl mb-10">
              Why 247,000 people starred it on GitHub
            </h2>
          </FadeUp>
          <div className="max-w-2xl space-y-6 text-white/75 text-lg leading-relaxed">
            <FadeUp delay={0.1}>
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
            <FadeUp delay={0.3}>
              <p>So the instinct to be interested makes complete sense. Here is what the demos do not show you.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 3 — The Risks */}
      <section className="bg-[#080D11] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="font-black text-3xl md:text-4xl mb-4">
              Where it breaks down for service businesses
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/60 text-lg mb-8">
              These are not theoretical concerns. Even the people who built AI safety systems at Meta ran into them.
            </p>
          </FadeUp>

          {/* Pull quote */}
          <FadeUp delay={0.15}>
            <blockquote className="border-l-4 border-[#F45B69] pl-6 mb-14 max-w-2xl">
              <p className="text-white/80 italic text-xl leading-relaxed">
                "If an AI security researcher could run into this problem, what hope do mere mortals have?"
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

      {/* Section 4 — Comparison Table */}
      <section className="bg-[#111820] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="font-black text-3xl md:text-4xl mb-3">
              OpenClaw vs. Business AI OS
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/60 text-lg mb-12">The same promise. Different architecture.</p>
          </FadeUp>

          {/* Desktop table — 3-column grid */}
          <FadeUp delay={0.15}>
            <div className="hidden md:block rounded-xl overflow-hidden border border-white/10">
              {/* Header row */}
              <div className="grid grid-cols-3 bg-[#553555]/20 px-6 py-4">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest"></p>
                <p className="text-white font-semibold">OpenClaw</p>
                <p className="text-[#028090] font-semibold">Business AI OS</p>
              </div>
              {/* Data rows */}
              {tableRows.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-3 px-6 py-5 border-t border-white/5 ${
                    i % 2 === 0 ? "bg-[#111820]" : "bg-[#0d1a4a]/10"
                  }`}
                >
                  <p className="text-white/50 text-sm font-medium">{row.dimension}</p>
                  <p className="text-white/75 text-sm pr-4">{row.openclaw}</p>
                  <p className="text-[#028090] text-sm">{row.aios}</p>
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
                      <span className="text-[#028090] text-xs uppercase tracking-widest">Business AI OS</span>
                      <p className="text-[#028090] text-sm mt-1">{row.aios}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — What a Business AI OS Is */}
      <section className="bg-[#080D11] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="font-black text-3xl md:text-4xl mb-10">
              What a Business AI OS actually is
            </h2>
          </FadeUp>
          <div className="max-w-2xl space-y-6 text-white/75 text-lg leading-relaxed mb-12">
            <FadeUp delay={0.1}>
              <p>
                A Business AI OS is not a tool. It is an operating environment, five connected
                layers built specifically around your business.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p>
                <strong className="text-white">Context.</strong> Everything the AI needs to know about how
                your business actually operates, clients, decisions, priorities, history.{" "}
                <strong className="text-white">Data.</strong> Your real business data, connected live, not
                a generic knowledge base.{" "}
                <strong className="text-white">Intelligence.</strong> AI that understands your goals and
                your current bottleneck, not just your last question.{" "}
                <strong className="text-white">Automate.</strong> Workflows that run without you watching,
                triggered by conditions, not by you remembering to ask.{" "}
                <strong className="text-white">Build.</strong> Custom systems that compound over time as
                your business grows.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p>
                The difference between a tool and a system is that a system compounds. Every layer
                feeds the next. Every decision gets smarter. The business gets more autonomous over
                time, not just once.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="text-white/90">
                There are tools being marketed as OpenClaw alternatives. None of them build the
                system for you, manage it for you, or connect it to your actual business goals.
                That is a different thing entirely.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.5}>
            <Link
              href="/business-ai-operating-system"
              className="rounded-full border border-[#553555] text-white px-8 py-4 hover:bg-[#553555]/20 transition-all duration-300 inline-flex items-center gap-2"
            >
              Learn how a Business AI OS is built
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 6 — FAQ */}
      <section className="bg-[#111820] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="font-black text-3xl md:text-4xl mb-12">
              Questions service business owners are asking
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FaqAccordion items={faqItems} />
          </FadeUp>
        </div>
      </section>

      {/* Section 7 — Final CTA */}
      <section className="relative bg-[#080D11] py-24 md:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#553555]/15 blur-[140px]" />
        </div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <h2 className="font-black text-3xl md:text-5xl mb-6">
              Your instinct was right. There is a better path.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              A Business AI OS is built for exactly this: a service business that runs without
              you being the bottleneck. If you want to know what that actually looks like for
              your business, start with the AIOS page.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <Link
              href="/business-ai-operating-system"
              className="rounded-full bg-[#553555] px-8 py-4 text-white font-semibold hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-300 inline-flex items-center gap-2"
            >
              See how it's built
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
