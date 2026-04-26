"use client";

import { PrepQuestion } from "../data/questions";

type QuestionCardProps = {
  question: PrepQuestion;
  onAnswer: (yes: boolean) => void;
  onBack: () => void;
  showBack: boolean;
};

export default function QuestionCard({ question, onAnswer, onBack, showBack }: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-[0.8125rem] font-medium uppercase tracking-widest text-brand-accent mb-4">
        {question.dimension}
      </p>

      <h2 className="font-display font-black text-2xl md:text-3xl text-white leading-tight mb-3">
        {question.text}
      </h2>

      {question.helperText && (
        <p className="text-white/50 text-[0.9375rem] mb-8">
          {question.helperText}
        </p>
      )}

      {!question.helperText && <div className="mb-8" />}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAnswer(true)}
          className="w-full text-left px-6 py-4 rounded-xl border border-white/10 bg-white/4 text-white font-body text-base transition-all duration-150 hover:border-brand-accent hover:bg-brand-accent/10 focus:outline-none focus:border-brand-accent"
        >
          {question.yesLabel}
        </button>

        <button
          onClick={() => onAnswer(false)}
          className="w-full text-left px-6 py-4 rounded-xl border border-white/10 bg-white/4 text-white font-body text-base transition-all duration-150 hover:border-brand-accent hover:bg-brand-accent/10 focus:outline-none focus:border-brand-accent"
        >
          {question.noLabel}
        </button>
      </div>

      {showBack && (
        <button
          onClick={onBack}
          className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
