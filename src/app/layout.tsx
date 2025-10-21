// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site"; // переконайся, що файл існує і має .url, .name

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url ?? "https://hessenlist.de"),
  title: {
    default: "HessenList — Unternehmen, die wirklich antworten",
    template: "%s · HessenList",
  },
  description:
    "Regionalverzeichnis für Hessen: Wir zeigen, welche Unternehmen tatsächlich antworten – mit dem Activity Index.",
  applicationName: "HessenList",
  referrer: "no-referrer",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: "HessenList",
    title: "HessenList — Unternehmen, die wirklich antworten",
    description:
      "Finde Firmen in Hessen mit echtem Activity Index (Antwortgeschwindigkeit & Verlässlichkeit).",
  },
  twitter: {
    card: "summary_large_image",
    title: "HessenList — Unternehmen, die wirklich antworten",
    description:
      "Regionalverzeichnis für Hessen mit Activity Index.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
