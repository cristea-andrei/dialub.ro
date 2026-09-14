/**
 * Partenerii Pakelo din România — the markers behind the store locator on
 * dialub.ro/distribuitori, normalised (city pulled out of the address,
 * contact name and phone split apart).
 */

export type Dealer = {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  contact: string | null;
  phone: string | null;
  website: string | null;
  lat: number;
  lng: number;
};

export const dealers: Dealer[] = [
  {
    "id": 7,
    "name": "Pro Parts",
    "slug": "pro-parts",
    "address": "Șoseaua Clinceni, Bragadiru 077052",
    "city": "Bragadiru",
    "contact": "Bogdan",
    "phone": "0726 086 420",
    "website": "https://proparts.ro/",
    "lat": 44.36813137136452,
    "lng": 25.96731278706362
  },
  {
    "id": 6,
    "name": "Auto Vision",
    "slug": "auto-vision",
    "address": "Intrarea Străulești 2D, București 013342",
    "city": "București",
    "contact": "Cristina Jitea",
    "phone": "0723 302 351",
    "website": "https://cocomall.ro/",
    "lat": 44.4886308,
    "lng": 26.0648875
  },
  {
    "id": 14,
    "name": "Automecanica SCM Unitatea 1 - ITP",
    "slug": "automecanica-scm-unitatea-1-itp",
    "address": "Strada Nicolae Apostol 17, București, Romania",
    "city": "București",
    "contact": "Rareș Pîrvulescu",
    "phone": "0740 085 486",
    "website": null,
    "lat": 44.4775456,
    "lng": 26.1654918
  },
  {
    "id": 3,
    "name": "Eugen si Fiul GPL",
    "slug": "eugen-si-fiul-gpl",
    "address": "Strada Neajlovului, Bucuresti, Romania",
    "city": "București",
    "contact": "Adrian Coteanu",
    "phone": "0724 913 000",
    "website": null,
    "lat": 44.492626,
    "lng": 26.0498673
  },
  {
    "id": 8,
    "name": "Milar Just",
    "slug": "milar-just",
    "address": "Prelungirea Ferentari 64-8, Bucuresti, Romania",
    "city": "București",
    "contact": "Laurentiu",
    "phone": "0722 372 862",
    "website": null,
    "lat": 44.392149,
    "lng": 26.082072
  },
  {
    "id": 5,
    "name": "Straight Line Garrage",
    "slug": "straight-line-garrage",
    "address": "Drumul Între Tarlale, București 032982",
    "city": "București",
    "contact": "Vali Cimpoeru (Morcov)",
    "phone": "0724 125 025",
    "website": null,
    "lat": 44.419983755535895,
    "lng": 26.22111394777681
  },
  {
    "id": 15,
    "name": "ML Auto Center - N27 Auto Shop",
    "slug": "ml-auto-center-n27-auto-shop",
    "address": "Strada Cuza Voda 9 Dobroești 077085",
    "city": "Dobroești",
    "contact": "Liviu Minca",
    "phone": "0775599271",
    "website": null,
    "lat": 44.4506188,
    "lng": 26.1800015
  },
  {
    "id": 2,
    "name": "Nomad HUB",
    "slug": "nomad-hub",
    "address": "Strada Energiei, Dobroești, Romania",
    "city": "Dobroești",
    "contact": "Tiberiu Olteanu",
    "phone": "0729 888 729",
    "website": null,
    "lat": 44.457925,
    "lng": 26.1741834
  },
  {
    "id": 9,
    "name": "Chifor Motors",
    "slug": "chifor-motors",
    "address": "Strada Oltului 8, Dragomiresti - Vale, Romania",
    "city": "Dragomirești-Vale",
    "contact": "Costi Chifor",
    "phone": "0744 687 270",
    "website": null,
    "lat": 44.45281214801544,
    "lng": 25.939352448687742
  },
  {
    "id": 4,
    "name": "Ro Builds Motorsport",
    "slug": "ro-builds-motorsport",
    "address": "Hala 15B, Str. Sfântul Gheorghe 20, Pantelimon 077145",
    "city": "Pantelimon",
    "contact": "Andrei",
    "phone": "+40 741 220 600",
    "website": "https://www.robuilds.ro",
    "lat": 44.470212,
    "lng": 26.2093523
  },
  {
    "id": 13,
    "name": "Rosenau Service",
    "slug": "rosenau-service",
    "address": "Strada Câmpului, 505400 Râșnov, Romania",
    "city": "Râșnov",
    "contact": "Mihai Constantin",
    "phone": "0730 333 377",
    "website": null,
    "lat": 45.5897939,
    "lng": 25.4476291
  },
  {
    "id": 11,
    "name": "ARCADIE AUTOTEC",
    "slug": "arcadie-autotec",
    "address": "Strada Cuza Vodă Nr.127, Tecuci 805300",
    "city": "Tecuci",
    "contact": "Arcadie Patrscanu",
    "phone": "0721.268.125",
    "website": null,
    "lat": 45.8427443,
    "lng": 27.4476905
  },
  {
    "id": 12,
    "name": "Safehouse Motorsport",
    "slug": "safehouse-motorsport",
    "address": "Strada Pericle Papahagi 5, Voluntari 077190",
    "city": "Voluntari",
    "contact": "Alex Chiru",
    "phone": "0729 962 758",
    "website": null,
    "lat": 44.4997413,
    "lng": 26.1391668
  }
];

/** Distinct cities, in the order they appear in the sorted dealer list. */
export const dealerCities: string[] = Array.from(
  new Set(dealers.map((d) => d.city)),
);

/** Roughly the centre of the dealer network, for the initial map view. */
export const dealerMapCenter: [number, number] = [45.1, 26.0];

export function telHref(phone: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/[^\d+]/g, "");
  if (!digits) return undefined;
  return `tel:${digits.startsWith("+") ? digits : digits.replace(/^0/, "+40")}`;
}
