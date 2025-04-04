import type { ReactNode } from "react";
import AdminNav from "@/components/admin-nav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 flex-col border-r bg-gray-50 md:flex p-6">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <AdminNav />
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
