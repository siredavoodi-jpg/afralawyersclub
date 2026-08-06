import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface shadow-card",
        hover &&
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

interface CardIconProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: "primary" | "secondary" | "accent";
}

export function CardIcon({ children, color = "primary", className, ...props }: CardIconProps) {
  const colorStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
  };
  return (
    <span
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
        colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}