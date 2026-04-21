# /startV1 Clinical Visual Prototype

> **Status:** Phase 1 active
> **Created:** 2026-04-20
> **Appetite:** Half a day
> **Design system:** `brand-base.css` with clinical Tailwind overrides
> **Branch:** feature branch off main

---

## Problem

The current `/start` page may not signal premium/clinical credibility at CONKA's price point. Before investing in a full redesign, the team needs a quick visual prototype to align on whether a sharper lab aesthetic is the right direction.

## Who it serves

Internal team alignment. Not live traffic.

## Business impact

Unblocks a brand direction decision that affects CRO investment. Low cost to answer a high-stakes visual question.

---

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Clinical prototype at /startV1 | Active |

---

## Approach

Duplicate `/start` at `/startV1`. Swap the hero with a full-bleed `CreationOfConka.jpg` image with text overlay. Add a three-cell clinical stat strip. Apply a sharper CTA button treatment. All shared landing components (`LandingWhatItDoes`, `CaseStudiesDataDriven`, testimonials etc.) used unchanged.

---

## Phase 1: Clinical Prototype

### Task 1.1 -- Route scaffold
- **What:** New `app/startV1/page.tsx` mirroring `/start` structure. `noindex` meta, no canonical. No nav link anywhere.
- **Complexity:** Small
- **Files:** `app/startV1/page.tsx`

### Task 1.2 -- Clinical hero (`LabHero`)
- **What:** Full-bleed `CreationOfConka.jpg` hero with text overlay. Left-aligned headline + rotating words mechanic (copied from `LandingHero`). Below or overlaid: three-cell stat strip in `brand-data` monospace -- `32 PEER-REVIEWED STUDIES`, `BATCH TESTED + INFORMED SPORT`, `CAMBRIDGE + DURHAM R&D`. Hero image gets `priority` flag for LCP.
- **Complexity:** Medium
- **Files:** `app/startV1/LabHero.tsx`

### Task 1.3 -- Clinical CTA button (`LabCTA`)
- **What:** New button treatment -- black fill, 4px radius (vs 16px default), uppercase tracking, monospace label. Drop-in replacement for `LandingCTA` on this page only.
- **Complexity:** Small
- **Files:** `app/startV1/LabCTA.tsx`

### Task 1.4 -- Wire up page
- **What:** Swap `LandingHero` -> `LabHero`, `LandingCTA` -> `LabCTA` throughout the page. All other sections unchanged.
- **Complexity:** Small
- **Files:** `app/startV1/page.tsx`

---

## Rabbit Holes

- `LandingHero` internals contain the rotating words mechanic -- copy it into `LabHero` rather than trying to extract/share it.
- Do not touch any shared landing component. All clinical changes are isolated to `app/startV1/`.

## No-Gos

- No analytics instrumentation (prototype only).
- No claims audit (stats are for visual direction; lock copy before any production use).
- No changes to `/start` or any shared component under `app/components/`.
- No nav link, no sitemap entry, no robots.txt change.
- No mobile split components -- single component is fine for a prototype.

## Risks

- Stats ("32 peer-reviewed studies", "Cambridge/Durham R&D") are unverified for claims compliance. Must not ship to production without a claims audit.
- `CreationOfConka.jpg` is a clean white-background shot -- overlay text legibility depends on the text placement relative to the hands/bottle. May need a subtle gradient scrim.

---

## Jira tickets

| Ticket | Phase | Description | Status |
|--------|-------|-------------|--------|
| SCRUM-895 | 1 | [Website & CRO] /startV1 clinical visual prototype | To Do |

---

## References

- `/start` page: `app/start/page.tsx` (reference implementation)
- Hero image: `public/lifestyle/CreationOfConka.jpg`
- Design system: `docs/branding/DESIGN_SYSTEM.md`
- Brand voice: `docs/branding/BRAND_VOICE.md`
- Quality standards: `docs/branding/QUALITY_STANDARDS.md`
