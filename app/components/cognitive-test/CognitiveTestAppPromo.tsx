"use client";

/**
 * CognitiveTestAppPromo - CONKA app promotion section
 *
 * Promotes the full CONKA app experience with benefits list
 * and download information.
 */
export default function CognitiveTestAppPromo() {
  return (
    <div className="neo-box p-4 lg:p-6 bg-current/5">
      <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-3">
        Get the Full Experience
      </p>
      <p className="text-sm opacity-70 mb-4">
        This was a 30-second snapshot. The full Speed of Processing game in the
        CONKA app gives you detailed insights and tracks how your performance
        changes with lifestyle factors.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-xs opacity-70">Full validated test</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-xs opacity-70">
            Sleep &amp; exercise tracking
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-xs opacity-70">Personalized insights</span>
        </div>
      </div>
      {/* App Store Links */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
        <a
          href="https://apps.apple.com/gb/app/conka-app/id6450399391"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.conka.conkaApp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
          </svg>
          Google Play
        </a>
      </div>
    </div>
  );
}
