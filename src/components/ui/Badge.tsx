import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeTone = "primary" | "secondary" | "accent" | "neutral";

const tones: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary-hover",
  accent: "bg-accent/10 text-accent-hover",
  neutral: "bg-base text-ink-soft",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}