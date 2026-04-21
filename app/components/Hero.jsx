"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import useUserStore from "@/app/stores/userStore";
import { LogIn, UserPlus, LayoutDashboard, Building2 } from "lucide-react";

const Hero = () => {
  const { user } = useUserStore();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-eggshell">
      {/* Background Image with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2400"
          alt="Luxury Architecture"
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <span className="uppercase tracking-[0.4em] text-xs font-sans text-eggshell/80 mb-6 block">
            The Art of Architectural Heritage
          </span>
          <h1 className="text-5xl md:text-8xl text-eggshell mb-8 leading-[1.1] font-serif">
            Unveiling <span className="italic">Spaces.</span> <br />
            Elevating <span className="italic text-luxury-gold">Legacy.</span>
          </h1>
          <p className="text-lg md:text-xl text-eggshell/90 font-sans max-w-2xl mx-auto leading-relaxed font-light mb-12">
            An elite archive of architectural masterpieces curated for the modern connoisseur. 
            Access is reserved for verified members of the guild.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          {user ? (
            <>
              <Link 
                href={user.role === 'admin' ? "/dashboard" : "/properties"}
                className="group px-10 py-4 bg-eggshell text-charcoal font-bold font-sans text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-luxury-gold transition-all duration-500"
              >
                {user.role === 'admin' ? <LayoutDashboard size={16} /> : <Building2 size={16} />}
                {user.role === 'admin' ? "Manage Dashboard" : "View Collection"}
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login"
                className="group px-10 py-4 bg-eggshell text-charcoal font-bold font-sans text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-luxury-gold transition-all duration-500"
              >
                <LogIn size={16} className="group-hover:translate-x-1 transition-transform" />
                Sign In
              </Link>
              <Link 
                href="/auth/register"
                className="group px-10 py-4 border border-eggshell/30 text-eggshell font-bold font-sans text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-eggshell hover:text-charcoal transition-all duration-500"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-eggshell/30" />
      </motion.div>
    </section>
  );
};

export default Hero;

