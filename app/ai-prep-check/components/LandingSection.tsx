type LandingSectionProps = {
  onStart: () => void;
};

const valueProps = [
  { label: "5 Questions" },
  { label: "Instant Result" },
  { label: "Free to Take" },
];

export default function LandingSection({ onStart }: LandingSectionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <p className="text-[0.8125rem] font-medium uppercase tracking-widest text-brand-accent mb-6">
        The AI Prep Check
      </p>

      <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-5">
        Does Your Business Have What AI Needs to Work?
      </h1>

      <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
        5 questions. 2 minutes. Find out if your business is documented enough
        for AI to do real work — and exactly what to fix if it isn't.
      </p>

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {valueProps.map((prop) => (
          <div
            key={prop.label}
            className="glass-card px-5 py-3 rounded-xl text-sm text-white/80 font-body"
          >
            {prop.label}
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="glow-purple bg-brand-primary text-white font-body font-medium text-[0.9375rem] px-8 py-4 rounded-xl transition-all duration-200 hover:opacity-90"
      >
        Start the Check →
      </button>

      <p className="mt-5 text-white/30 text-sm">
        No sales call. No pitch. Just an honest answer.
      </p>
    </div>
  );
}
