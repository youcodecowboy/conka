# Landing Page Upgrades

**Page:** `/start` (`app/start/StartPageClient.tsx`)
**Branch:** `landing-page-upgrades`
**Design system:** `brand-base.css` (already migrated)
**Priority:** P1 before next paid campaign, P2 immediately after

---

## Phase Overview

| Phase | Description                                                                    | Status      |
| ----- | ------------------------------------------------------------------------------ | ----------- |
| 1     | Critical fixes before next campaign (performance, compliance, SEO, mobile CTA) | Not Started |
| 2     | Landing page restructure (reorder, copy, CTA standardisation, FAQ trim)        | Not Started |

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

- Not touching the funnel page (`/funnel`) - separate sprint
- Not integrating new hero photography (pending shoot)
- Not fixing cut-off logos in hero image
- Not redesigning the coffee comparison section (marked unchanged)
- Not deleting any sections - unused sections stacked at bottom for now

## Risks

- **Performance (1.1):** Could spiral. Timebox to quick wins (image format, lazy loading, fetchpriority), measure, stop if 85+.
- **Testimonials (2.5):** Two of three have incomplete data. Build component with available data, use placeholders for missing scores.
- **KSM-66 (1.2):** Touches 8 files across the codebase including shared components used on other pages. Verify no regressions on product pages after change.

## Out of Scope

- Cookie consent positioning (already fixed)
- New hero photography (pending Friday shoot)
- Cut-off logo fix
- Funnel page changes
- Analytics events

Section 3 — Priority 2: Product selection page

3.1 Page header and sub-line
P2 — Copy change

Header
Choose your product
Your CONKA plan

Sub-line
What would you like in your plan?
[REMOVE ENTIRELY]

3.2 Remove feature-bashing sub-copy
P2 — Copy change

Sub-copy
16 active ingredients. Less than a coffee. 150,000+ bottles sold.
[REMOVE ENTIRELY]

3.3 Terminology audit: Evening → Afternoon
P2 — Global audit

All pages
EVENING
AFTERNOON

DEV: Global audit — search codebase, CMS, email sequences, app onboarding, packaging, and upsell modals for all instances of ‘Evening’ in CONKA Clear context. Replace with ‘Afternoon’ everywhere in a single pass.

3.4 Product card copy
P2 — Copy change

Flow + Clear
Morning foundation + evening recovery. Most customers choose Both because the two formulas are designed to work as a daily pair.
The complete protocol. Flow sharpens your morning. Clear sustains your afternoon. Together they cover the full day.

Flow
Adaptogens including KSM-66 Ashwagandha and Lemon Balm. Caffeine-free, UK patented formula.
Take it in the morning. Calm, sustained focus without caffeine. Your brain on before the day starts.

Clear
Nootropics + Vitamin C, which contributes to normal psychological function. Glutathione, Alpha GPC, NAC.
Take it in the afternoon. Clears the 2pm fog and sustains output. The shot for the second half of your day.

3.5 Dynamic CTA — product selection page
P2 — Development task

State
Button label
Sub-label
Flow + Clear (default)
Get Both · £1.61/shot →
56 shots · save £29.99
Flow only
Get Flow · £2.14/shot →
28 shots/mo
Clear only
Get Clear · £2.14/shot →
28 shots/mo

DEV: Button updates on card radio change event. Sub-label: 12px, centred, beneath button.

Section 4 — Priority 2: Plan pages

4.1 Changes common to all three plan pages
P2 — Copy + design

Header
Choose your plan
Your delivery plan

Sub-line
Select how often you’d like CONKA delivered
[REMOVE ENTIRELY]

Remove large product hero image from plan page — the ‘You chose’ confirmation strip is sufficient
Remove benefits strip (Sustained Energy, Better Sleep, etc.) from plan page hero area
Remove ‘Replaces 9/14 Supplements’ badge from Flow and Clear hero images

DEV: Remove hero image element entirely — do not hide with CSS. Do not load it on mobile.

4.2 Price anchor rationale
P2 — Pricing

The £3.75/shot trial pack price (4-shot plan, available on site to same traffic) is used as the crossed-out anchor on every card header across all three plan pages. The anchor is visible on the site so no legitimising line is required.

Plan page
Monthly saving
Quarterly saving
One-time saving
Both (Flow + Clear)
57% (£1.61 vs £3.75)
63% (£1.37 vs £3.75)
38% (£2.32 vs £3.75)
Flow only
43% (£2.14 vs £3.75)
52% (£1.79 vs £3.75)
24% (£2.86 vs £3.75)
Clear only
43% (£2.14 vs £3.75)
52% (£1.79 vs £3.75)
24% (£2.86 vs £3.75)

4.3 Both (Flow + Clear) plan cards — blue accent
P2 — Development task

Card accent colour: blue (#378ADD). All four states: collapsed, monthly selected, quarterly selected, one-time selected.

📁 Visual reference: Both plan card visual references — Google Drive

State
Button label
Sub-label
Monthly (default)
Start monthly · £89.99/mo →
£1.61/shot · cancel anytime
Quarterly
Start quarterly · £229.99/quarter →
£1.37/shot · save £119.52/year · cancel anytime
One-Time
Buy once · £129.99 →
£2.32/shot · 100-day guarantee · no subscription

4.4 Flow only plan cards — amber accent
P2 — Development task

Card accent colour: amber (#F59E0B). Amber distinguishes the Flow-only plan page from Both (blue) and Clear (teal).

📁 Visual reference: Flow plan card visual references — Google Drive

State
Button label
Sub-label
Monthly (default)
Start monthly · £59.99/mo →
£2.14/shot · cancel anytime
Quarterly
Start quarterly · £149.99/quarter →
£1.79/shot · save £119.92/year · cancel anytime
One-Time
Buy once · £79.99 →
£2.86/shot · 100-day guarantee · no subscription

4.5 Clear only plan cards — teal accent
P2 — Development task

Card accent colour: teal (#0F6E56). Teal distinguishes the Clear-only plan page from Both (blue) and Flow (amber).

📁 Visual reference: Clear plan card visual references — Google Drive

State
Button label
Sub-label
Monthly (default)
Start monthly · £59.99/mo →
£2.14/shot · cancel anytime
Quarterly
Start quarterly · £149.99/quarter →
£1.79/shot · save £119.92/year · cancel anytime
One-Time
Buy once · £79.99 →
£2.86/shot · 100-day guarantee · no subscription
