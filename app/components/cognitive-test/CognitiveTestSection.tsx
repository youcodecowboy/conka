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
 * CognitiveTestSection - Desktop version
 *
 * A section on the science page that introduces and launches the
 * cognitive assessment test powered by Cognetivity.
 *
 * Uses an inline progressive flow (no modals):
 * idle → email → testing → results
 *
 * All states render within the same 2-column layout for a seamless UX.
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

  // Contextual text for the left column based on state
  const getLeftColumnContent = () => {
    switch (testState) {
      case "idle":
        return {
          label: "Test Your Brain",
          heading: "Measure Your Cognitive Performance",
          subheading: "discover your baseline",
          description:
            "Take our 30-second cognitive assessment powered by the CONKA App. Discover your baseline scores for speed, accuracy, and overall cognitive function—then see how our formulas can help you improve.",
          showBenefits: true,
        };
      case "email":
        return {
          label: "Test Your Brain",
          heading: "Measure Your Cognitive Performance",
          subheading: "just one quick step",
          description:
            "Enter your email to receive a detailed breakdown of your results. We'll show you how your cognitive performance compares and which formulas could help you improve.",
          showBenefits: true,
        };
      case "testing":
        return {
          label: "Assessment in Progress",
          heading: "Focus on the Test",
          subheading: "stay present",
          description:
            "Follow the on-screen instructions. The assessment evaluates your reaction time, pattern recognition, and decision-making speed. It only takes about 30 seconds.",
          showBenefits: false,
        };
      case "results":
        return {
          label: "Test Complete",
          heading: "Your Cognitive Profile",
          subheading: "your personalized insights",
          description:
            "Based on your performance, we've identified your cognitive strengths and areas for improvement. See how our science-backed formulas can help optimize your brain health.",
          showBenefits: false,
        };
    }
  };

  const leftContent = getLeftColumnContent();

  return (
    <section className={`px-16 py-16 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Context Text (always visible) */}
          <div>
            <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
              {leftContent.label}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">
              {leftContent.heading}
            </h2>
            <p className="font-commentary text-xl mb-6">
              {leftContent.subheading}
            </p>
            <p className="text-base opacity-80 mb-6">
              {leftContent.description}
            </p>

            {/* Benefits list - only shown in idle/email states */}
            {leftContent.showBenefits && (
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">
                    Clinically-validated assessment
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Instant results</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">
                    Personalized recommendations
                  </span>
                </li>
              </ul>
            )}

            {/* Testing state: Show tips */}
            {testState === "testing" && (
              <div className="space-y-3">
                <p className="font-clinical text-sm opacity-70">Tips:</p>
                <ul className="space-y-2 text-sm opacity-70">
                  <li>• Find a quiet space with minimal distractions</li>
                  <li>• Respond as quickly and accurately as possible</li>
                  <li>• Trust your first instinct</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Interactive Card (transforms based on state) */}
          <div
            className={`neo-box flex flex-col ${
              testState === "testing"
                ? "p-0 min-h-[550px]" // No padding for iframe, taller card
                : "p-8 min-h-[400px]"
            }`}
          >
            {/* IDLE STATE: CTA */}
            {testState === "idle" && (
              <div className="flex flex-col items-center justify-center text-center h-full">
                {/* Brain Icon */}
                <div className="w-20 h-20 mb-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

                <h3 className="text-xl font-bold mb-2">
                  Ready to test your brain?
                </h3>
                <p className="text-sm opacity-70 mb-6">
                  Get your cognitive baseline in just 30 seconds
                </p>

                <button
                  onClick={handleStartTest}
                  className="neo-button px-8 py-4 font-bold text-lg w-full"
                >
                  Start Test
                </button>

                <p className="font-clinical text-xs opacity-50 mt-4">
                  ~30 seconds • No app required
                </p>
              </div>
            )}

            {/* EMAIL STATE: Inline Form */}
            {testState === "email" && (
              <EmailCaptureForm
                onSubmit={handleEmailSubmit}
                onBack={handleBackToIdle}
              />
            )}

            {/* TESTING STATE: SDK Iframe */}
            {testState === "testing" && (
              <CognicaSDK
                onComplete={handleTestComplete}
                subjectId={subjectId}
              />
            )}

            {/* RESULTS STATE: Score Display */}
            {testState === "results" && testResult && (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-4">
                  Test Complete
                </p>
                <h3 className="text-xl font-bold mb-6">Your Results</h3>

                {/* Score Display */}
                <div className="w-full grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="font-clinical text-4xl font-bold text-teal-500">
                      {testResult.score}
                    </p>
                    <p className="font-clinical text-xs opacity-50 mt-1">
                      SCORE
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-clinical text-4xl font-bold">
                      {testResult.accuracy}%
                    </p>
                    <p className="font-clinical text-xs opacity-50 mt-1">
                      ACCURACY
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-clinical text-4xl font-bold">
                      {testResult.speed}%
                    </p>
                    <p className="font-clinical text-xs opacity-50 mt-1">
                      SPEED
                    </p>
                  </div>
                </div>

                {emailSubmission && (
                  <p className="text-sm opacity-70 mb-6">
                    A detailed breakdown has been sent to{" "}
                    {emailSubmission.email}
                  </p>
                )}

                {/* Actions */}
                <div className="w-full space-y-3">
                  <button
                    onClick={handleRetakeTest}
                    className="neo-button-outline px-6 py-3 font-bold w-full"
                  >
                    Retake Test
                  </button>
                </div>

                <p className="font-clinical text-xs opacity-40 mt-4">
                  [Full Results UI - Phase 3]
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
