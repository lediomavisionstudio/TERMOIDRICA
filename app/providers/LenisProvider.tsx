"use client";

// NB: il pacchetto "@studio-freight/lenis" è deprecato ed è stato rinominato
// in "lenis" (stessa libreria). Usiamo quindi l'import corrente.
import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Smooth scrolling app-wide con Lenis.
 * Config: lerp 0.08, duration 1.2, easing esponenziale.
 * Gli anchor "#..." della navbar restano funzionanti (scrollTo di Lenis).
 * Rispetta prefers-reduced-motion.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor links "#..." → smooth scroll via Lenis (offset per la navbar fissa)
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -100 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
