"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({
  value,
  onChange,
  size = 20,
  readOnly = false,
  className,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className={cn("flex items-center gap-1", className)} dir="ltr">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => setHover(0)}
          className={cn(
            "transition-transform duration-200",
            !readOnly ? "cursor-pointer hover:scale-110" : "cursor-default"
          )}
          aria-label={`${n} ستاره`}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors duration-200",
              n <= display
                ? "fill-secondary text-secondary"
                : "fill-transparent text-ink-soft/30"
            )}
          />
        </button>
      ))}
    </div>
  );
}