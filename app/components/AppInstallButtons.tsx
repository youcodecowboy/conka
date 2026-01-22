"use client";

interface AppInstallButtonsProps {
  className?: string;
  buttonClassName?: string;
  iconSize?: number;
  inverted?: boolean;
}

const APP_STORE_URL = "https://apps.apple.com/gb/app/conka-app/id6450399391";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.conka.conkaApp&hl=en_GB";

export function AppInstallButtons({
  className = "",
  buttonClassName = "",
  iconSize = 20,
  inverted = false,
}: AppInstallButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${inverted ? "neo-button-outline" : "neo-button"} px-8 py-4 font-semibold text-base flex items-center gap-2 ${buttonClassName}`}
      >
        App Store
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
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
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${inverted ? "neo-button" : "neo-button-outline"} px-8 py-4 font-semibold text-base flex items-center gap-2 ${buttonClassName}`}
      >
        Play Store
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
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
  );
}

export default AppInstallButtons;
