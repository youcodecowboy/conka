"use client";

type Direction = "prev" | "next";

interface PremiumCarouselToggleProps {
  direction: Direction;
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

const defaultAriaLabels: Record<Direction, string> = {
  prev: "Previous",
  next: "Next",
};

export default function PremiumCarouselToggle({
  direction,
  onClick,
  ariaLabel,
  className = "",
}: PremiumCarouselToggleProps) {
  const label = ariaLabel ?? defaultAriaLabels[direction];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[var(--color-ink)] bg-white text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:ring-offset-2 ${className}`}
    >
      {direction === "prev" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}
