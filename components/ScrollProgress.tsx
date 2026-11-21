"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra sottile in cima alla pagina che avanza con lo scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
