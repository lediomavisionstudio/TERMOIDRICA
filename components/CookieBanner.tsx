"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cookie banner conforme a GDPR e Provvedimento del Garante Privacy
 * (8 gennaio 2022):
 * - "Accetta tutti" e "Rifiuta tutti" con pari rilievo visivo (no dark pattern)
 * - "Gestisci preferenze" per i cookie di terze parti/statistici
 * - Nessun cookie non tecnico viene caricato prima del consenso
 * - Scelta salvata in localStorage: il banner non riappare
 * - Link a Privacy Policy e Cookie Policy
 */

const STORAGE_KEY = "termoidrica_cookie_consent_v1";

type Consent = { necessary: true; analytics: boolean; ts: number };

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean) {
  const consent: Consent = { necessary: true, analytics, ts: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* storage non disponibile: la scelta vale solo per questa sessione */
  }
  return consent;
}

/** Carica analytics/tracking SOLO dopo consenso esplicito. */
function loadAnalytics() {
  // Evita doppio caricamento
  if ((window as unknown as { __analyticsLoaded?: boolean }).__analyticsLoaded)
    return;
  (window as unknown as { __analyticsLoaded?: boolean }).__analyticsLoaded = true;

  // <!-- INSERT ANALYTICS HERE -->
  // Esempio (Google Analytics 4) — scommenta e inserisci il tuo ID:
  // const s = document.createElement("script");
  // s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  // s.async = true;
  // document.head.appendChild(s);
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){ window.dataLayer.push(arguments); }
  // gtag("js", new Date());
  // gtag("config", "G-XXXXXXXXXX");
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (!consent) {
      setOpen(true); // nessuna scelta ancora: mostra il banner
    } else if (consent.analytics) {
      loadAnalytics(); // consenso già dato in passato
    }
  }, []);

  const decide = (acceptAnalytics: boolean) => {
    saveConsent(acceptAnalytics);
    if (acceptAnalytics) loadAnalytics();
    setOpen(false);
    setManage(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          role="dialog"
          aria-label="Informativa sui cookie"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[900] border-t border-white/10 bg-[#141b26]/98 backdrop-blur-md"
        >
          <div className="container-x py-5 sm:py-6">
            {!manage ? (
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl text-sm leading-relaxed text-white/80">
                  <strong className="font-semibold text-white">Rispettiamo la tua privacy.</strong>{" "}
                  Usiamo cookie tecnici necessari al funzionamento del sito e,
                  solo con il tuo consenso, cookie statistici/di terze parti.
                  Puoi accettarli, rifiutarli o scegliere. Dettagli nella{" "}
                  <a href="/cookie-policy" className="font-medium text-teal-400 underline underline-offset-2 hover:text-teal-300">Cookie Policy</a>{" "}
                  e nella{" "}
                  <a href="/privacy-policy" className="font-medium text-teal-400 underline underline-offset-2 hover:text-teal-300">Privacy Policy</a>.
                </div>

                {/* Pulsanti con pari rilievo visivo (Garante 2022) */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={() => decide(false)}
                    className="order-2 h-12 min-w-[150px] rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/15 sm:order-1"
                  >
                    Rifiuta tutti
                  </button>
                  <button
                    onClick={() => decide(true)}
                    className="order-1 h-12 min-w-[150px] rounded-full bg-teal-gradient px-6 text-sm font-semibold text-white shadow-glow-teal transition-transform hover:-translate-y-0.5 sm:order-2"
                  >
                    Accetta tutti
                  </button>
                  <button
                    onClick={() => setManage(true)}
                    className="order-3 h-12 px-2 text-sm font-medium text-white/60 underline underline-offset-2 transition-colors hover:text-white"
                  >
                    Gestisci preferenze
                  </button>
                </div>
              </div>
            ) : (
              /* Pannello "Gestisci preferenze" */
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-base font-semibold text-white">Preferenze cookie</h2>
                  <p className="mt-1 text-sm text-white/70">
                    Scegli quali categorie attivare. I cookie tecnici sono
                    sempre attivi perché necessari.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Cookie tecnici</div>
                      <div className="text-xs text-white/60">Necessari al funzionamento. Sempre attivi.</div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">Attivi</span>
                  </div>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Cookie statistici / di terze parti</div>
                      <div className="text-xs text-white/60">Es. statistiche di visita, mappe. Opzionali.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-5 w-5 accent-teal-500"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => decide(false)}
                    className="h-11 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Rifiuta tutti
                  </button>
                  <button
                    onClick={() => decide(analytics)}
                    className="h-11 rounded-full bg-teal-gradient px-6 text-sm font-semibold text-white shadow-glow-teal transition-transform hover:-translate-y-0.5"
                  >
                    Salva preferenze
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
