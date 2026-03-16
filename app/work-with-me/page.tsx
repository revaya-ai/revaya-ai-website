import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { workWithMeContactPageSchema } from "@/lib/schema";
import ContactForm from "@/components/ContactForm";

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
      <section className="bg-brand-primary pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="font-display font-black text-[2.25rem] md:text-[3rem] leading-[1.1] text-white mb-4">
            Let&rsquo;s talk about what&rsquo;s slowing you down.
          </h1>
          <p className="text-[1.125rem] leading-[1.65] text-white/85 max-w-[560px]">
            Tell me what&rsquo;s going on in your business. The honest version, not the polished one.
          </p>
        </div>
      </section>

      {/* Form + What happens next */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
            {/* Form */}
            <div className="max-w-[560px]">
              <ContactForm />
            </div>

            {/* What happens next sidebar */}
            <div className="md:sticky md:top-24">
              <h2 className="font-display font-black text-[1.375rem] text-neutral-nearBlack mb-6">
                What happens after you submit.
              </h2>
              <ol className="space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display font-black text-[1.25rem] text-brand-accent shrink-0 w-5 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
