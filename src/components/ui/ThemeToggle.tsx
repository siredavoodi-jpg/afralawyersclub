"use client";

import { Moon, Sun, Sparkles, Monitor } from "lucide-react";
import { useTheme, type Theme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const themes: { value: Theme; label: string; icon: any }[] = [
  { value: "light", label: "روشن", icon: Sun },
  { value: "dark", label: "تیره", icon: Moon },
  { value: "norooz", label: "نوروزی", icon: Sparkles },
  { value: "system", label: "خودکار", icon: Monitor },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm",
        className
      )}
      role="radiogroup"
      aria-label="انتخاب تم"
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            aria-label={t.label}
            title={t.label}
            role="radio"
            aria-checked={isActive}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
              isActive
                ? "bg-primary text-white shadow-card"
                : "text-ink-soft hover:bg-base hover:text-primary"
            )}
          >
            <Icon size={15} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}