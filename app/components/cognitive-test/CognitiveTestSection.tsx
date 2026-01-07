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

/**
 * CognitiveTestSection - Desktop version (Hero-style layout)
 *
 * A prominent section on the science page that introduces and launches the
 * cognitive assessment test powered by Cognetivity.
 *
 * Uses a hero-style layout with:
 * - Centered header that changes based on state
 * - Single-column content area with generous whitespace
 * - Large iframe during testing state (650-700px)
 *
 * Flow: idle → email → testing → results
 */
export default function CognitiveTestSection({
  className = "",
}: CognitiveTestSectionProps) {
  const [testState, setTestState] = useState<TestState>("idle");
  const [emailSubmission, setEmailSubmission] =
    useState<EmailSubmission | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Generate a unique subject ID for tracking (memoized to stay consistent during test)
  const subjectId = useMemo(() => {
    if (emailSubmission) {
      return `website_${emailSubmission.submittedAt.getTime()}`;
    }
    return `website_${Date.now()}`;
  }, [emailSubmission]);

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
    setTestState("results");
    console.log("Test completed:", result);
  }, []);

  const handleRetakeTest = useCallback(() => {
    setTestResult(null);
    setTestState("idle");
  }, []);

  // Header content based on state
  const getHeaderContent = () => {
    switch (testState) {
      case "idle":
        return {
          label: "Test Your Brain",
          heading: "Measure Your Cognitive Performance",
          subheading: "based on a decade of neuroscience research",
        };
      case "email":
        return {
          label: "Test Your Brain",
          heading: "Measure Your Cognitive Performance",
          subheading: "just one quick step",
        };
      case "testing":
        return {
          label: "Assessment in Progress",
          heading: "Focus on the Test",
          subheading: "stay present",
        };
      case "results":
        return {
          label: "Test Complete",
          heading: "Your Cognitive Profile",
          subheading: "your personalized insights",
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <section className={`px-8 lg:px-16 py-16 lg:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header Area - Always visible */}
        <div className="mb-12">
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-3">
            {headerContent.label}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            {headerContent.heading}
          </h2>
          <p className="font-commentary text-xl lg:text-2xl opacity-80">
            {headerContent.subheading}
          </p>
        </div>

        {/* Content Area - Changes based on state */}
        <div className="flex flex-col items-center">
          {/* IDLE STATE: Centered CTA with generous whitespace */}
          {testState === "idle" && (
            <div className="w-full max-w-lg">
              {/* CTA Card */}
              <div className="neo-box p-10 flex flex-col items-center text-center">
                {/* Brain Icon */}
                <div className="w-24 h-24 mb-8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80"
                  >
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                    <path d="M6 18a4 4 0 0 1-1.967-.516" />
                    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Try the Speed of Processing Test
                </h3>
                <p className="text-base opacity-70 mb-8">
                  A 30-second clinical-grade assessment used in real research
                  trials. Unlike typical brain games, you can&apos;t improve
                  through practice alone—only by genuinely enhancing your
                  cognitive function.
                </p>

                {/* Large prominent button */}
                <button
                  onClick={handleStartTest}
                  className="neo-button px-12 py-5 font-bold text-xl w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Test
                </button>

                <p className="font-clinical text-sm opacity-50 mt-6">
                  Full test with personalized insights available in the CONKA
                  app
                </p>
              </div>

              {/* Benefits row - horizontal below CTA */}
              <div className="flex justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm opacity-70">
                    Clinically-validated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm opacity-70">Instant results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm opacity-70">Personalized</span>
                </div>
              </div>
            </div>
          )}

          {/* EMAIL STATE: Centered form */}
          {testState === "email" && (
            <div className="w-full max-w-lg">
              <div className="neo-box p-10">
                <EmailCaptureForm
                  onSubmit={handleEmailSubmit}
                  onBack={handleBackToIdle}
                />
              </div>
              {/* Benefits row - horizontal below form */}
              <div className="flex justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm opacity-70">
                    Clinically-validated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm opacity-70">Instant results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm opacity-70">Personalized</span>
                </div>
              </div>
            </div>
          )}

          {/* TESTING STATE: Large SDK Iframe */}
          {testState === "testing" && (
            <div className="w-full">
              <div className="neo-box p-0 min-h-[650px] overflow-hidden">
                <CognicaSDK
                  onComplete={handleTestComplete}
                  subjectId={subjectId}
                />
              </div>
              {/* Tips below the iframe */}
              <div className="flex justify-center gap-8 mt-6 text-sm opacity-60">
                <span>• Stay focused</span>
                <span>• Trust your instincts</span>
                <span>• Respond quickly</span>
              </div>
            </div>
          )}

          {/* RESULTS STATE: Centered score display */}
          {testState === "results" && testResult && (
            <div className="w-full max-w-2xl">
              <div className="neo-box p-10">
                {/* Score Display - Larger */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-teal-500/10 rounded-lg">
                    <p className="font-clinical text-5xl font-bold text-teal-500 mb-2">
                      {testResult.score}
                    </p>
                    <p className="font-clinical text-sm opacity-60 uppercase tracking-wider">
                      Score
                    </p>
                  </div>
                  <div className="text-center p-6 bg-current/5 rounded-lg">
                    <p className="font-clinical text-5xl font-bold mb-2">
                      {testResult.accuracy}%
                    </p>
                    <p className="font-clinical text-sm opacity-60 uppercase tracking-wider">
                      Accuracy
                    </p>
                  </div>
                  <div className="text-center p-6 bg-current/5 rounded-lg">
                    <p className="font-clinical text-5xl font-bold mb-2">
                      {testResult.speed}%
                    </p>
                    <p className="font-clinical text-sm opacity-60 uppercase tracking-wider">
                      Speed
                    </p>
                  </div>
                </div>

                {emailSubmission && (
                  <p className="text-center text-base opacity-70 mb-8">
                    A detailed breakdown has been sent to{" "}
                    <span className="font-medium">{emailSubmission.email}</span>
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleRetakeTest}
                    className="neo-button-outline px-8 py-4 font-bold"
                  >
                    Retake Test
                  </button>
                </div>

                <p className="font-clinical text-xs opacity-40 mt-6 text-center">
                  [Full Results UI - Phase 3]
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
