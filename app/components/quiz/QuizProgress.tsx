"use client";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  onSubmit: () => void;
}

export default function QuizProgress({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  onSubmit,
}: QuizProgressProps) {
  const progressPercentage = ((currentStep) / totalSteps) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-current z-40">
      {/* Progress Bar */}
      <div className="h-1 bg-current/10">
        <div
          className="h-full bg-[#AAB9BC] transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-current font-semibold text-sm transition-all ${
              canGoPrevious
                ? "hover:bg-current/5"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Step Indicator */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx < currentStep
                    ? "bg-[#AAB9BC]"
                    : idx === currentStep
                    ? "bg-current"
                    : "bg-current/20"
                }`}
              />
            ))}
          </div>

          {/* Next / Submit Button */}
          {isLastQuestion ? (
            <button
              onClick={onSubmit}
              disabled={!canGoNext}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                canGoNext
                  ? "neo-button"
                  : "bg-current/20 text-current/50 cursor-not-allowed border-2 border-current/20"
              }`}
            >
              <span>See Results</span>
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
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                canGoNext
                  ? "neo-button"
                  : "bg-current/20 text-current/50 cursor-not-allowed border-2 border-current/20"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
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
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

