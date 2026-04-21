import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import ConkaCTAButton from "./ConkaCTAButton";
import LabTrustBadges from "./LabTrustBadges";
import LabWhatsInsideMini from "./LabWhatsInsideMini";
import LabDosingWindows from "./LabDosingWindows";

export default function LandingWhatItDoes() {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Formulation
      </p>
      <h2
        className="brand-h1 mb-6"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Two shots. 16 active ingredients.
      </h2>

      <LabDosingWindows />

      <div className="mb-8">
        <LabWhatsInsideMini />
      </div>

      <div className="mb-3 flex justify-start">
        <ConkaCTAButton>
          Get Both from &pound;{PRICE_PER_SHOT_BOTH}/shot
        </ConkaCTAButton>
      </div>
      <div>
        <LabTrustBadges />
      </div>
    </div>
  );
}
