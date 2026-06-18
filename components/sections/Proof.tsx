"use client";

import { FadeIn } from "@/components/FadeIn";
import CountUpStats from "@/components/CountUpStats";
import type { ProofCopy } from "@/lib/copy/round1";

interface Props {
  copy: ProofCopy;
}

export default function Proof({ copy }: Props) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 100%, rgba(25,179,194,0.07), transparent 65%)",
        }}
      />

      <div className="relative max-w-content mx-auto px-6 lg:px-12">

        {/* Eyebrow */}
        <FadeIn className="mb-12 md:mb-16">
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-teal mb-6 font-semibold">
            {copy.eyebrow}
          </span>
          <h2 className="font-display font-normal text-[clamp(26px,3.8vw,50px)] leading-[1.06] tracking-[-0.02em] text-white max-w-[22ch]">
            {/* Headline with 18 as CountUp */}
            <span className="inline-flex items-baseline gap-0">
              <span
                className="font-display font-normal text-[clamp(26px,3.8vw,50px)] leading-[1.06] tracking-[-0.02em] text-teal"
                suppressHydrationWarning
              >
                18
              </span>
              &nbsp;years building digital products.
            </span>{" "}
            Now that work goes into{" "}
            <em className="italic text-teal">one business at a time.</em>
          </h2>
        </FadeIn>

        {/* Two-col: body left, number + brands right */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start">

          {/* Body copy */}
          <FadeIn direction="right" className="space-y-5">
            {copy.body.map((para, i) => (
              <p key={i} className="text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75">
                {para}
              </p>
            ))}
          </FadeIn>

          {/* Number + brands */}
          <FadeIn delay={0.15} direction="left">
            {/* Large display number */}
            <div className="mb-8">
              <CountUpStats
                stats={[{ target: 18, suffix: "", label: "years of digital product work" }]}
              />
            </div>

            {/* Brand names */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm px-6 py-5">
              <p className="text-[11px] tracking-[0.18em] uppercase text-paper/40 mb-3 font-semibold">
                Built across
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {copy.brands.map((brand) => (
                  <span key={brand} className="text-[14px] font-semibold text-paper/90">
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Proof slot placeholder — honest, tasteful */}
            <div className="mt-4 rounded-xl border border-dashed border-white/[0.08] px-6 py-4">
              <p className="text-[12px] text-paper/30 italic leading-snug">
                First named client result will appear here. Launching credentials-only.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
