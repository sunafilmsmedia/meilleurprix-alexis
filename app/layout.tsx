import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Instrument_Serif, Montserrat } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import Clarity from "@/components/Clarity";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

// Police d'affichage lourde — titres en gros bold majuscules (branding Groupe Guillemette).
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: `${BRAND.teamName} — Votre propriété va-t-elle se vendre au meilleur prix ?`,
  description: `Une analyse personnalisée, propulsée par l'intelligence artificielle, pour savoir si votre propriété va se vendre au meilleur prix du marché en ${BRAND.region}.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemple.vercel.app"),
  openGraph: {
    title: "Votre propriété va-t-elle se vendre au meilleur prix ?",
    description: `Estimation personnalisée — ${BRAND.teamName}, courtière immobilière RE/MAX en ${BRAND.region}.`,
    locale: "fr_CA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${dmSans.variable} ${instrumentSerif.variable} ${montserrat.variable}`}>
      <body className="min-h-screen antialiased">
        <MetaPixel />
        <Clarity />
        {children}
        <Script
          src="https://clarity-scanner.vercel.app/tracker.js"
          data-project={process.env.NEXT_PUBLIC_CLARITY_SCANNER_PROJECT ?? BRAND.slug}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
