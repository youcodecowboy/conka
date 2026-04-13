import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import LandingCTA from "./LandingCTA";
import LandingTrustBadges from "./LandingTrustBadges";
import IngredientAccordion from "./IngredientAccordion";
import WhatsInsideProductMini from "./WhatsInsideProductMini";

export default function LandingWhatsInside() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="brand-h1 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Two shots. 16 active ingredients.
        </h2>
      </div>

      {/* Mobile: product mini above cards */}
      <div className="lg:hidden mb-8">
        <WhatsInsideProductMini />
      </div>

      {/* Desktop: two-column layout with product mini on right */}
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Ingredient accordion (client component) */}
        <IngredientAccordion />

        {/* Desktop: product mini on right, stretches to match cards */}
        <div className="hidden lg:block lg:w-[320px] lg:flex-shrink-0 lg:self-stretch">
          <WhatsInsideProductMini stretch />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-start">
        <LandingCTA>
          Get Both from &pound;{PRICE_PER_SHOT_BOTH}/shot &rarr;
        </LandingCTA>
      </div>

      {/* Trust Badges */}
      <div className="mt-6">
        <LandingTrustBadges />
      </div>
    </div>
  );
}
