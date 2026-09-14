"use client";

import { useState } from "react";

import { formatPrice } from "@/lib/catalog";

/**
 * Dual-handle price filter. Two overlaid range inputs keep it keyboard- and
 * screen-reader-accessible; the coloured bar between them is decoration.
 */
export function PriceRange({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number | null, number | null];
  onChange: (next: [number | null, number | null]) => void;
}) {
  const [lo, setLo] = useState(value[0] ?? min);
  const [hi, setHi] = useState(value[1] ?? max);

  // follow external resets (e.g. "clear all") without an effect round-trip
  const [seen, setSeen] = useState(value);
  if (seen[0] !== value[0] || seen[1] !== value[1]) {
    setSeen(value);
    setLo(value[0] ?? min);
    setHi(value[1] ?? max);
  }

  const commit = (nextLo: number, nextHi: number) => {
    onChange([nextLo <= min ? null : nextLo, nextHi >= max ? null : nextHi]);
  };

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <section className="border-b border-black/10 py-6">
      <h3 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
        Preț
      </h3>

      <div className="mt-5">
        <div className="relative h-5">
          <span
            aria-hidden
            className="absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2 rounded-full bg-graphite/15"
          />
          <span
            aria-hidden
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-pakelo-red"
            style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={5}
            value={lo}
            aria-label="Preț minim"
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), hi - 5);
              setLo(v);
            }}
            onPointerUp={() => commit(lo, hi)}
            onKeyUp={() => commit(lo, hi)}
            className="range-thumb absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={5}
            value={hi}
            aria-label="Preț maxim"
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), lo + 5);
              setHi(v);
            }}
            onPointerUp={() => commit(lo, hi)}
            onKeyUp={() => commit(lo, hi)}
            className="range-thumb absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-graphite">
          <span className="tabular-nums">{formatPrice(lo)}</span>
          <span className="tabular-nums">
            {formatPrice(hi)}
            {hi >= max && "+"}
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-graphite/50">
          Prețul se aplică fiecărui ambalaj în parte.
        </p>
      </div>

      <style>{`
        .range-thumb { pointer-events: none; }
        .range-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          height: 18px; width: 18px;
          border-radius: 9999px;
          background: #fff;
          border: 3px solid var(--color-pakelo-red);
          box-shadow: 0 1px 6px rgba(0,0,0,.25);
          cursor: grab;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 18px; width: 18px;
          border-radius: 9999px;
          background: #fff;
          border: 3px solid var(--color-pakelo-red);
          box-shadow: 0 1px 6px rgba(0,0,0,.25);
          cursor: grab;
        }
        .range-thumb:focus-visible::-webkit-slider-thumb { outline: 2px solid var(--color-ink); outline-offset: 2px; }
        .range-thumb:focus-visible::-moz-range-thumb { outline: 2px solid var(--color-ink); outline-offset: 2px; }
      `}</style>
    </section>
  );
}
