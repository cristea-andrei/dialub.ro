import Image from "next/image";
import Link from "next/link";

import { AboutCarousel } from "@/components/about-carousel";
import { CategoryCarousel } from "@/components/category-carousel";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SocialRail } from "@/components/social-rail";
import { StructuredData } from "@/components/structured-data";
import { intro, madeInItaly, philosophy } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <SocialRail />
      <IntroAndCategories />
      <MadeInItaly />
      <Philosophy />
      <AboutPakelo />
      <ShopBillboard />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Authorised dealer intro + product-category carousel
 * ------------------------------------------------------------------ */
function IntroAndCategories() {
  return (
    <section
      aria-labelledby="domenii-title"
      className="grid items-stretch lg:grid-cols-[minmax(320px,30%)_1fr]"
    >
      <h2 id="domenii-title" className="sr-only">
        Domenii de aplicare
      </h2>
      <div className="flex min-w-0 flex-col items-center justify-center gap-8 px-6 py-16 sm:px-10 lg:py-12">
        <Reveal className="w-full max-w-[400px] text-center">
          <Image
            src="/images/brand/logo-dealer.png"
            alt="Pakelo Lubricants – Authorized Dealer"
            width={767}
            height={396}
            className="mx-auto h-auto w-full max-w-[320px]"
          />
        </Reveal>

        <Reveal delay={0.08} className="w-full max-w-[400px]">
          <p className="text-[15px] leading-relaxed text-graphite">{intro.body}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <Link
            href={intro.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pakelo-red px-6 py-3.5 text-center text-[12px] font-semibold tracking-[0.06em] text-white uppercase sm:whitespace-nowrap shadow-[0_14px_44px_-12px_rgba(0,0,0,0.55)] transition hover:bg-ink"
          >
            {intro.cta.label}
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

      <div className="min-w-0 overflow-hidden bg-ink lg:bg-transparent">
        <CategoryCarousel />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 100% Made in Italy
 * ------------------------------------------------------------------ */
function MadeInItaly() {
  return (
    <section className="mx-auto grid max-w-page items-center gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[25%_1fr_25%] lg:gap-14 lg:py-28">
      <Reveal className="flex justify-center">
        <Image
          src="/images/brand/made-in-italy.png"
          alt="Made in Italy"
          width={330}
          height={211}
          className="h-auto w-full max-w-[240px] transition-transform duration-500 hover:scale-105 lg:max-w-[330px]"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-justify text-[15px] leading-[1.9] text-graphite">
          {madeInItaly.body}
        </p>
      </Reveal>

      <Reveal delay={0.2} className="flex justify-center">
        <Image
          src="/images/brand/100-made-in-italy.png"
          alt="100% Made in Italy"
          width={464}
          height={316}
          className="h-auto w-full max-w-[280px] transition-transform duration-500 hover:scale-105 lg:max-w-[464px]"
        />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Production philosophy + Polar Balance (the red block)
 * ------------------------------------------------------------------ */
function Philosophy() {
  return (
    <section className="my-16 bg-pakelo-red lg:my-24">
      <div className="mx-auto grid max-w-page gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[59%_1fr] lg:gap-16 lg:py-20">
        <Reveal>
          <h2 className="text-[22px] font-normal text-white">
            <b>{philosophy.eyebrow.toUpperCase()}</b>
          </h2>

          <ul className="mt-6 space-y-4">
            {philosophy.points.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckMark />
                <span className="text-[19px] leading-[1.35] font-black tracking-[1px] text-white italic [text-shadow:0_0_10px_rgba(0,0,0,0.3)] lg:text-[22px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-around gap-5">
          <h3 className="font-display text-xl font-semibold tracking-wide text-white uppercase">
            {philosophy.polar.title}
          </h3>

          <p className="text-justify text-[18px] leading-[1.5] font-light text-white lg:text-[23px]">
            {philosophy.polar.body}
          </p>

          <p className="font-display text-xl font-black tracking-[0.2px] text-white uppercase">
            {philosophy.polar.kicker}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-1.5 h-5 w-5 shrink-0 text-white"
    >
      <path d="m4 12.5 5.5 5.5L20 6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Totul despre Pakelo
 * ------------------------------------------------------------------ */
function AboutPakelo() {
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal>
        <h2 className="px-2 font-display text-3xl font-black tracking-tight text-ink uppercase sm:text-4xl lg:text-5xl">
          Totul despre Pakelo
        </h2>
        <span aria-hidden className="mx-2 mt-5 mb-10 block h-[3px] w-24 bg-pakelo-red" />
      </Reveal>

      <Reveal delay={0.1}>
        <AboutCarousel />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Online-shop billboard
 * ------------------------------------------------------------------ */
function ShopBillboard() {
  return (
    <Link href="/produse" className="group block overflow-hidden bg-white">
      <figure className="m-0">
        <div className="relative w-full">
          <Image
            src="/images/brand/billboard.png"
            alt=""
            width={2560}
            height={185}
            sizes="100vw"
            className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
        </div>
        <figcaption className="py-6 text-center font-display text-lg font-semibold tracking-[0.06em] text-pakelo-red uppercase transition-colors group-hover:text-ink sm:text-xl">
          Vizitați magazinul online
        </figcaption>
      </figure>
    </Link>
  );
}
