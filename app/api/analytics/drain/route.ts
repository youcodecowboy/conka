import { NextRequest, NextResponse } from "next/server";

/**
 * Vercel Analytics Drain Endpoint
 * 
 * ⚠️ OPTIONAL - Only needed if you want to export/store events elsewhere
 * 
 * What this does:
 * - Receives raw events from Vercel Analytics (if drain is configured)
 * - Currently just logs events (harmless if not configured)
 * 
 * What you DON'T need this for:
 * - ✅ Viewing events in Vercel Dashboard (works without drain)
 * - ✅ Viewing events in Triple Whale (uses TriplePixel, not drain)
 * 
 * What you DO need this for:
 * - Exporting events to data warehouses (BigQuery, Snowflake)
 * - Sending to logging services (Axiom, Logtail, Better Stack)
 * - Building custom analytics dashboards
 * - Storing raw events in your own database
 * 
 * Current status: Logs events only. No storage configured.
 * This is fine - you can view analytics in Vercel Dashboard without this.
 * 
 * To enable: Configure drain URL in Vercel Dashboard → Analytics → Drains
 */

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();
    
    // Events can be a single event or an array
    const eventArray = Array.isArray(events) ? events : [events];
    
    // Log events for debugging (harmless if drain not configured)
    // In production, these logs appear in Vercel Dashboard → Logs
    console.log(`[ANALYTICS DRAIN] Received ${eventArray.length} event(s)`);
    eventArray.forEach((event, index) => {
      console.log(`[ANALYTICS DRAIN] Event ${index + 1}:`, JSON.stringify(event, null, 2));
    });
    
    // NOTE: Currently just logging. To actually use these events:
    // 
    // Option 1: Send to logging service (Axiom, Logtail, Better Stack)
    //   - Best for: Queryable event logs, debugging, monitoring
    //   - Cost: ~$20-100/month depending on volume
    //
    // Option 2: Send to data warehouse (BigQuery, Snowflake)
    //   - Best for: Advanced SQL analysis, joining with other data
    //   - Cost: Pay per query/storage
    //
    // Option 3: Store in your own database
    //   - Best for: Full control, custom queries
    //   - Cost: Database hosting costs
    //
    // For most DTC stores: Vercel Dashboard + Triple Whale is enough.
    // Only add storage if you need custom analysis beyond what dashboards provide.
    
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
