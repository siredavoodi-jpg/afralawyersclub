"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/lib/auth-client";

// ✅ نقش trainee اضافه شد
type Role = "guest" | "member" | "trainee" | "lawyer" | "admin";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  redirectTo?: string;
}

export function RequireRole({
  children,
  allowedRoles,
  redirectTo = "/login",
}: RequireRoleProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = getAuthUser();
    if (!user || !allowedRoles.includes(user.role as Role)) {
      router.replace(redirectTo);
      return;
    }
    setAllowed(true);
    setReady(true);
  }, [allowedRoles, redirectTo, router]);

  if (!ready || !allowed) return null;
  return <>{children}</>;
}