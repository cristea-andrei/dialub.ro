"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { dealerCities, dealers, telHref, type Dealer } from "@/content/dealers";
import { cn } from "@/lib/utils";

const DealerMap = dynamic(() => import("@/components/dealer-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-mist" />,
});

function fold(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function DealerFinder() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  const results = useMemo(() => {
    const q = fold(query.trim());
    return dealers.filter((d) => {
      if (city && d.city !== city) return false;
      if (!q) return true;
      return fold(
        [d.name, d.address, d.city, d.contact ?? "", d.phone ?? ""].join(" "),
      ).includes(q);
    });
  }, [query, city]);

  return (
    <section className="mx-auto max-w-page px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-10">
        {/* ---------------- list ---------------- */}
        <div className="min-w-0">
          <label className="flex items-center gap-2 border-b border-black/15 pb-2 focus-within:border-pakelo-red">
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
            <span className="sr-only">Caută un partener după nume, oraș sau adresă</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nume, oraș sau adresă"
              className="w-full bg-transparent py-1 text-sm text-ink outline-none placeholder:text-graphite/40"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <CityChip active={city === null} onClick={() => setCity(null)}>
              Toate ({dealers.length})
            </CityChip>
            {dealerCities.map((c) => (
              <CityChip key={c} active={city === c} onClick={() => setCity(c)}>
                {c} ({dealers.filter((d) => d.city === c).length})
              </CityChip>
            ))}
          </div>

          <p className="mt-5 text-sm text-graphite/60" aria-live="polite">
            {results.length === dealers.length
              ? `${dealers.length} parteneri`
              : `${results.length} din ${dealers.length} parteneri`}
          </p>

          <ul className="mt-3 max-h-[560px] space-y-0 overflow-y-auto pr-1">
            {results.map((dealer) => (
              <li key={dealer.id}>
                <DealerCard
                  dealer={dealer}
                  active={dealer.id === activeId}
                  onSelect={() => setActiveId(dealer.id)}
                />
              </li>
            ))}
            {results.length === 0 && (
              <li className="py-12 text-center">
                <p className="text-sm text-graphite">
                  Niciun partener pentru această căutare.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCity(null);
                  }}
                  className="mt-3 text-xs font-semibold tracking-[0.1em] text-pakelo-red uppercase underline underline-offset-2"
                >
                  Șterge filtrele
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* ---------------- map ---------------- */}
        <div className="h-[420px] overflow-hidden border border-black/10 lg:sticky lg:top-32 lg:h-[620px]">
          <DealerMap dealers={results} activeId={activeId} onSelect={setActiveId} />
        </div>
      </div>
    </section>
  );
}

function CityChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-pakelo-red bg-pakelo-red text-white"
          : "border-graphite/20 text-graphite hover:border-pakelo-red hover:text-pakelo-red",
      )}
    >
      {children}
    </button>
  );
}

function DealerCard({
  dealer,
  active,
  onSelect,
}: {
  dealer: Dealer;
  active: boolean;
  onSelect: () => void;
}) {
  const maps = `https://www.google.com/maps/search/?api=1&query=${dealer.lat},${dealer.lng}`;

  return (
    <div
      className={cn(
        "border-b border-black/10 py-5 transition-colors",
        active && "bg-mist/60",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left"
        aria-pressed={active}
      >
        <h3 className="font-display text-base font-bold tracking-wide text-pakelo-red uppercase">
          {dealer.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-graphite">{dealer.address}</p>
      </button>

      <dl className="mt-3 space-y-1 text-sm">
        {dealer.contact && (
          <div className="flex gap-2">
            <dt className="text-graphite/50">Persoană de contact:</dt>
            <dd className="font-medium text-ink">{dealer.contact}</dd>
          </div>
        )}
        {dealer.phone && (
          <div className="flex gap-2">
            <dt className="text-graphite/50">Telefon:</dt>
            <dd>
              <a
                href={telHref(dealer.phone)}
                className="font-medium text-ink transition hover:text-pakelo-red"
              >
                {dealer.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold tracking-[0.08em] uppercase">
        <a
          href={maps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-pakelo-red transition hover:text-ink"
        >
          Vezi pe hartă
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="h-3 w-3"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
        {dealer.website && (
          <a
            href={dealer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-graphite transition hover:text-pakelo-red"
          >
            Website
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-3 w-3"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
