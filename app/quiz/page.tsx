"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { QuizQuestion, QuizProgress, QuizLoader } from "@/app/components/quiz";
import {
  getQuizQuestions,
  AnswerValue,
  UserAnswers,
  calculateQuizResults,
} from "@/app/lib/quizData";
import { useQuizAnalytics } from "@/app/hooks/useQuizAnalytics";

export default function QuizPage() {
  const router = useRouter();
  const questions = getQuizQuestions();
  const { onQuestionView, onAnswerSelect: trackAnswer, onQuizComplete } = useQuizAnalytics();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = currentAnswer !== null;
  const canGoPrevious = currentQuestionIndex > 0;

  // Track when question changes
  useEffect(() => {
    onQuestionView();
  }, [currentQuestionIndex, onQuestionView]);

  const handleAnswerSelect = useCallback((answer: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    // Find the selected option to get the label
    const selectedOption = currentQuestion.options.find(opt => opt.value === answer);
    if (selectedOption) {
      // Track the answer in Convex
      trackAnswer(
        currentQuestion.id,
        currentQuestion.question,
        currentQuestion.measures,
        answer,
        selectedOption.label,
        currentQuestionIndex + 1
      );
    }
  }, [currentQuestion, currentQuestionIndex, trackAnswer]);

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

  const handleSubmit = useCallback(async () => {
    // Store answers in sessionStorage for the results page
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    
    // Calculate results and track completion in Convex
    const results = calculateQuizResults(answers);
    if (results.length > 0) {
      await onQuizComplete(
        results[0].protocolId,
        results.map(r => ({
          protocolId: r.protocolId,
          percentage: r.percentage,
          totalPoints: r.totalPoints,
        }))
      );
    }
    
    setIsLoading(true);
  }, [answers, onQuizComplete]);

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
