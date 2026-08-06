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
        primary: {
          DEFAULT: "#5B2C6F",
          50: "#F5E6FF",
          100: "#EBD5F7",
          200: "#D7B8E8",
          300: "#B993D6",
          400: "#9B59B6",
          500: "#7D3C98",
          600: "#5B2C6F",
          700: "#4A1D6B",
          800: "#3D1560",
          900: "#2E0F4E",
          dark: "#4A1D6B",
          light: "#7D3C98",
        },
        secondary: {
          DEFAULT: "#FF8C00",
          50: "#FFF5EB",
          100: "#FFE8CC",
          200: "#FFD199",
          300: "#FFB966",
          400: "#FFA133",
          500: "#FF8C00",
          600: "#E67E00",
          700: "#CC6F00",
          hover: "#E67E00",
          light: "#FFF5EB",
        },
        accent: {
          DEFAULT: "#00C369",
          50: "#E6F9F0",
          100: "#CCF3E1",
          200: "#99E7C3",
          300: "#66DBA5",
          400: "#33CF87",
          500: "#00C369",
          600: "#00A85A",
          700: "#008C4C",
          hover: "#00A85A",
        },
        surface: "#FFFFFF",
        base: "#FAFBFC",
        ink: "#1A1A2E",
        "ink-soft": "#4A5568",
        line: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Vazirmatn", "Tahoma", "sans-serif"],
        fa: ["var(--font-vazirmatn)", "Vazirmatn", "Tahoma", "sans-serif"],
        en: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        btn: "12px",
        card: "16px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(91, 44, 111, 0.06)",
        "card-hover": "0 12px 24px rgba(91, 44, 111, 0.12)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, #F5E6FF, #FFFFFF 50%, #FFF5EB)",
        "dashboard-gradient": "linear-gradient(to bottom, #5B2C6F, #4A1D6B)",
        "cta-gradient": "linear-gradient(to right, #9B59B6, #FF8C00)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;