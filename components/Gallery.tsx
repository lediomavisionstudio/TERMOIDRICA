"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY, GALLERY_CATEGORIES } from "@/lib/data";
import SectionHeading from "./SectionHeading";

// Varied aspect ratios cycled per item to create the masonry rhythm.
const RATIOS = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[3/2]",
  "aspect-[5/4]",
];

export default function Gallery() {
  const [active, setActive] =
    useState<(typeof GALLERY_CATEGORIES)[number]>("Tutti");
  // lightbox index refers to the CURRENT filtered list (`items`)
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () =>
      active === "Tutti" ? GALLERY : GALLERY.filter((p) => p.category === active),
    [active]
  );

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + items.length) % items.length
      ),
    [items.length]
  );

  // Keyboard navigation while the lightbox is open
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
    <section id="lavori" className="relative py-14 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="I nostri lavori"
          title="Foto dei lavori realizzati"
          subtitle="Alcuni degli impianti che abbiamo progettato e installato. Clicca su una foto per ingrandirla."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-3">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActive(cat);
                setLightbox(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                active === cat
                  ? "bg-fire-gradient text-white shadow-glow-fire"
                  : "border border-line text-ink-500 hover:border-fire-300 hover:text-fire-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry via CSS columns */}
        <div className="mt-10 columns-2 gap-5 md:columns-3">
          {items.map((project, i) => (
            <motion.button
              key={`${active}-${project.title}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => setLightbox(i)}
              className={`group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line shadow-soft ${
                RATIOS[i % RATIOS.length]
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {project.title}
                </h3>
              </div>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-fire-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[800] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Chiudi"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>

            {/* Prev */}
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

            {/* Next */}
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

            {/* Image */}
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
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
                  <span className="text-xs uppercase tracking-wider text-teal-400">
                    {current.category}
                  </span>
                  <h3 className="mt-1 text-xl text-white">{current.title}</h3>
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
