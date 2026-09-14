"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { sendContactMessage, type ContactState } from "@/app/contact/actions";
import { site } from "@/lib/site";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action] = useActionState(sendContactMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Mail sender not configured yet — hand the message to the visitor's client.
  useEffect(() => {
    if (!state.fallback || !formRef.current) return;
    const data = new FormData(formRef.current);
    const body = [
      `Nume: ${data.get("name") || "-"}`,
      `Telefon: ${data.get("phone") || "-"}`,
      `E-mail: ${data.get("email") || "-"}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href =
      `mailto:${site.contact.email}` +
      `?subject=${encodeURIComponent("Mesaj de pe dialub.ro")}` +
      `&body=${encodeURIComponent(body)}`;
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="border border-black/10 bg-fog p-8 text-center">
        <p className="font-display text-lg font-bold text-ink uppercase">Mulțumim!</p>
        <p className="mt-2 text-sm leading-relaxed text-graphite">
          {state.message ?? "Mesajul a fost trimis. Revenim cât de curând."}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume" name="name" autoComplete="name" />
        <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />
      </div>
      <Field label="E-mail" name="email" type="email" autoComplete="email" required />

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold tracking-[0.1em] text-graphite/60 uppercase"
        >
          Mesaj <span className="text-pakelo-red">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full border border-graphite/20 bg-white px-4 py-3 text-sm text-ink transition outline-none focus:border-pakelo-red"
        />
      </div>

      {/* honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="contact-company">Companie</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="border-l-2 border-pakelo-red bg-pakelo-red/5 px-4 py-3 text-sm text-graphite"
        >
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-xs leading-relaxed text-graphite/50">
        Prin trimiterea formularului ești de acord cu{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          Politica de Confidențialitate
        </Link>
        .
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 bg-pakelo-red px-8 py-3.5 text-sm font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-ink disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Se trimite…" : "Trimite"}
      {!pending && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-4 w-4"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-[0.1em] text-graphite/60 uppercase"
      >
        {label}
        {required && <span className="text-pakelo-red"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full border border-graphite/20 bg-white px-4 py-3 text-sm text-ink transition outline-none focus:border-pakelo-red"
      />
    </div>
  );
}
