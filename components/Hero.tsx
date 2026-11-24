"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY } from "@/lib/data";

const POINTS = [
  {
    label: "Preventivo gratuito e senza impegno",
    icon: (
      <path d="M9 11.5 11 13.5 15.5 9M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
    color: "text-teal-400 bg-teal-500/15",
  },
  {
    label: "Pronto intervento 7 giorni su 7",
    icon: (
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
    color: "text-fire-500 bg-fire-500/15",
  },
  {
    label: "Materiali certificati e lavoro garantito",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z M9.5 11.5 11.5 13.5 15 10" strokeLinecap="round" strokeLinejoin="round" />
    ),
    color: "text-teal-400 bg-teal-500/15",
  },
];

const TITLE_WORDS = ["Il", "benessere", "della", "tua", "casa,"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const wordUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: lo sfondo scorre più lento del contenuto
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  // Il parallax (trasformazioni legate allo scroll) è costoso su mobile e causa
  // lag: lo attiviamo solo da desktop (>=768px). Su mobile l'hero resta statico.
  const [parallax, setParallax] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-0 items-start overflow-hidden bg-night-900 py-32 pt-[72px] sm:py-40 lg:py-48 lg:pt-[100px]"
    >
      {/* Sfondo con parallax (solo desktop) */}
      <motion.div
        style={parallax ? { y: bgY, scale: bgScale } : undefined}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=70"
          alt="Tecnico Termoidrica GS al lavoro"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Overlay: scuro a sinistra + gradiente dal basso (night) verso trasparente */}
      <div className="absolute inset-0 bg-gradient-to-r from-night-900/92 via-night-900/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/15 to-transparent" />
      {/* Bagliore caldo (blur pesante: nascosto su mobile per performance) */}
      <div className="pointer-events-none absolute -bottom-32 -right-24 hidden h-96 w-96 rounded-full bg-fire-500/20 blur-[120px] sm:block" />
      <div className="pointer-events-none absolute top-24 right-1/3 hidden h-80 w-80 rounded-full bg-teal-500/10 blur-[120px] sm:block" />

      {/* Contenuto */}
      <div className="container-x relative z-10 py-8 sm:py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Titolo con reveal parola per parola */}
          <h1 className="font-display text-[2.2rem] font-semibold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="flex flex-wrap gap-x-4">
              {TITLE_WORDS.map((w, i) => (
                <span key={i} className="overflow-hidden py-0.5">
                  <motion.span variants={wordUp} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="mt-1 block overflow-hidden">
              <motion.span
                variants={wordUp}
                className="inline-block bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent"
              >
                impianti che durano
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={wordUp}
            className="mt-6 max-w-2xl text-sm font-sans normal-case leading-relaxed text-white/75 sm:mt-8 sm:text-base"
          >
            {COMPANY.name} di {COMPANY.owner} realizza impianti idraulici,
            termici e di climatizzazione per privati e aziende in tutta la{" "}
            {COMPANY.region}. Affidabilità, efficienza e assistenza continua.
          </motion.p>

          {/* Bullet points con icone custom */}
          <motion.ul variants={wordUp} className="mt-8 space-y-4 sm:mt-10">
            {POINTS.map((p) => (
              <li key={p.label} className="flex items-center gap-3.5 text-white/90">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${p.color}`}>
                  <svg className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
                    {p.icon}
                  </svg>
                </span>
                <span className="text-sm font-medium">{p.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#storia"
        aria-label="Scorri verso il basso"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Scopri</span>
        <span className="flex h-9 w-5.5 justify-center rounded-full border border-white/40 p-1" style={{ width: 22 }}>
          <span className="h-2 w-1 animate-bounce-down rounded-full bg-white/80" />
        </span>
      </motion.a>
    </section>
  );
}
