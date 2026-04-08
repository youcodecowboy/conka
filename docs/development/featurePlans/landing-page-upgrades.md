# Landing Page Upgrades

**Page:** `/start` (`app/start/StartPageClient.tsx`)
**Branch:** `landing-page-upgrades`
**Design system:** `brand-base.css` (already migrated)
**Priority:** P1 before next paid campaign, P2 immediately after

---

## Phase Overview

| Phase | Description                                                                    | Status      |
| ----- | ------------------------------------------------------------------------------ | ----------- |
| 1     | Critical fixes before next campaign (performance, compliance, SEO, mobile CTA) | Done        |
| 2     | Landing page restructure (reorder, copy, CTA standardisation, FAQ trim)        | Done        |
| 3     | Funnel product selection page (header, copy, dynamic CTA)                      | Not Started |
| 4     | Funnel plan page (header, hero cleanup, accent colors, price anchors, CTAs)    | Not Started |
| 5     | Evening to Afternoon global terminology audit                                  | Not Started |

---

## Phase 1: Fix Before Next Campaign

Each task is independently deployable. Target: complete before scaling paid spend.

### 1.1 Mobile Performance (PageSpeed 64 -> 85+)

- Convert images to WebP with JPEG fallback
- Add `loading="lazy"` to all below-fold images
- Add `fetchpriority="high"` to hero image
- Audit unused JS and bundle size
- Run Lighthouse after each change, target 85+
- **Files:** All landing components with images, `next.config.ts`
- **Complexity:** Medium
- **Jira:** TBD

### 1.2 Remove KSM-66 from All Copy

Replace "KSM-66 Ashwagandha" / "KSM-66® Ashwagandha" with "Ashwagandha" across the codebase.

**Landing components (4 files):**

- `LandingBenefits.tsx` (lines 32, 41) - study observations
- `LandingProductSplit.tsx` (line 76) - Flow card benefit
- `LandingWhatsInside.tsx` (line 32) - ingredient list
- `LandingFAQ.tsx` (line 42) - ingredients answer

**Lib/data files (3 files):**

- `funnelData.ts` (line 229) - Flow description
- `ingredientsData.ts` (line 1436) - brand mapping
- `formulaContent.ts` (lines 241, 382, 452) - ingredient assets

**Shared component (1 file):**

- `KeyBenefits.tsx` (lines 103, 187) - ingredient assets

- **Complexity:** Small
- **Jira:** TBD

### 1.3 Mobile CTA Safe-Area Fix

On mobile Safari/Chrome the browser URL bar overlaps the CTA button on page load.

- Add `padding-bottom: calc(1rem + env(safe-area-inset-bottom))` to CTA container
- Test on physical iPhone in Safari and Chrome
- **Files:** `LandingCTA.tsx` or hero section wrapper
- **Complexity:** Small
- **Jira:** TBD

### 1.4 SEO Score (58 -> 80+)

- Verify meta description is 150-160 chars (currently exists on `page.tsx`)
- Confirm H1 is a true `<h1>` (it is - `LandingHero.tsx`)
- Add descriptive alt text to all images missing it
- Add `<link rel="canonical">` to `/start`
- **Files:** `app/start/page.tsx`, all landing components with images
- **Complexity:** Small
- **Jira:** TBD

---

## Phase 2: Landing Page Restructure

Depends on Phase 1 completion.

### 2.1 Section Reorder

Reorder existing sections in `StartPageClient.tsx`. No new components.

**New order:**

1. Hero (LandingHero) - was #1
2. Athlete proof / Case Studies (CaseStudiesDataDriven) - was #8, moved to #2
3. Product Split (LandingProductSplit) - was #3, stays
4. Coffee Comparison (LandingValueComparison) - was #4, stays
5. Benefits Grid (LandingBenefits) - was #2, moved to #5
6. Testimonials - was #6, stays
7. FAQ (LandingFAQ) - was #9, moved to #7
8. What's Inside (LandingWhatsInside) - was #5, stacked at bottom
9. Guarantee (LandingGuarantee) - was #7, stacked at bottom
10. Disclaimer (LandingDisclaimer) - was #10, stays at bottom

- **Files:** `StartPageClient.tsx`
- **Complexity:** Small
- **Jira:** TBD

### 2.2 Hero Section Updates

- **H1 change:** "Your brain fades by 2pm. Why?" -> "The only brain supplement you can measure."
- **Subheadline change:** Move old pain-point copy to subheadline: "Your brain fades by 2pm. Coffee masks it. Willpower can't fix it. A 2-shot system built for people who don't leave their performance to chance."
- **Remove** the "16 Active Ingredients" circular badge (delete element entirely, not CSS hide)
- **Increase** trust pill ("150,000+ bottles sold") to 16px minimum font size

- **Files:** `LandingHero.tsx`
- **Complexity:** Medium
- **Jira:** TBD

### 2.3 CTA Standardisation

- Hero CTA: keep as "Try Risk-Free ->"
- All other CTAs: change label to "Get Both from £1.61/shot ->"
- Add a CTA directly beneath the coffee comparison module (inside `LandingValueComparison` or in `StartPageClient.tsx` after the section)

- **Files:** `StartPageClient.tsx` (CTA labels), `LandingValueComparison.tsx` (new CTA placement)
- **Complexity:** Small
- **Jira:** TBD

### 2.4 Benefits Grid Label Changes

Labels only. Interactive tap-to-see-research mechanic stays exactly as is.

| Tile          | Current           | New                                       |
| ------------- | ----------------- | ----------------------------------------- |
| 1 (focus)     | Sharper Focus     | Stay locked in past 2pm                   |
| 2 (sleep)     | Sleep Quality     | Wake up ready, not catching up            |
| 3 (stress)    | Stress Resilience | Pressure that used to rattle you, doesn't |
| 4 (brain-fog) | Clearer Thinking  | Sharp calls at 4pm, not just 9am          |

- **Files:** `LandingBenefits.tsx`
- **Complexity:** Small
- **Jira:** TBD

### 2.5 Testimonial Card Updates

Cards must visually echo the case studies format: name prominent, score change as large data point, role as sub-label.

**3 testimonials specified:**

1. Business owner, 41 (unnamed until approved) - score 61 -> 79
2. Ben Cox, Account Executive at Revolut - scores TBD ([FILL SCORES])
3. Johnny Lyle - baseline couldn't pass 88, hit 96 on day 1

- May need a landing-specific testimonial card variant or modifications to existing `TestimonialCard`
- **Files:** Testimonials integration in `StartPageClient.tsx`, possibly new card component
- **Complexity:** Medium
- **Jira:** TBD

### 2.6 FAQ Reorder and Trim

Remove "What makes CONKA different from coffee?" (redundant with comparison section above).

**New order (5 questions, down from 9):**

1. What if my score doesn't improve? (lead with 100-day guarantee)
2. What's the difference between Flow and Clear?
3. Can I take just one shot?
4. How quickly will it arrive?
5. How do I cancel?

- **Files:** `LandingFAQ.tsx`
- **Complexity:** Small
- **Jira:** TBD

---

## No-Gos

**Phases 1-2 (landing page -- complete):**

- Not integrating new hero photography (pending shoot)
- Not fixing cut-off logos in hero image
- Not redesigning the coffee comparison section (marked unchanged)
- Not deleting any landing page sections -- unused sections stacked at bottom

**Phases 3-5 (funnel + terminology):**

- Not touching upsell modal copy or logic (separate optimization)
- Not redesigning card layout or adding new UI patterns -- copy, colors, and CTA changes only
- Not touching checkout flow or Shopify variant mapping
- Not changing customer testimonials that use "evening" (real quotes, cannot alter)
- Not creating new slideshow image assets (already handled separately)
- Not removing desktop left-column hero image on Step 2 (provides visual anchor)

## Risks

**Phases 1-2 (complete):**

- ~~Performance (1.1): Could spiral. Timebox to quick wins.~~ Done.
- ~~Testimonials (2.5): Incomplete data.~~ Done with available data.
- ~~KSM-66 (1.2): Touches 8 files.~~ Done, verified no regressions.

**Phases 3-5:**

- **Accent color shift (4.2):** Clear's change from blue (#0369a1) to teal (#0F6E56) is significant. Verify readability against white card backgrounds on mobile.
- **Dynamic CTA complexity (3.3, 4.4):** CTA now needs product + cadence + step to compute labels. Keep the helper function clean and typed to avoid pricing drift.
- **Evening to Afternoon (5.1):** Touches ~12 files across the codebase including shared components used on product pages. Needs regression check on `/conka-flow`, `/conka-clarity`, `/start`, and `/funnel` after deployment. Ship as separate PR.
- **Price anchor values (4.3):** Computed from `TRIAL_PACK_PER_SHOT` constant. If the trial pack price changes, a single constant update propagates everywhere. Verify trial pack remains at £3.75/shot before launch.

## Out of Scope

- Cookie consent positioning (already fixed)
- New hero photography (pending shoot)
- Cut-off logo fix
- Analytics events (funnel analytics already in place)
- Upsell modal redesign
- Email sequences, app onboarding, or packaging copy (Evening to Afternoon audit is codebase-only)

## Phase 3: Funnel Product Selection Page

Step 1 of the funnel (`/funnel`). Component: `ProductSelector.tsx`, data: `funnelData.ts`.

### 3.1 Header and Sub-copy Cleanup

Remove the feature-bashing caption and simplify the header. The product cards themselves communicate value.

- Remove "16 active ingredients. Less than a coffee. 150,000+ bottles sold." caption (`ProductSelector.tsx` line 62-64)
- Change H2 "Choose your product" to "Your CONKA plan" (`ProductSelector.tsx` line 70)
- Remove subtitle "What would you like in your plan?" entirely (`ProductSelector.tsx` lines 72-74)
- **Files:** `app/components/funnel/ProductSelector.tsx`
- **Complexity:** Small
- **Jira:** TBD

### 3.2 Product Card Copy

Update product descriptions in `FUNNEL_PRODUCTS` to outcome-focused copy. Also update Clear’s tagline and time label to use "Afternoon" (aligns with Phase 5 terminology audit).

| Product | Current                                                                                                                            | New                                                                                                                   |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Both    | "Morning foundation + evening recovery. Most customers choose Both because the two formulas are designed to work as a daily pair." | "The complete protocol. Flow sharpens your morning. Clear sustains your afternoon. Together they cover the full day." |
| Flow    | "Adaptogens including Ashwagandha and Lemon Balm. Caffeine-free, UK patented formula."                                             | "Take it in the morning. Calm, sustained focus without caffeine. Your brain on before the day starts."                |
| Clear   | "Nootropics + Vitamin C, which contributes to normal psychological function.†† Glutathione, Alpha GPC, NAC."                       | "Take it in the afternoon. Clears the 2pm fog and sustains output. The shot for the second half of your day."         |

Also update:

- `clear.tagline`: "Evening wind-down" to "Afternoon clarity" (`funnelData.ts` line 243)
- `clear.timeLabel`: "Evening" to "Afternoon" (`funnelData.ts` line 248)
- `clear.timeEmoji`: "🌙" to "☀️" (afternoon, not night) (`funnelData.ts` line 249)

- **Files:** `app/lib/funnelData.ts` (lines 206-256)
- **Complexity:** Small
- **Jira:** TBD

### 3.3 Dynamic CTA -- Product Selection

The Step 1 CTA currently shows a static "Continue" label. Update it to reflect the selected product with pricing context. The button still advances to Step 2 (plan selection) -- it does not skip to checkout.

**CTA labels by product state:**

| State                  | Button label              | Sub-label              |
| ---------------------- | ------------------------- | ---------------------- |
| Flow + Clear (default) | Get Both · £1.61/shot ->  | 56 shots · save £29.99 |
| Flow only              | Get Flow · £2.14/shot ->  | 28 shots/mo            |
| Clear only             | Get Clear · £2.14/shot -> | 28 shots/mo            |

Implementation:

- Add `subLabel` prop to `FunnelCTA` component (12px, centred, beneath button)
- Build helper `getFunnelCTALabels(step, product, cadence)` in `funnelData.ts` that computes label + subLabel from the pricing matrix (not hardcoded values)
- Wire up in `FunnelClient.tsx` to replace static `step1Label`/`step2Label` constants
- CTA updates reactively on product card selection

- **Files:** `app/components/funnel/FunnelCTA.tsx`, `app/funnel/FunnelClient.tsx`, `app/lib/funnelData.ts`
- **Complexity:** Medium
- **Jira:** TBD

---

## Phase 4: Funnel Plan Page

Step 2 of the funnel (`/funnel`). Component: `CadenceSelector.tsx`, data: `funnelData.ts`.

### 4.1 Header and Mobile Hero Cleanup

Simplify the plan page header and remove the redundant mobile hero image. The "You chose" confirmation bar is sufficient context.

- Change H2 "Choose your plan" to "Your delivery plan" (`CadenceSelector.tsx` line 81)
- Remove subtitle "Select how often you’d like CONKA delivered" entirely (`CadenceSelector.tsx` lines 83-85)
- Remove mobile hero image from Step 2 (`FunnelClient.tsx` lines 296-302) -- delete the element, do not CSS-hide
- Keep desktop left-column hero image (sticky product shot provides visual anchor)
- Update `app/funnel/page.tsx` meta description: "Clear for evening clarity" to "Clear for afternoon clarity"

- **Files:** `app/components/funnel/CadenceSelector.tsx`, `app/funnel/FunnelClient.tsx`, `app/funnel/page.tsx`
- **Complexity:** Small
- **Jira:** TBD

### 4.2 Per-Product Accent Colors

Update product accent colors and make the CadenceSelector cards visually adapt to the selected product. Currently all plan cards use `brand-accent`. After this change, the plan step takes on the selected product’s color identity.

**Accent color changes in `FUNNEL_PRODUCTS`:**

| Product             | Current   | New                                          |
| ------------------- | --------- | -------------------------------------------- |
| Both (Flow + Clear) | `#4058bb` | `#378ADD` (blue)                             |
| Flow                | `#d97706` | `#F59E0B` (amber)                            |
| Clear               | `#0369a1` | `#0369a1` (unchanged -- existing brand teal) |

- Pass `product` prop through to CadenceSelector for accent-aware styling
- Apply product accent to: selected card border, radio indicator, feature bullet icons, expanded detail highlights
- All four card states (collapsed, monthly selected, quarterly selected, one-time selected) must use the product accent

- **Files:** `app/lib/funnelData.ts`, `app/components/funnel/CadenceSelector.tsx`
- **Complexity:** Medium
- **Jira:** TBD

### 4.3 Price Anchor -- Trial Pack Reference

The £3.75/shot trial pack (4-shot plan, available on site to the same traffic) is the crossed-out anchor on every plan card. This is a legitimate reference price visible on the site.

Update `compareAtPrice` in `FUNNEL_PRICING` to use `£3.75 x shotCount` for all 9 product/cadence combinations:

| Product | Cadence       | Price               | Anchor (£3.75/shot) | Saving |
| ------- | ------------- | ------------------- | ------------------- | ------ |
| Both    | Monthly sub   | £89.99 (56 shots)   | £210.00             | 57%    |
| Both    | Quarterly sub | £229.99 (168 shots) | £630.00             | 63%    |
| Both    | One-time      | £129.99 (56 shots)  | £210.00             | 38%    |
| Flow    | Monthly sub   | £59.99 (28 shots)   | £105.00             | 43%    |
| Flow    | Quarterly sub | £149.99 (84 shots)  | £315.00             | 52%    |
| Flow    | One-time      | £79.99 (28 shots)   | £105.00             | 24%    |
| Clear   | Monthly sub   | £59.99 (28 shots)   | £105.00             | 43%    |
| Clear   | Quarterly sub | £149.99 (84 shots)  | £315.00             | 52%    |
| Clear   | One-time      | £79.99 (28 shots)   | £105.00             | 24%    |

- Compute `compareAtPrice` as `TRIAL_PACK_PER_SHOT * shotCount` rather than hardcoding (add `TRIAL_PACK_PER_SHOT = 3.75` constant)
- Display savings percentage on cards alongside the crossed-out price
- Show compareAtPrice on ALL cards (currently only shown on subscription cards)

- **Files:** `app/lib/funnelData.ts`, `app/components/funnel/ProductSelector.tsx`, `app/components/funnel/CadenceSelector.tsx`
- **Complexity:** Medium
- **Jira:** TBD

### 4.4 Dynamic CTA -- Plan Selection

The Step 2 CTA updates based on selected product + cadence. Uses the same `getFunnelCTALabels` helper built in 3.3.

**CTA labels for Both (Flow + Clear):**

| Cadence           | Button label                         | Sub-label                                        |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| Monthly (default) | Start monthly · £89.99/mo ->         | £1.61/shot · cancel anytime                      |
| Quarterly         | Start quarterly · £229.99/quarter -> | £1.37/shot · save £119.52/year · cancel anytime  |
| One-Time          | Buy once · £129.99 ->                | £2.32/shot · 100-day guarantee · no subscription |

**CTA labels for Flow only:**

| Cadence           | Button label                         | Sub-label                                        |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| Monthly (default) | Start monthly · £59.99/mo ->         | £2.14/shot · cancel anytime                      |
| Quarterly         | Start quarterly · £149.99/quarter -> | £1.79/shot · save £119.92/year · cancel anytime  |
| One-Time          | Buy once · £79.99 ->                 | £2.86/shot · 100-day guarantee · no subscription |

**CTA labels for Clear only:**

| Cadence           | Button label                         | Sub-label                                        |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| Monthly (default) | Start monthly · £59.99/mo ->         | £2.14/shot · cancel anytime                      |
| Quarterly         | Start quarterly · £149.99/quarter -> | £1.79/shot · save £119.92/year · cancel anytime  |
| One-Time          | Buy once · £79.99 ->                 | £2.86/shot · 100-day guarantee · no subscription |

- All prices computed from pricing matrix, not hardcoded
- Yearly savings computed as: `(monthlyPrice * 12) - (quarterlyPrice * 4)`

- **Files:** `app/lib/funnelData.ts`, `app/funnel/FunnelClient.tsx`
- **Complexity:** Small (logic already built in 3.3, just different inputs)
- **Jira:** TBD

---

## Phase 5: Evening to Afternoon Global Terminology Audit

Separate PR. Replaces "Evening" with "Afternoon" in all CONKA Clear context across the codebase.

### 5.1 Codebase Audit

**Funnel files (handled in Phases 3-4 above, listed here for completeness):**

- `funnelData.ts` -- description, tagline, timeLabel, alt text, upsell copy (6 instances)
- `funnel/page.tsx` -- meta description (1 instance)

**Landing page components:**

- `LandingWhatsInside.tsx` -- "Evening recovery" heading, body copy, section title, usage instruction (lines 18, 21, 35, 71)
- `LandingProductSplit.tsx` -- "Evening wind-down ritual" benefit bullet (line 122)
- `LandingFAQ.tsx` -- Clear description, product synergy copy (lines 18, 23)

**Product pages and shared components:**

- `formulaContent.ts` -- usage instructions, FAQ answer (lines 655, 750)
- `HowItWorks.tsx` -- timing instruction (line 60)
- `WhatToExpectMobile.tsx` -- dosage guidance (line 188)
- `WhatToExpectDesktop.tsx` -- dosage guidance (line 116)

**Other components:**

- `ProtocolCalendar.tsx` -- calendar tooltip (line 229)
- `ProductCard.tsx` -- "best for" metadata (line 94)

**DO NOT change -- customer testimonials:**

- `testimonialsFromLoox.ts` -- 6 instances of "morning to evening" and similar phrasing. These are real customer quotes; altering them would be falsifying reviews.

- **Files:** ~12 files, ~21 edits (excluding testimonials and funnel changes already covered in Phases 3-4)
- **Complexity:** Small per-edit, Medium overall due to blast radius
- **Jira:** TBD

Section 5 — Priority 2: Upsell modals
A bottom sheet modal appears after a single product is selected on the product selection page, offering an upgrade to Both before the visitor proceeds to the plan page. This section covers both upsell journeys: Flow → Both and Clear → Both.

5.1 What is working — keep as is
P2 — No change needed on these elements

Headline ‘Get the full system?’ — question format, not a push. Keep exactly as is.
‘No thanks, just Flow / just Clear’ dismiss line — low friction, plain language. Keep exactly as is, updating product name per journey.
AM/PM product image — appropriate here as it introduces a product the visitor has not yet seen in context.
‘Upgrade to Both’ CTA label — action-oriented and specific. Keep as is.

5.2 Copy changes
P2 — Copy change

Body copy
Clear recovers your evening.
Clear sustains your afternoon.

Body copy
Together they compound in a way that neither delivers alone.
Your morning is covered. Your afternoon holds. That’s the full protocol.

Replace the three bullet points across both modal variants with:

Current
Replacement
Add CONKA Clear (PM recovery) to your order
Save [X]% vs buying separately — see table below
Save £29.99 vs buying separately
Flow sharpens the morning. Clear holds the afternoon
Full-day cognitive support, sunrise to sunset
One decision. Full day covered

5.3 Price display — per-shot saving as hero
P2 — Development task

The primary price signal on the modal should be the per-shot price drop on upgrading to Both. The visitor has just committed to a per-shot price on the previous screen — showing them it immediately drops on upgrade is the most direct and personal saving signal available.

Plan
Was /shot
Now /shot
Extra cost
% saving on added product
Monthly
£2.14/shot
£1.61/shot
+£30/mo
50% off vs buying separately
Quarterly
£1.79/shot
£1.37/shot
+£80/qtr
47% off vs buying separately
One-Time
£2.86/shot
£2.32/shot
+£50
37% off vs buying separately

DEV: The green hero block at the top of the modal body shows: large new per-shot price (e.g. £1.61/shot) with the old price struck through beside it (£2.14/shot), and a sub-line: ‘Drop from £2.14 — add Clear for £30/mo’. This block updates dynamically per plan state. The crossed-out price is the single-product per-shot price the visitor has already committed to. The percentage saving appears as bullet point 1 beneath the hero block.

5.4 Social nudge line
P2 — Copy — verify data before deploy

Add a single line beneath the dismiss option in a light blue box:

Flow upsell
“Most people who start with Flow switch to Both within 30 days.”
Clear upsell
“Most people who start with Clear switch to Both within 30 days.”

IMPORTANT: Verify the ‘30 days’ figure against actual subscription data before publishing. If the real number is different, use the real number.

5.5 Visual references
P2 — Visual reference

📁 Visual reference: Upsell from Flow — all three plan states — Google Drive

📁 Visual reference: Upsell from Clear — all three plan states — Google Drive
