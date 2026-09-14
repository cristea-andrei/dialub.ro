import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { OfficeMapEmbed } from "@/components/office-map-embed";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "S.C. Dialub Expert S.R.L. — distribuitor autorizat Pakelo Lubricants pentru " +
    "România. Strada Gheorghe Dascălu nr. 4, Dobroești, Ilfov. Tel. 0720.261.111.",
};

const COMPANY = {
  legalName: "S.C. DIALUB EXPERT S.R.L.",
  role: "Distribuitor autorizat Pakelo Lubricants pentru Romania",
  office: "Strada Gheorghe Dascălu, nr. 4, Dobroești, Ilfov, Romania",
  person: "Daniel Tripon",
  phone: "0720.261.111",
  phoneHref: "tel:+40720261111",
  email: "daniel@dialub.ro",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        image="/images/hero/butoi-1.webp"
        breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Contact" }]}
        headline={COMPANY.legalName}
        body={COMPANY.role}
      >
        <dl className="mt-7 space-y-4 text-[15px]">
          <div>
            <dt className="text-xs font-semibold tracking-[0.1em] text-graphite/50 uppercase">
              Punct de lucru
            </dt>
            <dd className="mt-1 text-graphite">{COMPANY.office}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.1em] text-graphite/50 uppercase">
              Persoană de contact
            </dt>
            <dd className="mt-1 text-graphite">{COMPANY.person}</dd>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <dt className="text-xs font-semibold tracking-[0.1em] text-graphite/50 uppercase">
                Telefon
              </dt>
              <dd className="mt-1">
                <a
                  href={COMPANY.phoneHref}
                  className="font-display text-lg font-bold text-ink transition hover:text-pakelo-red"
                >
                  {COMPANY.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.1em] text-graphite/50 uppercase">
                E-mail
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-display text-lg font-bold text-ink transition hover:text-pakelo-red"
                >
                  {COMPANY.email}
                </a>
              </dd>
            </div>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.1em] text-graphite/50 uppercase">
              Program
            </dt>
            <dd className="mt-1 text-graphite">
              {site.contact.hours.join(" · ")}
            </dd>
          </div>
        </dl>
      </PageHero>

      <section className="mx-auto max-w-page px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
              Scrie-ne
            </h2>
            <span aria-hidden className="mt-4 mb-7 block h-[2px] w-20 bg-pakelo-red" />
            <p className="mb-7 max-w-lg text-sm leading-relaxed text-graphite">
              Consultanță tehnică, oferte pentru flote și ateliere, sau cerere de
              parteneriat — scrie-ne și revenim în cel mai scurt timp.
            </p>
            <ContactForm />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
              Birou și depozit
            </h2>
            <span aria-hidden className="mt-4 mb-7 block h-[2px] w-20 bg-pakelo-red" />
            <div className="h-[380px] overflow-hidden border border-black/10 lg:h-[460px]">
              <OfficeMapEmbed />
            </div>
            <p className="mt-4 text-sm text-graphite">
              {site.contact.address.replace("Birou si depozit: ", "")}
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=44.4507,26.1796"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-pakelo-red uppercase transition hover:text-ink"
            >
              Deschide în Google Maps
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
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-fog">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8 lg:px-12">
          <div>
            <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
              Cauți un service în apropiere?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">
              Vezi rețeaua de parteneri Pakelo din România — service-uri auto și
              moto, ateliere de motorsport și magazine de piese.
            </p>
          </div>
          <Link
            href="/distribuitori"
            className="inline-flex items-center bg-pakelo-red px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-ink"
          >
            Vezi partenerii
          </Link>
        </div>
      </section>
    </>
  );
}
