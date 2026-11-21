import Image from "next/image";

/**
 * Brand logo.
 * - default: logo a colori su sfondo chiaro (public/logo-nobg.png)
 * - navbar: versione per sfondi scuri (public/logo-navbar.png) — fiamma e
 *   goccia restano a colori, testo e chiave inglese diventano bianchi.
 */
export default function Logo({
  className = "h-[72px] w-auto md:h-[84px]",
  navbar = false,
}: {
  className?: string;
  /** Usa la versione pensata per sfondi scuri (icona a colori + testo bianco). */
  navbar?: boolean;
}) {
  return (
    <Image
      src={navbar ? "/logo-navbar.png" : "/logo-nobg.png"}
      alt="Termoidrica GS"
      width={1176}
      height={831}
      className={`object-contain ${className}`}
      priority
    />
  );
}
