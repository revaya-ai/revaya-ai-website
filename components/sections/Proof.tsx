"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import type { ProofCopy } from "@/lib/copy/round1";

interface Props {
  copy: ProofCopy;
}

function InlineCountUp({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip animation, show final number immediately
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const duration = 1400; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return <>{value}</>;
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
            Years building digital products.{" "}
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
            {/* Large display number — inline count-up, no nested section */}
            <div className="mb-8">
              <div className="flex flex-col items-start gap-1">
                <span
                  className="font-display font-normal text-[clamp(64px,8vw,96px)] leading-none tracking-[-0.03em] text-teal tabular-nums"
                  suppressHydrationWarning
                >
                  <InlineCountUp target={18} />
                </span>
                <span className="text-[12px] tracking-[0.18em] uppercase text-paper/45 font-semibold">
                  years of digital product work
                </span>
              </div>
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

            {/* Proof slot: add a named client result here when one lands */}
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
