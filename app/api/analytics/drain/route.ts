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
    
    // Log events (both development and production)
    // In production, these logs appear in Vercel Dashboard → Logs
    console.log(`[ANALYTICS DRAIN] Received ${eventArray.length} event(s)`);
    eventArray.forEach((event, index) => {
      console.log(`[ANALYTICS DRAIN] Event ${index + 1}:`, JSON.stringify(event));
    });
    
    // TODO: Add storage solution for querying/analysis
    // Options:
    // - Send to logging service (Axiom, Logtail, Better Stack)
    // - Save to database (Convex, PostgreSQL)
    // - Send to data warehouse (BigQuery, Snowflake)
    
    // Example: Save to Convex (you already use Convex for quiz data)
    // await saveEventsToConvex(eventArray);
    
    // Example: Send to external logging service
    // await sendToLoggingService(eventArray);
    
    // Return 200 with explicit status to avoid redirects
    return NextResponse.json(
      { 
        received: true, 
        eventCount: eventArray.length 
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
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
