# Lab-to-brand-base Migration

Promote the `/startV1` clinical aesthetic into `app/brand-base.css`, swap `/start` to use the new components, and delete `/startV1`. Single PR covering Phases 1-4.

## Problem

`/startV1` landed a clinical visual direction the team validated as CONKA's landing aesthetic. Today that aesthetic is locked to `/startV1` via a scoped `.lab-theme` class in `app/startV1/lab.css` plus 12 `Lab*` components. Paid-social traffic lands on `/start`, which still runs the older landing look. We need to promote the clinical system into the brand base and switch `/start` over.

## Who it serves

Paid-social arrivals on `/start` from Meta ads. Primary acquisition surface. 74% mobile, cold traffic, cognitive-performance positioning.

## Business impact

CRO. Visual consistency of the clinical aesthetic across every fold of `/start` lifts perceived premium positioning and aligns the acquisition page with the agreed brand direction. `/start` is where it has the most leverage.

## Appetite

1 day of focused work. Phases 1-4 ship as one PR against `main`. Funnel and remaining pages are a separate follow-up.

## Approach

Promote `lab.css` token overrides and primitives into `app/brand-base.css` behind an opt-in scope class `.brand-clinical`. Content-swap five `Landing*` components whose only consumer is `/start` with their `Lab*` bodies (keeping the `Landing*` name). For `Lab*` components whose `Landing*` counterpart is shared with other pages (`/protocol`, ProtocolHero, `/app`, `/professionals/protocol`), move them into `app/components/landing/` under the `Lab*` name and import them directly on `/start`, leaving the shared `Landing*` versions untouched. Then delete `app/startV1/` wholesale.

## Design system decision

**`brand-base.css`, augmented.** A new opt-in scope class `.brand-clinical` carries the token overrides (radius 0, accent `#1B2757`, tint `#f5f5f5`, mobile hero flush). Primitives (`.lab-asset-frame`, `.lab-clip-tr`, `@keyframes lab-blink`) are promoted unscoped as opt-in utilities. No blast radius on pages that do not apply `.brand-clinical`.

## Cross-reference map

This drove Phase 2's rename vs move decisions.

| Landing component | Also used on | Decision |
|---|---|---|
| LandingHero | /start only | Content-swap with LabHero body |
| LandingWhatItDoes | /start only | Content-swap with LabWhatItDoes body |
| LandingValueComparison | /start only | Content-swap with LabValueComparison body |
| LandingCTA | /start only | Content-swap with LabCTA body |
| LandingTestimonials | /start only | Content-swap with LabTestimonials body |
| LandingTimeline | /protocol/[id] | Keep legacy; move LabTimeline into components/landing/ |
| LandingGuarantee | /protocol/[id] | Keep legacy; move LabGuarantee into components/landing/ |
| LandingFAQ | /protocol/[id] | Keep legacy; move LabFAQ into components/landing/ |
| LandingTrustBadges | ProtocolHero, ProtocolHeroMobile | Keep legacy; move LabTrustBadges into components/landing/ |
| CaseStudiesDataDriven | /app, /protocol/[id], /professionals/protocol | Keep legacy; move LabCaseStudies into components/ |
| Reveal | /our-story, /science, /start | Untouched |
| LandingDisclaimer | /start, /startV1 | Untouched |
| LabDosingWindows, LabWhatsInsideMini | /start only (no Landing counterpart) | Move into components/landing/ under Lab* name |

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Augment brand-base.css with lab tokens and primitives | Not Started |
| 2 | Relocate Lab components (5 content-swaps, 7 moves) | Not Started |
| 3 | Wire /start page imports and apply `.brand-clinical` | Not Started |
| 4 | Delete /startV1 and verify build | Not Started |
| 5 | Align remaining pages (/protocol, /home, /science, /our-story, funnel, shared Landing components) | Future |

All 4 active phases ship as a single PR.

## Active Phase Task Breakdown

### Phase 1 - Augment brand-base.css

1. **Promote lab tokens into `.brand-clinical` scope block.** Copy the `.lab-theme` override rule into `brand-base.css` renamed as `.brand-clinical`. Include radius 0, accent `#1B2757`, tint `#f5f5f5`, and the mobile hero-first flush rule. Must be placed after `:root` for cascade to work.
   - Files: `app/brand-base.css`
   - Complexity: Small
2. **Promote `.lab-asset-frame` and `.lab-clip-tr` as unscoped utilities.** Both are opt-in, no default impact.
   - Files: `app/brand-base.css`
   - Complexity: Small
3. **Promote `@keyframes lab-blink`.** Already consumed by LabCTA inline.
   - Files: `app/brand-base.css`
   - Complexity: Small

### Phase 2 - Relocate Lab components

4. **Content-swap /start-only Landing components.** Overwrite 5 files with Lab body. Rewrite all internal imports: `./LabCTA` to `./LandingCTA`, sibling `./LabX` references where those Lab files have moved to `components/landing/`.
   - Files:
     - `app/components/landing/LandingHero.tsx` (overwrite from `app/startV1/LabHero.tsx`)
     - `app/components/landing/LandingWhatItDoes.tsx` (overwrite from `app/startV1/LabWhatItDoes.tsx`)
     - `app/components/landing/LandingValueComparison.tsx` (overwrite from `app/startV1/LabValueComparison.tsx`)
     - `app/components/landing/LandingCTA.tsx` (overwrite from `app/startV1/LabCTA.tsx`)
     - `app/components/landing/LandingTestimonials.tsx` (overwrite from `app/startV1/LabTestimonials.tsx`)
   - Dependencies: Phase 1 utilities.
   - Complexity: Medium
5. **Move shared-conflict Lab components into components/landing/.** Six files keep the `Lab*` name and get relocated. Adjust relative imports inside each.
   - Files moved:
     - `app/startV1/LabTimeline.tsx` → `app/components/landing/LabTimeline.tsx`
     - `app/startV1/LabGuarantee.tsx` → `app/components/landing/LabGuarantee.tsx`
     - `app/startV1/LabFAQ.tsx` → `app/components/landing/LabFAQ.tsx`
     - `app/startV1/LabTrustBadges.tsx` → `app/components/landing/LabTrustBadges.tsx`
     - `app/startV1/LabDosingWindows.tsx` → `app/components/landing/LabDosingWindows.tsx`
     - `app/startV1/LabWhatsInsideMini.tsx` → `app/components/landing/LabWhatsInsideMini.tsx`
   - Dependencies: Task 4.
   - Complexity: Medium
6. **Move LabCaseStudies to components/.** Mirrors `CaseStudiesDataDriven.tsx` location.
   - Files: `app/startV1/LabCaseStudies.tsx` → `app/components/LabCaseStudies.tsx`
   - Complexity: Small

### Phase 3 - Wire /start

7. **Update /start imports and apply `.brand-clinical`.** Swap `CaseStudiesDataDriven` to `LabCaseStudies`, `LandingTimeline` to `LabTimeline`, `LandingGuarantee` to `LabGuarantee`, `LandingFAQ` to `LabFAQ`. Delete the `TestimonialsSection.tsx` wrapper and render `LandingTestimonials` directly inside its own `<section>` matching `/startV1`'s pattern. Add `brand-clinical` to the page root div.
   - Files: `app/start/page.tsx`, delete `app/start/TestimonialsSection.tsx`
   - Dependencies: Phase 2.
   - Complexity: Medium
8. **Visual QA at 390px and desktop.** Confirm every section matches `/startV1`'s appearance: hero, what-it-does sticky image, value comparison chart, case studies grid, testimonials carousel, timeline banner, guarantee phone mock, FAQ, disclaimer.
   - Dependencies: Task 7.
   - Complexity: Small

### Phase 4 - Delete /startV1 and verify

9. **Delete `app/startV1/` recursively.** Removes the prototype page, `lab.css`, and the 5 now-orphaned Lab files (Hero, WhatItDoes, ValueComparison, CTA, Testimonials) whose bodies now live in their Landing counterparts.
   - Files: `app/startV1/` directory
   - Dependencies: Task 7.
   - Complexity: Small
10. **Build, lint, grep sweep.** `npm run lint && npm run build`. Grep for residual `from "@/app/startV1"` or `from "../startV1"` imports across the tree.
    - Complexity: Small

## Rabbit Holes

- **Cascade specificity when promoting tokens.** `.brand-clinical` must appear after `:root` in `brand-base.css` or overrides will not apply.
- **Internal imports inside content-swapped files.** LabWhatItDoes imports LabCTA, LabTrustBadges, LabWhatsInsideMini, LabDosingWindows. After swap it becomes LandingWhatItDoes importing LandingCTA plus three moved Lab siblings. Easy to leave a dangling `../startV1/` import. Grep for `startV1` after every file edit.
- **ProtocolHero imports LandingTrustBadges** — double-check that moving LabTrustBadges into `components/landing/` does not accidentally touch that import path.
- **TestimonialsSection deletion.** Current `app/start/TestimonialsSection.tsx` bundles `LandingTestimonials` with a LandingCTA header. After swap the new LandingTestimonials body is standalone. Delete the wrapper and let `/start` render directly.
- **Root background.** `/start/page.tsx` root currently uses `bg-[var(--brand-white)]` which keeps working under `.brand-clinical` since tint applies inside individual sections only.

## No-Gos

- Funnel page alignment (separate scope).
- Visual migration of /home, /science, /our-story, /protocol/[id].
- Removing legacy `Landing*` components still referenced by other pages.
- Analytics, copy, pricing, or data-layer changes.

## Risks

- **Import-path regressions.** Biggest risk. Mitigation: grep for `startV1` after each phase and before commit.
- **`.brand-clinical` scope leak.** If a shared component inside `/start` rendered on another page inherited the class, tokens would cascade. Class lives on `/start`'s root div only, so it cannot leak. Verify during Phase 3 QA on `/science` and `/our-story` (both use `Reveal`).
- **Section rhythm parity.** Both pages use the same `brand-section` plus `brand-bg-{white|tint}` pattern, so rhythm should transfer exactly. Confirm during Task 8.

## References

- Design system: `docs/branding/DESIGN_SYSTEM.md`
- Prior plan: `docs/development/featurePlans/lab-aesthetic-exploration.md` (contains the promoted primitives spec in "Core Design Principles" section)
- Current lab primitives: `app/startV1/lab.css`
- Project rules: `.claude/rules/pages.md`, `.claude/rules/components.md`

## Jira Tickets

| Key | Title | Phase | Status |
|-----|-------|-------|--------|
| [SCRUM-901](https://conka-team-jr1mzvwm.atlassian.net/browse/SCRUM-901) | [Website and CRO] Migrate Lab aesthetic into brand-base, swap /start, delete /startV1 | 1-4 | To Do |
