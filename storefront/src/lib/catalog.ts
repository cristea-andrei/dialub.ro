import raw from "@/data/catalog.json";

export type Variant = {
  id: number;
  sku: string;
  packaging: string;
  packagingSlug: string;
  price: number | null;
  image: string | null;
  inStock: boolean;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  sku: string;
  summary: string | null;
  /** Packaging / classification lines that led the short description. */
  notes: string[];
  /** Datasheet prose, WordPress markup stripped, spec blocks removed. */
  bodyHtml: string;
  /** Performance levels, approvals and Pakelo recommendations, kept verbatim. */
  specsHtml: string;
  /** The "100% Made in Italy" strip printed at the foot of the datasheet. */
  madeInItaly: boolean;
  badgeImages: string[];
  baseType: string | null;
  baseTypeSlug: string | null;
  viscosity: string | null;
  viscositySlug: string | null;
  categories: string[];
  sectors: string[];
  image: string | null;
  variants: Variant[];
  priceMin: number | null;
  priceMax: number | null;
  packagings: string[];
  inStock: boolean;
  /** Normalised industry standards, e.g. "ACEA C3", "API SP". */
  standards: string[];
  /** Manufacturers whose approvals/recommendations this product carries. */
  oems: string[];
  /** Every approval line exactly as printed on the technical sheet. */
  specs: string[];
  performance: string[];
  approvals: string[];
  recommended: string[];
};

export type FacetTerm = { slug: string; name: string; count: number };
export type Facets = {
  sectors: FacetTerm[];
  subcategories: (FacetTerm & { parent: string | null; parentSlug: string | null })[];
  baseTypes: FacetTerm[];
  viscosities: FacetTerm[];
  packagings: FacetTerm[];
  standards: { value: string; body: string; count: number }[];
  oems: { value: string; count: number }[];
  price: { min: number; max: number };
};

const data = raw as unknown as { products: Product[]; facets: Facets };

export const products: Product[] = data.products;
export const facets: Facets = data.facets;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * What the browser actually needs to filter and render the grid — the long
 * technical description and the raw approval lines stay on the server.
 */
export type ListProduct = Omit<
  Product,
  "bodyHtml" | "specsHtml" | "specs" | "performance" | "approvals" | "recommended"
> & {
  /** Pre-lowercased haystack so search doesn't rebuild strings per keystroke. */
  search: string;
};

export function toListProduct(p: Product): ListProduct {
  const { bodyHtml, specsHtml, specs, performance, approvals, recommended, ...rest } = p;
  void bodyHtml;
  void specsHtml;
  void performance;
  void approvals;
  void recommended;
  return {
    ...rest,
    search: [
      p.name,
      p.sku,
      p.summary ?? "",
      ...p.notes,
      p.baseType ?? "",
      p.viscosity ?? "",
      ...p.standards,
      ...p.oems,
      ...specs,
      ...p.variants.map((v) => v.sku),
    ]
      .join(" ")
      .toLowerCase(),
  };
}

export const listProducts: ListProduct[] = products.map(toListProduct);

/** Sector metadata — copy and imagery shared with the homepage carousel. */
export const sectorMeta: Record<string, { label: string; blurb: string; image: string }> = {
  auto: {
    label: "Auto",
    blurb:
      "Uleiuri de motor și transmisie pentru autoturisme, oferind protecție maximă, performanță optimă și eficiență în orice condiții de rulare.",
    image: "/images/categories/auto.jpeg",
  },
  moto: {
    label: "Moto",
    blurb:
      "Uleiuri performante pentru motociclete, scutere și ATV-uri, oferind protecție optimă, reducerea uzurii și schimbări de viteze mai line.",
    image: "/images/categories/moto.jpeg",
  },
  constructii: {
    label: "Construcții",
    blurb:
      "Lubrifianți rezistenți pentru utilaje de construcții, maximizând performanța și durata de viață a componentelor expuse la sarcini grele.",
    image: "/images/categories/constructii.jpeg",
  },
  agricultura: {
    label: "Agricultură",
    blurb:
      "Uleiuri specializate pentru tractoare și utilaje agricole, protejând motoarele și sistemele hidraulice pentru o funcționare fiabilă.",
    image: "/images/categories/agricultura.jpeg",
  },
  "heavy-duty": {
    label: "Heavy-Duty",
    blurb:
      "Uleiuri robuste pentru camioane, autobuze și vehicule comerciale, asigurând protecție maximă, durabilitate și performanță în condiții extreme.",
    image: "/images/categories/heavy-duty.jpeg",
  },
  industriale: {
    label: "Industriale",
    blurb:
      "Lubrifianți esențiali pentru echipamente și utilaje grele, asigurând durabilitate, eficiență și rezistență la condiții extreme.",
    image: "/images/categories/industriale.jpeg",
  },
  alimentare: {
    label: "Alimentare",
    blurb:
      "Lubrifianți siguri pentru industria alimentară, certificați pentru contact incidental, asigurând funcționarea optimă a echipamentelor.",
    image: "/images/categories/alimentare.jpeg",
  },
  ambarcatiuni: {
    label: "Ambarcațiuni",
    blurb:
      "Uleiuri premium pentru motoare nautice, protejând împotriva coroziunii și uzurii, chiar și în medii saline.",
    image: "/images/categories/ambarcatiuni.jpeg",
  },
  ferrari: {
    label: "Ferrari",
    blurb:
      "Lubrifianți dezvoltați pentru mașinile clasice Ferrari, formulați împreună cu Ferrari Classiche pentru motoare și transmisii de epocă.",
    image: "/images/categories/auto.jpeg",
  },
};

const priceFormat = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 });

/** WooCommerce shows "1.234 lei" — keep the same wording. */
export function formatPrice(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${priceFormat.format(value)} lei`;
}
