import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Store each quiz session (one per user taking the quiz)
  quizSessions: defineTable({
    // Anonymous session ID (generated client-side)
    sessionId: v.string(),
    // Optional user ID if logged in
    userId: v.optional(v.string()),
    // User agent and device info for analytics
    userAgent: v.optional(v.string()),
    // Referrer URL (how they got to the quiz)
    referrer: v.optional(v.string()),
    // Started timestamp
    startedAt: v.number(),
    // Completed timestamp (null if abandoned)
    completedAt: v.optional(v.number()),
    // Was the quiz completed?
    completed: v.boolean(),
    // Final recommended protocol (if completed)
    recommendedProtocol: v.optional(v.string()),
    // All protocol scores (if completed)
    protocolScores: v.optional(
      v.array(
        v.object({
          protocolId: v.string(),
          percentage: v.number(),
          totalPoints: v.number(),
        }),
      ),
    ),
  })
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_completed", ["completed"])
    .index("by_recommended", ["recommendedProtocol"]),

  // Store individual question answers for detailed analytics
  quizAnswers: defineTable({
    // Reference to the session
    sessionId: v.string(),
    // Question ID from quizData
    questionId: v.string(),
    // The question text (for easy querying)
    questionText: v.string(),
    // What the question measures
    measures: v.string(),
    // The selected answer value
    answerValue: v.string(),
    // The selected answer label (human readable)
    answerLabel: v.string(),
    // Time spent on this question (milliseconds)
    timeSpentMs: v.optional(v.number()),
    // Timestamp when answered
    answeredAt: v.number(),
    // Question order (1-indexed)
    questionNumber: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_question", ["questionId"])
    .index("by_answer", ["questionId", "answerValue"]),

  // Store contest entry submissions
  winEntries: defineTable({
    // Contest identifier (e.g., "nike-2026-01")
    contestId: v.string(),
    // Email address
    email: v.string(),
    // Timestamp when submitted
    submittedAt: v.number(),
    // Browser/device info for analytics
    userAgent: v.optional(v.string()),
    // Source URL for campaign tracking
    referrer: v.optional(v.string()),
  })
    .index("by_contest", ["contestId"])
    .index("by_email_contest", ["email", "contestId"])
    .index("by_referrer", ["referrer"]),
});
