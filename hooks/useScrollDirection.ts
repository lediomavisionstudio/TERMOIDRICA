"use client";

import { useEffect, useState } from "react";

type ScrollState = {
  /** Current scroll direction */
  direction: "up" | "down";
  /** Whether the page is scrolled past `threshold` px */
  scrolled: boolean;
};

/**
 * Tracks scroll direction and whether the page is scrolled.
 * Used by the Navbar to hide on scroll-down / show on scroll-up.
 */
export function useScrollDirection(
  hideAfter = 80,
  scrolledAfter = 20
): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    scrolled: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY && y > hideAfter;
      const goingUp = y < lastY;

      setState((prev) => {
        const direction = goingDown ? "down" : goingUp ? "up" : prev.direction;
        const scrolled = y > scrolledAfter;
        if (direction === prev.direction && scrolled === prev.scrolled) {
          return prev;
        }
        return { direction, scrolled };
      });

      lastY = y > 0 ? y : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfter, scrolledAfter]);

  return state;
}
