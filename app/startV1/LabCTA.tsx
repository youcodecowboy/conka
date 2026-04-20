import Link from "next/link";
import { FUNNEL_URL } from "@/app/lib/landingConstants";

export default function LabCTA({
  children,
  href = FUNNEL_URL,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("//");
  const classes = `inline-flex items-center justify-center w-full lg:w-auto lg:max-w-md text-center py-4 px-14 rounded-[4px] font-mono font-semibold text-sm uppercase tracking-[0.12em] text-white bg-black transition-opacity hover:opacity-80 active:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${className}`;

  if (isExternal) {
    return <a href={href} className={classes}>{children}</a>;
  }
  return <Link href={href} className={classes}>{children}</Link>;
}
