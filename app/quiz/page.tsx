"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
import {
  trackQuizStarted,
  trackQuizQuestionViewed,
  trackQuizAnswerSelected,
  trackQuizCompleted,
} from "@/app/lib/analytics";

export default function QuizPage() {
  const router = useRouter();
  const questions = getQuizQuestions();
  const { sessionId, onQuestionView, onAnswerSelect: trackAnswer, onQuizComplete } = useQuizAnalytics();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Track time for analytics
  const questionStartTime = useRef<number>(Date.now());
  const previousQuestionTime = useRef<number | null>(null);
  const quizStartedTracked = useRef<boolean>(false);
  const visitedQuestions = useRef<Set<number>>(new Set());

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = currentAnswer !== null;
  const canGoPrevious = currentQuestionIndex > 0;

  // Track quiz started (Phase 1A) - after Convex session is ready
  useEffect(() => {
    if (sessionId && !quizStartedTracked.current) {
      quizStartedTracked.current = true;
      trackQuizStarted({
        sessionId,
        referrer: document.referrer,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      });
    }
  }, [sessionId]);

  // Track when question changes (Phase 1C)
  useEffect(() => {
    if (!currentQuestion) return;
    
    // Track question view
    const now = Date.now();
    
    // Cap time calculations to prevent unrealistic values from abandonment/return scenarios
    // If time > 5 minutes, user likely abandoned and returned - cap it
    const MAX_TIME_BETWEEN_QUESTIONS = 300; // 5 minutes in seconds
    
    const rawTimeOnPage = previousQuestionTime.current 
      ? Math.floor((now - previousQuestionTime.current) / 1000)
      : 0;
    const timeOnPage = Math.min(rawTimeOnPage, MAX_TIME_BETWEEN_QUESTIONS);
    
    const isReturning = visitedQuestions.current.has(currentQuestionIndex);
    visitedQuestions.current.add(currentQuestionIndex);
    
    if (sessionId) {
      const previousAnswerTime = previousQuestionTime.current 
        ? Math.min(Math.floor((now - previousQuestionTime.current) / 1000), MAX_TIME_BETWEEN_QUESTIONS)
        : undefined;
      
      trackQuizQuestionViewed({
        questionNumber: currentQuestionIndex + 1,
        questionId: currentQuestion.id,
        sessionId,
        totalQuestions: questions.length,
        timeOnPage,
        previousAnswerTime,
        isReturning,
      });
    }
    
    // Update timing refs
    questionStartTime.current = now;
    previousQuestionTime.current = now;
    
    // Also call Convex tracking
    onQuestionView();
  }, [currentQuestionIndex, currentQuestion, sessionId, questions.length, onQuestionView]);

  const handleAnswerSelect = useCallback((answer: AnswerValue) => {
    setAnswers((prev) => {
      const isFirstAttempt = !prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: answer,
      };
    });

    // Find the selected option to get the label
    const selectedOption = currentQuestion.options.find(opt => opt.value === answer);
    if (selectedOption) {
      // Calculate time spent on this question, with cap to prevent unrealistic values
      // If time > 10 minutes, user likely abandoned - cap it
      const MAX_TIME_ON_QUESTION = 600000; // 10 minutes in milliseconds
      const rawTimeSpentMs = Date.now() - questionStartTime.current;
      const timeSpentMs = Math.min(rawTimeSpentMs, MAX_TIME_ON_QUESTION);
      const isFirstAttempt = !answers[currentQuestion.id];
      
      // Track the answer in Convex
      trackAnswer(
        currentQuestion.id,
        currentQuestion.question,
        currentQuestion.measures,
        answer,
        selectedOption.label,
        currentQuestionIndex + 1
      );
      
      // Track in Vercel Analytics (Phase 1C - optional, alongside Convex)
      if (sessionId) {
        trackQuizAnswerSelected({
          questionNumber: currentQuestionIndex + 1,
          questionId: currentQuestion.id,
          answerValue: answer,
          answerLabel: selectedOption.label,
          sessionId,
          timeSpentMs,
          isFirstAttempt,
          measures: currentQuestion.measures,
        });
      }
    }
  }, [currentQuestion, currentQuestionIndex, trackAnswer, sessionId, answers]);

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
      const recommendedProtocol = results[0].protocolId.replace("protocol", "") as "1" | "2" | "3" | "4";
      
      // Track in Convex
      await onQuizComplete(
        results[0].protocolId,
        results.map(r => ({
          protocolId: r.protocolId,
          percentage: r.percentage,
          totalPoints: r.totalPoints,
        }))
      );
      
      // Track in Vercel Analytics (Phase 1A)
      if (sessionId) {
        trackQuizCompleted({
          recommendedProtocol,
          totalQuestions: questions.length,
          sessionId,
          completionRate: Object.keys(answers).length / questions.length,
          topMatchScore: results[0].percentage,
          secondMatchScore: results.length > 1 ? results[1].percentage : undefined,
        });
      }
    }
    
    setIsLoading(true);
  }, [answers, onQuizComplete, sessionId, questions.length]);

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
