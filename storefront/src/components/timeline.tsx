"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { eras } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * The Pakelo company timeline — six eras, each a photo with the year set into
 * the corner. A year rail above lets you jump straight to a decade.
 */
export function Timeline() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: 26,
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setSelected(embla.selectedScrollSnap());
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    update();
    embla.on("select", update).on("reInit", update);
  }, [embla]);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <section
      aria-labelledby="istoric-title"
      className="bg-ink py-16 lg:py-24"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="istoric-title"
              className="font-display text-3xl font-black tracking-tight text-white uppercase sm:text-4xl"
            >
              Istoria Pakelo
            </h2>
            <span aria-hidden className="mt-5 block h-[3px] w-24 bg-pakelo-red" />
          </div>

          {/* year rail */}
          <ol className="flex flex-wrap items-center gap-1">
            {eras.map((era, i) => (
              <li key={era.year}>
                <button
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-current={selected === i}
                  className={cn(
                    "px-3 py-1.5 font-display text-sm font-bold tracking-wide transition",
                    selected === i
                      ? "bg-pakelo-red text-white"
                      : "text-white/45 hover:text-white",
                  )}
                >
                  {era.year}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="relative mt-10">
        <div ref={emblaRef} className="overflow-hidden px-5 sm:px-8 lg:px-12">
          <div className="-ml-4 flex touch-pan-y">
            {eras.map((era, i) => (
              <article
                key={era.year}
                className="min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_56%] lg:flex-[0_0_38%] xl:flex-[0_0_30%]"
              >
                <div
                  className={cn(
                    "group h-full transition-opacity duration-500",
                    selected === i ? "opacity-100" : "opacity-60 hover:opacity-90",
                  )}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={era.image}
                      alt={`Pakelo ${era.year} — ${era.title}`}
                      fill
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 56vw, 30vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
                    />
                    <span className="absolute bottom-4 left-5 font-display text-4xl font-black tracking-tight text-white lg:text-5xl">
                      {era.year}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold tracking-wide text-white uppercase">
                    {era.title}
                  </h3>
                  <span aria-hidden className="mt-3 mb-4 block h-[2px] w-16 bg-pakelo-red" />
                  <p className="text-sm leading-relaxed text-white/70">{era.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <TimelineButton
          direction="prev"
          onClick={() => embla?.scrollPrev()}
          disabled={!canPrev}
        />
        <TimelineButton
          direction="next"
          onClick={() => embla?.scrollNext()}
          disabled={!canNext}
        />
      </div>
    </section>
  );
}

function TimelineButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Perioada anterioară" : "Perioada următoare"}
      className={cn(
        "absolute top-[30%] z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-ink sm:grid",
        direction === "prev" ? "left-2 lg:left-4" : "right-2 lg:right-4",
        disabled && "pointer-events-none opacity-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={cn("h-6 w-6", direction === "prev" && "rotate-180")}
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
  );
}
