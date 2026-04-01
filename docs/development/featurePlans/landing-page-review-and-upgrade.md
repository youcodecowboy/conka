# Landing Page Review & Upgrade

> **Status:** Audit complete, planning next
> **Created:** 2026-04-01
> **Route:** `/start` (`app/start/page.tsx`)
> **Design system:** Currently legacy (`premium-base.css`), migration to `brand-base.css` planned

---

## Context

The landing page (`/start`) receives paid Meta traffic. It was built during the website simplification sprint and went through a claims compliance pass (see `docs/development/LANDING_PAGE_CLAIMS_LOG.md`). This document captures findings from the `/review-page` audit and plans the upgrade work.

---

## Audit Findings

### Critical

| # | Issue | Location | Detail |
|---|-------|----------|--------|
| 1 | **Guarantee mismatch** | `offerConstants.ts` vs FAQ + Disclaimer | Constants define 100-day guarantee. `LandingFAQ.tsx` hardcodes "30-day" (3 occurrences). `LandingDisclaimer.tsx` hardcodes "30-day". Must be resolved and all references must import from `offerConstants.ts`. |
| 2 | **Missing `noindex` metadata** | `app/start/page.tsx` | No metadata export at all. Page can be indexed by Google. Needs `robots: { index: false, follow: false }` + title + description. |
| 3 | **Entire page is Client Component** | `app/start/page.tsx:1` | `"use client"` on the page. Most content is static. Should be a Server Component with interactive parts kept client-side. |

### Legal / Claims (AMBER -- borderline)

| # | Issue | Location | Detail |
|---|-------|----------|--------|
| 4 | Implied cognitive performance claim | `LandingHero.tsx:38-40` | "Sharp at 9am. Still sharp at 9pm." implies product keeps you mentally sharp all day. No authorised claim supports this. |
| 5 | Comparative efficacy implication | `LandingHero.tsx:52` | "Coffee borrows from tomorrow. CONKA invests in it." implies superior cognitive benefit to coffee. |
| 6 | Implied health claims in section heading | `LandingBenefits.tsx:119-123` | "What it feels like to stay sharp." implies product delivers sharpness. |
| 7 | Health claims for non-authorised ingredients | `LandingBenefits.tsx:8-67` | "Sharper Focus" attributed to Lemon Balm, "Stress Resilience" attributed to Ashwagandha. These ingredients have no EFSA authorised claims. |
| 8 | Implied cognitive claims in product benefits | `LandingProductSplit.tsx:68-76` | "Calm focus that builds", "Win the day before it starts" for Flow. |
| 9 | Implied therapeutic benefit | `LandingProductSplit.tsx:117` | "Clears the mental debt of a hard day" implies cognitive therapeutic benefit. |
| 10 | Health claims attributed to non-authorised ingredients | `LandingWhatsInside.tsx:22` | "supports your nervous system and focus with adaptogens like Ashwagandha and Lemon Balm, so you stay sharp" |
| 11 | Implied health benefit | `LandingGuarantee.tsx:72` | "see the benefits of CONKA yourself" implies measurable health benefits. |

### Brand Voice

| # | Issue | Location | Detail |
|---|-------|----------|--------|
| 12 | Hero leads with outcome, not pain | `LandingHero.tsx:38` | Copy rule #1: lead with pain or counterintuitive truth, not product name or outcome. |
| 13 | Missing daily cost framing | Entire page | No "from 2.29/day" or equivalent. Copy rules say to include daily cost. |
| 14 | Missing anchor symbols in hero | `LandingHero.tsx:24,94` | "150,000+ bottles sold" missing `§`. "500+ reviews" missing `‡`. |
| 15 | Unclear copywriting framework | Entire page | Mix of Authority First and PAS without committing to either for the cold traffic audience. |

### Performance

| # | Issue | Location | Detail |
|---|-------|----------|--------|
| 16 | Raw `<img>` tag | `LandingGuarantee.tsx:103-114` | Phone mockup uses `<img>` instead of `next/image`. Missing optimization. |
| 17 | No `loading.tsx` | `app/start/` | No Suspense boundary for the route. |

### Visual / Design System

| # | Issue | Location | Detail |
|---|-------|----------|--------|
| 18 | Consecutive same-background sections | `page.tsx:125-156` | Case Studies + FAQ both use `neuro-blue-light`. Creates visual monotony. |
| 19 | Legacy design system throughout | All components | Uses `premium-*` tokens. Candidate for `brand-base.css` migration. |
| 20 | `theme-conka-flow` wrapper | `page.tsx:43` | Sets legacy theme variables. Not needed for a landing page. |
| 21 | Placeholder avatars | `LandingHero.tsx:77-91` | Hardcoded initials/colours instead of real customer photos. Feels template-y. |
| 22 | Hardcoded colours | `LandingProductSplit.tsx:65,118` | `#f59e0b`, `#0ea5e9`, `#b45309`, `#0369a1` should be design tokens. |
| 23 | Centre-aligned headers | Multiple components | New brand guidelines require left-alignment. Hero, product split, guarantee all centre-align headers. |

### What's Working Well

- Comprehensive disclaimer footer with all anchor definitions (AG1-level)
- Claims remediation from compliance log is thorough (observational reframing)
- Conversion flow: single CTA per section, consistent funnel direction, progressive trust building
- Mobile layout is genuinely native, not a squeezed desktop
- Section/track architecture correctly implemented
- Progressive disclosure via tap-to-expand and accordion patterns
- Dynamic imports with CLS-preventing placeholder heights
- `GUARANTEE_LABEL` imported from `offerConstants.ts` in `LandingBenefits.tsx` (correct pattern)

---

## Code Review Findings

### Critical
- `FUNNEL_URL` duplicated in 7 component files + `page.tsx`. Should be a single shared constant or passed as prop.
- `page.tsx` is `"use client"` unnecessarily. Should be Server Component with testimonial shuffle in a small client wrapper.

### Important
- `LandingGuarantee.tsx:103` uses raw `<img>` instead of `next/image` for phone mockup.
- `LandingProof.tsx` is dead code (not imported anywhere). Delete it.
- CTA button pattern copy-pasted across 8 locations. Should be a shared `LandingCTA` component.
- Inline SVG icons in `LandingBenefits.tsx` make the file hard to read. Consider extracting.
- CSS hack `[&_a[href='/case-studies']]:hidden` in `page.tsx:132` is fragile. Add a `hideCTA` prop to the shared component instead.
- Hardcoded colour values in `LandingProductSplit.tsx` (#f59e0b, #0ea5e9, etc.).

### Minor
- Inconsistent radius (some `rounded-2xl`, some `var(--premium-radius-card)`, some mixed).
- Testimonials section causes layout shift (empty array on first render, populated by useEffect).
- `HeroTrustBadges` import couples to unused exports from `HeroShared.tsx`.

---

## Phase Plan

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Critical fixes (guarantee, metadata, Server Component, FUNNEL_URL) | Not Started |
| 2 | Code quality (shared CTA component, delete dead code, fix img tag, remove CSS hack) | Not Started |
| 3 | Claims compliance pass (AMBER items) | Not Started |
| 4 | Brand voice + copy improvements | Not Started |
| 5 | Design system migration (premium -> brand) + visual fixes | Future |

---

## Jira Tickets

_To be created after scoping._

---

## References

- Claims compliance log: `docs/development/LANDING_PAGE_CLAIMS_LOG.md`
- Claims compliance reference: `docs/branding/CLAIMS_COMPLIANCE.md`
- Brand voice: `docs/branding/BRAND_VOICE.md`
- Design system: `docs/branding/DESIGN_SYSTEM.md`
- Quality standards: `docs/branding/QUALITY_STANDARDS.md`
- Offer constants: `app/lib/offerConstants.ts`
