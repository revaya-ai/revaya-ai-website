import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { workWithMeContactPageSchema } from "@/lib/schema";
import ContactForm from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

export const metadata: Metadata = {
  title: "Work With Me — Revaya AI",
  description:
    "Tell me what's slowing you down. I read every submission personally and respond within 48 hours if it's a fit.",
};

const nextSteps = [
  "I review your submission personally.",
  "If it looks like a fit, I'll reach out within 48 hours — either with a couple of follow-up questions or a link to book time.",
  "The first conversation is a real discussion about your situation. Not a pitch. A chance to understand whether the AIOS makes sense for where your business is right now.",
];

export default function WorkWithMePage() {
  return (
    <>
      <JsonLd data={workWithMeContactPageSchema} />

      {/* Page header */}
      <section className="relative overflow-hidden bg-[#0A0F14] pt-36 pb-20 md:pt-44 md:pb-24">
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
              Let&rsquo;s talk about what&rsquo;s slowing you down.
            </h1>
            <p className="text-[1.125rem] leading-[1.65] text-white/65 max-w-[520px]">
              Tell me what&rsquo;s going on in your business. The honest version, not the polished one.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + What happens next */}
      <section className="bg-[#111820] py-20 md:py-24">
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
                    If the AIOS isn&rsquo;t the right fit for where your business is right now, I&rsquo;ll say so. You&rsquo;re not signing up for a pitch. You&rsquo;re starting a real conversation.
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
