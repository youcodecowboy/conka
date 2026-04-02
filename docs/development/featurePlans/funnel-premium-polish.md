# Funnel Premium Polish + Conversion Trust

> **Status:** All 3 phases ticketed
> **Created:** 2026-04-02
> **Appetite:** 1-2 days
> **Branch:** `CRO-landing-and-funnel-work`
> **Epic:** SCRUM-763 (Website & CRO)
> **Continues:** `funnel-cro-optimisation.md` (all 3 phases complete)
> **Visual reference:** `docs/branding/LANDING_PAGE_VISUAL_SYSTEM.md` for implementation patterns. Review `app/start/StartPageClient.tsx` for live examples.

---

## Problem

The funnel is architecturally sound and functionally correct, but it feels like a checkout form rather than a premium purchase experience. Cold Meta traffic arrives with zero brand awareness, and the funnel provides no value context, no social proof, no micro-interactions, and trust signals at nearly unreadable size. The landing page does heavy trust-building across 10 sections, then the funnel strips it all away.

## Who it serves

Cold paid Meta traffic on mobile (74%). People who clicked through from /start and are ready to choose, but still need reassurance that this is worth the price.

## Business impact

Directly gates funnel completion rate. Every percentage point improvement in funnel-to-checkout conversion reduces effective CPA. At the current £71 CPA and 3,170 sessions/month, even a modest improvement compounds quickly.

## Design system

`brand-base.css` (new). Reference `docs/branding/LANDING_PAGE_VISUAL_SYSTEM.md` for the visual system patterns (background palette, text tiers, accent usage, heading spacing). Review `app/start/StartPageClient.tsx` for live implementation examples.

---

## Phases

| Phase | Description | Ticket | Status |
|-------|-------------|--------|--------|
| 1 | Micro-interactions + trust visibility | SCRUM-846 | Done |
| 2 | Value context + visual hierarchy | SCRUM-847 | Done |
| 3 | Token migration + claims cleanup | SCRUM-848 | Done |

---

## Phase 1: Micro-interactions + Trust Visibility

Make the funnel feel intentional and premium through motion and readable trust signals. All CSS-only, no animation libraries.

### Tasks

1. **[CSS] Card selection transitions**
   - Add `transition-all duration-200` to product and cadence cards
   - Selected card gets `shadow-md` + subtle scale on desktop
   - Radio circle fill animates via CSS transition
   - Files: `ProductSelector.tsx`, `CadenceSelector.tsx`
   - Complexity: Small

2. **[CSS] Step transition animation**
   - Fade + translateY between Step 1 and Step 2 (150-200ms)
   - CSS-only using opacity/transform on the content wrapper
   - Files: `FunnelClient.tsx`
   - Complexity: Small

3. **[CSS] Step indicator checkmark animation**
   - Animate checkmark drawing when step completes (SVG stroke-dasharray)
   - Files: `FunnelStepIndicator.tsx`
   - Complexity: Small

4. **[UI] Trust strip readability**
   - Increase text from 10px to 12px, colour from gray-400 to `text-black/50`
   - Make guarantee more prominent (bold or accent-coloured)
   - Icon size bump (13px to 15px)
   - Files: `FunnelCTA.tsx`, `FunnelAssurance.tsx`
   - Complexity: Small

5. **[CSS] CTA button shadow lift**
   - Subtle shadow on hover for desktop
   - Files: `FunnelCTA.tsx`
   - Complexity: Small

---

## Phase 2: Value Context + Visual Hierarchy

Add the missing conversion signals that bridge between landing page trust and funnel action.

### Tasks

1. **[Copy] Value context line above product cards**
   - Single line: "16 active ingredients. Less than a coffee. 150,000+ bottles sold."
   - `brand-caption` size, `text-black/60`, left-aligned
   - Files: `FunnelClient.tsx` or `ProductSelector.tsx`
   - Complexity: Small

2. **[UI] "Both" product visual prominence**
   - Accent gradient bar at top of "Both" card (4px, `--brand-gradient-accent`)
   - Make savings badge more prominent
   - Files: `ProductSelector.tsx`
   - Complexity: Small-Medium

3. **[Typography] Brand-data font for prices**
   - Per-shot and total prices use `brand-data` (JetBrains Mono)
   - Price labels use `brand-data-label`
   - Files: `ProductSelector.tsx`, `CadenceSelector.tsx`, `UpsellModal.tsx`
   - Complexity: Small

4. **[Mobile] Product confirmation on Step 2**
   - Small bar at top of Step 2 on mobile: "You chose: Flow + Clear (Both)"
   - Files: `FunnelClient.tsx`
   - Complexity: Small

5. **[UI] Desktop sidebar trust cluster**
   - Below hero image: "Informed Sport | 150,000+ sold | 100-Day Guarantee"
   - Files: `FunnelClient.tsx`
   - Complexity: Small

---

## Phase 3: Token Migration + Claims Cleanup

Hygiene pass to align with the design system and fix amber compliance items.

### Tasks

1. **[Tokens] Hardcoded colours to brand tokens**
   - `#4058bb` to `var(--brand-accent)` / `brand-accent`
   - `border-gray-200` to `border-black/6`
   - `text-gray-*` to text tier system (`text-black/40`, `/60`, `/80`)
   - `rounded-2xl` to `rounded-[var(--brand-radius-card)]`
   - Files: All funnel components
   - Complexity: Medium

2. **[Copy] Claims fixes**
   - Flow: "Morning energy + focus" to "Morning focus + calm"
   - Clear: "Evening clarity + recovery" to "Evening clarity + wind-down"
   - Files: `funnelData.ts`
   - Complexity: Small

3. **[Copy] OG description fix**
   - "Subscribe and save 20%" to "Subscribe and save 25%"
   - Files: `app/funnel/page.tsx`
   - Complexity: Small

4. **[Performance] Hero image priority**
   - Only set `priority` on the default ("both") image, not all 3
   - Files: `FunnelHeroAsset.tsx`
   - Complexity: Small

---

## Rabbit Holes

- **Animation library temptation:** All CSS-only. No Framer Motion. Funnel must stay lean for mobile.
- **Value context becoming a mini-landing-page:** One line, not a section. The landing page sold. The funnel closes.
- **"Both" card redesign:** Enhance within existing structure, don't redesign.

## No-Gos

- No structural changes to funnel flow (step order, upsell logic)
- No new sections or major layout changes
- No animation library dependencies
- No changes to checkout logic or analytics events
- No Shopify/variant changes

## Risks

- **Transition jank on low-end Android:** Only animate `opacity` and `transform` (GPU-composited). No `height`/`width`/`top` transitions.
- **Trust line cluttering mobile:** One line, muted colour. Removable if heavy at 390px.

---

## Related Docs

- [Funnel CRO Optimisation Plan](./funnel-cro-optimisation.md) (predecessor, all phases complete)
- [CRO Value Messaging Plan](./cro-value-messaging-and-offer-strategy.md) (landing page value work)
- [Landing Page Visual System](../../branding/LANDING_PAGE_VISUAL_SYSTEM.md) (implementation reference)
- [Design System](../../branding/DESIGN_SYSTEM.md)
- [Quality Standards](../../branding/QUALITY_STANDARDS.md)
- [Claims Compliance](../../branding/CLAIMS_COMPLIANCE.md)
