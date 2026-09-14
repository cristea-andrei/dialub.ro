import type { Facets, ListProduct } from "@/lib/catalog";

export type SortKey = "recomandate" | "pret-asc" | "pret-desc" | "nume";

export type FilterState = {
  q: string;
  sectors: string[];
  types: string[];
  baseTypes: string[];
  viscosities: string[];
  packagings: string[];
  standards: string[];
  oems: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStockOnly: boolean;
  sort: SortKey;
};

export const emptyFilters: FilterState = {
  q: "",
  sectors: [],
  types: [],
  baseTypes: [],
  viscosities: [],
  packagings: [],
  standards: [],
  oems: [],
  priceMin: null,
  priceMax: null,
  inStockOnly: false,
  sort: "recomandate",
};

/** Every facet group, so counts can be recomputed while excluding one of them. */
export type FacetKey =
  | "sectors"
  | "types"
  | "baseTypes"
  | "viscosities"
  | "packagings"
  | "standards"
  | "oems";

const SECTOR_SLUGS = new Set([
  "auto",
  "moto",
  "constructii",
  "agricultura",
  "heavy-duty",
  "industriale",
  "alimentare",
  "ambarcatiuni",
  "ferrari",
]);

function matchesQuery(p: ListProduct, q: string) {
  if (!q) return true;
  // every whitespace-separated token must appear somewhere
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => p.search.includes(token));
}

type Predicate = (p: ListProduct) => boolean;

function predicates(f: FilterState): Record<FacetKey | "q" | "price" | "stock", Predicate> {
  return {
    q: (p) => matchesQuery(p, f.q),
    sectors: (p) => !f.sectors.length || f.sectors.some((s) => p.sectors.includes(s)),
    types: (p) => !f.types.length || f.types.some((t) => p.categories.includes(t)),
    baseTypes: (p) =>
      !f.baseTypes.length || (p.baseTypeSlug != null && f.baseTypes.includes(p.baseTypeSlug)),
    viscosities: (p) =>
      !f.viscosities.length || (p.viscositySlug != null && f.viscosities.includes(p.viscositySlug)),
    packagings: (p) =>
      !f.packagings.length || f.packagings.some((s) => p.packagings.includes(s)),
    standards: (p) => !f.standards.length || f.standards.every((s) => p.standards.includes(s)),
    oems: (p) => !f.oems.length || f.oems.every((s) => p.oems.includes(s)),
    price: (p) => {
      if (f.priceMin == null && f.priceMax == null) return true;
      // a product qualifies when any of its packages falls inside the range
      return p.variants.some((v) => {
        if (v.price == null) return false;
        if (f.priceMin != null && v.price < f.priceMin) return false;
        if (f.priceMax != null && v.price > f.priceMax) return false;
        return true;
      });
    },
    stock: (p) => !f.inStockOnly || p.inStock,
  };
}

export function applyFilters(all: ListProduct[], f: FilterState): ListProduct[] {
  const P = predicates(f);
  const checks = Object.values(P);
  const out = all.filter((p) => checks.every((check) => check(p)));
  return sortProducts(out, f.sort);
}

export function sortProducts(list: ListProduct[], sort: SortKey): ListProduct[] {
  const out = [...list];
  switch (sort) {
    case "pret-asc":
      return out.sort((a, b) => (a.priceMin ?? Infinity) - (b.priceMin ?? Infinity));
    case "pret-desc":
      return out.sort((a, b) => (b.priceMin ?? -Infinity) - (a.priceMin ?? -Infinity));
    case "nume":
      return out.sort((a, b) => a.name.localeCompare(b.name, "ro"));
    default:
      // in-stock first, then the richest datasheets, then alphabetical
      return out.sort(
        (a, b) =>
          Number(b.inStock) - Number(a.inStock) ||
          b.standards.length - a.standards.length ||
          a.name.localeCompare(b.name, "ro"),
      );
  }
}

/**
 * Counts for one facet group, computed against every *other* active filter.
 * That way ticking "Auto" immediately narrows the viscosity counts, but the
 * viscosity options you could still pick don't vanish.
 */
export function facetCounts(
  all: ListProduct[],
  f: FilterState,
  group: FacetKey,
): Map<string, number> {
  const P = predicates(f);
  const others = (Object.keys(P) as (keyof typeof P)[])
    .filter((k) => k !== group)
    .map((k) => P[k]);
  const pool = all.filter((p) => others.every((check) => check(p)));

  const counts = new Map<string, number>();
  const bump = (key: string) => counts.set(key, (counts.get(key) ?? 0) + 1);

  for (const p of pool) {
    switch (group) {
      case "sectors":
        p.sectors.forEach(bump);
        break;
      case "types":
        p.categories.filter((c) => !SECTOR_SLUGS.has(c)).forEach(bump);
        break;
      case "baseTypes":
        if (p.baseTypeSlug) bump(p.baseTypeSlug);
        break;
      case "viscosities":
        if (p.viscositySlug) bump(p.viscositySlug);
        break;
      case "packagings":
        p.packagings.forEach(bump);
        break;
      case "standards":
        p.standards.forEach(bump);
        break;
      case "oems":
        p.oems.forEach(bump);
        break;
    }
  }
  return counts;
}

/* ------------------------------------------------------------------ *
 * URL serialisation — filtered views stay shareable and bookmarkable
 * ------------------------------------------------------------------ */

const LIST_KEYS = [
  ["sectors", "domeniu"],
  ["types", "tip"],
  ["baseTypes", "baza"],
  ["viscosities", "viscozitate"],
  ["packagings", "ambalaj"],
  ["standards", "spec"],
  ["oems", "oem"],
] as const;

export function filtersToParams(f: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  for (const [key, param] of LIST_KEYS) {
    const values = f[key];
    if (values.length) params.set(param, values.join(","));
  }
  if (f.priceMin != null) params.set("pmin", String(f.priceMin));
  if (f.priceMax != null) params.set("pmax", String(f.priceMax));
  if (f.inStockOnly) params.set("stoc", "1");
  if (f.sort !== "recomandate") params.set("sort", f.sort);
  return params;
}

const SORTS: SortKey[] = ["recomandate", "pret-asc", "pret-desc", "nume"];

export function filtersFromParams(
  params: URLSearchParams,
  facets: Facets,
): FilterState {
  const valid: Record<string, Set<string>> = {
    sectors: new Set(facets.sectors.map((t) => t.slug)),
    types: new Set(facets.subcategories.map((t) => t.slug)),
    baseTypes: new Set(facets.baseTypes.map((t) => t.slug)),
    viscosities: new Set(facets.viscosities.map((t) => t.slug)),
    packagings: new Set(facets.packagings.map((t) => t.slug)),
    standards: new Set(facets.standards.map((t) => t.value)),
    oems: new Set(facets.oems.map((t) => t.value)),
  };

  const next: FilterState = { ...emptyFilters, q: params.get("q") ?? "" };
  for (const [key, param] of LIST_KEYS) {
    const raw = params.get(param);
    if (!raw) continue;
    next[key] = raw.split(",").filter((v) => valid[key].has(v));
  }

  const pmin = Number(params.get("pmin"));
  const pmax = Number(params.get("pmax"));
  next.priceMin = Number.isFinite(pmin) && params.get("pmin") ? pmin : null;
  next.priceMax = Number.isFinite(pmax) && params.get("pmax") ? pmax : null;
  next.inStockOnly = params.get("stoc") === "1";

  const sort = params.get("sort") as SortKey | null;
  next.sort = sort && SORTS.includes(sort) ? sort : "recomandate";
  return next;
}

export function activeCount(f: FilterState): number {
  return (
    (f.q ? 1 : 0) +
    f.sectors.length +
    f.types.length +
    f.baseTypes.length +
    f.viscosities.length +
    f.packagings.length +
    f.standards.length +
    f.oems.length +
    (f.priceMin != null || f.priceMax != null ? 1 : 0) +
    (f.inStockOnly ? 1 : 0)
  );
}
