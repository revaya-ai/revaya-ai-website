import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { workWithMeContactPageSchema } from "@/lib/schema";
import ContactForm from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

export const metadata: Metadata = {
  title: "Work With Me | Business AI Operating System",
  description:
    "You already know something has to change. Tell Shannon Winnicki about your business. Business AI Operating System engagements for founder-led service businesses.",
};

const nextSteps = [
  "I review your submission personally.",
  "If it looks like a fit, I'll reach out within 48 hours — either with a follow-up question or a link to book time.",
  "The first conversation is about your situation. Not a pitch. I want to understand whether the AIOS makes sense for where your business is right now.",
];

export default function WorkWithMePage() {
  return (
    <>
      <JsonLd data={workWithMeContactPageSchema} />

      {/* Page header */}
      <section className="relative overflow-hidden pt-32 pb-8 md:pt-44 md:pb-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#553555]/20 blur-[130px] animate-pulse-glow" />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#028090]/12 blur-[100px] animate-pulse-glow"
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
              Start the conversation
            </span>
            <h1 className="font-display font-black text-[2.5rem] md:text-[3.5rem] leading-[1.05] text-white mb-5">
              You already know something has to change.
            </h1>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 max-w-[520px]">
              Tell me what&rsquo;s going on in your business. The honest version, not the polished one.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + What happens next */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
            {/* Form */}
            <FadeIn direction="left">
              <div className="max-w-[560px]">
                <ContactForm />
              </div>
            </FadeIn>

            {/* What happens next sidebar */}
            <FadeIn direction="right" delay={0.15}>
              <div className="md:sticky md:top-24">
                <h2 className="font-display font-black text-[1.375rem] text-white mb-6">
                  What happens after you submit.
                </h2>
                <StaggerChildren className="space-y-5">
                  {nextSteps.map((step, i) => (
                    <StaggerItem key={i}>
                      <div className="flex gap-4 glass-card rounded-xl px-5 py-4">
                        <span className="font-display font-black text-[1.25rem] text-[#028090] shrink-0 w-5 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-[1rem] leading-[1.65] text-white/65">
                          {step}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
                <div className="mt-8 glass-card rounded-xl p-5 border-l-2 border-[#028090]">
                  <p className="text-[0.875rem] text-white/50 leading-[1.65]">
                    If it&rsquo;s not the right fit, I&rsquo;ll tell you that. No pitch, no pressure. Just an honest read on whether this makes sense for your business.
                  </p>
                </div>
                <div className="mt-4 glass-card rounded-xl p-5 border-l-2 border-[#553555]">
                  <p className="text-[0.875rem] text-white/50 leading-[1.65]">
                    I take on a small number of AIOS engagements at a time. If it&rsquo;s not the right moment, I&rsquo;ll tell you that too.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
