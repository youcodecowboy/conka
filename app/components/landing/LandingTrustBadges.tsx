import { GUARANTEE_LABEL } from "@/app/lib/offerConstants";
import {
  TrustIconShipping,
  TrustIconInformedSport,
  TrustIconBatchTested,
  TrustIconCancel,
} from "./icons";

const TRUST_BADGES = [
  {
    icon: <TrustIconShipping />,
    title: "Free UK Shipping",
    subtitle: "On subscriptions",
  },
  {
    icon: <TrustIconInformedSport />,
    title: "Informed Sport",
    subtitle: "Certified",
  },
  {
    icon: <TrustIconBatchTested />,
    title: "Every Batch Tested",
    subtitle: "UK lab verified",
  },
  {
    icon: <TrustIconCancel />,
    title: "Cancel Anytime",
    subtitle: GUARANTEE_LABEL,
  },
];

export default function LandingTrustBadges() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {TRUST_BADGES.map((badge) => (
        <div
          key={badge.title}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-[var(--brand-radius-interactive)] bg-black/[0.03] border border-black/6"
        >
          <span className="text-brand-accent/60 shrink-0">
            {badge.icon}
          </span>
          <div>
            <p className="text-xs font-semibold leading-tight text-black/80">
              {badge.title}
            </p>
            <p className="text-xs leading-tight text-black/50">
              {badge.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
