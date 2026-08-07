"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { RequireRole } from "@/components/auth/RequireRole";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireRole allowedRoles={["member", "lawyer", "admin"]}>
      <div className="flex min-h-screen bg-base">
        <DashboardSidebar variant="member" />
        <main className="flex-1 overflow-x-hidden px-4 py-8 pt-20 sm:px-6 lg:px-10 lg:pt-8">
          {children}
        </main>
      </div>
    </RequireRole>
  );
}