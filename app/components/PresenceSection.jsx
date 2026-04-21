"use client";

import { motion } from "framer-motion";

const PresenceSection = () => {
  const locations = [
    { city: "Madrid", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=800" },
    { city: "London", img: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&q=80&w=800" },
    { city: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800" }
  ];


  return (
    <section className="py-32 px-8 bg-charcoal text-eggshell overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-serif leading-tight">
              Global <span className="italic text-eggshell/40">Footprint.</span>
            </h2>
          </motion.div>
          <p className="text-eggshell/40 font-sans text-right max-w-xs text-xs uppercase tracking-widest leading-loose">
            From the coast of Portugal to the skyline of Manhattan, we represent architectural significance wherever it resides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1">
          {locations.map((loc, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              <img 
                src={loc.img} 
                alt={loc.city} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-serif italic text-eggshell">{loc.city}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PresenceSection;
