import Link from "next/link";
import * as Icons from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import type { AiToolCard as AiToolCardType } from "@/types";

export function AiToolCard({ tool }: { tool: AiToolCardType }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[tool.icon] || Icons.Sparkles;

  return (
    <Card>
      <CardBody className="flex flex-col gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Icon size={24} aria-hidden />
        </span>
        <h3 className="text-lg font-bold text-neutral-900">{tool.title}</h3>
        <p className="line-clamp-2 text-sm text-neutral-600">{tool.description}</p>
        <Link
          href={tool.href}
          className="mt-2 inline-flex w-fit items-center justify-center rounded-lg bg-secondary-500 px-5 py-2.5 text-sm font-medium text-white transition-fast hover:bg-secondary-600"
        >
          امتحان کنید
        </Link>
      </CardBody>
    </Card>
  );
}
