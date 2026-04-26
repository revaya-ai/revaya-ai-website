"use client";

import { useState } from "react";
import { questions } from "./data/questions";
import { scoreQuiz, QuizResult } from "./utils/scoreQuiz";
import { savePrepCheckResponse } from "./utils/savePrepCheck";
import LandingSection from "./components/LandingSection";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import EmailCapture from "./components/EmailCapture";
import ResultsPage from "./components/ResultsPage";

type Screen = "landing" | "questions" | "email-capture" | "results";

export default function PrepCheckApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = () => {
    setScreen("questions");
  };

  const handleAnswer = (yes: boolean) => {
    const newAnswers = { ...answers, [currentIndex]: yes };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const scored = scoreQuiz(newAnswers);
      setResult(scored);
      setScreen("email-capture");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    setIsSubmitting(true);
    try {
      if (result) {
        await savePrepCheckResponse({ name, email, result });
      }
    } catch {
      // Non-blocking — show results even if save fails
    } finally {
      setIsSubmitting(false);
      setScreen("results");
    }
  };

  if (screen === "landing") {
    return (
      <div className="min-h-screen bg-base-bg flex items-center justify-center px-6 py-16">
        <LandingSection onStart={handleStart} />
      </div>
    );
  }

  if (screen === "questions") {
    return (
      <div className="min-h-screen bg-base-bg flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl mx-auto">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <QuestionCard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            showBack={currentIndex > 0}
          />
        </div>
      </div>
    );
  }

  if (screen === "email-capture") {
    return (
      <EmailCapture onSubmit={handleEmailSubmit} isLoading={isSubmitting} />
    );
  }

  if (screen === "results" && result) {
    return <ResultsPage result={result} />;
  }

  return null;
}
