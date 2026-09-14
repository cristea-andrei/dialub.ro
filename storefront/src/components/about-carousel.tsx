"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { CarouselButton } from "@/components/category-carousel";
import { aboutCards } from "@/content/home";
import { cn } from "@/lib/utils";

export function AboutCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    duration: 26,
    containScroll: "trimSnaps",
  });
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
    <div className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-2.5 flex touch-pan-y">
          {aboutCards.map((card) => (
            <div
              key={card.id}
              className="min-w-0 flex-[0_0_82%] pl-2.5 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
            >
              <Link
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/25"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                />

                <div className="relative p-8 pb-10 lg:px-10">
                  <h3 className="font-display text-2xl font-semibold tracking-wide text-white uppercase">
                    {card.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2.5 text-sm font-medium text-white/90 transition-colors group-hover:text-pakelo-red">
                    Descoperă
                    <svg
                      viewBox="0 0 448 512"
                      fill="currentColor"
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <CarouselButton direction="prev" onClick={prev} disabled={!canPrev} className="left-3" />
      <CarouselButton direction="next" onClick={next} disabled={!canNext} className="right-3" />

      <div className="mt-6 flex justify-center gap-2 lg:hidden">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Mergi la cardul ${i + 1}`}
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
