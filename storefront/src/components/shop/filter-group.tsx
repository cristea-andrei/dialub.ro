"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type Option = { value: string; label: string; count: number; hint?: string };

/**
 * One collapsible facet block: red heading + rule, then checkbox rows with
 * live counts. Long lists get a search box and a "show all" expander.
 */
export function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
  searchable = false,
  collapseAfter = 8,
  emptyLabel = "Nicio opțiune disponibilă",
}: {
  title: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  defaultOpen?: boolean;
  searchable?: boolean;
  collapseAfter?: number;
  emptyLabel?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
    // keep ticked options visible even when their count drops to zero
    return list.filter((o) => o.count > 0 || selected.includes(o.value));
  }, [options, query, selected]);

  const visible = expanded || query ? filtered : filtered.slice(0, collapseAfter);
  const hiddenCount = filtered.length - visible.length;
  const chosen = selected.length;

  return (
    <section className="border-b border-black/10 py-6 first:pt-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <span className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
            {title}
            {chosen > 0 && (
              <span className="ml-2 rounded-full bg-pakelo-red px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {chosen}
              </span>
            )}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className={cn(
              "h-4 w-4 shrink-0 text-graphite/40 transition-transform duration-200",
              open && "rotate-180",
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>

      {open && (
        <div className="mt-4">
          {searchable && options.length > collapseAfter && (
            <label className="mb-3 flex items-center gap-2 border-b border-black/10 pb-2">
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
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Caută în ${title.toLowerCase()}`}
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-graphite/40"
              />
            </label>
          )}

          {visible.length === 0 ? (
            <p className="text-xs text-graphite/50">{emptyLabel}</p>
          ) : (
            <ul className="space-y-1.5">
              {visible.map((option) => {
                const isChecked = selected.includes(option.value);
                return (
                  <li key={option.value}>
                    <label
                      className={cn(
                        "group flex cursor-pointer items-center gap-2.5 py-0.5 text-sm transition-colors",
                        option.count === 0 && !isChecked && "opacity-40",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-[18px] w-[18px] shrink-0 place-items-center border transition-colors",
                          isChecked
                            ? "border-pakelo-red bg-pakelo-red"
                            : "border-graphite/30 bg-white group-hover:border-pakelo-red",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggle(option.value)}
                          className="sr-only"
                        />
                        {isChecked && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className="h-3 w-3"
                          >
                            <path d="m4 12.5 5.5 5.5L20 6" />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1 leading-snug text-graphite group-hover:text-ink">
                        {option.label}
                        {option.hint && (
                          <span className="ml-1 text-xs text-graphite/45">{option.hint}</span>
                        )}
                      </span>
                      <span className="shrink-0 text-xs tabular-nums text-graphite/45">
                        {option.count}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-3 w-full bg-mist py-1.5 text-center text-xs font-medium text-graphite transition hover:bg-graphite hover:text-white"
            >
              + încă {hiddenCount}
            </button>
          )}
          {expanded && !query && filtered.length > collapseAfter && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="mt-2 w-full py-1 text-center text-xs text-graphite/50 transition hover:text-ink"
            >
              Arată mai puține
            </button>
          )}
        </div>
      )}
    </section>
  );
}
