/**
 * Homepage content, transcribed 1:1 from dialub.ro.
 * Keeping it in one place so the copy can move to a CMS later without
 * touching the section components.
 */

export type Slide = {
  id: string;
  /** Rendered as two lines, exactly as on the original slider. */
  headline: [string, string];
  image: string;
  alt: string;
  cta?: { label: string; href: string; external?: boolean };
};

export const heroSlides: Slide[] = [
  {
    id: "racecars",
    headline: ["NU SCHIMBA MAȘINA,", "SCHIMBĂ ULEIUL!"],
    image: "/images/hero/pakelo-racecars.jpg",
    alt: "Mașini de curse echipate cu lubrifianți Pakelo",
    cta: { label: "Shop", href: "/produse" },
  },
  {
    id: "butoaie",
    headline: ["PAKELO: SPECIALISTUL ÎN", "LUBRIFIANȚI"],
    image: "/images/hero/butoaie.webp",
    alt: "Butoaie de lubrifiant Pakelo în depozit",
    cta: {
      label: "Find your oil",
      href: "https://pakelo.com/en/find-your-oil",
      external: true,
    },
  },
  {
    id: "butoi",
    headline: ["ECHIPĂM PASIUNEA", "DIN 1930"],
    image: "/images/hero/butoi-1.webp",
    alt: "Butoi Pakelo Motor Oil",
  },
];

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "auto",
    name: "Auto",
    description:
      "Uleiuri de motor și transmisie pentru autoturisme, oferind protecție maximă, performanță optimă și eficiență în orice condiții de rulare.",
    image: "/images/categories/auto.jpeg",
  },
  {
    slug: "moto",
    name: "Moto",
    description:
      "Uleiuri performante pentru motociclete, scutere și ATV-uri, oferind protecție optimă, reducerea uzurii și schimbări de viteze mai line.",
    image: "/images/categories/moto.jpeg",
  },
  {
    slug: "constructii",
    name: "Construcții",
    description:
      "Lubrifianți rezistenți pentru utilaje de construcții, maximizând performanța și durata de viață a componentelor expuse la sarcini grele.",
    image: "/images/categories/constructii.jpeg",
  },
  {
    slug: "agricultura",
    name: "Agricultură",
    description:
      "Uleiuri specializate pentru tractoare și utilaje agricole, protejând motoarele și sistemele hidraulice pentru o funcționare fiabilă.",
    image: "/images/categories/agricultura.jpeg",
  },
  {
    slug: "heavy-duty",
    name: "Heavy-Duty",
    description:
      "Uleiuri robuste pentru camioane, autobuze și vehicule comerciale, asigurând protecție maximă, durabilitate și performanță în condiții extreme.",
    image: "/images/categories/heavy-duty.jpeg",
  },
  {
    slug: "industriale",
    name: "Industriale",
    description:
      "Lubrifianți esențiali pentru echipamente și utilaje grele, asigurând durabilitate, eficiență și rezistență la condiții extreme.",
    image: "/images/categories/industriale.jpeg",
  },
  {
    slug: "alimentare",
    name: "Alimentare",
    description:
      "Lubrifianți siguri pentru industria alimentară, certificați pentru contact incidental, asigurând funcționarea optimă a echipamentelor.",
    image: "/images/categories/alimentare.jpeg",
  },
  {
    slug: "ambarcatiuni",
    name: "Ambarcațiuni",
    description:
      "Uleiuri premium pentru motoare nautice, protejând împotriva coroziunii și uzurii, chiar și în medii saline.",
    image: "/images/categories/ambarcatiuni.jpeg",
  },
];

export const intro = {
  body: "Cea mai bună lubrifiere rezultă din combinația dintre expertiză și angajamentul față de excelență. Pakelo produce peste 1000 de tipuri de lubrifianți. Dacă ești în căutarea unui ulei auto distinctiv, ulei pentru motociclete, lubrifiant industrial sau pentru aplicații heavy-duty, ai ajuns în locul potrivit.",
  cta: {
    label: "Descoperă produsele pe pakelo.com",
    href: "https://pakelo.com/en/products",
  },
};

export const madeInItaly = {
  body: "Lubrifianții Pakelo sunt fabricați în întregime în Italia și exportați în peste 50 de țări din întreaga lume printr-o rețea selectată de distribuitori și dealeri. În zilele noastre, fabricarea de lubrifianți înseamnă anticiparea cerințelor pieței cu produse care excelează în ciuda scenariului complex și în continuă schimbare al specificațiilor internaționale și OEM. Pentru a asigura acest lucru, Pakelo se străduiește zilnic să obțină acces la cele mai bune baze și aditivi, valorificând relațiile, cercetarea și schimbul de informatii din cultura lubrifianților, oferind excelență excelenței.",
};

export const philosophy = {
  eyebrow: "Filosofia producției",
  points: [
    "Utilizarea celor mai buni aditivi disponibili comercial pe piață pentru a îndeplini cele mai stricte specificații ale producătorilor",
    "0% uleiuri reciclate",
    "Lubrifianți formulați conform principiului Echilibrului Polar*",
    "100% Fabricat in Italia",
    "Consultanță tehnică și servicii personalizate pentru profesioniști",
  ],
  polar: {
    title: "Puterea Echilibrului Polar",
    body: "Moleculele de lubrifiant și cele prezente în suprafețele metalice ale componentelor sunt polare prin natura lor. Se atrag reciproc. Acest proces poate fi facilitat dacă compoziția lubrifiantului este bine echilibrată. Aditivii și uleiurile de bază nu trebuie să intre în concurență între ei, ci trebuie să lucreze în sinergie cu scopul de a favoriza polaritatea și, prin urmare, aderența lubrifiantului la suprafețe. Aceasta este ceea ce înțelegem prin Echilibru Polar.",
    kicker: "O legătură creată să reziste.",
  },
};

export type AboutCard = {
  id: string;
  title: string;
  image: string;
  href: string;
  external?: boolean;
};

export const aboutCards: AboutCard[] = [
  {
    id: "fabrica",
    title: "Fabrica",
    image: "/images/about/fabrica.webp",
    href: "https://pakelo.com/en/factory",
    external: true,
  },
  {
    id: "servicii",
    title: "Servicii",
    image: "/images/about/servicii.jpg",
    href: "https://pakelo.com/en/pakelo-lab/lab-services",
    external: true,
  },
  {
    id: "certificari",
    title: "Certificări",
    image: "/images/about/certificari.jpeg",
    href: "https://pakelo.com/en/certifications",
    external: true,
  },
  {
    id: "dealeri",
    title: "Dealeri în România",
    image: "/images/about/dealeri.webp",
    href: "/distribuitori",
  },
];
