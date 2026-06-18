"use client";

import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import type { DifferentiatorCopy } from "@/lib/copy/round1";

interface Props {
  copy: DifferentiatorCopy;
}

const TRUST_SIGNALS = [
  { label: "Specialized agents", desc: "Each with one job." },
  { label: "Full audit trails", desc: "Every decision logged." },
  { label: "You see every move", desc: "Override anytime." },
  { label: "Augment first", desc: "Proves itself before it automates." },
];

export default function Differentiator({ copy }: Props) {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(115deg, #10182f 0%, #1a1430 55%, #2a1422 100%)",
      }}
    >
      {/* Top edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(25,179,194,0.2) 40%, rgba(244,91,105,0.15) 60%, transparent)",
        }}
      />
      {/* Ambient radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 75% 50%, rgba(244,91,105,0.09), transparent 65%)",
        }}
      />

      <div className="relative max-w-content mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-center">

          {/* Left: eyebrow + heading + body */}
          <FadeIn direction="right">
            <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-teal mb-5 font-semibold">
              {copy.eyebrow}
            </span>
            <h2 className="font-display font-normal text-[clamp(28px,4.4vw,58px)] leading-[1.04] tracking-[-0.02em] text-white">
              You see every decision the system makes.{" "}
              <em className="italic text-coral">No black box.</em>
            </h2>

            <StaggerChildren className="mt-8 space-y-5">
              {copy.body.map((para, i) => (
                <StaggerItem key={i}>
                  <p className="text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75">
                    {para}
                  </p>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </FadeIn>

          {/* Right: trust signal cards */}
          <FadeIn delay={0.2} direction="left">
            <div className="space-y-3">
              {TRUST_SIGNALS.map((sig) => (
                <div
                  key={sig.label}
                  className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-5 py-4 transition-colors duration-300 hover:border-teal/25"
                >
                  <span
                    className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#19b3c2", boxShadow: "0 0 10px rgba(25,179,194,0.5)" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-white">{sig.label}</p>
                    <p className="text-[13px] text-paper/50 mt-0.5">{sig.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
