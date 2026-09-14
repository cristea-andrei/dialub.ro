import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";
import { aboutIntro, tailorMade } from "@/content/about";

export const metadata: Metadata = {
  title: "Despre Pakelo",
  description:
    "Excelență în lubrifiere din 1930, fabricat 100% în Italia. Istoria Pakelo, " +
    "de la magazinul familiei Polacco până la Pakelo Motor Oil S.p.A., și serviciul " +
    "de lubrifianți personalizați.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Despre Pakelo"
        image="/images/about/pakelo-line.jpg"
        breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Despre Pakelo" }]}
        headline={`${aboutIntro.eyebrow} ${aboutIntro.heading}`}
        body="Pakelo produce peste 1000 de tipuri de lubrifianți într-o singură fabrică din Italia și îi exportă în peste 50 de țări. Aproape un secol de formulare, cercetare și obsesie pentru detaliu."
      />

      <Timeline />

      <Excellence />
      <TailorMade />
      <AboutCta />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Excelență în lubrifiere din 1930
 * ------------------------------------------------------------------ */
function Excellence() {
  return (
    <section className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={aboutIntro.image}
              alt="Bidon Pakelo Lubricants pe linia de îmbuteliere din fabrica din Italia"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden
            className="absolute -bottom-4 -left-4 -z-10 hidden h-32 w-32 bg-pakelo-red lg:block"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display text-base font-medium tracking-wide text-pakelo-red">
            {aboutIntro.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-3xl leading-[1.1] font-black tracking-tight text-ink uppercase sm:text-4xl">
            {aboutIntro.heading}
          </h2>
          <span aria-hidden className="mt-5 mb-8 block h-[3px] w-24 bg-pakelo-red" />

          <div className="space-y-7 text-[15px] leading-relaxed text-graphite">
            {aboutIntro.blocks.map((block) => (
              <div key={block.lead}>
                <p>
                  <strong className="font-display text-base font-bold tracking-wide text-ink uppercase">
                    {block.lead}
                  </strong>
                  <br />
                  {block.body}
                  {"emphasis" in block && block.emphasis && (
                    <>
                      {" "}
                      <strong className="font-semibold text-ink">{block.emphasis}</strong>
                    </>
                  )}
                </p>

                {"bullets" in block && block.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {block.bullets.map((bullet) => (
                      <li key={bullet.strong} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-pakelo-red"
                        />
                        <span>
                          <strong className="font-semibold text-ink">{bullet.strong}</strong>
                          {bullet.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {"after" in block && block.after && (
                  <p className="mt-4">{block.after}</p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Lubrifianți personalizați
 * ------------------------------------------------------------------ */
function TailorMade() {
  return (
    <section className="bg-fog">
      <div className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-2 grid grid-cols-2 gap-4 lg:order-1">
            {tailorMade.images.map((src, i) => (
              <div
                key={src}
                className={`relative aspect-[3/4] overflow-hidden ${i === 1 ? "mt-8" : ""}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="font-display text-3xl leading-[1.1] font-black tracking-tight text-ink uppercase sm:text-4xl">
              {tailorMade.title}
            </h2>
            <span aria-hidden className="mt-5 mb-7 block h-[3px] w-24 bg-pakelo-red" />
            <p className="max-w-xl text-[15px] leading-relaxed text-graphite">
              {tailorMade.body}
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 bg-pakelo-red px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-ink"
            >
              Discută cu un specialist
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
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Links out to the pakelo.com deep pages, as on the homepage
 * ------------------------------------------------------------------ */
const EXTERNAL = [
  { label: "Fabrica", href: "https://pakelo.com/en/factory" },
  { label: "Servicii de laborator", href: "https://pakelo.com/en/pakelo-lab/lab-services" },
  { label: "Certificări", href: "https://pakelo.com/en/certifications" },
  { label: "Find your oil", href: "https://pakelo.com/en/find-your-oil" },
];

function AboutCta() {
  return (
    <section className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <h2 className="font-display text-xl font-bold tracking-wide text-ink uppercase">
        Mai multe pe pakelo.com
      </h2>
      <span aria-hidden className="mt-4 mb-8 block h-[2px] w-20 bg-pakelo-red" />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {EXTERNAL.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border border-black/10 px-5 py-4 transition hover:border-pakelo-red"
            >
              <span className="font-display text-sm font-semibold tracking-wide text-ink uppercase">
                {item.label}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="h-4 w-4 shrink-0 text-pakelo-red transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
