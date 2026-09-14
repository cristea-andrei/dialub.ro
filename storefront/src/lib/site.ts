export const site = {
  name: "Dialub Expert",
  tagline: "Pakelo Lubricants Romania",
  description:
    "Unic importator și distribuitor autorizat al gamei complete de lubrifianți profesionali Pakelo, un nume de referință în domeniul lubrifianților de înaltă performanță.",
  url: "https://www.dialub.ro",
  contact: {
    address:
      "Birou si depozit: Str. Gheorghe Dascalu, nr. 4, Dobroesti, ILFOV, 077085",
    phone: "+4 0720 261 111",
    phoneHref: "tel:+40720261111",
    email: "pakelo@dialub.ro",
    hours: ["Luni - Vineri", "08.30 - 17.00"],
  },
  social: {
    facebook: "https://www.facebook.com/pakelo.romania/",
  },
} as const;

export const mainNav = [
  { label: "Despre Pakelo", href: "/despre-pakelo" },
  {
    label: "Find your oil",
    href: "https://pakelo.com/en/find-your-oil",
    external: true,
  },
  { label: "Parteneri", href: "/distribuitori" },
  { label: "Contact", href: "/contact" },
  { label: "Shop", href: "/produse", emphasis: true },
] as const;

export const legalNav = [
  { label: "Termeni și condiții", href: "/terms-and-conditions" },
  { label: "Politica de Confidențialitate", href: "/privacy-policy" },
] as const;
