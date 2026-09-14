"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Product } from "@/lib/catalog";
import { formatPrice, sectorMeta } from "@/lib/catalog";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Pakelo's product header: the can floating on a red diagonal band, the
 * datasheet summary on the right. The package selector drives both the price
 * and the pack shot, so the whole block is one client component.
 */
export function ProductHero({ product }: { product: Product }) {
  const [selectedId, setSelectedId] = useState(product.variants[0]?.id);
  const selected =
    product.variants.find((v) => v.id === selectedId) ?? product.variants[0];

  const image = selected?.image ?? product.image;
  const application = product.sectors
    .map((s) => sectorMeta[s]?.label ?? s)
    .join(" · ");

  const subject = `Cerere ofertă: ${product.name} — ${selected?.packaging ?? ""}`;
  const body = [
    "Bună ziua,",
    "",
    "Aș dori o ofertă pentru:",
    `• Produs: ${product.name}`,
    `• Ambalaj: ${selected?.packaging ?? "-"}`,
    `• Cod: ${selected?.sku ?? product.sku}`,
    "• Cantitate: ",
    "",
    "Mulțumesc,",
  ].join("\n");

  return (
    <section className="relative isolate bg-white pt-20 lg:pt-28">
      <div className="grid lg:grid-cols-2 lg:items-start">
        {/* ---------- red band + pack shot ---------- */}
        <div className="relative min-h-[380px] overflow-hidden bg-pakelo-red sm:min-h-[460px] lg:h-[660px] lg:min-h-0">
          <Image
            src="/images/hero/pakelo-racecars.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-45"
          />
          <div aria-hidden className="absolute inset-0 bg-pakelo-red/70 mix-blend-multiply" />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-40 bg-white lg:block"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />

          <div className="relative flex h-full flex-col justify-between gap-8 p-6 sm:p-10 lg:p-12">
            <div />
            <div className="pointer-events-none absolute inset-0 grid place-items-center p-10 lg:pl-24">
              {image && (
                <Image
                  key={image}
                  src={image}
                  alt={`${product.name} — ambalaj ${selected?.packaging ?? ""}`}
                  width={640}
                  height={640}
                  priority
                  className="max-h-[70%] w-auto object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.45)]"
                />
              )}
            </div>

            <div className="relative max-w-xs">
              {application && (
                <>
                  <p className="font-display text-2xl font-semibold tracking-wide text-white uppercase">
                    Aplicație
                  </p>
                  <span aria-hidden className="mt-3 mb-3 block h-px w-full bg-white/60" />
                  <p className="text-sm font-bold tracking-wide text-white uppercase">
                    {application}
                  </p>
                </>
              )}

              <nav aria-label="Breadcrumb" className="mt-6">
                <ol className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                  <li>
                    <Link href="/produse" className="transition hover:text-white">
                      Magazin
                    </Link>
                  </li>
                  <li aria-hidden className="text-white/40">
                    ›
                  </li>
                  <li className="font-medium text-white" aria-current="page">
                    {product.name}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* ---------- datasheet summary ---------- */}
        <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <p className="text-sm tabular-nums text-graphite/45">{product.sku}</p>
          <h1 className="mt-2 font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-pakelo-red uppercase lg:text-[40px]">
            {product.name}
          </h1>

          {product.badgeImages.length > 0 && (
            <ul className="mt-5 flex flex-wrap items-center gap-3">
              {product.badgeImages.map((src) => (
                <li key={src}>
                  <Image
                    src={src}
                    alt=""
                    width={220}
                    height={120}
                    className="h-auto max-h-16 w-auto max-w-[220px] object-contain"
                  />
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-6 space-y-4 text-[15px]">
            {product.baseType && (
              <Field label="Bază">
                <span className="uppercase">{product.baseType}</span>
              </Field>
            )}
            {product.viscosity && (
              <Field label="Vâscozitate">
                <span className="uppercase">{product.viscosity}</span>
              </Field>
            )}
            {product.summary && <Field label="Descriere">{product.summary}</Field>}
            {product.notes.length > 0 && (
              <Field label="Detalii">{product.notes.join(" · ")}</Field>
            )}
            {product.recommended.length > 0 && (
              <Field label="Recomandări Pakelo">{product.recommended.join(", ")}</Field>
            )}
          </dl>

          <p className="mt-6 text-sm font-semibold text-ink">
            {product.variants.map((v) => v.packaging).join(" · ")}
          </p>

          {/* ---------- package selector ---------- */}
          <div className="mt-8 border-t border-black/10 pt-6">
            {product.variants.length > 1 && (
              <fieldset>
                <legend className="text-xs font-semibold tracking-[0.1em] text-graphite/60 uppercase">
                  Alege ambalajul
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <label
                      key={v.id}
                      className={cn(
                        "cursor-pointer border px-4 py-2 text-sm font-medium transition",
                        v.id === selected?.id
                          ? "border-pakelo-red bg-pakelo-red text-white"
                          : "border-graphite/25 text-graphite hover:border-pakelo-red hover:text-pakelo-red",
                      )}
                    >
                      <input
                        type="radio"
                        name="packaging"
                        checked={v.id === selected?.id}
                        onChange={() => setSelectedId(v.id)}
                        className="sr-only"
                      />
                      {v.packaging}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-3xl font-extrabold text-ink">
                  {formatPrice(selected?.price)}
                </p>
                <p className="mt-1 text-xs text-graphite/55">
                  Cod {selected?.sku || product.sku}
                  {selected?.packaging ? ` · ${selected.packaging}` : ""} · TVA inclus
                </p>
              </div>
              <p
                className={cn(
                  "text-sm font-medium",
                  selected?.inStock ? "text-green-700" : "text-graphite/50",
                )}
              >
                {selected?.inStock ? "În stoc" : "La comandă"}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
                  subject,
                )}&body=${encodeURIComponent(body)}`}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-pakelo-red px-7 py-3.5 text-sm font-semibold tracking-[0.1em] text-white uppercase transition hover:bg-ink"
              >
                Cere ofertă
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-4 w-4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center justify-center border border-ink px-7 py-3.5 text-sm font-semibold tracking-[0.1em] text-ink uppercase transition hover:bg-ink hover:text-white"
              >
                {site.contact.phone}
              </a>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-graphite/50">
              Coșul și plata online se activează odată cu backend-ul de comerț.
              Până atunci preluăm comenzile telefonic sau pe e-mail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-semibold text-ink">{label}:</dt>
      <dd className="mt-0.5 leading-relaxed text-graphite">{children}</dd>
    </div>
  );
}
