"use client";

import { useState, useEffect, useRef } from "react";

interface WinCountdownProps {
  deadline?: string;
}

export default function WinCountdown({ deadline }: WinCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Default to end of January 2026 if no deadline provided
    const defaultDeadline = deadline || "2026-01-31T23:59:59Z";
    const deadlineDate = new Date(defaultDeadline).getTime();

    const calculateTimeRemaining = () => {
      const now = Date.now();
      const difference = deadlineDate - now;

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [deadline]);

  if (!timeRemaining) {
    return (
      <div className="px-6 md:px-16 py-8 text-center">
        <p className="font-clinical text-sm opacity-60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        <div className="neo-box p-6 md:p-8 border-l-4 border-teal-500">
          <p className="font-commentary text-lg md:text-xl mb-4 text-center">
            Time remaining
          </p>
          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-8">
            <div className="text-center">
              <p className="font-clinical text-2xl sm:text-3xl md:text-4xl font-bold text-teal-500">
                {timeRemaining.days}
              </p>
              <p className="font-clinical text-xs opacity-60 mt-1">days</p>
            </div>
            <span className="font-clinical text-xl sm:text-2xl opacity-40">
              :
            </span>
            <div className="text-center">
              <p className="font-clinical text-2xl sm:text-3xl md:text-4xl font-bold text-teal-500">
                {timeRemaining.hours}
              </p>
              <p className="font-clinical text-xs opacity-60 mt-1">hours</p>
            </div>
            <span className="font-clinical text-xl sm:text-2xl opacity-40">
              :
            </span>
            <div className="text-center">
              <p className="font-clinical text-2xl sm:text-3xl md:text-4xl font-bold text-teal-500">
                {timeRemaining.minutes}
              </p>
              <p className="font-clinical text-xs opacity-60 mt-1">minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
