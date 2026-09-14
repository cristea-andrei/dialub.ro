"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FilterRail } from "@/components/shop/filter-rail";
import { ProductCard, ProductRow } from "@/components/shop/product-row";
import type { Facets, ListProduct } from "@/lib/catalog";
import { sectorMeta } from "@/lib/catalog";
import {
  activeCount,
  applyFilters,
  emptyFilters,
  filtersFromParams,
  filtersToParams,
  type FacetKey,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import { cn } from "@/lib/utils";

const SORT_LABELS: Record<SortKey, string> = {
  recomandate: "Recomandate",
  "pret-asc": "Preț crescător",
  "pret-desc": "Preț descrescător",
  nume: "Nume A–Z",
};

const PAGE_SIZE = 12;

export function ShopBrowser({
  products,
  facets,
  lockedSector,
}: {
  products: ListProduct[];
  facets: Facets;
  /** Set on a category page — that sector is implied and not shown as a filter. */
  lockedSector?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() =>
    filtersFromParams(new URLSearchParams(searchParams.toString()), facets),
  );
  const [query, setQuery] = useState(filters.q);
  const [view, setView] = useState<"list" | "grid">("list");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  // debounce the search box into the filter state
  useEffect(() => {
    const id = setTimeout(() => {
      setFilters((f) => (f.q === query ? f : { ...f, q: query }));
    }, 180);
    return () => clearTimeout(id);
  }, [query]);

  // mirror the filters into the URL so a filtered view can be shared
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const params = filtersToParams(filters);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setPage(1);
  }, [filters, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const results = useMemo(() => applyFilters(products, filters), [products, filters]);
  const visible = results.slice(0, page * PAGE_SIZE);
  const active = activeCount(filters);

  const toggle = useCallback((key: FacetKey, value: string) => {
    setFilters((f) => {
      const current = f[key];
      return {
        ...f,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }, []);

  const patch = useCallback((p: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...p }));
  }, []);

  const clearAll = useCallback(() => {
    setQuery("");
    setFilters((f) => ({ ...emptyFilters, sort: f.sort }));
  }, []);

  const chips = useMemo(() => buildChips(filters, facets), [filters, facets]);

  return (
    <div className="mx-auto max-w-page px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="lg:grid lg:grid-cols-[288px_1fr] lg:gap-12 xl:grid-cols-[320px_1fr]">
        {/* ---------------- sidebar ---------------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-3">
            <SearchBox value={query} onChange={setQuery} />
            <FilterRail
              facets={facets}
              filters={filters}
              all={products}
              onToggle={toggle}
              onPatch={patch}
            />
          </div>
        </aside>

        {/* ---------------- results ---------------- */}
        <div ref={resultsRef} className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-4">
            <div>
              <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
                Produse
              </h2>
              <p className="mt-1 text-sm text-graphite/60" aria-live="polite">
                {results.length === products.length
                  ? `${products.length} produse în catalog`
                  : `${results.length} din ${products.length} produse`}
                {lockedSector && ` · ${sectorMeta[lockedSector]?.label ?? lockedSector}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 border border-graphite/25 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-ink uppercase transition hover:border-pakelo-red hover:text-pakelo-red lg:hidden"
              >
                <FilterIcon />
                Filtre
                {active > 0 && (
                  <span className="rounded-full bg-pakelo-red px-1.5 py-0.5 text-[10px] text-white">
                    {active}
                  </span>
                )}
              </button>

              <label className="sr-only" htmlFor="sort">
                Sortează
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(e) => patch({ sort: e.target.value as SortKey })}
                className="border border-graphite/25 bg-white px-3 py-2 text-xs font-medium text-ink transition hover:border-pakelo-red focus:border-pakelo-red focus:outline-none"
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <option key={key} value={key}>
                    {SORT_LABELS[key]}
                  </option>
                ))}
              </select>

              <div className="hidden items-center border border-graphite/25 sm:flex">
                <ViewButton
                  active={view === "list"}
                  onClick={() => setView("list")}
                  label="Vizualizare listă"
                >
                  <ListIcon />
                </ViewButton>
                <ViewButton
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  label="Vizualizare grilă"
                >
                  <GridIcon />
                </ViewButton>
              </div>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 py-4">
              {chips.map((chip) => (
                <button
                  key={`${chip.key}:${chip.value}`}
                  type="button"
                  onClick={() => {
                    if (chip.key === "q") {
                      setQuery("");
                      patch({ q: "" });
                    } else if (chip.key === "price") {
                      patch({ priceMin: null, priceMax: null });
                    } else if (chip.key === "stock") {
                      patch({ inStockOnly: false });
                    } else {
                      toggle(chip.key as FacetKey, chip.value);
                    }
                  }}
                  className="group inline-flex items-center gap-1.5 bg-mist px-3 py-1.5 text-xs text-ink transition hover:bg-pakelo-red hover:text-white"
                >
                  <span className="text-graphite/50 group-hover:text-white/70">
                    {chip.group}:
                  </span>
                  {chip.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden
                    className="h-3 w-3"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span className="sr-only">Elimină filtrul</span>
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="ml-1 text-xs font-medium text-pakelo-red underline underline-offset-2 hover:text-ink"
              >
                Șterge tot
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : view === "list" ? (
            <div>
              {visible.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {visible.length < results.length && (
            <div className="pt-10 text-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-2 border border-ink px-8 py-3 text-xs font-semibold tracking-[0.12em] text-ink uppercase transition hover:bg-ink hover:text-white"
              >
                Încarcă încă {Math.min(PAGE_SIZE, results.length - visible.length)}
              </button>
              <p className="mt-3 text-xs text-graphite/50">
                {visible.length} din {results.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- mobile drawer ---------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Închide filtrele"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h2 className="font-display text-sm font-bold tracking-[0.1em] text-ink uppercase">
                Filtre
              </h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Închide filtrele"
                className="grid h-9 w-9 place-items-center text-graphite transition hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <SearchBox value={query} onChange={setQuery} />
              <FilterRail
                facets={facets}
                filters={filters}
                all={products}
                onToggle={toggle}
                onPatch={patch}
              />
            </div>

            <div className="flex items-center gap-3 border-t border-black/10 px-5 py-4">
              <button
                type="button"
                onClick={clearAll}
                className="flex-1 border border-graphite/25 py-3 text-xs font-semibold tracking-[0.08em] text-ink uppercase"
              >
                Șterge tot
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex-[2] bg-pakelo-red py-3 text-xs font-semibold tracking-[0.08em] text-white uppercase"
              >
                Arată {results.length} produse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="pb-6">
      <h3 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
        Caută
      </h3>
      <label className="mt-4 flex items-center gap-2 border-b border-black/15 pb-2 focus-within:border-pakelo-red">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
          className="h-4 w-4 shrink-0 text-graphite/40"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Caută după cod, nume sau specificație</span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cod, nume sau specificație"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-graphite/40"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Golește căutarea"
            className="text-graphite/40 transition hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
              className="h-4 w-4"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </label>
      <p className="mt-2 text-[11px] text-graphite/45">
        Caută și în aprobări — încearcă „VW 504 00” sau „MB 229.51”.
      </p>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-lg font-bold text-ink uppercase">Niciun rezultat</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-graphite">
        Nu am găsit produse pentru filtrele selectate. Încearcă să elimini câteva
        criterii sau caută direct după codul produsului.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center bg-pakelo-red px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-white uppercase transition hover:bg-ink"
      >
        Șterge filtrele
      </button>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "grid h-[34px] w-9 place-items-center transition",
        active ? "bg-ink text-white" : "text-graphite/50 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  "aria-hidden": true,
  className: "h-4 w-4",
} as const;

const ListIcon = () => (
  <svg {...iconProps}>
    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
  </svg>
);

const GridIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="4" width="7" height="7" />
    <rect x="13" y="4" width="7" height="7" />
    <rect x="4" y="13" width="7" height="7" />
    <rect x="13" y="13" width="7" height="7" />
  </svg>
);

const FilterIcon = () => (
  <svg {...iconProps} className="h-3.5 w-3.5">
    <path d="M3 5h18M6 12h12M10 19h4" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */

type Chip = { key: string; value: string; group: string; label: string };

function buildChips(f: FilterState, facets: Facets): Chip[] {
  const chips: Chip[] = [];
  const name = (terms: { slug: string; name: string }[], slug: string) =>
    terms.find((t) => t.slug === slug)?.name ?? slug;

  if (f.q) chips.push({ key: "q", value: f.q, group: "Căutare", label: f.q });
  f.sectors.forEach((v) =>
    chips.push({ key: "sectors", value: v, group: "Domeniu", label: name(facets.sectors, v) }),
  );
  f.types.forEach((v) =>
    chips.push({ key: "types", value: v, group: "Tip", label: name(facets.subcategories, v) }),
  );
  f.baseTypes.forEach((v) =>
    chips.push({ key: "baseTypes", value: v, group: "Bază", label: name(facets.baseTypes, v) }),
  );
  f.viscosities.forEach((v) =>
    chips.push({
      key: "viscosities",
      value: v,
      group: "Vâscozitate",
      label: name(facets.viscosities, v),
    }),
  );
  f.packagings.forEach((v) =>
    chips.push({
      key: "packagings",
      value: v,
      group: "Ambalaj",
      label: name(facets.packagings, v),
    }),
  );
  f.standards.forEach((v) =>
    chips.push({ key: "standards", value: v, group: "Spec", label: v }),
  );
  f.oems.forEach((v) => chips.push({ key: "oems", value: v, group: "OEM", label: v }));

  if (f.priceMin != null || f.priceMax != null) {
    chips.push({
      key: "price",
      value: "price",
      group: "Preț",
      label: `${f.priceMin ?? facets.price.min} – ${f.priceMax ?? facets.price.max} lei`,
    });
  }
  if (f.inStockOnly) {
    chips.push({ key: "stock", value: "stock", group: "Stoc", label: "Doar în stoc" });
  }
  return chips;
}
