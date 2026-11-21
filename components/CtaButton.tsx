"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * CTA anchor button with an arrow that slides in from the left on hover
 * (AnimatePresence). Keeps whatever Tailwind classes you pass (e.g. btn-accent).
 */
export default function CtaButton({
  href,
  children,
  className = "btn-accent",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      <span>{children}</span>
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <AnimatePresence>
          {hover && (
            <motion.svg
              key="arrow"
              initial={{ x: -14, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 14, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
    </motion.a>
  );
}
