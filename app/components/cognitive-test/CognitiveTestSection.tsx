"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  TestState,
  TestResult,
  EmailSubmission,
  CognitiveTestSectionProps,
} from "./types";
import EmailCaptureForm from "./EmailCaptureForm";
import CognicaSDK from "./CognicaSDK";
import CognitiveTestIdleCard from "./CognitiveTestIdleCard";
import CognitiveTestLoader from "./CognitiveTestLoader";
import CognitiveTestScores from "./CognitiveTestScores";
import CognitiveTestRecommendation from "./CognitiveTestRecommendation";
import CognitiveTestAppPromo from "./CognitiveTestAppPromo";
import { trackCognitiveTest } from "@/app/lib/klaviyo";

/**
 * Benefits row component - reused in idle and email states
 */
function BenefitsRow() {
  return (
    <div className="flex justify-center gap-8 mt-8">
      {["Clinically-validated", "Instant results", "Personalized"].map(
        (benefit) => (
          <div key={benefit} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--gradient-neuro-blue-accent)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-sm opacity-80" style={{ color: "var(--color-ink)" }}>{benefit}</span>
          </div>
        ),
      )}
    </div>
  );
}

/**
 * CognitiveTestSection - Desktop version (Hero-style layout)
 *
 * Orchestrates the cognitive test flow through 5 states:
 * idle → email → testing → processing → results
 */
export default function CognitiveTestSection({
  className = "",
}: CognitiveTestSectionProps) {
  const [testState, setTestState] = useState<TestState>("idle");
  const [emailSubmission, setEmailSubmission] =
    useState<EmailSubmission | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Generate a unique subject ID for tracking
  const subjectId = useMemo(() => {
    if (emailSubmission) {
      return `website_${emailSubmission.submittedAt.getTime()}`;
    }
    return `website_${Date.now()}`;
  }, [emailSubmission]);

  // State transition handlers
  const handleStartTest = useCallback(() => {
    setTestState("email");
  }, []);

  const handleBackToIdle = useCallback(() => {
    setTestState("idle");
  }, []);

  const handleEmailSubmit = useCallback((submission: EmailSubmission) => {
    setEmailSubmission(submission);
    setTestState("testing");
    console.log("Email submitted:", submission.email);
  }, []);

  const handleTestComplete = useCallback((result: TestResult) => {
    setTestResult(result);
    setTestState("processing");
    console.log("Test completed:", result);
  }, []);

  const handleProcessingComplete = useCallback(() => {
    // Always transition to results state first (critical for graceful failure)
    setTestState("results");

    // Track to Klaviyo (fire and forget - never blocks UI)
    if (emailSubmission && testResult) {
      trackCognitiveTest(
        emailSubmission.email,
        testResult.score,
        testResult.accuracy,
        testResult.speed,
      ).catch((err) => {
        // Silently fail - user already sees results
        console.error("Failed to track to Klaviyo:", err);
      });
    }
  }, [emailSubmission, testResult]);

  const handleRetakeTest = useCallback(() => {
    setTestResult(null);
    setTestState("idle");
  }, []);

  return (
    <div className={className}>
      {/* Header Area - Static */}
      <div className="mb-12">
        <p
          className="text-xs uppercase tracking-widest mb-3 opacity-70"
          style={{ color: "var(--color-ink)", fontSize: "var(--premium-font-data-size)" }}
        >
          Test Your Brain
        </p>
        <h2
          id="cognitive-test-heading"
          className="text-4xl lg:text-5xl font-bold mb-3"
          style={{ color: "var(--color-ink)", letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Measure Your Cognitive Performance
        </h2>
        <p
          className="text-xl lg:text-2xl opacity-80"
          style={{ color: "var(--color-ink)", lineHeight: "var(--premium-font-body-leading)" }}
        >
          based on a decade of neuroscience research
        </p>
      </div>

      {/* Content Area - Changes based on state */}
      <div className="flex flex-col items-center">
        {/* IDLE STATE */}
        {testState === "idle" && (
          <div className="w-full max-w-2xl">
            <CognitiveTestIdleCard onStart={handleStartTest} />
            <BenefitsRow />
          </div>
        )}

        {/* EMAIL STATE */}
        {testState === "email" && (
          <div className="w-full max-w-2xl">
            <div className="premium-card-soft premium-card-soft-stroke p-10" style={{ color: "var(--color-ink)" }}>
              <EmailCaptureForm
                onSubmit={handleEmailSubmit}
                onBack={handleBackToIdle}
              />
            </div>
            <BenefitsRow />
          </div>
        )}

        {/* TESTING STATE */}
        {testState === "testing" && (
          <div className="w-full">
            <div
              className="p-0 h-[650px] overflow-hidden relative rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)]"
              style={{ background: "var(--color-premium-bg-soft)" }}
            >
              <div
                className="absolute top-0 left-0"
                style={{
                  width: "90.91%",
                  height: "90.91%",
                  transform: "scale(1.1)",
                  transformOrigin: "top left",
                }}
              >
                <CognicaSDK
                  onComplete={handleTestComplete}
                  subjectId={subjectId}
                />
              </div>
            </div>
            <div className="flex justify-center gap-8 mt-6 text-sm opacity-70" style={{ color: "var(--color-ink)" }}>
              <span>Press J for animals</span>
              <span>•</span>
              <span>Press F for anything else</span>
              <span>•</span>
              <span>Speed and accuracy both count</span>
            </div>
          </div>
        )}

        {/* PROCESSING STATE */}
        {testState === "processing" && (
          <div className="w-full max-w-2xl">
            <CognitiveTestLoader onComplete={handleProcessingComplete} />
          </div>
        )}

        {/* RESULTS STATE */}
        {testState === "results" && testResult && (
          <div className="w-full max-w-2xl space-y-6">
            <CognitiveTestScores
              result={testResult}
              email={emailSubmission?.email}
            />
            <CognitiveTestRecommendation result={testResult} />
            <CognitiveTestAppPromo />
            <div className="flex justify-center">
              <button
                onClick={handleRetakeTest}
                className="px-8 py-3 font-bold rounded-[var(--premium-radius-interactive)] border border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-ink)] hover:text-[var(--color-bone)] transition-colors"
                style={{ color: "var(--color-ink)" }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
