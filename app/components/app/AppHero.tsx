"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import { AppHeroDesktop } from "./AppHeroDesktop";
import { AppHeroMobile } from "./AppHeroMobile";

export function AppHero() {
  const isMobile = useIsMobile(1024);

  return (
    <>
      <style jsx global>{`
        @keyframes floatPhone {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes heroMount {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <style jsx>{`
        .hero-mount-left {
          animation: heroMount 0.7s ease-out forwards;
          opacity: 0;
        }
        .hero-mount-right {
          animation: heroMount 0.7s ease-out 0.12s forwards;
          opacity: 0;
        }
      `}</style>
      {isMobile === undefined ? (
        <section
          className="flex min-h-[100svh] w-full items-center justify-center px-[var(--premium-gutter-mobile)] py-12"
          style={{ background: "var(--color-ink)" }}
        >
          <div className="h-12 w-48 animate-pulse rounded bg-white/10" />
        </section>
      ) : isMobile ? (
        <AppHeroMobile />
      ) : (
        <AppHeroDesktop />
      )}
    </>
  );
}

export default AppHero;
