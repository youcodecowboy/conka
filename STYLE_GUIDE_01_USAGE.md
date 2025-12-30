# Style Guide 01 - Quick Usage Reference

## Typography Classes

### Primary Font (Poppins)
```tsx
// Default - already applied to body
<div>Regular text uses Poppins</div>

// Explicit class (usually not needed, body default)
<div className="font-primary">Poppins text</div>

// Headings
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Main Heading</h1>
<h2 className="text-3xl md:text-4xl font-bold">Section Heading</h2>
<h3 className="text-xl font-bold">Subheading</h3>

// Body text with weights
<p className="font-medium">Medium weight text</p>
<p className="font-semibold">Semi-bold text</p>
<p className="font-bold">Bold text</p>

// Button text
<button className="font-semibold text-base md:text-lg">Button Text</button>
```

### Commentary Font (Caveat - Script)
```tsx
// Subheadings
<p className="font-commentary text-xl">what's inside</p>
<p className="font-commentary text-xl">backed by real science</p>

// Annotations
<p className="font-commentary text-lg">not ready for a protocol?</p>
<p className="font-commentary text-sm">scroll to explore</p>

// Under main headings
<h2 className="text-3xl md:text-4xl font-bold">Key Benefits</h2>
<p className="font-commentary text-xl">backed by real science</p>
```

### Clinical Font (IBM Plex Mono)
```tsx
// Large stats
<p className="font-clinical text-6xl font-bold">+22.1%</p>

// Labels and data
<p className="font-clinical text-sm opacity-70">FORMULA BREAKDOWN</p>
<p className="font-clinical text-sm">+22.1% for men, +33.5% for women (P&lt;0.01)</p>

// Patent numbers
<span className="font-clinical text-sm">Patented: GB2629279</span>

// Navigation items
<a href="#" className="font-clinical text-sm">The Science</a>

// Button labels (clinical context)
<button className="font-clinical text-sm font-medium">Conka Flow</button>
```

## Color Usage

### Primary Colors
```tsx
// Black text/borders
<div className="text-black border-black border-2">Content</div>

// White background
<div className="bg-white">Content</div>

// Using CSS variables (recommended)
<div className="text-[var(--foreground)] border-[var(--foreground)] border-2">
  Content
</div>
<div className="bg-[var(--background)]">Content</div>
```

### Teal Accent
```tsx
// Conka Flow identifier
<div className="bg-teal-500 text-white">Conka Flow</div>

// Accent underline
<p className="underline decoration-[#14b8a6]">brain</p>

// Icon accent color
<svg className="text-teal-500">...</svg>
```

### Formula Colors
```tsx
// Conka Flow - Always Teal
<div className="bg-teal-500 text-white rounded-md">
  <span className="font-clinical text-xs font-bold">01</span>
</div>

// Conka Clarity - Always Amber
<div className="bg-amber-500 text-white rounded-md">
  <span className="font-clinical text-xs font-bold">02</span>
</div>

// Calendar day - Conka Flow
<div className="bg-teal-500 text-white rounded-md">15</div>

// Calendar day - Conka Clarity
<div className="bg-amber-500 text-white rounded-md">16</div>
```

### CSS Variables
```tsx
// Using CSS variables for theming
<div style={{ color: 'var(--foreground)' }}>Text</div>
<div style={{ backgroundColor: 'var(--background)' }}>Background</div>
<div style={{ borderColor: 'var(--foreground)' }}>Border</div>
```

## Theme Classes

### Conka Flow (Light Mode)
```tsx
<div className="theme-conka-flow">
  {/* White background, black text */}
  <div className="bg-[var(--background)] text-[var(--foreground)]">
    Content here
  </div>
</div>
```

### Conka Clarity (Dark Mode)
```tsx
<div className="theme-conka-clarity">
  {/* Black background, white text */}
  <div className="bg-[var(--background)] text-[var(--foreground)]">
    Content here
  </div>
</div>
```

## Button Patterns

### Filled Button (Primary CTA)
```tsx
// Standard size
<button className="neo-button px-8 py-4 font-bold text-lg">
  buy CONKA
</button>

// Medium size
<button className="neo-button px-8 py-3 font-semibold">
  Subscribe Now
</button>

// Small size
<button className="neo-button px-6 py-2 font-medium text-sm">
  Add to Cart
</button>
```

### Outline Button (Secondary CTA)
```tsx
// Standard
<button className="neo-button-outline px-8 py-3 font-semibold">
  Learn More
</button>

// Small
<button className="neo-button-outline px-5 py-2.5">
  <span className="font-clinical text-sm">Back</span>
</button>
```

### Toggle Buttons
```tsx
// Formula selection toggle
<div className="flex gap-3">
  <button
    onClick={() => setActiveFormula("01")}
    className={`px-6 py-2 rounded-full border-2 border-current transition-all ${
      activeFormula === "01"
        ? "bg-[var(--foreground)] text-[var(--background)]"
        : "bg-transparent hover:bg-current/10"
    }`}
  >
    <span className="font-clinical text-sm font-medium">Conka Flow</span>
  </button>
  <button
    onClick={() => setActiveFormula("02")}
    className={`px-6 py-2 rounded-full border-2 border-current transition-all ${
      activeFormula === "02"
        ? "bg-[var(--foreground)] text-[var(--background)]"
        : "bg-transparent hover:bg-current/10"
    }`}
  >
    <span className="font-clinical text-sm font-medium">Conka Clarity</span>
  </button>
</div>
```

### Button with Icon
```tsx
<button className="neo-button-outline px-5 py-2.5 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
  <span className="font-clinical text-sm">Back to Options</span>
</button>
```

## Container Patterns

### Standard Box (Neo-Brutalist)
```tsx
// Basic box
<div className="neo-box p-6">
  <h2 className="text-xl font-bold mb-4">Heading</h2>
  <p className="font-primary">Content here</p>
</div>

// With hover effect (interactive)
<button className="neo-box p-6 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200">
  <h3 className="text-xl font-bold">Clickable Card</h3>
  <p>Content</p>
</button>

// Small shadow hover
<div className="neo-box p-4 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all">
  Content
</div>
```

### Inverted Box (Highlighted)
```tsx
// Pricing box
<div className="neo-box-inverted p-6">
  <div className="flex items-baseline gap-2 mb-1">
    <span className="text-3xl font-bold">£39.99</span>
    <span className="font-clinical text-sm opacity-80">billed bi-weekly</span>
  </div>
  <p className="font-clinical text-xs opacity-70">
    Pro Plan • 6 shots/week
  </p>
</div>

// Header section
<div className="neo-box-inverted p-4 flex justify-between items-center">
  <h3 className="text-2xl font-bold">Conka Flow</h3>
  <span className="font-clinical text-sm">Patented: GB2629279</span>
</div>
```

### Clinical Data Box
```tsx
<div className="neo-box p-6">
  <div className="flex justify-between items-center mb-4">
    <p className="font-clinical text-sm uppercase opacity-70">
      Clinical Study Details
    </p>
    <p className="font-clinical text-xs opacity-50">
      vs. baseline human performance
    </p>
  </div>
  <div className="space-y-3 font-clinical text-sm">
    <div>
      <span className="opacity-70">Study:</span>{" "}
      <span>University of Exeter, 2023</span>
    </div>
    <div>
      <span className="opacity-70">Participants:</span>{" "}
      <span>250 participants</span>
    </div>
  </div>
</div>
```

### Placeholder Box
```tsx
<div className="placeholder-box w-full h-80">
  <span className="font-clinical text-sm opacity-50">
    [IMAGE PLACEHOLDER]
  </span>
</div>
```

## SVG Icon Patterns

### Standard Icon
```tsx
// Navigation icon (16x16)
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
</svg>

// Button icon (24x24)
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="9" cy="21" r="1"/>
  <circle cx="20" cy="21" r="1"/>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
</svg>

// Feature icon (32x32)
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
</svg>
```

### Icon with Text
```tsx
// Navigation link with icon
<a href="#" className="font-clinical text-sm hover:opacity-70 transition-all flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
  The Science
</a>

// Icon in button
<button className="neo-button px-8 py-4 font-bold flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
  Add to Cart
</button>
```

### Icon with Accent Color
```tsx
// Teal accent icon
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>
```

## Layout Patterns

### Section Structure
```tsx
<section className="px-6 md:px-16 py-24">
  <div className="max-w-6xl mx-auto">
    {/* Content here */}
  </div>
</section>
```

### Grid Layouts
```tsx
// 2 column grid
<div className="grid md:grid-cols-2 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

// 3 column grid
<div className="grid md:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// 4 column grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

// Calendar grid (7 columns)
<div className="grid grid-cols-7 gap-2">
  {days.map((day) => (
    <div key={day}>{day}</div>
  ))}
</div>
```

### Flex Layouts
```tsx
// Responsive row/column
<div className="flex flex-col md:flex-row gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Column layout
<div className="flex flex-col gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Row with spacing
<div className="flex gap-3">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

## Interactive Elements

### Hover Effects
```tsx
// Box with shadow hover
<div className="neo-box p-6 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200">
  Hover me
</div>

// Small shadow hover
<div className="neo-box p-4 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all">
  Hover me
</div>

// Opacity hover
<div className="hover:opacity-90 transition-opacity">
  Hover me
</div>

// Background hover
<button className="bg-transparent hover:bg-current/10 transition-all">
  Hover me
</button>
```

### Toggle Selection
```tsx
// Tier selection
<div className="flex gap-3">
  {tiers.map((tier) => (
    <button
      key={tier.id}
      onClick={() => setSelectedTier(tier.id)}
      className={`flex-1 p-4 transition-all ${
        selectedTier === tier.id
          ? "neo-box-inverted"
          : "neo-box hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
      }`}
    >
      <p className="font-clinical text-xs uppercase opacity-70">{tier.name}</p>
      <p className="text-lg font-bold mt-1">{tier.count}</p>
    </button>
  ))}
</div>
```

### Formula Visualization
```tsx
// Calendar day - Conka Flow (Teal)
<div className="bg-teal-500 text-white rounded-md aspect-square flex items-center justify-center font-clinical text-sm">
  15
</div>

// Calendar day - Conka Clarity (Amber)
<div className="bg-amber-500 text-white rounded-md aspect-square flex items-center justify-center font-clinical text-sm">
  16
</div>

// Calendar day - Rest
<div className="border-2 border-current opacity-20 rounded-md aspect-square flex items-center justify-center font-clinical text-sm">
  17
</div>

// Formula legend
<div className="flex gap-6 flex-wrap">
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 bg-teal-500 rounded-sm"></div>
    <span className="font-clinical text-sm">Conka Flow – Caffeine-Free Focus</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 bg-amber-500 rounded-sm"></div>
    <span className="font-clinical text-sm">Conka Clarity – Peak Performance</span>
  </div>
</div>
```

## Complete Component Examples

### Hero Section
```tsx
<section className="min-h-screen px-6 md:px-16 pt-2 pb-12 flex flex-col">
  <div className="flex-1 flex flex-col items-center justify-center">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
      Make decisions faster.
    </h1>
    <p className="font-commentary text-xl md:text-2xl mb-3 text-center">
      clinically designed to optimize your <span className="underline decoration-[#14b8a6]">brain</span>
    </p>
    
    <div className="mb-6 text-center">
      <p className="font-clinical text-sm md:text-base mb-1">
        backed by 250+ clinical studies
      </p>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-3">
      <button className="neo-button px-8 py-2 font-commentary text-lg md:text-xl">
        Find Your Stack
      </button>
      <button className="neo-button-outline px-8 py-2 font-semibold text-base md:text-lg">
        buy CONKA
      </button>
    </div>
  </div>
</section>
```

### Section with Heading
```tsx
<section className="px-6 md:px-16 py-24">
  <div className="max-w-6xl mx-auto">
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Section Title</h2>
      <p className="font-commentary text-xl">subtitle here</p>
    </div>
    
    {/* Content */}
  </div>
</section>
```

### Card with Hover
```tsx
<button className="neo-box p-6 text-left hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group">
  <div className="flex items-start gap-3 mb-4">
    <div className="p-2.5 border-2 border-current rounded-lg group-hover:bg-current group-hover:text-[var(--background)] transition-colors">
      {/* Icon */}
    </div>
    <div>
      <h3 className="text-xl font-bold">Card Title</h3>
      <p className="font-clinical text-xs opacity-70 mt-1">Subtitle</p>
    </div>
  </div>
  <p className="font-commentary text-base mb-3">description</p>
</button>
```

## Notes

- **Always use `rounded-full` for buttons** - This is the standard for all interactive buttons
- **Never round corners on `neo-box` containers** - Keep them sharp and angular
- **Formula colors are fixed** - Conka Flow = Teal, Conka Clarity = Amber (never swap)
- **Use CSS variables** - `var(--background)`, `var(--foreground)` for theming
- **Generous spacing** - `py-24` for sections, `gap-6` to `gap-12` between elements
- **Mobile-first** - Base styles for mobile, enhance with `md:` and `lg:` prefixes
- **Consistent hover effects** - Shadow offsets for boxes, opacity/background for buttons
