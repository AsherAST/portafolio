import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://portafolio-pi-eosin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Damian Espinosa | Desarrollador Web",
    template: "%s | Damian Espinosa",
  },
  description:
    "Portafolio de Damian Espinosa, desarrollador web full-stack de Cali, Colombia. Next.js, React, TypeScript, PostgreSQL y pruebas automatizadas. Proyectos reales desplegados.",
  keywords: [
    "Damian Espinosa",
    "desarrollador web",
    "desarrollador full-stack",
    "Next.js",
    "React",
    "TypeScript",
    "portafolio",
    "Cali",
    "Colombia",
  ],
  authors: [{ name: "Damian Espinosa" }],
  creator: "Damian Espinosa",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: BASE_URL,
    siteName: "Damian Espinosa",
    title: "Damian Espinosa | Desarrollador Web",
    description:
      "Desarrollador web full-stack en Cali, Colombia. Proyectos reales con Next.js, React y TypeScript.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Damian Espinosa — Desarrollador Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damian Espinosa | Desarrollador Web",
    description:
      "Desarrollador web full-stack en Cali, Colombia. Proyectos reales con Next.js, React y TypeScript.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Damian Espinosa",
              jobTitle: "Desarrollador Web Full-Stack",
              url: BASE_URL,
              email: "mailto:damianespinosadev@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cali",
                addressCountry: "CO",
              },
              sameAs: [
                "https://github.com/AsherAST",
                "https://www.linkedin.com/in/damian-espinosa-6b46a8277",
              ],
            }),
          }}
        />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
