import Image from "next/image";
import ConkaCTAButton from "@/app/components/landing/ConkaCTAButton";

const ROWS = [
  {
    counter: "01",
    label: "The difference",
    body: "Other brands tell you it works. CONKA gives you a cognitive test and a daily log so you can watch it happen.",
  },
  {
    counter: "02",
    label: "What it is",
    body: "A companion app with a two-minute cognitive test backed by NHS clinical validation, a daily wellness log, and a progress graph you own.",
  },
  {
    counter: "03",
    label: "Why it matters",
    body: "See processing speed, sleep, stress and training line up on one screen. If it is working, the graph says so. If it is not, you know what to adjust.",
  },
];

export default function AppUSPSection() {
  return (
    <div className="w-full">
      {/* Trio header */}
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3 tabular-nums">
        {"// Proof, not promises · APP-01"}
      </p>
      <h2
        className="brand-h1 text-black"
        style={{ letterSpacing: "-0.02em" }}
      >
        Most brands claim results. We let you measure yours.
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mt-3 mb-8 lg:mb-12">
        Your score · Your data · Your proof
      </p>

      {/* Two-column content: copy card + cropped asset */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        {/* Copy card */}
        <div className="bg-white border border-black/12 flex flex-col">
          {ROWS.map((row, idx) => (
            <div
              key={row.counter}
              className={`px-5 py-5 lg:px-6 lg:py-6 ${
                idx < ROWS.length - 1 ? "border-b border-black/8" : ""
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 tabular-nums mb-2">
                {row.counter} · {row.label}
              </p>
              <p className="text-sm md:text-base text-black/75 leading-relaxed">
                {row.body}
              </p>
            </div>
          ))}
        </div>

        {/* Cropped phone asset inside hairline square frame */}
        <div className="relative aspect-square border border-black/12 bg-[#f5f5f5] overflow-hidden">
          <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-black/55 px-2 py-1 tabular-nums z-10">
            Fig. 01 · CONKA App
          </div>
          <Image
            src="/app/AppConkaRing.png"
            alt="CONKA companion app showing the cognitive score ring and daily tracking"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover object-[center_20%]"
            priority={false}
          />
          <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-black/55 px-2 py-1 tabular-nums z-10">
            iOS · Android
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 lg:mt-12">
        <ConkaCTAButton href="/app" meta="// track your own results">
          See the app
        </ConkaCTAButton>
      </div>
    </div>
  );
}
