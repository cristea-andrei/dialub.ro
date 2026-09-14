"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dialub-consent";

type Consent = {
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

const CATEGORIES: { key: keyof Consent; label: string; description: string }[] = [
  {
    key: "preferences",
    label: "Preferințe",
    description:
      "Stocarea tehnică este necesară în scopul legitim de a stoca preferințe care nu sunt solicitate de abonat sau utilizator.",
  },
  {
    key: "statistics",
    label: "Statistici",
    description:
      "Stocarea tehnică sau accesul utilizate exclusiv în scopuri statistice anonime.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Stocarea tehnică sau accesul necesare pentru a crea profiluri de utilizator, pentru a trimite publicitate sau pentru a urmări utilizatorul.",
  },
];

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    preferences: false,
    statistics: false,
    marketing: false,
  });

  // Read the stored choice after hydration — localStorage isn't available on
  // the server, and reading it during render would mismatch the static HTML.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private mode / blocked storage — fall through and show the banner.
    }
    if (!stored) {
      const id = requestAnimationFrame(() => setOpen(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  const save = (value: Consent) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...value, at: new Date().toISOString() }),
      );
    } catch {
      /* storage unavailable — the choice just isn't remembered */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-message"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:right-5 sm:bottom-5 sm:left-auto sm:p-0"
    >
      <div className="mx-auto w-full max-w-md rounded-2xl border border-black/5 bg-white p-6 shadow-[0_24px_70px_-18px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="cookie-title"
            className="font-display text-base font-semibold tracking-wide text-ink uppercase"
          >
            Cookies
          </h2>
          <button
            type="button"
            onClick={() => save(consent)}
            aria-label="Închide dialogul"
            className="-mt-1 -mr-1 grid h-8 w-8 place-items-center rounded-full text-graphite/50 transition hover:bg-mist hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
              className="h-4 w-4"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p id="cookie-message" className="mt-3 text-[13px] leading-relaxed text-graphite">
          Pentru a oferi cele mai bune experiențe, folosim tehnologii precum
          cookie-urile pentru a stoca și/sau accesa informații de pe dispozitiv.
          Consimțământul acordat pentru aceste tehnologii ne va permite să
          procesăm date precum comportamentul de navigare sau ID-uri unice pe
          acest site. Neacordarea consimțământului sau retragerea acestuia poate
          afecta negativ anumite funcționalități și caracteristici.
        </p>

        {expanded && (
          <ul className="mt-5 space-y-4 border-t border-black/5 pt-5">
            <li className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink">Funcțional</p>
                <p className="mt-1 text-xs leading-relaxed text-graphite/70">
                  Strict necesar pentru a permite utilizarea unui serviciu
                  solicitat explicit de utilizator.
                </p>
              </div>
              <span className="mt-0.5 shrink-0 text-xs font-medium text-graphite/60">
                Mereu activ
              </span>
            </li>

            {CATEGORIES.map((category) => (
              <li key={category.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink">{category.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-graphite/70">
                    {category.description}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={consent[category.key]}
                  aria-label={category.label}
                  onClick={() =>
                    setConsent((c) => ({ ...c, [category.key]: !c[category.key] }))
                  }
                  className={`mt-0.5 h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
                    consent[category.key] ? "bg-pakelo-red" : "bg-graphite/25"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      consent[category.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              save({ preferences: true, statistics: true, marketing: true })
            }
            className="flex-1 rounded-full bg-pakelo-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pakelo-red-dark"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() =>
              save({ preferences: false, statistics: false, marketing: false })
            }
            className="flex-1 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            Refuz
          </button>
          <button
            type="button"
            onClick={() => (expanded ? save(consent) : setExpanded(true))}
            className="w-full rounded-full px-5 py-2 text-xs font-medium text-graphite/70 transition hover:text-ink"
          >
            {expanded ? "Salvează preferințele" : "Administrează opțiunile"}
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-graphite/50">
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
            Politica de Confidențialitate
          </Link>
        </p>
      </div>
    </div>
  );
}
