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
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onVariantChange("flow-heavy")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          variant === "flow-heavy"
            ? "bg-[var(--color-ink)] text-white"
            : "bg-white text-[var(--text-on-light-muted)] border border-black/10 hover:bg-black/5"
        }`}
      >
        Flow Heavy
      </button>
      <button
        onClick={() => onVariantChange("balance")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          variant === "balance"
            ? "bg-[var(--color-ink)] text-white"
            : "bg-white text-[var(--text-on-light-muted)] border border-black/10 hover:bg-black/5"
        }`}
      >
        Balance
      </button>
      <button
        onClick={() => onVariantChange("clear-heavy")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          variant === "clear-heavy"
            ? "bg-[var(--color-ink)] text-white"
            : "bg-white text-[var(--text-on-light-muted)] border border-black/10 hover:bg-black/5"
        }`}
      >
        Clear Heavy
      </button>
    </div>
  );
}
