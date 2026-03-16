import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  solutionsWebPageSchema,
  aiTrainingServiceSchema,
  aiosAuditServiceSchema,
  aiosSetupServiceSchema,
  faqPageSchema,
} from "@/lib/schema";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Business AI OS Services — Revaya AI",
  description:
    "AI Training, AIOS Audit, and AIOS Setup for service businesses. I build the system — you don't figure it out alone. The Audit is where most people start.",
};

const layers = [
  {
    name: "Context",
    description:
      "I capture how your business actually works before building anything.",
  },
  {
    name: "Data",
    description:
      "I connect the information that's scattered across tools or stuck in your head.",
  },
  {
    name: "Intelligence",
    description:
      "I put AI where it flags what needs your attention and handles what doesn't.",
  },
  {
    name: "Automate",
    description:
      "I remove the work you repeat every week. Follow-ups, reporting, routing, handoffs.",
  },
  {
    name: "Build",
    description:
      "I create the custom tools your business needs that don't exist off the shelf.",
  },
];

const fitYes = [
  "You're a service business founder who is the operational bottleneck. Every decision routes through you, and that's not by accident — it's by default.",
  "You've tried tools before and they didn't stick. Zapier, a CRM, a project management system. Maybe ChatGPT. None of it changed how the business actually operates.",
  "You've heard about tools like OpenClaw and what they're capable of. But you're not a developer, you're not interested in self-hosting, and you're not willing to take on that security exposure.",
  "You want a system built and installed, not a course to take. You're not looking to become an AI expert.",
  "You're in a service business: consultancy, agency, CPG brand, professional services.",
];

const processSteps = [
  {
    num: "01",
    name: "Discovery",
    description:
      "A real conversation, not a pitch. I want to understand how your business actually works today: where your time goes, what breaks, what decisions can't happen without you.",
  },
  {
    num: "02",
    name: "AIOS Audit",
    description:
      "This is where I map the business in detail. What runs, what doesn't, where the real bottlenecks are, and what the AIOS would actually do for your specific situation. The Audit produces five deliverables: an operational gap map, an AI readiness score, an opportunity matrix, a 90-day roadmap, and a recommended path forward.",
  },
  {
    num: "03",
    name: "AIOS Setup",
    description:
      "If the Audit confirms an AIOS is the right move, I build it. Five layers, installed in sequence, each one building on the last. The build follows the process map you already validated.",
  },
  {
    num: "04",
    name: "Ongoing",
    description:
      "I don't disappear at delivery. Ongoing support is available after Setup, structured around how much the business is still growing and changing. The system adapts as you do.",
  },
];

const nowVs = [
  {
    today: "You have fifteen priorities and none of them feel optional",
    future:
      "One objective. One bottleneck to clear. Everything else waits its turn.",
  },
  {
    today: "You're the first person anyone calls for anything",
    future:
      "The system handles what it can. You're called for what actually needs you.",
  },
  {
    today: "Your team routes every decision through you",
    future: "Decisions your team can make happen without you.",
  },
  {
    today: "You haven't taken a full week off in two years",
    future: "You took a week in March and nothing was on fire.",
  },
  {
    today: "Onboarding a new hire takes six weeks of your time",
    future:
      "New hires ramp in days. The system carries the documentation side.",
  },
  {
    today: "Your data is in four places and nobody has a clear picture",
    future: "Your numbers surface automatically, every Monday morning.",
  },
  {
    today: "Recurring tasks get done when you remember to do them",
    future:
      "Recurring tasks run on schedule whether you remember or not.",
  },
];

const faqs = [
  {
    question:
      "I've tried AI tools before and they didn't stick. Why would this be different?",
    answer:
      "Because tools and systems are different things. Most AI tools are point solutions. They do one thing well if you set them up correctly and remember to use them. The AIOS is an operating system. I install it, configure it to your specific business, and integrate it into how your operations actually work. You don't have to figure it out. You don't have to maintain it. You're not left with a tool and a YouTube tutorial. You're left with a running system.",
  },
  {
    question: "How long does this take?",
    answer:
      "The Audit runs across one to two sessions and produces a specific deliverable within a week of completion. The Setup is scoped after the Audit. Most engagements run four to eight weeks, depending on the complexity of the business and the depth of the Build layer. I'll give you a specific timeline after the Audit, not before. Generic timelines are guesses. Scoped timelines are real.",
  },
  {
    question: "Do I need to be technical?",
    answer:
      "No. Your job in this process is knowing your business: how it works, where your time goes, what decisions you make, what breaks. That's it. I handle the technical layer. The AIOS is built for a business owner to use every day, not for an engineer to maintain.",
  },
  {
    question: "What if my business is too small or too early?",
    answer:
      "The Audit will answer that. I've told founders their business isn't ready for a full AIOS build. That's not a failure. It's an accurate read. If your operations aren't complex enough to justify the system yet, I'd rather tell you that upfront than build something you don't need.",
  },
  {
    question: "What happens if something breaks after Setup?",
    answer:
      "Ongoing support is built into every engagement. You're not handed a system and wished luck. Maintenance retainers cover system monitoring, minor updates, and a quarterly review. Growth retainers include active monthly builds if the system needs to expand. You'll know exactly what support looks like before Setup begins.",
  },
  {
    question: "Is this just automation? I already have Zapier.",
    answer:
      "Zapier automates individual tasks. The AIOS changes how your whole business operates. That's not a semantic difference — it's a structural one. Zapier can automate one invoice reminder. The AIOS determines how all of your intake, client management, reporting, and team coordination works without you being in the middle of it. Most businesses that come to me have Zapier. Most of them also have automations that break when something changes and nobody knows why. The AIOS is a system, not a stack of automations. Full audit trails mean you can see every decision it makes.",
  },
  {
    question: "How is this different from hiring an operations consultant?",
    answer:
      "An operations consultant maps your business, writes recommendations, hands you a document, and leaves. You then have to figure out how to implement those recommendations yourself. I build the infrastructure and leave it running. The difference is the gap between a report and a working system. I'm not giving you advice on what to build. I'm building it.",
  },
  {
    question: "What do you actually need from me?",
    answer:
      "Time for the Audit interview, usually one to two sessions. Access to your current tools and platforms so I can understand the actual state of things, not just what you think the state of things is. And honest answers about how the business works, including the parts that don't work. The Audit is only as good as the information it's built on.",
  },
  {
    question: "I've been looking at tools like OpenClaw. How is this different?",
    answer:
      "Tools like OpenClaw promise the same thing: a business that runs without you. But getting there requires significant training and configuration — it's a long ramp before it does anything useful. And the biggest problem is security: because it runs on your own hardware with broad system access, your machine becomes the vulnerability. That's not a setup problem you can patch around. It's the architecture. The Business AI OS doesn't run on separate hardware. I map your business first, build a system around how it actually works, and leave it running — secure, configured, and ready. You get the outcome without the engineering project or the security exposure.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={solutionsWebPageSchema} />
      <JsonLd data={aiTrainingServiceSchema} />
      <JsonLd data={aiosAuditServiceSchema} />
      <JsonLd data={aiosSetupServiceSchema} />
      <JsonLd data={faqPageSchema} />

      {/* Page header */}
      <section className="bg-brand-primary pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="font-display font-black text-[2.25rem] md:text-[3rem] leading-[1.1] text-white mb-4">
            Business AI OS Services
          </h1>
          <p className="text-[1.125rem] leading-[1.65] text-white/85 max-w-[600px]">
            I build the operating layer that runs your business when you&rsquo;re not in the room.
          </p>
        </div>
      </section>

      {/* Module 2.1 — Page Intro + Layers */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack mb-6">
              Most service businesses don&rsquo;t have an operations problem. They have a systems problem. Everything routes through the founder because nothing is set up to run without them.
            </p>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-8">
              The Business AI OS is the fix. Five layers, installed in sequence:
            </p>
            <div className="space-y-4 mb-8">
              {layers.map((layer, i) => (
                <div key={layer.name} className="flex gap-4">
                  <span className="font-display font-black text-[1.25rem] text-brand-accent w-6 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
                    <span className="font-medium">{layer.name}</span> —{" "}
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
              Most engagements start with an Audit — a structured look at where your time is actually going. From there, I scope what to build and in what order.
            </p>
          </div>
        </div>
      </section>

      {/* Module 2.2 — Is this a fit */}
      <section className="bg-brand-light py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-10">
            Is this the right fit?
          </h2>
          <div className="max-w-[680px]">
            <p className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium mb-4">
              This is a fit if:
            </p>
            <div className="space-y-4">
              {fitYes.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="text-brand-accent mt-1 shrink-0">&#10003;</span>
                  <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 2.3 — AI Training */}
      <section id="ai-training" className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <span className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium">
              Service
            </span>
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mt-2 mb-6">
              AI Training
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack mb-4">
              Most teams have access to AI tools. Most aren&rsquo;t using them consistently or well.
            </p>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-4">
              There is a real gap between what AI can do and how the average person in a business actually uses it day to day. That gap creates overwhelm — too many tools, no clear starting point, no shared approach across a team. People default back to what they know.
            </p>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-8">
              I build training specific to your business. Before the first session, I look at how your team actually works: what tools you use, where time goes, what tasks repeat. Then I teach to that. Not a generic overview of what AI can do. A working approach for how your specific team operates.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block bg-brand-primary text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-[#3D263D]"
            >
              Start the conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Module 2.4 — AIOS Audit */}
      <section id="aios-audit" className="bg-neutral-offWhite py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <span className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium">
              Start here
            </span>
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mt-2 mb-6">
              AIOS Audit
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack mb-4">
              The AIOS Audit is a structured mapping of how your business operates: where time goes, where decisions bottleneck, and where an AI system would actually change something. It produces five deliverables: an operational gap map, an AI readiness score, an opportunity matrix ranked by impact and effort, a 90-day roadmap, and a specific recommendation for what the AIOS would look like for your business.
            </p>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-4">
              The Audit typically runs across one to two sessions. It&rsquo;s built around a structured interview that covers your business snapshot, where your time actually goes, how each department operates, your current tool stack, your team&rsquo;s AI experience, and your goals. That becomes a validated process map. The map is what any future build gets scoped against.
            </p>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-6">
              Most people arrive at the Audit having already tried to fix their operations themselves. They&rsquo;ve patched things with tools that almost work. The Audit stops the patching and shows the actual picture.
            </p>

            {/* Deductibility callout */}
            <div className="bg-white border-l-4 border-brand-accent rounded p-6 mb-8">
              <p className="font-display font-black text-[1.125rem] text-neutral-nearBlack mb-2">
                The Audit fee is deductible against your AIOS Setup if you proceed.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                The Audit comes first, and if it leads to building your Business AIOS, that fee carries into it. It&rsquo;s not a sunk cost. It&rsquo;s the first payment on the system we&rsquo;re building.
              </p>
            </div>

            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-8">
              If the Audit concludes that an AIOS isn&rsquo;t the right move for your business right now, I&rsquo;ll tell you that directly. You still leave with a prioritized roadmap, specific enough to act on.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block bg-brand-primary text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-[#3D263D]"
            >
              Start with the Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Module 2.5 — AIOS Setup */}
      <section id="aios-setup" className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium">
                Full build
              </span>
              <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mt-2 mb-6">
                Business AIOS
              </h2>
              <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack mb-6">
                The AIOS Setup is a complete, done-for-you build of your Business AI Operating System. Five layers, installed in sequence, each one building on the last.
              </p>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-6">
                The three outcomes measured:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    kpi: "Away-from-desk autonomy.",
                    desc: "Can you disconnect for a week without things falling apart?",
                  },
                  {
                    kpi: "Task automation percentage.",
                    desc: "What share of your recurring operational work runs without you?",
                  },
                  {
                    kpi: "Revenue per employee.",
                    desc: "Is the business getting more valuable per person as it scales?",
                  },
                ].map((k) => (
                  <div key={k.kpi}>
                    <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
                      <span className="font-medium">{k.kpi}</span> {k.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-8">
                The scope of every Setup is determined after the Audit. After Setup, ongoing support is available.
              </p>
              <Link
                href="/work-with-me"
                className="inline-block bg-brand-primary text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-[#3D263D]"
              >
                Start the conversation
              </Link>
            </div>

            {/* Five layers breakdown */}
            <div className="space-y-1">
              {[
                {
                  n: "01",
                  name: "Context",
                  desc: "The system learns your business. Your terminology, your clients, your priorities, your way of making decisions. Nothing generic. It knows who you are and how you operate.",
                },
                {
                  n: "02",
                  name: "Data",
                  desc: "Your numbers connect. Instead of pulling reports manually from four different platforms, the system surfaces what you need automatically. You stop working in the dark.",
                },
                {
                  n: "03",
                  name: "Intelligence",
                  desc: "What's happening in your business becomes visible without you asking. The system flags what needs your attention instead of everything needing your attention.",
                },
                {
                  n: "04",
                  name: "Automate",
                  desc: "Recurring work runs without you scheduling it. Intake, onboarding, follow-up, reporting. The operational tasks that eat your time run on the system.",
                },
                {
                  n: "05",
                  name: "Build",
                  desc: "The capacity you free up gets directed at growth, not maintenance. The system scales with the business instead of creating new bottlenecks.",
                },
              ].map((layer) => (
                <div
                  key={layer.name}
                  className="border-l-4 border-brand-primary pl-5 py-4"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-black text-[0.8125rem] text-brand-accent tracking-[0.08em]">
                      {layer.n}
                    </span>
                    <h3 className="font-display font-black text-[1.125rem] text-neutral-nearBlack">
                      {layer.name}
                    </h3>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.6] text-neutral-nearBlack/80">
                    {layer.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 2.6b — Ongoing Support */}
      <section className="bg-brand-light py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[680px]">
            <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-6">
              Ongoing Support
            </h2>
            <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack mb-8">
              The system doesn&rsquo;t end at delivery. Most businesses keep evolving after Setup — new hires, new workflows, tools that change. Ongoing support keeps the system current and growing with you.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded border border-[rgba(17,75,95,0.12)] p-7 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                <h3 className="font-display font-black text-[1.25rem] text-neutral-nearBlack mb-3">
                  Maintenance
                </h3>
                <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                  The system stays working. Monitoring, updates when tools or processes change, and a quarterly review. For businesses that have their system built and want it maintained without thinking about it.
                </p>
              </div>
              <div className="bg-white rounded border border-[rgba(17,75,95,0.12)] p-7 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                <h3 className="font-display font-black text-[1.25rem] text-neutral-nearBlack mb-3">
                  Growth
                </h3>
                <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                  Continuous building. New workflows, new automations, new layers as the business expands. The system develops alongside the business — spreading the investment over time and keeping the build moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2.7 — The Process */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-10">
            How working together actually works.
          </h2>
          <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/70 mb-10">
            There are no surprises here. Every step is its own decision.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.num}>
                <span className="font-display font-black text-[2.5rem] text-brand-accent leading-none block mb-3">
                  {step.num}
                </span>
                <h3 className="font-display font-black text-[1.25rem] text-neutral-nearBlack mb-2">
                  {step.name}
                </h3>
                <p className="text-[0.9375rem] leading-[1.6] text-neutral-nearBlack/80">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 2.8 — Now vs. 12 Months */}
      <section className="bg-neutral-offWhite py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-10">
            What changes in 12 months.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-[rgba(17,75,95,0.15)] rounded overflow-hidden">
            {/* Headers */}
            <div className="bg-white px-6 py-4">
              <span className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-accent font-medium">
                Today
              </span>
            </div>
            <div className="bg-brand-light px-6 py-4">
              <span className="text-[0.8125rem] uppercase tracking-[0.08em] text-brand-primary font-medium">
                12 months on the AIOS
              </span>
            </div>
            {/* Rows */}
            {nowVs.map((row, i) => (
              <>
                <div
                  key={`today-${i}`}
                  className="bg-white px-6 py-4 border-t border-[rgba(17,75,95,0.10)]"
                >
                  <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                    {row.today}
                  </p>
                </div>
                <div
                  key={`future-${i}`}
                  className="bg-brand-light px-6 py-4 border-t border-[rgba(17,75,95,0.10)]"
                >
                  <p className="text-[1rem] leading-[1.65] text-brand-dark">
                    {row.future}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Module 2.9 — FAQs */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-neutral-nearBlack mb-10">
            Questions I get asked before anyone books.
          </h2>
          <div className="max-w-[800px]">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Module 2.10 — CTA */}
      <section className="bg-brand-primary py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-display font-black text-[1.75rem] md:text-[2.5rem] leading-[1.15] text-white mb-6 max-w-[560px] mx-auto">
            The Audit is where most people start.
          </h2>
          <p className="text-[1.125rem] leading-[1.65] text-white/85 mb-10 max-w-[480px] mx-auto">
            It&rsquo;s bounded, it&rsquo;s specific, and if it leads to a Setup, the fee comes off the cost.
          </p>
          <Link
            href="/work-with-me"
            className="inline-block bg-brand-coral text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:brightness-110 w-full md:w-auto"
          >
            Start with the Audit
          </Link>
          <p className="mt-4 text-[0.875rem] text-white/60">
            Shannon reads every submission personally. You&rsquo;ll hear back within 48 hours.
          </p>
        </div>
      </section>
    </>
  );
}
