"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import SciencePageContent from "@/app/components/science/SciencePageContent";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function SciencePage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <SciencePageContent isMobile={!!isMobile} />
          <Footer />
        </>
      )}
    </div>
  );
}
