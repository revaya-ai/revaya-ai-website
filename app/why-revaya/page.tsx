import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { whyRevayaWebPageSchema, shannonPersonSchema } from "@/lib/schema";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

export const metadata: Metadata = {
  title: "Why Revaya AI — Shannon Winnicki, Business AI OS Consultant",
  description:
    "18 years at Virgin Mobile, Papa Murphy's, and Intermedia. I built the Business AI OS for my own company first, then made it a service. Here's the story.",
};

const credentials = [
  {
    label: "18 years",
    detail: "as a website product manager for large brands.",
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
    label: "Ultra Mobile",
    detail:
      "Currently a manager at a telecom company — deliberately, to maintain the capacity to build Revaya AI on the side.",
  },
  {
    label: "AI Agency Accelerator",
    detail:
      "10 months in, still active. Agentic engineering, AI agent architecture, automations, and the Business AI OS methodology. Python certified.",
  },
  {
    label: "Built working systems",
    detail:
      "Using Claude Code, Vercel, n8n, Retool, Twilio, and others. From real client deliverables, not tutorials.",
  },
];

export default function WhyRevayaPage() {
  return (
    <>
      <JsonLd data={whyRevayaWebPageSchema} />
      <JsonLd data={shannonPersonSchema} />

      {/* Page header */}
      <section className="relative overflow-hidden bg-[#0D1A4A] pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#553555]/20 blur-[130px] animate-pulse-glow" />
          <div
            className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#028090]/12 blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] font-medium text-[#028090] mb-5">
              <span className="w-6 h-px bg-[#028090]" />
              Shannon Winnicki
            </span>
            <h1 className="font-display font-black text-[2.5rem] md:text-[3.5rem] leading-[1.05] text-white mb-5">
              I built this for my own company first.
            </h1>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 max-w-[580px]">
              18 years solving operational problems for large brands. Then I built the system for myself. That&rsquo;s what&rsquo;s running Revaya today.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Headshot + intro */}
      <section className="bg-[#111820] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Headshot with stylized frame */}
            <FadeIn direction="left">
              <div className="relative inline-block">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#028090]/50 to-[#553555]/50 blur-sm" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/shannon-headshot.jpg"
                    alt="Shannon Winnicki, founder of Revaya AI"
                    width={400}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Intro text */}
            <FadeIn direction="right" delay={0.1}>
              <div>
                <p className="text-[0.8125rem] uppercase tracking-[0.1em] text-[#028090] font-medium mb-5">
                  Shannon Winnicki
                </p>
                <p className="text-[1.125rem] leading-[1.65] text-white/80 mb-4">
                  Eighteen years as a website product manager for large brands. I knew how to take what a business needed and turn it into something operational.
                </p>
                <p className="text-[1rem] leading-[1.65] text-white/65 mb-4">
                  A $2M website redesign at Virgin Mobile. A $10M website redesign and an email program that drove 80% revenue growth at Papa Murphy&rsquo;s. The work held up.
                </p>
                <p className="text-[1rem] leading-[1.65] text-white/65">
                  And then I hit a wall I couldn&rsquo;t see past.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Module 3.2 — Story Arc */}
      <section className="bg-[#0D1A4A] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            {[
              {
                title: "The breaking point.",
                paragraphs: [
                  "Burnout doesn't always look dramatic. It looked like not caring anymore about work I used to find genuinely interesting. It looked like making decisions by default instead of by thought.",
                  "I got laid off from a toxic company in 2022. I sold the house and moved into an RV full-time — not a plan, a gut call. Then I deliberately stepped back into a manager role at a telecom company, two levels below where I'd been, a significant pay cut, specifically to have the mental space to build something that mattered. I'm still there. Still building on the side.",
                ],
              },
              {
                title: "The rebuild.",
                paragraphs: [
                  "I wanted to live a life that was actually aligned with what I care about. That meant solving hard problems for businesses that don't have the infrastructure budget of a Fortune 500 but have every bit of the same complexity. The underdogs.",
                  "Small service businesses running a 10-person workload with two people, who hadn't taken a real vacation in years, who knew AI was supposed to help but couldn't figure out where to start.",
                  "I'd spent 18 years on the other side of that equation. I knew what the right systems looked like. I knew what it cost to build them. And I knew these founders had the same problems without the same resources. That's where I wanted to be.",
                  "I started with websites. Then in mid-2025 I found the AI Agency Accelerator — 100+ hours of curriculum covering agentic engineering, AI agent architecture, automations, and the Business AI OS methodology. I've been in the program for 10 months. That's where everything clicked.",
                ],
              },
              {
                title: "What I learned.",
                paragraphs: [
                  "The AI Agency Accelerator gave me the methodology. Applying it to my own business gave me the proof. Every layer I built for Revaya AI — the content engine, the client intake pipeline, the project delivery system — was a working version of what I now build for clients. I built it for myself first. Now I bring it to you.",
                ],
              },
            ].map((section, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-px bg-[#028090]" />
                    <h2 className="font-display font-black text-[1.375rem] text-white">
                      {section.title}
                    </h2>
                  </div>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-[1rem] leading-[1.65] text-white/65 mb-3">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3.3 — Meta-Proof */}
      <section className="relative overflow-hidden bg-[#111820] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#028090]/08 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="max-w-[720px]">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#028090]/15 to-[#553555]/15" />
                <div className="absolute inset-0 border border-[#028090]/25 rounded-2xl" />
                <div className="relative p-8 md:p-12">
                  <h2 className="font-display font-black text-[1.875rem] md:text-[2.5rem] leading-[1.1] text-white mb-6">
                    The Business AI Operating System I build for clients runs this business today.
                  </h2>
                  <p className="text-[1rem] leading-[1.65] text-white/75 mb-4">
                    This is not a talking point. It&rsquo;s a structural fact about how Revaya AI operates.
                  </p>
                  <p className="text-[1rem] leading-[1.65] text-white/70 mb-4">
                    Before I build for clients, I build for myself. The custom workflow automations I create for each client — specific to how their business actually operates — are the same kind I&rsquo;ve built for Revaya AI. The web delivery pipeline that built this site is one example: a nine-phase workflow, automated end to end, custom to how I deliver website projects. Not an off-the-shelf tool. Something I built because my business needed it.
                  </p>
                  <p className="text-[1rem] leading-[1.65] text-white/70 mb-4">
                    That&rsquo;s what the AIOS engagement looks like. I map your business, identify where custom automations would actually change something, and build them to match how you work. Not a generic setup. Not a template. Something that fits the specific way your business operates.
                  </p>
                  <p className="text-[1rem] leading-[1.65] text-white/70">
                    I didn&rsquo;t design a methodology and then start a business. I built the business first, then packaged what I learned into something I could build for others.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Module 3.4 — Credentials */}
      <section className="bg-[#0D1A4A] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-12">
              The specifics.
            </h2>
          </FadeIn>
          <div className="max-w-[680px]">
            <StaggerChildren className="space-y-5">
              {credentials.map((cred) => (
                <StaggerItem key={cred.label}>
                  <div className="flex gap-5 items-start glass-card rounded-xl px-6 py-5">
                    <div className="w-1 h-full bg-[#028090] shrink-0 rounded-full self-stretch" />
                    <div>
                      <p className="font-display font-black text-[1rem] text-white mb-1">
                        {cred.label}
                      </p>
                      <p className="text-[1rem] leading-[1.65] text-white/60">
                        {cred.detail}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <FadeIn delay={0.3}>
              <p className="mt-8 text-[1rem] leading-[1.65] text-white/45">
                The pattern across every role: take what a business needs and turn it into something operational. The Business AI OS is that job, built for service businesses that can&rsquo;t afford the enterprise price tag.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Module 3.5 — CTA */}
      <section className="relative overflow-hidden bg-[#111820] py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#553555]/20 via-transparent to-[#028090]/10 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-6 max-w-[480px] mx-auto">
              If what you read here matches the problem you&rsquo;re trying to solve, the next step is simple.
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 mb-10">
              Tell me about your situation.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block font-display text-[0.9375rem] font-bold px-8 py-3.5 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"
            >
              Start the conversation →
            </Link>
            <p className="mt-5 text-[0.875rem] text-white/35">
              This goes to a short form. Shannon reads it personally. You&rsquo;ll hear back within 48 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Module 3.6 — Soft secondary CTA */}
      <section className="bg-[#0D1A4A] py-8 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
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
