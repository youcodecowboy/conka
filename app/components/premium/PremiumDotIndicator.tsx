"use client";

interface PremiumDotIndicatorProps {
  /** Total number of dots */
  total: number;
  /** Current active index (0-based) */
  currentIndex: number;
  /** Callback when a dot is clicked */
  onDotClick: (index: number) => void;
  /** Optional aria-label for the tablist */
  ariaLabel?: string;
  /** Optional function to generate aria-label for each dot */
  getDotAriaLabel?: (index: number) => string;
  /** Optional className for the container */
  className?: string;
}

/**
 * Premium dot indicator component for carousels and pagination.
 * 
 * Features:
 * - Active dot expands to wider pill shape
 * - Smooth transitions
 * - Accessible with ARIA attributes
 * - Hover states on inactive dots
 * 
 * @example
 * <PremiumDotIndicator
 *   total={5}
 *   currentIndex={2}
 *   onDotClick={(i) => setIndex(i)}
 *   ariaLabel="Product carousel"
 *   getDotAriaLabel={(i) => `Go to product ${i + 1}`}
 * />
 */
export default function PremiumDotIndicator({
  total,
  currentIndex,
  onDotClick,
  ariaLabel,
  getDotAriaLabel,
  className = "",
}: PremiumDotIndicatorProps) {
  return (
    <div
      className={`flex justify-center gap-2 ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-label={getDotAriaLabel ? getDotAriaLabel(i) : `Go to item ${i + 1}`}
          aria-selected={i === currentIndex}
          onClick={() => onDotClick(i)}
          className={`h-2 rounded-full transition-all ${
            i === currentIndex
              ? "w-8 bg-[var(--color-ink)]"
              : "w-2 bg-black/20 hover:bg-black/40"
          }`}
        />
      ))}
    </div>
  );
}
