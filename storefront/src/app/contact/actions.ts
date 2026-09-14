"use server";

import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  /** Set when the mail sender isn't configured — the form falls back to mailto. */
  fallback?: boolean;
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Bots fill hidden fields; humans don't.
  const honeypot = String(formData.get("company") ?? "").trim();

  if (honeypot) return { status: "sent" };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Introdu o adresă de e-mail validă." };
  }
  if (!message) {
    return { status: "error", message: "Scrie un mesaj înainte de a trimite." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client to open the visitor's mail client so
    // the message isn't silently lost.
    return {
      status: "error",
      fallback: true,
      message:
        "Trimiterea automată nu este încă activată. Deschidem clientul tău de e-mail cu mesajul completat.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Dialub Expert <noreply@dialub.ro>",
        to: [process.env.CONTACT_TO ?? site.contact.email],
        reply_to: email,
        subject: `Mesaj nou de pe dialub.ro${name ? ` — ${name}` : ""}`,
        text: [
          `Nume: ${name || "-"}`,
          `Telefon: ${phone || "-"}`,
          `E-mail: ${email}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message: "Mesajul nu a putut fi trimis. Încearcă din nou sau sună-ne.",
      };
    }
    return { status: "sent", message: "Mesajul a fost trimis. Revenim cât de curând." };
  } catch {
    return {
      status: "error",
      message: "Mesajul nu a putut fi trimis. Încearcă din nou sau sună-ne.",
    };
  }
}
