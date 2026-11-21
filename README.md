# Termoidrica — Sito Vetrina

Sito vetrina professionale per **Termoidrica**, azienda pugliese di impianti idraulici, termici e di climatizzazione.
Stile *dark luxury industrial* con scena 3D, animazioni e cursore custom.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system con palette navy / electric blue / amber)
- **Framer Motion** — reveal on scroll, counter, tilt, transizioni, carousel
- **GSAP** — reveal del titolo hero (split in parole, stagger)
- **React Three Fiber / drei / postprocessing** — scena 3D dell'hero (pipe, particelle, bloom)

## Avvio

```bash
npm install
npm run dev
```

Apri http://localhost:3000

Altri comandi:

```bash
npm run build   # build di produzione
npm run start   # avvia la build
```

## Struttura

```
app/
  layout.tsx        # font, metadata, splash + cursore globali
  template.tsx      # transizione di pagina (Framer Motion)
  page.tsx          # composizione delle sezioni
  globals.css       # stili base, design tokens, cursore
components/
  Navbar.tsx        # navbar glass, hide-on-scroll
  Hero.tsx          # hero + reveal GSAP + 3D lazy / fallback mobile
  HeroScene.tsx     # scena R3F: TubeGeometry, Sparkles, InstancedMesh, Bloom
  Services.tsx      # 6 card glassmorphism + tilt 3D
  Stats.tsx         # counter animati on-scroll
  Process.tsx       # timeline orizzontale
  Gallery.tsx       # masonry + filtri + lightbox
  Testimonials.tsx  # carousel con stelle animate
  CTA.tsx           # form preventivo + gradient animato
  Footer.tsx        # link, social, P.IVA, mappa
  CustomCursor.tsx  # cursore custom con lerp + blend difference
  SplashScreen.tsx  # splash logo in dissolvenza
  ...
hooks/
  useCountUp.ts     # counter con IntersectionObserver
  useCardTilt.ts    # tilt 3D su hover
  useScrollDirection.ts
lib/
  data.ts           # TUTTI i contenuti (servizi, numeri, lavori, recensioni, contatti)
```

## Personalizzazione

- **Contenuti e contatti**: modifica `lib/data.ts` (telefono, email, P.IVA, indirizzo, servizi, recensioni…).
- **Colori**: `tailwind.config.ts` → `colors`.
- **Immagini galleria**: ora usano Unsplash come placeholder. Sostituisci gli URL in `GALLERY` con le foto reali dei lavori (anche file locali in `/public`).
- **Mappa**: nel `Footer` c'è un embed OpenStreetMap generico su Bari — aggiorna le coordinate (`bbox`) o incolla un embed di Google Maps.
- **Form preventivo**: ora apre il client email (`mailto`). Per invii reali, collega una API route o un servizio tipo Formspree/Resend in `components/CTA.tsx`.

## Note tecniche

- La scena 3D è caricata con `dynamic(..., { ssr: false })` e **disattivata sotto 768px** (fallback gradient CSS) per performance.
- GSAP SplitText ufficiale è un plugin Club GreenSock: qui lo split è fatto a mano (per parola) per evitare dipendenze a pagamento, mantenendo lo stesso effetto.
- Rispetta `prefers-reduced-motion`.
