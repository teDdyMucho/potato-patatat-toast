import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#F8F9FB",
        surface: "#101113",
        muted: "#A1A1AA",
        "muted-bg": "#27272A",
        "muted-foreground": "#A1A1AA",
        nav: "#1C1C1E",
        "nav-text": "#F2F2F2",
        primary: "#0ABFA3",
        "primary-hover": "#1558C8",
        accent: "#0ABFA3",
        "accent-hover": "#089080",
        body: "#F8F9FB",
        border: "#2C2C2E",
        ring: "#0ABFA3",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      spacing: {
        "4.5": "18px",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.10)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
