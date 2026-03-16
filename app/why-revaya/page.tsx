import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { whyRevayaWebPageSchema, shannonPersonSchema } from "@/lib/schema";

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
      <section className="bg-brand-primary pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="font-display font-black text-[2.25rem] md:text-[3rem] leading-[1.1] text-white mb-4">
            I built this for my own company first.
          </h1>
          <p className="text-[1.125rem] leading-[1.65] text-white/85 max-w-[600px]">
            18 years solving operational problems for large brands. Then I built the system for myself. That&rsquo;s what&rsquo;s running Revaya today.
          </p>
        </div>
      </section>

      {/* Headshot placeholder + intro */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Headshot placeholder */}
            <div
              className="bg-brand-light rounded w-full aspect-[4/5] max-w-[360px] flex items-center justify-center border border-[rgba(17,75,95,0.12)]"
              aria-label="Shannon Winnicki headshot — placeholder to be replaced"
            >
              <div className="text-center px-8">
                <p className="text-[0.8125rem] text-brand-dark/60 font-medium">
                  [Photo placeholder — Shannon to provide headshot]
                </p>
              </div>
            </div>

            {/* Intro text */}
            <div>
              <p className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium mb-4">
                Shannon Winnicki
              </p>
              <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack mb-4">
                Eighteen years as a website product manager for large brands. I knew how to take what a business needed and turn it into something operational.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-4">
                A $2M website redesign at Virgin Mobile. A $10M website redesign and an email program that drove 80% revenue growth at Papa Murphy&rsquo;s. The work held up.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
                And then I hit a wall I couldn&rsquo;t see past.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 3.2 — Story Arc */}
      <section className="bg-white py-0 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <div className="mb-10">
              <h2 className="font-display font-black text-[1.375rem] text-neutral-nearBlack mb-4">
                The breaking point.
              </h2>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-3">
                Burnout doesn&rsquo;t always look dramatic. It looked like not caring anymore about work I used to find genuinely interesting. It looked like making decisions by default instead of by thought.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-3">
                I got laid off from a toxic company in 2022. I sold the house and moved into an RV full-time — not a plan, a gut call. Then I deliberately stepped back into a manager role at a telecom company, two levels below where I&rsquo;d been, a significant pay cut, specifically to have the mental space to build something that mattered. I&rsquo;m still there. Still building on the side.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="font-display font-black text-[1.375rem] text-neutral-nearBlack mb-4">
                The rebuild.
              </h2>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-3">
                I wanted to live a life that was actually aligned with what I care about. That meant solving hard problems for businesses that don&rsquo;t have the infrastructure budget of a Fortune 500 but have every bit of the same complexity. The underdogs.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-3">
                Small service businesses running a 10-person workload with two people, who hadn&rsquo;t taken a real vacation in years, who knew AI was supposed to help but couldn&rsquo;t figure out where to start.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-3">
                I&rsquo;d spent 18 years on the other side of that equation. I knew what the right systems looked like. I knew what it cost to build them. And I knew these founders had the same problems without the same resources. That&rsquo;s where I wanted to be.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
                I started with websites. Then in mid-2025 I found the AI Agency Accelerator — 100+ hours of curriculum covering agentic engineering, AI agent architecture, automations, and the Business AI OS methodology. I&rsquo;ve been in the program for 10 months. That&rsquo;s where everything clicked.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="font-display font-black text-[1.375rem] text-neutral-nearBlack mb-4">
                What I learned.
              </h2>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
                The AI Agency Accelerator gave me the methodology. Applying it to my own business gave me the proof. Every layer I built for Revaya AI — the content engine, the client intake pipeline, the project delivery system — was a working version of what I now build for clients. I built it for myself first. Now I bring it to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 3.3 — Meta-Proof */}
      <section className="bg-brand-dark py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-white mb-6">
              The Business AI Operating System I build for clients runs this business today.
            </h2>
            <p className="text-[1rem] leading-[1.65] text-white/85 mb-4">
              This is not a talking point. It&rsquo;s a structural fact about how Revaya AI operates.
            </p>
            <p className="text-[1rem] leading-[1.65] text-white/85 mb-4">
              Before I build for clients, I build for myself. The custom workflow automations I create for each client — specific to how their business actually operates — are the same kind I&rsquo;ve built for Revaya AI. The web delivery pipeline that built this site is one example: a nine-phase workflow, automated end to end, custom to how I deliver website projects. Not an off-the-shelf tool. Something I built because my business needed it.
            </p>
            <p className="text-[1rem] leading-[1.65] text-white/85 mb-4">
              That&rsquo;s what the AIOS engagement looks like. I map your business, identify where custom automations would actually change something, and build them to match how you work. Not a generic setup. Not a template. Something that fits the specific way your business operates.
            </p>
            <p className="text-[1rem] leading-[1.65] text-white/85">
              I didn&rsquo;t design a methodology and then start a business. I built the business first, then packaged what I learned into something I could build for others.
            </p>
          </div>
        </div>
      </section>

      {/* Module 3.4 — Credentials */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-10">
              The specifics.
            </h2>
            <div className="space-y-6">
              {credentials.map((cred) => (
                <div key={cred.label} className="flex gap-4">
                  <div className="w-1 bg-brand-accent shrink-0 rounded-full" />
                  <div>
                    <p className="font-display font-black text-[1rem] text-neutral-nearBlack mb-1">
                      {cred.label}
                    </p>
                    <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                      {cred.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[1rem] leading-[1.65] text-neutral-nearBlack/70">
              The pattern across every role: take what a business needs and turn it into something operational. The Business AI OS is that job, built for service businesses that can&rsquo;t afford the enterprise price tag.
            </p>
          </div>
        </div>
      </section>

      {/* Module 3.5 — CTA */}
      <section className="bg-brand-primary py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-white mb-6 max-w-[480px] mx-auto">
            If what you read here matches the problem you&rsquo;re trying to solve, the next step is simple.
          </h2>
          <p className="text-[1.125rem] leading-[1.65] text-white/85 mb-10">
            Tell me about your situation.
          </p>
          <Link
            href="/work-with-me"
            className="inline-block bg-brand-coral text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:brightness-110 w-full md:w-auto"
          >
            Start the conversation
          </Link>
          <p className="mt-4 text-[0.875rem] text-white/60">
            This goes to a short form. Shannon reads it personally. You&rsquo;ll hear back within 48 hours.
          </p>
        </div>
      </section>

      {/* Module 3.6 — Soft secondary CTA */}
      <section className="bg-white py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-[1rem] text-neutral-nearBlack/70">
            If you want to follow how this builds — the methodology, the decisions, the real work — I document it on{" "}
            <a
              href="https://www.linkedin.com/in/shannonwinnicki"
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
