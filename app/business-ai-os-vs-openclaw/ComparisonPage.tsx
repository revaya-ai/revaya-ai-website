"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────────────────────

const riskCards = [
  {
    num: "01",
    title: "The creator said it is not for you",
    body: 'OpenClaw was not designed for small business owners. OpenClaw founder Peter Steinberger stated explicitly that the product is "not for non-technical users." If you are a business owner without a development background, you are operating outside the intended use case.',
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
    body: "A critical remote code execution flaw (CVE-2026-25253, CVSS 8.8 HIGH) allows exploitation without authentication. A separate vulnerability named ClawJacked lets malicious websites take over a locally running agent via WebSocket — no plugins required, just the base install (Oasis Security, Feb 2026). A supply chain attack called ClawHavoc put malware inside the skill marketplace: 341 infected skills confirmed by Koi.ai (Feb 2026), with a subsequent audit finding 539 across the most popular agents (ClawSecure, Mar 2026). Cisco Talos called OpenClaw a 'security nightmare' after documenting 9 critical vulnerabilities. Over 135,000 exposed instances confirmed on the public internet as of February 12, 2026.*",
  },
  {
    num: "05",
    title: "No strategic layer",
    body: "OpenClaw has memory, but memory is not a strategy. It does not have a built-in concept of your business goals, your bottleneck, or what actually matters this week. It does not know your clients, your constraints, or your current priorities unless you have manually configured that context. You can tell it to send a follow-up email. It does not know that this particular client is three days away from a contract renewal and needs a different message than the template. Without a strategic layer, you automate the wrong things, or create new problems faster than you solve old ones.",
  },
  {
    num: "06",
    title: "Unpredictable costs",
    body: "API bills arrive 30 days after the damage. Agents run 24/7 with no real-time visibility into what they are spending. Documented case: one business owner's monthly bill went from $80 to $2,100 in a single month (Hacker News 2026). There is no kill switch built into the default setup.",
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
    openclaw: "Technical users with development background",
    aios: "Founders of service businesses, no technical background required",
  },
  {
    dimension: "Setup",
    openclaw: "Docker, YAML, VPS or local server — hours to days, often requires a hired engineer",
    aios: "Done for you — I map your workflows, configure the system, and deploy it",
  },
  {
    dimension: "Audit trail",
    openclaw: "No reviewable log by default",
    aios: "Full audit trail — every decision and action recorded and reviewable",
  },
  {
    dimension: "Security model",
    openclaw: "Self-hosted, you own the attack surface and ongoing patches",
    aios: "Managed and monitored — security is not your problem to maintain",
  },
  {
    dimension: "Strategic layer",
    openclaw: "None — executes instructions, no business context or goal awareness",
    aios: "Built in — the system knows your goals, your clients, and what matters this week",
  },
  {
    dimension: "Cost predictability",
    openclaw: "Unpredictable API costs, no kill switch, 30-day billing lag",
    aios: "Fixed scope, transparent cost, no runaway agent spend",
  },
  {
    dimension: "Compounding",
    openclaw: "General-purpose memory only — no built-in business context, goals, or client awareness",
    aios: "Yes — every layer feeds the next, the system gets smarter over time",
  },
  {
    dimension: "Support",
    openclaw: "GitHub issues, Discord, community forum",
    aios: "Direct — I am the person who built your system and I am reachable",
  },
];

const faqItems = [
  {
    q: "Can OpenClaw run a service business?",
    a: "It can run tasks inside a service business, but not the business itself. OpenClaw can send emails, execute scripts, search the web, and manage files. What it cannot do is manage client relationships, make judgment calls about deliverables, or understand what the current priority actually is. Service businesses run on context, judgment, and relationship history. OpenClaw has none of that by default.",
  },
  {
    q: "Is OpenClaw safe for a small business?",
    a: "Not without significant technical investment to harden it. The default setup has no audit trail, no granular permissions, no kill switch, and a documented remote code execution vulnerability (CVE-2026-25253). Cisco, Microsoft, and CrowdStrike have all published formal advisories. The creator has stated it is not intended for non-technical users. If you do not have a developer managing it ongoing, the risk is real and ongoing.",
  },
  {
    q: "Do I need a developer to use OpenClaw?",
    a: "For initial setup, almost certainly. For ongoing management, yes. OpenClaw requires Docker, YAML configuration, and server management. Most non-technical business owners pay a developer to install it. The security and maintenance burden after that stays with the business owner, not the developer.",
  },
  {
    q: "What does OpenClaw cost per month to run?",
    a: "The software is free. The infrastructure is not. You need a server or VPS (typically $10-$50/month), API keys for the AI models you connect (variable, potentially $50-$500+/month depending on usage), and potentially developer time for setup and maintenance. One documented case on Hacker News showed a monthly bill jump from $80 to $2,100 in a single month with no warning.",
  },
  {
    q: "What happens when OpenClaw makes a mistake?",
    a: "There is no default error recovery or audit trail. If OpenClaw sends the wrong email, deletes a file, or takes an action you did not intend, you may not know it happened until the consequences surface. Meta's AI safety director had her entire inbox deleted by an agent despite explicit instructions to confirm before acting. The gap between what you think the agent understood and what it actually executed is where the damage happens.",
  },
  {
    q: "Does OpenClaw have an audit trail?",
    a: "No, not by default. Actions taken by the agent are not logged in a reviewable format out of the box. For a business handling client data, financial information, or sensitive communications, this is a material risk. A Business AI Operating System includes a full audit trail by design — every action is recorded and reviewable.",
  },
  {
    q: "What is a Business AI Operating System?",
    a: "A Business AI Operating System is a five-layer architecture built specifically around your business. The five layers are Context (everything the AI needs to know about your business), Data (your live business data), Intelligence (AI that understands your goals and current bottleneck), Automate (workflows that run without you watching), and Build (custom systems that compound over time). The result is a business that can run without you in the room, with a full audit trail of every decision.",
  },
  {
    q: "Who should use OpenClaw vs. a Business AI Operating System?",
    a: "OpenClaw is suited for technical users, developers, and builders who want a self-hosted AI agent they can customize at the code level. They understand the security tradeoffs and have the background to manage them. A Business AI Operating System is for founders of service businesses who want the same operational autonomy without needing to manage infrastructure, debug YAML, or absorb security vulnerabilities.",
  },
  {
    q: "What is ClawJacked?",
    a: "ClawJacked is a class of attack specific to OpenClaw where a malicious website or document injects instructions into your agent's context, hijacking its behavior without your knowledge. Because OpenClaw can access your email, files, and browser, a successful ClawJacked attack can exfiltrate data, send messages on your behalf, or execute commands. It was documented in early 2026 and no default protection exists in the standard OpenClaw setup.",
  },
  {
    q: "What is NanoClaw and how is it different from OpenClaw?",
    a: "NanoClaw is a lighter, faster version of the OpenClaw runtime designed to run on lower-resource environments, including local machines and edge devices. It trades some capability for speed and reduced compute cost. The core architecture — including the lack of an audit trail, the absence of a strategic layer, and the self-hosted security model — is the same. NanoClaw is faster. The fundamental limitations for service businesses are unchanged.",
  },
  {
    q: "Is OpenClaw free?",
    a: "The software is open source and free to download. Running it is not free. You need server infrastructure, API keys for connected AI models, and typically developer time for setup and ongoing maintenance. The total monthly cost for a non-technical business owner using OpenClaw in production is typically $200-$600/month minimum, plus developer hours, and can spike significantly higher with uncapped agent activity.",
  },
  {
    q: "Does OpenClaw work with WhatsApp and Telegram?",
    a: "Yes, that is part of its appeal. OpenClaw is designed to receive commands through WhatsApp or Telegram and execute them — sending messages, running tasks, controlling your browser — from a messaging interface you already use. The setup that makes that work requires a self-hosted server, API keys, and Docker configuration. The interface is familiar. The infrastructure behind it is not.",
  },
  {
    q: "Can OpenClaw access my email and files?",
    a: "Yes, and that is the point — and the risk. OpenClaw is built to take real actions, including reading and sending email, opening and editing files, and running terminal commands. That level of access is what makes it powerful and what makes the absence of an audit trail significant. There is no granular permissions layer by default. If OpenClaw can do it, it will do it when told to.",
  },
  {
    q: "How long does it take to set up OpenClaw?",
    a: "For a technical user who knows Docker and can configure YAML, setup takes several hours to a day. For a non-technical business owner, setup typically requires hiring a developer, which adds cost and time. Most non-technical users report spending one to three days just getting the base installation stable, before any business-specific configuration begins. Ongoing maintenance is separate from initial setup.",
  },
  {
    q: "I already tried OpenClaw — can a Business AI Operating System replace what I built?",
    a: "Yes, and in most cases it would replace it with something better structured. If you built automations in OpenClaw, those workflows exist because there was a real need. A Business AI Operating System starts with mapping those needs properly — understanding your actual bottlenecks, your data, your decision patterns — and then building around them with a full audit trail and strategic layer. Nothing gets thrown away. The logic gets rebuilt on a foundation that does not require you to maintain it.",
  },
];

// ─── FadeUp helper ──────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Shared styles ──────────────────────────────────────────────────────────

const eyebrow: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "2.5px",
  textTransform: "uppercase",
  color: "#028090",
  marginBottom: "20px",
  fontFamily: "'Proxima Nova', 'Inter', sans-serif",
};

const eyebrowCoral: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "2.5px",
  textTransform: "uppercase",
  color: "#F45B69",
  marginBottom: "16px",
  fontFamily: "'Proxima Nova', 'Inter', sans-serif",
};

const divider: React.CSSProperties = {
  height: "1px",
  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
};

// All headings must use Montserrat — body font is Proxima Nova
const hdg: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ComparisonPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <main style={{ fontFamily: "'Proxima Nova', 'Inter', sans-serif", background: "#080D11", color: "#fff" }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-content { padding: 100px 24px 60px !important; }
          .section-split { flex-direction: column !important; min-height: auto !important; }
          .split-image-col { width: 100% !important; height: 280px !important; }
          .split-text-col { padding: 48px 24px !important; flex: none !important; width: 100% !important; }
          .split-copy-col { width: 100% !important; padding: 48px 24px !important; }
          .split-image-right { height: 300px !important; flex: none !important; width: 100% !important; }
          .split-cta-col { padding: 48px 24px !important; flex: none !important; width: 100% !important; }
          .section-header { padding: 0 24px !important; }
          .pullquote-block { padding: 24px !important; }
          .risk-grid { grid-template-columns: 1fr !important; padding: 24px 16px 48px !important; }
          .citation-block { padding: 0 16px 40px !important; }
          .assessment-cta { padding: 48px 24px !important; }
          .section-table { padding: 64px 16px !important; }
          .section-faq { padding: 64px 16px !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .table-desktop { display: none !important; }
          .table-mobile { display: flex !important; }
          .mobile-h2 { font-size: 26px !important; }
        }
      `}</style>

      {/* ── SECTION 1 — HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "720px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#080D11",
        }}
      >
        <Image
          src="/comparison/hero-option-a.png"
          alt="OpenClaw vs Business AI Operating System — what service business owners need to know"
          title="OpenClaw vs Business AI OS comparison for service business founders"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
          priority
          fetchPriority="high"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(8,13,17,0.82) 0%, rgba(8,13,17,0.60) 50%, rgba(8,13,17,0.75) 100%)",
          }}
        />
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "860px",
            padding: "140px 60px 80px",
          }}
        >
          <FadeUp delay={0.1}>
            <p style={eyebrow}>Business AI OS vs OpenClaw</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1
              style={{
                ...hdg,
                fontSize: "clamp(36px, 4.5vw, 58px)",
                fontWeight: 900,
                lineHeight: 1.08,
                marginBottom: "20px",
              }}
            >
              Business AI Operating System vs OpenClaw:
              <br />
              <span style={{ color: "#F45B69" }}>What Service Business Owners Need to Know</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.35}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "#fff",
                marginBottom: "0px",
                maxWidth: "884px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              You already tried the tools. You became the one connecting them all. Every workflow
              still touched your calendar. Every decision still ran through you. OpenClaw caught
              your attention because it promised to change that. The problem is not the promise.
              It is the gap between that demo and what actually happens when you run it on a real
              business. Here is that gap, laid out plainly.
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 2 — THE APPEAL ── */}
      <section
        className="section-split"
        style={{
          background: "#0A1118",
          display: "flex",
          alignItems: "stretch",
          minHeight: "640px",
        }}
      >
        {/* Image column */}
        <div
          className="split-image-col"
          style={{
            width: "50%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/comparison/appeal-openclaw.png"
            alt="OpenClaw AI agent controlling business apps via WhatsApp — why 247,000 developers starred it on GitHub"
            title="OpenClaw AI agent: why 247,000 developers and business owners starred it on GitHub"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
            loading="lazy"
            decoding="async"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, #0A1118 0%, transparent 20%)",
            }}
          />
        </div>
        {/* Text column */}
        <div
          className="split-text-col"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "96px 80px",
          }}
        >
          <div>
            <FadeUp>
              <p style={eyebrow}>What OpenClaw is</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="mobile-h2"
                style={{
                  ...hdg,
                  fontSize: "36px",
                  fontWeight: 900,
                  marginBottom: "36px",
                  lineHeight: 1.1,
                }}
              >
                What OpenClaw Is and Why It Went Viral
              </h2>
            </FadeUp>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <FadeUp delay={0.15}>
                <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#fff" }}>
                  OpenClaw is not one AI assistant. It is a self-hosted framework for running a
                  network of AI agents, each built around a specific task. You install Skills, which
                  are specialized agents that handle email, browser control, file management,
                  messaging, terminal commands. They work together, chain across your systems, and
                  execute without you being in the room. All from WhatsApp or Telegram.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#fff" }}>
                  The appeal landed fast. 60,000 GitHub stars in 72 hours. More stars than Linux.
                  Jensen Huang called it &ldquo;the most popular open-source project in the history
                  of humanity&rdquo; from the GTC stage in March 2026. That does not happen without
                  a genuinely compelling idea.
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#fff" }}>
                  Here is what happened next. Non-technical founders, marketers, and business owners
                  saw the demos and showed up in numbers the creator did not expect. Business owners
                  were hiring developers to set it up. People were paying engineers just to get the
                  install working. OpenClaw went viral with an audience it was never designed for.
                  The creator built it for developers. He has since joined OpenAI and handed the
                  project to a community foundation. That means no single person is responsible for
                  what happens next. No owner. No roadmap. Security patches happen when a volunteer
                  shows up. The system millions of people pointed at their business data is now a
                  free-for-all.
                </p>
              </FadeUp>
              <FadeUp delay={0.28}>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#fff",
                    borderLeft: "3px solid #028090",
                    paddingLeft: "20px",
                  }}
                >
                  You were imagining something specific. Client emails handled. Follow-ups sent.
                  Documents organized. Your calendar protected. That is not a fantasy. That is an
                  operational architecture problem. And it has a real solution, just not this one.
                  A business that only works when you do is not an asset. It is a job with overhead.
                  Here is what the demos did not show you.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 3 — RISKS ── */}
      <section style={{ background: "#080D11", paddingTop: "96px" }}>
        {/* Header */}
        <div className="section-header" style={{ padding: "0 80px", marginBottom: "40px" }}>
          <FadeUp>
            <p style={eyebrowCoral}>Where it breaks</p>
            <h2 className="mobile-h2" style={{ ...hdg, fontSize: "38px", fontWeight: 900, marginBottom: "14px" }}>
              OpenClaw Security Risks Service Businesses Should Know
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontSize: "17px", color: "#fff", marginBottom: "32px" }}>
              These are not theoretical concerns. Even the people who built AI safety systems at
              Meta ran into them.
            </p>
          </FadeUp>
        </div>

        {/* Pull quote — full width */}
        <FadeUp delay={0.15}>
          <div
            className="pullquote-block"
            style={{
              background: "rgba(244,91,105,0.08)",
              borderLeft: "3px solid #F45B69",
              padding: "32px 80px",
            }}
          >
            <blockquote
              style={{
                fontSize: "18px",
                fontStyle: "italic",
                color: "#fff",
                lineHeight: 1.6,
                marginBottom: "10px",
              }}
            >
              &ldquo;If an AI security researcher could run into this problem, what hope do mere
              mortals have?&rdquo;
            </blockquote>
            <cite
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#F45B69",
                fontStyle: "normal",
              }}
            >
              TechCrunch, Feb 23, 2026
            </cite>
          </div>
        </FadeUp>

        {/* Risk image — full width */}
        <FadeUp delay={0.2}>
          <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
            <Image
              src="/comparison/section3-risk.png"
              alt="OpenClaw security risk: 135,000 instances publicly exposed with no authentication — Shodan scan, 2026"
              title="OpenClaw security exposure: over 135,000 instances publicly accessible, no authentication required"
              width={1440}
              height={440}
              style={{ width: "100%", display: "block", maxHeight: "440px", objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
              loading="lazy"
              decoding="async"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, #080D11 100%)",
              }}
            />
          </div>
        </FadeUp>

        {/* Risk cards — 3 columns */}
        <div
          className="risk-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
            padding: "40px 80px 80px",
            background: "#080D11",
          }}
        >
          {riskCards.map((card, i) => (
            <FadeUp key={card.num} delay={0.1 + i * 0.05}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: "2px solid #F45B69",
                  borderRadius: "12px",
                  padding: "24px",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "3px",
                    color: "#F45B69",
                    marginBottom: "10px",
                  }}
                >
                  {card.num}
                </p>
                <h3
                  style={{
                    ...hdg,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#fff" }}>{card.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Citation */}
        <div className="citation-block" style={{ padding: "0 80px 40px", background: "#080D11" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>
            Sources: TechCrunch (Julie Bort, Feb 23, 2026) — The Hacker News (Ravie Lakshmanan, Feb
            28, 2026) — Oasis Security ClawJacked Research (Feb 2026) — Cisco Talos (Jan 28, 2026)
            — SecurityScorecard STRIKE Team (Feb 11, 2026) — Bitdefender (Feb 12, 2026) — Bitsight
            Research (Feb 9, 2026) — Infosecurity Magazine (Feb 9, 2026) — Koi.ai ClawHavoc Report
            (Feb 1, 2026) — ClawSecure Audit (Mar 17, 2026) — Antiy CERT (Feb 6, 2026) —
            CVE-2026-25253 (NVD) — Hacker News
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.5px", marginTop: "6px" }}>
            * Exposed instance counts varied by research firm and scan date: 30,000+ (Bitsight, Jan
            27–Feb 8), 40,214 (SecurityScorecard, Feb 9), 135,000+ (Bitdefender/SecurityScorecard,
            Feb 12). Numbers rose rapidly as deployment accelerated.
          </p>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 4 — WHAT A BUSINESS AI OPERATING SYSTEM IS ── */}
      <section
        className="section-split"
        style={{
          background: "#080D11",
          display: "flex",
          alignItems: "stretch",
          minHeight: "720px",
        }}
      >
        {/* Copy column */}
        <div
          className="split-copy-col"
          style={{
            width: "50%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "96px 80px 96px 36px",
          }}
        >
          <FadeUp>
            <p style={eyebrow}>What a Business AI Operating System actually is</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="mobile-h2"
              style={{
                ...hdg,
                fontSize: "38px",
                fontWeight: 900,
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              What Is a Business AI Operating System?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              style={{
                fontSize: "17px",
                color: "#fff",
                marginBottom: "40px",
                lineHeight: 1.6,
              }}
            >
              Here is what OpenClaw does not have: a strategic layer. A layer that knows
              your goals, your bottleneck, your clients, your decisions. Without it, you have
              a capable agent and no way to tell it what actually matters. A Business AI OS
              is five connected layers, and the strategic layer is what makes the rest of it
              worth building.
            </p>
          </FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#fff" }}>
                The difference between a tool and a system is that a system compounds. Every
                layer feeds the next. Every decision gets smarter. The business gets more
                autonomous over time, not just once.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#fff",
                  borderLeft: "3px solid #553555",
                  paddingLeft: "20px",
                }}
              >
                I spent 18 years as a digital product manager. Virgin Mobile, Boost Mobile,
                Papa Murphy&apos;s, Intermedia. I have managed systems at scale. I know what
                breaks when there is no strategic layer underneath.
                <br /><br />
                I&apos;ve seen OpenClaw alternatives floating around. The cloud wrappers, the
                managed platforms, the no-code builders. They handle the hosting. Some handle the
                setup. None of them map your actual workflows, connect to your real goals, keep
                you focused on the one priority that matters most, or build something that
                compounds over time.
                <br /><br />
                That is what I do. It is a different thing entirely.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.3}>
            <Link
              href="/business-ai-operating-system"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#028090",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'Proxima Nova', 'Inter', sans-serif",
              }}
            >
              See how it&apos;s built <span>→</span>
            </Link>
          </FadeUp>
        </div>

        {/* Image + layer labels column */}
        <div className="split-image-right" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Image
            src="/comparison/aios-layers.png"
            alt="Business AI Operating System five-layer architecture: Context, Data, Intelligence, Automate, Build"
            title="Business AI Operating System five-layer architecture for founder-led service businesses"
            fill
            style={{ objectFit: "cover", objectPosition: "center right", transform: "translateX(18%)" }}
            sizes="50vw"
            loading="lazy"
            decoding="async"
          />
          {/* Fade from left */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #080D11 0%, rgba(8,13,17,0.75) 28%, transparent 52%)",
              zIndex: 1,
            }}
          />
          {/* Layer labels */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "space-around",
              padding: "8% 52% 8% 6%",
              pointerEvents: "none",
            }}
          >
            {aiosLayers.map((layer, i) => (
              <FadeUp key={layer.name} delay={0.1 + i * 0.08} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#028090",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(2,128,144,0.8)",
                    marginTop: "4px",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {layer.name}
                  </span>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: 400, lineHeight: 1.4 }}>
                    {layer.desc}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── AIOS ASSESSMENT CTA BLOCK ── */}
      <div
        className="assessment-cta"
        style={{
          background: "#080D11",
          padding: "56px 80px 80px",
          textAlign: "center",
        }}
      >
        <FadeUp>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#028090",
              marginBottom: "20px",
            }}
          >
            See if a Business AI Operating System fits your business
          </p>
          <Link
            href="/business-ai-os-assessment"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#553555",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Take the Assessment <span>→</span>
          </Link>
        </FadeUp>
      </div>

      <div style={divider} />

      {/* ── SECTION 5 — COMPARISON TABLE ── */}
      <section
        className="section-table"
        style={{
          background: "#0A1118",
          padding: "96px 80px",
          textAlign: "center",
        }}
      >
        <FadeUp>
          <p style={eyebrow}>Side by side</p>
          <h2 className="mobile-h2" style={{ ...hdg, fontSize: "38px", fontWeight: 900, marginBottom: "12px" }}>
            OpenClaw vs. Business AI Operating System: Full Comparison
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p style={{ fontSize: "17px", color: "#fff", marginBottom: "48px" }}>
            The same promise. Different architecture.
          </p>
        </FadeUp>

        {/* Desktop table */}
        <FadeUp delay={0.15}>
          <div
            className="table-desktop"
            style={{
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <caption
                style={{
                  captionSide: "top",
                  textAlign: "left",
                  padding: "0 0 16px 0",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'Proxima Nova', 'Inter', sans-serif",
                }}
              >
                Comparison: OpenClaw vs Business AI Operating System for Service Businesses
              </caption>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "20px 24px",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "left",
                      color: "rgba(255,255,255,0.4)",
                      width: "18%",
                    }}
                  />
                  <th
                    style={{
                      padding: "20px 24px",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                      color: "#F45B69",
                      background: "rgba(244,91,105,0.14)",
                    }}
                  >
                    OpenClaw
                  </th>
                  <th
                    style={{
                      padding: "20px 24px",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                      color: "#028090",
                      background: "rgba(2,128,144,0.14)",
                    }}
                  >
                    Business AI Operating System
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.dimension}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <td
                      style={{
                        padding: "18px 24px",
                        verticalAlign: "top",
                        fontWeight: 700,
                        fontSize: "12px",
                        letterSpacing: "1px",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        textAlign: "left",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.dimension}
                    </td>
                    <td
                      style={{
                        padding: "18px 24px",
                        verticalAlign: "top",
                        color: "#fff",
                        lineHeight: 1.5,
                        background: "rgba(244,91,105,0.06)",
                        textAlign: "left",
                      }}
                    >
                      {row.openclaw}
                    </td>
                    <td
                      style={{
                        padding: "18px 24px",
                        verticalAlign: "top",
                        color: "#fff",
                        lineHeight: 1.5,
                        background: "rgba(2,128,144,0.06)",
                        textAlign: "left",
                      }}
                    >
                      {row.aios}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Mobile stacked cards — hidden on desktop */}
        <div
          className="table-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {tableRows.map((row) => (
            <div
              key={row.dimension}
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {row.dimension}
              </div>
              <div
                style={{
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(244,91,105,0.2)",
                  background: "rgba(244,91,105,0.05)",
                }}
              >
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#F45B69", marginBottom: "6px" }}>OpenClaw</p>
                <p style={{ fontSize: "15px", color: "#fff", lineHeight: 1.5 }}>{row.openclaw}</p>
              </div>
              <div
                style={{
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(2,128,144,0.2)",
                  background: "rgba(2,128,144,0.05)",
                }}
              >
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#028090", marginBottom: "6px" }}>Business AI OS</p>
                <p style={{ fontSize: "15px", color: "#fff", lineHeight: 1.5 }}>{row.aios}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 6 — FAQ ── */}
      <section
        className="section-faq"
        style={{
          background: "#0A1118",
          padding: "96px 80px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <FadeUp>
            <p style={eyebrow}>Common questions</p>
            <h2 className="mobile-h2" style={{ ...hdg, fontSize: "38px", fontWeight: 900 }}>
              OpenClaw FAQ: Common Questions from Small Business Owners
            </h2>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div
            className="faq-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 48px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {faqItems.map((item, i) => (
              <div
                key={item.q}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "24px 0",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#028090",
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#fff", paddingBottom: "24px" }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      <div style={divider} />

      {/* ── SECTION 7 — FINAL CTA ── */}
      <section
        className="section-split"
        style={{
          background: "#080D11",
          display: "flex",
          alignItems: "stretch",
          minHeight: "600px",
        }}
      >
        {/* Image column */}
        <div
          className="split-image-col"
          style={{
            width: "50%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/comparison/cta-clarity.png"
            alt="Business AI Operating System: replacing fragmented tools with a structured alternative to OpenClaw"
            title="Business AI Operating System: from founder bottleneck to business autonomy"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
            loading="lazy"
            decoding="async"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, #080D11 0%, transparent 25%)",
              zIndex: 1,
            }}
          />
        </div>

        {/* Copy column */}
        <div
          className="split-cta-col"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "96px 80px",
          }}
        >
          <FadeUp>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#028090",
                marginBottom: "20px",
              }}
            >
              Stop being the business. Start owning one.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="mobile-h2"
              style={{
                ...hdg,
                fontSize: "42px",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "28px",
              }}
            >
              You were right to pause.
              <br />
              Now here is the next move.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.75,
                color: "#fff",
                marginBottom: "36px",
              }}
            >
              I build Business AI Operating Systems for founders of service businesses who want
              the autonomy OpenClaw promised, without the security exposure, the technical
              complexity, or the guesswork. The starting point is an Audit. I map every place
              the business runs through you, show you exactly what a Business AI Operating System would change,
              and you decide if it makes sense. If it does, the Audit fee comes off your build.
              If it does not, you keep the map.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link
              href="/work-with-me"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#553555",
                color: "#fff",
                padding: "16px 32px",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              See if it&apos;s a fit <span>→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}
