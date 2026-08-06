import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, name, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={cn(
          "rounded-btn border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-all duration-300 placeholder:text-ink-soft/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100",
          className
        )}
        {...props}
      />
    </div>
  );
}