"use client";

import { useState } from "react";
import { AssessmentAnswers, ROIResults } from "./types/assessment";
import { questions } from "./data/questions";
import { calculateROI } from "./utils/calculateROI";
import { saveAssessmentResponse } from "./utils/saveAssessment";
import LandingSection from "./components/LandingSection";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import EmailCapture from "./components/EmailCapture";
import ResultsPage from "./components/ResultsPage";

type Screen = "landing" | "questions" | "email-capture" | "results";

export function AssessmentApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [results, setResults] = useState<ROIResults | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleStart = () => {
    setScreen("questions");
  };

  const advanceQuestion = (updatedAnswers: AssessmentAnswers) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      // All 29 questions answered — calculate ROI immediately before email capture
      const computed = calculateROI(updatedAnswers);
      setResults(computed);
      setScreen("email-capture");
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleSelectOption = (optionIndex: number, points: number) => {
    const updated: AssessmentAnswers = {
      ...answers,
      [currentQuestion.id]: { selectedOption: optionIndex, points },
    };
    setAnswers(updated);
    // Auto-advance on single-select
    setTimeout(() => advanceQuestion(updated), 150);
  };

  const handleSliderChange = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        sliderValue: value,
        points: 0,
      },
    }));
  };

  const handleSliderConfirm = () => {
    const current = answers[currentQuestion.id];
    const sliderValue =
      current?.sliderValue ?? currentQuestion.sliderConfig?.default ?? 0;
    const updated: AssessmentAnswers = {
      ...answers,
      [currentQuestion.id]: { sliderValue, points: 0 },
    };
    setAnswers(updated);
    advanceQuestion(updated);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleEmailSubmit = async (name: string, emailAddress: string) => {
    setIsSubmitting(true);
    setEmail(emailAddress);

    try {
      if (results) {
        await saveAssessmentResponse({
          email: emailAddress,
          name,
          answers,
          results,
        });
      }
    } catch (err) {
      // Don't block user from seeing results if Supabase fails
      console.error("Failed to save assessment:", err);
    } finally {
      setIsSubmitting(false);
      setScreen("results");
    }
  };

  if (screen === "landing") {
    return <LandingSection onStart={handleStart} />;
  }

  if (screen === "email-capture") {
    return <EmailCapture onSubmit={handleEmailSubmit} isLoading={isSubmitting} />;
  }

  if (screen === "results" && results) {
    return <ResultsPage results={results} answers={answers} email={email} />;
  }

  // Questions screen
  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <ProgressBar
            currentSection={currentQuestion.section}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
          />
        </div>
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          selectedOption={answers[currentQuestion.id]?.selectedOption}
          sliderValue={answers[currentQuestion.id]?.sliderValue}
          onSelectOption={handleSelectOption}
          onSliderChange={handleSliderChange}
          onSliderConfirm={handleSliderConfirm}
          onBack={handleBack}
          showBack={currentIndex > 0}
        />
      </div>
    </div>
  );
}
