import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { PageHero } from "@/components/page-hero";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { facets, listProducts, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Magazin — lubrifianți Pakelo",
  description:
    `Catalogul complet Pakelo Lubricants în România: ${products.length} produse pentru auto, moto, ` +
    "agricultură, construcții, heavy-duty, industrie, industria alimentară și ambarcațiuni. " +
    "Filtrează după vâscozitate, bază, ambalaj, specificații ACEA/API și aprobări OEM.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="Magazinul Pakelo"
        image="/images/hero/butoaie.webp"
        breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Magazin" }]}
        headline="Gama completă de lubrifianți profesionali Pakelo"
        body={
          `Toate cele ${products.length} produse Pakelo disponibile în România, de la uleiuri de motor ` +
          "full sintetice până la lubrifianți industriali și produse certificate pentru industria " +
          "alimentară. Filtrează după domeniu, vâscozitate, bază, ambalaj sau direct după " +
          "specificația cerută de producătorul vehiculului."
        }
      />

      <FindYourOil />

      <Suspense fallback={<BrowserSkeleton />}>
        <ShopBrowser products={listProducts} facets={facets} />
      </Suspense>
    </>
  );
}

/**
 * The billboard and the "Find your oil" cross-link that sit above the grid on
 * the current shop page.
 */
function FindYourOil() {
  return (
    <>
      <Link href="https://pakelo.com/en/find-your-oil" target="_blank" rel="noopener noreferrer" className="group block overflow-hidden">
        <Image
          src="/images/brand/billboard.png"
          alt="Pakelo Lubricants — Born to Race"
          width={2560}
          height={185}
          sizes="100vw"
          className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
        />
      </Link>

      <section className="border-b border-black/10 bg-fog">
        <div className="mx-auto flex max-w-page flex-wrap items-center gap-6 px-5 py-8 sm:px-8 lg:px-12">
          <Link
            href="https://pakelo.com/en/find-your-oil"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 bg-pakelo-red px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-ink"
          >
            Find your oil
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </Link>
          <p className="max-w-2xl text-sm leading-relaxed text-graphite">
            Pentru o căutare exactă a uleiurilor potrivite in funcție de mașină, vă
            rugăm apăsați butonul alăturat. Veți fi redirecționat pe pagina oficiala
            Pakelo Lubricants.
          </p>
        </div>
      </section>
    </>
  );
}

function BrowserSkeleton() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="lg:grid lg:grid-cols-[288px_1fr] lg:gap-12 xl:grid-cols-[320px_1fr]">
        <div className="hidden space-y-6 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse bg-mist" />
          ))}
        </div>
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse bg-mist" />
          ))}
        </div>
      </div>
    </div>
  );
}
