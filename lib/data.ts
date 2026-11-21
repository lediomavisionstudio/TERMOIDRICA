// Central content source for the site. Edit here to update copy sitewide.
// I testi e le foto sono SEGNAPOSTO realistici: sostituiscili con quelli veri.

// URL pubblico del sito (aggiorna quando andrà online con il dominio reale)
export const SITE_URL = "https://www.termoidricags.it";

export const COMPANY = {
  name: "Termoidrica GS",
  owner: "Gerardo Settanni",
  claim: "Impianti idraulici, termici e di climatizzazione",
  region: "Puglia",
  phone: "+39 328 9760 959",
  whatsapp: "+39 328 9760 959",
  email: "Termoidricags@gmail.com",
  piva: "09153170726",
  address: "Via Torre a Mare 26/28, 70016 Noicattaro (BA)",
  hours: "Lun–Sab 8:00–19:00 · Pronto intervento 7/7",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
};

export const NAV_LINKS = [
  { href: "#storia", label: "Chi siamo" },
  { href: "#servizi", label: "Servizi" },
  { href: "#lavori", label: "Lavori" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#contatti", label: "Contatti" },
];

/* ----------------------------- La nostra storia ---------------------------- */

export const STORY = {
  intro:
    "Termoidrica GS nasce dalla passione e dall'esperienza di Gerardo Settanni, con un obiettivo semplice: realizzare impianti affidabili, efficienti e duraturi, trattando ogni casa come se fosse la nostra.",
  body: "Da oltre vent'anni accompagniamo famiglie e aziende della Puglia nella progettazione, installazione e manutenzione dei loro impianti. Crediamo nel lavoro fatto bene, nei materiali di qualità e in un rapporto diretto e onesto con il cliente: niente sorprese, solo soluzioni che funzionano nel tempo.",
};

export type Milestone = { year: string; title: string; text: string };

export const MILESTONES: Milestone[] = [
  {
    year: "2001",
    title: "L'inizio",
    text: "Gerardo avvia l'attività come idraulico, con i primi impianti per le famiglie del territorio.",
  },
  {
    year: "2010",
    title: "La crescita",
    text: "Ci specializziamo in riscaldamento e climatizzazione, ampliando il team e i servizi.",
  },
  {
    year: "2018",
    title: "Efficienza & rinnovabili",
    text: "Pompe di calore, solare termico e soluzioni ad alta efficienza energetica.",
  },
  {
    year: "Oggi",
    title: "Un partner completo",
    text: "Un unico interlocutore per impianti idraulici, termici e di climatizzazione, dalla A alla Z.",
  },
];

export type Value = { title: string; text: string; icon: "shield" | "clock" | "hand" };

export const VALUES: Value[] = [
  {
    title: "Lavoro garantito",
    text: "Materiali certificati e installazioni a regola d'arte, con garanzia sui nostri interventi.",
    icon: "shield",
  },
  {
    title: "Puntualità",
    text: "Rispettiamo i tempi concordati e siamo disponibili 7/7 per le emergenze.",
    icon: "clock",
  },
  {
    title: "Rapporto diretto",
    text: "Parli sempre con noi: preventivi chiari, consigli onesti, nessun costo nascosto.",
    icon: "hand",
  },
];

/* --------------------------------- Servizi -------------------------------- */

export type Service = {
  title: string;
  description: string;
  icon: "drop" | "flame" | "snow" | "wrench" | "leaf" | "shield";
};

export const SERVICES: Service[] = [
  {
    title: "Impianti Idraulici",
    description:
      "Progettazione e realizzazione di impianti idrici per abitazioni e attività, con materiali certificati.",
    icon: "drop",
  },
  {
    title: "Riscaldamento",
    description:
      "Caldaie a condensazione, pompe di calore e impianti a pavimento ad alta efficienza energetica.",
    icon: "flame",
  },
  {
    title: "Climatizzazione",
    description:
      "Installazione e manutenzione di climatizzatori mono e multisplit, canalizzati e VRF.",
    icon: "snow",
  },
  {
    title: "Manutenzione & Pronto Intervento",
    description:
      "Assistenza rapida 7/7, controlli programmati e messa a norma degli impianti esistenti.",
    icon: "wrench",
  },
  {
    title: "Energie Rinnovabili",
    description:
      "Solare termico, fotovoltaico e soluzioni integrate per ridurre consumi ed emissioni.",
    icon: "leaf",
  },
  {
    title: "Messa a Norma & Collaudi",
    description:
      "Certificazioni, libretti di impianto e collaudi a regola d'arte secondo normativa.",
    icon: "shield",
  },
];

/* ---------------------------------- Numeri -------------------------------- */

export type Stat = { value: number; suffix: string; label: string };

export const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Anni di esperienza" },
  { value: 1800, suffix: "+", label: "Clienti soddisfatti" },
  { value: 3200, suffix: "+", label: "Impianti realizzati" },
  { value: 7, suffix: "/7", label: "Pronto intervento" },
];

/* ---------------------------- Lavori / Gallery ---------------------------- */

export type Project = {
  title: string;
  category: "Idraulica" | "Riscaldamento" | "Climatizzazione";
  image: string;
};

export const GALLERY: Project[] = [
  {
    title: "Impianto radiante a pavimento",
    category: "Riscaldamento",
    image: "/lavori/radiante-pavimento.jpg",
  },
  {
    title: "Centrale termica condominiale",
    category: "Riscaldamento",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Climatizzazione uffici",
    category: "Climatizzazione",
    image: "/lavori/climatizzazione-uffici.jpg",
  },
  {
    title: "Rifacimento bagno completo",
    category: "Idraulica",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Pompa di calore esterna",
    category: "Climatizzazione",
    image: "/lavori/pompa-di-calore.jpg",
  },
  {
    title: "Nuovo impianto idrico",
    category: "Idraulica",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=70",
  },
];

export const GALLERY_CATEGORIES = [
  "Tutti",
  "Idraulica",
  "Riscaldamento",
  "Climatizzazione",
] as const;

/* -------------------------------- Recensioni ------------------------------ */

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marco R.",
    role: "Bari",
    text: "Lavoro impeccabile e puntuale. Hanno rifatto tutto l'impianto di riscaldamento con grande attenzione ai dettagli.",
    rating: 5,
    initials: "MR",
  },
  {
    name: "Giulia F.",
    role: "Amministratore di condominio",
    text: "Professionalità e trasparenza sui costi. Rispettano i tempi e comunicano sempre con chiarezza.",
    rating: 5,
    initials: "GF",
  },
  {
    name: "Antonio L.",
    role: "Ristoratore",
    text: "Climatizzazione del locale perfetta e assistenza rapidissima quando serve. Consigliatissimi.",
    rating: 5,
    initials: "AL",
  },
];
