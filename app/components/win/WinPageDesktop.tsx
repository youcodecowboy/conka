"use client";

import {
  WinHero,
  WinCountdown,
  WinEmailForm,
  WinThankYou,
  WinPrize,
  WinReassurance,
} from "./index";

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
