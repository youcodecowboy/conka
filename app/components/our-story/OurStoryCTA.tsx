export function OurStoryCTA() {
  return (
    <div className="text-center">
      <p className="brand-body text-black/60 mb-4">
        ready to experience it yourself?
      </p>
      <h2 className="brand-h1-bold text-4xl lg:text-5xl xl:text-6xl mb-8 tracking-tight">
        Join the Journey
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/conka-flow"
          className="px-8 py-4 font-semibold text-lg text-white hover:opacity-90 transition-opacity"
          style={{
            borderRadius: "var(--brand-radius-interactive)",
            backgroundColor: "var(--brand-accent)",
          }}
        >
          Explore CONKA Flow
        </a>
        <a
          href="/conka-clarity"
          className="px-8 py-4 font-semibold text-lg border hover:opacity-80 transition-opacity"
          style={{
            borderRadius: "var(--brand-radius-interactive)",
            color: "var(--brand-accent)",
            borderColor: "rgba(64, 88, 187, 0.3)",
          }}
        >
          Explore CONKA Clarity
        </a>
      </div>
      <p className="brand-caption mt-8 text-black/60">
        100-day money-back guarantee &bull; Free UK shipping
      </p>
    </div>
  );
}

export default OurStoryCTA;
