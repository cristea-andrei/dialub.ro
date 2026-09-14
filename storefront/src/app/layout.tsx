import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s – ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [
      { url: "/images/brand/favicon-32.png", sizes: "32x32" },
      { url: "/images/brand/favicon-192.png", sizes: "192x192" },
    ],
    apple: "/images/brand/favicon-270.png",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-pakelo-red focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Sari la conținut
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
