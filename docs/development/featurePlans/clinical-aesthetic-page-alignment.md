# Clinical Aesthetic Page Alignment

## Problem

Six high-intent pages (product PDPs, protocol balance, and core content pages) still render in the legacy visual system while home, `/start`, and `/funnel` are already on the clinical aesthetic. At a higher price point, this inconsistency erodes premium signal across the paid-traffic journey: a visitor lands on `/start` in clinical style, clicks through to `/conka-flow`, and the visual contract breaks.

## Who it serves

Paid-traffic converters (CRO) and returning customers deepening trust (retention).

## Business impact

Consistency underpins the premium price story. Every page off-brand is a friction point against the higher ASP. This is a pure alignment task, no functional changes.

## Appetite

Roughly 3 to 4 focused days of UI work, phased so each preview is shippable independently.

## Approach

Apply the already-defined clinical aesthetic (`docs/branding/CLINICAL_AESTHETIC.md`) to the remaining pages. No new patterns, no new components. Add `brand-clinical` wrapper, swap to `ConkaCTAButton`, audit trio headers, hairline borders, mono tabular-nums, em-dash bullets, remove radii and gradients, apply `lab-asset-frame` where data surfaces belong. Functionality, copy, and information architecture untouched.

**Branch:** `full-website-realignment` (current branch, do not create a new one).

## Design system

`brand-base` with `brand-clinical` scope. Phases 5 and 6 (case-studies and ingredients) also require stripping legacy `premium-base.css` classes in the same pass.

## Reference implementations

- **Home, `/start`, `/funnel`** - existing clinical pages to mirror structure from.
- **`app/components/LabCaseStudies.tsx`** - reference for the case-studies page treatment (spec-card grid, dataset summary strip in `lab-asset-frame`, mono tabular-nums, hairline borders).
- **`app/components/landing/LandingFAQ.tsx`** - reference for FAQ style across any page that renders an FAQ accordion.

## Aesthetic migration checklist (per page)

- Add `brand-clinical` wrapper to the page root div (both mobile and desktop returns where applicable).
- Swap primary CTAs to `ConkaCTAButton`. For handler-based buttons that are not links, replicate the visual directly per `FunnelCTA.tsx`, do not invent a new variant.
- Apply the trio header pattern at each section boundary: mono eyebrow, `brand-h1` heading, mono sub line.
- Use hairline borders (`border-black/8` to `/12`) on cards, no shadows, no radii.
- Wrap tabular data surfaces in `lab-asset-frame`.
- Replace bullet points with em-dash list treatment.
- Apply `tabular-nums` to all numeric values, units, percentages, and PMIDs. Use `font-mono` for labels.
- Remove `lab-clip-tr` from any non-interactive surface. Keep only on primary CTAs, nav buttons, and tags.
- Remove gradients, decorative fills, centre-aligned headings, and emoji labels.

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Product PDPs (`/conka-flow` + `/conka-clarity`) paired | Done |
| 2 | Balance protocol (`/protocol/3`) | Done |
| 3 | Science page | Not Started |
| 4 | Our Story page | Not Started |
| 5 | Case Studies page (one-pass: legacy premium-base to clinical) | Not Started |
| 6 | Ingredients page (one-pass: legacy premium-base to clinical) | Not Started |

All six phases are active under a single ticket. Each phase ships independently via Vercel preview.

## Phase detail

### Phase 1: `/conka-flow` + `/conka-clarity`

Pages are structurally identical, migrate together to share QA.

1. Add `brand-clinical` wrapper to both page roots (mobile and desktop returns).
2. Audit `ProductHero` / `ProductHeroMobile`: trio header, remove radii, swap primary CTA to `ConkaCTAButton` pattern (or replicate for handler-based buttons), hairline borders on data rows, `tabular-nums` on prices.
3. Audit `FormulaBenefitsStats`, `FormulaIngredients`, `FormulaBenefits` / `FormulaBenefitsMobile`, `HowItWorks`, `FormulaFAQ`, `FormulaCaseStudies` / `FormulaCaseStudiesMobile`, `WhatToExpect` for: trio headers, em-dash bullets, hairline borders, `lab-asset-frame` on data surfaces, mono labels with `tabular-nums`, removal of shadows, gradients, radii.
4. Audit `StickyPurchaseFooter` / `StickyPurchaseFooterMobile`: square buttons, navy CTA, mono price labels, remove radii.
5. Spot-check `Testimonials` and `ProductGrid` under `brand-clinical` (they inherit tokens, usually no edits needed).
6. Apply `LandingFAQ` styling patterns to `FormulaFAQ` if divergent.

### Phase 2: `/protocol/3` (Balance)

Scope evolved during implementation. Rather than restyle each Landing* component in place, swap them for the Lab* equivalents already used on `/` and `/start`. Each shared component exposes `hideCTA` / `ctaHref` / `ctaLabel` props so CTA targeting stays under the page's control.

**2A. Hero restyle.** Apply the clinical treatment already in `ProductHero` / `ProductHeroMobile` to `ProtocolHero` / `ProtocolHeroMobile`. Square tier tiles (PackSelectorPremium pattern), navy selected state, square Subscribe/Buy-Once tiles, `FunnelCTA` replica for the Add-to-Cart button, em-dash bullets, mono tabular-nums on prices, remove emoji. Balance-specific: no ratio selector, no subtitle pill.

**2B. Section component swaps** on `app/protocol/[id]/page.tsx` (mobile and desktop branches):

| Current | Swap to | CTA handling |
|---------|---------|--------------|
| `HomeWhatItDoes` | `LandingWhatItDoes` | inherits |
| (new section) | `WhyConkaWorks` | inserted between WhatItDoes and CaseStudies |
| `CaseStudiesDataDriven` | `LabCaseStudies` | `hideCTA` (self-link) |
| `LandingGuarantee` | `LabGuarantee` | keep `ctaHref="/app"` |
| `LandingTimeline` | `LabTimeline` | `hideCTA` |
| `LandingFAQ` | `LabFAQ` | `hideCTA` |

**2C. Add `brand-clinical` wrapper** to both mobile and desktop page roots.

**2D. Deprecation sweep.** For each `LandingFAQ`, `LandingGuarantee`, `LandingTimeline`, `HomeWhatItDoes`, grep usages. If the only remaining import was `/protocol/[id]/page.tsx`, delete the component file. `CaseStudiesDataDriven` stays — still used on `/app` and `/professionals/protocol`.

**Out of scope.** `/protocol/1`, `/protocol/2`, `/protocol/4` are slated for removal per `WEBSITE_SIMPLIFICATION_PLAN.md`. Do not restyle their sections. `ProtocolCalendar` audit skipped — Balance hides the calendar.

**Known deviations from plan-doc base rules.** Swapping components changes copy by definition (different component = different content). Also adds `WhyConkaWorks` as a new section, which is an IA change. Accepted trade in service of alignment goal.

### Phase 3: `/science`

1. Add `brand-clinical` wrapper.
2. Audit `ScienceHero`, `ScienceQuote`, `ScienceAdaptogens`, `SciencePillars`, `FlowVsClear`, `ScienceDifferent`, `EvidenceSummary` for trio headers, `lab-asset-frame` on data surfaces, mono labels on stats and PMIDs, em-dash bullets, removal of radii.

### Phase 4: `/our-story`

1. Add `brand-clinical` wrapper.
2. Audit `OurStoryHero`, `StorySection`, `OurStoryCTA`. Narrative-heavy page: focus on trio headers, mono meta lines, hairline dividers, no decorative radii on imagery.

### Phase 5: `/case-studies` (one-pass migration)

1. Replace `premium-section-luxury premium-bg-bone` with `brand-section brand-bg-*` and add `brand-clinical` wrapper.
2. Audit `CaseStudiesPageDesktop` and `CaseStudiesPageMobile` for `premium-*` class usage: strip `premium-card-soft`, `premium-body`, `premium-section-heading`, replace with brand equivalents.
3. Use `app/components/LabCaseStudies.tsx` as the reference for spec-card treatment, dataset summary strip, and mono spec blocks. The existing page has richer content than the home teaser, so extend the pattern, do not copy the component wholesale.
4. Watch for the `.premium-pdp` sticky positioning gotcha flagged in `CLAUDE.md`.

### Phase 6: `/ingredients` (one-pass migration)

1. Replace `premium-section-luxury premium-bg-bone` with `brand-section brand-bg-*` and add `brand-clinical` wrapper.
2. Audit `IngredientsPageDesktop` and `IngredientsPageMobile`, same premium-base strip as Phase 5.
3. Apply `lab-asset-frame` to any ingredient data surfaces (dosages, sources, research references).

## Rabbit holes

- **Rewriting components instead of restyling.** The directive is visual alignment only. If a component has structural problems, document them and defer to a follow-up ticket. Do not refactor while restyling.
- **Case Studies and Ingredients scope creep.** Two-step migration (premium to brand to clinical) can turn into "while I'm here, let me improve the IA." Resist. The goal is brand consistency, not redesign.
- **ConkaCTAButton edge cases.** Some existing CTAs fire handlers, not links. Replicate the visual directly via `FunnelCTA` pattern, do not invent a new variant.
- **Trio header fatigue.** Every section opens with one, but not every sub-block should. Apply once per section boundary, not per card.

## No-gos

- No copy changes, no IA changes, no new sections.
- No component consolidation or refactors.
- No touching already-clinical pages (home, `/start`, `/funnel`).
- No new Tailwind utilities outside `app/brand-base.css`.
- Not migrating other protocols (`/protocol/1`, `/protocol/2`, `/protocol/4`), Balance only.

## Risks

- **Shared components ripple.** Migrating `ProductHero` updates both Flow and Clarity. Regressions on one appear on both. QA both after every shared-component change.
- **Legacy premium-base pages may use bespoke Tailwind overrides** not covered by clinical tokens. Expect cleanup in Phases 5 and 6.
- **Mobile parity.** Split Desktop/Mobile component pairs must be migrated in lockstep or the mobile breakpoint looks off-brand.
- **Sticky footer positioning.** `.premium-pdp` overflow-hidden breaks `position: sticky` per `CLAUDE.md`. Watch during Phases 5 and 6 premium-base strip.

## References

- Aesthetic contract: `docs/branding/CLINICAL_AESTHETIC.md`
- Reference implementations: `app/page.tsx`, `app/start/page.tsx`, `app/funnel/FunnelClient.tsx`
- Case-studies reference: `app/components/LabCaseStudies.tsx`
- FAQ reference: `app/components/landing/LandingFAQ.tsx`
- Design system: `docs/branding/DESIGN_SYSTEM.md`
- Project instructions: `CLAUDE.md`

## Jira tickets

| Key | Title | Phase | Status |
|-----|-------|-------|--------|
| [SCRUM-906](https://conka.atlassian.net/browse/SCRUM-906) | Clinical aesthetic alignment - product PDPs, protocol 3, science, our story, case studies, ingredients | All phases (1-6) | To Do |

Sprint 24. Epic category: Website and CRO (SCRUM-763). High priority.
