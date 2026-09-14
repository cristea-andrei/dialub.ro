import { site } from "@/lib/site";

/** Organization + LocalBusiness JSON-LD for the homepage. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: site.name,
    alternateName: site.tagline,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/brand/dialub-white-logo.png`,
    logo: `${site.url}/images/brand/dialub-white-logo.png`,
    telephone: site.contact.phone,
    email: site.contact.email,
    sameAs: [site.social.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Gheorghe Dascalu, nr. 4",
      addressLocality: "Dobroesti",
      addressRegion: "Ilfov",
      postalCode: "077085",
      addressCountry: "RO",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:30",
        closes: "17:00",
      },
    ],
    brand: { "@type": "Brand", name: "Pakelo Lubricants" },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
