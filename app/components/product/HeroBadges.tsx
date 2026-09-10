import { formatPrice } from "@/app/lib/productData";
import {
  getCadenceGiftValue,
  getCadencePricingByProductHeroId,
} from "@/app/lib/cadenceData";
import type { CadenceType } from "@/app/lib/cadenceData";
import type { ProductHeroId } from "@/app/lib/productTypes";

/**
 * Shared Magic Mind-style hero elements used on both the desktop
 * (ProductHeroV3) and mobile (ProductHeroMobileV3) PDP heroes. Kept in one
 * place so the two surfaces stay in step. Pass `className` to control
 * alignment (mobile centres with `mx-auto`; the desktop left column leaves
 * them left-aligned).
 */

type SpecProductType = "flow" | "clear" | "both";

/**
 * The starter-kit offer, above the gallery (SCRUM-1334, restyled SCRUM-1336).
 *
 * The full stack of tiles still lives in the buy panel (GiftValueStack); this
 * is the one-line version of it, placed where a cold visitor sees it before
 * they reach the price rather than after.
 *
 * A badge rather than a sentence. As body text it read as fine print and was
 * the easiest thing on the first screen to skip, which is the opposite of what
 * the strongest offer we have should do.
 *
 * Two earlier passes are worth knowing about, because the third is a response
 * to both. A solid green fill read as a system alert rather than as part of the
 * brand. Reskinning it as the old spec pill fixed that but flattened the figure
 * back into the sentence, so the badge was noticeable and the number inside it
 * still was not.
 *
 * This version borrows the cart upsell's treatment instead: flat #eef0f5 fill
 * with the offer gradient as a 2px ring. The label steps back to small mono
 * uppercase and the figure steps forward at 1.125rem in the positive green, so
 * the thing the eye lands on is the amount rather than the words around it.
 * "worth" stays in the label so the figure cannot be misread as a price.
 *
 * Renders nothing when the selected cadence gives nothing away, which is every
 * one-time cadence: offerData attaches the starter pack to subscriptions only.
 * The figure is per-cadence rather than a fixed headline number, and comes from
 * the same helper the stack uses, so the two cannot disagree.
 */
export function HeroGiftValue({
  formulaId,
  selectedCadence,
  className = "",
}: {
  formulaId: ProductHeroId;
  selectedCadence: CadenceType;
  className?: string;
}) {
  const pricing = getCadencePricingByProductHeroId(formulaId, selectedCadence);
  const giftValue = getCadenceGiftValue(pricing);
  if (giftValue <= 0) return null;

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-lg px-3.5 py-2 ${className}`}
      // Same ring as the cart upsell and the selected plan card: the offer
      // gradient painted on the border box over a flat fill on the padding box,
      // which a plain border-color cannot do.
      style={{
        border: "2px solid transparent",
        background:
          "linear-gradient(#eef0f5,#eef0f5) padding-box, linear-gradient(90deg,#cdeecf,#e9f5c9) border-box",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        aria-hidden
        className="shrink-0"
        style={{ color: "var(--brand-positive)" }}
      >
        <path
          d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-mono text-[11px] font-bold uppercase leading-none tracking-wide text-black/65">
        Free starter kit worth
      </span>
      <span
        className="text-lg font-bold leading-none tabular-nums"
        style={{ color: "var(--brand-positive)" }}
      >
        {formatPrice(giftValue)}
      </span>
    </span>
  );
}

/** Live-viewer count per product for the social-proof pill. */
const SOCIAL_PROOF_COUNT: Record<SpecProductType, number> = {
  flow: 112,
  clear: 104,
  both: 224,
};

/** Live-viewer social proof (Magic Mind pattern): small plain text + eye icon,
 *  no background pill. */
export function SocialProofBadge({
  productType,
  className = "",
}: {
  productType: SpecProductType;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-black/70 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 13C6.6 5 17.4 5 21 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="3" fill="currentColor" />
      </svg>
      {SOCIAL_PROOF_COUNT[productType]} others exploring better focus
    </span>
  );
}
