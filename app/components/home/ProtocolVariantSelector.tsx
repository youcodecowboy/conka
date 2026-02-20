"use client";

export type ProtocolVariant = "flow-heavy" | "balance" | "clear-heavy";

const VARIANT_OPTIONS: { value: ProtocolVariant; label: string }[] = [
  { value: "flow-heavy", label: "Resilience" },
  { value: "balance", label: "Balance" },
  { value: "clear-heavy", label: "Precision" },
];

interface ProtocolVariantSelectorProps {
  variant: ProtocolVariant;
  onVariantChange: (variant: ProtocolVariant) => void;
  disabledVariants?: ProtocolVariant[];
}

export default function ProtocolVariantSelector({
  variant,
  onVariantChange,
  disabledVariants = [],
}: ProtocolVariantSelectorProps) {
  const visible = VARIANT_OPTIONS.filter(
    (opt) => !disabledVariants.includes(opt.value)
  );

  return (
    <div className="flex gap-3 justify-center w-full flex-wrap">
      {visible.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onVariantChange(opt.value)}
          className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
            variant === opt.value
              ? "bg-[var(--color-ink)] text-white shadow-md"
              : "bg-white text-[var(--text-on-light-muted)] border-2 border-black/15 hover:bg-black/5 hover:border-black/25"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
