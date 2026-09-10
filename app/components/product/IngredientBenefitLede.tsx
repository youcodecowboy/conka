import type { ProductHeroId } from "@/app/lib/productTypes";
import { LEDE_DESCRIPTION } from "@/app/lib/mmPdpData";

/* ============================================================================
 * IngredientBenefitLede (SCRUM-1209)
 *
 * The condensed product description + green-check benefit grid.
 *
 * Rendered directly by both heroes, under the buy panel: ProductHeroV3 on
 * desktop, ProductHeroMobileV3 on mobile.
 *
 * The two-line subline h2 that used to open this block is gone (SCRUM-1334).
 * The same sentence now opens the hero as HeroStrapline, directly under the
 * h1, where it answers "what does this do for me?" before the buyer reaches
 * the price. Keeping both meant saying it twice inside one screen.
 *
 * Flow ("01"), Clear ("02"), and Both ("03").
 * ========================================================================== */

const GREEN = "#1a7f4f";

const CHECK_ITEMS = [
  "Zero caffeine, zero crash",
  "Clinically-backed ingredients",
  "5x absorption vs pills & powders",
  "Informed Sport Certified",
];

function CheckMark() {
  return (
    <svg
      viewBox="0 0 15 15"
      width="16"
      height="16"
      fill="none"
      className="mt-0.5 shrink-0"
      aria-hidden
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill={GREEN} />
      <path d="M4.2 7.7L6.5 10L10.8 5.4" stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}

export default function IngredientBenefitLede({
  formulaId,
}: {
  formulaId: ProductHeroId;
}) {
  return (
    <div>
      {/* Condensed description (the images carry the fuller story). Canonical
          formulaContent.headline is left intact for other surfaces. */}
      <p className="brand-body max-w-2xl text-black">
        {LEDE_DESCRIPTION[formulaId]}
      </p>
      <ul className="mt-6 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3">
        {CHECK_ITEMS.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-snug text-black"
          >
            <CheckMark />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
