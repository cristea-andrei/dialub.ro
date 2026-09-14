import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductHero } from "@/components/shop/product-hero";
import { ProductCard } from "@/components/shop/product-row";
import {
  formatPrice,
  getProduct,
  products,
  sectorMeta,
  toListProduct,
} from "@/lib/catalog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produse/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — cod ${product.sku}`,
    description:
      product.summary ??
      `${product.name}, lubrifiant Pakelo disponibil în ${product.variants.length} ambalaje.`,
    openGraph: {
      title: product.name,
      description: product.summary ?? undefined,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/produse/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.sectors.some((s) => product.sectors.includes(s)),
    )
    .sort((a, b) => {
      const score = (p: typeof a) =>
        (p.viscosity === product.viscosity ? 2 : 0) +
        (p.baseTypeSlug === product.baseTypeSlug ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 4)
    .map(toListProduct);

  return (
    <>
      <ProductHero product={product} />

      <section className="mx-auto max-w-page px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-16">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
              Descriere tehnică
            </h2>
            <span aria-hidden className="mt-4 mb-7 block h-[2px] w-20 bg-pakelo-red" />

            {product.notes.length > 0 && (
              <ul className="mb-6 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <li
                    key={note}
                    className="bg-mist px-3 py-1.5 text-xs font-medium text-graphite"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            )}

            <div
              className="datasheet max-w-3xl text-[15px] leading-relaxed text-graphite"
              dangerouslySetInnerHTML={{ __html: product.bodyHtml }}
            />

            {product.madeInItaly && (
              <Image
                src="/images/brand/made-in-italy-strip.png"
                alt="100% Made in Italy"
                width={260}
                height={29}
                className="mt-8 h-7 w-auto"
              />
            )}
          </div>

          <aside className="space-y-8">
            {product.specsHtml && (
              <div>
                <h2 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
                  Specificații și aprobări
                </h2>
                <div
                  className="datasheet specs mt-4 text-[13px] leading-relaxed text-graphite"
                  dangerouslySetInnerHTML={{ __html: product.specsHtml }}
                />
              </div>
            )}

            {product.standards.length > 0 && (
              <div>
                <h2 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
                  Filtrează după standard
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {product.standards.map((s) => (
                    <li key={s}>
                      <Link
                        href={`/produse?spec=${encodeURIComponent(s)}`}
                        className="block border border-graphite/20 px-2 py-1 text-[11px] font-medium tracking-wide text-graphite/80 uppercase transition hover:border-pakelo-red hover:text-pakelo-red"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border border-black/10 p-6">
              <h3 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
                Ambalaje disponibile
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {product.variants.map((v) => (
                  <li
                    key={v.id}
                    className="flex items-baseline justify-between gap-4 border-b border-black/5 pb-2 last:border-0"
                  >
                    <span className="text-graphite">
                      {v.packaging}
                      <span className="ml-2 text-xs text-graphite/45">{v.sku}</span>
                    </span>
                    <span className="font-semibold tabular-nums text-ink">
                      {formatPrice(v.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-mist p-6">
              <h3 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
                Consultanță tehnică
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                Nu ești sigur care este lubrifiantul potrivit? Echipa Dialub te
                ajută să alegi produsul conform specificației cerute de
                producător.
              </p>
              <div className="mt-4 space-y-1 text-sm">
                <a
                  href={site.contact.phoneHref}
                  className="block font-semibold text-ink transition hover:text-pakelo-red"
                >
                  {site.contact.phone}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block text-graphite transition hover:text-pakelo-red"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-black/10 bg-fog">
          <div className="mx-auto max-w-page px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
                Produse similare
              </h2>
              <Link
                href={`/produse?domeniu=${product.sectors[0] ?? ""}`}
                className="text-xs font-semibold tracking-[0.1em] text-pakelo-red uppercase transition hover:text-ink"
              >
                Vezi tot {sectorMeta[product.sectors[0]]?.label ?? "catalogul"} →
              </Link>
            </div>
            <span aria-hidden className="mt-4 mb-8 block h-[2px] w-20 bg-pakelo-red" />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
