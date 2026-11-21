"use client";

// NB: il pacchetto "@studio-freight/lenis" è deprecato ed è stato rinominato
// in "lenis" (stessa libreria). Usiamo quindi l'import corrente.
import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Smooth scrolling con Lenis SOLO su desktop con mouse.
 * Su mobile/touch lo smooth scroll viene DISATTIVATO: lo scroll nativo del
 * telefono è più fluido e non lagga (Lenis gira un RAF continuo e intercetta
 * il touch). Gli anchor "#..." restano fluidi anche su mobile via scroll nativo.
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

    // Lenis solo su schermi grandi con puntatore fine (desktop/mouse).
    const isDesktop =
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(pointer: fine)").matches;

    // Offset per la navbar fissa (72px mobile, 100px desktop)
    const navOffset = window.matchMedia("(min-width: 1024px)").matches ? 100 : 72;

    // --- Mobile / touch / reduced motion: niente Lenis, solo anchor nativi ---
    if (prefersReduced || !isDesktop) {
      const onClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
          'a[href^="#"]'
        );
        if (!target) return;
        const id = target.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id) as HTMLElement | null;
        if (!el) return;
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top, behavior: "smooth" });
      };
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }

    // --- Desktop: Lenis smooth scroll ---
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
      lenis.scrollTo(el as HTMLElement, { offset: -navOffset });
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
