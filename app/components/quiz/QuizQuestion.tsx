"use client";

import { QuizQuestion as QuizQuestionType, AnswerValue } from "@/app/lib/quizData";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: AnswerValue | null;
  onAnswerSelect: (answer: AnswerValue) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  const getIcon = (iconType: "check" | "x" | "tilde") => {
    switch (iconType) {
      case "check":
        return (
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case "x":
        return (
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        );
      case "tilde":
        return (
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
            <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-6">
      {/* Question Counter */}
      <div className="mb-4">
        <span className="font-clinical text-xs opacity-50">
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* Question Text */}
      <div className="text-center max-w-lg mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{question.question}</h2>
        {question.subtitle && (
          <p className="font-commentary text-sm md:text-base opacity-60">{question.subtitle}</p>
        )}
      </div>

      {/* Answer Options */}
      <div className="w-full max-w-sm space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onAnswerSelect(option.value)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-full border-2 transition-all duration-200 ${
                isSelected
                  ? "border-current bg-[var(--foreground)] text-[var(--background)]"
                  : "border-current/30 hover:border-current hover:bg-current/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? "border-[var(--background)] bg-[var(--background)] text-[var(--foreground)]"
                      : "border-current/50"
                  }`}
                >
                  {getIcon(option.icon)}
                </div>
                <span className="font-semibold text-base">{option.label}</span>
              </div>
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

