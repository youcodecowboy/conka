# Style Guide 01 - Quick Usage Reference

## Typography Classes

### Primary Font (Poppins)
```tsx
// Default - already applied to body
<div>Regular text uses Poppins</div>

// Explicit class
<div className="font-primary">Poppins text</div>

// Tailwind font weights
<div className="font-medium">Medium weight</div>
<div className="font-semibold">Semi-bold</div>
<div className="font-bold">Bold</div>
```

### Commentary Font (Caveat - Script)
```tsx
<div className="font-commentary">
  Used Daily by Olympians and Professional Athletes
</div>
```

### Clinical Font (IBM Plex Mono)
```tsx
<div className="font-clinical">
  +22.1% for men, +33.5% for women (P&lt;0.01)
</div>
```

## Color Usage

### Primary Colors
```tsx
// Black text/borders
<div className="text-black border-black border-2">Content</div>

// White background
<div className="bg-white">Content</div>

// Teal accent
<div className="text-teal-500">Accent text</div>
<div className="bg-teal-500">Accent background</div>
```

### CSS Variables
```tsx
// Using CSS variables
<div style={{ color: 'var(--color-teal)' }}>Teal text</div>
<div style={{ backgroundColor: 'var(--background)' }}>Background</div>
```

## Theme Classes

### Formula 01 (Light Mode)
```tsx
<div className="theme-formula-01">
  {/* White background, black text */}
</div>
```

### Formula 02 (Dark Mode)
```tsx
<div className="theme-formula-02">
  {/* Black background, white text */}
</div>
```

## Design Patterns

### Neo-Brutalist Box
```tsx
<div className="border-2 border-black p-6 bg-white">
  <h2 className="font-primary font-bold text-xl mb-4">Heading</h2>
  <p className="font-primary">Content here</p>
</div>
```

### Clinical Data Box
```tsx
<div className="border-2 border-black p-6 bg-white">
  <div className="font-clinical text-lg">
    Speed: +22.1% for men, +33.5% for women
  </div>
  <div className="font-clinical text-sm mt-2">
    (P&lt;0.01)
  </div>
</div>
```

### Commentary Annotation
```tsx
<div className="relative">
  <p className="font-primary">Main content</p>
  <span className="font-commentary text-sm absolute top-0 right-0">
    Caffeine-Free Focus
  </span>
</div>
```

### CTA Button
```tsx
<button className="bg-black text-white px-8 py-4 font-primary font-bold border-2 border-black">
  buy conka
</button>
```

## Logo Usage

```tsx
import Image from 'next/image';

<Image
  src="/conka.webp"
  alt="Conka logo"
  width={120}
  height={40}
  priority
/>
```

## Notes

- No drop shadows - use borders instead
- Sharp corners - avoid rounded corners (`rounded-*`)
- Generous white space - use padding and margins liberally
- Left-align text within sections
- Use teal sparingly for emphasis only

