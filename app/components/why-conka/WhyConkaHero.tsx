"use client";

export function WhyConkaHero() {
  return (
    <section className="bg-white text-black px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          Why CONKA?
        </h1>

        {/* Subtitle */}
        <p className="font-commentary text-xl md:text-2xl mb-6 opacity-70 max-w-2xl">
          CONKA could change your life. Here&apos;s why.
        </p>

        {/* Introduction */}
        <p className="text-base md:text-lg opacity-80 mb-8 max-w-3xl leading-relaxed">
          Here are the top seven reasons why so many smart people are choosing
          CONKA&apos;s research-backed cognitive enhancement.
        </p>

        {/* Scroll Indicator */}
        <div className="flex items-center gap-3 opacity-50">
          <p className="font-commentary text-base md:text-lg">
            scroll to discover why
          </p>
          <div className="animate-bounce-slow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyConkaHero;
