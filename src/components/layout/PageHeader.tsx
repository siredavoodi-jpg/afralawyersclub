import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, badge, className }: PageHeaderProps) {
  return (
    <section className={cn("bg-hero-gradient py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold text-primary">
            {badge}
          </span>
        )}
        <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}