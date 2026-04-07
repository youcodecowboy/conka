# Website Styling Migration Tracker

> **Status:** In Progress
> **Created:** 2026-04-07
> **Last updated:** 2026-04-07
> **Context:** Migrating all pages from the legacy `premium-base.css` design system to the new `brand-base.css` system. See [DESIGN_SYSTEM.md](../branding/DESIGN_SYSTEM.md) for the target system and [LANDING_PAGE_VISUAL_SYSTEM.md](../branding/LANDING_PAGE_VISUAL_SYSTEM.md) for the visual approach.

---

## Migration target

The new system (`brand-base.css`) replaces the legacy system (`premium-base.css`). Key changes:

| Area | Legacy (`premium-base.css`) | Target (`brand-base.css`) |
|------|---------------------------|--------------------------|
| Section wrapper | `.premium-section-luxury` | `.brand-section` |
| Track | `.premium-track` | `.brand-track` |
| Light background | `.premium-bg-bone` (#F9F9F9) | `.brand-bg-white` (#FFFFFF) / `.brand-bg-tint` (#F4F5F8) |
| Dark background | `.premium-bg-ink` (#111111) | `.brand-bg-black` (use sparingly, max 1 per page) |
| Card radius | `--premium-radius-card` (40px) | `--brand-radius-card` (32px) |
| Button radius | `--premium-radius-interactive` (pill/999px) | `--brand-radius-interactive` (16px) |
| Container radius | 20px | `--brand-radius-container` (24px) |
| Headers | Centred (`.premium-header-group`) | Left-aligned (`.brand-h1`, `.brand-h2`, `.brand-h3`) |
| Body copy | `.premium-body` | `.brand-body` |
| Primary font | Poppins/Syne/DM Sans | Neue Haas Grotesk Display |
| Data font | IBM Plex Mono | JetBrains Mono |
| Accent colour | Neuro blue gradient system | Single `#4058BB` on CTAs only |
| Background rhythm | Bone/ink alternation | White/tint alternation (~96% lightness) |

---

## Page migration status

| Route | Current System | Priority | Status | Ticket | Notes |
|-------|---------------|----------|--------|--------|-------|
| `/` (homepage) | Premium | **High** | Not Started | SCRUM-855, SCRUM-856 | Phase 1 (perf) + Phase 2 (visual alignment) |
| `/start` | Brand | -- | Done | SCRUM-840 | Reference implementation for other migrations |
| `/funnel` | Brand | -- | Done | SCRUM-840 | |
| `/conka-flow` | Premium | Medium | Not Started | -- | PDP page. Complex (desktop/mobile split, premium-pdp wrapper) |
| `/conka-clarity` | Premium | Medium | Not Started | -- | PDP page. Same complexity as /conka-flow |
| `/why-conka` | Premium | Medium | Not Started | -- | Content page with multiple sections |
| `/our-story` | Premium | Medium | Not Started | -- | Content page with multiple sections |
| `/science` | Premium | Medium | Not Started | -- | Content page with multiple sections |
| `/case-studies` | Premium | Low | Not Started | -- | Simple wrapper around shared component |
| `/ingredients` | Premium | Low | Not Started | -- | Simple wrapper around shared component |
| `/app` | Premium | Low | Not Started | -- | App promotion page |
| `/professionals` | Mixed (Premium + inline vars) | Low | Not Started | -- | B2B portal. Lower traffic. |
| `/professionals/formulas` | Mixed | Low | Not Started | -- | B2B sub-page |
| `/professionals/protocol` | Mixed | Low | Not Started | -- | B2B sub-page |
| `/protocol/[id]` | Premium | **Being removed** | N/A | -- | Redirect planned (simplification) |
| `/shop` | Premium | **Being removed** | N/A | -- | Redirect planned (simplification) |
| `/quiz` | Premium + inline | **Being removed** | N/A | -- | Hidden, redirect planned |
| `/quiz/results` | Premium + inline | **Being removed** | N/A | -- | Hidden, redirect planned |
| `/account` | Inline vars only | Low | Not Started | -- | Auth/account pages. Functional, not marketing. |
| `/account/login` | Inline vars only | Low | Not Started | -- | |
| `/account/register` | Premium + inline | Low | Not Started | -- | |
| `/account/orders` | Premium | Low | Not Started | -- | |
| `/account/subscriptions` | Premium | Low | Not Started | -- | Complex (modals, subscription management) |
| `/privacy` | Minimal (inline vars) | Low | Not Started | -- | Legal page. Low styling needs. |
| `/terms` | Minimal (inline vars) | Low | Not Started | -- | Legal page. |
| `/cookies` | Minimal (inline vars) | Low | Not Started | -- | Legal page. |
| `/barrys` | Premium + inline | Low | Not Started | -- | Partnership page |
| `/win` | Premium + inline | Low | Not Started | -- | Competition page |

---

## Shared components migration

Components used across multiple pages need careful migration (test all consuming pages).

| Component | Used On | Current System | Status | Notes |
|-----------|---------|---------------|--------|-------|
| `Testimonials` / `TestimonialCard` | `/`, `/start` | Premium | Not Started | Shared between homepage and /start. Migration affects both. |
| `CaseStudiesDataDriven` | `/`, `/start`, `/case-studies` | Premium | Not Started | Shared across 3 pages. Has `hideCTA` prop. |
| `Navigation` | All pages | Premium | Not Started | Global component. Migrate last or alongside layout.tsx. |
| `Footer` | All pages | Premium | Not Started | Global component. Migrate last or alongside layout.tsx. |

---

## Migration order (recommended)

1. **Homepage** (`/`) -- highest organic traffic, currently scoped
2. **Content pages** (`/why-conka`, `/our-story`, `/science`) -- medium traffic, similar structure
3. **PDP pages** (`/conka-flow`, `/conka-clarity`) -- complex but high value
4. **Remaining pages** -- lower priority, migrate as touched
5. **Global components** (`Navigation`, `Footer`) -- migrate when most pages are on brand-base
6. **Account pages** -- functional pages, lowest visual priority

---

## When to retire premium-base.css

Once all active pages (non-removed routes) are migrated, `premium-base.css` can be removed from the project. Until then, both CSS files coexist.

---

## References

- [Design System](../branding/DESIGN_SYSTEM.md) -- target system specification
- [Landing Page Visual System](../branding/LANDING_PAGE_VISUAL_SYSTEM.md) -- visual approach and evidence base
- [Brand Voice](../branding/BRAND_VOICE.md) -- copy guidelines
- [Quality Standards](../branding/QUALITY_STANDARDS.md) -- quality bar
- [Website Simplification Plan](./WEBSITE_SIMPLIFICATION_PLAN.md) -- routes being removed
