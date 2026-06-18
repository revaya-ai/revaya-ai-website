import JsonLd from "@/components/JsonLd";
import { homeWebPageSchema } from "@/lib/schema";
import DataFlowHero from "@/components/DataFlowHero";
import { FadeIn } from "@/components/FadeIn";
import CostOfStayingSame from "@/components/sections/CostOfStayingSame";
import WhatWeDo from "@/components/sections/WhatWeDo";
import FourLayers from "@/components/sections/FourLayers";
import Differentiator from "@/components/sections/Differentiator";
import Proof from "@/components/sections/Proof";
import FinalCta from "@/components/sections/FinalCta";
import { homeCopy } from "@/lib/copy/round1";

export const metadata = {
  title: "Business AI Operating System for Business Owners | Revaya AI",
  description:
    "We find the most expensive problem in your business and build a system that runs it the way you would. Specialized agents, full audit trails, no black box.",
  keywords: [
    "Business AI Operating System",
    "Business AI OS",
    "AI consultant",
    "business owner AI system",
    "Shannon Winnicki",
    "Revaya AI",
  ],
  openGraph: {
    title: "Business AI Operating System | Revaya AI",
    description:
      "We find the most expensive problem in your business and build a system that runs it the way you would. Specialized agents, full audit trails, no black box.",
  },
};

export default function HomePage() {
  return (
    <div className="bg-ink text-paper overflow-hidden">
      <JsonLd data={homeWebPageSchema} />

      {/* Full-page ambient orbs — fixed, behind everything */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute -top-40 -right-40 w-[900px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(25,179,194,0.18), rgba(85,53,85,0.12) 48%, transparent 72%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[55%] -left-60 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,91,105,0.08), transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(25,179,194,0.07), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <DataFlowHero
          eyebrow={homeCopy.hero.eyebrow}
          headline={
            <>
              What is the one problem you can&rsquo;t hire for, can&rsquo;t solve, and{" "}
              <em className="italic text-teal">can&rsquo;t scale?</em>
            </>
          }
          subcopy={homeCopy.hero.subcopy}
          primaryCta={homeCopy.hero.primaryCta}
          secondaryCta={homeCopy.hero.secondaryCta}
        />
      </div>

      {/* ── SECTION DIVIDER TICKER ────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-y border-white/[0.07] py-4"
        style={{ zIndex: 1 }}
      >
        <div
          className="marquee-inner flex gap-10 whitespace-nowrap text-[11px] tracking-[0.22em] uppercase text-paper/30 font-medium"
          style={{ animation: "marquee 32s linear infinite", width: "max-content" }}
        >
          {[...Array(4)].flatMap((_, ri) =>
            ["Context", "Data", "Intelligence", "Automate", "Full audit trail", "No black box", "One problem first"].map(
              (item, i) => (
                <span key={`${ri}-${i}`} className="flex items-center gap-10">
                  {item}
                  <span className="text-teal/40">/</span>
                </span>
              )
            )
          )}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-25%); } } @media (prefers-reduced-motion: reduce) { .marquee-inner { animation: none; } }`}</style>
      </div>

      {/* ── SECTIONS ──────────────────────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <FadeIn>
          <CostOfStayingSame copy={homeCopy.costOfStayingSame} />
        </FadeIn>

        <FadeIn>
          <WhatWeDo copy={homeCopy.whatWeDo} />
        </FadeIn>

        <FadeIn>
          <FourLayers copy={homeCopy.fourLayers} />
        </FadeIn>

        <FadeIn>
          <Differentiator copy={homeCopy.differentiator} />
        </FadeIn>

        <FadeIn>
          <Proof copy={homeCopy.proof} />
        </FadeIn>

        <FinalCta copy={homeCopy.finalCta} />
      </div>
    </div>
  );
}
