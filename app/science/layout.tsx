import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science | CONKA",
  description:
    "32 peer-reviewed studies. 6,000+ participants. Every ingredient in CONKA is clinically dosed and backed by research from Durham and Cambridge universities.",
  openGraph: {
    title: "The Science | CONKA",
    description:
      "32 peer-reviewed studies. 6,000+ participants. Every ingredient in CONKA is clinically dosed and backed by research from Durham and Cambridge universities.",
  },
};

export default function ScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
