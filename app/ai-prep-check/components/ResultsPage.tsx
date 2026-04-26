"use client";

import Link from "next/link";
import { QuizResult } from "../utils/scoreQuiz";
import { questions } from "../data/questions";

type ResultsPageProps = {
  result: QuizResult;
};

const TIER_CONFIG = {
  1: {
    name: "Your AI Needs More to Work With",
    diagnosis:
      "The honest answer: AI can't do real work in a business that exists mostly in your head. That's not a technology problem. It's a foundation problem. And it's fixable.",
    colorClass: "text-brand-coral",
    bgClass: "bg-brand-coral/15",
    borderClass: "border-brand-coral/25",
    secondaryCta:
      "Curious what staying here is actually costing you? The Business AI OS Assessment calculates the real number — in hours and dollars — based on how your business runs today.",
    knowledgeBase:
      "As you document each process, keep them in one place. A Notion page, a shared drive folder, even a set of Google Docs. The goal is one place where your business knowledge lives and grows. That's your working knowledge base — and it's what makes AI useful later.",
  },
  2: {
    name: "You Have Pieces. You Need a System.",
    diagnosis:
      "You've done some of the work. Parts of your business are documented, some tools connect, some processes are consistent. But patchy foundations produce patchy AI results. The gaps are specific — and specific gaps have specific fixes.",
    colorClass: "text-yellow-400",
    bgClass: "bg-yellow-400/10",
    borderClass: "border-yellow-400/20",
    secondaryCta:
      "Want to see what these gaps are costing you right now? The Business AI OS Assessment breaks it down in real dollars — time you're losing, revenue that's slipping through.",
    knowledgeBase:
      "The pieces you have are a start. Now connect them. One folder, one system, one place where everything you've already documented lives together. That's the difference between scattered notes and a working knowledge base.",
  },
  3: {
    name: "Your Business Is Documented. Now Build the System.",
    diagnosis:
      "You answered yes to all five. Your knowledge is captured. Your processes are repeatable. Your tools share data. Someone could follow your instructions. You know where your time goes. That's the foundation. Most businesses don't have it. You do.",
    colorClass: "text-brand-accent",
    bgClass: "bg-brand-accent/15",
    borderClass: "border-brand-accent/25",
    secondaryCta: null,
    knowledgeBase: null,
  },
};

const GAP_RECOMMENDATIONS: Record<number, string> = {
  0: "Start with one process. Open a doc. Write down every step, in order, the way you actually do it — not how it should work. That's your first SOP. Do this for your top 3 recurring tasks this week.",
  1: "Pick one task you do more than twice a week. Do it the same way, on purpose, for 30 days. Write down the steps the first time. That's your process. Everything else is variation you haven't decided to standardize yet.",
  2: "List every tool you use. Note what data lives in each. Circle every place you re-enter the same information. That list is your integration roadmap — start with the one you touch most.",
  3: "Pick one thing only you know how to do. Record yourself doing it, or write it out step by step. Don't clean it up. Just capture it. That's your first delegation document.",
  4: "For one week, track every task you do and how long it takes. Use a notes app, a spreadsheet, anything. At the end of the week, group tasks by type. That's your time map. Do this once before anything else.",
};

export default function ResultsPage({ result }: ResultsPageProps) {
  const tier = TIER_CONFIG[result.tier];
  const showGaps = result.tier < 3 && result.gaps.length > 0;

  return (
    <div className="min-h-screen bg-base-bg px-6 py-16">
      <div className="w-full max-w-2xl mx-auto space-y-10">

        {/* Score circle */}
        <div className="flex flex-col items-center gap-4">
          <div className={`w-24 h-24 rounded-full border-2 ${tier.borderClass} ${tier.bgClass} flex items-center justify-center`}>
            <span className={`font-display font-black text-3xl ${tier.colorClass}`}>
              {result.score}/5
            </span>
          </div>

          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${tier.bgClass} ${tier.borderClass} ${tier.colorClass}`}>
            {result.tier === 1 ? "Not Ready" : result.tier === 2 ? "Getting There" : "Ready to Build"}
          </div>
        </div>

        {/* Tier headline + diagnosis */}
        <div className="text-center space-y-4">
          <h1 className="font-display font-black text-3xl md:text-4xl text-white leading-tight">
            {tier.name}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            {tier.diagnosis}
          </p>
        </div>

        {/* Per-gap recommendations (Tiers 1 + 2 only) */}
        {showGaps && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-white">
              Here's where to start.
            </h2>

            {result.gaps.map((gapId) => (
              <div key={gapId} className="glass-card rounded-xl p-5 space-y-2">
                <p className={`text-[0.8125rem] font-medium uppercase tracking-wider ${tier.colorClass}`}>
                  {questions[gapId].dimension}
                </p>
                <p className="text-white/80 text-base leading-relaxed">
                  {GAP_RECOMMENDATIONS[gapId]}
                </p>
              </div>
            ))}

            {tier.knowledgeBase && (
              <div className="glass-card rounded-xl p-5 border border-brand-accent/20">
                <p className="text-[0.8125rem] font-medium uppercase tracking-wider text-brand-accent mb-2">
                  Build Your Working Knowledge Base
                </p>
                <p className="text-white/80 text-base leading-relaxed">
                  {tier.knowledgeBase}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tier 3 next step framing */}
        {result.tier === 3 && (
          <div className="glass-card rounded-xl p-6 border border-brand-accent/20 text-center">
            <p className="text-white/80 text-base leading-relaxed">
              The question now isn't whether you're ready. It's where to start — and what the highest-ROI function to systematize first actually is. That's what the Business AI OS Assessment surfaces.
            </p>
          </div>
        )}

        {/* CTA section */}
        <div className="space-y-4 pt-4">
          {tier.secondaryCta && (
            <p className="text-white/50 text-base leading-relaxed text-center">
              {tier.secondaryCta}
            </p>
          )}

          <Link
            href="/business-ai-os-assessment"
            className="block w-full text-center py-4 rounded-xl bg-brand-primary text-white font-display font-black text-base uppercase tracking-widest hover:bg-brand-primary/80 transition-all duration-200"
          >
            Take the Business AI OS Assessment →
          </Link>
        </div>

      </div>
    </div>
  );
}
