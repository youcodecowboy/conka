# International Duties, DDP and the Move to DHL

**Status:** DECIDED and unblocked. Synergy replied 10 Sept 2026: road is available, Royal
Mail is out, importer of record treated as settled. One decision left for us (hard-coded
incoterms) before they build. See § Synergy's answers.
**Created:** 2026-09-07 · **Updated:** 2026-09-10
**Owner:** Rudh (Shopify config + Synergy liaison), Humphrey (commercial call, Synergy
relationship)
**Trigger:** French customers billed a surprise import charge at the door, Sept 2026.
Georgina Anderson-Marshall (Synergy) confirmed the orders shipped DAP because terms of sale
were never mapped at onboarding.
**Relates to:** `docs/shipping/SHIPPING_AND_COURIERS.md` (canonical; §4 and §6 are superseded
by this plan until it is folded back in), `order-size-shipping-tiers.md`,
`archive/synergy-3pl-integration.md`, **SCRUM-1311** (renewal shipping titles — see
§ Interaction with SCRUM-1311)
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

## Synergy's answers, 10 September 2026

Georgina Anderson-Marshall replied to the 8 Sept email. **Nothing in it blocks the switch.**
Road is available, Royal Mail is out, and the one item that genuinely needs a decision from
us is how the incoterm reaches their system.

Synergy already ship DDP for other clients on this DHL account. Most of what we asked is
their domain and theirs to run. The notes below record what we assume for pricing, not a
list of things to press them on.

### Available and agreed

- **DHL Economy Select (road) — yes.** Needs a unique dispatch method name, which
  `European Delivery` provides. They will map that name to the Road service.
- **Royal Mail International — not available.** Labels have failed since the July 2026
  data-format change and Royal Mail have not resolved it. Closed, do not revisit.
- **Evri DDP — offered unprompted as a cheaper alternative to DHL.** Worth a price, below.

### Importer of record — proceed

Synergy do not set it, DHL do. She checked a live DDP shipment for another client: the
**receiver is the customer's address on both the label and the commercial invoice**, with no
importer of record named anywhere. DHL's own product description says the same thing, that
Duty Tax Paid arranges for the shipper to be *billed* "rather than the receiver of the
shipment being billed". A billing arrangement, not a change of declarant.

That is how express DDP normally works. If it were otherwise, every UK merchant shipping DDP
into the EU would need a French VAT registration. **Treat it as settled and proceed.** This
was written up as a go/no-go; it is really a watch item. Volume is four to five French
customers, so if the first shipment says otherwise we revert to DAP having lost nothing. The
§ Why not French VAT registration position stands: we will not register.

### What we assume for pricing

Exact figures are not needed to set a checkout price. A conservative all-in cost now, then
two or three real Synergy invoices replace it.

| | Assumption | Basis |
|---|---|---|
| **DTP fee** | **£16 per international parcel** | DHL UK Service & Rate Guide 2026: Duty Tax Paid is 2% of fiscal charges, minimum £16.00, and at our order values 2% never clears the floor. Georgina has not seen it on recent invoices, which may mean Synergy's contract absorbs it. Budget for it; if it never appears we are £16 a parcel better off |
| **Fuel surcharge** | **~20%, on freight and on the DTP fee** | DHL set it monthly on two indices, jet fuel for Express Air and diesel for Economy Select road, applied to transportation charges *and* to services and surcharges. Whether our card's freight figures are already fuel-inclusive is unclear, so assume they are not |

Neither changes the decision. On a ~£100 landed cost, being five points out on fuel is £2.

### The one decision that is ours — incoterm mapping

Synergy raised something we had not: how terms of sale reach their system. Two mutually
exclusive routes, and they will not mix them.

| | How it works | Cost |
|---|---|---|
| **A. Hard-code per dispatch method** | `European Delivery` → DDP, `Express International DHL` → DDP, fixed in their mapping. A Shopify-supplied incoterm would be overridden | Free, same mechanism as the existing name-based routing |
| **B. Read the incoterm off each Shopify order** | We tell them which Shopify field holds it, they map it to a JDA field and run a test order | **Chargeable at the bespoke project rate** |

**Take A**, and this one is genuinely ours to answer because only we know the Shopify side.
Shopify carries no per-order incoterm unless duties are collected at checkout, which needs
either Managed Markets (rejected, § Options considered G) or Shopify's collect-duties feature
(deliberately off, § HS codes). Under route B there would be nothing in the payload to read.
Our map is also 1:1 and static: four methods, one terms of sale each.

### Still outstanding

**The declared customs value.** Not addressed, for the second time. Georgina confirmed the
figure comes from our system but has not said which field, and it is over-declaring live
orders (£199.95 on an order sold at £140). Their integration reading our data, so they can
answer it. Blocks Phase 0 step 1.

**An Evri DDP price for Europe.** The money is real: Europe at 6 boxes is ~£46 on DHL Road
against ~£15 to £26 on Evri. The likely catch is that Evri's EU DDP is their **IOSS**
service, VAT only and under €150, which would leave the €3 duty and France's €2 at the door
(option D, already rejected). Ask for the price and whether it covers duty. Do not wait for
it, and note Evri failed to produce the label for the France order that started this.

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
| **C. Evri DDP** | **Not available.** Evri's DDP to the EU is an **IOSS** service, and their public guidance states DDP is USA-only with everything else DAP. Synergy's Evri card lists a `DDP Courier` line for EU countries, which contradicts that and was never resolved. Synergy volunteered it again on 10 Sept 2026 as a cheaper alternative; one precise question outstanding (§ Synergy's answers 6). Not built on |
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

**On top of every figure above.** The **DTP fee** is now known from DHL's UK Service &
Rate Guide 2026: **2% of fiscal charges, minimum £16.00**. At our order values 2% never
clears the floor, so treat it as a flat **£16 per international parcel**. The **fuel
surcharge** is still unknown: set monthly on two separate indices (jet fuel for Express
Air, diesel for Economy Select road) and applied to the freight *and* to the DTP fee.
Whether our card's figures are already fuel-inclusive is the open question
(§ Synergy's answers 3).

**Worked example, Europe 3 boxes, with fuel as the only unknown:**

| | £ |
|---|---|
| DHL Road freight | 42.24 |
| Fuel on freight, illustrative 20% | 8.45 |
| DTP fee (the £16 floor) | 16.00 |
| Fuel on DTP, same rate | 3.20 |
| EU flat duty €3 + France parcel tax €2 (sub-€150, H7) | 4.30 |
| French VAT 20% on goods £119.97 + shipping £26 | 29.20 |
| **Landed cost to us** | **~103** |

Against **£26 charged today**. Even with fuel at zero it is ~£91. Note the feedback loop:
VAT is charged on the shipping the customer paid, so raising the shipping price raises the
VAT base with it and recovery is not linear. **This arithmetic is what forces the minimum
order size**, and it is worse than the plan assumed when it was written.

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

**Terms of sale are hard-coded per method, not read off the order.** Synergy will either
hard-code an incoterm against each dispatch method or pull one from Shopify on every order,
never a mix. We take the hard-code: Shopify carries no incoterm field unless duties are
collected at checkout, which we are not doing, and our map is 1:1 and static. Reasoning in
§ Synergy's answers 4.

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

### Phase 1 — Synergy (asked 8 Sept, replied 10 Sept 2026)

Road confirmed, Royal Mail closed, importer of record treated as settled. The only thing
Synergy need from us before they build the three method changes is confirmation of the
hard-coded incoterms. The declared-value field and an Evri price follow in parallel.
**Phase 4 is no longer gated on Synergy.** See § Synergy's answers.

### Phase 2 — Our own admin, runs in parallel

3. ~~Set the **default country of origin** to United Kingdom.~~ **DONE 8 Sept 2026.**
4. ~~Add **HS code `210690`** to the live variants missing it.~~ **DONE 8 Sept 2026**, see below.
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
11. **Re-sync the 12 international Skio contracts** onto the new method names. These were
    deliberately held back from the SCRUM-1311 bulk fix so they are corrected once, against
    the final names, rather than twice (§ Interaction with SCRUM-1311). Use Skio's per-contract
    "Re-sync with Shopify", or `changeSubscriptionDeliveryMethod`. **Leave `setOverride` false**:
    these contracts store Loop-era delivery prices (EUR 26.95, EUR 38.95, USD 28-31) and a
    re-rate would change what real customers pay. Decide the price question deliberately at
    step 9, not as a side effect of fixing a title.
12. Publish the shipping policy line.

## Interaction with SCRUM-1311

SCRUM-1311 fixes a separate, unrelated failure: every subscription contract migrated from Loop
stores a null delivery-method title, so renewals print `Subscription shipping` and Synergy holds
them as "Invalid Dispatch Method". Contracts created through Skio checkout carry `Express` and
are fine. See `docs/features/SUBSCRIPTIONS.md` § Shipping on renewals.

The two overlap on exactly **12 contracts**. Active subscription state, pulled from Skio
8 Sept 2026:

| | Loop-migrated (needs the SCRUM-1311 fix) | Skio-native (already correct) |
|---|---|---|
| UK | **207** | 37 |
| International | **12** (8 France, 4 USA) | 0 |

**Every international subscriber is Loop-migrated, and there are no Skio-native international
contracts at all.**

**The split:** the 207 UK contracts map to `Express`, which this plan does not change. Fix them
under SCRUM-1311 now and they never need touching again. The 12 international ones would be set
to `Express International`, which this plan **retires**, so fixing them now means fixing them
twice.

**So hold the 12 and correct them at Phase 4 step 11.** They are getting touched again
regardless: four of them are the French monthly subscribers being migrated to quarterly
(Phase 3), and all 12 carry stale Loop-era delivery prices that no current rate matches.

**One line in `SUBSCRIPTIONS.md` goes stale when this ships.** It currently states that a
contract maps to `Express` if the address is UK and `Express International` otherwise, with no
exceptions. After the switch that is three methods: `Express` (UK), `European Delivery` (EU),
`Express International DHL` (rest of world). Update it as part of Phase 4.

### Phase 5 — Later

12. **USA.** Resolve FDA compliance first, then the tariff rate, then the rate build.
13. Revisit IOSS only if EU volume grows enough to justify the admin.

---

## HS codes — DONE 8 Sept 2026

All live sellable variants now carry HS code `210690` and country of origin `GB`. Verified
via the Shopify Admin API: **38 of 39 live sellable variants complete.** A store-level
default country of origin (United Kingdom) is also set, and the value was written explicitly
onto each variant rather than relying on the default, since it is not certain a store default
reaches Synergy's variant-level data pull.

Outstanding: `CONKA-TRAVEL-PACK-28` (neither field). Low priority.

Whole catalogue reads HS on 38/128 and origin on 44/128. The remainder is dead merch and
free-gift variants that do not ship internationally.

**What HS codes do and do not fix.** They decide the tariff, and without them destination
customs classifies the goods themselves and we cannot claim the TCA 0% rate. They also gate
Shopify's *collect duties and import taxes at checkout* (available to us at a 0.5%
promotional fee, normally 0.85% on Shopify Payments). They do **not** reduce VAT, and on
sub-€150 parcels the duty is a flat €3 regardless of classification. Necessary hygiene and a
prerequisite, not a fix for the doorstep bill.

**One code covers everything** because an HS code classifies what the product *is*, not the
SKU. Flow and Clear are both liquid food supplements, pack size is irrelevant, and the
bundles classify the same as their components. `210690` is the 6-digit international part;
the EU extends it to 8 digits at their end and the broker does that. If a shipment is ever
challenged it will be the chapter 21 vs chapter 22 (beverages) argument, at which point get
a broker's opinion.

**Do not enable *collect duties at checkout* yet.** If it is switched on while shipments are
still going DAP, the customer pays duty at checkout *and* is billed again at the door.

**No write access from the repo.** `SHOPIFY_ADMIN_API_TOKEN` carries only customer and draft
order scopes; HS code and country of origin live on `InventoryItem` and need
`write_inventory`. This was done manually in the admin bulk editor.

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

**Synergy — asked 8 Sept, replied 10 Sept 2026.** Road confirmed, Royal Mail closed,
importer of record treated as settled (§ Synergy's answers). Left to run:

1. **Which field** drives the declared customs value. Third time of asking, and it is
   over-declaring live orders.
2. An **Evri DDP price for Europe**, and whether it covers duty as well as VAT.
3. For us to confirm to them so they can build: **hard-coded incoterms**, both DHL methods
   to DDP, no Shopify field, no bespoke project fee.

Worth adding while the thread is open, neither urgent:

4. Why did the Evri label for order `13234918031734` fail, and how often does that happen?
5. Are Synergy filing **FDA Prior Notice** on US shipments, and do they hold our
   manufacturer's FDA registration number? (Phase 5.)

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

Added 10 Sept 2026, from DHL's **UK Service & Rate Guide 2026** and Synergy's own rate card:

- **Duty Tax Paid: 2% of fiscal charges, minimum £16.00.** Published under Duty Billing
  Services. Distinct from Duty Tax Processing (2.5%, min £12.00 / £11.00), which is the
  receiver-pays product and not what DDP uses.
- DHL describes Duty Tax Paid as arranging for the shipper to be **billed** rather than the
  receiver, with no mention of moving the declarant. Supporting evidence on importer of
  record, not proof.
- Fuel is set **monthly**, on the prior month's USGC spot average, on **two indices**: jet
  fuel for International Time Definite (Express Air), ULSD diesel for Regional Day Definite
  (Economy Select). It applies to transportation charges **and to services and surcharges**.
- **Volumetric divisor 5000**, confirmed on the `DHL Surcharges` tab of Synergy's card. That
  tab carries no fuel percentage, only the divisor and a link to DHL's public page.

**Not verified:** the importer-of-record position under DHL DDP, the current fuel surcharge
percentages, whether our card's freight figures are fuel-inclusive, the current UK-US tariff
rate, and our box dimensions for volumetric weight.

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
- [DHL Express Service & Rate Guide 2026: United Kingdom](https://mydhl.express.dhl/content/dam/downloads/gb/en/rate-guide/service_and_rate_guide_gb_en.pdf.coredownload.pdf) (the DTP figure, the fuel-index mechanism)
- `docs/shipping/Conka Elite Limited - DHL Air and Road Rates 2026 (1).xlsx`, `DHL Surcharges` tab

Secondary, flagged as such:

- [Avalara — H1, H6 and H7 declaration types](https://www.avalara.com/blog/en/europe/2026/07/eu-customs-h1-h6-h7-declarations.html) (the H7-blocks-preference mechanism)
- [KPMG — France temporary small parcel tax from 1 March 2026](https://kpmg.com/us/en/taxnewsflash/news/2026/02/tnf-france-new-temporary-small-parcel-tax-effective-march-1-2026.html)
- [House of Commons Library — US trade tariffs](https://commonslibrary.parliament.uk/research-briefings/cbp-10240/) (UK 10% baseline, legal basis in flux)
- [RM Boulanger — selling DDP in France](https://www.rmboulanger.com/services/brexit/sell-ddp-in-france) (French VAT registration for a seller acting as importer)
- DTP and IOSS intermediary pricing: vendor sources, indicative only.
