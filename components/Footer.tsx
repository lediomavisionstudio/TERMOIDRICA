import Logo from "./Logo";
import { COMPANY, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-night-900 text-white">
      {/* Wave divider in cima (dalla sezione contatti bianca) */}
      <div className="absolute inset-x-0 top-0 -translate-y-px leading-[0]">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-[40px] w-full sm:h-[60px]" aria-hidden>
          <path d="M0,30 C240,70 480,0 720,25 C960,50 1200,5 1440,35 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="container-x py-16 pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo navbar className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {COMPANY.claim} per privati e aziende in {COMPANY.region}.
              Qualità, efficienza e assistenza continua.
            </p>
            <div className="mt-5 flex gap-3">
              <Social href={COMPANY.social.instagram} label="Instagram" d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5-2.5h.01M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
              <Social href={COMPANY.social.facebook} label="Facebook" d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8Z" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Navigazione
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/70 transition-colors hover:text-brand-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Contatti
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-brand-accent">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-accent">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.address}</li>
              <li>{COMPANY.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {COMPANY.name} di {COMPANY.owner}. P.IVA {COMPANY.piva}
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
            <a href="/cookie-policy" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, d }: { href: string; label: string; d: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-brand-accent hover:text-brand-accent"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </a>
  );
}
