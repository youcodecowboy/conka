"use client";

import WinHero from "./WinHero";
import WinCountdown from "./WinCountdown";
import WinEmailForm from "./WinEmailForm";
import WinThankYou from "./WinThankYou";
import WinPrize from "./WinPrize";
import WinReassurance from "./WinReassurance";

interface WinPageDesktopProps {
  contestId: string;
  deadline: string;
  emailSubmitted: boolean;
  submittedEmail: string | null;
  onSuccess: (email: string) => void;
}

export default function WinPageDesktop({
  contestId,
  deadline,
  emailSubmitted,
  submittedEmail,
  onSuccess,
}: WinPageDesktopProps) {
  return (
    <div className="min-h-screen pt-24">
      <WinCountdown deadline={deadline} />
      <WinHero />
      <WinPrize />

      {emailSubmitted ? (
        <WinThankYou email={submittedEmail || undefined} />
      ) : (
        <>
          <WinEmailForm contestId={contestId} onSuccess={onSuccess} />
          <WinReassurance />
        </>
      )}
    </div>
  );
}
