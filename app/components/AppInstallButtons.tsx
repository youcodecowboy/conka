"use client";

interface AppInstallButtonsProps {
  className?: string;
  buttonClassName?: string;
  iconSize?: number;
  inverted?: boolean;
}

const APP_STORE_URL = "https://apps.apple.com/gb/app/conka-app/id6450399391";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.conka.conkaApp&hl=en_GB";

// Official App Store icon (Apple logo)
const AppStoreIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.56.15 2.92.93 3.86 2.26-3.23 1.94-2.7 5.99.51 7.31-.02 1.99.45 4.05-1.01 5.65zm-3.95-18.4c.15-1.9 1.73-3.38 3.74-3.57.3 2.37-1.95 4.4-3.74 3.57z" />
  </svg>
);

// Official Google Play Store icon (triangle play button)
const PlayStoreIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm-1.64-4.03L6.05 2.66l10.72 6.43-2.6 2.6zM6.05 2.66l10.72 6.43L6.05 21.34V2.66z" />
  </svg>
);

export function AppInstallButtons({
  className = "",
  buttonClassName = "",
  iconSize = 20,
  inverted = false,
}: AppInstallButtonsProps) {
  const buttonBaseClass = inverted
    ? "bg-white text-black border-2 border-white hover:opacity-90"
    : "neo-button";

  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} px-8 py-4 font-semibold text-base flex items-center gap-2 rounded-full transition-all ${buttonClassName}`}
      >
        App Store
        <AppStoreIcon size={iconSize} />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} px-8 py-4 font-semibold text-base flex items-center gap-2 rounded-full transition-all ${buttonClassName}`}
      >
        Play Store
        <PlayStoreIcon size={iconSize} />
      </a>
    </div>
  );
}

export default AppInstallButtons;
