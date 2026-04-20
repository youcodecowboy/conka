import { GUARANTEE_LABEL } from "@/app/lib/offerConstants";

const BADGES = [
  { label: "Free UK Shipping", sub: "On subscriptions" },
  { label: "Informed Sport", sub: "Certified" },
  { label: "Batch Tested", sub: "UK lab verified" },
  { label: "Cancel Anytime", sub: GUARANTEE_LABEL },
];

export default function LabTrustBadges() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-black/8 border border-black/8 overflow-hidden">
      {BADGES.map((badge) => (
        <div key={badge.label} className="px-4 py-3 lg:px-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/70 leading-tight">
            {badge.label}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/35 mt-0.5 leading-tight">
            {badge.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
