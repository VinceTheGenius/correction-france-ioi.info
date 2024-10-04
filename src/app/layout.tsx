import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Corrigés France IOI Python", // Titre de la page
  description: "Accédez aux corrigés des exercices du niveau 1 de France IOI pour améliorer vos compétences en programmation Python.",
  keywords: ["corrigés", "France IOI", "exercices de programmation", "Niveau 1", "algorithmique", "Python"], // Mots-clés pertinents
  applicationName: "Corrigés France IOI Python", // Nom de votre application
  viewport: "width=device-width, initial-scale=1.0", // Configuration pour le responsive
  robots: "index, follow", // Indications pour les robots des moteurs de recherche
  themeColor: "#FFFFFF", // Couleur de thème
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}