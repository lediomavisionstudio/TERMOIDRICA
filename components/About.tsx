"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY, STORY, MILESTONES, VALUES, type Value } from "@/lib/data";
import FadeInSection from "./FadeInSection";
import SectionHeading from "./SectionHeading";

function ValueIcon({ name }: { name: Value["icon"] }) {
  const c = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "shield")
    return (
      <svg {...c}>
        <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  if (name === "clock")
    return (
      <svg {...c}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  return (
    <svg {...c}>
      <path d="M8 13V5a2 2 0 1 1 4 0v6m0-1a2 2 0 1 1 4 0v2m0-1a2 2 0 1 1 4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L5 15a2 2 0 1 1 3-2" />
    </svg>
  );
}

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  // Light parallax on the story image (-20px -> +20px)
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="storia" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image side */}
          <FadeInSection from="right">
            <div className="relative">
              <div
                ref={imageRef}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-brand-100 shadow-card"
              >
                <motion.div style={{ y: imageY }} className="absolute -inset-6">
                  <Image
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1100&q=75"
                    alt="Stretta di mano: fiducia e professionalità Termoidrica GS"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              {/* Badge Fondatore in alto a sinistra sull'immagine */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-night-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                Dal 2001
              </div>
              <div className="absolute -bottom-6 right-6 rounded-2xl bg-fire-gradient px-6 py-5 text-white shadow-glow-fire">
                <div className="font-number text-4xl font-bold leading-none">20+</div>
                <div className="mt-1 text-sm text-white/90">anni al tuo fianco</div>
              </div>
            </div>
          </FadeInSection>

          {/* Text side */}
          <div>
            <SectionHeading
              eyebrow="Chi siamo"
              title="La nostra storia"
              from="left"
            />
            <FadeInSection from="left" delay={0.1}>
              <p className="mt-6 text-lg font-medium text-ink-700">
                {STORY.intro}
              </p>
              <p className="mt-4 leading-relaxed text-ink-500">{STORY.body}</p>

              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-mist p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-fire-600 shadow-soft">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M4 20c0-4 3-6 8-6s8 2 8 6" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </span>
                <div>
                  <div className="font-display text-lg font-semibold text-ink">
                    {COMPANY.owner}
                  </div>
                  <div className="text-sm text-ink-400">Titolare & fondatore</div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <FadeInSection>
            <span className="section-eyebrow">Il nostro percorso</span>
          </FadeInSection>

          <div className="relative mt-10">
            {/* Linea orizzontale che si disegna allo scroll (desktop) */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute left-0 top-5 hidden h-0.5 w-full origin-left bg-gradient-to-r from-fire-500 via-teal-500 to-deep-400 lg:block"
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map((m, i) => (
                <FadeInSection key={m.year} delay={i * 0.1}>
                  <div className="relative">
                    {/* Nodo */}
                    <span className="mb-5 hidden h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-fire-gradient text-xs font-bold text-white shadow-glow-fire lg:flex">
                      {i + 1}
                    </span>
                    <div className="relative h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                      <div className="font-number text-3xl font-bold text-fire-600">
                        {m.year}
                      </div>
                      <h3 className="mt-2 text-lg text-ink">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">
                        {m.text}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <FadeInSection key={v.title} delay={i * 0.08}>
              <div className="flex h-full items-start gap-4 rounded-2xl bg-mist p-6 transition-colors duration-300 hover:bg-white hover:shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-gradient text-white shadow-glow-teal">
                  <ValueIcon name={v.icon} />
                </span>
                <div>
                  <h3 className="text-lg text-ink">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {v.text}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
