import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: `Cookie Policy — ${COMPANY.name}`,
  description:
    "Informativa sull'uso dei cookie e delle tecnologie di tracciamento del sito.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="21 novembre 2026">
      <p>
        La presente Cookie Policy illustra l&apos;uso dei cookie e delle
        tecnologie similari sul sito di{" "}
        <strong>{COMPANY.name} di {COMPANY.owner}</strong>, in conformità al
        Regolamento (UE) 2016/679 e alle Linee guida del Garante per la
        protezione dei dati personali.
      </p>

      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati inviano al
        dispositivo dell&apos;utente, dove vengono memorizzati per essere poi
        ritrasmessi agli stessi siti alla visita successiva. Possono essere
        utilizzati per il funzionamento del sito, per ricordare le preferenze o
        per finalità statistiche.
      </p>

      <h2>2. Cookie utilizzati da questo sito</h2>

      <h3>Cookie tecnici (necessari)</h3>
      <p>
        Il sito utilizza esclusivamente cookie tecnici e di sessione,
        indispensabili per il corretto funzionamento e la sicurezza delle
        pagine. Per questi cookie <strong>non è richiesto il consenso</strong>
        {" "}dell&apos;utente, come previsto dalla normativa vigente.
      </p>

      <h3>Cookie di terze parti</h3>
      <p>
        Alcune pagine possono incorporare contenuti forniti da terze parti —
        in particolare il <strong>servizio di mappe</strong> utilizzato per
        mostrare la posizione della sede — che potrebbero installare propri
        cookie. Tali cookie sono gestiti direttamente dai rispettivi fornitori,
        secondo le loro informative privacy. Il sito{" "}
        <strong>non utilizza cookie di profilazione né di marketing</strong> e
        non effettua tracciamento pubblicitario degli utenti.
      </p>

      <h2>3. Gestione dei cookie dal browser</h2>
      <p>
        L&apos;utente può gestire, limitare o disabilitare i cookie
        direttamente dalle impostazioni del proprio browser. Di seguito le
        guide ufficiali:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a>
        </li>
        <li>
          <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a>
        </li>
        <li>
          <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>
        </li>
        <li>
          <a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a>
        </li>
      </ul>
      <p>
        La disabilitazione dei cookie tecnici potrebbe compromettere alcune
        funzionalità del sito.
      </p>

      <h2>4. Titolare del trattamento</h2>
      <p>
        Il Titolare è <strong>{COMPANY.name} di {COMPANY.owner}</strong>, con
        sede in {COMPANY.address}, P.IVA {COMPANY.piva}. Per maggiori
        informazioni consulta la nostra{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
