# Conka Style Guide 01

**Version:** 2.0  
**Last Updated:** December 2024  
**Status:** Active (Based on Homepage Implementation)

---

## Design Philosophy

Conka's visual identity is built on **minimalism** and **modern neo-brutalism** principles:

- **White space heavy** - Generous use of negative space for clarity and focus (`py-24` sections, `gap-6` to `gap-12` spacing)
- **Neo-brutalist elements** - Bold, unapologetic design with strong borders and clear hierarchy
- **Contrast in shapes** - Sharp, angular containers (`neo-box`) vs rounded, pill-shaped interactive elements (`rounded-full` buttons)
- **No drop shadows** - Flat design aesthetic (except for hover effects using offset shadows)
- **Restrained color palette** - Black, white, and strategic use of teal/amber for formula identification
- **Clinical precision** - Scientific, evidence-based presentation reflecting the brand's university partnerships and clinical trials

---

## Color Palette

### Primary Colors
- **Black:** `#000000` - Primary text, borders, strong elements
- **White:** `#FFFFFF` - Background, negative space, contrast

### CSS Variables
The color system uses CSS variables for theming and consistency:

```css
--color-black: #000000;
--color-white: #ffffff;
--color-teal: #14b8a6;
--background: var(--color-white);  /* Conka Flow: white, Conka Clarity: black */
--foreground: var(--color-black);  /* Conka Flow: black, Conka Clarity: white */
```

### Formula-Specific Colors
- **Conka Flow:** Teal (`#14b8a6`, `bg-teal-500`) - Always teal for identification
- **Conka Clarity:** Amber (`bg-amber-500`) - Always amber for identification
- **Usage:** These colors are used consistently for formula visualization, calendar days, and product identification

### Accent Color
- **Teal:** `#14B8A6` - Used sparingly for highlights, underlines, icon accents, and Conka Flow identification

### Product-Specific Modes
- **Conka Flow Theme:** Light mode (white background, black text)
  - `.theme-conka-flow` class sets `--background: white`, `--foreground: black`
- **Conka Clarity Theme:** Dark mode (black background, white text)
  - `.theme-conka-clarity` class sets `--background: black`, `--foreground: white`

---

## Typography

### Typography Hierarchy

#### 1. Primary Font: Poppins
**Usage:** Main body text, headings, primary UI elements, button labels  
**Weights:** Regular (400), Medium (500), Semi-Bold (600), Bold (700)  
**Google Fonts:** `Poppins`  
**CSS Variable:** `--font-poppins`  
**Class:** `font-primary` (default body font)

**Size Patterns:**
- **Main Headings:** `text-3xl md:text-4xl lg:text-5xl` with `font-bold`
- **Section Headings:** `text-3xl md:text-4xl` with `font-bold`
- **Subheadings:** `text-xl` or `text-2xl` with `font-semibold` or `font-bold`
- **Body Text:** Default size or `text-base` with `font-medium` or regular weight
- **Button Text:** `text-base md:text-lg` or `text-lg md:text-xl` with `font-semibold` or `font-bold`

**Example Usage:**
- Brand name: "conka." (`text-2xl md:text-3xl font-bold`)
- Product names: "Conka Flow", "Conka Clarity"
- Headings: `text-3xl md:text-4xl font-bold`
- Body text: Default Poppins
- Button labels: `font-semibold` or `font-bold`

#### 2. Commentary Font: Caveat
**Usage:** Subtext, commentary, handwritten-style annotations  
**Weights:** Regular (400), Medium (500), Semi-Bold (600), Bold (700)  
**Google Fonts:** `Caveat`  
**CSS Variable:** `--font-handwriting`  
**Class:** `font-commentary`

**Size Patterns:**
- **Subheadings:** `text-xl` or `text-2xl`
- **Annotations:** `text-lg` or `text-xl`
- **Small annotations:** `text-sm`

**Style:** Casual, handwritten aesthetic, often italicized contextually

**Example Usage:**
- "what's inside"
- "backed by real science"
- "not ready for a protocol?"
- "scroll to explore"
- "built with love ♥"
- Descriptive annotations under headings

#### 3. Clinical Font: IBM Plex Mono
**Usage:** Clinical data, trial results, scientific information, numbers, technical details  
**Weights:** Regular (400), Medium (500)  
**Google Fonts:** `IBM Plex Mono`  
**CSS Variable:** `--font-ibm-plex-mono`  
**Class:** `font-clinical`

**Size Patterns:**
- **Large Stats:** `text-6xl font-bold` (e.g., "+22.1%")
- **Labels:** `text-sm` with `opacity-70` or `opacity-80`
- **Data Points:** `text-sm` or `text-base`
- **Small Labels:** `text-xs`

**Example Usage:**
- Clinical trial results: "+22.1%", "+33.5%"
- Statistical data: "P<0.01", "P = 0.42"
- Formula percentages: "26.7%", "25.4%"
- Patent numbers: "#GB2620279"
- Technical labels: "FORMULA BREAKDOWN", "Clinical Study Details"
- Navigation items
- Button labels (when used in clinical context)

---

## Button Styles

### Design Principle
**All interactive buttons use pill-shaped, rounded-full styling** - This creates a clear distinction between static content containers (sharp corners) and interactive elements (rounded).

### Button Classes

#### 1. Filled Button (`neo-button`)
**Usage:** Primary CTAs, main actions  
**Styling:**
- Background: `bg-[var(--foreground)]`
- Text: `text-[var(--background)]`
- Border: `border-2 border-[var(--foreground)]`
- Shape: `rounded-full`
- Hover: `opacity-85`
- Active: `opacity-70`

**Sizes:**
- Small: `px-6 py-2`
- Medium: `px-8 py-3`
- Standard: `px-8 py-4`
- Large: `px-8 py-4` with `text-lg`

**Example:**
```tsx
<button className="neo-button px-8 py-4 font-bold text-lg">
  buy CONKA
</button>
```

#### 2. Outline Button (`neo-button-outline`)
**Usage:** Secondary actions, alternative CTAs  
**Styling:**
- Background: `bg-transparent`
- Text: `text-[var(--foreground)]`
- Border: `border-2 border-[var(--foreground)]`
- Shape: `rounded-full`
- Hover: `bg-[var(--foreground)] text-[var(--background)]`
- Transition: `transition-all duration-150`

**Sizes:** Same as filled buttons

**Example:**
```tsx
<button className="neo-button-outline px-8 py-3 font-semibold">
  Learn More
</button>
```

#### 3. Toggle Buttons
**Usage:** Formula selection, tier selection, category filters  
**Styling:**
- Base: Same as outline button
- Active state: `bg-[var(--foreground)] text-[var(--background)]`
- Inactive state: `bg-transparent hover:bg-current/10`
- Shape: `rounded-full`
- Size: `px-6 py-2` or `px-6 py-3`

**Example:**
```tsx
<button
  className={`px-6 py-2 rounded-full border-2 border-current transition-all ${
    isActive
      ? "bg-[var(--foreground)] text-[var(--background)]"
      : "bg-transparent hover:bg-current/10"
  }`}
>
  <span className="font-clinical text-sm font-medium">Conka Flow</span>
</button>
```

---

## Container Styles

### Design Principle
**Content containers use sharp, angular corners** - This creates the neo-brutalist aesthetic and contrasts with rounded interactive elements.

### Container Classes

#### 1. Standard Box (`neo-box`)
**Usage:** Content sections, cards, information boxes, data displays  
**Styling:**
- Border: `border-2 border-[var(--foreground)]`
- Background: `bg-[var(--background)]`
- Padding: `p-4`, `p-6`, or `p-8` depending on content
- **No rounded corners** - Sharp, angular edges
- Hover (for interactive boxes): `hover:shadow-[8px_8px_0px_0px_var(--foreground)]`

**Example:**
```tsx
<div className="neo-box p-6">
  <h3 className="text-xl font-bold">Content Title</h3>
  <p>Content here</p>
</div>
```

#### 2. Inverted Box (`neo-box-inverted`)
**Usage:** Pricing boxes, highlighted sections, emphasized content  
**Styling:**
- Border: `border-2 border-[var(--foreground)]`
- Background: `bg-[var(--foreground)]`
- Text: `text-[var(--background)]`
- Padding: `p-4`, `p-6`, or `p-8`
- **No rounded corners** - Sharp, angular edges

**Example:**
```tsx
<div className="neo-box-inverted p-6">
  <div className="text-3xl font-bold">£39.99</div>
  <p className="font-clinical text-sm opacity-80">billed bi-weekly</p>
</div>
```

#### 3. Placeholder Box
**Usage:** Image placeholders, content placeholders  
**Styling:**
- Border: `border-2 border-dashed border-[var(--foreground)]`
- Display: `flex items-center justify-center`
- Opacity: `opacity-50` or `opacity-0.5`

---

## SVG Icons

### Style Guidelines
- **Style:** Simple line-art, minimal, functional
- **Stroke Properties:**
  - `strokeWidth="2"` (standard)
  - `strokeLinecap="round"`
  - `strokeLinejoin="round"`
  - `fill="none"`
- **Color:** Inherit from parent using `currentColor` or `stroke="currentColor"`
- **ViewBox:** Standard `24x24` viewBox for consistency

### Sizes
- **Small:** `16x16` - Navigation items, inline icons
- **Standard:** `24x24` - Buttons, feature icons
- **Large:** `32x32` - Section headers, prominent features

### Usage Patterns
- Navigation items: `16x16` or `24x24` with text labels
- Feature icons: `24x24` in boxes or alongside text
- Interactive elements: Inherit color from parent, use `currentColor`
- Decorative: Minimal, functional, always purposeful

**Example:**
```tsx
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
</svg>
```

---

## Layout Patterns

### Section Structure
- **Section Padding:** `px-6 md:px-16 py-24`
- **Max Width Containers:** `max-w-6xl mx-auto` or `max-w-7xl mx-auto`
- **Gap Spacing:** `gap-6`, `gap-8`, `gap-12` between major elements

### Grid Layouts
- **2 Column:** `grid md:grid-cols-2 gap-8`
- **3 Column:** `grid md:grid-cols-3 gap-6`
- **4 Column:** `grid md:grid-cols-4 gap-8`
- **7 Column:** `grid grid-cols-7 gap-2` (for calendar layouts)

### Flex Layouts
- **Row:** `flex flex-col md:flex-row gap-8` or `gap-12`
- **Column:** `flex flex-col gap-6`
- **Responsive:** Mobile stacks (`flex-col`), desktop rows (`md:flex-row`)

### Text Alignment
- **Default:** Left-aligned (`text-left`)
- **Hero Sections:** Center-aligned (`text-center`)
- **Right-aligned:** Used for specific sections (`text-right`)

---

## Interactive Elements

### Hover Effects

#### Boxes
- **Shadow Effect:** `hover:shadow-[8px_8px_0px_0px_var(--foreground)]`
- **Small Shadow:** `hover:shadow-[4px_4px_0px_0px_var(--foreground)]`
- **Opacity:** `hover:opacity-90` or `hover:opacity-80`

#### Buttons
- **Filled:** `hover:opacity-85`
- **Outline:** `hover:bg-[var(--foreground)] hover:text-[var(--background)]`
- **Transparent:** `hover:bg-current/10`

### Transitions
- **Standard:** `transition-all duration-200` or `duration-300`
- **Smooth:** `transition-all duration-150 ease-in-out`
- **Content:** `transition: opacity 300ms ease-in-out` for content changes

### Protocol Builder Patterns
- **Calendar Visualization:** Color-coded days using formula colors
  - Conka Flow days: `bg-teal-500 text-white`
  - Conka Clarity days: `bg-amber-500 text-white`
  - Rest days: `border-2 border-current opacity-20`
- **Tier Selection:** Pill-shaped buttons with active state
- **Path Cards:** Interactive boxes with hover shadow effects

### Formula Visualization
- **Consistent Colors:** Conka Flow = Teal, Conka Clarity = Amber (always)
- **Calendar Days:** Rounded corners (`rounded-md`) for calendar cells
- **Formula Badges:** Rounded squares (`rounded-md`) with formula number

---

## Responsive Design

### Breakpoints
- **Mobile:** Base styles (no prefix)
- **Medium:** `md:` prefix (768px+)
- **Large:** `lg:` prefix (1024px+)

### Mobile-First Approach
- Base styles target mobile devices
- Enhanced styles for larger screens using breakpoint prefixes
- Layout shifts: `flex-col md:flex-row`, `grid-cols-1 md:grid-cols-2`

### Typography Scaling
- Headings: `text-3xl md:text-4xl lg:text-5xl`
- Body: `text-base md:text-lg`
- Buttons: `text-base md:text-lg`

### Layout Responsiveness
- Navigation: Hidden on mobile (`hidden lg:flex`), mobile menu for small screens
- Grids: Single column on mobile, multi-column on desktop
- Images: Responsive sizing with `w-full` and `h-auto`

---

## Product Information

### Products
- **Conka Flow** - Light mode theme, Teal identifier
- **Conka Clarity** - Dark mode theme, Amber identifier

### Purchase Options
- **One-time purchase** - Trial packs, single orders
- **Subscription** - Recurring billing (weekly, bi-weekly, monthly)

### Pack Sizes
- 4-pack
- 8-pack
- 12-pack
- 28-pack

### Bundle Paths
1. **Path 1:** Conka Flow (daily) + Conka Clarity (weekly)
2. **Path 2:** Conka Clarity (daily) + Conka Flow (weekly)
3. **Path 3:** Conka Flow & Conka Clarity (balanced/alternating)

### Protocol Tiers
- **Starter:** 3-4 doses per week
- **Pro:** 5-6 doses per week
- **Max:** 6-7 doses per week

---

## Brand Assets

### Logo
- **File:** `/public/conka.webp`
- **Usage:** Top-left positioning in navigation
- **Format:** WebP
- **Text Alternative:** "conka." (`text-2xl md:text-3xl font-bold tracking-tight`)

---

## Implementation Notes

### CSS Variables
All styling uses CSS variables for theming and consistency:

```css
:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --color-teal: #14b8a6;
  --background: var(--color-white);
  --foreground: var(--color-black);
  --font-primary: var(--font-poppins);
  --font-commentary: var(--font-handwriting);
  --font-clinical: var(--font-ibm-plex-mono);
}
```

### Theme Classes
- `.theme-conka-flow` - Sets light mode (white bg, black text)
- `.theme-conka-clarity` - Sets dark mode (black bg, white text)
- Theme transitions: `transition: background-color 500ms ease-in-out, color 500ms ease-in-out`

### Accessibility
- Ensure sufficient contrast ratios (WCAG AA minimum)
- Maintain readability with script fonts (use sparingly)
- Clear focus states for interactive elements
- Semantic HTML structure
- Alt text for images and icons

---

## Key Design Principles

### Shape Contrast
- **Static Content:** Sharp corners (`neo-box`) - angular, boxy
- **Interactive Elements:** Rounded (`rounded-full`) - pill-shaped buttons
- **This contrast creates visual hierarchy and guides user interaction**

### Color Consistency
- **Conka Flow = Teal** - Always use teal (`#14b8a6`, `bg-teal-500`) for Conka Flow
- **Conka Clarity = Amber** - Always use amber (`bg-amber-500`) for Conka Clarity
- **Never swap these colors** - Consistency is critical for user understanding

### White Space
- Generous padding: `py-24` for sections
- Spacing between elements: `gap-6` to `gap-12`
- Breathing room around content

### Typography Hierarchy
1. **Primary (Poppins Bold)** - Main headings, brand name
2. **Commentary (Caveat)** - Subtexts, annotations
3. **Clinical (IBM Plex Mono)** - Data, stats, technical info

---

## Notes

- All styling decisions should prioritize clarity and scientific credibility
- The brand identity should reflect the clinical, evidence-based approach
- Maintain consistency: Formula colors, button styles, container patterns
- Test readability of script fonts at various sizes
- Ensure teal accent color is used purposefully, not excessively
- The contrast between boxy containers and rounded buttons is intentional and should be maintained
