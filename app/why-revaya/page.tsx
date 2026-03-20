import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { whyRevayaWebPageSchema, shannonPersonSchema } from "@/lib/schema";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { TimelinePanel } from "./TimelinePanel";

export const metadata: Metadata = {
  title: "Shannon Winnicki | Business AI Operating System Consultant",
  description:
    "18 years inside Fortune 500 operations. I built a Business AI Operating System for my own company first, then made it a service. AI consultant and founder of Revaya AI.",
};

const credentials = [
  {
    label: "18 years",
    detail:
      "As the person who stood between a business need and a dev team. Web product management for brands that operate at scale.",
  },
  {
    label: "Virgin Mobile and Boost Mobile",
    detail:
      "Managed a $2M website redesign. Website product manager and producer across three prepaid mobile brands.",
  },
  {
    label: "Papa Murphy's",
    detail:
      "National restaurant brand. Spearheaded a $10M website redesign and built an email lifecycle program that drove 80% revenue growth.",
  },
  {
    label: "Intermedia",
    detail:
      "B2B SaaS company. Website product manager, coordinating remote development teams across the US and internationally.",
  },
  {
    label: "AI Agency Accelerator",
    detail:
      "200+ hours of training in agentic engineering, AI agent architecture, automations, and the Business AI OS methodology. Python certified. Still active.",
  },
  {
    label: "Built working systems",
    detail:
      "Using Claude Code, Vercel, Railway, Retool, Twilio, and others. From real client deliverables, not tutorials. The system also replaced tools I used to depend on — n8n, Make, Obsidian, Airtable. When it's built right, you stop needing the patchwork.",
  },
];

export default function WhyRevayaPage() {
  return (
    <>
      <JsonLd data={whyRevayaWebPageSchema} />
      <JsonLd data={shannonPersonSchema} />

      {/* Fixed orb background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#553555]/15 blur-[160px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] rounded-full bg-[#028090]/10 blur-[140px]" />
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[500px] rounded-full bg-[#028090]/10 blur-[140px]" />
      </div>

      {/* ── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-24" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] font-medium text-[#028090] mb-5">
              <span className="w-6 h-px bg-[#028090]" />
              The Founder&rsquo;s Story
            </span>
            <h1 className="font-display font-black text-[2.5rem] md:text-[3.5rem] leading-[1.05] text-white mb-5">
              I didn&rsquo;t design a methodology.
              <br />
              I lived one.
            </h1>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 max-w-[580px]">
              Eighteen years on the inside of companies that operate at scale. Then I built the same system for my own business. That&rsquo;s what&rsquo;s running Revaya today.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── HEADSHOT + INTRO ─────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Headshot */}
            <FadeIn direction="right" className="order-last md:order-first">
              <div className="relative inline-block w-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#028090]/50 to-[#553555]/50 blur-sm" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/shannon-headshot.jpg"
                    alt="Shannon Winnicki, founder of Revaya AI"
                    width={560}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Intro text */}
            <FadeIn direction="left" delay={0.15} className="order-first md:order-last">
              <div className="md:pt-6">
                <p className="text-[0.8125rem] uppercase tracking-[0.1em] text-[#028090] font-medium mb-6">
                  Shannon Winnicki
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  Eighteen years as the person who stood between a business need and a dev team.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/85 mb-4">
                  At Virgin Mobile, Papa Murphy&rsquo;s, Intermedia — I wasn&rsquo;t the outside consultant with a framework. I was inside the machine. Managing up to $11M website redesigns. Building an email program that drove 80% revenue growth. Coordinating remote development teams globally.
                </p>
                <p className="text-[1rem] leading-[1.7] text-white/70 mb-4">
                  I knew what the right systems looked like. I knew what it cost to build them.
                </p>
                <p className="text-[1rem] leading-[1.7] text-white/70">
                  And then I hit a wall I couldn&rsquo;t see past.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STORY ARC + TIMELINE ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Timeline panel */}
            <FadeIn direction="right" className="order-last md:order-first">
              <div className="md:sticky md:top-24">
                <TimelinePanel />
              </div>
            </FadeIn>

            {/* Story text */}
            <FadeIn direction="left" delay={0.15} className="order-first md:order-last">
              <div className="space-y-10">
                {[
                  {
                    title: "The breaking point.",
                    paragraphs: [
                      "Burnout doesn't always look dramatic. It looked like not caring anymore about work I used to find genuinely interesting. Making decisions by default instead of by thought.",
                      "I got laid off from a toxic company in 2022. Sold the house. Moved into an RV full-time — not a plan, a gut call. Then I made a deliberate choice: step back two levels, take a significant pay cut, specifically to have the mental space to build something that mattered. I'm still there. Still building on the side.",
                    ],
                  },
                  {
                    title: "The rebuild.",
                    paragraphs: [
                      "I knew what the underdogs needed. Small service businesses running a 10-person workload with two people, who hadn't taken a real vacation in years, who knew AI was supposed to help but couldn't figure out where to start.",
                      "I'd spent 18 years on the other side of that equation. I knew what the right systems looked like. I knew what it cost to build them. And I knew these founders had the same problems without the same resources.",
                      "In June 2025, I found the program that changed everything. 200+ hours of training on agentic engineering, AI agent architecture, and the Business AI OS methodology. And then I spent 9 months absorbing it before I said anything publicly. Not because I was avoiding it. Because it wasn't authentic yet. Saying I know automations wasn't the thing.",
                      "This is the thing.",
                    ],
                  },
                  {
                    title: "What I learned.",
                    paragraphs: [
                      "The methodology gave me the framework. Building it inside my own business gave me the proof.",
                      "Every layer I built for Revaya AI — the content engine, the client intake pipeline, the project delivery system, the agent team — was a working version of what I now build for clients.",
                      "I built it for myself first. Now I have something real to show. Not a pitch deck. A working system.",
                    ],
                  },
                ].map((section, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-px bg-[#028090]" />
                      <h3 className="font-display font-black text-[1.25rem] text-white">
                        {section.title}
                      </h3>
                    </div>
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-[1rem] leading-[1.7] text-white mb-3">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── META-PROOF ───────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#028090]/15 to-[#553555]/15" />
              <div className="absolute inset-0 border border-[#028090]/25 rounded-2xl" />
              <div className="relative p-8 md:p-14">
                <p className="text-[1rem] leading-[1.65] text-white/50 mb-5">
                  This is not a talking point.
                </p>
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-8">
                  The Business AI OS I build for clients runs this business today.
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <p className="text-[1rem] leading-[1.7] text-white/70">
                    The challenge command that reviews every piece of copy against brand standards. The content pipeline that drafts, approves, and pushes to the database automatically. The agent team built on a completely different architecture than a traditional org chart — four functions instead of fourteen job titles.
                  </p>
                  <p className="text-[1rem] leading-[1.7] text-white/70">
                    I built all of it before I offered it to anyone else. That&rsquo;s what an AIOS engagement looks like for your business. I map how your business actually operates, identify where custom automations would change something real, and build them to match the specific way you work. Not a generic setup. Not a template.
                  </p>
                </div>
                <p className="text-[1rem] leading-[1.7] text-white/55 mt-6">
                  I didn&rsquo;t design a methodology and then start a business. I built the business first, then packaged what I learned into something I could build for others.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
            {/* Left: heading */}
            <FadeIn direction="right">
              <div className="md:sticky md:top-24">
                <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
                  The specifics.
                </h2>
                <p className="text-[1rem] leading-[1.7] text-white/45">
                  The pattern across every role: stand between what a business needs and the system that delivers it. The Business AI OS is that job, built for service businesses that can&rsquo;t afford the enterprise price tag.
                </p>
              </div>
            </FadeIn>

            {/* Right: credential cards */}
            <FadeIn direction="left" delay={0.15}>
              <StaggerChildren className="space-y-4">
                {credentials.map((cred) => (
                  <StaggerItem key={cred.label}>
                    <div className="flex gap-5 items-start glass-card rounded-xl px-6 py-5">
                      <div className="w-1 shrink-0 rounded-full self-stretch bg-[#028090]" />
                      <div>
                        <p className="font-display font-black text-[0.9375rem] text-white mb-1">
                          {cred.label}
                        </p>
                        <p className="text-[0.9375rem] leading-[1.65] text-white/60">
                          {cred.detail}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#553555]/08 to-transparent pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[2rem] md:text-[3.25rem] leading-[1.05] text-white mb-5">
              You&rsquo;ve been
              <br />
              the system long enough.
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 mb-10 max-w-[440px] mx-auto">
              Tell me about your situation.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block font-display text-[0.9375rem] font-bold px-10 py-4 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_50px_rgba(85,53,85,0.5)] transition-all duration-200"
            >
              Start the conversation →
            </Link>
            <p className="mt-5 text-[0.875rem] text-white/35">
              This goes to a short form. Shannon reads it personally. You&rsquo;ll hear back within 48 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SOFT SECONDARY CTA ───────────────────────────────────────────────── */}
      <section className="relative py-8 border-t border-white/[0.04]" style={{ zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <p className="text-[1rem] text-white/40">
            If you want to follow how this builds — the methodology, the decisions, the real work — I document it on{" "}
            <a
              href="https://www.linkedin.com/in/swinnicki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#028090] hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
