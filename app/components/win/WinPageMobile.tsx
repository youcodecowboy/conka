"use client";

import WinHero from "./WinHero";
import WinCountdown from "./WinCountdown";
import WinEmailForm from "./WinEmailForm";
import WinThankYou from "./WinThankYou";
import WinPrize from "./WinPrize";
import WinReassurance from "./WinReassurance";

interface WinPageMobileProps {
  contestId: string;
  deadline: string;
  emailSubmitted: boolean;
  submittedEmail: string | null;
  onSuccess: (email: string) => void;
}

export default function WinPageMobile({
  contestId,
  deadline,
  emailSubmitted,
  submittedEmail,
  onSuccess,
}: WinPageMobileProps) {
  return (
    <div className="min-h-screen pt-12">
      <WinCountdown deadline={deadline} />
      <WinHero />
      <WinPrize />

      {emailSubmitted ? (
        <>
          <WinThankYou email={submittedEmail || undefined} />
          <WinReassurance />
        </>
      ) : (
        <>
          <WinEmailForm contestId={contestId} onSuccess={onSuccess} />
          <WinReassurance />
        </>
      )}
    </div>
  );
}
