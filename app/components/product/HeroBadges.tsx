import { formatPrice } from "@/app/lib/productData";
import {
  getCadenceGiftTiles,
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
 * "over £80" from 82.96, for the hero offer badge.
 *
 * Rounds DOWN to the nearest ten so the claim is always true of the real total,
 * and drops the pence, since formatPrice always renders two decimals and
 * "over £80.00" reads like a checkout line rather than a headline.
 *
 * A total that lands exactly on a ten steps down a bucket, because "over £80"
 * is false when the total is £80. No current cadence does that (they all end
 * .96 or .99), but the next price change should not be able to make this lie.
 * Below £10 there is no sensible round number, so the caller shows the exact
 * figure instead.
 */
function roundedDownValue(value: number): string | null {
  const floored = Math.floor(value / 10) * 10;
  const safe = floored === value ? floored - 10 : floored;
  return safe >= 10 ? `£${safe}` : null;
}

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
 * Leads with the gift COUNT, not the money, and not a discount percentage.
 *
 * Why gifts rather than the discount, given the reference PDPs put a discount
 * pill here: this slot is pre-price. Since the lede moved above the plan picker
 * (SCRUM-1335) the first price on the page sits roughly 200px below this badge,
 * so a percentage has nothing to anchor to at the moment it is read, while a
 * count of free things does not need one. The discount is also already stated
 * on the plan-card corner and the sticky footer, and a third instance is the
 * cannibalisation this work set out to avoid. Graymatter can put a percentage
 * here because their price sits beside it; ours does not.
 *
 * Why the count leads: a bare figure set large in green read as the price of
 * the product rather than the value of a gift, which is an expensive misread on
 * a first screen. A count cannot be mistaken for a price, so it goes first and
 * the money follows as support.
 *
 * Treatment is the old spec pill's, which this badge replaced: the light
 * blue-lilac gradient fill, mono face and uppercase tracking that "0MG CAFFEINE
 * | MORNING RITUAL" carried in this exact slot. A flat pill was tried and
 * abandoned once already, but the fault then was the copy, not the fill: a
 * lone "£82.96" in a uniform line had nothing marking it as a value rather than
 * a price. Count-led copy removes that, so the flat treatment holds and the
 * slot keeps the shape the page was built around. The gift icon is the one
 * addition, in the positive green, so the pill reads as an offer at a glance
 * rather than as a spec.
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
  const giftCount = getCadenceGiftTiles(pricing).length;
  if (giftValue <= 0 || giftCount === 0) return null;
  const rounded = roundedDownValue(giftValue);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#dbe0f0] to-[#eef1f8] px-4 py-2 font-mono text-sm font-bold uppercase tracking-wide text-black ${className}`}
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
      +{giftCount} free gifts{" "}
      {rounded ? `worth over ${rounded}` : `worth ${formatPrice(giftValue)}`}
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
