import Image from "next/image";
import ConkaCTAButton from "./ConkaCTAButton";

const STATS = [
  { value: "32", label: "PEER-REVIEWED\nSTUDIES CITED" },
  { value: "150,000+", label: "DOSES\nDELIVERED" },
  { value: "4.7/5", label: "VERIFIED\nCUSTOMER RATING" },
];

function StatStrip({ dense }: { dense?: boolean }) {
  if (dense) {
    return (
      <div className="w-full border border-black/12 overflow-hidden">
        {STATS.map((stat, idx) => (
          <div
            key={stat.value}
            className={`flex flex-row items-center gap-6 px-5 py-4 ${
              idx < STATS.length - 1 ? "border-b border-black/10" : ""
            }`}
          >
            <p className="font-mono text-2xl font-bold text-black tracking-tight leading-none tabular-nums w-36 flex-shrink-0">
              {stat.value}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/45 leading-snug whitespace-pre-line">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 border border-black/12 overflow-hidden lab-asset-frame">
      {STATS.map((stat, idx) => (
        <div
          key={stat.value}
          className={`flex flex-col gap-1.5 px-3 py-4 ${
            idx < STATS.length - 1 ? "border-r border-black/10" : ""
          }`}
        >
          <p className="font-mono text-base font-bold text-black tracking-tight leading-none tabular-nums">
            {stat.value}
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/45 leading-snug whitespace-pre-line">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function LandingHero() {
  return (
    <div>
      {/* Mobile — full-bleed image with title overlay, stats + CTA below */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden -mx-5 w-[calc(100%+2.5rem)] aspect-[4/3]">
          <Image
            src="/lifestyle/CreationOfConkaBlack.jpg"
            alt="Two hands exchanging a CONKA brain performance shot"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0.0) 100%)",
            }}
          />
          <div className="absolute top-0 left-0 px-5 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/55 tabular-nums">
              // Daily Brain Performance
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <h1
              className="text-black font-semibold text-3xl leading-[1.08]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Brain Performance in One Daily Shot.
            </h1>
          </div>
        </div>

        <div className="mt-6">
          <ConkaCTAButton>Get Started Today</ConkaCTAButton>
        </div>

        <div className="mt-10">
          <StatStrip />
        </div>
      </div>

      {/* Desktop — content left, asset right */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12 xl:gap-16 lg:items-center">
        {/* Left — eyebrow, title, CTA, stats */}
        <div className="flex flex-col items-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/55 tabular-nums mb-5">
            // Daily Brain Performance
          </p>

          <h1
            className="text-black font-semibold text-5xl xl:text-6xl leading-[1.05] mb-8 max-w-[18ch]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Brain Performance in One Daily Shot.
          </h1>

          <div className="mb-10">
            <ConkaCTAButton>Get Started Today</ConkaCTAButton>
          </div>

          <StatStrip dense />
        </div>

        {/* Right — asset with figure plates */}
        <div className="relative w-full aspect-[4/3] border border-black/12 overflow-hidden bg-[#f5f5f5]">
          <Image
            src="/lifestyle/CreationOfConkaBlack.jpg"
            alt="Two hands exchanging a CONKA brain performance shot"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center"
          />
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white bg-black/65 px-2 py-1 tabular-nums">
            Fig. 01
          </span>
          <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white bg-black/65 px-2 py-1 tabular-nums">
            Creation of CONKA
          </span>
        </div>
      </div>
    </div>
  );
}
