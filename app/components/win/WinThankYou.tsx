"use client";

interface WinThankYouProps {
  email?: string;
}

export default function WinThankYou({ email }: WinThankYouProps) {
  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="neo-box p-8 md:p-12 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Thanks for entering!
          </h2>
          <p className="font-commentary text-lg md:text-xl mb-2 opacity-90">
            Check your email for confirmation
          </p>
          {email && (
            <p className="font-clinical text-sm opacity-60 mt-2">
              Confirmation sent to {email}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <p className="font-commentary text-lg text-center opacity-80">
            Want to learn more?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/our-story"
              className="neo-button-outline px-6 py-3 font-semibold text-sm flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Learn Our Story
            </a>

            <a
              href="/science"
              className="neo-button-outline px-6 py-3 font-semibold text-sm flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Explore The Science
            </a>

            <a
              href="/ingredients"
              className="neo-button-outline px-6 py-3 font-semibold text-sm flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              See What&apos;s Inside
            </a>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="/quiz"
              className="neo-button px-8 py-4 font-bold text-lg flex items-center gap-3"
            >
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Find Your Protocol
              <span className="px-2 py-0.5 bg-green-500 text-white font-clinical text-xs font-bold rounded-full">
                RECOMMENDED
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
