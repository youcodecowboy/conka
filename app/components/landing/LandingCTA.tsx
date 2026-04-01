import { FUNNEL_URL } from "@/app/lib/landingConstants";

/**
 * Shared CTA button for the /start landing page.
 * Consistent styling across all landing sections.
 *
 * Defaults to dark (ink bg, white text). Pass `variant="light"` for
 * inverted style on dark sections (white bg, ink text).
 */
export default function LandingCTA({
  children,
  href = FUNNEL_URL,
  variant = "dark",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        backgroundColor:
          variant === "dark" ? "var(--color-ink)" : "white",
        color:
          variant === "dark" ? "white" : "var(--color-ink)",
      }}
    >
      {children}
    </a>
  );
}
