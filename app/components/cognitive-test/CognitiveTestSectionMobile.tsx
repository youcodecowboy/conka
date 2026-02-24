"use client";

import { useState, useCallback, useMemo, type ReactNode } from "react";
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

/** Same benefit items as desktop with distinct icons */
const BENEFIT_ITEMS_MOBILE: { label: string; icon: ReactNode }[] = [
  {
    label: "Clinically-validated",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Instant results",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: "Personalized",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function BenefitsRowMobile() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {BENEFIT_ITEMS_MOBILE.map(({ label, icon }) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            {icon}
          </div>
          <span className="text-xs opacity-80" style={{ color: "var(--color-ink)" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * CognitiveTestSectionMobile - Mobile version
 *
 * Orchestrates the cognitive test flow through 5 states:
 * idle → email → testing → processing → results
 *
 * Mobile-optimized with:
 * - Reduced padding (px-6 py-12)
 * - Left-aligned headers
 * - Smaller typography
 * - Stacked layouts
 * - Optimized SDK iframe
 */
export default function CognitiveTestSectionMobile({
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
      {/* Header Area - Mobile optimized */}
      <div className="mb-8">
        <p
          className="text-xs uppercase tracking-widest mb-2 opacity-70"
          style={{ color: "var(--color-ink)", fontSize: "var(--premium-font-data-size)" }}
        >
          Test Your Brain
        </p>
        <h2
          id="cognitive-test-heading"
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-ink)", letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Measure Your Cognitive Performance
        </h2>
        <p
          className="text-lg opacity-80"
          style={{ color: "var(--color-ink)", lineHeight: "var(--premium-font-body-leading)" }}
        >
          based on a decade of neuroscience research
        </p>
      </div>

      {/* Content Area - Changes based on state */}
      <div className="flex flex-col">
        {/* IDLE STATE */}
        {testState === "idle" && (
          <div className="w-full">
            <CognitiveTestIdleCard onStart={handleStartTest} />
            <BenefitsRowMobile />
          </div>
        )}

        {/* EMAIL STATE */}
        {testState === "email" && (
          <div className="w-full">
            <div className="premium-card-soft premium-card-soft-stroke p-6" style={{ color: "var(--color-ink)" }}>
              <EmailCaptureForm
                onSubmit={handleEmailSubmit}
                onBack={handleBackToIdle}
              />
            </div>
            <BenefitsRowMobile />
          </div>
        )}

        {/* TESTING STATE */}
        {testState === "testing" && (
          <div className="w-full">
            <div
              className="p-0 min-h-[500px] overflow-hidden rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)]"
              style={{ background: "var(--color-premium-bg-soft)" }}
            >
              <CognicaSDK
                onComplete={handleTestComplete}
                subjectId={subjectId}
              />
            </div>
            <div className="flex flex-col items-center gap-2 mt-4 text-xs opacity-70" style={{ color: "var(--color-ink)" }}>
              <span>Tap right for animals</span>
              <span>Tap left for anything else</span>
              <span>Speed and accuracy both count</span>
            </div>
          </div>
        )}

        {/* PROCESSING STATE */}
        {testState === "processing" && (
          <div className="w-full">
            <CognitiveTestLoader onComplete={handleProcessingComplete} />
          </div>
        )}

        {/* RESULTS STATE */}
        {testState === "results" && testResult && (
          <div className="w-full space-y-4">
            <CognitiveTestScores
              result={testResult}
              email={emailSubmission?.email}
            />
            <CognitiveTestRecommendation result={testResult} />
            <CognitiveTestAppPromo />
            <div className="flex justify-center">
              <button
                onClick={handleRetakeTest}
                className="px-6 py-3 font-bold text-sm rounded-[var(--premium-radius-interactive)] border border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-ink)] hover:text-[var(--color-bone)] transition-colors"
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
