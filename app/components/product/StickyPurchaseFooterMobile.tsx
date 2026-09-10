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

/**
 * How far up the screen the hero CTA has to travel before the bar appears,
 * as a fraction of viewport height. 0.5 is the top half.
 *
 * Lower reveals later (1 would be "the moment it leaves the bottom", 0 "once it
 * has left the top entirely"). Anything at or below 0.5 keeps the CTA clear of
 * the bar's own strip at the bottom of the screen, which is the only thing this
 * delay exists to protect.
 */
const REVEAL_ABOVE = 0.5;

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

  // Revealed once the hero's own Add to cart has risen past REVEAL_ABOVE of the
  // screen, so the bar arrives while the CTA is on its way out rather than long
  // after it has gone, and can still never sit on top of it.
  //
  // This used to be `window.scrollY > 500`, a number tuned against the hero as
  // it stood at the time. SCRUM-1335 then moved the product lede above the plan
  // picker and pushed the CTA about 200px further down, which silently turned
  // that constant into the opposite of its intent: at 500px the bar would have
  // appeared over the button. Watching the button removes that whole class of
  // bug, since the hero can now change height freely.
  //
  // Waiting for the CTA to leave the viewport entirely, the first version of
  // this, was the latest safe moment rather than the right one: on a tall phone
  // it meant scrolling most of the buy panel before a buy affordance came back.
  // The bar lives at the BOTTOM of the screen, so it only ever risks covering
  // the CTA while the CTA is near the bottom too. Once the button is in the top
  // half there is no conflict left to avoid, which is what REVEAL_ABOVE encodes.
  //
  // A fraction rather than a pixel offset so it scales with the device instead
  // of becoming the next constant that quietly goes stale.
  useEffect(() => {
    const cta = document.getElementById(HERO_CTA_ANCHOR_ID);
    // No CTA on the page means nothing to protect, and hiding a buy bar is
    // worse than showing one, so fail towards visible.
    if (!cta) {
      setIsPastHeroCta(true);
      return;
    }

    const reveal = () => {
      const { bottom } = cta.getBoundingClientRect();
      setIsPastHeroCta(bottom < window.innerHeight * REVEAL_ABOVE);
    };

    // Shrinking the root's top by the same fraction makes the observer fire on
    // exactly the crossing the predicate tests, so the two cannot disagree.
    const observer = new IntersectionObserver(reveal, {
      rootMargin: `-${(1 - REVEAL_ABOVE) * 100}% 0px 0px 0px`,
    });
    observer.observe(cta);

    // The observer covers scrolling. A resize or rotate changes innerHeight
    // without moving anything, and would otherwise leave the last decision
    // standing against a viewport that no longer matches it.
    window.addEventListener("resize", reveal, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", reveal);
    };
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
