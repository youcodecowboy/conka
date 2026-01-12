# Banner System

## Overview

**What**: Site-wide promotional banner system that displays time-sensitive offers and announcements.

**Where**: Integrated into the Navigation component, automatically appears on all pages.

**Why**: Display promotions (e.g., Founding Member offers) without manually updating each page. Centralized management with automatic deadline handling and dynamic data integration.

---

## Architecture

### Location
`app/components/banner/`

### Key Files

- **`bannerConfig.ts`** - Configuration hook with Convex integration, deadline checking, and dynamic data fetching
- **`Banner.tsx`** - Main wrapper component that handles mobile/desktop detection
- **`BannerDesktop.tsx`** - Desktop implementation with marquee/static variants
- **`BannerMobile.tsx`** - Mobile implementation with responsive layout
- **`types.ts`** - TypeScript type definitions for banner configuration
- **`index.ts`** - Public exports

### Integration Point

The banner is rendered in `Navigation.tsx` (line 75) and appears above the header. It's part of the fixed header container on desktop.

---

## How It Works

1. **Configuration Hook**: `useBannerConfig(bannerId)` fetches banner configuration
2. **Dynamic Data**: Pulls real-time data from Convex (e.g., spots remaining from `foundingMemberCounter`)
3. **Auto-Hide**: Automatically hides after deadline passes
4. **Variants**: Supports two display modes:
   - `marquee` - Animated scrolling text (seamless loop)
   - `static` - Fixed text layout
5. **Copy Functionality**: Copy-to-clipboard via `app/lib/clipboard.ts` utility (works on desktop and mobile with fallback)

### Data Flow

```
Convex DB → useBannerConfig() → Banner Component → Navigation → All Pages
```

---

## Adding a New Banner

1. **Update `bannerConfig.ts`**:
   - Add new banner config in `useBannerConfig()` hook
   - Define `id`, `enabled`, `deadline`, `variant`, `content`, and `styling`

2. **Example**:
```typescript
if (bannerId === "new-promotion") {
  return {
    id: "new-promotion",
    enabled: true,
    deadline: new Date("2026-12-31T23:59:59"),
    dismissible: true,
    variant: "static",
    content: {
      text: [{ text: "New Promotion! " }, { text: "SAVE20", bold: true, isCode: true }],
      button: {
        text: "Copy Code",
        copyText: "SAVE20",
      },
    },
    styling: {
      bgColor: "bg-black",
      textColor: "text-white",
      borderColor: "border-black",
    },
  } as BannerConfig;
}
```

3. **No Page Changes Needed**: Banner automatically appears on all pages via Navigation component

---

## Updating Existing Banner

### Content Changes
- Edit text segments in `bannerConfig.ts`
- Modify button text or copy text
- Update mobile-specific content in `mobileContent` object

### Dynamic Data
- Update Convex database (e.g., `foundingMemberCounter`)
- Use mutation: `npx convex run foundingMemberCounter:updateCounter '{"spotsTaken": 509}'`
- Banner automatically reflects changes (no code update needed)

### Styling
- Modify `styling` object in config:
  - `bgColor` - Background Tailwind class
  - `textColor` - Text Tailwind class
  - `borderColor` - Border Tailwind class (optional)

### Enable/Disable
- Set `enabled: false` in config to hide banner
- Or set `deadline` to a past date for automatic hiding

---

## Important Notes

### Padding Requirement

**Critical**: The Navigation component includes a conditional spacer to account for the fixed header height on desktop:

- **With Banner**: 136px spacer (banner ~56px + header ~80px)
- **Without Banner**: 80px spacer (header only)

This prevents content from being hidden under the fixed header. The spacer is located in `Navigation.tsx` (around line 551) and only appears on desktop (`hidden lg:block`).

### Mobile Behavior

- Banner appears in normal document flow (not fixed)
- No spacer needed on mobile
- Supports dismissal via localStorage (if `dismissible: true`)

### Copy-to-Clipboard

- Uses `app/lib/clipboard.ts` utility
- Automatically falls back to `document.execCommand()` for older browsers/mobile
- Shows "Copied!" feedback for 2 seconds

---

## File Structure

```
app/components/banner/
├── Banner.tsx              # Main wrapper (mobile/desktop detection)
├── BannerDesktop.tsx       # Desktop implementation
├── BannerMobile.tsx        # Mobile implementation
├── bannerConfig.ts         # Configuration hook + Convex integration
├── types.ts                # TypeScript definitions
└── index.ts                # Exports

app/lib/
└── clipboard.ts            # Copy-to-clipboard utility (used by banner)

app/components/
└── Navigation.tsx          # Renders banner (line 75) + spacer (line 551)
```

---

## Quick Reference

### Enable/Disable
```typescript
enabled: false  // In bannerConfig.ts
```

### Change Deadline
```typescript
deadline: new Date("2026-12-31T23:59:59")  // In bannerConfig.ts
```

### Update Dynamic Data (Spots Remaining)
```bash
npx convex run foundingMemberCounter:updateCounter '{"spotsTaken": 509}'
```

### Check Current Counter Value
```bash
npx convex run foundingMemberCounter:getCounter
```

### Hide Banner on Specific Page
```tsx
<Navigation hideBanner={true} />
```

---

## Type Definitions

### BannerConfig
- `id: string` - Unique identifier
- `enabled: boolean` - Show/hide banner
- `deadline?: Date` - Auto-hide after this date
- `dismissible: boolean` - Allow mobile dismissal
- `variant: "marquee" | "static"` - Display mode
- `content: BannerContent` - Text, button, mobile overrides
- `styling: BannerStyling` - Colors and styling
- `dismissalKey?: string` - localStorage key for dismissal

### BannerTextSegment
- `text: string` - Text content
- `bold?: boolean` - Bold styling
- `isCode?: boolean` - Highlight as code (adds pill styling)

### BannerButton
- `text: string` - Button label
- `href?: string` - Link URL (if not copy button)
- `copyText?: string` - Text to copy (makes it a copy button)
- `onClick?: () => void` - Custom click handler
