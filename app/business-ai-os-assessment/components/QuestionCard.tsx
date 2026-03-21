"use client";

import { useState } from "react";
import { Question } from "../types/assessment";
import SliderInput from "./SliderInput";

interface QuestionCardProps {
  question: Question;
  selectedOption?: number;
  sliderValue?: number;
  onSelectOption: (optionIndex: number, points: number) => void;
  onSliderChange: (value: number) => void;
  onSliderConfirm: () => void;
  onBack: () => void;
  showBack: boolean;
}

export default function QuestionCard({
  question,
  selectedOption,
  sliderValue,
  onSelectOption,
  onSliderChange,
  onSliderConfirm,
  onBack,
  showBack,
}: QuestionCardProps) {
  const [localSlider, setLocalSlider] = useState(
    sliderValue ?? question.sliderConfig?.default ?? question.sliderConfig?.min ?? 0
  );

  const handleSliderChange = (value: number) => {
    setLocalSlider(value);
    onSliderChange(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Section eyebrow */}
      <div className="mb-6">
        <span className="text-[0.75rem] uppercase tracking-[0.14em] text-brand-accent font-medium">
          {question.section}
        </span>
      </div>

      {/* Question text */}
      <h2 className="font-display text-2xl font-black text-white mb-2 leading-tight">
        {question.text}
      </h2>

      {/* Helper text */}
      {question.helperText && (
        <p className="text-white/50 text-sm mb-8">{question.helperText}</p>
      )}
      {!question.helperText && <div className="mb-8" />}

      {/* Single-select options */}
      {question.type === "single-select" && question.options && (
        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = selectedOption === i;
            return (
              <button
                key={i}
                onClick={() => onSelectOption(i, option.points)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 text-sm leading-snug ${
                  isSelected
                    ? "border-brand-accent bg-brand-accent/10 text-white"
                    : "border-white/10 bg-white/4 text-white/80 hover:border-white/25 hover:bg-white/8"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Slider */}
      {question.type === "slider" && question.sliderConfig && (
        <div className="space-y-8">
          <SliderInput
            value={localSlider}
            min={question.sliderConfig.min}
            max={question.sliderConfig.max}
            prefix={question.sliderConfig.prefix}
            suffix={question.sliderConfig.suffix}
            onChange={handleSliderChange}
          />
          <button
            onClick={onSliderConfirm}
            className="w-full py-4 rounded-full bg-brand-primary text-white font-display font-black text-sm uppercase tracking-widest hover:bg-brand-primary/80 transition-colors"
          >
            Confirm
          </button>
        </div>
      )}

      {/* Back button */}
      {showBack && (
        <button
          onClick={onBack}
          className="mt-6 text-white text-sm hover:text-brand-accent transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
