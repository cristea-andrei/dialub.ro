"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { heroSlides } from "@/content/home";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, duration: 32 },
    reducedMotion
      ? []
      : [
          Autoplay({
            delay: AUTOPLAY_MS,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
  }, [embla]);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Prezentare Pakelo"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} din ${heroSlides.length}`}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              {/* Ken Burns background, restarted whenever the slide becomes active */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  key={selected === i ? `${slide.id}-on` : slide.id}
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={cn(
                    "object-cover",
                    selected === i && "animate-ken-burns",
                  )}
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-black/50"
              />
              {/* Extra bottom gradient so the scroll cue and nav stay legible */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
              />

              <div className="relative flex h-full items-center justify-center px-6 text-center">
                <div
                  className={cn(
                    "max-w-5xl transition-all duration-700 ease-out",
                    selected === i
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0",
                  )}
                >
                  {/* Only the first slide carries the page's h1 */}
                  {(() => {
                    const Heading = i === 0 ? "h1" : "h2";
                    return (
                      <Heading className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.15] font-extrabold tracking-tight text-white uppercase [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                        {slide.headline[0]}
                        <br />
                        {slide.headline[1]}
                      </Heading>
                    );
                  })()}

                  {slide.cta && (
                    <div className="mt-9">
                      <Link
                        href={slide.cta.href}
                        target={slide.cta.external ? "_blank" : undefined}
                        rel={slide.cta.external ? "noopener noreferrer" : undefined}
                        tabIndex={selected === i ? 0 : -1}
                        className="group inline-flex items-center gap-3 rounded-full bg-pakelo-red px-8 py-3.5 text-sm font-semibold tracking-[0.12em] text-white uppercase shadow-[0_10px_40px_-8px_rgba(227,36,28,0.8)] transition hover:bg-white hover:text-ink"
                      >
                        {slide.cta.label}
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / next */}
      <button
        type="button"
        onClick={() => embla?.scrollPrev()}
        aria-label="Slide-ul anterior"
        className="absolute top-1/2 left-3 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:grid lg:left-8"
      >
        <Chevron className="rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => embla?.scrollNext()}
        aria-label="Slide-ul următor"
        className="absolute top-1/2 right-3 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:grid lg:right-8"
      >
        <Chevron />
      </button>

      {/* Progress-bar pagination — the modern take on the original dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Mergi la slide-ul ${i + 1}`}
            aria-current={selected === i}
            className="group relative h-6 w-12 md:w-16"
          >
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30">
              <span
                key={`${slide.id}-${selected === i}`}
                className={cn(
                  "block h-full origin-left rounded-full bg-pakelo-red",
                  selected === i
                    ? "motion-safe:animate-[progress_5000ms_linear_forwards] motion-reduce:w-full"
                    : "w-0 group-hover:w-full group-hover:bg-white/60 group-hover:transition-[width] group-hover:duration-300",
                )}
              />
            </span>
          </button>
        ))}
      </div>

      <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-7 w-7", className)}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-4 w-4", className)}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
