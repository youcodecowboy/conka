import {
  BenefitIconFocus,
  BenefitIconSleep,
  BenefitIconStress,
} from "./icons";

const TILES = [
  {
    icon: <BenefitIconFocus />,
    heading: "Mental Performance",
    description: "Sharp focus and clear thinking when it counts.",
  },
  {
    icon: <BenefitIconSleep />,
    heading: "Sustained Energy",
    description: "All-day energy without caffeine, jitters, or crashes.",
  },
  {
    icon: <BenefitIconStress />,
    heading: "Brain Health",
    description: "Long-term cognitive protection, not just a quick fix.",
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
            <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-brand-accent/8 text-brand-accent">
              {tile.icon}
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold text-black mb-2">
              {tile.heading}
            </h3>
            <p className="text-sm text-black/60 leading-relaxed">
              {tile.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
