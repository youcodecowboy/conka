import {
  TrustIconNoCaffeine,
  TrustIconInformedSport,
  TrustIconGuarantee,
  TrustIconShipping,
  TrustIconBatchTested,
  TrustIconCancel,
} from "./icons";

/**
 * The icon keys a trust chip can carry. Defined here rather than in the
 * listicle types: the listicle `trustPills` field that used to own this was
 * deleted in SCRUM-1324, and nothing in a landing-page config module should
 * be the home of a component's own prop type.
 *
 * NOTE: this component's only consumer is LandingHero, which nothing imports
 * (the home page renders HomeHeroStatic). The whole chain is dead code. Left
 * in place rather than deleted in SCRUM-1324, which was not a dead-component
 * sweep; see docs/TODO.md.
 */
export type TrustPillIcon =
  | "no-caffeine"
  | "informed-sport"
  | "guarantee"
  | "shipping"
  | "batch-tested"
  | "cancel";

/** Maps a trust-chip icon key to its SVG so each item reads distinctly */
const TRUST_CHIP_ICONS: Record<
  TrustPillIcon,
  (props: { className?: string }) => React.ReactElement
> = {
  "no-caffeine": TrustIconNoCaffeine,
  "informed-sport": TrustIconInformedSport,
  guarantee: TrustIconGuarantee,
  shipping: TrustIconShipping,
  "batch-tested": TrustIconBatchTested,
  cancel: TrustIconCancel,
};

export interface TrustChip {
  label: string;
  icon: TrustPillIcon;
}

/**
 * Under-CTA trust row: bordered icon + label mini-chips, each carrying
 * its own meaningful glyph instead of a uniform tick. Shared by the
 * listicle hero and the home hero. Alignment is owned by the parent.
 */
export default function TrustChips({
  chips,
  className = "",
}: {
  chips: TrustChip[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {chips.map((chip, i) => {
        const Icon = TRUST_CHIP_ICONS[chip.icon];
        return (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-3 py-2 text-[11px] font-semibold leading-tight text-black/75 shadow-[0_1px_6px_rgba(0,0,0,0.05)]"
          >
            <Icon className="h-4 w-4 flex-shrink-0 text-[#1B2757]" />
            {chip.label}
          </span>
        );
      })}
    </div>
  );
}
