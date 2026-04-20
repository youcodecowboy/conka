import Link from "next/link";
import { FUNNEL_URL } from "@/app/lib/landingConstants";

/* Meta subtitle variants — swap ACTIVE_META to test different directions.
   Performance note: the blinking _ uses a CSS step-end animation on a text
   node. It only triggers compositing (no layout, no paint), so perf cost
   is essentially zero even on low-end mobile. */
const META_VARIANTS = {
  aspirational:   "// your brain, optimised.",
  performance:    "// think sharper · every single day",
  measured:       "// peak performance, measured.",
  proof:          "// 28.96% avg. cognitive improvement",
  guarantee:      "// 100-day risk-free · nothing to lose",
} as const;

const ACTIVE_META: string = META_VARIANTS.aspirational;

const OUTER =
  "inline-flex flex-col items-start justify-center w-full lg:w-auto lg:max-w-md py-3.5 px-10 rounded-none text-white bg-[#1B2757] transition-opacity hover:opacity-85 active:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B2757] [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)]";

export default function LabCTA({
  children,
  href = FUNNEL_URL,
  meta = ACTIVE_META,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  meta?: string;
  className?: string;
}) {
  const classes = `${OUTER} ${className}`;
  const isExternal = href.startsWith("http") || href.startsWith("//");

  const inner = (
    <>
      <span className="font-mono font-bold text-sm uppercase tracking-[0.12em] flex items-center gap-0.5">
        {children}
        <span
          className="inline-block ml-0.5"
          style={{ animation: "lab-blink 1s step-end infinite" }}
          aria-hidden
        >
          _
        </span>
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 mt-1 leading-none">
        {meta}
      </span>
    </>
  );

  if (isExternal) {
    return <a href={href} className={classes}>{inner}</a>;
  }
  return <Link href={href} className={classes}>{inner}</Link>;
}
