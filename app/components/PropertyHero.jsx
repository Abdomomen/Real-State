"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const PropertyHero = ({ building }) => {
  const image = (building.images && building.images.length > 0) ? building.images[0].url : (building.mainImage || "https://images.unsplash.com/photo-1600607687940-4e2303c9574a?auto=format&fit=crop&q=80&w=2400");
  const location = `${building.city}, ${building.state}`;
  const priceDisplay = typeof building.price === 'number' 
    ? `$${building.price.toLocaleString()}` 
    : building.price;

  return (
    <section className="relative h-[85vh] w-full pt-20">
      <div className="absolute inset-x-8 bottom-0 top-32 overflow-hidden rounded-sm luxury-border">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={image}
          alt={building.title || building.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/10" />
      </div>

      {/* Floating Title/Price overlay */}
      <div className="absolute bottom-12 left-10 md:left-20 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
           <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-eggshell/60 mb-4 font-sans flex items-center gap-2">
             <MapPin size={12} /> {location}
           </h4>
           <h1 className="text-5xl md:text-8xl font-serif text-eggshell leading-tight mb-4">
             {building.title || building.name}
           </h1>
           <p className="text-3xl font-serif text-luxury-gold italic">{priceDisplay}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyHero;
