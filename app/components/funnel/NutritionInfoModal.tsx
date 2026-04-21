"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { type FunnelProduct } from "@/app/lib/funnelData";

interface NutritionInfoModalProps {
  isOpen: boolean;
  product: FunnelProduct;
  onClose: () => void;
}

interface NutritionEntry {
  heading: string;
  src: string;
  alt: string;
}

const NUTRITION_FLOW: NutritionEntry = {
  heading: "Flow",
  src: "/formulas/conkaFlow/FlowNutrition.jpg",
  alt: "CONKA Flow nutritional information and ingredients",
};

const NUTRITION_CLEAR: NutritionEntry = {
  heading: "Clear",
  src: "/formulas/conkaClear/ClearNutrition.jpg",
  alt: "CONKA Clear nutritional information and ingredients",
};

function getEntries(product: FunnelProduct): NutritionEntry[] {
  if (product === "flow") return [NUTRITION_FLOW];
  if (product === "clear") return [NUTRITION_CLEAR];
  return [NUTRITION_FLOW, NUTRITION_CLEAR];
}

export default function NutritionInfoModal({
  isOpen,
  product,
  onClose,
}: NutritionInfoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const entries = getEntries(product);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        role="button"
        aria-label="Close nutritional information"
        tabIndex={-1}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nutrition-modal-heading"
        className="fixed z-[70] bg-white shadow-2xl animate-slide-up flex flex-col bottom-0 left-0 right-0 top-[10vh] lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:right-auto lg:w-full lg:max-w-xl lg:max-h-[85vh]"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 lg:px-6 lg:pt-6 border-b border-black/10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
              Spec · Formulation
            </p>
            <h3
              id="nutrition-modal-heading"
              className="text-lg font-semibold text-[var(--brand-black)] tracking-[var(--brand-h2-tracking)]"
            >
              Nutritional facts & ingredients
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center text-black/60 hover:bg-black/5 hover:text-black/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 lg:px-6 lg:py-5">
          <div className="space-y-6">
            {entries.map((entry, i) => (
              <div key={entry.heading}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55 mb-2 tabular-nums">
                  {String(i + 1).padStart(2, "0")} · CONKA {entry.heading}
                </p>
                <div className="lab-asset-frame bg-[var(--brand-tint)]">
                  <Image
                    src={entry.src}
                    alt={entry.alt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    loading="eager"
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
