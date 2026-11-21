import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: `Privacy Policy — ${COMPANY.name}`,
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const mail = COMPANY.email;
  return (
    <LegalPage title="Privacy Policy" updated="21 novembre 2026">
      <p>
        La presente informativa descrive le modalità di trattamento dei dati
        personali degli utenti che consultano il sito e utilizzano i servizi
        offerti da <strong>{COMPANY.name} di {COMPANY.owner}</strong>, ai sensi
        del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;) e del D.Lgs.
        196/2003 come modificato dal D.Lgs. 101/2018.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Il Titolare del trattamento è{" "}
        <strong>{COMPANY.name} di {COMPANY.owner}</strong>.
      </p>
      <ul>
        <li>Sede: {COMPANY.address}</li>
        <li>Partita IVA: {COMPANY.piva}</li>
        <li>
          Email: <a href={`mailto:${mail}`}>{mail}</a>
        </li>
        <li>
          Telefono:{" "}
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a>
        </li>
      </ul>

      <h2>2. Tipologie di dati raccolti</h2>
      <p>Il sito raccoglie le seguenti categorie di dati personali:</p>
      <ul>
        <li>
          <strong>Dati forniti volontariamente</strong> tramite il modulo di
          richiesta preventivo: nome e cognome, numero di telefono, indirizzo
          email, tipologia di servizio di interesse ed eventuali informazioni
          contenute nel messaggio.
        </li>
        <li>
          <strong>Dati di navigazione</strong>: indirizzi IP, tipo di browser,
          sistema operativo, data e orario di accesso, raccolti automaticamente
          dai sistemi informatici per il funzionamento e la sicurezza del sito.
        </li>
      </ul>

      <h2>3. Finalità e base giuridica del trattamento</h2>
      <ul>
        <li>
          Rispondere alle richieste di preventivo o di contatto e fornire i
          servizi richiesti — base giuridica: esecuzione di misure
          precontrattuali e contrattuali (art. 6.1.b GDPR).
        </li>
        <li>
          Garantire il corretto funzionamento, la sicurezza e la manutenzione
          del sito — base giuridica: legittimo interesse del Titolare (art.
          6.1.f GDPR).
        </li>
        <li>
          Adempiere a obblighi di legge, contabili e fiscali — base giuridica:
          obbligo legale (art. 6.1.c GDPR).
        </li>
      </ul>

      <h2>4. Modalità di trattamento</h2>
      <p>
        I dati sono trattati con strumenti informatici e telematici, con
        misure di sicurezza adeguate a garantirne la riservatezza e a
        prevenire accessi non autorizzati, perdita o distruzione. Il
        trattamento è effettuato dal Titolare e da soggetti autorizzati.
      </p>

      <h2>5. Destinatari dei dati</h2>
      <p>
        I dati non sono diffusi né ceduti a terzi per finalità di marketing.
        Possono essere trattati da fornitori di servizi tecnici che agiscono in
        qualità di Responsabili del trattamento, tra cui:
      </p>
      <ul>
        <li>fornitore di hosting e distribuzione del sito (infrastruttura cloud);</li>
        <li>
          fornitore del servizio di invio delle email generate dal modulo di
          contatto;
        </li>
        <li>
          servizio di mappe utilizzato per mostrare la posizione della sede.
        </li>
      </ul>

      <h2>6. Trasferimento dei dati extra-UE</h2>
      <p>
        Alcuni fornitori potrebbero trattare i dati su server situati fuori
        dall&apos;Unione Europea. In tali casi il trasferimento avviene nel
        rispetto degli artt. 44 e seguenti del GDPR, mediante garanzie adeguate
        quali le Clausole Contrattuali Standard approvate dalla Commissione
        Europea.
      </p>

      <h2>7. Periodo di conservazione</h2>
      <p>
        I dati forniti tramite il modulo di contatto sono conservati per il
        tempo necessario a gestire la richiesta e, in caso di avvio di un
        rapporto contrattuale, per il periodo previsto dagli obblighi di legge
        (di norma 10 anni per i documenti contabili e fiscali). I dati di
        navigazione sono conservati per il tempo strettamente necessario.
      </p>

      <h2>8. Diritti dell&apos;interessato</h2>
      <p>
        In qualità di interessato, ai sensi degli artt. 15–22 del GDPR, hai
        diritto di:
      </p>
      <ul>
        <li>accedere ai tuoi dati personali e ottenerne copia;</li>
        <li>chiederne la rettifica o l&apos;aggiornamento;</li>
        <li>chiederne la cancellazione (&ldquo;diritto all&apos;oblio&rdquo;);</li>
        <li>limitare od opporti al trattamento;</li>
        <li>richiedere la portabilità dei dati;</li>
        <li>
          revocare il consenso in qualsiasi momento, senza pregiudicare la
          liceità del trattamento effettuato prima della revoca.
        </li>
      </ul>

      <h2>9. Come esercitare i diritti e reclami</h2>
      <p>
        Puoi esercitare i tuoi diritti scrivendo a{" "}
        <a href={`mailto:${mail}`}>{mail}</a>. Hai inoltre il diritto di
        proporre reclamo all&apos;Autorità Garante per la protezione dei dati
        personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
      </p>

      <h2>10. Modifiche alla presente informativa</h2>
      <p>
        Il Titolare si riserva di aggiornare la presente informativa. Le
        eventuali modifiche saranno pubblicate su questa pagina con la relativa
        data di aggiornamento.
      </p>
    </LegalPage>
  );
}
