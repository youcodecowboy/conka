"use client";

/**
 * Generate grouped dot indices (5-8 dots)
 * First dot = first item, last dot = last item
 * Middle dots represent groups of items
 */
function generateGroupedDots(total: number, maxDots: number = 7): number[] {
  if (total <= maxDots) {
    // If we have fewer items than max dots, show one dot per item
    return Array.from({ length: total }, (_, i) => i);
  }

  const dots: number[] = [0]; // First dot always represents first item

  // Calculate how many items each middle dot represents
  const middleDotsCount = maxDots - 2; // Exclude first and last
  const itemsPerDot = Math.ceil((total - 1) / (middleDotsCount + 1));

  // Generate middle dots
  for (let i = 1; i <= middleDotsCount; i++) {
    const itemIndex = Math.min(
      i * itemsPerDot,
      total - 1
    );
    if (itemIndex > 0 && itemIndex < total - 1) {
      dots.push(itemIndex);
    }
  }

  // Last dot always represents last item
  if (total > 1) {
    dots.push(total - 1);
  }

  return dots;
}

interface ScrollIndicatorProps {
  /** Total number of items */
  total: number;
  /** Current active item index */
  activeIndex: number;
  /** Callback when a dot is clicked */
  onDotClick: (index: number) => void;
  /** Maximum number of dots to show (default: 7) */
  maxDots?: number;
}

/**
 * Reusable scroll indicator component
 * Shows grouped dots (5-8) instead of one per item
 */
export default function ScrollIndicator({
  total,
  activeIndex,
  onDotClick,
  maxDots = 7,
}: ScrollIndicatorProps) {
  const dotIndices = generateGroupedDots(total, maxDots);

  return (
    <div className="flex gap-2">
      {dotIndices.map((itemIndex, dotIdx) => {
        // Determine if this dot should be active
        // Active if current index is within the range this dot represents
        let isActive = false;
        if (dotIdx === 0) {
          // First dot: active if we're at the first item
          isActive = activeIndex === 0;
        } else if (dotIdx === dotIndices.length - 1) {
          // Last dot: active if we're at or past the last item index
          isActive = activeIndex >= itemIndex;
        } else {
          // Middle dots: active if current index is between previous dot and this dot
          const prevIndex = dotIndices[dotIdx - 1];
          isActive = activeIndex >= prevIndex && activeIndex < itemIndex;
        }

        return (
          <button
            key={dotIdx}
            onClick={() => onDotClick(itemIndex)}
            className={`w-2 h-2 rounded-full transition-all ${
              isActive
                ? "bg-[var(--foreground)] opacity-100 scale-125"
                : "bg-[var(--foreground)] opacity-20 scale-100"
            }`}
            aria-label={`Go to item group ${dotIdx + 1}`}
          />
        );
      })}
    </div>
  );
}
