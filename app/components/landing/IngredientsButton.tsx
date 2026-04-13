"use client";

interface IngredientsButtonProps {
  product: "flow" | "clear";
  onClick: () => void;
  className?: string;
  iconSize?: number;
}

const PRODUCT_NAME: Record<"flow" | "clear", string> = {
  flow: "Flow",
  clear: "Clear",
};

export default function IngredientsButton({
  product,
  onClick,
  className = "",
  iconSize = 14,
}: IngredientsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View CONKA ${PRODUCT_NAME[product]} ingredients`}
      className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-[var(--brand-radius-interactive)] font-semibold border border-black/15 text-black/80 hover:bg-black/[0.03] active:bg-black/[0.05] transition-colors ${className}`}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 7.25v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="8" cy="5.25" r="0.75" fill="currentColor" />
      </svg>
      Ingredients
    </button>
  );
}
