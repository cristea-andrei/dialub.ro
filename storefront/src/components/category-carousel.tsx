"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { categories } from "@/content/home";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export function CategoryCarousel() {
  const reducedMotion = usePrefersReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start", duration: 26 },
    reducedMotion
      ? []
      : [
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
      setSelected(embla.selectedScrollSnap());
      setSnaps(embla.scrollSnapList());
    };
    update();
    embla.on("select", update).on("reInit", update);
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div ref={emblaRef} className="flex-1 overflow-hidden">
        <div className="-ml-2.5 flex h-full touch-pan-y">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="min-w-0 flex-[0_0_88%] pl-2.5 sm:flex-[0_0_60%] md:flex-[0_0_50%] xl:flex-[0_0_33.3333%]"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      <CarouselButton
        direction="prev"
        onClick={prev}
        disabled={!canPrev}
        className="left-3 lg:left-5"
      />
      <CarouselButton
        direction="next"
        onClick={next}
        disabled={!canNext}
        className="right-3 lg:right-5"
      />

      <div className="mt-5 flex justify-center gap-2 xl:hidden">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Mergi la categoria ${i + 1}`}
            aria-current={selected === i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selected === i ? "w-7 bg-pakelo-red" : "w-1.5 bg-graphite/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof categories)[number];
}) {
  return (
    <Link
      href={`/produse?domeniu=${category.slug}`}
      className="group relative flex aspect-[3/4] h-full flex-col justify-end overflow-hidden sm:aspect-[4/5] lg:aspect-auto lg:min-h-[640px] xl:min-h-[720px]"
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(max-width: 640px) 88vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      {/* 60% black overlay, as on the original cards, lifted a little on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/45"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
      />

      <div className="relative p-8 lg:p-10">
        <h3 className="font-display text-2xl font-semibold tracking-wide text-white uppercase lg:text-[28px]">
          {category.name}
        </h3>
        <span
          aria-hidden
          className="mt-4 mb-5 block h-[2px] w-20 bg-pakelo-red transition-all duration-500 group-hover:w-[80%]"
        />
        <p className="max-w-sm text-sm leading-relaxed text-white/85">
          {category.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
          Vezi produsele
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="h-3.5 w-3.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function CarouselButton({
  direction,
  onClick,
  disabled,
  className,
  tone = "light",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Înapoi" : "Înainte"}
      className={cn(
        "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full backdrop-blur-sm transition sm:grid",
        tone === "light"
          ? "bg-white/15 text-white hover:bg-white hover:text-ink"
          : "bg-ink/10 text-ink hover:bg-ink hover:text-white",
        disabled && "pointer-events-none opacity-0",
        className,
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
