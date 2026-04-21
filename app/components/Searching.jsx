"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Home, SlidersHorizontal, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "./PropertyCard";
export default function Searching() {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    minPrice: "",
    maxPrice: "",
    type: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = async (e, searchParamsOverride = filters) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParamsOverride).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      const res = await fetch(`/api/buildings/search?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.buildings);
      } else {
        setError(data.message || "Failed to fetch results");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Initial search on mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const clearFilters = () => {
    const emptyFilters = {
      city: "",
      state: "",
      minPrice: "",
      maxPrice: "",
      type: "",
    };
    setFilters(emptyFilters);
    handleSearch(null, emptyFilters);
  };
  return (
    <div className="min-h-screen bg-cream text-forest selection:bg-gold/30">
      {/* Search Header Section */}
      <section className="bg-forest pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Texture/Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20400%20400%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27noiseFilter%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%273%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')] opacity-20" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-cream leading-tight">
              Refine Your <span className="italic text-gold">Vision</span>
            </h1>
            <p className="mt-6 text-gold/60 text-sm uppercase tracking-[0.4em] font-sans">
              Bespoke curation across horizons
            </p>
          </motion.div>

          {/* Main Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <form
              onSubmit={handleSearch}
              className="bg-cream p-3 md:p-4 luxury-border flex flex-col md:flex-row items-stretch gap-3 shadow-2xl"
            >
              {/* City Input */}
              <div className="flex-1 flex items-center px-4 bg-forest/5 border border-forest/10 focus-within:border-gold transition-colors">
                <MapPin size={18} className="text-gold shrink-0" />
                <input
                  type="text"
                  name="city"
                  placeholder="In which city..."
                  value={filters.city}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-transparent outline-none text-forest placeholder:text-forest/30 font-serif italic text-lg"
                />
              </div>

              {/* Type Select */}
              <div className="flex-1 flex items-center px-4 bg-forest/5 border border-forest/10 focus-within:border-gold transition-colors">
                <Home size={18} className="text-gold shrink-0" />
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-transparent outline-none text-forest appearance-none cursor-pointer font-serif italic text-lg"
                >
                  <option value="">All Architectures</option>
                  <option value="house">Estate / House</option>
                  <option value="apartment">Penthouse / Apartment</option>
                  <option value="office">Commercial Bureau</option>
                  <option value="shop">Retail Space</option>
                  <option value="land">Acreage</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`p-4 border transition-all ${
                    showAdvanced ? "bg-gold text-forest border-gold" : "bg-forest/5 text-forest border-forest/10 hover:border-gold"
                  }`}
                  title="Advanced Filters"
                >
                  <SlidersHorizontal size={20} />
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-forest text-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-forest-dark transition-all flex items-center gap-3 border border-gold disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-cream/95 backdrop-blur-md border-x border-b border-gold p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-[-1px]">
                    {/* State */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-forest/50 font-bold">Region/State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="e.g. California"
                        value={filters.state}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-forest/20 p-2 text-forest focus:border-gold outline-none transition-colors italic font-serif"
                      />
                    </div>
                    {/* Price Min */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-forest/50 font-bold">Minimum Allocation ($)</label>
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="0"
                        value={filters.minPrice}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-forest/20 p-2 text-forest focus:border-gold outline-none transition-colors italic font-serif"
                      />
                    </div>
                    {/* Price Max */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-forest/50 font-bold">Maximum Allocation ($)</label>
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="Limitless"
                        value={filters.maxPrice}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-forest/20 p-2 text-forest focus:border-gold outline-none transition-colors italic font-serif"
                      />
                    </div>
                    
                    <div className="md:col-span-3 flex justify-end gap-4 pt-4">
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-[10px] uppercase tracking-[0.2em] text-forest/40 hover:text-red-800 transition-colors font-bold"
                      >
                        Reset Parameters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 min-h-[400px]">
        {/* Results Metadata */}
        <div className="flex justify-between items-end mb-16 border-b border-gold/20 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-forest">Inventory</h2>
            <p className="text-[10px] text-forest/50 uppercase tracking-[0.2em] font-bold">
              {loading ? "Scanning Archives..." : `${results.length} Curated Assets Found`}
            </p>
          </div>

          {(filters.city || filters.type || filters.state) && (
              <div className="flex gap-2 flex-wrap justify-end">
                {Object.entries(filters).map(([key, value]) => value ? (
                  <span key={key} className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 border border-gold/30 text-[9px] uppercase tracking-widest text-forest font-bold">
                    {key}: {value}
                    <button onClick={() => {
                      const newF = {...filters, [key]: ""};
                      setFilters(newF);
                      handleSearch(null, newF);
                    }} className="hover:text-gold"><X size={10} /></button>
                  </span>
                ) : null)}
             </div>
          )}
        </div>

        {error && (
          <div className="p-8 border border-red-900/30 bg-red-900/5 text-red-900 text-center font-serif italic mb-12">
            {error}
          </div>
        )}

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/5] bg-forest/5 luxury-border animate-pulse flex flex-col p-8 space-y-4">
                <div className="aspect-video bg-forest/10 w-full" />
                <div className="h-4 bg-forest/10 w-1/2" />
                <div className="h-8 bg-forest/10 w-3/4" />
                <div className="flex-1" />
                <div className="h-10 bg-forest/10 w-full" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {results.map((building, idx) => (
              <PropertyCard key={building._id} property={building} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-6">
            <div className="text-gold flex justify-center">
              <Search size={48} strokeWidth={1} />
            </div>
            <h3 className="text-3xl font-serif text-forest/40 italic">No matches for your current curation.</h3>
            <button
              onClick={clearFilters}
              className="text-xs uppercase tracking-[0.3em] text-gold hover:text-forest transition-colors font-bold"
            >
              Expand Search Horizons
            </button>
          </div>
        )}
      </section>

      {/* Footer Decoration */}
      <footer className="py-20 border-t border-gold/20 text-center">
        <div className="max-w-md mx-auto opacity-30">
          <div className="w-12 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-forest font-sans">End of Record</p>
        </div>
      </footer>
    </div>
  );
}