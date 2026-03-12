# Implementation Workflow (Website)

> **Purpose:** This document defines the step-by-step process for implementing a feature or task AFTER scoping is complete. Follow this sequence to ensure consistent, high-quality implementation in the Next.js website project.

---

## When to use this document

- You have a scoped task (from `./01-scoping-work.md`) and are ready to build
- You're implementing a bug fix that touches multiple files
- You're making any change that involves data fetching, UI, or commerce logic

---

## Phase 1: Pre-implementation setup

Before writing any code:

1. **Read the relevant existing docs:**
   - Architecture docs: `[PATH_TO_YOUR_ARCHITECTURE_DOCS]`
   - Style guide: `[PATH_TO_YOUR_STYLE_GUIDE]`
   - Any feature-specific docs referenced in the scope
2. **Check the current state of affected files** — read them, understand the existing patterns
3. **Identify the existing conventions** in the area you're modifying
4. **Create a feature branch** from `main` — use the naming convention: `[YOUR_BRANCH_NAMING_CONVENTION — e.g., feature/ticket-id-short-desc, fix/ticket-id-short-desc]`

### The golden rule
> **Match the existing codebase.** If the project uses a certain pattern, follow it — even if you'd do it differently on a fresh project. Consistency beats personal preference.

### Deployment awareness
> Every push to your feature branch creates a **Vercel preview deployment**. Use this to verify your work in a production-like environment throughout development — don't wait until the end.

---

## Phase 2: Data layer first

IF the task involves fetching or modifying data, complete this before building UI.

### Shopify data (Storefront API)
1. **Check if a query already exists** for the data you need: `[PATH_TO_SHOPIFY_QUERIES]`
2. **IF new query needed:**
   - Write the GraphQL query
   - Add TypeScript types for the response: `[PATH_TO_SHOPIFY_TYPES]`
   - Create or update the data fetching function: `[PATH_TO_SHOPIFY_LIB]`
   - Test the query independently before building UI
3. **IF modifying an existing query:**
   - Check everywhere the current query is used — don't break existing consumers
   - Extend rather than replace where possible

### Shopify Admin API (if needed)
- Only use for operations the Storefront API can't handle (inventory, order management, metafield writes)
- These should go through Next.js API routes, never called from the client
- Location: `[PATH_TO_API_ROUTES]`

### Loop Subscriptions
- Reference: `./04-shopify-commerce.md` for subscription patterns
- Subscription data fetching: `[PATH_TO_SUBSCRIPTION_HELPERS]`

### Other data sources
- Follow the established pattern for each integration
- Keep third-party API calls in dedicated service files, not scattered in components

---

## Phase 3: Server-side logic (if applicable)

### API routes / Route handlers
- Location: `[PATH_TO_API_ROUTES — e.g., app/api/]`
- Follow the existing pattern for request validation, error handling, and response format
- Always validate and sanitise incoming data
- Use appropriate HTTP methods and status codes

### Server Actions
- Use for form submissions and mutations where appropriate
- Keep in dedicated files: `[PATH_TO_SERVER_ACTIONS — e.g., lib/actions/]`
- Always include error handling and validation
- `'use server'` directive at the top of the file or function

### Middleware
- Location: `middleware.ts` (root level)
- Only modify if the task specifically requires it (redirects, auth, geo)
- Test middleware changes carefully — they affect EVERY request

---

## Phase 4: Frontend implementation

### Component decisions

```
Does this component need interactivity (state, event handlers, browser APIs)?
├── NO → Server Component (default, no directive needed)
│         Benefits: no JS sent to client, can await data directly
│
└── YES → Client Component ('use client' directive)
          Keep as small as possible — only the interactive parts
          Lift data fetching to a Server Component parent where possible
```

### Component creation checklist
1. **Check if a similar component already exists** — reuse or extend before creating new
2. **Follow the component structure from the style guide:** `[PATH_TO_YOUR_STYLE_GUIDE]`
3. **File placement:**
   - Pages/routes: `[YOUR_APP_DIRECTORY — e.g., app/]`
   - Shared components: `[YOUR_COMPONENTS_DIRECTORY]`
   - Page-specific components: co-locate with the page or in `[CONVENTION]`
   - Hooks: `[YOUR_HOOKS_DIRECTORY]`
   - Utils: `[YOUR_UTILS_DIRECTORY]`
4. **Styling:**
   - Use the established styling approach: `[YOUR_APPROACH — Tailwind, CSS Modules, styled-components, etc.]`
   - Reference design tokens/theme from: `[PATH_TO_THEME]`
   - DO NOT use magic numbers — use theme values, spacing scale, colour tokens
5. **Images:**
   - Always use `next/image` for optimised loading
   - Provide width and height (or use fill with a sized container)
   - Use appropriate `priority` for above-the-fold images
   - Shopify CDN images: use the `_[size]` URL transforms where possible

### Page implementation order
1. Define the route structure (page.tsx, layout.tsx, loading.tsx, error.tsx)
2. Build the data fetching layer (server-side)
3. Build shared/reusable components bottom-up
4. Compose the page from components
5. Add SEO meta tags (see Phase 5)
6. Handle loading, error, and empty states
7. Add interactivity where needed (Client Components)

---

## Phase 5: SEO and metadata

Every new page MUST include proper metadata. This is not optional.

```tsx
// In page.tsx or via generateMetadata
export const metadata: Metadata = {
  title: 'Page Title | [SITE_NAME]',
  description: 'Concise, keyword-relevant description under 160 characters',
  openGraph: {
    title: 'Page Title',
    description: 'Description for social sharing',
    images: [{ url: '/og-image.jpg' }],
  },
};

// For dynamic pages
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.slug);
  return {
    title: `${data.title} | [SITE_NAME]`,
    description: data.description,
  };
}
```

### SEO checklist for every new page
- [ ] Title tag (unique, descriptive, includes target keyword)
- [ ] Meta description (unique, compelling, under 160 chars)
- [ ] Open Graph tags (title, description, image)
- [ ] Canonical URL (if needed to avoid duplicates)
- [ ] Structured data / JSON-LD (for product pages, articles, etc.)
- [ ] Heading hierarchy (single H1, logical H2/H3 structure)
- [ ] Image alt text on all images

---

## Phase 6: Verify on preview deployment

This is a key advantage of the Vercel workflow — use it.

1. **Push your branch** — Vercel will create a preview deployment automatically
2. **Check the preview URL** for:
   - Visual correctness on desktop and mobile
   - All data loading correctly (Shopify products, prices, images)
   - Interactivity working (add to cart, forms, navigation)
   - No console errors
   - Page speed / Core Web Vitals (use Vercel's built-in analytics or Lighthouse)
3. **Check the Vercel build logs** if anything seems wrong
4. **Share the preview URL** in the Jira ticket or with the team for feedback

---

## Phase 7: Cleanup before presenting

1. Remove any console.logs, debug code, or commented-out code
2. Ensure all new files follow the project's naming conventions
3. Check for TODO comments — resolve them or flag them explicitly
4. Run the linter/formatter: `[YOUR_LINT_COMMAND]`
5. Verify no unused imports or variables
6. Check bundle size impact: `[YOUR_BUNDLE_ANALYSIS_APPROACH — if any]`
7. Proceed to code review: `./06-code-review.md`

---

## Decision shortcuts

| Situation | Action |
|-----------|--------|
| Server vs Client Component | Default to Server; only use Client for interactivity |
| Where to fetch Shopify data | Server Component or API route — never from client directly |
| New page vs modify existing | Check if the URL/route already exists first |
| Static vs dynamic page | Static (ISR) if data changes infrequently; dynamic if it changes per-request |
| Need new API route | Check if a Server Action would be simpler for the use case |
| Unsure about Shopify data model | Check `./04-shopify-commerce.md` |

---

## References
- Scoping: `./01-scoping-work.md`
- Next.js development: `./03-nextjs-development.md`
- Shopify/commerce: `./04-shopify-commerce.md`
- Code review: `./06-code-review.md`
- Architecture docs: `[PATH_TO_YOUR_ARCHITECTURE_DOCS]`
- Style guide: `[PATH_TO_YOUR_STYLE_GUIDE]`
