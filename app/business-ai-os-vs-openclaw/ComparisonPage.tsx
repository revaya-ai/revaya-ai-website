"use client";

import { useRef } from "react";
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
    q: "Can OpenClaw run a service business?",
    a: "OpenClaw can automate individual tasks, email management, file organization, web research, but it has no strategic layer. It does what you tell it to do, not what your business actually needs. Without a system that connects your goals, your data, and your workflows, you end up automating the wrong things or creating new problems faster than you solve old ones.",
  },
  {
    q: "Is OpenClaw safe for a small business?",
    a: "OpenClaw has active security vulnerabilities as of early 2026, including a critical remote code execution flaw (CVE-2026-25253), a WebSocket hijacking vulnerability called ClawJacked, and 341 confirmed malicious skills on its ClawHub marketplace. Microsoft, Cisco, and CrowdStrike have all published security advisories. For non-technical service business owners handling client data, the risk is significant.",
  },
  {
    q: "Do I need a developer to use OpenClaw?",
    a: "OpenClaw requires Docker, YAML configuration, VPS or local server setup, API key management, and ongoing security hardening. It was designed for technical operators. In practice, non-technical business owners are paying engineers to install it for them, but the ongoing security burden still falls on the operator.",
  },
  {
    q: "What does OpenClaw cost per month to run?",
    a: "Running OpenClaw costs approximately $25 to $50 per month for light-to-moderate use. That does not include engineer fees many non-technical users pay for installation. API costs can spike significantly with no real-time visibility. Documented cases show monthly bills going from $80 to over $2,100 in a single month when agents run unchecked.",
  },
  {
    q: "What happens when OpenClaw makes a mistake?",
    a: "There is no audit trail in OpenClaw by default. Actions taken by the agent are not logged in a reviewable format. If something goes wrong, a file deleted, an email sent, data exfiltrated, you may not know it happened until the damage is done.",
  },
  {
    q: "Does OpenClaw have an audit trail?",
    a: "No. OpenClaw does not log agent actions in a reviewable format by default. If the agent deletes a file, sends an email, or accesses data it should not have, there is no record you can trace. A Business AI Operating System is built on full transparency: every decision is visible, every action is logged, and nothing happens without a reason you can follow.",
  },
  {
    q: "What is a Business AI OS?",
    a: "A Business AI Operating System is a structured operating environment built specifically around a founder-led business. It is five connected layers: Context, Data, Intelligence, Automate, and Build. It is designed and implemented by a specialist, auditable at every layer, and built to compound over time.",
  },
  {
    q: "Who should use OpenClaw vs. a Business AI OS?",
    a: "OpenClaw is built for technical operators, developers, engineers, and IT professionals comfortable managing servers, YAML config, and security hardening. A Business AI Operating System is built for founders of service businesses who want autonomous AI without the technical complexity, security exposure, or strategic guesswork.",
  },
  {
    q: "What is ClawJacked?",
    a: "ClawJacked is a vulnerability in OpenClaw where a malicious website can send hidden instructions to your agent through the browser, causing it to take actions without your knowledge or consent. It was disclosed in early 2026. It is the reason Cisco, Microsoft, and CrowdStrike all issued separate security advisories within weeks of each other.",
  },
  {
    q: "What is NanoClaw and how is it different from OpenClaw?",
    a: "NanoClaw is a security-focused fork of OpenClaw built in 2026 specifically because OpenClaw's security problems could not be patched. It is a technically cleaner product. It is still a developer product. NanoClaw does not solve the non-technical founder's problem, it just solves the security problem for operators who were already technical.",
  },
  {
    q: "Is OpenClaw free?",
    a: "OpenClaw is open-source and free to install. Running it is not free. You need a server ($5 to $20 per month), API keys for the AI models it connects to (typically $15 to $35 per month), and for most non-technical business owners, a developer to configure it. API costs can scale without warning.",
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
  return (
    <main style={{ fontFamily: "'Proxima Nova', 'Inter', sans-serif", background: "#080D11", color: "#fff" }}>

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
          alt="Business AI Operating System vs OpenClaw — what service business owners need to know"
          title="Business AI OS vs OpenClaw comparison for service business founders"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
          priority
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
                marginBottom: "28px",
              }}
            >
              Business AI OS vs OpenClaw:
              <br />
              <span style={{ color: "#F45B69" }}>What Service Business Owners Need to Know</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
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
        style={{
          background: "#0A1118",
          display: "flex",
          alignItems: "stretch",
          minHeight: "640px",
        }}
      >
        {/* Image column */}
        <div
          style={{
            width: "50%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/comparison/appeal-openclaw.png"
            alt="OpenClaw AI agent controlling business apps via WhatsApp and Telegram — the appeal that drove 247,000 GitHub stars"
            title="OpenClaw AI agent: why 247,000 developers and business owners starred it on GitHub"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
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
                  OpenClaw is a self-hosted AI agent that actually does things. Not just answers,
                  things. It runs terminal commands, controls your browser, manages email, sends
                  messages, reads and writes files. All from WhatsApp or Telegram, while you are
                  doing something else.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#fff" }}>
                  The appeal is real. A business that runs itself, through apps you already use,
                  without a subscription. More GitHub stars than Linux. That does not happen without
                  a genuinely compelling idea.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
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
        <div style={{ padding: "0 80px", marginBottom: "40px" }}>
          <FadeUp>
            <p style={eyebrowCoral}>Where it breaks</p>
            <h2 style={{ ...hdg, fontSize: "38px", fontWeight: 900, marginBottom: "14px" }}>
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
              alt="135,000 exposed OpenClaw instances on the public internet — a critical security risk for service businesses"
              title="OpenClaw security exposure: over 135,000 instances publicly accessible, no authentication required"
              width={1440}
              height={440}
              style={{ width: "100%", display: "block", maxHeight: "440px", objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
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
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#fff" }}>{card.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Citation */}
        <div style={{ padding: "0 80px 40px", background: "#080D11" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>
            Sources: TechCrunch, Cisco Security, Microsoft Security Blog, CrowdStrike,
            CVE-2026-25253, Hacker News
          </p>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 4 — WHAT A BUSINESS AI OPERATING SYSTEM IS ── */}
      <section
        style={{
          background: "#080D11",
          display: "flex",
          alignItems: "stretch",
          minHeight: "720px",
        }}
      >
        {/* Copy column */}
        <div
          style={{
            width: "50%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "96px 80px",
          }}
        >
          <FadeUp>
            <p style={eyebrow}>What a Business AI Operating System actually is</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
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
              Not a tool. An operating environment. Five connected layers built specifically
              around your business.
            </p>
          </FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#fff" }}>
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
                Papa Murphy&apos;s, Intermedia. I have built systems at scale and watched founders
                stay trapped inside their own businesses because no system was ever built around
                them specifically. I have looked at everything being marketed as an OpenClaw
                alternative. The cloud wrappers, the managed platforms, the no-code builders.
                They handle the hosting. Some handle the setup. None of them map your actual
                workflows, connect to your real goals, or build something that compounds over time.
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
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Image
            src="/comparison/aios-layers.png"
            alt="Five-layer Business AI Operating System architecture: Context, Data, Intelligence, Automate, Build — each layer feeding the next"
            title="Business AI Operating System five-layer architecture for founder-led service businesses"
            fill
            style={{ objectFit: "cover", objectPosition: "center right", transform: "translateX(8%)" }}
            sizes="50vw"
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
        style={{
          background: "#0A1118",
          padding: "96px 80px",
          textAlign: "center",
        }}
      >
        <FadeUp>
          <p style={eyebrow}>Side by side</p>
          <h2 style={{ ...hdg, fontSize: "38px", fontWeight: 900, marginBottom: "12px" }}>
            OpenClaw vs. Business AI Operating System: Full Comparison
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p style={{ fontSize: "17px", color: "#fff", marginBottom: "48px" }}>
            The same promise. Different architecture.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            style={{
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
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
      </section>

      <div style={divider} />

      {/* ── SECTION 6 — FAQ ── */}
      <section
        style={{
          background: "#0A1118",
          padding: "96px 80px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <FadeUp>
            <p style={eyebrow}>Common questions</p>
            <h2 style={{ ...hdg, fontSize: "38px", fontWeight: 900 }}>
              OpenClaw FAQ: Common Questions from Small Business Owners
            </h2>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px 48px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {faqItems.map((item) => (
              <div
                key={item.q}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  paddingBottom: "32px",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "12px",
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </p>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#fff" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      <div style={divider} />

      {/* ── SECTION 7 — FINAL CTA ── */}
      <section
        style={{
          background: "#080D11",
          display: "flex",
          alignItems: "stretch",
          minHeight: "600px",
        }}
      >
        {/* Image column */}
        <div
          style={{
            width: "50%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/comparison/cta-clarity.png"
            alt="From a chaotic tangle of disconnected tools to a clear, structured Business AI Operating System"
            title="Business AI Operating System: from founder bottleneck to business autonomy"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
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
              the business runs through you, show you exactly what a Business AI OS would change,
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
