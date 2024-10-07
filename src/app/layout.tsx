import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Métadonnées de votre page
export const metadata: Metadata = {
  title: "Correction France IOI",
  description: "Accédez aux corrections des exercices de France IOI pour améliorer vos compétences en programmation Python.",
  keywords: ["Correction", "France IOI", "exercices de programmation", "Niveau 1", "algorithmique", "Python"],
  applicationName: "Correction France IOI",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr">
      <head>
        {/* Ajouter la balise meta pour Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-5778255533062834    " />
        {/* Ajoutez d'autres balises meta ou liens ici si nécessaire */}
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}
      {/* Inclure le composant Analytics */}
      <Analytics />
      </body>
      </html>
  );
}