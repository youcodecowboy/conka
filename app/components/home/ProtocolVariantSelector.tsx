"use client";

export type ProtocolVariant = "flow-heavy" | "balance" | "clear-heavy";

interface ProtocolVariantSelectorProps {
  variant: ProtocolVariant;
  onVariantChange: (variant: ProtocolVariant) => void;
}

export default function ProtocolVariantSelector({
  variant,
  onVariantChange,
}: ProtocolVariantSelectorProps) {
  return (
    <div className="flex gap-3 justify-center w-full flex-wrap">
      <button
        onClick={() => onVariantChange("flow-heavy")}
        className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
          variant === "flow-heavy"
            ? "bg-[var(--color-ink)] text-white shadow-md"
            : "bg-white text-[var(--text-on-light-muted)] border-2 border-black/15 hover:bg-black/5 hover:border-black/25"
        }`}
      >
        Resilience
      </button>
      <button
        onClick={() => onVariantChange("balance")}
        className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
          variant === "balance"
            ? "bg-[var(--color-ink)] text-white shadow-md"
            : "bg-white text-[var(--text-on-light-muted)] border-2 border-black/15 hover:bg-black/5 hover:border-black/25"
        }`}
      >
        Balance
      </button>
      <button
        onClick={() => onVariantChange("clear-heavy")}
        className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
          variant === "clear-heavy"
            ? "bg-[var(--color-ink)] text-white shadow-md"
            : "bg-white text-[var(--text-on-light-muted)] border-2 border-black/15 hover:bg-black/5 hover:border-black/25"
        }`}
      >
        Precision
      </button>
    </div>
  );
}
