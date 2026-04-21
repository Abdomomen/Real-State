"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { apiClient } from "@/app/lib/api-client";
import { useToast } from "@/app/components/ToastProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/stores/userStore";
const RegisterPage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { showToast } = useToast();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const name = `${firstName} ${lastName}`.trim();
    const result = await apiClient.post("/api/auth/register", { name, email, password });

    if (result.error) {
      setError(result.message);
      showToast(result.message, "error");
      setLoading(false);
    } else {
      // Success - user is auto-logged in by the backend issuing cookies
      setUser(result.user);
      showToast("Council Membership Confirmed. Welcome.");
      router.push("/");
      router.refresh();
    }
  };
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-eggshell">
      
      {/* Right Side: Form (Flipped for variation) */}
      <div className="flex flex-col justify-center px-8 md:px-24 lg:px-32 relative order-2 lg:order-1">
        <div className="absolute top-12 left-12">
          <Link href="/" className="flex items-center gap-3 text-charcoal/40 hover:text-charcoal transition-colors font-sans text-[10px] uppercase tracking-widest">
            <ArrowLeft size={16} /> 
            Back to Journal
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          <header className="mb-12">
            <h1 className="text-4xl font-serif text-charcoal mb-4 uppercase tracking-tighter">Become a Collector</h1>
            <p className="text-charcoal/40 font-sans text-xs uppercase tracking-widest leading-loose">
              Join the guild for exclusive architectural releases and private appraisal services.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
                <div className="p-4 bg-red-50 border-l-2 border-red-500">
                    <p className="text-[10px] uppercase tracking-widest text-red-600 font-bold">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-sans font-bold block mb-2">First Name</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-border-light py-3 focus:border-luxury-gold outline-none text-charcoal font-serif italic transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-sans font-bold block mb-2">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border-b border-border-light py-3 focus:border-luxury-gold outline-none text-charcoal font-serif italic transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-sans font-bold block mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@vivid.estates"
                className="w-full bg-transparent border-b border-border-light py-3 focus:border-luxury-gold outline-none text-charcoal font-serif italic transition-colors placeholder:text-charcoal/10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-sans font-bold block mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-border-light py-3 focus:border-luxury-gold outline-none text-charcoal font-serif transition-colors"
              />
            </div>

            <div className="flex items-start gap-3 py-4">
              <input type="checkbox" required className="mt-1 border-border-light accent-charcoal" />
              <p className="text-[9px] uppercase tracking-widest text-charcoal/40 leading-relaxed">
                I agree to the <span className="text-charcoal font-bold">Privacy Policy</span> and consent to receive architectural reports via email.
              </p>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-charcoal text-eggshell py-5 font-sans text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-luxury-gold transition-colors duration-500 disabled:opacity-50"
            >
              {loading ? "Processing..." : (<>Apply for Access <ArrowRight size={14} /></>)}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-border-light">
            <p className="text-charcoal/40 font-sans text-[10px] uppercase tracking-widest">
              Already have credentials? <Link href="/auth/login" className="text-luxury-gold font-bold hover:underline underline-offset-4">Sign In</Link>
            </p>
          </footer>
        </motion.div>
      </div>

      {/* Left Side: Immersive Image */}
      <div className="hidden lg:block relative overflow-hidden order-1 lg:order-2">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover grayscale-[10%]"
        />
        <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-[1px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-20">
           <motion.h2 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="text-6xl font-serif text-eggshell leading-[1] italic"
           >
             Exclusivity by <br /> Design.
           </motion.h2>
        </div>
      </div>
    </main>
  );
};
export default RegisterPage;
