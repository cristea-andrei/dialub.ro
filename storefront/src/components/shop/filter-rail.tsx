"use client";

import { useMemo } from "react";

import { FilterGroup, type Option } from "@/components/shop/filter-group";
import { PriceRange } from "@/components/shop/price-range";
import type { Facets, ListProduct } from "@/lib/catalog";
import { facetCounts, type FacetKey, type FilterState } from "@/lib/filters";

export function FilterRail({
  facets,
  filters,
  all,
  onToggle,
  onPatch,
}: {
  facets: Facets;
  filters: FilterState;
  all: ListProduct[];
  onToggle: (key: FacetKey, value: string) => void;
  onPatch: (patch: Partial<FilterState>) => void;
}) {
  const counts = useMemo(
    () => ({
      sectors: facetCounts(all, filters, "sectors"),
      types: facetCounts(all, filters, "types"),
      baseTypes: facetCounts(all, filters, "baseTypes"),
      viscosities: facetCounts(all, filters, "viscosities"),
      packagings: facetCounts(all, filters, "packagings"),
      standards: facetCounts(all, filters, "standards"),
      oems: facetCounts(all, filters, "oems"),
    }),
    [all, filters],
  );

  const opts = (
    terms: { slug: string; name: string }[],
    map: Map<string, number>,
    hint?: (slug: string) => string | undefined,
  ): Option[] =>
    terms.map((t) => ({
      value: t.slug,
      label: t.name,
      count: map.get(t.slug) ?? 0,
      hint: hint?.(t.slug),
    }));

  // two "Lichid de frână" subcategories exist — one under auto, one under moto
  const typeHint = (slug: string) => {
    const term = facets.subcategories.find((t) => t.slug === slug);
    const duplicated =
      term &&
      facets.subcategories.filter((t) => t.name === term.name).length > 1 &&
      term.parent;
    return duplicated ? `· ${term.parent}` : undefined;
  };

  return (
    <div className="divide-y-0">
      <FilterGroup
        title="Domeniu"
        options={opts(facets.sectors, counts.sectors)}
        selected={filters.sectors}
        onToggle={(v) => onToggle("sectors", v)}
        collapseAfter={9}
      />

      <FilterGroup
        title="Tip produs"
        options={opts(facets.subcategories, counts.types, typeHint)}
        selected={filters.types}
        onToggle={(v) => onToggle("types", v)}
        collapseAfter={6}
      />

      <FilterGroup
        title="Vâscozitate SAE"
        options={opts(facets.viscosities, counts.viscosities)}
        selected={filters.viscosities}
        onToggle={(v) => onToggle("viscosities", v)}
        collapseAfter={8}
        searchable
      />

      <FilterGroup
        title="Bază ulei"
        options={opts(facets.baseTypes, counts.baseTypes)}
        selected={filters.baseTypes}
        onToggle={(v) => onToggle("baseTypes", v)}
      />

      <FilterGroup
        title="Specificații"
        options={facets.standards.map((s) => ({
          value: s.value,
          label: s.value,
          count: counts.standards.get(s.value) ?? 0,
        }))}
        selected={filters.standards}
        onToggle={(v) => onToggle("standards", v)}
        collapseAfter={6}
        searchable
      />

      <FilterGroup
        title="Aprobări OEM"
        options={facets.oems.map((s) => ({
          value: s.value,
          label: s.value,
          count: counts.oems.get(s.value) ?? 0,
        }))}
        selected={filters.oems}
        onToggle={(v) => onToggle("oems", v)}
        collapseAfter={8}
        defaultOpen={filters.oems.length > 0}
        searchable
      />

      <FilterGroup
        title="Ambalaj"
        options={opts(facets.packagings, counts.packagings)}
        selected={filters.packagings}
        onToggle={(v) => onToggle("packagings", v)}
        collapseAfter={12}
        defaultOpen={filters.packagings.length > 0}
      />

      <PriceRange
        min={Math.floor(facets.price.min)}
        max={Math.ceil(facets.price.max)}
        value={[filters.priceMin, filters.priceMax]}
        onChange={([priceMin, priceMax]) => onPatch({ priceMin, priceMax })}
      />

      <section className="py-6">
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <span className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
            Doar în stoc
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={filters.inStockOnly}
            aria-label="Doar produse în stoc"
            onClick={() => onPatch({ inStockOnly: !filters.inStockOnly })}
            className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
              filters.inStockOnly ? "bg-pakelo-red" : "bg-graphite/25"
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                filters.inStockOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </label>
      </section>
    </div>
  );
}
