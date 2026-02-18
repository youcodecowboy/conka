"use client";

type Direction = "prev" | "next";
type Variant = "default" | "overlay" | "overlayLight";

interface PremiumCarouselToggleProps {
  direction: Direction;
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
  /** Overlay: semi-transparent dark circle, white chevrons. overlayLight: white transparent circle, black chevrons (trading-card style). */
  variant?: Variant;
}

const defaultAriaLabels: Record<Direction, string> = {
  prev: "Previous",
  next: "Next",
};

const iconSize = { default: 20, overlay: 22, overlayLight: 22 } as const;

export default function PremiumCarouselToggle({
  direction,
  onClick,
  ariaLabel,
  className = "",
  variant = "default",
}: PremiumCarouselToggleProps) {
  const label = ariaLabel ?? defaultAriaLabels[direction];
  const size = iconSize[variant];

  const base =
    "rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const defaultClasses =
    "shrink-0 w-10 h-10 md:w-12 md:h-12 border-2 border-[var(--color-ink)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white focus:ring-[var(--color-ink)]";
  const overlayClasses =
    "p-3 border-0 bg-black/20 hover:bg-black/40 text-white focus:ring-white focus:ring-offset-0";
  const overlayLightClasses =
    "p-3 border-0 bg-white/25 hover:bg-white/45 text-[var(--color-ink)] focus:ring-black/30 focus:ring-offset-0";

  const buttonClass =
    variant === "overlay"
      ? `${base} ${overlayClasses} ${className}`
      : variant === "overlayLight"
        ? `${base} ${overlayLightClasses} ${className}`
        : `${base} ${defaultClasses} ${className}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={buttonClass}
    >
      {direction === "prev" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
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
          width={size}
          height={size}
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
