import Image from "next/image";
import ConkaCTAButton from "./ConkaCTAButton";

const STATS = [
  { value: "32", label: "PEER-REVIEWED\nSTUDIES CITED" },
  { value: "150,000+", label: "DOSES\nDELIVERED" },
  { value: "4.7/5", label: "VERIFIED\nCUSTOMER RATING" },
];

export default function LandingHero() {
  return (
    <div>
      {/* Full-bleed image with narrow frosted-white strip at bottom */}
      <div className="relative overflow-hidden -mx-5 w-[calc(100%+2.5rem)] lg:mx-0 lg:w-full aspect-[4/3] lg:aspect-[16/7]">
        <Image
          src="/lifestyle/CreationOfConkaBlack.jpg"
          alt="Two hands exchanging a CONKA brain performance shot"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 90vw"
          className="object-cover object-center"
        />

        {/* Short white gradient at bottom — legibility for the title overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 lg:h-28"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0.0) 100%)",
          }}
        />

        {/* Section label — top left */}
        <div className="absolute top-0 left-0 px-5 pt-5 lg:px-8 lg:pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/55">
            Daily Brain Performance
          </p>
        </div>

        {/* Title — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 lg:px-8 lg:pb-7 lg:max-w-3xl">
          <h1 className="text-black font-semibold text-3xl lg:text-5xl leading-[1.08] tracking-[-0.02em]">
            Brain Performance in<br className="hidden lg:block" /> One Daily Shot.
          </h1>
        </div>
      </div>

      {/* CTA below the asset */}
      <div className="mt-6 lg:mt-8">
        <ConkaCTAButton>Get Started Today</ConkaCTAButton>
      </div>

      {/* Clinical stat strip — single row, 3 columns across all breakpoints */}
      <div className="lab-asset-frame mt-10 grid grid-cols-3 divide-x divide-black/10 overflow-hidden">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col items-center text-center gap-1.5 px-3 py-4 lg:px-6 lg:py-5"
          >
            <p className="font-mono text-base lg:text-2xl font-bold text-black tracking-tight leading-none tabular-nums">
              {stat.value}
            </p>
            <p className="font-mono text-[8px] lg:text-[9px] uppercase tracking-[0.14em] text-black/45 leading-snug whitespace-pre-line">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
