# Mobile Optimization Guide

This document captures the lessons learned and preferences established during the homepage mobile optimization. Use this as a reference when optimizing product pages and other sections of the site.

---

## Core Principles

### 1. Component Architecture

- **Split components** for mobile and desktop versions when layouts differ significantly
- Use the `useIsMobile()` hook (breakpoint: 1024px / `lg`) for conditional rendering
- Pattern: `ComponentName.tsx` (wrapper) → `ComponentNameDesktop.tsx` + `ComponentNameMobile.tsx`
- Mobile components should be **lightweight and focused** - the majority of traffic is mobile

### 2. Visual Hierarchy

- **Reduce visual clutter** - mobile screens have limited space
- **Progressive disclosure** - show essential info first, hide details in collapsible sections
- Avoid overwhelming users with too much content at once
- Lead with the most important information (stats, visuals, CTAs)

### 3. Simplify, Don't Just Shrink

- Mobile is not just "smaller desktop" - it requires rethinking the layout
- Remove non-essential elements (some images, detailed tables, etc.)
- Focus on core value propositions and CTAs

---

## Component Patterns

### Sticky Purchase Footers

**Used in:** Protocol Builder Mobile, Trial Packs Mobile

- Sticky footer with pricing and CTA persists as user scrolls
- Should be **collapsible/dismissable** with X button
- Appears only after user makes a selection (not by default)
- Re-appears when user makes new selections
- Slide-up animation for smooth appearance (`animate-slide-up`)

**Structure:**

```
┌─────────────────────────────────────────────────────┐
│ [X close]                                           │
│ [Color] Product Name • Variant    Price + Shipping  │
│ [Learn More]  [Add to Cart / Subscribe]             │
└─────────────────────────────────────────────────────┘
```

**Styling:**

- `fixed bottom-0 left-0 right-0`
- `bg-[var(--background)] border-t-2 border-black/10`
- `shadow-[0_-4px_20px_rgba(0,0,0,0.1)]`
- Split action buttons: outline for secondary, filled for primary

### Collapsible/Accordion Sections

**Used in:** Key Benefits, Protocol Builder, Trial Packs, Ingredients

- Use for secondary information that adds context but isn't essential
- Toggle with chevron icon rotation
- Smooth expand/collapse transition
- Examples: "Clinical Study Details", "What's Included", "View Full Month"

**Pattern:**

```tsx
<button onClick={() => setExpanded(!expanded)}>
  <span>Section Title</span>
  <ChevronIcon className={expanded ? "rotate-180" : ""} />
</button>;
{
  expanded && <div className="content-transition">...</div>;
}
```

### Selection Grids

**Used in:** Protocol Selector, Trial Packs, FAQ

- **2x2 grids** preferred over horizontal scroll for 4 items
- 3-column grids for 3 items (pack sizes)
- Each card should be tap-friendly with clear selected state

**Styling:**

```tsx
className = "grid grid-cols-2 gap-3";
// Selected state
selectedItem === item ? "bg-black text-white" : "border-2 border-black/10";
```

### Horizontal Scroll Carousels

**Used in:** Key Benefits (benefit pills)

- Only when there are 5+ items that can't fit in a grid
- **Must include scroll indicators:**
  - Dots showing position
  - "swipe for more" text
  - Fade gradients on edges
- Use `snap-x snap-mandatory` for snap scrolling
- Hide scrollbar with `.scrollbar-hide` utility

---

## Button Styling

### Primary Buttons (CTAs)

```tsx
className =
  "neo-button px-5 py-2 font-semibold text-sm flex items-center gap-2";
```

- Filled background, white text
- Icon + text layout (horizontal)

### Secondary/Outline Buttons

```tsx
className =
  "neo-button-outline px-5 py-2 font-semibold text-sm flex items-center gap-2";
```

- Transparent with border
- Same sizing as primary

### Selection Pills/Cards

```tsx
className =
  "px-4 py-2 rounded-lg border-2 border-current/30 hover:border-current/60 flex items-center gap-2";
// Selected state
className = "bg-black text-white border-current";
```

- `rounded-lg` (not `rounded-full`)
- Slim padding (`py-2` not `py-4`)
- Horizontal icon + text layout
- Smaller icons (`w-4 h-4`)

### Consistency Rules

- All buttons use `rounded-lg` (not `rounded-full`)
- Icons are inline with text, not stacked above
- Uniform padding across similar button types
- Border opacity varies for unselected/hover/selected states

---

## Typography & Spacing

### Headers

- Left-aligned on mobile (not centered) for most sections
- Exception: Hero section can remain centered
- Use `text-2xl font-bold` for section headings on mobile

### Subtext

- Use `font-clinical text-xs` for labels
- Use `font-commentary` for descriptive text
- Opacity: `opacity-60` to `opacity-70` for secondary text

### Spacing

- Section padding: `px-6 py-12` on mobile
- Gap between elements: `gap-2` to `gap-4` (smaller than desktop)
- Bottom padding when sticky footer present: `pb-40`

---

## Images

### When to Include

- Hero section - keep but size appropriately
- Product shots in purchase flows
- Case study athlete photos (simplified)

### When to Exclude

- Key Benefits - focus on radar chart instead
- Ingredients section - table only
- Complex infographics - replace with text

### Sizing

```tsx
className = "w-48 h-auto mx-auto"; // Centered, controlled width
```

---

## Navigation (Mobile Menu)

### Structure

```
┌─────────────────────────────────────────────────────┐
│ [Logo]                                    [X close] │
├─────────────────────────────────────────────────────┤
│ NAVIGATION                                          │
│ ┌─────────────┐  ┌─────────────┐                   │
│ │ 🔬 Science  │  │ 🧪 Ingred.  │                   │
│ └─────────────┘  └─────────────┘                   │
│ ┌─────────────┐  ┌─────────────┐                   │
│ │ 📊 Results  │  │ 📖 Story    │                   │
│ └─────────────┘  └─────────────┘                   │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐ │
│ │ ❓ Find Your Protocol          [RECOMMENDED]    │ │
│ │    Take the Quiz                                │ │
│ │           [Take the Quiz]                       │ │
│ └─────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ SHOP PROTOCOLS                                      │
│ ┌──────────────┐  ┌──────────────┐                 │
│ │ Protocol 1   │  │ Protocol 2   │                 │
│ └──────────────┘  └──────────────┘                 │
├─────────────────────────────────────────────────────┤
│ ═══════════════════════════════════════════════════ │
│              [🛒 Cart]  (sticky footer)             │
└─────────────────────────────────────────────────────┘
```

### Key Features

- 2x2 grid for nav links with icons
- Quiz CTA prominently featured with RECOMMENDED badge
- Left-aligned product/protocol lists with icons
- Sticky cart footer (always visible)
- Section labels in uppercase, dimmed

---

## Footer

### Minimal Design

- Top divider line (`border-t-2`)
- Logo + mini nav links with dots
- Two CTAs: "Find Your Protocol" + "Buy CONKA"
- Subtle guarantee text
- No patent numbers or research stats

---

## When to Use Explicit Mobile Files vs Responsive-in-One

Use **explicit mobile components** when:

- Layout is fundamentally different (e.g. full-month calendar vs one-week, or grid vs single-column).
- Mobile has different sections or flows (e.g. calendar + pricing + CTA in one card on mobile).
- Keeping one file would mean large `isMobile` branches and harder-to-follow logic.

Use **responsive-in-one** (single component + `useIsMobile` and conditional UI) when:

- Same layout with smaller tweaks (e.g. tap vs hover, condensed copy, collapsible blocks).
- You want one source of truth and minimal duplication (e.g. CycleBreak: same two-column strip, different interaction and copy length on mobile).

Protocol PDP examples:

| Area | Pattern | Reason |
|------|--------|--------|
| Protocol calendar | Explicit: `ProtocolCalendarSectionMobile.tsx` | Mobile shows one week + “repeat for month”, inline tier/pricing/CTA; desktop shows 4-week grid + sidebar. |
| CycleBreak (Flow/Clear reveal) | Responsive-in-one: `CycleBreak.tsx` | Same two-column strip; mobile uses tap-to-reveal, shorter copy, no title in revealed block; desktop uses hover and full copy. |
| CycleTrap (science steps) | Responsive-in-one: `CycleTrap.tsx` | Same steps; mobile has collapsible “The science” and shorter nav labels. |

---

## Mobile-Specific Components Created

| Component                   | Purpose                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| `KeyBenefitsMobile.tsx`     | Horizontal scroll benefits, collapsible studies, radar chart focus |
| `IngredientsMobile.tsx`     | Formula toggle, table-only (no image), taste info                  |
| `CaseStudiesMobile.tsx`     | Single athlete view with prev/next navigation                      |
| `ProtocolBuilderMobile.tsx` | 2x2 protocol grid, calendar view, sticky CTA footer                |
| `TrialPacksMobile.tsx`      | Formula toggle, pack grid, collapsible sticky footer               |
| `WhatToExpectTimelineMobile.tsx` | Tap-to-expand timeline: time + headline always visible; body + formula gradient when expanded; one card open at a time |
| `FormulaBenefitsStatsMobile.tsx` | Huel-style layout: photo first, then title + subtitle, 2x3 stat grid, CTA button; wrapper uses `useIsMobile()` |
| `ProtocolCalendarSectionMobile.tsx` | One-week protocol calendar, tier/purchase toggles, pricing + CTA in one card; “repeat this cycle weekly for the month” |

---

## CSS Utilities Added

```css
/* Hide scrollbar for carousels */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Slide-up animation for sticky footers */
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out forwards;
}
```

---

## Checklist for New Mobile Components

- [ ] Create separate mobile component file
- [ ] Use `useIsMobile()` hook in wrapper for conditional rendering
- [ ] Simplify visual hierarchy (remove non-essential elements)
- [ ] Add collapsible sections for secondary info
- [ ] Implement sticky footer with CTA if purchase-related
- [ ] Use consistent button styling (`rounded-lg`, slim padding)
- [ ] Left-align headers (unless Hero)
- [ ] Test on actual mobile viewport (not just resize)
- [ ] Ensure tap targets are 44px+ for accessibility
- [ ] Add to changelog after implementation

---

## Product Page Optimization Notes

When applying these patterns to product pages:

1. **Product Hero** - Simplify to image + key info + CTA
2. **Protocol Details** - Calendar as hero visual, collapsible "why this works"
3. **Pricing/Subscription** - Sticky footer with price + subscribe button
4. **Reviews/Testimonials** - Single review with navigation (like Case Studies)
5. **Related Products** - Horizontal scroll or 2x2 grid
6. **Ingredient Details** - Collapsible table, no large images

Focus on the **conversion path**: Product understanding → Selection → Purchase
