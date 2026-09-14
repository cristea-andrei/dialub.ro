import Image from "next/image";
import Link from "next/link";

import { legalNav, mainNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-page px-5 pt-20 pb-12 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[40%_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" aria-label={`${site.name} — pagina principală`}>
              <Image
                src="/images/brand/dialub-white-logo.png"
                alt={`${site.name} logo`}
                width={1600}
                height={920}
                className="h-16 w-auto lg:h-20"
              />
            </Link>
            <p className="mt-6 text-[13px] leading-[22px] tracking-[0.76px] font-light text-chalk">
              {site.description}
            </p>
          </div>

          <FooterColumn title="Viziteaza-ne:">
            <li className="leading-[22px] tracking-[0.76px]">
              {site.contact.address}
            </li>
            <li>
              <a
                href={site.contact.phoneHref}
                className="tracking-[0.76px] transition-colors hover:text-pakelo-red"
              >
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="tracking-[0.76px] transition-colors hover:text-pakelo-red"
              >
                {site.contact.email}
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Program:">
            {site.contact.hours.map((line) => (
              <li key={line} className="tracking-[0.76px]">
                {line}
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Link-uri utile">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tracking-[0.76px] text-white transition-colors hover:text-pakelo-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-[0.5px] text-white/45">
            © {new Date().getFullYear()} {site.name}. Toate drepturile rezervate.
          </p>

          <nav aria-label="Meniu secundar">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={"external" in item && item.external ? "_blank" : undefined}
                    rel={
                      "external" in item && item.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-xs tracking-[0.12em] text-white/55 uppercase transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pakelo Romania pe Facebook"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-pakelo-red"
          >
            <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden className="h-4 w-4">
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-light tracking-[0.87px] text-white uppercase">
        {title}
      </h2>
      <ul className="mt-5 space-y-2 text-[13px] leading-[22px] font-light text-chalk">
        {children}
      </ul>
    </div>
  );
}
