# Development Changelog

## January 8, 2026

### 22:15 - Full Protocol & Frequency Edit Modal

Implemented a comprehensive edit modal that allows users to change both their protocol AND delivery frequency in a single flow.

#### New Features:
- **Protocol Selection:** Users can now switch between all 4 protocols:
  - Resilience (🛡️) - Stress & recovery support
  - Precision (🎯) - Focus & mental clarity
  - Balance (⚖️) - Mood & energy balance
  - Ultimate (⚡) - Complete optimization

- **Tier/Frequency Selection:** Each protocol offers available tiers:
  - Starter: Weekly delivery (4 shots)
  - Pro: Bi-Weekly delivery (12 shots) - Most Popular
  - Max: Monthly delivery (28 shots) - Best Value
  - Note: Ultimate protocol only has Pro and Max tiers

- **Responsive Design:**
  - Desktop: Two-column layout (protocols on left, frequencies on right)
  - Mobile: Tab-based navigation (1. Protocol → 2. Frequency)

#### Technical Implementation:
- Created new `EditSubscriptionModal` component with full UX for both views
- Updated API route to accept `protocolId` parameter for protocol switching
- Uses Loop's `swap-line` endpoint: `PUT /subscription/{id}/line/{lineId}/swap`
- Swaps to the correct variant based on selected protocol + tier combination

#### Files Created/Modified:
- `app/components/subscriptions/EditSubscriptionModal.tsx` (NEW)
- `app/api/auth/subscriptions/[id]/pause/route.ts` (updated to accept protocolId)
- `app/hooks/useSubscriptions.ts` (updated changePlan signature)
- `app/account/subscriptions/page.tsx` (integrated new modal)

---

### 19:55 - Implemented Correct Loop Admin API Endpoints for Edit/Skip

Based on research into Loop's official API documentation, implemented the correct endpoints for editing subscriptions.

#### Research Findings:
The Loop Developer Hub (https://developer.loopwork.co/reference/) documents these Admin API endpoints:

**Frequency Actions:**
- `PUT /subscription/{id}/frequency` - Update subscription frequency
- `POST /subscription/{id}/change-plan` - Change subscription plan
- `GET /subscription/{id}/available-frequencies` - List available frequencies

**Order Actions:**
- `POST /subscription/{id}/order/reschedule` - Reschedule/skip orders
- `GET /subscription/{id}/order/schedule` - List order schedule

#### Implementation:
- Updated pause route to use `PUT` method for frequency changes (was incorrectly using `POST`)
- Added logging for all Loop API requests for debugging
- Re-added Edit and Skip buttons to subscriptions page
- Added inline edit modal for changing delivery frequency (Weekly/Bi-Weekly/Monthly)

#### Files Modified:
- `app/api/auth/subscriptions/[id]/pause/route.ts`:
  - `loopRequest()` now accepts HTTP method parameter (GET/POST/PUT/DELETE)
  - Change-frequency action now uses `PUT /subscription/{id}/frequency`
  - Added detailed logging for debugging
  
- `app/account/subscriptions/page.tsx`:
  - Re-added Edit and Skip buttons
  - Added edit modal with plan selection (Weekly, Bi-Weekly, Monthly)
  - Added `handleSkip()` and `handleChangePlan()` functions

#### Next Steps:
Test the functionality to verify the correct Loop API endpoints work as documented.

---

### 19:30 - Removed Loop Portal Redirect Links

Removed Edit and Skip buttons that were redirecting to the old Shopify theme via Loop's customer portal.

#### Changes:
- Removed Edit button from subscriptions page
- Removed Skip button from subscriptions page
- Simplified CancellationModal to remove "offer" step with Loop portal link
- Users can now only: Pause, Resume, Cancel (which work via Loop API)

#### Reason:
The Loop portal redirect was showing the old off-brand Shopify theme, creating poor UX.

---

### 18:45 - Edit/Skip via Loop Customer Portal Redirect

Simplified subscription editing by redirecting users to Loop's customer portal instead of custom API implementations.

#### Problem Solved:
- Loop Admin API does not support skip or change-frequency operations (returns 404)
- Custom implementations for edit/skip were failing despite working pause/resume/cancel
- Needed a reliable solution that works with Loop's existing functionality

#### Solution:
Redirect Edit and Skip buttons to Loop's customer portal where these features work natively.

#### Files Modified:
- `app/account/subscriptions/page.tsx`:
  - Edit button now opens Loop portal in new tab
  - Skip button now opens Loop portal in new tab
  - Removed local edit modal (no longer needed)
  - Added external link icons to indicate redirect behavior
  
- `app/components/subscriptions/CancellationModal.tsx`:
  - "Change Plan" option in retention flow now opens Loop portal
  - Simplified from multiple plan options to single "Edit in Portal" button
  - Removed unused ALTERNATIVE_PLANS constant

#### Loop Portal URL:
`https://conka-6770.myshopify.com/a/loop_subscriptions/customer-portal`

#### User Action Required:
Update Shopify Liquid theme to exclude `/a/loop_subscriptions/` paths from myshopify→conka.io redirect:
```javascript
if (window.location.hostname.includes('myshopify.com') && 
    !window.location.pathname.startsWith('/a/loop_subscriptions')) {
  window.location.href = 'https://www.conka.io' + window.location.pathname;
}
```

---

### 15:30 - Consolidated Subscription Actions into Single Working Route

Fixed persistent 404 errors for skip and change-frequency operations by consolidating all actions into the existing working pause route.

#### Problem Solved:
- New routes at `/api/auth/subscriptions/[id]/skip` and `/api/auth/subscriptions/actions` were returning 404 in production despite working locally
- Vercel deployment caching was preventing new routes from being recognized
- Pause, resume, and cancel worked fine but skip and edit did not

#### Solution:
Extended the working `/api/auth/subscriptions/[id]/pause` route to handle ALL subscription actions via an `action` parameter in the request body:

```typescript
// POST /api/auth/subscriptions/{id}/pause
// Body: { action: 'pause' | 'resume' | 'cancel' | 'skip' | 'change-frequency', plan?: string }
```

#### Files Modified:
- `app/api/auth/subscriptions/[id]/pause/route.ts` - Now handles all actions
- `app/hooks/useSubscriptions.ts` - All functions now call the pause route with action parameter

#### Files Removed:
- `app/api/auth/subscriptions/actions/route.ts` - No longer needed

---

### 01:15 - Loop API First Implementation for Subscription Management

Completely refactored subscription management to use Loop Admin API as the source of truth instead of Shopify's Customer Account API.

#### Problem Solved:
- Shopify Customer Account API mutations (pause/resume/cancel) were returning "success" but not actually affecting Loop-managed subscriptions
- Changes made via Shopify were not reflected in Loop dashboard (the actual source of truth for billing)
- Users could not effectively manage their subscriptions from the customer portal

#### Architecture Change:
```
Before: User → Shopify API → (hoped for sync to Loop) ❌
After:  User → Loop Admin API → (Loop syncs to Shopify) ✓
```

#### Key Changes:
1. **Subscriptions now fetched from Loop** - `/api/auth/subscriptions` queries Loop by customer email
2. **All mutations go through Loop** - pause, resume, cancel, skip, change-plan
3. **Loop subscription IDs used** - numeric IDs (e.g., `3885948`) instead of Shopify GIDs
4. **Shopify OAuth still used for authentication** - identifies user by email, then queries Loop

#### Files Modified:
- `app/api/auth/subscriptions/route.ts` - Fetches from Loop API instead of Shopify
- `app/api/auth/subscriptions/[id]/pause/route.ts` - Loop-only implementation
- `app/api/auth/subscriptions/[id]/resume/route.ts` - Loop-only implementation
- `app/api/auth/subscriptions/[id]/cancel/route.ts` - Loop-only implementation
- `app/api/auth/subscriptions/[id]/skip/route.ts` - Loop-only implementation
- `app/api/auth/subscriptions/[id]/change-plan/route.ts` - Loop-only frequency changes
- `app/hooks/useSubscriptions.ts` - Updated comments and removed URL encoding

#### New Files Created:
- `app/api/auth/subscriptions/debug-loop/route.ts` - Comprehensive Loop API debug endpoint

#### Loop API Endpoints Used:
- `GET /customer?email=...` - Find customer by email
- `GET /subscription?customerId=...` - Get customer's subscriptions
- `POST /subscription/{id}/pause` - Pause subscription
- `POST /subscription/{id}/resume` - Resume subscription
- `POST /subscription/{id}/cancel` - Cancel subscription
- `POST /subscription/{id}/order/skip` - Skip next delivery
- `POST /subscription/{id}/change-frequency` - Change delivery frequency

#### Debug Endpoint:
Visit `/api/auth/subscriptions/debug-loop` to test Loop API connectivity and operations.

---

## January 7, 2026

### 14:00 - Passwordless Login with Shopify Customer Account API

Completely rebuilt the authentication system to use Shopify's new Customer Account API with OAuth 2.0 and passwordless OTP login.

#### Problem Solved:
- Previous password-based registration sent activation emails that redirected to Shopify's default account pages
- Users couldn't log in after activation because passwords weren't properly synced
- Poor UX requiring users to create and remember passwords

#### New OAuth 2.0 Flow:
- Users click "Continue with Email" on login page
- Redirected to Shopify's hosted login page
- Enter email → Receive 6-digit OTP via email → Enter code
- Redirected back to site with authorization code
- Code exchanged for access tokens (stored in HTTP-only cookies)

#### New Files Created:
- `app/api/auth/authorize/route.ts` - OAuth authorization endpoint with PKCE
- `app/api/auth/callback/route.ts` - OAuth callback handler, exchanges code for tokens
- `app/api/auth/session/route.ts` - Session check endpoint for client

#### Files Modified:
- `app/lib/env.ts` - Added Customer Account API configuration
- `app/context/AuthContext.tsx` - Refactored for OAuth flow (removed password-based login)
- `app/account/login/page.tsx` - Simplified to single "Continue with Email" button
- `app/account/register/page.tsx` - Now uses same OAuth flow (registration is automatic)
- `app/account/page.tsx` - Updated to work with cookie-based auth
- `app/api/auth/logout/route.ts` - Updated for SSO logout with Shopify
- `app/hooks/useSubscriptions.ts` - Updated to use cookie-based auth

#### Environment Variables Required:
```
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=2ffc8429-5053-42ff-94ed-e5d2e3b36f76
SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID=69347049757
```

#### Shopify Admin Configuration Required:
1. Settings > Customer accounts > Enable "Customer accounts"
2. Headless sales channel > Customer Account API settings
3. Set callback URL to: `https://your-domain.com/api/auth/callback`
4. Set logout URL to: `https://your-domain.com/account/login`

---

### 10:35 - Mobile PageSpeed Performance Optimizations (Phase 2)

Further optimizations after initial changes showed LCP at 5.3s:

#### Code Splitting (`page.tsx`):
- **Dynamic imports** for below-fold components to reduce initial JavaScript bundle:
  - `KeyBenefits` (contains recharts ~250KB)
  - `WhatIsConka`
  - `ProtocolBuilder`
  - `TrialPacks`
  - `CaseStudiesDataDriven`
  - `Ingredients`
- Added loading placeholders to prevent Cumulative Layout Shift (CLS)

#### Removed Counterproductive Preload:
- Removed manual preload for `/main.jpg` which was loading the original image
- Next.js already handles this with `priority` prop on the Image component
- The manual preload was causing double-loading (original + optimized versions)

---

### 10:30 - Mobile PageSpeed Performance Optimizations (Phase 1)

Implemented several optimizations to improve mobile PageSpeed score (77 → target 90+) after Shopify integration caused performance regression.

#### Deferred Cart Loading (`CartContext.tsx`):
- Cart fetch now uses `requestIdleCallback` (with `setTimeout` fallback for Safari)
- Prevents cart API call from blocking initial page render
- Only fetches cart data after browser is idle, improving First Contentful Paint

#### Preconnect Hints (`layout.tsx`):
- Added `preconnect` and `dns-prefetch` for `cdn.shopify.com`
- Added `preconnect` and `dns-prefetch` for Shopify storefront API
- Reduces time to establish connections for cart/checkout operations

#### Image Optimization:
- **Hero.tsx**: Added `sizes` attribute for responsive hero image
- **WhatIsConka.tsx**: Added `sizes="(max-width: 768px) 85vw, 400px"` and `loading="lazy"`
- **TrialPacks.tsx**: Added `sizes` and `loading="lazy"` for formula images
- **TrialPacksMobile.tsx**: Added `sizes="280px"` and `loading="lazy"`
- **ProductSlideshowMobile.tsx**: Added `loading="lazy"` for carousel images

#### Expected Impact:
- Reduced Largest Contentful Paint (LCP) through proper image handling
- Reduced main thread blocking by deferring cart API calls
- Faster connection setup with preconnect hints
- Smaller initial image downloads with proper sizes attributes
- Significantly reduced initial JavaScript bundle via code splitting

---

### 06:25 - Fixed Protocol Simulator Subscribe Now Buttons

Fixed a critical issue where the "Subscribe Now" buttons in the Protocol Builder/Simulator component on the home page were not connected to any cart functionality. The buttons were purely decorative and didn't add items to the cart.

#### Changes to `ProtocolBuilder.tsx` (Desktop):
- **Added cart integration**: Imported `useCart` hook and `getProtocolVariantId` function
- **Path to Protocol ID mapping**: Added mapping from path keys (path1-4) to protocol IDs (1-4)
- **handleAddToCart function**: Created async function to get variant data and add to cart with selling plan
- **Subscribe Now button**: Connected to `handleAddToCart`, added loading state with "Adding..." text
- **Disabled state styling**: Button shows disabled state while cart operation is in progress

#### Changes to `ProtocolBuilderMobile.tsx` (Mobile):
- **Same cart integration**: Added identical imports and functionality
- **Path to Protocol ID mapping**: Same mapping for consistency
- **handleAddToCart function**: Identical implementation for mobile
- **Sticky footer button**: Subscribe Now button in mobile footer now functional
- **Loading state**: Shows "Adding..." and disabled state during cart operations

#### Protocol Path Mapping:
- `path1` → Protocol 1 (Resilience)
- `path2` → Protocol 2 (Precision)
- `path3` → Protocol 3 (Balance)
- `path4` → Protocol 4 (Ultimate)

---

## January 6, 2026

### 12:00 - Major Trial Packs Section Improvements

Overhauled the Trial Packs section on the homepage with subscription support, proper naming, and verified statistics.

#### Changes to `TrialPacks.tsx` (Desktop):
- **Formula Names Fixed**: Changed "Formula 01/02" to "Conka Flow/Clarity" throughout
- **Subscription Toggle**: Added Subscribe (SAVE 20%) and One-Time toggle buttons
- **Dynamic Pricing**: Shows discounted subscription prices (£11.99 vs £14.99 for 4-pack)
- **Pack Size Styling**: Colored headers with per-shot pricing, matching formula pages
- **Selection Display**: Shows "4-pack • Conka Flow" instead of "Formula 01"
- **Subscription Messaging**: "Ships monthly • Cancel anytime" and "Subscribe Now" button
- **Verified Statistics**: All stats now from SOURCES.md with PMID citations:
  - Conka Flow: -56% Stress, +18% Memory, -28% Cortisol, +42% Sleep Quality
  - Conka Clarity: +40% Glutathione, -35% Mental Fatigue, +22% Cognitive Function, 7x Brain Protection

#### Changes to `TrialPacksMobile.tsx` (Mobile):
- **Same improvements as desktop** with mobile-optimized layout
- **Footer Toggle**: Subscribe/One-Time toggle in sticky footer
- **Compact Pricing Cards**: Strikethrough original price for subscription
- **Verified Statistics**: Same PMID-sourced stats as desktop

---

### 11:00 - Fixed Protocol Header Subscribe/One-Time Button Overflow

Fixed a major issue where the Subscribe/One-Time toggle buttons in the protocol page header were falling off the screen on medium-sized desktop viewports.

#### PurchaseToggle Component (`app/components/product/PurchaseToggle.tsx`):
- **Added `compact` prop**: Enables smaller buttons when stacked (h-7 vs h-9, smaller text)
- **Right-aligned when stacked**: Buttons align to the right edge when in vertical stack mode
- **Responsive sizing**: At 2xl+ buttons return to normal size and horizontal layout
- **Reduced gap**: 1.5 gap when stacked, 2 gap when side-by-side

#### ProtocolHero Component (`app/components/protocol/ProtocolHero.tsx`):
- **Flexible header layout**: Always uses row layout with `justify-between items-center`
- **Title sizing reduced**: `text-xl lg:text-2xl xl:text-3xl` (was `text-2xl md:text-3xl`)
- **Subtitle sizing reduced**: `text-sm lg:text-base xl:text-lg`
- **Truncation support**: Title and subtitle truncate with ellipsis if space is limited
- **Enabled compact + allowStack**: Buttons stack and shrink on mid-range desktops

#### Responsive Behavior:
- **Mobile (390px)**: Buttons side-by-side, both fully visible
- **Medium Desktop (1024px)**: Buttons stack vertically, right-aligned, compact size
- **Large Desktop (1536px+)**: Buttons side-by-side, normal size, centered with title

---

### 10:30 - Added "What is Conka?" Section

Added a new section above the Ingredients section to introduce both Conka formulas and tie the narrative together.

#### New Component (`app/components/WhatIsConka.tsx`):
- **Header Section**: "What is Conka?" title with subtitle about data-driven, research-backed formulas
- **Desktop Layout**: Side-by-side formula cards showing Conka Flow and Conka Clarity
- **Mobile Layout**: Horizontal scroll between formula cards with snap scrolling
- **Formula Cards Include**:
  - Formula ID and positioning (ENERGY vs CLARITY)
  - Name, tagline, and description
  - **Product Image**: Full-width photo of each formula bottle below the tagline
  - "When to take" guidance
  - Key stats with color-coded accent (amber for Flow, teal for Clarity)
  - Link to formula detail page
- **Product Images**: 
  - Conka Flow: `/CONKA_01.jpg` with focal point 55%, 48%
  - Conka Clarity: `/CONKA_06.jpg` with focal point 52%, 50%
- **Bottom Tagline**: "32 peer-reviewed studies • 6,000+ clinical trial participants • 16 active ingredients"

#### Mobile Experience:
- Cards are 85vw wide for optimal readability
- Snap scrolling for smooth navigation between formulas
- Interactive formula toggle buttons at top
- Dot indicators at bottom
- Active state styling with accent colors

#### Spacing Improvements:
- Reduced top padding on WhatIsConka desktop section for better flow from KeyBenefits
- Reduced KeyBenefitsDesktop bottom padding (py-16 → pt-16 pb-6)
- Reduced KeyBenefitsDesktop image height (800-1000px → 500-600px) to eliminate excessive whitespace

#### Home Page Updates (`app/page.tsx`):
- Added `WhatIsConka` component import
- Placed section between Key Benefits and Ingredients sections

---

## January 5, 2026

### 23:40 - Simplified Founders Section to Story Teaser

Replaced the detailed founders section with a simpler story teaser that links to the Our Story page.

#### Changes (`app/page.tsx`):
- **Removed**: Individual founder bios, names, and image placeholders
- **Added**: Compelling story teaser paragraph about the founding journey
- **Added**: Three themed icons on desktop (brain, athletes, science flask)
- **Added**: "Read Our Story" CTA linking to `/our-story`

#### New Content:
- Headline: "Founded by Two Friends"
- Teaser: Mentions career-ending concussion, highest levels of sport, brain recovery problem, £500,000 research investment
- Clean, centered layout on mobile
- Icons + text side-by-side on desktop

---

### 23:35 - Removed Em-Dashes from Our Story Page

Updated story data to remove em-dashes per brand sensitivity.

#### Changes (`app/lib/storyData.ts`):
- Section 2: "conversation—recovery" → "conversation: recovery"
- Section 3: "University—Prof...—Humphrey" → "University, Prof..., Humphrey"
- Section 5: "effect—when" → "effect. When"
- Section 8: "worked—not" → "worked. Not"
- Section 9: "dipped—always" → "dipped, always"

---

### 22:55 - Enhanced Mobile Product Slideshow with Better Images

Improved the mobile product slideshow component with better image selection and differentiated content.

#### ProductSlideshowMobile Component Changes (`app/components/ProductSlideshowMobile.tsx`):
- **Added variant prop**: Component now accepts `variant="hero"` or `variant="packaging"` prop
- **Two distinct image sets**: Hero slideshow shows different images than packaging slideshow
- **Increased image size**: Changed from 256x160px to 288x192px (w-72 h-48) for better visibility
- **Added sizes attribute**: For optimized image loading
- **Added scale property**: Images can now have optional `scale` transform for zoom effect

#### First Slideshow (Hero - after hero section):
- **CONKA_20.jpg** (first): Clarity with lemons and walnuts - 1.5x zoom, focal point at 58% Y
- **CONKA_30.jpg**: Four Flow bottles tightly framed
- **CONKA_16.jpg**: Both formulas together
- **CONKA_17.jpg**: Four Flow bottles with black caps

#### Second Slideshow (Packaging - after trial packs):
- **CONKA_35.jpg**: Box with single Flow bottle
- **CONKA_18.jpg**: Four Clarity bottles with white caps
- **CONKA_40.jpg**: Both bottles with boxes behind
- **CONKA_25.jpg**: Eight-pack tightly framed

#### Home Page Updates (`app/page.tsx`):
- First `ProductSlideshowMobile` uses `variant="hero"`
- Second `ProductSlideshowMobile` uses `variant="packaging"`

---

### 22:30 - Enhanced Quiz with 10 Research-Backed Questions

Expanded the quiz from 3 to 10 questions with lifestyle, training, and cognitive assessment questions.

#### Quiz Data Updates (`app/lib/quizData.ts`):
- **Extended AnswerValue Type**: Added support for frequency, scale, and category answer formats
- **New QuizIcon Type**: Added 15 icon types for varied question themes

#### New Questions Added:
1. Brain fog experience (existing)
2. Afternoon energy crash (existing)
3. Sleep difficulties (existing)
4. **Training intensity**: 60+ min sessions per week (4+, 1-3, Rarely)
5. **Athlete type**: Endurance, Strength, Combat, Cognitive, or Not athletic
6. **Head impact exposure**: Regular head impacts/collisions for neuroprotection needs
7. **Memory self-assessment**: Poor/Average/Excellent rating
8. **Supplement usage**: Multiple, basics, or none currently
9. **Cognitive demand**: Extreme, moderate, or light daily mental workload
10. **Primary goal**: Resilience, clarity, balance, or maximum performance

#### Scoring Balance (Max Points):
- Protocol 1 (Resilience): 23 points - stress/sleep/recovery focus
- Protocol 2 (Precision): 24 points - cognitive/neuroprotection focus
- Protocol 3 (Balance): 21 points - general all-rounder
- Protocol 4 (Ultimate): 23 points - high performer focus

#### QuizQuestion Component (`app/components/quiz/QuizQuestion.tsx`):
- Extended icon rendering to support all 15 new icon types
- Icons include: dumbbell, run, boxing, brain, user, shield, bolt, scale, crown, pill, sparkles, zap

---

### 22:00 - Fixed Accent Color Consistency Across Formula Pages

Fixed accent color mismatch on mobile and desktop formula pages to ensure consistent branding.

#### Color Scheme:
- **Conka Flow (01)**: Orange/amber accent (#f59e0b)
- **Conka Clarity (02)**: Teal accent (#AAB9BC)

#### ProductHeroMobile (`app/components/product/ProductHeroMobile.tsx`):
- **Dynamic Shadow Colors**: Pack selector shadow now uses formula-specific colors
- **Dynamic Selection Background**: Subscription selected state uses correct accent color
- **Dynamic Price Text**: Subscription price text uses formula-specific accent
- **Dynamic Summary Section**: Background, border, and Save badge now use formula-specific colors

#### StickyPurchaseFooterMobile (`app/components/product/StickyPurchaseFooterMobile.tsx`):
- **Dynamic Border Color**: Footer border uses formula-specific accent on subscription
- **Dynamic Price Text**: Price text uses formula-specific accent
- **Dynamic Save Badge**: SAVE badge background uses formula-specific color

#### StickyPurchaseFooter (Desktop) (`app/components/product/StickyPurchaseFooter.tsx`):
- **Dynamic Toggle Color**: Subscribe toggle uses formula-specific accent
- **Dynamic Price & Badge**: Price text and SAVE badge use formula-specific colors

#### ProductHero (Desktop) (`app/components/product/ProductHero.tsx`):
- **Fixed Header Color**: Conka Clarity header now uses teal instead of amber
- **Fixed Price Display**: Border and background use formula-specific accent colors
- **PackSelector Integration**: Now passes subscriptionAccentColor prop

#### PackSelector (`app/components/product/PackSelector.tsx`):
- **New Prop**: Added subscriptionAccentColor prop for dynamic subscription styling
- **Selected State**: Uses formula-specific color for subscription selected state

---

### 21:45 - Added 28-Pack Option to Formula Pages

Added the 28-pack variant to individual formula pages (Conka Flow & Conka Clarity).

#### Pack Size Updates (`app/lib/productData.ts`):
- **Extended PackSize Type**: Added "28" to PackSize union type
- **28-Pack Pricing**: Added pricing for 28-pack variant:
  - One-time: £79.99 (£2.86/shot)
  - Subscription: £63.99 monthly (£2.29/shot, 20% discount)

#### Pack Selector Updates (`app/components/product/PackSelector.tsx`):
- **4-Column Layout**: Changed from 3-column to 4-column grid for pack options
- **Compact Styling**: Reduced padding and font sizes to fit 4 options side-by-side
- **All Pack Sizes**: Now displays 4-pack, 8-pack, 12-pack, and 28-pack

#### Mobile Pack Selector (`app/components/product/ProductHeroMobile.tsx`):
- **4-Column Mobile Grid**: Updated to show all 4 pack sizes in a row
- **Compact Mobile Styling**: Reduced padding and text sizes for mobile viewport

#### Sticky Footer Updates (`app/components/product/StickyPurchaseFooter.tsx`):
- **28-Pack in Dropdown**: Pack dropdown now includes 28-pack option

---

### 21:15 - Ingredients, Science, Navigation Updates

Additional client feedback updates for ingredients, science, and navigation pages.

#### Ingredients Page (`app/components/ingredients/IngredientsPageDesktop.tsx`, `IngredientsPageMobile.tsx`):
- **Removed Safety Profile Section**: Removed the safety profile card from both desktop and mobile views
- **Kept Synergies Section**: "Works Well With" section remains visible

#### Navigation Protocol Subtexts (`app/components/Navigation.tsx`, `app/lib/productData.ts`):
- **Updated Protocol Descriptions**: Both mobile menu and desktop dropdown now show new subtexts:
  - Resilience Protocol: "For those that want more focus"
  - Precision Protocol: "For those that feel foggy"
  - Balance Protocol: "Alternate daily between Flow and Clarity"
  - Ultimate Protocol: "Take Flow and Clarity both daily"

#### Science Page Em-Dash Removal (`app/components/science/*.tsx`):
- Replaced em-dashes with commas or hyphens throughout science pages
- Updated: ScienceHero.tsx, SciencePageDesktop.tsx, SciencePageMobile.tsx

#### Protocol Builder Tier Buttons (`app/components/ProtocolBuilder.tsx`, `ProtocolBuilderMobile.tsx`):
- **Descriptive Tier Buttons**: Replaced generic "3+1" labels with specific formula information
- Now shows: "3× Flow" and "1× Clarity" with colour-coded indicators
- Mobile version shows compact version with colour dots

---

### 20:45 - Homepage Fixes & Client Feedback Updates

Addressed various client feedback items for the homepage and site-wide improvements.

#### Protocol Section Updates (`app/components/ProtocolBuilder.tsx`):
- **Updated Protocol Descriptions**: Changed subtitle text for all four protocols:
  - Resilience Protocol: "For those that want more focus"
  - Precision Protocol: "For those that feel foggy"
  - Balance Protocol: "Alternate daily between flow and clarity"
  - Ultimate Protocol: "Take flow and clarity both daily"

#### Key Benefits Section (`app/page.tsx`):
- **Turmeric Reference**: Changed "Curcumin" to "Turmeric" in the memory benefit annotation (line 208)

#### Footer Improvements (Multiple Pages):
- **Fixed Navigation Links**: Updated footer nav links to point to actual pages instead of anchor links:
  - `/#science` → `/science`
  - `/#ingredients` → `/ingredients`
  - `/#results` → `/case-studies`
  - `/#story` → `/our-story`
- **Homepage Mobile Logo**: Replaced text logo "conka." with actual logo image (`/conka.png`)
- **Applied to Pages**: Homepage, conka-flow, conka-clarity, formula-01, formula-02, protocol pages

#### Trial Packs Section (`app/components/TrialPacks.tsx`, `app/components/TrialPacksMobile.tsx`):
- **Clickable Product Images**: Made formula images clickable, linking to respective formula pages
- **Fixed Learn More Links**: Updated from `/formula-${id}` to proper routes (`/conka-flow`, `/conka-clarity`)
- **Improved Navigation**: Users can now click through trial section to view formula details

---

### 19:30 - Subscription Tier Logic Fix & Profile Modal Redesign

Fixed subscription editing to properly link package size with delivery frequency, and redesigned profile modal.

#### Subscription Editing Fix (`app/account/subscriptions/page.tsx`):
- **Tier-Based Selection**: Each tier now includes BOTH package size AND frequency:
  - Starter = 4-pack + Weekly delivery
  - Pro = 12-pack + Bi-weekly delivery
  - Max = 28-pack + Monthly delivery
- **Single Selection UI**: Users choose ONE option (the tier), not separate frequency and package
- **Current Plan Indicator**: Shows "Current" badge on the user's active tier
- **Clear Pricing Info**: Each option shows pack size and delivery frequency together

#### Profile Modal Redesign (`app/account/page.tsx`):
- **Wider Layout**: Increased max width to `max-w-2xl` (672px) for better proportions
- **Two-Column Grid**: Personal/Contact on left, Delivery Address on right
- **Card Sections**: Each section in its own `neo-box` card with icon headers
- **Better Spacing**: Increased padding, larger inputs, rounded corners (`rounded-xl`)
- **Improved Header/Footer**: Separate header with subtitle, footer with gray background
- **Backdrop Blur**: Added blur effect to modal overlay

---

### 19:00 - Dev Mode & Profile Editing & Subscription Options Alignment

Added development mode for testing and aligned subscription options with actual product offerings.

#### Development Mode (`app/lib/devMode.ts`):
- **Mock Authentication**: Dev mode bypasses real authentication for testing
- **Mock Customer Data**: Dev user with email, name, phone
- **Mock Subscriptions**: 4 sample subscriptions (2 active, 1 paused, 1 cancelled) with correct tier quantities
- **Mock Orders**: 4 sample orders with various statuses
- **Visual Indicator**: Purple "Dev Mode" banner on all account pages when active
- **Easy Toggle**: "Enter Dev Mode" button on login page (development only)

#### Profile Editing (`app/account/page.tsx`):
- **Edit Profile Modal**: New modal for editing account information
- **Personal Information**: Edit first name, last name
- **Contact Information**: Edit email address, phone number
- **Delivery Address**: Edit full delivery address (address lines, city, postcode, country)
- **Country Selector**: Dropdown with UK, Ireland, US, Canada, Australia
- **API Integration**: New `/api/auth/customer/update` endpoint for saving changes

#### Subscription Options Alignment (`app/account/subscriptions/page.tsx`):
- **Frequency Options**: Updated to match actual billing frequencies:
  - Weekly (best for Starter tier)
  - Bi-weekly (best for Pro tier)
  - Monthly (best for Max tier)
- **Package Size Options**: Replaced arbitrary quantities with actual product tiers:
  - Starter (4-pack) - Gentle introduction
  - Pro (12-pack) - Balanced protocol
  - Max (28-pack) - Full month coverage
- **Better UX**: Each option now shows description and pack size

#### Files Changed:
- `app/lib/devMode.ts` - New file with mock data
- `app/context/AuthContext.tsx` - Added dev mode support
- `app/hooks/useSubscriptions.ts` - Added dev mode data handling
- `app/components/DevModeBanner.tsx` - New component
- `app/account/login/page.tsx` - Added dev mode button
- `app/account/page.tsx` - Added profile editing
- `app/account/subscriptions/page.tsx` - Aligned options with product tiers
- `app/account/orders/page.tsx` - Added dev mode support
- `app/api/auth/customer/update/route.ts` - New API endpoint

---

### 24:30 - Comprehensive Account Management Enhancement

Major enhancement to the account management system with improved UI, subscription management, and desktop navigation access.

#### Navigation Updates (`app/components/Navigation.tsx`):
- **Account Section in Shop Dropdown**: Added account section at bottom of Shop dropdown menu
- Two options: "Sign In / My Account" and "Manage Subscription"
- Auth-aware: Shows personalized greeting and appropriate destinations based on login state
- Guest users are directed to login page; authenticated users go directly to account/subscriptions
- Clean design with subtle background and icons matching the dropdown style
- Mobile navigation unchanged (account button in menu remains as is)

#### Account Dashboard Enhancement (`app/account/page.tsx`):
- **Stats Overview Grid**: New 4-column grid showing:
  - Active subscriptions count (with green icon)
  - Total orders count (with amber icon)
  - Next delivery date (spanning 2 columns)
- **Subscription Summary Banner**: Inverted neo-box showing active subscriptions with "Manage Subscriptions" CTA
- **Quick Actions Cards**: Enhanced with hover shadows and larger icons
- **Account Information Section**: Redesigned with background cards for name/email
- Real-time data fetching from both Shopify (orders) and Loop (subscriptions)

#### Subscriptions Page Enhancement (`app/account/subscriptions/page.tsx`):
- **Edit Subscription Modal**: New modal for modifying subscriptions:
  - Frequency selection (7 options from weekly to quarterly)
  - Quantity selection (1-6 units)
  - Save changes with optimistic UI updates
- **Summary Stats Bar**: Active/Paused/Past subscription counts
- **Enhanced Subscription Cards**:
  - Product images with gradient fallback
  - Status-specific info banners (next delivery for active, pause message for paused)
  - Action buttons with icons (Edit, Skip, Pause/Resume, Cancel)
- **Improved Cancel Flow**: Warning about pausing as alternative, retention messaging
- **Past Subscriptions Section**: Separate section for cancelled/expired subscriptions
- **Help Section**: Contact support CTA

#### Orders Page Enhancement (`app/account/orders/page.tsx`):
- **Summary Stats Bar**: Total orders, delivered count, in-progress count
- **Expandable Order Cards**: Click to expand/collapse order details
- **Order Status Timeline**: Visual 5-step progress indicator:
  - Placed → Paid → Processing → Shipped → Delivered
  - Checkmarks for completed steps, numbers for pending
  - Dynamic highlighting based on order status
- **Enhanced Empty State**: Product recommendations with links to Conka Flow/Clarity
- **Order Actions**: "Order Again" and "Get Help" buttons per order
- Relative time display ("2 days ago", "3 weeks ago")

#### Hook Updates (`app/hooks/useSubscriptions.ts`):
- Added `updateFrequency(subscriptionId, interval)` function
- Added `updateQuantity(subscriptionId, quantity)` function
- Both functions update local state optimistically

#### Technical Notes:
- All pages follow neo-brutalist style guide with `neo-box`, `neo-button` classes
- Responsive design with mobile-first approach
- Real-time data synchronization with Shopify and Loop APIs
- Proper loading states and error handling throughout

---

### 23:45 - Backend Quality & Security Improvements

Major codebase quality improvements focused on security, type safety, and professional polish without affecting the frontend experience.

#### Security Improvements:

**Removed Debug Endpoints:**
- Deleted `app/api/test-connections/route.ts` (was exposing env var status)
- Deleted `app/api/test-products/route.ts` (was exposing internal product data)

**Added Zod Validation to API Routes:**
- `app/api/auth/login/route.ts` - Email and password validation
- `app/api/auth/register/route.ts` - Registration input validation with password length check
- `app/api/cart/route.ts` - Discriminated union schema for all cart actions (create, add, update, updateMultiple, remove)
- `app/api/subscriptions/[id]/route.ts` - Action-based validation for pause, resume, cancel, updateFrequency, updateQuantity

**Subscription API Authorization:**
- Updated `app/api/subscriptions/route.ts` to require authentication
- Users can now only query their own subscriptions (prevents data leakage)
- Updated `app/hooks/useSubscriptions.ts` to pass auth token
- Updated `app/account/subscriptions/page.tsx` to use auth token for all operations

**HTTP Security Headers:**
- Added to `next.config.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

#### Environment & Configuration:

**New Environment Validation Utility:**
- Created `app/lib/env.ts` with:
  - `validateEnv()` - Returns validation result with missing/warning lists
  - `assertEnv()` - Throws on missing required variables
  - `env` object - Type-safe access to environment variables
- Updated `app/lib/shopify.ts` to use env module
- Updated `app/lib/loop.ts` to use env module
- Created `.env.example` documenting required variables

#### Code Organization:

**Type Consolidation:**
- Created `app/types/subscription.ts` with shared Subscription types
- Created `app/types/index.ts` for re-exports
- Updated `app/lib/loop.ts` to use shared types
- Updated `app/hooks/useSubscriptions.ts` to use shared types

**Standardized API Utilities:**
- Created `app/lib/api-utils.ts` with:
  - `successResponse()` / `errorResponse()` - Standardized response format
  - `ErrorCodes` - Categorized error codes (VALIDATION_ERROR, AUTHENTICATION_ERROR, etc.)
  - `handleApiError()` - Centralized error handling with logging
  - `parseRequestBody()` / `safeParseRequestBody()` - Zod parsing helpers

#### Performance:

**Shopify API Caching:**
- Added `app/lib/shopify.ts`:
  - `shopifyFetchCached()` - Cached version for read-only queries (60s default TTL)
  - `invalidateCache()` - Manual cache invalidation after mutations
  - In-memory cache with automatic cleanup

#### Dependencies Added:
- `zod` - Runtime type validation

---

### 21:30 - Complete Shopify Product Mapping for All Protocols & Formulas

Successfully mapped all Shopify products to the storefront with Loop subscription integration.

#### Protocols Configured:
- **Protocol 1 (Resilience)** - All 3 tiers (Starter, Pro, Max) with selling plans
- **Protocol 2 (Precision)** - All 3 tiers with selling plans
- **Protocol 3 (Balance)** - Already configured, verified
- **Protocol 4 (Ultimate)** - Pro & Max tiers with selling plans (no Starter)

#### Individual Formulas Configured:
- **Conka Flow (01)** - 4, 8, 12, 28 pack sizes with subscription support
- **Conka Clarity (02)** - 4, 8, 12, 28 pack sizes with subscription support

#### Technical Changes:
- `app/lib/shopifyProductMapping.ts` - Added all variant IDs and selling plan IDs
- Updated `FORMULA_VARIANTS` structure to support selling plans for subscriptions
- Added `FORMULA_SELLING_PLANS` mapping for formula pack sizes
- Updated `getFormulaVariantId()` to return `{ variantId, sellingPlanId? }`
- Updated trial pack variants for both Flow and Clarity

#### Formula Page Updates:
- `app/conka-flow/page.tsx` - Updated to pass selling plan ID for subscriptions
- `app/conka-clarity/page.tsx` - Updated to pass selling plan ID for subscriptions
- `app/formula-01/page.tsx` - Updated to pass selling plan ID for subscriptions
- `app/formula-02/page.tsx` - Updated to pass selling plan ID for subscriptions

#### Pricing Updates:
- Updated `productData.ts` formula pricing to match Shopify:
  - 8-pack: £28.99 (was £24.99)
  - 12-pack: £39.99 (was £34.99)
- Ultimate Protocol Max: £144.99 (was £159.99)

#### Shared Selling Plans (Loop):
- Starter (4x weekly): `gid://shopify/SellingPlan/711429882230`
- Pro (12x bi-weekly): `gid://shopify/SellingPlan/711429947766`
- Max (28x monthly): `gid://shopify/SellingPlan/711429980534`

---

### 20:45 - Visual Enhancements: Product Images Throughout Site

Replaced placeholder boxes with actual product photography using the focal point system across multiple components.

#### ProductSlideshowMobile.tsx
Replaced placeholder boxes with horizontal product images:
- **CONKA_19** - Flow with turmeric, blueberries, mint (lifestyle shot)
- **CONKA_16** - 4 bottles: 2 black + 2 white caps (Both Formulas)
- **CONKA_22** - Boxes with both bottles (packaging shot)

Each image uses focal point positioning for proper centering in the horizontal card format.

#### ProtocolBenefitsMobile.tsx
Added the same image slideshow approach with different images:
- **CONKA_23** - Scientific formulation with beaker
- **CONKA_16** - Both formulas together
- **CONKA_24** - Product packaging display

#### TrialPacks.tsx
Dynamic formula image that changes based on selection:
- **CONKA_17** - 4 black cap bottles (Flow)
- **CONKA_18** - 4 white cap bottles (Clarity)

Uses focal point positioning to ensure bottles are centered in the image container.

---

### 19:30 - Science Page: The Foundation of Cognitive Performance

Created a comprehensive, data-driven Science page at `/science` that explains the scientific foundation of Conka's formulas through five key pillars.

#### New Data Layer:
- **`app/lib/scienceData.ts`** - Science page data and interfaces:
  - `SciencePillar` interface with category, description, keyStats, ingredients, mechanisms
  - 5 scientific pillars: Adaptogens & Stress Resilience, Neurotransmitter Support, Antioxidant Defense, Cerebral Circulation, Neuroprotection & Longevity
  - Clinical evidence summary stats (32 studies, 6,000+ participants)
  - Formula strength data for radar chart comparison
  - Headline stats for hero section

#### New Components (`app/components/science/`):
- **`ScienceHero.tsx`** - Hero section with headline stats grid and research badges
- **`SciencePillars.tsx`** - Interactive accordion of 5 scientific pillars
- **`PillarCard.tsx`** - Expandable pillar detail with stats, mechanism, and ingredients
- **`SynergyChart.tsx`** - Recharts RadarChart comparing Flow, Clarity, and Combined Protocol
- **`EvidenceSummary.tsx`** - Clinical evidence stats with CTA buttons
- **`SciencePageDesktop.tsx`** - Full desktop layout with adaptogens section, differentiators
- **`SciencePageMobile.tsx`** - Mobile-optimized vertical stack layout

#### New Page:
- **`app/science/page.tsx`** - Responsive rendering using `useIsMobile` hook

#### Content Architecture:
1. **Adaptogens & Stress Resilience** - HPA axis, cortisol modulation (-56% stress, -28% cortisol)
2. **Neurotransmitter Support** - Acetylcholine, dopamine, serotonin pathways (+22% cognition)
3. **Antioxidant Defense & Brain Detox** - Oxidative stress protection (+40% glutathione)
4. **Cerebral Circulation & Energy** - Blood flow, mitochondrial function (+16% cognition)
5. **Neuroprotection & Longevity** - BDNF, brain atrophy prevention (-86% atrophy rate)

#### Visualizations:
- Radar chart comparing formula strengths across all 5 pillars
- Stats cards with PMID citations for each clinical finding
- Progress indicators and trust badges

#### Navigation Updates:
- Changed "The Science" nav link from `/#science` to `/science` (desktop and mobile)

---

### 15:30 - Product Page Image Slideshows with Focal Points

Updated both Conka Flow and Conka Clarity product pages with interactive image slideshows featuring focal point centering.

#### Key Changes:

**Conka Flow (`/conka-flow`):**
- Uses Flow images (BLACK cap bottles):
  - CONKA_01.jpg - Front view with CONKA branding
  - CONKA_02.jpg - Side view with badges
  - CONKA_03.jpg - "1 BOTTLE DAILY" view
  - CONKA_04.jpg - Back label view
  - CONKA_05.jpg - Horizontal/angled view
- 5 images with arrow navigation and dot indicators

**Conka Clarity (`/conka-clarity`):**
- Uses Clarity images (WHITE cap bottles):
  - CONKA_06.jpg - Vertical front view
  - CONKA_10.jpg - Horizontal view
  - CONKA_20.jpg - With lemons
- 3 images with arrow navigation and dot indicators

**Layout Improvements:**
- Slideshow container enlarged (max-w-2xl) for better visibility
- Shifted left (-ml-12 on lg, -ml-16 on xl) to center between left edge and control panel
- Image width increased to 55% on desktop
- Annotation text aligned left on desktop to match

**ProductImageSlideshow Component:**
- Now supports per-image focal points (`focalX`, `focalY`)
- Uses `object-fit: cover` with dynamic `object-position`
- Works seamlessly for both horizontal and vertical images

---

### 15:15 - Key Benefits Section with Focal Images

Added product images to the Key Benefits section on the homepage, with proper focal point centering for vertical bottle images.

#### New Component:
- **`FocalImage.tsx`** - Reusable image component with configurable focal point (focalX, focalY) for proper centering when using `object-fit: cover`

#### Changes:
- Updated `KeyBenefits.tsx` interface to include optional `focalPoint: { x: number; y: number }` property
- Updated `KeyBenefitsDesktop.tsx` to use `FocalImage` component instead of raw `Image`
- Assigned vertical bottle images to each benefit:
  - **Focus**: CONKA_06.jpg (vertical bottle, white cap)
  - **Sleep**: CONKA_04.jpg (vertical bottle, back label with ingredients)
  - **Brain Fog**: CONKA_01.jpg (vertical bottle, CONKA branding)
  - **Stress**: CONKA_02.jpg (vertical bottle, side view with Vegan/Sport badges)
  - **Memory**: CONKA_03.jpg (vertical bottle, "1 BOTTLE DAILY" text)

#### Key Decision:
- Horizontal images (like CONKA_48-55 with ingredients) don't work well in the tall vertical container - they get cropped too much
- Selected only vertical single-bottle images that display properly without excessive cropping

---

### 24:30 - Data-Driven Case Studies with Charts & Visualizations

Major upgrade to all case study components across the site. Removed fabricated quotes and replaced with data-dense visualizations showing real metrics from the CONKA cognitive testing app.

#### Key Changes:

**Data Layer (`app/lib/caseStudiesData.ts`):**
- Added 35+ real athletes/professionals from the CSV
- Removed all fabricated quotes (only real data from testing)
- Added new fields: `baselineTests`, `postBaselineTests`, `testingPeriod`, `tier`, `userType`
- Added helper functions: `getTotalTestsCompleted()`, `getAverageImprovementAcrossAll()`
- All metrics: Total Score, Accuracy, Speed with baseline vs result comparisons

**New Components:**
- `CaseStudiesDataDriven.tsx` - Homepage case studies with:
  - Aggregate stats (total tests, avg improvement)
  - Interactive athlete cards with bar charts
  - Circular progress indicators
  - Baseline vs Result comparison bars
  - Full athlete bio/description

- `FormulaCaseStudies.tsx` (+ Mobile version) - Formula page case studies with:
  - Circular progress charts for each metric
  - Baseline vs Result bars
  - Test count breakdown (total/baseline/post)
  - Real athlete bios from CSV

**Updated Components:**
- `ProtocolCaseStudiesMobile.tsx` - Now uses real athlete data dynamically based on protocol
- `AthleteStats.tsx` - Added circular progress charts with color coding
- `AthleteCard.tsx` - Shows test breakdown instead of fabricated quotes
- `CaseStudiesPageDesktop.tsx` - Dynamic aggregate stats calculation

**Pages Updated:**
- Homepage (`app/page.tsx`) - Uses new `CaseStudiesDataDriven` component
- Formula 01 pages - Uses `FormulaCaseStudiesMobile` with formulaId="01"
- Formula 02 pages - Uses `FormulaCaseStudiesMobile` with formulaId="02"
- Protocol pages - Uses updated `ProtocolCaseStudiesMobile`
- Case Studies page - Now shows all 35+ athletes with full data

**Hero.tsx:**
- Reverted to "backed by 250+ clinical studies" (confirmed accurate by client)

---

### 14:55 - Product Image Slideshow for Conka Flow

Added a new product image slideshow component for the Conka Flow formula page, replacing the single product image with an interactive gallery of 3 pre-cropped product photos (CONKA_01x.jpg, CONKA_02x.jpg, CONKA_03x.jpg).

#### New Component:
- **`ProductImageSlideshow.tsx`** - Reusable slideshow component with:
  - Manual navigation only (no auto-rotation)
  - Persistent left/right arrow navigation buttons
  - Dot indicators for direct image selection
  - Smooth fade transitions between images

#### Features:
- Works on both desktop and mobile
- Desktop: Positioned to the left of the selection panel, with "your daily foundation" text centered below
- Mobile: Full-width slideshow in the hero section
- Uses pre-cropped images (CONKA_01x, CONKA_02x, CONKA_03x) that are properly centered
- No zoom/transform needed since images are already properly composed

#### Files Updated:
- `app/components/product/ProductImageSlideshow.tsx` - New component created
- `app/components/product/ProductHero.tsx` - Integrated slideshow for formulaId 01
- `app/components/product/ProductHeroMobile.tsx` - Integrated slideshow for formulaId 01
- `app/components/product/index.ts` - Exported new component

---

### 23:45 - Real Athlete Case Studies Across All Pages

Replaced all placeholder athlete testimonials with real athlete data from the case study CSV. Athletes are now correctly mapped to formulas and protocols based on their actual usage.

#### Files Updated:

**app/lib/caseStudiesData.ts:**
- Complete rewrite with 14 real athletes/professionals
- Tier 1 (Headline): Jade Shekells, Finn Russell, Patrick Bamford, Jack Willis, Nimisha Kurup, Shane Corstorphine
- Tier 2 (Supporting): Daniel James, Josh Stanton, Max Lahiff, Alex Dombrandt, Michael Olise, Blair Kinghorn, Emma Uren, George Pratt
- Updated interface to include: organization, position, testingPeriod, baselineTests, postBaselineTests, tier
- Added helper functions: getTier1Athletes(), getTier2Athletes(), getHomepageAthletes(), getAthletesForFormula()

**app/page.tsx (Homepage):**
- Updated athletes array with: Jade Shekells (+36.72%), Finn Russell (+28.96%), Nimisha Kurup (+24.68%)
- All results now show real cognitive test data

**app/formula-01/page.tsx & app/conka-flow/page.tsx (Flow Formula):**
- Athletes using Resilience Protocol: Finn Russell, Jack Willis, Max Lahiff
- Focus on stress resilience and recovery benefits

**app/formula-02/page.tsx & app/conka-clarity/page.tsx (Clarity Formula):**
- Athletes using Precision Protocol: Nimisha Kurup, Patrick Bamford, Josh Stanton
- Focus on peak performance and mental clarity benefits

**app/components/protocol/ProtocolCaseStudiesMobile.tsx:**
- Protocol 1 (Resilience): Finn Russell, Jack Willis
- Protocol 2 (Precision): Nimisha Kurup, Patrick Bamford
- Protocol 3 (Balance): Jade Shekells, Daniel James
- Protocol 4 (Ultimate): Josh Stanton, Shane Corstorphine

**app/components/Hero.tsx:**
- Reverted to "backed by 250+ clinical studies" (confirmed accurate by client)

---

### 23:15 - Site-Wide Content Update with Verified Clinical Data

Systematically replaced all fabricated placeholder content with verified clinical study data from BRAND_HIGHLIGHTS.md. All statistics now include PMID citations for traceability.

#### Files Updated:

**app/components/Hero.tsx:**
- Changed "backed by 250+ clinical studies" → "ingredients validated by peer-reviewed PubMed research"
- Updated tagline to match verified claims

**app/page.tsx (Homepage Key Benefits):**
- Replaced all 5 keyBenefits with real study data and athlete testimonials:
  - Focus: +18% memory (PMID: 12888775 — Lemon Balm) + Finn Russell testimonial
  - Sleep: +42% quality (PMID: 32021735 — Ashwagandha) + Jade Shekells testimonial
  - Brain Fog: +40% glutathione (PMID: 29559699) + Nimisha Kurup testimonial
  - Stress: -56% stress scores (PMID: 23439798 — Ashwagandha) + Jack Willis testimonial
  - Memory: +63% improvement (PMID: 29246725 — Curcumin) + Patrick Bamford testimonial

**app/lib/productData.ts:**
- Replaced all 12 fabricated clinical studies in struggleSolutions (Flow + Clarity)
- Updated Formula 01 (Flow) benefits with verified stats:
  - +18% focus, +42% sleep, -56% stress, +17% energy
- Updated Formula 02 (Clarity) benefits with verified stats:
  - +63% memory, +57% blood flow, +40% detox, -42% anxiety
- Updated all 3 protocol benefits with PMID citations
- Updated FAQ to reference correct statistics

**app/lib/quizData.ts:**
- Updated protocolMatchInfo keyBenefits with verified statistics and PMIDs
- Protocol 1: -56% stress, +42% sleep, -28% cortisol
- Protocol 2: +63% memory, +57% blood flow, -30% fatigue
- Protocol 3: Complete coverage messaging
- Protocol 4: Combined benefits messaging

#### All Statistics Now Include PMID Citations:
- Ashwagandha: PMID 23439798, PMID 32021735
- Lemon Balm: PMID 12888775, PMID 16444660
- Rhodiola rosea: PMID 10839209, PMID 19016404
- Turmeric/Curcumin: PMID 29246725
- Glutathione: PMID 29559699
- Ginkgo Biloba: PMID 21802920
- Vitamin C: PMID 25688638
- Acetyl-L-Carnitine: PMID 17658628
- Alpha GPC: PMID 14600878

---

### 22:00 - Added Ingredient Benefit Copy Library & Site Location Mapping

Updated `BRAND_HIGHLIGHTS.md` with comprehensive ingredient benefit copy and site location mapping.

#### New Sections Added:

**Ingredient Benefit Copy Library:**
- 11 ingredients with marketing-ready copy across 6 use cases:
  - Mental Benefit (taglines)
  - Physical Performance
  - Neuroprotection (Brain Ageing)
  - Brain Optimisation & Productivity
  - ADHD/Chronic Fatigue/TBI
  - Synergistic Benefits
- CONKA Flow ingredients: Rhodiola Rosea, Ashwagandha, Lemon Balm, Turmeric & Black Pepper, Bilberry
- CONKA Clarity ingredients: Glutathione, Vitamin C, Alpha Lipoic Acid, Vitamin B12, Acetyl-L-Carnitine, NAC, Ginkgo Biloba, L-Alpha GPC

**Site Location Mapping:**
- Homepage Key Benefits section - mapped to real studies and athlete case studies
- Formula Product Pages "What do you struggle with?" - replacement data for all 6 struggles
- Protocol Pages - athlete case study assignments per protocol
- Ingredients Page - copy source mapping
- Quiz Results - athlete social proof recommendations

---

### 21:30 - Brand Highlights Reference Document Created

Created a comprehensive `BRAND_HIGHLIGHTS.md` file that serves as the single source of truth for all marketing copy, clinical claims, and case study data across the website.

#### Document Contains:

**Section 1: Product Benefits Mapped to Real Studies**
- CONKA Flow (Formula 01) - 5 client-specified benefits with verified statistics:
  - Consistent Energy → Rhodiola rosea (PMID: 10839209)
  - Stress Resilience → Ashwagandha (PMID: 23439798)
  - Focus - Discipline → Lemon Balm (PMID: 12888775)
  - Memory → Turmeric/Curcumin (PMID: 29246725)
  - Mood - Calm in Chaos → Lemon Balm (PMID: 16444660)
- CONKA Clarity (Formula 02) - 5 client-specified benefits with verified statistics:
  - Mental Detox → Glutathione (PMID: 29559699)
  - Focus - Lock-In → Ginkgo Biloba (PMID: 22628390)
  - Re-Charge → ALCAR (PMID: 18937015)
  - Decision Making → Alpha GPC (PMID: 12882463)
  - Mental Clarity → Vitamin B12 (PMID: 23690582)

**Section 2: Featured Case Studies (15 Athletes/Professionals)**
- Elite Athletes with full performance metrics:
  - Jade Shekells (GB7 Rugby) - +36.72% improvement, 36 tests
  - Finn Russell (Bath Rugby) - +28.96% improvement, 15 tests
  - Patrick Bamford (Leeds United) - +27.93% improvement, 9 tests
  - Jack Willis (Stade Toulousain) - +20.51% improvement, 12 tests
  - Plus 7 more athletes with baseline vs. post-baseline data
- High-Performance Professionals:
  - Nimisha Kurup (Bank of America C-Suite) - +24.68% improvement, 73 tests
  - Shane Corstorphine (SkyScanner C-Suite) - +13.30% improvement, 33 tests
  - Charlotte Simpson (Cambridge PhD / AstraZeneca) - +1.17% improvement, 11 tests

**Section 3: Fabricated Content Audit**
- Identified 12 fake clinical studies in `productData.ts` with fabricated professors
- Identified fake study references in homepage `clinicalBreakdown` data
- Flagged "250+ clinical studies" claim in Hero.tsx for update
- Provided replacement recommendations with real PMID citations

**Section 4: Quick Reference Statistics**
- Headline stats for marketing copy with proper PMID citations
- Case study stats for testimonials and social proof
- Copy guidelines for regulatory compliance

#### Files Created:
- `BRAND_HIGHLIGHTS.md` - Comprehensive reference document

---

### 19:15 - Mobile Navigation Cart & Account Buttons

Added persistent Cart and Account buttons to the mobile navigation menu, ensuring users can always access their cart even when the product sticky footer is visible.

#### Changes:
- **Cart Button**: Opens cart drawer, shows item count badge when items are present
- **Account Button**: Links to `/account` page
- Both buttons placed below the navigation links with a separator border
- Buttons are styled prominently:
  - Cart: Black background, white text, amber badge for item count
  - Account: Outline style with hover-to-fill effect

#### Files Updated:
- `app/components/Navigation.tsx` - Added Cart & Account buttons section below nav links

---

### 18:30 - Mobile UI Overhaul for Subscription Visuals

Enhanced mobile components to match the desktop subscription experience with clear visual cues for savings.

#### Protocol Mobile Updates (`ProtocolHeroMobile.tsx`):
- **Tier Selector Cards** now match desktop styling:
  - Black header with tier name
  - Crossed-out original price (e.g., ~~£39.99~~) when subscription selected
  - Subscription price in amber (e.g., £31.99)
  - Billing frequency label (e.g., "billed bi-weekly")
  - Teal shadow on selected tier
- **Your Selection Section**:
  - ✅ "Save 20%" badge (amber with checkmark icon)
  - ~~Original price~~ crossed out
  - Subscription price in amber

#### Formula Mobile Updates (`ProductHeroMobile.tsx`):
- Same tier selector styling as protocols
- Pack sizes updated to 4, 8, 12 (matching Shopify)
- Subscription savings visual in selection summary

#### Sticky Footer Mobile (`StickyPurchaseFooterMobile.tsx`):
- Crossed-out original price next to subscription price
- "SAVE 20%" badge in amber
- Amber border when subscription is active
- Proper billing frequency display

#### Sticky Footer Desktop (`StickyPurchaseFooter.tsx`):
- Same subscription savings visuals as mobile
- Pack sizes updated to 4, 8, 12

#### Bug Fixes:
- Fixed "billed billed weekly" duplication issue in billing labels

---

### 17:30 - Visual Pricing Updates & Cart Subscription Savings

Enhanced visual pricing display across product pages and cart drawer to clearly show subscription savings.

#### Pricing Data Corrections:
- Updated `app/lib/productData.ts` with accurate Shopify-aligned prices:
  - **Protocol Base Prices (one-time):** Starter £14.99, Pro £39.99, Max £79.99
  - **Protocol Subscription Prices (20% off):** Starter £11.99, Pro £31.99, Max £63.99
  - **Trial Pack Sizes:** Updated to 4, 8, 12 packs (was 4, 12, 28)

#### Cart Drawer Subscription Savings:
- Subscription items now show:
  - ✅ **SUBSCRIPTION** badge (orange with checkmark icon)
  - ✅ ~~Original price~~ crossed out (e.g., ~~£39.99~~)
  - ✅ **Discounted price** in amber/orange (e.g., £31.99)
  - ✅ **SAVE 20%** badge in green
- One-time items show standard price display

#### Files Updated:
- `app/lib/productData.ts` - Corrected all protocol and trial pack prices to match Shopify
- `app/lib/shopify.ts` - Extended `CartLine` type with `sellingPlanAllocation`, `cost`, `sku`, `compareAtPrice` fields
- `app/lib/shopifyQueries.ts` - Enhanced cart fragment to fetch selling plan allocation and compare prices
- `app/components/CartDrawer.tsx` - Added subscription detection, visual savings display with badges

#### Technical Implementation:
- Cart drawer calculates 20% savings using `SUBSCRIPTION_DISCOUNT` constant
- Original price shown as base merchandise price, subscription price calculated as 80% of base
- Selling plan detection via `item.sellingPlanAllocation` presence

---

### 16:00 - Protocol Subscription Integration (Balance Protocol)

Implemented Shopify subscription support for protocols with Loop Subscriptions integration and 20% discount visual display.

#### Product Mapping Updates:
- **Balance Protocol (ID: 15528510423414)** - Fully configured with Shopify variant IDs and Loop selling plan IDs:
  - Starter: £14.99 (one-time) / £11.99 (subscription) - Variant: `56998884573558`, Selling Plan: `711429882230`
  - Pro: £39.99 (one-time) / £31.99 (subscription) - Variant: `56998884606326`, Selling Plan: `711429947766`
  - Max: £79.99 (one-time) / £63.99 (subscription) - Variant: `56998884639094`, Selling Plan: `711429980534`

#### Files Updated:
- `app/lib/shopifyProductMapping.ts` - Restructured to include `sellingPlanId` for subscription products, added `SUBSCRIPTION_DISCOUNT_PERCENT` constant
- `app/api/cart/route.ts` - Added `sellingPlanId` support for cart operations (create, add)
- `app/context/CartContext.tsx` - Updated `addToCart` to accept optional `sellingPlanId` parameter
- `app/protocol/[id]/page.tsx` - Updated `handleAddToCart` to pass selling plan ID for subscriptions
- `app/components/protocol/ProtocolHero.tsx` - Added discount visual with "Save 20%" badge and strikethrough pricing
- `app/components/protocol/TierSelector.tsx` - Added strikethrough original price display for subscription tiers
- `next.config.ts` - Added `cdn.shopify.com` to allowed image domains

#### Visual Discount Features:
- When subscription is selected:
  - Original price shown with strikethrough
  - Subscription price highlighted in green
  - "Save 20%" badge with checkmark icon
- When one-time is selected:
  - Full price displayed without strikethrough
  - No discount badge

#### Test Endpoints:
- `app/api/test-products/route.ts` - Enhanced to fetch selling plans from Shopify products

#### Note:
Products must have `availableForSale: true` in Shopify to be added to cart. Currently, Balance Protocol variants show `availableForSale: false` - inventory needs to be enabled in Shopify Admin.

---

### 15:30 - Shopify Trial Packs Cart Integration

Connected the home page Trial Packs section to the Shopify cart system.

#### Trial Pack Variant Mapping:
- **Conka Flow Trial Pack (ID: 15458243707254):**
  - 4-pack: `gid://shopify/ProductVariant/56724128203126` (£14.99)
  - 8-pack: `gid://shopify/ProductVariant/56724128235894` (£24.99)
  - 12-pack: `gid://shopify/ProductVariant/56724128268662` (£34.99)

#### Files Updated:
- `app/lib/shopifyProductMapping.ts` - Added Trial Pack variant IDs
- `app/components/TrialPacks.tsx` - Connected to cart context, add to cart functionality
- `app/components/TrialPacksMobile.tsx` - Connected to cart context, add to cart functionality
- `next.config.ts` - Added Shopify CDN to image remote patterns

---

### 14:30 - Shopify Storefront API Integration

Implemented complete Shopify Storefront API integration for headless e-commerce, including cart management, customer authentication, and Loop Subscriptions integration.

#### New Files Created:

**Shopify Core:**
- `app/lib/shopify.ts` - Storefront API client with typed helpers
- `app/lib/shopifyQueries.ts` - GraphQL queries for cart and auth operations
- `app/lib/shopifyProductMapping.ts` - Product variant ID mapping (placeholder values)

**Cart System:**
- `app/api/cart/route.ts` - Cart API endpoint (create, add, update, remove)
- `app/hooks/useCart.ts` - Cart hook with localStorage persistence
- `app/context/CartContext.tsx` - Global cart state provider
- `app/components/CartDrawer.tsx` - Unified cart drawer component

**Customer Authentication:**
- `app/api/auth/login/route.ts` - Login endpoint
- `app/api/auth/register/route.ts` - Registration endpoint with auto-login
- `app/api/auth/logout/route.ts` - Logout endpoint
- `app/api/auth/customer/route.ts` - Customer info and orders endpoint
- `app/hooks/useAuth.ts` - Auth hook with token persistence
- `app/context/AuthContext.tsx` - Global auth state provider

**Account Pages:**
- `app/account/page.tsx` - Account dashboard
- `app/account/login/page.tsx` - Login form
- `app/account/register/page.tsx` - Registration form
- `app/account/orders/page.tsx` - Order history

**Loop Subscriptions:**
- `app/lib/loop.ts` - Loop API client
- `app/api/subscriptions/route.ts` - List subscriptions endpoint
- `app/api/subscriptions/[id]/route.ts` - Subscription management (pause/resume/cancel)
- `app/api/subscriptions/[id]/skip/route.ts` - Skip next order endpoint
- `app/hooks/useSubscriptions.ts` - Subscriptions hook
- `app/account/subscriptions/page.tsx` - Subscription management UI

#### Files Updated:
- `app/layout.tsx` - Added CartProvider and AuthProvider wrappers, CartDrawer component
- `app/components/Navigation.tsx` - Updated to use cart context, added item count badge
- `app/conka-flow/page.tsx` - Integrated cart context and variant ID lookup
- `app/conka-clarity/page.tsx` - Integrated cart context and variant ID lookup
- `app/formula-01/page.tsx` - Integrated cart context and variant ID lookup
- `app/formula-02/page.tsx` - Integrated cart context and variant ID lookup
- `app/protocol/[id]/page.tsx` - Integrated cart context and variant ID lookup
- `app/quiz/results/page.tsx` - Integrated cart context and variant ID lookup
- `app/page.tsx` - Removed inline cart drawer (now global)
- `app/our-story/page.tsx` - Removed inline cart drawer
- `app/case-studies/page.tsx` - Removed inline cart drawer
- `app/ingredients/page.tsx` - Removed inline cart drawer
- `app/quiz/page.tsx` - Removed inline cart drawer

#### Architecture:
- Cart state persisted to localStorage with automatic recovery
- Customer tokens stored in localStorage with expiry validation
- API routes proxy requests to Shopify/Loop to protect credentials
- Checkout redirects to Shopify's hosted checkout (handles payments, taxes, subscriptions)

#### Setup Required:
1. Copy `.env.local.example` to `.env.local` and add credentials:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `LOOP_API_KEY`
   - `LOOP_API_SECRET`

2. Create products in Shopify Admin and update variant IDs in `app/lib/shopifyProductMapping.ts`

---

## December 30, 2025

### 15:29 - Updated Footer Logos to Use Logo Image

Updated all footer instances across the application to use the `/conka.png` logo image instead of text "conka.".

#### Files Updated:
- `app/ingredients/page.tsx` - Updated footer logo (mobile and desktop)
- `app/case-studies/page.tsx` - Updated footer logo (mobile and desktop)
- `app/protocol/[id]/page.tsx` - Updated footer logo
- `app/conka-flow/page.tsx` - Updated footer logo
- `app/conka-clarity/page.tsx` - Updated footer logo
- `app/formula-01/page.tsx` - Updated footer logo (mobile and desktop)
- `app/formula-02/page.tsx` - Updated footer logo (mobile and desktop)

All footers now consistently use the same logo image as the navigation header.

---

### 15:28 - Swapped Formula Colors Throughout Application

Swapped the colors for Conka Flow and Conka Clarity across the entire application:
- **Conka Flow (Formula 01)**: Changed from teal (#AAB9BC) to orange/amber (#f59e0b)
- **Conka Clarity (Formula 02)**: Changed from orange/amber (#f59e0b) to teal (#AAB9BC)

#### Files Updated:
- `app/lib/productData.ts` - Updated FORMULA_COLORS definition
- `app/components/ProtocolBuilder.tsx` - Updated FORMULA_COLORS and all formula color references
- `app/components/ProtocolBuilderMobile.tsx` - Updated all formula color references and gradients
- `app/components/Navigation.tsx` - Updated formula color indicators in desktop and mobile menus
- `app/components/protocol/ProtocolCalendar.tsx` - Uses FORMULA_COLORS (automatic)
- `app/components/protocol/ProtocolCalendarSectionMobile.tsx` - Updated gradients and color references
- `app/components/protocol/ProtocolHero.tsx` - Updated protocol accent colors to amber
- `app/components/protocol/ProtocolHeroMobile.tsx` - Updated protocol accent colors and tag colors
- `app/components/protocol/ProtocolCaseStudiesMobile.tsx` - Updated protocol accent colors
- `app/components/protocol/ProtocolStruggleMobile.tsx` - Updated protocol accent colors
- `app/components/protocol/ProtocolBenefits.tsx` - Updated icon colors
- `app/components/protocol/ProtocolTabs.tsx` - Updated benefit number colors
- `app/components/protocol/TierSelector.tsx` - Updated default highlight color
- `app/components/case-studies/CaseStudiesPageMobile.tsx` - Updated formula color mappings
- `app/components/case-studies/AthleteCard.tsx` - Updated formula color mappings
- `app/components/ingredients/IngredientsPageMobile.tsx` - Updated formula color indicators
- `app/components/ingredients/IngredientsPageDesktop.tsx` - Updated formula color indicators
- `app/components/quiz/QuizRecommendedSection.tsx` - Updated quiz accent colors and gradients
- `app/components/quiz/QuizResultsOverview.tsx` - Updated quiz accent colors
- `app/components/quiz/QuizProgress.tsx` - Updated progress bar colors
- `app/components/quiz/QuizLoader.tsx` - Updated loader colors
- `app/components/product/ProtocolBenefitsMobile.tsx` - Updated gradient backgrounds
- `app/components/product/StickyPurchaseFooter.tsx` - Updated subscription toggle color
- `app/components/product/PurchaseToggle.tsx` - Updated default highlight color
- `app/components/product/PackSelector.tsx` - Updated default highlight color
- `app/components/TrialPacks.tsx` - Updated icon colors
- `app/components/TrialPacksMobile.tsx` - Updated formula color indicators
- `app/components/Hero.tsx` - Updated underline decoration color

All gradients showing both formulas now correctly display amber (Flow) to teal (Clarity).

---

### 15:24 - Renamed Protocols Throughout Application

Renamed all front-facing protocol names across the application:
- **Protocol 1** → **Resilience Protocol**
- **Protocol 2** → **Precision Protocol**
- **Protocol 3** → **Balance Protocol**
- **Protocol 4** → **Ultimate Protocol**

#### Files Updated:
- `app/lib/quizData.ts` - Updated protocol names in `protocolMatchInfo`
- `app/lib/productData.ts` - Updated protocol names in `protocolContent`
- `app/components/Navigation.tsx` - Updated protocol names in mobile menu
- `app/components/ProtocolBuilder.tsx` - Updated protocol titles in `pathData`
- `app/components/product/ProtocolBenefitsMobile.tsx` - Updated protocol names array
- `app/components/protocol/ProtocolFAQ.tsx` - Updated protocol references in FAQ answers
- `app/components/protocol/ProtocolCaseStudiesMobile.tsx` - Updated protocol names in case studies
- `app/lib/caseStudiesData.ts` - Updated protocol names in athlete data

All components that dynamically display protocol names (using `protocol.name` from `protocolContent` or `matchInfo.name` from `quizData`) will automatically show the new names.

---

## December 30, 2025

### 23:00 - Updated Key Statistics with Verified Clinical Data

Updated all 16 ingredient keyStats sections to use data derived from the verified PubMed studies, replacing placeholder statistics with real research findings.

#### All keyStats Now Reference Verified Studies:

**Conka Flow (Formula 01):**
1. **Lemon Balm** - Anxiety reduction (-28%), memory (+18%), calmness (+15%) from Kennedy 2003 & 2006
2. **Turmeric** - Memory (+63%), attention (+96%), working memory (+12%) from Small 2018 & Rainey-Smith 2016
3. **Ashwagandha** - Stress score (-56%), cortisol (-28%), sleep quality (+42%) from Chandrasekhar 2012 & Salve 2019
4. **Rhodiola** - Burnout (-28%), physical fitness (+17%), mental performance (+12%) from Olsson 2009 & Spasov 2000
5. **Bilberry** - Word recall (+18%), paired learning (+22%), cognitive errors (-18%) from Krikorian 2010 & Schrager 2015
6. **Black Pepper** - Curcumin absorption (2000%), serotonin (+28%), dopamine (+35%) from Shoba 1998 & Rinwa 2013

**Conka Clarity (Formula 02):**
7. **Vitamin C** - Attention (+14%), memory (+12%), anxiety (-22%) from Travica 2017 & de Oliveira 2015
8. **Alpha GPC** - Isometric force (+14%), ADAS-Cog (-22%), MMSE (+15%) from Parker 2015 & De Jesus Moreno 2003
9. **Glutathione** - Blood GSH (+40%), NK cell activity (+100%), whole blood GSH (+35%) from Sinha 2018 & Richie 2015
10. **NAC** - Cognitive function (+22%), negative symptoms (-25%), OCD symptoms (-32%) from Berk 2008 & Oliver 2015
11. **ALCAR** - Mental fatigue (-35%), cognitive function (+24%), attention (+16%) from Malaguarnera 2008
12. **Ginkgo** - Cognition (+16%), attention (+14%), processing speed (+15%) from Laws 2012 & Kaschel 2009
13. **Lecithin** - Verbal memory (+12%), visual memory (+8%) from Poly 2011 (1,391 participants)
14. **Lemon Oil** - Positive mood (+23%), cognitive function (+18%), personal orientation (+25%) from Kiecolt-Glaser 2008 & Jimbo 2009
15. **Alpha Lipoic Acid** - Memory (+15%), oxidative stress (-22%), disease progression (-65%) from Kim 2020 & Hager 2007
16. **Vitamin B12** - Brain atrophy (-86%), atrophy reduction (-30%), high homocysteine group (-53%) from Douaud 2013 & Smith 2010

#### Format Improvements:
- Each stat now includes PMID citation for traceability
- Dosage information derived from actual study protocols
- Effect sizes based on reported outcomes from clinical trials

---

### 22:45 - Added Second Clinical Study for Each Ingredient

Added a second verified PubMed-cited clinical study for all 16 ingredients, doubling the evidence base.

#### New Studies Added:

**Conka Flow (Formula 01):**
1. **Lemon Balm** - Kennedy et al. 2003 (PMID: 12888775) - Mood and cognitive modulation via CNS receptor binding
2. **Turmeric/Curcumin** - Rainey-Smith et al. 2016 (PMID: 26878105) - Working memory improvement in older adults
3. **Ashwagandha** - Salve et al. 2019 (PMID: 32021735) - Adaptogenic and anxiolytic effects study
4. **Rhodiola rosea** - Spasov et al. 2000 (PMID: 10839209) - Student exam stress study
5. **Bilberry** - Krikorian et al. 2010 (PMID: 20047325) - Memory improvement in older adults
6. **Black Pepper/Piperine** - Rinwa & Kumar 2013 (PMID: 23268377) - Antidepressant activity via monoamines

**Conka Clarity (Formula 02):**
7. **Vitamin C** - de Oliveira et al. 2015 (PMID: 26327060) - Anxiety reduction in students
8. **Alpha GPC** - De Jesus Moreno 2003 (PMID: 12882463) - Cognitive improvement in dementia (261 participants)
9. **Glutathione** - Richie et al. 2015 (PMID: 25900085) - 6-month oral supplementation RCT
10. **NAC** - Oliver et al. 2015 (PMID: 26243567) - OCD and related disorders systematic review
11. **ALCAR** - Montgomery et al. 2003 (PMID: 12535484) - Cochrane meta-analysis of 11 RCTs
12. **Ginkgo Biloba** - Kaschel 2009 (PMID: 19395013) - Systematic review of 29 clinical trials
13. **Lecithin** - Zeisel 2012 (PMID: 22048568) - Choline's role in brain development review
14. **Lemon Essential Oil** - Jimbo et al. 2009 (PMID: 20377818) - Alzheimer's aromatherapy study
15. **Alpha Lipoic Acid** - Hager et al. 2007 (PMID: 17982897) - 48-month Alzheimer's follow-up analysis
16. **Vitamin B12** - Smith et al. 2010 (PMID: 20838622) - Brain atrophy reduction study

#### Documentation Updates:
- **`SOURCES.md`** - Now contains 32 complete citations (2 per ingredient) with full PubMed/DOI links

---

### 22:15 - Clinical Studies Verification & PubMed Citations
Replaced all 16 placeholder clinical studies on the ingredients page with real, verified PubMed-cited research.

#### Data Layer Updates (`app/lib/ingredientsData.ts`):
- **Extended `ClinicalStudyData` interface** with new fields:
  - `authors` - Study author list
  - `journal` - Publication journal name
  - `pmid` - PubMed ID for direct linking
  - `doi` - Digital Object Identifier for permanent reference

#### All 16 Ingredients Now Have Verified Studies:

**Conka Flow (Formula 01):**
1. **Lemon Balm** - Kennedy et al. 2006 (PMID: 16444660) - Anxiolytic effects study from Northumbria University
2. **Turmeric/Curcumin** - Small et al. 2018 (PMID: 29246725) - UCLA memory and brain amyloid study
3. **Ashwagandha** - Chandrasekhar et al. 2012 (PMID: 23439798) - Stress and cortisol reduction study
4. **Rhodiola rosea** - Olsson et al. 2009 (PMID: 19016404) - Stress-related fatigue treatment study
5. **Bilberry** - Schrager et al. 2015 (PMID: 25660920) - Cognitive function and mobility study
6. **Black Pepper/Piperine** - Shoba et al. 1998 (PMID: 9619120) - 2000% curcumin bioavailability study

**Conka Clarity (Formula 02):**
7. **Vitamin C** - Travica et al. 2017 (PMID: 28208784) - Systematic review of cognitive function
8. **Alpha GPC** - Parker et al. 2015 (PMID: 26500463) - Force production and cognitive performance
9. **Glutathione** - Sinha et al. 2018 (PMID: 29559699) - Liposomal glutathione and immune function
10. **NAC** - Berk et al. 2008 (PMID: 18436195) - Glutathione precursor cognitive function trial
11. **ALCAR** - Malaguarnera et al. 2008 (PMID: 18937015) - Cognitive function improvement study
12. **Ginkgo Biloba** - Laws et al. 2012 (PMID: 22628390) - Meta-analysis of 13 RCTs (2,372 participants)
13. **Lecithin** - Poly et al. 2011 (PMID: 22071706) - Framingham study on choline and cognition
14. **Lemon Essential Oil** - Kiecolt-Glaser et al. 2008 (PMID: 18295416) - Ohio State mood study
15. **Alpha Lipoic Acid** - Kim et al. 2020 (PMID: 32631710) - Memory and oxidative stress study
16. **Vitamin B12** - Douaud et al. 2013 (PMID: 23690582) - Oxford brain atrophy prevention study

#### Component Updates (`app/components/ingredients/IngredientStudies.tsx`):
- Added authors and journal display below study title
- Added citation links section with clickable PMID and DOI badges
- Links open directly to PubMed abstract and DOI resolver
- Improved visual hierarchy with author/journal metadata

#### New Documentation:
- **`SOURCES.md`** - Complete citation document with:
  - Full APA-style citations for all 16 studies
  - Direct PubMed links (https://pubmed.ncbi.nlm.nih.gov/PMID/)
  - DOI links for permanent access
  - Study design, participant counts, durations, and key findings
  - Organized by formula (Conka Flow / Conka Clarity)

---

### 21:00 - Find Your Protocol Quiz System
Created a comprehensive "Find Your Protocol" quiz feature at `/quiz` with configurable questions, weighted scoring, percentage-based results, and detailed score breakdowns.

#### New Data Layer:
- **`app/lib/quizData.ts`** - Complete quiz configuration system
  - `QuizQuestion` interface with questions, options, and weighted scoring per protocol
  - `QuizResult` interface with percentage match, total points, and question breakdowns
  - `ProtocolMatchInfo` interface with protocol descriptions and key benefits
  - 3 placeholder questions (expandable to 10) demonstrating the scoring system
  - `calculateQuizResults()` function computing percentages for all 4 protocols
  - `getRecommendedProtocol()` helper for top match
  - Each question includes a `measures` field explaining what it assesses

#### New Components (`app/components/quiz/`):
- **`QuizQuestion.tsx`** - Individual question display
  - Question counter (1 of X format)
  - Question text with optional subtitle
  - 3 answer options (Yes/Sometimes/No) with icons
  - Selected state with visual feedback
  - Large touch targets for mobile

- **`QuizProgress.tsx`** - Bottom progress bar and navigation
  - Visual progress bar showing completion percentage
  - Previous/Next buttons with disabled states
  - Step indicator dots
  - "See Results" button on final question

- **`QuizLoader.tsx`** - Pre-results loading animation
  - Circular progress ring with percentage
  - 3-stage loading messages (Analyzing, Calculating, Finding)
  - Animated brain icon transitioning to checkmark
  - Smooth transition to results page

- **`QuizResultsOverview.tsx`** - Results summary for all protocols
  - All 4 protocols with percentage match bars
  - "RECOMMENDED" badge on top match
  - Expandable score breakdown per protocol
  - Click to view detailed breakdown
  - Scroll prompt to recommended section

- **`QuizScoreBreakdown.tsx`** - Detailed scoring explanation
  - Question-by-question breakdown
  - Shows user's answer and points awarded
  - Max points possible per question
  - Total score with percentage
  - Explains what each question measures

- **`QuizRecommendedSection.tsx`** - Dynamic product section
  - Based on selected/top-matched protocol
  - Protocol icon and description
  - "Why this protocol?" explanation
  - Key benefits with checkmarks
  - Week 1 calendar preview
  - Tier and purchase type selectors
  - Pricing with billing frequency
  - "Add to Cart" and "Learn More" CTAs
  - 100-day guarantee badge

#### New Pages:
- **`app/quiz/page.tsx`** - Main quiz flow
  - Step-by-step question navigation
  - Answer state management
  - Stores answers in sessionStorage
  - Loading transition before results

- **`app/quiz/results/page.tsx`** - Results page
  - Loads answers from sessionStorage
  - Calculates and displays all protocol matches
  - Expandable score breakdowns
  - Dynamic recommended section based on selection
  - Sticky purchase footer (appears when scrolling)
  - Retake quiz option
  - Full cart drawer integration

#### Scoring System:
- Each question awards points to protocols based on answers
- Example: "Do you experience brain fog?"
  - Yes: +3 to Protocol 2 (Clarity focused)
  - Sometimes: +2 to Protocol 2, +2 to Protocol 3
  - No: +2 to Protocol 1 (Flow focused)
- Percentages calculated as: (earned points / max possible) × 100
- Results sorted by percentage, ties favor lower protocol number

#### Reused Components:
- `StickyPurchaseFooter` / `StickyPurchaseFooterMobile` for cart integration
- `Navigation` for consistent header
- `useIsMobile` hook for responsive behavior

---

### 18:30 - Our Story Page (Immersive Scroll Experience)
Created a dedicated "Our Story" page at `/our-story` featuring an immersive, TikTok-style scroll-snap experience that tells the Conka founders' journey through 10 narrative sections.

#### New Data Layer:
- **`app/lib/storyData.ts`** - Complete story data
  - 6 hero stats: 2 Founders, £500K+ Research, 100+ Prototypes, 25+ Clinical Trials, 1 Patented Formula, 1 Cognitive App
  - 10 story sections with alternating light/dark themes
  - Each section includes: headline, subtitle, body text, optional founder quote, image placeholder
  - Teams that have tested CONKA list
  - Research stats (cognitive improvements by gender)

#### New Components (`app/components/our-story/`):
- **`OurStoryHero.tsx`** - Landing section with key brand stats
  - Large "Our Story" headline with subtitle
  - 6-stat grid showing company achievements
  - Animated scroll indicator to begin journey

- **`StorySection.tsx`** - Reusable section component
  - Section counter (01/10 format)
  - Headlines with parallax effect
  - Founder quotes with styled blockquotes
  - Alternating image placement (left/right based on section)

- **`StoryProgress.tsx`** - Desktop navigation dots
  - Fixed position on right side
  - Click to jump to any section
  - Active state indicator
  - Adapts color based on current section theme

- **`OurStoryDesktop.tsx`** - Full desktop experience
  - Scroll-snap container with smooth transitions
  - Section tracking for progress indicator
  - Final CTA section with product links

- **`OurStoryMobile.tsx`** - Mobile-optimized experience
  - Simplified hero with 4 key stats
  - Touch-friendly scroll-snap
  - Bottom progress dots indicator
  - Stacked layout with full-width images

#### New CSS Utilities (`globals.css`):
- `.story-scroll-container` - Scroll-snap parent with hidden scrollbar
- `.story-section` - Full-viewport snap sections
- `.story-light` / `.story-dark` - Theme variants
- `.story-progress-dot` - Navigation dot styling
- `.animate-bounce-slow` - Gentle scroll indicator animation
- `.animate-fade-in-up` - Content entrance animation
- `.stagger-1/2/3/4` - Animation delay classes
- `.story-quote` - Quote styling with decorative quote mark

#### New Page:
- **`app/our-story/page.tsx`** - Main story page
  - Responsive desktop/mobile rendering
  - Fixed navigation header
  - Cart drawer integration

#### Navigation Updates:
- Updated "Our Story" links in Navigation.tsx from `/#story` to `/our-story`
- Updated footer link in page.tsx to point to new dedicated page

#### The 10 Story Sections:
1. Where It All Began - University, teammates, shared drive
2. The Spark - Concussion injury, 8-month PCS recovery (with founder quote)
3. Breakthrough Discovery - Durham University research, lifespan extension
4. Parallel Paths - Harry's 2021 Olympics with Team GB
5. Half a Million in Research - £500K neuroscience investment
6. Building the Technology - Cambridge partnership, ICA cognitive testing
7. Reinventing Extraction - Alcohol-free formula, Dr. Katekhaye
8. Pro Sport Validation - First clinical trial, 16% brain performance increase
9. The Second Formula - Elite team testing, dual-formula development
10. The Journey Continues - Summary and CTA

---

### 16:45 - Case Studies Page
Created a comprehensive Case Studies page at `/case-studies` showcasing athlete performance improvements using the Conka App, with detailed performance metrics, sport filtering, and featured athletes section.

#### New Data Layer:
- **`app/lib/caseStudiesData.ts`** - Comprehensive athlete database
  - 11 athletes across 10 sports: Football, Tennis, Esports, Running, Chess, Golf, Boxing, Business, Cycling, Swimming, Creative
  - Each athlete includes: name, sport, profession, achievement, description, quote, product version, protocol used
  - Performance data: baseline metrics, results, improvements with percentages
  - Featured flag for highlighting key case studies
  - Sport category types with display info
  - Helper functions: `getAthleteById()`, `getFeaturedAthletes()`, `getAthletesBySport()`, `getAllSports()`

#### New Components (`app/components/case-studies/`):
- **`CaseStudiesPageDesktop.tsx`** - Desktop layout with sidebar and main content
  - Featured athletes section at top with horizontal cards
  - Sticky sidebar with sport filtering and athlete list
  - Full athlete detail view with stats, quote, and performance charts
  - Summary stats (total athletes, tests completed, average improvement)

- **`CaseStudiesPageMobile.tsx`** - Mobile layout with horizontal filter and swipe cards
  - Horizontal scrolling sport filter bar
  - Featured athletes carousel
  - Single athlete card view with navigation
  - "View Full Case Study" expanded detail view
  - Swipe navigation with dot indicators

- **`AthleteSidebar.tsx`** - Desktop sidebar component
  - Sport filter pills with counts
  - Scrollable athlete list with active state
  - Preview of top improvement stat per athlete

- **`AthleteFilterBar.tsx`** - Mobile horizontal filter component
  - Horizontally scrolling sport category pills
  - Sport icons and counts

- **`AthleteCard.tsx`** - Full athlete profile display
  - Photo placeholder with sport icon
  - Product version badge (Conka Flow, Clarity, or both)
  - Protocol used indicator
  - Quote section with styling
  - Integrated AthleteStats component

- **`AthleteStats.tsx`** - Performance metrics visualization
  - Key improvements grid with progress bars
  - Baseline vs Results comparison chart
  - Tests completed and duration display

- **`FeaturedAthletes.tsx`** - Featured section for homepage display
  - 4-column grid of featured athlete cards
  - Key stat highlight per athlete

- **`SportIcon.tsx`** - SVG icons for each sport category
  - 12 custom icons: Football, Tennis, Golf, Running, Cycling, Swimming, Boxing, Esports, Chess, Business, Creative, Other

#### New Page:
- **`app/case-studies/page.tsx`** - Main case studies page
  - Responsive desktop/mobile rendering
  - Full navigation and footer
  - Cart drawer integration

#### Design Patterns:
- Follows neo-brutalist style guide matching ingredients page
- Uses `neo-box`, `neo-box-inverted` for cards
- Uses `font-clinical` for data, `font-commentary` for quotes
- Sport icons in consistent SVG style
- Emerald/green accent color for improvements
- Mobile horizontal scroll with `scrollbar-hide` utility

---

### 14:30 - Ingredients Deep-Dive Page
Created a comprehensive, interactive ingredients page at `/ingredients` showcasing all ingredient research, benefits, clinical studies, and formula composition with distinct desktop and mobile experiences.

#### New Data Layer:
- **`app/lib/ingredientsData.ts`** - Comprehensive ingredient database
  - 6 ingredients for Conka Flow (Lemon Balm, Turmeric, Ashwagandha, Rhodiola rosea, Bilberry, Black Pepper)
  - 10 ingredients for Conka Clarity (Vitamin C, Alpha GPC, Glutathione, NAC, ALCAR, Ginkgo Biloba, Lecithin, Lemon Oil, ALA, B12)
  - Each ingredient includes: scientific name, category, percentage, mechanism of action, key stats, benefits, clinical studies, safety profile, synergies
  - Helper functions: `getIngredientsByFormula()`, `getIngredientById()`, `getAllIngredients()`
  - Category info with colors for visual identification

#### New Components (`app/components/ingredients/`):
- **`IngredientsPageDesktop.tsx`** - Desktop layout with split-view
  - Left side: Sticky ingredient image with percentage badge, chemical structure placeholder
  - Right side: Scrollable content with header, stats, mechanism, benefits, studies, safety
  - Horizontal pill navigation for ingredient switching
  
- **`IngredientsPageMobile.tsx`** - Mobile layout with horizontal swipe carousel
  - Top formula toggle (Conka Flow / Conka Clarity)
  - Horizontal scrolling ingredient cards with images and percentages
  - Long-form vertical scroll for selected ingredient details
  - All sections adapted for mobile reading

- **`IngredientCarousel.tsx`** - Horizontal swipe carousel for mobile ingredient selection
  - Auto-scrolls to active ingredient
  - Gradient fade edges for scroll indication
  - "Swipe to explore" hint

- **`IngredientSelector.tsx`** - Desktop pill navigation
  - Color-coded category dots
  - Active state with inverted colors
  - Percentage badges on each pill

- **`IngredientStats.tsx`** - 4-column grid of key statistics
  - Large numbers with clinical font
  - Source attribution for each stat

- **`IngredientBenefits.tsx`** - Accordion-style benefits
  - Icon mapping for 14+ benefit types
  - Expandable descriptions

- **`IngredientStudies.tsx`** - Clinical studies section
  - Expandable study cards with metadata
  - Participant count, duration, significance (P-value)
  - Integrated bar charts for results visualization

- **`StudyBarChart.tsx`** - Recharts bar chart component
  - Baseline vs Result grouped bars
  - Clinical styling matching site aesthetic

#### New Page:
- **`app/ingredients/page.tsx`** - Main ingredients page
  - Formula toggle between Conka Flow and Conka Clarity
  - Responsive desktop/mobile rendering
  - Full navigation and footer
  - Cart drawer integration

#### Design Patterns:
- Follows neo-brutalist style guide with `neo-box`, `neo-box-inverted`
- Uses `font-clinical` for data, `font-commentary` for annotations
- Formula colors: Teal for Flow, Amber for Clarity
- Category colors: Adaptogen (emerald), Nootropic (purple), Vitamin (orange), Amino Acid (blue), Antioxidant (red)
- Mobile horizontal scroll with `scrollbar-hide` utility

---

### 10:46 - Product Renaming: Formula 01/02 → Conka Flow/Clarity
Comprehensive renaming of all product references throughout the application.

#### Changes:
- **Display Names**: Renamed "Formula 01" → "Conka Flow" and "Formula 02" → "Conka Clarity" across all user-facing text
- **URLs**: Updated routes from `/formula-01` → `/conka-flow` and `/formula-02` → `/conka-clarity`
- **CSS Classes**: Renamed theme classes from `theme-formula-01` → `theme-conka-flow` and `theme-formula-02` → `theme-conka-clarity`
- **Variable Names**: Updated internal variables:
  - `formula01Count` → `conkaFlowCount`
  - `formula02Count` → `conkaClarityCount`
  - `isPrimaryFormula01` → `isPrimaryConkaFlow`
- **Function Names**: Renamed page components:
  - `Formula01Page` → `ConkaFlowPage`
  - `Formula02Page` → `ConkaClarityPage`
- **Directories**: Renamed route directories:
  - `app/formula-01/` → `app/conka-flow/`
  - `app/formula-02/` → `app/conka-clarity/`

#### Files Updated:
- All component files, page files, and data files
- Style guide documentation files
- Global CSS theme classes

---

## December 28, 2025

### 20:00 - Homepage Product Slideshow (Mobile)
Added product image slideshow component to homepage in two locations: below hero section and between TrialPacks and Founders section.

#### New Component:
- **`ProductSlideshowMobile.tsx`** - Horizontal scrolling product image carousel
  - Extracted from ProtocolBenefitsMobile component
  - Shows 3 placeholder product images with labels
  - Edge-to-edge horizontal scroll with hidden scrollbar
  - Only visible on mobile viewports (hidden on desktop with `md:hidden`)

#### Files Updated:
- `app/page.tsx` - Added ProductSlideshowMobile component in two locations:
  1. Between Hero and KeyBenefits sections
  2. Between TrialPacks and Founders (Story Behind Conka) sections
- `app/components/ProductSlideshowMobile.tsx` - New standalone component created

---

### 19:15 - Mobile Navigation Cart & Checkout Buttons
Reorganized mobile navigation to move cart functionality into the menu.

#### Changes:
- Removed cart icon from mobile header (kept on desktop only)
- Mobile header now shows only the hamburger menu icon
- Replaced sticky cart footer with full Cart & Checkout section:
  - "View Cart" button (outline style with cart icon)
  - "Checkout" button (filled style with credit card icon)
  - Both buttons side-by-side, full width
  - Black border-top divider
  - Consistent padding and styling with rest of nav

---

### 19:00 - Tagline Styling & Marketing Copy Update
Improved hero taglines and updated protocol subtitles to marketing speak.

#### Styling Updates:
- Tagline text increased from `text-sm` to `text-base`
- Reduced margin from `mt-1` to `mt-0.5` for tighter spacing
- Increased opacity from `80` to `90` for better readability
- Applied to both `ProductHeroMobile` and `ProtocolHeroMobile`

#### Protocol Subtitles (Marketing Taglines):
- Protocol 1: "Build Resilience, Stay Sharp" (was "Formula 01 Daily • Formula 02 Weekly")
- Protocol 2: "Peak Cognition, Zero Burnout" (was "Formula 02 Daily • Formula 01 Weekly")
- Protocol 3: "The Best of Both Worlds" (was "Formula 01 & Formula 02 Balanced")
- Protocol 4: "Maximum Power, Every Day" (was "The Ultimate Protocol")

---

### 18:45 - Protocol Key Benefits Styling & Sticky Footer
Enhanced the protocol overview section and fixed sticky footer border.

#### Protocol Key Benefits:
- Added icons to each benefit tag (checkmark, shield, bolt, target)
- Added accent colors alternating teal and amber
- Added "About this Protocol" label before the description paragraph

#### Sticky Footer:
- Changed border from `border-black/20` (gray) to `border-black` (solid black)

---

### 18:30 - Updated Hero & Protocol Images
Replaced placeholder images with main.jpg across key pages.

#### Files Updated:
- `Hero.tsx`: Changed hero image from `/3.png` to `/main.jpg`
- `ProtocolHeroMobile.tsx`: Changed from `/protocol.png` to `/main.jpg`
- `ProtocolHero.tsx`: Changed from `/protocol.png` to `/main.jpg`

---

### 18:15 - Protocol 4 Diagonal Split & Case Studies
Enhanced Protocol 4 calendar display and added protocol-specific case studies.

#### Protocol 4 Calendar Enhancement:
- Days now show diagonal split (blue/teal on left, orange on right)
- Uses CSS `linear-gradient(135deg, #AAB9BC 50%, #f59e0b 50%)` for smooth diagonal
- Legend updated to show "Both Daily" swatch for Protocol 4
- Other protocols still show individual colors + Rest

#### New Component: `ProtocolCaseStudiesMobile.tsx`
Protocol-specific social proof section:
- 2 athletes per protocol with relevant achievements
- Protocol 1: Sarah Okonkwo (Rugby), David Chen (Marathon)
- Protocol 2: James Torres (Esports), Emma Williams (Chess)
- Protocol 3: Marcus Chen (Swimming), Lisa Park (CrossFit)
- Protocol 4: Alex Rodriguez (F1), Nina Volkov (Poker)
- Each card shows: name, sport, protocol tier, quote, key results
- Prev/next navigation with dot indicators
- Teal accent color matching protocol branding

---

### 18:00 - Protocol Page UX Improvements
Multiple enhancements to the protocol mobile experience.

#### ProtocolHeroMobile Updates:
- Fixed Subscribe/One-Time button sizing: Added `whitespace-nowrap` and `flex-shrink-0` to prevent button resizing on different viewports
- Added "Key Benefits" label above the tags in overview tab
- Ensured at least 4 tags display for visual balance (adds extra tags from pool if needed)

#### New Component: `ProtocolCalendarSectionMobile.tsx`
Persistent calendar section below the struggle selector with full month view:
- 4-week calendar grid with color-coded formula days
- Formula legend (F01 = teal, F02 = amber, Rest = gray)
- Tier selector (Starter/Pro/Max buttons)
- Purchase toggle (Subscribe/One-time)
- Pricing display with billing frequency
- Full-width "Add to Cart" button with cart icon
- 100-day guarantee badge

---

### 17:45 - Protocol Page Struggle Section & Legend Removal
Added struggle selector to protocol pages and removed unnecessary legend.

#### Changes:
- Removed "Formula 01 / Formula 02" legend overlay from ProtocolHeroMobile (not needed)
- Created new `ProtocolStruggleMobile.tsx` component with:
  - 6 protocol-specific struggles: Performance, Stress, Energy, Focus, Recovery, Consistency
  - Teal accent color to match protocol branding
  - Solution cards with stats, descriptions, and key benefits
  - Protocol-specific benefits pulled from data
  - Same progressive disclosure pattern as FormulaBenefitsMobile
- Added ProtocolStruggleMobile to protocol/[id]/page.tsx mobile view

---

### 17:30 - Image Carousel in Protocol Benefits Section
Added visual interest with a horizontal scrolling image carousel placeholder.

#### Changes:
- Added 3-image horizontal scroll carousel above "Double Your Benefits" header
- Placeholders with gradient backgrounds matching formula colors:
  - Product Lifestyle (neutral)
  - Both Formulas (teal/Formula 01)
  - In Action (amber/Formula 02)
- Edge-to-edge scrolling with inner padding for cards
- Rounded corners and subtle borders on each card

---

### 17:15 - Mobile Navigation Menu Reorganization
Reordered mobile menu to prioritize conversion-focused actions at the top.

#### New Order:
1. **Find Your Protocol** (RECOMMENDED) - Now at the very top
2. **Shop Protocols** - 2x2 grid of protocols
3. **Individual Formulas** - Formula 01 & 02
4. **Navigation** - The Science, Ingredients, Results, Our Story (moved to bottom)

---

### 17:00 - Consistent Footer Across Product Pages
Updated all product page mobile footers to match the homepage footer design.

#### Footer Updates:
- Logo with hover effect
- Mini navigation: The Science, Ingredients, Results, Our Story
- "built with love" tagline
- Two CTA buttons: "Find Your Protocol" (with question icon) and "Buy Conka" (with cart icon)
- 100-day money-back guarantee badge with shield icon

#### Pages Updated:
- `formula-01/page.tsx`
- `formula-02/page.tsx`
- `protocol/[id]/page.tsx`

---

### 16:45 - New Protocol Benefits & Case Studies Sections
Added two new mobile sections to formula product pages for better conversion flow.

#### New Component:
- **`ProtocolBenefitsMobile.tsx`** - "Double Your Benefits" section
  - Header explaining standalone vs combined benefits
  - Visual comparison: "Alone = Effective" → "Combined = Powerful"
  - 3-stat grid showing combined results (2.3x effect, 47% faster, 8+ hrs duration)
  - 2x2 protocol grid with icons, names, taglines, and descriptions
  - Link to explore the other formula

#### Page Updates:
- Replaced "Want the Complete Experience?" section with new components
- Added `CaseStudiesMobile` component for social proof
- Athletes data imported (Marcus Chen, Sarah Okonkwo, James Torres)
- Both formula-01 and formula-02 pages updated

---

### 16:15 - Sticky Footer & Benefits Section Polish
Enhanced the mobile sticky footer and fixed FormulaBenefitsMobile component.

#### Sticky Footer Updates:
- Added top border divider (2px black/20%)
- Button now always says "Add to Cart" (no dynamic text)
- Added billing frequency below price (e.g., "Billed weekly")
- Added vertical divider line between price and button sections
- Added cart icon to the button
- Added "100-day guarantee" badge with shield icon below button
- Slightly larger footer to accommodate new elements

#### FormulaBenefitsMobile Fixes:
- Fixed runtime error: `participants` is an object, now accessing `participants.total`
- Header now centered with larger text (2xl)
- Subtext increased to base size
- Reduced top padding to bring section closer to hero card

#### Layout Adjustments:
- ProductHeroMobile and ProtocolHeroMobile bottom padding reduced
- Footer sections on all product pages now have extra bottom padding (pb-28) for sticky footer clearance

---

### 15:45 - Product Pages Mobile v2 Overhaul
Fixed key issues and added missing sections for complete mobile experience.

#### Fixes:
- **Sticky Footer:** Now always visible from landing (removed scroll-based visibility)
- **Accent Color Changes:** Header now changes color when toggling Subscribe/One-Time
  - Formula 01: Dark header (subscribe) → Light with black border (one-time)
  - Formula 02: Dark header (subscribe) → Amber header (one-time)
  - Protocols: Dark header (subscribe) → Teal header (one-time)
- **Toggle Buttons:** Colors adapt to header background context

#### New Component:
- **`FormulaBenefitsMobile.tsx`** - "What do you struggle with?" section
  - 2x3 grid for struggle selection (Sleep, Energy, Crashing, Stress, Anxiety, Focus)
  - Solution card appears when struggle selected with:
    - Primary stat and stat label
    - Description text
    - Key ingredients tags
    - Collapsible clinical study details
  - Progressive disclosure pattern

#### Files Updated:
- `StickyPurchaseFooterMobile.tsx` - Always visible, no dismiss button
- `ProductHeroMobile.tsx` - Header color transitions, toggle button styling
- `ProtocolHeroMobile.tsx` - Header color transitions, toggle button styling
- `formula-01/page.tsx` - Added FormulaBenefitsMobile section
- `formula-02/page.tsx` - Added FormulaBenefitsMobile section
- `app/components/product/index.ts` - Exported FormulaBenefitsMobile

---

### 14:30 - Product Pages Mobile Optimization
Complete mobile optimization for Formula and Protocol product pages with dedicated mobile components.

#### New Components Created:
- **`StickyPurchaseFooterMobile.tsx`** - Simplified single-row sticky footer
  - Always visible from landing
  - Shows price + single CTA button
  - Much cleaner than desktop multi-row version

- **`ProductHeroMobile.tsx`** - Mobile hero for Formula pages (01 & 02)
  - All-in-one card layout with embedded image
  - Tabbed content (Info, Benefits, Ingredients, Taste)
  - Benefits tab has collapsible detail sections
  - Integrated pack selector (3-column grid)
  - Selection summary with pricing and trust badges
  - Inline CTA button

- **`ProtocolHeroMobile.tsx`** - Mobile hero for Protocol pages
  - Tabbed content (Overview, Schedule, Benefits, FAQ)
  - Schedule tab features 1-week calendar with "View Full Month" expand
  - Formula legend overlay on product image
  - Tier selector (horizontal buttons)
  - FAQ with collapsible Q&A sections
  - Inline CTA button

#### Files Updated:
- **`formula-01/page.tsx`** - Conditional mobile/desktop rendering
- **`formula-02/page.tsx`** - Conditional mobile/desktop rendering
- **`protocol/[id]/page.tsx`** - Conditional mobile/desktop rendering

#### Key Mobile Design Patterns:
1. **Single Card Layout:** All product info in one scrollable card
2. **Tabbed Information:** Info, Benefits, Ingredients, Taste/Schedule tabs
3. **Progressive Disclosure:** Collapsible sections within tabs
4. **Simplified Footer:** Compact "Other Protocols" and "Individual Formulas" CTAs
5. **Sticky Purchase Footer:** Appears on scroll, dismissable
6. **Conversion-First:** Optimized for social media traffic quick conversion

#### Index Exports Updated:
- `app/components/product/index.ts` - Added ProductHeroMobile, StickyPurchaseFooterMobile
- `app/components/protocol/index.ts` - Added ProtocolHeroMobile

---

### 11:37 - FAQ Button Styling Update
Restyled the FAQ category buttons to match the site's consistent button styling.

#### Changes:
- **Padding:** Reduced from `px-5 py-4` to `px-4 py-2` (slimmer)
- **Shape:** Changed from `rounded-full` to `rounded-lg`
- **Layout:** Changed from vertical (icon above text) to horizontal (icon beside text)
- **Icon Size:** Reduced from `w-6 h-6` to `w-4 h-4`
- **Border:** Changed to `border-current/30` with hover state `border-current/60`
- **Gap:** Container gap reduced from `gap-4` to `gap-2`

---

### 11:36 - Mobile Optimization Documentation
Created comprehensive documentation capturing all mobile optimization lessons and patterns.

#### New File:
- **`docs/MOBILE_OPTIMIZATION.md`** - Guide for mobile optimization patterns

#### Contents:
- Core principles (component splitting, visual hierarchy, progressive disclosure)
- Component patterns (sticky footers, accordions, selection grids, carousels)
- Button styling guidelines
- Typography and spacing rules
- Image guidelines (when to include/exclude)
- Navigation structure
- Footer design
- Checklist for new mobile components
- Product page optimization notes

---

### 11:26 - Footer Redesign - Minimal & Consistent Styling
Redesigned the homepage footer to match the navigation styling with a cleaner, more minimal layout.

#### Changes:
- **Top Divider Line:** Added `border-t-2` to match header styling
- **Removed:** Patent #, clinical trials, research spend text
- **Removed:** "ready to unlock your potential?" text
- **Nav Links:** Changed from text-sm to text-xs for consistency
- **Two CTA Buttons:**
  - "Find Your Protocol" - outline button with question mark icon, links to `/quiz`
  - "Buy Conka" - filled button with cart icon, anchor link to `#protocols`
- **Protocol Anchor:** Added `id="protocols"` wrapper around ProtocolBuilder component
- **Guarantee Text:** Made smaller and more subtle (text-xs, opacity-50)
- **Overall:** Cleaner spacing (py-12 vs py-16, gap-8 vs gap-12)

---

### 11:17 - Mobile Trial Packs - Collapsible Sticky Footer
Enhanced the sticky footer to be collapsible and appear only after pack selection.

#### Behavior Changes:
- **No default footer** - Footer is hidden by default (not shown until user action)
- **Appears on selection** - Footer slides up with animation when user selects a pack size
- **Dismissable** - Added X close button in top-right corner to dismiss footer
- **Re-openable** - Selecting a different pack or re-selecting a pack re-opens the footer
- **Selection persists** - Pack selection remains highlighted even after dismissing footer

#### Technical Updates:
- Added `showFooter` state to control footer visibility
- `selectedPack` now starts as `null` instead of default "4"
- Added `handlePackSelect()` function to set both pack and show footer
- Dynamic bottom padding: `pb-40` when footer visible, `pb-12` when hidden
- Added CSS `@keyframes slide-up` animation in `globals.css`

---

### 11:12 - Mobile Trial Packs Optimization
Created a mobile-optimized Trial Packs component matching the product page styling patterns.

#### New Components:
- **`app/components/TrialPacksMobile.tsx`** - Mobile-optimized trial pack selection

#### Mobile Component Features:
- **Header Section:**
  - Left-aligned "not ready for a protocol?" subtitle and "try our trial packs" heading
  - Side-by-side Formula 01/02 toggle buttons with selected state styling
  - Formula info label with color indicator (teal/amber)

- **Product Image:**
  - Centered product bottle image that changes based on selected formula
  - Uses `/1.png` for Formula 01 and `/2.png` for Formula 02

- **Pack Size Selection:**
  - 3-column grid for 4-pack / 8-pack / 12-pack options
  - Each button shows pack size and price
  - Selected state with inverted colors (black background)

- **Collapsible Details:**
  - "What's in Formula 01/02?" accordion
  - Shows formula description and key benefits with checkmark icons

- **Sticky Purchase Footer (Product Page Styling):**
  - Fixed at bottom with shadow for visual separation
  - Product info row: color indicator, pack/formula label, per-shot price
  - Price display with "+ Free Shipping" text
  - Split action buttons:
    - "Learn More" outline button → links to formula page
    - "Add to Cart" filled button with cart icon

#### Pricing Data:
- Added per-shot pricing: £3.75/shot (4-pack), £3.12/shot (8-pack), £2.92/shot (12-pack)

#### Integration:
- Updated `TrialPacks.tsx` wrapper to use `useIsMobile` hook
- Conditionally renders `TrialPacksMobile` on mobile viewports (<1024px)
- Desktop version remains unchanged

---

### 10:58 - Mobile Protocol Selector Implementation
Created a mobile-optimized Protocol Selector component with progressive disclosure pattern for all 4 protocols.

#### New Components:
- **`app/components/ProtocolBuilderMobile.tsx`** - Full mobile-optimized protocol selection and detail view

#### Protocol 4 (Ultimate) Addition:
- Added new Protocol 4 "Ultimate" path with both formulas daily
- Ultimate pricing: £59.99 bi-weekly (Pro), £99.99 monthly (Max)
- Only Pro and Max tiers available (no Starter for Ultimate)
- Calendar shows gradient cells for "both formulas" days

#### Mobile Component Features:
- **Protocol Selection View:**
  - 4 horizontal-scroll protocol pills with swipe indicator
  - Each pill shows icon, protocol name, and subtitle
  - Formula 01/02 color legend

- **Expanded Protocol Detail View:**
  - Back button with protocol name and subtitle
  - Black header bar with formula legend, shots/week count, and pricing
  - Tier toggle (Starter/Pro/Max) - dynamically shows only available tiers
  - 1-week calendar sample with color-coded days:
    - Teal (#AAB9BC) for Formula 01
    - Amber for Formula 02
    - Gradient for both formulas (Protocol 4)
    - Gray border for rest days
  - Collapsible accordion sections:
    - "Why This Path Works" - description + benefits list
    - "What's Included" - shots per week breakdown per formula
    - "View Full Month" - expandable 4-week calendar grid
  - "Best For" tags display
  - Quick protocol switch buttons
  - **Sticky CTA footer** - always visible with pricing and "Subscribe Now" button

#### Desktop Updates:
- Updated ProtocolBuilder.tsx to show all 4 protocols in grid
- Changed grid from 3-column to 4-column layout
- Updated calendar to handle "both" formula display with gradient
- Exported types and data for mobile component reuse

#### Data Layer Updates:
- Added `ultimateTiers` for Protocol 4 tier data
- Added `ultimatePricingData` for Protocol 4 pricing
- Extended `PathInfo` interface with `isUltimate` and `availableTiers`
- Exported all types and data objects for component sharing

---

### 10:35 - Mobile Navigation Polish
Improved the mobile navigation menu to match desktop styling and improve UX.

#### Changes to `app/components/Navigation.tsx`:
- **Sticky cart footer**: Cart button now always visible at bottom of menu
- **2x2 nav links grid**: "The Science", "Ingredients", "Results", "Our Story" now in grid with matching desktop icons
- **Find Your Protocol CTA**: Larger styling with RECOMMENDED tag, black background matching desktop dropdown
- **Scrollable content area**: Menu content scrolls independently of sticky footer
- **Consistent styling**: Icons and text sizes now match desktop navigation
- **Section labels**: Added "mixed plans" and "order individually" subtitles

#### Visual Improvements:
- Navigation links now have subtle borders and icons for consistency
- Quiz CTA prominently displayed with green RECOMMENDED badge
- Cart button always accessible without scrolling

---

### 10:29 - Case Studies Mobile Optimization
Created a simplified mobile version of the Case Studies section with single-profile view and navigation controls.

#### New Components:
- **`app/components/CaseStudies.tsx`** - Wrapper component with useIsMobile conditional rendering
- **`app/components/CaseStudiesDesktop.tsx`** - Full carousel with 75%/25% split view
- **`app/components/CaseStudiesMobile.tsx`** - Simplified single-profile view

#### Mobile Component Features:
- **Single profile card**: One athlete visible at a time
- **Athlete photo placeholder**: Full-width with dashed border
- **Name + Sport**: Left-aligned, bold name with sport title
- **Protocol section**: Label + protocol description
- **Quote**: Commentary font with italic styling
- **Black navigation footer**: Previous/Next arrows with position indicator (1/3)
- **Dot indicators**: Quick navigation with active state highlighting
- **Smooth navigation**: Wrap-around prev/next with circular navigation

#### UX Improvements:
- Simplified from complex carousel to clean single-card view
- Easy forward/backward navigation with clear position feedback
- Reduced cognitive load by focusing on one athlete at a time
- Dot indicators allow direct jump to any athlete

---

### 10:25 - Ingredients & Taste Mobile Optimization
Created a mobile-exclusive version of the Ingredients & Taste section with formula toggle and no image.

#### New Components:
- **`app/components/Ingredients.tsx`** - Wrapper component with useIsMobile conditional rendering
- **`app/components/IngredientsDesktop.tsx`** - Desktop version with image and neo-box styling
- **`app/components/IngredientsMobile.tsx`** - Mobile-optimized component

#### Mobile Component Features:
- **Left-aligned header**: "Ingredients & Taste" with "what's inside" subtitle
- **Slim toggle buttons**: Side-by-side Formula 01 / Formula 02 pills
- **Black title bar**: Formula name with patent or tagline
- **Full-width ingredients table**: Proper spacing with right-aligned percentages
- **Taste info**: "tastes like" with flavor name
- **2x2 benefits grid**: Antioxidant Heavy, Zero Calories, No Caffeine, Vegan Friendly
- **No image on mobile**: Focus on the ingredients table

#### page.tsx Cleanup:
- Removed unused `formulaContent` constant (data now in Ingredients component)
- Removed `activeFormula` state (now managed internally)
- Removed `Image` import (no longer needed)
- Replaced 140+ line inline section with single `<Ingredients />` component

---

### 10:15 - KeyBenefits Mobile Optimization
Created a fully mobile-optimized version of the KeyBenefits section with responsive component architecture.

#### New Architecture:
- **`app/hooks/useIsMobile.ts`** - Custom hook for viewport detection at lg breakpoint (1024px)
- **`app/components/KeyBenefitsDesktop.tsx`** - Extracted desktop version with full image support
- **`app/components/KeyBenefitsMobile.tsx`** - New mobile-optimized component
- **`app/components/KeyBenefits.tsx`** - Wrapper component for conditional rendering

#### Mobile Component Features:
- **Horizontal scroll carousel** for benefit pills with snap scrolling
- **Scroll indicators** - Dot indicators showing current position + "swipe for more" text
- **Fade gradients** on edges to indicate more content available
- **Collapsible clinical studies** - Accordion-style toggle to show/hide clinical research data
- **Left-aligned header** and **right-aligned statistics** for visual hierarchy contrast
- **Larger radar chart** taking full width with proper label margins (no cutoff)
- **Slimmer benefit pills** for sleek mobile appearance
- **No product image** on mobile (desktop only) - focused on radar chart as primary visual

#### CSS Utilities Added:
- `.scrollbar-hide` utility class in `globals.css` for hidden scrollbars on carousels

#### RadarChart Updates:
- Increased margins from 50px to 60px to prevent label cutoff
- Reduced outer radius to 60% for better label spacing

---

## December 9, 2025

### 16:00 - Formula 02 Theme Update: Dark to Light Mode
Converted Formula 02 page from dark mode to light mode to maintain consistent white background across the entire site.

#### Changes Made:
- Updated CSS theme: `.theme-formula-02` now uses white background and black foreground (matching Formula 01)
- Updated all product components to use light mode styling:
  - `SolutionSlide.tsx` - Removed dark background, now uses light gray background
  - `StruggleSelector.tsx` - Updated button styles for light mode
  - `FormulaBenefits.tsx` - Updated all background colors and borders for light mode
  - `ClinicalStudyCard.tsx` - Updated card backgrounds and text colors for light mode
- Updated `ProductHero.tsx` to use amber/orange accent color instead of teal for Formula 02
- Fixed cart drawer overlay and button styles in `formula-02/page.tsx` to match light mode
- Updated `productData.ts` to reflect theme change from "dark" to "light"

#### Design Consistency:
- Formula 02 now maintains orange/amber accent color (`#f59e0b`) for differentiation from Formula 01's blue
- Both formulas now share consistent light mode base (white background, black text)
- All interactive elements updated to work properly in light mode

---

## December 9, 2025

### 15:30 - Formula Benefits Section Rework
Major redesign of the FormulaBenefits section on product pages to be more interactive and research-focused.

#### New "What do you struggle with?" Interactive Section:
- Replaced static "Proven Benefits" grid with interactive struggle selector
- Six struggle categories: Sleep, Energy, Crashing Mid-Day, Stress, Anxiety, Focus
- Each formula has unique solution content per struggle (Formula 01 adaptogen-focused, Formula 02 nootropic-focused)
- Clicking a struggle reveals a dedicated solution slide with:
  - Research explanation specific to that struggle
  - Key ingredients highlighted
  - Statistical improvement metrics

#### Triple Radar Charts Visualization:
- 3 radar charts side by side showing before/during/after treatment
- Visual progression from baseline through 2 weeks to 8 weeks
- Formula-specific accent colors (teal for 01, amber for 02)
- Six performance metrics per chart

#### Enhanced Clinical Study Card Component:
- Lab report style design replacing simple data grid
- Study metadata: Professor name, University, Year
- Participant demographics: Total count, Age range, Gender split, Selection criteria
- Abstract section with full study description
- Key results with visual indicators for statistical significance (P-values)
- Color-coded result cards with metric, value, and description
- Conclusion section highlighting study findings
- Study ID and publication info footer

#### New Components Created:
- `StruggleSelector.tsx` - Centered question with struggle button grid
- `SolutionSlide.tsx` - Full solution display with radar charts
- `ClinicalStudyCard.tsx` - Lab report style study details

#### Data Layer Updates (`productData.ts`):
- New `StruggleSolution` interface with comprehensive data structure
- New `ClinicalStudy` interface for detailed research data
- `STRUGGLE_OPTIONS` constant for struggle categories
- Complete struggle solutions data for both Formula 01 and Formula 02
- Each formula has 6 unique clinical studies (one per struggle)

---

## December 8, 2025

### 14:30 - Product Page Architecture Implementation
Major new feature: Complete product and protocol page system with shared components.

#### New Routes Created:
- `/formula-01` - Formula 01 individual product page (light theme, Energy positioning)
- `/formula-02` - Formula 02 individual product page (dark theme, Clarity positioning)
- `/protocol/[id]` - Dynamic protocol pages for Protocol 1-4

#### New Components - Product (`app/components/product/`):
- `ProductHero.tsx` - Product hero with image, info box, pack selector, purchase toggle
- `PackSelector.tsx` - 4-pack, 12-pack, 28-pack selection with pricing
- `PurchaseToggle.tsx` - Subscription vs One-Time purchase toggle
- `StickyPurchaseFooter.tsx` - Fixed bottom bar with quantity, subscribe toggle, add to cart
- `FormulaIngredients.tsx` - Ingredient breakdown in neo-box styling
- `FormulaBenefits.tsx` - Benefits grid with clinical stats
- `FormulaFAQ.tsx` - Expandable FAQ accordion
- `HowItWorks.tsx` - Usage guidance with when to take information

#### New Components - Protocol (`app/components/protocol/`):
- `ProtocolHero.tsx` - Protocol info with tier selector and both formula images
- `ProtocolCalendar.tsx` - 4-week calendar visualization with formula colors
- `ProtocolBenefits.tsx` - Combined benefits from both formulas
- `ProtocolFAQ.tsx` - Protocol-specific and general FAQs

#### Data Layer (`app/lib/productData.ts`):
- Centralized pricing for subscriptions and one-time purchases
- Formula content (ingredients, benefits, clinical results, FAQ)
- Protocol content (4 protocols with Starter/Pro/Max tiers)
- Helper functions for pricing and calendar generation

#### Navigation Update:
- Added Shop dropdown with protocol quiz CTA, all 4 protocols, and individual formulas
- Updated mobile menu with full shop navigation grid
- Links to protocol and formula pages

#### Protocol System:
- **Protocol 1:** Formula 01 Daily + Formula 02 Weekly
- **Protocol 2:** Formula 02 Daily + Formula 01 Weekly
- **Protocol 3:** Balanced alternating approach
- **Protocol 4:** Ultimate - Both formulas daily (Pro/Max only)

#### Pricing Structure:
- Formula packs: 4-pack (weekly), 12-pack (bi-weekly), 28-pack (monthly)
- Subscription pricing at discount vs one-time purchases
- Protocol tiers: Starter (4/week), Pro (6/week), Max (7/week)

#### Mobile Optimizations:
- Sticky footer lightweight design
- Large touch targets
- Mobile-first layouts throughout

---

## December 7, 2025

### 16:15 - Trial Packs Section Added
- Created new `TrialPacks.tsx` component below Protocol Builder section
- Section heading: "not ready for a protocol? try our trial packs"
- Formula toggle between Formula 01 and Formula 02
- Three pack size options: 4-pack (£14.99), 8-pack (£24.99), 12-pack (£34.99)
- Layout: Formula image on left, selections and options on right
- Pack selection cards with descriptions and pricing
- "How to Try It" explanation box
- Price display showing selected pack and total
- Add to Cart button (primary action)
- Learn More button (secondary action)
- Responsive design matching site aesthetic

### 15:45 - FAQ Section & Footer Redesign
- Completely overhauled FAQ section with persistent answer card
- FAQ buttons now toggle to populate a persistent card below (instead of expanding/collapsing)
- Card shows "Select a category above to see the answer" when no category is selected
- Moved CTA section (Buy Conka Now button, "ready to unlock your potential" text, guarantee info) to footer
- Redesigned footer layout:
  - Left side: Logo, mini navigation links, Patent info, "built with love" text
  - Right side: CTA content (ready to unlock text, Buy Conka Now button, guarantee text)
- Removed border line from footer for seamless integration
- Footer now has better information hierarchy and visual balance

### 15:15 - Founders Section & FAQ Updates
- Updated founders section with new names: Humphrey Bodington and Harry Glover
- Changed founder subtext to "athlete" for both
- Added "bio coming soon" placeholder text for both founders
- Replaced "Two best friends..." text section with button: "the story of CONKA"
- Replaced emoji icons in FAQ section with SVG icons matching the rest of the page design
- FAQ icons now use consistent SVG styling (checkmark, package, refresh, leaf, clock)

### 14:30 - Protocol Builder Rework
- Completely redesigned "Build Your Protocol" section into new "Choose Your Path" section
- Created new `ProtocolBuilder.tsx` component with interactive two-path system
- **Two Paths Available:**
  - **Endurance Path**: Formula 02 daily + Formula 01 weekly (for endurance athletes, runners, cyclists, swimmers)
  - **Performance Path**: Formula 01 daily + Formula 02 weekly (for contact sports, rugby, football, combat sports)
- **Expandable View**: Clicking a path reveals:
  - Formula product image on left
  - Interactive 28-day calendar visualization on right
  - Color-coded days: teal for daily formula, amber for weekly boost
  - Protocol tier selector (Starter/Pro/Max)
- **Three Protocol Tiers:**
  - Starter: 3 primary + 1 secondary per week (gentle introduction)
  - Pro: 5 primary + 1 secondary per week (balanced protocol)
  - Max: 6 primary + 1 secondary per week (full coverage)
- **Navigation Features:**
  - "Back to Options" button to return to path selection
  - "View the Other Path" button to quickly switch between paths
- Benefits explanation for each path with checkmark list
- Removed unused state variables from page.tsx (`selectedPlan`, `planDetails`)

---

## December 7, 2024

### 19:45 - Initial Project Setup
- Created Next.js 16.0.7 application with TypeScript, Tailwind CSS v4, ESLint
- Configured for Vercel deployment
- Set up import alias `@/*`
- Zero vulnerabilities in npm audit

### 19:50 - Style Guide 01 Implementation
- Created `STYLE_GUIDE_01.md` documenting the design system
- Created `STYLE_GUIDE_01_USAGE.md` with quick reference examples
- Implemented typography system:
  - **Poppins** - Primary/marketing font (400, 500, 600, 700)
  - **Caveat** - Commentary/brand voice font (400, 500)  
  - **IBM Plex Mono** - Clinical/metrics font (400, 500)
- Set up CSS variables for colors and theming
- Created theme classes: `.theme-formula-01` (light), `.theme-formula-02` (dark)
- Added typography utility classes: `.font-primary`, `.font-commentary`, `.font-clinical`

### 20:15 - Homepage Wireframe (Style Guide 01)
- Built complete homepage wireframe with 8 interactive sections
- Implemented formula toggle that transforms entire page between light/dark themes
- Smooth CSS transitions on theme switch (500ms)

#### Sections Implemented:
1. **Hero** - Formula toggle, headline, product placeholder, CTAs
2. **Benefits Carousel** - Interactive slideshow with neo-brutalist boxes, navigation dots/arrows
3. **Clinical Report** - Clickable data cards with lab report aesthetic, detail panel
4. **Ingredients** - Formula breakdown with percentages, script annotations
5. **Plan Builder** - Interactive calendar, plan selector (4/12/28 shots), bundle paths
6. **Case Studies** - Athlete profiles with lab report cards, click-through navigation
7. **Founders** - Story section with image placeholders
8. **FAQ** - Icon-driven accordion with categories

#### Technical Details:
- React state management for all interactive elements
- Content arrays for Formula 01 and Formula 02 (easily swappable)
- Neo-brutalist CSS utilities: `.neo-box`, `.neo-button`, `.neo-button-outline`
- Placeholder boxes for images: `.placeholder-box`
- All placeholder content marked with `[PLACEHOLDER]` text

---

## January 6, 2026

### 22:05 - Our Story Page Image Integration
- Added 8 images to `/public/story/` folder for the Our Story page
- Converted AVIF image to JPEG for compatibility
- Updated `StorySection` interface in `storyData.ts` to support optional `image` property
- Added image paths to story sections data:
  - Section 1 (Founders): `Conka_Images_2.webp`
  - Section 2 (The Spark): `GettyImages-1330621508.webp`
  - Section 3 (Breakthrough Discovery): `Screenshot_2025-11-10_143714.webp`
  - Section 4 (Parallel Paths): `o0cs6ij6wfkafteqloee.jpg`
  - Section 5 (Research): `Screenshot_2025-11-10_171922.webp`
  - Section 6 (Technology): `Tech_Update_1.webp`
  - Section 9 (Second Formula): `Conka_Images_3...webp`
  - Section 10 (Journey Continues): `19347-jmp-harlequins-v-bath-jg-158.webp`
- Updated `StorySection.tsx` component (desktop) to render images with fallback to placeholders
- Updated `OurStoryMobile.tsx` component to render images with fallback to placeholders
- Sections 7 & 8 remain as placeholders (no images provided yet)

