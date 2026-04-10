import {
  BenefitIconFocus,
  BenefitIconSleep,
  BenefitIconStress,
} from "./icons";

const TILES = [
  {
    icon: <BenefitIconFocus />,
    heading: "Mental Performance",
    description:
      "Clinically-studied ingredients for your daily focus and clarity routine. Stay locked in past 2pm instead of reaching for another coffee.",
  },
  {
    icon: <BenefitIconSleep />,
    heading: "Sustained Energy",
    description:
      "All-day mental energy without caffeine, jitters, or crashes. Adaptogens help your body manage the demands of a full day, not just the first few hours.",
  },
  {
    icon: <BenefitIconStress />,
    heading: "Brain Health",
    description:
      "Long-term investment in your brain, not just a quick fix. Vitamin C contributes to the protection of cells from oxidative stress.\u2020\u2020 A daily routine built for the years ahead.",
  },
];

export default function LandingWhatItDoes() {
  return (
    <div>
      <div className="mb-8">
        <h2
          className="brand-h1 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What CONKA does.
        </h2>
        <p className="brand-caption text-black/50">
          Two daily brain shots. 16 active ingredients. One system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {TILES.map((tile) => (
          <div
            key={tile.heading}
            className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 shadow-sm p-5 lg:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl lg:text-3xl font-semibold text-black">
                {tile.heading}
              </h3>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/8 text-brand-accent flex-shrink-0 ml-3">
                {tile.icon}
              </div>
            </div>
            <p className="text-sm text-black/60 leading-relaxed">
              {tile.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
