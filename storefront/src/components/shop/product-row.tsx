"use client";

import Image from "next/image";
import Link from "next/link";

import type { ListProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { sectorMeta } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "/images/products/ambalaj-20-de-litri.png";

/** Pakelo's catalogue row: pack shot, spec column, description, price. */
export function ProductRow({ product }: { product: ListProduct }) {
  const href = `/produse/${product.slug}`;
  const sectors = product.sectors.map((s) => sectorMeta[s]?.label ?? s);

  return (
    <article className="group border-b border-black/10 py-8 first:border-t first:border-black/10">
      <div className="grid gap-6 sm:grid-cols-[132px_1fr] lg:grid-cols-[150px_1fr]">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden
          className="relative mx-auto block aspect-square w-32 shrink-0 sm:mx-0 sm:w-full"
        >
          <Image
            src={product.image ?? PLACEHOLDER}
            alt=""
            fill
            sizes="150px"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-display text-lg font-bold tracking-wide text-pakelo-red uppercase lg:text-xl">
              <Link href={href} className="hover:text-ink focus-visible:text-ink">
                <span className="absolute inset-0 hidden" aria-hidden />
                {product.name}
              </Link>
            </h2>
            <span className="text-sm tabular-nums text-graphite/45">{product.sku}</span>
          </div>

          <div className="mt-4 grid gap-5 md:grid-cols-[minmax(170px,230px)_1fr]">
            <dl className="space-y-2 text-sm">
              {sectors.length > 0 && (
                <SpecLine label="Domeniu" value={sectors.join(", ")} />
              )}
              {product.baseType && <SpecLine label="Bază" value={product.baseType} />}
              {product.viscosity && (
                <SpecLine label="Vâscozitate" value={product.viscosity} />
              )}
            </dl>

            <div className="min-w-0">
              {product.summary && (
                <p className="text-sm leading-relaxed text-graphite">{product.summary}</p>
              )}

              {product.standards.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {product.standards.slice(0, 6).map((s) => (
                    <li
                      key={s}
                      className="border border-graphite/20 px-2 py-0.5 text-[11px] font-medium tracking-wide text-graphite/80 uppercase"
                    >
                      {s}
                    </li>
                  ))}
                  {product.standards.length > 6 && (
                    <li className="px-1 py-0.5 text-[11px] text-graphite/45">
                      +{product.standards.length - 6}
                    </li>
                  )}
                </ul>
              )}

              {product.badgeImages.length > 0 && (
                <ul className="mt-3 flex flex-wrap items-center gap-2">
                  {product.badgeImages.map((src) => (
                    <li key={src}>
                      <Image
                        src={src}
                        alt=""
                        width={160}
                        height={90}
                        className="h-auto max-h-11 w-auto max-w-[160px] object-contain"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="font-display text-lg font-bold text-ink">
                {product.variants.length > 1 && (
                  <span className="mr-1 text-xs font-medium text-graphite/50">de la</span>
                )}
                {formatPrice(product.priceMin)}
              </p>
              <p className="text-xs text-graphite/50">
                {product.variants.length > 1
                  ? `${product.variants.length} ambalaje · ${product.variants
                      .map((v) => v.packaging)
                      .join(" · ")}`
                  : product.variants[0]?.packaging}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-xs font-medium",
                  product.inStock ? "text-green-700" : "text-graphite/45",
                )}
              >
                {product.inStock ? "În stoc" : "La comandă"}
              </span>
              <Link
                href={href}
                className="inline-flex items-center gap-2 bg-pakelo-red px-5 py-2.5 text-xs font-semibold tracking-[0.1em] text-white uppercase transition hover:bg-ink"
              >
                Vezi produsul
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-graphite/50">{label}:</dt>
      <dd className="font-semibold text-ink uppercase">{value}</dd>
    </div>
  );
}

/** Compact card for the grid view. */
export function ProductCard({ product }: { product: ListProduct }) {
  const href = `/produse/${product.slug}`;
  return (
    <article className="group relative flex flex-col border border-black/10 p-5 transition hover:border-pakelo-red hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-square w-full">
        <Image
          src={product.image ?? PLACEHOLDER}
          alt=""
          fill
          sizes="(max-width: 768px) 45vw, 260px"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-xs tabular-nums text-graphite/45">{product.sku}</p>
      <h2 className="mt-1 font-display text-[15px] leading-snug font-bold tracking-wide text-pakelo-red uppercase">
        <Link href={href}>
          <span className="absolute inset-0" aria-hidden />
          {product.name}
        </Link>
      </h2>

      <p className="mt-2 text-xs text-graphite/70">
        {[product.baseType, product.viscosity].filter(Boolean).join(" · ")}
      </p>

      <div className="mt-auto pt-4">
        <p className="font-display text-base font-bold text-ink">
          {product.variants.length > 1 && (
            <span className="mr-1 text-xs font-medium text-graphite/50">de la</span>
          )}
          {formatPrice(product.priceMin)}
        </p>
      </div>
    </article>
  );
}
