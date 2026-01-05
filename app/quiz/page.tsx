"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/Navigation";
import { QuizQuestion, QuizProgress, QuizLoader } from "@/app/components/quiz";
import {
  getQuizQuestions,
  AnswerValue,
  UserAnswers,
} from "@/app/lib/quizData";

export default function QuizPage() {
  const router = useRouter();
  const questions = getQuizQuestions();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = currentAnswer !== null;
  const canGoPrevious = currentQuestionIndex > 0;

  const handleAnswerSelect = useCallback((answer: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  }, [currentQuestion?.id]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(() => {
    // Store answers in sessionStorage for the results page
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    setIsLoading(true);
  }, [answers]);

  const handleLoadingComplete = useCallback(() => {
    router.push("/quiz/results");
  }, [router]);

  // Show loading animation
  if (isLoading) {
    return <QuizLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      {/* Quiz Content */}
      <main className="pt-4 pb-24 lg:pt-24">
        {/* Question */}
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onAnswerSelect={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        )}
      </main>

      {/* Progress Bar and Navigation */}
      <QuizProgress
        currentStep={currentQuestionIndex}
        totalSteps={questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        isLastQuestion={isLastQuestion}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
