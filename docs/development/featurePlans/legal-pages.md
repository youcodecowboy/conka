# Legal Pages -- Content Requirements

> **Status:** Page scaffolding created. Content needed.
> **Created:** 2026-04-01
> **Routes:** `/terms`, `/privacy`, `/cookies`
> **Context:** UK e-commerce site selling food supplements via subscription. Must comply with UK GDPR, PECR, Consumer Rights Act 2015, and food supplement regulations.

---

## Why these pages are needed

1. **Legal requirement.** UK GDPR requires a privacy policy. PECR requires cookie disclosure. Distance selling regulations require clear terms of sale.
2. **Trust signal.** Cold traffic from paid ads is evaluating credibility. Missing legal pages look unprofessional and reduce trust.
3. **Guarantee credibility.** The landing page references "See full terms at conka.io/terms" -- this link must work and contain the actual guarantee terms.
4. **Platform compliance.** Meta (ads), Google (merchant centre), and Shopify all require accessible privacy/terms pages.

---

## 1. Terms & Conditions (`/terms`)

### Required sections

**Company information:**
- Full legal name: CONKA ELITE LIMITED
- Company registration number (Companies House)
- Registered address
- Contact email: support@conka.co.uk
- VAT number (if VAT registered)

**Products and descriptions:**
- Statement that products are food supplements, not medicines
- Statement that products are not intended to diagnose, treat, cure, or prevent any disease
- Description of what is sold (liquid nootropic shots, 30ml format)

**Pricing and payment:**
- Prices are in GBP and include VAT
- How payment is taken (Shopify checkout, Stripe)
- When payment is charged (at time of order, at each subscription renewal)

**Subscription terms (critical -- this is the core business model):**
- What a subscription means (auto-renewal, recurring charges)
- Billing frequency (monthly, quarterly)
- How to cancel (account portal, email, any time)
- What happens when you cancel (completes current period, no further charges)
- How to pause or modify
- Price change notification policy

**100-day money-back guarantee (critical -- referenced on landing page):**
- Exact terms: who qualifies (first-time customers)
- Time period: 100 days from first order
- How to claim: contact support@conka.co.uk
- What is refunded (full purchase price)
- Whether returns are required (currently: no returns needed)
- Any exclusions

**Delivery:**
- UK delivery timescales (1-2 working days)
- Shipping costs (free on subscriptions, state one-time purchase cost)
- International shipping (if applicable)

**Consumer rights (Consumer Rights Act 2015):**
- 14-day cooling off period for distance selling (separate from the 100-day guarantee)
- Right to cancel within 14 days of receiving goods
- How to exercise this right
- Refund process and timescales (14 days from receiving returned goods)

**Returns and refunds (outside guarantee):**
- Faulty or damaged products
- Wrong items sent
- Process for requesting a return

**Limitation of liability:**
- Products are food supplements, not medical advice
- Customers should consult a doctor if pregnant, breastfeeding, on medication, or under medical supervision
- Not liable for results (individual results vary)

**Intellectual property:**
- Website content, branding, patent (GB2620279) owned by CONKA
- User cannot reproduce without permission

**Governing law:**
- Laws of England and Wales
- Courts of England and Wales have jurisdiction

**Changes to terms:**
- Right to update terms
- How users will be notified of changes

---

## 2. Privacy Policy (`/privacy`)

### Required sections (UK GDPR Articles 13-14)

**Identity and contact details:**
- Data controller: CONKA ELITE LIMITED
- Contact: support@conka.co.uk
- DPO contact (if appointed, or state not required)

**What data is collected:**

| Data type | Source | Purpose |
|-----------|--------|---------|
| Name, email, address | Checkout (Shopify) | Order fulfilment, account creation |
| Payment details | Checkout (Stripe via Shopify) | Payment processing (not stored by CONKA) |
| Order history | Shopify | Order management, subscription billing |
| Browsing behaviour | Google Analytics, Vercel Analytics | Website improvement, conversion analysis |
| Ad interaction data | Meta Pixel, Triple Whale | Ad performance, attribution, retargeting |
| Email engagement | Klaviyo | Email marketing, personalisation |
| Subscription status | Loop/Skio | Subscription management |
| Cognitive test data | CONKA App (if applicable) | App functionality (covered by app privacy policy) |
| Cookie data | Various (see cookie policy) | See cookie policy |

**Legal basis for processing (must state for each purpose):**

| Purpose | Legal basis |
|---------|------------|
| Order fulfilment | Contract performance |
| Subscription billing | Contract performance |
| Account management | Contract performance |
| Email marketing (existing customers) | Legitimate interest (soft opt-in) |
| Email marketing (non-customers) | Consent |
| Analytics | Legitimate interest |
| Ad retargeting | Consent (via cookie consent) |
| Fraud prevention | Legitimate interest |

**Third-party data sharing:**

| Third party | Data shared | Purpose |
|-------------|------------|---------|
| Shopify | Order data, customer data | E-commerce platform |
| Stripe | Payment data | Payment processing |
| Klaviyo | Email, name, purchase history | Email marketing |
| Meta (Facebook) | Browsing events, purchase events | Ad targeting and attribution |
| Google Analytics | Browsing behaviour (anonymised) | Website analytics |
| Triple Whale | Purchase events | Ad attribution |
| Vercel | Page view data | Website hosting and analytics |
| Loop/Skio | Subscription data | Subscription management |
| Royal Mail / courier | Name, address | Delivery |

**Data retention:**
- Customer data: retained while account is active + [X] years after last purchase
- Marketing data: until unsubscribe
- Analytics data: [X] months (per platform defaults)
- Order data: 6 years (UK tax requirements)

**Your rights (UK GDPR):**
- Right of access (SAR)
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object (including to marketing)
- Right to withdraw consent
- Right to complain to the ICO (Information Commissioner's Office)

**How to exercise rights:**
- Email: support@conka.co.uk
- Response time: within 30 days

**International transfers:**
- Some processors (Meta, Google, Vercel) transfer data outside the UK
- Safeguards in place (Standard Contractual Clauses, adequacy decisions)

**Children:**
- Products not marketed to children under 16
- Do not knowingly collect data from under-16s

**Changes to policy:**
- How users will be notified

---

## 3. Cookie Policy (`/cookies`)

### Required sections (PECR)

**What cookies are:**
- Brief plain-English explanation

**Cookies used on this site:**

| Cookie / technology | Provider | Purpose | Type | Duration |
|-------------------|----------|---------|------|----------|
| `_ga`, `_ga_*` | Google Analytics | Website analytics | Performance | 2 years |
| `_fbp`, `_fbc` | Meta Pixel | Ad attribution, retargeting | Marketing | 90 days |
| `TriplePixel` | Triple Whale | Purchase attribution | Marketing | Session |
| `__kla_id` | Klaviyo | Email marketing identification | Marketing | 2 years |
| `shopify_cart_id` | CONKA (localStorage) | Cart persistence | Essential | Until cleared |
| Vercel Analytics | Vercel | Page performance | Performance | Session |

**Cookie categories:**
- **Essential:** Required for the site to function (cart). Cannot be disabled.
- **Performance:** Help us understand how visitors use the site (analytics).
- **Marketing:** Used to deliver relevant ads and measure ad effectiveness.

**How to manage cookies:**
- Browser settings instructions (link to major browsers' cookie settings pages)
- Note that disabling cookies may affect site functionality

**Cookie consent:**
- Note: PECR requires consent for non-essential cookies. If there is no cookie consent banner currently, this needs to be flagged as a gap.

---

## Implementation notes

- Page scaffolding is created at `/terms`, `/privacy`, `/cookies`
- Footer updated with links to all three
- The existing `/conkaapp-privacy-policy` should remain (it covers app-specific data like Health Connect)
- The new `/privacy` page covers website data processing
- Consider linking between the two: "For our mobile app privacy policy, see [link]"
- Disclaimer on landing page now correctly references `conka.io/terms`

## Information needed from the business

- [ ] Companies House registration number
- [ ] Registered address
- [ ] VAT number
- [ ] Whether a DPO is appointed
- [ ] Data retention periods (how long customer data is kept after last purchase)
- [ ] Whether international shipping is offered
- [ ] One-time purchase shipping cost
- [ ] Whether a cookie consent banner is currently implemented (likely not -- this is a gap)
- [ ] Confirm subscription cancellation policy details
- [ ] Confirm the 100-day guarantee terms are final

---

## References

- UK GDPR: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/
- PECR (cookies): https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/
- Consumer Rights Act 2015: https://www.legislation.gov.uk/ukpga/2015/15/contents
- Consumer Contracts Regulations 2013: https://www.legislation.gov.uk/uksi/2013/3134/contents
- Claims compliance: `docs/branding/CLAIMS_COMPLIANCE.md`
- Offer constants: `app/lib/offerConstants.ts`
