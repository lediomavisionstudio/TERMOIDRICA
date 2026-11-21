/**
 * Pagina singola: nessun wrapper animato.
 * (Un tempo qui c'era una motion.div di transizione, ma avvolgendo tutto il
 * contenuto con transform + will-change causava un clamp dello scroll nativo
 * su pagine molto lunghe. Rimossa: le animazioni d'ingresso restano sulle
 * singole sezioni.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
