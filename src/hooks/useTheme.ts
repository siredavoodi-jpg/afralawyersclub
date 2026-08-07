"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "norooz" | "system";

const THEME_KEY = "afra-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // بارگذاری از localStorage
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    setThemeState(saved || "system");
    setMounted(true);
  }, []);

  // اعمال تم
  useEffect(() => {
    if (!mounted) return;

    const resolved =
      theme === "system"
        ? getSystemTheme()
        : theme === "dark"
        ? "dark"
        : "light";
    setResolvedTheme(resolved);

    const root = document.documentElement;

    if (theme === "norooz") {
      root.setAttribute("data-theme", "norooz");
    } else if (resolved === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  // گوش دادن به تغییرات system theme
  useEffect(() => {
    if (theme !== "system" || !mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const sysTheme = getSystemTheme();
      setResolvedTheme(sysTheme);
      const root = document.documentElement;
      if (sysTheme === "dark") {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return { theme, resolvedTheme, setTheme };
}