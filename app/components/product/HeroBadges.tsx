import { formatPrice } from "@/app/lib/productData";
import {
  getCadenceGiftValue,
  getCadencePricingByProductHeroId,
} from "@/app/lib/cadenceData";
import type { CadenceType } from "@/app/lib/cadenceData";
import { getHeroContent } from "@/app/lib/productHeroHelpers";
import { LEDE_SUBLINE } from "@/app/lib/mmPdpData";
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
 * The benefit line, directly under the h1 (SCRUM-1334).
 *
 * It replaces the spec pill that used to sit here ("0MG CAFFEINE | MORNING
 * RITUAL"), which spent the most valuable row on the page on facts a buyer
 * does not weigh. Nothing was lost in the swap: "0mg caffeine" is already the
 * first item in the hero's check grid, and the timing half is carried by the
 * strapline itself ("The Daily **Morning** Brain Shot", "The **Afternoon**
 * Brain Shot", "The Complete Daily Brain Shot **System**").
 *
 * Same source as the lede below the buy panel used for its h2, which is why
 * that h2 is now gone: with this at the top, it said the same sentence twice
 * within one screen.
 *
 * Deliberately not a heading element. It reads as a descriptor of the h1, and
 * making it an h2 here would leave the mobile hero with a heading level that
 * outranks everything it introduces.
 */
export function HeroStrapline({
  formulaId,
  className = "",
}: {
  formulaId: ProductHeroId;
  className?: string;
}) {
  const subline =
    LEDE_SUBLINE[formulaId] ?? getHeroContent(formulaId).seoHeading ?? "";
  if (!subline) return null;

  return (
    <p
      className={`text-lg font-medium leading-snug text-black ${className}`}
      style={{ letterSpacing: "-0.01em" }}
    >
      {subline}
    </p>
  );
}

/**
 * The starter-kit offer, summarised above the gallery (SCRUM-1334).
 *
 * The full stack of tiles still lives in the buy panel (GiftValueStack); this
 * is the one-line version of it, placed where a cold visitor sees it before
 * they reach the price rather than after.
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
    <p className={`text-sm font-medium text-black ${className}`}>
      Free starter kit worth{" "}
      <span className="font-bold" style={{ color: "var(--brand-positive)" }}>
        {formatPrice(giftValue)}
      </span>{" "}
      on your first box
    </p>
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
