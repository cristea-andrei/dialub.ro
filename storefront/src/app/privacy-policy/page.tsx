import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description:
    "Ce date colectăm pe dialub.ro, cum le folosim, cu cine le partajăm și ce " +
    "drepturi ai asupra lor.",
};

export default function PrivacyPage() {
  return <LegalPage page={privacy} />;
}
