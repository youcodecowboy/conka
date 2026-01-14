"use client";

import type { CognitiveTestRecommendationProps } from "./types";

/**
 * CognitiveTestRecommendation - Smart protocol recommendation
 *
 * Displays a personalized protocol recommendation based on the
 * user's test results (accuracy and speed scores).
 */
export default function CognitiveTestRecommendation({
  result,
}: CognitiveTestRecommendationProps) {
  const getRecommendation = () => {
    if (result.accuracy < 70 && result.speed < 70) {
      return {
        headline: "Consider the Balance Protocol",
        description:
          "Your scores suggest both accuracy and speed could benefit from support. The Balance Protocol alternates between CONKA Flow and CONKA Clarity daily for comprehensive cognitive coverage.",
        buttonText: "Try Balance Protocol",
        href: "/protocol/3",
      };
    }
    if (result.accuracy < 70) {
      return {
        headline: "Precision Protocol may help",
        description:
          "Your accuracy score suggests room for improvement. Clinical studies show CONKA Clarity ingredients improve cognition by +16% and attention by +14%.",
        buttonText: "Try Precision Protocol",
        href: "/protocol/2",
      };
    }
    if (result.speed < 70) {
      return {
        headline: "Resilience Protocol may help",
        description:
          "Your speed score suggests room for improvement. Clinical studies show CONKA Flow ingredients improve memory by +18% and overall cognitive performance.",
        buttonText: "Try Resilience Protocol",
        href: "/protocol/1",
      };
    }
    return {
      headline: "Great baseline!",
      description:
        "Your scores show strong cognitive function. The Ultimate Protocol—taking both CONKA Flow and CONKA Clarity daily—helps maintain and further enhance peak performance.",
      buttonText: "Try Ultimate Protocol",
      href: "/protocol/4",
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="neo-box p-4 lg:p-6 border-l-4 border-amber-500">
      <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-3">
        Based on Your Performance
      </p>
      <h4 className="font-bold text-lg mb-2">{recommendation.headline}</h4>
      <p className="text-sm opacity-70 mb-4">{recommendation.description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={recommendation.href}
          className="neo-button px-5 py-2 text-sm font-bold inline-flex items-center justify-center"
        >
          {recommendation.buttonText}
        </a>
        <a
          href="/quiz"
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-black font-semibold text-sm border-2 border-amber-500 hover:bg-amber-600 hover:border-amber-600 transition-all"
        >
          Take the Quiz
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
