"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  // only the homepage has a full-bleed hero for the header to float over
  const overlay = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500",
        !overlay || scrolled || open
          ? "bg-ink/90 shadow-[0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-page items-center justify-between gap-6 px-5 sm:px-8 lg:h-28 lg:px-12">
        <Link
          href="/"
          className="relative z-10 block shrink-0"
          aria-label={`${site.name} — pagina principală`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/brand/dialub-white-logo.png"
            alt={`${site.name} logo`}
            width={1600}
            height={920}
            priority
            className="h-12 w-auto sm:h-14 lg:h-[72px]"
          />
        </Link>

        <nav
          aria-label="Meniu principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {mainNav.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          className="relative z-10 -mr-2 grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
        >
          <span className="sr-only">Meniu</span>
          <span aria-hidden className="grid gap-[5px]">
            <Bar open={open} className={open ? "translate-y-[7px] rotate-45" : ""} />
            <Bar open={open} className={open ? "opacity-0" : ""} />
            <Bar open={open} className={open ? "-translate-y-[7px] -rotate-45" : ""} />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Meniu principal mobil" className="px-5 py-6 sm:px-8">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-white/10 last:border-0">
                <Link
                  href={item.href}
                  target={"external" in item && item.external ? "_blank" : undefined}
                  rel={
                    "external" in item && item.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-4 font-display text-lg font-semibold tracking-wide uppercase transition",
                    "emphasis" in item && item.emphasis
                      ? "text-pakelo-red"
                      : "text-white hover:text-pakelo-red",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Bar({ open, className }: { open: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "block h-[2px] w-6 rounded-full bg-current transition-transform duration-300",
        open && "duration-300",
        className,
      )}
    />
  );
}

function NavLink({
  label,
  href,
  external,
  emphasis,
}: {
  label: string;
  href: string;
  external?: boolean;
  emphasis?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative py-1 text-[15px] font-medium tracking-wide text-white uppercase transition-colors",
        emphasis &&
          "rounded-full bg-pakelo-red px-5 py-2 font-semibold hover:bg-pakelo-red-dark",
      )}
    >
      {label}
      {!emphasis && (
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100"
        />
      )}
    </Link>
  );
}
