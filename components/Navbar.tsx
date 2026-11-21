"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import Logo from "./Logo";
import { COMPANY, NAV_LINKS } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > prev && y > 120 && !open);
  });

  const phoneHref = `tel:${COMPANY.phone.replace(/\s/g, "")}`;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className={`fixed inset-x-0 top-0 z-[500] transition-all duration-500 ${
        scrolled || open
          ? "glass-dark border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[100px] items-center justify-between">
        <motion.a
          href="#top"
          aria-label={`${COMPANY.name} — home`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Logo navbar className="h-[76px] w-auto md:h-[88px]" />
        </motion.a>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link, i) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                className="relative"
              >
                <a
                  href={link.href}
                  className={`nav-underline relative py-1.5 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-teal-400"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-teal-400"
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="hidden items-center gap-5 lg:flex"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-teal-400"
          >
            <svg className="h-4 w-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M4 5c0 8 7 15 15 15l2-4-5-2-2 2a12 12 0 0 1-6-6l2-2-2-5-4 2Z" strokeLinejoin="round" />
            </svg>
            {COMPANY.phone}
          </a>
          <a href="#contatti" className="btn-fire !px-6 !py-3 text-sm">
            Preventivo gratuito
          </a>
        </motion.div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className="relative z-[600] flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="relative flex h-5 w-6 flex-col justify-between">
            <motion.span className="block h-0.5 w-full rounded-full bg-white" animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="block h-0.5 w-full rounded-full bg-white" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block h-0.5 w-full rounded-full bg-white" animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-teal-400"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-3 flex flex-col gap-3 px-3">
                <a href={phoneHref} className="btn-ghost-light w-full">
                  Chiama {COMPANY.phone}
                </a>
                <a href="#contatti" onClick={() => setOpen(false)} className="btn-fire w-full">
                  Preventivo gratuito
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
