import { FUNNEL_URL } from "@/app/lib/landingConstants";

/**
 * Shared CTA button for the /start landing page.
 * Uses brand accent (#4058bb) as primary action color.
 */
export default function LandingCTA({
  children,
  href = FUNNEL_URL,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--brand-radius-interactive)] font-semibold text-base text-white bg-brand-accent transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}
