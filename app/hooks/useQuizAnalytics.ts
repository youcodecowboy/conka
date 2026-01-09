"use client";

import { useCallback, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Generate a unique session ID
function generateSessionId(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// Get or create session ID from sessionStorage
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = sessionStorage.getItem("quizSessionId");
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem("quizSessionId", sessionId);
  }
  return sessionId;
}

export interface QuizAnalyticsOptions {
  userId?: string;
}

export function useQuizAnalytics(options: QuizAnalyticsOptions = {}) {
  const { userId } = options;
  
  const startSession = useMutation(api.quizAnalytics.startSession);
  const recordAnswer = useMutation(api.quizAnalytics.recordAnswer);
  const completeSession = useMutation(api.quizAnalytics.completeSession);
  const linkUserToSession = useMutation(api.quizAnalytics.linkUserToSession);
  
  // Track question start time for calculating time spent
  const questionStartTime = useRef<number>(Date.now());
  const sessionStarted = useRef<boolean>(false);
  const sessionIdRef = useRef<string>("");

  // Initialize session on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    sessionIdRef.current = getSessionId();
    
    if (!sessionStarted.current && sessionIdRef.current) {
      sessionStarted.current = true;
      startSession({
        sessionId: sessionIdRef.current,
        userId: userId,
        userAgent: navigator.userAgent,
        referrer: document.referrer || undefined,
      }).catch(console.error);
    }
  }, [startSession, userId]);

  // Link user to session when userId changes (user logs in)
  useEffect(() => {
    if (userId && sessionIdRef.current) {
      linkUserToSession({
        sessionId: sessionIdRef.current,
        userId,
      }).catch(console.error);
    }
  }, [userId, linkUserToSession]);

  // Track when a new question is shown
  const onQuestionView = useCallback(() => {
    questionStartTime.current = Date.now();
  }, []);

  // Record an answer
  const onAnswerSelect = useCallback(
    async (
      questionId: string,
      questionText: string,
      measures: string,
      answerValue: string,
      answerLabel: string,
      questionNumber: number
    ) => {
      if (!sessionIdRef.current) return;

      const timeSpentMs = Date.now() - questionStartTime.current;

      try {
        await recordAnswer({
          sessionId: sessionIdRef.current,
          questionId,
          questionText,
          measures,
          answerValue,
          answerLabel,
          questionNumber,
          timeSpentMs,
        });
      } catch (error) {
        console.error("Failed to record quiz answer:", error);
      }
    },
    [recordAnswer]
  );

  // Complete the quiz with results
  const onQuizComplete = useCallback(
    async (
      recommendedProtocol: string,
      protocolScores: Array<{
        protocolId: string;
        percentage: number;
        totalPoints: number;
      }>
    ) => {
      if (!sessionIdRef.current) return;

      try {
        await completeSession({
          sessionId: sessionIdRef.current,
          recommendedProtocol,
          protocolScores,
        });
      } catch (error) {
        console.error("Failed to complete quiz session:", error);
      }
    },
    [completeSession]
  );

  // Reset session (for retaking quiz)
  const resetSession = useCallback(() => {
    if (typeof window === "undefined") return;
    
    sessionStorage.removeItem("quizSessionId");
    sessionIdRef.current = getSessionId();
    sessionStarted.current = false;
    
    // Start new session
    startSession({
      sessionId: sessionIdRef.current,
      userId: userId,
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
    }).catch(console.error);
  }, [startSession, userId]);

  return {
    sessionId: sessionIdRef.current,
    onQuestionView,
    onAnswerSelect,
    onQuizComplete,
    resetSession,
  };
}
