/**
 * Cognitive Test Types
 *
 * TypeScript interfaces for the WebSDK cognitive test integration.
 */

/**
 * The current state of the cognitive test flow
 */
export type TestState = "idle" | "email" | "testing" | "results";

/**
 * Test results received from the WebSDK via postMessage
 */
export interface TestResult {
  /** Overall cognitive score (0-100) */
  score: number;
  /** Accuracy percentage (0-100) */
  accuracy: number;
  /** Speed percentage (0-100) */
  speed: number;
  /** Optional test instance identifier from the SDK */
  testInstanceId?: string;
}

/**
 * Email submission data from the capture modal
 */
export interface EmailSubmission {
  /** User's email address */
  email: string;
  /** Whether user consented to receive results */
  consentGiven: boolean;
  /** Timestamp of submission */
  submittedAt: Date;
}

/**
 * Props for the CognitiveTestSection component
 */
export interface CognitiveTestSectionProps {
  /** Optional class name for additional styling */
  className?: string;
}

/**
 * Props for the EmailCaptureForm component (inline form, not modal)
 */
export interface EmailCaptureFormProps {
  /** Callback when email is successfully submitted */
  onSubmit: (submission: EmailSubmission) => void;
  /** Callback to go back to idle state */
  onBack: () => void;
}

/**
 * Props for the CognicaSDK iframe wrapper component
 */
export interface CognicaSDKProps {
  /** Callback when test is completed with results */
  onComplete: (result: TestResult) => void;
  /** Optional subject ID for tracking (e.g., "website_1234567890") */
  subjectId?: string;
}
