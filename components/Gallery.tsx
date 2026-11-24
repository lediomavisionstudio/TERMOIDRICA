"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY, GALLERY_CATEGORIES } from "@/lib/data";
import FadeInSection from "./FadeInSection";

// Grid bento asimmetrica: ogni posizione (mod 6) ha span diversi.
// grid-auto-flow:dense riempie gli spazi quando i filtri riducono gli elementi.
const SPANS = [
  "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2", // 0 — tile di apertura
  "col-span-2 lg:col-span-2", // 1 — wide
  "col-span-1", // 2
  "col-span-1", // 3
  "col-span-2 lg:col-span-2", // 4 — wide
  "col-span-2 lg:col-span-2 lg:row-span-2", // 5 — alta a destra
];

export default function Gallery() {
  const [active, setActive] =
    useState<(typeof GALLERY_CATEGORIES)[number]>("Tutti");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () =>
      active === "Tutti" ? GALLERY : GALLERY.filter((p) => p.category === active),
    [active]
  );

  // conteggio per categoria (info utile nei tab)
  const counts = useMemo(() => {
    const c: Record<string, number> = { Tutti: GALLERY.length };
    for (const p of GALLERY) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, go, close]);

  const current = lightbox !== null ? items[lightbox] : null;

  return (
    <section id="lavori" className="relative overflow-hidden bg-night-900 py-16 sm:py-24">
      {/* bagliore ambientale (desktop) */}
      <div className="pointer-events-none absolute right-0 top-1/4 hidden h-80 w-80 rounded-full bg-fire-500/10 blur-[120px] sm:block" />

      <div className="container-x relative">
        {/* Intestazione (su scuro) */}
        <FadeInSection className="max-w-2xl">
          <span className="section-eyebrow">I nostri lavori</span>
          <h2 className="mt-4 font-display text-3xl uppercase leading-[1.05] text-white sm:text-4xl md:text-[2.75rem]">
            Impianti realizzati, a regola d&apos;arte
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">
            Alcuni lavori che abbiamo progettato e installato in Puglia. Tocca
            una foto per ingrandirla.
          </p>
        </FadeInSection>

        {/* Tab filtro definite, con conteggio */}
        <div className="mt-9 flex flex-wrap gap-2.5">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat);
                  setLightbox(null);
                }}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-fire-gradient text-white shadow-glow-fire"
                    : "border border-white/15 bg-white/[0.03] text-white/70 hover:border-fire-400/60 hover:text-white"
                }`}
              >
                {cat}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none ${
                    isActive ? "bg-white/25 text-white" : "bg-white/10 text-white/60"
                  }`}
                >
                  {counts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid bento asimmetrica */}
        <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[190px] sm:gap-4 lg:grid-cols-4">
          {items.map((project, i) => {
            const span = SPANS[i % SPANS.length];
            const feature = span.includes("row-span-2");
            return (
              <motion.button
                key={`${active}-${project.title}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${span}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                {/* scrim permanente: titolo e categoria sempre leggibili */}
                <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                {/* barra fire che entra in hover */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-fire-gradient transition-transform duration-300 group-hover:scale-x-100" />
                {/* contenuto in basso (sempre visibile) */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-400">
                    {project.category}
                  </span>
                  <h3
                    className={`mt-1 font-display uppercase leading-tight text-white ${
                      feature ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
                {/* icona lente in hover */}
                <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/95 text-night-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox (invariato) */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[800] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
          >
            <button
              onClick={close}
              aria-label="Chiudi"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Foto precedente"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-white sm:left-8"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Foto successiva"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-white sm:right-8"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-2xl"
              >
                <Image src={current.image} alt={current.title} fill sizes="90vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
                  <span className="text-xs uppercase tracking-wider text-teal-400">
                    {current.category}
                  </span>
                  <h3 className="mt-1 font-display text-xl uppercase text-white">{current.title}</h3>
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
                  {(lightbox ?? 0) + 1} / {items.length}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
