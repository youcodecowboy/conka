# International Duties, DDP and the France Problem

**Status:** SCOPED, nothing built. Phase 0 (firefight) is actionable today; Phase 1 is a
half-day of Shopify admin work; Phase 2 is a commercial decision for Humphrey.
**Created:** 2026-09-07 · **Updated:** 2026-09-07
**Owner:** Rudh (Shopify config + evidence) with Humphrey (commercial call, Synergy relationship)
**Trigger:** French customers billed a surprise import charge at the door, Sept 2026. Synergy
(Georgina Anderson-Marshall) confirmed the orders shipped DAP because no terms of sale were
mapped at onboarding.
**Relates to:** `docs/shipping/SHIPPING_AND_COURIERS.md` (canonical, §4 and §6 are now wrong),
`order-size-shipping-tiers.md`, `archive/synergy-3pl-integration.md`
**Retirement:** when Phase 1 ships, fold the rules + the decided model into
`SHIPPING_AND_COURIERS.md` (§4 Incoterms, §6 mapping sheet, a new §10 Customs) and archive
this plan. Do not leave two live descriptions of the incoterm model.

---

## Pick up here (next session)

Read "The decision" below. The short version: **IOSS is not the answer at our EU volume**,
and **Shopify's own recommendation (Managed Markets) is architecturally impossible for us**
because it forces DHL/FedEx labels and takes over merchant of record. The plan is
carrier-DDP through Synergy plus a fixed set of Shopify data fixes, with an explicit
volume trigger for revisiting IOSS later.

Blocking on two questions to Synergy (§ Open questions). Everything else is ours to do.

---

## Problem

International orders ship **DAP** (Delivered At Place). The customer is the importer of
record, so the destination country bills them VAT, duty and a carrier clearance handling fee
on the doorstep. This was a deliberate decision in June 2026, recorded in
`SHIPPING_AND_COURIERS.md` §4 as "a deliberate, accepted trade-off".

It is no longer acceptable, for three reasons that stack:

**1. We ship DAP.** Synergy's mapping sheet has
`Express International | Evri | International | ROW | DAP`. Working as configured.

**2. The declared value is wrong, and it is wrong upwards.** Synergy pulls the product's
list price, not the discounted line total actually paid. A 5-unit order sold at £140 was
declared at 5 × £39.99 = £199.95. Customs value is legally the **transaction value**, the
price the buyer actually paid. So the correct number is lower than what was declared, and the
over-declaration is what pushes an order across the €150 line into full clearance.

> Humphrey's proposal was to declare our **cost** instead of the selling price. That is
> undervaluation and a customs offence. The right correction is list price → price paid,
> which happens to move in the direction he wants anyway.

**3. The rules changed under us on 1 July 2026 and our config predates it.** See below.

France is the worst-hit market because it has an *additional* national parcel tax that the
rest of the EU does not, live since 1 March 2026. That is why "all French customers have the
issue" while other EU destinations are quieter.

---

## What we verified (7 Sept 2026)

### Pulled live from the Shopify Admin API (read-only client-credentials app)

| Check | Result |
|---|---|
| Active markets | 4: `gb`, `france`, `international`, `caribbean` |
| `priceInclusions.inclusiveDutiesPricingStrategy` | `null` on **every** market. No duty-inclusive pricing configured anywhere |
| HS code + country of origin on `FLOW-FUNNEL-28` / `CLEAR-FUNNEL-28` | `210690` / `GB` — correct |
| HS code + country of origin on **every other funnel variant** | **both fields empty** |

**16 of the 20 funnel variant rows have no HS code and no country of origin:** the 84s, 168,
56, 40, 40-OTP, 140, 120, 20, 20-OTP, 60s, 80s. Query was `sku:*FUNNEL*`, so legacy and
main-site SKUs were not checked and are probably in the same state.

Consequence of a missing HS code: destination customs classifies the goods themselves, at
their discretion and rarely in our favour, and we cannot claim UK-origin preference under the
UK-EU Trade and Cooperation Agreement. It also hard-blocks Shopify's duty calculator, which
refuses to activate without HS codes.

### Could not verify (no scope on either app)

- **Whether UK VAT is being stripped for EU customers.** Exports are UK zero-rated. If
  Shopify is not adjusting, a French customer pays a UK-VAT-inclusive £39.99 *and then*
  French VAT at the border, ie taxed twice, and we are over-collecting ~20%.
  **Check manually: Settings → Taxes and duties → "Include or exclude tax based on your
  customer's country".** This is the highest-value single check in this document.
- The actual French order and its commercial invoice (`read_orders` not granted).

---

## The rules, as of September 2026

### EU

| What | Detail | In force |
|---|---|---|
| €150 customs duty exemption | **Abolished.** Every parcel now attracts duty | 1 Jul 2026 |
| Replacement flat duty | **€3 per tariff line** (identical goods group into one charge), on consignments ≤€150 intrinsic value. Paid by **the declarant (us or our IOSS holder), not collected from the buyer at delivery** | 1 Jul 2026 |
| Item-level declaration | Every B2C consignment needs one, IOSS or not | 1 Jul 2026 |
| IOSS | Still alive, still covers **VAT** on ≤€150. Does not remove duty | ongoing |
| EU-wide handling fee | ~€2 per consignment proposed, amount and date "to be determined in autumn 2026" | Nov 2026, TBC |

Intrinsic value excludes shipping and insurance when shown separately.

**Preferential origin trap.** UK-origin goods get 0% duty under the TCA *only* if VAT was
**not** collected through IOSS and the goods clear on a standard H1 declaration. Sold under
IOSS, the €3 flat applies instead. At our order values €3 is trivially cheaper than the
admin of claiming preference, so this is not a reason to avoid IOSS. It *is* a reason not to
assume "UK origin means free".

### France, on top of the EU rules

A **temporary national small parcel tax of €2 per item** (HS6 level, once per shipment for
identical goods), on sub-€150 parcels cleared on the simplified **H7** declaration. Runs
1 Mar 2026 until the EU-wide fee lands, and no later than 31 Dec 2026.

So a French customer buying one £39.99 box today can be billed: French VAT, plus €3 EU duty,
plus €2 French parcel tax, plus the carrier's clearance handling fee. On a £39.99 order that
is a brutal ratio, and it arrives as a demand for payment before they can have their parcel.

Note the H7/H1 split: the French €2 attaches to H7 (simplified, ≤€150) declarations. Whether
a DDP H1 clearance sidesteps it is a question for the customs agent, not something to assume.

### USA

The $800 de minimis is **indefinitely suspended**: 24 Jun 2026 for all non-postal modes,
24 Jul 2026 for postal, following the full suspension on 29 Aug 2025. Every US parcel now
needs a formal or informal entry and attracts duty. Statutory elimination lands 1 Jul 2027.

This is the explanation for "USA orders are temperamental". The flat £22 US rate in
`SHIPPING_AND_COURIERS.md` §4 is obsolete. Out of scope here, tracked as its own follow-up.

---

## Options considered

Our EU volume is roughly **4-5 customers in France**. That number drives the whole decision.

| Option | Cost | Verdict |
|---|---|---|
| **A. Status quo (DAP), fix data only** | £0 | Customer still gets a doorstep bill, just a smaller and correct one. Not good enough, but the data fixes are a prerequisite for every other option so they happen regardless |
| **B. Carrier DDP via Synergy/Evri** | Duty + VAT + a per-parcel clearance fee, rebilled to us. No registration, no software, no filing | **CHOSEN.** Works this week, no fixed cost, no volume commitment |
| **C. Taxamo Assure (pay-as-you-go IOSS)** | ~£2/parcel, no registration, no intermediary, they file | Right shape, wrong plumbing. Not natively integrated into Shopify checkout for UK merchants, so at our volume it is manual per order. Revisit if B's clearance fees prove high |
| **D. Full IOSS via an EU intermediary** | ~£1,500-4,000/yr plus per-return fees. UK sellers cannot register directly | **No.** Break-even against B's clearance fee is roughly 250 EU orders/yr (~21/month). We are at a small fraction of that |
| **E. Shopify Managed Markets** (Shopify's own recommendation) | 3.5% transaction fee on our plan tier, plus FX, plus a Global-e merchant-of-record fee | **Architecturally impossible.** Forces Managed Markets shipping labels, DHL Express or FedEx only, no third-party carrier accounts. Synergy buys its own Evri labels. It also makes Global-e merchant of record, which we should assume breaks Skio subscriptions, and it does not support refunds or Shopify Protect |

Option E is worth recording explicitly because it *is* what Shopify tells you to do, and
someone will suggest it again. It is incompatible with a 3PL that owns its own carrier
relationships, which is the entire point of Synergy.

---

## The decision

**Ship DDP through Synergy's carrier account and rebill ourselves. Recover it in the
shipping rate. Do not register for IOSS yet.**

Revisit IOSS (option C then D) when EU orders pass **~20/month sustained**. Record the
trigger so the decision gets re-made on evidence rather than drift.

---

## Phases

### Phase 0 — Firefight (this week, Humphrey + Synergy)

1. Ask Synergy to **release the held French orders DDP on our account** and rebill us. Do
   not return to sender: that is double freight plus a fifth delivery attempt on an order
   already three attempts deep.
2. **Refund affected customers** whatever they paid at the door, and email them before they
   chase. Cheaper than the churn and the review.
3. Give Synergy the valuation correction **in writing**: declare the order's discounted line
   total actually paid, not unit list price.

### Phase 1 — Data fixes we own (Rudh, Shopify admin, half a day)

4. **Backfill HS `2106.90` and country of origin `GB`** on all 16 uncovered funnel variants,
   then audit legacy and main-site SKUs for the same gap.
5. **Verify the UK VAT export setting** (Settings → Taxes and duties). If EU customers are
   paying UK-VAT-inclusive prices, fix it. Potentially the largest single item here.
6. Confirm the correct **French VAT rate for a liquid food supplement**. France reduced-rates
   foodstuffs at 5.5% but supplement classification is contested and can land at 20%. Needs
   the accountant, not a guess.

### Phase 2 — Model change (needs Humphrey's commercial call)

7. **Change the Synergy mapping sheet incoterm to DDP** for `Express International`, EU
   destinations.
8. **Decide who absorbs it**: raise the EU shipping rates to cover VAT + €3 + €2 + clearance
   fee, or hold the price and eat it to protect conversion. Needs Synergy's per-parcel
   clearance fee first.
9. **Handle the >€150 orders separately.** These fall outside the ≤€150 regime entirely:

   | Over €150 (~£130) | Under |
   |---|---|
   | `FLOW/CLEAR-FUNNEL-84` (£229.99), `BOTH-FUNNEL-168` (£389.99), `BOTH-FUNNEL-120/140` (£149.99) | everything else: the 28s, 20s, 56, 40, 60s, 80s |

   For those, either Shopify's *Collect duties and import taxes at checkout* (0.85% on
   Shopify Payments, needs the Phase 1 HS codes and a DDP-capable carrier) or a manual
   quote. Standard H1 clearance plus a **statement on origin** on the commercial invoice
   claims 0% TCA duty on UK-origin goods.

### Phase 3 — USA (separate, unstarted)

10. Rebuild the US rate for a post-de-minimis world. Tracked in `SHIPPING_AND_COURIERS.md`
    §4 as the unstarted "USD / scaled / DDP build".

---

## Open questions

**For Synergy (Georgina / Bethany):**

1. What is Evri's **per-parcel customs clearance / DDP handling fee** to the EU? Phase 2's
   pricing decision is blocked on this number.
2. Does clearing DDP on **H1** avoid the French €2 H7 parcel tax, or does it apply either way?
3. Can Synergy put our **statement on origin** on the commercial invoice for >€150 EU
   consignments so we can claim 0% TCA duty?

**For CONKA:**

4. Absorb the DDP cost or price it in? (Phase 2.8, Humphrey)
5. Correct French VAT rate for the product, 5.5% or 20%? (accountant)

---

## Sources

Primary, checked 7 Sept 2026:

- [European Commission — €3 customs duty for low-value parcels](https://commission.europa.eu/news-and-media/news/ensuring-fairness-and-safety-eur3-customs-duty-low-value-parcels-2026-06-29_en)
- [Council of the EU — customs duty on small parcels from 1 July 2026](https://www.consilium.europa.eu/en/press/press-releases/2025/12/12/customs-council-agrees-to-levy-customs-duty-on-small-parcels-as-of-1-july-2026/)
- [EC Taxation and Customs Union — removal of the €150 threshold](https://taxation-customs.ec.europa.eu/news/e-commerce-150-eur-customs-duty-exemption-threshold-be-removed-2026-2025-11-13_en)
- [Federal Register — indefinite suspension of US de minimis, non-postal](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)
- [Federal Register — indefinite suspension of US de minimis, mail](https://www.federalregister.gov/documents/2026/06/24/2026-12669/indefinite-suspension-of-the-de-minimis-exemption-for-mail-shipments-and-new-postal-informal-entry)
- [Shopify Help — Managed Markets for the United Kingdom](https://help.shopify.com/en/manual/international/managed-markets/managed-markets-uk)
- [Shopify Help — collecting duties and import taxes at checkout](https://help.shopify.com/en/manual/international/duties-and-import-taxes/charging-duties)

Secondary, used for mechanics and flagged as such:

- [Avalara — EU €150 exemption ended July 2026](https://www.avalara.com/blog/en/europe/2025/11/eu-end-150-customs-duty-exemption-2026.html) (the per-tariff-line detail, declarant liability, and the IOSS-vs-preferential-origin trade-off)
- [KPMG — France temporary small parcel tax from 1 March 2026](https://kpmg.com/us/en/taxnewsflash/news/2026/02/tnf-france-new-temporary-small-parcel-tax-effective-march-1-2026.html)
- IOSS intermediary pricing and Taxamo Assure per-parcel pricing: vendor and advisory
  sources, indicative only. Get a real quote before acting on either.
