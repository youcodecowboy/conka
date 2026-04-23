# Account Portal Clinical Upgrade

**Status:** Approved, Phase 1 in progress.
**Last updated:** 2026-04-23
**Owner:** Rudh
**Appetite:** Scale C, three active phases, each independently deployable.

---

## Problem

The logged-in customer portal (`app/account/*`) has the `brand-clinical` wrapper applied on its three pages but the clinical grammar inside is not. Research in `docs/development/SKIO_ACCOUNT_PORTAL_RESEARCH.md` §9 documents the gaps:

- Next delivery date, the one thing customers come for, is inline prose on the dashboard and a chip buried in the subscription card. Never the visual hero.
- The dashboard is a menu of menus. It surfaces the same data (active sub count, thumbnail, next delivery) three times before the user can do anything.
- `SubscriptionCard` has six equally-weighted actions (Edit Plan, Pause, Skip next, Reschedule, Order Now, Cancel) in a single flex-wrap row. On mobile they stack into 3 or 4 rows of identical pills.
- Mobile (74% of traffic) stacks into a wall of grey. Roughly 9 stacked boxes render before a user finds an action on the subscription card.
- No persistent navigation. Two clicks to get anywhere from anywhere.
- Profile edit lives behind a modal on the dashboard, inconsistent with Orders and Subscriptions which are pages.
- Raw `<img>` tags, legacy stock shots (`/lifestyle/HoldingBottle.jpg`), and inconsistent typography against the rest of the site.

## Who it serves

Existing subscribers. Authenticated traffic. Mobile-dominant (74%).

## Business impact

Retention and LTV. Customers who cannot find a self-serve action (skip, pause, reschedule) fall back to cancel. A findable portal reduces cancel-by-failure. This work also creates the foundation Skio retention features will land on.

## Approach

UI and UX only pass. Zero functional change. Loop backend, `useSubscriptions` hook, `usePaymentMethods` hook, and `/api/auth/*` routes are off-limits.

Three primitives extracted first, then Overview rebuilt, then the subscriptions list and modals, then Orders, Details, and auth. Any logic bug spotted is logged in the deferred bug sweep section below and fixed after all three phases land.

## Design system decision

`brand-base` (clinical tokens already wired via `brand-clinical`). Reference: `docs/branding/CLINICAL_AESTHETIC.md`.

---

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Sub-nav, primitives, Overview rebuild | Done (pending review) |
| 2 | Subscriptions list and modals visual pass | Not Started |
| 3 | Orders, Details page, auth pages | Not Started |
| Future | Deferred bug sweep | Not Started |

## Decisions locked

1. Unified sticky sub-nav, four tabs: Overview, Subscriptions, Orders, Details. Segmented-tabs pattern from `CLINICAL_AESTHETIC.md`, `min-h-[44px]`, active state `bg-black text-white`.
2. Details is a standalone page at `/account/details`, not inline on the dashboard.
3. Dashboard ("Overview") is a focused next-delivery hero plus spec strip plus primary actions slab. NOT a merge of dashboard and subscriptions.
4. Spec strip is logistical only: Active subs, Next delivery, Orders placed, Member since. No "money saved" tile in this pass.
5. `SubscriptionCard` is split into `SubscriptionCardDesktop` and `SubscriptionCardMobile` via `useIsMobile()`. All other components stay responsive in one file.
6. Modals get a visual and typography pass only. Logic is untouched.
7. Primary action trio on subscription cards: Skip, Reschedule, Edit. Pause, Get now, Cancel go into a "More" menu.

---

## Phase 1: Sub-nav, primitives, Overview rebuild

### Task 1.1: `<AccountSubNav>` primitive

**What:** Sticky tab row with four tabs (Overview, Subscriptions, Orders, Details). `min-h-[44px]`, active = `bg-black text-white`, inactive = `bg-white text-black`. Hairline border. `sticky top-[nav-height] z-30`. Uses `usePathname` to drive active state.

**Complexity:** Small
**Files:** `app/components/account/AccountSubNav.tsx` (new)

### Task 1.2: `<NextDeliveryHero>` primitive

**What:** Full-bleed hairline card. Product imagery on the left (stacked on mobile) wrapped in `lab-asset-frame` with a `Fig. 01` plate. Big tabular-nums date on the right. Formula tag (F01, F02, BOTH) adjacent. Three primary action buttons beneath (Skip, Reschedule, Get now). Takes a single `Subscription` prop and calls handler props for each action. Pure presentation.

**Complexity:** Medium
**Files:** `app/components/account/NextDeliveryHero.tsx` (new)

### Task 1.3: `<HairlineSpecStrip>` primitive

**What:** Generic 3 or 4 column hairline grid per `CLINICAL_AESTHETIC.md` spec strip pattern. Props: array of `{ label, value, hint? }`. Handles mobile collapse to 2 columns with `border-b` added between rows on the wrap.

**Complexity:** Small
**Files:** `app/components/account/HairlineSpecStrip.tsx` (new)

### Task 1.4: `/account` Overview rebuild

**What:** Replace the current dashboard. New composition:
1. `<AccountSubNav>` sticky under main nav.
2. Trio header (eyebrow, H1, mono sub).
3. `<HairlineSpecStrip>` with Active subs, Next delivery, Orders placed, Member since.
4. `<NextDeliveryHero>` for the next-ship subscription.
5. Secondary subs strip if more than one active sub (compact hairline list linking to `/account/subscriptions`).
6. "Need help?" closing CTA card with `ConkaCTAButton` per `CLINICAL_AESTHETIC.md` pattern.

Kill "What you can do" microcopy. Kill the two link cards (Orders, Subscriptions) since the sub-nav replaces them. Kill the legacy `/lifestyle/HoldingBottle.jpg`. Move the profile edit modal trigger to the Details page (Phase 3); in Phase 1, leave the existing modal in place if no sub is active, or simply remove the profile block from this page since Details will house it.

**Complexity:** Medium
**Files:** `app/account/page.tsx`

### Task 1.5: Wire sub-nav into Subscriptions and Orders pages

**What:** Replace the current `SubscriptionsPageHeader` and `OrdersPageHeader` back-arrow pattern with `<AccountSubNav>`. Keep the H1 and subtitle content, restyle to trio-header grammar. The existing header components can either be updated in place or deleted in favour of trio headers inline.

**Complexity:** Small
**Files:** `app/account/subscriptions/page.tsx`, `app/account/orders/page.tsx`, `app/components/subscriptions/SubscriptionsPageHeader.tsx`, `app/components/orders/OrdersPageHeader.tsx`

---

## Phase 2: Subscriptions list and modals visual pass

### Task 2.1: `SubscriptionCard` split into Desktop and Mobile

**What:** Refactor `SubscriptionCard.tsx` into a router using `useIsMobile()`. Desktop = hairline card header (counter + formula tag identity right aligned), `lab-asset-frame` image, next-delivery chip, 3 primary actions (Skip, Reschedule, Edit), "More" menu for Pause, Get now, Cancel. Pricing breakdown behind a disclosure, "per shot" killed from primary. Mobile = collapsed card (image, title, next-delivery, single primary action), tap to expand for details and secondary actions. Replace the custom `clip-path` polygon on the Edit Plan button with the standard `lab-clip-tr` interactive chamfer.

**Complexity:** Large
**Files:** `app/components/subscriptions/SubscriptionCard.tsx`, `SubscriptionCardDesktop.tsx` (new), `SubscriptionCardMobile.tsx` (new)

### Task 2.2: `PastSubscriptionCard` clinical pass

**What:** Hairline border, counter header (`01 · CANCELLED`), single Reactivate primary action, lighter visual weight than active card.

**Complexity:** Small
**Files:** `app/components/subscriptions/PastSubscriptionCard.tsx`

### Task 2.3: Summary, Empty, Help visual pass plus active-count and empty-state fixes

**What:** Replace bespoke layouts with `<HairlineSpecStrip>` where applicable. `SubscriptionsHelpCard` becomes the standard closing-CTA pattern with `ConkaCTAButton`. Fix the inconsistent `active` definition across pages (pick `status === 'active'` to match the dashboard, document the choice). Fix the double empty-state bug where `EmptySubscriptionsState` and the "Past subscriptions" heading both render for users with only cancelled subs.

**Complexity:** Small
**Files:** `app/components/subscriptions/SubscriptionSummaryStats.tsx`, `EmptySubscriptionsState.tsx`, `SubscriptionsHelpCard.tsx`, `app/account/subscriptions/page.tsx`

### Task 2.4: Modal visual pass (Pause, Resume, Reschedule, Cancellation, Reactivate, PlaceOrder)

**What:** Zero logic change. Apply clinical grammar: trio header inside modal, hairline borders, mono labels, tabular-nums dates, em-dash replaced with middle-dot separators, `bg-[#1B2757]` primary action, `lab-clip-tr` on primary buttons only. Strip "We're sorry to see you go" and similar SaaS-speak copy lines, swap for confident-clinical one-liners.

**Complexity:** Medium
**Files:** `app/components/subscriptions/PauseModal.tsx`, `ResumeModal.tsx`, `RescheduleModal.tsx`, `CancellationModal.tsx`, `ReactivateModal.tsx`, `PlaceOrderModal.tsx`

### Task 2.5: `EditSubscriptionModal` plus `MultiLineEditModal` visual pass

**What:** Same visual treatment as 2.4. Keep the existing prop contract (`subscriptionType`, `currentFormulaId`, etc.) intact; protocols are being phased out per CLAUDE.md strategic direction but the contract still serves Flow/Clear/Both.

**Complexity:** Medium
**Files:** `app/components/subscriptions/EditSubscriptionModal.tsx`, `MultiLineEditModal.tsx`

---

## Phase 3: Orders, Details page, auth pages

### Task 3.1: New `/account/details` page

**What:** New route. Trio header, `<HairlineSpecStrip>` (Member since, Email, Address, Phone), then three hairline data cards: Contact, Delivery address, Payment method. Each with inline "Edit" that opens the existing modals (profile modal extracted from the current dashboard, payment `triggerUpdateEmail` flow). Pulls data from `useAuth` and `usePaymentMethods` (read-only surface).

**Complexity:** Medium
**Files:** `app/account/details/page.tsx` (new), `app/components/account/EditProfileModal.tsx` (new, extracted)

### Task 3.2: `OrderCard` and Orders supporting components clinical pass

**What:** `OrderCard` becomes a hairline data table row by default (counter, order number, date, status, total), expands into a full detail panel on tap with line items as a nested hairline table. `OrderSummaryStats` uses `<HairlineSpecStrip>`. `EmptyOrdersState` gets `ConkaCTAButton`. `OrdersHelpCard` gets the closing-CTA pattern.

**Complexity:** Medium
**Files:** `app/components/orders/OrderCard.tsx`, `OrderSummaryStats.tsx`, `EmptyOrdersState.tsx`, `OrdersHelpCard.tsx`

### Task 3.3: Auth pages clinical pass

**What:** `/account/login` and `/account/register`. Trio header, hairline inputs with mono labels, `bg-[#1B2757]` primary submit button, `ConkaCTAButton` for the secondary "create account" / "sign in" link. No functional change to the form logic.

**Complexity:** Small
**Files:** `app/account/login/page.tsx`, `app/account/register/page.tsx`

### Task 3.4: Product imagery audit

**What:** Grep for raw `<img>` in `app/account/*` and `app/components/{subscriptions,orders,account}/*`. Swap for `next/image` with proper `width` and `height`. Ensure every framed asset has a `Fig. 0X` plate, sequential across a page. Replace `/lifestyle/HoldingBottle.jpg` with product-derived imagery via `getSubscriptionImage()` or a placeholder plate with a product SVG icon.

**Complexity:** Small
**Files:** any portal file with `<img>` or missing Fig. plates

---

## Rabbit holes

- **Modal mobile variants.** Do not split every modal. `SubscriptionCard` is the only split because the layout genuinely diverges.
- **Copy rewrite.** Scope creep risk. Only kill the specific redundancies flagged in research §9.9: "What you can do", "Manage your", "We're sorry to see you go". Everything else uses existing copy.
- **New design assets.** Use what we have. If `getSubscriptionImage()` returns empty, fall back to a hairline placeholder with an icon tile. No new photography.
- **Refactoring data hooks.** `useSubscriptions` and `usePaymentMethods` are off-limits. For derived spec-strip data (orders placed, member since), compute inline on the page.

## No-gos

- Retention and cancel-flow logic (offers, ladder, reasons). Deferred to Skio feature workstream.
- Passwordless and magic-link login. Deferred.
- Dashboard plus Subscriptions route merge. Deferred (research §9.11 item A).
- Any `useSubscriptions`, `usePaymentMethods`, or `/api/auth/*` changes.
- New brand photography.
- Copy rewrites beyond the three flagged redundancies.
- "Money saved" or "bottles delivered" motivational tile. Deferred.

## Risks

- **`SubscriptionCard` split is the largest single task.** If Phase 2 task 2.1 blows past a day, ship Desktop refactor first and keep Mobile on the current card for a 2.5 PR. Named circuit breaker.
- **Sub-nav z-index with modals.** Modals at `z-50`, sub-nav at `z-30`. Verify fixed-overlay behaviour with a modal open over a scrolled page with a sticky sub-nav.
- **Empty-state double-render bug.** Flagged in research §9.8. Fix in Phase 2 task 2.3. Verify on a user with only cancelled subs.
- **Jira overlap unverified.** The research subagent could not search SCRUM for pre-existing account-portal tickets. Eyeball the board before kickoff.

## Deferred bug sweep

Any logic or Loop-integration issues spotted during this UI pass land here. Fixed as a cleanup ticket after all three phases merge. Populated during implementation.

(empty, populated during Phase 1 to 3)

---

## References

- `docs/branding/CLINICAL_AESTHETIC.md` - grammar
- `docs/development/SKIO_ACCOUNT_PORTAL_RESEARCH.md` - research basis, §9 in particular
- `docs/branding/MOBILE_OPTIMIZATION.md` - split-component patterns
- `docs/features/CUSTOMER_PORTAL.md` - current behaviour
- `CLAUDE.md` - strategic direction, components-return-content contract

---

## Jira tickets

**Sprint:** Sprint 24 (ID 600). All tickets assigned to Rudh, prefixed `[Website and CRO]`.

| Key | Phase | Title | Status |
|-----|-------|-------|--------|
| SCRUM-909 | 1.1 | AccountSubNav primitive | To Do |
| SCRUM-910 | 1.2 | NextDeliveryHero primitive | To Do |
| SCRUM-911 | 1.3 | HairlineSpecStrip primitive | To Do |
| SCRUM-912 | 1.4 | Rebuild /account Overview | To Do |
| SCRUM-913 | 1.5 | Wire AccountSubNav into Subscriptions and Orders pages | To Do |

Phase 2 and Phase 3 tickets created when those phases activate.
