"use client";

export function OurStoryHero() {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-white text-black px-6 md:px-16 py-8 md:py-12 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
          Our Story
        </h1>
        
        {/* Subtitle */}
        <p className="font-commentary text-xl md:text-2xl mb-2 opacity-70">
          the journey behind the formula
        </p>

        {/* Founders Tagline */}
        <p className="text-base md:text-lg opacity-60 mb-8 md:mb-10 max-w-xl">
          Two founders on a mission to build a better brain.
        </p>

        {/* Hero Stats - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Stat 1: Patented Formula */}
          <div className="neo-box p-5 md:p-6">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div className="font-clinical text-xs uppercase tracking-widest opacity-50">
                Unique
              </div>
            </div>
            <div className="text-xl md:text-2xl font-bold mb-1">
              Patented Nootropic Formula
            </div>
            <div className="font-clinical text-sm opacity-50">
              #GB2620279
            </div>
          </div>

          {/* Stat 2: Research Investment */}
          <div className="neo-box p-5 md:p-6">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              <div className="font-clinical text-xs uppercase tracking-widest opacity-50">
                Research
              </div>
            </div>
            <div className="font-clinical text-3xl md:text-4xl font-bold mb-1">
              £500K+
            </div>
            <div className="font-clinical text-sm opacity-50">
              Durham & Cambridge
            </div>
          </div>

          {/* Stat 3: Clinical Trials */}
          <div className="neo-box p-5 md:p-6">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <div className="font-clinical text-xs uppercase tracking-widest opacity-50">
                Validated
              </div>
            </div>
            <div className="font-clinical text-3xl md:text-4xl font-bold mb-1">
              25+
            </div>
            <div className="font-clinical text-sm opacity-50">
              Clinical trials with elite teams
            </div>
          </div>
        </div>

        {/* Key Stats Row - All on one line with icons */}
        <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-6 md:mb-8">
          {/* Cognitive Speed Men */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span className="font-clinical text-xl md:text-2xl font-bold">+22%</span>
            <span className="font-clinical text-xs md:text-sm opacity-50">cognitive speed (men)</span>
          </div>

          {/* Cognitive Speed Women */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span className="font-clinical text-xl md:text-2xl font-bold">+33%</span>
            <span className="font-clinical text-xs md:text-sm opacity-50">cognitive speed (women)</span>
          </div>

          {/* Prototypes */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            <span className="font-clinical text-xl md:text-2xl font-bold">100+</span>
            <span className="font-clinical text-xs md:text-sm opacity-50">prototypes</span>
          </div>

          {/* Lifespan Extended */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="font-clinical text-xl md:text-2xl font-bold">+15</span>
            <span className="font-clinical text-xs md:text-sm opacity-50">years lifespan*</span>
          </div>
        </div>

        {/* Story Preview - Additional highlights */}
        <div className="border-t-2 border-black/10 pt-6 md:pt-8 mb-6 md:mb-8">
          <p className="font-clinical text-xs uppercase tracking-widest opacity-40 mb-4">
            What you&apos;ll discover
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex items-start gap-3">
              <span className="font-clinical text-lg font-bold opacity-30">01</span>
              <p className="text-sm opacity-70">How a concussion injury sparked an 8-month research journey</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-clinical text-lg font-bold opacity-30">02</span>
              <p className="text-sm opacity-70">The science behind extending lifespan by 15 years</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-clinical text-lg font-bold opacity-30">03</span>
              <p className="text-sm opacity-70">Why we invented an alcohol-free extraction method</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-clinical text-lg font-bold opacity-30">04</span>
              <p className="text-sm opacity-70">Tested by 12+ elite sports teams worldwide</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Push to bottom */}
        <div className="mt-auto flex items-center gap-3 opacity-50">
          <p className="font-commentary text-base md:text-lg">
            scroll to read the full story
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

export default OurStoryHero;

