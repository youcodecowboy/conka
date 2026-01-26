import { NextRequest, NextResponse } from "next/server";

/**
 * Vercel Analytics Drain Endpoint
 * 
 * Receives raw analytics events from Vercel Analytics Drains.
 * This allows you to see individual events with all properties.
 * 
 * To set up:
 * 1. Deploy this endpoint
 * 2. Go to Vercel Dashboard → Project Settings → Analytics → Web Analytics Drains
 * 3. Add drain URL: https://your-domain.com/api/analytics/drain
 * 4. Events will be sent here automatically
 * 
 * In development, events are logged to console.
 * In production, you can save to database, send to logging service, etc.
 */

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();
    
    // Events can be a single event or an array
    const eventArray = Array.isArray(events) ? events : [events];
    
    // Log each event (development)
    if (process.env.NODE_ENV === "development") {
      console.log("\n📊 === VERCEL ANALYTICS DRAIN EVENT ===\n");
      eventArray.forEach((event, index) => {
        console.log(`Event ${index + 1}:`, JSON.stringify(event, null, 2));
      });
      console.log("\n========================================\n");
    }
    
    // In production, you could:
    // - Save to database
    // - Send to logging service (Logtail, Axiom, etc.)
    // - Send to data warehouse
    // - Store in file system
    
    // Example: Save to database (uncomment and configure)
    // await saveEventsToDatabase(eventArray);
    
    // Example: Send to external service
    // await sendToLoggingService(eventArray);
    
    return NextResponse.json({ 
      received: true, 
      eventCount: eventArray.length 
    });
  } catch (error) {
    console.error("Analytics drain error:", error);
    return NextResponse.json(
      { error: "Failed to process events" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to verify drain is working
export async function GET() {
  return NextResponse.json({
    status: "active",
    message: "Vercel Analytics Drain endpoint is ready",
    instructions: "Configure this URL in Vercel Dashboard → Analytics → Web Analytics Drains",
  });
}
