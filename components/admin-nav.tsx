"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Newspaper, Users, LayoutDashboard, Settings } from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "News",
      href: "/admin/news",
      icon: Newspaper,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      adminOnly: true,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => {
        // Skip admin-only items for non-admins
        if (item.adminOnly && !isAdmin) {
          return null;
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
