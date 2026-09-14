# Catalogue pipeline

The product data is scraped once from the live WordPress site and committed as
static JSON. Nothing is fetched at runtime, so the shop is fully prerendered.

## Source

`dialub.ro` leaves the **WooCommerce Store API** open, which is richer than the
database would have been for this purpose — it returns the same shapes
WooCommerce renders from, already joined:

```
GET /wp-json/wc/store/v1/products?per_page=100          → 75 parent products
GET /wp-json/wc/store/v1/products/{id}                  → one variation (price, SKU, pack shot)
GET /wp-json/wc/store/v1/products/categories?per_page=100
GET /wp-json/wc/store/v1/products/attributes[/{id}/terms]
```

Variations aren't returned by the collection endpoint, so the 289 variation ids
listed on the parents are fetched individually (5 at a time).

## Steps

1. **Scrape** — parents, then every variation.
2. **Normalise** — for each product pull out of `short_description`: the range
   badge image, the base type, the one-line summary. Roll up categories to their
   parent sector (a product in `karting` also belongs to `moto`). Simple products
   get one synthetic variant so the UI has a single shape to render.
3. **Parse the datasheet** — the tail of `description` carries
   *Niveluri de performanță*, *Aprobări* and *Recomandări Pakelo*, with the
   standards body in `<strong>`. Those `<strong>` markers are what make the
   split reliable: `<strong>ACEA</strong> E11 / E7` → `ACEA E11`, `ACEA E7`.
4. **Classify the specs** — 686 raw approval strings are too many to list as a
   flat filter (610 appear on a single product). They split two ways:
   - **standards** — a finite, finite-valued body (ACEA, API, JASO, ILSAC, SAE,
     ISO, DIN, NSF, MIL, FMVSS) keeps its exact code → 61 options.
   - **OEM approvals** — everything else is indexed by manufacturer only, with
     compound labels split (`Audi/Seat/Skoda/VW G 052 171` → four brands) → 75
     options. The full strings stay on the product for display and search.
5. **Download images** — 94 files (pack shots, package photos, range badges)
   into `public/images/products` and `public/images/badges`, slugified.
6. **Sanitise** — strip WordPress markup from the datasheet body, drop the spec
   blocks (rendered as tables instead) and the remote images.
7. **Emit** — `src/data/catalog.json` with `products` and precomputed `facets`.

## Re-running it

The scripts live in the session scratchpad rather than the repo, since this is a
one-off migration rather than a recurring sync. If the WordPress catalogue
changes before cutover, the sequence is: scrape → `normalize.py` →
`build_catalog.py` → `sanitize.py`. Once Medusa is the source of truth this
pipeline becomes a one-time import instead.

## Content-parity check

`contentdiff.mjs` (scratchpad) loads the old and new version of a page in a
headless browser, strips header/footer/cookie chrome, expands every collapsed
control, and reports any string on the original that doesn't appear on the
replacement. It caught two real regressions worth recording:

1. **Truncated summaries.** Ten products lead their short description with
   `Ambalaj: 1 Litru` or a base-type line, so taking the *first* paragraph as
   the summary silently dropped the actual description (Brake Fluid 404 lost
   four sentences). Now every descriptive paragraph is kept and the metadata
   lines are held aside in `notes`.
2. **Lossy approval parsing.** The standard/OEM split is good for filtering but
   drops qualifiers like `BMW Group (BMW/MINI/Rolls-Royce) QV 34 001`. The
   datasheet's approval blocks are now also kept verbatim as `specsHtml` and
   rendered on the product page, with the parsed chips shown alongside as links
   into the filtered catalogue.

## Known data quirks (from the source, not the parser)

- Two `Lichid de frână` subcategories exist, one under `auto` and one under
  `moto`; the filter shows the parent to tell them apart.
- `0,.450 kg` in the packaging attribute is a typo; it's normalised to `0,45 kg`.
- Seven products (greases, sprays, a spindle oil) have no base type, and
  fourteen have no SAE viscosity — correct, those grades don't apply to them.
- Two products had no short description; the first paragraph of the datasheet is
  used instead.
