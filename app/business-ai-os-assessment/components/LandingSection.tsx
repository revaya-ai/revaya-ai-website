"use client";

interface LandingSectionProps {
  onStart: () => void;
}

export default function LandingSection({ onStart }: LandingSectionProps) {
  return (
    <div className="min-h-screen bg-base-bg flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">

        {/* Eyebrow */}
        <div>
          <span className="text-[0.75rem] uppercase tracking-[0.14em] text-brand-accent font-medium">
            Business AI OS Assessment
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-[1.08]">
          Where Is Your Business Running You Instead of the Other Way Around?
        </h1>

        {/* Subhead */}
        <p className="text-white text-lg leading-relaxed max-w-xl mx-auto">
          29 questions. Personalized ROI scorecard. Find out exactly where your
          business is leaking time and revenue, and what to do about it.
        </p>

        {/* Value prop cards */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: "Find the Gaps", sub: "Six critical areas scored" },
            { label: "See the Math", sub: "Your ROI in real dollars" },
            { label: "5 Minutes", sub: "Start to scorecard" },
          ].map(({ label, sub }) => (
            <div
              key={label}
              className="glass-card rounded-xl px-4 py-5 text-center"
            >
              <p className="font-display font-black text-white text-sm">{label}</p>
              <p className="text-white/40 text-[15px] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-4">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-brand-primary text-white font-display font-black text-sm hover:bg-brand-primary/80 transition-all duration-200 glow-purple"
          >
            Start the Assessment
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-white/25 text-xs pt-2">
          No sales call required to see your results.
        </p>
      </div>
    </div>
  );
}
