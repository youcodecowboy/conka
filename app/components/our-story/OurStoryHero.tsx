export function OurStoryHero() {
  return (
    <div className="flex flex-col gap-5 lg:gap-6 max-w-3xl">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
          Our Story · Founders · Research · Mission
        </p>
        <h1
          className="brand-h1 text-black mb-3"
          style={{ letterSpacing: "-0.02em" }}
        >
          A concussion changed everything
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-6">
          £500,000 Research · Durham & Cambridge · Patented formula
        </p>
        <p
          className="brand-body text-lg lg:text-xl text-black mb-4"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          Humphrey and Harry met as university teammates. One played professional
          rugby for his country. The other had his career cut short by a brain
          injury. What started as a personal recovery became a five-year research
          mission with Durham and Cambridge universities.
        </p>
        <p
          className="brand-body text-base lg:text-lg text-black/75"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          This is how two athletes built a patented nootropic formula, invested
          over £500,000 in clinical research, and created something that actually
          works.
        </p>
      </header>
    </div>
  );
}

export default OurStoryHero;
