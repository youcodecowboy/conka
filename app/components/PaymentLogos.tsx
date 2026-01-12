"use client";

interface PaymentLogosProps {
  logos?: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
}

const LOGO_CONTAINERS = {
  sm: "w-20 h-6", // 80px × 24px (~25% increase from previous)
  md: "w-24 h-7", // 96px × 28px (~20% increase from previous)
  lg: "w-28 h-8", // 112px × 32px (~17% increase from previous)
};

const DEFAULT_LOGOS = ["klarna", "revolut"];

const LOGO_MAP: Record<string, { src: string; alt: string }> = {
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
}: PaymentLogosProps) {
  const containerClass = LOGO_CONTAINERS[size];

  return (
    <div className={`flex items-center justify-end ${className}`}>
      {showLabel && (
        <span className="font-clinical text-xs opacity-60 mr-1">We accept</span>
      )}
      <div className="flex items-center opacity-60">
        {logos.map((logo) => {
          const logoData = LOGO_MAP[logo.toLowerCase()];
          if (!logoData) return null;

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
