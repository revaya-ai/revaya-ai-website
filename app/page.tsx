import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { homeWebPageSchema } from "@/lib/schema";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

export const metadata: Metadata = {
  title: "Business AI OS for Service Businesses — Revaya AI",
  description:
    "Your business shouldn't run only when you do. I build Business AI Operating Systems for service businesses. Five layers, three measurable outcomes.",
};

const outcomes = [
  {
    headline: "Things run while you're offline.",
    body: "Your team stops routing every decision through you. The system handles the recurring work. You wake up to fewer fires.",
  },
  {
    headline: "Your time goes to the work that only you can do.",
    body: "Onboarding, reporting, intake, follow-up. The repeatable parts of your operation run without you scheduling them. Task automation percentage is one of the three KPIs I track in every engagement.",
  },
  {
    headline: "The business gets more valuable as it grows.",
    body: "Revenue per employee goes up when the system scales with you, not against you. You stop adding headcount to cover problems the system should solve.",
  },
];

const offerCards = [
  {
    name: "AI Training",
    description:
      "Most teams have access to AI tools and aren't using them consistently. I build a training program specific to your business — your workflows, your tools, your gaps. Not a generic overview. Built for where you actually are.",
    priceSignal: "Contact form to start",
    href: "/solutions#ai-training",
    cta: "See AI Training",
    featured: false,
    accent: "rgba(2,128,144,0.15)",
    border: "rgba(2,128,144,0.3)",
  },
  {
    name: "AIOS Audit",
    description:
      "The right first step for most service businesses. I map your operations, identify what's bottlenecking you, and produce a specific plan. If you proceed to Setup, the Audit fee is deductible. If you don't, you walk away with a prioritized roadmap you can act on yourself.",
    priceSignal: "Bounded engagement",
    href: "/solutions#aios-audit",
    cta: "See the Audit",
    featured: true,
    accent: "rgba(244,91,105,0.15)",
    border: "rgba(244,91,105,0.5)",
  },
  {
    name: "Business AIOS",
    description:
      "The full operating system for your business. Five layers built in sequence — Context, Data, Intelligence, Automate, Build — each one installed specifically for how your business works. Measured against three outcomes: away-from-desk autonomy, task automation %, and revenue per employee.",
    priceSignal: "Scoped after Audit",
    href: "/solutions#aios-setup",
    cta: "See the Business AIOS",
    featured: false,
    accent: "rgba(85,53,85,0.2)",
    border: "rgba(85,53,85,0.4)",
  },
];

const layers = [
  {
    number: "01",
    name: "Context",
    description: "I capture how your business actually works before building anything.",
  },
  {
    number: "02",
    name: "Data",
    description: "I connect the information scattered across tools or stuck in your head.",
  },
  {
    number: "03",
    name: "Intelligence",
    description: "I put AI where it flags what needs your attention and handles what doesn't.",
  },
  {
    number: "04",
    name: "Automate",
    description: "I remove the work you repeat every week. Follow-ups, reporting, routing, handoffs.",
  },
  {
    number: "05",
    name: "Build",
    description: "I create the custom tools your business needs that don't exist off the shelf.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />

      {/* Module 1 — Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F14] pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#553555]/20 blur-[140px] animate-pulse-glow" />
          <div
            className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full bg-[#028090]/15 blur-[120px] animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#114B5F]/10 blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "3s" }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-[820px] mx-auto text-center">
            {/* Eyebrow */}
            <FadeIn delay={0}>
              <span className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] font-medium text-[#028090] mb-6">
                <span className="w-6 h-px bg-[#028090]" />
                Business AI Operating System
                <span className="w-6 h-px bg-[#028090]" />
              </span>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="font-display font-black text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] leading-[1.05] text-white mb-6">
                You&rsquo;re running your business{" "}
                <span className="gradient-text">and doing the work.</span>{" "}
                Only one of those should be your job.
              </h1>
            </FadeIn>

            {/* Subheads */}
            <FadeIn delay={0.2}>
              <p className="text-[1.125rem] leading-[1.65] text-white/70 mb-3 max-w-[600px] mx-auto">
                I build Business AI Operating Systems for service businesses. The kind that run when you don&rsquo;t.
              </p>
              <p className="text-[1rem] leading-[1.65] text-white/50 mb-10 max-w-[520px] mx-auto">
                No chatbots. No generic tools. A full operating system, built for how your business actually works.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link
                  href="/work-with-me"
                  className="inline-block bg-[#F45B69] text-white text-[0.9375rem] font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:bg-[#f36b77] hover:shadow-[0_0_30px_rgba(244,91,105,0.4)] text-center"
                >
                  See if this fits your situation
                </Link>
                <Link
                  href="/solutions"
                  className="inline-block border border-white/20 text-white/80 text-[0.9375rem] font-medium px-8 py-3.5 rounded-lg hover:border-white/40 hover:text-white transition-all duration-200 text-center"
                >
                  See what I build
                </Link>
              </div>
            </FadeIn>

            {/* Stat pills */}
            <StaggerChildren className="flex flex-col sm:flex-row gap-3 justify-center">
              {[
                { value: "18 yrs", label: "product leadership at large brands" },
                { value: "5 layers", label: "built in sequence" },
                { value: "3 KPIs", label: "measurable outcomes tracked" },
              ].map((stat) => (
                <StaggerItem key={stat.value}>
                  <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-3 border-l-2 border-[#028090]">
                    <span className="text-[#028090] font-display font-black text-[1rem] whitespace-nowrap">
                      {stat.value}
                    </span>
                    <span className="text-white/50 text-[0.8125rem]">{stat.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
          <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-white">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* Module 2 — Problem Statement */}
      <section className="bg-[#111820] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="max-w-[680px] mx-auto">
              <span className="text-[0.8125rem] uppercase tracking-[0.1em] text-[#F45B69] font-medium block mb-5">
                The problem
              </span>
              <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-10">
                The business only works when you&rsquo;re in it.
              </h2>
              <div className="space-y-0">
                {[
                  "You answered Slack messages during your last vacation. Or you didn't take one at all.",
                  "Every decision your team could make, doesn't. Because it's faster to ask you.",
                  "You onboarded your last hire in six weeks of your own time. Your data lives in four places and you can't get a clear picture without pulling it yourself.",
                  "You know you should step back. The business won't let you.",
                ].map((text, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className={`py-6 ${i < 3 ? "border-b border-white/[0.07]" : ""}`}>
                      <p className={`text-[1.125rem] leading-[1.65] ${i === 3 ? "text-white font-medium" : "text-white/65"}`}>
                        {text}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Module 3 — Diagnosis */}
      <section className="relative overflow-hidden bg-[#0A0F14] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#028090]/08 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="max-w-[680px]">
              <div className="w-12 h-1 bg-[#028090] rounded-full mb-6" />
              <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-6">
                That&rsquo;s not a productivity problem.
              </h2>
              <p className="text-[1.125rem] leading-[1.65] text-white/75 mb-4">
                Here&rsquo;s the thing. Most founders I talk to think they just need better tools or more time. They don&rsquo;t.
              </p>
              <p className="text-[1rem] leading-[1.65] text-white/60">
                The problem is structural. The business only works when you&rsquo;re in it, because nothing is set up to work without you. That&rsquo;s a systems problem. And it has a specific solution.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Module 4 — What is a Business AI OS */}
      <section className="bg-[#111820] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px] mx-auto mb-16">
            <FadeIn>
              <span className="text-[0.8125rem] uppercase tracking-[0.1em] text-[#028090] font-medium block mb-5">
                The solution
              </span>
              <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-6">
                What is a{" "}
                <span className="gradient-text">Business AI Operating System?</span>
              </h2>
              {/* AEO definitional block */}
              <div className="relative rounded-xl p-8 mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#028090]/10 to-[#553555]/10 rounded-xl" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#028090] rounded-l-xl" />
                <p className="relative text-[1.125rem] leading-[1.75] text-white/85">
                  A Business AI Operating System is a complete operational infrastructure built on five layers (Context, Data, Intelligence, Automate, and Build) that lets a service business run on systems instead of depending on the founder for every decision. It&rsquo;s not a tool and it&rsquo;s not a chatbot. It&rsquo;s the architecture that makes everything else work.
                </p>
              </div>
              <p className="text-[1rem] leading-[1.65] text-white/60">
                The Business AI OS delivers three measurable outcomes. In plain language, here&rsquo;s what that looks like:
              </p>
            </FadeIn>
          </div>

          {/* Three outcomes */}
          <StaggerChildren className="grid md:grid-cols-3 gap-6">
            {outcomes.map((outcome, i) => (
              <StaggerItem key={outcome.headline}>
                <div className="glass-card rounded-xl p-8 h-full hover:bg-white/[0.07] transition-all duration-300 group">
                  <div className="w-8 h-8 rounded-lg bg-[#028090]/20 flex items-center justify-center mb-5">
                    <span className="text-[#028090] font-display font-black text-[0.875rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-[1.125rem] text-white mb-3 leading-[1.2] group-hover:text-[#028090] transition-colors">
                    {outcome.headline}
                  </h3>
                  <p className="text-[1rem] leading-[1.65] text-white/55">
                    {outcome.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Module 5 — The 5 Layers */}
      <section className="relative overflow-hidden bg-[#0A0F14] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#553555]/08 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="mb-12">
              <span className="text-[0.8125rem] uppercase tracking-[0.1em] text-[#028090] font-medium block mb-5">
                Five layers
              </span>
              <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white">
                Built in sequence. Each one on the last.
              </h2>
            </div>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-5 gap-4">
            {layers.map((layer) => (
              <StaggerItem key={layer.name}>
                <div className="glass-card rounded-xl p-6 h-full hover:bg-white/[0.07] transition-all duration-300 group cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-[#028090]/20 flex items-center justify-center mb-4">
                    <span className="text-[#028090] font-display font-black text-[0.75rem]">
                      {layer.number}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-white text-[1.125rem] mb-2 group-hover:text-[#028090] transition-colors">
                    {layer.name}
                  </h3>
                  <p className="text-white/50 text-[0.875rem] leading-[1.6]">
                    {layer.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Module 6 — Proof Point */}
      <section className="bg-[#111820] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="max-w-[680px] mx-auto">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#028090]/20 to-[#553555]/20" />
                <div className="absolute inset-0 border border-[#028090]/30 rounded-2xl" />
                <div className="relative p-8 md:p-10">
                  <p className="font-display font-black text-[1.375rem] md:text-[1.625rem] text-white leading-[1.2] mb-5">
                    I built this system for my own company first.
                  </p>
                  <p className="text-[1rem] leading-[1.65] text-white/75 mb-3">
                    Revaya AI runs on the same Business AI OS I build for clients. The content engine, the project delivery pipeline, the client intake process. All of it runs on the methodology. You can see exactly what you&rsquo;d be getting before you decide.
                  </p>
                  <p className="text-[1rem] leading-[1.65] text-white/75">
                    No competitor is saying that. Most are selling a methodology. I&rsquo;m selling the thing I already built for myself.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Module 7 — Offer Snapshot */}
      <section className="relative overflow-hidden bg-[#0A0F14] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#553555]/08 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-12">
              Where most people start.
            </h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-6">
            {offerCards.map((card) => (
              <StaggerItem key={card.name}>
                <div
                  className={`relative rounded-xl flex flex-col h-full overflow-hidden gradient-border ${
                    card.featured ? "bg-[#111820]" : "bg-[#0D141A]"
                  }`}
                  style={{
                    boxShadow: card.featured
                      ? `0 0 40px ${card.accent}, 0 0 80px ${card.accent}`
                      : "none",
                  }}
                >
                  {card.featured && (
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${card.accent}, transparent)`,
                      }}
                    />
                  )}
                  <div className="relative p-8 flex flex-col h-full">
                    {card.featured && (
                      <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#F45B69] font-medium mb-3">
                        Start here
                      </span>
                    )}
                    <h3 className="font-display font-black text-[1.375rem] text-white mb-4">
                      {card.name}
                    </h3>
                    <p className="text-[1rem] leading-[1.65] text-white/60 mb-5 flex-1">
                      {card.description}
                    </p>
                    <p
                      className="text-[0.875rem] mb-5 font-medium"
                      style={{ color: card.featured ? "#F45B69" : "#028090" }}
                    >
                      {card.priceSignal}
                    </p>
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-white/80 hover:text-white transition-colors group"
                    >
                      {card.cta}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Module 8 — Primary CTA */}
      <section className="relative overflow-hidden bg-[#111820] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#553555]/25 via-transparent to-[#028090]/15" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[1.875rem] md:text-[2.75rem] leading-[1.1] text-white mb-6 max-w-[560px] mx-auto">
              Tell me what&rsquo;s slowing you down.
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 mb-10 max-w-[520px] mx-auto">
              I&rsquo;ll come back to you with a specific read on whether the AIOS is the right fit. If it&rsquo;s not, I&rsquo;ll say so. If it is, I&rsquo;ll show you exactly what the path looks like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/work-with-me"
                className="inline-block bg-[#F45B69] text-white text-[0.9375rem] font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:bg-[#f36b77] hover:shadow-[0_0_30px_rgba(244,91,105,0.4)]"
              >
                Start the conversation
              </Link>
            </div>
            <p className="mt-5 text-[0.875rem] text-white/40">
              Shannon reads every submission personally. You&rsquo;ll hear back within 48 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Module 9 — Soft secondary CTA */}
      <section className="bg-[#0A0F14] py-8 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-[1rem] text-white/40">
            If you want to watch how this gets built, I document it on{" "}
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
