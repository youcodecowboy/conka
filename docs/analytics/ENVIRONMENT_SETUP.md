# Analytics Environment Setup

**Purpose:** Guide to handling analytics tracking across development, preview, and production environments.

---

## Triple Whale: Environment Behavior

### Current Behavior

**Triple Whale WILL receive data from:**
- ✅ Development (`localhost:3000`)
- ✅ Preview deployments (`*.vercel.app`)
- ✅ Production (`conka.io`)

**Why:** The Triple Pixel script sends events to Triple Whale's servers regardless of environment. There's no built-in environment filtering.

### Impact

**Development/Preview data will:**
- Appear in your Triple Whale dashboard
- Mix with production data
- Potentially skew your analytics

**This is normal** - Triple Whale doesn't distinguish between environments by default.

---

## Options for Handling Test Data

### Option 1: Allow All Data (Current - Recommended for Testing)

**Pros:**
- ✅ Easy to verify tracking works
- ✅ See events immediately in dashboard
- ✅ No code changes needed

**Cons:**
- ⚠️ Test data mixes with production data
- ⚠️ May need to filter in Triple Whale dashboard

**Best for:** Initial setup and verification

---

### Option 2: Disable Tracking in Development/Preview

**How to implement:**

Uncomment the environment check in `app/lib/tripleWhale.ts`:

```typescript
// Skip tracking in development/preview
if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('vercel.app')) {
  if (process.env.NODE_ENV === 'development') {
    console.log('🐋 Triple Whale AddToCart (skipped in dev):', params);
  }
  return;
}
```

**Pros:**
- ✅ Clean production data only
- ✅ No test data pollution

**Cons:**
- ❌ Can't verify tracking in dev/preview
- ❌ Harder to test before deploying

**Best for:** After initial verification, when you want clean production data

---

### Option 3: Filter in Triple Whale Dashboard

**How it works:**
1. Triple Whale receives all events (dev, preview, production)
2. Use Triple Whale's filtering/segmentation features
3. Filter by URL or other properties to exclude test data

**Pros:**
- ✅ Can test in all environments
- ✅ Production data stays clean (with filtering)

**Cons:**
- ⚠️ Requires manual filtering setup
- ⚠️ Test data still in database

**Best for:** When you need to test but want clean production reports

---

## Vercel Analytics: Environment Behavior

### Current Behavior

**Vercel Analytics:**
- ✅ Tracks in all environments
- ✅ Separates data by deployment (preview vs production)
- ✅ Development events appear in project analytics

**How to view:**
- Production: Vercel Dashboard → Analytics → Production
- Preview: Vercel Dashboard → Analytics → Preview deployments
- Development: Events appear but may be grouped differently

---

## Recommended Approach

### Phase 1: Initial Setup (Now)

**Do:**
- ✅ Allow tracking in all environments
- ✅ Use console logs to verify in development
- ✅ Check dashboards to confirm events are received

**Why:**
- Easier to verify everything works
- Can see events immediately
- No code complexity

---

### Phase 2: After Verification (Optional)

**Consider:**
- Option 2: Disable tracking in dev/preview
- Or Option 3: Use Triple Whale filtering

**When:**
- After you've confirmed tracking works
- When you want clean production data
- When test data starts affecting reports

---

## How to Check Environment in Code

```typescript
// Check if in development
const isDev = process.env.NODE_ENV === 'development';

// Check if in preview (Vercel)
const isPreview = window.location.hostname.includes('vercel.app');

// Check if in production
const isProduction = 
  window.location.hostname === 'conka.io' || 
  window.location.hostname === 'www.conka.io';
```

---

## Triple Whale URL Filtering (If Available)

Some analytics platforms allow you to filter by URL patterns in the dashboard:

1. Go to Triple Whale Settings
2. Look for "URL Filters" or "Domain Filters"
3. Add patterns to exclude:
   - `localhost:*`
   - `*.vercel.app`
   - Or specific preview URLs

**Note:** This feature may or may not be available in Triple Whale - check their documentation.

---

## Testing Strategy

### For Development Testing

1. **Use Console Logs** (development mode)
   - Events log to console
   - No need to check dashboard
   - Fastest verification method

2. **Use Network Tab**
   - See requests being sent
   - Verify no errors
   - Don't need to wait for dashboard

### For Preview Testing

1. **Deploy to Preview**
2. **Test on Preview URL**
3. **Check Dashboards** (may take 1-5 minutes)
4. **Filter by URL** if needed

### For Production

1. **Deploy to Production**
2. **Test on Production URL**
3. **Check Dashboards**
4. **Monitor for a few days**

---

## Current Implementation

**Right now:**
- ✅ Tracking works in all environments
- ✅ Console logs show events in development
- ✅ Events sent to Triple Whale from all environments
- ✅ Vercel Analytics tracks all environments separately

**To disable in dev/preview:**
- Uncomment the environment check in `app/lib/tripleWhale.ts`
- See Option 2 above

---

## Summary

**Question:** Will Triple Whale receive data from dev/preview?

**Answer:** Yes, by default Triple Whale receives data from all environments.

**Recommendation:**
1. **Now:** Keep it enabled in all environments for easy testing
2. **Later:** Consider disabling in dev/preview if test data becomes an issue
3. **Alternative:** Use Triple Whale filtering to exclude test data in reports

The current setup is fine for initial verification and testing. You can always add environment filtering later if needed.
