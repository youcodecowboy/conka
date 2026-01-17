"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import FormulasShowcaseMobile from "./FormulasShowcaseMobile";
import FormulasShowcaseDesktop from "./FormulasShowcaseDesktop";

export default function FormulasShowcase() {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return <FormulasShowcaseMobile />;
  }

  return <FormulasShowcaseDesktop />;
}
