"use client";

interface ProgressBarProps {
  currentSection: string;
  questionIndex: number;
  totalQuestions: number;
}

export default function ProgressBar({
  currentSection,
  questionIndex,
  totalQuestions,
}: ProgressBarProps) {
  const pct = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-brand-primary uppercase tracking-widest">
          {currentSection}
        </span>
        <span className="text-white/40">
          {questionIndex + 1} of {totalQuestions}
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/10">
        <div
          className="h-1 rounded-full bg-brand-accent transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
