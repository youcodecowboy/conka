"use client";

interface WinThankYouProps {
  email?: string;
}

export default function WinThankYou({ email }: WinThankYouProps) {
  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="neo-box p-8 md:p-12 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            You&apos;re in
          </h2>
          <p className="font-commentary text-xl text-center mb-3">
            good luck — we&apos;ll be in touch soon
          </p>
          <p className="font-clinical text-xs opacity-70 text-center">
            entries close soon • winner contacted by email
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="font-clinical text-xs opacity-80 mb-3">
              Take our 2-minute quiz to find your perfect match. Worth £40.
            </p>
            <a
              href="/quiz"
              className="neo-button px-8 py-4 font-bold text-lg flex items-center gap-3 justify-center mx-auto"
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
