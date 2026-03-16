import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { homeWebPageSchema } from "@/lib/schema";

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
  },
  {
    name: "AIOS Audit",
    description:
      "The right first step for most service businesses. I map your operations, identify what's bottlenecking you, and produce a specific plan. If you proceed to Setup, the Audit fee is deductible. If you don't, you walk away with a prioritized roadmap you can act on yourself.",
    priceSignal: "Bounded engagement",
    href: "/solutions#aios-audit",
    cta: "See the Audit",
    featured: true,
  },
  {
    name: "Business AIOS",
    description:
      "The full operating system for your business. Five layers built in sequence — Context, Data, Intelligence, Automate, Build — each one installed specifically for how your business works. Measured against three outcomes: away-from-desk autonomy, task automation %, and revenue per employee.",
    priceSignal: "Scoped after Audit",
    href: "/solutions#aios-setup",
    cta: "See the Business AIOS",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeWebPageSchema} />

      {/* Module 1.1 — Hero */}
      <section className="bg-brand-primary pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="font-display font-black text-[2.25rem] md:text-[3.5rem] leading-[1.1] text-white mb-6">
              You&rsquo;re running your business and doing the work. Only one of those should be your job.
            </h1>
            <p className="text-[1.125rem] leading-[1.65] text-white/85 mb-6 max-w-[600px] mx-auto">
              I build Business AI Operating Systems for service businesses. The kind that run when you don&rsquo;t.
            </p>
            <p className="text-[1rem] leading-[1.65] text-white/70 mb-10">
              No chatbots. No generic tools. A full operating system, built for how your business actually works.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block bg-brand-coral text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:brightness-110 w-full md:w-auto text-center"
            >
              See if this fits your situation
            </Link>
          </div>
        </div>
      </section>

      {/* Module 1.2 — Problem Statement */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-8">
              The business only works when you&rsquo;re in it.
            </h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-[rgba(17,75,95,0.10)]">
                <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack">
                  You answered Slack messages during your last vacation. Or you didn&rsquo;t take one at all.
                </p>
              </div>
              <div className="pb-6 border-b border-[rgba(17,75,95,0.10)]">
                <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack">
                  Every decision your team could make, doesn&rsquo;t. Because it&rsquo;s faster to ask you.
                </p>
              </div>
              <div className="pb-6 border-b border-[rgba(17,75,95,0.10)]">
                <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack">
                  You onboarded your last hire in six weeks of your own time. Your data lives in four places and you can&rsquo;t get a clear picture without pulling it yourself.
                </p>
              </div>
              <div>
                <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack font-medium">
                  You know you should step back. The business won&rsquo;t let you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1.3 — Diagnosis */}
      <section className="bg-brand-dark py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-white mb-6">
              That&rsquo;s not a productivity problem.
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-white/85 mb-4">
              Here&rsquo;s the thing. Most founders I talk to think they just need better tools or more time. They don&rsquo;t.
            </p>
            <p className="text-[1rem] leading-[1.65] text-white/80">
              The problem is structural. The business only works when you&rsquo;re in it, because nothing is set up to work without you. That&rsquo;s a systems problem. And it has a specific solution.
            </p>
          </div>
        </div>
      </section>

      {/* Module 1.4 — AIOS Introduction */}
      <section className="bg-brand-light py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px] mx-auto mb-12">
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-6">
              What is a Business AI Operating System?
            </h2>
            {/* AEO definitional block */}
            <div className="bg-white border-l-4 border-brand-accent rounded p-8 mb-8">
              <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack">
                A Business AI Operating System is a complete operational infrastructure built on five layers (Context, Data, Intelligence, Automate, and Build) that lets a service business run on systems instead of depending on the founder for every decision. It&rsquo;s not a tool and it&rsquo;s not a chatbot. It&rsquo;s the architecture that makes everything else work.
              </p>
            </div>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-2">
              The Business AI OS delivers three measurable outcomes. In plain language, here&rsquo;s what that looks like:
            </p>
          </div>

          {/* Three outcomes */}
          <div className="grid md:grid-cols-3 gap-6 max-w-[1200px]">
            {outcomes.map((outcome) => (
              <div
                key={outcome.headline}
                className="bg-white rounded border border-[rgba(17,75,95,0.12)] p-8"
              >
                <h3 className="font-display font-black text-[1.125rem] text-brand-primary mb-3 leading-[1.2]">
                  {outcome.headline}
                </h3>
                <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                  {outcome.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 1.5 — Proof Point */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px] mx-auto">
            <div className="bg-brand-accent rounded p-8 md:p-10">
              <p className="font-display font-black text-[1.25rem] md:text-[1.5rem] text-white leading-[1.2] mb-4">
                I built this system for my own company first.
              </p>
              <p className="text-[1rem] leading-[1.65] text-white/90 mb-3">
                Revaya AI runs on the same Business AI OS I build for clients. The content engine, the project delivery pipeline, the client intake process. All of it runs on the methodology. You can see exactly what you&rsquo;d be getting before you decide.
              </p>
              <p className="text-[1rem] leading-[1.65] text-white/90">
                No competitor is saying that. Most are selling a methodology. I&rsquo;m selling the thing I already built for myself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1.6 — Offer Snapshot */}
      <section className="bg-neutral-offWhite py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-10">
            Where most people start.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offerCards.map((card) => (
              <div
                key={card.name}
                className={`bg-white rounded flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-8 ${
                  card.featured
                    ? "border-2 border-brand-accent"
                    : "border border-[rgba(17,75,95,0.12)]"
                }`}
              >
                {card.featured && (
                  <span className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium mb-2">
                    Start here
                  </span>
                )}
                <h3 className="font-display font-black text-[1.375rem] text-neutral-nearBlack mb-3">
                  {card.name}
                </h3>
                <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80 mb-4 flex-1">
                  {card.description}
                </p>
                <p className="text-[0.875rem] text-brand-accent mb-4">{card.priceSignal}</p>
                <Link
                  href={card.href}
                  className="text-[1rem] text-brand-accent hover:underline font-medium"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 1.7 — Primary CTA */}
      <section className="bg-brand-primary py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-white mb-6 max-w-[560px] mx-auto">
            Tell me what&rsquo;s slowing you down.
          </h2>
          <p className="text-[1.125rem] leading-[1.65] text-white/85 mb-10 max-w-[520px] mx-auto">
            I&rsquo;ll come back to you with a specific read on whether the AIOS is the right fit. If it&rsquo;s not, I&rsquo;ll say so. If it is, I&rsquo;ll show you exactly what the path looks like.
          </p>
          <Link
            href="/work-with-me"
            className="inline-block bg-brand-coral text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:brightness-110 w-full md:w-auto"
          >
            Start the conversation
          </Link>
          <p className="mt-4 text-[0.875rem] text-white/60">
            Shannon reads every submission personally. You&rsquo;ll hear back within 48 hours.
          </p>
        </div>
      </section>

      {/* Module 1.8 — Soft secondary CTA */}
      <section className="bg-white py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-[1rem] text-neutral-nearBlack/70">
            If you want to watch how this gets built, I document it on{" "}
            <a
              href="https://www.linkedin.com/in/swinnicki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
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
