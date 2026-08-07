import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
          DEFAULT: "rgb(var(--color-primary-600) / <alpha-value>)",
          dark: "rgb(var(--color-primary-700) / <alpha-value>)",
          light: "rgb(var(--color-primary-500) / <alpha-value>)",
        },
        secondary: {
          50: "rgb(var(--color-secondary-50) / <alpha-value>)",
          100: "rgb(var(--color-secondary-100) / <alpha-value>)",
          200: "rgb(var(--color-secondary-200) / <alpha-value>)",
          300: "rgb(var(--color-secondary-300) / <alpha-value>)",
          400: "rgb(var(--color-secondary-400) / <alpha-value>)",
          500: "rgb(var(--color-secondary-500) / <alpha-value>)",
          600: "rgb(var(--color-secondary-600) / <alpha-value>)",
          700: "rgb(var(--color-secondary-700) / <alpha-value>)",
          DEFAULT: "rgb(var(--color-secondary-500) / <alpha-value>)",
          hover: "rgb(var(--color-secondary-600) / <alpha-value>)",
          light: "rgb(var(--color-secondary-50) / <alpha-value>)",
        },
        accent: {
          50: "rgb(var(--color-accent-50) / <alpha-value>)",
          100: "rgb(var(--color-accent-100) / <alpha-value>)",
          200: "rgb(var(--color-accent-200) / <alpha-value>)",
          300: "rgb(var(--color-accent-300) / <alpha-value>)",
          400: "rgb(var(--color-accent-400) / <alpha-value>)",
          500: "rgb(var(--color-accent-500) / <alpha-value>)",
          600: "rgb(var(--color-accent-600) / <alpha-value>)",
          700: "rgb(var(--color-accent-700) / <alpha-value>)",
          DEFAULT: "rgb(var(--color-accent-500) / <alpha-value>)",
          hover: "rgb(var(--color-accent-600) / <alpha-value>)",
        },
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        base: "rgb(var(--color-base) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        // سازگاری با کدهای قبلی
        neutral: {
          50: "rgb(var(--color-base) / <alpha-value>)",
          100: "rgb(var(--color-line) / <alpha-value>)",
          200: "rgb(var(--color-line) / <alpha-value>)",
          300: "rgb(var(--color-line) / <alpha-value>)",
          400: "rgb(var(--color-ink-soft) / <alpha-value>)",
          500: "rgb(var(--color-ink-soft) / <alpha-value>)",
          600: "rgb(var(--color-ink-soft) / <alpha-value>)",
          700: "rgb(var(--color-ink) / <alpha-value>)",
          800: "rgb(var(--color-ink) / <alpha-value>)",
          900: "rgb(var(--color-ink) / <alpha-value>)",
        },
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
          "linear-gradient(to bottom, rgb(var(--color-primary-50)), rgb(var(--color-surface)) 50%, rgb(var(--color-secondary-50)))",
        "dashboard-gradient":
          "linear-gradient(to bottom, rgb(var(--color-primary-600)), rgb(var(--color-primary-700)))",
        "cta-gradient":
          "linear-gradient(to right, rgb(var(--color-primary-400)), rgb(var(--color-secondary-500)))",
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