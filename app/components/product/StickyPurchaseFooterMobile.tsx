"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/app/lib/productData";
import { CadenceType } from "@/app/lib/cadenceData";
import { HERO_CTA_ANCHOR_ID } from "./pdpAnchors";

/* ============================================================================
 * StickyPurchaseFooterMobile
 *
 * The persistent buy bar on the three PDPs, below lg. One row: a single CTA
 * carrying its own price. Cadence selection lives in the hero widget, so the
 * bar only has to confirm the price and take the tap.
 *
 * Deliberately minimal (SCRUM-1260). It used to carry a guarantee line, and
 * before that a pack-size dropdown, both of which doubled its height on the one
 * surface where vertical space is scarcest. The guarantee has its own section.
 * ========================================================================== */

interface StickyPurchaseFooterMobileProps {
  selectedCadence: CadenceType;
  cadencePrice: number;
  onAddToCart: () => void;
}

export default function StickyPurchaseFooterMobile({
  selectedCadence,
  cadencePrice,
  onAddToCart,
}: StickyPurchaseFooterMobileProps) {
  const [isPastHeroCta, setIsPastHeroCta] = useState(false);

  // Held back until the hero's own Add to cart has scrolled up out of view, so
  // the bar never covers the CTA it exists to stand in for.
  //
  // This used to be `window.scrollY > 500`, a number tuned against the hero as
  // it stood at the time. SCRUM-1335 then moved the product lede above the plan
  // picker and pushed the CTA about 200px further down, which silently turned
  // that constant into the opposite of its intent: at 500px the bar would have
  // appeared over the button. Observing the button removes the whole class of
  // bug, since the hero can now change height freely.
  //
  // `isIntersecting` alone is not enough: the CTA is also outside the viewport
  // at the top of the page, far BELOW the fold, and treating that as "past"
  // would show the bar immediately on load. `top < 0` distinguishes scrolled
  // past from not yet reached.
  useEffect(() => {
    const cta = document.getElementById(HERO_CTA_ANCHOR_ID);
    // No CTA on the page means nothing to protect, and hiding a buy bar is
    // worse than showing one, so fail towards visible.
    if (!cta) {
      setIsPastHeroCta(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) =>
      setIsPastHeroCta(
        !entry.isIntersecting && entry.boundingClientRect.top < 0,
      ),
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  if (!isPastHeroCta) return null;

  const frequency =
    selectedCadence === "monthly-sub"
      ? "/mo"
      : selectedCadence === "quarterly-sub"
        ? "/quarter"
        : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/8 bg-white/95 backdrop-blur-sm">
      <div
        className="px-4 py-2.5"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
      >
        {/* Same plain CTA as the hero buy panel above, deliberately: the
            icon+meta variant forces its label onto one line, and
            "ADD TO CART · £149.99/QUARTER" is wide enough to overflow a small
            phone. This one wraps instead. */}
        <button
          type="button"
          onClick={onAddToCart}
          className="w-full rounded-full bg-[#1B2757] py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 ease-out hover:opacity-95 active:opacity-90 motion-safe:active:scale-[0.98]"
        >
          Add to Cart · {formatPrice(cadencePrice)}
          {frequency}
        </button>
      </div>
    </div>
  );
}
