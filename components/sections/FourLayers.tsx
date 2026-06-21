"use client";

import { FadeIn } from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import type { FourLayersCopy } from "@/lib/copy/round1";

interface Props {
  copy: FourLayersCopy;
}

// One accent colour per layer — teal / purple-lift / paper / coral
const LAYER_COLORS = [
  { dot: "#19b3c2", label: "text-teal" },
  { dot: "#9a6e9a", label: "text-[#9a6e9a]" },
  { dot: "#E4FDE1", label: "text-paper" },
  { dot: "#F45B69", label: "text-coral" },
];

export default function FourLayers({ copy }: Props) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(13,26,74,0.45) 0%, rgba(85,53,85,0.18) 55%, rgba(7,11,28,0) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Section header */}
        <FadeIn className="max-w-[700px] mb-16">
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-teal mb-5 font-semibold">
            {copy.eyebrow}
          </span>
          <h2 className="font-display font-normal text-[clamp(28px,4.2vw,54px)] leading-[1.06] tracking-[-0.02em] text-white">
            {copy.heading}
          </h2>
          <p className="mt-6 text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-paper/65 max-w-[560px]">
            {copy.intro}
          </p>
        </FadeIn>

        {/* Layers — editorial sequence, not card grid */}
        <StaggerChildren className="divide-y divide-white/[0.07]">
          {copy.layers.map((layer, i) => {
            const color = LAYER_COLORS[i];
            return (
              <StaggerItem key={layer.name}>
                <div className="group grid grid-cols-[2.5rem_1fr] md:grid-cols-[5rem_1fr_1.8fr] gap-x-6 md:gap-x-12 gap-y-2 py-7 md:py-8 items-start">
                  {/* Number */}
                  <span
                    className="font-display text-[clamp(13px,1.1vw,15px)] font-normal tabular-nums pt-0.5"
                    style={{ color: color.dot }}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>

                  {/* Layer name */}
                  <h3
                    className={`font-display font-normal text-[clamp(22px,2.8vw,38px)] leading-none tracking-[-0.01em] transition-colors duration-300 group-hover:opacity-90 ${color.label}`}
                  >
                    {layer.name}
                  </h3>

                  {/* Body — hidden on mobile col-2, full width on md+ col-3 */}
                  <p className="col-start-2 md:col-start-3 row-start-2 md:row-start-auto text-[clamp(14px,1.05vw,16px)] leading-[1.72] text-paper/65 max-w-[46ch]">
                    {layer.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* Closing trust moment */}
        <FadeIn delay={0.2} className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm px-7 py-6 max-w-[720px]">
          <p className="text-[14px] leading-[1.7] text-paper/60">
            {copy.closing}
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
