# Coding Standards - Quick Reference

This document outlines the coding conventions and patterns used in this project.
For visual styling, see `STYLE_GUIDE_01_USAGE.md`.

---

## Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── [feature]/       # Feature-specific component folders
│   │   ├── index.ts     # Barrel exports
│   │   ├── types.ts     # TypeScript interfaces
│   │   └── *.tsx        # Component files
│   └── *.tsx            # Standalone components
├── [route]/             # Page routes
│   └── page.tsx         # Route page component
├── lib/                 # Utilities, data, helpers
├── hooks/               # Custom React hooks
├── context/             # React context providers
└── api/                 # API routes
```

---

## Component Organization

### Feature Folders

Group related components in feature folders under `app/components/`:

```
app/components/quiz/
├── index.ts                    # Barrel exports
├── QuizLoader.tsx              # ~80-120 lines
├── QuizProgress.tsx            # ~100-150 lines
├── QuizQuestion.tsx            # ~150-200 lines
├── QuizResultsOverview.tsx     # ~150-200 lines
└── QuizRecommendedSection.tsx  # ~200-400 lines (larger, complex)
```

### Barrel Exports (`index.ts`)

Export all public components and types from a single entry point:

```tsx
// Types first
export type {
  QuizResult,
  QuizQuestion,
} from "./types";

// Components
export { default as QuizLoader } from "./QuizLoader";
export { default as QuizProgress } from "./QuizProgress";
export { default as QuizQuestion } from "./QuizQuestion";
```

### Types File (`types.ts`)

Keep TypeScript interfaces in a separate types file:

```tsx
/**
 * Props for the QuizLoader component
 */
export interface QuizLoaderProps {
  /** Callback when loading completes */
  onComplete: () => void;
  /** Duration in milliseconds */
  duration?: number;
}
```

---

## Component Guidelines

### Single Responsibility

Each component should have one clear purpose:

| Component | Lines | Responsibility |
|-----------|-------|----------------|
| Loader | ~80-120 | Loading animation |
| Scores | ~60-80 | Display score grid |
| Recommendation | ~80-100 | Smart product suggestion |
| Section (orchestrator) | ~150-200 | State management, layout |

### Orchestrator Pattern

Complex flows use a thin orchestrator that composes sub-components:

```tsx
// Orchestrator manages state and layout
export default function CognitiveTestSection() {
  const [state, setState] = useState<TestState>("idle");
  
  return (
    <section>
      {state === "idle" && <IdleCard onStart={handleStart} />}
      {state === "loading" && <Loader onComplete={handleLoaded} />}
      {state === "results" && <Results data={results} />}
    </section>
  );
}
```

### Props Interface Pattern

Define props at the top of the file or in `types.ts`:

```tsx
interface MyComponentProps {
  /** Required callback */
  onComplete: () => void;
  /** Optional with default */
  duration?: number;
}

export default function MyComponent({
  onComplete,
  duration = 2500,
}: MyComponentProps) {
  // ...
}
```

---

## Naming Conventions

### Files and Components

- **Components**: PascalCase with feature prefix
  - `QuizLoader.tsx`, `CognitiveTestScores.tsx`
- **Utilities**: camelCase
  - `quizData.ts`, `productHelpers.ts`
- **Hooks**: camelCase with `use` prefix
  - `useIsMobile.ts`, `useCart.ts`

### Variables and Functions

```tsx
// camelCase for variables and functions
const isLoading = true;
const handleSubmit = () => {};

// PascalCase for components and types
function QuizLoader() {}
interface QuizResult {}
type TestState = "idle" | "loading";

// SCREAMING_SNAKE for constants
const MAX_QUESTIONS = 10;
```

---

## Code Patterns

### Handlers with `useCallback`

Wrap handlers passed to children:

```tsx
const handleStart = useCallback(() => {
  setTestState("email");
}, []);

const handleSubmit = useCallback((data: FormData) => {
  setFormData(data);
  setTestState("testing");
}, []);
```

### Memoization with `useMemo`

Memoize expensive computations:

```tsx
const subjectId = useMemo(() => {
  return emailSubmission
    ? `website_${emailSubmission.submittedAt.getTime()}`
    : `website_${Date.now()}`;
}, [emailSubmission]);
```

### Conditional Rendering

Use clear patterns for state-based rendering:

```tsx
{testState === "idle" && <IdleCard />}
{testState === "loading" && <Loader />}
{testState === "results" && testResult && <Results data={testResult} />}
```

---

## Import Conventions

### Order

Group imports in this order:

```tsx
// 1. React/Next.js
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// 2. External libraries
import { motion } from "framer-motion";

// 3. Internal absolute imports
import { useCart } from "@/app/context/CartContext";
import { QuizLoader } from "@/app/components/quiz";

// 4. Relative imports (types first)
import type { TestResult, TestState } from "./types";
import CognicaSDK from "./CognicaSDK";
```

### Absolute vs Relative

- **Absolute** (`@/app/...`): Cross-feature imports
- **Relative** (`./...`): Same-folder imports

```tsx
// Cross-feature - use absolute
import { useCart } from "@/app/context/CartContext";
import Navigation from "@/app/components/Navigation";

// Same folder - use relative
import type { TestResult } from "./types";
import CognitiveTestLoader from "./CognitiveTestLoader";
```

---

## CSS/Styling

### Tailwind Classes

Use utility classes for styling (see `STYLE_GUIDE_01_USAGE.md`):

```tsx
<div className="neo-box p-6 border-l-4 border-amber-500">
  <p className="font-clinical text-xs uppercase tracking-widest opacity-50">
    Label Text
  </p>
</div>
```

### CSS Variables

Use CSS variables for theming:

```tsx
<div className="bg-[var(--background)] text-[var(--foreground)]">
  Themed content
</div>
```

### Custom Classes

Project-specific classes in `globals.css`:

- `neo-box` - Standard bordered box
- `neo-box-inverted` - Inverted colors box
- `neo-button` - Primary button
- `neo-button-outline` - Secondary button
- `font-clinical` - IBM Plex Mono
- `font-commentary` - Caveat script

---

## Page vs Component

### Pages (`app/[route]/page.tsx`)

- Thin orchestrators
- Handle routing logic
- Compose components
- ~50-150 lines

```tsx
export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <QuizQuestion onAnswer={setAnswers} />
      <QuizProgress current={step} total={10} />
    </div>
  );
}
```

### Components (`app/components/`)

- Reusable UI pieces
- Single responsibility
- Props-driven
- ~50-200 lines (400 max for complex ones)

---

## Quick Checklist

When creating a new feature:

- [ ] Create folder under `app/components/[feature]/`
- [ ] Add `types.ts` for interfaces
- [ ] Add `index.ts` for barrel exports
- [ ] Keep components ~50-200 lines
- [ ] Use feature prefix in names: `FeatureLoader`, `FeatureResults`
- [ ] Wrap handlers in `useCallback`
- [ ] Use absolute imports for cross-feature
- [ ] Follow existing patterns in `quiz/` or `cognitive-test/`
