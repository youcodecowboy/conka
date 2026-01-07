"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
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

  // Processing animation state
  const [processingProgress, setProcessingProgress] = useState(0);
  const processingStage =
    processingProgress < 33 ? 0 : processingProgress < 66 ? 1 : 2;
  const processingStages = [
    "Processing your results...",
    "Analyzing your performance...",
    "Generating insights...",
  ];

  // Processing animation effect
  useEffect(() => {
    if (testState !== "processing") {
      setProcessingProgress(0);
      return;
    }

    const duration = 2500;
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setTestState("results"), 300);
          return 100;
        }
        return next;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [testState]);

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
    setTestState("processing");
    console.log("Test completed:", result);
  }, []);

  const handleRetakeTest = useCallback(() => {
    setTestResult(null);
    setTestState("idle");
  }, []);

  return (
    <section className={`px-16 py-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header Area - Static */}
        <div className="mb-12">
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-3">
            Test Your Brain
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            Measure Your Cognitive Performance
          </h2>
          <p className="font-commentary text-xl lg:text-2xl opacity-80">
            based on a decade of neuroscience research
          </p>
        </div>

        {/* Content Area - Changes based on state */}
        <div className="flex flex-col items-center">
          {/* IDLE STATE: Centered CTA with generous whitespace */}
          {testState === "idle" && (
            <div className="w-full max-w-2xl">
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
                  Try the Speed of Processing Game
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
                  Start Game
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
            <div className="w-full max-w-2xl">
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
              {/* Instructions below the iframe */}
              <div className="flex justify-center gap-8 mt-6 text-sm opacity-60">
                <span>Press J for animals</span>
                <span>•</span>
                <span>Press F for anything else</span>
                <span>•</span>
                <span>Speed and accuracy both count</span>
              </div>
            </div>
          )}

          {/* PROCESSING STATE: Animated loader while "analyzing" results */}
          {testState === "processing" && (
            <div className="w-full max-w-2xl">
              <div className="neo-box p-12 flex flex-col items-center text-center">
                {/* Animated Progress Ring */}
                <div className="relative w-24 h-24 mb-8">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-current/10" />

                  {/* Progress ring */}
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${processingProgress * 2.89} 289`}
                      className="transition-all duration-100"
                    />
                  </svg>

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-opacity ${
                        processingProgress >= 100 ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      {processingProgress >= 100 ? (
                        // Checkmark when complete
                        <polyline points="20 6 9 17 4 12" />
                      ) : (
                        // Brain icon while loading
                        <>
                          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Stage Text */}
                <p className="font-bold text-xl mb-2">
                  {processingStages[processingStage]}
                </p>

                {/* Progress Percentage */}
                <p className="font-clinical text-sm opacity-60">
                  {processingProgress}%
                </p>

                {/* Stage dots */}
                <div className="flex gap-1.5 mt-6">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        processingStage >= dot ? "bg-teal-500" : "bg-current/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULTS STATE: Score + Recommendation + App Promo */}
          {testState === "results" && testResult && (
            <div className="w-full max-w-2xl space-y-6">
              {/* Section 1: Score Display */}
              <div className="neo-box p-8">
                <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-4 text-center">
                  Your Speed of Processing Scores
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-teal-500/10 rounded-lg">
                    <p className="font-clinical text-4xl font-bold text-teal-500 mb-1">
                      {testResult.score}
                    </p>
                    <p className="font-clinical text-xs opacity-60 uppercase tracking-wider">
                      Overall
                    </p>
                  </div>
                  <div className="text-center p-4 bg-current/5 rounded-lg">
                    <p className="font-clinical text-4xl font-bold mb-1">
                      {testResult.accuracy}%
                    </p>
                    <p className="font-clinical text-xs opacity-60 uppercase tracking-wider">
                      Accuracy
                    </p>
                  </div>
                  <div className="text-center p-4 bg-current/5 rounded-lg">
                    <p className="font-clinical text-4xl font-bold mb-1">
                      {testResult.speed}%
                    </p>
                    <p className="font-clinical text-xs opacity-60 uppercase tracking-wider">
                      Speed
                    </p>
                  </div>
                </div>
                {emailSubmission && (
                  <p className="text-center text-sm opacity-60 mt-4">
                    Results sent to {emailSubmission.email}
                  </p>
                )}
              </div>

              {/* Section 2: Smart Recommendation */}
              <div className="neo-box p-6 border-l-4 border-amber-500">
                <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-3">
                  Based on Your Performance
                </p>
                {testResult.accuracy < 70 && testResult.speed < 70 ? (
                  <>
                    <h4 className="font-bold text-lg mb-2">
                      Consider the Balance Protocol
                    </h4>
                    <p className="text-sm opacity-70 mb-4">
                      Your scores suggest both accuracy and speed could benefit
                      from support. The Balance Protocol alternates between
                      Conka Flow and Conka Clarity daily for comprehensive
                      cognitive coverage.
                    </p>
                    <a
                      href="/protocol/3"
                      className="neo-button px-5 py-2 text-sm font-bold inline-block"
                    >
                      Try Balance Protocol
                    </a>
                  </>
                ) : testResult.accuracy < 70 ? (
                  <>
                    <h4 className="font-bold text-lg mb-2">
                      Precision Protocol may help
                    </h4>
                    <p className="text-sm opacity-70 mb-4">
                      Your accuracy score suggests room for improvement.
                      Clinical studies show Conka Clarity ingredients improve
                      cognition by +16% and attention by +14%.
                    </p>
                    <a
                      href="/protocol/2"
                      className="neo-button px-5 py-2 text-sm font-bold inline-block"
                    >
                      Try Precision Protocol
                    </a>
                  </>
                ) : testResult.speed < 70 ? (
                  <>
                    <h4 className="font-bold text-lg mb-2">
                      Resilience Protocol may help
                    </h4>
                    <p className="text-sm opacity-70 mb-4">
                      Your speed score suggests room for improvement. Clinical
                      studies show Conka Flow ingredients improve memory by +18%
                      and overall cognitive performance.
                    </p>
                    <a
                      href="/protocol/1"
                      className="neo-button px-5 py-2 text-sm font-bold inline-block"
                    >
                      Try Resilience Protocol
                    </a>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-lg mb-2">Great baseline!</h4>
                    <p className="text-sm opacity-70 mb-4">
                      Your scores show strong cognitive function. The Ultimate
                      Protocol—taking both Conka Flow and Conka Clarity
                      daily—helps maintain and further enhance peak performance.
                    </p>
                    <a
                      href="/protocol/4"
                      className="neo-button px-5 py-2 text-sm font-bold inline-block"
                    >
                      Try Ultimate Protocol
                    </a>
                  </>
                )}
                <a
                  href="/quiz"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors mt-3"
                >
                  Not sure? Take our full quiz
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>

              {/* Section 3: CONKA App Promo */}
              <div className="neo-box p-6 bg-current/5">
                <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-3">
                  Get the Full Experience
                </p>
                <p className="text-sm opacity-70 mb-4">
                  This was a 30-second snapshot. The full Speed of Processing
                  game in the CONKA app gives you detailed insights and tracks
                  how your performance changes with lifestyle factors.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
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
                    <span className="text-xs opacity-70">
                      Full validated test
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
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
                    <span className="text-xs opacity-70">
                      Sleep &amp; exercise tracking
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
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
                    <span className="text-xs opacity-70">
                      Personalized insights
                    </span>
                  </div>
                </div>
                <p className="font-clinical text-xs opacity-50">
                  Free download on iOS and Android
                </p>
              </div>

              {/* Section 4: Actions */}
              <div className="flex justify-center">
                <button
                  onClick={handleRetakeTest}
                  className="neo-button-outline px-8 py-3 font-bold"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
