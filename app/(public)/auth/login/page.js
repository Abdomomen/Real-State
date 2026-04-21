"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { useState } from "react";
import { apiClient} from "@/app/lib/api-client";
import { useToast } from "@/app/components/ToastProvider";
import useUserStore from "@/app/stores/userStore"

const LoginPage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.login);
  const { showToast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await apiClient.post("/api/auth/login", { email, password });

    if (result.error) {
      setError(result.message);
      showToast(result.message, "error");
      setLoading(false);
    } else {
      // Success
      setUser(result.user);
      showToast("Access Granted. Welcome back.");
      router.push("/");
      router.refresh(); // Refresh to update server components
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-eggshell">
      {/* Left Side: Immersive Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover grayscale-[10%]"
        />
        <div className="absolute inset-0 bg-charcoal/30 flex flex-col justify-end p-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif italic text-eggshell mb-4">"Architecture is a visual art, and the buildings speak for themselves."</h2>
            <p className="text-eggshell/60 font-sans text-xs uppercase tracking-widest">— Julia Morgan</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex flex-col justify-center px-8 md:px-24 lg:px-32 relative">
        <div className="absolute top-12 left-12">
          <Link href="/" className="flex items-center gap-3 text-charcoal/40 hover:text-charcoal transition-colors font-sans text-[10px] uppercase tracking-widest">
            <ArrowLeft size={16} /> 
            Back to Journal
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          <header className="mb-12">
            <h1 className="text-4xl font-serif text-charcoal mb-4 uppercase tracking-tighter">Enter the Collection</h1>
            <p className="text-charcoal/40 font-sans text-xs uppercase tracking-widest leading-loose">
              Access your saved architectural assets and exclusive off-market listings.
            </p>
          </header>

          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
                <div className="p-4 bg-red-50 border-l-2 border-red-500">
                    <p className="text-[10px] uppercase tracking-widest text-red-600 font-bold">{error}</p>
                </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-sans font-bold block mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@vivid.estates"
                className="w-full bg-transparent border-b border-border-light py-4 focus:border-luxury-gold outline-none text-charcoal font-serif italic transition-colors placeholder:text-charcoal/10"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-sans font-bold block">Password</label>
                <a href="#" className="text-[9px] uppercase tracking-widest text-luxury-gold font-sans font-medium">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-border-light py-4 focus:border-luxury-gold outline-none text-charcoal font-serif transition-colors placeholder:text-charcoal/10"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-charcoal text-eggshell py-5 font-sans text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-luxury-gold transition-colors duration-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : (<>Sign In <ArrowRight size={14} /></>)}
            </button>
          </form>

          <footer className="mt-12 pt-12 border-t border-border-light">
            <p className="text-charcoal/40 font-sans text-[10px] uppercase tracking-widest">
              Not a member? <Link href="/auth/register" className="text-luxury-gold font-bold hover:underline underline-offset-4">Apply for Access</Link>
            </p>
          </footer>
        </motion.div>
      </div>
    </main>
  );
};

export default LoginPage;
