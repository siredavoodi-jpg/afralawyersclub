import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-400",
  ghost:
    "bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-300",
  danger:
    "bg-error text-white hover:bg-red-700 focus-visible:ring-red-400",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-base px-5 py-2.5 rounded-lg",
  lg: "text-lg px-7 py-3.5 rounded-xl",
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-normal duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

interface ButtonLinkProps extends BaseProps {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function ButtonLink({ href, children, variant = "primary", size = "md", className, ariaLabel }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Link>
  );
}
