"use client";

import Navigation from "@/app/components/Navigation";

export default function AppPage() {
  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Discover How Your Brain Performs Today
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Take the CONKA Cognitive Test to identify strengths and weaknesses,
              then unlock personalised strategies to improve your score.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#"
                className="neo-button px-8 py-4 font-semibold text-base flex items-center gap-2"
              >
                App Store
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              <a
                href="#"
                className="neo-button-outline px-8 py-4 font-semibold text-base flex items-center gap-2"
              >
                Play Store
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section className="px-6 md:px-16 py-24 bg-[var(--foreground)]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-clinical text-xs uppercase tracking-widest opacity-70 mb-4">
              EVIDENCE - BACKED BRAIN OPTIMISATION
            </p>
            <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
              The CONKA app combines neuroscience-based testing with personalised
              recommendations. Clinical data supports a potential{" "}
              <span className="font-bold">16% improvement in cognitive performance</span>{" "}
              over 30 days when following the recommended brain optimisation plan.
            </p>
            <blockquote className="font-commentary text-xl md:text-2xl italic max-w-2xl mx-auto">
              &ldquo;Developed by neuroscientists and tested with professional athletes
              - your brain deserves the same precision and care.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            The App Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="neo-box p-6">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-500"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Personalised Performance Plan
              </h3>
              <p className="opacity-80">
                Personalised recommendations and actionable steps to boost your
                performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="neo-box p-6">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Instant Cognitive Insight
              </h3>
              <p className="opacity-80">
                Immediate insights into your brains processing speed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="neo-box p-6">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-500"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18 7l-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Measurable Progress Tracking
              </h3>
              <p className="opacity-80">
                Track progress over time and see measurable improvement - up to 16%
                in just 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Features List Section */}
      <section className="px-6 md:px-16 py-24 bg-[var(--foreground)]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            The App Features
          </h2>
          <div className="space-y-6">
            {/* FDA Cleared */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">FDA CLEARED</h3>
              <p className="opacity-80">
                You can&apos;t learn it or game it, the only way to get better is to
                improve your brain power
              </p>
            </div>

            {/* Seamless Formula */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">SEAMLESS FORMULA</h3>
              <p className="opacity-80">
                Integration with CONKA brain shots to maximise improvement.
              </p>
            </div>

            {/* Measurable Proof */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">MEASURABLE PROOF</h3>
              <p className="opacity-80">
                Track daily progress and see measurable gain, the only brain
                supplement you can measure working.
              </p>
            </div>

            {/* Habit Building */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">HABIT BUILDING</h3>
              <p className="opacity-80">
                Science-backed strategies and nudges to keep you accountable.
              </p>
            </div>

            {/* Compare with the Best */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">COMPARE WITH THE BEST</h3>
              <p className="opacity-80">
                Keep competitive, see how you stack up against some of the fastest
                brains in the world from footballers to F1 drivers by posting your
                score into the Global leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why our App has the best functionality
          </h2>
          <div className="neo-box p-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-current">
                  <th className="text-left p-4 font-bold">Feature</th>
                  <th className="text-left p-4 font-bold">Us</th>
                  <th className="text-left p-4 font-bold">Them</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Purpose</td>
                  <td className="p-4">
                    Measures and trains your brain for real performance improvement
                  </td>
                  <td className="p-4">
                    Tracks general wellness or gives broad lifestyle advice
                  </td>
                </tr>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Measurement</td>
                  <td className="p-4">
                    Objective cognitive data that shows when you&apos;re actually
                    underperforming
                  </td>
                  <td className="p-4">
                    Relies on how you feel or surface-level metrics
                  </td>
                </tr>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Focus</td>
                  <td className="p-4">
                    Brain-first. The organ that drives everything
                  </td>
                  <td className="p-4">
                    Mostly heart rate, steps, sleep or mood tracking
                  </td>
                </tr>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Scientific Backing</td>
                  <td className="p-4">
                    FDA cleared medical device with clinical grounding
                  </td>
                  <td className="p-4">
                    Often unverified or loosely science-informed
                  </td>
                </tr>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Testing Method</td>
                  <td className="p-4">
                    Uses visual tests (animals) to avoid learning, language or
                    education bias
                  </td>
                  <td className="p-4">
                    Many tests are affected by prior knowledge or IQ factors
                  </td>
                </tr>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Progress Over Time</td>
                  <td className="p-4">
                    Shows measurable cognitive improvement without learning effects
                  </td>
                  <td className="p-4">
                    Score increases are often just familiarity with the test
                  </td>
                </tr>
                <tr className="border-b border-current/20">
                  <td className="p-4 font-semibold">Guidance</td>
                  <td className="p-4">
                    Pairs data with the CONKA formula to actively improve
                    performance
                  </td>
                  <td className="p-4">
                    Gives numbers with little direction or actionable change
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Motivation</td>
                  <td className="p-4">
                    Keeps you competitive by benchmarking against pro athletes
                  </td>
                  <td className="p-4">
                    No high-performance comparison or motivational challenge
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t-2 border-current/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Side */}
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="flex items-center hover:opacity-70 transition-all"
              >
                <img src="/conka.png" alt="CONKA logo" className="h-6 w-auto" />
              </a>
              <nav className="flex flex-wrap items-center gap-2">
                <a
                  href="/"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Home
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/science"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  The Science
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/ingredients"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Ingredients
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/case-studies"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Results
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/our-story"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Our Story
                </a>
              </nav>
              <p className="font-commentary text-xs opacity-60">
                built with love ♥
              </p>
            </div>

            {/* Right Side - CTAs */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="flex gap-3">
                <a
                  href="/quiz"
                  className="neo-button-outline px-5 py-2 font-semibold text-sm flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Find Your Protocol
                </a>
                <a
                  href="#protocols"
                  className="neo-button px-5 py-2 font-semibold text-sm flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Buy CONKA
                </a>
              </div>
              <p className="font-clinical text-xs opacity-50">
                100-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
