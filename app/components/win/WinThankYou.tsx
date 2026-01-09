"use client";

interface WinThankYouProps {
  email?: string;
}

export default function WinThankYou({ email }: WinThankYouProps) {
  return (
    <div className="px-4 md:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Confirmation */}
        <div className="neo-box p-8 md:p-12 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            You&apos;re in
          </h2>
          <p className="font-commentary text-xl mb-3">
            good luck — we&apos;ll be in touch soon
          </p>
          <p className="font-clinical text-xs opacity-70">
            entries close soon • winner contacted by email
          </p>
        </div>

        {/* Gentle continuation */}
        <div className="max-w-4xl space-y-6">
          <p className="font-commentary text-lg">while you&apos;re here</p>

          <p className="font-primary text-base md:text-lg opacity-90">
            Conka exists to help people think more clearly, decide faster, and
            perform better — using clinically grounded ingredients, not hype.
          </p>

          <p className="font-clinical text-sm opacity-70">
            If you&apos;re curious, our 2-minute quiz helps you understand which
            protocol fits your goals.
          </p>

          <a
            href="/quiz"
            className="neo-button px-8 py-4 font-bold text-lg flex items-center gap-3 justify-center w-fit"
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
            Find your protocol
          </a>
        </div>
      </div>
    </div>
  );
}
