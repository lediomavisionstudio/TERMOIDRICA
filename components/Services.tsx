"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { SERVICES, type Service } from "@/lib/data";
import ServiceIcon from "./ServiceIcon";
import SectionHeading from "./SectionHeading";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Accent diverso per ogni servizio (fire / teal / deep a rotazione)
const ACCENTS = [
  { bar: "bg-fire-gradient", ring: "group-hover:bg-fire-500 text-fire-600 bg-fire-50", glow: "group-hover:shadow-glow-fire", link: "text-fire-600" },
  { bar: "bg-teal-gradient", ring: "group-hover:bg-teal-500 text-teal-600 bg-teal-50", glow: "group-hover:shadow-glow-teal", link: "text-teal-600" },
  { bar: "bg-gradient-to-r from-deep-500 to-deep-400", ring: "group-hover:bg-deep-500 text-deep-500 bg-brand-50", glow: "", link: "text-deep-500" },
];

function TiltCard({ service, accent }: { service: Service; accent: (typeof ACCENTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 250, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      variants={item}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow duration-300 hover:border-transparent ${accent.glow}`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${accent.bar}`} />
      <div style={{ transform: "translateZ(40px)" }} className="[transform-style:preserve-3d]">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:text-white ${accent.ring}`}>
          <ServiceIcon name={service.icon} className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-xl text-ink">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">
          {service.description}
        </p>
        <a
          href="#contatti"
          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 ${accent.link}`}
        >
          Richiedi informazioni
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="servizi" className="relative bg-mist py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Cosa facciamo"
          title="Servizi su misura per ogni esigenza"
          subtitle="Dalla progettazione alla manutenzione, un unico partner per impianti efficienti e a norma."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} service={service} accent={ACCENTS[i % ACCENTS.length]} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
