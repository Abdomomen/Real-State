"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BedDouble, Bath, Square } from "lucide-react";

export default function PropertyCard({ property, index }) {
  const title = property.title || property.name;
  const price = typeof property.price === 'number' 
    ? `$${property.price.toLocaleString()}` 
    : property.price;
  const image = (property.images && property.images.length > 0) ? property.images[0].url : property.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";
  const location = `${property.city || ''}${property.city && property.state ? ', ' : ''}${property.state || ''}` || property.location;
  const beds = property.bedrooms || property.beds;
  const baths = property.bathrooms || property.baths;
  const area = property.area;
  const id = property._id || property.id;
  const category = property.type || "all";

  return (
    <Link href={`/properties/${category}/${id}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col h-full bg-cream border border-gold/30 hover:border-gold transition-colors duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-gold/30 p-2 bg-cream">
          <div className="w-full h-full relative overflow-hidden bg-forest">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          {/* Tag */}
          <div className="absolute top-6 left-6 border border-gold bg-cream px-3 py-1">
            <span className="text-[9px] uppercase tracking-[0.2em] text-forest font-bold font-sans">
              {property.type || "Exclusive Collection"}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1 justify-between bg-cream">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-forest/60 font-bold mb-3">
              {location}
            </p>
            <h3 className="text-2xl font-serif text-forest leading-tight group-hover:text-gold transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-4 text-xl font-serif italic text-gold">
              {price}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gold/20 flex items-center justify-between text-[10px] uppercase tracking-widest text-forest/70 font-bold">
            <div className="flex gap-6">
              {beds > 0 && (
                <span className="flex items-center gap-1.5"><BedDouble strokeWidth={1.5} size={14} className="text-gold"/> {beds}</span>
              )}
              {baths > 0 && (
                <span className="flex items-center gap-1.5"><Bath strokeWidth={1.5} size={14} className="text-gold"/> {baths}</span>
              )}
            </div>
            <span className="flex items-center gap-1.5"><Square strokeWidth={1.5} size={14} className="text-gold"/> {area} SQ.FT</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
