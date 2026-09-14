# Shop, payments and SmartBill — the plan

The storefront is deliberately decoupled from commerce, so this can land without
touching the marketing pages.

## Why Medusa v2 (and not Shopify / Swell / Saleor)

Romanian fiscal invoicing is the deciding factor. Every order has to produce a
SmartBill invoice with the right series, VAT treatment and — for B2B — the
buyer's CUI and Registrul Comerțului number. That is server-side custom logic on
`order.placed`.

- **Medusa v2** — Node/TypeScript, same language as the storefront. Subscribers
  and workflows make the SmartBill hook ~100 lines. Self-hosted, so order and
  customer data stay in the EU, and there are no per-transaction fees on top of
  the payment processor. Product data model handles the viscosity /
  packaging-size variants Pakelo needs (1L, 4L, 5L, 20L, 60L, 208L drums).
- *Shopify* — cheapest to start, but SmartBill would need a third-party app or a
  separate middleware service, and Shopify Payments isn't available in Romania.
- *Saleor* — capable, but Python/GraphQL-first adds a second stack to maintain.

## Shape

```
storefront (Next.js)  ──REST──▶  Medusa v2  ──▶  Postgres
                                    │
                                    ├─▶ Stripe (payment module)
                                    └─▶ SmartBill (subscriber on order.placed)
```

## Payments

Start with **Stripe** — Medusa ships `@medusajs/payment-stripe`, Stripe settles in
RON, and it covers cards + Apple/Google Pay. Add **Netopia mobilPay** as a second
provider afterwards for buyers who expect a local processor; Medusa allows
several payment providers per region.

Ramburs (cash on delivery) is still common in RO — model it as a manual payment
provider so the invoice is issued on fulfilment rather than on order.

## SmartBill

REST API, HTTP Basic auth with `email:token`:

```
POST https://ws.smartbill.ro/SBORO/api/invoice
GET  https://ws.smartbill.ro/SBORO/api/invoice/pdf?cif=…&seriesname=…&number=…
```

A Medusa subscriber on `order.placed` maps the order to the invoice payload
(company CIF, series name, client block with `vatCode`/`regCom` for B2B, product
lines with `isTaxIncluded` and the 21% VAT rate), then stores the returned series
and number on the order's metadata and attaches the PDF to the confirmation
email. Retries belong in a workflow step so a SmartBill outage never fails
checkout.

Environment variables the backend will need:

```
SMARTBILL_USERNAME=        # account e-mail
SMARTBILL_TOKEN=           # from SmartBill → Integrări → API
SMARTBILL_CIF=             # Dialub's fiscal code
SMARTBILL_SERIES=          # invoice series, e.g. DLB
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Order of work

1. Interior pages on the storefront (`/produse` listing, `/despre-pakelo`,
   `/distribuitori`, `/contact`, legal pages)
2. Medusa backend + Postgres, product import from the current WooCommerce catalogue
3. Cart, checkout, Stripe
4. SmartBill subscriber + invoice PDF on the order confirmation
5. Netopia, then ramburs
