"use client";

import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import type { CostOfStayingSameCopy } from "@/lib/copy/round1";

interface Props {
  copy: CostOfStayingSameCopy;
}

export default function CostOfStayingSame({ copy }: Props) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 100% 60%, rgba(244,91,105,0.08), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-start">

          {/* Left: heading block */}
          <FadeIn direction="right">
            <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-teal mb-5 font-semibold">
              {copy.eyebrow}
            </span>
            <h2 className="font-display font-normal text-[clamp(28px,4.2vw,54px)] leading-[1.06] tracking-[-0.02em] text-white">
              The most expensive problem in your business is the one nobody has{" "}
              <em className="italic text-coral">put a number on</em> yet.
            </h2>

            {/* Two-currency labels — structural hooks for future toggle */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4" aria-label="Cost framing options">
              <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-5 py-4">
                <p className="text-[11px] tracking-[0.18em] uppercase text-teal/80 mb-1 font-semibold">Calculation by Head</p>
                <p className="text-sm text-paper/60 leading-snug">
                  The hire you keep almost making, fully loaded.
                </p>
              </div>
              <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-5 py-4">
                <p className="text-[11px] tracking-[0.18em] uppercase text-paper/50 mb-1 font-semibold">Calculation by Hourly $</p>
                <p className="text-sm text-paper/60 leading-snug">
                  The hours that disappear week after week.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: body paragraphs */}
          <FadeIn delay={0.15} direction="left">
            <StaggerChildren className="space-y-5">
              {copy.body.map((para, i) => (
                <StaggerItem key={i}>
                  <p
                    className="text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75"
                  >
                    {para}
                  </p>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
