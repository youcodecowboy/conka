'use client';

import { useState } from 'react';

const PAUSE_OPTIONS = [
  { weeks: 1, label: '1 week' },
  { weeks: 2, label: '2 weeks' },
  { weeks: 4, label: '1 month' },
  { weeks: 8, label: '2 months' },
  { weeks: 12, label: '3 months' },
] as const;

const MAX_WEEKS = 12;

interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPause: (weeks: number) => Promise<boolean>;
  subscriptionName: string;
}

export function PauseModal({
  isOpen,
  onClose,
  onPause,
  subscriptionName,
}: PauseModalProps) {
  const [selectedWeeks, setSelectedWeeks] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (selectedWeeks == null) return;
    setLoading(true);
    setError(null);

    try {
      const success = await onPause(selectedWeeks);
      if (success) {
        handleClose();
      } else {
        setError('Unable to pause your subscription right now. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedWeeks(null);
    setError(null);
    onClose();
  };

  const resumeDate = selectedWeeks
    ? new Date(Date.now() + selectedWeeks * 7 * 24 * 60 * 60 * 1000)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Pause Subscription</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">{subscriptionName}</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <p className="text-gray-600 mb-4">
            How long would you like to pause? Your subscription will automatically resume after the selected period.
          </p>

          <div className="space-y-2">
            {PAUSE_OPTIONS.map((option) => (
              <label
                key={option.weeks}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedWeeks === option.weeks
                    ? 'border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-light)]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="pause-duration"
                    value={option.weeks}
                    checked={selectedWeeks === option.weeks}
                    onChange={() => setSelectedWeeks(option.weeks)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedWeeks === option.weeks
                      ? 'border-[var(--color-neuro-blue-dark)]'
                      : 'border-gray-300'
                  }`}>
                    {selectedWeeks === option.weeks && (
                      <div className="w-2 h-2 rounded-full bg-[var(--color-neuro-blue-dark)]" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
                {option.weeks === MAX_WEEKS && (
                  <span className="text-xs text-gray-400">Maximum</span>
                )}
              </label>
            ))}
          </div>

          {selectedWeeks != null && resumeDate && (
            <div className="mt-4 p-3 bg-[var(--color-neuro-blue-light)]/30 border border-[var(--color-neuro-blue-light)] rounded-lg">
              <p className="text-sm text-gray-700">
                Your deliveries will resume around{' '}
                <span className="font-semibold">
                  {resumeDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                . You can resume earlier at any time.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Keep Active
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedWeeks == null || loading}
              className="flex-1 py-3 bg-[var(--color-neuro-blue-dark)] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Pausing...
                </span>
              ) : (
                'Pause Subscription'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
