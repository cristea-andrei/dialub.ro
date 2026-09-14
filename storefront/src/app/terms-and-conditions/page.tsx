import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description:
    "Termenii și condițiile de utilizare a site-ului dialub.ro și de achiziție a " +
    "produselor Pakelo Lubricants.",
};

export default function TermsPage() {
  return <LegalPage page={terms} />;
}
