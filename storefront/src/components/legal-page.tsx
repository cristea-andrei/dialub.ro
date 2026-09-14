import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import type { LegalPage as LegalPageData } from "@/content/legal";
import { legalNav } from "@/lib/site";

export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <>
      <PageHero
        title={page.title}
        image="/images/hero/butoaie.webp"
        breadcrumbs={[{ label: "Acasă", href: "/" }, { label: page.title }]}
        headline={page.title}
        body={
          page.updated
            ? `Termenii și condițiile au fost actualizate ultima dată pe ${page.updated}`
            : "Informații despre datele pe care le colectăm și modul în care le folosim."
        }
      />

      <div className="mx-auto max-w-page px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(220px,260px)] lg:gap-16">
          <article className="legal min-w-0 max-w-3xl">
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
          </article>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-[13px] font-bold tracking-[0.1em] text-pakelo-red uppercase">
              Documente
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={item.href === `/${page.slug}` ? "page" : undefined}
                    className={
                      item.href === `/${page.slug}`
                        ? "font-semibold text-ink"
                        : "text-graphite transition hover:text-pakelo-red"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-mist p-5">
              <p className="text-sm leading-relaxed text-graphite">
                Ai o întrebare despre acest document?
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-pakelo-red uppercase transition hover:text-ink"
              >
                Contactează-ne
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
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
