"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser, type AuthUser } from "@/lib/auth-client";

interface RequireRoleProps {
  allowedRoles: AuthUser["role"][];
  redirectTo?: string;
  children: React.ReactNode;
}

export function RequireRole({ allowedRoles, redirectTo = "/login", children }: RequireRoleProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = getAuthUser();
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      router.replace(redirectTo);
      return;
    }
    setAllowed(true);
  }, [allowedRoles, redirectTo, router]);

  if (!allowed) return null;

  return <>{children}</>;
}