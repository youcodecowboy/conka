"use client";

type LogoName = "klarna" | "revolut";
type LogoSize = "sm" | "md" | "lg";

interface PaymentLogosProps {
  logos?: LogoName[];
  size?: LogoSize;
  className?: string;
  showLabel?: boolean;
  vertical?: boolean;
}

const LOGO_CONTAINERS: Record<LogoSize, string> = {
  sm: "w-20 h-6", // 80px × 24px
  md: "w-24 h-7", // 96px × 28px
  lg: "w-28 h-8", // 112px × 32px
};

const DEFAULT_LOGOS: LogoName[] = ["klarna", "revolut"];

const LOGO_MAP: Record<LogoName, { src: string; alt: string }> = {
  klarna: {
    src: "/logos/Klarna.png",
    alt: "Pay with Klarna",
  },
  revolut: {
    src: "/logos/Revolut.png",
    alt: "Pay with Revolut",
  },
};

export default function PaymentLogos({
  logos = DEFAULT_LOGOS,
  size = "md",
  className = "",
  showLabel = false,
  vertical = false,
}: PaymentLogosProps) {
  const containerClass = LOGO_CONTAINERS[size];

  // Build container classes - outer wrapper
  const containerClasses = [
    vertical ? "flex flex-col items-center" : "flex items-center justify-end",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Build logo container classes - inner flex container
  const logoContainerClasses = vertical
    ? "flex flex-col items-center gap-1.5 opacity-60"
    : "flex items-center opacity-60 -space-x-4";

  return (
    <div className={containerClasses}>
      {showLabel && (
        <span className="font-clinical text-xs opacity-60 mr-1">We accept</span>
      )}
      <div className={logoContainerClasses}>
        {logos.map((logo) => {
          const logoData = LOGO_MAP[logo];
          // Type safety ensures this should never happen, but keep as safety check
          if (!logoData) {
            if (process.env.NODE_ENV === "development") {
              console.warn(`Payment logo "${logo}" not found in LOGO_MAP`);
            }
            return null;
          }

          return (
            <div
              key={logo}
              className={`${containerClass} flex items-center justify-center`}
            >
              <img
                src={logoData.src}
                alt={logoData.alt}
                className="w-full h-full object-contain object-center"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
