import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <DashboardSidebar variant="member" />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
