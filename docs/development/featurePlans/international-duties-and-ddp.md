# International Duties, DDP and the Move to DHL

**Status:** DECIDED, awaiting Synergy. The commercial direction is settled; execution is
blocked on three answers from Synergy (§ Open questions), requested 8 Sept 2026.
**Created:** 2026-09-07 · **Updated:** 2026-09-08
**Owner:** Rudh (Shopify config + Synergy liaison), Humphrey (commercial call, Synergy
relationship)
**Trigger:** French customers billed a surprise import charge at the door, Sept 2026.
Georgina Anderson-Marshall (Synergy) confirmed the orders shipped DAP because terms of sale
were never mapped at onboarding.
**Relates to:** `docs/shipping/SHIPPING_AND_COURIERS.md` (canonical; §4 and §6 are superseded
by this plan until it is folded back in), `order-size-shipping-tiers.md`,
`archive/synergy-3pl-integration.md`
**Retirement:** when the switch ships, fold the rates, the mapping sheet and the incoterm
model into `SHIPPING_AND_COURIERS.md` and archive this plan. Do not leave two live
descriptions of the model.

---

## The decision

**All international shipping moves to DHL on DDP terms, with a minimum order size.**

| | |
|---|---|
| Europe (incl. France) | DHL **Economy Select** (road), **DDP** |
| Rest of world (USA, Canada, AU, NZ, ZA, UAE, Caribbean) | DHL **Express** (air), **DDP** |
| Minimum international order | ~3 boxes, enforced by deleting the 1-box and 2-box weight bands |
| Evri international | Retired |
| UK (Evri `Express`, DPD `24 Hour Delivery`) | Unchanged |

The customer pays the full landed cost at checkout and nothing on delivery. Small
international orders stop being possible, which is deliberate: they cannot carry the cost.

Road and air are an internal routing detail. A customer only ever sees the option for their
own destination, so there is nothing to differentiate at checkout. The two need distinct
**rate names** only because Synergy routes on the name.

---

## The problem

International orders shipped **DAP**, so the customer was the importer of record and got
billed VAT, duty and a carrier handling fee on the doorstep. Three things stacked:

**1. DAP was never mapped at onboarding.** Synergy's sheet had
`Express International | Evri | International | ROW | DAP`. Working as configured, and
Georgina confirmed terms of sale were missed at onboarding.

**2. The declared value was wrong, and wrong upwards.** The customs value pulled the
product's list price × quantity, not the discounted total actually paid. An order sold at
£140 was declared at 5 × £39.99 = £199.95. Customs value is legally the **transaction
value**. Georgina has confirmed the figure is pulled from our system, so the fix may be ours;
the field being read is an open question.

> Humphrey's proposal was to declare our **cost** rather than the selling price. That is
> undervaluation and a customs offence. The correct fix is list price → price paid, which
> moves in the same direction anyway.

Note this does not rescue that order: £140 is about €161, over the €150 line either way.

**3. The rules changed under us and our config predates them.** See below.

France is worst-hit because it has an additional national parcel tax the rest of the EU does
not.

### What a French customer was actually billed

On a £39.99 box, roughly:

| Charge | ~£ | What it is |
|---|---|---|
| French VAT | 7 | Destination sales tax on goods + shipping |
| EU flat duty (€3) | 2.60 | Replaced the €150 exemption |
| France parcel tax (€2) | 1.70 | National charge on H7 parcels |
| Carrier handling fee | 10-15 | **Not tax.** The courier's admin charge |
| **Total** | **21-26** | |

Over half is the courier's admin fee. That is why the bills read as disproportionate.

---

## The rules, as of September 2026

### EU

| What | Detail | In force |
|---|---|---|
| €150 duty exemption | **Abolished.** Every parcel attracts duty | 1 Jul 2026 |
| Replacement flat duty | **€3 per tariff line** on consignments ≤€150 intrinsic value. Runs to 1 Jul 2028, then normal rates. The collection mechanism is not settled; under DAP the carrier bills the buyer with everything else | 1 Jul 2026 |
| Item-level declaration | Required on every B2C consignment | 1 Jul 2026 |
| IOSS | Still covers **VAT** on ≤€150. Does not cover duty | ongoing |
| EU-wide handling fee | ~€2 proposed, amount and date TBC | Nov 2026, TBC |

Intrinsic value excludes shipping when shown separately. VAT is charged on goods **plus**
shipping (the shipping the customer paid, not our cost).

**H1 vs H7 is what governs preferential origin.** H7 (the simplified ≤€150 dataset, used by
IOSS shipments) has no field for preferential origin, so a UK-origin 0% claim under the TCA
is impossible on it and the €3 flat applies. **H1 is the only declaration through which
preference can be claimed.** Above €150 the duty side is therefore cleaner: 0% is claimable
and France's €2 does not apply.

### France, on top

A temporary **€2 per item** national parcel tax (HS6 level), on sub-€150 parcels cleared on
the simplified **H7** declaration. Live 1 Mar 2026 until an EU-wide fee replaces it, and no
later than 31 Dec 2026.

### USA — out of scope, tracked separately

The $800 de minimis is **indefinitely suspended**: 24 Jun 2026 non-postal, 24 Jul 2026
postal. Every parcel now needs a formal or informal entry. The flat £22 rate is obsolete.

Two US-specific issues that are **not** solved by DDP and must be resolved before any US
rate work:

- **Tariff.** No UK-US zero-rate deal. UK goods have faced a 10% baseline tariff, but the
  legal basis was struck down by SCOTUS in Feb 2026 and maintained under Section 122 with an
  expiry around Jul 2026. **The rate in force today is unverified.**
- **FDA.** Supplements are regulated as food. The manufacturing facility must hold an FDA
  registration number, and a **Prior Notice must be filed with the FDA for every shipment**,
  including that number. Express carriers are not exempt. No prior notice means refused
  entry. This is the likely explanation for "USA orders are temperamental" and is a bigger
  blocker than the tariff.

---

## Options considered

EU volume is roughly 4-5 customers in France. That number drives the decision.

| Option | Verdict |
|---|---|
| **A. Status quo (DAP), fix data only** | **No.** Customer still gets a doorstep bill, just a smaller and correct one. The data fixes happen regardless |
| **B. DHL DDP (road EU, air ROW)** | **CHOSEN.** One mechanism at any order value, no threshold, no ongoing admin, no provider to integrate. Expensive, which the minimum order size answers |
| **C. Evri DDP** | **Not available.** Evri's DDP to the EU is an **IOSS** service, and their public guidance states DDP is USA-only with everything else DAP. Synergy's Evri card lists a `DDP Courier` line for EU countries, which contradicts that and was never resolved. Not built on |
| **D. Evri + pay-as-you-go IOSS** | **No.** Cheaper per parcel (~£2 vs a ~£14 DTP fee) but only covers orders **under €150**, so a second DDP arrangement is still needed for the larger half. Adds a provider integration, per-order admin, and destination VAT rates we would be liable for |
| **E. Full IOSS registration** | **No.** ~£1,500-4,000/yr plus per-return fees, an EU intermediary jointly liable, monthly returns forever. Break-even is roughly 250 EU orders/yr |
| **F. Offer DAP and DDP side by side at checkout** | **No.** Rejected on customer experience: price-sensitive customers pick the cheap option without understanding the consequence, and a label at checkout does not fix that. "We warned you in small text" is a bad outcome |
| **G. Shopify Managed Markets** (Shopify's own recommendation) | **Architecturally impossible.** Forces Managed Markets labels, DHL Express or FedEx only, no third-party carrier accounts. Synergy buys its own labels. It also makes Global-e merchant of record, which we should assume breaks Skio subscriptions |
| **H. Stop shipping internationally** | **No**, but recorded so keeping the markets is a decision rather than a default |

Option G is worth recording because it *is* what Shopify tells you to do, and someone will
suggest it again. It is incompatible with a 3PL that owns its carrier relationships.

### Why not French VAT registration

If DHL's DDP names **CONKA** as importer of record rather than the customer, we would need a
French VAT number, a French EORI, and a fiscal representative (jointly liable, ~£1,500-3,000
/yr, sometimes a deposit), plus monthly returns forever and per-country repetition.
**We will not do this.** If that is the answer, we stay DAP or change carrier. Normal express
e-commerce DDP keeps the receiver as importer of record, so this is a confirmation, not an
expected risk.

---

## Costs

DHL freight only, **before** fuel surcharge, DTP fee and the tax itself. Weight bands are
1 box 2.1kg, 2 box 4.2kg, 3 box 6.3kg, 6 box 12.6kg.

| Zone | | 1 box | 2 box | 3 box | 6 box |
|---|---|---|---|---|---|
| **France** | charge now | 20 | 22 | 24 | 32 |
| | DHL Road | 36.04 | 36.04 | 36.04 | 39.12 |
| **Europe (11)** | charge now | 20 | 23 | 26 | 41 |
| | DHL Road | 42.24 | 42.24 | 42.24 | 46.36 |
| **USA** | charge now | 22 | 22 | 22 | 22 |
| | DHL Air | 44.20 | 55.24 | 66.28 | 102.17 |
| **Canada** | charge now | 36 | 52 | 68 | 134 |
| | DHL Air | 50.25 | 63.01 | 74.95 | 110.14 |
| **Australia** | charge now | 25 | 40 | 56 | 116 |
| | DHL Air | 57.54 | 73.35 | 89.01 | 138.96 |
| **New Zealand** | charge now | 38 | 65 | 91 | 203 |
| | DHL Air | 57.54 | 73.35 | 89.01 | 138.96 |
| **South Africa** | charge now | 42 | 60 | 77 | 151 |
| | DHL Air | 57.54 | 73.35 | 89.01 | 138.96 |
| **UAE** | charge now | 13 | 17 | 20 | 36 |
| | DHL Air | 57.54 | 73.35 | 89.01 | 138.96 |
| **Caribbean** | charge now | 57 | 78 | 99 | 188 |
| | DHL Air | 76.52 | 101.52 | 125.94 | 201.23 |

Source: `Conka Elite Limited - DHL Air and Road Rates 2026 (1).xlsx` (Synergy's DHL account
card, sent 3 Aug 2026). Current charges from `SHIPPING_AND_COURIERS.md` §4.

**Every international rate goes up.** UAE is the worst, £13 charged against a £57 cost.

Two useful shapes: DHL **Road is flat to 10kg**, so Europe's 1, 2 and 3 box cost the same,
which rewards larger baskets. And Air improves relatively at 6 boxes, where Canada, NZ and
South Africa already over-recover.

**Not yet known, and needed before repricing:** the DHL fuel surcharge (a percentage on
freight, changes monthly, ballpark 15-25%) and the **DTP fee** (DHL's admin charge for
fronting the duty and VAT; published benchmark ~2% with a ~€16.50 minimum, so effectively a
flat ~£14 at our order values). Neither is in the rate card.

**Volumetric weight** is the higher of actual and (L×W×H cm ÷ 5000). Box dimensions have not
been checked, so every band above is optimistic if the cartons are bulky.

**French VAT paid under DDP is not reclaimable.** We are not registered in France and the tax
is paid in the customer's name as importer. It is a straight cost of sale on a Synergy
invoice, roughly £20 of dead cost on a small European order. That is the real reason the
minimum order size matters.

---

## Shipping methods

Synergy routes on the **rate name**, so the name is the routing instruction. Target state:

```
Shipping Method           | Carrier | Service        | Market | Terms of Sale
Express                   | Evri    | Standard       | UK     | n/a
24 Hour Delivery          | DPD     | Next Day       | UK     | n/a
European Delivery         | DHL     | Economy Select | EU     | DDP
Express International DHL | DHL     | Express (Air)  | ROW    | DDP
```

Three changes: **add** `European Delivery`; **change** `Express International DHL` from DAP
to DDP (name kept, so no rename risk); **retire** `Express International` (Evri).

`Express International DHL` has existed since 5 Aug 2026 (DHL Air, DAP, ROW), set up after
Evri failed to produce a label for a France order (`13234918031734`), which went back to
stock through returns. Synergy's portal has no view of the agreed method list; this table and
`SHIPPING_AND_COURIERS.md` §6 are the record.

Channel Islands (£4.99, Evri) is UK-adjacent and out of scope.

---

## Phases

### Phase 0 — Now, no dependencies

1. Fix the declared value: the order total the customer paid, not list price × quantity.
   Blocked on Synergy telling us which field they read (§ Open questions).
2. Pull the EU numbers: order count, order sizes, and subscriber count over the last 6-12
   months. Sizes the minimum order value and the subscriber migration. **The read-only
   Shopify app has no `read_orders` scope, so this has to come from the admin UI or a new
   token.**

### Phase 1 — Ask Synergy (email sent 8 Sept 2026)

See § Open questions.

### Phase 2 — Our own admin, runs in parallel

3. Set the **default country of origin** to United Kingdom (Settings → Taxes and duties →
   Customs information). Covers all variants at once; currently "No default set".
4. Add **HS code `210690`** to the 15 live variants missing it (below).
5. Draft shipping policy copy and a cart-drawer line stating the international minimum and
   that duties are included.

### Phase 3 — Before anything breaks

6. **Migrate EU subscribers to quarterly.** A checkout minimum does not apply to Skio
   renewals, so a monthly single-box EU renewal would fail once the small weight bands are
   deleted. Must happen before Phase 4. The pitch is genuinely better for them: one parcel a
   quarter means import charges paid once rather than three times, same monthly cost.

### Phase 4 — The switch

7. Create `European Delivery`, point the `Europe` and `france` zones at it.
8. Repoint all other international zones at `Express International DHL`.
9. Reprice every band off DHL cost + fuel surcharge + DTP fee.
10. Delete the 1-box and 2-box weight bands on all international zones (the minimum).
11. Publish the shipping policy line.

### Phase 5 — Later

12. **USA.** Resolve FDA compliance first, then the tariff rate, then the rate build.
13. Revisit IOSS only if EU volume grows enough to justify the admin.

---

## HS codes: current state

Verified live via the Shopify Admin API, 8 Sept 2026. Across the whole catalogue: country of
origin on 22 of 128 variants, HS codes on 27 of 128. Most of that is dead stock. **The 15
live variants that need `210690` + `GB`:**

| Product | Missing |
|---|---|
| CONKA Flow AM | `FLOW-FUNNEL-20`, `-20-OTP`, `-60`, `-80`, `-84` |
| CONKA Clear PM | `CLEAR-FUNNEL-20`, `-20-OTP`, `-60`, `-80`, `-84` |
| CONKA Flow + Clear | `BOTH-FUNNEL-40`, `-40-OTP`, `-56`, `-120`, `-140`, `-168` |

Already correct: `FLOW-FUNNEL-28` and `CLEAR-FUNNEL-28`, on both the main products and the
Team Box products (`210690` / `GB`). Copy that pattern.

Also missing but lower priority: `CONKA-TRAVEL-PACK-28` and the six Ketone IQ trial variants.
Merch is all £0.00 and can be ignored.

**What HS codes do and do not fix.** They decide the tariff, and without them destination
customs classifies the goods themselves and we cannot claim the TCA 0% rate. They also gate
Shopify's *collect duties and import taxes at checkout* (available to us at a 0.5%
promotional fee, normally 0.85% on Shopify Payments). They do **not** reduce VAT, and on
sub-€150 parcels the duty is a flat €3 regardless of classification. So this is necessary
hygiene and a prerequisite, not a fix for the doorstep bill.

**No write access from the repo.** `SHOPIFY_ADMIN_API_TOKEN` carries only customer and draft
order scopes; HS code and country of origin live on `InventoryItem` and need
`write_inventory`. Do it in the admin bulk editor, or mint a scoped token.

---

## UK VAT on EU orders — checked, no action

"Include sales tax in product price and shipping rate" is **on**, assuming 20%. There is no
dynamic tax inclusion for the EU because we are not collecting tax there, so a French
customer pays the same £39.99 as a UK customer and then French VAT at the border.

This is not necessarily an error. It means we are not passing the export zero-rating on as a
lower price, which is a pricing choice. The ~£6.67 stays with us as margin and quietly helps
fund the DDP cost.

**One question for the accountant:** are EU sales being zero-rated on our VAT return? If yes,
fine. If they are being treated as normal UK sales, we are paying HMRC money we do not owe.

Leave the setting alone. Dropping EU prices 20% while taking on import costs would be
perverse.

---

## Open questions

**Synergy (Georgina Anderson-Marshall / Bethany Waugh) — emailed 8 Sept 2026:**

1. **Under DDP, does the customer remain importer of record**, with DHL paying on their
   behalf and billing us? We will not register for French VAT. **This decides whether we
   proceed.**
2. Can **DHL Economy Select (road)** be added to the account for European destinations? We
   are only on Air.
3. What are the **DHL fuel surcharge** and the **DTP fee**? Neither is in the rate card and
   both are needed to reprice.
4. **Which field** are Synergy reading for the declared customs value? Georgina confirmed it
   is pulled from our system, so the fix may be ours.

**Not yet asked, worth adding:**

5. Why did the Evri label for order `13234918031734` fail, and how often does that happen?
6. Are Synergy filing **FDA Prior Notice** on US shipments, and do they hold our
   manufacturer's FDA registration number? (Phase 5, but cheap to ask now.)

**CONKA:**

7. Where exactly does the **minimum international order value** sit? ~3 boxes indicated;
   confirm against the EU order mix once we have it. (Humphrey)
8. What is the rule for **EU Skio renewals** below the floor? Quarterly-only, migrate, or
   accept. (Humphrey)
9. Correct **French VAT rate** for a liquid food supplement, 5.5% or 20%? (accountant)
10. Are EU export sales being **zero-rated** on our UK VAT return? (accountant)

---

## Verification (8 Sept 2026)

Every regulatory claim above was checked against primary and trade sources. All held:

- EU €3 flat duty live 1 Jul 2026, **per tariff line**, separate from VAT, running to
  1 Jul 2028. Confirmed. The collection mechanism is genuinely unsettled.
- France €2 TPC live 1 Mar 2026, **H7 declarations only**, per HS code not per item.
  Confirmed.
- US de minimis: 24 Jun 2026 non-postal, 24 Jul 2026 postal, both interim final rules.
  Confirmed.
- H7 cannot carry preferential origin; H1 is the only route to a TCA 0% claim. Confirmed.
- Managed Markets forces DHL Express or FedEx labels and makes Global-e merchant of record.
  Confirmed.
- Evri's public guidance: DDP to the USA only, everything else DAP. Confirmed, and it
  contradicts the `DDP Courier` line on Synergy's Evri card.
- FDA Prior Notice required per shipment for dietary supplements, express carriers not
  exempt, facility registration number required. Confirmed.
- Transaction value is the legal customs value. Confirmed.

**Not verified:** the importer-of-record position under DHL DDP, the DTP and fuel surcharge
figures, the current UK-US tariff rate, and our box dimensions for volumetric weight.

---

## Sources

Primary:

- [European Commission — €3 customs duty for low-value parcels](https://commission.europa.eu/news-and-media/news/ensuring-fairness-and-safety-eur3-customs-duty-low-value-parcels-2026-06-29_en)
- [Council of the EU — customs duty on small parcels from 1 July 2026](https://www.consilium.europa.eu/en/press/press-releases/2025/12/12/customs-council-agrees-to-levy-customs-duty-on-small-parcels-as-of-1-july-2026/)
- [EC Taxation and Customs Union — guidance and legal text on the temporary flat fee](https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en)
- [Federal Register — indefinite suspension of US de minimis, non-postal](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)
- [Federal Register — indefinite suspension of US de minimis, mail](https://www.federalregister.gov/documents/2026/06/24/2026-12669/indefinite-suspension-of-the-de-minimis-exemption-for-mail-shipments-and-new-postal-informal-entry)
- [FDA — importing food products into the United States](https://www.fda.gov/food/food-imports-exports/importing-food-products-united-states)
- [eCFR 21 CFR Part 1 Subpart I — Prior Notice of Imported Food](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-1/subpart-I)
- [Shopify Help — Managed Markets for the United Kingdom](https://help.shopify.com/en/manual/international/managed-markets/managed-markets-uk)
- [Shopify Help — collecting duties and import taxes at checkout](https://help.shopify.com/en/manual/international/duties-and-import-taxes/charging-duties)
- [Evri — EU customs update 2026](https://www.evri.com/news/eu-customs-update-2026)
- [Evri — international shipping FAQs](https://www.evri.com/evri-international-faqs) (DDP is USA-only)
- [DHL Express — Duty Tax Paid billing services](https://www.dhl.de/en/geschaeftskunden/express/produkte-und-services/duty-billing-services.html)

Secondary, flagged as such:

- [Avalara — H1, H6 and H7 declaration types](https://www.avalara.com/blog/en/europe/2026/07/eu-customs-h1-h6-h7-declarations.html) (the H7-blocks-preference mechanism)
- [KPMG — France temporary small parcel tax from 1 March 2026](https://kpmg.com/us/en/taxnewsflash/news/2026/02/tnf-france-new-temporary-small-parcel-tax-effective-march-1-2026.html)
- [House of Commons Library — US trade tariffs](https://commonslibrary.parliament.uk/research-briefings/cbp-10240/) (UK 10% baseline, legal basis in flux)
- [RM Boulanger — selling DDP in France](https://www.rmboulanger.com/services/brexit/sell-ddp-in-france) (French VAT registration for a seller acting as importer)
- DTP and IOSS intermediary pricing: vendor sources, indicative only.
