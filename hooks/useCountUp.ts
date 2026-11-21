"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Final value to count to */
  target: number;
  /** Duration in ms */
  duration?: number;
  /** Start only once when the element enters the viewport */
  startOnView?: boolean;
};

/**
 * Animates a number from 0 to `target` using requestAnimationFrame.
 * When `startOnView` is true it uses an IntersectionObserver and only
 * triggers once the returned ref element is visible.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>({
  target,
  duration = 2000,
  startOnView = true,
}: Options) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const run = () => {
      if (started.current) return;
      started.current = true;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        setValue(target);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo for a snappy settle
        const eased =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!startOnView) {
      run();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { ref, value };
}
