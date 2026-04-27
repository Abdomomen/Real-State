import { motion, AnimatePresence } from "framer-motion";
import { Menu, User, LogOut, LayoutDashboard, Bookmark, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import useUserStore from "@/app/stores/userStore";

const Navbar = () => {
  const { user, logout, wishList } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/auth")) return null;

  const handleLogout = async () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  const navBg = "bg-cream border-b border-gold/10 py-6";
  const textColor = "text-forest";
  const textMuted = "text-forest/60 hover:text-forest";
  const btnStyle = "text-cream bg-forest hover:bg-gold";

  const navLinks = [
    { name: "Collection", href: "/properties" },
    { name: "Architects", href: "#" },
    { name: "Our Story", href: "/about-us" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-50 px-8 flex items-center justify-between pointer-events-none transition-all duration-500 ${navBg}`}
      >
        <div className="flex items-center gap-12 pointer-events-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`${textColor} hover:text-gold transition-colors lg:hidden`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${textMuted}`}
              >
                {link.name}
              </Link>
            ))}
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
          <Link href="/search" className={`transition-colors ${textMuted}`}>
            <Search size={18} />
          </Link>

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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden pt-32 px-12"
          >
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-forest/40 font-bold mb-4">Registry</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-serif text-3xl italic text-forest hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-gold/20 w-full" />

              <div className="flex flex-col gap-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-forest/40 font-bold mb-4">Account</p>
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="font-serif text-2xl italic text-forest hover:text-gold transition-colors"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="font-serif text-2xl italic text-forest hover:text-left hover:text-gold transition-colors flex items-center gap-4"
                    >
                      <LogOut size={20} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="font-serif text-2xl italic text-forest hover:text-gold transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="font-serif text-2xl italic text-forest hover:text-gold transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-12 left-12 right-12">
               <p className="text-[9px] uppercase tracking-[0.5em] text-forest/30 text-center">
                 Vivid Estates • Architectural Excellence
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


