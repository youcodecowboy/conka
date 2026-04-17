import Link from "next/link";

/**
 * Reusable brand button — handles internal links (Next.js Link),
 * external links (<a>), and plain <button> elements.
 *
 * Defaults to full-width on mobile with a sensible max-width on desktop.
 */
export default function Button({
  children,
  href,
  className = "",
  type,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler;
}) {
  const base =
    "inline-flex items-center justify-center w-full max-w-md text-center py-4 px-8 rounded-[var(--brand-radius-interactive)] font-semibold text-base text-white bg-brand-accent transition-transform hover:scale-[1.02] active:scale-[0.98]";

  const classes = `${base} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    if (isExternal) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
