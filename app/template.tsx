"use client";

import { motion } from "framer-motion";

/**
 * Next.js App Router `template.tsx` re-mounts on every navigation,
 * which makes it the right place for page-transition animations.
 * Each route fades + slides in. (For a single-page site this mainly
 * affects the initial mount; it scales to multi-page without changes.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
