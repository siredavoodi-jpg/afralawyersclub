import { cn } from "@/lib/utils";

type BadgeTone = "primary" | "secondary" | "accent" | "neutral";

const tones: Record<BadgeTone, string> = {
  primary: "bg-primary-50 text-primary-700",
  secondary: "bg-secondary-50 text-secondary-700",
  accent: "bg-accent-50 text-accent-700",
  neutral: "bg-neutral-100 text-neutral-700",
};

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}
