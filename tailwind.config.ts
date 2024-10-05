import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Fond principal
        foreground: "var(--foreground)", // Texte principal
        sidebarBg: "var(--sidebar-bg)", // Fond de la sidebar
        contentBg: "var(--content-bg)", // Fond de la partie droite
      },
    },
  },
  plugins: [],
};
export default config;