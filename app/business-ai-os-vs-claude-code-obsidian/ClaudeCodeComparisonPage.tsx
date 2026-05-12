"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
    body: "Claude Code runs in a terminal. That is not a flaw. For founders who are comfortable there, it is actually the right environment for serious AI work. The ceiling is that most non-technical service business owners will not cross that threshold. And for those who do, the work is just beginning: CLI calendar tools, terminal email clients, scriptable task management. One consulting founder described his setup as 'making my workflow command line based so CC can work it.' That is a full workflow redesign, not a tool you add.",
  },
  {
    num: "02",
    title: "YOUR CONTEXT LAYER IS YOUR RESPONSIBILITY",
    body: "Your business brain works as long as it reflects your actual business. New offer, new client, changed priorities. Every shift creates drift between what your context files say and what is true. You can build that layer as a single CLAUDE.md or as a structured folder system with dozens of files. Either way, keeping it current is ongoing founder work. Nobody else can do it for you until the system is stable enough to hand off. Nobody teaches what happens when it drifts.",
  },
  {
    num: "03",
    title: "EVERY INTEGRATION IS A MANUAL BUILD",
    body: "Claude Code can automate workflows, and people are doing it. The ceiling is not capability, it is ownership. Calendar, email, CRM, meeting transcripts: each connection is a separate MCP server you set up, test, and maintain. One consulting founder needed four separate CLI tools just to handle calendar and email for one person. When a tool updates, the integration can break. Who fixes it? You. The ceiling is not what it can do. It is who owns it when something changes.",
  },
  {
    num: "04",
    title: "REACTIVE, NOT AUTONOMOUS",
    body: "Claude Code now has remote access — you can use it from anywhere. What it cannot do is act without you. It is reactive: you prompt, it responds. A service business needs systems that trigger without a human starting them. Intake that processes while you sleep. Follow-ups that fire while you are with a client. Reporting that runs on schedule. That is the distinction: reactive tool vs. autonomous system. Both are useful. They solve different problems.",
  },
  {
    num: "05",
    title: "YOU ARE MAINTAINING TWO SYSTEMS, NOT ONE",
    body: "Claude Code is one application. Obsidian is a different application. They are made by different teams, built on different architectures, and they do not natively integrate with each other. The bridge between them is yours to manage. Every update cycle, every Obsidian plugin that breaks on a new release, every change to how Claude Code handles context, that gap is yours to close, every time. That is not a one-time setup cost. It is an ongoing job that compounds. For a developer who enjoys that kind of work, fine. For a founder who would rather be doing client work, the friction accumulates quietly until the system has stopped working for weeks and you have not noticed because you stopped relying on it.",
  },
  {
    num: "06",
    title: "THE BUILD BELONGS TO YOU",
    body: "The more advanced setups solve one real problem: a web dashboard wrapping Claude Code means non-technical people get buttons instead of a terminal. That is a genuine improvement. The ceiling it does not solve: someone had to build the dashboard. Someone had to architect the skill library, design the domain taxonomy, write the automation triggers, configure the headless Claude Code execution layer, structure the memory vault, and connect the integrations. That person needed weeks of learning before a single button worked. And after the build: they own the maintenance. Every skill that drifts. Every integration that breaks on an update. Every new workflow the business needs. You have to learn the architecture. You have to execute the build. You have to maintain the system after. That is three compounding responsibilities stacked on top of running a service business. The dashboard is the interface. The build is still yours.",
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
    aios: "Built into the system by design. Every session, every decision, every engagement compounds the context automatically. It gets smarter without your attention. This is your Obsidian replacement.",
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
      "You own it. MCP changes, tool updates, broken integrations. Diagnosis and fixes are the founder's job or they stay broken.",
    aios: "Covered. When something changes or breaks, that is not your problem.",
  },
  {
    dimension: "Breaks on updates",
    claudeCode:
      "CLI tools, MCP protocol changes, Obsidian plugins. Any can break a workflow. Timeline to fix depends on your availability.",
    aios: "Covered. Updates, breaks, and extensions are handled without your involvement.",
  },
  {
    dimension: "Compounding",
    claudeCode:
      "Partially. Context and automation compound only if the founder actively maintains and expands the system.",
    aios: "Yes. Every session, every decision, and every engagement accumulates. The system gets more capable without requiring your time to make it happen. This is your Obsidian replacement.",
  },
];

const faqItems = [
  {
    question: "What is Claude Code + Obsidian used for in business?",
    answer:
      "Claude Code is a command-line AI tool for coding and workflow automation. Obsidian is a local markdown knowledge base. Together, they function as a DIY business brain: Claude Code reads context from Obsidian and uses it to operate more like a business-aware assistant. The setup requires technical fluency to build and maintain.",
  },
  {
    question: "What is a Business AI Operating System?",
    answer:
      "A Business AI Operating System is a custom-built intelligence layer for a specific business. It captures how the business actually works, what decisions have been made, who the clients are, and what repeatable work looks like, then runs autonomously to handle that work without the founder's constant involvement.",
  },
  {
    question: "How is a Business AI OS different from Claude Code?",
    answer:
      "Claude Code is a tool. A Business AI OS is a system built on top of tools. Claude Code is one component that might live inside a Business AI OS. The difference is like a hammer versus a construction firm: one requires a skilled hand every time; the other operates without you.",
  },
  {
    question: "What is the two-system problem with Claude Code and Obsidian?",
    answer:
      "When you use Claude Code plus Obsidian, you are maintaining two separate applications, two update cycles, and the integration between them. When either breaks, or when they fall out of sync, diagnosis and repair are your responsibility. A Business AI OS is a single maintained system with no integration gap to manage.",
  },
  {
    question: "What is CLAUDE.md and why does it matter for businesses?",
    answer:
      "A CLAUDE.md is a markdown configuration file that gives Claude persistent context about how you work and what it should know about your business. Nick Saraev popularized this for business owners. It is one file that genuinely improves what Claude can do. Not an operating system. The starting point.",
  },
  {
    question: "What happens when Claude Code or Obsidian updates break a workflow?",
    answer:
      "You fix it. Both products update on their own schedules. When a plugin or context behavior changes, the maintenance falls to whoever built the setup. In a Business AI OS, that maintenance is part of the ongoing engagement.",
  },
  {
    question: "Who is Claude Code + Obsidian best for?",
    answer:
      "Technical founders and developers who are comfortable in a terminal, enjoy the maintenance work, and want to build their own custom setup. Not the right fit for service business owners who need the system to run when they are not watching it.",
  },
  {
    question: "Should a service business owner build their own AI OS or hire someone?",
    answer:
      "Build it yourself if you have CLI comfort and you accept that it will need ongoing upkeep. Hire someone if your goal is a system that runs without you, pulls from live business data, and compounds over time. The real question is whether the setup work is how you want to be spending your hours.",
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
          .section-split { flex-direction: column !important; min-height: auto !important; }
          .split-image-col { width: 100% !important; height: 280px !important; }
          .split-text-col { padding: 48px 24px !important; flex: none !important; width: 100% !important; }
          .split-copy-col { width: 100% !important; padding: 48px 24px !important; }
          .split-image-right { height: 300px !important; flex: none !important; width: 100% !important; }
          .section-header { padding: 0 24px !important; }
          .pullquote-block { padding: 20px !important; margin: 24px 16px 0 !important; }
          .ceiling-grid { grid-template-columns: 1fr !important; padding: 24px 16px 48px !important; }
          .citation-block { padding: 0 16px 40px !important; }
          .section-table { padding: 64px 16px !important; }
          .table-desktop { display: none !important; }
          .table-mobile { display: flex !important; }
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
          src="/images/claude-code-comparison/hero-layers.png"
          alt="Business AI Operating System vs Claude Code + Obsidian — what service business owners need to know"
          title="Claude Code + Obsidian vs Business AI OS comparison for service business founders"
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
              "linear-gradient(135deg, rgba(8,13,17,0.88) 0%, rgba(8,13,17,0.65) 50%, rgba(8,13,17,0.80) 100%)",
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
          <FadeUp delay={0}>
            <p style={eyebrow}>BUSINESS AI OS VS CLAUDE CODE + OBSIDIAN</p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.40)",
                letterSpacing: "1px",
                marginBottom: "16px",
                fontFamily: "'Proxima Nova', 'Inter', sans-serif",
              }}
            >
              Updated May 2026
            </p>
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
              Claude Code crossed 293 million npm downloads since its November 2024 launch. The business brain concept is
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
          style={{ width: "50%", position: "relative", overflow: "hidden" }}
        >
          <Image
            src="/images/claude-code-comparison/section2-promise.png"
            alt="Developer at dark workstation with Obsidian graph and Claude Code terminal"
            title="The Claude Code + Obsidian business brain setup"
            fill
            loading="lazy"
            decoding="async"
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
          className="split-text-col"
          style={{ flex: 1, padding: "96px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
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
              Why the Claude Code + Obsidian setup took off in 2026
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              Nick Saraev popularized the CLAUDE.md approach, a single markdown configuration file that gives Claude persistent context about your business, how you work, and what it should know. One file. The base layer. Real, useful, and limited in ways most people do not talk about.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              Then 2026 accelerated everything. Andrej Karpathy published an{" "}
              <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener noreferrer" style={{ color: "#028090" }}>LLM wiki gist</a>
              {" "}on April 4, 2026. Garry Tan published{" "}
              <a href="https://github.com/garrytan/gbrain" target="_blank" rel="noopener noreferrer" style={{ color: "#028090" }}>GBrain</a>
              {" "}the next day, 13,535 GitHub stars, built on Claude Code. Nate Herk built a Claude Code OS course with 127,000 views and 718,000 subscribers, and made the core tension plain: &ldquo;It&rsquo;s difficult to give a step-by-step playbook because everyone runs their business differently.&rdquo;
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              Consultants, solopreneurs, and service business owners are building
              these systems right now, running their proposals, morning briefings, and
              admin through Claude Code. For technically fluent people with time to build,
              it works.
            </p>
          </FadeUp>

          <FadeUp delay={0.23}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              In May 2026, Chase AI released two videos naming this setup the Agentic OS, a three-layer architecture: a skill and automation library, a structured memory vault built on the Karpathy pattern, and a web dashboard that lets non-technical users access the system through buttons instead of a terminal. The framing is more sophisticated than the Obsidian-first tutorials. It is also a more honest acknowledgment of the gap. At minute 18 of his second video, Chase says this directly: &ldquo;You aren&rsquo;t the ICP here. There&rsquo;s true value for the 99.9%. It just isn&rsquo;t really given to them right now.&rdquo;
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "20px" }}>
              He named the audience. He did not build a path for them.
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
              padding: "28px 32px",
              margin: "40px 80px 0",
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
              r/ClaudeAI, consulting founder
            </p>
          </div>
        </FadeUp>

        {/* Full-width ceiling image */}
        <div style={{ position: "relative", width: "100%", height: "380px", marginTop: "0" }}>
          <Image
            src="/images/claude-code-comparison/section3-ceiling.png"
            alt="Claude Code + Obsidian setup showing the ceiling — stalled terminal, drifted context files, fragmented workflow"
            title="Where Claude Code + Obsidian stops working for a service business"
            fill
            loading="lazy"
            decoding="async"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, #080D11 100%)",
            }}
          />
        </div>

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
              style={{}}
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
              The vocabulary has shifted. In 2026, the more structured DIY setups are called the Agentic OS rather than Claude Code plus Obsidian. Three layers instead of two: skill library, memory vault, observability dashboard. That is a more sophisticated build than the Obsidian-first approach, and a more honest accounting of what the system requires. The comparison below applies to both. The architecture got more structured. The ownership did not change.
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
        className="section-split"
        style={{
          background: "#080D11",
          display: "flex",
          alignItems: "stretch",
          minHeight: "720px",
        }}
      >
        {/* Text column */}
        <div
          className="split-copy-col"
          style={{ width: "50%", padding: "96px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
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
              A Business AI OS is not a tool. It is an operating environment, four
              connected layers built specifically around your business.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ marginBottom: "28px" }}>
              {[
                {
                  name: "Context.",
                  desc: " Everything the AI needs to know about how your business operates: clients, decisions, priorities, history. Not a CLAUDE.md you maintain. A structured knowledge base built by a specialist.",
                },
                {
                  name: "Data.",
                  desc: " Your real business data, connected live. CRM, email, meetings, forms. Not notes about the business. The actual records.",
                },
                {
                  name: "Intelligence.",
                  desc: " AI that understands your current goals and your current bottleneck, not just your last question.",
                },
                {
                  name: "Automate.",
                  desc: " Workflows that run without you watching — triggered by conditions, not by you remembering to ask.",
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
            <p style={{ fontSize: "17px", lineHeight: "1.75", marginBottom: "28px" }}>
              If you are a service business owner, here is where this starts. A Discovery Assessment uncovers exactly where your business is leaking time and revenue. Not a guess. A map. The AI engine gets built around that diagnosis. That is what makes this different from installing a set of automations and hoping they connect: you have the full picture first. Every build decision comes from the root cause. The system reflects how your business actually works, not how someone assumed it does.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.75",
                marginBottom: "28px",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              The DIY Claude Code tutorials are teaching the same four layers, one
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
              Shannon Winnicki has used Claude Code as her primary business tool for over a year. Revaya AI builds Business AI OSes for founder-led service businesses.
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.30)",
                marginTop: "8px",
              }}
            >
              Last updated: May 2026
            </p>
          </FadeUp>
        </div>

        {/* AIOS layers image column */}
        <div
          className="split-image-right"
          style={{ flex: 1, position: "relative", overflow: "hidden" }}
        >
          <Image
            src="/images/claude-code-comparison/section4-aios.png"
            alt="Business AI Operating System — four layers: Context, Data, Intelligence, Automate"
            title="The four-layer Business AI Operating System architecture"
            fill
            loading="lazy"
            decoding="async"
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #080D11 0%, rgba(8,13,17,0.55) 30%, transparent 55%)",
            }}
          />
        </div>
      </section>

      <div style={divider} />

      {/* ─── Section 6: FAQ ───────────────────────────────────────────────── */}
      <section
        className="section-faq"
        style={{ background: "#0A1118", padding: "96px 80px" }}
      >
        <FadeUp delay={0}>
          <p style={{ ...eyebrow, textAlign: "center" }}>FREQUENTLY ASKED QUESTIONS</p>
        </FadeUp>
        <FadeUp delay={0.05}>
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
              The setup is everywhere. The question is who owns it after.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.80)",
                margin: "0 auto 20px",
                maxWidth: "620px",
              }}
            >
              CLAUDE.md files and Obsidian vaults are mainstream now. Every AI newsletter covers the setup. Every creator in the space has done the video. That is validation that the underlying idea is right. Business owners should have AI systems that know how they work.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.80)",
                margin: "0 auto 20px",
                maxWidth: "620px",
              }}
            >
              The ceiling is not whether the approach works. It is who owns the maintenance, who keeps the context current as the business changes, and who fixes it on the Tuesday when something breaks and you have back-to-back calls.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.80)",
                margin: "0 auto 40px",
                maxWidth: "620px",
              }}
            >
              A Discovery Assessment maps exactly where your business is leaking time and revenue. That diagnosis shapes what gets built. The system gets built around the root cause, not around what seemed like a good automation to add. That is what makes it an operating system instead of a collection of tools you maintain on the side.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
            <Link
              href="/business-ai-os-assessment"
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
              Book a Discovery Assessment <span>→</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
