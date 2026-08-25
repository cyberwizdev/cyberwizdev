// components/admin/admin-sidebar.tsx
"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Mail, 
  MessageSquare, 
  Send, 
  Users,
  LogOut,
  Folder,
  FolderOpen,
  Star 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Newsletter", href: "/admin/newsletter", icon: Send },
  { name: "Subscribers", href: "/admin/subscribers", icon: Users },
  { name: "Contact Forms", href: "/admin/contacts", icon: Mail },
  { name: "Live Chat", href: "/admin/chat", icon: MessageSquare },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/admin" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary dark:bg-foreground dark:text-primary text-primary-foreground"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}