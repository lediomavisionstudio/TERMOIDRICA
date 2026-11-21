"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COMPANY } from "@/lib/data";
import FadeInSection from "./FadeInSection";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";

export default function CTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Invia la richiesta alla API route /api/preventivo (Resend).
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const payload = {
      nome: String(form.get("name") ?? ""),
      telefono: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      servizio: String(form.get("service") ?? ""),
      messaggio: String(form.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/preventivo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ ok: false }));

      if (res.ok && data.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg(
          data?.error ||
            "Invio non riuscito. Riprova o contattaci al telefono."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Problema di connessione. Riprova più tardi.");
    }
  };

  return (
    <section id="contatti" className="relative py-14 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contatti"
          title="Richiedi il tuo preventivo gratuito"
          subtitle="Raccontaci di cosa hai bisogno: ti ricontattiamo entro 24 ore, senza impegno."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info + map */}
          <FadeInSection>
            <div className="flex h-full flex-col gap-5">
              <div className="space-y-4 rounded-2xl border border-line bg-white p-7 shadow-soft">
                <ContactRow label="Telefono" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} icon="phone" />
                <ContactRow label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} icon="mail" />
                <ContactRow label="WhatsApp" value={COMPANY.whatsapp} href={`https://wa.me/${COMPANY.whatsapp.replace(/[^\d]/g, "")}`} icon="chat" />
                <ContactRow label="Sede" value={COMPANY.address} icon="pin" />
                <ContactRow label="Orari" value={COMPANY.hours} icon="clock" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
                <iframe
                  title="Mappa Termoidrica GS"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=16.975%2C41.025%2C17.015%2C41.048&layer=mapnik&marker=41.0355%2C16.9930"
                  className="h-56 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeInSection>

          {/* Form */}
          <FadeInSection delay={0.1}>
            <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-white p-10 text-center shadow-soft"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-gradient text-white shadow-glow-teal"
                >
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
                <h3 className="mt-5 text-xl text-ink">Richiesta inviata!</h3>
                <p className="mt-2 text-sm text-ink-500">
                  Grazie, ti ricontattiamo entro 24 ore. Per urgenze puoi
                  chiamarci allo {COMPANY.phone}.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-8"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Nome e cognome" name="name" required />
                  <Field label="Telefono" name="phone" type="tel" required />
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" />
                  <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      Servizio
                    </label>
                    <select
                      name="service"
                      className="w-full border-0 border-b-2 border-line bg-transparent px-1 pb-2 pt-1 text-sm text-ink outline-none transition-colors focus:border-fire-500"
                      defaultValue=""
                    >
                      <option value="" disabled>Seleziona…</option>
                      <option>Impianti idraulici</option>
                      <option>Riscaldamento</option>
                      <option>Climatizzazione</option>
                      <option>Manutenzione / Pronto intervento</option>
                      <option>Energie rinnovabili</option>
                      <option>Altro</option>
                    </select>
                  </div>
                </div>
                <div className="group relative mt-8">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder=" "
                    className="peer w-full resize-none border-0 border-b-2 border-line bg-transparent px-1 pb-2 pt-5 text-sm text-ink outline-none transition-colors focus:border-fire-500"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-1 top-4 text-sm text-ink-400 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-fire-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-ink-400"
                  >
                    Messaggio
                  </label>
                </div>
                {status === "error" && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMsg}
                  </p>
                )}
                <button type="submit" disabled={status === "sending"} className="btn-fire mt-8 w-full disabled:opacity-60">
                  {status === "sending" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      Invio…
                    </>
                  ) : (
                    <>
                      Invia richiesta
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ink-400">
                  <svg className="h-3.5 w-3.5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" strokeLinejoin="round" />
                  </svg>
                  I tuoi dati sono al sicuro. Nessuno spam, ti ricontattiamo noi.
                </p>
              </motion.form>
            )}
            </AnimatePresence>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: "phone" | "mail" | "chat" | "pin" | "clock";
}) {
  const paths: Record<string, string> = {
    phone: "M4 5c0 8 7 15 15 15l2-4-5-2-2 2a12 12 0 0 1-6-6l2-2-2-5-4 2Z",
    mail: "M3 7l9 6 9-6M3 6h18v12H3z",
    chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5.2A8 8 0 1 1 21 12Z",
    pin: "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  };
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-gradient text-white shadow-glow-teal">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d={paths[icon]} />
        </svg>
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
          {label}
        </span>
        <span className="block text-sm font-medium text-ink">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-3">{inner}</div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  // Floating label: il placeholder " " attiva lo stato :placeholder-shown
  return (
    <div className="group relative">
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder=" "
        className="peer w-full border-0 border-b-2 border-line bg-transparent px-1 pb-2 pt-5 text-sm text-ink outline-none transition-colors focus:border-fire-500"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-1 top-4 text-sm text-ink-400 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-fire-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-ink-400"
      >
        {label}
      </label>
    </div>
  );
}
