"use client";

import { motion } from "framer-motion";
import { STATS, type Stat } from "@/lib/data";
import { useCountUp } from "@/hooks/useCountUp";

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp<HTMLDivElement>({
    target: stat.value,
    duration: 2000,
  });
  const accent = index % 2 === 0 ? "text-teal-400" : "text-fire-500";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative text-center"
    >
      <div className="font-number text-5xl font-bold tracking-tight text-white sm:text-6xl">
        <span className="tabular-nums">{value.toLocaleString("it-IT")}</span>
        <span className={accent}>{stat.suffix}</span>
      </div>
      <p className="mt-3 text-sm font-medium uppercase tracking-wider text-white/60">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="numeri" className="relative bg-night-gradient">
      {/* Wave divider top (dal bianco/About) */}
      <div className="absolute inset-x-0 top-0 -translate-y-px leading-[0]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-[50px] w-full sm:h-[70px]" aria-hidden>
          <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,10 1440,40 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Pattern isometrico sottile (tubi/griglia) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(30deg, #00D4AA 1px, transparent 1px), linear-gradient(-30deg, #00D4AA 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      {/* Bagliori */}
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-fire-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-teal-500/15 blur-[100px]" />

      <div className="container-x relative py-24 sm:py-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      {/* Wave divider bottom (verso Services/mist) */}
      <div className="absolute inset-x-0 bottom-0 translate-y-px leading-[0]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-[50px] w-full sm:h-[70px]" aria-hidden>
          <path d="M0,40 C240,0 480,80 720,50 C960,20 1200,70 1440,40 L1440,80 L0,80 Z" fill="#f0f4f8" />
        </svg>
      </div>
    </section>
  );
}
