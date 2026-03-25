import type { Metadata } from "next";
import FunnelClient from "./FunnelClient";

export const metadata: Metadata = {
  title: "Get Started | CONKA",
  description:
    "Choose your CONKA plan — Flow for morning energy, Clear for evening clarity, or Both for the complete daily system. Subscribe and save 20%.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FunnelPage() {
  return <FunnelClient />;
}
