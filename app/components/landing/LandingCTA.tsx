import { FUNNEL_URL } from "@/app/lib/landingConstants";

/**
 * Shared CTA button for the /start landing page.
 * Consistent styling across all landing sections.
 *
 * Defaults to dark (black bg, white text). Pass `variant="light"` for
 * inverted style on dark sections (white bg, black text).
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
      className={`block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--brand-radius-interactive)] font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        backgroundColor:
          variant === "dark" ? "var(--brand-black)" : "var(--brand-white)",
        color:
          variant === "dark" ? "var(--brand-white)" : "var(--brand-black)",
      }}
    >
      {children}
    </a>
  );
}
