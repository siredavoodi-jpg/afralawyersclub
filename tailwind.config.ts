import type { Config } from "tailwindcss";

// Design tokens sourced directly from MASTER_PROMPT.md (بخش ۲: Design System)
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F0FA",
          100: "#CCE1F5",
          200: "#99C3EB",
          300: "#66A5E1",
          400: "#3387D7",
          500: "#1A6BBF",
          600: "#0D4F9E", // رنگ اصلی سایت
          700: "#0A3D7A",
          800: "#072B56",
          900: "#041932",
        },
        secondary: {
          50: "#FFF4E6",
          100: "#FFE8CC",
          200: "#FFD199",
          300: "#FFBA66",
          400: "#FFA333",
          500: "#FF8C00", // رنگ ثانویه - CTA
          600: "#CC7000",
          700: "#995400",
          800: "#663800",
          900: "#331C00",
        },
        accent: {
          50: "#E6F9F0",
          100: "#CCF3E1",
          200: "#99E7C3",
          300: "#66DBA5",
          400: "#33CF87",
          500: "#00C369", // رنگ تأکیدی - AI / موفقیت
          600: "#009E55",
          700: "#007941",
          800: "#00542D",
          900: "#002F19",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        success: "#00C369",
        warning: "#FF8C00",
        error: "#DC2626",
        info: "#1A6BBF",
      },
      fontFamily: {
        fa: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        en: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeight: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      spacing: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
