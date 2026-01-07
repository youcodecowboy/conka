/**
 * Cognitive Test Components
 *
 * Components for the WebSDK cognitive test integration on the science page.
 */

// Types
export type {
  TestState,
  TestResult,
  EmailSubmission,
  CognitiveTestSectionProps,
  EmailCaptureFormProps,
} from "./types";

// Components
export { default as CognitiveTestSection } from "./CognitiveTestSection";
export { default as EmailCaptureForm } from "./EmailCaptureForm";
