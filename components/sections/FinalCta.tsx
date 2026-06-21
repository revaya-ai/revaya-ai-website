"use client";

import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import type { FinalCtaCopy } from "@/lib/copy/round1";

interface Props {
  copy: FinalCtaCopy;
}

export default function FinalCta({ copy }: Props) {
  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 140% at 20% 0%, rgba(25,179,194,0.14) 0%, transparent 60%), #0b1230",
      }}
    >
      {/* Soft glow behind the CTA button area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(25,179,194,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(25,179,194,0.3) 50%, transparent)",
        }}
      />

      <div className="relative max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-end">

          {/* Heading */}
          <FadeIn direction="right">
            <h2 className="font-display font-normal text-[clamp(30px,5vw,72px)] leading-[0.98] tracking-[-0.025em] text-white">
              Tell us the one problem that is{" "}
              <em className="italic text-teal">costing you the most.</em>
            </h2>
          </FadeIn>

          {/* Body + CTA */}
          <FadeIn delay={0.15} direction="left">
            <div className="space-y-5">
              {copy.body.map((para, i) => (
                <p key={i} className="text-[clamp(15px,1.1vw,17px)] leading-[1.72] text-paper/70">
                  {para}
                </p>
              ))}

              <div className="pt-2">
                <Link
                  href={copy.cta.href}
                  className="inline-flex items-center gap-2 bg-coral text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(244,91,105,0.65)]"
                >
                  {copy.cta.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <p className="mt-3 text-[12px] text-paper/35">
                  No pitch. Just a conversation.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
