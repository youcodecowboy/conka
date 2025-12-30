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
  
  const [cartOpen, setCartOpen] = useState(false);
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
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />

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

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--background)] border-l-2 border-current shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b-2 border-current">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:opacity-70 transition-all"
                  aria-label="Close cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p className="font-clinical text-sm">Your cart is empty</p>
                  <p className="font-commentary text-sm mt-2">
                    add some brain fuel!
                  </p>
                </div>
              </div>
              <div className="p-6 border-t-2 border-current">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-clinical text-sm">Subtotal</span>
                  <span className="font-clinical text-lg font-bold">£0.00</span>
                </div>
                <button className="neo-button w-full px-8 py-4 font-semibold text-lg">
                  Checkout
                </button>
                <p className="font-clinical text-xs text-center mt-3 opacity-70">
                  Free UK shipping on orders over £50
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

