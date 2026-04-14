# Ingredients Panel — Mobile UX Fix

## Problem

On the `/start` landing page, tapping the "Ingredients" button on either bottle tile inside `LandingWhatItDoes` opens `IngredientsPanel`, but the viewport jumps — on mobile iOS Safari the page scrolls down to the bottom of the section rather than presenting a stable overlay. The panel itself is well-structured; the wiring is broken.

## Who it serves

Cold paid-Meta mobile traffic on `/start`. Ingredients is a trust lever. A broken tap erodes credibility in the first 10 seconds.

## Business impact

Acquisition / CRO. Fixes a friction point on a page that exists to convert.

## Appetite

2–3 hours.

## Root cause

Two coupled bugs in `app/components/landing/IngredientsPanel.tsx`:

1. **No portal.** The panel is rendered inline inside `WhatsInsideProductMini` → `LandingWhatItDoes` → a page section. If any ancestor uses `transform`, `filter`, or `will-change`, `position: fixed` re-anchors to that ancestor instead of the viewport. Classic React-modal gotcha.
2. **Auto-focus fires before scroll lock settles.** `closeButtonRef.current?.focus()` runs in the same effect as `document.body.style.overflow = "hidden"`. On iOS Safari, focusing an element inside a freshly-mounted `fixed` node triggers `scrollIntoView`, jumping the viewport. `previouslyFocused?.focus?.()` on cleanup jumps again on close.

## Approach

Render the panel through `createPortal` to `document.body`, remove the iOS-hostile auto-focus, and switch the mobile presentation from a full-width bottom sheet to a centred modal consistent with desktop. Keep the existing markup structure and data contract untouched.

## Design system

`brand-base` (landing page is a new surface). No new tokens introduced.

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Portal + scroll-lock + mobile layout fix in `IngredientsPanel.tsx` | Not Started |

## Phase 1 — task breakdown

1. **Portal the panel to `document.body`**
   - Wrap overlay + dialog JSX in `createPortal(..., document.body)` guarded by a `mounted` state so SSR does not break.
   - Files: `app/components/landing/IngredientsPanel.tsx`
   - Complexity: Small

2. **Remove iOS-hostile focus calls**
   - Drop `closeButtonRef.current?.focus()` on open. Keep `aria-modal` + `role="dialog"`.
   - Keep focus restoration on close but guard with `requestAnimationFrame` so it does not re-scroll while the exit animation is mid-flight.
   - Files: same.
   - Complexity: Small

3. **Mobile layout: centred modal, not bottom sheet**
   - Swap mobile classes from `bottom-0 left-0 right-0 rounded-t-*` to centred: `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-h-[85vh] rounded-[var(--brand-radius-card)]`. Desktop presentation unchanged.
   - Files: same.
   - Complexity: Small

4. **QA on real iOS Safari at 390px**
   - Open from both Flow and Clear tiles at multiple scroll positions. Confirm no viewport jump on open or close, body scroll is actually locked, escape + backdrop click still close.
   - Complexity: Small

## Rabbit holes

- **Rebuilding as a shared modal primitive.** `UpsellBottomSheet` and `NutritionInfoModal` share the same anti-pattern but live on shorter pages where the viewport jump is invisible. Out of scope — fix this one; extract shared primitive only if a third case appears.
- **Scroll-lock libraries.** `body-scroll-lock` etc. add weight and bugs. Current `document.body.style.overflow` approach works once focus-jump is removed.

## No-gos

- Not changing the panel's content, typography, or data model.
- Not touching `NutritionInfoModal` or `UpsellBottomSheet`.
- Not adding a new dependency (Radix, Headless UI, etc.).

## Risks

- iOS Safari `position: fixed` quirks with URL bar — `max-h: 85vh` (not `90vh`) gives safety margin.
- Portal flash on first open if the `mounted` gate is mishandled. Pattern: `useEffect(() => setMounted(true), [])`.

## References

- `app/components/landing/IngredientsPanel.tsx`
- `app/components/landing/WhatsInsideProductMini.tsx`
- `app/components/landing/LandingWhatItDoes.tsx`
- `app/globals.css` — `@keyframes slide-up`, `.animate-slide-up`

## Jira

- Phase 1 ticket: [SCRUM-884](https://conka.atlassian.net/browse/SCRUM-884) — Bug, Sprint 24, Epic: SCRUM-763 (Website & CRO)
