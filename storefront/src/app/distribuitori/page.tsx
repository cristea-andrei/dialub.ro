import type { Metadata } from "next";
import Link from "next/link";

import { DealerFinder } from "@/components/dealer-finder";
import { PageHero } from "@/components/page-hero";
import { dealerCities, dealers } from "@/content/dealers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parteneri și distribuitori Pakelo",
  description:
    `Cei ${dealers.length} parteneri Pakelo din România — service-uri, magazine și ` +
    `ateliere din ${dealerCities.slice(0, 4).join(", ")} și alte localități. ` +
    "Caută după oraș sau nume și vezi datele de contact.",
};

export default function DealersPage() {
  return (
    <>
      <PageHero
        title="Parteneri în România"
        image="/images/about/dealeri.webp"
        breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Parteneri" }]}
        headline="Rețeaua Pakelo din România"
        body={
          `Lubrifianții Pakelo ajung la tine prin ${dealers.length} parteneri selectați — ` +
          "service-uri auto și moto, ateliere de motorsport și magazine de piese. " +
          "Caută după oraș, nume sau adresă, apoi sună direct partenerul cel mai apropiat."
        }
      >
        <p className="mt-6 text-sm text-graphite/70">
          Vrei să devii partener Pakelo?{" "}
          <Link
            href="/contact"
            className="font-semibold text-pakelo-red underline underline-offset-2 hover:text-ink"
          >
            Scrie-ne
          </Link>{" "}
          sau sună la{" "}
          <a
            href={site.contact.phoneHref}
            className="font-semibold text-ink hover:text-pakelo-red"
          >
            {site.contact.phone}
          </a>
          .
        </p>
      </PageHero>

      <DealerFinder />

      <section className="border-t border-black/10 bg-fog">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8 lg:px-12">
          <div>
            <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
              Nu găsești un partener în zona ta?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">
              Livrăm din depozitul din Dobroești în toată țara. Comandă direct din
              magazinul online sau contactează-ne pentru o ofertă.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produse"
              className="inline-flex items-center bg-pakelo-red px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-ink"
            >
              Magazin online
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-ink px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-ink uppercase transition hover:bg-ink hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
