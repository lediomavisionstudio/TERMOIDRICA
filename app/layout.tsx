import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/lib/data";
import LenisProvider from "@/app/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Oswald — titoli d'impatto (condensato, autorevole)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Space Grotesk — numeri / counter
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const DESCRIPTION =
  "Termoidrica GS di Gerardo Settanni: impianti idraulici, termici e di climatizzazione per privati e aziende in Puglia. La nostra storia, i lavori realizzati e il preventivo gratuito.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${COMPANY.name} — ${COMPANY.claim}`,
  description: DESCRIPTION,
  keywords: [
    "termoidraulica",
    "idraulico Noicattaro",
    "idraulico Bari",
    "impianti idraulici",
    "riscaldamento",
    "climatizzazione",
    "pompe di calore",
    "Puglia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: COMPANY.name,
    title: `${COMPANY.name} — ${COMPANY.claim}`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg", // placeholder 1200x630 — da sostituire con un'immagine reale
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} — ${COMPANY.claim}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — ${COMPANY.claim}`,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C6CA6",
};

// JSON-LD structured data (LocalBusiness) for rich results on Google.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PlumbingBusiness",
  name: COMPANY.name,
  alternateName: `${COMPANY.name} di ${COMPANY.owner}`,
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.jpg`,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  vatID: COMPANY.piva,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Torre a Mare 26/28",
    addressLocality: "Noicattaro",
    postalCode: "70016",
    addressRegion: "BA",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0355,
    longitude: 16.993,
  },
  areaServed: { "@type": "AdministrativeArea", name: "Puglia" },
  founder: { "@type": "Person", name: COMPANY.owner },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "19:00",
    },
  ],
  sameAs: [COMPANY.social.instagram, COMPANY.social.facebook],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${oswald.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
