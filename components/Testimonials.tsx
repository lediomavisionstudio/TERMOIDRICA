"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import FadeInSection from "./FadeInSection";
import SectionHeading from "./SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <motion.div
      className="flex gap-1"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          variants={{
            hidden: { scale: 0, rotate: -40, opacity: 0 },
            show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 14 } },
          }}
          className={`h-5 w-5 ${i < rating ? "text-fire-500" : "text-line"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </motion.svg>
      ))}
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="recensioni" className="relative overflow-hidden bg-mist py-14 sm:py-24">
      {/* Virgolette giganti decorative */}
      <span
        className="pointer-events-none absolute -top-10 left-4 select-none font-display text-[22rem] leading-none text-deep-500/5"
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Recensioni"
          title="La fiducia dei nostri clienti"
          subtitle="Le parole di chi ci ha scelto parlano per noi."
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeInSection key={t.name} from="up" distance={40} delay={i * 0.12}>
              <motion.figure
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={{
                  rest: { y: 0, boxShadow: "0 2px 12px -4px rgba(16,32,46,0.12)" },
                  hover: { y: -6, boxShadow: "0 24px 50px -16px rgba(26,58,92,0.28)" },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-7"
              >
                {/* virgoletta accent */}
                <span className="absolute right-6 top-5 font-display text-5xl leading-none text-fire-500/20" aria-hidden>
                  &rdquo;
                </span>
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-700">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <motion.span
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${
                      i % 2 === 0 ? "bg-fire-gradient" : "bg-teal-gradient"
                    }`}
                  >
                    {t.initials}
                  </motion.span>
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-xs text-ink-400">{t.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </FadeInSection>
          ))}
        </div>

        {/* Badge riepilogo rating */}
        <FadeInSection delay={0.2}>
          <div className="mx-auto mt-12 flex w-fit items-center gap-3 rounded-full border border-line bg-white px-6 py-3 shadow-soft">
            <Stars rating={5} />
            <span className="text-sm font-semibold text-ink">5,0 su 5</span>
            <span className="text-sm text-ink-400">· clienti soddisfatti in tutta la {" "}Puglia</span>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
