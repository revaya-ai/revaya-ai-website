"use client";

import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import type { WhatWeDoCopy } from "@/lib/copy/round1";

interface Props {
  copy: WhatWeDoCopy;
}

export default function WhatWeDo({ copy }: Props) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle divider glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(25,179,194,0.25) 40%, rgba(85,53,85,0.2) 60%, transparent)",
        }}
      />
      {/* Ambient teal glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 10% 50%, rgba(25,179,194,0.07), transparent 65%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Eyebrow + heading centered */}
        <FadeIn className="text-center max-w-[680px] mx-auto mb-16">
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-teal mb-5 font-semibold">
            {copy.eyebrow}
          </span>
          <h2 className="font-display font-normal text-[clamp(30px,4.6vw,58px)] leading-[1.04] tracking-[-0.02em] text-white">
            We find the one problem costing you the most, and build a system that runs it{" "}
            <em className="italic text-teal">the way you would.</em>
          </h2>
        </FadeIn>

        {/* Body paragraphs in 2-col grid on large screens */}
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            <StaggerChildren className="space-y-5">
              {copy.body.slice(0, 2).map((para, i) => (
                <StaggerItem key={i}>
                  <p className="text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75">{para}</p>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <StaggerChildren className="space-y-5">
              {copy.body.slice(2).map((para, i) => (
                <StaggerItem key={i}>
                  <p className="text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75">{para}</p>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </FadeIn>

        {/* Ghost link to AIOS page */}
        <FadeIn delay={0.25} className="mt-10">
          <Link
            href="/business-ai-operating-system"
            className="inline-flex items-center gap-2 text-[14px] text-teal/80 hover:text-teal transition-colors border-b border-teal/25 hover:border-teal/60 pb-0.5"
          >
            See the full system
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
