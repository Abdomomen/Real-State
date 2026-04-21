"use client";

import { motion } from "framer-motion";
import { Menu, User, LogOut, LayoutDashboard, Bookmark, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import useUserStore from "@/app/stores/userStore";

const Navbar = () => {
  const { user, logout, wishList } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith("/auth")) return null;

  const handleLogout = async () => {
    logout();
    router.push("/");
  };

  const navBg = "bg-cream border-b border-gold/10 py-6";
  const textColor = "text-forest";
  const textMuted = "text-forest/60 hover:text-forest";
  const btnStyle = "text-cream bg-forest hover:bg-gold";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 px-8 flex items-center justify-between pointer-events-none transition-all duration-500 ${navBg}`}
    >
      <div className="flex items-center gap-12 pointer-events-auto">
        <button className={`${textColor} hover:text-gold transition-colors`}>
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/properties"
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${textMuted}`}
          >
            Collection
          </Link>
          <Link
            href="#"
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${textMuted}`}
          >
            Architects
          </Link>
          <Link
            href="/about-us"
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${textMuted}`}
          >
            Our Story
          </Link>
        </div>
      </div>

      <div className="pointer-events-auto">
        <Link href="/">
          <h1 className={`font-serif text-2xl tracking-tighter cursor-pointer ${textColor}`}>
            VIVID
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-6 pointer-events-auto">
        {/* Search Icon */}
        <Link href="/search" className={`transition-colors ${textMuted}`}>
          <Search size={18} />
        </Link>

        {/* Wishlist Icon with Badge */}
        <Link href="/wishlist" className={`relative transition-colors ${textMuted}`}>
          <Bookmark size={18} />
          {wishList?.length > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-charcoal text-[9px] font-bold flex items-center justify-center rounded-full">
              {wishList.length}
            </span>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/dashboard"
                  className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors flex items-center gap-2 ${textMuted}`}
                >
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors flex items-center gap-2 text-forest/60 hover:text-gold`}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors flex items-center gap-2 ${textMuted}`}
              >
                <User size={14} /> Sign In
              </Link>
              <Link
                href="/auth/register"
                className={`font-sans text-[10px] uppercase tracking-[0.3em] px-6 py-2 transition-all duration-300 font-bold ${btnStyle}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

    </motion.nav>
  );
};

export default Navbar;


