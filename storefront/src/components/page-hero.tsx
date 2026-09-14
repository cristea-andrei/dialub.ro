import Image from "next/image";
import Link from "next/link";

/**
 * Pakelo's section header: a red diagonal band over a photo on the left,
 * the page copy on the right. Shared by every interior page.
 */
export function PageHero({
  title,
  image,
  breadcrumbs,
  headline,
  body,
  children,
}: {
  title: string;
  image: string;
  breadcrumbs: { label: string; href?: string }[];
  headline?: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate bg-white pt-20 lg:pt-28">
      <div className="grid lg:grid-cols-2">
        {/* left: photo + red diagonal */}
        <div className="relative min-h-[320px] overflow-hidden bg-ink lg:min-h-[420px]">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-pakelo-red/85 mix-blend-multiply"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-32 bg-white lg:block"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
            <h1 className="max-w-md font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-white uppercase sm:text-4xl lg:text-[44px]">
              {title}
            </h1>
            <span aria-hidden className="mt-5 block h-[2px] w-[min(360px,80%)] bg-white/70" />

            <nav aria-label="Breadcrumb" className="mt-5">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-white/40">
                        ›
                      </span>
                    )}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition hover:text-white">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-white" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        {/* right: copy */}
        <div className="flex items-center px-6 py-12 sm:px-10 lg:px-14 lg:py-12">
          <div className="max-w-xl">
            {headline && (
              <h2 className="font-display text-xl leading-snug font-bold tracking-tight text-ink uppercase lg:text-2xl">
                {headline}
              </h2>
            )}
            <span aria-hidden className="mt-5 mb-5 block h-px w-36 bg-graphite/25" />
            {body && <p className="text-[15px] leading-relaxed text-graphite">{body}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
