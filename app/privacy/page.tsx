import type { Metadata } from "next";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CONKA",
  description:
    "How CONKA collects, uses, and protects your personal data when you use our website and purchase our products.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navigation />

      <main className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm opacity-70">Last updated [DATE]</p>
          </div>

          <div className="space-y-8 text-base leading-relaxed">
            {/* TODO: Legal content to be added. See docs/development/featurePlans/legal-pages.md for requirements. */}
            <p className="opacity-60">
              This page is under construction. Full privacy policy will be available shortly.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
