import Link from "next/link";
import Logo from "./Logo";
import Footer from "./Footer";
import { COMPANY } from "@/lib/data";

/** Layout per le pagine legali (Privacy, Cookie): header scuro + contenuto + footer. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="glass-dark sticky top-0 z-50 border-b border-white/10">
        <div className="container-x flex h-[76px] items-center justify-between">
          <Link href="/" aria-label={`${COMPANY.name} — home`}>
            <Logo navbar className="h-[56px] w-auto" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-teal-400"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Torna al sito
          </Link>
        </div>
      </header>

      <main className="bg-white">
        <div className="container-x py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <span className="section-eyebrow">Informativa</span>
            <h1 className="mt-4 text-3xl text-ink sm:text-4xl">{title}</h1>
            <p className="mt-3 text-sm text-ink-400">
              Ultimo aggiornamento: {updated}
            </p>

            <div className="legal-content mt-10">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
