"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";

const PhilosophySection = () => {
  return (
    <section className="py-32 px-8 bg-eggshell border-t border-border-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex-1 relative aspect-[4/5] w-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25114c?auto=format&fit=crop&q=80&w=1200" 
            alt="Architectural details" 
            className="w-full h-full object-cover rounded-sm grayscale-[10%]"
          />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 luxury-border bg-eggshell p-8 hidden md:flex flex-col justify-center">
            <span className="text-4xl font-serif italic text-luxury-gold mb-2">25+</span>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/60 leading-relaxed font-sans">
              Years of architectural <br />expertise in luxury sectors.
            </p>
          </div>
        </motion.div>

        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-charcoal/40 font-sans font-bold mb-6">Our Philosophy</h4>
            <h2 className="text-4xl md:text-6xl font-serif text-charcoal leading-[1.1] mb-8">
              Curation over <br /><span className="italic">Quantity.</span>
            </h2>
            <p className="text-charcoal/60 font-sans leading-relaxed text-lg max-w-lg">
              We believe that a home is not just a structure, but a reflection of one's architectural soul. Our portfolio excludes 95% of available properties to ensure only the most exceptional spaces reach our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {[
              { icon: Award, title: "Elite Selection", desc: "Every property undergoes a 50-point architectural audit." },
              { icon: ShieldCheck, title: "Absolute Privacy", desc: "Private off-market viewings for the discerning collector." }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <item.icon size={24} className="text-luxury-gold" strokeWidth={1} />
                <h3 className="font-serif text-xl text-charcoal">{item.title}</h3>
                <p className="text-charcoal/40 text-xs leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
