/**
 * Klaviyo Integration Utilities
 *
 * Client-side utility functions for tracking events to Klaviyo.
 */

/**
 * Tracks a cognitive test completion event to Klaviyo.
 * This is a fire-and-forget operation that never throws errors.
 *
 * @param email - User's email address
 * @param score - Overall cognitive score (0-100)
 * @param accuracy - Accuracy percentage (0-100)
 * @param speed - Speed percentage (0-100)
 */
export async function trackCognitiveTest(
  email: string,
  score: number,
  accuracy: number,
  speed: number,
): Promise<void> {
  try {
    const response = await fetch("/api/klaviyo/track-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        score,
        accuracy,
        speed,
      }),
    });

    if (!response.ok) {
      // Log error but don't throw - graceful failure
      console.error(
        `Klaviyo tracking failed: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    // Silently fail - never interrupt user experience
    console.error("Failed to track cognitive test to Klaviyo:", error);
  }
}
