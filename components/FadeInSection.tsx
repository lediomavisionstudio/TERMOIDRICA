"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Direction the element slides in FROM */
  from?: "up" | "down" | "left" | "right";
  /** Slide distance in px (default 40) */
  distance?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
};

/**
 * Wraps any content and reveals it with a spring transition when it scrolls
 * into view (once). `from` is the side the element enters from:
 *   left  → starts at x:-distance   right → starts at x:+distance
 *   up    → starts at y:+distance (below)   down → starts at y:-distance (above)
 */
export default function FadeInSection({
  children,
  className,
  delay = 0,
  from = "up",
  distance = 40,
  as = "div",
}: Props) {
  const MotionTag = motion[as] as typeof motion.div;

  const offset =
    from === "left"
      ? { x: -distance, y: 0 }
      : from === "right"
      ? { x: distance, y: 0 }
      : from === "down"
      ? { x: 0, y: -distance }
      : { x: 0, y: distance }; // up

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.8,
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
