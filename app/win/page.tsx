"use client";

import { useState } from "react";
import Navigation from "@/app/components/Navigation";
import {
  WinHero,
  WinCountdown,
  WinPercentage,
  WinEmailForm,
  WinThankYou,
} from "@/app/components/win";

const CONTEST_ID = process.env.NEXT_PUBLIC_WIN_CONTEST_ID || "nike-2026-01";
const DEADLINE =
  process.env.NEXT_PUBLIC_WIN_DEADLINE || "2026-01-31T23:59:59Z";

export default function WinPage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSuccess = (email: string) => {
    setSubmittedEmail(email);
    setEmailSubmitted(true);
  };

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <main className="pt-4 pb-24 lg:pt-24">
        <WinHero />
        <WinCountdown deadline={DEADLINE} />
        <WinPercentage contestId={CONTEST_ID} />

        {emailSubmitted ? (
          <WinThankYou email={submittedEmail || undefined} />
        ) : (
          <WinEmailForm contestId={CONTEST_ID} onSuccess={handleSuccess} />
        )}
      </main>
    </div>
  );
}
