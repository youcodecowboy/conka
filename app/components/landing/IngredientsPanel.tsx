"use client";

import { useEffect, useRef } from "react";
import { getSupplementFacts } from "@/app/lib/supplementFacts";

interface IngredientsPanelProps {
  isOpen: boolean;
  product: "flow" | "clear" | null;
  onClose: () => void;
}

const PRODUCT_LABEL: Record<"flow" | "clear", string> = {
  flow: "CONKA Flow — Ingredients",
  clear: "CONKA Clear — Ingredients",
};

export default function IngredientsPanel({
  isOpen,
  product,
  onClose,
}: IngredientsPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  // Keep onClose reference fresh without re-triggering the effect below.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const facts = getSupplementFacts(product);
  const hasNutrients = facts.nutrients.length > 0;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        role="button"
        aria-label="Close ingredients panel"
        tabIndex={-1}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ingredients-panel-title"
        className="fixed z-[70] bg-white shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto bottom-0 left-0 right-0 rounded-t-[var(--brand-radius-card)] lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:right-auto lg:w-full lg:max-w-xl lg:rounded-[var(--brand-radius-card)]"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-black/6 px-5 py-4 lg:px-6 flex items-center justify-between">
          <h2
            id="ingredients-panel-title"
            className="text-lg lg:text-xl font-semibold text-[var(--brand-black)] tracking-[var(--brand-h2-tracking)]"
          >
            {PRODUCT_LABEL[product]}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-5 pt-5 pb-8 lg:p-6 lg:pb-8">
          <p className="text-sm lg:text-base text-black/70 leading-relaxed">
            {facts.ingredientsParagraph}
          </p>

          <p className="mt-4 text-xs uppercase tracking-wider text-black/40 font-semibold">
            Serving size: {facts.servingSize}
          </p>

          <p className="mt-1 text-[11px] text-black/45 leading-relaxed">
            Ingredients listed in descending order of concentration.
          </p>

          <div className="mt-4 rounded-[var(--brand-radius-container)] border border-black/10 overflow-hidden">
            {/* Nutrients rows (Clear only) */}
            {hasNutrients && (
              <>
                <div className="px-4 py-2 bg-black/[0.03] border-b border-black/10 grid grid-cols-[1fr_auto] gap-3 text-[11px] uppercase tracking-wider text-black/50 font-semibold">
                  <span>Vitamins &amp; Nutrients</span>
                  <span className="text-right">%NRV</span>
                </div>
                {facts.nutrients.map((n) => (
                  <div
                    key={n.name}
                    className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3 border-b border-black/6 text-sm"
                  >
                    <div>
                      <div className="text-black font-medium">{n.name}</div>
                      <div className="text-xs text-black/50 mt-0.5">{n.source}</div>
                    </div>
                    <div className="text-right text-black tabular-nums self-center">{n.nrv}</div>
                  </div>
                ))}
              </>
            )}

            {/* Actives rows */}
            <div className="px-4 py-2 bg-black/[0.03] border-b border-black/10 text-[11px] uppercase tracking-wider text-black/50 font-semibold">
              Active Ingredients
            </div>
            {facts.actives.map((a) => (
              <div
                key={a.name}
                className="px-4 py-3 border-b border-black/6 last:border-b-0 text-sm"
              >
                <div className="text-black font-medium">{a.name}</div>
                <div className="text-xs text-black/50 mt-0.5">{a.source}</div>
              </div>
            ))}
          </div>

          {/* Base ingredients */}
          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-wider text-black/50 font-semibold mb-2">
              Base
            </p>
            <ul className="text-sm text-black/70 space-y-1">
              {facts.base.map((b) => (
                <li key={b.name} className="flex justify-between gap-3">
                  <span>{b.name}</span>
                  <span className="text-black/40 text-xs">{b.role}</span>
                </li>
              ))}
            </ul>
          </div>

          {hasNutrients && (
            <p className="mt-3 text-[11px] text-black/45 leading-relaxed">
              †† EFSA-authorised health claim. NRV = Nutrient Reference Value (EU minimum for labelling).
            </p>
          )}
        </div>
      </div>
    </>
  );
}
