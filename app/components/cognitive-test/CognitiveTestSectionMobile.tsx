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

/**
 * Benefits row component - mobile optimized
 */
function BenefitsRowMobile() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {["Clinically-validated", "Instant results", "Personalized"].map(
        (benefit) => (
          <div key={benefit} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
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
            <span className="text-xs opacity-70">{benefit}</span>
          </div>
        ),
      )}
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
    setTestState("results");
  }, []);

  const handleRetakeTest = useCallback(() => {
    setTestResult(null);
    setTestState("idle");
  }, []);

  return (
    <section className={`px-6 py-12 ${className}`}>
      {/* Header Area - Mobile optimized */}
      <div className="mb-8">
        <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
          Test Your Brain
        </p>
        <h2 className="text-2xl font-bold mb-2">
          Measure Your Cognitive Performance
        </h2>
        <p className="font-commentary text-lg opacity-80">
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
            <div className="neo-box p-6">
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
            <div className="neo-box p-0 min-h-[500px] overflow-hidden">
              <CognicaSDK
                onComplete={handleTestComplete}
                subjectId={subjectId}
              />
            </div>
            <div className="flex flex-col items-center gap-2 mt-4 text-xs opacity-60">
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
                className="neo-button-outline px-6 py-3 font-bold text-sm"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
