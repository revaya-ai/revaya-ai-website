"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Style Constants ────────────────────────────────────────────────────────

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
  ...eyebrow,
  color: "#F45B69",
  marginBottom: "16px",
};

const divider: React.CSSProperties = {
  height: "1px",
  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
};

const hdg: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };

// ─── Data ───────────────────────────────────────────────────────────────────

const ceilingCards = [
  {
    num: "01",
    title: "THE TERMINAL REQUIREMENT",
    body: "Claude Code runs in a terminal. That is not a flaw — for founders who are comfortable there, it is actually the right environment for serious AI work. The ceiling is that most non-technical service business owners will not cross that threshold. And for those who do, the work is just beginning: CLI calendar tools, terminal email clients, scriptable task management. One consulting founder described his setup as 'making my workflow command line based so CC can work it.' That is a full workflow redesign, not a tool you add.",
  },
  {
    num: "02",
    title: "YOUR CONTEXT LAYER IS YOUR RESPONSIBILITY",
    body: "Your business brain works as long as it reflects your actual business. New offer, new client, changed priorities — every shift creates drift between what your context files say and what is true. You can build that layer as a single CLAUDE.md or as a structured folder system with dozens of files. Either way, keeping it current is ongoing founder work. Nobody else can do it for you until the system is stable enough to hand off. Nobody teaches what happens when it drifts.",
  },
  {
    num: "03",
    title: "EVERY INTEGRATION IS A MANUAL BUILD",
    body: "Claude Code can automate workflows — and people are doing it. The ceiling is not capability, it is ownership. Calendar, email, CRM, meeting transcripts: each connection is a separate MCP server you set up, test, and maintain. One consulting founder needed four separate CLI tools just to handle calendar and email for one person. When a tool updates, the integration can break. Who fixes it? You. The ceiling is not what it can do. It is who owns it when something changes.",
  },
  {
    num: "04",
    title: "REACTIVE, NOT AUTONOMOUS",
    body: "Claude Code now has remote access — you can use it from anywhere. What it cannot do is act without you. It is reactive: you prompt, it responds. A service business needs systems that trigger without a human starting them. Intake that processes while you sleep. Follow-ups that fire while you are with a client. Reporting that runs on schedule. That is the distinction: reactive tool vs. autonomous system. Both are useful. They solve different problems.",
  },
  {
    num: "05",
    title: "THE MAINTENANCE BURDEN COMPOUNDS",
    body: "The DIY setup starts as one person's project and stays that way. Context engineering, MCP configuration, integration maintenance, prompt tuning — each layer you add is a layer you own. Early on, that feels manageable. Six months in, the system needs updating, something broke on the last Claude Code release, and you are the only person who knows how it works. The ceiling is not capability. It is what happens to your time as the system grows.",
  },
];

const tableRows = [
  {
    dimension: "Designed for",
    claudeCode:
      "Founders with CLI comfort who want to build and maintain their own system. Best results require technical background and sustained time investment.",
    aios: "Founders of service businesses, agencies, and consultancies who want the outcome without owning the build.",
  },
  {
    dimension: "Setup required",
    claudeCode:
      "Terminal environment, MCP servers, Obsidian vault, each external integration configured and tested manually.",
    aios: "Professionally designed and implemented around your specific business workflows and data.",
  },
  {
    dimension: "Context maintenance",
    claudeCode:
      "Your ongoing job. Context drifts as your business changes. Updating it is founder work at whatever scale you build to.",
    aios: "Built into the system by design. Every session, every decision, every engagement compounds the context automatically. It gets smarter without your attention.",
  },
  {
    dimension: "Runs when you're away",
    claudeCode:
      "You can access it remotely, but it waits for you. No autonomous triggers. Intake, follow-ups, and reporting require a human prompt to start.",
    aios: "Triggered workflows run on schedule and on condition, without a human prompt. Manage from anywhere via Telegram. The system runs whether you are there or not.",
  },
  {
    dimension: "Audit trail",
    claudeCode:
      "Terminal output exists, but no structured log of what ran, why, or what changed. Reconstructing decisions means reading conversation history.",
    aios: "Every decision visible. Every action logged. End-of-day reflections surface what the system worked on. Weekly recaps show progress across the full week. Nothing happens without a traceable record.",
  },
  {
    dimension: "Maintenance responsibility",
    claudeCode:
      "You own it. MCP changes, tool updates, broken integrations — diagnosis and fixes are the founder's job or they stay broken.",
    aios: "Covered. When something changes or breaks, that is not your problem.",
  },
  {
    dimension: "Breaks on updates",
    claudeCode:
      "CLI tools, MCP protocol changes, Obsidian plugins — any can break a workflow. Timeline to fix depends on your availability.",
    aios: "Covered. Updates, breaks, and extensions are handled without your involvement.",
  },
  {
    dimension: "Compounding",
    claudeCode:
      "Partially. Context and automation compound only if the founder actively maintains and expands the system.",
    aios: "Yes. Every session, every decision, and every engagement accumulates. The system gets more capable without requiring your time to make it happen.",
  },
];

const faqItems = [
  {
    question: "What is the difference between Claude Code and a Business AI OS?",
    answer:
      "Claude Code is a terminal-based AI assistant that can be configured to help with business tasks through CLAUDE.md files and MCP server integrations. A Business AI OS is a professionally designed operating environment — five connected layers (Context, Data, Intelligence, Automate, Build) built around a specific business's goals, workflows, and data. Claude Code is a personal productivity tool. A Business AI OS is business infrastructure.",
  },
  {
    question: "Can I run my consulting business with Claude Code if I don't know how to code?",
    answer:
      "Technically yes — but in practice, the setup requires a command-line environment, CLAUDE.md configuration, MCP server setup, and individual integrations for each external tool (calendar, email, CRM). One founder described his setup: 'My key idea is that CC can run CLI tools. If I make my workflow command line based, CC can work it.' That is the honest prerequisite. Founders in the AI automation community report 8 months to reach competence with these systems.",
  },
  {
    question: "How long does it take to set up a working AI system for a service business using Claude Code?",
    answer:
      "The most honest data point available: founders in the AI automation community report 8 months to competence. That covers the CLAUDE.md setup, MCP server configuration, external integrations, and agent skills for specific workflows. For technically-inclined people who are actively building. For non-technical service business owners, the timeline is longer — or the work stalls before completion.",
  },
  {
    question: "What happens to my Claude Code setup when I go on vacation?",
    answer:
      "It stops. The DIY Claude Code + Obsidian setup runs in the founder's terminal, on the founder's machine. When you close the laptop, the system goes dormant. There is no intake processing, no lead qualification, no follow-up, no reporting. Away-from-desk autonomy — the metric that actually matters for a service business — is zero in a standard DIY setup.",
  },
  {
    question: "What is context engineering and do I need to learn it?",
    answer:
      "Context engineering is the discipline of structuring the information an AI has access to so it can do useful work consistently. In a Claude Code setup, this means maintaining the CLAUDE.md file, organizing your Obsidian vault, and keeping both current as your business changes. It is the core skill required for the DIY approach to work long-term. It requires ongoing effort to maintain — not just initial setup.",
  },
  {
    question: "Is the CLAUDE.md file approach enough for a small service business?",
    answer:
      "For a solo founder with technical comfort, moderate business complexity, and time to maintain the system — it can be enough at first. The ceiling appears when the business grows, adds team members, or needs the system to run without the founder's active involvement. The CLAUDE.md approach requires the founder to update it every time business context changes. That maintenance burden compounds over time.",
  },
  {
    question: "What does a Business AI OS actually do that Claude Code + Obsidian doesn't?",
    answer:
      "Three things. First, it runs without the founder at the terminal — intake, qualification, follow-up, and reporting continue 24/7. Second, it is built on live business data — actual CRM records, email, meetings, forms — not notes about the business. Third, it is maintained by a specialist. When a tool updates, breaks, or needs to be extended, that is covered. The founder uses the system. They do not build or repair it.",
  },
];

// ─── FadeUp Component ───────────────────────────────────────────────────────

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

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ClaudeCodeComparisonPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ background: "#080D11", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-content { padding: 100px 24px 60px !important; }
          .section-appeal { padding: 64px 24px !important; }
          .section-header { padding: 0 24px !important; }
          .pullquote-block { padding: 24px !important; }
          .ceiling-grid { grid-template-columns: 1fr !important; padding: 24px 16px 48px !important; }
          .citation-block { padding: 0 16px 40px !important; }
          .section-table { padding: 64px 16px !important; }
          .table-desktop { display: none !important; }
          .table-mobile { display: flex !important; }
          .section-aios { padding: 64px 24px !important; }
          .assessment-cta { padding: 48px 24px !important; }
          .section-faq { padding: 64px 16px !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .section-closing { padding: 80px 24px !important; }
          .mobile-h2 { font-size: 26px !important; }
        }
      `}</style>

      {/* ─── Section 1: Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "#080D11",
          minHeight: "720px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal orb */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(2,128,144,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        {/* Purple orb */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(85,53,85,0.20) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-content"
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "140px 60px 80px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FadeUp delay={0}>
            <p style={eyebrow}>BUSINESS AI OS VS CLAUDE CODE + OBSIDIAN</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              style={{
                ...hdg,
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                marginBottom: "0",
              }}
            >
              <span style={{ display: "block" }}>
                &ldquo;The promise of Claude Code + Obsidian is real.&rdquo;
              </span>
              <span
                style={{ display: "block", color: "#F45B69", marginTop: "8px" }}
              >
                Here is what it can&rsquo;t do for a service business.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.80)",
                maxWidth: "680px",
                margin: "24px auto 40px",
              }}
            >
              802,000 people watched the video. The business brain concept is
              accurate. The problem is not whether the approach works &mdash; it works, for the
              right person, in the right setup. The problem is what it requires, who it
              requires, and what happens when you close your laptop.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <Link
              href="/business-ai-operating-system"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#553555",
                color: "#fff",
                borderRadius: "9999px",
                padding: "16px 32px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Learn about Business AI OS <span>→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ─── Section 2: The Appeal ────────────────────────────────────────── */}
      <section
        className="section-appeal"
        style={{ background: "#0A1118", padding: "96px 80px" }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeUp delay={0}>
            <p style={eyebrow}>THE APPEAL</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="mobile-h2"
              style={{
                ...hdg,
                fontSize: "38px",
                fontWeight: 900,
                lineHeight: "1.1",
                marginBottom: "32px",
              }}
            >
              Why 802,000 people watched the CLAUDE.md video
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              Nick Saraev called it your business brain. The phrase landed because the
              concept is accurate. A well-maintained CLAUDE.md file, connected to the right
              tools and an Obsidian vault, creates something genuinely different from a
              generic AI assistant. The AI knows your business. It knows your priorities.
              It can act on them.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              The appeal is real. More than 800,000 people have watched variations of this
              setup. Consultants, solopreneurs, and service business owners are building
              these systems right now &mdash; running their proposals, morning briefings, and
              admin through Claude Code. For technically fluent people with time to build,
              it works.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.75",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.70)",
              }}
            >
              Here is what the tutorials do not follow up on.
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ─── Section 3: The 5 Ceilings ───────────────────────────────────── */}
      <section style={{ background: "#080D11" }}>
        <div
          className="section-header"
          style={{ padding: "96px 80px 0" }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <FadeUp delay={0}>
              <p style={eyebrowCoral}>THE CEILING</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="mobile-h2"
                style={{
                  ...hdg,
                  fontSize: "38px",
                  fontWeight: 900,
                  lineHeight: "1.1",
                  marginBottom: "20px",
                }}
              >
                Where it stops working for a service business
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "rgba(255,255,255,0.80)" }}>
                These are not edge cases. They are the design constraints of a personal
                productivity tool being used as business infrastructure.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Blockquote */}
        <FadeUp delay={0.2}>
          <div
            className="pullquote-block"
            style={{
              background: "rgba(244,91,105,0.08)",
              borderLeft: "3px solid #F45B69",
              padding: "28px 80px",
              margin: "40px 0 0",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontStyle: "italic",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              &ldquo;I run a small consulting business and was drowning in admin.&rdquo;
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#F45B69",
                fontStyle: "normal",
                marginTop: "12px",
                marginBottom: 0,
              }}
            >
              r/ClaudeAI &mdash; consulting founder
            </p>
          </div>
        </FadeUp>

        {/* Ceiling Cards Grid */}
        <div
          className="ceiling-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            padding: "40px 80px 80px",
          }}
        >
          {ceilingCards.map((card, i) => (
            <FadeUp
              key={card.num}
              delay={0.1 + i * 0.05}
              style={i === 4 ? { gridColumn: "span 2" } : {}}
            >
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
                    textTransform: "uppercase",
                    color: "#F45B69",
                    marginBottom: "8px",
                    margin: "0 0 8px",
                  }}
                >
                  {card.num}
                </p>
                <h3
                  style={{
                    ...hdg,
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "1.3",
                    marginBottom: "12px",
                    margin: "0 0 12px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.65",
                    color: "rgba(255,255,255,0.80)",
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div style={divider} />

      {/* ─── Section 4: Comparison Table ─────────────────────────────────── */}
      <section
        className="section-table"
        style={{
          background: "#0A1118",
          padding: "96px 80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto 48px" }}>
          <FadeUp delay={0}>
            <p style={eyebrow}>THE COMPARISON</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="mobile-h2"
              style={{
                ...hdg,
                fontSize: "38px",
                fontWeight: 900,
                lineHeight: "1.1",
                marginBottom: "16px",
              }}
            >
              Claude Code + Obsidian vs Business AI Operating System
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.70)", margin: 0 }}>
              The same goal. Different architecture.
            </p>
          </FadeUp>
        </div>

        {/* Desktop Table */}
        <FadeUp delay={0.2}>
          <div
            className="table-desktop"
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.07)",
              width: "100%",
              maxWidth: "1100px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.50)",
                      background: "rgba(255,255,255,0.04)",
                      padding: "16px 24px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    Dimension
                  </th>
                  <th
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "#F45B69",
                      background: "rgba(244,91,105,0.14)",
                      padding: "16px 24px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    Claude Code + Obsidian
                  </th>
                  <th
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "#028090",
                      background: "rgba(2,128,144,0.14)",
                      padding: "16px 24px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    Business AI Operating System
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.50)",
                        padding: "18px 24px",
                        borderBottom:
                          i < tableRows.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {row.dimension}
                    </td>
                    <td
                      style={{
                        background: "rgba(244,91,105,0.06)",
                        color: "#fff",
                        fontSize: "14px",
                        lineHeight: "1.55",
                        padding: "18px 24px",
                        borderBottom:
                          i < tableRows.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      {row.claudeCode}
                    </td>
                    <td
                      style={{
                        background: "rgba(2,128,144,0.06)",
                        color: "#028090",
                        fontSize: "14px",
                        lineHeight: "1.55",
                        fontWeight: 500,
                        padding: "18px 24px",
                        borderBottom:
                          i < tableRows.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        textAlign: "left",
                        verticalAlign: "top",
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

        {/* Mobile stacked cards */}
        <div
          className="table-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "100%",
          }}
        >
          {tableRows.map((row, i) => (
            <div
              key={i}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              {/* Dimension header */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  padding: "10px 16px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.50)",
                }}
              >
                {row.dimension}
              </div>
              {/* Claude Code+ row */}
              <div
                style={{
                  background: "rgba(244,91,105,0.06)",
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#F45B69",
                    margin: "0 0 6px",
                  }}
                >
                  Claude Code + Obsidian
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {row.claudeCode}
                </p>
              </div>
              {/* AIOS row */}
              <div
                style={{
                  background: "rgba(2,128,144,0.06)",
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#028090",
                    margin: "0 0 6px",
                  }}
                >
                  Business AI Operating System
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "#028090",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {row.aios}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Mid-page CTA ─────────────────────────────────────────────────── */}
      <section
        className="assessment-cta"
        style={{
          background: "#080D11",
          padding: "56px 80px 80px",
          textAlign: "center",
        }}
      >
        <FadeUp delay={0}>
          <p style={{ ...eyebrow, marginBottom: "24px" }}>WANT TO SEE THE ALTERNATIVE?</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Link
            href="/business-ai-operating-system"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#553555",
              color: "#fff",
              borderRadius: "9999px",
              padding: "16px 32px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            See how a Business AI OS is built <span>→</span>
          </Link>
        </FadeUp>
      </section>

      <div style={divider} />

      {/* ─── Section 5: What a Business AI OS Is ─────────────────────────── */}
      <section
        className="section-aios"
        style={{ background: "#080D11", padding: "96px 80px" }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeUp delay={0}>
            <p style={eyebrow}>BUSINESS AI OS</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="mobile-h2"
              style={{
                ...hdg,
                fontSize: "38px",
                fontWeight: 900,
                lineHeight: "1.1",
                marginBottom: "28px",
              }}
            >
              What a Business AI OS actually is
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "28px" }}>
              A Business AI OS is not a tool. It is an operating environment &mdash; five
              connected layers built specifically around your business.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ marginBottom: "28px" }}>
              {[
                {
                  name: "Context.",
                  desc: " Everything the AI needs to know about how your business operates — clients, decisions, priorities, history. Not a CLAUDE.md you maintain. A structured knowledge base built by a specialist.",
                },
                {
                  name: "Data.",
                  desc: " Your real business data, connected live — CRM, email, meetings, forms. Not notes about the business. The actual records.",
                },
                {
                  name: "Intelligence.",
                  desc: " AI that understands your current goals and your current bottleneck, not just your last question.",
                },
                {
                  name: "Automate.",
                  desc: " Workflows that run without you watching — triggered by conditions, not by you remembering to ask.",
                },
                {
                  name: "Build.",
                  desc: " Custom systems that compound over time as your business grows.",
                },
              ].map((layer) => (
                <p
                  key={layer.name}
                  style={{
                    fontSize: "17px",
                    lineHeight: "1.75",
                    marginBottom: "12px",
                  }}
                >
                  <strong style={{ color: "#028090" }}>{layer.name}</strong>
                  {layer.desc}
                </p>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              The difference between a tool and a system is that a system compounds. Every
              layer feeds the next. Every decision gets smarter. The business gets more
              autonomous over time, not just once.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.75",
                marginBottom: "28px",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              The DIY Claude Code tutorials are teaching the same five layers, one
              video at a time, built by the founder, maintained by the founder. There is a
              faster path.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
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
              }}
            >
              See how it&rsquo;s built <span>→</span>
            </Link>

            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
                marginTop: "32px",
                fontStyle: "italic",
              }}
            >
              Shannon Short has used Claude Code as her primary business tool for over a year. Revaya AI builds Business AI OSes for founder-led service businesses.
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.30)",
                marginTop: "8px",
              }}
            >
              Last updated: March 2026
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ─── Section 6: FAQ ───────────────────────────────────────────────── */}
      <section
        className="section-faq"
        style={{ background: "#0A1118", padding: "96px 80px" }}
      >
        <FadeUp delay={0}>
          <h2
            className="mobile-h2"
            style={{
              ...hdg,
              fontSize: "38px",
              fontWeight: 900,
              lineHeight: "1.1",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Claude Code + Obsidian for Business: Questions Founders Are Asking
          </h2>
        </FadeUp>

        <div
          className="faq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 48px",
            maxWidth: "1200px",
            margin: "40px auto 0",
          }}
        >
          {faqItems.map((item, index) => (
            <div
              key={index}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "24px 0",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    color: "#028090",
                    fontSize: "20px",
                    flexShrink: 0,
                    lineHeight: "1",
                  }}
                >
                  {openFaq === index ? "×" : "+"}
                </span>
              </button>

              {openFaq === index && (
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: "1.7",
                    padding: "0 0 20px",
                    margin: 0,
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div style={divider} />

      {/* ─── Section 7: Final CTA ─────────────────────────────────────────── */}
      <section
        className="section-closing"
        style={{
          background: "#080D11",
          padding: "120px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple orb */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(85,53,85,0.25) 0%, transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FadeUp delay={0}>
            <p style={{ ...eyebrow, textAlign: "center" }}>THE NEXT STEP</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="mobile-h2"
              style={{
                ...hdg,
                fontSize: "42px",
                fontWeight: 900,
                lineHeight: "1.1",
                marginBottom: "24px",
              }}
            >
              Your instinct was right. Someone already mapped the territory.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.80)",
                margin: "0 auto 40px",
                maxWidth: "620px",
              }}
            >
              The CLAUDE.md video was the proof of concept. Someone else already put in
              the months of context engineering, MCP configuration, and integration work.
              A Business AI OS is what happens when that work is done by a specialist,
              built around your specific business, and maintained so it keeps running after
              you close the laptop.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <Link
              href="/business-ai-operating-system"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#553555",
                color: "#fff",
                borderRadius: "9999px",
                padding: "16px 32px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              See how it&rsquo;s built <span>→</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
