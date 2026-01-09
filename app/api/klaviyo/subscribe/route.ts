import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/app/lib/env";

/**
 * Request body schema for list subscription
 */
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/**
 * POST /api/klaviyo/subscribe
 *
 * Subscribes an email to the Klaviyo master list (WBbMia).
 * Uses Profiles + Lists API to create/update profile and add to list.
 * This endpoint handles errors gracefully and always returns 200 OK
 * to ensure the user experience is never interrupted.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = subscribeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 200 }, // Return 200 even on validation error - graceful failure
      );
    }

    const { email } = validationResult.data;

    // Get Klaviyo private key
    const klaviyoPrivateKey = env.klaviyoPrivateKey;
    if (!klaviyoPrivateKey) {
      console.error("KLAVIYO_PRIVATE_KEY is not configured");
      // Return success: false but 200 OK - graceful failure
      return NextResponse.json({ success: false, reason: "Not configured" });
    }

    const listId = "WBbMia"; // Master list ID
    const normalizedEmail = email.toLowerCase().trim();

    // Step 1: Create or update profile using Profiles API
    const profilePayload = {
      data: {
        type: "profile",
        attributes: {
          email: normalizedEmail,
          properties: {
            source: "win_free_month",
          },
        },
      },
    };

    const profileResponse = await fetch(
      "https://a.klaviyo.com/api/profiles/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify(profilePayload),
      },
    );

    let profileId: string | null = null;

    if (profileResponse.ok) {
      try {
        const profileData = await profileResponse.json();
        // Extract profile ID from response
        profileId = profileData?.data?.id || null;
      } catch (parseError) {
        console.error("Failed to parse profile response:", parseError);
      }
    } else {
      const errorText = await profileResponse.text();
      console.error(
        `Klaviyo Profile API error: ${profileResponse.status} ${profileResponse.statusText}`,
        errorText,
      );
      // If profile creation fails, try to get profile by email
      // Klaviyo might have the profile already
    }

    // If we don't have a profile ID, try to get it by email lookup
    if (!profileId) {
      try {
        const lookupResponse = await fetch(
          `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${normalizedEmail}")`,
          {
            method: "GET",
            headers: {
              Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`,
              "Content-Type": "application/json",
              revision: "2024-10-15",
            },
          },
        );

        if (lookupResponse.ok) {
          const lookupData = await lookupResponse.json();
          profileId =
            lookupData?.data?.[0]?.id ||
            lookupData?.data?.id ||
            null;
        }
      } catch (lookupError) {
        console.error("Failed to lookup profile by email:", lookupError);
      }
    }

    // If we still don't have a profile ID, we can't add to list
    if (!profileId) {
      console.error(
        "Unable to get profile ID for email, cannot add to list",
      );
      // Return success: false but 200 OK - graceful failure
      return NextResponse.json({
        success: false,
        reason: "Profile ID not found",
      });
    }

    // Step 2: Add profile to list using Lists Relationships API
    const listPayload = {
      data: [
        {
          type: "profile",
          id: profileId, // Use the actual profile ID (UUID)
        },
      ],
    };

    const listResponse = await fetch(
      `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify(listPayload),
      },
    );

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error(
        `Klaviyo List API error: ${listResponse.status} ${listResponse.statusText}`,
        errorText,
      );
      // Return 200 OK even if Klaviyo fails - graceful failure
      return NextResponse.json({
        success: false,
        reason: "Klaviyo API error",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log error but return 200 OK - never break user flow
    console.error("Error subscribing to Klaviyo:", error);
    return NextResponse.json({
      success: false,
      reason: "Internal error",
    });
  }
}
