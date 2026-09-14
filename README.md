# Dialub Expert — Pakelo Lubricants Romania

Replacement for the WordPress/Elementor site at **dialub.ro**, rebuilt on a modern
headless stack. Same images, same copy, same Pakelo vibe — no page builder.

```
pakelo-romania/
└── storefront/        Next.js 16 (App Router) storefront — this is what's built today
```

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Storefront | **Next.js 16 (App Router) + TypeScript** | Static-first rendering, image optimisation, server components for the shop later |
| Styling | **Tailwind CSS v4** (`@theme` tokens in `src/app/globals.css`) | Brand palette and fonts live in one place |
| Type | **Archivo** (display) + **Inter** (text) | Closest free pairing to Pakelo's own *Formular* |
| Carousels | **Embla** + `embla-carousel-autoplay` | Tiny, accessible, no jQuery/Swiper baggage |
| Motion | **Motion** (`motion/react`) | Scroll reveals; all of it honours `prefers-reduced-motion` |
| Maps | **Leaflet + OpenStreetMap** | Dealer and office maps with no API key and no third-party tracking |
| Commerce (next) | **Medusa v2**, self-hosted | See [`docs/commerce.md`](docs/commerce.md) |
| Payments (next) | **Stripe** (RON) → Netopia for local cards | Medusa ships a first-party Stripe module |
| Invoicing (next) | **SmartBill** REST API via a Medusa subscriber | See [`docs/commerce.md`](docs/commerce.md) |

## Running it

```bash
cd storefront
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying

Hosted on **Vercel**, which builds on every push to `main`.

The repo is a monorepo, so the Vercel project's **Root Directory must be set to
`storefront`** — everything else is zero-config.

| Variable | Needed for | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | contact form | Without it the form falls back to opening the visitor's mail client with the message pre-filled |
| `CONTACT_TO` | contact form | Defaults to `pakelo@dialub.ro` |
| `CONTACT_FROM` | contact form | Must be a domain verified in Resend |

See `storefront/.env.example`. GitHub Actions runs typecheck, lint and build on
every push and PR.

## What's done

### Shop — `/produse` and `/produse/[slug]`

The full catalogue, scraped from the live WooCommerce store and rebuilt as static
data: **75 products, 299 package variants, 94 images**. Product pages follow
pakelo.com's own layout (pack shot on a red diagonal, datasheet on the right).

The filter rail goes well past what dialub.ro offers today:

| Filter | Notes |
| --- | --- |
| Search | name, code, *and* every approval line — "VW 504 00" finds the two oils that carry it |
| Domeniu | 9 sectors |
| Tip produs | 13 subcategories, parent shown where names repeat |
| Vâscozitate SAE | 25 grades |
| Bază ulei | 6 |
| **Specificații** | 61 normalised industry standards (ACEA, API, JASO, ILSAC, SAE, ISO, DIN, NSF, MIL, FMVSS) |
| **Aprobări OEM** | 75 manufacturers, parsed out of the datasheets |
| Ambalaj | 12 pack sizes |
| Preț | dual-handle range over every package price |
| Stoc | in-stock toggle |

The last two were the point of the exercise: nothing in the current shop lets a
buyer say "show me the oils approved by Porsche that meet ACEA C3". Supporting
behaviour: counts recompute live against the other active filters, active
filters show as removable chips, everything is mirrored into the URL so a
filtered view is shareable, and there's list/grid + four sort orders.

### Interior pages

| Route | Notes |
| --- | --- |
| `/despre-pakelo` | The six-era company timeline (1930 → 2023) as a carousel with a year rail, the "Excelență în Lubrifiere din 1930" block with its bullets, and *Lubrifianți personalizați* |
| `/distribuitori` | All 13 partners on an interactive map, searchable by name/city/address with per-city chips. Leaflet + OpenStreetMap — no API key, no third-party tracker |
| `/contact` | Company details, office map, and a working contact form (server action) |
| `/terms-and-conditions` | 27 sections, verbatim |
| `/privacy-policy` | 12 sections, verbatim |

### Homepage

Complete, section for section against dialub.ro:

1. Full-viewport hero slider — 3 slides, Ken Burns, 5s autoplay, progress-bar pagination
2. Fixed Facebook tab (right edge, desktop/tablet)
3. Authorised-dealer intro + the 8-category carousel (Auto → Ambarcațiuni)
4. 100% Made in Italy
5. Red *Filosofia Producției* / *Puterea Echilibrului Polar* block
6. *Totul despre Pakelo* — Fabrica, Servicii, Certificări, Dealeri în România
7. *Born to Race* billboard → magazinul online
8. Footer — address, program, legal links
9. GDPR cookie banner with per-category consent

Every image is the original asset, downloaded from dialub.ro into
`storefront/public/images/`. All copy is transcribed verbatim into
`storefront/src/content/home.ts` so it can move to a CMS without touching layout.

## Content & config

- `src/content/home.ts` — every string and image on the homepage
- `src/content/about.ts` — the timeline and "Despre Pakelo" copy
- `src/content/dealers.ts` — the 13 partners with coordinates
- `src/content/legal.ts` — the two legal documents, verbatim
- `src/data/catalog.json` — the product catalogue and its facets (generated)
- `src/lib/catalog.ts` — catalogue types, lookups, price formatting
- `src/lib/filters.ts` — the filter engine: predicates, live facet counts, URL sync
- `src/lib/site.ts` — company details, navigation, social links
- `src/app/globals.css` — brand tokens (`--color-pakelo-red: #e3241c`, `--color-ink: #0b0b0b`, …)

## Where the catalogue came from

`dialub.ro` exposes the **WooCommerce Store API** publicly, so no database access
was needed — `/wp-json/wc/store/v1/products` gives products, attributes,
categories and prices as structured JSON, and each variation was fetched by id
for its own price, SKU and pack shot. See [`docs/catalog.md`](docs/catalog.md)
for the pipeline and how to re-run it when the WordPress catalogue changes.

The partner list came from the same site's WP Google Maps plugin, whose markers
are also public at `/wp-json/wpgmza/v1/markers` — city, contact name and phone
were parsed out of the free-text marker descriptions.

Legacy WooCommerce URLs (`/product/:slug`, `/product-category/:slug`, `/shop`)
301 to their new homes, so nothing that is already indexed breaks.

## Content parity

Every migrated page was diffed string-by-string against the live original with a
headless browser (see `docs/catalog.md`). What remains different is deliberate:
WooCommerce chrome ("Adaugă în coș", "Recenzii (0)", the brand taxonomy line),
the Google-Maps cookie placeholder that our OSM map doesn't need, and
"Skip to content" which is now "Sari la conținut". Two source typos were
corrected: `0,.450 kg` → `0,45 kg` and the shop's "Find you Oil" button →
"Find your oil" (the spelling the site's own nav uses).

## Notes

- There is no cart or checkout yet: product pages offer a pre-filled "Cere
  ofertă" e-mail and the phone number instead of a fake add-to-cart. Checkout
  arrives with the Medusa backend (see `docs/commerce.md`).
- The contact form sends through **Resend**; set `RESEND_API_KEY` (and
  optionally `CONTACT_TO` / `CONTACT_FROM`) to switch it on. Until then it falls
  back to opening the visitor's mail client with the message pre-filled, so
  nothing is lost.
- Two things in the inherited legal copy are worth a lawyer's eye before launch:
  the privacy policy still says orders are kept "timp de XX ani" (an unfilled
  WooCommerce placeholder), and three paragraphs of the returns section are
  still in English.
- The cookie banner stores the choice in `localStorage` only; wire it to the
  analytics loader when analytics is added.
