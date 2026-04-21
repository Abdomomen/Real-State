"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Plus, X, Building2, MapPin, DollarSign, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/app/components/ToastProvider";

const AddBuildingForm = ({role}) => {
  const router = useRouter();
  const { showToast } = useToast();
  if (role !=="admin"){
    return <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <img 
        src="https://res.cloudinary.com/doq3eivyt/image/upload/q_auto/f_auto/v1776437405/Tom_The_Cat_In_A_Suit_ho6jeb.jpg" 
        alt="Intruder Alert" 
        className="max-h-screen object-contain"
      />
    </div>
  }
  

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    type: "house",
    isActive: true,
    bedrooms: "",
    bathrooms: "",
    area: "",
    imagesFiles:images
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    showToast("Visual asset removed.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price);
    submitData.append("address", formData.address);
    submitData.append("city", formData.city);
    submitData.append("state", formData.state);
    submitData.append("type", formData.type);
    submitData.append("isActive", formData.isActive);
    submitData.append("bedrooms", formData.bedrooms);
    submitData.append("bathrooms", formData.bathrooms);
    submitData.append("area", formData.area);

    images.forEach(img => {
      submitData.append("imagesFiles", img);
    });

    try {
      const res = await fetch("/api/dashboard/buildings", {
        method: "POST",
        body: submitData
      });
      const data = await res.json();
      if (data.success) {
        showToast("Building created successfully.");
        router.push("/dashboard/buildings");
      } else {
        showToast(data.message || data.error || "Failed to create asset.");
      }
    } catch (err) {
      console.error(err);
      showToast("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="flex items-center justify-between border-b border-gold pb-8">
        <div className="space-y-4">
          <Link href="/dashboard/buildings" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-forest/40 hover:text-charcoal transition-colors font-bold mb-4 font-sans">
            <ArrowLeft size={14} /> Back to Inventory
          </Link>
          <h2 className="text-4xl font-serif text-charcoal leading-tight">New Asset <span className="italic">Manifest.</span></h2>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Basic Information */}
        <section className="space-y-8">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold flex items-center gap-3 font-sans">
             <Building2 size={14} /> Basic Information
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Property Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. The Glass Pavilion" 
                  className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-xl font-serif italic transition-colors" 
                />
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Asset Category</label>
                <div className="relative">
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors appearance-none cursor-pointer"
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="office">Office</option>
                    <option value="shop">Shop</option>
                    <option value="land">Land</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">▼</div>
                </div>
             </div>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Architectural Narrative</label>
              <textarea 
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the soul of this structure..."
                className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors resize-none leading-relaxed"
              />
           </div>
        </section>

        {/* Pricing & Location */}
        <section className="space-y-8">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold flex items-center gap-3 font-sans">
             <MapPin size={14} /> Specification & Value
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans flex items-center gap-1">
                  <DollarSign size={12} /> Asset Value (USD)
                </label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="15000000" 
                  className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                />
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">City</label>
                <input 
                  type="text" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="New York" 
                  className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                />
             </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">State / Region</label>
                 <input 
                   type="text" 
                   required
                   value={formData.state}
                   onChange={(e) => setFormData({...formData, state: e.target.value})}
                   placeholder="NY" 
                   className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                 />
              </div>
            </div>
            
            {/* Conditional Specification Row */}
            {formData.type !== "land" && formData.type !== "office" && formData.type !== "shop" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Bedrooms</label>
                   <input 
                     type="number" 
                     required
                     value={formData.bedrooms}
                     onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                     placeholder="4" 
                     className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Bathrooms</label>
                   <input 
                     type="number" 
                     required
                     value={formData.bathrooms}
                     onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                     placeholder="3.5" 
                     className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Total Area (SQ.FT)</label>
                   <input 
                     type="number" 
                     required
                     value={formData.area}
                     onChange={(e) => setFormData({...formData, area: e.target.value})}
                     placeholder="4500" 
                     className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                   />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 pt-4">
                 <div className="flex flex-col gap-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Total Area (SQ.FT)</label>
                   <input 
                     type="number" 
                     required
                     value={formData.area}
                     onChange={(e) => setFormData({...formData, area: e.target.value})}
                     placeholder="4500" 
                     className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
                   />
                </div>
              </div>
            )}
           <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-forest/40 font-sans">Exact Address</label>
              <input 
                type="text" 
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Upper Manhattan, 5th Ave..." 
                className="w-full bg-transparent border-b border-gold/20 py-4 focus:border-gold outline-none text-lg font-serif italic transition-colors" 
              />
           </div>
        </section>

        {/* Visual Assets */}
        <section className="space-y-8">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold flex items-center gap-3 font-sans">
             <Upload size={14} /> Visual Curation
           </h3>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-video overflow-hidden luxury-border bg-forest/5 group">
                  <img src={URL.createObjectURL(img)} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Upload Preview" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 bg-red-900 text-cream p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                  {i === 0 && <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-widest bg-gold text-forest px-2 py-1 font-bold border border-forest">Primary Visual</span>}
                </div>
              ))}
              <label className="aspect-video border border-dashed border-gold/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-forest hover:text-gold transition-all duration-500 group relative overflow-hidden">
                <Plus className="text-gold group-hover:scale-125 transition-transform" size={24} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-widest text-forest/40 group-hover:text-gold/60 font-bold">Append Frame</span>
                <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
              </label>
           </div>
           <p className="text-[9px] uppercase tracking-widest text-charcoal/20 italic font-sans leading-loose">
             * High-resolution photography is recommended (min 1920px). First frame will be the primary visual asset.
           </p>
        </section>

        <footer className="pt-12 border-t border-gold/10 flex justify-between items-center">
           <p className="text-[10px] font-serif italic text-forest/40 italic">Publication creates a permanent guild record.</p>
           <div className="flex gap-8 items-center">
             <Link href="/dashboard/buildings" className="text-[10px] uppercase tracking-[0.4em] text-forest/40 hover:text-charcoal transition-colors font-bold font-sans">
               Cancel Entry
             </Link>
             <button 
               disabled={loading}
               className="bg-forest text-gold px-16 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-forest transition-all duration-700 disabled:opacity-50 font-sans flex items-center gap-4 border border-gold"
             >
               {loading && <Loader2 size={16} className="animate-spin" />}
               {loading ? "Transmitting..." : "Ratify Publication"}
             </button>
           </div>
        </footer>
      </form>
    </div>
  );
};

export default AddBuildingForm;
