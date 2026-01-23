# Viewing Vercel Analytics Data

**Purpose:** Guide to effectively view and analyze your Vercel Analytics data, including raw event properties.

---

## Understanding Vercel Analytics Dashboard

### What the Dashboard Shows

The Vercel Analytics dashboard shows **aggregated data**, not raw individual events. This means:

- ✅ Event counts over time
- ✅ Breakdowns by property (e.g., "quiz:started by source")
- ✅ Charts and trends
- ❌ Individual event records with all 8 properties (not available in UI)

### How to Access

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Analytics** tab
4. Click **Events** in the sidebar

---

## Method 1: Dashboard Filtering (Quick Analysis)

### How Filtering Works

1. **Click any row** in a data panel to filter all panels
2. All charts update to show filtered data
3. You can filter by:
   - Routes/Pages
   - Referrers
   - UTM Parameters (Plus plan)
   - Country
   - Browser/Device
   - Custom Events

### Example: Analyze Quiz Completion by Source

1. Go to Analytics → Events
2. Click `quiz:completed` event
3. Look at the property breakdown (if available)
4. Click on a specific `source` value (e.g., "homepage")
5. All panels update to show data for that source only

### Limitations

- Can't see individual event instances
- Can't export raw data directly
- Property breakdowns may be limited

---

## Method 2: Web Analytics Drains (Raw Data Access)

**This is the official way to get raw event data with all properties.**

### What Are Drains?

Web Analytics Drains send complete event data to an external endpoint (webhook). Each event includes:
- Event name
- All custom properties (all 8 properties)
- Timestamp
- User/device info
- URL, referrer, UTM params
- Geographic data
- Browser/OS details

### Setting Up a Drain

#### Option A: Simple Logging Endpoint (Development/Testing)

Create an API route to log events:

**File:** `app/api/analytics/drain/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();
    
    // Log to console (for development)
    console.log("📊 Analytics Drain Event:", JSON.stringify(events, null, 2));
    
    // Or save to file/database
    // await saveToDatabase(events);
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Drain error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

Then configure in Vercel Dashboard:
1. Go to Project Settings → Analytics
2. Scroll to "Web Analytics Drains"
3. Add drain endpoint: `https://your-domain.com/api/analytics/drain`
4. Save

#### Option B: External Service (Production)

Use services like:
- **Logtail** - Log aggregation
- **Axiom** - Analytics platform
- **PostHog** - Product analytics
- **Custom webhook** - Your own endpoint

### Drain Event Format

Each event in the drain looks like:

```json
{
  "event": "quiz:started",
  "properties": {
    "source": "homepage",
    "referrer": "https://conka.io/",
    "sessionId": "quiz_1234567890_abc123",
    "timestamp": 1706035200000,
    "userAgent": "Mozilla/5.0...",
    "utm_source": "google",
    "utm_medium": "cpc"
  },
  "timestamp": "2025-01-23T12:00:00Z",
  "url": "https://conka.io/quiz",
  "referrer": "https://conka.io/",
  "country": "US",
  "browser": "Chrome",
  "device": "desktop",
  "os": "macOS"
}
```

---

## Method 3: Enhanced Console Logging (Development)

**Already implemented!** When running locally (`npm run dev`), events are logged to the browser console.

### How to Use

1. Start dev server: `npm run dev`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Complete the quiz
5. See events like:

```
📊 Analytics Event: quiz:started {
  source: "homepage",
  referrer: "http://localhost:3000/",
  sessionId: "quiz_1234567890_abc123",
  timestamp: 1706035200000,
  ...
}
```

### Viewing All Properties

Each log shows all 8 properties for that event. You can:
- Copy the JSON
- Expand objects in console
- Filter console by "Analytics Event"

---

## Method 4: Vercel Analytics API (If Available)

Some plans may have API access. Check:
- Vercel Dashboard → Project Settings → Analytics
- Look for "API" or "Export" options
- May require Enterprise plan

---

## Recommended Setup for Your Use Case

### For Development/Testing

**Use Method 3 (Console Logging)** - Already set up!
- ✅ See events in real-time
- ✅ See all properties
- ✅ No additional setup needed
- ✅ Works on preview deployments too

### For Production Analysis

**Use Method 2 (Web Analytics Drains)** - Set up a drain endpoint

**Quick Setup:**
1. Create `app/api/analytics/drain/route.ts` (see example above)
2. Deploy to production
3. Configure drain in Vercel Dashboard
4. Events will be sent to your endpoint
5. Log/store them for analysis

**Better Setup:**
- Use a logging service (Logtail, Axiom)
- Or send to your database
- Build custom dashboards

### For Quick Dashboard Checks

**Use Method 1 (Dashboard Filtering)**
- Good for high-level trends
- Quick property breakdowns
- Not for detailed analysis

---

## Best Practices

### 1. Use Consistent Event Names

✅ Good: `quiz:started`, `quiz:completed`
❌ Bad: `quiz_started`, `Quiz Started`, `quizStarted`

### 2. Use Descriptive Property Names

✅ Good: `recommendedProtocol`, `timeSpentSeconds`
❌ Bad: `protocol`, `time`

### 3. Filter by Session ID

When analyzing, filter by `sessionId` to see complete user journeys:
- Find a `sessionId` in events
- Filter all events by that `sessionId`
- See the complete quiz → results → purchase flow

### 4. Group by Key Properties

In dashboard:
- Group `quiz:completed` by `recommendedProtocol` → See which protocols are most common
- Group `quiz:started` by `source` → See entry points
- Group `quiz:result_cta_clicked` by `ctaType` → See which CTAs work

---

## Troubleshooting

### Events Not Showing Up

1. **Wait 1-2 minutes** - Events can take time to appear
2. **Check environment** - Preview vs Production are separate
3. **Check browser console** - See if events are firing (development mode)
4. **Verify Analytics component** - Ensure `<Analytics />` is in `layout.tsx`

### Can't See Individual Events

- Dashboard doesn't show raw events (by design)
- Use Drains for raw data
- Use console logging for development

### Properties Not Showing

- Check you're on Plus plan (8 properties)
- Verify properties are being sent (check console logs)
- Some properties may not appear in dashboard breakdowns

---

## Next Steps

1. **Test in Development**
   - Run `npm run dev`
   - Complete quiz
   - Check browser console for events

2. **Set Up Drain (Optional)**
   - Create drain endpoint
   - Configure in Vercel Dashboard
   - Start receiving raw events

3. **Use Dashboard for Trends**
   - Check event counts
   - Filter by properties
   - Identify patterns

4. **Export for Deep Analysis**
   - Use drain data
   - Export to spreadsheet/BI tool
   - Join with Convex data by `sessionId`

---

**Last Updated:** 2025-01-23
