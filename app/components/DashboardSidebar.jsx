"use client";

import { LayoutDashboard, Building2, Users, MessageSquare, LogOut, Settings, Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/app/stores/userStore";

const DashboardSidebar = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.logout);

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Buildings", icon: Building2, path: "/dashboard/buildings" },
    { name: "Residents", icon: Users, path: "/dashboard/users" },
    { name: "Comments", icon: MessageSquare, path: "/dashboard/comments" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      clearUser();
      router.push("/");
      router.refresh(); // Ensure RSC layout updates
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-72 border-r border-gold/10 flex flex-col fixed inset-y-0 left-0 bg-cream z-30 shadow-2xl shadow-forest/5">
      <header className="p-8 pb-12 border-b border-gold/10">
        <Link href="/">
          <h1 className="text-3xl font-serif text-forest uppercase tracking-tighter">VIVID</h1>
        </Link>
        <span className="text-[9px] uppercase tracking-[0.4em] text-forest/40 block mt-2">Guild Management</span>
      </header>

      <nav className="flex-1 p-6 space-y-2">
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold px-4 mb-6 block">Main Menu</span>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group ${
                isActive ? "bg-forest text-gold shadow-sm" : "text-forest/50 hover:bg-forest/5 hover:text-forest"
              }`}
            >
              <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} className={isActive ? "text-gold" : "text-forest/40 group-hover:text-gold"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <footer className="p-6 border-t border-gold/10 space-y-4">
          {/* Fix: /dashboard/settings page doesn't exist yet — rendered as non-navigable element */}
          <span className="flex items-center gap-4 px-4 py-3 text-forest/20 font-sans font-bold text-[10px] uppercase tracking-widest cursor-not-allowed select-none" title="Coming Soon">
            <Settings size={14} className="text-forest/20" /> Settings
            <span className="ml-auto text-[8px] border border-forest/10 px-1.5 py-0.5 uppercase tracking-widest">Soon</span>
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 text-forest/50 hover:text-red-900 font-sans hover:bg-red-900/5 font-bold text-[10px] uppercase tracking-widest transition-colors w-full"
          >
            <LogOut size={14} className="text-red-900/40" /> Sign Out
          </button>
      </footer>
    </aside>
  );
};

export default DashboardSidebar;
