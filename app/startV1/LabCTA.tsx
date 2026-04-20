import Link from "next/link";
import { FUNNEL_URL } from "@/app/lib/landingConstants";

/* Clipped-corner CTA — top-right corner chamfered for a precision/lab feel.
   clip-path overrides border-radius visually; rounded-none is kept for layout correctness. */
const CLASSES =
  "inline-flex items-center justify-center w-full lg:w-auto lg:max-w-md text-center py-4 px-14 rounded-none font-mono font-semibold text-sm uppercase tracking-[0.12em] text-white bg-[#1B2757] transition-opacity hover:opacity-85 active:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B2757] [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)]";

export default function LabCTA({
  children,
  href = FUNNEL_URL,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const classes = `${CLASSES} ${className}`;
  const isExternal = href.startsWith("http") || href.startsWith("//");

  if (isExternal) {
    return <a href={href} className={classes}>{children}</a>;
  }
  return <Link href={href} className={classes}>{children}</Link>;
}
