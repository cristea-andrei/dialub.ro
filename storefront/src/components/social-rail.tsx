import { site } from "@/lib/site";

/**
 * Fixed Facebook tab pinned to the right edge, as on the original site.
 * Hidden on phones, where it would sit on top of the content — the footer
 * carries the same link there.
 */
export function SocialRail() {
  return (
    <a
      href={site.social.facebook}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pakelo Romania pe Facebook"
      className="fixed right-0 bottom-[8%] z-40 hidden h-14 w-11 place-items-center rounded-l-md bg-pakelo-pink text-white shadow-lg transition hover:w-14 hover:bg-pakelo-red sm:grid"
    >
      <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden className="h-6 w-6">
        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
      </svg>
    </a>
  );
}
