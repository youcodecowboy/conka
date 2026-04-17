export function OurStoryHero() {
  return (
    <div className="flex flex-col gap-5 lg:gap-6 max-w-3xl">
      <header>
        <p className="brand-caption uppercase tracking-widest text-black mb-3">
          Our Story
        </p>
        <h1 className="brand-h1-bold text-4xl lg:text-6xl xl:text-7xl mb-4 tracking-tight">
          A concussion changed everything
        </h1>
        <p
          className="brand-body text-lg lg:text-xl text-black mb-2"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          Humphrey and Harry met as university teammates. One played professional
          rugby for his country. The other had his career cut short by a brain
          injury. What started as a personal recovery became a five-year research
          mission with Durham and Cambridge universities.
        </p>
        <p
          className="brand-body text-base lg:text-lg text-black"
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
