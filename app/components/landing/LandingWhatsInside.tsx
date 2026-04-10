import Image from "next/image";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import LandingCTA from "./LandingCTA";
import LandingTrustBadges from "./LandingTrustBadges";
import IngredientAccordion from "./IngredientAccordion";

function ProductMini({ stretch = false }: { stretch?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-3 lg:gap-4 ${stretch ? "h-full" : ""}`}>
      {/* Flow */}
      <div className={`flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-black/[0.02] border border-black/6 p-4 lg:p-6 ${stretch ? "justify-center" : ""}`}>
        <div className={`relative w-16 h-36 mb-3 ${stretch ? "lg:w-28 lg:h-64" : "lg:w-24 lg:h-52"}`}>
          <Image
            src="/formulas/conkaFlow/FlowNoBackground.png"
            alt="CONKA Flow bottle"
            fill
            sizes={stretch ? "(max-width: 1024px) 64px, 112px" : "(max-width: 1024px) 64px, 96px"}
            className="object-contain scale-200"
          />
        </div>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--brand-radius-interactive)] text-[11px] lg:text-xs font-semibold mb-2"
          style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "rgb(180, 83, 9)" }}
        >
          ☀️ Morning
        </span>
        <p className="text-sm lg:text-base font-semibold text-black">CONKA Flow</p>
        <p className="text-[11px] lg:text-xs text-black/40 mt-1">
          Lemon Balm · Ashwagandha · +4 more ingredients
        </p>
      </div>

      {/* Clear */}
      <div className={`flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-black/[0.02] border border-black/6 p-4 lg:p-6 ${stretch ? "justify-center" : ""}`}>
        <div className={`relative w-16 h-36 mb-3 ${stretch ? "lg:w-28 lg:h-64" : "lg:w-24 lg:h-52"}`}>
          <Image
            src="/formulas/conkaClear/ClearNoBackground.png"
            alt="CONKA Clear bottle"
            fill
            sizes={stretch ? "(max-width: 1024px) 64px, 112px" : "(max-width: 1024px) 64px, 96px"}
            className="object-contain scale-200"
          />
        </div>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--brand-radius-interactive)] text-[11px] lg:text-xs font-semibold mb-2"
          style={{ backgroundColor: "rgba(14, 165, 233, 0.1)", color: "rgb(3, 105, 161)" }}
        >
          ☀️ Afternoon
        </span>
        <p className="text-sm lg:text-base font-semibold text-black">CONKA Clear</p>
        <p className="text-[11px] lg:text-xs text-black/40 mt-1">
          Glutathione · Alpha GPC · +8 more ingredients
        </p>
      </div>
    </div>
  );
}

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
        <ProductMini />
      </div>

      {/* Desktop: two-column layout with product mini on right */}
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Ingredient accordion (client component) */}
        <IngredientAccordion />

        {/* Desktop: product mini on right, stretches to match cards */}
        <div className="hidden lg:block lg:w-[320px] lg:flex-shrink-0 lg:self-stretch">
          <ProductMini stretch />
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
