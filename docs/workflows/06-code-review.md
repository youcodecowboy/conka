# Code Review (Website)

> **Purpose:** This document defines how to self-review code before presenting it to the user. Follow this process after completing implementation and before marking work as done.

---

## When to use this document

- After completing any implementation (feature, bug fix, refactor)
- Before presenting finished work to the user
- When asked to review existing code
- When asked to refactor or improve code quality

---

## Review process

Work through these checks in order. Fix any failures before moving on.

---

## Check 1: Does it actually work?

- [ ] Does the feature/fix address the original request?
- [ ] Have you verified on the **Vercel preview deployment**? (Not just local dev)
- [ ] Does it work on mobile AND desktop?
- [ ] Do all states work? (loading, success, empty, error)
- [ ] Does Shopify data load correctly? (products, prices, images, availability)
- [ ] IF cart-related: does add/remove/update work end-to-end?
- [ ] IF checkout-related: does the checkout URL work and redirect correctly?

**IF any of these fail → fix before continuing the review.**

---

## Check 2: Code quality

### Readability
- [ ] Would another developer understand this code without explanation?
- [ ] Are variable/function names descriptive and consistent with the codebase?
- [ ] Are complex sections commented with "why" (not "what")?

### Structure
- [ ] Are files in the correct directories per project conventions?
- [ ] Are Server Components and Client Components correctly separated?
- [ ] Is `'use client'` only on components that genuinely need it?
- [ ] Are data fetching functions in the lib/services layer, not in components?
- [ ] Is there any duplicated logic that should be extracted?

### Consistency
- [ ] Does the code follow the same patterns as surrounding code?
- [ ] Are naming conventions consistent with the rest of the project?
- [ ] Does the styling approach match the style guide? `[PATH_TO_YOUR_STYLE_GUIDE]`

---

## Check 3: SEO (for any page changes)

- [ ] Title tag present and unique?
- [ ] Meta description present, compelling, under 160 characters?
- [ ] Open Graph tags (title, description, image)?
- [ ] Single H1 tag on the page?
- [ ] Heading hierarchy is logical (H1 → H2 → H3, no skipped levels)?
- [ ] All images have meaningful alt text?
- [ ] Canonical URL set (if risk of duplicate content)?
- [ ] Structured data / JSON-LD for product pages?
- [ ] No broken links or 404s introduced?
- [ ] IF URL changed: redirect from old URL to new URL?

---

## Check 4: Performance

- [ ] Images use `next/image` with appropriate sizing?
- [ ] Above-the-fold images have `priority` set?
- [ ] No unnecessary Client Components (could this be a Server Component instead)?
- [ ] No client-side data fetching that could be server-side?
- [ ] Loading states use `loading.tsx` or Suspense boundaries?
- [ ] No layout shift (elements don't jump after load)?
- [ ] Third-party scripts are loaded with appropriate strategy (lazy, afterInteractive)?
- [ ] Shopify queries request only needed fields?
- [ ] Check Lighthouse score on preview deployment — aim for 90+ on all categories

---

## Check 5: Robustness

### Error handling
- [ ] All data fetches have error handling?
- [ ] `error.tsx` boundaries exist for new route segments?
- [ ] What happens if Shopify API is slow or down? (graceful degradation)
- [ ] What happens if a product/collection doesn't exist? (proper 404)
- [ ] Cart operations handle failure gracefully?

### Shopify-specific
- [ ] Product availability checked before showing add-to-cart?
- [ ] Prices formatted correctly using the shared formatter?
- [ ] Variant selection handles sold-out variants?
- [ ] IF subscription-related: both one-time and subscription paths work?
- [ ] Metafield values are null-checked?

### Security
- [ ] No Shopify Admin API token exposed to the client?
- [ ] No secret env vars in `NEXT_PUBLIC_` prefixed variables?
- [ ] API routes validate input before processing?
- [ ] Webhook endpoints verify HMAC signatures?

---

## Check 6: Cleanliness

- [ ] No `console.log` statements left in code
- [ ] No commented-out code blocks
- [ ] No TODO comments without context
- [ ] No unused imports, variables, or functions
- [ ] No placeholder text or hardcoded test data
- [ ] Linter passes: `[YOUR_LINT_COMMAND]`
- [ ] Formatter has been run: `[YOUR_FORMAT_COMMAND]`
- [ ] TypeScript has no errors: `[YOUR_TYPE_CHECK_COMMAND]`
- [ ] Build succeeds locally: `[YOUR_BUILD_COMMAND]`

---

## Check 7: Deployment readiness

- [ ] Preview deployment builds successfully?
- [ ] No new build warnings?
- [ ] Any new environment variables added to Vercel project settings?
- [ ] IF new pages: URLs are correct and follow existing patterns?
- [ ] IF changed pages: no existing URLs broken (or redirects added)?
- [ ] Bundle size impact is reasonable? (no massive new dependencies)

---

## Check 8: Completeness

- [ ] Does this implementation cover everything in the original scope?
- [ ] Are there deferred items? (Flag them with a Jira ticket or explicit note)
- [ ] Does this introduce technical debt? (Document it if so)
- [ ] Preview URL included in the Jira ticket for review?

---

## When reviewing code you didn't write

Present findings in priority order:

```
## Code Review: [area/feature]

### Critical (must fix)
- [Issue]: [Specific file, what's wrong, suggested fix]

### Important (should fix)
- [Issue]: [Specific detail and suggestion]

### Minor (nice to improve)
- [Issue]: [Specific detail and suggestion]

### Positive
- [What's done well]
```

---

## Quick reference: common issues

| Area | What to look for |
|------|-----------------|
| Server/Client split | Unnecessary `'use client'`, data fetching in Client Components |
| Images | Missing next/image, no alt text, no dimensions, missing priority |
| SEO | Missing metadata, duplicate titles, broken heading hierarchy |
| Performance | Layout shift, large bundles, client-side fetching of static data |
| Shopify | Unchecked metafields, missing availability checks, hardcoded prices |
| Cart | Missing optimistic UI, no error handling, stale cart state |
| Env vars | Secrets in NEXT_PUBLIC, missing from Vercel config |
| Types | `any` usage, missing null checks on Shopify data |

---

## References
- Implementation workflow: `./02-implementation-workflow.md`
- Next.js development: `./03-nextjs-development.md`
- Shopify conventions: `./04-shopify-commerce.md`
- Style guide: `[PATH_TO_YOUR_STYLE_GUIDE]`
